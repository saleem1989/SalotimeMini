/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { CalendarEventTitleFormatter } from './calendar-event-title-formatter.provider';
export class CalendarEventTitlePipe {
    /**
     * @param {?} calendarEventTitle
     */
    constructor(calendarEventTitle) {
        this.calendarEventTitle = calendarEventTitle;
    }
    /**
     * @param {?} title
     * @param {?} titleType
     * @param {?} event
     * @return {?}
     */
    transform(title, titleType, event) {
        return this.calendarEventTitle[titleType](event, title);
    }
}
CalendarEventTitlePipe.decorators = [
    { type: Pipe, args: [{
                name: 'calendarEventTitle'
            },] }
];
/** @nocollapse */
CalendarEventTitlePipe.ctorParameters = () => [
    { type: CalendarEventTitleFormatter }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    CalendarEventTitlePipe.prototype.calendarEventTitle;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtdGl0bGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1ldmVudC10aXRsZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUt4RixNQUFNLE9BQU8sc0JBQXNCOzs7O0lBQ2pDLFlBQW9CLGtCQUErQztRQUEvQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQTZCO0lBQUcsQ0FBQzs7Ozs7OztJQUV2RSxTQUFTLENBQUMsS0FBYSxFQUFFLFNBQWlCLEVBQUUsS0FBb0I7UUFDOUQsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7OztZQVJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsb0JBQW9CO2FBQzNCOzs7O1lBSlEsMkJBQTJCOzs7Ozs7O0lBTXRCLG9EQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50VGl0bGVGb3JtYXR0ZXIgfSBmcm9tICcuL2NhbGVuZGFyLWV2ZW50LXRpdGxlLWZvcm1hdHRlci5wcm92aWRlcic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2NhbGVuZGFyRXZlbnRUaXRsZSdcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJFdmVudFRpdGxlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhbGVuZGFyRXZlbnRUaXRsZTogQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyKSB7fVxuXG4gIHRyYW5zZm9ybSh0aXRsZTogc3RyaW5nLCB0aXRsZVR5cGU6IHN0cmluZywgZXZlbnQ6IENhbGVuZGFyRXZlbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNhbGVuZGFyRXZlbnRUaXRsZVt0aXRsZVR5cGVdKGV2ZW50LCB0aXRsZSk7XG4gIH1cbn1cbiJdfQ==