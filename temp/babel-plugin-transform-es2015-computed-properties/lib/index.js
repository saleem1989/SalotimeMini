"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types,
      template = _ref.template;
  var buildMutatorMapAssign = template("\n    MUTATOR_MAP_REF[KEY] = MUTATOR_MAP_REF[KEY] || {};\n    MUTATOR_MAP_REF[KEY].KIND = VALUE;\n  ");

  function getValue(prop) {
    if (t.isObjectProperty(prop)) {
      return prop.value;
    } else if (t.isObjectMethod(prop)) {
      return t.functionExpression(null, prop.params, prop.body, prop.generator, prop.async);
    }
  }

  function pushAssign(objId, prop, body) {
    if (prop.kind === "get" && prop.kind === "set") {
      pushMutatorDefine(objId, prop, body);
    } else {
      body.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(objId, prop.key, prop.computed || t.isLiteral(prop.key)), getValue(prop))));
    }
  }

  function pushMutatorDefine(_ref2, prop) {
    var body = _ref2.body,
        getMutatorId = _ref2.getMutatorId,
        scope = _ref2.scope;
    var key = !prop.computed && t.isIdentifier(prop.key) ? t.stringLiteral(prop.key.name) : prop.key;
    var maybeMemoise = scope.maybeGenerateMemoised(key);

    if (maybeMemoise) {
      body.push(t.expressionStatement(t.assignmentExpression("=", maybeMemoise, key)));
      key = maybeMemoise;
    }

    body.push.apply(body, buildMutatorMapAssign({
      MUTATOR_MAP_REF: getMutatorId(),
      KEY: key,
      VALUE: getValue(prop),
      KIND: t.identifier(prop.kind)
    }));
  }

  function loose(info) {
    for (var _iterator = info.computedProps, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref3 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref3 = _i.value;
      }

      var _prop = _ref3;

      if (_prop.kind === "get" || _prop.kind === "set") {
        pushMutatorDefine(info, _prop);
      } else {
        pushAssign(info.objId, _prop, info.body);
      }
    }
  }

  function spec(info) {
    var objId = info.objId,
        body = info.body,
        computedProps = info.computedProps,
        state = info.state;

    for (var _iterator2 = computedProps, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref4;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref4 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref4 = _i2.value;
      }

      var _prop2 = _ref4;
      var key = t.toComputedKey(_prop2);

      if (_prop2.kind === "get" || _prop2.kind === "set") {
        pushMutatorDefine(info, _prop2);
      } else if (t.isStringLiteral(key, {
        value: "__proto__"
      })) {
        pushAssign(objId, _prop2, body);
      } else {
        if (computedProps.length === 1) {
          return t.callExpression(state.addHelper("defineProperty"), [info.initPropExpression, key, getValue(_prop2)]);
        } else {
          body.push(t.expressionStatement(t.callExpression(state.addHelper("defineProperty"), [objId, key, getValue(_prop2)])));
        }
      }
    }
  }

  return {
    visitor: {
      ObjectExpression: {
        exit: function exit(path, state) {
          var node = path.node,
              parent = path.parent,
              scope = path.scope;
          var hasComputed = false;
          var _arr = node.properties;

          for (var _i3 = 0; _i3 < _arr.length; _i3++) {
            var prop = _arr[_i3];
            hasComputed = prop.computed === true;
            if (hasComputed) break;
          }

          if (!hasComputed) return;
          var initProps = [];
          var computedProps = [];
          var foundComputed = false;

          for (var _iterator3 = node.properties, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref5;

            if (_isArray3) {
              if (_i4 >= _iterator3.length) break;
              _ref5 = _iterator3[_i4++];
            } else {
              _i4 = _iterator3.next();
              if (_i4.done) break;
              _ref5 = _i4.value;
            }

            var _prop4 = _ref5;

            if (_prop4.computed) {
              foundComputed = true;
            }

            if (foundComputed) {
              computedProps.push(_prop4);
            } else {
              initProps.push(_prop4);
            }
          }

          var objId = scope.generateUidIdentifierBasedOnNode(parent);
          var initPropExpression = t.objectExpression(initProps);
          var body = [];
          body.push(t.variableDeclaration("var", [t.variableDeclarator(objId, initPropExpression)]));
          var callback = spec;
          if (state.opts.loose) callback = loose;
          var mutatorRef = void 0;

          var getMutatorId = function getMutatorId() {
            if (!mutatorRef) {
              mutatorRef = scope.generateUidIdentifier("mutatorMap");
              body.push(t.variableDeclaration("var", [t.variableDeclarator(mutatorRef, t.objectExpression([]))]));
            }

            return mutatorRef;
          };

          var single = callback({
            scope: scope,
            objId: objId,
            body: body,
            computedProps: computedProps,
            initPropExpression: initPropExpression,
            getMutatorId: getMutatorId,
            state: state
          });

          if (mutatorRef) {
            body.push(t.expressionStatement(t.callExpression(state.addHelper("defineEnumerableProperties"), [objId, mutatorRef])));
          }

          if (single) {
            path.replaceWith(single);
          } else {
            body.push(t.expressionStatement(objId));
            path.replaceWithMultiple(body);
          }
        }
      }
    }
  };
};