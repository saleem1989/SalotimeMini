import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
var ApiUserService = /** @class */ (function () {
    function ApiUserService(http) {
        this.http = http;
    }
    ApiUserService.prototype.updateProfile = function (profile) {
        return this.http.post(environment.APIUrl + "/users/updateprofile", { profile: profile });
    };
    ApiUserService.prototype.toggleFavorites = function (opensalonId, fav) {
        if (fav === void 0) { fav = false; }
        return this.http.post(environment.APIUrl + "/users/togglefavorites", { opensalonId: opensalonId });
    };
    ApiUserService.prototype.getprofile = function () {
        return this.http.get(environment.APIUrl + "/users/getProfile");
    };
    ApiUserService.prototype.getFavorites = function () {
        return this.http.get(environment.APIUrl + "/users/getfavorites");
    };
    ApiUserService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], ApiUserService);
    return ApiUserService;
}());
export { ApiUserService };
//# sourceMappingURL=api-user.service.js.map