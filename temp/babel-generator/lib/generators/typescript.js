"use strict";

exports.__esModule = true;
exports.TSTypeAnnotation = TSTypeAnnotation;
exports.TSTypeParameterInstantiation = TSTypeParameterInstantiation;
exports.TSTypeParameter = TSTypeParameter;
exports.TSParameterProperty = TSParameterProperty;
exports.TSDeclareFunction = TSDeclareFunction;
exports.TSDeclareMethod = TSDeclareMethod;
exports.TSQualifiedName = TSQualifiedName;
exports.TSCallSignatureDeclaration = TSCallSignatureDeclaration;
exports.TSConstructSignatureDeclaration = TSConstructSignatureDeclaration;
exports.TSPropertySignature = TSPropertySignature;
exports.tsPrintPropertyOrMethodName = tsPrintPropertyOrMethodName;
exports.TSMethodSignature = TSMethodSignature;
exports.TSIndexSignature = TSIndexSignature;
exports.TSAnyKeyword = TSAnyKeyword;
exports.TSNumberKeyword = TSNumberKeyword;
exports.TSObjectKeyword = TSObjectKeyword;
exports.TSBooleanKeyword = TSBooleanKeyword;
exports.TSStringKeyword = TSStringKeyword;
exports.TSSymbolKeyword = TSSymbolKeyword;
exports.TSVoidKeyword = TSVoidKeyword;
exports.TSUndefinedKeyword = TSUndefinedKeyword;
exports.TSNullKeyword = TSNullKeyword;
exports.TSNeverKeyword = TSNeverKeyword;
exports.TSThisType = TSThisType;
exports.TSFunctionType = TSFunctionType;
exports.TSConstructorType = TSConstructorType;
exports.tsPrintFunctionOrConstructorType = tsPrintFunctionOrConstructorType;
exports.TSTypeReference = TSTypeReference;
exports.TSTypePredicate = TSTypePredicate;
exports.TSTypeQuery = TSTypeQuery;
exports.TSTypeLiteral = TSTypeLiteral;
exports.tsPrintTypeLiteralOrInterfaceBody = tsPrintTypeLiteralOrInterfaceBody;
exports.tsPrintBraced = tsPrintBraced;
exports.TSArrayType = TSArrayType;
exports.TSTupleType = TSTupleType;
exports.TSUnionType = TSUnionType;
exports.TSIntersectionType = TSIntersectionType;
exports.tsPrintUnionOrIntersectionType = tsPrintUnionOrIntersectionType;
exports.TSParenthesizedType = TSParenthesizedType;
exports.TSTypeOperator = TSTypeOperator;
exports.TSIndexedAccessType = TSIndexedAccessType;
exports.TSMappedType = TSMappedType;
exports.TSLiteralType = TSLiteralType;
exports.TSExpressionWithTypeArguments = TSExpressionWithTypeArguments;
exports.TSInterfaceDeclaration = TSInterfaceDeclaration;
exports.TSInterfaceBody = TSInterfaceBody;
exports.TSTypeAliasDeclaration = TSTypeAliasDeclaration;
exports.TSAsExpression = TSAsExpression;
exports.TSTypeAssertion = TSTypeAssertion;
exports.TSEnumDeclaration = TSEnumDeclaration;
exports.TSEnumMember = TSEnumMember;
exports.TSModuleDeclaration = TSModuleDeclaration;
exports.TSModuleBlock = TSModuleBlock;
exports.TSImportEqualsDeclaration = TSImportEqualsDeclaration;
exports.TSExternalModuleReference = TSExternalModuleReference;
exports.TSNonNullExpression = TSNonNullExpression;
exports.TSExportAssignment = TSExportAssignment;
exports.TSNamespaceExportDeclaration = TSNamespaceExportDeclaration;
exports.tsPrintSignatureDeclarationBase = tsPrintSignatureDeclarationBase;

function TSTypeAnnotation(node) {
  this.token(":");
  this.space();
  if (node.optional) this.token("?");
  this.print(node.typeAnnotation, node);
}

function TSTypeParameterInstantiation(node) {
  this.token("<");
  this.printList(node.params, node, {});
  this.token(">");
}

exports.TSTypeParameterDeclaration = TSTypeParameterInstantiation;

function TSTypeParameter(node) {
  this.word(node.name);

  if (node.constraint) {
    this.space();
    this.word("extends");
    this.space();
    this.print(node.constraint, node);
  }

  if (node.default) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.default, node);
  }
}

function TSParameterProperty(node) {
  if (node.accessibility) {
    this.word(node.accessibility);
    this.space();
  }

  if (node.readonly) {
    this.word("readonly");
    this.space();
  }

  this._param(node.parameter);
}

function TSDeclareFunction(node) {
  if (node.declare) {
    this.word("declare");
    this.space();
  }

  this._functionHead(node);

  this.token(";");
}

function TSDeclareMethod(node) {
  this._classMethodHead(node);

  this.token(";");
}

function TSQualifiedName(node) {
  this.print(node.left, node);
  this.token(".");
  this.print(node.right, node);
}

function TSCallSignatureDeclaration(node) {
  this.tsPrintSignatureDeclarationBase(node);
}

function TSConstructSignatureDeclaration(node) {
  this.word("new");
  this.space();
  this.tsPrintSignatureDeclarationBase(node);
}

function TSPropertySignature(node) {
  var readonly = node.readonly,
      initializer = node.initializer;

  if (readonly) {
    this.word("readonly");
    this.space();
  }

  this.tsPrintPropertyOrMethodName(node);
  this.print(node.typeAnnotation, node);

  if (initializer) {
    this.space();
    this.token("=");
    this.space();
    this.print(initializer, node);
  }

  this.token(";");
}

function tsPrintPropertyOrMethodName(node) {
  if (node.computed) {
    this.token("[");
  }

  this.print(node.key, node);

  if (node.computed) {
    this.token("]");
  }

  if (node.optional) {
    this.token("?");
  }
}

function TSMethodSignature(node) {
  this.tsPrintPropertyOrMethodName(node);
  this.tsPrintSignatureDeclarationBase(node);
  this.token(";");
}

function TSIndexSignature(node) {
  var readonly = node.readonly;

  if (readonly) {
    this.word("readonly");
    this.space();
  }

  this.token("[");

  this._parameters(node.parameters, node);

  this.token("]");
  this.print(node.typeAnnotation, node);
  this.token(";");
}

function TSAnyKeyword() {
  this.word("any");
}

function TSNumberKeyword() {
  this.word("number");
}

function TSObjectKeyword() {
  this.word("object");
}

function TSBooleanKeyword() {
  this.word("boolean");
}

function TSStringKeyword() {
  this.word("string");
}

function TSSymbolKeyword() {
  this.word("symbol");
}

function TSVoidKeyword() {
  this.word("void");
}

function TSUndefinedKeyword() {
  this.word("undefined");
}

function TSNullKeyword() {
  this.word("null");
}

function TSNeverKeyword() {
  this.word("never");
}

function TSThisType() {
  this.word("this");
}

function TSFunctionType(node) {
  this.tsPrintFunctionOrConstructorType(node);
}

function TSConstructorType(node) {
  this.word("new");
  this.space();
  this.tsPrintFunctionOrConstructorType(node);
}

function tsPrintFunctionOrConstructorType(node) {
  var typeParameters = node.typeParameters,
      parameters = node.parameters;
  this.print(typeParameters, node);
  this.token("(");

  this._parameters(parameters, node);

  this.token(")");
  this.space();
  this.token("=>");
  this.space();
  this.print(node.typeAnnotation.typeAnnotation, node);
}

function TSTypeReference(node) {
  this.print(node.typeName, node);
  this.print(node.typeParameters, node);
}

function TSTypePredicate(node) {
  this.print(node.parameterName);
  this.space();
  this.word("is");
  this.space();
  this.print(node.typeAnnotation.typeAnnotation);
}

function TSTypeQuery(node) {
  this.word("typeof");
  this.space();
  this.print(node.exprName);
}

function TSTypeLiteral(node) {
  this.tsPrintTypeLiteralOrInterfaceBody(node.members, node);
}

function tsPrintTypeLiteralOrInterfaceBody(members, node) {
  this.tsPrintBraced(members, node);
}

function tsPrintBraced(members, node) {
  this.token("{");

  if (members.length) {
    this.indent();
    this.newline();

    for (var _iterator = members, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var _member = _ref;
      this.print(_member, node);
      this.newline();
    }

    this.dedent();
    this.rightBrace();
  } else {
    this.token("}");
  }
}

function TSArrayType(node) {
  this.print(node.elementType);
  this.token("[]");
}

function TSTupleType(node) {
  this.token("[");
  this.printList(node.elementTypes, node);
  this.token("]");
}

function TSUnionType(node) {
  this.tsPrintUnionOrIntersectionType(node, "|");
}

function TSIntersectionType(node) {
  this.tsPrintUnionOrIntersectionType(node, "&");
}

function tsPrintUnionOrIntersectionType(node, sep) {
  this.printJoin(node.types, node, {
    separator: function separator() {
      this.space();
      this.token(sep);
      this.space();
    }
  });
}

function TSParenthesizedType(node) {
  this.token("(");
  this.print(node.typeAnnotation, node);
  this.token(")");
}

function TSTypeOperator(node) {
  this.token(node.operator);
  this.space();
  this.print(node.typeAnnotation, node);
}

function TSIndexedAccessType(node) {
  this.print(node.objectType, node);
  this.token("[");
  this.print(node.indexType, node);
  this.token("]");
}

function TSMappedType(node) {
  var readonly = node.readonly,
      typeParameter = node.typeParameter,
      optional = node.optional;
  this.token("{");
  this.space();

  if (readonly) {
    this.word("readonly");
    this.space();
  }

  this.token("[");
  this.word(typeParameter.name);
  this.space();
  this.word("in");
  this.space();
  this.print(typeParameter.constraint, typeParameter);
  this.token("]");

  if (optional) {
    this.token("?");
  }

  this.token(":");
  this.space();
  this.print(node.typeAnnotation, node);
  this.space();
  this.token("}");
}

function TSLiteralType(node) {
  this.print(node.literal, node);
}

function TSExpressionWithTypeArguments(node) {
  this.print(node.expression, node);
  this.print(node.typeParameters, node);
}

function TSInterfaceDeclaration(node) {
  var declare = node.declare,
      id = node.id,
      typeParameters = node.typeParameters,
      extendz = node.extends,
      body = node.body;

  if (declare) {
    this.word("declare");
    this.space();
  }

  this.word("interface");
  this.space();
  this.print(id, node);
  this.print(typeParameters, node);

  if (extendz) {
    this.space();
    this.word("extends");
    this.space();
    this.printList(extendz, node);
  }

  this.space();
  this.print(body, node);
}

function TSInterfaceBody(node) {
  this.tsPrintTypeLiteralOrInterfaceBody(node.body, node);
}

function TSTypeAliasDeclaration(node) {
  var declare = node.declare,
      id = node.id,
      typeParameters = node.typeParameters,
      typeAnnotation = node.typeAnnotation;

  if (declare) {
    this.word("declare");
    this.space();
  }

  this.word("type");
  this.space();
  this.print(id, node);
  this.print(typeParameters, node);
  this.space();
  this.token("=");
  this.space();
  this.print(typeAnnotation, node);
  this.token(";");
}

function TSAsExpression(node) {
  var expression = node.expression,
      typeAnnotation = node.typeAnnotation;
  this.print(expression, node);
  this.space();
  this.word("as");
  this.space();
  this.print(typeAnnotation, node);
}

function TSTypeAssertion(node) {
  var typeAnnotation = node.typeAnnotation,
      expression = node.expression;
  this.token("<");
  this.print(typeAnnotation, node);
  this.token(">");
  this.space();
  this.print(expression, node);
}

function TSEnumDeclaration(node) {
  var declare = node.declare,
      isConst = node.const,
      id = node.id,
      members = node.members;

  if (declare) {
    this.word("declare");
    this.space();
  }

  if (isConst) {
    this.word("const");
    this.space();
  }

  this.word("enum");
  this.space();
  this.print(id, node);
  this.space();
  this.tsPrintBraced(members, node);
}

function TSEnumMember(node) {
  var id = node.id,
      initializer = node.initializer;
  this.print(id, node);

  if (initializer) {
    this.space();
    this.token("=");
    this.space();
    this.print(initializer, node);
  }

  this.token(",");
}

function TSModuleDeclaration(node) {
  var declare = node.declare,
      id = node.id;

  if (declare) {
    this.word("declare");
    this.space();
  }

  if (!node.global) {
    this.word(id.type === "Identifier" ? "namespace" : "module");
    this.space();
  }

  this.print(id, node);

  if (!node.body) {
    this.token(";");
    return;
  }

  var body = node.body;

  while (body.type === "TSModuleDeclaration") {
    this.token(".");
    this.print(body.id, body);
    body = body.body;
  }

  this.space();
  this.print(body, node);
}

function TSModuleBlock(node) {
  this.tsPrintBraced(node.body, node);
}

function TSImportEqualsDeclaration(node) {
  var isExport = node.isExport,
      id = node.id,
      moduleReference = node.moduleReference;

  if (isExport) {
    this.word("export");
    this.space();
  }

  this.word("import");
  this.space();
  this.print(id, node);
  this.space();
  this.token("=");
  this.space();
  this.print(moduleReference, node);
  this.token(";");
}

function TSExternalModuleReference(node) {
  this.token("require(");
  this.print(node.expression, node);
  this.token(")");
}

function TSNonNullExpression(node) {
  this.print(node.expression, node);
  this.token("!");
}

function TSExportAssignment(node) {
  this.word("export");
  this.space();
  this.token("=");
  this.space();
  this.print(node.expression, node);
  this.token(";");
}

function TSNamespaceExportDeclaration(node) {
  this.word("export");
  this.space();
  this.word("as");
  this.space();
  this.word("namespace");
  this.space();
  this.print(node.id, node);
}

function tsPrintSignatureDeclarationBase(node) {
  var typeParameters = node.typeParameters,
      parameters = node.parameters;
  this.print(typeParameters, node);
  this.token("(");

  this._parameters(parameters, node);

  this.token(")");
  this.print(node.typeAnnotation, node);
}