"use strict";

exports.__esModule = true;
exports.default = rewriteLiveReferences;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function rewriteLiveReferences(programPath, metadata) {
  var imported = new Map();
  var exported = new Map();

  var requeueInParent = function requeueInParent(path) {
    programPath.requeue(path);
  };

  for (var _iterator = metadata.source, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref2 = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref2 = _i.value;
    }

    var _ref6 = _ref2;
    var _source = _ref6[0];
    var _data2 = _ref6[1];

    for (var _iterator3 = _data2.imports, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref8;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref8 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref8 = _i3.value;
      }

      var _ref10 = _ref8;
      var _localName2 = _ref10[0];
      var _importName = _ref10[1];
      imported.set(_localName2, [_source, _importName, null]);
    }

    for (var _iterator4 = _data2.importsNamespace, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
      var _ref9;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref9 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref9 = _i4.value;
      }

      var _localName3 = _ref9;
      imported.set(_localName3, [null, null, _localName3]);
    }
  }

  for (var _iterator2 = metadata.local, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _exportMeta;

    var _ref4;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref4 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref4 = _i2.value;
    }

    var _ref11 = _ref4;
    var _local = _ref11[0];
    var _data3 = _ref11[1];
    var exportMeta = exported.get(_local);

    if (!exportMeta) {
      exportMeta = [];
      exported.set(_local, exportMeta);
    }

    (_exportMeta = exportMeta).push.apply(_exportMeta, _data3.names);
  }

  programPath.traverse(rewriteBindingInitVisitor, {
    metadata: metadata,
    requeueInParent: requeueInParent,
    scope: programPath.scope,
    exported: exported
  });
  programPath.traverse(rewriteReferencesVisitor, {
    seen: new WeakSet(),
    metadata: metadata,
    requeueInParent: requeueInParent,
    scope: programPath.scope,
    imported: imported,
    exported: exported,
    buildImportReference: function buildImportReference(_ref5) {
      var source = _ref5[0],
          importName = _ref5[1],
          localName = _ref5[2];
      if (localName) return null;
      var name = metadata.source.get(source).name;
      return t.memberExpression(t.identifier(name), t.identifier(importName));
    }
  });
}

var rewriteBindingInitVisitor = {
  ClassProperty: function ClassProperty(path) {
    path.skip();
  },
  Function: function Function(path) {
    path.skip();
  },
  ClassDeclaration: function ClassDeclaration(path) {
    var requeueInParent = this.requeueInParent,
        exported = this.exported,
        metadata = this.metadata;
    var id = path.node.id;
    if (!id) throw new Error("Expected class to have a name");
    var localName = id.name;
    var exportNames = exported.get(localName) || [];

    if (exportNames.length > 0) {
      var statement = t.expressionStatement(buildBindingExportAssignmentExpression(metadata, exportNames, t.identifier(localName)));
      statement._blockHoist = path.node._blockHoist;
      requeueInParent(path.insertAfter(statement)[0]);
    }
  },
  VariableDeclaration: function VariableDeclaration(path) {
    var requeueInParent = this.requeueInParent,
        exported = this.exported,
        metadata = this.metadata;
    Object.keys(path.getOuterBindingIdentifiers()).forEach(function (localName) {
      var exportNames = exported.get(localName) || [];

      if (exportNames.length > 0) {
        var statement = t.expressionStatement(buildBindingExportAssignmentExpression(metadata, exportNames, t.identifier(localName)));
        statement._blockHoist = path.node._blockHoist;
        requeueInParent(path.insertAfter(statement)[0]);
      }
    });
  }
};

var buildBindingExportAssignmentExpression = function buildBindingExportAssignmentExpression(metadata, exportNames, localExpr) {
  return (exportNames || []).reduce(function (expr, exportName) {
    return t.assignmentExpression("=", t.memberExpression(t.identifier(metadata.exportName), t.identifier(exportName)), expr);
  }, localExpr);
};

var importThrow = (0, _babelTemplate2.default)("\n  (function() {\n    throw new Error('\"' + NAME + '\" is read-only.');\n  })();\n");

var buildImportThrow = function buildImportThrow(localName) {
  return importThrow({
    NAME: t.stringLiteral(localName)
  }).expression;
};

var rewriteReferencesVisitor = {
  ReferencedIdentifier: function ReferencedIdentifier(path) {
    var seen = this.seen,
        buildImportReference = this.buildImportReference,
        scope = this.scope,
        imported = this.imported,
        requeueInParent = this.requeueInParent;
    if (seen.has(path.node)) return;
    seen.add(path.node);
    var localName = path.node.name;
    var localBinding = path.scope.getBinding(localName);
    var rootBinding = scope.getBinding(localName);
    if (rootBinding !== localBinding) return;
    var importData = imported.get(localName);

    if (importData) {
      var ref = buildImportReference(importData) || path.node;

      if (path.parentPath.isCallExpression({
        callee: path.node
      })) {
        path.replaceWith(t.sequenceExpression([t.numericLiteral(0), ref]));
      } else if (path.isJSXIdentifier() && t.isMemberExpression(ref)) {
        var object = ref.object,
            property = ref.property;
        path.replaceWith(t.JSXMemberExpression(t.JSXIdentifier(object.name), t.JSXIdentifier(property.name)));
      } else {
        path.replaceWith(ref);
      }

      requeueInParent(path);
    }
  },
  UpdateExpression: {
    exit: function exit(path) {
      var scope = this.scope,
          imported = this.imported,
          exported = this.exported;
      var arg = path.get("argument");
      if (!arg.isIdentifier()) return;
      var localName = arg.node.name;

      if (!imported.has(localName) && !exported.has(localName)) {
        return;
      }

      if (scope.getBinding(localName) !== path.scope.getBinding(localName)) {
        return;
      }

      var exportedNames = exported.get(localName) || [];

      if (exportedNames.length > 0 || imported.has(localName)) {
        if (path.node.prefix || path.parentPath.isExpressionStatement() && !path.isCompletionRecord()) {
          path.replaceWith(t.assignmentExpression("+=", arg.node, t.numericLiteral(1)));
        } else {
          var varName = path.scope.generateDeclaredUidIdentifier("old");
          var assignment = t.binaryExpression(path.node.operator.slice(0, 1), varName, t.numericLiteral(1));
          path.replaceWith(t.sequenceExpression([t.assignmentExpression("=", varName, arg.node), t.assignmentExpression("=", arg.node, assignment), varName]));
        }
      }
    }
  },
  AssignmentExpression: {
    exit: function exit(path) {
      var _this = this;

      var scope = this.scope,
          seen = this.seen,
          imported = this.imported,
          exported = this.exported,
          requeueInParent = this.requeueInParent,
          buildImportReference = this.buildImportReference;
      if (seen.has(path.node)) return;
      seen.add(path.node);
      var left = path.get("left");

      if (left.isIdentifier()) {
        var localName = left.node.name;

        if (scope.getBinding(localName) !== path.scope.getBinding(localName)) {
          return;
        }

        var exportedNames = exported.get(localName) || [];
        var importData = imported.get(localName);

        if (exportedNames.length > 0 || importData) {
          var assignment = path.node;

          if (importData) {
            assignment.left = buildImportReference(importData) || assignment.left;

            if (path.node.operator !== "=") {
              var op = path.node.operator.slice(0, -1);
              path.node.operator = "=";
              assignment.right = t.binaryExpression(op, assignment.left, assignment.right);
            }

            assignment.right = t.sequenceExpression([assignment.right, buildImportThrow(localName)]);
          }

          path.replaceWith(buildBindingExportAssignmentExpression(this.metadata, exportedNames, assignment));
          requeueInParent(path);
        }
      } else if (left.isMemberExpression()) {} else {
        var ids = left.getOuterBindingIdentifiers();
        var id = Object.keys(ids).filter(function (localName) {
          return imported.has(localName);
        }).pop();

        if (id) {
          path.node.right = t.sequenceExpression([path.node.right, buildImportThrow(id)]);
        }

        var items = [];
        Object.keys(ids).forEach(function (localName) {
          if (scope.getBinding(localName) !== path.scope.getBinding(localName)) {
            return;
          }

          var exportedNames = exported.get(localName) || [];

          if (exportedNames.length > 0) {
            items.push(buildBindingExportAssignmentExpression(_this.metadata, exportedNames, t.identifier(localName)));
          }
        });

        if (items.length > 0) {
          var node = t.sequenceExpression(items);

          if (path.parentPath.isExpressionStatement()) {
            node = t.expressionStatement(node);
            node._blockHoist = path.parentPath.node._blockHoist;
          }

          var statement = path.insertAfter(node)[0];
          requeueInParent(statement);
        }
      }
    }
  }
};