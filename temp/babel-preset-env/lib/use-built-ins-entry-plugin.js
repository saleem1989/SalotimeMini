"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;

  function createImportDeclaration(polyfill) {
    var declar = t.importDeclaration([], t.stringLiteral(polyfill));
    declar._blockHoist = 3;
    return declar;
  }

  function createRequireStatement(polyfill) {
    return t.expressionStatement(t.callExpression(t.identifier("require"), [t.stringLiteral(polyfill)]));
  }

  function isRequire(path) {
    return t.isExpressionStatement(path.node) && t.isCallExpression(path.node.expression) && t.isIdentifier(path.node.expression.callee) && path.node.expression.callee.name === "require" && path.node.expression.arguments.length === 1 && t.isStringLiteral(path.node.expression.arguments[0]) && isPolyfillSource(path.node.expression.arguments[0].value);
  }

  function createImport(polyfill, requireType, core) {
    if (core) {
      polyfill = `babel-polyfill/lib/core-js/modules/${polyfill}`;
    }

    if (requireType === "import") {
      return createImportDeclaration(polyfill);
    }

    return createRequireStatement(polyfill);
  }

  function createImports(polyfills, requireType, regenerator) {
    var items = Array.isArray(polyfills) ? new Set(polyfills) : polyfills;
    var imports = [];
    items.forEach(function (p) {
      return imports.push(createImport(p, requireType, true));
    });

    if (regenerator) {
      imports.push(createImport("babel-polyfill/lib/regenerator-runtime/runtime", requireType));
    }

    return imports;
  }

  var isPolyfillImport = {
    ImportDeclaration(path, state) {
      if (path.node.specifiers.length === 0 && isPolyfillSource(path.node.source.value)) {
        this.importPolyfillIncluded = true;
        path.replaceWithMultiple(createImports(state.opts.polyfills, "import", state.opts.regenerator));
      }
    },

    Program(path, state) {
      path.get("body").forEach(function (bodyPath) {
        if (isRequire(bodyPath)) {
          bodyPath.replaceWithMultiple(createImports(state.opts.polyfills, "require", state.opts.regenerator));
        }
      });
    }

  };
  return {
    name: "transform-polyfill-require",
    visitor: isPolyfillImport,

    pre() {
      this.numPolyfillImports = 0;
      this.importPolyfillIncluded = false;
    },

    post() {
      var _opts = this.opts,
          debug = _opts.debug,
          onDebug = _opts.onDebug,
          polyfills = _opts.polyfills;

      if (debug) {
        (0, _debug.logEntryPolyfills)(this.importPolyfillIncluded, polyfills, this.file.opts.filename, onDebug);
      }
    }

  };
};

var _debug = require("./debug");

function isPolyfillSource(value) {
  return value === "babel-polyfill";
}