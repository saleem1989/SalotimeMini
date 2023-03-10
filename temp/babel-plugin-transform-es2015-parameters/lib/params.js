"use strict";

exports.__esModule = true;
exports.default = convertFunctionParams;

var _babelHelperCallDelegate = require("babel-helper-call-delegate");

var _babelHelperCallDelegate2 = _interopRequireDefault(_babelHelperCallDelegate);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildDefaultParam = (0, _babelTemplate2.default)("\n  let VARIABLE_NAME =\n    arguments.length > ARGUMENT_KEY && arguments[ARGUMENT_KEY] !== undefined ?\n      arguments[ARGUMENT_KEY]\n    :\n      DEFAULT_VALUE;\n");
var buildLooseDefaultParam = (0, _babelTemplate2.default)("\n  if (ASSIGNMENT_IDENTIFIER === UNDEFINED) {\n    ASSIGNMENT_IDENTIFIER = DEFAULT_VALUE;\n  }\n");
var buildLooseDestructuredDefaultParam = (0, _babelTemplate2.default)("\n  let ASSIGNMENT_IDENTIFIER = PARAMETER_NAME === UNDEFINED ? DEFAULT_VALUE : PARAMETER_NAME ;\n");
var buildArgumentsAccess = (0, _babelTemplate2.default)("\n  let $0 = arguments[$1];\n");

function isSafeBinding(scope, node) {
  if (!scope.hasOwnBinding(node.name)) return true;

  var _scope$getOwnBinding = scope.getOwnBinding(node.name),
      kind = _scope$getOwnBinding.kind;

  return kind === "param" || kind === "local";
}

var iifeVisitor = {
  ReferencedIdentifier: function ReferencedIdentifier(path, state) {
    var scope = path.scope,
        node = path.node;

    if (node.name === "eval" || !isSafeBinding(scope, node)) {
      state.iife = true;
      path.stop();
    }
  },
  Scope: function Scope(path) {
    path.skip();
  }
};

function convertFunctionParams(path, loose) {
  var node = path.node,
      scope = path.scope;
  var state = {
    iife: false,
    scope: scope
  };
  var body = [];
  var params = path.get("params");
  var firstOptionalIndex = null;

  for (var i = 0; i < params.length; i++) {
    var param = params[i];

    if (param.isAssignmentPattern() && loose) {
      var left = param.get("left");
      var right = param.get("right");
      var undefinedNode = scope.buildUndefinedNode();

      if (left.isIdentifier()) {
        body.push(buildLooseDefaultParam({
          ASSIGNMENT_IDENTIFIER: left.node,
          DEFAULT_VALUE: right.node,
          UNDEFINED: undefinedNode
        }));
        param.replaceWith(left.node);
      } else if (left.isObjectPattern() || left.isArrayPattern()) {
        var paramName = scope.generateUidIdentifier();
        body.push(buildLooseDestructuredDefaultParam({
          ASSIGNMENT_IDENTIFIER: left.node,
          DEFAULT_VALUE: right.node,
          PARAMETER_NAME: paramName,
          UNDEFINED: undefinedNode
        }));
        param.replaceWith(paramName);
      }
    } else if (param.isAssignmentPattern()) {
      if (firstOptionalIndex === null) firstOptionalIndex = i;

      var _left = param.get("left");

      var _right = param.get("right");

      if (!state.iife) {
        if (_right.isIdentifier() && !isSafeBinding(scope, _right.node)) {
          state.iife = true;
        } else {
          _right.traverse(iifeVisitor, state);
        }
      }

      var defNode = buildDefaultParam({
        VARIABLE_NAME: _left.node,
        DEFAULT_VALUE: _right.node,
        ARGUMENT_KEY: t.numericLiteral(i)
      });
      body.push(defNode);
    } else if (firstOptionalIndex !== null) {
      var _defNode = buildArgumentsAccess(param.node, t.numericLiteral(i));

      body.push(_defNode);
    } else if (param.isObjectPattern() || param.isArrayPattern()) {
      var uid = path.scope.generateUidIdentifier("ref");

      var _defNode2 = t.variableDeclaration("let", [t.variableDeclarator(param.node, uid)]);

      body.push(_defNode2);
      param.replaceWith(uid);
    }

    if (!state.iife && !param.isIdentifier()) {
      param.traverse(iifeVisitor, state);
    }
  }

  if (body.length === 0) return false;

  if (firstOptionalIndex !== null) {
    node.params = node.params.slice(0, firstOptionalIndex);
  }

  path.ensureBlock();

  if (state.iife) {
    body.push((0, _babelHelperCallDelegate2.default)(path, scope));
    path.set("body", t.blockStatement(body));
  } else {
    path.get("body").unshiftContainer("body", body);
  }

  return true;
}