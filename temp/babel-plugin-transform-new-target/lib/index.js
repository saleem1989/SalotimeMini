"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;
  return {
    name: "transform-new-target",
    visitor: {
      MetaProperty: function MetaProperty(path) {
        var meta = path.get("meta");
        var property = path.get("property");
        var scope = path.scope;

        if (meta.isIdentifier({
          name: "new"
        }) && property.isIdentifier({
          name: "target"
        })) {
          var func = path.findParent(function (path) {
            if (path.isClass()) return true;

            if (path.isFunction() && !path.isArrowFunctionExpression()) {
              if (path.isClassMethod({
                kind: "constructor"
              })) {
                return false;
              }

              return true;
            }

            return false;
          });

          if (!func) {
            throw path.buildCodeFrameError("new.target must be under a (non-arrow) function or a class.");
          }

          var node = func.node;

          if (!node.id) {
            if (func.isMethod()) {
              path.replaceWith(scope.buildUndefinedNode());
              return;
            }

            node.id = scope.generateUidIdentifier("target");
          }

          var _constructor = t.memberExpression(t.thisExpression(), t.identifier("constructor"));

          if (func.isClass()) {
            path.replaceWith(_constructor);
            return;
          }

          path.replaceWith(t.conditionalExpression(t.binaryExpression("instanceof", t.thisExpression(), node.id), _constructor, scope.buildUndefinedNode()));
        }
      }
    }
  };
};