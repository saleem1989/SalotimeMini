/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarDayViewComponent } from './calendar-day-view.component';
import { CalendarDayViewHourSegmentComponent } from './calendar-day-view-hour-segment.component';
import { CalendarDayViewEventComponent } from './calendar-day-view-event.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
export { CalendarDayViewComponent } from './calendar-day-view.component';
export class CalendarDayModule {
}
CalendarDayModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ResizableModule,
                    DragAndDropModule,
                    CalendarCommonModule
                ],
                declarations: [
                    CalendarDayViewComponent,
                    CalendarDayViewHourSegmentComponent,
                    CalendarDayViewEventComponent
                ],
                exports: [
                    ResizableModule,
                    DragAndDropModule,
                    CalendarDayViewComponent,
                    CalendarDayViewHourSegmentComponent,
                    CalendarDayViewEventComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2RheS9jYWxlbmRhci1kYXkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDakcsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDcEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFeEUsT0FBTyxFQUNMLHdCQUF3QixFQUV6QixNQUFNLCtCQUErQixDQUFDO0FBc0J2QyxNQUFNLE9BQU8saUJBQWlCOzs7WUFwQjdCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixlQUFlO29CQUNmLGlCQUFpQjtvQkFDakIsb0JBQW9CO2lCQUNyQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osd0JBQXdCO29CQUN4QixtQ0FBbUM7b0JBQ25DLDZCQUE2QjtpQkFDOUI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGVBQWU7b0JBQ2YsaUJBQWlCO29CQUNqQix3QkFBd0I7b0JBQ3hCLG1DQUFtQztvQkFDbkMsNkJBQTZCO2lCQUM5QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZXNpemFibGVNb2R1bGUgfSBmcm9tICdhbmd1bGFyLXJlc2l6YWJsZS1lbGVtZW50JztcbmltcG9ydCB7IERyYWdBbmREcm9wTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlJztcbmltcG9ydCB7IENhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItZGF5LXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyRGF5Vmlld0hvdXJTZWdtZW50Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1kYXktdmlldy1ob3VyLXNlZ21lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyRGF5Vmlld0V2ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1kYXktdmlldy1ldmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItY29tbW9uLm1vZHVsZSc7XG5cbmV4cG9ydCB7XG4gIENhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCxcbiAgQ2FsZW5kYXJEYXlWaWV3QmVmb3JlUmVuZGVyRXZlbnRcbn0gZnJvbSAnLi9jYWxlbmRhci1kYXktdmlldy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlc2l6YWJsZU1vZHVsZSxcbiAgICBEcmFnQW5kRHJvcE1vZHVsZSxcbiAgICBDYWxlbmRhckNvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDYWxlbmRhckRheVZpZXdDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJEYXlWaWV3SG91clNlZ21lbnRDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJEYXlWaWV3RXZlbnRDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFJlc2l6YWJsZU1vZHVsZSxcbiAgICBEcmFnQW5kRHJvcE1vZHVsZSxcbiAgICBDYWxlbmRhckRheVZpZXdDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJEYXlWaWV3SG91clNlZ21lbnRDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJEYXlWaWV3RXZlbnRDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRheU1vZHVsZSB7fVxuIl19