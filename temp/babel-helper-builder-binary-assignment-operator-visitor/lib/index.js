"use strict";

exports.__esModule = true;

exports.default = function (opts) {
  var build = opts.build,
      operator = opts.operator;
  return {
    AssignmentExpression: function AssignmentExpression(path) {
      var node = path.node,
          scope = path.scope;
      if (node.operator !== operator + "=") return;
      var nodes = [];
      var exploded = (0, _babelHelperExplodeAssignableExpression2.default)(node.left, nodes, this, scope);
      nodes.push(t.assignmentExpression("=", exploded.ref, build(exploded.uid, node.right)));
      path.replaceWith(t.sequenceExpression(nodes));
    },
    BinaryExpression: function BinaryExpression(path) {
      var node = path.node;

      if (node.operator === operator) {
        path.replaceWith(build(node.left, node.right));
      }
    }
  };
};

var _babelHelperExplodeAssignableExpression = require("babel-helper-explode-assignable-expression");

var _babelHelperExplodeAssignableExpression2 = _interopRequireDefault(_babelHelperExplodeAssignableExpression);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }