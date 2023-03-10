/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var NavbarService = /** @class */ (function () {
    function NavbarService() {
        this.navbarLinkClicks = new Subject();
    }
    /**
     * @return {?}
     */
    NavbarService.prototype.getNavbarLinkClicks = /**
     * @return {?}
     */
    function () {
        return this.navbarLinkClicks.asObservable();
    };
    /**
     * @return {?}
     */
    NavbarService.prototype.setNavbarLinkClicks = /**
     * @return {?}
     */
    function () {
        this.navbarLinkClicks.next();
    };
    NavbarService.decorators = [
        { type: Injectable }
    ];
    return NavbarService;
}());
export { NavbarService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NavbarService.prototype.navbarLinkClicks;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvZnJlZS9uYXZiYXJzL25hdmJhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRTdDO0lBQUE7UUFHWSxxQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO0lBVWxELENBQUM7Ozs7SUFQRywyQ0FBbUI7OztJQUFuQjtRQUNJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2hELENBQUM7Ozs7SUFFRCwyQ0FBbUI7OztJQUFuQjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDOztnQkFaSixVQUFVOztJQWFYLG9CQUFDO0NBQUEsQUFiRCxJQWFDO1NBWlksYUFBYTs7Ozs7O0lBRXRCLHlDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0ICwgIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5hdmJhclNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBuYXZiYXJMaW5rQ2xpY2tzID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG5cbiAgICBnZXROYXZiYXJMaW5rQ2xpY2tzKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdmJhckxpbmtDbGlja3MuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgc2V0TmF2YmFyTGlua0NsaWNrcygpIHtcbiAgICAgICAgdGhpcy5uYXZiYXJMaW5rQ2xpY2tzLm5leHQoKTtcbiAgICB9XG59XG4iXX0=