/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { DateAdapter } from '../../date-adapters/date-adapter';
import { CalendarView } from './calendar-view.enum';
import { addDaysWithExclusions } from './util';
/**
 * Change the view date to the previous view. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarPreviousView
 *  [(viewDate)]="viewDate"
 *  [view]="view">
 *  Previous
 * </button>
 * ```
 */
var CalendarPreviousViewDirective = /** @class */ (function () {
    function CalendarPreviousViewDirective(dateAdapter) {
        this.dateAdapter = dateAdapter;
        /**
         * Days to skip when going back by 1 day
         */
        this.excludeDays = [];
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new EventEmitter();
    }
    /**
     * @hidden
     */
    /**
     * @hidden
     * @return {?}
     */
    CalendarPreviousViewDirective.prototype.onClick = /**
     * @hidden
     * @return {?}
     */
    function () {
        /** @type {?} */
        var subFn = {
            day: this.dateAdapter.subDays,
            week: this.dateAdapter.subWeeks,
            month: this.dateAdapter.subMonths
        }[this.view];
        if (this.view === CalendarView.Day) {
            this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, -1, this.excludeDays));
        }
        else if (this.view === CalendarView.Week && this.daysInWeek) {
            this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, -this.daysInWeek, this.excludeDays));
        }
        else {
            this.viewDateChange.emit(subFn(this.viewDate, 1));
        }
    };
    CalendarPreviousViewDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mwlCalendarPreviousView]'
                },] }
    ];
    /** @nocollapse */
    CalendarPreviousViewDirective.ctorParameters = function () { return [
        { type: DateAdapter }
    ]; };
    CalendarPreviousViewDirective.propDecorators = {
        view: [{ type: Input }],
        viewDate: [{ type: Input }],
        excludeDays: [{ type: Input }],
        daysInWeek: [{ type: Input }],
        viewDateChange: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return CalendarPreviousViewDirective;
}());
export { CalendarPreviousViewDirective };
if (false) {
    /**
     * The current view
     * @type {?}
     */
    CalendarPreviousViewDirective.prototype.view;
    /**
     * The current view date
     * @type {?}
     */
    CalendarPreviousViewDirective.prototype.viewDate;
    /**
     * Days to skip when going back by 1 day
     * @type {?}
     */
    CalendarPreviousViewDirective.prototype.excludeDays;
    /**
     * The number of days in a week. If set will subtract this amount of days instead of 1 week
     * @type {?}
     */
    CalendarPreviousViewDirective.prototype.daysInWeek;
    /**
     * Called when the view date is changed
     * @type {?}
     */
    CalendarPreviousViewDirective.prototype.viewDateChange;
    /**
     * @type {?}
     * @private
     */
    CalendarPreviousViewDirective.prototype.dateAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcHJldmlvdXMtdmlldy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItcHJldmlvdXMtdmlldy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7Ozs7O0FBYy9DO0lBNkJFLHVDQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTs7OztRQVpuQyxnQkFBVyxHQUFhLEVBQUUsQ0FBQzs7OztRQVUxQixtQkFBYyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRW5CLENBQUM7SUFFaEQ7O09BRUc7Ozs7O0lBRUgsK0NBQU87Ozs7SUFEUDs7WUFFUSxLQUFLLEdBQVE7WUFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTztZQUM3QixJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRO1lBQy9CLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVM7U0FDbEMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRVosSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxHQUFHLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3RCLHFCQUFxQixDQUNuQixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsUUFBUSxFQUNiLENBQUMsQ0FBQyxFQUNGLElBQUksQ0FBQyxXQUFXLENBQ2pCLENBQ0YsQ0FBQztTQUNIO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUM3RCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDdEIscUJBQXFCLENBQ25CLElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQ2IsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUNoQixJQUFJLENBQUMsV0FBVyxDQUNqQixDQUNGLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7O2dCQS9ERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtpQkFDdEM7Ozs7Z0JBbEJRLFdBQVc7Ozt1QkF1QmpCLEtBQUs7MkJBS0wsS0FBSzs4QkFLTCxLQUFLOzZCQUtMLEtBQUs7aUNBS0wsTUFBTTswQkFPTixZQUFZLFNBQUMsT0FBTzs7SUE4QnZCLG9DQUFDO0NBQUEsQUFoRUQsSUFnRUM7U0E3RFksNkJBQTZCOzs7Ozs7SUFJeEMsNkNBQTRCOzs7OztJQUs1QixpREFBd0I7Ozs7O0lBS3hCLG9EQUFvQzs7Ozs7SUFLcEMsbURBQTRCOzs7OztJQUs1Qix1REFBa0U7Ozs7O0lBRXRELG9EQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4uLy4uL2RhdGUtYWRhcHRlcnMvZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7IENhbGVuZGFyVmlldyB9IGZyb20gJy4vY2FsZW5kYXItdmlldy5lbnVtJztcbmltcG9ydCB7IGFkZERheXNXaXRoRXhjbHVzaW9ucyB9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQ2hhbmdlIHRoZSB2aWV3IGRhdGUgdG8gdGhlIHByZXZpb3VzIHZpZXcuIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIDxidXR0b25cbiAqICBtd2xDYWxlbmRhclByZXZpb3VzVmlld1xuICogIFsodmlld0RhdGUpXT1cInZpZXdEYXRlXCJcbiAqICBbdmlld109XCJ2aWV3XCI+XG4gKiAgUHJldmlvdXNcbiAqIDwvYnV0dG9uPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttd2xDYWxlbmRhclByZXZpb3VzVmlld10nXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyUHJldmlvdXNWaWV3RGlyZWN0aXZlIHtcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIHZpZXc6IENhbGVuZGFyVmlldztcblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlldyBkYXRlXG4gICAqL1xuICBASW5wdXQoKSB2aWV3RGF0ZTogRGF0ZTtcblxuICAvKipcbiAgICogRGF5cyB0byBza2lwIHdoZW4gZ29pbmcgYmFjayBieSAxIGRheVxuICAgKi9cbiAgQElucHV0KCkgZXhjbHVkZURheXM6IG51bWJlcltdID0gW107XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHdlZWsuIElmIHNldCB3aWxsIHN1YnRyYWN0IHRoaXMgYW1vdW50IG9mIGRheXMgaW5zdGVhZCBvZiAxIHdlZWtcbiAgICovXG4gIEBJbnB1dCgpIGRheXNJbldlZWs6IG51bWJlcjtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHZpZXcgZGF0ZSBpcyBjaGFuZ2VkXG4gICAqL1xuICBAT3V0cHV0KCkgdmlld0RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcikge31cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIGNvbnN0IHN1YkZuOiBhbnkgPSB7XG4gICAgICBkYXk6IHRoaXMuZGF0ZUFkYXB0ZXIuc3ViRGF5cyxcbiAgICAgIHdlZWs6IHRoaXMuZGF0ZUFkYXB0ZXIuc3ViV2Vla3MsXG4gICAgICBtb250aDogdGhpcy5kYXRlQWRhcHRlci5zdWJNb250aHNcbiAgICB9W3RoaXMudmlld107XG5cbiAgICBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcuRGF5KSB7XG4gICAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoXG4gICAgICAgIGFkZERheXNXaXRoRXhjbHVzaW9ucyhcbiAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgICAgIHRoaXMudmlld0RhdGUsXG4gICAgICAgICAgLTEsXG4gICAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xuICAgICAgICApXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcuV2VlayAmJiB0aGlzLmRheXNJbldlZWspIHtcbiAgICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChcbiAgICAgICAgYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxuICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXG4gICAgICAgICAgdGhpcy52aWV3RGF0ZSxcbiAgICAgICAgICAtdGhpcy5kYXlzSW5XZWVrLFxuICAgICAgICAgIHRoaXMuZXhjbHVkZURheXNcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KHN1YkZuKHRoaXMudmlld0RhdGUsIDEpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==