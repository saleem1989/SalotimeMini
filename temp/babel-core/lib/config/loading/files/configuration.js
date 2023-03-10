"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.findConfigs = findConfigs;
exports.loadConfig = loadConfig;

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _json = require("json5");

var _json2 = _interopRequireDefault(_json);

var _resolve = require("resolve");

var _resolve2 = _interopRequireDefault(_resolve);

var _environment = require("../../helpers/environment");

var _caching = require("../../caching");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)("babel:config:loading:files:configuration");
var BABELRC_FILENAME = ".babelrc";
var BABELRC_JS_FILENAME = ".babelrc.js";
var PACKAGE_FILENAME = "package.json";
var BABELIGNORE_FILENAME = ".babelignore";

function findConfigs(dirname) {
  var foundConfig = false;
  var foundIgnore = false;
  var confs = [];
  var loc = dirname;

  while (true) {
    if (!foundIgnore) {
      var ignoreLoc = _path2.default.join(loc, BABELIGNORE_FILENAME);

      var ignore = readIgnoreConfig(ignoreLoc);

      if (ignore) {
        debug("Found ignore %o from %o.", ignore.filepath, dirname);
        confs.push(ignore);
        foundIgnore = true;
      }
    }

    if (!foundConfig) {
      var conf = [BABELRC_FILENAME, BABELRC_JS_FILENAME, PACKAGE_FILENAME].reduce(function (previousConfig, name) {
        var filepath = _path2.default.join(loc, name);

        var config = readConfig(filepath);

        if (config && previousConfig) {
          throw new Error("Multiple configuration files found. Please remove one:\n- " + _path2.default.basename(previousConfig.filepath) + "\n- " + name + "\nfrom " + loc);
        }

        return config || previousConfig;
      }, null);

      if (conf) {
        debug("Found configuration %o from %o.", conf.filepath, dirname);
        confs.push(conf);
        foundConfig = true;
      }
    }

    if (foundIgnore && foundConfig) break;
    if (loc === _path2.default.dirname(loc)) break;
    loc = _path2.default.dirname(loc);
  }

  return confs;
}

function loadConfig(name, dirname) {
  var filepath = _resolve2.default.sync(name, {
    basedir: dirname
  });

  var conf = readConfig(filepath);

  if (!conf) {
    throw new Error("Config file " + filepath + " contains no configuration data");
  }

  debug("Loaded config %o from $o.", name, dirname);
  return conf;
}

function readConfig(filepath) {
  return _path2.default.extname(filepath) === ".js" ? readConfigJS(filepath) : readConfigFile(filepath);
}

var LOADING_CONFIGS = new Set();
var readConfigJS = (0, _caching.makeStrongCache)(function (filepath, cache) {
  if (!_fs2.default.existsSync(filepath)) {
    cache.forever();
    return null;
  }

  if (LOADING_CONFIGS.has(filepath)) {
    cache.never();
    debug("Auto-ignoring usage of config %o.", filepath);
    return {
      filepath: filepath,
      dirname: _path2.default.dirname(filepath),
      options: {}
    };
  }

  var options = void 0;

  try {
    LOADING_CONFIGS.add(filepath);

    var configModule = require(filepath);

    options = configModule && configModule.__esModule ? configModule.default || undefined : configModule;
  } catch (err) {
    err.message = filepath + ": Error while loading config - " + err.message;
    throw err;
  } finally {
    LOADING_CONFIGS.delete(filepath);
  }

  if (typeof options === "function") {
    options = options({
      cache: cache,
      env: function env() {
        return cache.using(function () {
          return (0, _environment.getEnv)();
        });
      }
    });
  } else {
    cache.forever();
  }

  if (!options || _typeof(options) !== "object" || Array.isArray(options)) {
    throw new Error(filepath + ": Configuration should be an exported JavaScript object.");
  }

  return {
    filepath: filepath,
    dirname: _path2.default.dirname(filepath),
    options: options
  };
}, false);
var readConfigFile = makeStaticFileCache(function (filepath, content) {
  var options = void 0;

  if (_path2.default.basename(filepath) === PACKAGE_FILENAME) {
    try {
      options = JSON.parse(content).babel;
    } catch (err) {
      err.message = filepath + ": Error while parsing JSON - " + err.message;
      throw err;
    }

    if (!options) return null;
  } else {
    try {
      options = _json2.default.parse(content);
    } catch (err) {
      err.message = filepath + ": Error while parsing config - " + err.message;
      throw err;
    }

    if (!options) throw new Error(filepath + ": No config detected");
  }

  if (_typeof(options) !== "object") {
    throw new Error(filepath + ": Config returned typeof " + _typeof(options));
  }

  if (Array.isArray(options)) {
    throw new Error(filepath + ": Expected config object but found array");
  }

  return {
    filepath: filepath,
    dirname: _path2.default.dirname(filepath),
    options: options
  };
});
var readIgnoreConfig = makeStaticFileCache(function (filepath, content) {
  var ignore = content.split("\n").map(function (line) {
    return line.replace(/#(.*?)$/, "").trim();
  }).filter(function (line) {
    return !!line;
  });
  return {
    filepath: filepath,
    dirname: _path2.default.dirname(filepath),
    options: {
      ignore: ignore
    }
  };
});

function makeStaticFileCache(fn) {
  return (0, _caching.makeStrongCache)(function (filepath, cache) {
    if (cache.invalidate(function () {
      return fileMtime(filepath);
    }) === null) {
      cache.forever();
      return null;
    }

    return fn(filepath, _fs2.default.readFileSync(filepath, "utf8"));
  });
}

function fileMtime(filepath) {
  try {
    return +_fs2.default.statSync(filepath).mtime;
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
  }

  return null;
}