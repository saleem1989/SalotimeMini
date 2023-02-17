import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var EmployeeDropDownComponent = /** @class */ (function () {
    function EmployeeDropDownComponent() {
        this.Services = [{ name: 'Tamer Khoury', value: 1 }, { name: 'Saher Silbak', value: 1 }];
    }
    EmployeeDropDownComponent.prototype.ngOnInit = function () {
    };
    EmployeeDropDownComponent = tslib_1.__decorate([
        Component({
            selector: 'app-employee-drop-down',
            templateUrl: './employee-drop-down.component.html',
            styleUrls: ['./employee-drop-down.component.scss']
        })
    ], EmployeeDropDownComponent);
    return EmployeeDropDownComponent;
}());
export { EmployeeDropDownComponent };
//# sourceMappingURL=employee-drop-down.component.js.map