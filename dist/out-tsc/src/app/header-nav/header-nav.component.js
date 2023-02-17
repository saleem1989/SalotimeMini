import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var HeaderNavComponent = /** @class */ (function () {
    function HeaderNavComponent() {
    }
    HeaderNavComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        Input('headerName')
    ], HeaderNavComponent.prototype, "headerName", void 0);
    tslib_1.__decorate([
        Input('navLink')
    ], HeaderNavComponent.prototype, "navLink", void 0);
    tslib_1.__decorate([
        Input('isFixedTop')
    ], HeaderNavComponent.prototype, "isFixedTop", void 0);
    HeaderNavComponent = tslib_1.__decorate([
        Component({
            selector: 'app-header-nav',
            templateUrl: './header-nav.component.html',
            styleUrls: ['./header-nav.component.scss']
        })
    ], HeaderNavComponent);
    return HeaderNavComponent;
}());
export { HeaderNavComponent };
//# sourceMappingURL=header-nav.component.js.map