"use strict";

exports.__esModule = true;
exports.ClassExpression = undefined;
exports.ClassDeclaration = ClassDeclaration;
exports.ClassBody = ClassBody;
exports.ClassProperty = ClassProperty;
exports.ClassMethod = ClassMethod;
exports._classMethodHead = _classMethodHead;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function ClassDeclaration(node, parent) {
  if (!t.isExportDefaultDeclaration(parent) && !t.isExportNamedDeclaration(parent)) {
    this.printJoin(node.decorators, node);
  }

  if (node.declare) {
    this.word("declare");
    this.space();
  }

  if (node.abstract) {
    this.word("abstract");
    this.space();
  }

  this.word("class");

  if (node.id) {
    this.space();
    this.print(node.id, node);
  }

  this.print(node.typeParameters, node);

  if (node.superClass) {
    this.space();
    this.word("extends");
    this.space();
    this.print(node.superClass, node);
    this.print(node.superTypeParameters, node);
  }

  if (node.implements) {
    this.space();
    this.word("implements");
    this.space();
    this.printList(node.implements, node);
  }

  this.space();
  this.print(node.body, node);
}

exports.ClassExpression = ClassDeclaration;

function ClassBody(node) {
  this.token("{");
  this.printInnerComments(node);

  if (node.body.length === 0) {
    this.token("}");
  } else {
    this.newline();
    this.indent();
    this.printSequence(node.body, node);
    this.dedent();
    if (!this.endsWith("\n")) this.newline();
    this.rightBrace();
  }
}

function ClassProperty(node) {
  this.printJoin(node.decorators, node);

  if (node.accessibility) {
    this.word(node.accessibility);
    this.space();
  }

  if (node.static) {
    this.word("static");
    this.space();
  }

  if (node.abstract) {
    this.word("abstract");
    this.space();
  }

  if (node.readonly) {
    this.word("readonly");
    this.space();
  }

  if (node.computed) {
    this.token("[");
    this.print(node.key, node);
    this.token("]");
  } else {
    this._variance(node);

    this.print(node.key, node);
  }

  if (node.optional) {
    this.token("?");
  }

  this.print(node.typeAnnotation, node);

  if (node.value) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.value, node);
  }

  this.semicolon();
}

function ClassMethod(node) {
  this._classMethodHead(node);

  this.space();
  this.print(node.body, node);
}

function _classMethodHead(node) {
  this.printJoin(node.decorators, node);

  if (node.accessibility) {
    this.word(node.accessibility);
    this.space();
  }

  if (node.abstract) {
    this.word("abstract");
    this.space();
  }

  if (node.static) {
    this.word("static");
    this.space();
  }

  this._methodHead(node);
}