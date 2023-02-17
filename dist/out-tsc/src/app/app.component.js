import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
var AppComponent = /** @class */ (function () {
    function AppComponent(router) {
        this.router = router;
        this.showpassform = true;
        this.model = {
            left: true,
            middle: false,
            right: false
        };
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        // Your code
        new WOW().init();
    };
    AppComponent.prototype.toGotWebsite = function () {
        var pass = document.getElementById("password").value;
        if (pass == "nopainnogain") {
            this.showpassform = false;
            this.router.navigate(['/login']);
        }
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss'],
        })
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map