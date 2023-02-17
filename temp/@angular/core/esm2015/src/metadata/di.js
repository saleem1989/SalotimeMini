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
import { InjectionToken } from '../di/injection_token';
import { makePropDecorator } from '../util/decorators';
/**
 * A DI token that you can use to create a virtual [provider](guide/glossary#provider)
 * that will populate the `entryComponents` field of components and NgModules
 * based on its `useValue` property value.
 * All components that are referenced in the `useValue` value (either directly
 * or in a nested array or map) are added to the `entryComponents` property.
 *
 * \@usageNotes
 *
 * The following example shows how the router can populate the `entryComponents`
 * field of an NgModule based on a router configuration that refers
 * to components.
 *
 * ```typescript
 * // helper function inside the router
 * function provideRoutes(routes) {
 *   return [
 *     {provide: ROUTES, useValue: routes},
 *     {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: routes, multi: true}
 *   ];
 * }
 *
 * // user code
 * let routes = [
 *   {path: '/root', component: RootComp},
 *   {path: '/teams', component: TeamsComp}
 * ];
 *
 * \@NgModule({
 *   providers: [provideRoutes(routes)]
 * })
 * class ModuleWithRoutes {}
 * ```
 *
 * \@publicApi
 * @type {?}
 */
export const ANALYZE_FOR_ENTRY_COMPONENTS = new InjectionToken('AnalyzeForEntryComponents');
/**
 * Type of the `Attribute` decorator / constructor function.
 *
 * \@publicApi
 * @record
 */
export function AttributeDecorator() { }
/**
 * Type of the Attribute metadata.
 *
 * \@publicApi
 * @record
 */
export function Attribute() { }
if (false) {
    /**
     * The name of the attribute to be injected into the constructor.
     * @type {?|undefined}
     */
    Attribute.prototype.attributeName;
}
// WARNING: interface has both a type and a value, skipping emit
/**
 * Base class for query metadata.
 *
 * @see `ContentChildren`.
 * @see `ContentChild`.
 * @see `ViewChildren`.
 * @see `ViewChild`.
 *
 * \@publicApi
 * @abstract
 */
export class Query {
}
/**
 * Type of the ContentChildren decorator / constructor function.
 *
 * @see `ContentChildren`.
 * \@publicApi
 * @record
 */
export function ContentChildrenDecorator() { }
const ɵ0 = /**
 * @param {?=} selector
 * @param {?=} data
 * @return {?}
 */
(selector, data = {}) => (Object.assign({ selector, first: false, isViewQuery: false, descendants: false }, data));
/**
 * ContentChildren decorator and metadata.
 *
 *
 * \@Annotation
 * \@publicApi
 * @type {?}
 */
export const ContentChildren = makePropDecorator('ContentChildren', (ɵ0), Query);
/**
 * Type of the ContentChild decorator / constructor function.
 *
 * \@publicApi
 * @record
 */
export function ContentChildDecorator() { }
const ɵ1 = /**
 * @param {?=} selector
 * @param {?=} data
 * @return {?}
 */
(selector, data = {}) => (Object.assign({ selector, first: true, isViewQuery: false, descendants: true }, data));
/**
 * ContentChild decorator and metadata.
 *
 *
 * \@Annotation
 *
 * \@publicApi
 * @type {?}
 */
export const ContentChild = makePropDecorator('ContentChild', (ɵ1), Query);
/**
 * Type of the ViewChildren decorator / constructor function.
 *
 * @see `ViewChildren`.
 *
 * \@publicApi
 * @record
 */
export function ViewChildrenDecorator() { }
const ɵ2 = /**
 * @param {?=} selector
 * @param {?=} data
 * @return {?}
 */
(selector, data = {}) => (Object.assign({ selector, first: false, isViewQuery: true, descendants: true }, data));
/**
 * ViewChildren decorator and metadata.
 *
 * \@Annotation
 * \@publicApi
 * @type {?}
 */
export const ViewChildren = makePropDecorator('ViewChildren', (ɵ2), Query);
/**
 * Type of the ViewChild decorator / constructor function.
 *
 * @see `ViewChild`.
 * \@publicApi
 * @record
 */
export function ViewChildDecorator() { }
const ɵ3 = /**
 * @param {?} selector
 * @param {?} data
 * @return {?}
 */
(selector, data) => (Object.assign({ selector, first: true, isViewQuery: true, descendants: true }, data));
/**
 * ViewChild decorator and metadata.
 *
 * \@Annotation
 * \@publicApi
 * @type {?}
 */
export const ViewChild = makePropDecorator('ViewChild', (ɵ3), Query);
export { ɵ0, ɵ1, ɵ2, ɵ3 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9tZXRhZGF0YS9kaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUVyRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQ3JELE1BQU0sT0FBTyw0QkFBNEIsR0FBRyxJQUFJLGNBQWMsQ0FBTSwyQkFBMkIsQ0FBQzs7Ozs7OztBQU9oRyx3Q0F1QkM7Ozs7Ozs7QUFRRCwrQkFLQzs7Ozs7O0lBREMsa0NBQXVCOzs7Ozs7Ozs7Ozs7OztBQTJCekIsTUFBTSxPQUFnQixLQUFLO0NBQUc7Ozs7Ozs7O0FBUTlCLDhDQWtDQzs7Ozs7O0FBb0JHLENBQUMsUUFBYyxFQUFFLE9BQVksRUFBRSxFQUFFLEVBQUUsQ0FDL0IsaUJBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxJQUFLLElBQUksRUFBRTs7Ozs7Ozs7O0FBSG5GLE1BQU0sT0FBTyxlQUFlLEdBQTZCLGlCQUFpQixDQUN0RSxpQkFBaUIsUUFHakIsS0FBSyxDQUFDOzs7Ozs7O0FBT1YsMkNBa0NDOzs7Ozs7QUFrQm1CLENBQUMsUUFBYyxFQUFFLE9BQVksRUFBRSxFQUFFLEVBQUUsQ0FDL0IsaUJBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxJQUFLLElBQUksRUFBRTs7Ozs7Ozs7OztBQUZqRyxNQUFNLE9BQU8sWUFBWSxHQUEwQixpQkFBaUIsQ0FDaEUsY0FBYyxRQUVkLEtBQUssQ0FBQzs7Ozs7Ozs7O0FBU1YsMkNBNkJDOzs7Ozs7QUFnQm1CLENBQUMsUUFBYyxFQUFFLE9BQVksRUFBRSxFQUFFLEVBQUUsQ0FDL0IsaUJBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxJQUFLLElBQUksRUFBRTs7Ozs7Ozs7QUFGakcsTUFBTSxPQUFPLFlBQVksR0FBMEIsaUJBQWlCLENBQ2hFLGNBQWMsUUFFZCxLQUFLLENBQUM7Ozs7Ozs7O0FBUVYsd0NBZ0RDOzs7Ozs7QUFnQmdCLENBQUMsUUFBYSxFQUFFLElBQVMsRUFBRSxFQUFFLENBQ3pCLGlCQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksSUFBSyxJQUFJLEVBQUU7Ozs7Ozs7O0FBRjdGLE1BQU0sT0FBTyxTQUFTLEdBQXVCLGlCQUFpQixDQUMxRCxXQUFXLFFBRVgsS0FBSyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICcuLi9kaS9pbmplY3Rpb25fdG9rZW4nO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2UvdHlwZSc7XG5pbXBvcnQge21ha2VQcm9wRGVjb3JhdG9yfSBmcm9tICcuLi91dGlsL2RlY29yYXRvcnMnO1xuXG4vKipcbiAqIEEgREkgdG9rZW4gdGhhdCB5b3UgY2FuIHVzZSB0byBjcmVhdGUgYSB2aXJ0dWFsIFtwcm92aWRlcl0oZ3VpZGUvZ2xvc3NhcnkjcHJvdmlkZXIpXG4gKiB0aGF0IHdpbGwgcG9wdWxhdGUgdGhlIGBlbnRyeUNvbXBvbmVudHNgIGZpZWxkIG9mIGNvbXBvbmVudHMgYW5kIE5nTW9kdWxlc1xuICogYmFzZWQgb24gaXRzIGB1c2VWYWx1ZWAgcHJvcGVydHkgdmFsdWUuXG4gKiBBbGwgY29tcG9uZW50cyB0aGF0IGFyZSByZWZlcmVuY2VkIGluIHRoZSBgdXNlVmFsdWVgIHZhbHVlIChlaXRoZXIgZGlyZWN0bHlcbiAqIG9yIGluIGEgbmVzdGVkIGFycmF5IG9yIG1hcCkgYXJlIGFkZGVkIHRvIHRoZSBgZW50cnlDb21wb25lbnRzYCBwcm9wZXJ0eS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBzaG93cyBob3cgdGhlIHJvdXRlciBjYW4gcG9wdWxhdGUgdGhlIGBlbnRyeUNvbXBvbmVudHNgXG4gKiBmaWVsZCBvZiBhbiBOZ01vZHVsZSBiYXNlZCBvbiBhIHJvdXRlciBjb25maWd1cmF0aW9uIHRoYXQgcmVmZXJzXG4gKiB0byBjb21wb25lbnRzLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIGhlbHBlciBmdW5jdGlvbiBpbnNpZGUgdGhlIHJvdXRlclxuICogZnVuY3Rpb24gcHJvdmlkZVJvdXRlcyhyb3V0ZXMpIHtcbiAqICAgcmV0dXJuIFtcbiAqICAgICB7cHJvdmlkZTogUk9VVEVTLCB1c2VWYWx1ZTogcm91dGVzfSxcbiAqICAgICB7cHJvdmlkZTogQU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUywgdXNlVmFsdWU6IHJvdXRlcywgbXVsdGk6IHRydWV9XG4gKiAgIF07XG4gKiB9XG4gKlxuICogLy8gdXNlciBjb2RlXG4gKiBsZXQgcm91dGVzID0gW1xuICogICB7cGF0aDogJy9yb290JywgY29tcG9uZW50OiBSb290Q29tcH0sXG4gKiAgIHtwYXRoOiAnL3RlYW1zJywgY29tcG9uZW50OiBUZWFtc0NvbXB9XG4gKiBdO1xuICpcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIHByb3ZpZGVyczogW3Byb3ZpZGVSb3V0ZXMocm91dGVzKV1cbiAqIH0pXG4gKiBjbGFzcyBNb2R1bGVXaXRoUm91dGVzIHt9XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ0FuYWx5emVGb3JFbnRyeUNvbXBvbmVudHMnKTtcblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBgQXR0cmlidXRlYCBkZWNvcmF0b3IgLyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXR0cmlidXRlRGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIFNwZWNpZmllcyB0aGF0IGEgY29uc3RhbnQgYXR0cmlidXRlIHZhbHVlIHNob3VsZCBiZSBpbmplY3RlZC5cbiAgICpcbiAgICogVGhlIGRpcmVjdGl2ZSBjYW4gaW5qZWN0IGNvbnN0YW50IHN0cmluZyBsaXRlcmFscyBvZiBob3N0IGVsZW1lbnQgYXR0cmlidXRlcy5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogU3VwcG9zZSB3ZSBoYXZlIGFuIGA8aW5wdXQ+YCBlbGVtZW50IGFuZCB3YW50IHRvIGtub3cgaXRzIGB0eXBlYC5cbiAgICpcbiAgICogYGBgaHRtbFxuICAgKiA8aW5wdXQgdHlwZT1cInRleHRcIj5cbiAgICogYGBgXG4gICAqXG4gICAqIEEgZGVjb3JhdG9yIGNhbiBpbmplY3Qgc3RyaW5nIGxpdGVyYWwgYHRleHRgIGFzIGluIHRoZSBmb2xsb3dpbmcgZXhhbXBsZS5cbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvdHMvbWV0YWRhdGEvbWV0YWRhdGEudHMgcmVnaW9uPSdhdHRyaWJ1dGVNZXRhZGF0YSd9XG4gICAqXG4gICAqIEBwdWJsaWNBcGlcbiAgICovXG4gIChuYW1lOiBzdHJpbmcpOiBhbnk7XG4gIG5ldyAobmFtZTogc3RyaW5nKTogQXR0cmlidXRlO1xufVxuXG5cbi8qKlxuICogVHlwZSBvZiB0aGUgQXR0cmlidXRlIG1ldGFkYXRhLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBdHRyaWJ1dGUge1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB0byBiZSBpbmplY3RlZCBpbnRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICovXG4gIGF0dHJpYnV0ZU5hbWU/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgUXVlcnkgbWV0YWRhdGEuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5IHtcbiAgZGVzY2VuZGFudHM6IGJvb2xlYW47XG4gIGZpcnN0OiBib29sZWFuO1xuICByZWFkOiBhbnk7XG4gIGlzVmlld1F1ZXJ5OiBib29sZWFuO1xuICBzZWxlY3RvcjogYW55O1xuICBzdGF0aWM6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgcXVlcnkgbWV0YWRhdGEuXG4gKlxuICogQHNlZSBgQ29udGVudENoaWxkcmVuYC5cbiAqIEBzZWUgYENvbnRlbnRDaGlsZGAuXG4gKiBAc2VlIGBWaWV3Q2hpbGRyZW5gLlxuICogQHNlZSBgVmlld0NoaWxkYC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBRdWVyeSB7fVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIENvbnRlbnRDaGlsZHJlbiBkZWNvcmF0b3IgLyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqXG4gKiBAc2VlIGBDb250ZW50Q2hpbGRyZW5gLlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbnRlbnRDaGlsZHJlbkRlY29yYXRvciB7XG4gIC8qKlxuICAgKiBDb25maWd1cmVzIGEgY29udGVudCBxdWVyeS5cbiAgICpcbiAgICogWW91IGNhbiB1c2UgQ29udGVudENoaWxkcmVuIHRvIGdldCB0aGUgYFF1ZXJ5TGlzdGAgb2YgZWxlbWVudHMgb3IgZGlyZWN0aXZlcyBmcm9tIHRoZVxuICAgKiBjb250ZW50IERPTS4gQW55IHRpbWUgYSBjaGlsZCBlbGVtZW50IGlzIGFkZGVkLCByZW1vdmVkLCBvciBtb3ZlZCwgdGhlIHF1ZXJ5IGxpc3Qgd2lsbCBiZVxuICAgKiB1cGRhdGVkLCBhbmQgdGhlIGNoYW5nZXMgb2JzZXJ2YWJsZSBvZiB0aGUgcXVlcnkgbGlzdCB3aWxsIGVtaXQgYSBuZXcgdmFsdWUuXG4gICAqXG4gICAqIENvbnRlbnQgcXVlcmllcyBhcmUgc2V0IGJlZm9yZSB0aGUgYG5nQWZ0ZXJDb250ZW50SW5pdGAgY2FsbGJhY2sgaXMgY2FsbGVkLlxuICAgKlxuICAgKiAqKk1ldGFkYXRhIFByb3BlcnRpZXMqKjpcbiAgICpcbiAgICogKiAqKnNlbGVjdG9yKiogLSB0aGUgZGlyZWN0aXZlIHR5cGUgb3IgdGhlIG5hbWUgdXNlZCBmb3IgcXVlcnlpbmcuXG4gICAqICogKipkZXNjZW5kYW50cyoqIC0gaW5jbHVkZSBvbmx5IGRpcmVjdCBjaGlsZHJlbiBvciBhbGwgZGVzY2VuZGFudHMuXG4gICAqICogKipyZWFkKiogLSByZWFkIGEgZGlmZmVyZW50IHRva2VuIGZyb20gdGhlIHF1ZXJpZWQgZWxlbWVudHMuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBCYXNpYyBFeGFtcGxlXG4gICAqXG4gICAqIEhlcmUgaXMgYSBzaW1wbGUgZGVtb25zdHJhdGlvbiBvZiBob3cgdGhlIGBDb250ZW50Q2hpbGRyZW5gIGRlY29yYXRvciBjYW4gYmUgdXNlZC5cbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvY29udGVudENoaWxkcmVuL2NvbnRlbnRfY2hpbGRyZW5faG93dG8udHMgcmVnaW9uPSdIb3dUbyd9XG4gICAqXG4gICAqICMjIyBUYWItcGFuZSBFeGFtcGxlXG4gICAqXG4gICAqIEhlcmUgaXMgYSBzbGlnaHRseSBtb3JlIHJlYWxpc3RpYyBleGFtcGxlIHRoYXQgc2hvd3MgaG93IGBDb250ZW50Q2hpbGRyZW5gIGRlY29yYXRvcnNcbiAgICogY2FuIGJlIHVzZWQgdG8gaW1wbGVtZW50IGEgdGFiIHBhbmUgY29tcG9uZW50LlxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy9jb250ZW50Q2hpbGRyZW4vY29udGVudF9jaGlsZHJlbl9leGFtcGxlLnRzIHJlZ2lvbj0nQ29tcG9uZW50J31cbiAgICpcbiAgICogQEFubm90YXRpb25cbiAgICovXG4gIChzZWxlY3RvcjogVHlwZTxhbnk+fEZ1bmN0aW9ufHN0cmluZywgb3B0cz86IHtkZXNjZW5kYW50cz86IGJvb2xlYW4sIHJlYWQ/OiBhbnl9KTogYW55O1xuICBuZXcgKHNlbGVjdG9yOiBUeXBlPGFueT58RnVuY3Rpb258c3RyaW5nLCBvcHRzPzoge2Rlc2NlbmRhbnRzPzogYm9vbGVhbiwgcmVhZD86IGFueX0pOiBRdWVyeTtcbn1cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBDb250ZW50Q2hpbGRyZW4gbWV0YWRhdGEuXG4gKlxuICpcbiAqIEBBbm5vdGF0aW9uXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIENvbnRlbnRDaGlsZHJlbiA9IFF1ZXJ5O1xuXG4vKipcbiAqIENvbnRlbnRDaGlsZHJlbiBkZWNvcmF0b3IgYW5kIG1ldGFkYXRhLlxuICpcbiAqXG4gKiBAQW5ub3RhdGlvblxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgQ29udGVudENoaWxkcmVuOiBDb250ZW50Q2hpbGRyZW5EZWNvcmF0b3IgPSBtYWtlUHJvcERlY29yYXRvcihcbiAgICAnQ29udGVudENoaWxkcmVuJyxcbiAgICAoc2VsZWN0b3I/OiBhbnksIGRhdGE6IGFueSA9IHt9KSA9PlxuICAgICAgICAoe3NlbGVjdG9yLCBmaXJzdDogZmFsc2UsIGlzVmlld1F1ZXJ5OiBmYWxzZSwgZGVzY2VuZGFudHM6IGZhbHNlLCAuLi5kYXRhfSksXG4gICAgUXVlcnkpO1xuXG4vKipcbiAqIFR5cGUgb2YgdGhlIENvbnRlbnRDaGlsZCBkZWNvcmF0b3IgLyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGVudENoaWxkRGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgYSBjb250ZW50IHF1ZXJ5LlxuICAgKlxuICAgKiBZb3UgY2FuIHVzZSBDb250ZW50Q2hpbGQgdG8gZ2V0IHRoZSBmaXJzdCBlbGVtZW50IG9yIHRoZSBkaXJlY3RpdmUgbWF0Y2hpbmcgdGhlIHNlbGVjdG9yIGZyb21cbiAgICogdGhlIGNvbnRlbnQgRE9NLiBJZiB0aGUgY29udGVudCBET00gY2hhbmdlcywgYW5kIGEgbmV3IGNoaWxkIG1hdGNoZXMgdGhlIHNlbGVjdG9yLFxuICAgKiB0aGUgcHJvcGVydHkgd2lsbCBiZSB1cGRhdGVkLlxuICAgKlxuICAgKiBDb250ZW50IHF1ZXJpZXMgYXJlIHNldCBiZWZvcmUgdGhlIGBuZ0FmdGVyQ29udGVudEluaXRgIGNhbGxiYWNrIGlzIGNhbGxlZC5cbiAgICpcbiAgICogKipNZXRhZGF0YSBQcm9wZXJ0aWVzKio6XG4gICAqXG4gICAqICogKipzZWxlY3RvcioqIC0gdGhlIGRpcmVjdGl2ZSB0eXBlIG9yIHRoZSBuYW1lIHVzZWQgZm9yIHF1ZXJ5aW5nLlxuICAgKiAqICoqcmVhZCoqIC0gcmVhZCBhIGRpZmZlcmVudCB0b2tlbiBmcm9tIHRoZSBxdWVyaWVkIGVsZW1lbnQuXG4gICAqICogKipzdGF0aWMqKiAtIHdoZXRoZXIgb3Igbm90IHRvIHJlc29sdmUgcXVlcnkgcmVzdWx0cyBiZWZvcmUgY2hhbmdlIGRldGVjdGlvbiBydW5zIChpLmUuXG4gICAqIHJldHVybiBzdGF0aWMgcmVzdWx0cyBvbmx5KS4gSWYgdGhpcyBvcHRpb24gaXMgbm90IHByb3ZpZGVkLCB0aGUgY29tcGlsZXIgd2lsbCBmYWxsIGJhY2tcbiAgICogdG8gaXRzIGRlZmF1bHQgYmVoYXZpb3IsIHdoaWNoIGlzIHRvIHVzZSBxdWVyeSByZXN1bHRzIHRvIGRldGVybWluZSB0aGUgdGltaW5nIG9mIHF1ZXJ5XG4gICAqIHJlc29sdXRpb24uIElmIGFueSBxdWVyeSByZXN1bHRzIGFyZSBpbnNpZGUgYSBuZXN0ZWQgdmlldyAoZS5nLiAqbmdJZiksIHRoZSBxdWVyeSB3aWxsIGJlXG4gICAqIHJlc29sdmVkIGFmdGVyIGNoYW5nZSBkZXRlY3Rpb24gcnVucy4gT3RoZXJ3aXNlLCBpdCB3aWxsIGJlIHJlc29sdmVkIGJlZm9yZSBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAqIHJ1bnMuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL2NvbnRlbnRDaGlsZC9jb250ZW50X2NoaWxkX2hvd3RvLnRzIHJlZ2lvbj0nSG93VG8nfVxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy9jb250ZW50Q2hpbGQvY29udGVudF9jaGlsZF9leGFtcGxlLnRzIHJlZ2lvbj0nQ29tcG9uZW50J31cbiAgICpcbiAgICogQEFubm90YXRpb25cbiAgICovXG4gIChzZWxlY3RvcjogVHlwZTxhbnk+fEZ1bmN0aW9ufHN0cmluZywgb3B0czoge3JlYWQ/OiBhbnksIHN0YXRpYzogYm9vbGVhbn0pOiBhbnk7XG4gIG5ldyAoc2VsZWN0b3I6IFR5cGU8YW55PnxGdW5jdGlvbnxzdHJpbmcsIG9wdHM6IHtyZWFkPzogYW55LCBzdGF0aWM6IGJvb2xlYW59KTogQ29udGVudENoaWxkO1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIENvbnRlbnRDaGlsZCBtZXRhZGF0YS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIENvbnRlbnRDaGlsZCA9IFF1ZXJ5O1xuXG4vKipcbiAqIENvbnRlbnRDaGlsZCBkZWNvcmF0b3IgYW5kIG1ldGFkYXRhLlxuICpcbiAqXG4gKiBAQW5ub3RhdGlvblxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IENvbnRlbnRDaGlsZDogQ29udGVudENoaWxkRGVjb3JhdG9yID0gbWFrZVByb3BEZWNvcmF0b3IoXG4gICAgJ0NvbnRlbnRDaGlsZCcsIChzZWxlY3Rvcj86IGFueSwgZGF0YTogYW55ID0ge30pID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAoe3NlbGVjdG9yLCBmaXJzdDogdHJ1ZSwgaXNWaWV3UXVlcnk6IGZhbHNlLCBkZXNjZW5kYW50czogdHJ1ZSwgLi4uZGF0YX0pLFxuICAgIFF1ZXJ5KTtcblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBWaWV3Q2hpbGRyZW4gZGVjb3JhdG9yIC8gY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKlxuICogQHNlZSBgVmlld0NoaWxkcmVuYC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmlld0NoaWxkcmVuRGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgYSB2aWV3IHF1ZXJ5LlxuICAgKlxuICAgKiBZb3UgY2FuIHVzZSBWaWV3Q2hpbGRyZW4gdG8gZ2V0IHRoZSBgUXVlcnlMaXN0YCBvZiBlbGVtZW50cyBvciBkaXJlY3RpdmVzIGZyb20gdGhlXG4gICAqIHZpZXcgRE9NLiBBbnkgdGltZSBhIGNoaWxkIGVsZW1lbnQgaXMgYWRkZWQsIHJlbW92ZWQsIG9yIG1vdmVkLCB0aGUgcXVlcnkgbGlzdCB3aWxsIGJlIHVwZGF0ZWQsXG4gICAqIGFuZCB0aGUgY2hhbmdlcyBvYnNlcnZhYmxlIG9mIHRoZSBxdWVyeSBsaXN0IHdpbGwgZW1pdCBhIG5ldyB2YWx1ZS5cbiAgICpcbiAgICogVmlldyBxdWVyaWVzIGFyZSBzZXQgYmVmb3JlIHRoZSBgbmdBZnRlclZpZXdJbml0YCBjYWxsYmFjayBpcyBjYWxsZWQuXG4gICAqXG4gICAqICoqTWV0YWRhdGEgUHJvcGVydGllcyoqOlxuICAgKlxuICAgKiAqICoqc2VsZWN0b3IqKiAtIHRoZSBkaXJlY3RpdmUgdHlwZSBvciB0aGUgbmFtZSB1c2VkIGZvciBxdWVyeWluZy5cbiAgICogKiAqKnJlYWQqKiAtIHJlYWQgYSBkaWZmZXJlbnQgdG9rZW4gZnJvbSB0aGUgcXVlcmllZCBlbGVtZW50cy5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvdmlld0NoaWxkcmVuL3ZpZXdfY2hpbGRyZW5faG93dG8udHMgcmVnaW9uPSdIb3dUbyd9XG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3ZpZXdDaGlsZHJlbi92aWV3X2NoaWxkcmVuX2V4YW1wbGUudHMgcmVnaW9uPSdDb21wb25lbnQnfVxuICAgKlxuICAgKiBAQW5ub3RhdGlvblxuICAgKi9cbiAgKHNlbGVjdG9yOiBUeXBlPGFueT58RnVuY3Rpb258c3RyaW5nLCBvcHRzPzoge3JlYWQ/OiBhbnl9KTogYW55O1xuICBuZXcgKHNlbGVjdG9yOiBUeXBlPGFueT58RnVuY3Rpb258c3RyaW5nLCBvcHRzPzoge3JlYWQ/OiBhbnl9KTogVmlld0NoaWxkcmVuO1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIFZpZXdDaGlsZHJlbiBtZXRhZGF0YS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIFZpZXdDaGlsZHJlbiA9IFF1ZXJ5O1xuXG4vKipcbiAqIFZpZXdDaGlsZHJlbiBkZWNvcmF0b3IgYW5kIG1ldGFkYXRhLlxuICpcbiAqIEBBbm5vdGF0aW9uXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBWaWV3Q2hpbGRyZW46IFZpZXdDaGlsZHJlbkRlY29yYXRvciA9IG1ha2VQcm9wRGVjb3JhdG9yKFxuICAgICdWaWV3Q2hpbGRyZW4nLCAoc2VsZWN0b3I/OiBhbnksIGRhdGE6IGFueSA9IHt9KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgKHtzZWxlY3RvciwgZmlyc3Q6IGZhbHNlLCBpc1ZpZXdRdWVyeTogdHJ1ZSwgZGVzY2VuZGFudHM6IHRydWUsIC4uLmRhdGF9KSxcbiAgICBRdWVyeSk7XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgVmlld0NoaWxkIGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBzZWUgYFZpZXdDaGlsZGAuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmlld0NoaWxkRGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBQcm9wZXJ0eSBkZWNvcmF0b3IgdGhhdCBjb25maWd1cmVzIGEgdmlldyBxdWVyeS5cbiAgICogVGhlIGNoYW5nZSBkZXRlY3RvciBsb29rcyBmb3IgdGhlIGZpcnN0IGVsZW1lbnQgb3IgdGhlIGRpcmVjdGl2ZSBtYXRjaGluZyB0aGUgc2VsZWN0b3JcbiAgICogaW4gdGhlIHZpZXcgRE9NLiBJZiB0aGUgdmlldyBET00gY2hhbmdlcywgYW5kIGEgbmV3IGNoaWxkIG1hdGNoZXMgdGhlIHNlbGVjdG9yLFxuICAgKiB0aGUgcHJvcGVydHkgaXMgdXBkYXRlZC5cbiAgICpcbiAgICogVmlldyBxdWVyaWVzIGFyZSBzZXQgYmVmb3JlIHRoZSBgbmdBZnRlclZpZXdJbml0YCBjYWxsYmFjayBpcyBjYWxsZWQuXG4gICAqXG4gICAqICoqTWV0YWRhdGEgUHJvcGVydGllcyoqOlxuICAgKlxuICAgKiAqICoqc2VsZWN0b3IqKiAtIHRoZSBkaXJlY3RpdmUgdHlwZSBvciB0aGUgbmFtZSB1c2VkIGZvciBxdWVyeWluZy5cbiAgICogKiAqKnJlYWQqKiAtIHJlYWQgYSBkaWZmZXJlbnQgdG9rZW4gZnJvbSB0aGUgcXVlcmllZCBlbGVtZW50cy5cbiAgICogKiAqKnN0YXRpYyoqIC0gd2hldGhlciBvciBub3QgdG8gcmVzb2x2ZSBxdWVyeSByZXN1bHRzIGJlZm9yZSBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bnMgKGkuZS5cbiAgICogcmV0dXJuIHN0YXRpYyByZXN1bHRzIG9ubHkpLiBJZiB0aGlzIG9wdGlvbiBpcyBub3QgcHJvdmlkZWQsIHRoZSBjb21waWxlciB3aWxsIGZhbGwgYmFja1xuICAgKiB0byBpdHMgZGVmYXVsdCBiZWhhdmlvciwgd2hpY2ggaXMgdG8gdXNlIHF1ZXJ5IHJlc3VsdHMgdG8gZGV0ZXJtaW5lIHRoZSB0aW1pbmcgb2YgcXVlcnlcbiAgICogcmVzb2x1dGlvbi4gSWYgYW55IHF1ZXJ5IHJlc3VsdHMgYXJlIGluc2lkZSBhIG5lc3RlZCB2aWV3IChlLmcuICpuZ0lmKSwgdGhlIHF1ZXJ5IHdpbGwgYmVcbiAgICogcmVzb2x2ZWQgYWZ0ZXIgY2hhbmdlIGRldGVjdGlvbiBydW5zLiBPdGhlcndpc2UsIGl0IHdpbGwgYmUgcmVzb2x2ZWQgYmVmb3JlIGNoYW5nZSBkZXRlY3Rpb25cbiAgICogcnVucy5cbiAgICpcbiAgICogU3VwcG9ydGVkIHNlbGVjdG9ycyBpbmNsdWRlOlxuICAgKiAgICogYW55IGNsYXNzIHdpdGggdGhlIGBAQ29tcG9uZW50YCBvciBgQERpcmVjdGl2ZWAgZGVjb3JhdG9yXG4gICAqICAgKiBhIHRlbXBsYXRlIHJlZmVyZW5jZSB2YXJpYWJsZSBhcyBhIHN0cmluZyAoZS5nLiBxdWVyeSBgPG15LWNvbXBvbmVudCAjY21wPjwvbXktY29tcG9uZW50PmBcbiAgICogd2l0aCBgQFZpZXdDaGlsZCgnY21wJylgKVxuICAgKiAgICogYW55IHByb3ZpZGVyIGRlZmluZWQgaW4gdGhlIGNoaWxkIGNvbXBvbmVudCB0cmVlIG9mIHRoZSBjdXJyZW50IGNvbXBvbmVudCAoZS5nLlxuICAgKiBgQFZpZXdDaGlsZChTb21lU2VydmljZSkgc29tZVNlcnZpY2U6IFNvbWVTZXJ2aWNlYClcbiAgICogICAqIGFueSBwcm92aWRlciBkZWZpbmVkIHRocm91Z2ggYSBzdHJpbmcgdG9rZW4gKGUuZy4gYEBWaWV3Q2hpbGQoJ3NvbWVUb2tlbicpIHNvbWVUb2tlblZhbDpcbiAgICogYW55YClcbiAgICogICAqIGEgYFRlbXBsYXRlUmVmYCAoZS5nLiBxdWVyeSBgPG5nLXRlbXBsYXRlPjwvbmctdGVtcGxhdGU+YCB3aXRoIGBAVmlld0NoaWxkKFRlbXBsYXRlUmVmKVxuICAgKiB0ZW1wbGF0ZTtgKVxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy92aWV3Q2hpbGQvdmlld19jaGlsZF9leGFtcGxlLnRzIHJlZ2lvbj0nQ29tcG9uZW50J31cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvdmlld0NoaWxkL3ZpZXdfY2hpbGRfaG93dG8udHMgcmVnaW9uPSdIb3dUbyd9XG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3ZpZXdDaGlsZC92aWV3X2NoaWxkX2V4YW1wbGUudHMgcmVnaW9uPSdDb21wb25lbnQnfVxuICAgKlxuICAgKiBAQW5ub3RhdGlvblxuICAgKi9cbiAgKHNlbGVjdG9yOiBUeXBlPGFueT58RnVuY3Rpb258c3RyaW5nLCBvcHRzOiB7cmVhZD86IGFueSwgc3RhdGljOiBib29sZWFufSk6IGFueTtcbiAgbmV3IChzZWxlY3RvcjogVHlwZTxhbnk+fEZ1bmN0aW9ufHN0cmluZywgb3B0czoge3JlYWQ/OiBhbnksIHN0YXRpYzogYm9vbGVhbn0pOiBWaWV3Q2hpbGQ7XG59XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgVmlld0NoaWxkIG1ldGFkYXRhLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IHR5cGUgVmlld0NoaWxkID0gUXVlcnk7XG5cbi8qKlxuICogVmlld0NoaWxkIGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICogQEFubm90YXRpb25cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IFZpZXdDaGlsZDogVmlld0NoaWxkRGVjb3JhdG9yID0gbWFrZVByb3BEZWNvcmF0b3IoXG4gICAgJ1ZpZXdDaGlsZCcsIChzZWxlY3RvcjogYW55LCBkYXRhOiBhbnkpID0+XG4gICAgICAgICAgICAgICAgICAgICAoe3NlbGVjdG9yLCBmaXJzdDogdHJ1ZSwgaXNWaWV3UXVlcnk6IHRydWUsIGRlc2NlbmRhbnRzOiB0cnVlLCAuLi5kYXRhfSksXG4gICAgUXVlcnkpO1xuIl19