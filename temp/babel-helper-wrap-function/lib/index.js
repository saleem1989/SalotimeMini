"use strict";

exports.__esModule = true;
exports.default = wrapFunction;

var _babelHelperFunctionName = require("babel-helper-function-name");

var _babelHelperFunctionName2 = _interopRequireDefault(_babelHelperFunctionName);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildWrapper = (0, _babelTemplate2.default)("\n  (() => {\n    var REF = FUNCTION;\n    return function NAME(PARAMS) {\n      return REF.apply(this, arguments);\n    };\n  })\n");
var namedBuildWrapper = (0, _babelTemplate2.default)("\n  (() => {\n    var REF = FUNCTION;\n    function NAME(PARAMS) {\n      return REF.apply(this, arguments);\n    }\n    return NAME;\n  })\n");

function classOrObjectMethod(path, callId) {
  var node = path.node;
  var body = node.body;
  var container = t.functionExpression(null, [], t.blockStatement(body.body), true);
  body.body = [t.returnStatement(t.callExpression(t.callExpression(callId, [container]), []))];
  node.async = false;
  node.generator = false;
  path.get("body.body.0.argument.callee.arguments.0").unwrapFunctionEnvironment();
}

function plainFunction(path, callId) {
  var node = path.node;
  var isDeclaration = path.isFunctionDeclaration();
  var functionId = node.id;
  var wrapper = buildWrapper;

  if (path.isArrowFunctionExpression()) {
    path.arrowFunctionToExpression();
  } else if (!isDeclaration && functionId) {
    wrapper = namedBuildWrapper;
  }

  node.id = null;

  if (isDeclaration) {
    node.type = "FunctionExpression";
  }

  var built = t.callExpression(callId, [node]);
  var container = wrapper({
    NAME: functionId || null,
    REF: path.scope.generateUidIdentifier("ref"),
    FUNCTION: built,
    PARAMS: node.params.reduce(function (acc, param) {
      acc.done = acc.done || t.isAssignmentPattern(param) || t.isRestElement(param);

      if (!acc.done) {
        acc.params.push(path.scope.generateUidIdentifier("x"));
      }

      return acc;
    }, {
      params: [],
      done: false
    }).params
  }).expression;

  if (isDeclaration && functionId) {
    var declar = t.variableDeclaration("let", [t.variableDeclarator(t.identifier(functionId.name), t.callExpression(container, []))]);
    declar._blockHoist = true;

    if (path.parentPath.isExportDefaultDeclaration()) {
      path.parentPath.insertBefore(declar);
      path.parentPath.replaceWith(t.exportNamedDeclaration(null, [t.exportSpecifier(t.identifier(functionId.name), t.identifier("default"))]));
      return;
    }

    path.replaceWith(declar);
  } else {
    var retFunction = container.body.body[1].argument;

    if (!functionId) {
      (0, _babelHelperFunctionName2.default)({
        node: retFunction,
        parent: path.parent,
        scope: path.scope
      });
    }

    if (!retFunction || retFunction.id || node.params.length) {
      path.replaceWith(t.callExpression(container, []));
    } else {
      path.replaceWith(built);
    }
  }
}

function wrapFunction(path, callId) {
  if (path.isClassMethod() || path.isObjectMethod()) {
    classOrObjectMethod(path, callId);
  } else {
    plainFunction(path, callId);
  }
}