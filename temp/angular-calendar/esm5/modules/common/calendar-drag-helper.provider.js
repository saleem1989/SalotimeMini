/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isInside, isWithinThreshold } from './util';
var CalendarDragHelper = /** @class */ (function () {
    function CalendarDragHelper(dragContainerElement, draggableElement) {
        this.dragContainerElement = dragContainerElement;
        this.startPosition = draggableElement.getBoundingClientRect();
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    CalendarDragHelper.prototype.validateDrag = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var x = _a.x, y = _a.y, snapDraggedEvents = _a.snapDraggedEvents, dragAlreadyMoved = _a.dragAlreadyMoved, transform = _a.transform;
        if (snapDraggedEvents) {
            /** @type {?} */
            var newRect = Object.assign({}, this.startPosition, {
                left: this.startPosition.left + transform.x,
                right: this.startPosition.right + transform.x,
                top: this.startPosition.top + transform.y,
                bottom: this.startPosition.bottom + transform.y
            });
            return ((isWithinThreshold({ x: x, y: y }) || dragAlreadyMoved) &&
                isInside(this.dragContainerElement.getBoundingClientRect(), newRect));
        }
        else {
            return isWithinThreshold({ x: x, y: y }) || dragAlreadyMoved;
        }
    };
    return CalendarDragHelper;
}());
export { CalendarDragHelper };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CalendarDragHelper.prototype.startPosition;
    /**
     * @type {?}
     * @private
     */
    CalendarDragHelper.prototype.dragContainerElement;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZHJhZy1oZWxwZXIucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZHJhZy1oZWxwZXIucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFHckQ7SUFHRSw0QkFDVSxvQkFBaUMsRUFDekMsZ0JBQTZCO1FBRHJCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBYTtRQUd6QyxJQUFJLENBQUMsYUFBYSxHQUFHLGdCQUFnQixDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDaEUsQ0FBQzs7Ozs7SUFFRCx5Q0FBWTs7OztJQUFaLFVBQWEsRUFZWjtZQVhDLFFBQUMsRUFDRCxRQUFDLEVBQ0Qsd0NBQWlCLEVBQ2pCLHNDQUFnQixFQUNoQix3QkFBUztRQVFULElBQUksaUJBQWlCLEVBQUU7O2dCQUNmLE9BQU8sR0FBZSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNoRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUM7Z0JBQzNDLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQztnQkFDN0MsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUM7YUFDaEQsQ0FBQztZQUVGLE9BQU8sQ0FDTCxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxHQUFBLEVBQUUsQ0FBQyxHQUFBLEVBQUUsQ0FBQyxJQUFJLGdCQUFnQixDQUFDO2dCQUNqRCxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLHFCQUFxQixFQUFFLEVBQUUsT0FBTyxDQUFDLENBQ3JFLENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQztTQUN4RDtJQUNILENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUF2Q0QsSUF1Q0M7Ozs7Ozs7SUF0Q0MsMkNBQTJDOzs7OztJQUd6QyxrREFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0luc2lkZSwgaXNXaXRoaW5UaHJlc2hvbGQgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgVmFsaWRhdGVEcmFnUGFyYW1zIH0gZnJvbSAnYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlJztcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRHJhZ0hlbHBlciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhcnRQb3NpdGlvbjogQ2xpZW50UmVjdDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRyYWdDb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBkcmFnZ2FibGVFbGVtZW50OiBIVE1MRWxlbWVudFxuICApIHtcbiAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSBkcmFnZ2FibGVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG5cbiAgdmFsaWRhdGVEcmFnKHtcbiAgICB4LFxuICAgIHksXG4gICAgc25hcERyYWdnZWRFdmVudHMsXG4gICAgZHJhZ0FscmVhZHlNb3ZlZCxcbiAgICB0cmFuc2Zvcm1cbiAgfToge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG4gICAgc25hcERyYWdnZWRFdmVudHM6IGJvb2xlYW47XG4gICAgZHJhZ0FscmVhZHlNb3ZlZDogYm9vbGVhbjtcbiAgICB0cmFuc2Zvcm06IFZhbGlkYXRlRHJhZ1BhcmFtc1sndHJhbnNmb3JtJ107XG4gIH0pOiBib29sZWFuIHtcbiAgICBpZiAoc25hcERyYWdnZWRFdmVudHMpIHtcbiAgICAgIGNvbnN0IG5ld1JlY3Q6IENsaWVudFJlY3QgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXJ0UG9zaXRpb24sIHtcbiAgICAgICAgbGVmdDogdGhpcy5zdGFydFBvc2l0aW9uLmxlZnQgKyB0cmFuc2Zvcm0ueCxcbiAgICAgICAgcmlnaHQ6IHRoaXMuc3RhcnRQb3NpdGlvbi5yaWdodCArIHRyYW5zZm9ybS54LFxuICAgICAgICB0b3A6IHRoaXMuc3RhcnRQb3NpdGlvbi50b3AgKyB0cmFuc2Zvcm0ueSxcbiAgICAgICAgYm90dG9tOiB0aGlzLnN0YXJ0UG9zaXRpb24uYm90dG9tICsgdHJhbnNmb3JtLnlcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICAoaXNXaXRoaW5UaHJlc2hvbGQoeyB4LCB5IH0pIHx8IGRyYWdBbHJlYWR5TW92ZWQpICYmXG4gICAgICAgIGlzSW5zaWRlKHRoaXMuZHJhZ0NvbnRhaW5lckVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIG5ld1JlY3QpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaXNXaXRoaW5UaHJlc2hvbGQoeyB4LCB5IH0pIHx8IGRyYWdBbHJlYWR5TW92ZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=