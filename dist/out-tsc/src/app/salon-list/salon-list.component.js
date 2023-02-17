import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var SalonListComponent = /** @class */ (function () {
    function SalonListComponent(apiOpenSalon, router) {
        this.apiOpenSalon = apiOpenSalon;
        this.router = router;
        this.currentRate = 3;
        this.isLoading = true;
    }
    SalonListComponent.prototype.navigator = function (salonId) {
        // this.router.navigate(["/salon-panel"],{queryParams:{id:salonId}});
        this.router.navigate(["/salon-panel", { id: salonId }]);
    };
    SalonListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiOpenSalon.getAllSalonPanel()
            .subscribe(function (res) {
            _this.models = res.data;
            _this.isLoading = false;
            console.log(res);
        }, function (err) { });
    };
    SalonListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-salon-list',
            templateUrl: './salon-list.component.html',
            styleUrls: ['./salon-list.component.scss']
        })
    ], SalonListComponent);
    return SalonListComponent;
}());
export { SalonListComponent };
//# sourceMappingURL=salon-list.component.js.map