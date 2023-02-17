import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
import { first } from 'rxjs/operators';
import { Validators } from '@angular/forms';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, route, router, authenticationService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        new WOW().init();
        this.loginForm = this.formBuilder.group({
            phoneNum: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")]],
            fullName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern("^([a-zA-Z\-ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïòóôõöùúûüýÿ']{2,75} ?){2,5}$")]],
        });
    };
    Object.defineProperty(LoginComponent.prototype, "phoneNum", {
        get: function () {
            return this.loginForm.get('phoneNum');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "fullName", {
        get: function () {
            return this.loginForm.get('fullName');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "f", {
        get: function () { return this.loginForm.controls; },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.sentCode = function () {
        var _this = this;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        var phone = this.f.phoneNum.value;
        var fName = this.f.fullName.value;
        alert(fName);
        this.authenticationService.authPhone(phone, fName)
            .pipe(first())
            .subscribe(function (data) {
            debugger;
            //TODO: create loading icon
            localStorage.setItem('phone', phone);
            localStorage.setItem('uid', data.uid);
            localStorage.setItem('fName', fName);
            //TODO: change this to be routed instead of flaged
            // this.showMainContent = !this.showMainContent;
            _this.router.navigate(["/auth", { code: data.phoneToken }]);
        }, function (error) {
            alert(error.error.message);
        });
    };
    LoginComponent.prototype.goToMain = function () {
    };
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map