/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, TemplateRef } from '@angular/core';
export class CalendarEventTitleComponent {
}
CalendarEventTitleComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-event-title',
                template: `
    <ng-template #defaultTemplate let-event="event" let-view="view">
      <span
        class="cal-event-title"
        [innerHTML]="event.title | calendarEventTitle: view:event"
      >
      </span>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        view: view
      }"
    >
    </ng-template>
  `
            }] }
];
CalendarEventTitleComponent.propDecorators = {
    event: [{ type: Input }],
    customTemplate: [{ type: Input }],
    view: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CalendarEventTitleComponent.prototype.event;
    /** @type {?} */
    CalendarEventTitleComponent.prototype.customTemplate;
    /** @type {?} */
    CalendarEventTitleComponent.prototype.view;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtdGl0bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWV2ZW50LXRpdGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBdUI5RCxNQUFNLE9BQU8sMkJBQTJCOzs7WUFwQnZDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQlQ7YUFDRjs7O29CQUVFLEtBQUs7NkJBRUwsS0FBSzttQkFFTCxLQUFLOzs7O0lBSk4sNENBQThCOztJQUU5QixxREFBMEM7O0lBRTFDLDJDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItZXZlbnQtdGl0bGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlIGxldC1ldmVudD1cImV2ZW50XCIgbGV0LXZpZXc9XCJ2aWV3XCI+XG4gICAgICA8c3BhblxuICAgICAgICBjbGFzcz1cImNhbC1ldmVudC10aXRsZVwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwiZXZlbnQudGl0bGUgfCBjYWxlbmRhckV2ZW50VGl0bGU6IHZpZXc6ZXZlbnRcIlxuICAgICAgPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICB2aWV3OiB2aWV3XG4gICAgICB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckV2ZW50VGl0bGVDb21wb25lbnQge1xuICBASW5wdXQoKSBldmVudDogQ2FsZW5kYXJFdmVudDtcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSB2aWV3OiBzdHJpbmc7XG59XG4iXX0=