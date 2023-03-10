"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;

  function hasRestElement(path) {
    var foundRestElement = false;
    path.traverse({
      RestElement: function RestElement() {
        foundRestElement = true;
        path.stop();
      }
    });
    return foundRestElement;
  }

  function hasSpread(node) {
    for (var _iterator = node.properties, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var _prop = _ref2;

      if (t.isSpreadElement(_prop)) {
        return true;
      }
    }

    return false;
  }

  function extractNormalizedKeys(path) {
    var props = path.node.properties;
    var keys = [];
    var allLiteral = true;

    for (var _iterator2 = props, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref3 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref3 = _i2.value;
      }

      var _prop2 = _ref3;

      if (t.isIdentifier(_prop2.key) && !_prop2.computed) {
        keys.push(t.stringLiteral(_prop2.key.name));
      } else if (t.isLiteral(_prop2.key)) {
        keys.push(t.stringLiteral(String(_prop2.key.value)));
      } else {
        keys.push(_prop2.key);
        allLiteral = false;
      }
    }

    return {
      keys: keys,
      allLiteral: allLiteral
    };
  }

  function replaceImpureComputedKeys(path) {
    var impureComputedPropertyDeclarators = [];

    for (var _iterator3 = path.get("properties"), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref4;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref4 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref4 = _i3.value;
      }

      var _propPath = _ref4;

      var key = _propPath.get("key");

      if (_propPath.node.computed && !key.isPure()) {
        var identifier = path.scope.generateUidIdentifierBasedOnNode(key.node);
        var declarator = t.variableDeclarator(identifier, key.node);
        impureComputedPropertyDeclarators.push(declarator);
        key.replaceWith(identifier);
      }
    }

    return impureComputedPropertyDeclarators;
  }

  function createObjectSpread(path, file, objRef) {
    var props = path.get("properties");
    var last = props[props.length - 1];
    t.assertRestElement(last.node);
    var restElement = t.clone(last.node);
    last.remove();
    var impureComputedPropertyDeclarators = replaceImpureComputedKeys(path);

    var _extractNormalizedKey = extractNormalizedKeys(path),
        keys = _extractNormalizedKey.keys,
        allLiteral = _extractNormalizedKey.allLiteral;

    var keyExpression = void 0;

    if (!allLiteral) {
      keyExpression = t.callExpression(t.memberExpression(t.arrayExpression(keys), t.identifier("map")), [file.addHelper("toPropertyKey")]);
    } else {
      keyExpression = t.arrayExpression(keys);
    }

    return [impureComputedPropertyDeclarators, restElement.argument, t.callExpression(file.addHelper("objectWithoutProperties"), [objRef, keyExpression])];
  }

  function replaceRestElement(parentPath, paramPath, i, numParams) {
    if (paramPath.isAssignmentPattern()) {
      replaceRestElement(parentPath, paramPath.get("left"), i, numParams);
      return;
    }

    if (paramPath.isArrayPattern() && hasRestElement(paramPath)) {
      var elements = paramPath.get("elements");

      for (var _i4 = 0; _i4 < elements.length; _i4++) {
        replaceRestElement(parentPath, elements[_i4], _i4, elements.length);
      }
    }

    if (paramPath.isObjectPattern() && hasRestElement(paramPath)) {
      var uid = parentPath.scope.generateUidIdentifier("ref");
      var declar = t.variableDeclaration("let", [t.variableDeclarator(paramPath.node, uid)]);
      parentPath.ensureBlock();
      parentPath.get("body").unshiftContainer("body", declar);
      paramPath.replaceWith(uid);
    }
  }

  return {
    inherits: _babelPluginSyntaxObjectRestSpread2.default,
    visitor: {
      Function: function Function(path) {
        var params = path.get("params");

        for (var i = params.length - 1; i >= 0; i--) {
          replaceRestElement(params[i].parentPath, params[i], i, params.length);
        }
      },
      VariableDeclarator: function VariableDeclarator(path, file) {
        if (!path.get("id").isObjectPattern()) {
          return;
        }

        var insertionPath = path;
        path.get("id").traverse({
          RestElement: function RestElement(path) {
            if (!path.parentPath.isObjectPattern()) {
              return;
            }

            if (this.originalPath.node.id.properties.length > 1 && !t.isIdentifier(this.originalPath.node.init)) {
              var initRef = path.scope.generateUidIdentifierBasedOnNode(this.originalPath.node.init, "ref");
              this.originalPath.insertBefore(t.variableDeclarator(initRef, this.originalPath.node.init));
              this.originalPath.replaceWith(t.variableDeclarator(this.originalPath.node.id, initRef));
              return;
            }

            var ref = this.originalPath.node.init;
            var refPropertyPath = [];
            path.findParent(function (path) {
              if (path.isObjectProperty()) {
                refPropertyPath.unshift(path.node.key.name);
              } else if (path.isVariableDeclarator()) {
                return true;
              }
            });

            if (refPropertyPath.length) {
              refPropertyPath.forEach(function (prop) {
                ref = t.memberExpression(ref, t.identifier(prop));
              });
            }

            var objectPatternPath = path.findParent(function (path) {
              return path.isObjectPattern();
            });

            var _createObjectSpread = createObjectSpread(objectPatternPath, file, ref),
                impureComputedPropertyDeclarators = _createObjectSpread[0],
                argument = _createObjectSpread[1],
                callExpression = _createObjectSpread[2];

            t.assertIdentifier(argument);
            insertionPath.insertBefore(impureComputedPropertyDeclarators);
            insertionPath.insertAfter(t.variableDeclarator(argument, callExpression));
            insertionPath = insertionPath.getSibling(insertionPath.key + 1);

            if (objectPatternPath.node.properties.length === 0) {
              objectPatternPath.findParent(function (path) {
                return path.isObjectProperty() || path.isVariableDeclarator();
              }).remove();
            }
          }
        }, {
          originalPath: path
        });
      },
      ExportNamedDeclaration: function ExportNamedDeclaration(path) {
        var declaration = path.get("declaration");
        if (!declaration.isVariableDeclaration()) return;
        if (!hasRestElement(declaration)) return;
        var specifiers = [];

        for (var name in path.getOuterBindingIdentifiers(path)) {
          var id = t.identifier(name);
          specifiers.push(t.exportSpecifier(id, id));
        }

        path.replaceWith(declaration.node);
        path.insertAfter(t.exportNamedDeclaration(null, specifiers));
      },
      CatchClause: function CatchClause(path) {
        var paramPath = path.get("param");
        replaceRestElement(paramPath.parentPath, paramPath);
      },
      AssignmentExpression: function AssignmentExpression(path, file) {
        var leftPath = path.get("left");

        if (leftPath.isObjectPattern() && hasRestElement(leftPath)) {
          var nodes = [];
          var ref = path.scope.generateUidIdentifierBasedOnNode(path.node.right, "ref");
          nodes.push(t.variableDeclaration("var", [t.variableDeclarator(ref, path.node.right)]));

          var _createObjectSpread2 = createObjectSpread(leftPath, file, ref),
              impureComputedPropertyDeclarators = _createObjectSpread2[0],
              argument = _createObjectSpread2[1],
              callExpression = _createObjectSpread2[2];

          if (impureComputedPropertyDeclarators.length > 0) {
            nodes.push(t.variableDeclaration("var", impureComputedPropertyDeclarators));
          }

          var nodeWithoutSpread = t.clone(path.node);
          nodeWithoutSpread.right = ref;
          nodes.push(t.expressionStatement(nodeWithoutSpread));
          nodes.push(t.toStatement(t.assignmentExpression("=", argument, callExpression)));

          if (ref) {
            nodes.push(t.expressionStatement(ref));
          }

          path.replaceWithMultiple(nodes);
        }
      },
      ForXStatement: function ForXStatement(path) {
        var node = path.node,
            scope = path.scope;
        var leftPath = path.get("left");
        var left = node.left;

        if (t.isObjectPattern(left) && hasRestElement(leftPath)) {
          var temp = scope.generateUidIdentifier("ref");
          node.left = t.variableDeclaration("var", [t.variableDeclarator(temp)]);
          path.ensureBlock();
          node.body.body.unshift(t.variableDeclaration("var", [t.variableDeclarator(left, temp)]));
          return;
        }

        if (!t.isVariableDeclaration(left)) return;
        var pattern = left.declarations[0].id;
        if (!t.isObjectPattern(pattern)) return;
        var key = scope.generateUidIdentifier("ref");
        node.left = t.variableDeclaration(left.kind, [t.variableDeclarator(key, null)]);
        path.ensureBlock();
        node.body.body.unshift(t.variableDeclaration(node.left.kind, [t.variableDeclarator(pattern, key)]));
      },
      ObjectExpression: function ObjectExpression(path, file) {
        if (!hasSpread(path.node)) return;
        var useBuiltIns = file.opts.useBuiltIns || false;

        if (typeof useBuiltIns !== "boolean") {
          throw new Error("transform-object-rest-spread currently only accepts a boolean " + "option for useBuiltIns (defaults to false)");
        }

        var args = [];
        var props = [];

        function push() {
          if (!props.length) return;
          args.push(t.objectExpression(props));
          props = [];
        }

        var _arr = path.node.properties;

        for (var _i5 = 0; _i5 < _arr.length; _i5++) {
          var prop = _arr[_i5];

          if (t.isSpreadElement(prop)) {
            push();
            args.push(prop.argument);
          } else {
            props.push(prop);
          }
        }

        push();

        if (!t.isObjectExpression(args[0])) {
          args.unshift(t.objectExpression([]));
        }

        var helper = useBuiltIns ? t.memberExpression(t.identifier("Object"), t.identifier("assign")) : file.addHelper("extends");
        path.replaceWith(t.callExpression(helper, args));
      }
    }
  };
};

var _babelPluginSyntaxObjectRestSpread = require("babel-plugin-syntax-object-rest-spread");

var _babelPluginSyntaxObjectRestSpread2 = _interopRequireDefault(_babelPluginSyntaxObjectRestSpread);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }