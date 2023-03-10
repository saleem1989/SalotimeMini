"use strict";

exports.__esModule = true;

var _browserslist = require("browserslist");

var _browserslist2 = _interopRequireDefault(_browserslist);

var _semver = require("semver");

var _semver2 = _interopRequireDefault(_semver);

var _utils = require("./utils");

var _normalizeOptions = require("./normalize-options");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browserNameMap = {
  android: "android",
  chrome: "chrome",
  and_chr: "chrome",
  edge: "edge",
  firefox: "firefox",
  ie: "ie",
  ios_saf: "ios",
  safari: "safari"
};

var isBrowsersQueryValid = function isBrowsersQueryValid(browsers) {
  return typeof browsers === "string" || Array.isArray(browsers);
};

var semverMin = function semverMin(first, second) {
  return first && _semver2.default.lt(first, second) ? first : second;
};

var mergeBrowsers = function mergeBrowsers(fromQuery, fromTarget) {
  return Object.keys(fromTarget).reduce(function (queryObj, targKey) {
    if (targKey !== "browsers") {
      queryObj[targKey] = fromTarget[targKey];
    }

    return queryObj;
  }, fromQuery);
};

var getLowestVersions = function getLowestVersions(browsers) {
  return browsers.reduce(function (all, browser) {
    var _browser$split = browser.split(" "),
        browserName = _browser$split[0],
        browserVersion = _browser$split[1];

    var normalizedBrowserName = browserNameMap[browserName];

    if (!normalizedBrowserName) {
      return all;
    }

    try {
      // Browser version can return as "10.0-10.2"
      var splitVersion = browserVersion.split("-")[0];
      var parsedBrowserVersion = (0, _utils.semverify)(splitVersion);
      all[normalizedBrowserName] = semverMin(all[normalizedBrowserName], parsedBrowserVersion);
    } catch (e) {}

    return all;
  }, {});
};

var outputDecimalWarning = function outputDecimalWarning(decimalTargets) {
  if (!decimalTargets || !decimalTargets.length) {
    return;
  }

  console.log("Warning, the following targets are using a decimal version:");
  console.log("");
  decimalTargets.forEach(function (_ref) {
    var target = _ref.target,
        value = _ref.value;
    return console.log(`  ${target}: ${value}`);
  });
  console.log("");
  console.log("We recommend using a string for minor/patch versions to avoid numbers like 6.10");
  console.log("getting parsed as 6.1, which can lead to unexpected behavior.");
  console.log("");
};

var targetParserMap = {
  __default: function __default(target, value) {
    return [target, (0, _utils.semverify)(value)];
  },
  // Parse `node: true` and `node: "current"` to version
  node: function node(target, value) {
    var parsed = value === true || value === "current" ? process.versions.node : (0, _utils.semverify)(value);
    return [target, parsed];
  }
};

var getTargets = function getTargets(targets, options) {
  if (targets === void 0) {
    targets = {};
  }

  if (options === void 0) {
    options = {};
  }

  var targetOpts = {}; // Parse browsers target via browserslist;

  var queryIsValid = isBrowsersQueryValid(targets.browsers);
  var browsersquery = queryIsValid ? targets.browsers : null;

  if (queryIsValid || !options.ignoreBrowserslistConfig) {
    _browserslist2.default.defaults = (0, _normalizeOptions.objectToBrowserslist)(targets);
    var browsers = (0, _browserslist2.default)(browsersquery, {
      path: options.configPath
    });
    var queryBrowsers = getLowestVersions(browsers);
    targets = mergeBrowsers(queryBrowsers, targets);
  } // Parse remaining targets


  var parsed = Object.keys(targets).sort().reduce(function (results, target) {
    if (target !== "browsers") {
      var value = targets[target]; // Warn when specifying minor/patch as a decimal

      if (typeof value === "number" && value % 1 !== 0) {
        results.decimalWarnings.push({
          target,
          value
        });
      } // Check if we have a target parser?


      var parser = targetParserMap[target] || targetParserMap.__default;

      var _parser = parser(target, value),
          parsedTarget = _parser[0],
          parsedValue = _parser[1];

      if (parsedValue) {
        // Merge (lowest wins)
        results.targets[parsedTarget] = parsedValue;
      }
    }

    return results;
  }, {
    targets: targetOpts,
    decimalWarnings: []
  });
  outputDecimalWarning(parsed.decimalWarnings);
  return parsed.targets;
};

exports.default = getTargets;