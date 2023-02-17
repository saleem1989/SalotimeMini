import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';
import { SuccessDynamicModalComponent } from '../success-dynamic-modal/success-dynamic-modal.component';
var ReservationAppComponent = /** @class */ (function () {
    function ReservationAppComponent(api, apiAppointments, apiOpenSalon, authObj, modalService, route) {
        var _this = this;
        this.api = api;
        this.apiAppointments = apiAppointments;
        this.apiOpenSalon = apiOpenSalon;
        this.authObj = authObj;
        this.modalService = modalService;
        this.route = route;
        this.Services = [{ name: 'HairCut', value: 1 }, { name: 'Nails', value: 1 }];
        this.isHasMoreThanService = false;
        this.ServicesArray = [];
        this.newAttribute = {};
        this.myAppointment = {};
        this.selectedServerDuration = 0;
        this.indexY = 0;
        this.optionsSelect = [];
        this.selectedValues = [];
        this.lastDateSelect = null;
        this.salonId = this.route.snapshot.paramMap.get('id') == null ? "-1" : this.route.snapshot.paramMap.get('id');
        // this.settings = result;
        debugger;
        this.errorMessage = "";
        this.showMessage = false;
        this.minDate = { year: moment().year(), month: moment().month() + 1, day: moment().date() };
        var maxD = moment().add(1, 'month');
        this.maxDate = { year: maxD.year(), month: maxD.month() + 1, day: maxD.date() };
        this.selectedStartDate = moment().format("YYYY-MM-DD");
        var defaultTime = ("undefined" === typeof this.paramsTime ? null : moment(this.paramsTime).format("HH:mm"));
        this.initDates(this.paramsGuests, this.paramsTime, defaultTime);
        this.apiOpenSalon.getSalonServecies().subscribe(function (res) {
            //index 0 (currently we handle just for one employee )
            var data = [];
            var services = res.data.employees[0].subServersObj;
            for (var i = 0; i < services.length; i++) {
                data.push({ value: services[i].subServicesDp, label: services[i].subServicesDp, duration: services[i].subServiceTime });
            }
            _this.optionsSelect = data;
            _this.selectedValues = [];
        }, function (err) {
            alert("fail!");
        });
    }
    ReservationAppComponent.prototype.addService = function () {
        this.ServicesArray.push(this.newAttribute);
        this.newAttribute = {};
        this.numberOfServices++;
    };
    ReservationAppComponent.prototype.removeService = function (index) {
        this.ServicesArray.splice(index, 1);
        this.numberOfServices--;
    };
    ReservationAppComponent.prototype.dateChanged = function () {
        var date = this.form.get('date').value;
        var from = moment().set({ 'year': date.year, 'month': date.month - 1, 'date': date.day }).format("YYYY-MM-DD");
        var to = moment(from).add(7, 'days').format("YYYY-MM-DD");
        console.info(from);
        this.getAvailableDates(from, to, from, null);
    };
    ReservationAppComponent.prototype.initDates = function (guests, defaultDate, defaultTime) {
        this.times = null;
        this.showMessage = false;
        var from = ("undefined" === typeof this.defaultDate ? moment().format("YYYY-MM-DD") : moment(this.defaultDate).format("YYYY-MM-DD"));
        var to = ("undefined" === typeof this.defaultDate ? moment().add(7, 'days').format("YYYY-MM-DD") : moment(this.defaultDate).add(7, 'days').format("YYYY-MM-DD"));
        var test = moment(from).add(7, 'days').day(); //this.addDays(new Date(from) , 1 );
        // alert("test");
        debugger;
        this.getAvailableDates(from, to, defaultDate, defaultTime);
    };
    ReservationAppComponent.prototype.getAvailableDates = function (from, to, defaultDate, defaultTime) {
        var _this = this;
        this.apiAppointments.getAvailableDates(from, to, this.salonId).subscribe(function (result) {
            debugger;
            _this.dates = result.data;
            _this.errorMessageDates = null;
            if (defaultDate) {
                var d = moment(defaultDate).format("YYYY-MM-DD");
                _this.selectDate(_this.dates.find(function (date) { return date.date === d; }));
            }
            else {
                _this.selectedDate = null;
                _this.selectedTime = null;
                _this.dayMessage = null;
                _this.timeMessage = null;
            }
        });
    };
    ReservationAppComponent.prototype.isTimeIsAvilable = function (fHour, fMin, time) {
        if (this.indexY >= this.apointmentT.length)
            return true;
        var x1 = fHour * 60 + fMin;
        var y1 = fHour * 60 + fMin + time;
        var x2, y2;
        for (var i = this.indexY; i < this.apointmentT.length; i++) {
            x2 = this.apointmentT[i].fromHour * 60 + this.apointmentT[i].fromMin;
            y2 = this.apointmentT[i].atHour * 60 + this.apointmentT[i].atMin;
            if (x1 > y2) {
                debugger;
                this.indexY++;
                return false;
            }
            else if ((x1 >= x2 && x1 < y2) || (y1 > x2 && y1 <= y2) || (x2 >= x1 && x2 < y1) || (y2 > x1 && y2 <= y1))
                return false;
        }
        return true;
    };
    ReservationAppComponent.prototype.timeConvert = function (mins, cM, cH, sSD) {
        var h = Math.floor(mins / 60);
        var m = mins % 60;
        var newH = h < 10 ? '0' + h : h;
        var newM = m < 10 ? '0' + m : m;
        if (h >= cH || (h == cH && m >= cM))
            return null;
        if (!this.isTimeIsAvilable(h, m, sSD))
            return '0';
        return newH + ":" + newM;
    };
    ReservationAppComponent.prototype.getServerDuration = function () {
        var _this = this;
        var durationServicies = 0;
        var _loop_1 = function (i) {
            // alert("i=" + i + " duration:"+ parseInt(this.optionsSelect.find(a=>a.value==this.selectedValues[i]).duration));
            durationServicies += parseInt(this_1.optionsSelect.find(function (a) { return a.value == _this.selectedValues[i]; }).duration);
        };
        var this_1 = this;
        for (var i = 0; i < this.selectedValues.length; i++) {
            _loop_1(i);
        }
        return durationServicies;
    };
    ReservationAppComponent.prototype.selectDate = function (date) {
        var _this = this;
        this.selectedServerDuration = this.getServerDuration();
        var selectedDateArr = moment(date.date).format("YYYY-MM-DD").split("-");
        this.apiAppointments.getAppointments(selectedDateArr[2], selectedDateArr[1], selectedDateArr[0], this.salonId)
            .subscribe(function (res) {
            debugger;
            // var test   = JSON.parse(res.data, (key, value) => key == 'fromHour' || key == 'fromMin'  || key == 'atHour' || key == 'atMin' ? (fields = value) : value);
            _this.apointmentT = res.data;
            _this.lastDateSelect = date;
            var d = new Date(2020, 2, 13).getDay();
            _this.selectedDate = moment(date.date).format("YYYY-MM-DD");
            var from = moment(date.date, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm");
            var to = moment(date.date, "YYYY-MM-DD").add(1, "days").format("YYYY-MM-DD HH:mm");
            _this.dayMessage = date.message;
            _this.errorMessageTimes = null;
            _this.indexY = 0;
            var closedMin = 30;
            var closedHour = 0;
            var closedHour = 20;
            var openHour = 8;
            var openMin = 0;
            var minutes = openHour * 60 + openMin;
            var minimumServerMin = 5;
            var val = _this.timeConvert(minutes, closedMin, closedHour, _this.selectedServerDuration);
            _this.times = [];
            while (val) {
                if (val != "0") {
                    _this.times.push({ time: val.toString(), available: true, message: "", displayTime: val.toString() });
                }
                minutes += minimumServerMin;
                val = _this.timeConvert(minutes, closedMin, closedHour, _this.selectedServerDuration);
            }
        });
    };
    ReservationAppComponent.prototype.selectTime = function (time) {
        if (time) {
            this.timeMessage = time.message;
            this.selectedTime = time.time;
        }
        else {
            this.selectedTime = null;
            this.timeMessage = null;
        }
    };
    ReservationAppComponent.prototype.openReservationForm = function () {
        this.modalRef = this.modalService.show(SuccessDynamicModalComponent, {
            backdrop: true,
            keyboard: true,
            focus: true,
            show: false,
            ignoreBackdropClick: false,
            class: '',
            containerClass: '',
            animated: true,
            data: {
                heading: 'Modal heading',
                content: { bookTime: 'Booking time: ' + this.selectedTime, Date: 'Date: ' + this.selectedDate, Servercies: 'Servercies: ' + this.selectedValues.join() }
            }
        });
        return;
        //yyyy-mm-dd
        var dateArr = this.selectedDate.split('-');
        var selectedTimeArr = this.selectedTime.split(':');
        var atMin = parseInt(selectedTimeArr[1]) + this.selectedServerDuration;
        var salonId = this.route.snapshot.paramMap.get('id');
        this.myAppointment.UserID = localStorage.getItem('uid');
        this.myAppointment.day = dateArr[2];
        this.myAppointment.month = dateArr[1];
        this.myAppointment.year = dateArr[0];
        this.myAppointment.fromHour = selectedTimeArr[0];
        this.myAppointment.fromMin = selectedTimeArr[1];
        this.myAppointment.atHour = parseInt(selectedTimeArr[0]) + Math.floor(atMin / 60);
        this.myAppointment.atMin = atMin % 60;
        this.myAppointment.salonID = salonId ? salonId : localStorage.getItem('uid');
        this.myAppointment.Name = this.isAdmin ? this.Name : localStorage.getItem('fName');
        this.myAppointment.servercies = this.selectedValues.join();
        this.myAppointment.phoneNum = localStorage.getItem('phone');
        // this.myAppointment.phoneNum = 
        this.apiAppointments.setAppointment(this.myAppointment).subscribe(function (res) {
            alert("Success");
        }, function (err) {
            alert("fail!");
        });
    };
    ReservationAppComponent.prototype.getSelectedValues = function (data) {
        this.selectedValues = data;
        this.isHasMoreThanService = data.length > 0;
        if (this.lastDateSelect) {
            this.selectDate(this.lastDateSelect);
        }
    };
    ReservationAppComponent.prototype.ngOnInit = function () {
        this.isAdmin = this.authObj.isAdmin();
        this.numberOfServices = 1;
        this.ServicesArray.push(this.newAttribute);
        if (typeof this.route.snapshot.params.date !== "undefined" && typeof this.route.snapshot.params.time !== "undefined") {
            this.paramsTime = moment(this.route.snapshot.params.date + " " + this.route.snapshot.params.time).toDate();
        }
        this.paramsGuests = this.route.snapshot.params.guests;
        this.form = new FormGroup({
            'date': new FormControl()
        });
    };
    ReservationAppComponent = tslib_1.__decorate([
        Component({
            selector: 'reservation-App',
            templateUrl: './reservationApp.component.html',
            styleUrls: ['./reservationApp.component.scss']
        })
    ], ReservationAppComponent);
    return ReservationAppComponent;
}());
export { ReservationAppComponent };
//# sourceMappingURL=reservationApp.component.js.map