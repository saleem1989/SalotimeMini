/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { ComponentLoaderFactory } from '../utils/component-loader/component-loader.factory';
import { BsDropdownConfig } from './dropdown.config';
import { BsDropdownContainerComponent } from './dropdown-container.component';
import { BsDropdownState } from './dropdown.state';
import { isBs3 } from '../utils/ng2-bootstrap-config';
// tslint:disable-next-line:component-class-suffix
export class BsDropdownDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _viewContainerRef
     * @param {?} _cis
     * @param {?} _config
     * @param {?} _state
     */
    constructor(_elementRef, _renderer, _viewContainerRef, _cis, _config, _state) {
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
    /**
     * Indicates that dropdown will be closed on item or document click,
     * and after pressing ESC
     * @param {?} value
     * @return {?}
     */
    set autoClose(value) {
        if (typeof value === 'boolean') {
            this._state.autoClose = value;
        }
    }
    /**
     * @return {?}
     */
    get autoClose() {
        return this._state.autoClose;
    }
    /**
     * Disables dropdown toggle and hides dropdown menu if opened
     * @param {?} value
     * @return {?}
     */
    set isDisabled(value) {
        this._isDisabled = value;
        this._state.isDisabledChange.emit(value);
        if (value) {
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    get isDisabled() {
        return this._isDisabled;
    }
    /**
     * Returns whether or not the popover is currently being shown
     * @return {?}
     */
    get isOpen() {
        if (this._showInline) {
            return this._isInlineOpen;
        }
        return this._dropdown.isShown;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isOpen(value) {
        if (value) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    get isBs4() {
        return !isBs3();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
            () => this.show()),
        });
        // toggle visibility on toggle element click
        this._subscriptions.push(this._state.toggleClick.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => this.toggle(value))));
        // hide dropdown if set disabled while opened
        this._subscriptions.push(this._state.isDisabledChange.subscribe((/**
         * @param {?} element
         * @return {?}
         */
        (element) => {
            if (element === true) {
                this.hide();
            }
        })));
        // attach dropdown menu inside of dropdown
        if (this._showInline) {
            this._state.dropdownMenu.then((/**
             * @param {?} dropdownMenu
             * @return {?}
             */
            (dropdownMenu) => {
                this._inlinedMenu = dropdownMenu.viewContainer.createEmbeddedView(dropdownMenu.templateRef);
            }));
        }
        this._state.isOpenChange.subscribe((/**
         * @return {?}
         */
        () => {
            setTimeout((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const dropdownContainer = this._elementRef.nativeElement.querySelector('.dropdown-menu');
                /** @type {?} */
                const left = dropdownContainer.getBoundingClientRect().left;
                if (dropdownContainer.classList.contains('dropdown-menu-right') &&
                    left <= dropdownContainer.clientWidth) {
                    if (left < 0) {
                        this._renderer.setStyle(dropdownContainer, 'right', left + 'px');
                    }
                    else {
                        this._renderer.setStyle(dropdownContainer, 'right', '0');
                    }
                }
            }), 0);
        }));
    }
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     * @return {?}
     */
    show() {
        if (this.isOpen || this.isDisabled) {
            return;
        }
        // material and dropup dropdown animation
        // const parent = this._elementRef.nativeElement.classList;
        /** @type {?} */
        const container = this._elementRef.nativeElement.querySelector('.dropdown-menu');
        setTimeout((/**
         * @return {?}
         */
        () => {
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
        dropdownMenu => {
            // check direction in which dropdown should be opened
            /** @type {?} */
            const _dropup = this.dropup === true || (typeof this.dropup !== 'undefined' && this.dropup !== false);
            this._state.direction = _dropup ? 'up' : 'down';
            /** @type {?} */
            const _placement = this.placement || (_dropup ? 'top left' : 'bottom left');
            // show dropdown
            this._dropdown
                .attach(BsDropdownContainerComponent)
                .to(this.container)
                .position({ attachment: _placement })
                .show({
                content: dropdownMenu.templateRef,
                placement: _placement,
            });
            this._state.isOpenChange.emit(true);
        }));
    }
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     * @return {?}
     */
    hide() {
        if (!this.isOpen) {
            return;
        }
        /** @type {?} */
        const parent = this._elementRef.nativeElement.classList;
        /** @type {?} */
        const container = this._elementRef.nativeElement.querySelector('.dropdown-menu');
        if (parent.value === 'dropdown open show' || parent.value === 'btn-group dropup open show') {
            container.classList.remove('fadeInDropdown');
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (this._showInline) {
                    this._isInlineOpen = false;
                    this.onHidden.emit(true);
                    this.hidden.emit(true);
                }
                else {
                    this._dropdown.hide();
                }
                this._state.isOpenChange.emit(false);
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
    }
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     * @param {?=} value
     * @return {?}
     */
    toggle(value) {
        if (this.isOpen || value === false) {
            return this.hide();
        }
        return this.show();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // clean up subscriptions and destroy dropdown
        for (const sub of this._subscriptions) {
            sub.unsubscribe();
        }
        this._dropdown.dispose();
    }
}
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
BsDropdownDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ViewContainerRef },
    { type: ComponentLoaderFactory },
    { type: BsDropdownConfig },
    { type: BsDropdownState }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvZHJvcGRvd24vZHJvcGRvd24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFFVixZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDNUYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR25ELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQVd0RCxrREFBa0Q7QUFDbEQsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7Ozs7O0lBeUc5QixZQUNVLFdBQXVCLEVBQ3ZCLFNBQW9CLEVBQ3BCLGlCQUFtQyxFQUNuQyxJQUE0QixFQUM1QixPQUF5QixFQUN6QixNQUF1QjtRQUx2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsU0FBSSxHQUFKLElBQUksQ0FBd0I7UUFDNUIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDekIsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7O1FBZmpDLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBTXRCLG1CQUFjLEdBQW1CLEVBQUUsQ0FBQztRQUNwQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBVWhCLG1DQUFtQztR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QTBCO2dCQUNwQyxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFLDJCQUEyQjtnQkFFckMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQzs7YUFDN0I7Ozs7WUEvQkMsVUFBVTtZQVFWLFNBQVM7WUFDVCxnQkFBZ0I7WUFNVCxzQkFBc0I7WUFDdEIsZ0JBQWdCO1lBRWhCLGVBQWU7Ozt3QkFtQnJCLEtBQUs7dUJBS0wsS0FBSzt3QkFLTCxLQUFLO3FCQUtMLFdBQVcsU0FBQyxjQUFjLGNBQzFCLEtBQUs7d0JBT0wsS0FBSzt5QkFhTCxLQUFLO3FCQWVMLFdBQVcsU0FBQyxZQUFZLGNBQ3hCLFdBQVcsU0FBQyxZQUFZLGNBQ3hCLEtBQUs7MkJBbUJMLE1BQU07c0JBTU4sTUFBTTtvQkFDTixNQUFNO3VCQU1OLE1BQU07cUJBQ04sTUFBTTs7Ozs7OztJQXRGUCx3Q0FBMkI7Ozs7OztJQUszQix1Q0FBMEI7Ozs7OztJQUsxQix3Q0FBMkI7Ozs7O0lBSzNCLHFDQUVnQjs7Ozs7SUF1RGhCLDJDQUEwQzs7Ozs7SUFNMUMsc0NBQXFDOztJQUNyQyxvQ0FBbUM7Ozs7O0lBTW5DLHVDQUFzQzs7SUFDdEMscUNBQW9DOztJQU1wQyw0Q0FBc0I7O0lBQ3RCLDBDQUFxQjs7SUFDckIsMkNBQXVEOztJQUV2RCwwQ0FBcUI7O0lBQ3JCLHdDQUF5RDs7SUFDekQsNkNBQW9DOztJQUNwQyx3Q0FBa0I7Ozs7O0lBR2hCLDBDQUErQjs7Ozs7SUFDL0Isd0NBQTRCOzs7OztJQUM1QixnREFBMkM7Ozs7O0lBQzNDLG1DQUFvQzs7Ozs7SUFDcEMsc0NBQWlDOzs7OztJQUNqQyxxQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENvbXBvbmVudExvYWRlciB9IGZyb20gJy4uL3V0aWxzL2NvbXBvbmVudC1sb2FkZXIvY29tcG9uZW50LWxvYWRlci5jbGFzcyc7XG5pbXBvcnQgeyBDb21wb25lbnRMb2FkZXJGYWN0b3J5IH0gZnJvbSAnLi4vdXRpbHMvY29tcG9uZW50LWxvYWRlci9jb21wb25lbnQtbG9hZGVyLmZhY3RvcnknO1xuaW1wb3J0IHsgQnNEcm9wZG93bkNvbmZpZyB9IGZyb20gJy4vZHJvcGRvd24uY29uZmlnJztcbmltcG9ydCB7IEJzRHJvcGRvd25Db250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2Ryb3Bkb3duLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnNEcm9wZG93blN0YXRlIH0gZnJvbSAnLi9kcm9wZG93bi5zdGF0ZSc7XG5pbXBvcnQgeyBCc0NvbXBvbmVudFJlZiB9IGZyb20gJy4uL3V0aWxzL2NvbXBvbmVudC1sb2FkZXIvYnMtY29tcG9uZW50LXJlZi5jbGFzcyc7XG5pbXBvcnQgeyBCc0Ryb3Bkb3duTWVudURpcmVjdGl2ZSB9IGZyb20gJy4vZHJvcGRvd24tbWVudS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgaXNCczMgfSBmcm9tICcuLi91dGlscy9uZzItYm9vdHN0cmFwLWNvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW21kYkRyb3Bkb3duXSxbZHJvcGRvd25dJyxcbiAgZXhwb3J0QXM6ICdicy1kcm9wZG93bicsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIHN0eWxlVXJsczogWydkcm9wZG93bi1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFtCc0Ryb3Bkb3duU3RhdGVdLFxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgQnNEcm9wZG93bkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFBsYWNlbWVudCBvZiBhIHBvcG92ZXIuIEFjY2VwdHM6IFwidG9wXCIsIFwiYm90dG9tXCIsIFwibGVmdFwiLCBcInJpZ2h0XCJcbiAgICovXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogc3RyaW5nO1xuICAvKipcbiAgICogU3BlY2lmaWVzIGV2ZW50cyB0aGF0IHNob3VsZCB0cmlnZ2VyLiBTdXBwb3J0cyBhIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mXG4gICAqIGV2ZW50IG5hbWVzLlxuICAgKi9cbiAgQElucHV0KCkgdHJpZ2dlcnM6IHN0cmluZztcbiAgLyoqXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgcG9wb3ZlciBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxuICAgKi9cbiAgQElucHV0KCkgY29udGFpbmVyOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoaXMgYXR0cmlidXRlIGluZGljYXRlcyB0aGF0IHRoZSBkcm9wZG93biBzaG91bGQgYmUgb3BlbmVkIHVwd2FyZHNcbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZHJvcHVwJylcbiAgQElucHV0KClcbiAgZHJvcHVwOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhhdCBkcm9wZG93biB3aWxsIGJlIGNsb3NlZCBvbiBpdGVtIG9yIGRvY3VtZW50IGNsaWNrLFxuICAgKiBhbmQgYWZ0ZXIgcHJlc3NpbmcgRVNDXG4gICAqL1xuICBASW5wdXQoKSBzZXQgYXV0b0Nsb3NlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aGlzLl9zdGF0ZS5hdXRvQ2xvc2UgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBnZXQgYXV0b0Nsb3NlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZS5hdXRvQ2xvc2U7XG4gIH1cblxuICAvKipcbiAgICogRGlzYWJsZXMgZHJvcGRvd24gdG9nZ2xlIGFuZCBoaWRlcyBkcm9wZG93biBtZW51IGlmIG9wZW5lZFxuICAgKi9cbiAgQElucHV0KCkgc2V0IGlzRGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc0Rpc2FibGVkID0gdmFsdWU7XG4gICAgdGhpcy5fc3RhdGUuaXNEaXNhYmxlZENoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpc0Rpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0Rpc2FibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHBvcG92ZXIgaXMgY3VycmVudGx5IGJlaW5nIHNob3duXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm9wZW4nKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNob3cnKVxuICBASW5wdXQoKVxuICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9zaG93SW5saW5lKSB7XG4gICAgICByZXR1cm4gdGhpcy5faXNJbmxpbmVPcGVuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZHJvcGRvd24uaXNTaG93bjtcbiAgfVxuXG4gIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiBpc09wZW4gY2hhbmdlXG4gICAqL1xuICBAT3V0cHV0KCkgaXNPcGVuQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PjtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgcG9wb3ZlciBpcyBzaG93blxuICAgKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIG9uU2hvd246IEV2ZW50RW1pdHRlcjxhbnk+O1xuICBAT3V0cHV0KCkgc2hvd246IEV2ZW50RW1pdHRlcjxhbnk+O1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBwb3BvdmVyIGlzIGhpZGRlblxuICAgKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIG9uSGlkZGVuOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgQE91dHB1dCgpIGhpZGRlbjogRXZlbnRFbWl0dGVyPGFueT47XG5cbiAgZ2V0IGlzQnM0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhaXNCczMoKTtcbiAgfVxuICAvLyB0b2RvOiBtb3ZlIHRvIGNvbXBvbmVudCBsb2FkZXJcbiAgX2lzSW5saW5lT3BlbiA9IGZhbHNlO1xuICBfc2hvd0lubGluZTogYm9vbGVhbjtcbiAgX2lubGluZWRNZW51OiBFbWJlZGRlZFZpZXdSZWY8QnNEcm9wZG93bk1lbnVEaXJlY3RpdmU+O1xuXG4gIF9pc0Rpc2FibGVkOiBib29sZWFuO1xuICBfZHJvcGRvd246IENvbXBvbmVudExvYWRlcjxCc0Ryb3Bkb3duQ29udGFpbmVyQ29tcG9uZW50PjtcbiAgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIF9pc0luaXRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgX2NpczogQ29tcG9uZW50TG9hZGVyRmFjdG9yeSxcbiAgICBwcml2YXRlIF9jb25maWc6IEJzRHJvcGRvd25Db25maWcsXG4gICAgcHJpdmF0ZSBfc3RhdGU6IEJzRHJvcGRvd25TdGF0ZVxuICApIHtcbiAgICAvLyBjcmVhdGUgZHJvcGRvd24gY29tcG9uZW50IGxvYWRlclxuICAgIHRoaXMuX2Ryb3Bkb3duID0gdGhpcy5fY2lzXG4gICAgICAuY3JlYXRlTG9hZGVyPEJzRHJvcGRvd25Db250YWluZXJDb21wb25lbnQ+KFxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLFxuICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyUmVmLFxuICAgICAgICB0aGlzLl9yZW5kZXJlclxuICAgICAgKVxuICAgICAgLnByb3ZpZGUoeyBwcm92aWRlOiBCc0Ryb3Bkb3duU3RhdGUsIHVzZVZhbHVlOiB0aGlzLl9zdGF0ZSB9KTtcblxuICAgIHRoaXMub25TaG93biA9IHRoaXMuX2Ryb3Bkb3duLm9uU2hvd247XG4gICAgdGhpcy5zaG93biA9IHRoaXMuX2Ryb3Bkb3duLnNob3duO1xuICAgIHRoaXMub25IaWRkZW4gPSB0aGlzLl9kcm9wZG93bi5vbkhpZGRlbjtcbiAgICB0aGlzLmhpZGRlbiA9IHRoaXMuX2Ryb3Bkb3duLmhpZGRlbjtcbiAgICB0aGlzLmlzT3BlbkNoYW5nZSA9IHRoaXMuX3N0YXRlLmlzT3BlbkNoYW5nZTtcblxuICAgIC8vIHNldCBpbml0aWFsIGRyb3Bkb3duIHN0YXRlIGZyb20gY29uZmlnXG4gICAgdGhpcy5fc3RhdGUuYXV0b0Nsb3NlID0gdGhpcy5fY29uZmlnLmF1dG9DbG9zZTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIGZpeDogc2VlbXMgdGhlcmUgYXJlIGFuIGlzc3VlIHdpdGggYHJvdXRlckxpbmtBY3RpdmVgXG4gICAgLy8gd2hpY2ggcmVzdWx0IGluIGR1cGxpY2F0ZWQgY2FsbCBuZ09uSW5pdCB3aXRob3V0IGNhbGwgdG8gbmdPbkRlc3Ryb3lcbiAgICAvLyByZWFkIG1vcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS92YWxvci1zb2Z0d2FyZS9uZ3gtYm9vdHN0cmFwL2lzc3Vlcy8xODg1XG4gICAgaWYgKHRoaXMuX2lzSW5pdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2lzSW5pdGVkID0gdHJ1ZTtcblxuICAgIHRoaXMuX3Nob3dJbmxpbmUgPSAhdGhpcy5jb250YWluZXI7XG5cbiAgICAvLyBhdHRhY2ggRE9NIGxpc3RlbmVyc1xuICAgIHRoaXMuX2Ryb3Bkb3duLmxpc3Rlbih7XG4gICAgICB0cmlnZ2VyczogdGhpcy50cmlnZ2VycyxcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuc2hvdygpLFxuICAgIH0pO1xuXG4gICAgLy8gdG9nZ2xlIHZpc2liaWxpdHkgb24gdG9nZ2xlIGVsZW1lbnQgY2xpY2tcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLl9zdGF0ZS50b2dnbGVDbGljay5zdWJzY3JpYmUoKHZhbHVlOiBib29sZWFuKSA9PiB0aGlzLnRvZ2dsZSh2YWx1ZSkpXG4gICAgKTtcblxuICAgIC8vIGhpZGUgZHJvcGRvd24gaWYgc2V0IGRpc2FibGVkIHdoaWxlIG9wZW5lZFxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuX3N0YXRlLmlzRGlzYWJsZWRDaGFuZ2Uuc3Vic2NyaWJlKChlbGVtZW50OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHRydWUpIHtcbiAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgLy8gYXR0YWNoIGRyb3Bkb3duIG1lbnUgaW5zaWRlIG9mIGRyb3Bkb3duXG4gICAgaWYgKHRoaXMuX3Nob3dJbmxpbmUpIHtcbiAgICAgIHRoaXMuX3N0YXRlLmRyb3Bkb3duTWVudS50aGVuKChkcm9wZG93bk1lbnU6IEJzQ29tcG9uZW50UmVmPEJzRHJvcGRvd25NZW51RGlyZWN0aXZlPikgPT4ge1xuICAgICAgICB0aGlzLl9pbmxpbmVkTWVudSA9IGRyb3Bkb3duTWVudS52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyhkcm9wZG93bk1lbnUudGVtcGxhdGVSZWYpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5fc3RhdGUuaXNPcGVuQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgZHJvcGRvd25Db250YWluZXIgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLW1lbnUnKTtcbiAgICAgICAgY29uc3QgbGVmdCA9IGRyb3Bkb3duQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucygnZHJvcGRvd24tbWVudS1yaWdodCcpICYmXG4gICAgICAgICAgbGVmdCA8PSBkcm9wZG93bkNvbnRhaW5lci5jbGllbnRXaWR0aFxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAobGVmdCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGRyb3Bkb3duQ29udGFpbmVyLCAncmlnaHQnLCBsZWZ0ICsgJ3B4Jyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGRyb3Bkb3duQ29udGFpbmVyLCAncmlnaHQnLCAnMCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgMCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgYW4gZWxlbWVudOKAmXMgcG9wb3Zlci4gVGhpcyBpcyBjb25zaWRlcmVkIGEg4oCcbWFudWFs4oCdIHRyaWdnZXJpbmcgb2ZcbiAgICogdGhlIHBvcG92ZXIuXG4gICAqL1xuICBzaG93KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzT3BlbiB8fCB0aGlzLmlzRGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gbWF0ZXJpYWwgYW5kIGRyb3B1cCBkcm9wZG93biBhbmltYXRpb25cbiAgICAvLyBjb25zdCBwYXJlbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24tbWVudScpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZmFkZUluRHJvcGRvd24nKTtcbiAgICB9LCAyMDApO1xuXG4gICAgaWYgKHRoaXMuX3Nob3dJbmxpbmUpIHtcbiAgICAgIHRoaXMuX2lzSW5saW5lT3BlbiA9IHRydWU7XG4gICAgICB0aGlzLm9uU2hvd24uZW1pdCh0cnVlKTtcbiAgICAgIHRoaXMuc2hvd24uZW1pdCh0cnVlKTtcbiAgICAgIHRoaXMuX3N0YXRlLmlzT3BlbkNoYW5nZS5lbWl0KHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zdGF0ZS5kcm9wZG93bk1lbnUudGhlbihkcm9wZG93bk1lbnUgPT4ge1xuICAgICAgLy8gY2hlY2sgZGlyZWN0aW9uIGluIHdoaWNoIGRyb3Bkb3duIHNob3VsZCBiZSBvcGVuZWRcbiAgICAgIGNvbnN0IF9kcm9wdXAgPVxuICAgICAgICB0aGlzLmRyb3B1cCA9PT0gdHJ1ZSB8fCAodHlwZW9mIHRoaXMuZHJvcHVwICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmRyb3B1cCAhPT0gZmFsc2UpO1xuICAgICAgdGhpcy5fc3RhdGUuZGlyZWN0aW9uID0gX2Ryb3B1cCA/ICd1cCcgOiAnZG93bic7XG4gICAgICBjb25zdCBfcGxhY2VtZW50ID0gdGhpcy5wbGFjZW1lbnQgfHwgKF9kcm9wdXAgPyAndG9wIGxlZnQnIDogJ2JvdHRvbSBsZWZ0Jyk7XG5cbiAgICAgIC8vIHNob3cgZHJvcGRvd25cbiAgICAgIHRoaXMuX2Ryb3Bkb3duXG4gICAgICAgIC5hdHRhY2goQnNEcm9wZG93bkNvbnRhaW5lckNvbXBvbmVudClcbiAgICAgICAgLnRvKHRoaXMuY29udGFpbmVyKVxuICAgICAgICAucG9zaXRpb24oeyBhdHRhY2htZW50OiBfcGxhY2VtZW50IH0pXG4gICAgICAgIC5zaG93KHtcbiAgICAgICAgICBjb250ZW50OiBkcm9wZG93bk1lbnUudGVtcGxhdGVSZWYsXG4gICAgICAgICAgcGxhY2VtZW50OiBfcGxhY2VtZW50LFxuICAgICAgICB9KTtcbiAgICAgIHRoaXMuX3N0YXRlLmlzT3BlbkNoYW5nZS5lbWl0KHRydWUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyBhbiBlbGVtZW504oCZcyBwb3BvdmVyLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZlxuICAgKiB0aGUgcG9wb3Zlci5cbiAgICovXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3Q7XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1tZW51Jyk7XG5cbiAgICBpZiAocGFyZW50LnZhbHVlID09PSAnZHJvcGRvd24gb3BlbiBzaG93JyB8fCBwYXJlbnQudmFsdWUgPT09ICdidG4tZ3JvdXAgZHJvcHVwIG9wZW4gc2hvdycpIHtcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdmYWRlSW5Ecm9wZG93bicpO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dJbmxpbmUpIHtcbiAgICAgICAgICB0aGlzLl9pc0lubGluZU9wZW4gPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLm9uSGlkZGVuLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgdGhpcy5oaWRkZW4uZW1pdCh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9kcm9wZG93bi5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zdGF0ZS5pc09wZW5DaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICB9LCA1NjApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fc2hvd0lubGluZSkge1xuICAgICAgICB0aGlzLl9pc0lubGluZU9wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkhpZGRlbi5lbWl0KHRydWUpO1xuICAgICAgICB0aGlzLmhpZGRlbi5lbWl0KHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZHJvcGRvd24uaGlkZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9zdGF0ZS5pc09wZW5DaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgYW4gZWxlbWVudOKAmXMgcG9wb3Zlci4gVGhpcyBpcyBjb25zaWRlcmVkIGEg4oCcbWFudWFs4oCdIHRyaWdnZXJpbmcgb2ZcbiAgICogdGhlIHBvcG92ZXIuXG4gICAqL1xuICB0b2dnbGUodmFsdWU/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNPcGVuIHx8IHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNob3coKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIC8vIGNsZWFuIHVwIHN1YnNjcmlwdGlvbnMgYW5kIGRlc3Ryb3kgZHJvcGRvd25cbiAgICBmb3IgKGNvbnN0IHN1YiBvZiB0aGlzLl9zdWJzY3JpcHRpb25zKSB7XG4gICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgdGhpcy5fZHJvcGRvd24uZGlzcG9zZSgpO1xuICB9XG59XG4iXX0=