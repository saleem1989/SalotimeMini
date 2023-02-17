import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var UpdateSalonComponent = /** @class */ (function () {
    function UpdateSalonComponent(route) {
        this.route = route;
        this.backButtonUrlOpts = ['home', 'salon-panel'];
    }
    UpdateSalonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.backButtonUrl = _this.backButtonUrlOpts.indexOf(params.from) == -1 ? "/home" : "/" + params.from;
        });
    };
    UpdateSalonComponent = tslib_1.__decorate([
        Component({
            selector: 'app-update-salon',
            templateUrl: './update-salon.component.html',
            styleUrls: ['./update-salon.component.scss']
        })
    ], UpdateSalonComponent);
    return UpdateSalonComponent;
}());
export { UpdateSalonComponent };
//# sourceMappingURL=update-salon.component.js.map