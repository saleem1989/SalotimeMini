"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;
  var VISITED = Symbol();
  return {
    visitor: {
      ExportDefaultDeclaration: function ExportDefaultDeclaration(path) {
        if (!path.get("declaration").isClassDeclaration()) return;
        var node = path.node;
        var ref = node.declaration.id || path.scope.generateUidIdentifier("class");
        node.declaration.id = ref;
        path.replaceWith(node.declaration);
        path.insertAfter(t.exportNamedDeclaration(null, [t.exportSpecifier(ref, t.identifier("default"))]));
      },
      ClassDeclaration: function ClassDeclaration(path) {
        var node = path.node;
        var ref = node.id || path.scope.generateUidIdentifier("class");
        path.replaceWith(t.variableDeclaration("let", [t.variableDeclarator(ref, t.toExpression(node))]));
      },
      ClassExpression: function ClassExpression(path, state) {
        var node = path.node;
        if (node[VISITED]) return;
        var inferred = (0, _babelHelperFunctionName2.default)(path);

        if (inferred && inferred !== node) {
          path.replaceWith(inferred);
          return;
        }

        node[VISITED] = true;
        var Constructor = _vanilla2.default;
        if (state.opts.loose) Constructor = _loose2.default;
        path.replaceWith(new Constructor(path, state.file).run());

        if (path.isCallExpression()) {
          (0, _babelHelperAnnotateAsPure2.default)(path);

          if (path.get("callee").isArrowFunctionExpression()) {
            path.get("callee").arrowFunctionToExpression();
          }
        }
      }
    }
  };
};

var _loose = require("./loose");

var _loose2 = _interopRequireDefault(_loose);

var _vanilla = require("./vanilla");

var _vanilla2 = _interopRequireDefault(_vanilla);

var _babelHelperAnnotateAsPure = require("babel-helper-annotate-as-pure");

var _babelHelperAnnotateAsPure2 = _interopRequireDefault(_babelHelperAnnotateAsPure);

var _babelHelperFunctionName = require("babel-helper-function-name");

var _babelHelperFunctionName2 = _interopRequireDefault(_babelHelperFunctionName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }