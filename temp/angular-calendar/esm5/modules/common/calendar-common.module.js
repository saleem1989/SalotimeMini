/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEventActionsComponent } from './calendar-event-actions.component';
import { CalendarEventTitleComponent } from './calendar-event-title.component';
import { CalendarTooltipDirective, CalendarTooltipWindowComponent } from './calendar-tooltip.directive';
import { CalendarPreviousViewDirective } from './calendar-previous-view.directive';
import { CalendarNextViewDirective } from './calendar-next-view.directive';
import { CalendarTodayDirective } from './calendar-today.directive';
import { CalendarDatePipe } from './calendar-date.pipe';
import { CalendarEventTitlePipe } from './calendar-event-title.pipe';
import { ClickDirective } from './click.directive';
import { CalendarEventTitleFormatter } from './calendar-event-title-formatter.provider';
import { CalendarDateFormatter } from './calendar-date-formatter.provider';
import { CalendarUtils } from './calendar-utils.provider';
/**
 * @record
 */
export function CalendarModuleConfig() { }
if (false) {
    /** @type {?|undefined} */
    CalendarModuleConfig.prototype.eventTitleFormatter;
    /** @type {?|undefined} */
    CalendarModuleConfig.prototype.dateFormatter;
    /** @type {?|undefined} */
    CalendarModuleConfig.prototype.utils;
}
export { CalendarEventTitleFormatter } from './calendar-event-title-formatter.provider';
export { MOMENT, CalendarMomentDateFormatter } from './calendar-moment-date-formatter.provider';
export { CalendarNativeDateFormatter } from './calendar-native-date-formatter.provider';
export { CalendarAngularDateFormatter } from './calendar-angular-date-formatter.provider';
export { CalendarDateFormatter } from './calendar-date-formatter.provider';
export { CalendarUtils } from './calendar-utils.provider';
export {} from './calendar-date-formatter.interface';
export { CalendarEventTimesChangedEventType } from './calendar-event-times-changed-event.interface';
export { DateAdapter } from '../../date-adapters/date-adapter';
export { CalendarView } from './calendar-view.enum';
export { DAYS_OF_WEEK } from 'calendar-utils';
/**
 * Import this module to if you're just using a singular view and want to save on bundle size. Example usage:
 *
 * ```typescript
 * import { CalendarCommonModule, CalendarMonthModule } from 'angular-calendar';
 *
 * \@NgModule({
 *   imports: [
 *     CalendarCommonModule.forRoot(),
 *     CalendarMonthModule
 *   ]
 * })
 * class MyModule {}
 * ```
 *
 */
var CalendarCommonModule = /** @class */ (function () {
    function CalendarCommonModule() {
    }
    /**
     * @param {?} dateAdapter
     * @param {?=} config
     * @return {?}
     */
    CalendarCommonModule.forRoot = /**
     * @param {?} dateAdapter
     * @param {?=} config
     * @return {?}
     */
    function (dateAdapter, config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: CalendarCommonModule,
            providers: [
                dateAdapter,
                config.eventTitleFormatter || CalendarEventTitleFormatter,
                config.dateFormatter || CalendarDateFormatter,
                config.utils || CalendarUtils
            ]
        };
    };
    CalendarCommonModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        CalendarEventActionsComponent,
                        CalendarEventTitleComponent,
                        CalendarTooltipWindowComponent,
                        CalendarTooltipDirective,
                        CalendarPreviousViewDirective,
                        CalendarNextViewDirective,
                        CalendarTodayDirective,
                        CalendarDatePipe,
                        CalendarEventTitlePipe,
                        ClickDirective
                    ],
                    imports: [CommonModule],
                    exports: [
                        CalendarEventActionsComponent,
                        CalendarEventTitleComponent,
                        CalendarTooltipWindowComponent,
                        CalendarTooltipDirective,
                        CalendarPreviousViewDirective,
                        CalendarNextViewDirective,
                        CalendarTodayDirective,
                        CalendarDatePipe,
                        CalendarEventTitlePipe,
                        ClickDirective
                    ],
                    entryComponents: [CalendarTooltipWindowComponent]
                },] }
    ];
    return CalendarCommonModule;
}());
export { CalendarCommonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1jb21tb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0UsT0FBTyxFQUNMLHdCQUF3QixFQUN4Qiw4QkFBOEIsRUFDL0IsTUFBTSw4QkFBOEIsQ0FBQztBQUN0QyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDeEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDM0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7O0FBRTFELDBDQUlDOzs7SUFIQyxtREFBK0I7O0lBQy9CLDZDQUF5Qjs7SUFDekIscUNBQWlCOztBQUduQiw0Q0FBYywyQ0FBMkMsQ0FBQztBQUMxRCxvREFBYywyQ0FBMkMsQ0FBQztBQUMxRCw0Q0FBYywyQ0FBMkMsQ0FBQztBQUMxRCw2Q0FBYyw0Q0FBNEMsQ0FBQztBQUMzRCxzQ0FBYyxvQ0FBb0MsQ0FBQztBQUNuRCw4QkFBYywyQkFBMkIsQ0FBQztBQUMxQyxlQUFjLHFDQUFxQyxDQUFDO0FBQ3BELG1EQUFjLGdEQUFnRCxDQUFDO0FBQy9ELDRCQUFjLGtDQUFrQyxDQUFDO0FBQ2pELDZCQUFjLHNCQUFzQixDQUFDO0FBRXJDLE9BQU8sRUFHTCxZQUFZLEVBRWIsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQnhCO0lBQUE7SUEyQ0EsQ0FBQzs7Ozs7O0lBZFEsNEJBQU87Ozs7O0lBQWQsVUFDRSxXQUFxQixFQUNyQixNQUFpQztRQUFqQyx1QkFBQSxFQUFBLFdBQWlDO1FBRWpDLE9BQU87WUFDTCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFNBQVMsRUFBRTtnQkFDVCxXQUFXO2dCQUNYLE1BQU0sQ0FBQyxtQkFBbUIsSUFBSSwyQkFBMkI7Z0JBQ3pELE1BQU0sQ0FBQyxhQUFhLElBQUkscUJBQXFCO2dCQUM3QyxNQUFNLENBQUMsS0FBSyxJQUFJLGFBQWE7YUFDOUI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0JBMUNGLFFBQVEsU0FBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osNkJBQTZCO3dCQUM3QiwyQkFBMkI7d0JBQzNCLDhCQUE4Qjt3QkFDOUIsd0JBQXdCO3dCQUN4Qiw2QkFBNkI7d0JBQzdCLHlCQUF5Qjt3QkFDekIsc0JBQXNCO3dCQUN0QixnQkFBZ0I7d0JBQ2hCLHNCQUFzQjt3QkFDdEIsY0FBYztxQkFDZjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRTt3QkFDUCw2QkFBNkI7d0JBQzdCLDJCQUEyQjt3QkFDM0IsOEJBQThCO3dCQUM5Qix3QkFBd0I7d0JBQ3hCLDZCQUE2Qjt3QkFDN0IseUJBQXlCO3dCQUN6QixzQkFBc0I7d0JBQ3RCLGdCQUFnQjt3QkFDaEIsc0JBQXNCO3dCQUN0QixjQUFjO3FCQUNmO29CQUNELGVBQWUsRUFBRSxDQUFDLDhCQUE4QixDQUFDO2lCQUNsRDs7SUFnQkQsMkJBQUM7Q0FBQSxBQTNDRCxJQTJDQztTQWZZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnRBY3Rpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1ldmVudC1hY3Rpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50VGl0bGVDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLWV2ZW50LXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBDYWxlbmRhclRvb2x0aXBEaXJlY3RpdmUsXG4gIENhbGVuZGFyVG9vbHRpcFdpbmRvd0NvbXBvbmVudFxufSBmcm9tICcuL2NhbGVuZGFyLXRvb2x0aXAuZGlyZWN0aXZlJztcbmltcG9ydCB7IENhbGVuZGFyUHJldmlvdXNWaWV3RGlyZWN0aXZlIH0gZnJvbSAnLi9jYWxlbmRhci1wcmV2aW91cy12aWV3LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDYWxlbmRhck5leHRWaWV3RGlyZWN0aXZlIH0gZnJvbSAnLi9jYWxlbmRhci1uZXh0LXZpZXcuZGlyZWN0aXZlJztcbmltcG9ydCB7IENhbGVuZGFyVG9kYXlEaXJlY3RpdmUgfSBmcm9tICcuL2NhbGVuZGFyLXRvZGF5LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDYWxlbmRhckRhdGVQaXBlIH0gZnJvbSAnLi9jYWxlbmRhci1kYXRlLnBpcGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudFRpdGxlUGlwZSB9IGZyb20gJy4vY2FsZW5kYXItZXZlbnQtdGl0bGUucGlwZSc7XG5pbXBvcnQgeyBDbGlja0RpcmVjdGl2ZSB9IGZyb20gJy4vY2xpY2suZGlyZWN0aXZlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnRUaXRsZUZvcm1hdHRlciB9IGZyb20gJy4vY2FsZW5kYXItZXZlbnQtdGl0bGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcbmltcG9ydCB7IENhbGVuZGFyRGF0ZUZvcm1hdHRlciB9IGZyb20gJy4vY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIucHJvdmlkZXInO1xuaW1wb3J0IHsgQ2FsZW5kYXJVdGlscyB9IGZyb20gJy4vY2FsZW5kYXItdXRpbHMucHJvdmlkZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIENhbGVuZGFyTW9kdWxlQ29uZmlnIHtcbiAgZXZlbnRUaXRsZUZvcm1hdHRlcj86IFByb3ZpZGVyO1xuICBkYXRlRm9ybWF0dGVyPzogUHJvdmlkZXI7XG4gIHV0aWxzPzogUHJvdmlkZXI7XG59XG5cbmV4cG9ydCAqIGZyb20gJy4vY2FsZW5kYXItZXZlbnQtdGl0bGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vY2FsZW5kYXItbW9tZW50LWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vY2FsZW5kYXItbmF0aXZlLWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vY2FsZW5kYXItYW5ndWxhci1kYXRlLWZvcm1hdHRlci5wcm92aWRlcic7XG5leHBvcnQgKiBmcm9tICcuL2NhbGVuZGFyLWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vY2FsZW5kYXItdXRpbHMucHJvdmlkZXInO1xuZXhwb3J0ICogZnJvbSAnLi9jYWxlbmRhci1kYXRlLWZvcm1hdHRlci5pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jYWxlbmRhci1ldmVudC10aW1lcy1jaGFuZ2VkLWV2ZW50LmludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuLi8uLi9kYXRlLWFkYXB0ZXJzL2RhdGUtYWRhcHRlcic7XG5leHBvcnQgKiBmcm9tICcuL2NhbGVuZGFyLXZpZXcuZW51bSc7XG5cbmV4cG9ydCB7XG4gIENhbGVuZGFyRXZlbnQsXG4gIEV2ZW50QWN0aW9uIGFzIENhbGVuZGFyRXZlbnRBY3Rpb24sXG4gIERBWVNfT0ZfV0VFSyxcbiAgVmlld1BlcmlvZCBhcyBDYWxlbmRhclZpZXdQZXJpb2Rcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuXG4vKipcbiAqIEltcG9ydCB0aGlzIG1vZHVsZSB0byBpZiB5b3UncmUganVzdCB1c2luZyBhIHNpbmd1bGFyIHZpZXcgYW5kIHdhbnQgdG8gc2F2ZSBvbiBidW5kbGUgc2l6ZS4gRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDYWxlbmRhckNvbW1vbk1vZHVsZSwgQ2FsZW5kYXJNb250aE1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItY2FsZW5kYXInO1xuICpcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtcbiAqICAgICBDYWxlbmRhckNvbW1vbk1vZHVsZS5mb3JSb290KCksXG4gKiAgICAgQ2FsZW5kYXJNb250aE1vZHVsZVxuICogICBdXG4gKiB9KVxuICogY2xhc3MgTXlNb2R1bGUge31cbiAqIGBgYFxuICpcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ2FsZW5kYXJFdmVudEFjdGlvbnNDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJFdmVudFRpdGxlQ29tcG9uZW50LFxuICAgIENhbGVuZGFyVG9vbHRpcFdpbmRvd0NvbXBvbmVudCxcbiAgICBDYWxlbmRhclRvb2x0aXBEaXJlY3RpdmUsXG4gICAgQ2FsZW5kYXJQcmV2aW91c1ZpZXdEaXJlY3RpdmUsXG4gICAgQ2FsZW5kYXJOZXh0Vmlld0RpcmVjdGl2ZSxcbiAgICBDYWxlbmRhclRvZGF5RGlyZWN0aXZlLFxuICAgIENhbGVuZGFyRGF0ZVBpcGUsXG4gICAgQ2FsZW5kYXJFdmVudFRpdGxlUGlwZSxcbiAgICBDbGlja0RpcmVjdGl2ZVxuICBdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIENhbGVuZGFyRXZlbnRBY3Rpb25zQ29tcG9uZW50LFxuICAgIENhbGVuZGFyRXZlbnRUaXRsZUNvbXBvbmVudCxcbiAgICBDYWxlbmRhclRvb2x0aXBXaW5kb3dDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJUb29sdGlwRGlyZWN0aXZlLFxuICAgIENhbGVuZGFyUHJldmlvdXNWaWV3RGlyZWN0aXZlLFxuICAgIENhbGVuZGFyTmV4dFZpZXdEaXJlY3RpdmUsXG4gICAgQ2FsZW5kYXJUb2RheURpcmVjdGl2ZSxcbiAgICBDYWxlbmRhckRhdGVQaXBlLFxuICAgIENhbGVuZGFyRXZlbnRUaXRsZVBpcGUsXG4gICAgQ2xpY2tEaXJlY3RpdmVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbQ2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbW1vbk1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KFxuICAgIGRhdGVBZGFwdGVyOiBQcm92aWRlcixcbiAgICBjb25maWc6IENhbGVuZGFyTW9kdWxlQ29uZmlnID0ge31cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDYWxlbmRhckNvbW1vbk1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBkYXRlQWRhcHRlcixcbiAgICAgICAgY29uZmlnLmV2ZW50VGl0bGVGb3JtYXR0ZXIgfHwgQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyLFxuICAgICAgICBjb25maWcuZGF0ZUZvcm1hdHRlciB8fCBDYWxlbmRhckRhdGVGb3JtYXR0ZXIsXG4gICAgICAgIGNvbmZpZy51dGlscyB8fCBDYWxlbmRhclV0aWxzXG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19