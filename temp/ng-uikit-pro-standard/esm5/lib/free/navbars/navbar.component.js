/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NavbarService } from './navbar.service';
import { Component, ContentChild, ElementRef, HostListener, Input, Renderer2, ViewChild, ViewEncapsulation, } from '@angular/core';
import { LinksComponent } from './links.component';
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(renderer, _navbarService) {
        var _this = this;
        this.renderer = renderer;
        this._navbarService = _navbarService;
        this.containerInside = true;
        this.collapseId = 'navbarCollapse';
        this.scrollSensitivity = 120;
        this.scrollableNavbar = false;
        this.shown = false;
        this.duration = 350; // ms
        // ms
        this.collapse = true;
        this.showClass = false;
        this.collapsing = false;
        this._itemsLength = 0;
        this.ariaExpanded = false;
        // tslint:disable-next-line:max-line-length
        this.subscription = this._navbarService.getNavbarLinkClicks().subscribe((/**
         * @param {?} navbarLinkClicks
         * @return {?}
         */
        function (navbarLinkClicks) {
            _this.closeNavbarOnClick(navbarLinkClicks);
        }));
    }
    /**
     * @param {?} navbarLinkClicks
     * @return {?}
     */
    NavbarComponent.prototype.closeNavbarOnClick = /**
     * @param {?} navbarLinkClicks
     * @return {?}
     */
    function (navbarLinkClicks) {
        this.navbarLinkClicks = navbarLinkClicks;
        if (this.showClass) {
            this.hide();
        }
    };
    /**
     * @return {?}
     */
    NavbarComponent.prototype.addTogglerIconClasses = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.iconBackground) {
            if (Array.isArray(this.iconBackground)) {
                this.iconBackground.forEach((/**
                 * @param {?} iconClass
                 * @return {?}
                 */
                function (iconClass) {
                    _this.renderer.addClass(_this.toggler.nativeElement, iconClass);
                }));
            }
            else {
                this.renderer.addClass(this.toggler.nativeElement, this.iconBackground);
            }
        }
    };
    /**
     * @return {?}
     */
    NavbarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var isDoubleNav = this.SideClass.split(' ');
        if (isDoubleNav.indexOf('double-nav') !== -1) {
            this.doubleNav = true;
        }
        else {
            this.doubleNav = false;
        }
    };
    /**
     * @return {?}
     */
    NavbarComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.containerInside) {
            /** @type {?} */
            var childrens = Array.from(this.container.nativeElement.children);
            childrens.forEach((/**
             * @param {?} child
             * @return {?}
             */
            function (child) {
                _this.renderer.appendChild(_this.navbar.nativeElement, child);
                _this.container.nativeElement.remove();
            }));
        }
        if (this.el.nativeElement.children.length === 0) {
            this.el.nativeElement.remove();
        }
        this.addTogglerIconClasses();
        if (this.scrollableNavbar) {
            this.renderer.addClass(this.el.nativeElement, 'collapsed-navbar-scroll');
        }
    };
    /**
     * @return {?}
     */
    NavbarComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        if (!this.collapsing) {
            if (this.shown) {
                this.hide();
            }
            else {
                this.show();
            }
        }
    };
    /**
     * @return {?}
     */
    NavbarComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.shown = true;
        this.collapse = false;
        this.collapsing = true;
        this.ariaExpanded = true;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.height = _this.el.nativeElement.scrollHeight;
            _this.renderer.setStyle(_this.el.nativeElement, 'height', _this.height + 'px');
        }), 0);
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.collapsing = false;
            _this.collapse = true;
            _this.showClass = true;
        }), this.duration);
    };
    /**
     * @return {?}
     */
    NavbarComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.shown) {
            this.shown = false;
            this.collapse = false;
            this.showClass = false;
            this.collapsing = true;
            this.ariaExpanded = false;
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.renderer.setStyle(_this.el.nativeElement, 'height', '0px');
            }), 0);
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.collapsing = false;
                _this.collapse = true;
            }), this.duration);
        }
    };
    Object.defineProperty(NavbarComponent.prototype, "displayStyle", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.containerInside) {
                return 'flex';
            }
            else {
                return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    NavbarComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var breakpoit = 0;
        if (this.SideClass.includes('navbar-expand-xl')) {
            breakpoit = 1200;
        }
        else if (this.SideClass.includes('navbar-expand-lg')) {
            breakpoit = 992;
        }
        else if (this.SideClass.includes('navbar-expand-md')) {
            breakpoit = 768;
        }
        else if (this.SideClass.includes('navbar-expand-sm')) {
            breakpoit = 576;
        }
        else {
            breakpoit = event.target.innerWidth + 1;
        }
        if (event.target.innerWidth < breakpoit) {
            if (!this.shown) {
                this.collapse = false;
                this.renderer.setStyle(this.el.nativeElement, 'height', '0px');
                this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.height = _this.el.nativeElement.scrollHeight;
                    _this.collapse = true;
                    _this.renderer.setStyle(_this.el.nativeElement, 'opacity', '');
                }), 4);
            }
        }
        else {
            this.collapsing = false;
            this.shown = false;
            this.showClass = false;
            this.collapse = true;
            this.ariaExpanded = false;
            this.renderer.setStyle(this.el.nativeElement, 'height', '');
        }
    };
    /**
     * @return {?}
     */
    NavbarComponent.prototype.onScroll = /**
     * @return {?}
     */
    function () {
        if (this.navbar.nativeElement.classList.contains('scrolling-navbar')) {
            if (window.pageYOffset > this.scrollSensitivity) {
                this.renderer.addClass(this.navbar.nativeElement, 'top-nav-collapse');
            }
            else {
                this.renderer.removeClass(this.navbar.nativeElement, 'top-nav-collapse');
            }
        }
    };
    /**
     * @return {?}
     */
    NavbarComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        if (this.el.nativeElement.firstElementChild) {
            if (this._itemsLength !==
                this.el.nativeElement.firstElementChild.firstElementChild.children.length) {
                this.height = this.el.nativeElement.firstElementChild.firstElementChild.clientHeight;
                this.renderer.setStyle(this.el.nativeElement, 'height', this.height + 'px');
            }
            this._itemsLength = this.el.nativeElement.firstElementChild.firstElementChild.children.length;
        }
    };
    NavbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-navbar',
                    template: "<nav class=\"{{SideClass}}\" #nav>\n  <div [ngClass]=\"{'container': containerInside}\" [ngStyle]=\"{'display': displayStyle}\" #container>\n      <ng-content select=\"mdb-navbar-brand\"></ng-content>\n      <ng-content select=\"logo\"></ng-content>\n      <ng-content></ng-content>\n    <ng-content *ngIf=\"this.doubleNav == true\" select=\"navlinks\"></ng-content>\n    <div *ngIf=\"this.doubleNav == false\">\n      <button #toggler class=\"navbar-toggler\" type=\"button\" [attr.aria-controls]=\"collapseId\" [attr.aria-expanded]=\"ariaExpanded\" aria-label=\"Toggle navigation\" (click)=\"toggle(); $event.preventDefault()\" mdbWavesEffect *ngIf=\"this.el.nativeElement.children.length !== 0\">\n        <span class=\"navbar-toggler-icon\">\n        </span>\n      </button>\n    </div>\n    <div #navbar [attr.id]=\"collapseId\" [style.height]=\"height\" class=\"navbar-collapse collapse\" [ngClass]=\"{'collapse': collapse, 'show': showClass, 'collapsing': collapsing}\">\n      <ng-content select=\"links\"></ng-content>\n    </div>\n  </div>\n</nav>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".navbar{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);font-weight:300}.navbar form .md-form input{margin:0 5px 1px 8px}.navbar .breadcrumb{margin:0;padding:.3rem 0 0 1rem;background-color:inherit;font-size:15px;font-weight:300}.navbar .breadcrumb .breadcrumb-item{color:#fff}.navbar .breadcrumb .breadcrumb-item.active,.navbar .breadcrumb .breadcrumb-item:before{color:rgba(255,255,255,.65)}.navbar .navbar-toggler{outline:0;border-width:0}.navbar .nav-flex-icons{flex-direction:row}.navbar .nav-item .nav-link{display:block}.navbar .nav-item .nav-link.disabled:active{pointer-events:none}.navbar .nav-item .nav-link .fab,.navbar .nav-item .nav-link .far,.navbar .nav-item .nav-link .fas{padding-right:3px;padding-left:3px}@media (max-width:992px){.navbar .container{width:100%}.navbar .container .navbar-toggler-right{right:0}.navbar .nav-item .nav-link{padding-right:6px;padding-left:6px}.double-nav{padding-top:4px;padding-bottom:4px}}.navbar .dropdown-menu{position:absolute!important;margin-top:0}.navbar .dropdown-menu a{padding:10px;font-size:.9375rem;font-weight:300;color:#000}@media (max-width:600px){.navbar .dropdown-menu form{width:17rem}}.navbar.navbar-light .navbar-nav .nav-item .nav-link.disbled,.navbar.navbar-light .navbar-nav .nav-item .nav-link.disbled:hover{color:rgba(0,0,0,.5)}.navbar.navbar-light .navbar-toggler-icon{background-image:url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.9)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\");cursor:pointer}.navbar.navbar-light .breadcrumb .nav-item .nav-link,.navbar.navbar-light .navbar-nav .nav-item .nav-link{color:#000;transition:.35s}.navbar.navbar-light .breadcrumb .nav-item .nav-link:hover,.navbar.navbar-light .navbar-nav .nav-item .nav-link:hover{color:rgba(0,0,0,.75)}.navbar.navbar-light .breadcrumb .nav-item.active>.nav-link,.navbar.navbar-light .navbar-nav .nav-item.active>.nav-link{background-color:rgba(0,0,0,.1)}.navbar.navbar-light .breadcrumb .nav-item.active>.nav-link:hover,.navbar.navbar-light .navbar-nav .nav-item.active>.nav-link:hover,.navbar.navbar-light .navbar-toggler{color:#000}.navbar.navbar-light form .md-form input{border-bottom:1px solid #000}.navbar.navbar-light form .md-form input:focus:not([readonly]){border-color:#4285f4}.navbar.navbar-light form .md-form .form-control{color:#000}.navbar.navbar-light form .md-form .form-control::-webkit-input-placeholder{color:#000;font-weight:300}.navbar.navbar-light form .md-form .form-control::-moz-placeholder{color:#000;font-weight:300}.navbar.navbar-light form .md-form .form-control::-ms-input-placeholder{color:#000;font-weight:300}.navbar.navbar-light form .md-form .form-control::placeholder{color:#000;font-weight:300}.navbar.navbar-dark .navbar-nav .nav-item .nav-link.disbled,.navbar.navbar-dark .navbar-nav .nav-item .nav-link.disbled:hover{color:rgba(255,255,255,.5)}.navbar.navbar-dark .navbar-toggler-icon{background-image:url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.9)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\");cursor:pointer}.navbar.navbar-dark .breadcrumb .nav-item .nav-link,.navbar.navbar-dark .navbar-nav .nav-item .nav-link{color:#fff;transition:.35s}.navbar.navbar-dark .breadcrumb .nav-item .nav-link:hover,.navbar.navbar-dark .navbar-nav .nav-item .nav-link:hover{color:rgba(255,255,255,.75)}.navbar.navbar-dark .breadcrumb .nav-item.active>.nav-link,.navbar.navbar-dark .navbar-nav .nav-item.active>.nav-link{background-color:rgba(255,255,255,.1)}.navbar.navbar-dark .breadcrumb .nav-item.active>.nav-link:hover,.navbar.navbar-dark .navbar-nav .nav-item.active>.nav-link:hover,.navbar.navbar-dark .navbar-toggler{color:#fff}.navbar.navbar-dark form .md-form input{border-bottom:1px solid #fff}.navbar.navbar-dark form .md-form input:focus:not([readonly]){border-color:#4285f4}.navbar.navbar-dark form .md-form .form-control{color:#fff}.navbar.navbar-dark form .md-form .form-control::-webkit-input-placeholder{color:#fff;font-weight:300}.navbar.navbar-dark form .md-form .form-control::-moz-placeholder{color:#fff;font-weight:300}.navbar.navbar-dark form .md-form .form-control::-ms-input-placeholder{color:#fff;font-weight:300}.navbar.navbar-dark form .md-form .form-control::placeholder{color:#fff;font-weight:300}@media (min-width:600px){.navbar .dropdown-menu form{width:22rem}.navbar.scrolling-navbar{transition:background .5s ease-in-out,padding .5s ease-in-out;padding-top:12px;padding-bottom:12px}.navbar.scrolling-navbar .navbar-nav>li{transition-duration:1s}.navbar.scrolling-navbar.top-nav-collapse{padding-top:5px;padding-bottom:5px}}@media (min-width:400px) and (max-width:767px),(min-width:800px) and (max-width:850px){.navbar.fixed-top .navbar-collapse,.navbar.sticky-top .navbar-collapse{max-height:340px;overflow-x:hidden;overflow-y:auto}}@media (min-width:1200px){.navbar.navbar-expand-xl links,.navbar.navbar-expand-xl navlinks{display:flex;flex-direction:row;align-items:center!important;align-self:center!important;width:100%}}@media (min-width:992px){.navbar>logo>div>a img{margin-left:20px}.navbar.navbar-expand-lg links,.navbar.navbar-expand-lg navlinks{display:flex;flex-direction:row;align-items:center!important;align-self:center!important;width:100%}}@media (min-width:768px){.navbar.navbar-expand-md links,.navbar.navbar-expand-md navlinks{display:flex;flex-direction:row;width:100%}}@media (min-width:576px){.navbar.navbar-expand-sm links,.navbar.navbar-expand-sm navlinks{display:flex;flex-direction:row;width:100%}}@media all and (max-width:992px){.collapsed-navbar-scroll{max-height:calc(100vh - 40px);overflow-y:scroll}}.navbar-container{order:-1;width:50px!important;padding-left:5px;padding-right:5px}.navbar-nav .dropdown-menu-right.dropdown-menu{left:unset}.navbar-nav .dropdown-menu{top:100%!important;-webkit-transform:translate3d(0,0,0)!important;transform:translate3d(0,0,0)!important}.breadcrumbs{display:flex;padding-left:5px;padding-right:5px;order:0;align-items:center}@media (min-width:1441px){.breadcrumbs{margin-left:-.6rem}}@supports (-ms-ime-align:auto){.ie-nav .navbar-toggler{position:absolute;margin-top:-40px;right:0}@media all and (min-width:992px){.ie-nav .navbar-nav.nav-flex-icons{position:absolute;top:30%;right:0}.ie-nav .navbar-nav{position:absolute;top:30%;margin-left:88px}.ie-nav .navbar-brand>img{margin-top:-2px;padding-right:16px}.intro-non-fixed-nav>links .navbar-collapse{display:inline-flex!important;align-items:center!important;justify-content:space-between!important}.intro-fixed-nav .navbar-nav.nav-flex-icons{position:absolute;top:30%;right:0}.intro-fixed-nav .navbar-nav{position:absolute;top:30%;margin-left:88px}.intro-fixed-nav .navbar-brand img{margin-top:-2px;padding-right:16px}}.intro-fixed-nav .navbar-toggler{position:absolute;margin-top:-40px;right:0}}@media all and (-ms-high-contrast:none) and (min-width:992px),all and (-ms-high-contrast:active) and (min-width:992px){.ie-nav .navbar-nav.nav-flex-icons{position:absolute;top:30%;right:0}.ie-nav .navbar-nav{position:absolute;top:30%;margin-left:88px}.ie-nav .navbar-brand>img{margin-top:-2px;padding-right:16px}.intro-non-fixed-nav>links .navbar-collapse{display:inline-flex!important;align-items:center!important;justify-content:space-between!important}.intro-fixed-nav .navbar-nav.nav-flex-icons{position:absolute;top:30%;right:0}.intro-fixed-nav .navbar-nav{position:absolute;top:30%;margin-left:88px}.intro-fixed-nav .navbar-brand img{margin-top:-2px;padding-right:16px}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.ie-nav .navbar-toggler,.intro-fixed-nav .navbar-toggler{position:absolute;margin-top:-40px;right:0}}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:none}.navbar .nav-item.avatar{padding:0}.navbar .nav-item.avatar.active{background-color:transparent!important}.navbar .nav-item.avatar .dropdown-toggle{padding:0}.navbar .nav-item.avatar .dropdown-toggle img{height:35px}.navbar .nav-item.avatar .dropdown-toggle:after{display:none}@media (max-width:768px){.double-nav .container{padding-left:0;padding-right:0}}.double-nav a{font-size:15px;color:#fff}.double-nav .breadcrumb-dn p{margin:0;padding-top:0;padding-left:1rem}@media (max-width:993px){.double-nav .breadcrumb-dn{display:none}}.double-nav .button-collapse{left:10px;font-size:1.5rem}@media (min-width:1440px){.double-nav .button-collapse{display:none}}@media (max-width:1440px){.double-nav .button-collapse{display:block;position:relative;font-size:1.4rem;margin-right:10px;margin-left:10px}}"]
                }] }
    ];
    /** @nocollapse */
    NavbarComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: NavbarService }
    ]; };
    NavbarComponent.propDecorators = {
        iconBackground: [{ type: Input }],
        SideClass: [{ type: Input }],
        containerInside: [{ type: Input }],
        collapseId: [{ type: Input }],
        scrollSensitivity: [{ type: Input }],
        scrollableNavbar: [{ type: Input }],
        el: [{ type: ViewChild, args: ['navbar', { static: true },] }],
        mobile: [{ type: ViewChild, args: ['mobile', { static: false },] }],
        navbar: [{ type: ViewChild, args: ['nav', { static: true },] }],
        container: [{ type: ViewChild, args: ['container', { static: true },] }],
        toggler: [{ type: ViewChild, args: ['toggler', { static: false },] }],
        links: [{ type: ContentChild, args: [LinksComponent, { static: false },] }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }],
        onScroll: [{ type: HostListener, args: ['document:scroll',] }]
    };
    return NavbarComponent;
}());
export { NavbarComponent };
if (false) {
    /** @type {?} */
    NavbarComponent.prototype.iconBackground;
    /** @type {?} */
    NavbarComponent.prototype.SideClass;
    /** @type {?} */
    NavbarComponent.prototype.containerInside;
    /** @type {?} */
    NavbarComponent.prototype.collapseId;
    /** @type {?} */
    NavbarComponent.prototype.scrollSensitivity;
    /** @type {?} */
    NavbarComponent.prototype.scrollableNavbar;
    /** @type {?} */
    NavbarComponent.prototype.subscription;
    /** @type {?} */
    NavbarComponent.prototype.navbarLinkClicks;
    /** @type {?} */
    NavbarComponent.prototype.shown;
    /** @type {?} */
    NavbarComponent.prototype.doubleNav;
    /** @type {?} */
    NavbarComponent.prototype.height;
    /** @type {?} */
    NavbarComponent.prototype.duration;
    /** @type {?} */
    NavbarComponent.prototype.collapse;
    /** @type {?} */
    NavbarComponent.prototype.showClass;
    /** @type {?} */
    NavbarComponent.prototype.collapsing;
    /**
     * @type {?}
     * @private
     */
    NavbarComponent.prototype._itemsLength;
    /** @type {?} */
    NavbarComponent.prototype.ariaExpanded;
    /** @type {?} */
    NavbarComponent.prototype.el;
    /** @type {?} */
    NavbarComponent.prototype.mobile;
    /** @type {?} */
    NavbarComponent.prototype.navbar;
    /** @type {?} */
    NavbarComponent.prototype.container;
    /** @type {?} */
    NavbarComponent.prototype.toggler;
    /** @type {?} */
    NavbarComponent.prototype.links;
    /** @type {?} */
    NavbarComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NavbarComponent.prototype._navbarService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9mcmVlL25hdmJhcnMvbmF2YmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFHTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVuRDtJQXFDRSx5QkFBbUIsUUFBbUIsRUFBVSxjQUE2QjtRQUE3RSxpQkFLQztRQUxrQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUE1QnBFLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLGVBQVUsR0FBRyxnQkFBZ0IsQ0FBQztRQUM5QixzQkFBaUIsR0FBRyxHQUFHLENBQUM7UUFDeEIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBSWxDLFVBQUssR0FBRyxLQUFLLENBQUM7UUFJUCxhQUFRLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSzs7UUFFckIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFbEIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFFekIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFVbkIsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLGdCQUFnQjtZQUN0RixLQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM1QyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsNENBQWtCOzs7O0lBQWxCLFVBQW1CLGdCQUFxQjtRQUN0QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiO0lBQ0gsQ0FBQzs7OztJQUVELCtDQUFxQjs7O0lBQXJCO1FBQUEsaUJBVUM7UUFUQyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPOzs7O2dCQUFDLFVBQUEsU0FBUztvQkFDbkMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ2hFLENBQUMsRUFBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3pFO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsa0NBQVE7OztJQUFSOztZQUNRLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDN0MsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUN4QjtJQUNILENBQUM7Ozs7SUFFRCx5Q0FBZTs7O0lBQWY7UUFBQSxpQkFlQztRQWRDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFOztnQkFDbkIsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1lBQ25FLFNBQVMsQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxLQUFLO2dCQUNyQixLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDNUQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEMsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUNELElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDL0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDaEM7UUFDRCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1NBQzFFO0lBQ0gsQ0FBQzs7OztJQUVELGdDQUFNOzs7SUFBTjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDZCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDYjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDYjtTQUNGO0lBQ0gsQ0FBQzs7OztJQUVELDhCQUFJOzs7SUFBSjtRQUFBLGlCQWdCQztRQWZDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXpCLFVBQVU7OztRQUFDO1lBQ1QsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7WUFDakQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDOUUsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO1FBRU4sVUFBVTs7O1FBQUM7WUFDVCxLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN4QixDQUFDLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFFRCw4QkFBSTs7O0lBQUo7UUFBQSxpQkFnQkM7UUFmQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixVQUFVOzs7WUFBQztnQkFDVCxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakUsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO1lBRU4sVUFBVTs7O1lBQUM7Z0JBQ1QsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLENBQUMsR0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkI7SUFDSCxDQUFDO0lBRUQsc0JBQUkseUNBQVk7Ozs7UUFBaEI7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDekIsT0FBTyxNQUFNLENBQUM7YUFDZjtpQkFBTTtnQkFDTCxPQUFPLEVBQUUsQ0FBQzthQUNYO1FBQ0gsQ0FBQzs7O09BQUE7Ozs7O0lBRTBDLGtDQUFROzs7O0lBQW5ELFVBQW9ELEtBQVU7UUFBOUQsaUJBa0NDOztZQWpDSyxTQUFTLEdBQUcsQ0FBQztRQUVqQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDL0MsU0FBUyxHQUFHLElBQUksQ0FBQztTQUNsQjthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUN0RCxTQUFTLEdBQUcsR0FBRyxDQUFDO1NBQ2pCO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ3RELFNBQVMsR0FBRyxHQUFHLENBQUM7U0FDakI7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDdEQsU0FBUyxHQUFHLEdBQUcsQ0FBQztTQUNqQjthQUFNO1lBQ0wsU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztTQUN6QztRQUVELElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsU0FBUyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQy9ELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDOUQsVUFBVTs7O2dCQUFDO29CQUNULEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO29CQUNqRCxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztvQkFDckIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRCxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUM7YUFDUDtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDN0Q7SUFDSCxDQUFDOzs7O0lBRWdDLGtDQUFROzs7SUFBekM7UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUNwRSxJQUFJLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2FBQ3ZFO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLENBQUM7YUFDMUU7U0FDRjtJQUNILENBQUM7Ozs7SUFFRCwrQ0FBcUI7OztJQUFyQjtRQUNFLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUU7WUFDM0MsSUFDRSxJQUFJLENBQUMsWUFBWTtnQkFDakIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFDekU7Z0JBQ0EsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUM7Z0JBQ3JGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQzdFO1lBRUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1NBQy9GO0lBQ0gsQ0FBQzs7Z0JBek1GLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsZ2pDQUFvQztvQkFFcEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7OztnQkFaQyxTQUFTO2dCQVZGLGFBQWE7OztpQ0F3Qm5CLEtBQUs7NEJBQ0wsS0FBSztrQ0FDTCxLQUFLOzZCQUNMLEtBQUs7b0NBQ0wsS0FBSzttQ0FDTCxLQUFLO3FCQWtCTCxTQUFTLFNBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTt5QkFDcEMsU0FBUyxTQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7eUJBQ3JDLFNBQVMsU0FBQyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzRCQUNqQyxTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTswQkFDdkMsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7d0JBQ3RDLFlBQVksU0FBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzJCQTRHOUMsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzsyQkFvQ3hDLFlBQVksU0FBQyxpQkFBaUI7O0lBdUJqQyxzQkFBQztDQUFBLEFBMU1ELElBME1DO1NBcE1ZLGVBQWU7OztJQUMxQix5Q0FBMkM7O0lBQzNDLG9DQUEyQjs7SUFDM0IsMENBQWdDOztJQUNoQyxxQ0FBdUM7O0lBQ3ZDLDRDQUFpQzs7SUFDakMsMkNBQWtDOztJQUVsQyx1Q0FBMkI7O0lBQzNCLDJDQUFzQjs7SUFDdEIsZ0NBQWM7O0lBRWQsb0NBQTBCOztJQUMxQixpQ0FBc0I7O0lBQ3RCLG1DQUFzQjs7SUFFdEIsbUNBQXVCOztJQUN2QixvQ0FBeUI7O0lBQ3pCLHFDQUEwQjs7Ozs7SUFFMUIsdUNBQXlCOztJQUV6Qix1Q0FBcUI7O0lBRXJCLDZCQUFzRDs7SUFDdEQsaUNBQTJEOztJQUMzRCxpQ0FBdUQ7O0lBQ3ZELG9DQUFnRTs7SUFDaEUsa0NBQTZEOztJQUM3RCxnQ0FBdUU7O0lBRTNELG1DQUEwQjs7Ozs7SUFBRSx5Q0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYXZiYXJTZXJ2aWNlIH0gZnJvbSAnLi9uYXZiYXIuc2VydmljZSc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMaW5rc0NvbXBvbmVudCB9IGZyb20gJy4vbGlua3MuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLW5hdmJhcicsXG4gIHRlbXBsYXRlVXJsOiAnbmF2YmFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmF2YmFycy1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBOYXZiYXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQge1xuICBASW5wdXQoKSBpY29uQmFja2dyb3VuZDogc3RyaW5nIHwgc3RyaW5nW107XG4gIEBJbnB1dCgpIFNpZGVDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSBjb250YWluZXJJbnNpZGUgPSB0cnVlO1xuICBASW5wdXQoKSBjb2xsYXBzZUlkID0gJ25hdmJhckNvbGxhcHNlJztcbiAgQElucHV0KCkgc2Nyb2xsU2Vuc2l0aXZpdHkgPSAxMjA7XG4gIEBJbnB1dCgpIHNjcm9sbGFibGVOYXZiYXIgPSBmYWxzZTtcblxuICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgbmF2YmFyTGlua0NsaWNrczogYW55O1xuICBzaG93biA9IGZhbHNlO1xuXG4gIHB1YmxpYyBkb3VibGVOYXY6IGJvb2xlYW47XG4gIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcbiAgcHVibGljIGR1cmF0aW9uID0gMzUwOyAvLyBtc1xuXG4gIHB1YmxpYyBjb2xsYXBzZSA9IHRydWU7XG4gIHB1YmxpYyBzaG93Q2xhc3MgPSBmYWxzZTtcbiAgcHVibGljIGNvbGxhcHNpbmcgPSBmYWxzZTtcblxuICBwcml2YXRlIF9pdGVtc0xlbmd0aCA9IDA7XG5cbiAgYXJpYUV4cGFuZGVkID0gZmFsc2U7XG5cbiAgQFZpZXdDaGlsZCgnbmF2YmFyJywgeyBzdGF0aWM6IHRydWUgfSkgZWw6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ21vYmlsZScsIHsgc3RhdGljOiBmYWxzZSB9KSBtb2JpbGU6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ25hdicsIHsgc3RhdGljOiB0cnVlIH0pIG5hdmJhcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgY29udGFpbmVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCd0b2dnbGVyJywgeyBzdGF0aWM6IGZhbHNlIH0pIHRvZ2dsZXI6IEVsZW1lbnRSZWY7XG4gIEBDb250ZW50Q2hpbGQoTGlua3NDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KSBsaW5rczogTGlua3NDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgX25hdmJhclNlcnZpY2U6IE5hdmJhclNlcnZpY2UpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLl9uYXZiYXJTZXJ2aWNlLmdldE5hdmJhckxpbmtDbGlja3MoKS5zdWJzY3JpYmUobmF2YmFyTGlua0NsaWNrcyA9PiB7XG4gICAgICB0aGlzLmNsb3NlTmF2YmFyT25DbGljayhuYXZiYXJMaW5rQ2xpY2tzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlTmF2YmFyT25DbGljayhuYXZiYXJMaW5rQ2xpY2tzOiBhbnkpIHtcbiAgICB0aGlzLm5hdmJhckxpbmtDbGlja3MgPSBuYXZiYXJMaW5rQ2xpY2tzO1xuICAgIGlmICh0aGlzLnNob3dDbGFzcykge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkVG9nZ2xlckljb25DbGFzc2VzKCkge1xuICAgIGlmICh0aGlzLmljb25CYWNrZ3JvdW5kKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmljb25CYWNrZ3JvdW5kKSkge1xuICAgICAgICB0aGlzLmljb25CYWNrZ3JvdW5kLmZvckVhY2goaWNvbkNsYXNzID0+IHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMudG9nZ2xlci5uYXRpdmVFbGVtZW50LCBpY29uQ2xhc3MpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy50b2dnbGVyLm5hdGl2ZUVsZW1lbnQsIHRoaXMuaWNvbkJhY2tncm91bmQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IGlzRG91YmxlTmF2ID0gdGhpcy5TaWRlQ2xhc3Muc3BsaXQoJyAnKTtcbiAgICBpZiAoaXNEb3VibGVOYXYuaW5kZXhPZignZG91YmxlLW5hdicpICE9PSAtMSkge1xuICAgICAgdGhpcy5kb3VibGVOYXYgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvdWJsZU5hdiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVySW5zaWRlKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbnMgPSBBcnJheS5mcm9tKHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW4pO1xuICAgICAgY2hpbGRyZW5zLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMubmF2YmFyLm5hdGl2ZUVsZW1lbnQsIGNoaWxkKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLmFkZFRvZ2dsZXJJY29uQ2xhc3NlcygpO1xuICAgIGlmICh0aGlzLnNjcm9sbGFibGVOYXZiYXIpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnY29sbGFwc2VkLW5hdmJhci1zY3JvbGwnKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKCF0aGlzLmNvbGxhcHNpbmcpIHtcbiAgICAgIGlmICh0aGlzLnNob3duKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLnNob3duID0gdHJ1ZTtcbiAgICB0aGlzLmNvbGxhcHNlID0gZmFsc2U7XG4gICAgdGhpcy5jb2xsYXBzaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmFyaWFFeHBhbmRlZCA9IHRydWU7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodDtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgdGhpcy5oZWlnaHQgKyAncHgnKTtcbiAgICB9LCAwKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jb2xsYXBzaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmNvbGxhcHNlID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2hvd0NsYXNzID0gdHJ1ZTtcbiAgICB9LCB0aGlzLmR1cmF0aW9uKTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgaWYgKHRoaXMuc2hvd24pIHtcbiAgICAgIHRoaXMuc2hvd24gPSBmYWxzZTtcbiAgICAgIHRoaXMuY29sbGFwc2UgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2hvd0NsYXNzID0gZmFsc2U7XG4gICAgICB0aGlzLmNvbGxhcHNpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5hcmlhRXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsICcwcHgnKTtcbiAgICAgIH0sIDApO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jb2xsYXBzaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29sbGFwc2UgPSB0cnVlO1xuICAgICAgfSwgdGhpcy5kdXJhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGRpc3BsYXlTdHlsZSgpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVySW5zaWRlKSB7XG4gICAgICByZXR1cm4gJ2ZsZXgnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pIG9uUmVzaXplKGV2ZW50OiBhbnkpIHtcbiAgICBsZXQgYnJlYWtwb2l0ID0gMDtcblxuICAgIGlmICh0aGlzLlNpZGVDbGFzcy5pbmNsdWRlcygnbmF2YmFyLWV4cGFuZC14bCcpKSB7XG4gICAgICBicmVha3BvaXQgPSAxMjAwO1xuICAgIH0gZWxzZSBpZiAodGhpcy5TaWRlQ2xhc3MuaW5jbHVkZXMoJ25hdmJhci1leHBhbmQtbGcnKSkge1xuICAgICAgYnJlYWtwb2l0ID0gOTkyO1xuICAgIH0gZWxzZSBpZiAodGhpcy5TaWRlQ2xhc3MuaW5jbHVkZXMoJ25hdmJhci1leHBhbmQtbWQnKSkge1xuICAgICAgYnJlYWtwb2l0ID0gNzY4O1xuICAgIH0gZWxzZSBpZiAodGhpcy5TaWRlQ2xhc3MuaW5jbHVkZXMoJ25hdmJhci1leHBhbmQtc20nKSkge1xuICAgICAgYnJlYWtwb2l0ID0gNTc2O1xuICAgIH0gZWxzZSB7XG4gICAgICBicmVha3BvaXQgPSBldmVudC50YXJnZXQuaW5uZXJXaWR0aCArIDE7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LnRhcmdldC5pbm5lcldpZHRoIDwgYnJlYWtwb2l0KSB7XG4gICAgICBpZiAoIXRoaXMuc2hvd24pIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsICcwcHgnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5JywgJzAnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgIHRoaXMuY29sbGFwc2UgPSB0cnVlO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnb3BhY2l0eScsICcnKTtcbiAgICAgICAgfSwgNCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29sbGFwc2luZyA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93biA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93Q2xhc3MgPSBmYWxzZTtcbiAgICAgIHRoaXMuY29sbGFwc2UgPSB0cnVlO1xuICAgICAgdGhpcy5hcmlhRXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgJycpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OnNjcm9sbCcpIG9uU2Nyb2xsKCkge1xuICAgIGlmICh0aGlzLm5hdmJhci5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnc2Nyb2xsaW5nLW5hdmJhcicpKSB7XG4gICAgICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID4gdGhpcy5zY3JvbGxTZW5zaXRpdml0eSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMubmF2YmFyLm5hdGl2ZUVsZW1lbnQsICd0b3AtbmF2LWNvbGxhcHNlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMubmF2YmFyLm5hdGl2ZUVsZW1lbnQsICd0b3AtbmF2LWNvbGxhcHNlJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5faXRlbXNMZW5ndGggIT09XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZHJlbi5sZW5ndGhcbiAgICAgICkge1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgdGhpcy5oZWlnaHQgKyAncHgnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5faXRlbXNMZW5ndGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgIH1cbiAgfVxufVxuIl19