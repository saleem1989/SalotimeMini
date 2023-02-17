import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { startOfDay, endOfDay, isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarView, CalendarDateFormatter } from 'angular-calendar';
import { CustomDateFormatter } from '../calendar/custom-date-formatter.provider';
import * as moment from 'moment';
var colors = [
    {
        primary: '#bada55',
        secondary: '#bada55'
    },
    {
        primary: '#7fe5f0',
        secondary: '#7fe5f0'
    },
    {
        primary: '#ff0000',
        secondary: '#ff0000'
    },
    {
        primary: '#ff80ed',
        secondary: '#ff80ed'
    },
    {
        primary: '#696969',
        secondary: '#696969'
    },
    {
        primary: '#133337',
        secondary: '#133337'
    },
    {
        primary: '#065535',
        secondary: '#065535'
    },
    {
        primary: '#c0c0c0',
        secondary: '#c0c0c0'
    },
];
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(apiAppointments, route, modalService) {
        var _this = this;
        this.apiAppointments = apiAppointments;
        this.route = route;
        this.modalService = modalService;
        this.daysInWeek = 3;
        this.view = CalendarView.Week;
        this.CalendarView = CalendarView;
        this.viewDate = new Date();
        // exclude weekends
        this.daysOff = [0, 6];
        this.test = [];
        this.actions = [
            {
                label: '<i class="far fa-question-circle"></i>',
                onClick: function (_a) {
                    var event = _a.event;
                    _this.modalService.open('custom-modal-1');
                    //this.events = this.events.filter(iEvent => iEvent !== event);
                    // this.handleEvent('Deleted', event);
                }
            }
        ];
        this.refresh = new Subject();
        this.events = [];
        this.activeDayIsOpen = true;
    }
    CalendarComponent.prototype.closeModal = function () {
        this.modalService.close('custom-modal-1');
    };
    CalendarComponent.prototype.getHourSegment = function (minS) {
        if (minS >= 60) {
            return 2;
        }
        else {
            while (60 % minS != 0) {
                --minS;
            }
            return 60 / minS;
        }
    };
    CalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fromHour = this.route.snapshot.paramMap.get('minH');
        this.atHour = this.route.snapshot.paramMap.get('maxH');
        var minServer = parseInt(this.route.snapshot.paramMap.get('mST'));
        this.hourSegment = this.getHourSegment(minServer);
        var selectedDateArr = moment().format("YYYY-MM-DD").split("-");
        this.apiAppointments.getAppointments("-1", selectedDateArr[1], "-1", "-1")
            .subscribe(function (res) {
            _this.models = res.data;
            var pNumber = _this.models.phoneNum;
            //0,1,2,3
            var indexColor = (pNumber ? parseInt(pNumber.slice(-2)) : 0) % colors.length;
            for (var i = 0; i < _this.models.length; i++) {
                _this.events.push({
                    start: new Date(_this.models[i].year, _this.models[i].month - 1, _this.models[i].day, _this.models[i].fromHour, _this.models[i].fromMin),
                    end: new Date(_this.models[i].year, _this.models[i].month - 1, _this.models[i].day, _this.models[i].atHour, _this.models[i].atMin),
                    title: 'breserved ' + _this.models[i].servercies + ' by ' + _this.models[i].Name + ' from 8:00 to 8:15 ',
                    cssClass: 'my-custom-class',
                    color: colors[0],
                    actions: _this.actions
                });
            }
            /*    {
                  start: new Date(2020, 2, 5, 13, 0 + i),
                  end: new Date(2020, 2, 5, 13, 30 + i),
                  title: 'barber reserved by saleem ' + i+ ' from 8:00 to 8:15 ',
                  cssClass: 'my-custom-class',
                  color: colors.red,
                  actions: this.actions
                }*/
        });
        // var test = JSON.stringify(this.events);
        //var obj = JSON.parse('[{"start":"2020-01-05T08:00:00.000Z","end":"2020-03-05T08:30:00.000Z","title":"reserved by saleem from 8:00 to 8:15  dfg dfg df gdf gdfg dfg dfg dfg dfg fgh dfg hdfgh dfg hdsf asdf s dfs df","cssClass":"my-custom-class","color":{"primary":"#ad2121","secondary":"#FAE3E3"},"actions":[{"label":"<i class=\"far fa-question-circle\"></i>"}]}]');
    };
    CalendarComponent.prototype.dayClicked = function (_a) {
        var date = _a.date, events = _a.events;
        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
            }
            this.viewDate = date;
        }
    };
    CalendarComponent.prototype.eventTimesChanged = function (_a) {
        var event = _a.event, newStart = _a.newStart, newEnd = _a.newEnd;
        this.events = this.events.map(function (iEvent) {
            if (iEvent === event) {
                return tslib_1.__assign({}, event, { start: newStart, end: newEnd });
            }
            return iEvent;
        });
        this.handleEvent('Dropped or resized', event);
    };
    CalendarComponent.prototype.handleEvent = function (action, event) {
        this.modalData = { event: event, action: action };
        //   this.modal.open(this.modalContent, { size: 'lg' });
    };
    CalendarComponent.prototype.addEvent = function () {
        this.events = tslib_1.__spread(this.events, [
            {
                title: 'New event',
                start: startOfDay(new Date()),
                end: endOfDay(new Date()),
                color: colors.red,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            }
        ]);
    };
    CalendarComponent.prototype.deleteEvent = function (eventToDelete) {
        this.events = this.events.filter(function (event) { return event !== eventToDelete; });
    };
    CalendarComponent.prototype.setView = function (view) {
        this.view = view;
    };
    CalendarComponent.prototype.closeOpenMonthViewDay = function () {
        this.activeDayIsOpen = false;
    };
    tslib_1.__decorate([
        ViewChild('modalContent', { static: true })
    ], CalendarComponent.prototype, "modalContent", void 0);
    CalendarComponent = tslib_1.__decorate([
        Component({
            selector: 'app-calendar',
            changeDetection: ChangeDetectionStrategy.OnPush,
            templateUrl: './calendar.component.html',
            styleUrls: ['./calendar.component.scss'],
            providers: [
                {
                    provide: CalendarDateFormatter,
                    useClass: CustomDateFormatter
                }
            ]
        })
    ], CalendarComponent);
    return CalendarComponent;
}());
export { CalendarComponent };
//# sourceMappingURL=calendar.component.js.map