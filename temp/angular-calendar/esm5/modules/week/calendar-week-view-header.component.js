/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { trackByWeekDayHeaderDate } from '../common/util';
var CalendarWeekViewHeaderComponent = /** @class */ (function () {
    function CalendarWeekViewHeaderComponent() {
        this.dayHeaderClicked = new EventEmitter();
        this.eventDropped = new EventEmitter();
        this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
    }
    CalendarWeekViewHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-week-view-header',
                    template: "\n    <ng-template\n      #defaultTemplate\n      let-days=\"days\"\n      let-locale=\"locale\"\n      let-dayHeaderClicked=\"dayHeaderClicked\"\n      let-eventDropped=\"eventDropped\"\n      let-trackByWeekDayHeaderDate=\"trackByWeekDayHeaderDate\"\n    >\n      <div class=\"cal-day-headers\">\n        <div\n          class=\"cal-header\"\n          *ngFor=\"let day of days; trackBy: trackByWeekDayHeaderDate\"\n          [class.cal-past]=\"day.isPast\"\n          [class.cal-today]=\"day.isToday\"\n          [class.cal-future]=\"day.isFuture\"\n          [class.cal-weekend]=\"day.isWeekend\"\n          [ngClass]=\"day.cssClass\"\n          (mwlClick)=\"dayHeaderClicked.emit({ day: day })\"\n          mwlDroppable\n          dragOverClass=\"cal-drag-over\"\n          (drop)=\"\n            eventDropped.emit({\n              event: $event.dropData.event,\n              newStart: day.date\n            })\n          \"\n        >\n          <b>{{ day.date | calendarDate: 'weekViewColumnHeader':locale }}</b\n          ><br />\n          <span>{{\n            day.date | calendarDate: 'weekViewColumnSubHeader':locale\n          }}</span>\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        days: days,\n        locale: locale,\n        dayHeaderClicked: dayHeaderClicked,\n        eventDropped: eventDropped,\n        trackByWeekDayHeaderDate: trackByWeekDayHeaderDate\n      }\"\n    >\n    </ng-template>\n  "
                }] }
    ];
    CalendarWeekViewHeaderComponent.propDecorators = {
        days: [{ type: Input }],
        locale: [{ type: Input }],
        customTemplate: [{ type: Input }],
        dayHeaderClicked: [{ type: Output }],
        eventDropped: [{ type: Output }]
    };
    return CalendarWeekViewHeaderComponent;
}());
export { CalendarWeekViewHeaderComponent };
if (false) {
    /** @type {?} */
    CalendarWeekViewHeaderComponent.prototype.days;
    /** @type {?} */
    CalendarWeekViewHeaderComponent.prototype.locale;
    /** @type {?} */
    CalendarWeekViewHeaderComponent.prototype.customTemplate;
    /** @type {?} */
    CalendarWeekViewHeaderComponent.prototype.dayHeaderClicked;
    /** @type {?} */
    CalendarWeekViewHeaderComponent.prototype.eventDropped;
    /** @type {?} */
    CalendarWeekViewHeaderComponent.prototype.trackByWeekDayHeaderDate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWhlYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy93ZWVrL2NhbGVuZGFyLXdlZWstdmlldy1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxRDtJQUFBO1FBMkRFLHFCQUFnQixHQUFtQyxJQUFJLFlBQVksRUFFL0QsQ0FBQztRQUdMLGlCQUFZLEdBR1AsSUFBSSxZQUFZLEVBQTRDLENBQUM7UUFFbEUsNkJBQXdCLEdBQUcsd0JBQXdCLENBQUM7SUFDdEQsQ0FBQzs7Z0JBdEVBLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsK0JBQStCO29CQUN6QyxRQUFRLEVBQUUsK2dEQStDVDtpQkFDRjs7O3VCQUVFLEtBQUs7eUJBRUwsS0FBSztpQ0FFTCxLQUFLO21DQUVMLE1BQU07K0JBS04sTUFBTTs7SUFPVCxzQ0FBQztDQUFBLEFBdEVELElBc0VDO1NBbkJZLCtCQUErQjs7O0lBQzFDLCtDQUF5Qjs7SUFFekIsaURBQXdCOztJQUV4Qix5REFBMEM7O0lBRTFDLDJEQUdLOztJQUVMLHVEQUlrRTs7SUFFbEUsbUVBQW9EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCwgV2Vla0RheSB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZSB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLXdlZWstdmlldy1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LWRheXM9XCJkYXlzXCJcbiAgICAgIGxldC1sb2NhbGU9XCJsb2NhbGVcIlxuICAgICAgbGV0LWRheUhlYWRlckNsaWNrZWQ9XCJkYXlIZWFkZXJDbGlja2VkXCJcbiAgICAgIGxldC1ldmVudERyb3BwZWQ9XCJldmVudERyb3BwZWRcIlxuICAgICAgbGV0LXRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZT1cInRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZVwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cImNhbC1kYXktaGVhZGVyc1wiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJjYWwtaGVhZGVyXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgZGF5IG9mIGRheXM7IHRyYWNrQnk6IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZVwiXG4gICAgICAgICAgW2NsYXNzLmNhbC1wYXN0XT1cImRheS5pc1Bhc3RcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtdG9kYXldPVwiZGF5LmlzVG9kYXlcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtZnV0dXJlXT1cImRheS5pc0Z1dHVyZVwiXG4gICAgICAgICAgW2NsYXNzLmNhbC13ZWVrZW5kXT1cImRheS5pc1dlZWtlbmRcIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cImRheS5jc3NDbGFzc1wiXG4gICAgICAgICAgKG13bENsaWNrKT1cImRheUhlYWRlckNsaWNrZWQuZW1pdCh7IGRheTogZGF5IH0pXCJcbiAgICAgICAgICBtd2xEcm9wcGFibGVcbiAgICAgICAgICBkcmFnT3ZlckNsYXNzPVwiY2FsLWRyYWctb3ZlclwiXG4gICAgICAgICAgKGRyb3ApPVwiXG4gICAgICAgICAgICBldmVudERyb3BwZWQuZW1pdCh7XG4gICAgICAgICAgICAgIGV2ZW50OiAkZXZlbnQuZHJvcERhdGEuZXZlbnQsXG4gICAgICAgICAgICAgIG5ld1N0YXJ0OiBkYXkuZGF0ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBcIlxuICAgICAgICA+XG4gICAgICAgICAgPGI+e3sgZGF5LmRhdGUgfCBjYWxlbmRhckRhdGU6ICd3ZWVrVmlld0NvbHVtbkhlYWRlcic6bG9jYWxlIH19PC9iXG4gICAgICAgICAgPjxiciAvPlxuICAgICAgICAgIDxzcGFuPnt7XG4gICAgICAgICAgICBkYXkuZGF0ZSB8IGNhbGVuZGFyRGF0ZTogJ3dlZWtWaWV3Q29sdW1uU3ViSGVhZGVyJzpsb2NhbGVcbiAgICAgICAgICB9fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGRheXM6IGRheXMsXG4gICAgICAgIGxvY2FsZTogbG9jYWxlLFxuICAgICAgICBkYXlIZWFkZXJDbGlja2VkOiBkYXlIZWFkZXJDbGlja2VkLFxuICAgICAgICBldmVudERyb3BwZWQ6IGV2ZW50RHJvcHBlZCxcbiAgICAgICAgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlOiB0cmFja0J5V2Vla0RheUhlYWRlckRhdGVcbiAgICAgIH1cIlxuICAgID5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyV2Vla1ZpZXdIZWFkZXJDb21wb25lbnQge1xuICBASW5wdXQoKSBkYXlzOiBXZWVrRGF5W107XG5cbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQE91dHB1dCgpXG4gIGRheUhlYWRlckNsaWNrZWQ6IEV2ZW50RW1pdHRlcjx7IGRheTogV2Vla0RheSB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGRheTogV2Vla0RheTtcbiAgfT4oKTtcblxuICBAT3V0cHV0KClcbiAgZXZlbnREcm9wcGVkOiBFdmVudEVtaXR0ZXI8e1xuICAgIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuICAgIG5ld1N0YXJ0OiBEYXRlO1xuICB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8eyBldmVudDogQ2FsZW5kYXJFdmVudDsgbmV3U3RhcnQ6IERhdGUgfT4oKTtcblxuICB0cmFja0J5V2Vla0RheUhlYWRlckRhdGUgPSB0cmFja0J5V2Vla0RheUhlYWRlckRhdGU7XG59XG4iXX0=