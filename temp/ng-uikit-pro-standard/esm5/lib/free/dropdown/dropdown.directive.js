/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { ComponentLoaderFactory } from '../utils/component-loader/component-loader.factory';
import { BsDropdownConfig } from './dropdown.config';
import { BsDropdownContainerComponent } from './dropdown-container.component';
import { BsDropdownState } from './dropdown.state';
import { isBs3 } from '../utils/ng2-bootstrap-config';
var BsDropdownDirective = /** @class */ (function () {
    function BsDropdownDirective(_elementRef, _renderer, _viewContainerRef, _cis, _config, _state) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._viewContainerRef = _viewContainerRef;
        this._cis = _cis;
        this._config = _config;
        this._state = _state;
        // todo: move to component loader
        this._isInlineOpen = false;
        this._subscriptions = [];
        this._isInited = false;
        // create dropdown component loader
        this._dropdown = this._cis
            .createLoader(this._elementRef, this._viewContainerRef, this._renderer)
            .provide({ provide: BsDropdownState, useValue: this._state });
        this.onShown = this._dropdown.onShown;
        this.shown = this._dropdown.shown;
        this.onHidden = this._dropdown.onHidden;
        this.hidden = this._dropdown.hidden;
        this.isOpenChange = this._state.isOpenChange;
        // set initial dropdown state from config
        this._state.autoClose = this._config.autoClose;
    }
    Object.defineProperty(BsDropdownDirective.prototype, "autoClose", {
        get: /**
         * @return {?}
         */
        function () {
            return this._state.autoClose;
        },
        /**
         * Indicates that dropdown will be closed on item or document click,
         * and after pressing ESC
         */
        set: /**
         * Indicates that dropdown will be closed on item or document click,
         * and after pressing ESC
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'boolean') {
                this._state.autoClose = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BsDropdownDirective.prototype, "isDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isDisabled;
        },
        /**
         * Disables dropdown toggle and hides dropdown menu if opened
         */
        set: /**
         * Disables dropdown toggle and hides dropdown menu if opened
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._isDisabled = value;
            this._state.isDisabledChange.emit(value);
            if (value) {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BsDropdownDirective.prototype, "isOpen", {
        /**
         * Returns whether or not the popover is currently being shown
         */
        get: /**
         * Returns whether or not the popover is currently being shown
         * @return {?}
         */
        function () {
            if (this._showInline) {
                return this._isInlineOpen;
            }
            return this._dropdown.isShown;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this.show();
            }
            else {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BsDropdownDirective.prototype, "isBs4", {
        get: /**
         * @return {?}
         */
        function () {
            return !isBs3();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BsDropdownDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // fix: seems there are an issue with `routerLinkActive`
        // which result in duplicated call ngOnInit without call to ngOnDestroy
        // read more: https://github.com/valor-software/ngx-bootstrap/issues/1885
        if (this._isInited) {
            return;
        }
        this._isInited = true;
        this._showInline = !this.container;
        // attach DOM listeners
        this._dropdown.listen({
            triggers: this.triggers,
            show: (/**
             * @return {?}
             */
            function () { return _this.show(); }),
        });
        // toggle visibility on toggle element click
        this._subscriptions.push(this._state.toggleClick.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.toggle(value); })));
        // hide dropdown if set disabled while opened
        this._subscriptions.push(this._state.isDisabledChange.subscribe((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            if (element === true) {
                _this.hide();
            }
        })));
        // attach dropdown menu inside of dropdown
        if (this._showInline) {
            this._state.dropdownMenu.then((/**
             * @param {?} dropdownMenu
             * @return {?}
             */
            function (dropdownMenu) {
                _this._inlinedMenu = dropdownMenu.viewContainer.createEmbeddedView(dropdownMenu.templateRef);
            }));
        }
        this._state.isOpenChange.subscribe((/**
         * @return {?}
         */
        function () {
            setTimeout((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var dropdownContainer = _this._elementRef.nativeElement.querySelector('.dropdown-menu');
                /** @type {?} */
                var left = dropdownContainer.getBoundingClientRect().left;
                if (dropdownContainer.classList.contains('dropdown-menu-right') &&
                    left <= dropdownContainer.clientWidth) {
                    if (left < 0) {
                        _this._renderer.setStyle(dropdownContainer, 'right', left + 'px');
                    }
                    else {
                        _this._renderer.setStyle(dropdownContainer, 'right', '0');
                    }
                }
            }), 0);
        }));
    };
    /**
     * Opens an element???s popover. This is considered a ???manual??? triggering of
     * the popover.
     */
    /**
     * Opens an element???s popover. This is considered a ???manual??? triggering of
     * the popover.
     * @return {?}
     */
    BsDropdownDirective.prototype.show = /**
     * Opens an element???s popover. This is considered a ???manual??? triggering of
     * the popover.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.isOpen || this.isDisabled) {
            return;
        }
        // material and dropup dropdown animation
        // const parent = this._elementRef.nativeElement.classList;
        /** @type {?} */
        var container = this._elementRef.nativeElement.querySelector('.dropdown-menu');
        setTimeout((/**
         * @return {?}
         */
        function () {
            container.classList.add('fadeInDropdown');
        }), 200);
        if (this._showInline) {
            this._isInlineOpen = true;
            this.onShown.emit(true);
            this.shown.emit(true);
            this._state.isOpenChange.emit(true);
            return;
        }
        this._state.dropdownMenu.then((/**
         * @param {?} dropdownMenu
         * @return {?}
         */
        function (dropdownMenu) {
            // check direction in which dropdown should be opened
            /** @type {?} */
            var _dropup = _this.dropup === true || (typeof _this.dropup !== 'undefined' && _this.dropup !== false);
            _this._state.direction = _dropup ? 'up' : 'down';
            /** @type {?} */
            var _placement = _this.placement || (_dropup ? 'top left' : 'bottom left');
            // show dropdown
            _this._dropdown
                .attach(BsDropdownContainerComponent)
                .to(_this.container)
                .position({ attachment: _placement })
                .show({
                content: dropdownMenu.templateRef,
                placement: _placement,
            });
            _this._state.isOpenChange.emit(true);
        }));
    };
    /**
     * Closes an element???s popover. This is considered a ???manual??? triggering of
     * the popover.
     */
    /**
     * Closes an element???s popover. This is considered a ???manual??? triggering of
     * the popover.
     * @return {?}
     */
    BsDropdownDirective.prototype.hide = /**
     * Closes an element???s popover. This is considered a ???manual??? triggering of
     * the popover.
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.isOpen) {
            return;
        }
        /** @type {?} */
        var parent = this._elementRef.nativeElement.classList;
        /** @type {?} */
        var container = this._elementRef.nativeElement.querySelector('.dropdown-menu');
        if (parent.value === 'dropdown open show' || parent.value === 'btn-group dropup open show') {
            container.classList.remove('fadeInDropdown');
            setTimeout((/**
             * @return {?}
             */
            function () {
                if (_this._showInline) {
                    _this._isInlineOpen = false;
                    _this.onHidden.emit(true);
                    _this.hidden.emit(true);
                }
                else {
                    _this._dropdown.hide();
                }
                _this._state.isOpenChange.emit(false);
            }), 560);
        }
        else {
            if (this._showInline) {
                this._isInlineOpen = false;
                this.onHidden.emit(true);
                this.hidden.emit(true);
            }
            else {
                this._dropdown.hide();
            }
            this._state.isOpenChange.emit(false);
        }
    };
    /**
     * Toggles an element???s popover. This is considered a ???manual??? triggering of
     * the popover.
     */
    /**
     * Toggles an element???s popover. This is considered a ???manual??? triggering of
     * the popover.
     * @param {?=} value
     * @return {?}
     */
    BsDropdownDirective.prototype.toggle = /**
     * Toggles an element???s popover. This is considered a ???manual??? triggering of
     * the popover.
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        if (this.isOpen || value === false) {
            return this.hide();
        }
        return this.show();
    };
    /**
     * @return {?}
     */
    BsDropdownDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        try {
            // clean up subscriptions and destroy dropdown
            for (var _b = tslib_1.__values(this._subscriptions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var sub = _c.value;
                sub.unsubscribe();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this._dropdown.dispose();
    };
    BsDropdownDirective.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[mdbDropdown],[dropdown]',
                    exportAs: 'bs-dropdown',
                    template: '<ng-content></ng-content>',
                    encapsulation: ViewEncapsulation.None,
                    providers: [BsDropdownState],
                    styles: [".mdb-color.lighten-5{background-color:#d0d6e2!important}.mdb-color.lighten-4{background-color:#b1bace!important}.mdb-color.lighten-3{background-color:#929fba!important}.mdb-color.lighten-2{background-color:#7283a7!important}.mdb-color.lighten-1{background-color:#59698d!important}.mdb-color{background-color:#45526e!important}.mdb-color-text{color:#45526e!important}.rgba-mdb-color-slight,.rgba-mdb-color-slight:after{background-color:rgba(69,82,110,.1)}.rgba-mdb-color-light,.rgba-mdb-color-light:after{background-color:rgba(69,82,110,.3)}.rgba-mdb-color-strong,.rgba-mdb-color-strong:after{background-color:rgba(69,82,110,.7)}.mdb-color.darken-1{background-color:#3b465e!important}.mdb-color.darken-2{background-color:#2e3951!important}.mdb-color.darken-3{background-color:#1c2a48!important}.mdb-color.darken-4{background-color:#1c2331!important}.red.lighten-5{background-color:#ffebee!important}.red.lighten-4{background-color:#ffcdd2!important}.red.lighten-3{background-color:#ef9a9a!important}.red.lighten-2{background-color:#e57373!important}.red.lighten-1{background-color:#ef5350!important}.red{background-color:#f44336!important}.red-text{color:#f44336!important}.rgba-red-slight,.rgba-red-slight:after{background-color:rgba(244,67,54,.1)}.rgba-red-light,.rgba-red-light:after{background-color:rgba(244,67,54,.3)}.rgba-red-strong,.rgba-red-strong:after{background-color:rgba(244,67,54,.7)}.red.darken-1{background-color:#e53935!important}.red.darken-2{background-color:#d32f2f!important}.red.darken-3{background-color:#c62828!important}.red.darken-4{background-color:#b71c1c!important}.red.accent-1{background-color:#ff8a80!important}.red.accent-2{background-color:#ff5252!important}.red.accent-3{background-color:#ff1744!important}.red.accent-4{background-color:#d50000!important}.pink.lighten-5{background-color:#fce4ec!important}.pink.lighten-4{background-color:#f8bbd0!important}.pink.lighten-3{background-color:#f48fb1!important}.pink.lighten-2{background-color:#f06292!important}.pink.lighten-1{background-color:#ec407a!important}.pink{background-color:#e91e63!important}.pink-text{color:#e91e63!important}.rgba-pink-slight,.rgba-pink-slight:after{background-color:rgba(233,30,99,.1)}.rgba-pink-light,.rgba-pink-light:after{background-color:rgba(233,30,99,.3)}.rgba-pink-strong,.rgba-pink-strong:after{background-color:rgba(233,30,99,.7)}.pink.darken-1{background-color:#d81b60!important}.pink.darken-2{background-color:#c2185b!important}.pink.darken-3{background-color:#ad1457!important}.pink.darken-4{background-color:#880e4f!important}.pink.accent-1{background-color:#ff80ab!important}.pink.accent-2{background-color:#ff4081!important}.pink.accent-3{background-color:#f50057!important}.pink.accent-4{background-color:#c51162!important}.purple.lighten-5{background-color:#f3e5f5!important}.purple.lighten-4{background-color:#e1bee7!important}.purple.lighten-3{background-color:#ce93d8!important}.purple.lighten-2{background-color:#ba68c8!important}.purple.lighten-1{background-color:#ab47bc!important}.purple{background-color:#9c27b0!important}.purple-text{color:#9c27b0!important}.rgba-purple-slight,.rgba-purple-slight:after{background-color:rgba(156,39,176,.1)}.rgba-purple-light,.rgba-purple-light:after{background-color:rgba(156,39,176,.3)}.rgba-purple-strong,.rgba-purple-strong:after{background-color:rgba(156,39,176,.7)}.purple.darken-1{background-color:#8e24aa!important}.purple.darken-2{background-color:#7b1fa2!important}.purple.darken-3{background-color:#6a1b9a!important}.purple.darken-4{background-color:#4a148c!important}.purple.accent-1{background-color:#ea80fc!important}.purple.accent-2{background-color:#e040fb!important}.purple.accent-3{background-color:#d500f9!important}.purple.accent-4{background-color:#a0f!important}.deep-purple.lighten-5{background-color:#ede7f6!important}.deep-purple.lighten-4{background-color:#d1c4e9!important}.deep-purple.lighten-3{background-color:#b39ddb!important}.deep-purple.lighten-2{background-color:#9575cd!important}.deep-purple.lighten-1{background-color:#7e57c2!important}.deep-purple{background-color:#673ab7!important}.deep-purple-text{color:#673ab7!important}.rgba-deep-purple-slight,.rgba-deep-purple-slight:after{background-color:rgba(103,58,183,.1)}.rgba-deep-purple-light,.rgba-deep-purple-light:after{background-color:rgba(103,58,183,.3)}.rgba-deep-purple-strong,.rgba-deep-purple-strong:after{background-color:rgba(103,58,183,.7)}.deep-purple.darken-1{background-color:#5e35b1!important}.deep-purple.darken-2{background-color:#512da8!important}.deep-purple.darken-3{background-color:#4527a0!important}.deep-purple.darken-4{background-color:#311b92!important}.deep-purple.accent-1{background-color:#b388ff!important}.deep-purple.accent-2{background-color:#7c4dff!important}.deep-purple.accent-3{background-color:#651fff!important}.deep-purple.accent-4{background-color:#6200ea!important}.indigo.lighten-5{background-color:#e8eaf6!important}.indigo.lighten-4{background-color:#c5cae9!important}.indigo.lighten-3{background-color:#9fa8da!important}.indigo.lighten-2{background-color:#7986cb!important}.indigo.lighten-1{background-color:#5c6bc0!important}.indigo{background-color:#3f51b5!important}.indigo-text{color:#3f51b5!important}.rgba-indigo-slight,.rgba-indigo-slight:after{background-color:rgba(63,81,181,.1)}.rgba-indigo-light,.rgba-indigo-light:after{background-color:rgba(63,81,181,.3)}.rgba-indigo-strong,.rgba-indigo-strong:after{background-color:rgba(63,81,181,.7)}.indigo.darken-1{background-color:#3949ab!important}.indigo.darken-2{background-color:#303f9f!important}.indigo.darken-3{background-color:#283593!important}.indigo.darken-4{background-color:#1a237e!important}.indigo.accent-1{background-color:#8c9eff!important}.indigo.accent-2{background-color:#536dfe!important}.indigo.accent-3{background-color:#3d5afe!important}.indigo.accent-4{background-color:#304ffe!important}.blue.lighten-5{background-color:#e3f2fd!important}.blue.lighten-4{background-color:#bbdefb!important}.blue.lighten-3{background-color:#90caf9!important}.blue.lighten-2{background-color:#64b5f6!important}.blue.lighten-1{background-color:#42a5f5!important}.blue{background-color:#2196f3!important}.blue-text{color:#2196f3!important}.rgba-blue-slight,.rgba-blue-slight:after{background-color:rgba(33,150,243,.1)}.rgba-blue-light,.rgba-blue-light:after{background-color:rgba(33,150,243,.3)}.rgba-blue-strong,.rgba-blue-strong:after{background-color:rgba(33,150,243,.7)}.blue.darken-1{background-color:#1e88e5!important}.blue.darken-2{background-color:#1976d2!important}.blue.darken-3{background-color:#1565c0!important}.blue.darken-4{background-color:#0d47a1!important}.blue.accent-1{background-color:#82b1ff!important}.blue.accent-2{background-color:#448aff!important}.blue.accent-3{background-color:#2979ff!important}.blue.accent-4{background-color:#2962ff!important}.light-blue.lighten-5{background-color:#e1f5fe!important}.light-blue.lighten-4{background-color:#b3e5fc!important}.light-blue.lighten-3{background-color:#81d4fa!important}.light-blue.lighten-2{background-color:#4fc3f7!important}.light-blue.lighten-1{background-color:#29b6f6!important}.light-blue{background-color:#03a9f4!important}.light-blue-text{color:#03a9f4!important}.rgba-light-blue-slight,.rgba-light-blue-slight:after{background-color:rgba(3,169,244,.1)}.rgba-light-blue-light,.rgba-light-blue-light:after{background-color:rgba(3,169,244,.3)}.rgba-light-blue-strong,.rgba-light-blue-strong:after{background-color:rgba(3,169,244,.7)}.light-blue.darken-1{background-color:#039be5!important}.light-blue.darken-2{background-color:#0288d1!important}.light-blue.darken-3{background-color:#0277bd!important}.light-blue.darken-4{background-color:#01579b!important}.light-blue.accent-1{background-color:#80d8ff!important}.light-blue.accent-2{background-color:#40c4ff!important}.light-blue.accent-3{background-color:#00b0ff!important}.light-blue.accent-4{background-color:#0091ea!important}.cyan.lighten-5{background-color:#e0f7fa!important}.cyan.lighten-4{background-color:#b2ebf2!important}.cyan.lighten-3{background-color:#80deea!important}.cyan.lighten-2{background-color:#4dd0e1!important}.cyan.lighten-1{background-color:#26c6da!important}.cyan{background-color:#00bcd4!important}.cyan-text{color:#00bcd4!important}.rgba-cyan-slight,.rgba-cyan-slight:after{background-color:rgba(0,188,212,.1)}.rgba-cyan-light,.rgba-cyan-light:after{background-color:rgba(0,188,212,.3)}.rgba-cyan-strong,.rgba-cyan-strong:after{background-color:rgba(0,188,212,.7)}.cyan.darken-1{background-color:#00acc1!important}.cyan.darken-2{background-color:#0097a7!important}.cyan.darken-3{background-color:#00838f!important}.cyan.darken-4{background-color:#006064!important}.cyan.accent-1{background-color:#84ffff!important}.cyan.accent-2{background-color:#18ffff!important}.cyan.accent-3{background-color:#00e5ff!important}.cyan.accent-4{background-color:#00b8d4!important}.teal.lighten-5{background-color:#e0f2f1!important}.teal.lighten-4{background-color:#b2dfdb!important}.teal.lighten-3{background-color:#80cbc4!important}.teal.lighten-2{background-color:#4db6ac!important}.teal.lighten-1{background-color:#26a69a!important}.teal{background-color:#009688!important}.teal-text{color:#009688!important}.rgba-teal-slight,.rgba-teal-slight:after{background-color:rgba(0,150,136,.1)}.rgba-teal-light,.rgba-teal-light:after{background-color:rgba(0,150,136,.3)}.rgba-teal-strong,.rgba-teal-strong:after{background-color:rgba(0,150,136,.7)}.teal.darken-1{background-color:#00897b!important}.teal.darken-2{background-color:#00796b!important}.teal.darken-3{background-color:#00695c!important}.teal.darken-4{background-color:#004d40!important}.teal.accent-1{background-color:#a7ffeb!important}.teal.accent-2{background-color:#64ffda!important}.teal.accent-3{background-color:#1de9b6!important}.teal.accent-4{background-color:#00bfa5!important}.green.lighten-5{background-color:#e8f5e9!important}.green.lighten-4{background-color:#c8e6c9!important}.green.lighten-3{background-color:#a5d6a7!important}.green.lighten-2{background-color:#81c784!important}.green.lighten-1{background-color:#66bb6a!important}.green{background-color:#4caf50!important}.green-text{color:#4caf50!important}.rgba-green-slight,.rgba-green-slight:after{background-color:rgba(76,175,80,.1)}.rgba-green-light,.rgba-green-light:after{background-color:rgba(76,175,80,.3)}.rgba-green-strong,.rgba-green-strong:after{background-color:rgba(76,175,80,.7)}.green.darken-1{background-color:#43a047!important}.green.darken-2{background-color:#388e3c!important}.green.darken-3{background-color:#2e7d32!important}.green.darken-4{background-color:#1b5e20!important}.green.accent-1{background-color:#b9f6ca!important}.green.accent-2{background-color:#69f0ae!important}.green.accent-3{background-color:#00e676!important}.green.accent-4{background-color:#00c853!important}.light-green.lighten-5{background-color:#f1f8e9!important}.light-green.lighten-4{background-color:#dcedc8!important}.light-green.lighten-3{background-color:#c5e1a5!important}.light-green.lighten-2{background-color:#aed581!important}.light-green.lighten-1{background-color:#9ccc65!important}.light-green{background-color:#8bc34a!important}.light-green-text{color:#8bc34a!important}.rgba-light-green-slight,.rgba-light-green-slight:after{background-color:rgba(139,195,74,.1)}.rgba-light-green-light,.rgba-light-green-light:after{background-color:rgba(139,195,74,.3)}.rgba-light-green-strong,.rgba-light-green-strong:after{background-color:rgba(139,195,74,.7)}.light-green.darken-1{background-color:#7cb342!important}.light-green.darken-2{background-color:#689f38!important}.light-green.darken-3{background-color:#558b2f!important}.light-green.darken-4{background-color:#33691e!important}.light-green.accent-1{background-color:#ccff90!important}.light-green.accent-2{background-color:#b2ff59!important}.light-green.accent-3{background-color:#76ff03!important}.light-green.accent-4{background-color:#64dd17!important}.lime.lighten-5{background-color:#f9fbe7!important}.lime.lighten-4{background-color:#f0f4c3!important}.lime.lighten-3{background-color:#e6ee9c!important}.lime.lighten-2{background-color:#dce775!important}.lime.lighten-1{background-color:#d4e157!important}.lime{background-color:#cddc39!important}.lime-text{color:#cddc39!important}.rgba-lime-slight,.rgba-lime-slight:after{background-color:rgba(205,220,57,.1)}.rgba-lime-light,.rgba-lime-light:after{background-color:rgba(205,220,57,.3)}.rgba-lime-strong,.rgba-lime-strong:after{background-color:rgba(205,220,57,.7)}.lime.darken-1{background-color:#c0ca33!important}.lime.darken-2{background-color:#afb42b!important}.lime.darken-3{background-color:#9e9d24!important}.lime.darken-4{background-color:#827717!important}.lime.accent-1{background-color:#f4ff81!important}.lime.accent-2{background-color:#eeff41!important}.lime.accent-3{background-color:#c6ff00!important}.lime.accent-4{background-color:#aeea00!important}.yellow.lighten-5{background-color:#fffde7!important}.yellow.lighten-4{background-color:#fff9c4!important}.yellow.lighten-3{background-color:#fff59d!important}.yellow.lighten-2{background-color:#fff176!important}.yellow.lighten-1{background-color:#ffee58!important}.yellow{background-color:#ffeb3b!important}.yellow-text{color:#ffeb3b!important}.rgba-yellow-slight,.rgba-yellow-slight:after{background-color:rgba(255,235,59,.1)}.rgba-yellow-light,.rgba-yellow-light:after{background-color:rgba(255,235,59,.3)}.rgba-yellow-strong,.rgba-yellow-strong:after{background-color:rgba(255,235,59,.7)}.yellow.darken-1{background-color:#fdd835!important}.yellow.darken-2{background-color:#fbc02d!important}.yellow.darken-3{background-color:#f9a825!important}.yellow.darken-4{background-color:#f57f17!important}.yellow.accent-1{background-color:#ffff8d!important}.yellow.accent-2{background-color:#ff0!important}.yellow.accent-3{background-color:#ffea00!important}.yellow.accent-4{background-color:#ffd600!important}.amber.lighten-5{background-color:#fff8e1!important}.amber.lighten-4{background-color:#ffecb3!important}.amber.lighten-3{background-color:#ffe082!important}.amber.lighten-2{background-color:#ffd54f!important}.amber.lighten-1{background-color:#ffca28!important}.amber{background-color:#ffc107!important}.amber-text{color:#ffc107!important}.rgba-amber-slight,.rgba-amber-slight:after{background-color:rgba(255,193,7,.1)}.rgba-amber-light,.rgba-amber-light:after{background-color:rgba(255,193,7,.3)}.rgba-amber-strong,.rgba-amber-strong:after{background-color:rgba(255,193,7,.7)}.amber.darken-1{background-color:#ffb300!important}.amber.darken-2{background-color:#ffa000!important}.amber.darken-3{background-color:#ff8f00!important}.amber.darken-4{background-color:#ff6f00!important}.amber.accent-1{background-color:#ffe57f!important}.amber.accent-2{background-color:#ffd740!important}.amber.accent-3{background-color:#ffc400!important}.amber.accent-4{background-color:#ffab00!important}.orange.lighten-5{background-color:#fff3e0!important}.orange.lighten-4{background-color:#ffe0b2!important}.orange.lighten-3{background-color:#ffcc80!important}.orange.lighten-2{background-color:#ffb74d!important}.orange.lighten-1{background-color:#ffa726!important}.orange{background-color:#ff9800!important}.orange-text{color:#ff9800!important}.rgba-orange-slight,.rgba-orange-slight:after{background-color:rgba(255,152,0,.1)}.rgba-orange-light,.rgba-orange-light:after{background-color:rgba(255,152,0,.3)}.rgba-orange-strong,.rgba-orange-strong:after{background-color:rgba(255,152,0,.7)}.orange.darken-1{background-color:#fb8c00!important}.orange.darken-2{background-color:#f57c00!important}.orange.darken-3{background-color:#ef6c00!important}.orange.darken-4{background-color:#e65100!important}.orange.accent-1{background-color:#ffd180!important}.orange.accent-2{background-color:#ffab40!important}.orange.accent-3{background-color:#ff9100!important}.orange.accent-4{background-color:#ff6d00!important}.deep-orange.lighten-5{background-color:#fbe9e7!important}.deep-orange.lighten-4{background-color:#ffccbc!important}.deep-orange.lighten-3{background-color:#ffab91!important}.deep-orange.lighten-2{background-color:#ff8a65!important}.deep-orange.lighten-1{background-color:#ff7043!important}.deep-orange{background-color:#ff5722!important}.deep-orange-text{color:#ff5722!important}.rgba-deep-orange-slight,.rgba-deep-orange-slight:after{background-color:rgba(255,87,34,.1)}.rgba-deep-orange-light,.rgba-deep-orange-light:after{background-color:rgba(255,87,34,.3)}.rgba-deep-orange-strong,.rgba-deep-orange-strong:after{background-color:rgba(255,87,34,.7)}.deep-orange.darken-1{background-color:#f4511e!important}.deep-orange.darken-2{background-color:#e64a19!important}.deep-orange.darken-3{background-color:#d84315!important}.deep-orange.darken-4{background-color:#bf360c!important}.deep-orange.accent-1{background-color:#ff9e80!important}.deep-orange.accent-2{background-color:#ff6e40!important}.deep-orange.accent-3{background-color:#ff3d00!important}.deep-orange.accent-4{background-color:#dd2c00!important}.brown.lighten-5{background-color:#efebe9!important}.brown.lighten-4{background-color:#d7ccc8!important}.brown.lighten-3{background-color:#bcaaa4!important}.brown.lighten-2{background-color:#a1887f!important}.brown.lighten-1{background-color:#8d6e63!important}.brown{background-color:#795548!important}.brown-text{color:#795548!important}.rgba-brown-slight,.rgba-brown-slight:after{background-color:rgba(121,85,72,.1)}.rgba-brown-light,.rgba-brown-light:after{background-color:rgba(121,85,72,.3)}.rgba-brown-strong,.rgba-brown-strong:after{background-color:rgba(121,85,72,.7)}.brown.darken-1{background-color:#6d4c41!important}.brown.darken-2{background-color:#5d4037!important}.brown.darken-3{background-color:#4e342e!important}.brown.darken-4{background-color:#3e2723!important}.blue-grey.lighten-5{background-color:#eceff1!important}.blue-grey.lighten-4{background-color:#cfd8dc!important}.blue-grey.lighten-3{background-color:#b0bec5!important}.blue-grey.lighten-2{background-color:#90a4ae!important}.blue-grey.lighten-1{background-color:#78909c!important}.blue-grey{background-color:#607d8b!important}.blue-grey-text{color:#607d8b!important}.rgba-blue-grey-slight,.rgba-blue-grey-slight:after{background-color:rgba(96,125,139,.1)}.rgba-blue-grey-light,.rgba-blue-grey-light:after{background-color:rgba(96,125,139,.3)}.rgba-blue-grey-strong,.rgba-blue-grey-strong:after{background-color:rgba(96,125,139,.7)}.blue-grey.darken-1{background-color:#546e7a!important}.blue-grey.darken-2{background-color:#455a64!important}.blue-grey.darken-3{background-color:#37474f!important}.blue-grey.darken-4{background-color:#263238!important}.grey.lighten-5{background-color:#fafafa!important}.grey.lighten-4{background-color:#f5f5f5!important}.grey.lighten-3{background-color:#eee!important}.grey.lighten-2{background-color:#e0e0e0!important}.grey.lighten-1{background-color:#bdbdbd!important}.grey{background-color:#9e9e9e!important}.grey-text{color:#9e9e9e!important}.rgba-grey-slight,.rgba-grey-slight:after{background-color:rgba(158,158,158,.1)}.rgba-grey-light,.rgba-grey-light:after{background-color:rgba(158,158,158,.3)}.rgba-grey-strong,.rgba-grey-strong:after{background-color:rgba(158,158,158,.7)}.grey.darken-1{background-color:#757575!important}.grey.darken-2{background-color:#616161!important}.grey.darken-3{background-color:#424242!important}.grey.darken-4{background-color:#212121!important}.black{background-color:#000!important}.black-text{color:#000!important}.rgba-black-slight,.rgba-black-slight:after{background-color:rgba(0,0,0,.1)}.rgba-black-light,.rgba-black-light:after{background-color:rgba(0,0,0,.3)}.rgba-black-strong,.rgba-black-strong:after{background-color:rgba(0,0,0,.7)}.white{background-color:#fff!important}.dropdown .dropdown-menu .dropdown-item:active,.dropdown .dropdown-menu .dropdown-item:hover,.dropleft .dropdown-menu .dropdown-item:active,.dropleft .dropdown-menu .dropdown-item:hover,.dropright .dropdown-menu .dropdown-item:active,.dropright .dropdown-menu .dropdown-item:hover,.dropup .dropdown-menu .dropdown-item:active,.dropup .dropdown-menu .dropdown-item:hover,.white-text{color:#fff!important}.rgba-white-slight,.rgba-white-slight:after{background-color:rgba(255,255,255,.1)}.rgba-white-light,.rgba-white-light:after{background-color:rgba(255,255,255,.3)}.rgba-white-strong,.rgba-white-strong:after{background-color:rgba(255,255,255,.7)}.rgba-stylish-slight{background-color:rgba(62,69,81,.1)}.rgba-stylish-light{background-color:rgba(62,69,81,.3)}.rgba-stylish-strong{background-color:rgba(62,69,81,.7)}.primary-color{background-color:#4285f4!important}.primary-color-dark{background-color:#0d47a1!important}.secondary-color{background-color:#a6c!important}.secondary-color-dark{background-color:#93c!important}.default-color{background-color:#2bbbad!important}.default-color-dark{background-color:#00695c!important}.info-color{background-color:#33b5e5!important}.info-color-dark{background-color:#09c!important}.success-color{background-color:#00c851!important}.success-color-dark{background-color:#007e33!important}.warning-color{background-color:#fb3!important}.warning-color-dark{background-color:#f80!important}.danger-color{background-color:#ff3547!important}.danger-color-dark{background-color:#c00!important}.elegant-color{background-color:#2e2e2e!important}.elegant-color-dark{background-color:#212121!important}.stylish-color{background-color:#4b515d!important}.stylish-color-dark{background-color:#3e4551!important}.unique-color{background-color:#3f729b!important}.unique-color-dark{background-color:#1c2331!important}.special-color{background-color:#37474f!important}.special-color-dark{background-color:#263238!important}.purple-gradient{background:linear-gradient(40deg,#ff6ec4,#7873f5)!important}.peach-gradient{background:linear-gradient(40deg,#ffd86f,#fc6262)!important}.aqua-gradient{background:linear-gradient(40deg,#2096ff,#05ffa3)!important}.blue-gradient{background:linear-gradient(40deg,#45cafc,#303f9f)!important}.purple-gradient-rgba{background:linear-gradient(40deg,rgba(255,110,196,.9),rgba(120,115,245,.9))!important}.peach-gradient-rgba{background:linear-gradient(40deg,rgba(255,216,111,.9),rgba(252,98,98,.9))!important}.aqua-gradient-rgba{background:linear-gradient(40deg,rgba(32,150,255,.9),rgba(5,255,163,.9))!important}.blue-gradient-rgba{background:linear-gradient(40deg,rgba(69,202,252,.9),rgba(48,63,159,.9))!important}.dark-grey-text,.dark-grey-text:focus,.dark-grey-text:hover{color:#4f4f4f!important}.hoverable{box-shadow:none;transition:.55s ease-in-out}.hoverable:hover{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);transition:.55s ease-in-out}.z-depth-0{box-shadow:none!important}.z-depth-1{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)!important}.z-depth-1-half{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)!important}.z-depth-2{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)!important}.z-depth-3{box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19)!important}.z-depth-4{box-shadow:0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)!important}.z-depth-5{box-shadow:0 27px 24px 0 rgba(0,0,0,.2),0 40px 77px 0 rgba(0,0,0,.22)!important}.disabled,:disabled{pointer-events:none!important}a{cursor:pointer;text-decoration:none;color:#0275d8;transition:.2s ease-in-out}a:hover{text-decoration:none;color:#014c8c;transition:.2s ease-in-out}a.disabled:hover,a:disabled:hover{color:#0275d8}a:not([href]):not([tabindex]),a:not([href]):not([tabindex]):focus,a:not([href]):not([tabindex]):hover{color:inherit;text-decoration:none}.show>.dropdown-menu{display:block}.show>a{outline:0}dropdown .dropdown-menu{display:none;position:absolute;-webkit-transform:translate3d(0,47px,0);transform:translate3d(0,47px,0);top:0;left:0;will-change:transform}.dropup .dropdown-menu{display:none;will-change:transform}.dropup.show .dropdown-menu{display:block;opacity:0;transition:.55s}.dropup.show .fadeInDropdown{opacity:1}.dropdown .dropdown-menu{display:none;position:absolute;-webkit-transform:translate3d(6px,49px,0);transform:translate3d(6px,49px,0);top:0;left:0;will-change:transform}.dropdown.show .dropdown-menu{display:block;opacity:0;transition:.55s}.dropdown.show .fadeInDropdown{opacity:1}.dropdown .dropdown-menu,.dropleft .dropdown-menu,.dropright .dropdown-menu,.dropup .dropdown-menu{padding:.5rem}.dropdown .dropdown-menu.dropdown-primary .dropdown-item.active,.dropdown .dropdown-menu.dropdown-primary .dropdown-item:active,.dropdown .dropdown-menu.dropdown-primary .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-primary .dropdown-item.active,.dropleft .dropdown-menu.dropdown-primary .dropdown-item:active,.dropleft .dropdown-menu.dropdown-primary .dropdown-item:hover,.dropright .dropdown-menu.dropdown-primary .dropdown-item.active,.dropright .dropdown-menu.dropdown-primary .dropdown-item:active,.dropright .dropdown-menu.dropdown-primary .dropdown-item:hover,.dropup .dropdown-menu.dropdown-primary .dropdown-item.active,.dropup .dropdown-menu.dropdown-primary .dropdown-item:active,.dropup .dropdown-menu.dropdown-primary .dropdown-item:hover{background-color:#4285f4!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-primary .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-primary .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-primary .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-primary .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-primary .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-primary .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-primary .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-primary .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-primary .dropdown-item:hover.disabled,.dropup .dropdown-menu.dropdown-primary .dropdown-item.active.disabled,.dropup .dropdown-menu.dropdown-primary .dropdown-item:active.disabled,.dropup .dropdown-menu.dropdown-primary .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu.dropdown-danger .dropdown-item.active,.dropdown .dropdown-menu.dropdown-danger .dropdown-item:active,.dropdown .dropdown-menu.dropdown-danger .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-danger .dropdown-item.active,.dropleft .dropdown-menu.dropdown-danger .dropdown-item:active,.dropleft .dropdown-menu.dropdown-danger .dropdown-item:hover,.dropright .dropdown-menu.dropdown-danger .dropdown-item.active,.dropright .dropdown-menu.dropdown-danger .dropdown-item:active,.dropright .dropdown-menu.dropdown-danger .dropdown-item:hover,.dropup .dropdown-menu.dropdown-danger .dropdown-item.active,.dropup .dropdown-menu.dropdown-danger .dropdown-item:active,.dropup .dropdown-menu.dropdown-danger .dropdown-item:hover{background-color:#c00!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-danger .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-danger .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-danger .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-danger .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-danger .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-danger .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-danger .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-danger .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-danger .dropdown-item:hover.disabled,.dropup .dropdown-menu.dropdown-danger .dropdown-item.active.disabled,.dropup .dropdown-menu.dropdown-danger .dropdown-item:active.disabled,.dropup .dropdown-menu.dropdown-danger .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu.dropdown-default .dropdown-item.active,.dropdown .dropdown-menu.dropdown-default .dropdown-item:active,.dropdown .dropdown-menu.dropdown-default .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-default .dropdown-item.active,.dropleft .dropdown-menu.dropdown-default .dropdown-item:active,.dropleft .dropdown-menu.dropdown-default .dropdown-item:hover,.dropright .dropdown-menu.dropdown-default .dropdown-item.active,.dropright .dropdown-menu.dropdown-default .dropdown-item:active,.dropright .dropdown-menu.dropdown-default .dropdown-item:hover,.dropup .dropdown-menu.dropdown-default .dropdown-item.active,.dropup .dropdown-menu.dropdown-default .dropdown-item:active,.dropup .dropdown-menu.dropdown-default .dropdown-item:hover{background-color:#2bbbad!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-default .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-default .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-default .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-default .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-default .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-default .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-default .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-default .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-default .dropdown-item:hover.disabled,.dropup .dropdown-menu.dropdown-default .dropdown-item.active.disabled,.dropup .dropdown-menu.dropdown-default .dropdown-item:active.disabled,.dropup .dropdown-menu.dropdown-default .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu.dropdown-secondary .dropdown-item.active,.dropdown .dropdown-menu.dropdown-secondary .dropdown-item:active,.dropdown .dropdown-menu.dropdown-secondary .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-secondary .dropdown-item.active,.dropleft .dropdown-menu.dropdown-secondary .dropdown-item:active,.dropleft .dropdown-menu.dropdown-secondary .dropdown-item:hover,.dropright .dropdown-menu.dropdown-secondary .dropdown-item.active,.dropright .dropdown-menu.dropdown-secondary .dropdown-item:active,.dropright .dropdown-menu.dropdown-secondary .dropdown-item:hover,.dropup .dropdown-menu.dropdown-secondary .dropdown-item.active,.dropup .dropdown-menu.dropdown-secondary .dropdown-item:active,.dropup .dropdown-menu.dropdown-secondary .dropdown-item:hover{background-color:#a6c!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-secondary .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-secondary .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-secondary .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-secondary .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-secondary .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-secondary .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-secondary .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-secondary .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-secondary .dropdown-item:hover.disabled,.dropup .dropdown-menu.dropdown-secondary .dropdown-item.active.disabled,.dropup .dropdown-menu.dropdown-secondary .dropdown-item:active.disabled,.dropup .dropdown-menu.dropdown-secondary .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu.dropdown-success .dropdown-item.active,.dropdown .dropdown-menu.dropdown-success .dropdown-item:active,.dropdown .dropdown-menu.dropdown-success .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-success .dropdown-item.active,.dropleft .dropdown-menu.dropdown-success .dropdown-item:active,.dropleft .dropdown-menu.dropdown-success .dropdown-item:hover,.dropright .dropdown-menu.dropdown-success .dropdown-item.active,.dropright .dropdown-menu.dropdown-success .dropdown-item:active,.dropright .dropdown-menu.dropdown-success .dropdown-item:hover,.dropup .dropdown-menu.dropdown-success .dropdown-item.active,.dropup .dropdown-menu.dropdown-success .dropdown-item:active,.dropup .dropdown-menu.dropdown-success .dropdown-item:hover{background-color:#00c851!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-success .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-success .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-success .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-success .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-success .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-success .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-success .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-success .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-success .dropdown-item:hover.disabled,.dropup .dropdown-menu.dropdown-success .dropdown-item.active.disabled,.dropup .dropdown-menu.dropdown-success .dropdown-item:active.disabled,.dropup .dropdown-menu.dropdown-success .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu.dropdown-info .dropdown-item.active,.dropdown .dropdown-menu.dropdown-info .dropdown-item:active,.dropdown .dropdown-menu.dropdown-info .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-info .dropdown-item.active,.dropleft .dropdown-menu.dropdown-info .dropdown-item:active,.dropleft .dropdown-menu.dropdown-info .dropdown-item:hover,.dropright .dropdown-menu.dropdown-info .dropdown-item.active,.dropright .dropdown-menu.dropdown-info .dropdown-item:active,.dropright .dropdown-menu.dropdown-info .dropdown-item:hover,.dropup .dropdown-menu.dropdown-info .dropdown-item.active,.dropup .dropdown-menu.dropdown-info .dropdown-item:active,.dropup .dropdown-menu.dropdown-info .dropdown-item:hover{background-color:#33b5e5!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-info .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-info .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-info .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-info .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-info .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-info .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-info .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-info .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-info .dropdown-item:hover.disabled,.dropup .dropdown-menu.dropdown-info .dropdown-item.active.disabled,.dropup .dropdown-menu.dropdown-info .dropdown-item:active.disabled,.dropup .dropdown-menu.dropdown-info .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu.dropdown-warning .dropdown-item.active,.dropdown .dropdown-menu.dropdown-warning .dropdown-item:active,.dropdown .dropdown-menu.dropdown-warning .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-warning .dropdown-item.active,.dropleft .dropdown-menu.dropdown-warning .dropdown-item:active,.dropleft .dropdown-menu.dropdown-warning .dropdown-item:hover,.dropright .dropdown-menu.dropdown-warning .dropdown-item.active,.dropright .dropdown-menu.dropdown-warning .dropdown-item:active,.dropright .dropdown-menu.dropdown-warning .dropdown-item:hover,.dropup .dropdown-menu.dropdown-warning .dropdown-item.active,.dropup .dropdown-menu.dropdown-warning .dropdown-item:active,.dropup .dropdown-menu.dropdown-warning .dropdown-item:hover{background-color:#fb3!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-warning .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-warning .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-warning .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-warning .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-warning .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-warning .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-warning .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-warning .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-warning .dropdown-item:hover.disabled,.dropup .dropdown-menu.dropdown-warning .dropdown-item.active.disabled,.dropup .dropdown-menu.dropdown-warning .dropdown-item:active.disabled,.dropup .dropdown-menu.dropdown-warning .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu.dropdown-dark .dropdown-item.active,.dropdown .dropdown-menu.dropdown-dark .dropdown-item:active,.dropdown .dropdown-menu.dropdown-dark .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-dark .dropdown-item.active,.dropleft .dropdown-menu.dropdown-dark .dropdown-item:active,.dropleft .dropdown-menu.dropdown-dark .dropdown-item:hover,.dropright .dropdown-menu.dropdown-dark .dropdown-item.active,.dropright .dropdown-menu.dropdown-dark .dropdown-item:active,.dropright .dropdown-menu.dropdown-dark .dropdown-item:hover,.dropup .dropdown-menu.dropdown-dark .dropdown-item.active,.dropup .dropdown-menu.dropdown-dark .dropdown-item:active,.dropup .dropdown-menu.dropdown-dark .dropdown-item:hover{background-color:#2e2e2e!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-dark .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-dark .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-dark .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-dark .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-dark .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-dark .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-dark .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-dark .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-dark .dropdown-item:hover.disabled,.dropup .dropdown-menu.dropdown-dark .dropdown-item.active.disabled,.dropup .dropdown-menu.dropdown-dark .dropdown-item:active.disabled,.dropup .dropdown-menu.dropdown-dark .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu.dropdown-ins .dropdown-item.active,.dropdown .dropdown-menu.dropdown-ins .dropdown-item:active,.dropdown .dropdown-menu.dropdown-ins .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-ins .dropdown-item.active,.dropleft .dropdown-menu.dropdown-ins .dropdown-item:active,.dropleft .dropdown-menu.dropdown-ins .dropdown-item:hover,.dropright .dropdown-menu.dropdown-ins .dropdown-item.active,.dropright .dropdown-menu.dropdown-ins .dropdown-item:active,.dropright .dropdown-menu.dropdown-ins .dropdown-item:hover,.dropup .dropdown-menu.dropdown-ins .dropdown-item.active,.dropup .dropdown-menu.dropdown-ins .dropdown-item:active,.dropup .dropdown-menu.dropdown-ins .dropdown-item:hover{background-color:#2e5e86!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-ins .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-ins .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-ins .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-ins .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-ins .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-ins .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-ins .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-ins .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-ins .dropdown-item:hover.disabled,.dropup .dropdown-menu.dropdown-ins .dropdown-item.active.disabled,.dropup .dropdown-menu.dropdown-ins .dropdown-item:active.disabled,.dropup .dropdown-menu.dropdown-ins .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu .dropdown-item,.dropleft .dropdown-menu .dropdown-item,.dropright .dropdown-menu .dropdown-item,.dropup .dropdown-menu .dropdown-item{padding:.5rem;margin-left:0;font-size:.9rem}.dropdown .dropdown-menu .dropdown-item.disabled,.dropleft .dropdown-menu .dropdown-item.disabled,.dropright .dropdown-menu .dropdown-item.disabled,.dropup .dropdown-menu .dropdown-item.disabled{color:#868e96}.dropdown .dropdown-menu .dropdown-item.disabled:active,.dropdown .dropdown-menu .dropdown-item.disabled:focus,.dropdown .dropdown-menu .dropdown-item.disabled:hover,.dropleft .dropdown-menu .dropdown-item.disabled:active,.dropleft .dropdown-menu .dropdown-item.disabled:focus,.dropleft .dropdown-menu .dropdown-item.disabled:hover,.dropright .dropdown-menu .dropdown-item.disabled:active,.dropright .dropdown-menu .dropdown-item.disabled:focus,.dropright .dropdown-menu .dropdown-item.disabled:hover,.dropup .dropdown-menu .dropdown-item.disabled:active,.dropup .dropdown-menu .dropdown-item.disabled:focus,.dropup .dropdown-menu .dropdown-item.disabled:hover{box-shadow:none;color:#868e96!important;background-color:transparent!important}.dropdown .dropdown-menu .dropdown-item:active,.dropdown .dropdown-menu .dropdown-item:hover,.dropleft .dropdown-menu .dropdown-item:active,.dropleft .dropdown-menu .dropdown-item:hover,.dropright .dropdown-menu .dropdown-item:active,.dropright .dropdown-menu .dropdown-item:hover,.dropup .dropdown-menu .dropdown-item:active,.dropup .dropdown-menu .dropdown-item:hover{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);background-color:#4285f4;border-radius:.125rem;transition:.1s linear}.navbar-nav .dropdown-menu-right{right:0;left:auto}.dropdown-menu.animated{-webkit-animation-duration:.55s;animation-duration:.55s;-webkit-animation-timing-function:ease;animation-timing-function:ease}"]
                }] }
    ];
    /** @nocollapse */
    BsDropdownDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ViewContainerRef },
        { type: ComponentLoaderFactory },
        { type: BsDropdownConfig },
        { type: BsDropdownState }
    ]; };
    BsDropdownDirective.propDecorators = {
        placement: [{ type: Input }],
        triggers: [{ type: Input }],
        container: [{ type: Input }],
        dropup: [{ type: HostBinding, args: ['class.dropup',] }, { type: Input }],
        autoClose: [{ type: Input }],
        isDisabled: [{ type: Input }],
        isOpen: [{ type: HostBinding, args: ['class.open',] }, { type: HostBinding, args: ['class.show',] }, { type: Input }],
        isOpenChange: [{ type: Output }],
        onShown: [{ type: Output }],
        shown: [{ type: Output }],
        onHidden: [{ type: Output }],
        hidden: [{ type: Output }]
    };
    return BsDropdownDirective;
}());
export { BsDropdownDirective };
if (false) {
    /**
     * Placement of a popover. Accepts: "top", "bottom", "left", "right"
     * @type {?}
     */
    BsDropdownDirective.prototype.placement;
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     * @type {?}
     */
    BsDropdownDirective.prototype.triggers;
    /**
     * A selector specifying the element the popover should be appended to.
     * Currently only supports "body".
     * @type {?}
     */
    BsDropdownDirective.prototype.container;
    /**
     * This attribute indicates that the dropdown should be opened upwards
     * @type {?}
     */
    BsDropdownDirective.prototype.dropup;
    /**
     * Emits an event when isOpen change
     * @type {?}
     */
    BsDropdownDirective.prototype.isOpenChange;
    /**
     * Emits an event when the popover is shown
     * @type {?}
     */
    BsDropdownDirective.prototype.onShown;
    /** @type {?} */
    BsDropdownDirective.prototype.shown;
    /**
     * Emits an event when the popover is hidden
     * @type {?}
     */
    BsDropdownDirective.prototype.onHidden;
    /** @type {?} */
    BsDropdownDirective.prototype.hidden;
    /** @type {?} */
    BsDropdownDirective.prototype._isInlineOpen;
    /** @type {?} */
    BsDropdownDirective.prototype._showInline;
    /** @type {?} */
    BsDropdownDirective.prototype._inlinedMenu;
    /** @type {?} */
    BsDropdownDirective.prototype._isDisabled;
    /** @type {?} */
    BsDropdownDirective.prototype._dropdown;
    /** @type {?} */
    BsDropdownDirective.prototype._subscriptions;
    /** @type {?} */
    BsDropdownDirective.prototype._isInited;
    /**
     * @type {?}
     * @private
     */
    BsDropdownDirective.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    BsDropdownDirective.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    BsDropdownDirective.prototype._viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    BsDropdownDirective.prototype._cis;
    /**
     * @type {?}
     * @private
     */
    BsDropdownDirective.prototype._config;
    /**
     * @type {?}
     * @private
     */
    BsDropdownDirective.prototype._state;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvZHJvcGRvd24vZHJvcGRvd24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBRVYsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQzVGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUduRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFdEQ7SUFtSEUsNkJBQ1UsV0FBdUIsRUFDdkIsU0FBb0IsRUFDcEIsaUJBQW1DLEVBQ25DLElBQTRCLEVBQzVCLE9BQXlCLEVBQ3pCLE1BQXVCO1FBTHZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxTQUFJLEdBQUosSUFBSSxDQUF3QjtRQUM1QixZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUN6QixXQUFNLEdBQU4sTUFBTSxDQUFpQjs7UUFmakMsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFNdEIsbUJBQWMsR0FBbUIsRUFBRSxDQUFDO1FBQ3BDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFVaEIsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElB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M0MsbUNBQW9DOzs7OztJQUNwQyxzQ0FBaUM7Ozs7O0lBQ2pDLHFDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ29tcG9uZW50TG9hZGVyIH0gZnJvbSAnLi4vdXRpbHMvY29tcG9uZW50LWxvYWRlci9jb21wb25lbnQtbG9hZGVyLmNsYXNzJztcbmltcG9ydCB7IENvbXBvbmVudExvYWRlckZhY3RvcnkgfSBmcm9tICcuLi91dGlscy9jb21wb25lbnQtbG9hZGVyL2NvbXBvbmVudC1sb2FkZXIuZmFjdG9yeSc7XG5pbXBvcnQgeyBCc0Ryb3Bkb3duQ29uZmlnIH0gZnJvbSAnLi9kcm9wZG93bi5jb25maWcnO1xuaW1wb3J0IHsgQnNEcm9wZG93bkNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZHJvcGRvd24tY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCc0Ryb3Bkb3duU3RhdGUgfSBmcm9tICcuL2Ryb3Bkb3duLnN0YXRlJztcbmltcG9ydCB7IEJzQ29tcG9uZW50UmVmIH0gZnJvbSAnLi4vdXRpbHMvY29tcG9uZW50LWxvYWRlci9icy1jb21wb25lbnQtcmVmLmNsYXNzJztcbmltcG9ydCB7IEJzRHJvcGRvd25NZW51RGlyZWN0aXZlIH0gZnJvbSAnLi9kcm9wZG93bi1tZW51LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBpc0JzMyB9IGZyb20gJy4uL3V0aWxzL25nMi1ib290c3RyYXAtY29uZmlnJztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiRHJvcGRvd25dLFtkcm9wZG93bl0nLFxuICBleHBvcnRBczogJ2JzLWRyb3Bkb3duJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgc3R5bGVVcmxzOiBbJ2Ryb3Bkb3duLW1vZHVsZS5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByb3ZpZGVyczogW0JzRHJvcGRvd25TdGF0ZV0sXG59KVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBCc0Ryb3Bkb3duRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogUGxhY2VtZW50IG9mIGEgcG9wb3Zlci4gQWNjZXB0czogXCJ0b3BcIiwgXCJib3R0b21cIiwgXCJsZWZ0XCIsIFwicmlnaHRcIlxuICAgKi9cbiAgQElucHV0KCkgcGxhY2VtZW50OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgZXZlbnRzIHRoYXQgc2hvdWxkIHRyaWdnZXIuIFN1cHBvcnRzIGEgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2ZcbiAgICogZXZlbnQgbmFtZXMuXG4gICAqL1xuICBASW5wdXQoKSB0cmlnZ2Vyczogc3RyaW5nO1xuICAvKipcbiAgICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSBwb3BvdmVyIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cbiAgICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgXCJib2R5XCIuXG4gICAqL1xuICBASW5wdXQoKSBjb250YWluZXI6IHN0cmluZztcblxuICAvKipcbiAgICogVGhpcyBhdHRyaWJ1dGUgaW5kaWNhdGVzIHRoYXQgdGhlIGRyb3Bkb3duIHNob3VsZCBiZSBvcGVuZWQgdXB3YXJkc1xuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kcm9wdXAnKVxuICBASW5wdXQoKVxuICBkcm9wdXA6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB0aGF0IGRyb3Bkb3duIHdpbGwgYmUgY2xvc2VkIG9uIGl0ZW0gb3IgZG9jdW1lbnQgY2xpY2ssXG4gICAqIGFuZCBhZnRlciBwcmVzc2luZyBFU0NcbiAgICovXG4gIEBJbnB1dCgpIHNldCBhdXRvQ2xvc2UodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuX3N0YXRlLmF1dG9DbG9zZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGdldCBhdXRvQ2xvc2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlLmF1dG9DbG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNhYmxlcyBkcm9wZG93biB0b2dnbGUgYW5kIGhpZGVzIGRyb3Bkb3duIG1lbnUgaWYgb3BlbmVkXG4gICAqL1xuICBASW5wdXQoKSBzZXQgaXNEaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzRGlzYWJsZWQgPSB2YWx1ZTtcbiAgICB0aGlzLl9zdGF0ZS5pc0Rpc2FibGVkQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzRGlzYWJsZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgcG9wb3ZlciBpcyBjdXJyZW50bHkgYmVpbmcgc2hvd25cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3Mub3BlbicpXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2hvdycpXG4gIEBJbnB1dCgpXG4gIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX3Nob3dJbmxpbmUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pc0lubGluZU9wZW47XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9kcm9wZG93bi5pc1Nob3duO1xuICB9XG5cbiAgc2V0IGlzT3Blbih2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIGlzT3BlbiBjaGFuZ2VcbiAgICovXG4gIEBPdXRwdXQoKSBpc09wZW5DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+O1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBwb3BvdmVyIGlzIHNob3duXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgb25TaG93bjogRXZlbnRFbWl0dGVyPGFueT47XG4gIEBPdXRwdXQoKSBzaG93bjogRXZlbnRFbWl0dGVyPGFueT47XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHBvcG92ZXIgaXMgaGlkZGVuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgb25IaWRkZW46IEV2ZW50RW1pdHRlcjxhbnk+O1xuICBAT3V0cHV0KCkgaGlkZGVuOiBFdmVudEVtaXR0ZXI8YW55PjtcblxuICBnZXQgaXNCczQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFpc0JzMygpO1xuICB9XG4gIC8vIHRvZG86IG1vdmUgdG8gY29tcG9uZW50IGxvYWRlclxuICBfaXNJbmxpbmVPcGVuID0gZmFsc2U7XG4gIF9zaG93SW5saW5lOiBib29sZWFuO1xuICBfaW5saW5lZE1lbnU6IEVtYmVkZGVkVmlld1JlZjxCc0Ryb3Bkb3duTWVudURpcmVjdGl2ZT47XG5cbiAgX2lzRGlzYWJsZWQ6IGJvb2xlYW47XG4gIF9kcm9wZG93bjogQ29tcG9uZW50TG9hZGVyPEJzRHJvcGRvd25Db250YWluZXJDb21wb25lbnQ+O1xuICBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgX2lzSW5pdGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBfY2lzOiBDb21wb25lbnRMb2FkZXJGYWN0b3J5LFxuICAgIHByaXZhdGUgX2NvbmZpZzogQnNEcm9wZG93bkNvbmZpZyxcbiAgICBwcml2YXRlIF9zdGF0ZTogQnNEcm9wZG93blN0YXRlXG4gICkge1xuICAgIC8vIGNyZWF0ZSBkcm9wZG93biBjb21wb25lbnQgbG9hZGVyXG4gICAgdGhpcy5fZHJvcGRvd24gPSB0aGlzLl9jaXNcbiAgICAgIC5jcmVhdGVMb2FkZXI8QnNEcm9wZG93bkNvbnRhaW5lckNvbXBvbmVudD4oXG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYsXG4gICAgICAgIHRoaXMuX3ZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyXG4gICAgICApXG4gICAgICAucHJvdmlkZSh7IHByb3ZpZGU6IEJzRHJvcGRvd25TdGF0ZSwgdXNlVmFsdWU6IHRoaXMuX3N0YXRlIH0pO1xuXG4gICAgdGhpcy5vblNob3duID0gdGhpcy5fZHJvcGRvd24ub25TaG93bjtcbiAgICB0aGlzLnNob3duID0gdGhpcy5fZHJvcGRvd24uc2hvd247XG4gICAgdGhpcy5vbkhpZGRlbiA9IHRoaXMuX2Ryb3Bkb3duLm9uSGlkZGVuO1xuICAgIHRoaXMuaGlkZGVuID0gdGhpcy5fZHJvcGRvd24uaGlkZGVuO1xuICAgIHRoaXMuaXNPcGVuQ2hhbmdlID0gdGhpcy5fc3RhdGUuaXNPcGVuQ2hhbmdlO1xuXG4gICAgLy8gc2V0IGluaXRpYWwgZHJvcGRvd24gc3RhdGUgZnJvbSBjb25maWdcbiAgICB0aGlzLl9zdGF0ZS5hdXRvQ2xvc2UgPSB0aGlzLl9jb25maWcuYXV0b0Nsb3NlO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gZml4OiBzZWVtcyB0aGVyZSBhcmUgYW4gaXNzdWUgd2l0aCBgcm91dGVyTGlua0FjdGl2ZWBcbiAgICAvLyB3aGljaCByZXN1bHQgaW4gZHVwbGljYXRlZCBjYWxsIG5nT25Jbml0IHdpdGhvdXQgY2FsbCB0byBuZ09uRGVzdHJveVxuICAgIC8vIHJlYWQgbW9yZTogaHR0cHM6Ly9naXRodWIuY29tL3ZhbG9yLXNvZnR3YXJlL25neC1ib290c3RyYXAvaXNzdWVzLzE4ODVcbiAgICBpZiAodGhpcy5faXNJbml0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5faXNJbml0ZWQgPSB0cnVlO1xuXG4gICAgdGhpcy5fc2hvd0lubGluZSA9ICF0aGlzLmNvbnRhaW5lcjtcblxuICAgIC8vIGF0dGFjaCBET00gbGlzdGVuZXJzXG4gICAgdGhpcy5fZHJvcGRvd24ubGlzdGVuKHtcbiAgICAgIHRyaWdnZXJzOiB0aGlzLnRyaWdnZXJzLFxuICAgICAgc2hvdzogKCkgPT4gdGhpcy5zaG93KCksXG4gICAgfSk7XG5cbiAgICAvLyB0b2dnbGUgdmlzaWJpbGl0eSBvbiB0b2dnbGUgZWxlbWVudCBjbGlja1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuX3N0YXRlLnRvZ2dsZUNsaWNrLnN1YnNjcmliZSgodmFsdWU6IGJvb2xlYW4pID0+IHRoaXMudG9nZ2xlKHZhbHVlKSlcbiAgICApO1xuXG4gICAgLy8gaGlkZSBkcm9wZG93biBpZiBzZXQgZGlzYWJsZWQgd2hpbGUgb3BlbmVkXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5fc3RhdGUuaXNEaXNhYmxlZENoYW5nZS5zdWJzY3JpYmUoKGVsZW1lbnQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICAvLyBhdHRhY2ggZHJvcGRvd24gbWVudSBpbnNpZGUgb2YgZHJvcGRvd25cbiAgICBpZiAodGhpcy5fc2hvd0lubGluZSkge1xuICAgICAgdGhpcy5fc3RhdGUuZHJvcGRvd25NZW51LnRoZW4oKGRyb3Bkb3duTWVudTogQnNDb21wb25lbnRSZWY8QnNEcm9wZG93bk1lbnVEaXJlY3RpdmU+KSA9PiB7XG4gICAgICAgIHRoaXMuX2lubGluZWRNZW51ID0gZHJvcGRvd25NZW51LnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KGRyb3Bkb3duTWVudS50ZW1wbGF0ZVJlZik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLl9zdGF0ZS5pc09wZW5DaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBkcm9wZG93bkNvbnRhaW5lciA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24tbWVudScpO1xuICAgICAgICBjb25zdCBsZWZ0ID0gZHJvcGRvd25Db250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wZG93bi1tZW51LXJpZ2h0JykgJiZcbiAgICAgICAgICBsZWZ0IDw9IGRyb3Bkb3duQ29udGFpbmVyLmNsaWVudFdpZHRoXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChsZWZ0IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZHJvcGRvd25Db250YWluZXIsICdyaWdodCcsIGxlZnQgKyAncHgnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZHJvcGRvd25Db250YWluZXIsICdyaWdodCcsICcwJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBhbiBlbGVtZW504oCZcyBwb3BvdmVyLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZlxuICAgKiB0aGUgcG9wb3Zlci5cbiAgICovXG4gIHNob3coKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNPcGVuIHx8IHRoaXMuaXNEaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBtYXRlcmlhbCBhbmQgZHJvcHVwIGRyb3Bkb3duIGFuaW1hdGlvblxuICAgIC8vIGNvbnN0IHBhcmVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3Q7XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1tZW51Jyk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmYWRlSW5Ecm9wZG93bicpO1xuICAgIH0sIDIwMCk7XG5cbiAgICBpZiAodGhpcy5fc2hvd0lubGluZSkge1xuICAgICAgdGhpcy5faXNJbmxpbmVPcGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMub25TaG93bi5lbWl0KHRydWUpO1xuICAgICAgdGhpcy5zaG93bi5lbWl0KHRydWUpO1xuICAgICAgdGhpcy5fc3RhdGUuaXNPcGVuQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3N0YXRlLmRyb3Bkb3duTWVudS50aGVuKGRyb3Bkb3duTWVudSA9PiB7XG4gICAgICAvLyBjaGVjayBkaXJlY3Rpb24gaW4gd2hpY2ggZHJvcGRvd24gc2hvdWxkIGJlIG9wZW5lZFxuICAgICAgY29uc3QgX2Ryb3B1cCA9XG4gICAgICAgIHRoaXMuZHJvcHVwID09PSB0cnVlIHx8ICh0eXBlb2YgdGhpcy5kcm9wdXAgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZHJvcHVwICE9PSBmYWxzZSk7XG4gICAgICB0aGlzLl9zdGF0ZS5kaXJlY3Rpb24gPSBfZHJvcHVwID8gJ3VwJyA6ICdkb3duJztcbiAgICAgIGNvbnN0IF9wbGFjZW1lbnQgPSB0aGlzLnBsYWNlbWVudCB8fCAoX2Ryb3B1cCA/ICd0b3AgbGVmdCcgOiAnYm90dG9tIGxlZnQnKTtcblxuICAgICAgLy8gc2hvdyBkcm9wZG93blxuICAgICAgdGhpcy5fZHJvcGRvd25cbiAgICAgICAgLmF0dGFjaChCc0Ryb3Bkb3duQ29udGFpbmVyQ29tcG9uZW50KVxuICAgICAgICAudG8odGhpcy5jb250YWluZXIpXG4gICAgICAgIC5wb3NpdGlvbih7IGF0dGFjaG1lbnQ6IF9wbGFjZW1lbnQgfSlcbiAgICAgICAgLnNob3coe1xuICAgICAgICAgIGNvbnRlbnQ6IGRyb3Bkb3duTWVudS50ZW1wbGF0ZVJlZixcbiAgICAgICAgICBwbGFjZW1lbnQ6IF9wbGFjZW1lbnQsXG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5fc3RhdGUuaXNPcGVuQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIGFuIGVsZW1lbnTigJlzIHBvcG92ZXIuIFRoaXMgaXMgY29uc2lkZXJlZCBhIOKAnG1hbnVhbOKAnSB0cmlnZ2VyaW5nIG9mXG4gICAqIHRoZSBwb3BvdmVyLlxuICAgKi9cbiAgaGlkZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdDtcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLW1lbnUnKTtcblxuICAgIGlmIChwYXJlbnQudmFsdWUgPT09ICdkcm9wZG93biBvcGVuIHNob3cnIHx8IHBhcmVudC52YWx1ZSA9PT0gJ2J0bi1ncm91cCBkcm9wdXAgb3BlbiBzaG93Jykge1xuICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhZGVJbkRyb3Bkb3duJyk7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fc2hvd0lubGluZSkge1xuICAgICAgICAgIHRoaXMuX2lzSW5saW5lT3BlbiA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMub25IaWRkZW4uZW1pdCh0cnVlKTtcbiAgICAgICAgICB0aGlzLmhpZGRlbi5lbWl0KHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2Ryb3Bkb3duLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3N0YXRlLmlzT3BlbkNoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgIH0sIDU2MCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9zaG93SW5saW5lKSB7XG4gICAgICAgIHRoaXMuX2lzSW5saW5lT3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uSGlkZGVuLmVtaXQodHJ1ZSk7XG4gICAgICAgIHRoaXMuaGlkZGVuLmVtaXQodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9kcm9wZG93bi5oaWRlKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3N0YXRlLmlzT3BlbkNoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyBhbiBlbGVtZW504oCZcyBwb3BvdmVyLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZlxuICAgKiB0aGUgcG9wb3Zlci5cbiAgICovXG4gIHRvZ2dsZSh2YWx1ZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc09wZW4gfHwgdmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc2hvdygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgLy8gY2xlYW4gdXAgc3Vic2NyaXB0aW9ucyBhbmQgZGVzdHJveSBkcm9wZG93blxuICAgIGZvciAoY29uc3Qgc3ViIG9mIHRoaXMuX3N1YnNjcmlwdGlvbnMpIHtcbiAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICB0aGlzLl9kcm9wZG93bi5kaXNwb3NlKCk7XG4gIH1cbn1cbiJdfQ==