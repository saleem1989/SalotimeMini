import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { first } from "rxjs/operators";
import { WOW } from 'wowjs/dist/wow.min';
var AuthphoneComponent = /** @class */ (function () {
    function AuthphoneComponent(formBuilder, route, router, authenticationService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
    }
    AuthphoneComponent.prototype.ngOnInit = function () {
        new WOW().init();
        this.authForm = this.formBuilder.group({
            authcode: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
        });
        this.code = this.route.snapshot.paramMap.get('code');
    };
    Object.defineProperty(AuthphoneComponent.prototype, "f", {
        get: function () { return this.authForm.controls; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthphoneComponent.prototype, "authcode", {
        get: function () {
            return this.authForm.get('authcode');
        },
        enumerable: true,
        configurable: true
    });
    AuthphoneComponent.prototype.onSubmit = function () {
        var _this = this;
        // stop here if form is invalid
        if (this.authForm.invalid) {
            return;
        }
        var phone = localStorage.getItem('phone');
        var authCode = this.f.authcode.value;
        this.authenticationService.login(phone, authCode)
            .pipe(first())
            .subscribe(function (data) {
            _this.router.navigate(["/home"]);
        }, function (error) {
            // this.alertService.error(error);
            // this.loading = false;
        });
    };
    AuthphoneComponent.prototype.goToMain = function () {
    };
    AuthphoneComponent = tslib_1.__decorate([
        Component({
            selector: 'app-authphone',
            templateUrl: './authphone.component.html',
            styleUrls: ['./authphone.component.scss']
        })
    ], AuthphoneComponent);
    return AuthphoneComponent;
}());
export { AuthphoneComponent };
//# sourceMappingURL=authphone.component.js.map