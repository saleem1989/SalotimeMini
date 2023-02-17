import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var ModalService = /** @class */ (function () {
    function ModalService() {
        this.modals = [];
    }
    ModalService.prototype.add = function (modal) {
        // add modal to array of active modals
        this.modals.push(modal);
    };
    ModalService.prototype.remove = function (id) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(function (x) { return x.id !== id; });
    };
    ModalService.prototype.open = function (id) {
        // open modal specified by id
        var modal = this.modals.find(function (x) { return x.id === id; });
        modal.open();
    };
    ModalService.prototype.close = function (id) {
        // close modal specified by id
        var modal = this.modals.find(function (x) { return x.id === id; });
        modal.close();
    };
    ModalService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' })
    ], ModalService);
    return ModalService;
}());
export { ModalService };
//# sourceMappingURL=modal.service.js.map