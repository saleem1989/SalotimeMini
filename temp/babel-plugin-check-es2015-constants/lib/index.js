"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var messages = _ref.messages,
      t = _ref.types;

  function statementBeforeExpression(statement, expression) {
    return t.sequenceExpression([t.callExpression(t.functionExpression(null, [], t.blockStatement([statement])), []), expression]);
  }

  return {
    visitor: {
      Scope: function Scope(_ref2) {
        var scope = _ref2.scope;

        for (var name in scope.bindings) {
          var binding = scope.bindings[name];
          if (binding.kind !== "const") continue;
          var _arr = binding.constantViolations;

          for (var _i = 0; _i < _arr.length; _i++) {
            var violation = _arr[_i];
            var throwNode = t.throwStatement(t.newExpression(t.identifier("Error"), [t.stringLiteral(messages.get("readOnly", name))]));

            if (violation.isAssignmentExpression()) {
              violation.get("right").replaceWith(statementBeforeExpression(throwNode, violation.get("right").node));
            } else if (violation.isUpdateExpression()) {
              violation.replaceWith(statementBeforeExpression(throwNode, violation.node));
            } else if (violation.isForXStatement()) {
              violation.ensureBlock();
              violation.node.body.body.unshift(throwNode);
            }
          }
        }
      }
    }
  };
};