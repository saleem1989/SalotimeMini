import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var ReservationApiService = /** @class */ (function () {
    function ReservationApiService(http) {
        this.http = http;
        this.baseUrl = "https://reservationappangular8.azurewebsites.net/";
    }
    ReservationApiService.prototype.getSettings = function () {
        return this.http.get(this.baseUrl + 'setting');
    };
    ReservationApiService.prototype.getFields = function () {
        return this.http.get(this.baseUrl + 'customField');
    };
    ReservationApiService.prototype.getAvailableDates = function (guests, from, to) {
        return this.http.get(this.baseUrl + 'date', {
            params: {
                guests: guests,
                from: from,
                to: to
            }
        });
    };
    ReservationApiService.prototype.getAvailableTimes = function (guests, from, to) {
        return this.http.get(this.baseUrl + 'time', {
            params: {
                guests: guests,
                from: from,
                to: to
            }
        });
    };
    ReservationApiService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], ReservationApiService);
    return ReservationApiService;
}());
export { ReservationApiService };
//# sourceMappingURL=reservationapi.service.js.map