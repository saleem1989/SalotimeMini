"use strict";

exports.__esModule = true;
exports.resolvePlugin = resolvePlugin;
exports.resolvePreset = resolvePreset;
exports.loadPlugin = loadPlugin;
exports.loadPreset = loadPreset;
exports.loadParser = loadParser;
exports.loadGenerator = loadGenerator;

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _resolve = require("resolve");

var _resolve2 = _interopRequireDefault(_resolve);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)("babel:config:loading:files:plugins");
var EXACT_RE = /^module:/;
var BABEL_PLUGIN_PREFIX_RE = /^(?!@|module:|[^/]+\/|babel-plugin-)/;
var BABEL_PRESET_PREFIX_RE = /^(?!@|module:|[^/]+\/|babel-preset-)/;
var BABEL_PLUGIN_ORG_RE = /^(@babel\/)(?!plugin-|[^/]+\/)/;
var BABEL_PRESET_ORG_RE = /^(@babel\/)(?!preset-|[^/]+\/)/;
var OTHER_PLUGIN_ORG_RE = /^(@(?!babel\/)[^/]+\/)(?!babel-plugin-|[^/]+\/)/;
var OTHER_PRESET_ORG_RE = /^(@(?!babel\/)[^/]+\/)(?!babel-preset-|[^/]+\/)/;

function resolvePlugin(name, dirname) {
  return resolveStandardizedName("plugin", name, dirname);
}

function resolvePreset(name, dirname) {
  return resolveStandardizedName("preset", name, dirname);
}

function loadPlugin(name, dirname) {
  var filepath = resolvePlugin(name, dirname);

  if (!filepath) {
    throw new Error("Plugin " + name + " not found relative to " + dirname);
  }

  var value = requireModule("plugin", filepath);
  debug("Loaded plugin %o from %o.", name, dirname);
  return {
    filepath: filepath,
    value: value
  };
}

function loadPreset(name, dirname) {
  var filepath = resolvePreset(name, dirname);

  if (!filepath) {
    throw new Error("Preset " + name + " not found relative to " + dirname);
  }

  var value = requireModule("preset", filepath);
  debug("Loaded preset %o from %o.", name, dirname);
  return {
    filepath: filepath,
    value: value
  };
}

function loadParser(name, dirname) {
  var filepath = _resolve2.default.sync(name, {
    basedir: dirname
  });

  var mod = requireModule("parser", filepath);

  if (!mod) {
    throw new Error("Parser " + name + " relative to " + dirname + " does not export an object");
  }

  if (typeof mod.parse !== "function") {
    throw new Error("Parser " + name + " relative to " + dirname + " does not export a .parse function");
  }

  var value = mod.parse;
  debug("Loaded parser %o from %o.", name, dirname);
  return {
    filepath: filepath,
    value: value
  };
}

function loadGenerator(name, dirname) {
  var filepath = _resolve2.default.sync(name, {
    basedir: dirname
  });

  var mod = requireModule("generator", filepath);

  if (!mod) {
    throw new Error("Generator " + name + " relative to " + dirname + " does not export an object");
  }

  if (typeof mod.print !== "function") {
    throw new Error("Generator " + name + " relative to " + dirname + " does not export a .print function");
  }

  var value = mod.print;
  debug("Loaded generator %o from %o.", name, dirname);
  return {
    filepath: filepath,
    value: value
  };
}

function standardizeName(type, name) {
  if (_path2.default.isAbsolute(name)) return name;
  var isPreset = type === "preset";
  return name.replace(isPreset ? BABEL_PRESET_PREFIX_RE : BABEL_PLUGIN_PREFIX_RE, "babel-" + type + "-").replace(isPreset ? BABEL_PRESET_ORG_RE : BABEL_PLUGIN_ORG_RE, "$1" + type + "-").replace(isPreset ? OTHER_PRESET_ORG_RE : OTHER_PLUGIN_ORG_RE, "$1babel-" + type + "-").replace(EXACT_RE, "");
}

function resolveStandardizedName(type, name, dirname) {
  if (dirname === void 0) {
    dirname = process.cwd();
  }

  var standardizedName = standardizeName(type, name);

  try {
    return _resolve2.default.sync(standardizedName, {
      basedir: dirname
    });
  } catch (e) {
    if (e.code !== "MODULE_NOT_FOUND") throw e;

    if (standardizedName !== name) {
      var resolvedOriginal = false;

      try {
        _resolve2.default.sync(name, {
          basedir: dirname
        });

        resolvedOriginal = true;
      } catch (e2) {}

      if (resolvedOriginal) {
        e.message += "\n- If you want to resolve \"" + name + "\", use \"module:" + name + "\"";
      }
    }

    var resolvedBabel = false;

    try {
      _resolve2.default.sync(standardizeName(type, "@babel/" + name), {
        basedir: dirname
      });

      resolvedBabel = true;
    } catch (e2) {}

    if (resolvedBabel) {
      e.message += "\n- Did you mean \"@babel/" + name + "\"?";
    }

    var resolvedOppositeType = false;
    var oppositeType = type === "preset" ? "plugin" : "preset";

    try {
      _resolve2.default.sync(standardizeName(oppositeType, name), {
        basedir: dirname
      });

      resolvedOppositeType = true;
    } catch (e2) {}

    if (resolvedOppositeType) {
      e.message += "\n- Did you accidentally pass a " + type + " as a " + oppositeType + "?";
    }

    throw e;
  }
}

var LOADING_MODULES = new Set();

function requireModule(type, name) {
  if (LOADING_MODULES.has(name)) {
    throw new Error("Reentrant " + type + " detected trying to load \"" + name + "\". This module is not ignored and is trying to load itself while compiling itself, leading to a dependency cycle. We recommend adding it to your \"ignore\" list in your babelrc, or to a .babelignore.");
  }

  try {
    LOADING_MODULES.add(name);
    return require(name);
  } finally {
    LOADING_MODULES.delete(name);
  }
}