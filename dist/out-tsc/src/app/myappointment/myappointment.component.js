import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
var MyappointmentComponent = /** @class */ (function () {
    function MyappointmentComponent() {
        this.activeTab = "New";
    }
    MyappointmentComponent.prototype.changeActiveTab = function (activeTab) {
        this.activeTab = activeTab;
    };
    MyappointmentComponent.prototype.ngOnInit = function () {
    };
    MyappointmentComponent.prototype.ngAfterViewInit = function () {
        new WOW().init();
    };
    MyappointmentComponent = tslib_1.__decorate([
        Component({
            selector: 'app-myappointment',
            templateUrl: './myappointment.component.html',
            styleUrls: ['./myappointment.component.scss']
        })
    ], MyappointmentComponent);
    return MyappointmentComponent;
}());
export { MyappointmentComponent };
//# sourceMappingURL=myappointment.component.js.map