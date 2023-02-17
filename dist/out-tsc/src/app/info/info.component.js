import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var InfoComponent = /** @class */ (function () {
    function InfoComponent(modalService) {
        this.modalService = modalService;
    }
    InfoComponent.prototype.ngOnInit = function () {
    };
    InfoComponent.prototype.closeModal = function () {
        this.modalService.close('custom-modal-1');
    };
    InfoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-info',
            templateUrl: './info.component.html',
            styleUrls: ['./info.component.scss']
        })
    ], InfoComponent);
    return InfoComponent;
}());
export { InfoComponent };
//# sourceMappingURL=info.component.js.map