"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;
  return {
    visitor: {
      Program: {
        exit: function exit(path, state) {
          if (!(0, _babelHelperModuleTransforms.isModule)(path)) return;
          var _state$opts = state.opts,
              loose = _state$opts.loose,
              allowTopLevelThis = _state$opts.allowTopLevelThis,
              strict = _state$opts.strict,
              strictMode = _state$opts.strictMode,
              noInterop = _state$opts.noInterop;
          var moduleName = this.getModuleName();
          if (moduleName) moduleName = t.stringLiteral(moduleName);

          var _rewriteModuleStateme = (0, _babelHelperModuleTransforms.rewriteModuleStatementsAndPrepareHeader)(path, {
            loose: loose,
            strict: strict,
            strictMode: strictMode,
            allowTopLevelThis: allowTopLevelThis,
            noInterop: noInterop
          }),
              meta = _rewriteModuleStateme.meta,
              headers = _rewriteModuleStateme.headers;

          var amdArgs = [];
          var commonjsArgs = [];
          var importNames = [];

          if ((0, _babelHelperModuleTransforms.hasExports)(meta)) {
            amdArgs.push(t.stringLiteral("exports"));
            commonjsArgs.push(t.identifier("exports"));
            importNames.push(t.identifier(meta.exportName));
          }

          for (var _iterator = meta.source, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref3 = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref3 = _i.value;
            }

            var _ref4 = _ref3;
            var _source = _ref4[0];
            var _metadata = _ref4[1];
            amdArgs.push(t.stringLiteral(_source));
            commonjsArgs.push(t.callExpression(t.identifier("require"), [t.stringLiteral(_source)]));
            importNames.push(t.identifier(_metadata.name));

            if (!(0, _babelHelperModuleTransforms.isSideEffectImport)(_metadata)) {
              var interop = (0, _babelHelperModuleTransforms.wrapInterop)(path, t.identifier(_metadata.name), _metadata.interop);

              if (interop) {
                var header = t.expressionStatement(t.assignmentExpression("=", t.identifier(_metadata.name), interop));
                header.loc = _metadata.loc;
                headers.push(header);
              }
            }

            headers.push.apply(headers, (0, _babelHelperModuleTransforms.buildNamespaceInitStatements)(meta, _metadata));
          }

          (0, _babelHelperModuleTransforms.ensureStatementsHoisted)(headers);
          path.unshiftContainer("body", headers);
          var _path$node = path.node,
              body = _path$node.body,
              directives = _path$node.directives;
          path.node.directives = [];
          path.node.body = [];
          var amdWrapper = path.pushContainer("body", [buildWrapper({
            MODULE_NAME: moduleName,
            AMD_ARGUMENTS: t.arrayExpression(amdArgs),
            COMMONJS_ARGUMENTS: commonjsArgs,
            IMPORT_NAMES: importNames
          })])[0];
          var amdFactory = amdWrapper.get("expression.arguments").filter(function (arg) {
            return arg.isFunctionExpression();
          })[0].get("body");
          amdFactory.pushContainer("directives", directives);
          amdFactory.pushContainer("body", body);
        }
      }
    }
  };
};

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelHelperModuleTransforms = require("babel-helper-module-transforms");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildWrapper = (0, _babelTemplate2.default)("\n  define(MODULE_NAME, AMD_ARGUMENTS, function(IMPORT_NAMES) {\n  })\n");