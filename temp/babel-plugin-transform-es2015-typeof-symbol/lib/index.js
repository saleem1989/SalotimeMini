"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;
  return {
    visitor: {
      Scope: function Scope(_ref2) {
        var scope = _ref2.scope;

        if (!scope.getBinding("Symbol")) {
          return;
        }

        scope.rename("Symbol");
      },
      UnaryExpression: function UnaryExpression(path) {
        var node = path.node,
            parent = path.parent;
        if (node.operator !== "typeof") return;

        if (path.parentPath.isBinaryExpression() && t.EQUALITY_BINARY_OPERATORS.indexOf(parent.operator) >= 0) {
          var opposite = path.getOpposite();

          if (opposite.isLiteral() && opposite.node.value !== "symbol" && opposite.node.value !== "object") {
            return;
          }
        }

        var helper = this.addHelper("typeof");
        var isUnderHelper = path.findParent(function (path) {
          return path.isVariableDeclarator() && path.node.id === helper || path.isFunctionDeclaration() && path.node.id.name === helper.name;
        });

        if (isUnderHelper) {
          return;
        }

        var call = t.callExpression(helper, [node.argument]);
        var arg = path.get("argument");

        if (arg.isIdentifier() && !path.scope.hasBinding(arg.node.name)) {
          var undefLiteral = t.stringLiteral("undefined");
          var unary = t.unaryExpression("typeof", node.argument);
          path.replaceWith(t.conditionalExpression(t.binaryExpression("===", unary, undefLiteral), undefLiteral, call));
        } else {
          path.replaceWith(call);
        }
      }
    }
  };
};