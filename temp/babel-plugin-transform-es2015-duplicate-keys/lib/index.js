"use strict";

exports.__esModule = true;

exports.default = function () {
  return {
    visitor: {
      ObjectExpression: function ObjectExpression(path) {
        var node = path.node;
        var plainProps = node.properties.filter(function (prop) {
          return !t.isSpreadElement(prop) && !prop.computed;
        });
        var alreadySeenData = Object.create(null);
        var alreadySeenGetters = Object.create(null);
        var alreadySeenSetters = Object.create(null);

        for (var _iterator = plainProps, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var _prop = _ref;
          var name = getName(_prop.key);
          var isDuplicate = false;

          switch (_prop.kind) {
            case "get":
              if (alreadySeenData[name] || alreadySeenGetters[name]) {
                isDuplicate = true;
              }

              alreadySeenGetters[name] = true;
              break;

            case "set":
              if (alreadySeenData[name] || alreadySeenSetters[name]) {
                isDuplicate = true;
              }

              alreadySeenSetters[name] = true;
              break;

            default:
              if (alreadySeenData[name] || alreadySeenGetters[name] || alreadySeenSetters[name]) {
                isDuplicate = true;
              }

              alreadySeenData[name] = true;
          }

          if (isDuplicate) {
            _prop.computed = true;
            _prop.key = t.stringLiteral(name);
          }
        }
      }
    }
  };
};

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function getName(key) {
  if (t.isIdentifier(key)) {
    return key.name;
  }

  return key.value.toString();
}