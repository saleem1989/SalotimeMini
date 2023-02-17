/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChildren, ElementRef, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID, Renderer2, ViewChild, ViewEncapsulation, QueryList, } from '@angular/core';
import { MdbOptionComponent } from './mdb-option.component';
import { Subject, merge } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { document, window } from '../../../free/utils/facade/browser';
import { Utils } from './../../../free/utils/utils.class';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
export class MdbAutoCompleterComponent {
    /**
     * @param {?} renderer
     * @param {?} el
     * @param {?} platformId
     */
    constructor(renderer, el, platformId) {
        this.renderer = renderer;
        this.el = el;
        this.clearButton = true;
        this.clearButtonTabIndex = 0;
        this.select = new EventEmitter();
        this._destroy = new Subject();
        this.utils = new Utils();
        this._isDropdownOpen = new Subject();
        this._allItems = [];
        this._isOpen = false;
        this._selectedItemIndex = -1;
        this._selectedItemChanged = new Subject();
        this._isBrowser = false;
        this._isBrowser = isPlatformBrowser(platformId);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    windowMouseDown(event) {
        if (this.dropdown && !this.dropdown.nativeElement.contains((/** @type {?} */ (event.target)))) {
            this.hide();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _listenToOptionClick() {
        this.mdbOptions.changes
            .pipe(startWith(this.mdbOptions), switchMap((/**
         * @param {?} options
         * @return {?}
         */
        (options) => {
            return merge(...options.map((/**
             * @param {?} option
             * @return {?}
             */
            (option) => option.click$)));
        })), takeUntil(this._destroy))
            .subscribe((/**
         * @param {?} clickedOption
         * @return {?}
         */
        (clickedOption) => this._handleOptionClick(clickedOption)));
    }
    /**
     * @private
     * @param {?} option
     * @return {?}
     */
    _handleOptionClick(option) {
        this.setSelectedItem({ text: option.value, element: option });
        this.highlightRow(0);
        this.select.emit({ text: option.value, element: option });
        this.hide();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    setSelectedItem(item) {
        this._selectedItem = item;
        this._selectedItemChanged.next(this.getSelectedItem());
    }
    /**
     * @return {?}
     */
    getSelectedItem() {
        return this._selectedItem;
    }
    /**
     * @return {?}
     */
    selectedItemChanged() {
        return this._selectedItemChanged;
    }
    /**
     * @return {?}
     */
    isOpen() {
        return this._isOpen;
    }
    /**
     * @return {?}
     */
    show() {
        if (!this.disabled) {
            this._isOpen = true;
            this._isDropdownOpen.next(this.isOpen());
        }
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.dropdown && !this.appendToBody) {
                /** @type {?} */
                const modalEl = this.utils.getClosestEl(this.el.nativeElement, '.modal-dialog');
                /** @type {?} */
                const style = window.getComputedStyle(document.querySelector('.completer-dropdown'));
                /** @type {?} */
                const height = ['height', 'padding-top', 'padding-bottom', 'margin-top', 'margin-bottom']
                    .map((/**
                 * @param {?} key
                 * @return {?}
                 */
                key => parseInt(style.getPropertyValue(key), 10)))
                    .reduce((/**
                 * @param {?} prev
                 * @param {?} cur
                 * @return {?}
                 */
                (prev, cur) => prev + cur));
                /** @type {?} */
                const topRect = document.querySelector('.completer-dropdown').getBoundingClientRect().top;
                /** @type {?} */
                const bottom = modalEl ? window.innerHeight - height - topRect : this.parameters.bottom;
                /** @type {?} */
                const top = this.dropdown.nativeElement.clientHeight > bottom
                    ? `-${this.dropdown.nativeElement.clientHeight - this.parameters.inputHeight}`
                    : this.parameters.inputHeight + 3;
                this.renderer.setStyle(this.dropdown.nativeElement, 'top', top + 'px');
                this.renderer.setStyle(this.dropdown.nativeElement, 'left', 0 + 'px');
                this.renderer.setStyle(this.dropdown.nativeElement, 'width', this.parameters.width + 'px');
            }
        }), 0);
    }
    /**
     * @return {?}
     */
    hide() {
        if (!this.disabled) {
            this._isOpen = false;
            this._isDropdownOpen.next(this.isOpen());
        }
    }
    /**
     * @return {?}
     */
    isDropdownOpen() {
        return this._isDropdownOpen;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeHighlight(index) {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.optionList.forEach((/**
             * @param {?} el
             * @param {?} i
             * @return {?}
             */
            (el, i) => {
                /** @type {?} */
                const completerRow = el.nativeElement.querySelectorAll('.completer-row');
                if (i === index) {
                    this.renderer.addClass(el.nativeElement.firstElementChild, 'highlight-row');
                }
                else if (i !== index) {
                    completerRow.forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    (elem) => {
                        this.renderer.removeClass(elem, 'highlight-row');
                    }));
                }
            }));
        }), 0);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    highlightRow(index) {
        this._allItems = this.optionList
            .filter((/**
         * @param {?} el
         * @return {?}
         */
        el => el.nativeElement.firstElementChild.classList.contains('completer-row')))
            .map((/**
         * @param {?} elem
         * @return {?}
         */
        elem => elem.nativeElement));
        if (this._allItems[index]) {
            this.optionList.forEach((/**
             * @param {?} el
             * @param {?} i
             * @return {?}
             */
            (el, i) => {
                /** @type {?} */
                const completerRow = el.nativeElement.querySelectorAll('.completer-row');
                if (index === i) {
                    this.removeHighlight(index);
                    this.renderer.addClass(completerRow[completerRow.length - 1], 'highlight-row');
                }
            }));
        }
        this._selectedItemIndex = index;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    navigateUsingKeyboard(event) {
        if (this.dropdown) {
            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    this.moveHighlightedIntoView(event.key);
                    if (!this.isOpen()) {
                        this.show();
                    }
                    if (this._selectedItemIndex + 1 <= this._allItems.length - 1) {
                        this.highlightRow(++this._selectedItemIndex);
                    }
                    else if (this._selectedItemIndex + 1 === this._allItems.length) {
                        this.highlightRow(0);
                    }
                    if (this._selectedItemIndex === 0) {
                        this.highlightRow(0);
                    }
                    /** @type {?} */
                    const selectedElement = this.mdbOptions.find((/**
                     * @param {?} el
                     * @param {?} index
                     * @return {?}
                     */
                    (el, index) => el && index === this._selectedItemIndex));
                    if (selectedElement) {
                        this.select.emit({ text: selectedElement.value, element: selectedElement });
                    }
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.moveHighlightedIntoView(event.key);
                    if (this._selectedItemIndex === -1 || this._selectedItemIndex === 0) {
                        /** @type {?} */
                        const lastItemIndex = this.mdbOptions.length;
                        this.highlightRow(lastItemIndex);
                    }
                    this.highlightRow(--this._selectedItemIndex);
                    /** @type {?} */
                    const selectedItem = this.mdbOptions.find((/**
                     * @param {?} el
                     * @param {?} index
                     * @return {?}
                     */
                    (el, index) => el && index === this._selectedItemIndex));
                    this.select.emit({ text: selectedItem.value, element: selectedItem });
                    break;
                case 'Escape':
                    event.preventDefault();
                    this.hide();
                    break;
                case 'Enter':
                    event.preventDefault();
                    /** @type {?} */
                    const selectedOption = this.mdbOptions.map((/**
                     * @param {?} el
                     * @return {?}
                     */
                    el => el))[this._selectedItemIndex];
                    if (selectedOption) {
                        this.setSelectedItem({ text: selectedOption.value, element: selectedOption });
                        this.select.emit({ text: selectedOption.value, element: selectedOption });
                    }
                    this.hide();
                    break;
            }
        }
    }
    /**
     * @param {?} type
     * @return {?}
     */
    moveHighlightedIntoView(type) {
        /** @type {?} */
        let listHeight = 0;
        /** @type {?} */
        let itemIndex = this._selectedItemIndex;
        this.optionList.forEach((/**
         * @param {?} el
         * @return {?}
         */
        (el) => {
            listHeight += el.nativeElement.offsetHeight;
        }));
        if (itemIndex > -1) {
            /** @type {?} */
            let itemHeight = 0;
            this.optionList.forEach((/**
             * @param {?} el
             * @param {?} i
             * @return {?}
             */
            (el, i) => {
                if (i === itemIndex + 1) {
                    itemHeight = el.nativeElement.firstElementChild.clientHeight;
                }
            }));
            /** @type {?} */
            const itemTop = (itemIndex + 1) * itemHeight;
            /** @type {?} */
            const viewTop = this.dropdown.nativeElement.scrollTop;
            /** @type {?} */
            const viewBottom = viewTop + listHeight;
            if (type === 'ArrowDown') {
                this.renderer.setProperty(this.dropdown.nativeElement, 'scrollTop', itemTop - itemHeight);
            }
            else if (type === 'ArrowUp') {
                if (itemIndex === 0) {
                    itemIndex = this.optionList.length - 1;
                }
                else {
                    itemIndex--;
                }
                if (itemIndex === this._allItems.length - 2) {
                    this.renderer.setProperty(this.dropdown.nativeElement, 'scrollTop', viewBottom - itemHeight);
                }
                else {
                    this.renderer.setProperty(this.dropdown.nativeElement, 'scrollTop', itemIndex * itemHeight);
                }
            }
        }
    }
    /**
     * @param {?} parameters
     * @return {?}
     */
    updatePosition(parameters) {
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.dropdown) {
                /** @type {?} */
                const top = this.dropdown.nativeElement.clientHeight > parameters.bottom
                    ? parameters.top - this.dropdown.nativeElement.clientHeight
                    : parameters.top;
                this.renderer.setStyle(this.dropdown.nativeElement, 'top', top + 'px');
                this.renderer.setStyle(this.dropdown.nativeElement, 'left', parameters.left + 'px');
                this.renderer.setStyle(this.dropdown.nativeElement, 'width', parameters.width + 'px');
            }
        }), 0);
    }
    /**
     * @param {?} parameters
     * @return {?}
     */
    appendDropdown(parameters) {
        if (this._isBrowser && this.appendToBody) {
            /** @type {?} */
            const body = document.querySelector('body');
            /** @type {?} */
            const dropdown = this.el.nativeElement;
            if (body) {
                this.renderer.appendChild(body, dropdown);
                this.updatePosition(parameters);
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._listenToOptionClick();
        this.highlightRow(0);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroy.next();
        this._destroy.complete();
    }
}
MdbAutoCompleterComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-auto-completer',
                template: "<div class=\"completer-dropdown-holder\" *ngIf=\"isOpen()\">\n  <div class=\"completer-dropdown\" #dropdown [ngStyle]=\"{'pointer-events': optionList.length === 0 ? 'none': 'auto'}\">\n    <div class=\"completer-row-wrapper\">\n      <div *ngIf=\"textNoResults && optionList.length === 0 \" class=\"completer-no-results\" #noResults>{{textNoResults}}</div>\n      <ng-content #content></ng-content>\n    </div>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                exportAs: 'mdbAutoCompleter',
                styles: [".mdb-autocomplete{margin-bottom:1px}.mdb-autocomplete::-webkit-search-cancel-button,.mdb-autocomplete::-webkit-search-decoration,.mdb-autocomplete::-webkit-search-results-button,.mdb-autocomplete::-webkit-search-results-decoration{-webkit-appearance:none}button:focus{outline:0!important}button.mdb-autocomplete-clear{position:absolute;z-index:2;top:.5rem;right:0;visibility:hidden;border:none;background:0 0;cursor:pointer}button.mdb-autocomplete-clear svg{fill:#a6a6a6}.mdb-autocomplete-wrap{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);position:absolute;z-index:100;left:0;right:0;list-style-type:none;overflow-y:auto;max-height:210px;padding-left:0;background:#fff}.mdb-autocomplete-wrap li{padding:12px 15px;cursor:pointer;font-size:.875rem}.mdb-autocomplete-wrap li:hover{background:#eee}.mdb-autocomplete-wrap li.selected{background-color:#eee}.form-inline .md-form .form-control.mdb-autocomplete{width:15rem}ng2-completer .completer-dropdown-holder{margin-top:-1rem}ng2-completer .md-form label{z-index:-1}.mdb-autocomplete-clear:hover,.mdb-autocomplete:hover,mdb-auto-completer:hover{cursor:pointer}.completer-dropdown{margin-top:1px;position:absolute;left:0;right:0;width:100%;background:#fff;box-shadow:0 2px 5px rgba(0,0,0,.25);z-index:110;max-height:210px;overflow-y:auto;overflow-x:hidden}.completer-dropdown .completer-row{width:100%;display:flex;align-items:center;justify-content:space-between;padding:12px 15px;font-size:.875rem}.completer-dropdown .completer-row .completer-description{font-size:14px}.completer-dropdown .completer-row .completer-image-holder .completer-image-default{width:16px;height:16px}.completer-dropdown .completer-no-results,.completer-dropdown .completer-searching{padding:12px 15px;font-size:.875rem}.completer-selected-row{background-color:#eee}.completer-image{width:32px;height:32px;border-radius:50%}.validate-success.ng-valid .completer-input{border-bottom:1px solid #00c851!important;box-shadow:0 1px 0 0 #00c851!important}.validate-success.ng-valid .completer-holder label{color:#00c851!important}.form-submitted .validate-error.ng-invalid .completer-input,.validate-error.ng-invalid.ng-touched .completer-input{border-bottom:1px solid #f44336!important;box-shadow:0 1px 0 0 #f44336!important}.form-submitted .validate-error.ng-invalid .completer-holder label,.validate-error.ng-invalid.ng-touched .completer-holder label{color:#f44336!important}.completer-row:hover,.highlight-row{background-color:#eee}"]
            }] }
];
/** @nocollapse */
MdbAutoCompleterComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
MdbAutoCompleterComponent.propDecorators = {
    textNoResults: [{ type: Input }],
    clearButton: [{ type: Input }],
    clearButtonTabIndex: [{ type: Input }],
    appendToBody: [{ type: Input }],
    disabled: [{ type: Input }],
    select: [{ type: Output }],
    optionList: [{ type: ContentChildren, args: [MdbOptionComponent, { descendants: true, read: ElementRef },] }],
    mdbOptions: [{ type: ContentChildren, args: [MdbOptionComponent, { descendants: true },] }],
    dropdown: [{ type: ViewChild, args: ['dropdown', { static: false },] }],
    noResultsEl: [{ type: ViewChild, args: ['noResults', { static: false },] }],
    windowMouseDown: [{ type: HostListener, args: ['window:mousedown', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    MdbAutoCompleterComponent.prototype.textNoResults;
    /** @type {?} */
    MdbAutoCompleterComponent.prototype.clearButton;
    /** @type {?} */
    MdbAutoCompleterComponent.prototype.clearButtonTabIndex;
    /** @type {?} */
    MdbAutoCompleterComponent.prototype.appendToBody;
    /** @type {?} */
    MdbAutoCompleterComponent.prototype.disabled;
    /** @type {?} */
    MdbAutoCompleterComponent.prototype.select;
    /** @type {?} */
    MdbAutoCompleterComponent.prototype.optionList;
    /** @type {?} */
    MdbAutoCompleterComponent.prototype.mdbOptions;
    /** @type {?} */
    MdbAutoCompleterComponent.prototype.dropdown;
    /** @type {?} */
    MdbAutoCompleterComponent.prototype.noResultsEl;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterComponent.prototype._destroy;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterComponent.prototype.utils;
    /** @type {?} */
    MdbAutoCompleterComponent.prototype.parameters;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterComponent.prototype._isDropdownOpen;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterComponent.prototype._allItems;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterComponent.prototype._isOpen;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterComponent.prototype._selectedItemIndex;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterComponent.prototype._selectedItem;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterComponent.prototype._selectedItemChanged;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterComponent.prototype._isBrowser;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterComponent.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLWF1dG8tY29tcGxldGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vYXV0by1jb21wbGV0ZXIvY29tcG9uZW50cy9tZGItYXV0by1jb21wbGV0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsU0FBUyxHQUVWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTVELE9BQU8sRUFBYyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBU2pFLE1BQU0sT0FBTyx5QkFBeUI7Ozs7OztJQTJDcEMsWUFDVSxRQUFtQixFQUNuQixFQUFjLEVBQ0QsVUFBa0I7UUFGL0IsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBM0NmLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLHdCQUFtQixHQUFHLENBQUMsQ0FBQztRQUl2QixXQUFNLEdBQWlELElBQUksWUFBWSxFQUc3RSxDQUFDO1FBWUcsYUFBUSxHQUFHLElBQUks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QUUsVUFBVSxFQUFFO3lCQUczRSxlQUFlLFNBQUMsa0JBQWtCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO3VCQUl6RCxTQUFTLFNBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTswQkFDdkMsU0FBUyxTQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7OEJBK0J4QyxZQUFZLFNBQUMsa0JBQWtCLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7SUFsRDVDLGtEQUErQjs7SUFDL0IsZ0RBQTRCOztJQUM1Qix3REFBaUM7O0lBQ2pDLGlEQUErQjs7SUFDL0IsNkNBQTJCOztJQUUzQiwyQ0FHSzs7SUFFTCwrQ0FFRTs7SUFDRiwrQ0FFRTs7SUFFRiw2Q0FBK0Q7O0lBQy9ELGdEQUFtRTs7Ozs7SUFFbkUsNkNBQXVDOzs7OztJQUV2QywwQ0FBbUM7O0lBRW5DLCtDQU1FOzs7OztJQUVGLG9EQUEyRDs7Ozs7SUFFM0QsOENBQW1DOzs7OztJQUNuQyw0Q0FBd0I7Ozs7O0lBQ3hCLHVEQUFnQzs7Ozs7SUFDaEMsa0RBQXVDOzs7OztJQUN2Qyx5REFBZ0U7Ozs7O0lBQ2hFLCtDQUEyQjs7Ozs7SUFHekIsNkNBQTJCOzs7OztJQUMzQix1Q0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgUXVlcnlMaXN0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWRiT3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9tZGItb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJU2VsZWN0ZWRPcHRpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NlbGVjdGVkLW9wdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IGRvY3VtZW50LCB3aW5kb3cgfSBmcm9tICcuLi8uLi8uLi9mcmVlL3V0aWxzL2ZhY2FkZS9icm93c2VyJztcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi8uLi8uLi8uLi9mcmVlL3V0aWxzL3V0aWxzLmNsYXNzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1hdXRvLWNvbXBsZXRlcicsXG4gIHRlbXBsYXRlVXJsOiAnbWRiLWF1dG8tY29tcGxldGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vLi4vYXV0by1jb21wbGV0ZXItbW9kdWxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgZXhwb3J0QXM6ICdtZGJBdXRvQ29tcGxldGVyJyxcbn0pXG5leHBvcnQgY2xhc3MgTWRiQXV0b0NvbXBsZXRlckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHRleHROb1Jlc3VsdHM6IHN0cmluZztcbiAgQElucHV0KCkgY2xlYXJCdXR0b24gPSB0cnVlO1xuICBASW5wdXQoKSBjbGVhckJ1dHRvblRhYkluZGV4ID0gMDtcbiAgQElucHV0KCkgYXBwZW5kVG9Cb2R5OiBib29sZWFuO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8eyB0ZXh0OiBzdHJpbmc7IGVsZW1lbnQ6IGFueSB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIHRleHQ6IHN0cmluZztcbiAgICBlbGVtZW50OiBhbnk7XG4gIH0+KCk7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihNZGJPcHRpb25Db21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUsIHJlYWQ6IEVsZW1lbnRSZWYgfSkgb3B0aW9uTGlzdDogQXJyYXk8XG4gICAgYW55XG4gID47XG4gIEBDb250ZW50Q2hpbGRyZW4oTWRiT3B0aW9uQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG1kYk9wdGlvbnM6IFF1ZXJ5TGlzdDxcbiAgICBNZGJPcHRpb25Db21wb25lbnRcbiAgPjtcblxuICBAVmlld0NoaWxkKCdkcm9wZG93bicsIHsgc3RhdGljOiBmYWxzZSB9KSBkcm9wZG93bjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnbm9SZXN1bHRzJywgeyBzdGF0aWM6IGZhbHNlIH0pIG5vUmVzdWx0c0VsOiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgX2Rlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIHByaXZhdGUgdXRpbHM6IFV0aWxzID0gbmV3IFV0aWxzKCk7XG5cbiAgcHVibGljIHBhcmFtZXRlcnM6IHtcbiAgICBsZWZ0OiBudW1iZXI7XG4gICAgdG9wOiBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBib3R0b206IG51bWJlcjtcbiAgICBpbnB1dEhlaWdodDogbnVtYmVyO1xuICB9O1xuXG4gIHByaXZhdGUgX2lzRHJvcGRvd25PcGVuOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfYWxsSXRlbXM6IEFycmF5PGFueT4gPSBbXTtcbiAgcHJpdmF0ZSBfaXNPcGVuID0gZmFsc2U7XG4gIHByaXZhdGUgX3NlbGVjdGVkSXRlbUluZGV4ID0gLTE7XG4gIHByaXZhdGUgX3NlbGVjdGVkSXRlbTogSVNlbGVjdGVkT3B0aW9uO1xuICBwcml2YXRlIF9zZWxlY3RlZEl0ZW1DaGFuZ2VkOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHByaXZhdGUgX2lzQnJvd3NlciA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IHN0cmluZ1xuICApIHtcbiAgICB0aGlzLl9pc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzptb3VzZWRvd24nLCBbJyRldmVudCddKSB3aW5kb3dNb3VzZURvd24oZXZlbnQ6IGFueSkge1xuICAgIGlmICh0aGlzLmRyb3Bkb3duICYmICF0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSkge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuVG9PcHRpb25DbGljaygpIHtcbiAgICB0aGlzLm1kYk9wdGlvbnMuY2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCh0aGlzLm1kYk9wdGlvbnMpLFxuICAgICAgICBzd2l0Y2hNYXAoKG9wdGlvbnM6IFF1ZXJ5TGlzdDxNZGJPcHRpb25Db21wb25lbnQ+KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG1lcmdlKC4uLm9wdGlvbnMubWFwKChvcHRpb246IE1kYk9wdGlvbkNvbXBvbmVudCkgPT4gb3B0aW9uLmNsaWNrJCkpO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChjbGlja2VkT3B0aW9uOiBNZGJPcHRpb25Db21wb25lbnQpID0+IHRoaXMuX2hhbmRsZU9wdGlvbkNsaWNrKGNsaWNrZWRPcHRpb24pKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU9wdGlvbkNsaWNrKG9wdGlvbjogTWRiT3B0aW9uQ29tcG9uZW50KSB7XG4gICAgdGhpcy5zZXRTZWxlY3RlZEl0ZW0oeyB0ZXh0OiBvcHRpb24udmFsdWUsIGVsZW1lbnQ6IG9wdGlvbiB9KTtcbiAgICB0aGlzLmhpZ2hsaWdodFJvdygwKTtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KHsgdGV4dDogb3B0aW9uLnZhbHVlLCBlbGVtZW50OiBvcHRpb24gfSk7XG4gICAgdGhpcy5oaWRlKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0U2VsZWN0ZWRJdGVtKGl0ZW06IElTZWxlY3RlZE9wdGlvbikge1xuICAgIHRoaXMuX3NlbGVjdGVkSXRlbSA9IGl0ZW07XG4gICAgdGhpcy5fc2VsZWN0ZWRJdGVtQ2hhbmdlZC5uZXh0KHRoaXMuZ2V0U2VsZWN0ZWRJdGVtKCkpO1xuICB9XG5cbiAgcHVibGljIGdldFNlbGVjdGVkSXRlbSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJdGVtO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdGVkSXRlbUNoYW5nZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJdGVtQ2hhbmdlZDtcbiAgfVxuXG4gIHB1YmxpYyBpc09wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzT3BlbjtcbiAgfVxuXG4gIHB1YmxpYyBzaG93KCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5faXNPcGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2lzRHJvcGRvd25PcGVuLm5leHQodGhpcy5pc09wZW4oKSk7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZHJvcGRvd24gJiYgIXRoaXMuYXBwZW5kVG9Cb2R5KSB7XG4gICAgICAgIGNvbnN0IG1vZGFsRWwgPSB0aGlzLnV0aWxzLmdldENsb3Nlc3RFbCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICcubW9kYWwtZGlhbG9nJyk7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXBsZXRlci1kcm9wZG93bicpKTtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gWydoZWlnaHQnLCAncGFkZGluZy10b3AnLCAncGFkZGluZy1ib3R0b20nLCAnbWFyZ2luLXRvcCcsICdtYXJnaW4tYm90dG9tJ11cbiAgICAgICAgICAubWFwKGtleSA9PiBwYXJzZUludChzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKGtleSksIDEwKSlcbiAgICAgICAgICAucmVkdWNlKChwcmV2LCBjdXIpID0+IHByZXYgKyBjdXIpO1xuXG4gICAgICAgIGNvbnN0IHRvcFJlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcGxldGVyLWRyb3Bkb3duJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICBjb25zdCBib3R0b20gPSBtb2RhbEVsID8gd2luZG93LmlubmVySGVpZ2h0IC0gaGVpZ2h0IC0gdG9wUmVjdCA6IHRoaXMucGFyYW1ldGVycy5ib3R0b207XG5cbiAgICAgICAgY29uc3QgdG9wID1cbiAgICAgICAgICB0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0ID4gYm90dG9tXG4gICAgICAgICAgICA/IGAtJHt0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gdGhpcy5wYXJhbWV0ZXJzLmlucHV0SGVpZ2h0fWBcbiAgICAgICAgICAgIDogdGhpcy5wYXJhbWV0ZXJzLmlucHV0SGVpZ2h0ICsgMztcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudCwgJ3RvcCcsIHRvcCArICdweCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudCwgJ2xlZnQnLCAwICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCB0aGlzLnBhcmFtZXRlcnMud2lkdGggKyAncHgnKTtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgfVxuXG4gIHB1YmxpYyBoaWRlKCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLl9pc0Ryb3Bkb3duT3Blbi5uZXh0KHRoaXMuaXNPcGVuKCkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0Ryb3Bkb3duT3BlbigpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9pc0Ryb3Bkb3duT3BlbjtcbiAgfVxuXG4gIHJlbW92ZUhpZ2hsaWdodChpbmRleDogbnVtYmVyKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm9wdGlvbkxpc3QuZm9yRWFjaCgoZWw6IGFueSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlclJvdyA9IGVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbXBsZXRlci1yb3cnKTtcbiAgICAgICAgaWYgKGkgPT09IGluZGV4KSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhlbC5uYXRpdmVFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLCAnaGlnaGxpZ2h0LXJvdycpO1xuICAgICAgICB9IGVsc2UgaWYgKGkgIT09IGluZGV4KSB7XG4gICAgICAgICAgY29tcGxldGVyUm93LmZvckVhY2goKGVsZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhlbGVtLCAnaGlnaGxpZ2h0LXJvdycpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIGhpZ2hsaWdodFJvdyhpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWxsSXRlbXMgPSB0aGlzLm9wdGlvbkxpc3RcbiAgICAgIC5maWx0ZXIoZWwgPT4gZWwubmF0aXZlRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbXBsZXRlci1yb3cnKSlcbiAgICAgIC5tYXAoZWxlbSA9PiBlbGVtLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgaWYgKHRoaXMuX2FsbEl0ZW1zW2luZGV4XSkge1xuICAgICAgdGhpcy5vcHRpb25MaXN0LmZvckVhY2goKGVsOiBhbnksIGk6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBjb21wbGV0ZXJSb3cgPSBlbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21wbGV0ZXItcm93Jyk7XG5cbiAgICAgICAgaWYgKGluZGV4ID09PSBpKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVIaWdobGlnaHQoaW5kZXgpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoY29tcGxldGVyUm93W2NvbXBsZXRlclJvdy5sZW5ndGggLSAxXSwgJ2hpZ2hsaWdodC1yb3cnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX3NlbGVjdGVkSXRlbUluZGV4ID0gaW5kZXg7XG4gIH1cblxuICBuYXZpZ2F0ZVVzaW5nS2V5Ym9hcmQoZXZlbnQ6IGFueSkge1xuICAgIGlmICh0aGlzLmRyb3Bkb3duKSB7XG4gICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5tb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldyhldmVudC5rZXkpO1xuXG4gICAgICAgICAgaWYgKCF0aGlzLmlzT3BlbigpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXggKyAxIDw9IHRoaXMuX2FsbEl0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Um93KCsrdGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXggKyAxID09PSB0aGlzLl9hbGxJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Um93KDApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEl0ZW1JbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRSb3coMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRFbGVtZW50OiBhbnkgPSB0aGlzLm1kYk9wdGlvbnMuZmluZChcbiAgICAgICAgICAgIChlbDogYW55LCBpbmRleDogbnVtYmVyKSA9PiBlbCAmJiBpbmRleCA9PT0gdGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChzZWxlY3RlZEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0LmVtaXQoeyB0ZXh0OiBzZWxlY3RlZEVsZW1lbnQudmFsdWUsIGVsZW1lbnQ6IHNlbGVjdGVkRWxlbWVudCB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLm1vdmVIaWdobGlnaHRlZEludG9WaWV3KGV2ZW50LmtleSk7XG4gICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSXRlbUluZGV4ID09PSAtMSB8fCB0aGlzLl9zZWxlY3RlZEl0ZW1JbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc3QgbGFzdEl0ZW1JbmRleCA9IHRoaXMubWRiT3B0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFJvdyhsYXN0SXRlbUluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5oaWdobGlnaHRSb3coLS10aGlzLl9zZWxlY3RlZEl0ZW1JbmRleCk7XG5cbiAgICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW06IGFueSA9IHRoaXMubWRiT3B0aW9ucy5maW5kKFxuICAgICAgICAgICAgKGVsOiBhbnksIGluZGV4OiBudW1iZXIpID0+IGVsICYmIGluZGV4ID09PSB0aGlzLl9zZWxlY3RlZEl0ZW1JbmRleFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5zZWxlY3QuZW1pdCh7IHRleHQ6IHNlbGVjdGVkSXRlbS52YWx1ZSwgZWxlbWVudDogc2VsZWN0ZWRJdGVtIH0pO1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSB0aGlzLm1kYk9wdGlvbnMubWFwKGVsID0+IGVsKVt0aGlzLl9zZWxlY3RlZEl0ZW1JbmRleF07XG4gICAgICAgICAgaWYgKHNlbGVjdGVkT3B0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkSXRlbSh7IHRleHQ6IHNlbGVjdGVkT3B0aW9uLnZhbHVlLCBlbGVtZW50OiBzZWxlY3RlZE9wdGlvbiB9KTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0LmVtaXQoeyB0ZXh0OiBzZWxlY3RlZE9wdGlvbi52YWx1ZSwgZWxlbWVudDogc2VsZWN0ZWRPcHRpb24gfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcodHlwZTogc3RyaW5nKSB7XG4gICAgbGV0IGxpc3RIZWlnaHQgPSAwO1xuICAgIGxldCBpdGVtSW5kZXggPSB0aGlzLl9zZWxlY3RlZEl0ZW1JbmRleDtcblxuICAgIHRoaXMub3B0aW9uTGlzdC5mb3JFYWNoKChlbDogYW55KSA9PiB7XG4gICAgICBsaXN0SGVpZ2h0ICs9IGVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIH0pO1xuXG4gICAgaWYgKGl0ZW1JbmRleCA+IC0xKSB7XG4gICAgICBsZXQgaXRlbUhlaWdodCA9IDA7XG5cbiAgICAgIHRoaXMub3B0aW9uTGlzdC5mb3JFYWNoKChlbDogRWxlbWVudFJlZiwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmIChpID09PSBpdGVtSW5kZXggKyAxKSB7XG4gICAgICAgICAgaXRlbUhlaWdodCA9IGVsLm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQuY2xpZW50SGVpZ2h0O1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgaXRlbVRvcCA9IChpdGVtSW5kZXggKyAxKSAqIGl0ZW1IZWlnaHQ7XG4gICAgICBjb25zdCB2aWV3VG9wID0gdGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgIGNvbnN0IHZpZXdCb3R0b20gPSB2aWV3VG9wICsgbGlzdEhlaWdodDtcblxuICAgICAgaWYgKHR5cGUgPT09ICdBcnJvd0Rvd24nKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsVG9wJywgaXRlbVRvcCAtIGl0ZW1IZWlnaHQpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnQXJyb3dVcCcpIHtcbiAgICAgICAgaWYgKGl0ZW1JbmRleCA9PT0gMCkge1xuICAgICAgICAgIGl0ZW1JbmRleCA9IHRoaXMub3B0aW9uTGlzdC5sZW5ndGggLSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1JbmRleC0tO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW1JbmRleCA9PT0gdGhpcy5fYWxsSXRlbXMubGVuZ3RoIC0gMikge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAnc2Nyb2xsVG9wJyxcbiAgICAgICAgICAgIHZpZXdCb3R0b20gLSBpdGVtSGVpZ2h0XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgJ3Njcm9sbFRvcCcsXG4gICAgICAgICAgICBpdGVtSW5kZXggKiBpdGVtSGVpZ2h0XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVBvc2l0aW9uKHBhcmFtZXRlcnM6IHsgbGVmdDogbnVtYmVyOyB0b3A6IG51bWJlcjsgd2lkdGg6IG51bWJlcjsgYm90dG9tOiBudW1iZXIgfSkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZHJvcGRvd24pIHtcbiAgICAgICAgY29uc3QgdG9wID1cbiAgICAgICAgICB0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0ID4gcGFyYW1ldGVycy5ib3R0b21cbiAgICAgICAgICAgID8gcGFyYW1ldGVycy50b3AgLSB0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICA6IHBhcmFtZXRlcnMudG9wO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudCwgJ3RvcCcsIHRvcCArICdweCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudCwgJ2xlZnQnLCBwYXJhbWV0ZXJzLmxlZnQgKyAncHgnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHBhcmFtZXRlcnMud2lkdGggKyAncHgnKTtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBlbmREcm9wZG93bihwYXJhbWV0ZXJzOiB7IGxlZnQ6IGFueTsgdG9wOiBhbnk7IHdpZHRoOiBhbnk7IGJvdHRvbTogbnVtYmVyIH0pIHtcbiAgICBpZiAodGhpcy5faXNCcm93c2VyICYmIHRoaXMuYXBwZW5kVG9Cb2R5KSB7XG4gICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgICAgY29uc3QgZHJvcGRvd24gPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIGlmIChib2R5KSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoYm9keSwgZHJvcGRvd24pO1xuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKHBhcmFtZXRlcnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9saXN0ZW5Ub09wdGlvbkNsaWNrKCk7XG4gICAgdGhpcy5oaWdobGlnaHRSb3coMCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kZXN0cm95Lm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==