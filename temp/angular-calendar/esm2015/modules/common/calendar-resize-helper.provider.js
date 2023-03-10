/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isInside } from './util';
export class CalendarResizeHelper {
    /**
     * @param {?} resizeContainerElement
     * @param {?=} minWidth
     */
    constructor(resizeContainerElement, minWidth) {
        this.resizeContainerElement = resizeContainerElement;
        this.minWidth = minWidth;
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    validateResize({ rectangle }) {
        if (this.minWidth &&
            Math.ceil(rectangle.width) < Math.ceil(this.minWidth)) {
            return false;
        }
        return isInside(this.resizeContainerElement.getBoundingClientRect(), rectangle);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmVzaXplLWhlbHBlci5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1yZXNpemUtaGVscGVyLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWxDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7O0lBQy9CLFlBQ1Usc0JBQW1DLEVBQ25DLFFBQWlCO1FBRGpCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBYTtRQUNuQyxhQUFRLEdBQVIsUUFBUSxDQUFTO0lBQ3hCLENBQUM7Ozs7O0lBRUosY0FBYyxDQUFDLEVBQUUsU0FBUyxFQUE2QjtRQUNyRCxJQUNFLElBQUksQ0FBQyxRQUFRO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQ3JEO1lBQ0EsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE9BQU8sUUFBUSxDQUNiLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxxQkFBcUIsRUFBRSxFQUNuRCxTQUFTLENBQ1YsQ0FBQztJQUNKLENBQUM7Q0FDRjs7Ozs7O0lBakJHLHNEQUEyQzs7Ozs7SUFDM0Msd0NBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNJbnNpZGUgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJSZXNpemVIZWxwZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlc2l6ZUNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIHByaXZhdGUgbWluV2lkdGg/OiBudW1iZXJcbiAgKSB7fVxuXG4gIHZhbGlkYXRlUmVzaXplKHsgcmVjdGFuZ2xlIH06IHsgcmVjdGFuZ2xlOiBDbGllbnRSZWN0IH0pOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLm1pbldpZHRoICYmXG4gICAgICBNYXRoLmNlaWwocmVjdGFuZ2xlLndpZHRoKSA8IE1hdGguY2VpbCh0aGlzLm1pbldpZHRoKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBpc0luc2lkZShcbiAgICAgIHRoaXMucmVzaXplQ29udGFpbmVyRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIHJlY3RhbmdsZVxuICAgICk7XG4gIH1cbn1cbiJdfQ==