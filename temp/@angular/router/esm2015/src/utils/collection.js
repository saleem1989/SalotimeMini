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
import { ╔ÁisObservable as isObservable, ╔ÁisPromise as isPromise } from '@angular/core';
import { from, of } from 'rxjs';
import { concatAll, last as lastValue, map } from 'rxjs/operators';
import { PRIMARY_OUTLET } from '../shared';
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function shallowEqualArrays(a, b) {
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; ++i) {
        if (!shallowEqual(a[i], b[i]))
            return false;
    }
    return true;
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function shallowEqual(a, b) {
    // Casting Object.keys return values to include `undefined` as there are some cases
    // in IE 11 where this can happen. Cannot provide a test because the behavior only
    // exists in certain circumstances in IE 11, therefore doing this cast ensures the
    // logic is correct for when this edge case is hit.
    /** @type {?} */
    const k1 = (/** @type {?} */ (Object.keys(a)));
    /** @type {?} */
    const k2 = (/** @type {?} */ (Object.keys(b)));
    if (!k1 || !k2 || k1.length != k2.length) {
        return false;
    }
    /** @type {?} */
    let key;
    for (let i = 0; i < k1.length; i++) {
        key = k1[i];
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
/**
 * Flattens single-level nested arrays.
 * @template T
 * @param {?} arr
 * @return {?}
 */
export function flatten(arr) {
    return Array.prototype.concat.apply([], arr);
}
/**
 * Return the last element of an array.
 * @template T
 * @param {?} a
 * @return {?}
 */
export function last(a) {
    return a.length > 0 ? a[a.length - 1] : null;
}
/**
 * Verifys all booleans in an array are `true`.
 * @param {?} bools
 * @return {?}
 */
export function and(bools) {
    return !bools.some((/**
     * @param {?} v
     * @return {?}
     */
    v => !v));
}
/**
 * @template K, V
 * @param {?} map
 * @param {?} callback
 * @return {?}
 */
export function forEach(map, callback) {
    for (const prop in map) {
        if (map.hasOwnProperty(prop)) {
            callback(map[prop], prop);
        }
    }
}
/**
 * @template A, B
 * @param {?} obj
 * @param {?} fn
 * @return {?}
 */
export function waitForMap(obj, fn) {
    if (Object.keys(obj).length === 0) {
        return of({});
    }
    /** @type {?} */
    const waitHead = [];
    /** @type {?} */
    const waitTail = [];
    /** @type {?} */
    const res = {};
    forEach(obj, (/**
     * @param {?} a
     * @param {?} k
     * @return {?}
     */
    (a, k) => {
        /** @type {?} */
        const mapped = fn(k, a).pipe(map((/**
         * @param {?} r
         * @return {?}
         */
        (r) => res[k] = r)));
        if (k === PRIMARY_OUTLET) {
            waitHead.push(mapped);
        }
        else {
            waitTail.push(mapped);
        }
    }));
    // Closure compiler has problem with using spread operator here. So just using Array.concat.
    return of.apply(null, waitHead.concat(waitTail)).pipe(concatAll(), lastValue(), map((/**
     * @return {?}
     */
    () => res)));
}
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
export function wrapIntoObservable(value) {
    if (isObservable(value)) {
        return value;
    }
    if (isPromise(value)) {
        // Use `Promise.resolve()` to wrap promise-like instances.
        // Required ie when a Resolver returns a AngularJS `$q` promise to correctly trigger the
        // change detection.
        return from(Promise.resolve(value));
    }
    return of(value);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3JvdXRlci9zcmMvdXRpbHMvY29sbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBa0IsYUFBYSxJQUFJLFlBQVksRUFBRSxVQUFVLElBQUksU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBYSxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sV0FBVyxDQUFDOzs7Ozs7QUFFekMsTUFBTSxVQUFVLGtCQUFrQixDQUFDLENBQVEsRUFBRSxDQUFRO0lBQ25ELElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsTUFBTTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ3hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO0tBQzdDO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLENBQXFCLEVBQUUsQ0FBcUI7Ozs7OztVQUtqRSxFQUFFLEdBQUcsbUJBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBd0I7O1VBQzNDLEVBQUUsR0FBRyxtQkFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUF3QjtJQUNqRCxJ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LENBQUMsRUFBRTtRQUN2QixPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDcEIsMERBQTBEO1FBQzFELHdGQUF3RjtRQUN4RixvQkFBb0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ3JDO0lBRUQsT0FBTyxFQUFFLENBQUUsS0FBSyxDQUFDLENBQUM7QUFDcEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZUZhY3RvcnksIMm1aXNPYnNlcnZhYmxlIGFzIGlzT2JzZXJ2YWJsZSwgybVpc1Byb21pc2UgYXMgaXNQcm9taXNlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgZnJvbSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7Y29uY2F0QWxsLCBsYXN0IGFzIGxhc3RWYWx1ZSwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7UFJJTUFSWV9PVVRMRVR9IGZyb20gJy4uL3NoYXJlZCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGFsbG93RXF1YWxBcnJheXMoYTogYW55W10sIGI6IGFueVtdKTogYm9vbGVhbiB7XG4gIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCFzaGFsbG93RXF1YWwoYVtpXSwgYltpXSkpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoYWxsb3dFcXVhbChhOiB7W3g6IHN0cmluZ106IGFueX0sIGI6IHtbeDogc3RyaW5nXTogYW55fSk6IGJvb2xlYW4ge1xuICAvLyBDYXN0aW5nIE9iamVjdC5rZXlzIHJldHVybiB2YWx1ZXMgdG8gaW5jbHVkZSBgdW5kZWZpbmVkYCBhcyB0aGVyZSBhcmUgc29tZSBjYXNlc1xuICAvLyBpbiBJRSAxMSB3aGVyZSB0aGlzIGNhbiBoYXBwZW4uIENhbm5vdCBwcm92aWRlIGEgdGVzdCBiZWNhdXNlIHRoZSBiZWhhdmlvciBvbmx5XG4gIC8vIGV4aXN0cyBpbiBjZXJ0YWluIGNpcmN1bXN0YW5jZXMgaW4gSUUgMTEsIHRoZXJlZm9yZSBkb2luZyB0aGlzIGNhc3QgZW5zdXJlcyB0aGVcbiAgLy8gbG9naWMgaXMgY29ycmVjdCBmb3Igd2hlbiB0aGlzIGVkZ2UgY2FzZSBpcyBoaXQuXG4gIGNvbnN0IGsxID0gT2JqZWN0LmtleXMoYSkgYXMgc3RyaW5nW10gfCB1bmRlZmluZWQ7XG4gIGNvbnN0IGsyID0gT2JqZWN0LmtleXMoYikgYXMgc3RyaW5nW10gfCB1bmRlZmluZWQ7XG4gIGlmICghazEgfHwgIWsyIHx8IGsxLmxlbmd0aCAhPSBrMi5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgbGV0IGtleTogc3RyaW5nO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGsxLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gazFbaV07XG4gICAgaWYgKGFba2V5XSAhPT0gYltrZXldKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEZsYXR0ZW5zIHNpbmdsZS1sZXZlbCBuZXN0ZWQgYXJyYXlzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbjxUPihhcnI6IFRbXVtdKTogVFtdIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIGFycik7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBsYXN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXN0PFQ+KGE6IFRbXSk6IFR8bnVsbCB7XG4gIHJldHVybiBhLmxlbmd0aCA+IDAgPyBhW2EubGVuZ3RoIC0gMV0gOiBudWxsO1xufVxuXG4vKipcbiAqIFZlcmlmeXMgYWxsIGJvb2xlYW5zIGluIGFuIGFycmF5IGFyZSBgdHJ1ZWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbmQoYm9vbHM6IGJvb2xlYW5bXSk6IGJvb2xlYW4ge1xuICByZXR1cm4gIWJvb2xzLnNvbWUodiA9PiAhdik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoPEssIFY+KG1hcDoge1trZXk6IHN0cmluZ106IFZ9LCBjYWxsYmFjazogKHY6IFYsIGs6IHN0cmluZykgPT4gdm9pZCk6IHZvaWQge1xuICBmb3IgKGNvbnN0IHByb3AgaW4gbWFwKSB7XG4gICAgaWYgKG1hcC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgY2FsbGJhY2sobWFwW3Byb3BdLCBwcm9wKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdhaXRGb3JNYXA8QSwgQj4oXG4gICAgb2JqOiB7W2s6IHN0cmluZ106IEF9LCBmbjogKGs6IHN0cmluZywgYTogQSkgPT4gT2JzZXJ2YWJsZTxCPik6IE9ic2VydmFibGU8e1trOiBzdHJpbmddOiBCfT4ge1xuICBpZiAoT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2YgKHt9KTtcbiAgfVxuXG4gIGNvbnN0IHdhaXRIZWFkOiBPYnNlcnZhYmxlPEI+W10gPSBbXTtcbiAgY29uc3Qgd2FpdFRhaWw6IE9ic2VydmFibGU8Qj5bXSA9IFtdO1xuICBjb25zdCByZXM6IHtbazogc3RyaW5nXTogQn0gPSB7fTtcblxuICBmb3JFYWNoKG9iaiwgKGE6IEEsIGs6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IG1hcHBlZCA9IGZuKGssIGEpLnBpcGUobWFwKChyOiBCKSA9PiByZXNba10gPSByKSk7XG4gICAgaWYgKGsgPT09IFBSSU1BUllfT1VUTEVUKSB7XG4gICAgICB3YWl0SGVhZC5wdXNoKG1hcHBlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdhaXRUYWlsLnB1c2gobWFwcGVkKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIENsb3N1cmUgY29tcGlsZXIgaGFzIHByb2JsZW0gd2l0aCB1c2luZyBzcHJlYWQgb3BlcmF0b3IgaGVyZS4gU28ganVzdCB1c2luZyBBcnJheS5jb25jYXQuXG4gIHJldHVybiBvZiAuYXBwbHkobnVsbCwgd2FpdEhlYWQuY29uY2F0KHdhaXRUYWlsKSkucGlwZShjb25jYXRBbGwoKSwgbGFzdFZhbHVlKCksIG1hcCgoKSA9PiByZXMpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBJbnRvT2JzZXJ2YWJsZTxUPih2YWx1ZTogVCB8IE5nTW9kdWxlRmFjdG9yeTxUPnwgUHJvbWlzZTxUPnwgT2JzZXJ2YWJsZTxUPikge1xuICBpZiAoaXNPYnNlcnZhYmxlKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGlmIChpc1Byb21pc2UodmFsdWUpKSB7XG4gICAgLy8gVXNlIGBQcm9taXNlLnJlc29sdmUoKWAgdG8gd3JhcCBwcm9taXNlLWxpa2UgaW5zdGFuY2VzLlxuICAgIC8vIFJlcXVpcmVkIGllIHdoZW4gYSBSZXNvbHZlciByZXR1cm5zIGEgQW5ndWxhckpTIGAkcWAgcHJvbWlzZSB0byBjb3JyZWN0bHkgdHJpZ2dlciB0aGVcbiAgICAvLyBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgIHJldHVybiBmcm9tKFByb21pc2UucmVzb2x2ZSh2YWx1ZSkpO1xuICB9XG5cbiAgcmV0dXJuIG9mICh2YWx1ZSk7XG59XG4iXX0=