"use strict";

exports.__esModule = true;
exports.shareCommentsWithSiblings = shareCommentsWithSiblings;
exports.addComment = addComment;
exports.addComments = addComments;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function shareCommentsWithSiblings() {
  if (typeof this.key === "string") return;
  var node = this.node;
  if (!node) return;
  var trailing = node.trailingComments;
  var leading = node.leadingComments;
  if (!trailing && !leading) return;
  var prev = this.getSibling(this.key - 1);
  var next = this.getSibling(this.key + 1);
  var hasPrev = Boolean(prev.node);
  var hasNext = Boolean(next.node);

  if (hasPrev && hasNext) {} else if (hasPrev) {
    prev.addComments("trailing", trailing);
  } else if (hasNext) {
    next.addComments("leading", leading);
  }
}

function addComment(type, content, line) {
  t.addComment(this.node, type, content, line);
}

function addComments(type, comments) {
  t.addComments(this.node, type, comments);
}