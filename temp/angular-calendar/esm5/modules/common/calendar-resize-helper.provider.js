/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isInside } from './util';
var CalendarResizeHelper = /** @class */ (function () {
    function CalendarResizeHelper(resizeContainerElement, minWidth) {
        this.resizeContainerElement = resizeContainerElement;
        this.minWidth = minWidth;
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    CalendarResizeHelper.prototype.validateResize = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var rectangle = _a.rectangle;
        if (this.minWidth &&
            Math.ceil(rectangle.width) < Math.ceil(this.minWidth)) {
            return false;
        }
        return isInside(this.resizeContainerElement.getBoundingClientRect(), rectangle);
    };
    return CalendarResizeHelper;
}());
export { CalendarResizeHelper };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CalendarResizeHelper.prototype.resizeContainerElement;
    /**
     * @type {?}
     * @private
     */
    CalendarResizeHelper.prototype.minWidth;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmVzaXplLWhlbHBlci5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1yZXNpemUtaGVscGVyLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWxDO0lBQ0UsOEJBQ1Usc0JBQW1DLEVBQ25DLFFBQWlCO1FBRGpCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBYTtRQUNuQyxhQUFRLEdBQVIsUUFBUSxDQUFTO0lBQ3hCLENBQUM7Ozs7O0lBRUosNkNBQWM7Ozs7SUFBZCxVQUFlLEVBQXdDO1lBQXRDLHdCQUFTO1FBQ3hCLElBQ0UsSUFBSSxDQUFDLFFBQVE7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFDckQ7WUFDQSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsT0FBTyxRQUFRLENBQ2IsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHFCQUFxQixFQUFFLEVBQ25ELFNBQVMsQ0FDVixDQUFDO0lBQ0osQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQzs7Ozs7OztJQWpCRyxzREFBMkM7Ozs7O0lBQzNDLHdDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzSW5zaWRlIH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyUmVzaXplSGVscGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZXNpemVDb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBwcml2YXRlIG1pbldpZHRoPzogbnVtYmVyXG4gICkge31cblxuICB2YWxpZGF0ZVJlc2l6ZSh7IHJlY3RhbmdsZSB9OiB7IHJlY3RhbmdsZTogQ2xpZW50UmVjdCB9KTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5taW5XaWR0aCAmJlxuICAgICAgTWF0aC5jZWlsKHJlY3RhbmdsZS53aWR0aCkgPCBNYXRoLmNlaWwodGhpcy5taW5XaWR0aClcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNJbnNpZGUoXG4gICAgICB0aGlzLnJlc2l6ZUNvbnRhaW5lckVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICByZWN0YW5nbGVcbiAgICApO1xuICB9XG59XG4iXX0=