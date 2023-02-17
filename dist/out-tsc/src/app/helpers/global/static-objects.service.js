import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Category } from '../../models/Home/category';
var StaticObjectsService = /** @class */ (function () {
    function StaticObjectsService() {
        this.categories = [];
        this.setCategories();
    }
    StaticObjectsService.prototype.setCategories = function () {
        this.categories.push(new Category("Barber", "Barber", "assets/images/icon_barber.png"));
        this.categories.push(new Category("faceTherapy", "faceTherapy", "assets/images/icon_face.png"));
        this.categories.push(new Category("Makeup", "Makeup", "assets/images/icon_makeup.png"));
        this.categories.push(new Category("Nails", "Nails", "assets/images/icon_nails.png"));
        this.categories.push(new Category("Haircut", "Haircut", "assets/images/icon_haircut.png"));
    };
    StaticObjectsService.prototype.getCategories = function () {
        return this.categories;
    };
    StaticObjectsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], StaticObjectsService);
    return StaticObjectsService;
}());
export { StaticObjectsService };
//# sourceMappingURL=static-objects.service.js.map