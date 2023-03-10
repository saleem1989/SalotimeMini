"use strict";

exports.__esModule = true;
exports.default = convertFunctionRest;

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildRest = (0, _babelTemplate2.default)("\n  for (var LEN = ARGUMENTS.length,\n           ARRAY = new Array(ARRAY_LEN),\n           KEY = START;\n       KEY < LEN;\n       KEY++) {\n    ARRAY[ARRAY_KEY] = ARGUMENTS[KEY];\n  }\n");
var restIndex = (0, _babelTemplate2.default)("\n  (INDEX < OFFSET || ARGUMENTS.length <= INDEX) ? undefined : ARGUMENTS[INDEX]\n");
var restIndexImpure = (0, _babelTemplate2.default)("\n  REF = INDEX, (REF < OFFSET || ARGUMENTS.length <= REF) ? undefined : ARGUMENTS[REF]\n");
var restLength = (0, _babelTemplate2.default)("\n  ARGUMENTS.length <= OFFSET ? 0 : ARGUMENTS.length - OFFSET\n");

function referencesRest(path, state) {
  if (path.node.name === state.name) {
    return path.scope.bindingIdentifierEquals(state.name, state.outerBinding);
  }

  return false;
}

var memberExpressionOptimisationVisitor = {
  Scope: function Scope(path, state) {
    if (!path.scope.bindingIdentifierEquals(state.name, state.outerBinding)) {
      path.skip();
    }
  },
  Flow: function Flow(path) {
    if (path.isTypeCastExpression()) return;
    path.skip();
  },
  "Function|ClassProperty": function FunctionClassProperty(path, state) {
    var oldNoOptimise = state.noOptimise;
    state.noOptimise = true;
    path.traverse(memberExpressionOptimisationVisitor, state);
    state.noOptimise = oldNoOptimise;
    path.skip();
  },
  ReferencedIdentifier: function ReferencedIdentifier(path, state) {
    var node = path.node;

    if (node.name === "arguments") {
      state.deopted = true;
    }

    if (!referencesRest(path, state)) return;

    if (state.noOptimise) {
      state.deopted = true;
    } else {
      var parentPath = path.parentPath;

      if (parentPath.listKey === "params" && parentPath.key < state.offset) {
        return;
      }

      if (parentPath.isMemberExpression({
        object: node
      })) {
        var grandparentPath = parentPath.parentPath;
        var argsOptEligible = !state.deopted && !(grandparentPath.isAssignmentExpression() && parentPath.node === grandparentPath.node.left || grandparentPath.isLVal() || grandparentPath.isForXStatement() || grandparentPath.isUpdateExpression() || grandparentPath.isUnaryExpression({
          operator: "delete"
        }) || (grandparentPath.isCallExpression() || grandparentPath.isNewExpression()) && parentPath.node === grandparentPath.node.callee);

        if (argsOptEligible) {
          if (parentPath.node.computed) {
            if (parentPath.get("property").isBaseType("number")) {
              state.candidates.push({
                cause: "indexGetter",
                path: path
              });
              return;
            }
          } else if (parentPath.node.property.name === "length") {
            state.candidates.push({
              cause: "lengthGetter",
              path: path
            });
            return;
          }
        }
      }

      if (state.offset === 0 && parentPath.isSpreadElement()) {
        var call = parentPath.parentPath;

        if (call.isCallExpression() && call.node.arguments.length === 1) {
          state.candidates.push({
            cause: "argSpread",
            path: path
          });
          return;
        }
      }

      state.references.push(path);
    }
  },
  BindingIdentifier: function BindingIdentifier(path, state) {
    if (referencesRest(path, state)) {
      state.deopted = true;
    }
  }
};

function hasRest(node) {
  return t.isRestElement(node.params[node.params.length - 1]);
}

function optimiseIndexGetter(path, argsId, offset) {
  var offsetLiteral = t.numericLiteral(offset);
  var index = void 0;

  if (t.isNumericLiteral(path.parent.property)) {
    index = t.numericLiteral(path.parent.property.value + offset);
  } else if (offset === 0) {
    index = path.parent.property;
  } else {
    index = t.binaryExpression("+", path.parent.property, offsetLiteral);
  }

  var scope = path.scope;

  if (!scope.isPure(index)) {
    var temp = scope.generateUidIdentifierBasedOnNode(index);
    scope.push({
      id: temp,
      kind: "var"
    });
    path.parentPath.replaceWith(restIndexImpure({
      ARGUMENTS: argsId,
      OFFSET: offsetLiteral,
      INDEX: index,
      REF: temp
    }));
  } else {
    var parentPath = path.parentPath;
    parentPath.replaceWith(restIndex({
      ARGUMENTS: argsId,
      OFFSET: offsetLiteral,
      INDEX: index
    }));
    var offsetTestPath = parentPath.get("test").get("left");
    var valRes = offsetTestPath.evaluate();

    if (valRes.confident) {
      if (valRes.value === true) {
        parentPath.replaceWith(parentPath.scope.buildUndefinedNode());
      } else {
        parentPath.get("test").replaceWith(parentPath.get("test").get("right"));
      }
    }
  }
}

function optimiseLengthGetter(path, argsId, offset) {
  if (offset) {
    path.parentPath.replaceWith(restLength({
      ARGUMENTS: argsId,
      OFFSET: t.numericLiteral(offset)
    }));
  } else {
    path.replaceWith(argsId);
  }
}

function convertFunctionRest(path) {
  var node = path.node,
      scope = path.scope;
  if (!hasRest(node)) return false;
  var rest = node.params.pop().argument;
  var argsId = t.identifier("arguments");
  var state = {
    references: [],
    offset: node.params.length,
    argumentsNode: argsId,
    outerBinding: scope.getBindingIdentifier(rest.name),
    candidates: [],
    name: rest.name,
    deopted: false
  };
  path.traverse(memberExpressionOptimisationVisitor, state);

  if (!state.deopted && !state.references.length) {
    var _arr = state.candidates;

    for (var _i = 0; _i < _arr.length; _i++) {
      var _ref = _arr[_i];
      var _path = _ref.path,
          cause = _ref.cause;

      switch (cause) {
        case "indexGetter":
          optimiseIndexGetter(_path, argsId, state.offset);
          break;

        case "lengthGetter":
          optimiseLengthGetter(_path, argsId, state.offset);
          break;

        default:
          _path.replaceWith(argsId);

      }
    }

    return true;
  }

  state.references = state.references.concat(state.candidates.map(function (_ref2) {
    var path = _ref2.path;
    return path;
  }));
  var start = t.numericLiteral(node.params.length);
  var key = scope.generateUidIdentifier("key");
  var len = scope.generateUidIdentifier("len");
  var arrKey = key;
  var arrLen = len;

  if (node.params.length) {
    arrKey = t.binaryExpression("-", key, start);
    arrLen = t.conditionalExpression(t.binaryExpression(">", len, start), t.binaryExpression("-", len, start), t.numericLiteral(0));
  }

  var loop = buildRest({
    ARGUMENTS: argsId,
    ARRAY_KEY: arrKey,
    ARRAY_LEN: arrLen,
    START: start,
    ARRAY: rest,
    KEY: key,
    LEN: len
  });

  if (state.deopted) {
    node.body.body.unshift(loop);
  } else {
    var target = path.getEarliestCommonAncestorFrom(state.references).getStatementParent();
    target.findParent(function (path) {
      if (path.isLoop()) {
        target = path;
      } else {
        return path.isFunction();
      }
    });
    target.insertBefore(loop);
  }

  return true;
}