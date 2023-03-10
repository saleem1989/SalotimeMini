"use strict";

exports.__esModule = true;
exports.default = annotateAsPure;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var PURE_ANNOTATION = "#__PURE__";

var isPureAnnotated = function isPureAnnotated(node) {
  var leadingComments = node.leadingComments;

  if (leadingComments === undefined) {
    return false;
  }

  return leadingComments.some(function (comment) {
    return (/[@#]__PURE__/.test(comment.value)
    );
  });
};

function annotateAsPure(pathOrNode) {
  var node = pathOrNode.node || pathOrNode;

  if (isPureAnnotated(node)) {
    return;
  }

  t.addComment(node, "leading", PURE_ANNOTATION);
}