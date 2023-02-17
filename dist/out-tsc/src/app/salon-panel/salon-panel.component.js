import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
var SalonPanelComponent = /** @class */ (function () {
    function SalonPanelComponent(route, router, apiOpenSalon, apiUser, authObj) {
        this.route = route;
        this.router = router;
        this.apiOpenSalon = apiOpenSalon;
        this.apiUser = apiUser;
        this.authObj = authObj;
        this.stars = [1, 2, 3, 4, 5];
        this.isLoading = true;
        this.elements = [
            { first: 'SunDay', from: "08:00", at: '21:00' },
            { first: 'Monday', from: "08:00", at: '21:00' },
            { first: 'tuesDay', from: "08:00", at: '21:00' },
            { first: 'SunDay', from: "08:00", at: '21:00' },
            { first: 'SunDay', from: "08:00", at: '21:00' },
            { first: 'SunDay', from: "08:00", at: '21:00' },
        ];
        this.headElements = ['day', 'from', 'at'];
        this.elements2 = [
            { Service: 'hairCut', time: "30min", price: '20$' }
        ];
        this.headElements2 = ['Service', 'time', 'price'];
        this.model = {
            rating: 0
        };
    }
    SalonPanelComponent.prototype.toggleFav = function () {
        /* this.model.isFavorite= !this.model.isFavorite;
         this.apiUser.toggleFavorites(this.opensalonId).subscribe(
           res =>{},
           err =>{}
         );*/
    };
    SalonPanelComponent.prototype.countStar = function (star) {
        if (this.model.rating !== star) {
            this.model.rating = star;
            console.log('Value of star', star);
            this.apiOpenSalon.setRating(star, this.opensalonId).subscribe(function (res) { }, function (err) { });
        }
    };
    SalonPanelComponent.prototype.addComment = function (comment) {
        var _this = this;
        this.apiOpenSalon.addComment(comment, this.opensalonId).subscribe(function (res) {
            _this.model.comments = res.data;
        }, function (err) { });
    };
    SalonPanelComponent.prototype.textAreaAdjust = function (o) {
        //todo : resize textArea adjust to content 
        // o.style.height = "1px";
        //o.style.height = (25+o.scrollHeight)+"px";
    };
    SalonPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.scrollToBottom();
        this.opensalonId = this.route.snapshot.paramMap.get('id') == null ? "-1" : this.route.snapshot.paramMap.get('id');
        this.isAdmin = this.authObj.isAdmin();
        this.apiOpenSalon.getSalonPanel(this.opensalonId)
            .subscribe(function (res) {
            _this.model = res.data;
            _this.isLoading = false;
            var index = 0;
            var fromDays = [];
            var atDays = [];
            var minServiceTime = [];
            _this.model.employees[0].workTimeObj.forEach(function (element1) {
                _this.model.employees[0].workTimeObj[index++].daysDropDown.forEach(function (element2) {
                    fromDays.push(parseInt(element1.from.split(":")[0]));
                    atDays.push(parseInt(element1.at.split(":")[0]));
                });
            });
            _this.model.employees[0].subServersObj.forEach(function (item) {
                minServiceTime.push(parseInt(item.subServiceTime));
            });
            _this.minWorkHour = Math.min.apply(null, fromDays);
            _this.maxWorkHour = Math.max.apply(null, atDays);
            _this.minimumServerTime = Math.min.apply(null, minServiceTime);
            console.log(res);
        }, function (err) { });
        //  this.addComment();
    };
    SalonPanelComponent.prototype.navigateToCalendar = function () {
        this.router.navigate(["/calendar", { minH: this.minWorkHour, maxH: this.maxWorkHour, mST: this.minimumServerTime }]);
        return;
    };
    SalonPanelComponent.prototype.ngAfterViewInit = function () {
        this.scrollToBottom();
        new WOW().init();
    };
    SalonPanelComponent.prototype.scrollToBottom = function () {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
        catch (err) { }
    };
    tslib_1.__decorate([
        ViewChild('scrollMe', { static: false })
    ], SalonPanelComponent.prototype, "myScrollContainer", void 0);
    SalonPanelComponent = tslib_1.__decorate([
        Component({
            selector: 'app-salon-panel',
            templateUrl: './salon-panel.component.html',
            styleUrls: ['./salon-panel.component.scss']
        })
    ], SalonPanelComponent);
    return SalonPanelComponent;
}());
export { SalonPanelComponent };
//# sourceMappingURL=salon-panel.component.js.map