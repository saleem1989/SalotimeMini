"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;

  function variableDeclarationHasPattern(node) {
    var _arr = node.declarations;

    for (var _i = 0; _i < _arr.length; _i++) {
      var declar = _arr[_i];

      if (t.isPattern(declar.id)) {
        return true;
      }
    }

    return false;
  }

  function hasRest(pattern) {
    var _arr2 = pattern.elements;

    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var elem = _arr2[_i2];

      if (t.isRestElement(elem)) {
        return true;
      }
    }

    return false;
  }

  var arrayUnpackVisitor = {
    ReferencedIdentifier: function ReferencedIdentifier(path, state) {
      if (state.bindings[path.node.name]) {
        state.deopt = true;
        path.stop();
      }
    }
  };

  var DestructuringTransformer = function () {
    function DestructuringTransformer(opts) {
      this.blockHoist = opts.blockHoist;
      this.operator = opts.operator;
      this.arrays = {};
      this.nodes = opts.nodes || [];
      this.scope = opts.scope;
      this.file = opts.file;
      this.kind = opts.kind;
    }

    DestructuringTransformer.prototype.buildVariableAssignment = function buildVariableAssignment(id, init) {
      var op = this.operator;
      if (t.isMemberExpression(id)) op = "=";
      var node = void 0;

      if (op) {
        node = t.expressionStatement(t.assignmentExpression(op, id, init));
      } else {
        node = t.variableDeclaration(this.kind, [t.variableDeclarator(id, init)]);
      }

      node._blockHoist = this.blockHoist;
      return node;
    };

    DestructuringTransformer.prototype.buildVariableDeclaration = function buildVariableDeclaration(id, init) {
      var declar = t.variableDeclaration("var", [t.variableDeclarator(id, init)]);
      declar._blockHoist = this.blockHoist;
      return declar;
    };

    DestructuringTransformer.prototype.push = function push(id, init) {
      if (t.isObjectPattern(id)) {
        this.pushObjectPattern(id, init);
      } else if (t.isArrayPattern(id)) {
        this.pushArrayPattern(id, init);
      } else if (t.isAssignmentPattern(id)) {
        this.pushAssignmentPattern(id, init);
      } else {
        this.nodes.push(this.buildVariableAssignment(id, init));
      }
    };

    DestructuringTransformer.prototype.toArray = function toArray(node, count) {
      if (this.file.opts.loose || t.isIdentifier(node) && this.arrays[node.name]) {
        return node;
      } else {
        return this.scope.toArray(node, count);
      }
    };

    DestructuringTransformer.prototype.pushAssignmentPattern = function pushAssignmentPattern(pattern, valueRef) {
      var tempValueRef = this.scope.generateUidIdentifierBasedOnNode(valueRef);
      var declar = t.variableDeclaration("var", [t.variableDeclarator(tempValueRef, valueRef)]);
      declar._blockHoist = this.blockHoist;
      this.nodes.push(declar);
      var tempConditional = t.conditionalExpression(t.binaryExpression("===", tempValueRef, this.scope.buildUndefinedNode()), pattern.right, tempValueRef);
      var left = pattern.left;

      if (t.isPattern(left)) {
        var tempValueDefault = t.expressionStatement(t.assignmentExpression("=", tempValueRef, tempConditional));
        tempValueDefault._blockHoist = this.blockHoist;
        this.nodes.push(tempValueDefault);
        this.push(left, tempValueRef);
      } else {
        this.nodes.push(this.buildVariableAssignment(left, tempConditional));
      }
    };

    DestructuringTransformer.prototype.pushObjectRest = function pushObjectRest(pattern, objRef, spreadProp, spreadPropIndex) {
      var keys = [];

      for (var i = 0; i < pattern.properties.length; i++) {
        var prop = pattern.properties[i];
        if (i >= spreadPropIndex) break;
        if (t.isRestElement(prop)) continue;
        var key = prop.key;

        if (t.isIdentifier(key) && !prop.computed) {
          key = t.stringLiteral(prop.key.name);
        }

        keys.push(key);
      }

      keys = t.arrayExpression(keys);
      var value = t.callExpression(this.file.addHelper("objectWithoutProperties"), [objRef, keys]);
      this.nodes.push(this.buildVariableAssignment(spreadProp.argument, value));
    };

    DestructuringTransformer.prototype.pushObjectProperty = function pushObjectProperty(prop, propRef) {
      if (t.isLiteral(prop.key)) prop.computed = true;
      var pattern = prop.value;
      var objRef = t.memberExpression(propRef, prop.key, prop.computed);

      if (t.isPattern(pattern)) {
        this.push(pattern, objRef);
      } else {
        this.nodes.push(this.buildVariableAssignment(pattern, objRef));
      }
    };

    DestructuringTransformer.prototype.pushObjectPattern = function pushObjectPattern(pattern, objRef) {
      if (!pattern.properties.length) {
        this.nodes.push(t.expressionStatement(t.callExpression(this.file.addHelper("objectDestructuringEmpty"), [objRef])));
      }

      if (pattern.properties.length > 1 && !this.scope.isStatic(objRef)) {
        var temp = this.scope.generateUidIdentifierBasedOnNode(objRef);
        this.nodes.push(this.buildVariableDeclaration(temp, objRef));
        objRef = temp;
      }

      for (var i = 0; i < pattern.properties.length; i++) {
        var prop = pattern.properties[i];

        if (t.isRestElement(prop)) {
          this.pushObjectRest(pattern, objRef, prop, i);
        } else {
          this.pushObjectProperty(prop, objRef);
        }
      }
    };

    DestructuringTransformer.prototype.canUnpackArrayPattern = function canUnpackArrayPattern(pattern, arr) {
      if (!t.isArrayExpression(arr)) return false;
      if (pattern.elements.length > arr.elements.length) return;

      if (pattern.elements.length < arr.elements.length && !hasRest(pattern)) {
        return false;
      }

      var _arr3 = pattern.elements;

      for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
        var elem = _arr3[_i3];
        if (!elem) return false;
        if (t.isMemberExpression(elem)) return false;
      }

      var _arr4 = arr.elements;

      for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
        var _elem = _arr4[_i4];
        if (t.isSpreadElement(_elem)) return false;
        if (t.isCallExpression(_elem)) return false;
        if (t.isMemberExpression(_elem)) return false;
      }

      var bindings = t.getBindingIdentifiers(pattern);
      var state = {
        deopt: false,
        bindings: bindings
      };
      this.scope.traverse(arr, arrayUnpackVisitor, state);
      return !state.deopt;
    };

    DestructuringTransformer.prototype.pushUnpackedArrayPattern = function pushUnpackedArrayPattern(pattern, arr) {
      for (var i = 0; i < pattern.elements.length; i++) {
        var elem = pattern.elements[i];

        if (t.isRestElement(elem)) {
          this.push(elem.argument, t.arrayExpression(arr.elements.slice(i)));
        } else {
          this.push(elem, arr.elements[i]);
        }
      }
    };

    DestructuringTransformer.prototype.pushArrayPattern = function pushArrayPattern(pattern, arrayRef) {
      if (!pattern.elements) return;

      if (this.canUnpackArrayPattern(pattern, arrayRef)) {
        return this.pushUnpackedArrayPattern(pattern, arrayRef);
      }

      var count = !hasRest(pattern) && pattern.elements.length;
      var toArray = this.toArray(arrayRef, count);

      if (t.isIdentifier(toArray)) {
        arrayRef = toArray;
      } else {
        arrayRef = this.scope.generateUidIdentifierBasedOnNode(arrayRef);
        this.arrays[arrayRef.name] = true;
        this.nodes.push(this.buildVariableDeclaration(arrayRef, toArray));
      }

      for (var i = 0; i < pattern.elements.length; i++) {
        var elem = pattern.elements[i];
        if (!elem) continue;
        var elemRef = void 0;

        if (t.isRestElement(elem)) {
          elemRef = this.toArray(arrayRef);
          elemRef = t.callExpression(t.memberExpression(elemRef, t.identifier("slice")), [t.numericLiteral(i)]);
          elem = elem.argument;
        } else {
          elemRef = t.memberExpression(arrayRef, t.numericLiteral(i), true);
        }

        this.push(elem, elemRef);
      }
    };

    DestructuringTransformer.prototype.init = function init(pattern, ref) {
      if (!t.isArrayExpression(ref) && !t.isMemberExpression(ref)) {
        var memo = this.scope.maybeGenerateMemoised(ref, true);

        if (memo) {
          this.nodes.push(this.buildVariableDeclaration(memo, ref));
          ref = memo;
        }
      }

      this.push(pattern, ref);
      return this.nodes;
    };

    return DestructuringTransformer;
  }();

  return {
    visitor: {
      ExportNamedDeclaration: function ExportNamedDeclaration(path) {
        var declaration = path.get("declaration");
        if (!declaration.isVariableDeclaration()) return;
        if (!variableDeclarationHasPattern(declaration.node)) return;
        var specifiers = [];

        for (var name in path.getOuterBindingIdentifiers(path)) {
          var id = t.identifier(name);
          specifiers.push(t.exportSpecifier(id, id));
        }

        path.replaceWith(declaration.node);
        path.insertAfter(t.exportNamedDeclaration(null, specifiers));
      },
      ForXStatement: function ForXStatement(path, file) {
        var node = path.node,
            scope = path.scope;
        var left = node.left;

        if (t.isPattern(left)) {
          var temp = scope.generateUidIdentifier("ref");
          node.left = t.variableDeclaration("var", [t.variableDeclarator(temp)]);
          path.ensureBlock();
          node.body.body.unshift(t.variableDeclaration("var", [t.variableDeclarator(left, temp)]));
          return;
        }

        if (!t.isVariableDeclaration(left)) return;
        var pattern = left.declarations[0].id;
        if (!t.isPattern(pattern)) return;
        var key = scope.generateUidIdentifier("ref");
        node.left = t.variableDeclaration(left.kind, [t.variableDeclarator(key, null)]);
        var nodes = [];
        var destructuring = new DestructuringTransformer({
          kind: left.kind,
          file: file,
          scope: scope,
          nodes: nodes
        });
        destructuring.init(pattern, key);
        path.ensureBlock();
        var block = node.body;
        block.body = nodes.concat(block.body);
      },
      CatchClause: function CatchClause(_ref2, file) {
        var node = _ref2.node,
            scope = _ref2.scope;
        var pattern = node.param;
        if (!t.isPattern(pattern)) return;
        var ref = scope.generateUidIdentifier("ref");
        node.param = ref;
        var nodes = [];
        var destructuring = new DestructuringTransformer({
          kind: "let",
          file: file,
          scope: scope,
          nodes: nodes
        });
        destructuring.init(pattern, ref);
        node.body.body = nodes.concat(node.body.body);
      },
      AssignmentExpression: function AssignmentExpression(path, file) {
        var node = path.node,
            scope = path.scope;
        if (!t.isPattern(node.left)) return;
        var nodes = [];
        var destructuring = new DestructuringTransformer({
          operator: node.operator,
          file: file,
          scope: scope,
          nodes: nodes
        });
        var ref = void 0;

        if (path.isCompletionRecord() || !path.parentPath.isExpressionStatement()) {
          ref = scope.generateUidIdentifierBasedOnNode(node.right, "ref");
          nodes.push(t.variableDeclaration("var", [t.variableDeclarator(ref, node.right)]));

          if (t.isArrayExpression(node.right)) {
            destructuring.arrays[ref.name] = true;
          }
        }

        destructuring.init(node.left, ref || node.right);

        if (ref) {
          nodes.push(t.expressionStatement(ref));
        }

        path.replaceWithMultiple(nodes);
      },
      VariableDeclaration: function VariableDeclaration(path, file) {
        var node = path.node,
            scope = path.scope,
            parent = path.parent;
        if (t.isForXStatement(parent)) return;
        if (!parent || !path.container) return;
        if (!variableDeclarationHasPattern(node)) return;
        var nodeKind = node.kind;
        var nodes = [];
        var declar = void 0;

        for (var i = 0; i < node.declarations.length; i++) {
          declar = node.declarations[i];
          var patternId = declar.init;
          var pattern = declar.id;
          var destructuring = new DestructuringTransformer({
            blockHoist: node._blockHoist,
            nodes: nodes,
            scope: scope,
            kind: node.kind,
            file: file
          });

          if (t.isPattern(pattern)) {
            destructuring.init(pattern, patternId);

            if (+i !== node.declarations.length - 1) {
              t.inherits(nodes[nodes.length - 1], declar);
            }
          } else {
            nodes.push(t.inherits(destructuring.buildVariableAssignment(declar.id, declar.init), declar));
          }
        }

        var nodesOut = [];

        for (var _i5 = 0; _i5 < nodes.length; _i5++) {
          var _node = nodes[_i5];
          var tail = nodesOut[nodesOut.length - 1];

          if (tail && t.isVariableDeclaration(tail) && t.isVariableDeclaration(_node)) {
            var _tail$declarations;

            (_tail$declarations = tail.declarations).push.apply(_tail$declarations, _node.declarations);
          } else {
            _node.kind = nodeKind;
            nodesOut.push(_node);
          }
        }

        for (var _i6 = 0; _i6 < nodesOut.length; _i6++) {
          var nodeOut = nodesOut[_i6];
          if (!nodeOut.declarations) continue;

          for (var _iterator = nodeOut.declarations, _isArray = Array.isArray(_iterator), _i7 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray) {
              if (_i7 >= _iterator.length) break;
              _ref3 = _iterator[_i7++];
            } else {
              _i7 = _iterator.next();
              if (_i7.done) break;
              _ref3 = _i7.value;
            }

            var _declaration = _ref3;
            var name = _declaration.id.name;

            if (scope.bindings[name]) {
              scope.bindings[name].kind = nodeOut.kind;
            }
          }
        }

        if (nodesOut.length === 1) {
          path.replaceWith(nodesOut[0]);
        } else {
          path.replaceWithMultiple(nodesOut);
        }
      }
    }
  };
};