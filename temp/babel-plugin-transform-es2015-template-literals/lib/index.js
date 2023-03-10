"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;

  function buildConcatCallExressions(items) {
    var avail = true;
    return items.reduce(function (left, right) {
      var canBeInserted = t.isLiteral(right);

      if (!canBeInserted && avail) {
        canBeInserted = true;
        avail = false;
      }

      if (canBeInserted && t.isCallExpression(left)) {
        left.arguments.push(right);
        return left;
      }

      return t.callExpression(t.memberExpression(left, t.identifier("concat")), [right]);
    });
  }

  return {
    pre: function pre() {
      this.templates = new Map();
    },
    visitor: {
      TaggedTemplateExpression: function TaggedTemplateExpression(path, state) {
        var node = path.node;
        var quasi = node.quasi;
        var strings = [];
        var raws = [];
        var _arr = quasi.quasis;

        for (var _i = 0; _i < _arr.length; _i++) {
          var elem = _arr[_i];
          var _elem$value = elem.value,
              raw = _elem$value.raw,
              cooked = _elem$value.cooked;
          var value = cooked == null ? path.scope.buildUndefinedNode() : t.stringLiteral(cooked);
          strings.push(value);
          raws.push(t.stringLiteral(raw));
        }

        var helperName = "taggedTemplateLiteral";
        if (state.opts.loose) helperName += "Loose";
        var rawParts = raws.map(function (s) {
          return s.value;
        }).join(",");
        var name = helperName + "_" + raws.length + "_" + rawParts;
        var templateObject = this.templates.get(name);

        if (templateObject) {
          templateObject = t.clone(templateObject);
        } else {
          var programPath = path.find(function (p) {
            return p.isProgram();
          });
          templateObject = programPath.scope.generateUidIdentifier("templateObject");
          this.templates.set(name, templateObject);
          var helperId = this.addHelper(helperName);
          var init = t.callExpression(helperId, [t.arrayExpression(strings), t.arrayExpression(raws)]);
          init._compact = true;
          programPath.scope.push({
            id: templateObject,
            init: init,
            _blockHoist: 1.9
          });
        }

        path.replaceWith(t.callExpression(node.tag, [templateObject].concat(quasi.expressions)));
      },
      TemplateLiteral: function TemplateLiteral(path, state) {
        var nodes = [];
        var expressions = path.get("expressions");
        var index = 0;
        var _arr2 = path.node.quasis;

        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
          var elem = _arr2[_i2];

          if (elem.value.cooked) {
            nodes.push(t.stringLiteral(elem.value.cooked));
          }

          if (index < expressions.length) {
            var expr = expressions[index++];
            var node = expr.node;

            if (!t.isStringLiteral(node, {
              value: ""
            })) {
              nodes.push(node);
            }
          }
        }

        var considerSecondNode = !state.opts.loose || !t.isStringLiteral(nodes[1]);

        if (!t.isStringLiteral(nodes[0]) && considerSecondNode) {
          nodes.unshift(t.stringLiteral(""));
        }

        var root = nodes[0];

        if (state.opts.loose) {
          for (var i = 1; i < nodes.length; i++) {
            root = t.binaryExpression("+", root, nodes[i]);
          }
        } else if (nodes.length > 1) {
          root = buildConcatCallExressions(nodes);
        }

        path.replaceWith(root);
      }
    }
  };
};