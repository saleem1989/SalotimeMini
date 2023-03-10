/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export class NavbarService {
    constructor() {
        this.navbarLinkClicks = new Subject();
    }
    /**
     * @return {?}
     */
    getNavbarLinkClicks() {
        return this.navbarLinkClicks.asObservable();
    }
    /**
     * @return {?}
     */
    setNavbarLinkClicks() {
        this.navbarLinkClicks.next();
    }
}
NavbarService.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    NavbarService.prototype.navbarLinkClicks;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvZnJlZS9uYXZiYXJzL25hdmJhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRzdDLE1BQU0sT0FBTyxhQUFhO0lBRDFCO1FBR1kscUJBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztJQVVsRCxDQUFDOzs7O0lBUEcsbUJBQW1CO1FBQ2YsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDaEQsQ0FBQzs7OztJQUVELG1CQUFtQjtRQUNmLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7WUFaSixVQUFVOzs7Ozs7O0lBR1AseUNBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgLCAgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmF2YmFyU2VydmljZSB7XG5cbiAgICBwcml2YXRlIG5hdmJhckxpbmtDbGlja3MgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cblxuICAgIGdldE5hdmJhckxpbmtDbGlja3MoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF2YmFyTGlua0NsaWNrcy5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBzZXROYXZiYXJMaW5rQ2xpY2tzKCkge1xuICAgICAgICB0aGlzLm5hdmJhckxpbmtDbGlja3MubmV4dCgpO1xuICAgIH1cbn1cbiJdfQ==