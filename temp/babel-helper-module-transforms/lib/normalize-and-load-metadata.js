"use strict";

exports.__esModule = true;
exports.hasExports = hasExports;
exports.isSideEffectImport = isSideEffectImport;
exports.default = normalizeModuleAndLoadMetadata;

var _path = require("path");

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function hasExports(metadata) {
  var local = metadata.local,
      source = metadata.source;
  return local.size > 0 || Array.from(source).some(function (_ref) {
    var meta = _ref[1];
    return meta.reexports.size > 0 || meta.reexportNamespace.size > 0 || !!meta.reexportAll;
  });
}

function isSideEffectImport(source) {
  return source.imports.size === 0 && source.importsNamespace.size === 0 && source.reexports.size === 0 && source.reexportNamespace.size === 0 && !source.reexportAll;
}

function normalizeModuleAndLoadMetadata(programPath, exportName, _temp) {
  var _ref2 = _temp === void 0 ? {} : _temp,
      _ref2$noInterop = _ref2.noInterop,
      noInterop = _ref2$noInterop === undefined ? false : _ref2$noInterop;

  if (!exportName) {
    exportName = programPath.scope.generateUidIdentifier("exports").name;
  }

  nameAnonymousExports(programPath);

  var _getModuleMetadata = getModuleMetadata(programPath),
      local = _getModuleMetadata.local,
      source = _getModuleMetadata.source;

  removeModuleDeclarations(programPath);

  for (var _iterator = source, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref4;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref4 = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref4 = _i.value;
    }

    var _ref5 = _ref4;
    var _metadata = _ref5[1];

    if (_metadata.importsNamespace.size > 0) {
      _metadata.name = _metadata.importsNamespace.values().next().value;
    }

    if (noInterop) _metadata.interop = "none";
  }

  return {
    exportName: exportName,
    exportNameListName: null,
    local: local,
    source: source
  };
}

function getModuleMetadata(programPath) {
  var localData = getLocalExportMetadata(programPath);
  var sourceData = new Map();

  var getData = function getData(sourceNode) {
    var source = sourceNode.value;
    var data = sourceData.get(source);

    if (!data) {
      data = {
        name: programPath.scope.generateUidIdentifier((0, _path.basename)(source, (0, _path.extname)(source))).name,
        interop: "none",
        loc: null,
        imports: new Map(),
        importsNamespace: new Set(),
        reexports: new Map(),
        reexportNamespace: new Set(),
        reexportAll: null
      };
      sourceData.set(source, data);
    }

    return data;
  };

  programPath.get("body").forEach(function (child) {
    if (child.isImportDeclaration()) {
      var data = getData(child.node.source);
      if (!data.loc) data.loc = child.node.loc;
      child.get("specifiers").forEach(function (spec) {
        if (spec.isImportDefaultSpecifier()) {
          var localName = spec.get("local").node.name;
          data.imports.set(localName, "default");
          var reexport = localData.get(localName);

          if (reexport) {
            localData.delete(localName);
            reexport.names.forEach(function (name) {
              data.reexports.set(name, "default");
            });
          }
        } else if (spec.isImportNamespaceSpecifier()) {
          var _localName = spec.get("local").node.name;
          data.importsNamespace.add(_localName);

          var _reexport = localData.get(_localName);

          if (_reexport) {
            localData.delete(_localName);

            _reexport.names.forEach(function (name) {
              data.reexportNamespace.add(name);
            });
          }
        } else if (spec.isImportSpecifier()) {
          var importName = spec.get("imported").node.name;
          var _localName2 = spec.get("local").node.name;
          data.imports.set(_localName2, importName);

          var _reexport2 = localData.get(_localName2);

          if (_reexport2) {
            localData.delete(_localName2);

            _reexport2.names.forEach(function (name) {
              data.reexports.set(name, importName);
            });
          }
        }
      });
    } else if (child.isExportAllDeclaration()) {
      var _data = getData(child.node.source);

      if (!_data.loc) _data.loc = child.node.loc;
      _data.reexportAll = {
        loc: child.node.loc
      };
    } else if (child.isExportNamedDeclaration() && child.node.source) {
      var _data2 = getData(child.node.source);

      if (!_data2.loc) _data2.loc = child.node.loc;
      child.get("specifiers").forEach(function (spec) {
        if (!spec.isExportSpecifier()) {
          throw spec.buildCodeFrameError("Unexpected export specifier type");
        }

        var importName = spec.get("local").node.name;
        var exportName = spec.get("exported").node.name;

        _data2.reexports.set(exportName, importName);

        if (exportName === "__esModule") {
          throw exportName.buildCodeFrameError('Illegal export "__esModule".');
        }
      });
    }
  });

  for (var _iterator2 = sourceData.values(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref6;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref6 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref6 = _i2.value;
    }

    var _metadata2 = _ref6;

    if (_metadata2.importsNamespace.size > 0) {
      _metadata2.interop = "namespace";
      continue;
    }

    var needsDefault = false;
    var needsNamed = false;

    for (var _iterator3 = _metadata2.imports.values(), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref7;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref7 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref7 = _i3.value;
      }

      var _importName2 = _ref7;
      if (_importName2 === "default") needsDefault = true;else needsNamed = true;
    }

    for (var _iterator4 = _metadata2.reexports.values(), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
      var _ref8;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref8 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref8 = _i4.value;
      }

      var _importName3 = _ref8;
      if (_importName3 === "default") needsDefault = true;else needsNamed = true;
    }

    if (needsDefault && needsNamed) {
      _metadata2.interop = "namespace";
    } else if (needsDefault) {
      _metadata2.interop = "default";
    }
  }

  return {
    local: localData,
    source: sourceData
  };
}

function getLocalExportMetadata(programPath) {
  var bindingKindLookup = new Map();
  programPath.get("body").forEach(function (child) {
    var kind = void 0;

    if (child.isImportDeclaration()) {
      kind = "import";
    } else {
      if (child.isExportDefaultDeclaration()) child = child.get("declaration");

      if (child.isExportNamedDeclaration() && child.node.declaration) {
        child = child.get("declaration");
      }

      if (child.isFunctionDeclaration()) {
        kind = "hoisted";
      } else if (child.isClassDeclaration()) {
        kind = "block";
      } else if (child.isVariableDeclaration({
        kind: "var"
      })) {
        kind = "var";
      } else if (child.isVariableDeclaration()) {
        kind = "block";
      } else {
        return;
      }
    }

    Object.keys(child.getOuterBindingIdentifiers()).forEach(function (name) {
      bindingKindLookup.set(name, kind);
    });
  });
  var localMetadata = new Map();

  var getLocalMetadata = function getLocalMetadata(idPath) {
    var localName = idPath.node.name;
    var metadata = localMetadata.get(localName);

    if (!metadata) {
      var _kind = bindingKindLookup.get(localName);

      if (_kind === undefined) {
        throw idPath.buildCodeFrameError("Exporting local \"" + localName + "\", which is not declared.");
      }

      metadata = {
        names: [],
        kind: _kind
      };
      localMetadata.set(localName, metadata);
    }

    return metadata;
  };

  programPath.get("body").forEach(function (child) {
    if (child.isExportNamedDeclaration() && !child.node.source) {
      if (child.node.declaration) {
        var declaration = child.get("declaration");
        var ids = declaration.getOuterBindingIdentifierPaths();
        Object.keys(ids).forEach(function (name) {
          if (name === "__esModule") {
            throw declaration.buildCodeFrameError('Illegal export "__esModule".');
          }

          getLocalMetadata(ids[name]).names.push(name);
        });
      } else {
        child.get("specifiers").forEach(function (spec) {
          var local = spec.get("local");
          var exported = spec.get("exported");

          if (exported.node.name === "__esModule") {
            throw exported.buildCodeFrameError('Illegal export "__esModule".');
          }

          getLocalMetadata(local).names.push(exported.node.name);
        });
      }
    } else if (child.isExportDefaultDeclaration()) {
      var _declaration = child.get("declaration");

      if (_declaration.isFunctionDeclaration() || _declaration.isClassDeclaration()) {
        getLocalMetadata(_declaration.get("id")).names.push("default");
      } else {
        throw _declaration.buildCodeFrameError("Unexpected default expression export.");
      }
    }
  });
  return localMetadata;
}

function nameAnonymousExports(programPath) {
  programPath.get("body").forEach(function (child) {
    if (!child.isExportDefaultDeclaration()) return;
    var declaration = child.get("declaration");

    if (declaration.isFunctionDeclaration()) {
      if (!declaration.node.id) {
        declaration.node.id = declaration.scope.generateUidIdentifier("default");
      }
    } else if (declaration.isClassDeclaration()) {
      if (!declaration.node.id) {
        declaration.node.id = declaration.scope.generateUidIdentifier("default");
      }
    } else {
      var id = declaration.scope.generateUidIdentifier("default");
      var namedDecl = t.exportNamedDeclaration(null, [t.exportSpecifier(t.identifier(id.name), t.identifier("default"))]);
      namedDecl._blockHoist = child.node._blockHoist;
      var varDecl = t.variableDeclaration("var", [t.variableDeclarator(id, declaration.node)]);
      varDecl._blockHoist = child.node._blockHoist;
      child.replaceWithMultiple([namedDecl, varDecl]);
    }
  });
}

function removeModuleDeclarations(programPath) {
  programPath.get("body").forEach(function (child) {
    if (child.isImportDeclaration()) {
      child.remove();
    } else if (child.isExportNamedDeclaration()) {
      if (child.node.declaration) {
        child.node.declaration._blockHoist = child.node._blockHoist;
        child.replaceWith(child.node.declaration);
      } else {
        child.remove();
      }
    } else if (child.isExportDefaultDeclaration()) {
      var declaration = child.get("declaration");

      if (declaration.isFunctionDeclaration() || declaration.isClassDeclaration()) {
        declaration._blockHoist = child.node._blockHoist;
        child.replaceWith(declaration);
      } else {
        throw declaration.buildCodeFrameError("Unexpected default expression export.");
      }
    } else if (child.isExportAllDeclaration()) {
      child.remove();
    }
  });
}