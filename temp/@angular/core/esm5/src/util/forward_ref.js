/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getClosureSafeProperty } from './property';
import { stringify } from './stringify';
var __forward_ref__ = getClosureSafeProperty({ __forward_ref__: getClosureSafeProperty });
/**
 * Allows to refer to references which are not yet defined.
 *
 * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
 * DI is declared, but not yet defined. It is also used when the `token` which we use when creating
 * a query is not yet defined.
 *
 * @usageNotes
 * ### Example
 * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='forward_ref'}
 * @publicApi
 */
export function forwardRef(forwardRefFn) {
    forwardRefFn.__forward_ref__ = forwardRef;
    forwardRefFn.toString = function () { return stringify(this()); };
    return forwardRefFn;
}
/**
 * Lazily retrieves the reference value from a forwardRef.
 *
 * Acts as the identity function when given a non-forward-ref value.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='resolve_forward_ref'}
 *
 * @see `forwardRef`
 * @publicApi
 */
export function resolveForwardRef(type) {
    var fn = type;
    if (typeof fn === 'function' && fn.hasOwnProperty(__forward_ref__) &&
        fn.__forward_ref__ === forwardRef) {
        return fn();
    }
    else {
        return type;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yd2FyZF9yZWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy91dGlsL2ZvcndhcmRfcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNsRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBZXRDLElBQU0sZUFBZSxHQUFHLHNCQUFzQixDQUFDLEVBQUMsZUFBZSxFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQztBQUUxRjs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sVUFBVSxVQUFVLENBQUMsWUFBMEI7SUFDN0MsWUFBYSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUM7SUFDM0MsWUFBYSxDQUFDLFFBQVEsR0FBRyxjQUFhLE9BQU8sU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEUsT0FBd0IsWUFBYSxDQUFDO0FBQ3hDLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUksSUFBTztJQUMxQyxJQUFNLEVBQUUsR0FBUSxJQUFJLENBQUM7SUFDckIsSUFBSSxPQUFPLEVBQUUsS0FBSyxVQUFVLElBQUksRUFBRSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUM7UUFDOUQsRUFBRSxDQUFDLGVBQWUsS0FBSyxVQUFVLEVBQUU7UUFDckMsT0FBTyxFQUFFLEVBQUUsQ0FBQztLQUNiO1NBQU07UUFDTCxPQUFPLElBQUksQ0FBQztLQUNiO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2UvdHlwZSc7XG5pbXBvcnQge2dldENsb3N1cmVTYWZlUHJvcGVydHl9IGZyb20gJy4vcHJvcGVydHknO1xuaW1wb3J0IHtzdHJpbmdpZnl9IGZyb20gJy4vc3RyaW5naWZ5JztcblxuXG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIHRoYXQgYSBmdW5jdGlvbiBwYXNzZWQgaW50byB7QGxpbmsgZm9yd2FyZFJlZn0gaGFzIHRvIGltcGxlbWVudC5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9mb3J3YXJkX3JlZi9mb3J3YXJkX3JlZl9zcGVjLnRzIHJlZ2lvbj0nZm9yd2FyZF9yZWZfZm4nfVxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZvcndhcmRSZWZGbiB7ICgpOiBhbnk7IH1cblxuY29uc3QgX19mb3J3YXJkX3JlZl9fID0gZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eSh7X19mb3J3YXJkX3JlZl9fOiBnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSk7XG5cbi8qKlxuICogQWxsb3dzIHRvIHJlZmVyIHRvIHJlZmVyZW5jZXMgd2hpY2ggYXJlIG5vdCB5ZXQgZGVmaW5lZC5cbiAqXG4gKiBGb3IgaW5zdGFuY2UsIGBmb3J3YXJkUmVmYCBpcyB1c2VkIHdoZW4gdGhlIGB0b2tlbmAgd2hpY2ggd2UgbmVlZCB0byByZWZlciB0byBmb3IgdGhlIHB1cnBvc2VzIG9mXG4gKiBESSBpcyBkZWNsYXJlZCwgYnV0IG5vdCB5ZXQgZGVmaW5lZC4gSXQgaXMgYWxzbyB1c2VkIHdoZW4gdGhlIGB0b2tlbmAgd2hpY2ggd2UgdXNlIHdoZW4gY3JlYXRpbmdcbiAqIGEgcXVlcnkgaXMgbm90IHlldCBkZWZpbmVkLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiAjIyMgRXhhbXBsZVxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvZm9yd2FyZF9yZWYvZm9yd2FyZF9yZWZfc3BlYy50cyByZWdpb249J2ZvcndhcmRfcmVmJ31cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmRSZWYoZm9yd2FyZFJlZkZuOiBGb3J3YXJkUmVmRm4pOiBUeXBlPGFueT4ge1xuICAoPGFueT5mb3J3YXJkUmVmRm4pLl9fZm9yd2FyZF9yZWZfXyA9IGZvcndhcmRSZWY7XG4gICg8YW55PmZvcndhcmRSZWZGbikudG9TdHJpbmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHN0cmluZ2lmeSh0aGlzKCkpOyB9O1xuICByZXR1cm4gKDxUeXBlPGFueT4+PGFueT5mb3J3YXJkUmVmRm4pO1xufVxuXG4vKipcbiAqIExhemlseSByZXRyaWV2ZXMgdGhlIHJlZmVyZW5jZSB2YWx1ZSBmcm9tIGEgZm9yd2FyZFJlZi5cbiAqXG4gKiBBY3RzIGFzIHRoZSBpZGVudGl0eSBmdW5jdGlvbiB3aGVuIGdpdmVuIGEgbm9uLWZvcndhcmQtcmVmIHZhbHVlLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL2ZvcndhcmRfcmVmL2ZvcndhcmRfcmVmX3NwZWMudHMgcmVnaW9uPSdyZXNvbHZlX2ZvcndhcmRfcmVmJ31cbiAqXG4gKiBAc2VlIGBmb3J3YXJkUmVmYFxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUZvcndhcmRSZWY8VD4odHlwZTogVCk6IFQge1xuICBjb25zdCBmbjogYW55ID0gdHlwZTtcbiAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiBmbi5oYXNPd25Qcm9wZXJ0eShfX2ZvcndhcmRfcmVmX18pICYmXG4gICAgICBmbi5fX2ZvcndhcmRfcmVmX18gPT09IGZvcndhcmRSZWYpIHtcbiAgICByZXR1cm4gZm4oKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxufVxuIl19