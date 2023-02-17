import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
var ApiAuthService = /** @class */ (function () {
    function ApiAuthService(http) {
        this.http = http;
    }
    ApiAuthService.prototype.authPhone = function (phone, fName) {
        return this.http.get(environment.APIUrl + "/users/authphone?fName=" + fName + "&phone=" + phone);
    };
    ApiAuthService.prototype.refreshToken = function (refreshToken) {
        return this.http.post(environment.APIUrl + "/users/refreshtoken", { refreshToken: refreshToken });
    };
    ApiAuthService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], ApiAuthService);
    return ApiAuthService;
}());
export { ApiAuthService };
//# sourceMappingURL=api-auth.service.js.map