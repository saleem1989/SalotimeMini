/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, LOCALE_ID, Inject, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarDragHelper } from '../common/calendar-drag-helper.provider';
import { CalendarResizeHelper } from '../common/calendar-resize-helper.provider';
import { CalendarEventTimesChangedEventType } from '../common/calendar-event-times-changed-event.interface';
import { CalendarUtils } from '../common/calendar-utils.provider';
import { validateEvents, trackByEventId, trackByHour, trackByHourSegment, getMinutesMoved, getDefaultEventEnd, getMinimumEventHeightInMinutes, trackByDayOrWeekEvent, isDraggedWithinPeriod, shouldFireDroppedEvent } from '../common/util';
import { DateAdapter } from '../../date-adapters/date-adapter';
/**
 * @record
 */
export function CalendarDayViewBeforeRenderEvent() { }
if (false) {
    /** @type {?} */
    CalendarDayViewBeforeRenderEvent.prototype.body;
    /** @type {?} */
    CalendarDayViewBeforeRenderEvent.prototype.period;
}
/**
 * @hidden
 * @record
 */
export function DayViewEventResize() { }
if (false) {
    /** @type {?} */
    DayViewEventResize.prototype.originalTop;
    /** @type {?} */
    DayViewEventResize.prototype.originalHeight;
    /** @type {?} */
    DayViewEventResize.prototype.edge;
}
/**
 * Shows all events on a given day. Example usage:
 *
 * ```typescript
 * <mwl-calendar-day-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-day-view>
 * ```
 */
var CalendarDayViewComponent = /** @class */ (function () {
    /**
     * @hidden
     */
    function CalendarDayViewComponent(cdr, utils, locale, dateAdapter) {
        this.cdr = cdr;
        this.utils = utils;
        this.dateAdapter = dateAdapter;
        /**
         * An array of events to display on view
         * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
         */
        this.events = [];
        /**
         * The number of segments in an hour. Must be <= 6
         */
        this.hourSegments = 2;
        /**
         * The height in pixels of each hour segment
         */
        this.hourSegmentHeight = 30;
        /**
         * The day start hours in 24 hour time. Must be 0-23
         */
        this.dayStartHour = 0;
        /**
         * The day start minutes. Must be 0-59
         */
        this.dayStartMinute = 0;
        /**
         * The day end hours in 24 hour time. Must be 0-23
         */
        this.dayEndHour = 23;
        /**
         * The day end minutes. Must be 0-59
         */
        this.dayEndMinute = 59;
        /**
         * The width in pixels of each event on the view
         */
        this.eventWidth = 150;
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'auto';
        /**
         * Whether to append tooltips to the body or next to the trigger element
         */
        this.tooltipAppendToBody = true;
        /**
         * The delay in milliseconds before the tooltip should be displayed. If not provided the tooltip
         * will be displayed immediately.
         */
        this.tooltipDelay = null;
        /**
         * Whether to snap events to a grid when dragging
         */
        this.snapDraggedEvents = true;
        /**
         * Called when an event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new EventEmitter();
        /**
         * Called when an event is resized or dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        /**
         * An output that will be called before the view is rendered for the current day.
         * If you add the `cssClass` property to an hour grid segment it will add that class to the hour segment in the template
         */
        this.beforeViewRender = new EventEmitter();
        /**
         * @hidden
         */
        this.hours = [];
        /**
         * @hidden
         */
        this.width = 0;
        /**
         * @hidden
         */
        this.currentResizes = new Map();
        /**
         * @hidden
         */
        this.eventDragEnter = 0;
        /**
         * @hidden
         */
        this.calendarId = Symbol('angular calendar day view id');
        /**
         * @hidden
         */
        this.dragAlreadyMoved = false;
        /**
         * @hidden
         */
        this.trackByEventId = trackByEventId;
        /**
         * @hidden
         */
        this.trackByHour = trackByHour;
        /**
         * @hidden
         */
        this.trackByHourSegment = trackByHourSegment;
        /**
         * @hidden
         */
        this.trackByDayEvent = trackByDayOrWeekEvent;
        this.locale = locale;
    }
    /**
     * @hidden
     */
    /**
     * @hidden
     * @return {?}
     */
    CalendarDayViewComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe((/**
             * @return {?}
             */
            function () {
                _this.refreshAll();
                _this.cdr.markForCheck();
            }));
        }
    };
    /**
     * @hidden
     */
    /**
     * @hidden
     * @return {?}
     */
    CalendarDayViewComponent.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    CalendarDayViewComponent.prototype.ngOnChanges = /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var refreshHourGrid = changes.viewDate ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.hourSegments;
        /** @type {?} */
        var refreshView = changes.viewDate ||
            changes.events ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.eventWidth ||
            changes.hourSegments;
        if (refreshHourGrid) {
            this.refreshHourGrid();
        }
        if (changes.events) {
            validateEvents(this.events);
        }
        if (refreshView) {
            this.refreshView();
        }
        if (refreshHourGrid || refreshView) {
            this.emitBeforeViewRender();
        }
    };
    /**
     * @param {?} dropEvent
     * @param {?} date
     * @param {?} allDay
     * @return {?}
     */
    CalendarDayViewComponent.prototype.eventDropped = /**
     * @param {?} dropEvent
     * @param {?} date
     * @param {?} allDay
     * @return {?}
     */
    function (dropEvent, date, allDay) {
        if (shouldFireDroppedEvent(dropEvent, date, allDay, this.calendarId)) {
            this.eventTimesChanged.emit({
                type: CalendarEventTimesChangedEventType.Drop,
                event: dropEvent.dropData.event,
                newStart: date,
                allDay: allDay
            });
        }
    };
    /**
     * @param {?} event
     * @param {?} resizeEvent
     * @param {?} dayEventsContainer
     * @return {?}
     */
    CalendarDayViewComponent.prototype.resizeStarted = /**
     * @param {?} event
     * @param {?} resizeEvent
     * @param {?} dayEventsContainer
     * @return {?}
     */
    function (event, resizeEvent, dayEventsContainer) {
        this.currentResizes.set(event, {
            originalTop: event.top,
            originalHeight: event.height,
            edge: typeof resizeEvent.edges.top !== 'undefined' ? 'top' : 'bottom'
        });
        /** @type {?} */
        var resizeHelper = new CalendarResizeHelper(dayEventsContainer);
        this.validateResize = (/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var rectangle = _a.rectangle;
            return resizeHelper.validateResize({ rectangle: rectangle });
        });
        this.cdr.markForCheck();
    };
    /**
     * @param {?} event
     * @param {?} resizeEvent
     * @return {?}
     */
    CalendarDayViewComponent.prototype.resizing = /**
     * @param {?} event
     * @param {?} resizeEvent
     * @return {?}
     */
    function (event, resizeEvent) {
        /** @type {?} */
        var currentResize = this.currentResizes.get(event);
        if (typeof resizeEvent.edges.top !== 'undefined') {
            event.top = currentResize.originalTop + +resizeEvent.edges.top;
            event.height = currentResize.originalHeight - +resizeEvent.edges.top;
        }
        else if (typeof resizeEvent.edges.bottom !== 'undefined') {
            event.height = currentResize.originalHeight + +resizeEvent.edges.bottom;
        }
    };
    /**
     * @param {?} dayEvent
     * @return {?}
     */
    CalendarDayViewComponent.prototype.resizeEnded = /**
     * @param {?} dayEvent
     * @return {?}
     */
    function (dayEvent) {
        /** @type {?} */
        var currentResize = this.currentResizes.get(dayEvent);
        /** @type {?} */
        var resizingBeforeStart = currentResize.edge === 'top';
        /** @type {?} */
        var pixelsMoved;
        if (resizingBeforeStart) {
            pixelsMoved = dayEvent.top - currentResize.originalTop;
        }
        else {
            pixelsMoved = dayEvent.height - currentResize.originalHeight;
        }
        dayEvent.top = currentResize.originalTop;
        dayEvent.height = currentResize.originalHeight;
        /** @type {?} */
        var minutesMoved = getMinutesMoved(pixelsMoved, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
        /** @type {?} */
        var newStart = dayEvent.event.start;
        /** @type {?} */
        var newEnd = getDefaultEventEnd(this.dateAdapter, dayEvent.event, getMinimumEventHeightInMinutes(this.hourSegments, this.hourSegmentHeight));
        if (resizingBeforeStart) {
            newStart = this.dateAdapter.addMinutes(newStart, minutesMoved);
        }
        else {
            newEnd = this.dateAdapter.addMinutes(newEnd, minutesMoved);
        }
        this.eventTimesChanged.emit({
            newStart: newStart,
            newEnd: newEnd,
            event: dayEvent.event,
            type: CalendarEventTimesChangedEventType.Resize
        });
        this.currentResizes.delete(dayEvent);
    };
    /**
     * @param {?} event
     * @param {?} dayEventsContainer
     * @param {?} dayEvent
     * @return {?}
     */
    CalendarDayViewComponent.prototype.dragStarted = /**
     * @param {?} event
     * @param {?} dayEventsContainer
     * @param {?} dayEvent
     * @return {?}
     */
    function (event, dayEventsContainer, dayEvent) {
        var _this = this;
        /** @type {?} */
        var dragHelper = new CalendarDragHelper(dayEventsContainer, event);
        this.validateDrag = (/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var x = _a.x, y = _a.y, transform = _a.transform;
            return _this.currentResizes.size === 0 &&
                dragHelper.validateDrag({
                    x: x,
                    y: y,
                    snapDraggedEvents: _this.snapDraggedEvents,
                    dragAlreadyMoved: _this.dragAlreadyMoved,
                    transform: transform
                });
        });
        this.eventDragEnter = 0;
        this.dragAlreadyMoved = false;
        this.currentDrag = {
            dayEvent: dayEvent,
            originalTop: dayEvent.top,
            originalLeft: dayEvent.left
        };
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    /**
     * @hidden
     * @param {?} coords
     * @return {?}
     */
    CalendarDayViewComponent.prototype.dragMove = /**
     * @hidden
     * @param {?} coords
     * @return {?}
     */
    function (coords) {
        this.dragAlreadyMoved = true;
        if (this.snapDraggedEvents) {
            this.currentDrag.dayEvent.top = this.currentDrag.originalTop + coords.y;
            this.currentDrag.dayEvent.left = this.currentDrag.originalLeft + coords.x;
        }
    };
    /**
     * @param {?} dayEvent
     * @param {?} dragEndEvent
     * @return {?}
     */
    CalendarDayViewComponent.prototype.dragEnded = /**
     * @param {?} dayEvent
     * @param {?} dragEndEvent
     * @return {?}
     */
    function (dayEvent, dragEndEvent) {
        this.currentDrag.dayEvent.top = this.currentDrag.originalTop;
        this.currentDrag.dayEvent.left = this.currentDrag.originalLeft;
        this.currentDrag = null;
        if (this.eventDragEnter > 0) {
            /** @type {?} */
            var minutesMoved = getMinutesMoved(dragEndEvent.y, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
            /** @type {?} */
            var newStart = this.dateAdapter.addMinutes(dayEvent.event.start, minutesMoved);
            if (dragEndEvent.y < 0 && newStart < this.view.period.start) {
                minutesMoved += this.dateAdapter.differenceInMinutes(this.view.period.start, newStart);
                newStart = this.view.period.start;
            }
            /** @type {?} */
            var newEnd = void 0;
            if (dayEvent.event.end) {
                newEnd = this.dateAdapter.addMinutes(dayEvent.event.end, minutesMoved);
            }
            if (isDraggedWithinPeriod(newStart, newEnd, this.view.period)) {
                this.eventTimesChanged.emit({
                    newStart: newStart,
                    newEnd: newEnd,
                    event: dayEvent.event,
                    type: CalendarEventTimesChangedEventType.Drag,
                    allDay: false
                });
            }
        }
    };
    /**
     * @protected
     * @return {?}
     */
    CalendarDayViewComponent.prototype.refreshHourGrid = /**
     * @protected
     * @return {?}
     */
    function () {
        this.hours = this.utils.getDayViewHourGrid({
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            }
        });
    };
    /**
     * @protected
     * @return {?}
     */
    CalendarDayViewComponent.prototype.refreshView = /**
     * @protected
     * @return {?}
     */
    function () {
        this.view = this.utils.getDayView({
            events: this.events,
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            },
            eventWidth: this.eventWidth,
            segmentHeight: this.hourSegmentHeight
        });
    };
    /**
     * @protected
     * @return {?}
     */
    CalendarDayViewComponent.prototype.refreshAll = /**
     * @protected
     * @return {?}
     */
    function () {
        this.refreshHourGrid();
        this.refreshView();
        this.emitBeforeViewRender();
    };
    /**
     * @protected
     * @return {?}
     */
    CalendarDayViewComponent.prototype.emitBeforeViewRender = /**
     * @protected
     * @return {?}
     */
    function () {
        if (this.hours && this.view) {
            this.beforeViewRender.emit({
                body: {
                    hourGrid: this.hours,
                    allDayEvents: this.view.allDayEvents
                },
                period: this.view.period
            });
        }
    };
    CalendarDayViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-day-view',
                    template: "\n    <div class=\"cal-day-view\">\n      <div\n        class=\"cal-all-day-events\"\n        mwlDroppable\n        dragOverClass=\"cal-drag-over\"\n        dragActiveClass=\"cal-drag-active\"\n        (drop)=\"eventDropped($event, view.period.start, true)\"\n      >\n        <mwl-calendar-day-view-event\n          *ngFor=\"let event of view.allDayEvents; trackBy: trackByEventId\"\n          [ngClass]=\"event.cssClass\"\n          [dayEvent]=\"{ event: event }\"\n          [tooltipPlacement]=\"tooltipPlacement\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipAppendToBody]=\"tooltipAppendToBody\"\n          [tooltipDelay]=\"tooltipDelay\"\n          [customTemplate]=\"eventTemplate\"\n          [eventTitleTemplate]=\"eventTitleTemplate\"\n          [eventActionsTemplate]=\"eventActionsTemplate\"\n          (eventClicked)=\"eventClicked.emit({ event: event })\"\n          [class.cal-draggable]=\"!snapDraggedEvents && event.draggable\"\n          mwlDraggable\n          dragActiveClass=\"cal-drag-active\"\n          [dropData]=\"{ event: event, calendarId: calendarId }\"\n          [dragAxis]=\"{\n            x: !snapDraggedEvents && event.draggable,\n            y: !snapDraggedEvents && event.draggable\n          }\"\n        >\n        </mwl-calendar-day-view-event>\n      </div>\n      <div\n        class=\"cal-hour-rows\"\n        #dayEventsContainer\n        mwlDroppable\n        (dragEnter)=\"eventDragEnter = eventDragEnter + 1\"\n        (dragLeave)=\"eventDragEnter = eventDragEnter - 1\"\n      >\n        <div class=\"cal-events\">\n          <div\n            #event\n            *ngFor=\"let dayEvent of view?.events; trackBy: trackByDayEvent\"\n            class=\"cal-event-container\"\n            [class.cal-draggable]=\"dayEvent.event.draggable\"\n            [class.cal-starts-within-day]=\"!dayEvent.startsBeforeDay\"\n            [class.cal-ends-within-day]=\"!dayEvent.endsAfterDay\"\n            [ngClass]=\"dayEvent.event.cssClass\"\n            mwlResizable\n            [resizeSnapGrid]=\"{\n              top: eventSnapSize || hourSegmentHeight,\n              bottom: eventSnapSize || hourSegmentHeight\n            }\"\n            [validateResize]=\"validateResize\"\n            (resizeStart)=\"resizeStarted(dayEvent, $event, dayEventsContainer)\"\n            (resizing)=\"resizing(dayEvent, $event)\"\n            (resizeEnd)=\"resizeEnded(dayEvent)\"\n            mwlDraggable\n            dragActiveClass=\"cal-drag-active\"\n            [dropData]=\"{ event: dayEvent.event, calendarId: calendarId }\"\n            [dragAxis]=\"{\n              x:\n                !snapDraggedEvents &&\n                dayEvent.event.draggable &&\n                currentResizes.size === 0,\n              y: dayEvent.event.draggable && currentResizes.size === 0\n            }\"\n            [dragSnapGrid]=\"\n              snapDraggedEvents ? { y: eventSnapSize || hourSegmentHeight } : {}\n            \"\n            [validateDrag]=\"validateDrag\"\n            [ghostDragEnabled]=\"!snapDraggedEvents\"\n            (dragStart)=\"dragStarted(event, dayEventsContainer, dayEvent)\"\n            (dragging)=\"dragMove($event)\"\n            (dragEnd)=\"dragEnded(dayEvent, $event)\"\n            [style.marginTop.px]=\"dayEvent.top\"\n            [style.height.px]=\"dayEvent.height\"\n            [style.marginLeft.px]=\"dayEvent.left + 70\"\n            [style.width.px]=\"dayEvent.width - 1\"\n          >\n            <div\n              class=\"cal-resize-handle cal-resize-handle-before-start\"\n              *ngIf=\"\n                dayEvent.event?.resizable?.beforeStart &&\n                !dayEvent.startsBeforeDay\n              \"\n              mwlResizeHandle\n              [resizeEdges]=\"{ top: true }\"\n            ></div>\n            <mwl-calendar-day-view-event\n              [dayEvent]=\"dayEvent\"\n              [tooltipPlacement]=\"tooltipPlacement\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              [tooltipAppendToBody]=\"tooltipAppendToBody\"\n              [tooltipDelay]=\"tooltipDelay\"\n              [customTemplate]=\"eventTemplate\"\n              [eventTitleTemplate]=\"eventTitleTemplate\"\n              [eventActionsTemplate]=\"eventActionsTemplate\"\n              (eventClicked)=\"eventClicked.emit({ event: dayEvent.event })\"\n            >\n            </mwl-calendar-day-view-event>\n            <div\n              class=\"cal-resize-handle cal-resize-handle-after-end\"\n              *ngIf=\"\n                dayEvent.event?.resizable?.afterEnd && !dayEvent.endsAfterDay\n              \"\n              mwlResizeHandle\n              [resizeEdges]=\"{ bottom: true }\"\n            ></div>\n          </div>\n        </div>\n        <div\n          class=\"cal-hour\"\n          *ngFor=\"let hour of hours; trackBy: trackByHour\"\n          [style.minWidth.px]=\"view?.width + 70\"\n        >\n          <mwl-calendar-day-view-hour-segment\n            *ngFor=\"let segment of hour.segments; trackBy: trackByHourSegment\"\n            [style.height.px]=\"hourSegmentHeight\"\n            [segment]=\"segment\"\n            [segmentHeight]=\"hourSegmentHeight\"\n            [locale]=\"locale\"\n            [customTemplate]=\"hourSegmentTemplate\"\n            (mwlClick)=\"hourSegmentClicked.emit({ date: segment.date })\"\n            [clickListenerDisabled]=\"hourSegmentClicked.observers.length === 0\"\n            mwlDroppable\n            dragOverClass=\"cal-drag-over\"\n            dragActiveClass=\"cal-drag-active\"\n            (drop)=\"eventDropped($event, segment.date, false)\"\n          >\n          </mwl-calendar-day-view-hour-segment>\n        </div>\n      </div>\n    </div>\n  "
                }] }
    ];
    /** @nocollapse */
    CalendarDayViewComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: CalendarUtils },
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] },
        { type: DateAdapter }
    ]; };
    CalendarDayViewComponent.propDecorators = {
        viewDate: [{ type: Input }],
        events: [{ type: Input }],
        hourSegments: [{ type: Input }],
        hourSegmentHeight: [{ type: Input }],
        dayStartHour: [{ type: Input }],
        dayStartMinute: [{ type: Input }],
        dayEndHour: [{ type: Input }],
        dayEndMinute: [{ type: Input }],
        eventWidth: [{ type: Input }],
        refresh: [{ type: Input }],
        locale: [{ type: Input }],
        eventSnapSize: [{ type: Input }],
        tooltipPlacement: [{ type: Input }],
        tooltipTemplate: [{ type: Input }],
        tooltipAppendToBody: [{ type: Input }],
        tooltipDelay: [{ type: Input }],
        hourSegmentTemplate: [{ type: Input }],
        eventTemplate: [{ type: Input }],
        eventTitleTemplate: [{ type: Input }],
        eventActionsTemplate: [{ type: Input }],
        snapDraggedEvents: [{ type: Input }],
        eventClicked: [{ type: Output }],
        hourSegmentClicked: [{ type: Output }],
        eventTimesChanged: [{ type: Output }],
        beforeViewRender: [{ type: Output }]
    };
    return CalendarDayViewComponent;
}());
export { CalendarDayViewComponent };
if (false) {
    /**
     * The current view date
     * @type {?}
     */
    CalendarDayViewComponent.prototype.viewDate;
    /**
     * An array of events to display on view
     * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
     * @type {?}
     */
    CalendarDayViewComponent.prototype.events;
    /**
     * The number of segments in an hour. Must be <= 6
     * @type {?}
     */
    CalendarDayViewComponent.prototype.hourSegments;
    /**
     * The height in pixels of each hour segment
     * @type {?}
     */
    CalendarDayViewComponent.prototype.hourSegmentHeight;
    /**
     * The day start hours in 24 hour time. Must be 0-23
     * @type {?}
     */
    CalendarDayViewComponent.prototype.dayStartHour;
    /**
     * The day start minutes. Must be 0-59
     * @type {?}
     */
    CalendarDayViewComponent.prototype.dayStartMinute;
    /**
     * The day end hours in 24 hour time. Must be 0-23
     * @type {?}
     */
    CalendarDayViewComponent.prototype.dayEndHour;
    /**
     * The day end minutes. Must be 0-59
     * @type {?}
     */
    CalendarDayViewComponent.prototype.dayEndMinute;
    /**
     * The width in pixels of each event on the view
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventWidth;
    /**
     * An observable that when emitted on will re-render the current view
     * @type {?}
     */
    CalendarDayViewComponent.prototype.refresh;
    /**
     * The locale used to format dates
     * @type {?}
     */
    CalendarDayViewComponent.prototype.locale;
    /**
     * The grid size to snap resizing and dragging of events to
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventSnapSize;
    /**
     * The placement of the event tooltip
     * @type {?}
     */
    CalendarDayViewComponent.prototype.tooltipPlacement;
    /**
     * A custom template to use for the event tooltips
     * @type {?}
     */
    CalendarDayViewComponent.prototype.tooltipTemplate;
    /**
     * Whether to append tooltips to the body or next to the trigger element
     * @type {?}
     */
    CalendarDayViewComponent.prototype.tooltipAppendToBody;
    /**
     * The delay in milliseconds before the tooltip should be displayed. If not provided the tooltip
     * will be displayed immediately.
     * @type {?}
     */
    CalendarDayViewComponent.prototype.tooltipDelay;
    /**
     * A custom template to use to replace the hour segment
     * @type {?}
     */
    CalendarDayViewComponent.prototype.hourSegmentTemplate;
    /**
     * A custom template to use for day view events
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventTemplate;
    /**
     * A custom template to use for event titles
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventTitleTemplate;
    /**
     * A custom template to use for event actions
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventActionsTemplate;
    /**
     * Whether to snap events to a grid when dragging
     * @type {?}
     */
    CalendarDayViewComponent.prototype.snapDraggedEvents;
    /**
     * Called when an event title is clicked
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventClicked;
    /**
     * Called when an hour segment is clicked
     * @type {?}
     */
    CalendarDayViewComponent.prototype.hourSegmentClicked;
    /**
     * Called when an event is resized or dragged and dropped
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventTimesChanged;
    /**
     * An output that will be called before the view is rendered for the current day.
     * If you add the `cssClass` property to an hour grid segment it will add that class to the hour segment in the template
     * @type {?}
     */
    CalendarDayViewComponent.prototype.beforeViewRender;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.hours;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.view;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.width;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.refreshSubscription;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.currentResizes;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventDragEnter;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.calendarId;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.dragAlreadyMoved;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.currentDrag;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.validateDrag;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.validateResize;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.trackByEventId;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.trackByHour;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.trackByHourSegment;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.trackByDayEvent;
    /**
     * @type {?}
     * @protected
     */
    CalendarDayViewComponent.prototype.cdr;
    /**
     * @type {?}
     * @protected
     */
    CalendarDayViewComponent.prototype.utils;
    /**
     * @type {?}
     * @protected
     */
    CalendarDayViewComponent.prototype.dateAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5LXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF5L2NhbGVuZGFyLWRheS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksRUFDWixpQkFBaUIsRUFDakIsU0FBUyxFQUNULE1BQU0sRUFHTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFVdkIsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakYsT0FBTyxFQUVMLGtDQUFrQyxFQUNuQyxNQUFNLHdEQUF3RCxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEVBQ0wsY0FBYyxFQUNkLGNBQWMsRUFDZCxXQUFXLEVBQ1gsa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsOEJBQThCLEVBQzlCLHFCQUFxQixFQUNyQixxQkFBcUIsRUFDckIsc0JBQXNCLEVBQ3ZCLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7O0FBUS9ELHNEQU1DOzs7SUFMQyxnREFHRTs7SUFDRixrREFBbUI7Ozs7OztBQU1yQix3Q0FJQzs7O0lBSEMseUNBQW9COztJQUNwQiw0Q0FBdUI7O0lBQ3ZCLGtDQUFhOzs7Ozs7Ozs7Ozs7QUFhZjtJQWtXRTs7T0FFRztJQUNILGtDQUNZLEdBQXNCLEVBQ3RCLEtBQW9CLEVBQ1gsTUFBYyxFQUN2QixXQUF3QjtRQUh4QixRQUFHLEdBQUgsR0FB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OFdULCtCQUFDO0NBQUEsQUE5bkJELElBOG5CQztTQXBmWSx3QkFBd0I7Ozs7OztJQUluQyw0Q0FBd0I7Ozs7OztJQU14QiwwQ0FBc0M7Ozs7O0lBS3RDLGdEQUFrQzs7Ozs7SUFLbEMscURBQXdDOzs7OztJQUt4QyxnREFBa0M7Ozs7O0lBS2xDLGtEQUFvQzs7Ozs7SUFLcEMsOENBQWlDOzs7OztJQUtqQyxnREFBbUM7Ozs7O0lBS25DLDhDQUFrQzs7Ozs7SUFLbEMsMkNBQStCOzs7OztJQUsvQiwwQ0FBd0I7Ozs7O0lBS3hCLGlEQUErQjs7Ozs7SUFLL0Isb0RBQW1EOzs7OztJQUtuRCxtREFBMkM7Ozs7O0lBSzNDLHVEQUE2Qzs7Ozs7O0lBTTdDLGdEQUE0Qzs7Ozs7SUFLNUMsdURBQStDOzs7OztJQUsvQyxpREFBeUM7Ozs7O0lBS3pDLHNEQUE4Qzs7Ozs7SUFLOUMsd0RBQWdEOzs7OztJQUtoRCxxREFBMkM7Ozs7O0lBSzNDLGdEQUdLOzs7OztJQUtMLHNEQUdLOzs7OztJQUtMLHFEQUN1RTs7Ozs7O0lBTXZFLG9EQUN3RTs7Ozs7SUFLeEUseUNBQTBCOzs7OztJQUsxQix3Q0FBYzs7Ozs7SUFLZCx5Q0FBa0I7Ozs7O0lBS2xCLHVEQUFrQzs7Ozs7SUFLbEMsa0RBQWtFOzs7OztJQUtsRSxrREFBbUI7Ozs7O0lBS25CLDhDQUFvRDs7Ozs7SUFLcEQsb0RBQXlCOzs7OztJQUt6QiwrQ0FJRTs7Ozs7SUFLRixnREFBMkI7Ozs7O0lBSzNCLGtEQUF1Qzs7Ozs7SUFLdkMsa0RBQWdDOzs7OztJQUtoQywrQ0FBMEI7Ozs7O0lBSzFCLHNEQUF3Qzs7Ozs7SUFLeEMsbURBQXdDOzs7OztJQU10Qyx1Q0FBZ0M7Ozs7O0lBQ2hDLHlDQUE4Qjs7Ozs7SUFFOUIsK0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIExPQ0FMRV9JRCxcbiAgSW5qZWN0LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDYWxlbmRhckV2ZW50LFxuICBEYXlWaWV3LFxuICBEYXlWaWV3SG91cixcbiAgRGF5Vmlld0hvdXJTZWdtZW50LFxuICBEYXlWaWV3RXZlbnQsXG4gIFZpZXdQZXJpb2QsXG4gIFdlZWtWaWV3QWxsRGF5RXZlbnRcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBSZXNpemVFdmVudCB9IGZyb20gJ2FuZ3VsYXItcmVzaXphYmxlLWVsZW1lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJEcmFnSGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWRyYWctaGVscGVyLnByb3ZpZGVyJztcbmltcG9ydCB7IENhbGVuZGFyUmVzaXplSGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLXJlc2l6ZS1oZWxwZXIucHJvdmlkZXInO1xuaW1wb3J0IHtcbiAgQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50LFxuICBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnRUeXBlXG59IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1ldmVudC10aW1lcy1jaGFuZ2VkLWV2ZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDYWxlbmRhclV0aWxzIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLXV0aWxzLnByb3ZpZGVyJztcbmltcG9ydCB7XG4gIHZhbGlkYXRlRXZlbnRzLFxuICB0cmFja0J5RXZlbnRJZCxcbiAgdHJhY2tCeUhvdXIsXG4gIHRyYWNrQnlIb3VyU2VnbWVudCxcbiAgZ2V0TWludXRlc01vdmVkLFxuICBnZXREZWZhdWx0RXZlbnRFbmQsXG4gIGdldE1pbmltdW1FdmVudEhlaWdodEluTWludXRlcyxcbiAgdHJhY2tCeURheU9yV2Vla0V2ZW50LFxuICBpc0RyYWdnZWRXaXRoaW5QZXJpb2QsXG4gIHNob3VsZEZpcmVEcm9wcGVkRXZlbnRcbn0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9kYXRlLWFkYXB0ZXJzL2RhdGUtYWRhcHRlcic7XG5pbXBvcnQge1xuICBEcmFnRW5kRXZlbnQsXG4gIERyYWdNb3ZlRXZlbnQsXG4gIFZhbGlkYXRlRHJhZ1xufSBmcm9tICdhbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUnO1xuaW1wb3J0IHsgUGxhY2VtZW50QXJyYXkgfSBmcm9tICdwb3NpdGlvbmluZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FsZW5kYXJEYXlWaWV3QmVmb3JlUmVuZGVyRXZlbnQge1xuICBib2R5OiB7XG4gICAgaG91ckdyaWQ6IERheVZpZXdIb3VyW107XG4gICAgYWxsRGF5RXZlbnRzOiBDYWxlbmRhckV2ZW50W107XG4gIH07XG4gIHBlcmlvZDogVmlld1BlcmlvZDtcbn1cblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGF5Vmlld0V2ZW50UmVzaXplIHtcbiAgb3JpZ2luYWxUb3A6IG51bWJlcjtcbiAgb3JpZ2luYWxIZWlnaHQ6IG51bWJlcjtcbiAgZWRnZTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFNob3dzIGFsbCBldmVudHMgb24gYSBnaXZlbiBkYXkuIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogPG13bC1jYWxlbmRhci1kYXktdmlld1xuICogIFt2aWV3RGF0ZV09XCJ2aWV3RGF0ZVwiXG4gKiAgW2V2ZW50c109XCJldmVudHNcIj5cbiAqIDwvbXdsLWNhbGVuZGFyLWRheS12aWV3PlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1kYXktdmlldycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImNhbC1kYXktdmlld1wiPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImNhbC1hbGwtZGF5LWV2ZW50c1wiXG4gICAgICAgIG13bERyb3BwYWJsZVxuICAgICAgICBkcmFnT3ZlckNsYXNzPVwiY2FsLWRyYWctb3ZlclwiXG4gICAgICAgIGRyYWdBY3RpdmVDbGFzcz1cImNhbC1kcmFnLWFjdGl2ZVwiXG4gICAgICAgIChkcm9wKT1cImV2ZW50RHJvcHBlZCgkZXZlbnQsIHZpZXcucGVyaW9kLnN0YXJ0LCB0cnVlKVwiXG4gICAgICA+XG4gICAgICAgIDxtd2wtY2FsZW5kYXItZGF5LXZpZXctZXZlbnRcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgZXZlbnQgb2Ygdmlldy5hbGxEYXlFdmVudHM7IHRyYWNrQnk6IHRyYWNrQnlFdmVudElkXCJcbiAgICAgICAgICBbbmdDbGFzc109XCJldmVudC5jc3NDbGFzc1wiXG4gICAgICAgICAgW2RheUV2ZW50XT1cInsgZXZlbnQ6IGV2ZW50IH1cIlxuICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgICBbdG9vbHRpcEFwcGVuZFRvQm9keV09XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcbiAgICAgICAgICBbdG9vbHRpcERlbGF5XT1cInRvb2x0aXBEZWxheVwiXG4gICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgIFtldmVudFRpdGxlVGVtcGxhdGVdPVwiZXZlbnRUaXRsZVRlbXBsYXRlXCJcbiAgICAgICAgICBbZXZlbnRBY3Rpb25zVGVtcGxhdGVdPVwiZXZlbnRBY3Rpb25zVGVtcGxhdGVcIlxuICAgICAgICAgIChldmVudENsaWNrZWQpPVwiZXZlbnRDbGlja2VkLmVtaXQoeyBldmVudDogZXZlbnQgfSlcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtZHJhZ2dhYmxlXT1cIiFzbmFwRHJhZ2dlZEV2ZW50cyAmJiBldmVudC5kcmFnZ2FibGVcIlxuICAgICAgICAgIG13bERyYWdnYWJsZVxuICAgICAgICAgIGRyYWdBY3RpdmVDbGFzcz1cImNhbC1kcmFnLWFjdGl2ZVwiXG4gICAgICAgICAgW2Ryb3BEYXRhXT1cInsgZXZlbnQ6IGV2ZW50LCBjYWxlbmRhcklkOiBjYWxlbmRhcklkIH1cIlxuICAgICAgICAgIFtkcmFnQXhpc109XCJ7XG4gICAgICAgICAgICB4OiAhc25hcERyYWdnZWRFdmVudHMgJiYgZXZlbnQuZHJhZ2dhYmxlLFxuICAgICAgICAgICAgeTogIXNuYXBEcmFnZ2VkRXZlbnRzICYmIGV2ZW50LmRyYWdnYWJsZVxuICAgICAgICAgIH1cIlxuICAgICAgICA+XG4gICAgICAgIDwvbXdsLWNhbGVuZGFyLWRheS12aWV3LWV2ZW50PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiY2FsLWhvdXItcm93c1wiXG4gICAgICAgICNkYXlFdmVudHNDb250YWluZXJcbiAgICAgICAgbXdsRHJvcHBhYmxlXG4gICAgICAgIChkcmFnRW50ZXIpPVwiZXZlbnREcmFnRW50ZXIgPSBldmVudERyYWdFbnRlciArIDFcIlxuICAgICAgICAoZHJhZ0xlYXZlKT1cImV2ZW50RHJhZ0VudGVyID0gZXZlbnREcmFnRW50ZXIgLSAxXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1ldmVudHNcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAjZXZlbnRcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBkYXlFdmVudCBvZiB2aWV3Py5ldmVudHM7IHRyYWNrQnk6IHRyYWNrQnlEYXlFdmVudFwiXG4gICAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudC1jb250YWluZXJcIlxuICAgICAgICAgICAgW2NsYXNzLmNhbC1kcmFnZ2FibGVdPVwiZGF5RXZlbnQuZXZlbnQuZHJhZ2dhYmxlXCJcbiAgICAgICAgICAgIFtjbGFzcy5jYWwtc3RhcnRzLXdpdGhpbi1kYXldPVwiIWRheUV2ZW50LnN0YXJ0c0JlZm9yZURheVwiXG4gICAgICAgICAgICBbY2xhc3MuY2FsLWVuZHMtd2l0aGluLWRheV09XCIhZGF5RXZlbnQuZW5kc0FmdGVyRGF5XCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cImRheUV2ZW50LmV2ZW50LmNzc0NsYXNzXCJcbiAgICAgICAgICAgIG13bFJlc2l6YWJsZVxuICAgICAgICAgICAgW3Jlc2l6ZVNuYXBHcmlkXT1cIntcbiAgICAgICAgICAgICAgdG9wOiBldmVudFNuYXBTaXplIHx8IGhvdXJTZWdtZW50SGVpZ2h0LFxuICAgICAgICAgICAgICBib3R0b206IGV2ZW50U25hcFNpemUgfHwgaG91clNlZ21lbnRIZWlnaHRcbiAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgW3ZhbGlkYXRlUmVzaXplXT1cInZhbGlkYXRlUmVzaXplXCJcbiAgICAgICAgICAgIChyZXNpemVTdGFydCk9XCJyZXNpemVTdGFydGVkKGRheUV2ZW50LCAkZXZlbnQsIGRheUV2ZW50c0NvbnRhaW5lcilcIlxuICAgICAgICAgICAgKHJlc2l6aW5nKT1cInJlc2l6aW5nKGRheUV2ZW50LCAkZXZlbnQpXCJcbiAgICAgICAgICAgIChyZXNpemVFbmQpPVwicmVzaXplRW5kZWQoZGF5RXZlbnQpXCJcbiAgICAgICAgICAgIG13bERyYWdnYWJsZVxuICAgICAgICAgICAgZHJhZ0FjdGl2ZUNsYXNzPVwiY2FsLWRyYWctYWN0aXZlXCJcbiAgICAgICAgICAgIFtkcm9wRGF0YV09XCJ7IGV2ZW50OiBkYXlFdmVudC5ldmVudCwgY2FsZW5kYXJJZDogY2FsZW5kYXJJZCB9XCJcbiAgICAgICAgICAgIFtkcmFnQXhpc109XCJ7XG4gICAgICAgICAgICAgIHg6XG4gICAgICAgICAgICAgICAgIXNuYXBEcmFnZ2VkRXZlbnRzICYmXG4gICAgICAgICAgICAgICAgZGF5RXZlbnQuZXZlbnQuZHJhZ2dhYmxlICYmXG4gICAgICAgICAgICAgICAgY3VycmVudFJlc2l6ZXMuc2l6ZSA9PT0gMCxcbiAgICAgICAgICAgICAgeTogZGF5RXZlbnQuZXZlbnQuZHJhZ2dhYmxlICYmIGN1cnJlbnRSZXNpemVzLnNpemUgPT09IDBcbiAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgW2RyYWdTbmFwR3JpZF09XCJcbiAgICAgICAgICAgICAgc25hcERyYWdnZWRFdmVudHMgPyB7IHk6IGV2ZW50U25hcFNpemUgfHwgaG91clNlZ21lbnRIZWlnaHQgfSA6IHt9XG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgW3ZhbGlkYXRlRHJhZ109XCJ2YWxpZGF0ZURyYWdcIlxuICAgICAgICAgICAgW2dob3N0RHJhZ0VuYWJsZWRdPVwiIXNuYXBEcmFnZ2VkRXZlbnRzXCJcbiAgICAgICAgICAgIChkcmFnU3RhcnQpPVwiZHJhZ1N0YXJ0ZWQoZXZlbnQsIGRheUV2ZW50c0NvbnRhaW5lciwgZGF5RXZlbnQpXCJcbiAgICAgICAgICAgIChkcmFnZ2luZyk9XCJkcmFnTW92ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChkcmFnRW5kKT1cImRyYWdFbmRlZChkYXlFdmVudCwgJGV2ZW50KVwiXG4gICAgICAgICAgICBbc3R5bGUubWFyZ2luVG9wLnB4XT1cImRheUV2ZW50LnRvcFwiXG4gICAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImRheUV2ZW50LmhlaWdodFwiXG4gICAgICAgICAgICBbc3R5bGUubWFyZ2luTGVmdC5weF09XCJkYXlFdmVudC5sZWZ0ICsgNzBcIlxuICAgICAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cImRheUV2ZW50LndpZHRoIC0gMVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cImNhbC1yZXNpemUtaGFuZGxlIGNhbC1yZXNpemUtaGFuZGxlLWJlZm9yZS1zdGFydFwiXG4gICAgICAgICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgICAgICAgZGF5RXZlbnQuZXZlbnQ/LnJlc2l6YWJsZT8uYmVmb3JlU3RhcnQgJiZcbiAgICAgICAgICAgICAgICAhZGF5RXZlbnQuc3RhcnRzQmVmb3JlRGF5XG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgIG13bFJlc2l6ZUhhbmRsZVxuICAgICAgICAgICAgICBbcmVzaXplRWRnZXNdPVwieyB0b3A6IHRydWUgfVwiXG4gICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgICA8bXdsLWNhbGVuZGFyLWRheS12aWV3LWV2ZW50XG4gICAgICAgICAgICAgIFtkYXlFdmVudF09XCJkYXlFdmVudFwiXG4gICAgICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxuICAgICAgICAgICAgICBbdG9vbHRpcERlbGF5XT1cInRvb2x0aXBEZWxheVwiXG4gICAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJldmVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW2V2ZW50VGl0bGVUZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxuICAgICAgICAgICAgICBbZXZlbnRBY3Rpb25zVGVtcGxhdGVdPVwiZXZlbnRBY3Rpb25zVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAoZXZlbnRDbGlja2VkKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHsgZXZlbnQ6IGRheUV2ZW50LmV2ZW50IH0pXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLWRheS12aWV3LWV2ZW50PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cImNhbC1yZXNpemUtaGFuZGxlIGNhbC1yZXNpemUtaGFuZGxlLWFmdGVyLWVuZFwiXG4gICAgICAgICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgICAgICAgZGF5RXZlbnQuZXZlbnQ/LnJlc2l6YWJsZT8uYWZ0ZXJFbmQgJiYgIWRheUV2ZW50LmVuZHNBZnRlckRheVxuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICBtd2xSZXNpemVIYW5kbGVcbiAgICAgICAgICAgICAgW3Jlc2l6ZUVkZ2VzXT1cInsgYm90dG9tOiB0cnVlIH1cIlxuICAgICAgICAgICAgPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiY2FsLWhvdXJcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBob3VyIG9mIGhvdXJzOyB0cmFja0J5OiB0cmFja0J5SG91clwiXG4gICAgICAgICAgW3N0eWxlLm1pbldpZHRoLnB4XT1cInZpZXc/LndpZHRoICsgNzBcIlxuICAgICAgICA+XG4gICAgICAgICAgPG13bC1jYWxlbmRhci1kYXktdmlldy1ob3VyLXNlZ21lbnRcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBzZWdtZW50IG9mIGhvdXIuc2VnbWVudHM7IHRyYWNrQnk6IHRyYWNrQnlIb3VyU2VnbWVudFwiXG4gICAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImhvdXJTZWdtZW50SGVpZ2h0XCJcbiAgICAgICAgICAgIFtzZWdtZW50XT1cInNlZ21lbnRcIlxuICAgICAgICAgICAgW3NlZ21lbnRIZWlnaHRdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxuICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImhvdXJTZWdtZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgKG13bENsaWNrKT1cImhvdXJTZWdtZW50Q2xpY2tlZC5lbWl0KHsgZGF0ZTogc2VnbWVudC5kYXRlIH0pXCJcbiAgICAgICAgICAgIFtjbGlja0xpc3RlbmVyRGlzYWJsZWRdPVwiaG91clNlZ21lbnRDbGlja2VkLm9ic2VydmVycy5sZW5ndGggPT09IDBcIlxuICAgICAgICAgICAgbXdsRHJvcHBhYmxlXG4gICAgICAgICAgICBkcmFnT3ZlckNsYXNzPVwiY2FsLWRyYWctb3ZlclwiXG4gICAgICAgICAgICBkcmFnQWN0aXZlQ2xhc3M9XCJjYWwtZHJhZy1hY3RpdmVcIlxuICAgICAgICAgICAgKGRyb3ApPVwiZXZlbnREcm9wcGVkKCRldmVudCwgc2VnbWVudC5kYXRlLCBmYWxzZSlcIlxuICAgICAgICAgID5cbiAgICAgICAgICA8L213bC1jYWxlbmRhci1kYXktdmlldy1ob3VyLXNlZ21lbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcbiAgICovXG4gIEBJbnB1dCgpIHZpZXdEYXRlOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBldmVudHMgdG8gZGlzcGxheSBvbiB2aWV3XG4gICAqIFRoZSBzY2hlbWEgaXMgYXZhaWxhYmxlIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0bGV3aXM5Mi9jYWxlbmRhci11dGlscy9ibG9iL2M1MTY4OTk4NWY1OWEyNzE5NDBlMzBiYzRlMmM0ZTFmZWUzZmNiNWMvc3JjL2NhbGVuZGFyVXRpbHMudHMjTDQ5LUw2M1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRzOiBDYWxlbmRhckV2ZW50W10gPSBbXTtcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBzZWdtZW50cyBpbiBhbiBob3VyLiBNdXN0IGJlIDw9IDZcbiAgICovXG4gIEBJbnB1dCgpIGhvdXJTZWdtZW50czogbnVtYmVyID0gMjtcblxuICAvKipcbiAgICogVGhlIGhlaWdodCBpbiBwaXhlbHMgb2YgZWFjaCBob3VyIHNlZ21lbnRcbiAgICovXG4gIEBJbnB1dCgpIGhvdXJTZWdtZW50SGVpZ2h0OiBudW1iZXIgPSAzMDtcblxuICAvKipcbiAgICogVGhlIGRheSBzdGFydCBob3VycyBpbiAyNCBob3VyIHRpbWUuIE11c3QgYmUgMC0yM1xuICAgKi9cbiAgQElucHV0KCkgZGF5U3RhcnRIb3VyOiBudW1iZXIgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHN0YXJ0IG1pbnV0ZXMuIE11c3QgYmUgMC01OVxuICAgKi9cbiAgQElucHV0KCkgZGF5U3RhcnRNaW51dGU6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgZW5kIGhvdXJzIGluIDI0IGhvdXIgdGltZS4gTXVzdCBiZSAwLTIzXG4gICAqL1xuICBASW5wdXQoKSBkYXlFbmRIb3VyOiBudW1iZXIgPSAyMztcblxuICAvKipcbiAgICogVGhlIGRheSBlbmQgbWludXRlcy4gTXVzdCBiZSAwLTU5XG4gICAqL1xuICBASW5wdXQoKSBkYXlFbmRNaW51dGU6IG51bWJlciA9IDU5O1xuXG4gIC8qKlxuICAgKiBUaGUgd2lkdGggaW4gcGl4ZWxzIG9mIGVhY2ggZXZlbnQgb24gdGhlIHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50V2lkdGg6IG51bWJlciA9IDE1MDtcblxuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IHdoZW4gZW1pdHRlZCBvbiB3aWxsIHJlLXJlbmRlciB0aGUgY3VycmVudCB2aWV3XG4gICAqL1xuICBASW5wdXQoKSByZWZyZXNoOiBTdWJqZWN0PGFueT47XG5cbiAgLyoqXG4gICAqIFRoZSBsb2NhbGUgdXNlZCB0byBmb3JtYXQgZGF0ZXNcbiAgICovXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZ3JpZCBzaXplIHRvIHNuYXAgcmVzaXppbmcgYW5kIGRyYWdnaW5nIG9mIGV2ZW50cyB0b1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRTbmFwU2l6ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgcGxhY2VtZW50IG9mIHRoZSBldmVudCB0b29sdGlwXG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICdhdXRvJztcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgZXZlbnQgdG9vbHRpcHNcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBhcHBlbmQgdG9vbHRpcHMgdG8gdGhlIGJvZHkgb3IgbmV4dCB0byB0aGUgdHJpZ2dlciBlbGVtZW50XG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIGRlbGF5IGluIG1pbGxpc2Vjb25kcyBiZWZvcmUgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGRpc3BsYXllZC4gSWYgbm90IHByb3ZpZGVkIHRoZSB0b29sdGlwXG4gICAqIHdpbGwgYmUgZGlzcGxheWVkIGltbWVkaWF0ZWx5LlxuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcERlbGF5OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIHRvIHJlcGxhY2UgdGhlIGhvdXIgc2VnbWVudFxuICAgKi9cbiAgQElucHV0KCkgaG91clNlZ21lbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBkYXkgdmlldyBldmVudHNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgZXZlbnQgdGl0bGVzXG4gICAqL1xuICBASW5wdXQoKSBldmVudFRpdGxlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgZXZlbnQgYWN0aW9uc1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRBY3Rpb25zVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gc25hcCBldmVudHMgdG8gYSBncmlkIHdoZW4gZHJhZ2dpbmdcbiAgICovXG4gIEBJbnB1dCgpIHNuYXBEcmFnZ2VkRXZlbnRzOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gZXZlbnQgdGl0bGUgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGV2ZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuICB9PigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBob3VyIHNlZ21lbnQgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGhvdXJTZWdtZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGRhdGU6IERhdGU7XG4gIH0+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGFuIGV2ZW50IGlzIHJlc2l6ZWQgb3IgZHJhZ2dlZCBhbmQgZHJvcHBlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGV2ZW50VGltZXNDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEFuIG91dHB1dCB0aGF0IHdpbGwgYmUgY2FsbGVkIGJlZm9yZSB0aGUgdmlldyBpcyByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgZGF5LlxuICAgKiBJZiB5b3UgYWRkIHRoZSBgY3NzQ2xhc3NgIHByb3BlcnR5IHRvIGFuIGhvdXIgZ3JpZCBzZWdtZW50IGl0IHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGhvdXIgc2VnbWVudCBpbiB0aGUgdGVtcGxhdGVcbiAgICovXG4gIEBPdXRwdXQoKVxuICBiZWZvcmVWaWV3UmVuZGVyID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhckRheVZpZXdCZWZvcmVSZW5kZXJFdmVudD4oKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgaG91cnM6IERheVZpZXdIb3VyW10gPSBbXTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmlldzogRGF5VmlldztcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgd2lkdGg6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHJlZnJlc2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY3VycmVudFJlc2l6ZXM6IE1hcDxEYXlWaWV3RXZlbnQsIERheVZpZXdFdmVudFJlc2l6ZT4gPSBuZXcgTWFwKCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGV2ZW50RHJhZ0VudGVyID0gMDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY2FsZW5kYXJJZCA9IFN5bWJvbCgnYW5ndWxhciBjYWxlbmRhciBkYXkgdmlldyBpZCcpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBkcmFnQWxyZWFkeU1vdmVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGN1cnJlbnREcmFnPzoge1xuICAgIGRheUV2ZW50OiBEYXlWaWV3RXZlbnQ7XG4gICAgb3JpZ2luYWxUb3A6IG51bWJlcjtcbiAgICBvcmlnaW5hbExlZnQ6IG51bWJlcjtcbiAgfTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmFsaWRhdGVEcmFnOiBWYWxpZGF0ZURyYWc7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHZhbGlkYXRlUmVzaXplOiAoYXJnczogYW55KSA9PiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5RXZlbnRJZCA9IHRyYWNrQnlFdmVudElkO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5SG91ciA9IHRyYWNrQnlIb3VyO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5SG91clNlZ21lbnQgPSB0cmFja0J5SG91clNlZ21lbnQ7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlEYXlFdmVudCA9IHRyYWNrQnlEYXlPcldlZWtFdmVudDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIHV0aWxzOiBDYWxlbmRhclV0aWxzLFxuICAgIEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZyxcbiAgICBwcm90ZWN0ZWQgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyXG4gICkge1xuICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlZnJlc2gpIHtcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbiA9IHRoaXMucmVmcmVzaC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlZnJlc2hBbGwoKTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHJlZnJlc2hIb3VyR3JpZCA9XG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8XG4gICAgICBjaGFuZ2VzLmRheVN0YXJ0SG91ciB8fFxuICAgICAgY2hhbmdlcy5kYXlTdGFydE1pbnV0ZSB8fFxuICAgICAgY2hhbmdlcy5kYXlFbmRIb3VyIHx8XG4gICAgICBjaGFuZ2VzLmRheUVuZE1pbnV0ZSB8fFxuICAgICAgY2hhbmdlcy5ob3VyU2VnbWVudHM7XG5cbiAgICBjb25zdCByZWZyZXNoVmlldyA9XG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8XG4gICAgICBjaGFuZ2VzLmV2ZW50cyB8fFxuICAgICAgY2hhbmdlcy5kYXlTdGFydEhvdXIgfHxcbiAgICAgIGNoYW5nZXMuZGF5U3RhcnRNaW51dGUgfHxcbiAgICAgIGNoYW5nZXMuZGF5RW5kSG91ciB8fFxuICAgICAgY2hhbmdlcy5kYXlFbmRNaW51dGUgfHxcbiAgICAgIGNoYW5nZXMuZXZlbnRXaWR0aCAgfHxcbiAgICAgIGNoYW5nZXMuaG91clNlZ21lbnRzO1xuXG4gICAgaWYgKHJlZnJlc2hIb3VyR3JpZCkge1xuICAgICAgdGhpcy5yZWZyZXNoSG91ckdyaWQoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5ldmVudHMpIHtcbiAgICAgIHZhbGlkYXRlRXZlbnRzKHRoaXMuZXZlbnRzKTtcbiAgICB9XG5cbiAgICBpZiAocmVmcmVzaFZpZXcpIHtcbiAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgICB9XG5cbiAgICBpZiAocmVmcmVzaEhvdXJHcmlkIHx8IHJlZnJlc2hWaWV3KSB7XG4gICAgICB0aGlzLmVtaXRCZWZvcmVWaWV3UmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgZXZlbnREcm9wcGVkKFxuICAgIGRyb3BFdmVudDogeyBkcm9wRGF0YT86IHsgZXZlbnQ/OiBDYWxlbmRhckV2ZW50OyBjYWxlbmRhcklkPzogc3ltYm9sIH0gfSxcbiAgICBkYXRlOiBEYXRlLFxuICAgIGFsbERheTogYm9vbGVhblxuICApOiB2b2lkIHtcbiAgICBpZiAoc2hvdWxkRmlyZURyb3BwZWRFdmVudChkcm9wRXZlbnQsIGRhdGUsIGFsbERheSwgdGhpcy5jYWxlbmRhcklkKSkge1xuICAgICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50VHlwZS5Ecm9wLFxuICAgICAgICBldmVudDogZHJvcEV2ZW50LmRyb3BEYXRhLmV2ZW50LFxuICAgICAgICBuZXdTdGFydDogZGF0ZSxcbiAgICAgICAgYWxsRGF5XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXNpemVTdGFydGVkKFxuICAgIGV2ZW50OiBEYXlWaWV3RXZlbnQsXG4gICAgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50LFxuICAgIGRheUV2ZW50c0NvbnRhaW5lcjogSFRNTEVsZW1lbnRcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50UmVzaXplcy5zZXQoZXZlbnQsIHtcbiAgICAgIG9yaWdpbmFsVG9wOiBldmVudC50b3AsXG4gICAgICBvcmlnaW5hbEhlaWdodDogZXZlbnQuaGVpZ2h0LFxuICAgICAgZWRnZTogdHlwZW9mIHJlc2l6ZUV2ZW50LmVkZ2VzLnRvcCAhPT0gJ3VuZGVmaW5lZCcgPyAndG9wJyA6ICdib3R0b20nXG4gICAgfSk7XG4gICAgY29uc3QgcmVzaXplSGVscGVyOiBDYWxlbmRhclJlc2l6ZUhlbHBlciA9IG5ldyBDYWxlbmRhclJlc2l6ZUhlbHBlcihcbiAgICAgIGRheUV2ZW50c0NvbnRhaW5lclxuICAgICk7XG4gICAgdGhpcy52YWxpZGF0ZVJlc2l6ZSA9ICh7IHJlY3RhbmdsZSB9KSA9PlxuICAgICAgcmVzaXplSGVscGVyLnZhbGlkYXRlUmVzaXplKHsgcmVjdGFuZ2xlIH0pO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVzaXppbmcoZXZlbnQ6IERheVZpZXdFdmVudCwgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFJlc2l6ZTogRGF5Vmlld0V2ZW50UmVzaXplID0gdGhpcy5jdXJyZW50UmVzaXplcy5nZXQoZXZlbnQpO1xuICAgIGlmICh0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMudG9wICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgZXZlbnQudG9wID0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbFRvcCArICtyZXNpemVFdmVudC5lZGdlcy50b3A7XG4gICAgICBldmVudC5oZWlnaHQgPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsSGVpZ2h0IC0gK3Jlc2l6ZUV2ZW50LmVkZ2VzLnRvcDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXNpemVFdmVudC5lZGdlcy5ib3R0b20gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBldmVudC5oZWlnaHQgPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsSGVpZ2h0ICsgK3Jlc2l6ZUV2ZW50LmVkZ2VzLmJvdHRvbTtcbiAgICB9XG4gIH1cblxuICByZXNpemVFbmRlZChkYXlFdmVudDogRGF5Vmlld0V2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFJlc2l6ZTogRGF5Vmlld0V2ZW50UmVzaXplID0gdGhpcy5jdXJyZW50UmVzaXplcy5nZXQoZGF5RXZlbnQpO1xuXG4gICAgY29uc3QgcmVzaXppbmdCZWZvcmVTdGFydCA9IGN1cnJlbnRSZXNpemUuZWRnZSA9PT0gJ3RvcCc7XG4gICAgbGV0IHBpeGVsc01vdmVkOiBudW1iZXI7XG4gICAgaWYgKHJlc2l6aW5nQmVmb3JlU3RhcnQpIHtcbiAgICAgIHBpeGVsc01vdmVkID0gZGF5RXZlbnQudG9wIC0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbFRvcDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGl4ZWxzTW92ZWQgPSBkYXlFdmVudC5oZWlnaHQgLSBjdXJyZW50UmVzaXplLm9yaWdpbmFsSGVpZ2h0O1xuICAgIH1cblxuICAgIGRheUV2ZW50LnRvcCA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxUb3A7XG4gICAgZGF5RXZlbnQuaGVpZ2h0ID0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbEhlaWdodDtcblxuICAgIGNvbnN0IG1pbnV0ZXNNb3ZlZCA9IGdldE1pbnV0ZXNNb3ZlZChcbiAgICAgIHBpeGVsc01vdmVkLFxuICAgICAgdGhpcy5ob3VyU2VnbWVudHMsXG4gICAgICB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0LFxuICAgICAgdGhpcy5ldmVudFNuYXBTaXplXG4gICAgKTtcblxuICAgIGxldCBuZXdTdGFydDogRGF0ZSA9IGRheUV2ZW50LmV2ZW50LnN0YXJ0O1xuICAgIGxldCBuZXdFbmQ6IERhdGUgPSBnZXREZWZhdWx0RXZlbnRFbmQoXG4gICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgZGF5RXZlbnQuZXZlbnQsXG4gICAgICBnZXRNaW5pbXVtRXZlbnRIZWlnaHRJbk1pbnV0ZXModGhpcy5ob3VyU2VnbWVudHMsIHRoaXMuaG91clNlZ21lbnRIZWlnaHQpXG4gICAgKTtcbiAgICBpZiAocmVzaXppbmdCZWZvcmVTdGFydCkge1xuICAgICAgbmV3U3RhcnQgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZE1pbnV0ZXMobmV3U3RhcnQsIG1pbnV0ZXNNb3ZlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld0VuZCA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkTWludXRlcyhuZXdFbmQsIG1pbnV0ZXNNb3ZlZCk7XG4gICAgfVxuXG4gICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtcbiAgICAgIG5ld1N0YXJ0LFxuICAgICAgbmV3RW5kLFxuICAgICAgZXZlbnQ6IGRheUV2ZW50LmV2ZW50LFxuICAgICAgdHlwZTogQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50VHlwZS5SZXNpemVcbiAgICB9KTtcbiAgICB0aGlzLmN1cnJlbnRSZXNpemVzLmRlbGV0ZShkYXlFdmVudCk7XG4gIH1cblxuICBkcmFnU3RhcnRlZChcbiAgICBldmVudDogSFRNTEVsZW1lbnQsXG4gICAgZGF5RXZlbnRzQ29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgICBkYXlFdmVudDogRGF5Vmlld0V2ZW50XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGRyYWdIZWxwZXI6IENhbGVuZGFyRHJhZ0hlbHBlciA9IG5ldyBDYWxlbmRhckRyYWdIZWxwZXIoXG4gICAgICBkYXlFdmVudHNDb250YWluZXIsXG4gICAgICBldmVudFxuICAgICk7XG4gICAgdGhpcy52YWxpZGF0ZURyYWcgPSAoeyB4LCB5LCB0cmFuc2Zvcm0gfSkgPT5cbiAgICAgIHRoaXMuY3VycmVudFJlc2l6ZXMuc2l6ZSA9PT0gMCAmJlxuICAgICAgZHJhZ0hlbHBlci52YWxpZGF0ZURyYWcoe1xuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICBzbmFwRHJhZ2dlZEV2ZW50czogdGhpcy5zbmFwRHJhZ2dlZEV2ZW50cyxcbiAgICAgICAgZHJhZ0FscmVhZHlNb3ZlZDogdGhpcy5kcmFnQWxyZWFkeU1vdmVkLFxuICAgICAgICB0cmFuc2Zvcm1cbiAgICAgIH0pO1xuICAgIHRoaXMuZXZlbnREcmFnRW50ZXIgPSAwO1xuICAgIHRoaXMuZHJhZ0FscmVhZHlNb3ZlZCA9IGZhbHNlO1xuICAgIHRoaXMuY3VycmVudERyYWcgPSB7XG4gICAgICBkYXlFdmVudCxcbiAgICAgIG9yaWdpbmFsVG9wOiBkYXlFdmVudC50b3AsXG4gICAgICBvcmlnaW5hbExlZnQ6IGRheUV2ZW50LmxlZnRcbiAgICB9O1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRyYWdNb3ZlKGNvb3JkczogRHJhZ01vdmVFdmVudCkge1xuICAgIHRoaXMuZHJhZ0FscmVhZHlNb3ZlZCA9IHRydWU7XG4gICAgaWYgKHRoaXMuc25hcERyYWdnZWRFdmVudHMpIHtcbiAgICAgIHRoaXMuY3VycmVudERyYWcuZGF5RXZlbnQudG9wID0gdGhpcy5jdXJyZW50RHJhZy5vcmlnaW5hbFRvcCArIGNvb3Jkcy55O1xuICAgICAgdGhpcy5jdXJyZW50RHJhZy5kYXlFdmVudC5sZWZ0ID0gdGhpcy5jdXJyZW50RHJhZy5vcmlnaW5hbExlZnQgKyBjb29yZHMueDtcbiAgICB9XG4gIH1cblxuICBkcmFnRW5kZWQoZGF5RXZlbnQ6IERheVZpZXdFdmVudCwgZHJhZ0VuZEV2ZW50OiBEcmFnRW5kRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnREcmFnLmRheUV2ZW50LnRvcCA9IHRoaXMuY3VycmVudERyYWcub3JpZ2luYWxUb3A7XG4gICAgdGhpcy5jdXJyZW50RHJhZy5kYXlFdmVudC5sZWZ0ID0gdGhpcy5jdXJyZW50RHJhZy5vcmlnaW5hbExlZnQ7XG4gICAgdGhpcy5jdXJyZW50RHJhZyA9IG51bGw7XG4gICAgaWYgKHRoaXMuZXZlbnREcmFnRW50ZXIgPiAwKSB7XG4gICAgICBsZXQgbWludXRlc01vdmVkID0gZ2V0TWludXRlc01vdmVkKFxuICAgICAgICBkcmFnRW5kRXZlbnQueSxcbiAgICAgICAgdGhpcy5ob3VyU2VnbWVudHMsXG4gICAgICAgIHRoaXMuaG91clNlZ21lbnRIZWlnaHQsXG4gICAgICAgIHRoaXMuZXZlbnRTbmFwU2l6ZVxuICAgICAgKTtcbiAgICAgIGxldCBuZXdTdGFydDogRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkTWludXRlcyhcbiAgICAgICAgZGF5RXZlbnQuZXZlbnQuc3RhcnQsXG4gICAgICAgIG1pbnV0ZXNNb3ZlZFxuICAgICAgKTtcbiAgICAgIGlmIChkcmFnRW5kRXZlbnQueSA8IDAgJiYgbmV3U3RhcnQgPCB0aGlzLnZpZXcucGVyaW9kLnN0YXJ0KSB7XG4gICAgICAgIG1pbnV0ZXNNb3ZlZCArPSB0aGlzLmRhdGVBZGFwdGVyLmRpZmZlcmVuY2VJbk1pbnV0ZXMoXG4gICAgICAgICAgdGhpcy52aWV3LnBlcmlvZC5zdGFydCxcbiAgICAgICAgICBuZXdTdGFydFxuICAgICAgICApO1xuICAgICAgICBuZXdTdGFydCA9IHRoaXMudmlldy5wZXJpb2Quc3RhcnQ7XG4gICAgICB9XG4gICAgICBsZXQgbmV3RW5kOiBEYXRlO1xuICAgICAgaWYgKGRheUV2ZW50LmV2ZW50LmVuZCkge1xuICAgICAgICBuZXdFbmQgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZE1pbnV0ZXMoZGF5RXZlbnQuZXZlbnQuZW5kLCBtaW51dGVzTW92ZWQpO1xuICAgICAgfVxuICAgICAgaWYgKGlzRHJhZ2dlZFdpdGhpblBlcmlvZChuZXdTdGFydCwgbmV3RW5kLCB0aGlzLnZpZXcucGVyaW9kKSkge1xuICAgICAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoe1xuICAgICAgICAgIG5ld1N0YXJ0LFxuICAgICAgICAgIG5ld0VuZCxcbiAgICAgICAgICBldmVudDogZGF5RXZlbnQuZXZlbnQsXG4gICAgICAgICAgdHlwZTogQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50VHlwZS5EcmFnLFxuICAgICAgICAgIGFsbERheTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHJlZnJlc2hIb3VyR3JpZCgpOiB2b2lkIHtcbiAgICB0aGlzLmhvdXJzID0gdGhpcy51dGlscy5nZXREYXlWaWV3SG91ckdyaWQoe1xuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXG4gICAgICBob3VyU2VnbWVudHM6IHRoaXMuaG91clNlZ21lbnRzLFxuICAgICAgZGF5U3RhcnQ6IHtcbiAgICAgICAgaG91cjogdGhpcy5kYXlTdGFydEhvdXIsXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlTdGFydE1pbnV0ZVxuICAgICAgfSxcbiAgICAgIGRheUVuZDoge1xuICAgICAgICBob3VyOiB0aGlzLmRheUVuZEhvdXIsXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlFbmRNaW51dGVcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZWZyZXNoVmlldygpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXcgPSB0aGlzLnV0aWxzLmdldERheVZpZXcoe1xuICAgICAgZXZlbnRzOiB0aGlzLmV2ZW50cyxcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxuICAgICAgaG91clNlZ21lbnRzOiB0aGlzLmhvdXJTZWdtZW50cyxcbiAgICAgIGRheVN0YXJ0OiB7XG4gICAgICAgIGhvdXI6IHRoaXMuZGF5U3RhcnRIb3VyLFxuICAgICAgICBtaW51dGU6IHRoaXMuZGF5U3RhcnRNaW51dGVcbiAgICAgIH0sXG4gICAgICBkYXlFbmQ6IHtcbiAgICAgICAgaG91cjogdGhpcy5kYXlFbmRIb3VyLFxuICAgICAgICBtaW51dGU6IHRoaXMuZGF5RW5kTWludXRlXG4gICAgICB9LFxuICAgICAgZXZlbnRXaWR0aDogdGhpcy5ldmVudFdpZHRoLFxuICAgICAgc2VnbWVudEhlaWdodDogdGhpcy5ob3VyU2VnbWVudEhlaWdodFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlZnJlc2hBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5yZWZyZXNoSG91ckdyaWQoKTtcbiAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG4gICAgdGhpcy5lbWl0QmVmb3JlVmlld1JlbmRlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGVtaXRCZWZvcmVWaWV3UmVuZGVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmhvdXJzICYmIHRoaXMudmlldykge1xuICAgICAgdGhpcy5iZWZvcmVWaWV3UmVuZGVyLmVtaXQoe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgaG91ckdyaWQ6IHRoaXMuaG91cnMsXG4gICAgICAgICAgYWxsRGF5RXZlbnRzOiB0aGlzLnZpZXcuYWxsRGF5RXZlbnRzXG4gICAgICAgIH0sXG4gICAgICAgIHBlcmlvZDogdGhpcy52aWV3LnBlcmlvZFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=