import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
export var Tabs;
(function (Tabs) {
    Tabs[Tabs["recent"] = 0] = "recent";
    Tabs[Tabs["favorite"] = 1] = "favorite";
    Tabs[Tabs["main"] = 2] = "main";
})(Tabs || (Tabs = {}));
var HomeComponent = /** @class */ (function () {
    function HomeComponent(apiUser, staticObj, authObj) {
        this.apiUser = apiUser;
        this.staticObj = staticObj;
        this.authObj = authObj;
        this.activeTab = "Main";
        this.categories = [];
        this.currentRate = 3.14;
    }
    HomeComponent.prototype.changeActiveTab = function (activeTab) {
        this.activeTab = activeTab;
    };
    HomeComponent.prototype.onFavorites = function () {
        this.getFavorites();
    };
    HomeComponent.prototype.getFavorites = function () {
        var _this = this;
        this.apiUser.getFavorites().subscribe(function (res) {
            _this.favorites = res.data;
        }, function (err) { });
    };
    // TODO : click on this so it would remove the selected favorite from the user
    HomeComponent.prototype.toggleFavorites = function (opensalonId) {
        var _this = this;
        this.apiUser.toggleFavorites(opensalonId, true).subscribe(function (res) {
            _this.favorites = res.data;
        }, function (err) { });
    };
    HomeComponent.prototype.ngOnInit = function () {
        new WOW().init();
        //this.categories.push(new Category("type1","type1"));
        this.isAdmin = this.authObj.isAdmin();
        this.categories = this.staticObj.getCategories();
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        new WOW().init();
    };
    HomeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        })
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map