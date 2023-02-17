/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getCompilerFacade } from '../../compiler/compiler_facade';
import { resolveForwardRef } from '../../di/forward_ref';
import { compileInjectable } from '../../di/jit/injectable';
import { getReflect, reflectDependencies } from '../../di/jit/util';
import { componentNeedsResolution, maybeQueueResolutionOfComponentResources } from '../../metadata/resource_loading';
import { ViewEncapsulation } from '../../metadata/view';
import { getBaseDef, getComponentDef, getDirectiveDef } from '../definition';
import { EMPTY_ARRAY, EMPTY_OBJ } from '../empty';
import { NG_BASE_DEF, NG_COMPONENT_DEF, NG_DIRECTIVE_DEF } from '../fields';
import { stringifyForError } from '../util/misc_utils';
import { angularCoreEnv } from './environment';
import { flushModuleScopingQueueAsMuchAsPossible, patchComponentDefWithScope, transitiveScopesFor } from './module';
/**
 * Compile an Angular component according to its decorator metadata, and patch the resulting
 * ngComponentDef onto the component type.
 *
 * Compilation may be asynchronous (due to the need to resolve URLs for the component template or
 * other resources, for example). In the event that compilation is not immediate, `compileComponent`
 * will enqueue resource resolution into a global queue and will fail to return the `ngComponentDef`
 * until the global queue has been resolved with a call to `resolveComponentResources`.
 * @param {?} type
 * @param {?} metadata
 * @return {?}
 */
export function compileComponent(type, metadata) {
    /** @type {?} */
    /** @nocollapse */ let ngComponentDef = null;
    // Metadata may have resources which need to be resolved.
    maybeQueueResolutionOfComponentResources(type, metadata);
    Object.defineProperty(type, NG_COMPONENT_DEF, {
        get: (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const compiler = getCompilerFacade();
            if (ngComponentDef === null) {
                if (componentNeedsResolution(metadata)) {
                    /** @type {?} */
                    const error = [`Component '${type.name}' is not resolved:`];
                    if (metadata.templateUrl) {
                        error.push(` - templateUrl: ${metadata.templateUrl}`);
                    }
                    if (metadata.styleUrls && metadata.styleUrls.length) {
                        error.push(` - styleUrls: ${JSON.stringify(metadata.styleUrls)}`);
                    }
                    error.push(`Did you run and wait for 'resolveComponentResources()'?`);
                    throw new Error(error.join('\n'));
                }
                /** @type {?} */
                const templateUrl = metadata.templateUrl || `ng:///${type.name}/template.html`;
                /** @type {?} */
                const meta = Object.assign({}, directiveMetadata(type, metadata), { typeSourceSpan: compiler.createParseSourceSpan('Component', type.name, templateUrl), template: metadata.template || '', preserveWhitespaces: metadata.preserveWhitespaces || false, styles: metadata.styles || EMPTY_ARRAY, animations: metadata.animations, directives: [], changeDetection: metadata.changeDetection, pipes: new Map(), encapsulation: metadata.encapsulation || ViewEncapsulation.Emulated, interpolation: metadata.interpolation, viewProviders: metadata.viewProviders || null });
                if (meta.usesInheritance) {
                    addBaseDefToUndecoratedParents(type);
                }
                ngComponentDef = compiler.compileComponent(angularCoreEnv, templateUrl, meta);
                // When NgModule decorator executed, we enqueued the module definition such that
                // it would only dequeue and add itself as module scope to all of its declarations,
                // but only if  if all of its declarations had resolved. This call runs the check
                // to see if any modules that are in the queue can be dequeued and add scope to
                // their declarations.
                flushModuleScopingQueueAsMuchAsPossible();
                // If component compilation is async, then the @NgModule annotation which declares the
                // component may execute and set an ngSelectorScope property on the component type. This
                // allows the component to patch itself with directiveDefs from the module after it
                // finishes compiling.
                if (hasSelectorScope(type)) {
                    /** @type {?} */
                    const scopes = transitiveScopesFor(type.ngSelectorScope);
                    patchComponentDefWithScope(ngComponentDef, scopes);
                }
            }
            return ngComponentDef;
        }),
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
    // Add ngInjectableDef so components are reachable through the module injector by default
    // This is mostly to support injecting components in tests. In real application code,
    // components should be retrieved through the node injector, so this isn't a problem.
    compileInjectable(type);
}
/**
 * @template T
 * @param {?} component
 * @return {?}
 */
function hasSelectorScope(component) {
    return ((/** @type {?} */ (component))).ngSelectorScope !== undefined;
}
/**
 * Compile an Angular directive according to its decorator metadata, and patch the resulting
 * ngDirectiveDef onto the component type.
 *
 * In the event that compilation is not immediate, `compileDirective` will return a `Promise` which
 * will resolve when compilation completes and the directive becomes usable.
 * @param {?} type
 * @param {?} directive
 * @return {?}
 */
export function compileDirective(type, directive) {
    /** @type {?} */
    /** @nocollapse */ let ngDirectiveDef = null;
    Object.defineProperty(type, NG_DIRECTIVE_DEF, {
        get: (/**
         * @return {?}
         */
        () => {
            if (ngDirectiveDef === null) {
                /** @type {?} */
                const name = type && type.name;
                /** @type {?} */
                const sourceMapUrl = `ng:///${name}/ngDirectiveDef.js`;
                /** @type {?} */
                const compiler = getCompilerFacade();
                /** @type {?} */
                const facade = directiveMetadata((/** @type {?} */ (type)), directive);
                facade.typeSourceSpan = compiler.createParseSourceSpan('Directive', name, sourceMapUrl);
                if (facade.usesInheritance) {
                    addBaseDefToUndecoratedParents(type);
                }
                ngDirectiveDef = compiler.compileDirective(angularCoreEnv, sourceMapUrl, facade);
            }
            return ngDirectiveDef;
        }),
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
    // Add ngInjectableDef so directives are reachable through the module injector by default
    // This is mostly to support injecting directives in tests. In real application code,
    // directives should be retrieved through the node injector, so this isn't a problem.
    compileInjectable(type);
}
/**
 * @param {?} type
 * @return {?}
 */
export function extendsDirectlyFromObject(type) {
    return Object.getPrototypeOf(type.prototype) === Object.prototype;
}
/**
 * Extract the `R3DirectiveMetadata` for a particular directive (either a `Directive` or a
 * `Component`).
 * @param {?} type
 * @param {?} metadata
 * @return {?}
 */
export function directiveMetadata(type, metadata) {
    // Reflect inputs and outputs.
    /** @type {?} */
    const propMetadata = getReflect().ownPropMetadata(type);
    return {
        name: type.name,
        type: type,
        typeArgumentCount: 0,
        selector: (/** @type {?} */ (metadata.selector)),
        deps: reflectDependencies(type),
        host: metadata.host || EMPTY_OBJ,
        propMetadata: propMetadata,
        inputs: metadata.inputs || EMPTY_ARRAY,
        outputs: metadata.outputs || EMPTY_ARRAY,
        queries: extractQueriesMetadata(type, propMetadata, isContentQuery),
        lifecycle: { usesOnChanges: type.prototype.hasOwnProperty('ngOnChanges') },
        typeSourceSpan: (/** @type {?} */ (null)),
        usesInheritance: !extendsDirectlyFromObject(type),
        exportAs: extractExportAs(metadata.exportAs),
        providers: metadata.providers || null,
        viewQueries: extractQueriesMetadata(type, propMetadata, isViewQuery),
    };
}
/**
 * Adds an `ngBaseDef` to all parent classes of a type that don't have an Angular decorator.
 * @param {?} type
 * @return {?}
 */
function addBaseDefToUndecoratedParents(type) {
    /** @type {?} */
    const objPrototype = Object.prototype;
    /** @type {?} */
    let parent = Object.getPrototypeOf(type);
    // Go up the prototype until we hit `Object`.
    while (parent && parent !== objPrototype) {
        // Since inheritance works if the class was annotated already, we only need to add
        // the base def if there are no annotations and the base def hasn't been created already.
        if (!getDirectiveDef(parent) && !getComponentDef(parent) && !getBaseDef(parent)) {
            /** @type {?} */
            const facade = extractBaseDefMetadata(parent);
            facade && compileBase(parent, facade);
        }
        parent = Object.getPrototypeOf(parent);
    }
}
/**
 * Compiles the base metadata into a base definition.
 * @param {?} type
 * @param {?} facade
 * @return {?}
 */
function compileBase(type, facade) {
    /** @type {?} */
    /** @nocollapse */ let ngBaseDef = null;
    Object.defineProperty(type, NG_BASE_DEF, {
        get: (/**
         * @return {?}
         */
        () => {
            if (ngBaseDef === null) {
                /** @type {?} */
                const name = type && type.name;
                /** @type {?} */
                const sourceMapUrl = `ng://${name}/ngBaseDef.js`;
                /** @type {?} */
                const compiler = getCompilerFacade();
                ngBaseDef = compiler.compileBase(angularCoreEnv, sourceMapUrl, facade);
            }
            return ngBaseDef;
        }),
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
}
/**
 * Extracts the metadata necessary to construct an `ngBaseDef` from a class.
 * @param {?} type
 * @return {?}
 */
function extractBaseDefMetadata(type) {
    /** @type {?} */
    const propMetadata = getReflect().ownPropMetadata(type);
    /** @type {?} */
    const viewQueries = extractQueriesMetadata(type, propMetadata, isViewQuery);
    /** @type {?} */
    const queries = extractQueriesMetadata(type, propMetadata, isContentQuery);
    /** @type {?} */
    let inputs;
    /** @type {?} */
    let outputs;
    for (const field in propMetadata) {
        propMetadata[field].forEach((/**
         * @param {?} ann
         * @return {?}
         */
        ann => {
            if (ann.ngMetadataName === 'Input') {
                inputs = inputs || {};
                inputs[field] = ann.bindingPropertyName ? [ann.bindingPropertyName, field] : field;
            }
            else if (ann.ngMetadataName === 'Output') {
                outputs = outputs || {};
                outputs[field] = ann.bindingPropertyName || field;
            }
        }));
    }
    // Only generate the base def if there's any info inside it.
    if (inputs || outputs || viewQueries.length || queries.length) {
        return { inputs, outputs, viewQueries, queries };
    }
    return null;
}
/**
 * @param {?} selector
 * @return {?}
 */
function convertToR3QueryPredicate(selector) {
    return typeof selector === 'string' ? splitByComma(selector) : resolveForwardRef(selector);
}
/**
 * @param {?} propertyName
 * @param {?} ann
 * @return {?}
 */
export function convertToR3QueryMetadata(propertyName, ann) {
    return {
        propertyName: propertyName,
        predicate: convertToR3QueryPredicate(ann.selector),
        descendants: ann.descendants,
        first: ann.first,
        read: ann.read ? ann.read : null,
        static: !!ann.static
    };
}
/**
 * @param {?} type
 * @param {?} propMetadata
 * @param {?} isQueryAnn
 * @return {?}
 */
function extractQueriesMetadata(type, propMetadata, isQueryAnn) {
    /** @type {?} */
    const queriesMeta = [];
    for (const field in propMetadata) {
        if (propMetadata.hasOwnProperty(field)) {
            /** @type {?} */
            const annotations = propMetadata[field];
            annotations.forEach((/**
             * @param {?} ann
             * @return {?}
             */
            ann => {
                if (isQueryAnn(ann)) {
                    if (!ann.selector) {
                        throw new Error(`Can't construct a query for the property "${field}" of ` +
                            `"${stringifyForError(type)}" since the query selector wasn't defined.`);
                    }
                    if (annotations.some(isInputAnn)) {
                        throw new Error(`Cannot combine @Input decorators with query decorators`);
                    }
                    queriesMeta.push(convertToR3QueryMetadata(field, ann));
                }
            }));
        }
    }
    return queriesMeta;
}
/**
 * @param {?} exportAs
 * @return {?}
 */
function extractExportAs(exportAs) {
    if (exportAs === undefined) {
        return null;
    }
    return exportAs.split(',').map((/**
     * @param {?} part
     * @return {?}
     */
    part => part.trim()));
}
/**
 * @param {?} value
 * @return {?}
 */
function isContentQuery(value) {
    /** @type {?} */
    const name = value.ngMetadataName;
    return name === 'ContentChild' || name === 'ContentChildren';
}
/**
 * @param {?} value
 * @return {?}
 */
function isViewQuery(value) {
    /** @type {?} */
    const name = value.ngMetadataName;
    return name === 'ViewChild' || name === 'ViewChildren';
}
/**
 * @param {?} value
 * @return {?}
 */
function isInputAnn(value) {
    return value.ngMetadataName === 'Input';
}
/**
 * @param {?} value
 * @return {?}
 */
function splitByComma(value) {
    return value.split(',').map((/**
     * @param {?} piece
     * @return {?}
     */
    piece => piece.trim()));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9qaXQvZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUE0QixpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBRTVGLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzFELE9BQU8sRUFBQyxVQUFVLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUlsRSxPQUFPLEVBQUMsd0JBQXdCLEVBQUUsd0NBQXdDLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDaEQsT0FBTyxFQUFDLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUUxRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBQyx1Q0FBdUMsRUFBRSwwQkFBMEIsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLFVBQVUsQ0FBQzs7Ozs7Ozs7Ozs7OztBQWFsSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsSUFBZSxFQUFFLFFBQW1COztRQUMvRCxjQUFjLEdBQVEsSUFBSTtJQUM5Qix5REFBeUQ7SUFDekQsd0NBQXdDLENBQUMsSUFB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aWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UjNEaXJlY3RpdmVNZXRhZGF0YUZhY2FkZSwgZ2V0Q29tcGlsZXJGYWNhZGV9IGZyb20gJy4uLy4uL2NvbXBpbGVyL2NvbXBpbGVyX2ZhY2FkZSc7XG5pbXBvcnQge1IzQmFzZU1ldGFkYXRhRmFjYWRlLCBSM0NvbXBvbmVudE1ldGFkYXRhRmFjYWRlLCBSM1F1ZXJ5TWV0YWRhdGFGYWNhZGV9IGZyb20gJy4uLy4uL2NvbXBpbGVyL2NvbXBpbGVyX2ZhY2FkZV9pbnRlcmZhY2UnO1xuaW1wb3J0IHtyZXNvbHZlRm9yd2FyZFJlZn0gZnJvbSAnLi4vLi4vZGkvZm9yd2FyZF9yZWYnO1xuaW1wb3J0IHtjb21waWxlSW5qZWN0YWJsZX0gZnJvbSAnLi4vLi4vZGkvaml0L2luamVjdGFibGUnO1xuaW1wb3J0IHtnZXRSZWZsZWN0LCByZWZsZWN0RGVwZW5kZW5jaWVzfSBmcm9tICcuLi8uLi9kaS9qaXQvdXRpbCc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS90eXBlJztcbmltcG9ydCB7UXVlcnl9IGZyb20gJy4uLy4uL21ldGFkYXRhL2RpJztcbmltcG9ydCB7Q29tcG9uZW50LCBEaXJlY3RpdmUsIElucHV0fSBmcm9tICcuLi8uLi9tZXRhZGF0YS9kaXJlY3RpdmVzJztcbmltcG9ydCB7Y29tcG9uZW50TmVlZHNSZXNvbHV0aW9uLCBtYXliZVF1ZXVlUmVzb2x1dGlvbk9mQ29tcG9uZW50UmVzb3VyY2VzfSBmcm9tICcuLi8uLi9tZXRhZGF0YS9yZXNvdXJjZV9sb2FkaW5nJztcbmltcG9ydCB7Vmlld0VuY2Fwc3VsYXRpb259IGZyb20gJy4uLy4uL21ldGFkYXRhL3ZpZXcnO1xuaW1wb3J0IHtnZXRCYXNlRGVmLCBnZXRDb21wb25lbnREZWYsIGdldERpcmVjdGl2ZURlZn0gZnJvbSAnLi4vZGVmaW5pdGlvbic7XG5pbXBvcnQge0VNUFRZX0FSUkFZLCBFTVBUWV9PQkp9IGZyb20gJy4uL2VtcHR5JztcbmltcG9ydCB7TkdfQkFTRV9ERUYsIE5HX0NPTVBPTkVOVF9ERUYsIE5HX0RJUkVDVElWRV9ERUZ9IGZyb20gJy4uL2ZpZWxkcyc7XG5pbXBvcnQge0NvbXBvbmVudFR5cGV9IGZyb20gJy4uL2ludGVyZmFjZXMvZGVmaW5pdGlvbic7XG5pbXBvcnQge3N0cmluZ2lmeUZvckVycm9yfSBmcm9tICcuLi91dGlsL21pc2NfdXRpbHMnO1xuXG5pbXBvcnQge2FuZ3VsYXJDb3JlRW52fSBmcm9tICcuL2Vudmlyb25tZW50JztcbmltcG9ydCB7Zmx1c2hNb2R1bGVTY29waW5nUXVldWVBc011Y2hBc1Bvc3NpYmxlLCBwYXRjaENvbXBvbmVudERlZldpdGhTY29wZSwgdHJhbnNpdGl2ZVNjb3Blc0Zvcn0gZnJvbSAnLi9tb2R1bGUnO1xuXG5cblxuLyoqXG4gKiBDb21waWxlIGFuIEFuZ3VsYXIgY29tcG9uZW50IGFjY29yZGluZyB0byBpdHMgZGVjb3JhdG9yIG1ldGFkYXRhLCBhbmQgcGF0Y2ggdGhlIHJlc3VsdGluZ1xuICogbmdDb21wb25lbnREZWYgb250byB0aGUgY29tcG9uZW50IHR5cGUuXG4gKlxuICogQ29tcGlsYXRpb24gbWF5IGJlIGFzeW5jaHJvbm91cyAoZHVlIHRvIHRoZSBuZWVkIHRvIHJlc29sdmUgVVJMcyBmb3IgdGhlIGNvbXBvbmVudCB0ZW1wbGF0ZSBvclxuICogb3RoZXIgcmVzb3VyY2VzLCBmb3IgZXhhbXBsZSkuIEluIHRoZSBldmVudCB0aGF0IGNvbXBpbGF0aW9uIGlzIG5vdCBpbW1lZGlhdGUsIGBjb21waWxlQ29tcG9uZW50YFxuICogd2lsbCBlbnF1ZXVlIHJlc291cmNlIHJlc29sdXRpb24gaW50byBhIGdsb2JhbCBxdWV1ZSBhbmQgd2lsbCBmYWlsIHRvIHJldHVybiB0aGUgYG5nQ29tcG9uZW50RGVmYFxuICogdW50aWwgdGhlIGdsb2JhbCBxdWV1ZSBoYXMgYmVlbiByZXNvbHZlZCB3aXRoIGEgY2FsbCB0byBgcmVzb2x2ZUNvbXBvbmVudFJlc291cmNlc2AuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlQ29tcG9uZW50KHR5cGU6IFR5cGU8YW55PiwgbWV0YWRhdGE6IENvbXBvbmVudCk6IHZvaWQge1xuICBsZXQgbmdDb21wb25lbnREZWY6IGFueSA9IG51bGw7XG4gIC8vIE1ldGFkYXRhIG1heSBoYXZlIHJlc291cmNlcyB3aGljaCBuZWVkIHRvIGJlIHJlc29sdmVkLlxuICBtYXliZVF1ZXVlUmVzb2x1dGlvbk9mQ29tcG9uZW50UmVzb3VyY2VzKHR5cGUsIG1ldGFkYXRhKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHR5cGUsIE5HX0NPTVBPTkVOVF9ERUYsIHtcbiAgICBnZXQ6ICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbXBpbGVyID0gZ2V0Q29tcGlsZXJGYWNhZGUoKTtcbiAgICAgIGlmIChuZ0NvbXBvbmVudERlZiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoY29tcG9uZW50TmVlZHNSZXNvbHV0aW9uKG1ldGFkYXRhKSkge1xuICAgICAgICAgIGNvbnN0IGVycm9yID0gW2BDb21wb25lbnQgJyR7dHlwZS5uYW1lfScgaXMgbm90IHJlc29sdmVkOmBdO1xuICAgICAgICAgIGlmIChtZXRhZGF0YS50ZW1wbGF0ZVVybCkge1xuICAgICAgICAgICAgZXJyb3IucHVzaChgIC0gdGVtcGxhdGVVcmw6ICR7bWV0YWRhdGEudGVtcGxhdGVVcmx9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtZXRhZGF0YS5zdHlsZVVybHMgJiYgbWV0YWRhdGEuc3R5bGVVcmxzLmxlbmd0aCkge1xuICAgICAgICAgICAgZXJyb3IucHVzaChgIC0gc3R5bGVVcmxzOiAke0pTT04uc3RyaW5naWZ5KG1ldGFkYXRhLnN0eWxlVXJscyl9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVycm9yLnB1c2goYERpZCB5b3UgcnVuIGFuZCB3YWl0IGZvciAncmVzb2x2ZUNvbXBvbmVudFJlc291cmNlcygpJz9gKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3Iuam9pbignXFxuJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGVtcGxhdGVVcmwgPSBtZXRhZGF0YS50ZW1wbGF0ZVVybCB8fCBgbmc6Ly8vJHt0eXBlLm5hbWV9L3RlbXBsYXRlLmh0bWxgO1xuICAgICAgICBjb25zdCBtZXRhOiBSM0NvbXBvbmVudE1ldGFkYXRhRmFjYWRlID0ge1xuICAgICAgICAgIC4uLmRpcmVjdGl2ZU1ldGFkYXRhKHR5cGUsIG1ldGFkYXRhKSxcbiAgICAgICAgICB0eXBlU291cmNlU3BhbjogY29tcGlsZXIuY3JlYXRlUGFyc2VTb3VyY2VTcGFuKCdDb21wb25lbnQnLCB0eXBlLm5hbWUsIHRlbXBsYXRlVXJsKSxcbiAgICAgICAgICB0ZW1wbGF0ZTogbWV0YWRhdGEudGVtcGxhdGUgfHwgJycsXG4gICAgICAgICAgcHJlc2VydmVXaGl0ZXNwYWNlczogbWV0YWRhdGEucHJlc2VydmVXaGl0ZXNwYWNlcyB8fCBmYWxzZSxcbiAgICAgICAgICBzdHlsZXM6IG1ldGFkYXRhLnN0eWxlcyB8fCBFTVBUWV9BUlJBWSxcbiAgICAgICAgICBhbmltYXRpb25zOiBtZXRhZGF0YS5hbmltYXRpb25zLFxuICAgICAgICAgIGRpcmVjdGl2ZXM6IFtdLFxuICAgICAgICAgIGNoYW5nZURldGVjdGlvbjogbWV0YWRhdGEuY2hhbmdlRGV0ZWN0aW9uLFxuICAgICAgICAgIHBpcGVzOiBuZXcgTWFwKCksXG4gICAgICAgICAgZW5jYXBzdWxhdGlvbjogbWV0YWRhdGEuZW5jYXBzdWxhdGlvbiB8fCBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZCxcbiAgICAgICAgICBpbnRlcnBvbGF0aW9uOiBtZXRhZGF0YS5pbnRlcnBvbGF0aW9uLFxuICAgICAgICAgIHZpZXdQcm92aWRlcnM6IG1ldGFkYXRhLnZpZXdQcm92aWRlcnMgfHwgbnVsbCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG1ldGEudXNlc0luaGVyaXRhbmNlKSB7XG4gICAgICAgICAgYWRkQmFzZURlZlRvVW5kZWNvcmF0ZWRQYXJlbnRzKHR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIG5nQ29tcG9uZW50RGVmID0gY29tcGlsZXIuY29tcGlsZUNvbXBvbmVudChhbmd1bGFyQ29yZUVudiwgdGVtcGxhdGVVcmwsIG1ldGEpO1xuXG4gICAgICAgIC8vIFdoZW4gTmdNb2R1bGUgZGVjb3JhdG9yIGV4ZWN1dGVkLCB3ZSBlbnF1ZXVlZCB0aGUgbW9kdWxlIGRlZmluaXRpb24gc3VjaCB0aGF0XG4gICAgICAgIC8vIGl0IHdvdWxkIG9ubHkgZGVxdWV1ZSBhbmQgYWRkIGl0c2VsZiBhcyBtb2R1bGUgc2NvcGUgdG8gYWxsIG9mIGl0cyBkZWNsYXJhdGlvbnMsXG4gICAgICAgIC8vIGJ1dCBvbmx5IGlmICBpZiBhbGwgb2YgaXRzIGRlY2xhcmF0aW9ucyBoYWQgcmVzb2x2ZWQuIFRoaXMgY2FsbCBydW5zIHRoZSBjaGVja1xuICAgICAgICAvLyB0byBzZWUgaWYgYW55IG1vZHVsZXMgdGhhdCBhcmUgaW4gdGhlIHF1ZXVlIGNhbiBiZSBkZXF1ZXVlZCBhbmQgYWRkIHNjb3BlIHRvXG4gICAgICAgIC8vIHRoZWlyIGRlY2xhcmF0aW9ucy5cbiAgICAgICAgZmx1c2hNb2R1bGVTY29waW5nUXVldWVBc011Y2hBc1Bvc3NpYmxlKCk7XG5cbiAgICAgICAgLy8gSWYgY29tcG9uZW50IGNvbXBpbGF0aW9uIGlzIGFzeW5jLCB0aGVuIHRoZSBATmdNb2R1bGUgYW5ub3RhdGlvbiB3aGljaCBkZWNsYXJlcyB0aGVcbiAgICAgICAgLy8gY29tcG9uZW50IG1heSBleGVjdXRlIGFuZCBzZXQgYW4gbmdTZWxlY3RvclNjb3BlIHByb3BlcnR5IG9uIHRoZSBjb21wb25lbnQgdHlwZS4gVGhpc1xuICAgICAgICAvLyBhbGxvd3MgdGhlIGNvbXBvbmVudCB0byBwYXRjaCBpdHNlbGYgd2l0aCBkaXJlY3RpdmVEZWZzIGZyb20gdGhlIG1vZHVsZSBhZnRlciBpdFxuICAgICAgICAvLyBmaW5pc2hlcyBjb21waWxpbmcuXG4gICAgICAgIGlmIChoYXNTZWxlY3RvclNjb3BlKHR5cGUpKSB7XG4gICAgICAgICAgY29uc3Qgc2NvcGVzID0gdHJhbnNpdGl2ZVNjb3Blc0Zvcih0eXBlLm5nU2VsZWN0b3JTY29wZSk7XG4gICAgICAgICAgcGF0Y2hDb21wb25lbnREZWZXaXRoU2NvcGUobmdDb21wb25lbnREZWYsIHNjb3Blcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBuZ0NvbXBvbmVudERlZjtcbiAgICB9LFxuICAgIC8vIE1ha2UgdGhlIHByb3BlcnR5IGNvbmZpZ3VyYWJsZSBpbiBkZXYgbW9kZSB0byBhbGxvdyBvdmVycmlkaW5nIGluIHRlc3RzXG4gICAgY29uZmlndXJhYmxlOiAhIW5nRGV2TW9kZSxcbiAgfSk7XG5cblxuICAvLyBBZGQgbmdJbmplY3RhYmxlRGVmIHNvIGNvbXBvbmVudHMgYXJlIHJlYWNoYWJsZSB0aHJvdWdoIHRoZSBtb2R1bGUgaW5qZWN0b3IgYnkgZGVmYXVsdFxuICAvLyBUaGlzIGlzIG1vc3RseSB0byBzdXBwb3J0IGluamVjdGluZyBjb21wb25lbnRzIGluIHRlc3RzLiBJbiByZWFsIGFwcGxpY2F0aW9uIGNvZGUsXG4gIC8vIGNvbXBvbmVudHMgc2hvdWxkIGJlIHJldHJpZXZlZCB0aHJvdWdoIHRoZSBub2RlIGluamVjdG9yLCBzbyB0aGlzIGlzbid0IGEgcHJvYmxlbS5cbiAgY29tcGlsZUluamVjdGFibGUodHlwZSk7XG59XG5cbmZ1bmN0aW9uIGhhc1NlbGVjdG9yU2NvcGU8VD4oY29tcG9uZW50OiBUeXBlPFQ+KTogY29tcG9uZW50IGlzIFR5cGU8VD4mXG4gICAge25nU2VsZWN0b3JTY29wZTogVHlwZTxhbnk+fSB7XG4gIHJldHVybiAoY29tcG9uZW50IGFze25nU2VsZWN0b3JTY29wZT86IGFueX0pLm5nU2VsZWN0b3JTY29wZSAhPT0gdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENvbXBpbGUgYW4gQW5ndWxhciBkaXJlY3RpdmUgYWNjb3JkaW5nIHRvIGl0cyBkZWNvcmF0b3IgbWV0YWRhdGEsIGFuZCBwYXRjaCB0aGUgcmVzdWx0aW5nXG4gKiBuZ0RpcmVjdGl2ZURlZiBvbnRvIHRoZSBjb21wb25lbnQgdHlwZS5cbiAqXG4gKiBJbiB0aGUgZXZlbnQgdGhhdCBjb21waWxhdGlvbiBpcyBub3QgaW1tZWRpYXRlLCBgY29tcGlsZURpcmVjdGl2ZWAgd2lsbCByZXR1cm4gYSBgUHJvbWlzZWAgd2hpY2hcbiAqIHdpbGwgcmVzb2x2ZSB3aGVuIGNvbXBpbGF0aW9uIGNvbXBsZXRlcyBhbmQgdGhlIGRpcmVjdGl2ZSBiZWNvbWVzIHVzYWJsZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVEaXJlY3RpdmUodHlwZTogVHlwZTxhbnk+LCBkaXJlY3RpdmU6IERpcmVjdGl2ZSk6IHZvaWQge1xuICBsZXQgbmdEaXJlY3RpdmVEZWY6IGFueSA9IG51bGw7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0eXBlLCBOR19ESVJFQ1RJVkVfREVGLCB7XG4gICAgZ2V0OiAoKSA9PiB7XG4gICAgICBpZiAobmdEaXJlY3RpdmVEZWYgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHR5cGUgJiYgdHlwZS5uYW1lO1xuICAgICAgICBjb25zdCBzb3VyY2VNYXBVcmwgPSBgbmc6Ly8vJHtuYW1lfS9uZ0RpcmVjdGl2ZURlZi5qc2A7XG4gICAgICAgIGNvbnN0IGNvbXBpbGVyID0gZ2V0Q29tcGlsZXJGYWNhZGUoKTtcbiAgICAgICAgY29uc3QgZmFjYWRlID0gZGlyZWN0aXZlTWV0YWRhdGEodHlwZSBhcyBDb21wb25lbnRUeXBlPGFueT4sIGRpcmVjdGl2ZSk7XG4gICAgICAgIGZhY2FkZS50eXBlU291cmNlU3BhbiA9IGNvbXBpbGVyLmNyZWF0ZVBhcnNlU291cmNlU3BhbignRGlyZWN0aXZlJywgbmFtZSwgc291cmNlTWFwVXJsKTtcbiAgICAgICAgaWYgKGZhY2FkZS51c2VzSW5oZXJpdGFuY2UpIHtcbiAgICAgICAgICBhZGRCYXNlRGVmVG9VbmRlY29yYXRlZFBhcmVudHModHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgbmdEaXJlY3RpdmVEZWYgPSBjb21waWxlci5jb21waWxlRGlyZWN0aXZlKGFuZ3VsYXJDb3JlRW52LCBzb3VyY2VNYXBVcmwsIGZhY2FkZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmdEaXJlY3RpdmVEZWY7XG4gICAgfSxcbiAgICAvLyBNYWtlIHRoZSBwcm9wZXJ0eSBjb25maWd1cmFibGUgaW4gZGV2IG1vZGUgdG8gYWxsb3cgb3ZlcnJpZGluZyBpbiB0ZXN0c1xuICAgIGNvbmZpZ3VyYWJsZTogISFuZ0Rldk1vZGUsXG4gIH0pO1xuXG4gIC8vIEFkZCBuZ0luamVjdGFibGVEZWYgc28gZGlyZWN0aXZlcyBhcmUgcmVhY2hhYmxlIHRocm91Z2ggdGhlIG1vZHVsZSBpbmplY3RvciBieSBkZWZhdWx0XG4gIC8vIFRoaXMgaXMgbW9zdGx5IHRvIHN1cHBvcnQgaW5qZWN0aW5nIGRpcmVjdGl2ZXMgaW4gdGVzdHMuIEluIHJlYWwgYXBwbGljYXRpb24gY29kZSxcbiAgLy8gZGlyZWN0aXZlcyBzaG91bGQgYmUgcmV0cmlldmVkIHRocm91Z2ggdGhlIG5vZGUgaW5qZWN0b3IsIHNvIHRoaXMgaXNuJ3QgYSBwcm9ibGVtLlxuICBjb21waWxlSW5qZWN0YWJsZSh0eXBlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZHNEaXJlY3RseUZyb21PYmplY3QodHlwZTogVHlwZTxhbnk+KTogYm9vbGVhbiB7XG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YodHlwZS5wcm90b3R5cGUpID09PSBPYmplY3QucHJvdG90eXBlO1xufVxuXG4vKipcbiAqIEV4dHJhY3QgdGhlIGBSM0RpcmVjdGl2ZU1ldGFkYXRhYCBmb3IgYSBwYXJ0aWN1bGFyIGRpcmVjdGl2ZSAoZWl0aGVyIGEgYERpcmVjdGl2ZWAgb3IgYVxuICogYENvbXBvbmVudGApLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlyZWN0aXZlTWV0YWRhdGEodHlwZTogVHlwZTxhbnk+LCBtZXRhZGF0YTogRGlyZWN0aXZlKTogUjNEaXJlY3RpdmVNZXRhZGF0YUZhY2FkZSB7XG4gIC8vIFJlZmxlY3QgaW5wdXRzIGFuZCBvdXRwdXRzLlxuICBjb25zdCBwcm9wTWV0YWRhdGEgPSBnZXRSZWZsZWN0KCkub3duUHJvcE1ldGFkYXRhKHR5cGUpO1xuXG4gIHJldHVybiB7XG4gICAgbmFtZTogdHlwZS5uYW1lLFxuICAgIHR5cGU6IHR5cGUsXG4gICAgdHlwZUFyZ3VtZW50Q291bnQ6IDAsXG4gICAgc2VsZWN0b3I6IG1ldGFkYXRhLnNlbGVjdG9yICEsXG4gICAgZGVwczogcmVmbGVjdERlcGVuZGVuY2llcyh0eXBlKSxcbiAgICBob3N0OiBtZXRhZGF0YS5ob3N0IHx8IEVNUFRZX09CSixcbiAgICBwcm9wTWV0YWRhdGE6IHByb3BNZXRhZGF0YSxcbiAgICBpbnB1dHM6IG1ldGFkYXRhLmlucHV0cyB8fCBFTVBUWV9BUlJBWSxcbiAgICBvdXRwdXRzOiBtZXRhZGF0YS5vdXRwdXRzIHx8IEVNUFRZX0FSUkFZLFxuICAgIHF1ZXJpZXM6IGV4dHJhY3RRdWVyaWVzTWV0YWRhdGEodHlwZSwgcHJvcE1ldGFkYXRhLCBpc0NvbnRlbnRRdWVyeSksXG4gICAgbGlmZWN5Y2xlOiB7dXNlc09uQ2hhbmdlczogdHlwZS5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoJ25nT25DaGFuZ2VzJyl9LFxuICAgIHR5cGVTb3VyY2VTcGFuOiBudWxsICEsXG4gICAgdXNlc0luaGVyaXRhbmNlOiAhZXh0ZW5kc0RpcmVjdGx5RnJvbU9iamVjdCh0eXBlKSxcbiAgICBleHBvcnRBczogZXh0cmFjdEV4cG9ydEFzKG1ldGFkYXRhLmV4cG9ydEFzKSxcbiAgICBwcm92aWRlcnM6IG1ldGFkYXRhLnByb3ZpZGVycyB8fCBudWxsLFxuICAgIHZpZXdRdWVyaWVzOiBleHRyYWN0UXVlcmllc01ldGFkYXRhKHR5cGUsIHByb3BNZXRhZGF0YSwgaXNWaWV3UXVlcnkpLFxuICB9O1xufVxuXG4vKipcbiAqIEFkZHMgYW4gYG5nQmFzZURlZmAgdG8gYWxsIHBhcmVudCBjbGFzc2VzIG9mIGEgdHlwZSB0aGF0IGRvbid0IGhhdmUgYW4gQW5ndWxhciBkZWNvcmF0b3IuXG4gKi9cbmZ1bmN0aW9uIGFkZEJhc2VEZWZUb1VuZGVjb3JhdGVkUGFyZW50cyh0eXBlOiBUeXBlPGFueT4pIHtcbiAgY29uc3Qgb2JqUHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgbGV0IHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0eXBlKTtcblxuICAvLyBHbyB1cCB0aGUgcHJvdG90eXBlIHVudGlsIHdlIGhpdCBgT2JqZWN0YC5cbiAgd2hpbGUgKHBhcmVudCAmJiBwYXJlbnQgIT09IG9ialByb3RvdHlwZSkge1xuICAgIC8vIFNpbmNlIGluaGVyaXRhbmNlIHdvcmtzIGlmIHRoZSBjbGFzcyB3YXMgYW5ub3RhdGVkIGFscmVhZHksIHdlIG9ubHkgbmVlZCB0byBhZGRcbiAgICAvLyB0aGUgYmFzZSBkZWYgaWYgdGhlcmUgYXJlIG5vIGFubm90YXRpb25zIGFuZCB0aGUgYmFzZSBkZWYgaGFzbid0IGJlZW4gY3JlYXRlZCBhbHJlYWR5LlxuICAgIGlmICghZ2V0RGlyZWN0aXZlRGVmKHBhcmVudCkgJiYgIWdldENvbXBvbmVudERlZihwYXJlbnQpICYmICFnZXRCYXNlRGVmKHBhcmVudCkpIHtcbiAgICAgIGNvbnN0IGZhY2FkZSA9IGV4dHJhY3RCYXNlRGVmTWV0YWRhdGEocGFyZW50KTtcbiAgICAgIGZhY2FkZSAmJiBjb21waWxlQmFzZShwYXJlbnQsIGZhY2FkZSk7XG4gICAgfVxuICAgIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwYXJlbnQpO1xuICB9XG59XG5cbi8qKiBDb21waWxlcyB0aGUgYmFzZSBtZXRhZGF0YSBpbnRvIGEgYmFzZSBkZWZpbml0aW9uLiAqL1xuZnVuY3Rpb24gY29tcGlsZUJhc2UodHlwZTogVHlwZTxhbnk+LCBmYWNhZGU6IFIzQmFzZU1ldGFkYXRhRmFjYWRlKTogdm9pZCB7XG4gIGxldCBuZ0Jhc2VEZWY6IGFueSA9IG51bGw7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0eXBlLCBOR19CQVNFX0RFRiwge1xuICAgIGdldDogKCkgPT4ge1xuICAgICAgaWYgKG5nQmFzZURlZiA9PT0gbnVsbCkge1xuICAgICAgICBjb25zdCBuYW1lID0gdHlwZSAmJiB0eXBlLm5hbWU7XG4gICAgICAgIGNvbnN0IHNvdXJjZU1hcFVybCA9IGBuZzovLyR7bmFtZX0vbmdCYXNlRGVmLmpzYDtcbiAgICAgICAgY29uc3QgY29tcGlsZXIgPSBnZXRDb21waWxlckZhY2FkZSgpO1xuICAgICAgICBuZ0Jhc2VEZWYgPSBjb21waWxlci5jb21waWxlQmFzZShhbmd1bGFyQ29yZUVudiwgc291cmNlTWFwVXJsLCBmYWNhZGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5nQmFzZURlZjtcbiAgICB9LFxuICAgIC8vIE1ha2UgdGhlIHByb3BlcnR5IGNvbmZpZ3VyYWJsZSBpbiBkZXYgbW9kZSB0byBhbGxvdyBvdmVycmlkaW5nIGluIHRlc3RzXG4gICAgY29uZmlndXJhYmxlOiAhIW5nRGV2TW9kZSxcbiAgfSk7XG59XG5cbi8qKiBFeHRyYWN0cyB0aGUgbWV0YWRhdGEgbmVjZXNzYXJ5IHRvIGNvbnN0cnVjdCBhbiBgbmdCYXNlRGVmYCBmcm9tIGEgY2xhc3MuICovXG5mdW5jdGlvbiBleHRyYWN0QmFzZURlZk1ldGFkYXRhKHR5cGU6IFR5cGU8YW55Pik6IFIzQmFzZU1ldGFkYXRhRmFjYWRlfG51bGwge1xuICBjb25zdCBwcm9wTWV0YWRhdGEgPSBnZXRSZWZsZWN0KCkub3duUHJvcE1ldGFkYXRhKHR5cGUpO1xuICBjb25zdCB2aWV3UXVlcmllcyA9IGV4dHJhY3RRdWVyaWVzTWV0YWRhdGEodHlwZSwgcHJvcE1ldGFkYXRhLCBpc1ZpZXdRdWVyeSk7XG4gIGNvbnN0IHF1ZXJpZXMgPSBleHRyYWN0UXVlcmllc01ldGFkYXRhKHR5cGUsIHByb3BNZXRhZGF0YSwgaXNDb250ZW50UXVlcnkpO1xuICBsZXQgaW5wdXRzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgW3N0cmluZywgc3RyaW5nXX18dW5kZWZpbmVkO1xuICBsZXQgb3V0cHV0czoge1trZXk6IHN0cmluZ106IHN0cmluZ318dW5kZWZpbmVkO1xuXG4gIGZvciAoY29uc3QgZmllbGQgaW4gcHJvcE1ldGFkYXRhKSB7XG4gICAgcHJvcE1ldGFkYXRhW2ZpZWxkXS5mb3JFYWNoKGFubiA9PiB7XG4gICAgICBpZiAoYW5uLm5nTWV0YWRhdGFOYW1lID09PSAnSW5wdXQnKSB7XG4gICAgICAgIGlucHV0cyA9IGlucHV0cyB8fCB7fTtcbiAgICAgICAgaW5wdXRzW2ZpZWxkXSA9IGFubi5iaW5kaW5nUHJvcGVydHlOYW1lID8gW2Fubi5iaW5kaW5nUHJvcGVydHlOYW1lLCBmaWVsZF0gOiBmaWVsZDtcbiAgICAgIH0gZWxzZSBpZiAoYW5uLm5nTWV0YWRhdGFOYW1lID09PSAnT3V0cHV0Jykge1xuICAgICAgICBvdXRwdXRzID0gb3V0cHV0cyB8fCB7fTtcbiAgICAgICAgb3V0cHV0c1tmaWVsZF0gPSBhbm4uYmluZGluZ1Byb3BlcnR5TmFtZSB8fCBmaWVsZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIE9ubHkgZ2VuZXJhdGUgdGhlIGJhc2UgZGVmIGlmIHRoZXJlJ3MgYW55IGluZm8gaW5zaWRlIGl0LlxuICBpZiAoaW5wdXRzIHx8IG91dHB1dHMgfHwgdmlld1F1ZXJpZXMubGVuZ3RoIHx8IHF1ZXJpZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHtpbnB1dHMsIG91dHB1dHMsIHZpZXdRdWVyaWVzLCBxdWVyaWVzfTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0VG9SM1F1ZXJ5UHJlZGljYXRlKHNlbGVjdG9yOiBhbnkpOiBhbnl8c3RyaW5nW10ge1xuICByZXR1cm4gdHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJyA/IHNwbGl0QnlDb21tYShzZWxlY3RvcikgOiByZXNvbHZlRm9yd2FyZFJlZihzZWxlY3Rvcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9SM1F1ZXJ5TWV0YWRhdGEocHJvcGVydHlOYW1lOiBzdHJpbmcsIGFubjogUXVlcnkpOiBSM1F1ZXJ5TWV0YWRhdGFGYWNhZGUge1xuICByZXR1cm4ge1xuICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHlOYW1lLFxuICAgIHByZWRpY2F0ZTogY29udmVydFRvUjNRdWVyeVByZWRpY2F0ZShhbm4uc2VsZWN0b3IpLFxuICAgIGRlc2NlbmRhbnRzOiBhbm4uZGVzY2VuZGFudHMsXG4gICAgZmlyc3Q6IGFubi5maXJzdCxcbiAgICByZWFkOiBhbm4ucmVhZCA/IGFubi5yZWFkIDogbnVsbCxcbiAgICBzdGF0aWM6ICEhYW5uLnN0YXRpY1xuICB9O1xufVxuZnVuY3Rpb24gZXh0cmFjdFF1ZXJpZXNNZXRhZGF0YShcbiAgICB0eXBlOiBUeXBlPGFueT4sIHByb3BNZXRhZGF0YToge1trZXk6IHN0cmluZ106IGFueVtdfSxcbiAgICBpc1F1ZXJ5QW5uOiAoYW5uOiBhbnkpID0+IGFubiBpcyBRdWVyeSk6IFIzUXVlcnlNZXRhZGF0YUZhY2FkZVtdIHtcbiAgY29uc3QgcXVlcmllc01ldGE6IFIzUXVlcnlNZXRhZGF0YUZhY2FkZVtdID0gW107XG4gIGZvciAoY29uc3QgZmllbGQgaW4gcHJvcE1ldGFkYXRhKSB7XG4gICAgaWYgKHByb3BNZXRhZGF0YS5oYXNPd25Qcm9wZXJ0eShmaWVsZCkpIHtcbiAgICAgIGNvbnN0IGFubm90YXRpb25zID0gcHJvcE1ldGFkYXRhW2ZpZWxkXTtcbiAgICAgIGFubm90YXRpb25zLmZvckVhY2goYW5uID0+IHtcbiAgICAgICAgaWYgKGlzUXVlcnlBbm4oYW5uKSkge1xuICAgICAgICAgIGlmICghYW5uLnNlbGVjdG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgYENhbid0IGNvbnN0cnVjdCBhIHF1ZXJ5IGZvciB0aGUgcHJvcGVydHkgXCIke2ZpZWxkfVwiIG9mIGAgK1xuICAgICAgICAgICAgICAgIGBcIiR7c3RyaW5naWZ5Rm9yRXJyb3IodHlwZSl9XCIgc2luY2UgdGhlIHF1ZXJ5IHNlbGVjdG9yIHdhc24ndCBkZWZpbmVkLmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYW5ub3RhdGlvbnMuc29tZShpc0lucHV0QW5uKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgY29tYmluZSBASW5wdXQgZGVjb3JhdG9ycyB3aXRoIHF1ZXJ5IGRlY29yYXRvcnNgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcXVlcmllc01ldGEucHVzaChjb252ZXJ0VG9SM1F1ZXJ5TWV0YWRhdGEoZmllbGQsIGFubikpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHF1ZXJpZXNNZXRhO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0RXhwb3J0QXMoZXhwb3J0QXM6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHN0cmluZ1tdfG51bGwge1xuICBpZiAoZXhwb3J0QXMgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGV4cG9ydEFzLnNwbGl0KCcsJykubWFwKHBhcnQgPT4gcGFydC50cmltKCkpO1xufVxuXG5mdW5jdGlvbiBpc0NvbnRlbnRRdWVyeSh2YWx1ZTogYW55KTogdmFsdWUgaXMgUXVlcnkge1xuICBjb25zdCBuYW1lID0gdmFsdWUubmdNZXRhZGF0YU5hbWU7XG4gIHJldHVybiBuYW1lID09PSAnQ29udGVudENoaWxkJyB8fCBuYW1lID09PSAnQ29udGVudENoaWxkcmVuJztcbn1cblxuZnVuY3Rpb24gaXNWaWV3UXVlcnkodmFsdWU6IGFueSk6IHZhbHVlIGlzIFF1ZXJ5IHtcbiAgY29uc3QgbmFtZSA9IHZhbHVlLm5nTWV0YWRhdGFOYW1lO1xuICByZXR1cm4gbmFtZSA9PT0gJ1ZpZXdDaGlsZCcgfHwgbmFtZSA9PT0gJ1ZpZXdDaGlsZHJlbic7XG59XG5cbmZ1bmN0aW9uIGlzSW5wdXRBbm4odmFsdWU6IGFueSk6IHZhbHVlIGlzIElucHV0IHtcbiAgcmV0dXJuIHZhbHVlLm5nTWV0YWRhdGFOYW1lID09PSAnSW5wdXQnO1xufVxuXG5mdW5jdGlvbiBzcGxpdEJ5Q29tbWEodmFsdWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIHZhbHVlLnNwbGl0KCcsJykubWFwKHBpZWNlID0+IHBpZWNlLnRyaW0oKSk7XG59XG4iXX0=