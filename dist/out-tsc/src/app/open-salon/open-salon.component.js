import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
var OpenSalonComponent = /** @class */ (function () {
    function OpenSalonComponent(router, apiOpenSalon, route) {
        this.router = router;
        this.apiOpenSalon = apiOpenSalon;
        this.route = route;
        this.backButtonPointOpts = ['home', 'salon-panel'];
        this.step2 = "hello";
    }
    OpenSalonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.backButtonPoint = _this.backButtonPointOpts.indexOf(params.from) == -1 ? "/home" : "/" + params.from;
        });
    };
    OpenSalonComponent.prototype.onSubmit = function () {
        var _this = this;
        //TODO: should be loading and ask the user to wait.
        this.apiOpenSalon.register(this.step2).subscribe(function (res) {
            //user was set as admin , store the new token in localstorage
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            currentUser.refreshToken = res.refreshToken;
            currentUser.token = res.token;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            _this.router.navigate(['/salon-panel']);
        }, function (err) {
            console.error(err);
        });
    };
    OpenSalonComponent.prototype.setStep2 = function ($event) {
        this.step2 = $event;
        this.stepper.next();
    };
    tslib_1.__decorate([
        ViewChild('stepper', { static: true })
    ], OpenSalonComponent.prototype, "stepper", void 0);
    OpenSalonComponent = tslib_1.__decorate([
        Component({
            selector: 'app-open-salon',
            templateUrl: './open-salon.component.html',
            styleUrls: ['./open-salon.component.scss']
        })
    ], OpenSalonComponent);
    return OpenSalonComponent;
}());
export { OpenSalonComponent };
//# sourceMappingURL=open-salon.component.js.map