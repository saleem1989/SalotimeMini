import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(apiUsers, route) {
        this.apiUsers = apiUsers;
        this.route = route;
        this.activeTab = "Profile";
        this.backButtonPointOpts = ['home', 'salon-panel'];
        this.imagesBasic = [
            { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(117).jpg', thumb: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(117).jpg', description: 'Image 1' },
            { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(98).jpg', thumb: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(98).jpg', description: 'Image 2' },
            { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(131).jpg', thumb: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(131).jpg', description: 'Image 3' },
            { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(123).jpg', thumb: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(123).jpg', description: 'Image 4' },
            { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(118).jpg', thumb: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(118).jpg', description: 'Image 5' },
            { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(128).jpg', thumb: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(128).jpg', description: 'Image 6' },
            { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(132).jpg', thumb: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(132).jpg', description: 'Image 7' },
            { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(115).jpg', thumb: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(115).jpg', description: 'Image 8' },
            { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(133).jpg', thumb: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(133).jpg', description: 'Image 9' }
        ];
        this.profile = { name: "", phone: "" };
    }
    ProfileComponent.prototype.changeActiveTab = function (activeTab) {
        this.activeTab = activeTab;
    };
    ProfileComponent.prototype.openCamera = function () {
        alert("campera is open");
    };
    ProfileComponent.prototype.uploadImages = function () {
        alert("image upload");
    };
    ProfileComponent.prototype.save = function () {
        this.apiUsers.updateProfile(this.profile).subscribe(function (res) {
            //TODO: show success in notification
        }, function (err) {
            //TODO: show error in notification
            console.error(err);
        });
    };
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiUsers.getprofile().subscribe(function (res) {
            _this.profile = res.data;
        }, function (err) {
            //TODO: show error in notification
        });
        this.route.queryParams.subscribe(function (params) {
            _this.backButtonPoint = _this.backButtonPointOpts.indexOf(params.from) == -1 ? "/home" : "/" + params.from;
        });
    };
    ProfileComponent.prototype.ngAfterViewInit = function () {
        new WOW().init();
    };
    ProfileComponent = tslib_1.__decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.scss']
        })
    ], ProfileComponent);
    return ProfileComponent;
}());
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map