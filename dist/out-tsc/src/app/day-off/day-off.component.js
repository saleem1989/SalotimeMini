import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
import { AvailableDate } from '../models/reservation-model//available-date';
var DayOffComponent = /** @class */ (function () {
    function DayOffComponent() {
        this.daysNumber = 35;
        this.trs = [0, 1, 2, 3, 4];
        this.rowsToAdd = 35;
        this.selectedTime = false;
    }
    DayOffComponent.prototype.dateChanged = function () {
        var date = this.form.get('date').value;
        var from = moment().set({ 'year': date.year, 'month': date.month - 1, 'date': date.day }).format("YYYY-MM-DD");
        var to = moment(from).add(7, 'days').format("YYYY-MM-DD");
        console.info(from);
    };
    DayOffComponent.prototype.LastXDays = function (n) {
        var availableDatesArr = [];
        for (var i = 0; i < n; i++) {
            var d = new Date();
            d.setDate(d.getDate() + i);
            var availableDates = new AvailableDate();
            availableDates.date = this.formatDate(d);
            availableDates.available = true;
            availableDates.message = "";
            availableDatesArr.push(availableDates);
        }
        return availableDatesArr;
    };
    DayOffComponent.prototype.formatDate = function (date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        date = mm + '/' + dd + '/' + yyyy;
        return date;
    };
    DayOffComponent.prototype.loadMore = function () {
        var rows = this.trs[this.trs.length - 1] + 1;
        var additionalRows = this.rowsToAdd / 7;
        for (var i = rows; i < rows + additionalRows; i++) {
            this.trs.push(i);
        }
        this.daysNumber += this.rowsToAdd;
        this.dates = this.LastXDays(this.daysNumber);
    };
    DayOffComponent.prototype.selectDate = function (str) {
        debugger;
    };
    DayOffComponent.prototype.onChildSelect = function (Child) {
        var curColor = Child.BackgroundColour;
        Child.BackgroundColour = curColor == "blue" ? "" : "blue";
        debugger;
        this.selectedDates.push(Child);
    };
    DayOffComponent.prototype.openReservationForm = function () {
        //this.router.navigate(['/reservation-form', this.selectedDate, this.selectedTime, this.selectedGuests]);
        alert("reserve");
    };
    DayOffComponent.prototype.ngOnInit = function () {
        this.dates = this.LastXDays(this.daysNumber);
        this.form = new FormGroup({});
    };
    DayOffComponent = tslib_1.__decorate([
        Component({
            selector: 'app-day-off',
            templateUrl: './day-off.component.html',
            styleUrls: ['./day-off.component.scss']
        })
    ], DayOffComponent);
    return DayOffComponent;
}());
export { DayOffComponent };
//# sourceMappingURL=day-off.component.js.map