/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Inject, Input, Output, PLATFORM_ID, Renderer2, ViewChild, ViewChildren, ViewEncapsulation, } from '@angular/core';
import { TabsetConfig } from './tabset.config';
import { WavesDirective } from '../../free/waves/waves-effect.directive';
import { isPlatformBrowser } from '@angular/common';
// todo: add active event to tab
export class TabsetComponent {
    /**
     * @param {?} platformId
     * @param {?} config
     * @param {?} ripple
     * @param {?} cdRef
     * @param {?} renderer
     */
    constructor(platformId, config, ripple, cdRef, renderer) {
        this.ripple = ripple;
        this.cdRef = cdRef;
        this.renderer = renderer;
        this.tabs = [];
        this.classMap = {};
        this.isBrowser = null;
        this.clazz = true;
        this.disableWaves = false;
        this.showBsTab = new EventEmitter();
        this.shownBsTab = new EventEmitter();
        this.hideBsTab = new EventEmitter();
        this.hiddenBsTab = new EventEmitter();
        this.getActiveTab = new EventEmitter();
        this.isBrowser = isPlatformBrowser(platformId);
        Object.assign(this, config);
    }
    /**
     * if true tabs will be placed vertically
     * @return {?}
     */
    get vertical() {
        return this._vertical;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set vertical(value) {
        this._vertical = value;
        this.setClassMap();
    }
    /**
     * @param {?} index
     * @return {?}
     */
    setActiveTab(index) {
        if (this.tabs[index - 1].type !== 'content') {
            this.tabs[index - 1].active = true;
            this.getActiveTab.emit({
                el: this.tabs[index - 1],
                activeTabIndex: index - 1,
            });
            this.cdRef.detectChanges();
        }
        else {
            this.tabs[index - 1].select.emit(this.tabs[index - 1]);
        }
    }
    /**
     * if true tabs fill the container and have a consistent width
     * @return {?}
     */
    get justified() {
        return this._justified;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set justified(value) {
        this._justified = value;
        this.setClassMap();
    }
    /**
     * navigation context class: 'tabs' or 'pills'
     * @return {?}
     */
    get type() {
        return this._type;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        this._type = value;
        this.setClassMap();
    }
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    click(event, index) {
        /** @type {?} */
        const prev = this.tabEl.toArray()[this.getActive()];
        /** @type {?} */
        const clicked = this.tabEl.toArray()[index];
        this.hideBsTab.emit({
            target: clicked,
            relatedTarget: prev,
        });
        this.showBsTab.emit({
            target: clicked,
            relatedTarget: prev,
        });
        this.setActiveTab(index + 1);
        if (this.contentClass !== 'vertical' && !this.disableWaves) {
            this.ripple.el = clicked;
            this.ripple.click(event);
        }
        this.hiddenBsTab.emit({
            target: clicked,
            relatedTarget: prev,
        });
        this.shownBsTab.emit({
            target: clicked,
            relatedTarget: prev,
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.isDestroyed = true;
    }
    // public getActive() {
    /**
     * @return {?}
     */
    getActive() {
        /** @type {?} */
        const tabs = this.tabs.map((/**
         * @param {?} object
         * @param {?} index
         * @return {?}
         */
        (object, index) => {
            return {
                index: index,
                object: object,
            };
        }));
        for (const tab of tabs) {
            if (tab.object.active) {
                return tab.index;
            }
        }
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    addTab(tab) {
        /** @type {?} */
        const insertPos = this.tabs.findIndex((/**
         * @param {?} aTab
         * @return {?}
         */
        aTab => aTab.tabOrder > tab.tabOrder));
        if (insertPos >= 0) {
            this.tabs.splice(insertPos, 0, tab);
        }
        else {
            this.tabs.push(tab);
        }
        tab.active = this.tabs.length === 1 && tab.active !== false;
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    removeTab(tab) {
        /** @type {?} */
        const index = this.tabs.indexOf(tab);
        if (index === -1 || this.isDestroyed) {
            return;
        }
        // Select a new tab if the tab to be removed is selected and not destroyed
        if (tab.active && this.hasAvailableTabs(index)) {
            /** @type {?} */
            const newActiveIndex = this.getClosestTabIndex(index);
            this.tabs[newActiveIndex].active = true;
        }
        tab.removed.emit(tab);
        this.tabs.splice(index, 1);
    }
    /**
     * @protected
     * @param {?} index
     * @return {?}
     */
    getClosestTabIndex(index) {
        /** @type {?} */
        const tabsLength = this.tabs.length;
        if (!tabsLength) {
            return -1;
        }
        for (let step = 1; step <= tabsLength; step += 1) {
            /** @type {?} */
            const prevIndex = index - step;
            /** @type {?} */
            const nextIndex = index + step;
            if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
                return prevIndex;
            }
            if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
                return nextIndex;
            }
        }
        return -1;
    }
    /**
     * @protected
     * @param {?} index
     * @return {?}
     */
    hasAvailableTabs(index) {
        /** @type {?} */
        const tabsLength = this.tabs.length;
        if (!tabsLength) {
            return false;
        }
        for (let i = 0; i < tabsLength; i += 1) {
            if (!this.tabs[i].disabled && i !== index) {
                return true;
            }
        }
        return false;
    }
    /**
     * @protected
     * @return {?}
     */
    setClassMap() {
        this.classMap = {
            'nav-stacked': this.vertical,
            'nav-justified': this.justified,
        };
    }
    /**
     * @return {?}
     */
    listGet() {
        if (this.vertical) {
            this.listGetClass = this.tabsButtonsClass ? this.tabsButtonsClass : 'col-md-3';
        }
        else {
            this.listGetClass = this.tabsButtonsClass ? this.tabsButtonsClass : 'col-md-12';
        }
    }
    /**
     * @return {?}
     */
    tabsGet() {
        if (this.vertical) {
            this.tabsGetClass = this.tabsContentClass ? this.tabsContentClass : 'col-md-9';
        }
        else {
            this.tabsGetClass = this.tabsContentClass ? this.tabsContentClass : 'col-md-12';
        }
    }
    /**
     * @return {?}
     */
    getActiveElement() {
        /** @type {?} */
        const tabs = this.tabs.map((/**
         * @param {?} object
         * @param {?} index
         * @return {?}
         */
        (object, index) => {
            return {
                index: index,
                object: object,
            };
        }));
        for (const tab of tabs) {
            if (tab.object.active) {
                return {
                    el: tab.object,
                    activeTabIndex: tab.index,
                };
            }
        }
    }
    /**
     * @return {?}
     */
    showActiveIndex() {
        /** @type {?} */
        const activeElement = this.getActiveElement();
        this.getActiveTab.emit(activeElement);
    }
    /**
     * @private
     * @return {?}
     */
    getFirstActiveTabIndex() {
        /** @type {?} */
        const activeTabs = this.tabs.filter((/**
         * @param {?} tab
         * @return {?}
         */
        tab => {
            return !tab.disabled;
        }));
        return this.tabs.indexOf(activeTabs[0]);
    }
    /**
     * @private
     * @return {?}
     */
    removeActiveTabs() {
        this.tabs.forEach((/**
         * @param {?} tab
         * @return {?}
         */
        tab => {
            tab.active = false;
        }));
    }
    /**
     * @return {?}
     */
    initActiveTab() {
        /** @type {?} */
        const index = this.getFirstActiveTabIndex();
        if (index === -1) {
            this.removeActiveTabs();
            return;
        }
        this.setActiveTab(index + 1);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.listGet();
        this.tabsGet();
        this.showActiveIndex();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initActiveTab();
        if (this.tabs.findIndex((/**
         * @param {?} el
         * @return {?}
         */
        el => el.type === 'content')) !== -1) {
            /** @type {?} */
            const spacer = this.renderer.createElement('li');
            /** @type {?} */
            const firstContentTypeItemIndex = this.tabs.findIndex((/**
             * @param {?} el
             * @return {?}
             */
            el => el.type === 'content'));
            this.renderer.addClass(spacer, 'nav-item');
            this.renderer.addClass(spacer, 'flex-fill');
            this.renderer.insertBefore(this.itemsList.nativeElement, spacer, this.itemsList.nativeElement.children[firstContentTypeItemIndex]);
        }
    }
}
TabsetComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-tabset',
                template: "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"{{ listGetClass }}\">\n      <ul\n        class=\"nav {{ buttonClass }}\"\n        [ngClass]=\"classMap\"\n        (click)=\"$event.preventDefault()\"\n        #itemsList\n      >\n        <li\n          *ngFor=\"let tabz of tabs; let i = index\"\n          [ngClass]=\"{\n            'ml-auto': tabz.type === 'content' && i === 0,\n            'list-group-item-action': buttonClass.includes('list-group'),\n            'nav-item': tabz.type !== 'content'\n          }\"\n          class=\"{{ tabz.customClass }}\"\n          [class.active]=\"tabz.active\"\n          [class.disabled]=\"tabz.disabled\"\n          (click)=\"click($event, i)\"\n        >\n          <span\n            class=\"d-flex flex-fill\"\n            *ngIf=\"tabs[i].type !== 'content' && tabs[i + 1] && tabs[i + 1].type === 'content'\"\n          ></span>\n          <a\n            *ngIf=\"tabz.type !== 'content'\"\n            #tabEl\n            href=\"javascript:void(0);\"\n            class=\"nav-link\"\n            [ngClass]=\"{ 'waves-light': !disableWaves }\"\n            [class.active]=\"tabz.active\"\n            [class.disabled]=\"tabz.disabled\"\n          >\n            <span [mdbNgTransclude]=\"tabz.headingRef\" [innerHTML]=\"tabz.heading\"></span>\n            <span *ngIf=\"tabz.removable\">\n              <span (click)=\"$event.preventDefault(); removeTab(tabz)\" class=\"fas fa-times ml-2\">\n              </span>\n            </span>\n          </a>\n          <a\n            *ngIf=\"tabz.type === 'content'\"\n            #tabEl\n            class=\"nav-link\"\n            [ngClass]=\"{ 'waves-light': !disableWaves }\"\n            [class.active]=\"tabz.active\"\n            [class.disabled]=\"tabz.disabled\"\n          >\n            <span [mdbNgTransclude]=\"tabz.headingRef\" [innerHTML]=\"tabz.heading\"></span>\n            <span *ngIf=\"tabz.removable\">\n              <span (click)=\"$event.preventDefault(); removeTab(tabz)\" class=\"fas fa-times ml-2\">\n              </span>\n            </span>\n          </a>\n        </li>\n      </ul>\n    </div>\n    <div class=\"{{ tabsGetClass }}\">\n      <div class=\"tab-content {{ contentClass }}\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                providers: [WavesDirective],
                styles: [".mdb-color.lighten-5{background-color:#d0d6e2!important}.mdb-color.lighten-4{background-color:#b1bace!important}.mdb-color.lighten-3{background-color:#929fba!important}.mdb-color.lighten-2{background-color:#7283a7!important}.mdb-color.lighten-1{background-color:#59698d!important}.mdb-color{background-color:#45526e!important}.mdb-color-text{color:#45526e!important}.rgba-mdb-color-slight,.rgba-mdb-color-slight:after{background-color:rgba(69,82,110,.1)}.rgba-mdb-color-light,.rgba-mdb-color-light:after{background-color:rgba(69,82,110,.3)}.rgba-mdb-color-strong,.rgba-mdb-color-strong:after{background-color:rgba(69,82,110,.7)}.mdb-color.darken-1{background-color:#3b465e!important}.mdb-color.darken-2{background-color:#2e3951!important}.mdb-color.darken-3{background-color:#1c2a48!important}.mdb-color.darken-4{background-color:#1c2331!important}.red.lighten-5{background-color:#ffebee!important}.red.lighten-4{background-color:#ffcdd2!important}.red.lighten-3{background-color:#ef9a9a!important}.red.lighten-2{background-color:#e57373!important}.red.lighten-1{background-color:#ef5350!important}.red{background-color:#f44336!important}.red-text{color:#f44336!important}.rgba-red-slight,.rgba-red-slight:after{background-color:rgba(244,67,54,.1)}.rgba-red-light,.rgba-red-light:after{background-color:rgba(244,67,54,.3)}.rgba-red-strong,.rgba-red-strong:after{background-color:rgba(244,67,54,.7)}.red.darken-1{background-color:#e53935!important}.red.darken-2{background-color:#d32f2f!important}.red.darken-3{background-color:#c62828!important}.red.darken-4{background-color:#b71c1c!important}.red.accent-1{background-color:#ff8a80!important}.red.accent-2{background-color:#ff5252!important}.red.accent-3{background-color:#ff1744!important}.red.accent-4{background-color:#d50000!important}.pink.lighten-5{background-color:#fce4ec!important}.pink.lighten-4{background-color:#f8bbd0!important}.pink.lighten-3{background-color:#f48fb1!important}.pink.lighten-2{background-color:#f06292!important}.pink.lighten-1{background-color:#ec407a!important}.pink{background-color:#e91e63!important}.pink-text{color:#e91e63!important}.rgba-pink-slight,.rgba-pink-slight:after{background-color:rgba(233,30,99,.1)}.rgba-pink-light,.rgba-pink-light:after{background-color:rgba(233,30,99,.3)}.rgba-pink-strong,.rgba-pink-strong:after{background-color:rgba(233,30,99,.7)}.pink.darken-1{background-color:#d81b60!important}.pink.darken-2{background-color:#c2185b!important}.pink.darken-3{background-color:#ad1457!important}.pink.darken-4{background-color:#880e4f!important}.pink.accent-1{background-color:#ff80ab!important}.pink.accent-2{background-color:#ff4081!important}.pink.accent-3{background-color:#f50057!important}.pink.accent-4{background-color:#c51162!important}.purple.lighten-5{background-color:#f3e5f5!important}.purple.lighten-4{background-color:#e1bee7!important}.purple.lighten-3{background-color:#ce93d8!important}.purple.lighten-2{background-color:#ba68c8!important}.purple.lighten-1{background-color:#ab47bc!important}.purple{background-color:#9c27b0!important}.purple-text{color:#9c27b0!important}.rgba-purple-slight,.rgba-purple-slight:after{background-color:rgba(156,39,176,.1)}.rgba-purple-light,.rgba-purple-light:after{background-color:rgba(156,39,176,.3)}.rgba-purple-strong,.rgba-purple-strong:after{background-color:rgba(156,39,176,.7)}.purple.darken-1{background-color:#8e24aa!important}.purple.darken-2{background-color:#7b1fa2!important}.purple.darken-3{background-color:#6a1b9a!important}.purple.darken-4{background-color:#4a148c!important}.purple.accent-1{background-color:#ea80fc!important}.purple.accent-2{background-color:#e040fb!important}.purple.accent-3{background-color:#d500f9!important}.purple.accent-4{background-color:#a0f!important}.deep-purple.lighten-5{background-color:#ede7f6!important}.deep-purple.lighten-4{background-color:#d1c4e9!important}.deep-purple.lighten-3{background-color:#b39ddb!important}.deep-purple.lighten-2{background-color:#9575cd!important}.deep-purple.lighten-1{background-color:#7e57c2!important}.deep-purple{background-color:#673ab7!important}.deep-purple-text{color:#673ab7!important}.rgba-deep-purple-slight,.rgba-deep-purple-slight:after{background-color:rgba(103,58,183,.1)}.rgba-deep-purple-light,.rgba-deep-purple-light:after{background-color:rgba(103,58,183,.3)}.rgba-deep-purple-strong,.rgba-deep-purple-strong:after{background-color:rgba(103,58,183,.7)}.deep-purple.darken-1{background-color:#5e35b1!important}.deep-purple.darken-2{background-color:#512da8!important}.deep-purple.darken-3{background-color:#4527a0!important}.deep-purple.darken-4{background-color:#311b92!important}.deep-purple.accent-1{background-color:#b388ff!important}.deep-purple.accent-2{background-color:#7c4dff!important}.deep-purple.accent-3{background-color:#651fff!important}.deep-purple.accent-4{background-color:#6200ea!important}.indigo.lighten-5{background-color:#e8eaf6!important}.indigo.lighten-4{background-color:#c5cae9!important}.indigo.lighten-3{background-color:#9fa8da!important}.indigo.lighten-2{background-color:#7986cb!important}.indigo.lighten-1{background-color:#5c6bc0!important}.indigo{background-color:#3f51b5!important}.indigo-text{color:#3f51b5!important}.rgba-indigo-slight,.rgba-indigo-slight:after{background-color:rgba(63,81,181,.1)}.rgba-indigo-light,.rgba-indigo-light:after{background-color:rgba(63,81,181,.3)}.rgba-indigo-strong,.rgba-indigo-strong:after{background-color:rgba(63,81,181,.7)}.indigo.darken-1{background-color:#3949ab!important}.indigo.darken-2{background-color:#303f9f!important}.indigo.darken-3{background-color:#283593!important}.indigo.darken-4{background-color:#1a237e!important}.indigo.accent-1{background-color:#8c9eff!important}.indigo.accent-2{background-color:#536dfe!important}.indigo.accent-3{background-color:#3d5afe!important}.indigo.accent-4{background-color:#304ffe!important}.blue.lighten-5{background-color:#e3f2fd!important}.blue.lighten-4{background-color:#bbdefb!important}.blue.lighten-3{background-color:#90caf9!important}.blue.lighten-2{background-color:#64b5f6!important}.blue.lighten-1{background-color:#42a5f5!important}.blue{background-color:#2196f3!important}.blue-text{color:#2196f3!important}.rgba-blue-slight,.rgba-blue-slight:after{background-color:rgba(33,150,243,.1)}.rgba-blue-light,.rgba-blue-light:after{background-color:rgba(33,150,243,.3)}.rgba-blue-strong,.rgba-blue-strong:after{background-color:rgba(33,150,243,.7)}.blue.darken-1{background-color:#1e88e5!important}.blue.darken-2{background-color:#1976d2!important}.blue.darken-3{background-color:#1565c0!important}.blue.darken-4{background-color:#0d47a1!important}.blue.accent-1{background-color:#82b1ff!important}.blue.accent-2{background-color:#448aff!important}.blue.accent-3{background-color:#2979ff!important}.blue.accent-4{background-color:#2962ff!important}.light-blue.lighten-5{background-color:#e1f5fe!important}.light-blue.lighten-4{background-color:#b3e5fc!important}.light-blue.lighten-3{background-color:#81d4fa!important}.light-blue.lighten-2{background-color:#4fc3f7!important}.light-blue.lighten-1{background-color:#29b6f6!important}.light-blue{background-color:#03a9f4!important}.light-blue-text{color:#03a9f4!important}.rgba-light-blue-slight,.rgba-light-blue-slight:after{background-color:rgba(3,169,244,.1)}.rgba-light-blue-light,.rgba-light-blue-light:after{background-color:rgba(3,169,244,.3)}.rgba-light-blue-strong,.rgba-light-blue-strong:after{background-color:rgba(3,169,244,.7)}.light-blue.darken-1{background-color:#039be5!important}.light-blue.darken-2{background-color:#0288d1!important}.light-blue.darken-3{background-color:#0277bd!important}.light-blue.darken-4{background-color:#01579b!important}.light-blue.accent-1{background-color:#80d8ff!important}.light-blue.accent-2{background-color:#40c4ff!important}.light-blue.accent-3{background-color:#00b0ff!important}.light-blue.accent-4{background-color:#0091ea!important}.cyan.lighten-5{background-color:#e0f7fa!important}.cyan.lighten-4{background-color:#b2ebf2!important}.cyan.lighten-3{background-color:#80deea!important}.cyan.lighten-2{background-color:#4dd0e1!important}.cyan.lighten-1{background-color:#26c6da!important}.cyan{background-color:#00bcd4!important}.cyan-text{color:#00bcd4!important}.rgba-cyan-slight,.rgba-cyan-slight:after{background-color:rgba(0,188,212,.1)}.rgba-cyan-light,.rgba-cyan-light:after{background-color:rgba(0,188,212,.3)}.rgba-cyan-strong,.rgba-cyan-strong:after{background-color:rgba(0,188,212,.7)}.cyan.darken-1{background-color:#00acc1!important}.cyan.darken-2{background-color:#0097a7!important}.cyan.darken-3{background-color:#00838f!important}.cyan.darken-4{background-color:#006064!important}.cyan.accent-1{background-color:#84ffff!important}.cyan.accent-2{background-color:#18ffff!important}.cyan.accent-3{background-color:#00e5ff!important}.cyan.accent-4{background-color:#00b8d4!important}.teal.lighten-5{background-color:#e0f2f1!important}.teal.lighten-4{background-color:#b2dfdb!important}.teal.lighten-3{background-color:#80cbc4!important}.teal.lighten-2{background-color:#4db6ac!important}.teal.lighten-1{background-color:#26a69a!important}.teal{background-color:#009688!important}.teal-text{color:#009688!important}.rgba-teal-slight,.rgba-teal-slight:after{background-color:rgba(0,150,136,.1)}.rgba-teal-light,.rgba-teal-light:after{background-color:rgba(0,150,136,.3)}.rgba-teal-strong,.rgba-teal-strong:after{background-color:rgba(0,150,136,.7)}.teal.darken-1{background-color:#00897b!important}.teal.darken-2{background-color:#00796b!important}.teal.darken-3{background-color:#00695c!important}.teal.darken-4{background-color:#004d40!important}.teal.accent-1{background-color:#a7ffeb!important}.teal.accent-2{background-color:#64ffda!important}.teal.accent-3{background-color:#1de9b6!important}.teal.accent-4{background-color:#00bfa5!important}.green.lighten-5{background-color:#e8f5e9!important}.green.lighten-4{background-color:#c8e6c9!important}.green.lighten-3{background-color:#a5d6a7!important}.green.lighten-2{background-color:#81c784!important}.green.lighten-1{background-color:#66bb6a!important}.green{background-color:#4caf50!important}.green-text{color:#4caf50!important}.rgba-green-slight,.rgba-green-slight:after{background-color:rgba(76,175,80,.1)}.rgba-green-light,.rgba-green-light:after{background-color:rgba(76,175,80,.3)}.rgba-green-strong,.rgba-green-strong:after{background-color:rgba(76,175,80,.7)}.green.darken-1{background-color:#43a047!important}.green.darken-2{background-color:#388e3c!important}.green.darken-3{background-color:#2e7d32!important}.green.darken-4{background-color:#1b5e20!important}.green.accent-1{background-color:#b9f6ca!important}.green.accent-2{background-color:#69f0ae!important}.green.accent-3{background-color:#00e676!important}.green.accent-4{background-color:#00c853!important}.light-green.lighten-5{background-color:#f1f8e9!important}.light-green.lighten-4{background-color:#dcedc8!important}.light-green.lighten-3{background-color:#c5e1a5!important}.light-green.lighten-2{background-color:#aed581!important}.light-green.lighten-1{background-color:#9ccc65!important}.light-green{background-color:#8bc34a!important}.light-green-text{color:#8bc34a!important}.rgba-light-green-slight,.rgba-light-green-slight:after{background-color:rgba(139,195,74,.1)}.rgba-light-green-light,.rgba-light-green-light:after{background-color:rgba(139,195,74,.3)}.rgba-light-green-strong,.rgba-light-green-strong:after{background-color:rgba(139,195,74,.7)}.light-green.darken-1{background-color:#7cb342!important}.light-green.darken-2{background-color:#689f38!important}.light-green.darken-3{background-color:#558b2f!important}.light-green.darken-4{background-color:#33691e!important}.light-green.accent-1{background-color:#ccff90!important}.light-green.accent-2{background-color:#b2ff59!important}.light-green.accent-3{background-color:#76ff03!important}.light-green.accent-4{background-color:#64dd17!important}.lime.lighten-5{background-color:#f9fbe7!important}.lime.lighten-4{background-color:#f0f4c3!important}.lime.lighten-3{background-color:#e6ee9c!important}.lime.lighten-2{background-color:#dce775!important}.lime.lighten-1{background-color:#d4e157!important}.lime{background-color:#cddc39!important}.lime-text{color:#cddc39!important}.rgba-lime-slight,.rgba-lime-slight:after{background-color:rgba(205,220,57,.1)}.rgba-lime-light,.rgba-lime-light:after{background-color:rgba(205,220,57,.3)}.rgba-lime-strong,.rgba-lime-strong:after{background-color:rgba(205,220,57,.7)}.lime.darken-1{background-color:#c0ca33!important}.lime.darken-2{background-color:#afb42b!important}.lime.darken-3{background-color:#9e9d24!important}.lime.darken-4{background-color:#827717!important}.lime.accent-1{background-color:#f4ff81!important}.lime.accent-2{background-color:#eeff41!important}.lime.accent-3{background-color:#c6ff00!important}.lime.accent-4{background-color:#aeea00!important}.yellow.lighten-5{background-color:#fffde7!important}.yellow.lighten-4{background-color:#fff9c4!important}.yellow.lighten-3{background-color:#fff59d!important}.yellow.lighten-2{background-color:#fff176!important}.yellow.lighten-1{background-color:#ffee58!important}.yellow{background-color:#ffeb3b!important}.yellow-text{color:#ffeb3b!important}.rgba-yellow-slight,.rgba-yellow-slight:after{background-color:rgba(255,235,59,.1)}.rgba-yellow-light,.rgba-yellow-light:after{background-color:rgba(255,235,59,.3)}.rgba-yellow-strong,.rgba-yellow-strong:after{background-color:rgba(255,235,59,.7)}.yellow.darken-1{background-color:#fdd835!important}.yellow.darken-2{background-color:#fbc02d!important}.yellow.darken-3{background-color:#f9a825!important}.yellow.darken-4{background-color:#f57f17!important}.yellow.accent-1{background-color:#ffff8d!important}.yellow.accent-2{background-color:#ff0!important}.yellow.accent-3{background-color:#ffea00!important}.yellow.accent-4{background-color:#ffd600!important}.amber.lighten-5{background-color:#fff8e1!important}.amber.lighten-4{background-color:#ffecb3!important}.amber.lighten-3{background-color:#ffe082!important}.amber.lighten-2{background-color:#ffd54f!important}.amber.lighten-1{background-color:#ffca28!important}.amber{background-color:#ffc107!important}.amber-text{color:#ffc107!important}.rgba-amber-slight,.rgba-amber-slight:after{background-color:rgba(255,193,7,.1)}.rgba-amber-light,.rgba-amber-light:after{background-color:rgba(255,193,7,.3)}.rgba-amber-strong,.rgba-amber-strong:after{background-color:rgba(255,193,7,.7)}.amber.darken-1{background-color:#ffb300!important}.amber.darken-2{background-color:#ffa000!important}.amber.darken-3{background-color:#ff8f00!important}.amber.darken-4{background-color:#ff6f00!important}.amber.accent-1{background-color:#ffe57f!important}.amber.accent-2{background-color:#ffd740!important}.amber.accent-3{background-color:#ffc400!important}.amber.accent-4{background-color:#ffab00!important}.orange.lighten-5{background-color:#fff3e0!important}.orange.lighten-4{background-color:#ffe0b2!important}.orange.lighten-3{background-color:#ffcc80!important}.orange.lighten-2{background-color:#ffb74d!important}.orange.lighten-1{background-color:#ffa726!important}.orange{background-color:#ff9800!important}.orange-text{color:#ff9800!important}.rgba-orange-slight,.rgba-orange-slight:after{background-color:rgba(255,152,0,.1)}.rgba-orange-light,.rgba-orange-light:after{background-color:rgba(255,152,0,.3)}.rgba-orange-strong,.rgba-orange-strong:after{background-color:rgba(255,152,0,.7)}.orange.darken-1{background-color:#fb8c00!important}.orange.darken-2{background-color:#f57c00!important}.orange.darken-3{background-color:#ef6c00!important}.orange.darken-4{background-color:#e65100!important}.orange.accent-1{background-color:#ffd180!important}.orange.accent-2{background-color:#ffab40!important}.orange.accent-3{background-color:#ff9100!important}.orange.accent-4{background-color:#ff6d00!important}.deep-orange.lighten-5{background-color:#fbe9e7!important}.deep-orange.lighten-4{background-color:#ffccbc!important}.deep-orange.lighten-3{background-color:#ffab91!important}.deep-orange.lighten-2{background-color:#ff8a65!important}.deep-orange.lighten-1{background-color:#ff7043!important}.deep-orange{background-color:#ff5722!important}.deep-orange-text{color:#ff5722!important}.rgba-deep-orange-slight,.rgba-deep-orange-slight:after{background-color:rgba(255,87,34,.1)}.rgba-deep-orange-light,.rgba-deep-orange-light:after{background-color:rgba(255,87,34,.3)}.rgba-deep-orange-strong,.rgba-deep-orange-strong:after{background-color:rgba(255,87,34,.7)}.deep-orange.darken-1{background-color:#f4511e!important}.deep-orange.darken-2{background-color:#e64a19!important}.deep-orange.darken-3{background-color:#d84315!important}.deep-orange.darken-4{background-color:#bf360c!important}.deep-orange.accent-1{background-color:#ff9e80!important}.deep-orange.accent-2{background-color:#ff6e40!important}.deep-orange.accent-3{background-color:#ff3d00!important}.deep-orange.accent-4{background-color:#dd2c00!important}.brown.lighten-5{background-color:#efebe9!important}.brown.lighten-4{background-color:#d7ccc8!important}.brown.lighten-3{background-color:#bcaaa4!important}.brown.lighten-2{background-color:#a1887f!important}.brown.lighten-1{background-color:#8d6e63!important}.brown{background-color:#795548!important}.brown-text{color:#795548!important}.rgba-brown-slight,.rgba-brown-slight:after{background-color:rgba(121,85,72,.1)}.rgba-brown-light,.rgba-brown-light:after{background-color:rgba(121,85,72,.3)}.rgba-brown-strong,.rgba-brown-strong:after{background-color:rgba(121,85,72,.7)}.brown.darken-1{background-color:#6d4c41!important}.brown.darken-2{background-color:#5d4037!important}.brown.darken-3{background-color:#4e342e!important}.brown.darken-4{background-color:#3e2723!important}.blue-grey.lighten-5{background-color:#eceff1!important}.blue-grey.lighten-4{background-color:#cfd8dc!important}.blue-grey.lighten-3{background-color:#b0bec5!important}.blue-grey.lighten-2{background-color:#90a4ae!important}.blue-grey.lighten-1{background-color:#78909c!important}.blue-grey{background-color:#607d8b!important}.blue-grey-text{color:#607d8b!important}.rgba-blue-grey-slight,.rgba-blue-grey-slight:after{background-color:rgba(96,125,139,.1)}.rgba-blue-grey-light,.rgba-blue-grey-light:after{background-color:rgba(96,125,139,.3)}.rgba-blue-grey-strong,.rgba-blue-grey-strong:after{background-color:rgba(96,125,139,.7)}.blue-grey.darken-1{background-color:#546e7a!important}.blue-grey.darken-2{background-color:#455a64!important}.blue-grey.darken-3{background-color:#37474f!important}.blue-grey.darken-4{background-color:#263238!important}.grey.lighten-5{background-color:#fafafa!important}.grey.lighten-4{background-color:#f5f5f5!important}.grey.lighten-3{background-color:#eee!important}.grey.lighten-2{background-color:#e0e0e0!important}.grey.lighten-1{background-color:#bdbdbd!important}.grey{background-color:#9e9e9e!important}.grey-text{color:#9e9e9e!important}.rgba-grey-slight,.rgba-grey-slight:after{background-color:rgba(158,158,158,.1)}.md-pills .nav-link:hover,.md-pills .nav-link:hover:after,.rgba-grey-light,.rgba-grey-light:after,mdb-tabset .white li .nav-link:hover,mdb-tabset .white li .nav-link:hover:after{background-color:rgba(158,158,158,.3)}.rgba-grey-strong,.rgba-grey-strong:after{background-color:rgba(158,158,158,.7)}.grey.darken-1{background-color:#757575!important}.grey.darken-2{background-color:#616161!important}.grey.darken-3{background-color:#424242!important}.grey.darken-4{background-color:#212121!important}.black{background-color:#000!important}.black-text{color:#000!important}.rgba-black-slight,.rgba-black-slight:after{background-color:rgba(0,0,0,.1)}.rgba-black-light,.rgba-black-light:after{background-color:rgba(0,0,0,.3)}.rgba-black-strong,.rgba-black-strong:after{background-color:rgba(0,0,0,.7)}.white{background-color:#fff!important}.white-text{color:#fff!important}.rgba-white-slight,.rgba-white-slight:after{background-color:rgba(255,255,255,.1)}.rgba-white-light,.rgba-white-light:after{background-color:rgba(255,255,255,.3)}.rgba-white-strong,.rgba-white-strong:after{background-color:rgba(255,255,255,.7)}.rgba-stylish-slight{background-color:rgba(62,69,81,.1)}.rgba-stylish-light{background-color:rgba(62,69,81,.3)}.rgba-stylish-strong{background-color:rgba(62,69,81,.7)}.primary-color{background-color:#4285f4!important}.primary-color-dark{background-color:#0d47a1!important}.secondary-color{background-color:#a6c!important}.secondary-color-dark{background-color:#93c!important}.default-color{background-color:#2bbbad!important}.default-color-dark{background-color:#00695c!important}.info-color{background-color:#33b5e5!important}.info-color-dark{background-color:#09c!important}.success-color{background-color:#00c851!important}.success-color-dark{background-color:#007e33!important}.warning-color{background-color:#fb3!important}.warning-color-dark{background-color:#f80!important}.danger-color{background-color:#ff3547!important}.danger-color-dark{background-color:#c00!important}.elegant-color{background-color:#2e2e2e!important}.elegant-color-dark{background-color:#212121!important}.stylish-color{background-color:#4b515d!important}.stylish-color-dark{background-color:#3e4551!important}.unique-color{background-color:#3f729b!important}.unique-color-dark{background-color:#1c2331!important}.special-color{background-color:#37474f!important}.special-color-dark{background-color:#263238!important}.purple-gradient{background:linear-gradient(40deg,#ff6ec4,#7873f5)!important}.peach-gradient{background:linear-gradient(40deg,#ffd86f,#fc6262)!important}.aqua-gradient{background:linear-gradient(40deg,#2096ff,#05ffa3)!important}.blue-gradient{background:linear-gradient(40deg,#45cafc,#303f9f)!important}.purple-gradient-rgba{background:linear-gradient(40deg,rgba(255,110,196,.9),rgba(120,115,245,.9))!important}.peach-gradient-rgba{background:linear-gradient(40deg,rgba(255,216,111,.9),rgba(252,98,98,.9))!important}.aqua-gradient-rgba{background:linear-gradient(40deg,rgba(32,150,255,.9),rgba(5,255,163,.9))!important}.blue-gradient-rgba{background:linear-gradient(40deg,rgba(69,202,252,.9),rgba(48,63,159,.9))!important}.dark-grey-text,.dark-grey-text:focus,.dark-grey-text:hover{color:#4f4f4f!important}.hoverable{box-shadow:none;transition:.55s ease-in-out}.hoverable:hover{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);transition:.55s ease-in-out}.z-depth-0{box-shadow:none!important}.z-depth-1,mdb-tabset .white .active a{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)!important}.z-depth-1-half,mdb-tabset .white .active:hover{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)!important}.z-depth-2{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)!important}.z-depth-3{box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19)!important}.z-depth-4{box-shadow:0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)!important}.z-depth-5{box-shadow:0 27px 24px 0 rgba(0,0,0,.2),0 40px 77px 0 rgba(0,0,0,.22)!important}.disabled,:disabled{pointer-events:none!important}a{cursor:pointer;text-decoration:none;color:#0275d8;transition:.2s ease-in-out}a:hover{text-decoration:none;color:#014c8c;transition:.2s ease-in-out}a.disabled:hover,a:disabled:hover{color:#0275d8}a:not([href]):not([tabindex]),a:not([href]):not([tabindex]):focus,a:not([href]):not([tabindex]):hover{color:inherit;text-decoration:none}.md-tabs{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border:0;padding:.7rem;margin-left:1rem;margin-right:1rem;margin-bottom:-20px;background-color:#2bbbad;z-index:1;position:relative;border-radius:.125rem;overflow-y:hidden;display:flex;flex-direction:column}.md-tabs .nav-item+.nav-item{margin-left:0}.md-tabs .nav-item.disabled{pointer-events:none!important}.md-tabs .nav-item.disabled .nav-link{color:#6c757d}.md-tabs .nav-link{transition:.4s;border:0;color:#fff}.md-tabs .nav-item.open .nav-link,.md-tabs .nav-link.active{background-color:rgba(0,0,0,.2);color:#fff;transition:1s;border-radius:.125rem}.md-tabs .nav-item.show .nav-link{background-color:#2bbbad;color:#fff;transition:1s;border-radius:.125rem}.md-tabs .nav-item.show .nav-link.dropdown-toggle{background-color:rgba(0,0,0,.2)}.tab-content{padding:2rem 1rem 1rem;box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}.tab-content.vertical{padding-top:0}.md-pills{border:0}.md-pills li{padding:.6rem}.md-pills .show>.nav-link{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);color:#fff;background-color:#2bbbad}.md-pills .nav-link{transition:.4s;border-radius:2px;color:#666;text-align:center}.md-pills .nav-link.active{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);color:#fff;background-color:#2bbbad}.md-pills .nav-link.active:hover{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)}ul.pills-primary{padding:0}.pills-primary .nav-link.active,.pills-primary .show>.nav-link,.tabs-primary{background-color:#4285f4!important}ul.pills-danger{padding:0}.pills-danger .nav-link.active,.pills-danger .show>.nav-link,.tabs-danger{background-color:#ff3547!important}ul.pills-warning{padding:0}.pills-warning .nav-link.active,.pills-warning .show>.nav-link,.tabs-warning{background-color:#fb3!important}ul.pills-success{padding:0}.pills-success .nav-link.active,.pills-success .show>.nav-link,.tabs-success{background-color:#00c851!important}ul.pills-info{padding:0}.pills-info .nav-link.active,.pills-info .show>.nav-link,.tabs-info{background-color:#33b5e5!important}ul.pills-default{padding:0}.pills-default .nav-link.active,.pills-default .show>.nav-link,.tabs-default{background-color:#2bbbad!important}ul.pills-secondary{padding:0}.pills-secondary .nav-link.active,.pills-secondary .show>.nav-link,.tabs-secondary{background-color:#a6c!important}ul.pills-elegant{padding:0}.pills-elegant .nav-link.active,.pills-elegant .show>.nav-link,.tabs-elegant{background-color:#2e2e2e!important}ul.pills-unique{padding:0}.pills-unique .nav-link.active,.pills-unique .show>.nav-link,.tabs-unique{background-color:#880e4f!important}ul.pills-dark-green{padding:0}.pills-dark-green .nav-link.active,.pills-dark-green .show>.nav-link,.tabs-dark-green{background-color:#388e3c!important}ul.pills-mdb-color{padding:0}.pills-mdb-color .nav-link.active,.pills-mdb-color .show>.nav-link,.tabs-mdb-color{background-color:#59698d!important}ul.pills-red{padding:0}.pills-red .nav-link.active,.pills-red .show>.nav-link,.tabs-red{background-color:#d32f2f!important}ul.pills-pink{padding:0}.pills-pink .nav-link.active,.pills-pink .show>.nav-link,.tabs-pink{background-color:#ec407a!important}ul.pills-purple{padding:0}.pills-purple .nav-link.active,.pills-purple .show>.nav-link,.tabs-purple{background-color:#8e24aa!important}ul.pills-deep-purple{padding:0}.pills-deep-purple .nav-link.active,.pills-deep-purple .show>.nav-link,.tabs-deep-purple{background-color:#512da8!important}ul.pills-indigo{padding:0}.pills-indigo .nav-link.active,.pills-indigo .show>.nav-link,.tabs-indigo{background-color:#3f51b5!important}ul.pills-blue{padding:0}.pills-blue .nav-link.active,.pills-blue .show>.nav-link,.tabs-blue{background-color:#1976d2!important}ul.pills-light-blue{padding:0}.pills-light-blue .nav-link.active,.pills-light-blue .show>.nav-link,.tabs-light-blue{background-color:#82b1ff!important}ul.pills-cyan{padding:0}.pills-cyan .nav-link.active,.pills-cyan .show>.nav-link,.tabs-cyan{background-color:#00bcd4!important}ul.pills-teal{padding:0}.pills-teal .nav-link.active,.pills-teal .show>.nav-link,.tabs-teal{background-color:#00796b!important}ul.pills-green{padding:0}.pills-green .nav-link.active,.pills-green .show>.nav-link,.tabs-green{background-color:#388e3c!important}ul.pills-light-green{padding:0}.pills-light-green .nav-link.active,.pills-light-green .show>.nav-link,.tabs-light-green{background-color:#8bc34a!important}ul.pills-lime{padding:0}.pills-lime .nav-link.active,.pills-lime .show>.nav-link,.tabs-lime{background-color:#afb42b!important}ul.pills-yellow{padding:0}.pills-yellow .nav-link.active,.pills-yellow .show>.nav-link,.tabs-yellow{background-color:#fbc02d!important}ul.pills-amber{padding:0}.pills-amber .nav-link.active,.pills-amber .show>.nav-link,.tabs-amber{background-color:#ffa000!important}ul.pills-orange{padding:0}.pills-orange .nav-link.active,.pills-orange .show>.nav-link,.tabs-orange{background-color:#f57c00!important}ul.pills-deep-orange{padding:0}.pills-deep-orange .nav-link.active,.pills-deep-orange .show>.nav-link,.tabs-deep-orange{background-color:#ff7043!important}ul.pills-brown{padding:0}.pills-brown .nav-link.active,.pills-brown .show>.nav-link,.tabs-brown{background-color:#795548!important}ul.pills-grey{padding:0}.pills-grey .nav-link.active,.pills-grey .show>.nav-link,.tabs-grey{background-color:#616161!important}ul.pills-blue-grey{padding:0}.pills-blue-grey .nav-link.active,.pills-blue-grey .show>.nav-link,.tabs-blue-grey{background-color:#78909c!important}ul.pills-dark{padding:0}.pills-dark .nav-link.active,.pills-dark .show>.nav-link,.tabs-dark{background-color:#212121!important}ul.pills-light{padding:0}.pills-light .nav-link.active,.pills-light .show>.nav-link,.tabs-light{background-color:#e0e0e0!important}ul.pills-white{padding:0}.pills-white .nav-link.active,.pills-white .show>.nav-link,.tabs-white{background-color:#fff!important}ul.pills-black{padding:0}.pills-black .nav-link.active,.pills-black .show>.nav-link,.tabs-black{background-color:#000!important}.classic-tabs .nav{white-space:nowrap;overflow-x:auto;position:relative;border-radius:.3rem .3rem 0 0}@media (min-width:62rem){.classic-tabs .nav{overflow-x:hidden}}.classic-tabs .nav li a{display:block;padding:20px 24px;font-size:13px;text-transform:uppercase;color:rgba(255,255,255,.7);text-align:center;border-radius:0}.classic-tabs .nav li a:not(.active){margin-bottom:3px}.classic-tabs .nav li a.active{border-bottom:3px solid;color:#fff}@media (min-width:62em){.classic-tabs .nav li:first-child{margin-left:56px}}.classic-tabs .nav.tabs-cyan li a.active{border-color:#ffeb3b}.classic-tabs .nav.tabs-orange li a.active{border-color:#e53935}.classic-tabs .nav.tabs-grey li a.active{border-color:#fff}.classic-tabs .nav.tabs-pink li a.active{border-color:#673ab7}.classic-tabs .nav.tabs-green li a.active{border-color:#1565c0}.classic-tabs .nav.tabs-primary li a.active{border-color:#fff}.classic-tabs .nav.tabs-animated li a.active{border:none}.classic-tabs .nav.tabs-animated.tabs-cyan .floor{background-color:#ffeb3b}.classic-tabs .nav.tabs-animated.tabs-orange .floor{background-color:#e53935}.classic-tabs .nav.tabs-animated.tabs-grey .floor{background-color:#fff}.classic-tabs .nav.tabs-animated.tabs-pink .floor{background-color:#673ab7}.classic-tabs .nav.tabs-animated.tabs-green .floor{background-color:#1565c0}.classic-tabs .nav.tabs-animated.tabs-primary .floor{background-color:#fff}.classic-tabs .nav.tabs-animated .floor{display:inline-block;width:30px;height:3px;position:absolute;z-index:1200;bottom:0;transition:.4s linear}.classic-tabs .tab-content.card{border-top-left-radius:0;border-top-right-radius:0}@media screen and (min-width:768px){.md-tabs{flex-direction:row}}.md-tabs .nav-item{flex-basis:0;flex-grow:1;text-align:center;margin-bottom:0}.md-tabs .nav-item a{width:100%}.tab-control{background-color:transparent;border:0;padding-left:10px;padding-right:10px;cursor:pointer}.tab-control-icon{color:#fff}.tab-control-icon.disabled{color:#e0e0e0}mdb-tabset .white{box-shadow:0 0 0 0 transparent,0 4px 15px 0 transparent!important}mdb-tabset .white li{margin:0 1em!important}mdb-tabset .white li .nav-link.active{transition:.4s!important}mdb-tabset .white li .nav-link{color:#666!important}mdb-tabset .white .active a{color:#fff!important}mdb-tabset .margin li{margin:.5em!important}.classic-tabs{white-space:normal}.classic-tabs .nav.classic-tabs{margin:0 5px;overflow-x:auto;white-space:nowrap}.classic-tabs .tab-content{margin:0 5px 5px;padding-top:0}@media all and (min-width:992px){.classic-tabs .nav li:last-child{margin-right:56px}}.classic-tabs .nav li:hover{color:rgba(255,255,255,.7)}.nav-stacked{display:flex;flex-direction:column}"]
            }] }
];
/** @nocollapse */
TabsetComponent.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: TabsetConfig },
    { type: WavesDirective },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
TabsetComponent.propDecorators = {
    clazz: [{ type: HostBinding, args: ['class.tab-container',] }],
    disableWaves: [{ type: Input }],
    buttonClass: [{ type: Input }],
    contentClass: [{ type: Input }],
    tabsButtonsClass: [{ type: Input }],
    tabsContentClass: [{ type: Input }],
    itemsList: [{ type: ViewChild, args: ['itemsList', { static: true },] }],
    tabEl: [{ type: ViewChildren, args: ['tabEl', { read: ElementRef },] }],
    showBsTab: [{ type: Output }],
    shownBsTab: [{ type: Output }],
    hideBsTab: [{ type: Output }],
    hiddenBsTab: [{ type: Output }],
    getActiveTab: [{ type: Output }],
    vertical: [{ type: Input }],
    justified: [{ type: Input }],
    type: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    TabsetComponent.prototype.tabs;
    /** @type {?} */
    TabsetComponent.prototype.classMap;
    /**
     * @type {?}
     * @protected
     */
    TabsetComponent.prototype.isDestroyed;
    /**
     * @type {?}
     * @protected
     */
    TabsetComponent.prototype._vertical;
    /**
     * @type {?}
     * @protected
     */
    TabsetComponent.prototype._justified;
    /**
     * @type {?}
     * @protected
     */
    TabsetComponent.prototype._type;
    /** @type {?} */
    TabsetComponent.prototype.listGetClass;
    /** @type {?} */
    TabsetComponent.prototype.tabsGetClass;
    /** @type {?} */
    TabsetComponent.prototype.isBrowser;
    /** @type {?} */
    TabsetComponent.prototype.clazz;
    /** @type {?} */
    TabsetComponent.prototype.disableWaves;
    /** @type {?} */
    TabsetComponent.prototype.buttonClass;
    /** @type {?} */
    TabsetComponent.prototype.contentClass;
    /** @type {?} */
    TabsetComponent.prototype.tabsButtonsClass;
    /** @type {?} */
    TabsetComponent.prototype.tabsContentClass;
    /** @type {?} */
    TabsetComponent.prototype.itemsList;
    /** @type {?} */
    TabsetComponent.prototype.tabEl;
    /** @type {?} */
    TabsetComponent.prototype.showBsTab;
    /** @type {?} */
    TabsetComponent.prototype.shownBsTab;
    /** @type {?} */
    TabsetComponent.prototype.hideBsTab;
    /** @type {?} */
    TabsetComponent.prototype.hiddenBsTab;
    /** @type {?} */
    TabsetComponent.prototype.getActiveTab;
    /** @type {?} */
    TabsetComponent.prototype.ripple;
    /**
     * @type {?}
     * @private
     */
    TabsetComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    TabsetComponent.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vdGFicy1waWxscy90YWJzZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxNQUFNLEVBQ04sS0FBSyxFQUdMLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLEVBQ1osaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDekUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBVXBELE1BQU0sT0FBTyxlQUFlOzs7Ozs7OztJQWtGMUIsWUFDdUIsVUFBa0IsRUFDdkMsTUFBb0IsRUFDYixNQUFzQixFQUNyQixLQUF3QixFQUN4QixRQUFtQjtRQUZwQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUNyQixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBdEZ0QixTQUFJLEdBQW1CLEVBQUUsQ0FBQztRQUMxQixhQUFRLEdBQVEsRUFBRSxDQUFDO1FBVTFCLGNBQVMsR0FBUSxJQUFJLENBQUM7UUFDcUIsVUFBSyxHQUFHLElBQUksQ0FBQztRQUUvQyxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQVU5QixjQUFTLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFdkQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRXhELGNBQVMsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUV2RCxnQkFBVyxHQUFzQixJ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LG9DQUN1RDs7SUFDdkQscUNBQ3dEOztJQUN4RCxvQ0FDdUQ7O0lBQ3ZELHNDQUN5RDs7SUFDekQsdUNBQzBEOztJQW9EeEQsaUNBQTZCOzs7OztJQUM3QixnQ0FBZ0M7Ozs7O0lBQ2hDLG1DQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRhYkRpcmVjdGl2ZSB9IGZyb20gJy4vdGFiLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUYWJzZXRDb25maWcgfSBmcm9tICcuL3RhYnNldC5jb25maWcnO1xuXG5pbXBvcnQgeyBXYXZlc0RpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2ZyZWUvd2F2ZXMvd2F2ZXMtZWZmZWN0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8vIHRvZG86IGFkZCBhY3RpdmUgZXZlbnQgdG8gdGFiXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItdGFic2V0JyxcbiAgdGVtcGxhdGVVcmw6ICd0YWJzZXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90YWJzLXBpbGxzLW1vZHVsZS5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByb3ZpZGVyczogW1dhdmVzRGlyZWN0aXZlXSxcbn0pXG5leHBvcnQgY2xhc3MgVGFic2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBwdWJsaWMgdGFiczogVGFiRGlyZWN0aXZlW10gPSBbXTtcbiAgcHVibGljIGNsYXNzTWFwOiBhbnkgPSB7fTtcblxuICBwcm90ZWN0ZWQgaXNEZXN0cm95ZWQ6IGJvb2xlYW47XG4gIHByb3RlY3RlZCBfdmVydGljYWw6IGJvb2xlYW47XG4gIHByb3RlY3RlZCBfanVzdGlmaWVkOiBib29sZWFuO1xuICBwcm90ZWN0ZWQgX3R5cGU6IHN0cmluZztcblxuICBwdWJsaWMgbGlzdEdldENsYXNzOiBTdHJpbmc7XG4gIHB1YmxpYyB0YWJzR2V0Q2xhc3M6IFN0cmluZztcblxuICBpc0Jyb3dzZXI6IGFueSA9IG51bGw7XG4gIEBIb3N0QmluZGluZygnY2xhc3MudGFiLWNvbnRhaW5lcicpIHB1YmxpYyBjbGF6eiA9IHRydWU7XG5cbiAgQElucHV0KCkgZGlzYWJsZVdhdmVzID0gZmFsc2U7XG4gIEBJbnB1dCgpIGJ1dHRvbkNsYXNzOiBTdHJpbmc7XG4gIEBJbnB1dCgpIGNvbnRlbnRDbGFzczogU3RyaW5nO1xuICBASW5wdXQoKSB0YWJzQnV0dG9uc0NsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRhYnNDb250ZW50Q2xhc3M6IHN0cmluZztcblxuICBAVmlld0NoaWxkKCdpdGVtc0xpc3QnLCB7IHN0YXRpYzogdHJ1ZSB9KSBpdGVtc0xpc3Q6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGRyZW4oJ3RhYkVsJywgeyByZWFkOiBFbGVtZW50UmVmIH0pIHRhYkVsOiBhbnk7XG5cbiAgQE91dHB1dCgpXG4gIHNob3dCc1RhYjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpXG4gIHNob3duQnNUYWI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKVxuICBoaWRlQnNUYWI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKVxuICBoaWRkZW5Cc1RhYjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpXG4gIGdldEFjdGl2ZVRhYjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKiogaWYgdHJ1ZSB0YWJzIHdpbGwgYmUgcGxhY2VkIHZlcnRpY2FsbHkgKi9cbiAgQElucHV0KClcbiAgcHVibGljIGdldCB2ZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmVydGljYWw7XG4gIH1cblxuICBwdWJsaWMgc2V0IHZlcnRpY2FsKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fdmVydGljYWwgPSB2YWx1ZTtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0QWN0aXZlVGFiKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50YWJzW2luZGV4IC0gMV0udHlwZSAhPT0gJ2NvbnRlbnQnKSB7XG4gICAgICB0aGlzLnRhYnNbaW5kZXggLSAxXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgdGhpcy5nZXRBY3RpdmVUYWIuZW1pdCh7XG4gICAgICAgIGVsOiB0aGlzLnRhYnNbaW5kZXggLSAxXSxcbiAgICAgICAgYWN0aXZlVGFiSW5kZXg6IGluZGV4IC0gMSxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50YWJzW2luZGV4IC0gMV0uc2VsZWN0LmVtaXQodGhpcy50YWJzW2luZGV4IC0gMV0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBpZiB0cnVlIHRhYnMgZmlsbCB0aGUgY29udGFpbmVyIGFuZCBoYXZlIGEgY29uc2lzdGVudCB3aWR0aCAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IGp1c3RpZmllZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fanVzdGlmaWVkO1xuICB9XG5cbiAgcHVibGljIHNldCBqdXN0aWZpZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9qdXN0aWZpZWQgPSB2YWx1ZTtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICAvKiogbmF2aWdhdGlvbiBjb250ZXh0IGNsYXNzOiAndGFicycgb3IgJ3BpbGxzJyAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgdHlwZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdHlwZSA9IHZhbHVlO1xuICAgIHRoaXMuc2V0Q2xhc3NNYXAoKTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBzdHJpbmcsXG4gICAgY29uZmlnOiBUYWJzZXRDb25maWcsXG4gICAgcHVibGljIHJpcHBsZTogV2F2ZXNEaXJlY3RpdmUsXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHRoaXMuaXNCcm93c2VyID0gaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcpO1xuICB9XG5cbiAgcHVibGljIGNsaWNrKGV2ZW50OiBhbnksIGluZGV4OiBhbnkpIHtcbiAgICBjb25zdCBwcmV2ID0gdGhpcy50YWJFbC50b0FycmF5KClbdGhpcy5nZXRBY3RpdmUoKV07XG4gICAgY29uc3QgY2xpY2tlZCA9IHRoaXMudGFiRWwudG9BcnJheSgpW2luZGV4XTtcblxuICAgIHRoaXMuaGlkZUJzVGFiLmVtaXQoe1xuICAgICAgdGFyZ2V0OiBjbGlja2VkLFxuICAgICAgcmVsYXRlZFRhcmdldDogcHJldixcbiAgICB9KTtcbiAgICB0aGlzLnNob3dCc1RhYi5lbWl0KHtcbiAgICAgIHRhcmdldDogY2xpY2tlZCxcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IHByZXYsXG4gICAgfSk7XG5cbiAgICB0aGlzLnNldEFjdGl2ZVRhYihpbmRleCArIDEpO1xuXG4gICAgaWYgKHRoaXMuY29udGVudENsYXNzICE9PSAndmVydGljYWwnICYmICF0aGlzLmRpc2FibGVXYXZlcykge1xuICAgICAgdGhpcy5yaXBwbGUuZWwgPSBjbGlja2VkO1xuICAgICAgdGhpcy5yaXBwbGUuY2xpY2soZXZlbnQpO1xuICAgIH1cblxuICAgIHRoaXMuaGlkZGVuQnNUYWIuZW1pdCh7XG4gICAgICB0YXJnZXQ6IGNsaWNrZWQsXG4gICAgICByZWxhdGVkVGFyZ2V0OiBwcmV2LFxuICAgIH0pO1xuICAgIHRoaXMuc2hvd25Cc1RhYi5lbWl0KHtcbiAgICAgIHRhcmdldDogY2xpY2tlZCxcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IHByZXYsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5pc0Rlc3Ryb3llZCA9IHRydWU7XG4gIH1cblxuICAvLyBwdWJsaWMgZ2V0QWN0aXZlKCkge1xuICBwdWJsaWMgZ2V0QWN0aXZlKCk6IGFueSB7XG4gICAgY29uc3QgdGFicyA9IHRoaXMudGFicy5tYXAoKG9iamVjdCwgaW5kZXgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgb2JqZWN0OiBvYmplY3QsXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgZm9yIChjb25zdCB0YWIgb2YgdGFicykge1xuICAgICAgaWYgKHRhYi5vYmplY3QuYWN0aXZlKSB7XG4gICAgICAgIHJldHVybiB0YWIuaW5kZXg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFRhYih0YWI6IFRhYkRpcmVjdGl2ZSk6IHZvaWQge1xuICAgIGNvbnN0IGluc2VydFBvcyA9IHRoaXMudGFicy5maW5kSW5kZXgoYVRhYiA9PiBhVGFiLnRhYk9yZGVyID4gdGFiLnRhYk9yZGVyKTtcbiAgICBpZiAoaW5zZXJ0UG9zID49IDApIHtcbiAgICAgIHRoaXMudGFicy5zcGxpY2UoaW5zZXJ0UG9zLCAwLCB0YWIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRhYnMucHVzaCh0YWIpO1xuICAgIH1cbiAgICB0YWIuYWN0aXZlID0gdGhpcy50YWJzLmxlbmd0aCA9PT0gMSAmJiB0YWIuYWN0aXZlICE9PSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVUYWIodGFiOiBUYWJEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudGFicy5pbmRleE9mKHRhYik7XG4gICAgaWYgKGluZGV4ID09PSAtMSB8fCB0aGlzLmlzRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFNlbGVjdCBhIG5ldyB0YWIgaWYgdGhlIHRhYiB0byBiZSByZW1vdmVkIGlzIHNlbGVjdGVkIGFuZCBub3QgZGVzdHJveWVkXG4gICAgaWYgKHRhYi5hY3RpdmUgJiYgdGhpcy5oYXNBdmFpbGFibGVUYWJzKGluZGV4KSkge1xuICAgICAgY29uc3QgbmV3QWN0aXZlSW5kZXggPSB0aGlzLmdldENsb3Nlc3RUYWJJbmRleChpbmRleCk7XG4gICAgICB0aGlzLnRhYnNbbmV3QWN0aXZlSW5kZXhdLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdGFiLnJlbW92ZWQuZW1pdCh0YWIpO1xuICAgIHRoaXMudGFicy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldENsb3Nlc3RUYWJJbmRleChpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCB0YWJzTGVuZ3RoID0gdGhpcy50YWJzLmxlbmd0aDtcbiAgICBpZiAoIXRhYnNMZW5ndGgpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBzdGVwID0gMTsgc3RlcCA8PSB0YWJzTGVuZ3RoOyBzdGVwICs9IDEpIHtcbiAgICAgIGNvbnN0IHByZXZJbmRleCA9IGluZGV4IC0gc3RlcDtcbiAgICAgIGNvbnN0IG5leHRJbmRleCA9IGluZGV4ICsgc3RlcDtcbiAgICAgIGlmICh0aGlzLnRhYnNbcHJldkluZGV4XSAmJiAhdGhpcy50YWJzW3ByZXZJbmRleF0uZGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIHByZXZJbmRleDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnRhYnNbbmV4dEluZGV4XSAmJiAhdGhpcy50YWJzW25leHRJbmRleF0uZGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIG5leHRJbmRleDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhc0F2YWlsYWJsZVRhYnMoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHRhYnNMZW5ndGggPSB0aGlzLnRhYnMubGVuZ3RoO1xuICAgIGlmICghdGFic0xlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFic0xlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoIXRoaXMudGFic1tpXS5kaXNhYmxlZCAmJiBpICE9PSBpbmRleCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldENsYXNzTWFwKCk6IHZvaWQge1xuICAgIHRoaXMuY2xhc3NNYXAgPSB7XG4gICAgICAnbmF2LXN0YWNrZWQnOiB0aGlzLnZlcnRpY2FsLFxuICAgICAgJ25hdi1qdXN0aWZpZWQnOiB0aGlzLmp1c3RpZmllZCxcbiAgICAgIC8vIFtgbmF2LSR7dGhpcy50eXBlfWBdOiB0cnVlXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBsaXN0R2V0KCkge1xuICAgIGlmICh0aGlzLnZlcnRpY2FsKSB7XG4gICAgICB0aGlzLmxpc3RHZXRDbGFzcyA9IHRoaXMudGFic0J1dHRvbnNDbGFzcyA/IHRoaXMudGFic0J1dHRvbnNDbGFzcyA6ICdjb2wtbWQtMyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdEdldENsYXNzID0gdGhpcy50YWJzQnV0dG9uc0NsYXNzID8gdGhpcy50YWJzQnV0dG9uc0NsYXNzIDogJ2NvbC1tZC0xMic7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRhYnNHZXQoKSB7XG4gICAgaWYgKHRoaXMudmVydGljYWwpIHtcbiAgICAgIHRoaXMudGFic0dldENsYXNzID0gdGhpcy50YWJzQ29udGVudENsYXNzID8gdGhpcy50YWJzQ29udGVudENsYXNzIDogJ2NvbC1tZC05JztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50YWJzR2V0Q2xhc3MgPSB0aGlzLnRhYnNDb250ZW50Q2xhc3MgPyB0aGlzLnRhYnNDb250ZW50Q2xhc3MgOiAnY29sLW1kLTEyJztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0QWN0aXZlRWxlbWVudCgpOiBhbnkge1xuICAgIGNvbnN0IHRhYnMgPSB0aGlzLnRhYnMubWFwKChvYmplY3QsIGluZGV4KSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgIG9iamVjdDogb2JqZWN0LFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGZvciAoY29uc3QgdGFiIG9mIHRhYnMpIHtcbiAgICAgIGlmICh0YWIub2JqZWN0LmFjdGl2ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGVsOiB0YWIub2JqZWN0LFxuICAgICAgICAgIGFjdGl2ZVRhYkluZGV4OiB0YWIuaW5kZXgsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNob3dBY3RpdmVJbmRleCgpIHtcbiAgICBjb25zdCBhY3RpdmVFbGVtZW50ID0gdGhpcy5nZXRBY3RpdmVFbGVtZW50KCk7XG4gICAgdGhpcy5nZXRBY3RpdmVUYWIuZW1pdChhY3RpdmVFbGVtZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Rmlyc3RBY3RpdmVUYWJJbmRleCgpIHtcbiAgICBjb25zdCBhY3RpdmVUYWJzID0gdGhpcy50YWJzLmZpbHRlcih0YWIgPT4ge1xuICAgICAgcmV0dXJuICF0YWIuZGlzYWJsZWQ7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMudGFicy5pbmRleE9mKGFjdGl2ZVRhYnNbMF0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVBY3RpdmVUYWJzKCkge1xuICAgIHRoaXMudGFicy5mb3JFYWNoKHRhYiA9PiB7XG4gICAgICB0YWIuYWN0aXZlID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICBpbml0QWN0aXZlVGFiKCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRGaXJzdEFjdGl2ZVRhYkluZGV4KCk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgdGhpcy5yZW1vdmVBY3RpdmVUYWJzKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2V0QWN0aXZlVGFiKGluZGV4ICsgMSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmxpc3RHZXQoKTtcbiAgICB0aGlzLnRhYnNHZXQoKTtcbiAgICB0aGlzLnNob3dBY3RpdmVJbmRleCgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuaW5pdEFjdGl2ZVRhYigpO1xuXG4gICAgaWYgKHRoaXMudGFicy5maW5kSW5kZXgoZWwgPT4gZWwudHlwZSA9PT0gJ2NvbnRlbnQnKSAhPT0gLTEpIHtcbiAgICAgIGNvbnN0IHNwYWNlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGNvbnN0IGZpcnN0Q29udGVudFR5cGVJdGVtSW5kZXggPSB0aGlzLnRhYnMuZmluZEluZGV4KGVsID0+IGVsLnR5cGUgPT09ICdjb250ZW50Jyk7XG5cbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Moc3BhY2VyLCAnbmF2LWl0ZW0nKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Moc3BhY2VyLCAnZmxleC1maWxsJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmluc2VydEJlZm9yZShcbiAgICAgICAgdGhpcy5pdGVtc0xpc3QubmF0aXZlRWxlbWVudCxcbiAgICAgICAgc3BhY2VyLFxuICAgICAgICB0aGlzLml0ZW1zTGlzdC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuW2ZpcnN0Q29udGVudFR5cGVJdGVtSW5kZXhdXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19