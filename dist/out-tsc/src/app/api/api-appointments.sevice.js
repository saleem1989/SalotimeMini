import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
var ApiAppoinmtmentsService = /** @class */ (function () {
    function ApiAppoinmtmentsService(http) {
        this.http = http;
    }
    ApiAppoinmtmentsService.prototype.getAppointments = function (day, month, year, salonId) {
        var params = new HttpParams().set("day", day).set("month", month).set("year", year).set("salonId", salonId);
        return this.http.get(environment.APIUrl + "/appointments/getAppointments", { params: params });
    };
    ApiAppoinmtmentsService.prototype.setAppointment = function (appointment) {
        return this.http.post(environment.APIUrl + "/appointments/setAppointments", { appointment: appointment });
    };
    ApiAppoinmtmentsService.prototype.getAvailableDates = function (from, to, salonId) {
        var params = new HttpParams().set("from", from).set("to", to).set("salonId", salonId);
        return this.http.get(environment.APIUrl + "/appointments/getAvailableDates", { params: params });
    };
    ApiAppoinmtmentsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], ApiAppoinmtmentsService);
    return ApiAppoinmtmentsService;
}());
export { ApiAppoinmtmentsService };
//# sourceMappingURL=api-appointments.sevice.js.map