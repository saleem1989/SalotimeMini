/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, TemplateRef, EventEmitter, Output } from '@angular/core';
import { trackByWeekDayHeaderDate } from '../common/util';
var CalendarMonthViewHeaderComponent = /** @class */ (function () {
    function CalendarMonthViewHeaderComponent() {
        this.columnHeaderClicked = new EventEmitter();
        this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
    }
    CalendarMonthViewHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-month-view-header',
                    template: "\n    <ng-template\n      #defaultTemplate\n      let-days=\"days\"\n      let-locale=\"locale\"\n      let-trackByWeekDayHeaderDate=\"trackByWeekDayHeaderDate\"\n    >\n      <div class=\"cal-cell-row cal-header\">\n        <div\n          class=\"cal-cell\"\n          *ngFor=\"let day of days; trackBy: trackByWeekDayHeaderDate\"\n          [class.cal-past]=\"day.isPast\"\n          [class.cal-today]=\"day.isToday\"\n          [class.cal-future]=\"day.isFuture\"\n          [class.cal-weekend]=\"day.isWeekend\"\n          (click)=\"columnHeaderClicked.emit(day.day)\"\n          [ngClass]=\"day.cssClass\"\n        >\n          {{ day.date | calendarDate: 'monthViewColumnHeader':locale }}\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        days: days,\n        locale: locale,\n        trackByWeekDayHeaderDate: trackByWeekDayHeaderDate\n      }\"\n    >\n    </ng-template>\n  "
                }] }
    ];
    CalendarMonthViewHeaderComponent.propDecorators = {
        days: [{ type: Input }],
        locale: [{ type: Input }],
        customTemplate: [{ type: Input }],
        columnHeaderClicked: [{ type: Output }]
    };
    return CalendarMonthViewHeaderComponent;
}());
export { CalendarMonthViewHeaderComponent };
if (false) {
    /** @type {?} */
    CalendarMonthViewHeaderComponent.prototype.days;
    /** @type {?} */
    CalendarMonthViewHeaderComponent.prototype.locale;
    /** @type {?} */
    CalendarMonthViewHeaderComponent.prototype.customTemplate;
    /** @type {?} */
    CalendarMonthViewHeaderComponent.prototype.columnHeaderClicked;
    /** @type {?} */
    CalendarMonthViewHeaderComponent.prototype.trackByWeekDayHeaderDate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtdmlldy1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvbW9udGgvY2FsZW5kYXItbW9udGgtdmlldy1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxRDtJQUFBO1FBMENZLHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFM0QsNkJBQXdCLEdBQUcsd0JBQXdCLENBQUM7SUFDdEQsQ0FBQzs7Z0JBN0NBLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0NBQWdDO29CQUMxQyxRQUFRLEVBQUUscy9CQStCVDtpQkFDRjs7O3VCQUVFLEtBQUs7eUJBRUwsS0FBSztpQ0FFTCxLQUFLO3NDQUVMLE1BQU07O0lBR1QsdUNBQUM7Q0FBQSxBQTdDRCxJQTZDQztTQVZZLGdDQUFnQzs7O0lBQzNDLGdEQUF5Qjs7SUFFekIsa0RBQXdCOztJQUV4QiwwREFBMEM7O0lBRTFDLCtEQUEyRDs7SUFFM0Qsb0VBQW9EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgVGVtcGxhdGVSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2Vla0RheSB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZSB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLW1vbnRoLXZpZXctaGVhZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC1kYXlzPVwiZGF5c1wiXG4gICAgICBsZXQtbG9jYWxlPVwibG9jYWxlXCJcbiAgICAgIGxldC10cmFja0J5V2Vla0RheUhlYWRlckRhdGU9XCJ0cmFja0J5V2Vla0RheUhlYWRlckRhdGVcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtY2VsbC1yb3cgY2FsLWhlYWRlclwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJjYWwtY2VsbFwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzOyB0cmFja0J5OiB0cmFja0J5V2Vla0RheUhlYWRlckRhdGVcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtcGFzdF09XCJkYXkuaXNQYXN0XCJcbiAgICAgICAgICBbY2xhc3MuY2FsLXRvZGF5XT1cImRheS5pc1RvZGF5XCJcbiAgICAgICAgICBbY2xhc3MuY2FsLWZ1dHVyZV09XCJkYXkuaXNGdXR1cmVcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtd2Vla2VuZF09XCJkYXkuaXNXZWVrZW5kXCJcbiAgICAgICAgICAoY2xpY2spPVwiY29sdW1uSGVhZGVyQ2xpY2tlZC5lbWl0KGRheS5kYXkpXCJcbiAgICAgICAgICBbbmdDbGFzc109XCJkYXkuY3NzQ2xhc3NcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgZGF5LmRhdGUgfCBjYWxlbmRhckRhdGU6ICdtb250aFZpZXdDb2x1bW5IZWFkZXInOmxvY2FsZSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgZGF5czogZGF5cyxcbiAgICAgICAgbG9jYWxlOiBsb2NhbGUsXG4gICAgICAgIHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZTogdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlXG4gICAgICB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vbnRoVmlld0hlYWRlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGRheXM6IFdlZWtEYXlbXTtcblxuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KCkgY29sdW1uSGVhZGVyQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZSA9IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZTtcbn1cbiJdfQ==