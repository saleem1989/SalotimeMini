/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { isWithinThreshold, trackByEventId } from '../common/util';
var CalendarMonthCellComponent = /** @class */ (function () {
    function CalendarMonthCellComponent() {
        this.highlightDay = new EventEmitter();
        this.unhighlightDay = new EventEmitter();
        this.eventClicked = new EventEmitter();
        this.trackByEventId = trackByEventId;
        this.validateDrag = isWithinThreshold;
    }
    CalendarMonthCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-month-cell',
                    template: "\n    <ng-template\n      #defaultTemplate\n      let-day=\"day\"\n      let-openDay=\"openDay\"\n      let-locale=\"locale\"\n      let-tooltipPlacement=\"tooltipPlacement\"\n      let-highlightDay=\"highlightDay\"\n      let-unhighlightDay=\"unhighlightDay\"\n      let-eventClicked=\"eventClicked\"\n      let-tooltipTemplate=\"tooltipTemplate\"\n      let-tooltipAppendToBody=\"tooltipAppendToBody\"\n      let-tooltipDelay=\"tooltipDelay\"\n      let-trackByEventId=\"trackByEventId\"\n      let-validateDrag=\"validateDrag\"\n    >\n      <div class=\"cal-cell-top\">\n        <span class=\"cal-day-badge\" *ngIf=\"day.badgeTotal > 0\">{{\n          day.badgeTotal\n        }}</span>\n        <span class=\"cal-day-number\">{{\n          day.date | calendarDate: 'monthViewDayNumber':locale\n        }}</span>\n      </div>\n      <div class=\"cal-events\" *ngIf=\"day.events.length > 0\">\n        <div\n          class=\"cal-event\"\n          *ngFor=\"let event of day.events; trackBy: trackByEventId\"\n          [ngStyle]=\"{ backgroundColor: event.color?.primary }\"\n          [ngClass]=\"event?.cssClass\"\n          (mouseenter)=\"highlightDay.emit({ event: event })\"\n          (mouseleave)=\"unhighlightDay.emit({ event: event })\"\n          [mwlCalendarTooltip]=\"\n            event.title | calendarEventTitle: 'monthTooltip':event\n          \"\n          [tooltipPlacement]=\"tooltipPlacement\"\n          [tooltipEvent]=\"event\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipAppendToBody]=\"tooltipAppendToBody\"\n          [tooltipDelay]=\"tooltipDelay\"\n          mwlDraggable\n          [class.cal-draggable]=\"event.draggable\"\n          dragActiveClass=\"cal-drag-active\"\n          [dropData]=\"{ event: event, draggedFrom: day }\"\n          [dragAxis]=\"{ x: event.draggable, y: event.draggable }\"\n          [validateDrag]=\"validateDrag\"\n          (mwlClick)=\"eventClicked.emit({ event: event })\"\n        ></div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        day: day,\n        openDay: openDay,\n        locale: locale,\n        tooltipPlacement: tooltipPlacement,\n        highlightDay: highlightDay,\n        unhighlightDay: unhighlightDay,\n        eventClicked: eventClicked,\n        tooltipTemplate: tooltipTemplate,\n        tooltipAppendToBody: tooltipAppendToBody,\n        tooltipDelay: tooltipDelay,\n        trackByEventId: trackByEventId,\n        validateDrag: validateDrag\n      }\"\n    >\n    </ng-template>\n  ",
                    host: {
                        class: 'cal-cell cal-day-cell',
                        '[class.cal-past]': 'day.isPast',
                        '[class.cal-today]': 'day.isToday',
                        '[class.cal-future]': 'day.isFuture',
                        '[class.cal-weekend]': 'day.isWeekend',
                        '[class.cal-in-month]': 'day.inMonth',
                        '[class.cal-out-month]': '!day.inMonth',
                        '[class.cal-has-events]': 'day.events.length > 0',
                        '[class.cal-open]': 'day === openDay',
                        '[class.cal-event-highlight]': '!!day.backgroundColor'
                    }
                }] }
    ];
    CalendarMonthCellComponent.propDecorators = {
        day: [{ type: Input }],
        openDay: [{ type: Input }],
        locale: [{ type: Input }],
        tooltipPlacement: [{ type: Input }],
        tooltipAppendToBody: [{ type: Input }],
        customTemplate: [{ type: Input }],
        tooltipTemplate: [{ type: Input }],
        tooltipDelay: [{ type: Input }],
        highlightDay: [{ type: Output }],
        unhighlightDay: [{ type: Output }],
        eventClicked: [{ type: Output }]
    };
    return CalendarMonthCellComponent;
}());
export { CalendarMonthCellComponent };
if (false) {
    /** @type {?} */
    CalendarMonthCellComponent.prototype.day;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.openDay;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.locale;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.tooltipPlacement;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.tooltipAppendToBody;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.customTemplate;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.tooltipTemplate;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.tooltipDelay;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.highlightDay;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.unhighlightDay;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.eventClicked;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.trackByEventId;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.validateDrag;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9tb250aC9jYWxlbmRhci1tb250aC1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR25FO0lBQUE7UUFxR1ksaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVyRCxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2pFLGlCQUFZLEdBQTJDLElBQUksWUFBWSxFQUVuRSxDQUFDO1FBRUwsbUJBQWMsR0FBRyxjQUFjLENBQUM7UUFFaEMsaUJBQVksR0FBRyxpQkFBaUIsQ0FBQztJQUNuQyxDQUFDOztnQkFqSEEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFFBQVEsRUFBRSxzakZBb0VUO29CQUNELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsdUJBQXVCO3dCQUM5QixrQkFBa0IsRUFBRSxZQUFZO3dCQUNoQyxtQkFBbUIsRUFBRSxhQUFhO3dCQUNsQyxvQkFBb0IsRUFBRSxjQUFjO3dCQUNwQyxxQkFBcUIsRUFBRSxlQUFlO3dCQUN0QyxzQkFBc0IsRUFBRSxhQUFhO3dCQUNyQyx1QkFBdUIsRUFBRSxjQUFjO3dCQUN2Qyx3QkFBd0IsRUFBRSx1QkFBdUI7d0JBQ2pELGtCQUFrQixFQUFFLGlCQUFpQjt3QkFDckMsNkJBQTZCLEVBQUUsdUJBQXVCO3FCQUN2RDtpQkFDRjs7O3NCQUVFLEtBQUs7MEJBRUwsS0FBSzt5QkFFTCxLQUFLO21DQUVMLEtBQUs7c0NBRUwsS0FBSztpQ0FFTCxLQUFLO2tDQUVMLEtBQUs7K0JBRUwsS0FBSzsrQkFFTCxNQUFNO2lDQUVOLE1BQU07K0JBRU4sTUFBTTs7SUFRVCxpQ0FBQztDQUFBLEFBakhELElBaUhDO1NBN0JZLDBCQUEwQjs7O0lBQ3JDLHlDQUEyQjs7SUFFM0IsNkNBQStCOztJQUUvQiw0Q0FBd0I7O0lBRXhCLHNEQUEwQzs7SUFFMUMseURBQXNDOztJQUV0QyxvREFBMEM7O0lBRTFDLHFEQUEyQzs7SUFFM0Msa0RBQXFDOztJQUVyQyxrREFBK0Q7O0lBRS9ELG9EQUFpRTs7SUFFakUsa0RBR0s7O0lBRUwsb0RBQWdDOztJQUVoQyxrREFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb250aFZpZXdEYXksIENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBpc1dpdGhpblRocmVzaG9sZCwgdHJhY2tCeUV2ZW50SWQgfSBmcm9tICcuLi9jb21tb24vdXRpbCc7XG5pbXBvcnQgeyBQbGFjZW1lbnRBcnJheSB9IGZyb20gJ3Bvc2l0aW9uaW5nJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLW1vbnRoLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LWRheT1cImRheVwiXG4gICAgICBsZXQtb3BlbkRheT1cIm9wZW5EYXlcIlxuICAgICAgbGV0LWxvY2FsZT1cImxvY2FsZVwiXG4gICAgICBsZXQtdG9vbHRpcFBsYWNlbWVudD1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgbGV0LWhpZ2hsaWdodERheT1cImhpZ2hsaWdodERheVwiXG4gICAgICBsZXQtdW5oaWdobGlnaHREYXk9XCJ1bmhpZ2hsaWdodERheVwiXG4gICAgICBsZXQtZXZlbnRDbGlja2VkPVwiZXZlbnRDbGlja2VkXCJcbiAgICAgIGxldC10b29sdGlwVGVtcGxhdGU9XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgbGV0LXRvb2x0aXBBcHBlbmRUb0JvZHk9XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcbiAgICAgIGxldC10b29sdGlwRGVsYXk9XCJ0b29sdGlwRGVsYXlcIlxuICAgICAgbGV0LXRyYWNrQnlFdmVudElkPVwidHJhY2tCeUV2ZW50SWRcIlxuICAgICAgbGV0LXZhbGlkYXRlRHJhZz1cInZhbGlkYXRlRHJhZ1wiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cImNhbC1jZWxsLXRvcFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNhbC1kYXktYmFkZ2VcIiAqbmdJZj1cImRheS5iYWRnZVRvdGFsID4gMFwiPnt7XG4gICAgICAgICAgZGF5LmJhZGdlVG90YWxcbiAgICAgICAgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2FsLWRheS1udW1iZXJcIj57e1xuICAgICAgICAgIGRheS5kYXRlIHwgY2FsZW5kYXJEYXRlOiAnbW9udGhWaWV3RGF5TnVtYmVyJzpsb2NhbGVcbiAgICAgICAgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnRzXCIgKm5nSWY9XCJkYXkuZXZlbnRzLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50XCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgZXZlbnQgb2YgZGF5LmV2ZW50czsgdHJhY2tCeTogdHJhY2tCeUV2ZW50SWRcIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cInsgYmFja2dyb3VuZENvbG9yOiBldmVudC5jb2xvcj8ucHJpbWFyeSB9XCJcbiAgICAgICAgICBbbmdDbGFzc109XCJldmVudD8uY3NzQ2xhc3NcIlxuICAgICAgICAgIChtb3VzZWVudGVyKT1cImhpZ2hsaWdodERheS5lbWl0KHsgZXZlbnQ6IGV2ZW50IH0pXCJcbiAgICAgICAgICAobW91c2VsZWF2ZSk9XCJ1bmhpZ2hsaWdodERheS5lbWl0KHsgZXZlbnQ6IGV2ZW50IH0pXCJcbiAgICAgICAgICBbbXdsQ2FsZW5kYXJUb29sdGlwXT1cIlxuICAgICAgICAgICAgZXZlbnQudGl0bGUgfCBjYWxlbmRhckV2ZW50VGl0bGU6ICdtb250aFRvb2x0aXAnOmV2ZW50XG4gICAgICAgICAgXCJcbiAgICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgICAgICBbdG9vbHRpcEV2ZW50XT1cImV2ZW50XCJcbiAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBBcHBlbmRUb0JvZHldPVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXG4gICAgICAgICAgW3Rvb2x0aXBEZWxheV09XCJ0b29sdGlwRGVsYXlcIlxuICAgICAgICAgIG13bERyYWdnYWJsZVxuICAgICAgICAgIFtjbGFzcy5jYWwtZHJhZ2dhYmxlXT1cImV2ZW50LmRyYWdnYWJsZVwiXG4gICAgICAgICAgZHJhZ0FjdGl2ZUNsYXNzPVwiY2FsLWRyYWctYWN0aXZlXCJcbiAgICAgICAgICBbZHJvcERhdGFdPVwieyBldmVudDogZXZlbnQsIGRyYWdnZWRGcm9tOiBkYXkgfVwiXG4gICAgICAgICAgW2RyYWdBeGlzXT1cInsgeDogZXZlbnQuZHJhZ2dhYmxlLCB5OiBldmVudC5kcmFnZ2FibGUgfVwiXG4gICAgICAgICAgW3ZhbGlkYXRlRHJhZ109XCJ2YWxpZGF0ZURyYWdcIlxuICAgICAgICAgIChtd2xDbGljayk9XCJldmVudENsaWNrZWQuZW1pdCh7IGV2ZW50OiBldmVudCB9KVwiXG4gICAgICAgID48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgZGF5OiBkYXksXG4gICAgICAgIG9wZW5EYXk6IG9wZW5EYXksXG4gICAgICAgIGxvY2FsZTogbG9jYWxlLFxuICAgICAgICB0b29sdGlwUGxhY2VtZW50OiB0b29sdGlwUGxhY2VtZW50LFxuICAgICAgICBoaWdobGlnaHREYXk6IGhpZ2hsaWdodERheSxcbiAgICAgICAgdW5oaWdobGlnaHREYXk6IHVuaGlnaGxpZ2h0RGF5LFxuICAgICAgICBldmVudENsaWNrZWQ6IGV2ZW50Q2xpY2tlZCxcbiAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiB0b29sdGlwVGVtcGxhdGUsXG4gICAgICAgIHRvb2x0aXBBcHBlbmRUb0JvZHk6IHRvb2x0aXBBcHBlbmRUb0JvZHksXG4gICAgICAgIHRvb2x0aXBEZWxheTogdG9vbHRpcERlbGF5LFxuICAgICAgICB0cmFja0J5RXZlbnRJZDogdHJhY2tCeUV2ZW50SWQsXG4gICAgICAgIHZhbGlkYXRlRHJhZzogdmFsaWRhdGVEcmFnXG4gICAgICB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnY2FsLWNlbGwgY2FsLWRheS1jZWxsJyxcbiAgICAnW2NsYXNzLmNhbC1wYXN0XSc6ICdkYXkuaXNQYXN0JyxcbiAgICAnW2NsYXNzLmNhbC10b2RheV0nOiAnZGF5LmlzVG9kYXknLFxuICAgICdbY2xhc3MuY2FsLWZ1dHVyZV0nOiAnZGF5LmlzRnV0dXJlJyxcbiAgICAnW2NsYXNzLmNhbC13ZWVrZW5kXSc6ICdkYXkuaXNXZWVrZW5kJyxcbiAgICAnW2NsYXNzLmNhbC1pbi1tb250aF0nOiAnZGF5LmluTW9udGgnLFxuICAgICdbY2xhc3MuY2FsLW91dC1tb250aF0nOiAnIWRheS5pbk1vbnRoJyxcbiAgICAnW2NsYXNzLmNhbC1oYXMtZXZlbnRzXSc6ICdkYXkuZXZlbnRzLmxlbmd0aCA+IDAnLFxuICAgICdbY2xhc3MuY2FsLW9wZW5dJzogJ2RheSA9PT0gb3BlbkRheScsXG4gICAgJ1tjbGFzcy5jYWwtZXZlbnQtaGlnaGxpZ2h0XSc6ICchIWRheS5iYWNrZ3JvdW5kQ29sb3InXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb250aENlbGxDb21wb25lbnQge1xuICBASW5wdXQoKSBkYXk6IE1vbnRoVmlld0RheTtcblxuICBASW5wdXQoKSBvcGVuRGF5OiBNb250aFZpZXdEYXk7XG5cbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XG5cbiAgQElucHV0KCkgdG9vbHRpcEFwcGVuZFRvQm9keTogYm9vbGVhbjtcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgdG9vbHRpcERlbGF5OiBudW1iZXIgfCBudWxsO1xuXG4gIEBPdXRwdXQoKSBoaWdobGlnaHREYXk6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKSB1bmhpZ2hsaWdodERheTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpXG4gIGV2ZW50Q2xpY2tlZDogRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IENhbGVuZGFyRXZlbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBldmVudDogQ2FsZW5kYXJFdmVudDtcbiAgfT4oKTtcblxuICB0cmFja0J5RXZlbnRJZCA9IHRyYWNrQnlFdmVudElkO1xuXG4gIHZhbGlkYXRlRHJhZyA9IGlzV2l0aGluVGhyZXNob2xkO1xufVxuIl19