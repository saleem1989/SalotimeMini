import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { GaleryList } from '../models/galery-list/galery-list';
var PhotoListComponent = /** @class */ (function () {
    function PhotoListComponent() {
        this.dayListArr = [];
        this.images = [
            { img: "https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(145).jpg", thumb: "https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(145).jpg", description: "Image 1" }
        ];
    }
    PhotoListComponent.prototype.ngOnInit = function () {
        this.dayListArr.push(new GaleryList(false, "https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(145).jpg"));
        this.dayListArr.push(new GaleryList(true, "https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(145).jpg"));
    };
    PhotoListComponent.prototype.toggleFav = function (isFavCard, rowID) {
        this.dayListArr[rowID].isFav = !this.dayListArr[rowID].isFav;
    };
    PhotoListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-photo-list',
            templateUrl: './photo-list.component.html',
            styleUrls: ['./photo-list.component.scss']
        })
    ], PhotoListComponent);
    return PhotoListComponent;
}());
export { PhotoListComponent };
//# sourceMappingURL=photo-list.component.js.map