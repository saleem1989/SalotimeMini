import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
var ApiOpensalonService = /** @class */ (function () {
    function ApiOpensalonService(http) {
        this.http = http;
    }
    ApiOpensalonService.prototype.register = function (opensalon) {
        return this.http.post(environment.APIUrl + "/opensalon/register", { opensalon: opensalon });
    };
    ApiOpensalonService.prototype.setRating = function (score, opensalonId) {
        return this.http.post(environment.APIUrl + "/opensalon/setrating", { score: score, opensalonId: opensalonId });
    };
    ApiOpensalonService.prototype.addComment = function (comment, opensalonId) {
        return this.http.post(environment.APIUrl + "/opensalon/addcomment", { comment: comment, opensalonId: opensalonId });
    };
    ApiOpensalonService.prototype.getSalonPanel = function (opensalonId) {
        var params = new HttpParams().set("opensalonId", opensalonId);
        return this.http.get(environment.APIUrl + "/opensalon/getsalonpanel", { params: params });
    };
    ApiOpensalonService.prototype.getAllSalonPanel = function () {
        return this.http.get(environment.APIUrl + "/opensalon/getAllSalonPanel");
    };
    ApiOpensalonService.prototype.getSubCategory = function (typeID) {
        var params = new HttpParams().set("typeID", typeID);
        return this.http.get(environment.APIUrl + "/opensalon/getsubcategories", { params: params });
    };
    ApiOpensalonService.prototype.getSalonServecies = function () {
        return this.http.get(environment.APIUrl + "/opensalon/getSalonServecies");
    };
    ApiOpensalonService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], ApiOpensalonService);
    return ApiOpensalonService;
}());
export { ApiOpensalonService };
//# sourceMappingURL=api-opensalon.service.js.map