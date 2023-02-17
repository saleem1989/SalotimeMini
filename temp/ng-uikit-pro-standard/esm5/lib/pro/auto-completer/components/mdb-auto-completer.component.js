/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChildren, ElementRef, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID, Renderer2, ViewChild, ViewEncapsulation, QueryList, } from '@angular/core';
import { MdbOptionComponent } from './mdb-option.component';
import { Subject, merge } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { document, window } from '../../../free/utils/facade/browser';
import { Utils } from './../../../free/utils/utils.class';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
var MdbAutoCompleterComponent = /** @class */ (function () {
    function MdbAutoCompleterComponent(renderer, el, platformId) {
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
    MdbAutoCompleterComponent.prototype.windowMouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.dropdown && !this.dropdown.nativeElement.contains((/** @type {?} */ (event.target)))) {
            this.hide();
        }
    };
    /**
     * @private
     * @return {?}
     */
    MdbAutoCompleterComponent.prototype._listenToOptionClick = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.mdbOptions.changes
            .pipe(startWith(this.mdbOptions), switchMap((/**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            return merge.apply(void 0, tslib_1.__spread(options.map((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return option.click$; }))));
        })), takeUntil(this._destroy))
            .subscribe((/**
         * @param {?} clickedOption
         * @return {?}
         */
        function (clickedOption) { return _this._handleOptionClick(clickedOption); }));
    };
    /**
     * @private
     * @param {?} option
     * @return {?}
     */
    MdbAutoCompleterComponent.prototype._handleOptionClick = /**
     * @private
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.setSelectedItem({ text: option.value, element: option });
        this.highlightRow(0);
        this.select.emit({ text: option.value, element: option });
        this.hide();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    MdbAutoCompleterComponent.prototype.setSelectedItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this._selectedItem = item;
        this._selectedItemChanged.next(this.getSelectedItem());
    };
    /**
     * @return {?}
     */
    MdbAutoCompleterComponent.prototype.getSelectedItem = /**
     * @return {?}
     */
    function () {
        return this._selectedItem;
    };
    /**
     * @return {?}
     */
    MdbAutoCompleterComponent.prototype.selectedItemChanged = /**
     * @return {?}
     */
    function () {
        return this._selectedItemChanged;
    };
    /**
     * @return {?}
     */
    MdbAutoCompleterComponent.prototype.isOpen = /**
     * @return {?}
     */
    function () {
        return this._isOpen;
    };
    /**
     * @return {?}
     */
    MdbAutoCompleterComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.disabled) {
            this._isOpen = true;
            this._isDropdownOpen.next(this.isOpen());
        }
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.dropdown && !_this.appendToBody) {
                /** @type {?} */
                var modalEl = _this.utils.getClosestEl(_this.el.nativeElement, '.modal-dialog');
                /** @type {?} */
                var style_1 = window.getComputedStyle(document.querySelector('.completer-dropdown'));
                /** @type {?} */
                var height = ['height', 'padding-top', 'padding-bottom', 'margin-top', 'margin-bottom']
                    .map((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) { return parseInt(style_1.getPropertyValue(key), 10); }))
                    .reduce((/**
                 * @param {?} prev
                 * @param {?} cur
                 * @return {?}
                 */
                function (prev, cur) { return prev + cur; }));
                /** @type {?} */
                var topRect = document.querySelector('.completer-dropdown').getBoundingClientRect().top;
                /** @type {?} */
                var bottom = modalEl ? window.innerHeight - height - topRect : _this.parameters.bottom;
                /** @type {?} */
                var top_1 = _this.dropdown.nativeElement.clientHeight > bottom
                    ? "-" + (_this.dropdown.nativeElement.clientHeight - _this.parameters.inputHeight)
                    : _this.parameters.inputHeight + 3;
                _this.renderer.setStyle(_this.dropdown.nativeElement, 'top', top_1 + 'px');
                _this.renderer.setStyle(_this.dropdown.nativeElement, 'left', 0 + 'px');
                _this.renderer.setStyle(_this.dropdown.nativeElement, 'width', _this.parameters.width + 'px');
            }
        }), 0);
    };
    /**
     * @return {?}
     */
    MdbAutoCompleterComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this._isOpen = false;
            this._isDropdownOpen.next(this.isOpen());
        }
    };
    /**
     * @return {?}
     */
    MdbAutoCompleterComponent.prototype.isDropdownOpen = /**
     * @return {?}
     */
    function () {
        return this._isDropdownOpen;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    MdbAutoCompleterComponent.prototype.removeHighlight = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.optionList.forEach((/**
             * @param {?} el
             * @param {?} i
             * @return {?}
             */
            function (el, i) {
                /** @type {?} */
                var completerRow = el.nativeElement.querySelectorAll('.completer-row');
                if (i === index) {
                    _this.renderer.addClass(el.nativeElement.firstElementChild, 'highlight-row');
                }
                else if (i !== index) {
                    completerRow.forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) {
                        _this.renderer.removeClass(elem, 'highlight-row');
                    }));
                }
            }));
        }), 0);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    MdbAutoCompleterComponent.prototype.highlightRow = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var _this = this;
        this._allItems = this.optionList
            .filter((/**
         * @param {?} el
         * @return {?}
         */
        function (el) { return el.nativeElement.firstElementChild.classList.contains('completer-row'); }))
            .map((/**
         * @param {?} elem
         * @return {?}
         */
        function (elem) { return elem.nativeElement; }));
        if (this._allItems[index]) {
            this.optionList.forEach((/**
             * @param {?} el
             * @param {?} i
             * @return {?}
             */
            function (el, i) {
                /** @type {?} */
                var completerRow = el.nativeElement.querySelectorAll('.completer-row');
                if (index === i) {
                    _this.removeHighlight(index);
                    _this.renderer.addClass(completerRow[completerRow.length - 1], 'highlight-row');
                }
            }));
        }
        this._selectedItemIndex = index;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MdbAutoCompleterComponent.prototype.navigateUsingKeyboard = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
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
                    var selectedElement = this.mdbOptions.find((/**
                     * @param {?} el
                     * @param {?} index
                     * @return {?}
                     */
                    function (el, index) { return el && index === _this._selectedItemIndex; }));
                    if (selectedElement) {
                        this.select.emit({ text: selectedElement.value, element: selectedElement });
                    }
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.moveHighlightedIntoView(event.key);
                    if (this._selectedItemIndex === -1 || this._selectedItemIndex === 0) {
                        /** @type {?} */
                        var lastItemIndex = this.mdbOptions.length;
                        this.highlightRow(lastItemIndex);
                    }
                    this.highlightRow(--this._selectedItemIndex);
                    /** @type {?} */
                    var selectedItem = this.mdbOptions.find((/**
                     * @param {?} el
                     * @param {?} index
                     * @return {?}
                     */
                    function (el, index) { return el && index === _this._selectedItemIndex; }));
                    this.select.emit({ text: selectedItem.value, element: selectedItem });
                    break;
                case 'Escape':
                    event.preventDefault();
                    this.hide();
                    break;
                case 'Enter':
                    event.preventDefault();
                    /** @type {?} */
                    var selectedOption = this.mdbOptions.map((/**
                     * @param {?} el
                     * @return {?}
                     */
                    function (el) { return el; }))[this._selectedItemIndex];
                    if (selectedOption) {
                        this.setSelectedItem({ text: selectedOption.value, element: selectedOption });
                        this.select.emit({ text: selectedOption.value, element: selectedOption });
                    }
                    this.hide();
                    break;
            }
        }
    };
    /**
     * @param {?} type
     * @return {?}
     */
    MdbAutoCompleterComponent.prototype.moveHighlightedIntoView = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        /** @type {?} */
        var listHeight = 0;
        /** @type {?} */
        var itemIndex = this._selectedItemIndex;
        this.optionList.forEach((/**
         * @param {?} el
         * @return {?}
         */
        function (el) {
            listHeight += el.nativeElement.offsetHeight;
        }));
        if (itemIndex > -1) {
            /** @type {?} */
            var itemHeight_1 = 0;
            this.optionList.forEach((/**
             * @param {?} el
             * @param {?} i
             * @return {?}
             */
            function (el, i) {
                if (i === itemIndex + 1) {
                    itemHeight_1 = el.nativeElement.firstElementChild.clientHeight;
                }
            }));
            /** @type {?} */
            var itemTop = (itemIndex + 1) * itemHeight_1;
            /** @type {?} */
            var viewTop = this.dropdown.nativeElement.scrollTop;
            /** @type {?} */
            var viewBottom = viewTop + listHeight;
            if (type === 'ArrowDown') {
                this.renderer.setProperty(this.dropdown.nativeElement, 'scrollTop', itemTop - itemHeight_1);
            }
            else if (type === 'ArrowUp') {
                if (itemIndex === 0) {
                    itemIndex = this.optionList.length - 1;
                }
                else {
                    itemIndex--;
                }
                if (itemIndex === this._allItems.length - 2) {
                    this.renderer.setProperty(this.dropdown.nativeElement, 'scrollTop', viewBottom - itemHeight_1);
                }
                else {
                    this.renderer.setProperty(this.dropdown.nativeElement, 'scrollTop', itemIndex * itemHeight_1);
                }
            }
        }
    };
    /**
     * @param {?} parameters
     * @return {?}
     */
    MdbAutoCompleterComponent.prototype.updatePosition = /**
     * @param {?} parameters
     * @return {?}
     */
    function (parameters) {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.dropdown) {
                /** @type {?} */
                var top_2 = _this.dropdown.nativeElement.clientHeight > parameters.bottom
                    ? parameters.top - _this.dropdown.nativeElement.clientHeight
                    : parameters.top;
                _this.renderer.setStyle(_this.dropdown.nativeElement, 'top', top_2 + 'px');
                _this.renderer.setStyle(_this.dropdown.nativeElement, 'left', parameters.left + 'px');
                _this.renderer.setStyle(_this.dropdown.nativeElement, 'width', parameters.width + 'px');
            }
        }), 0);
    };
    /**
     * @param {?} parameters
     * @return {?}
     */
    MdbAutoCompleterComponent.prototype.appendDropdown = /**
     * @param {?} parameters
     * @return {?}
     */
    function (parameters) {
        if (this._isBrowser && this.appendToBody) {
            /** @type {?} */
            var body = document.querySelector('body');
            /** @type {?} */
            var dropdown = this.el.nativeElement;
            if (body) {
                this.renderer.appendChild(body, dropdown);
                this.updatePosition(parameters);
            }
        }
    };
    /**
     * @return {?}
     */
    MdbAutoCompleterComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._listenToOptionClick();
        this.highlightRow(0);
    };
    /**
     * @return {?}
     */
    MdbAutoCompleterComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroy.next();
        this._destroy.complete();
    };
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
    MdbAutoCompleterComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
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
    return MdbAutoCompleterComponent;
}());
export { MdbAutoCompleterComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLWF1dG8tY29tcGxldGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vYXV0by1jb21wbGV0ZXIvY29tcG9uZW50cy9tZGItYXV0by1jb21wbGV0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCxPQUFPLEVBQWMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRTtJQWtERSxtQ0FDVSxRQUFtQixFQUNuQixFQUFjLEVBQ0QsVUFBa0I7UUFGL0IsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBM0NmLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLHdCQUFtQixHQUFHLENBQUMsQ0FBQztRQUl2QixXQUFNLEdBQWlELElBQUksWUFBWSxFQUc3RSxDQUFDO1FBWUcsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFFL0IsVUFBSyxHQUFVLElBQUksS0FBSyxFQUFFLENBQUM7UUFVM0Isb0JBQWUsR0FBaUIsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUVuRCxjQUFTLEdBQWUsRUFBRSxDQUFDO1FBQzNCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFeEIseUJBQW9CLEdBQWlCLElBQUksT0FBTyxFQUFPLENBQUM7UUFDeEQsZUFBVSxHQUFHLEtBQUssQ0FBQztRQU96QixJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7O0lBRTZDLG1EQUFlOzs7O0lBQTdELFVBQThELEtBQVU7UUFDdEUsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLG1CQUFBLEtBQUssQ0FBQyxNQUFNLEVBQWUsQ0FBQyxFQUFFO1lBQ3ZGLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiO0lBQ0gsQ0FBQzs7Ozs7SUFFTyx3REFBb0I7Ozs7SUFBNUI7UUFBQSxpQkFVQztRQVRDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTzthQUNwQixJQUFJLENBQ0gsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFDMUIsU0FBUzs7OztRQUFDLFVBQUMsT0FBc0M7WUFDL0MsT0FBTyxLQUFLLGdDQUFJLE9BQU8sQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQyxNQUEwQixJQUFLLE9BQUEsTUFBTSxDQUFDLE1BQU0sRUFBYixDQUFhLEVBQUMsR0FBRTtRQUM5RSxDQUFDLEVBQUMsRUFDRixTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUN6QjthQUNBLFNBQVM7Ozs7UUFBQyxVQUFDLGFBQWlDLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLEVBQXRDLENBQXNDLEVBQUMsQ0FBQztJQUM5RixDQUFDOzs7Ozs7SUFFTyxzREFBa0I7Ozs7O0lBQTFCLFVBQTJCLE1BQTBCO1FBQ25ELElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFFTSxtREFBZTs7OztJQUF0QixVQUF1QixJQUFxQjtRQUMxQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7SUFFTSxtREFBZTs7O0lBQXRCO1FBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFTSx1REFBbUI7OztJQUExQjtRQUNFLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ25DLENBQUM7Ozs7SUFFTSwwQ0FBTTs7O0lBQWI7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVNLHdDQUFJOzs7SUFBWDtRQUFBLGlCQTBCQztRQXpCQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUMxQztRQUNELFVBQVU7OztRQUFDO1lBQ1QsSUFBSSxLQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksRUFBRTs7b0JBQ2pDLE9BQU8sR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxlQUFlLENBQUM7O29CQUN6RSxPQUFLLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQzs7b0JBQzlFLE1BQU0sR0FBRyxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLGVBQWUsQ0FBQztxQkFDdEYsR0FBRzs7OztnQkFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxPQUFLLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQXpDLENBQXlDLEVBQUM7cUJBQ3JELE1BQU07Ozs7O2dCQUFDLFVBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSyxPQUFBLElBQUksR0FBRyxHQUFHLEVBQVYsQ0FBVSxFQUFDOztvQkFFOUIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUc7O29CQUNuRixNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTTs7b0JBRWpGLEtBQUcsR0FDUCxLQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsTUFBTTtvQkFDL0MsQ0FBQyxDQUFDLE9BQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFFO29CQUM5RSxDQUFDLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsQ0FBQztnQkFFckMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDdkUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDdEUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQzVGO1FBQ0gsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQzs7OztJQUVNLHdDQUFJOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQzs7OztJQUVNLGtEQUFjOzs7SUFBckI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUFFRCxtREFBZTs7OztJQUFmLFVBQWdCLEtBQWE7UUFBN0IsaUJBYUM7UUFaQyxVQUFVOzs7UUFBQztZQUNULEtBQUksQ0FBQyxVQUFVLENBQUMsT0FBTzs7Ozs7WUFBQyxVQUFDLEVBQU8sRUFBRSxDQUFTOztvQkFDbkMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ3hFLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRTtvQkFDZixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGlCQUFpQixFQUFFLGVBQWUsQ0FBQyxDQUFDO2lCQUM3RTtxQkFBTSxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUU7b0JBQ3RCLFlBQVksQ0FBQyxPQUFPOzs7O29CQUFDLFVBQUMsSUFBUzt3QkFDN0IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO29CQUNuRCxDQUFDLEVBQUMsQ0FBQztpQkFDSjtZQUNILENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQzs7Ozs7SUFFRCxnREFBWTs7OztJQUFaLFVBQWEsS0FBYTtRQUExQixpQkFnQkM7UUFmQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVO2FBQzdCLE1BQU07Ozs7UUFBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBdEUsQ0FBc0UsRUFBQzthQUNwRixHQUFHOzs7O1FBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsYUFBYSxFQUFsQixDQUFrQixFQUFDLENBQUM7UUFFbkMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTzs7Ozs7WUFBQyxVQUFDLEVBQU8sRUFBRSxDQUFTOztvQkFDbkMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUM7Z0JBRXhFLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtvQkFDZixLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM1QixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztpQkFDaEY7WUFDSCxDQUFDLEVBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVELHlEQUFxQjs7OztJQUFyQixVQUFzQixLQUFVO1FBQWhDLGlCQTREQztRQTNEQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsUUFBUSxLQUFLLENBQUMsR0FBRyxFQUFFO2dCQUNqQixLQUFLLFdBQVc7b0JBQ2QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN2QixJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUV4QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO3dCQUNsQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7cUJBQ2I7b0JBRUQsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDNUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3FCQUM5Qzt5QkFBTSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7d0JBQ2hFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3RCO29CQUVELElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLENBQUMsRUFBRTt3QkFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDdEI7O3dCQUVLLGVBQWUsR0FBUSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUk7Ozs7O29CQUMvQyxVQUFDLEVBQU8sRUFBRSxLQUFhLElBQUssT0FBQSxFQUFFLElBQUksS0FBSyxLQUFLLEtBQUksQ0FBQyxrQkFBa0IsRUFBdkMsQ0FBdUMsRUFDcEU7b0JBQ0QsSUFBSSxlQUFlLEVBQUU7d0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7cUJBQzdFO29CQUVELE1BQU07Z0JBQ1IsS0FBSyxTQUFTO29CQUNaLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLENBQUMsRUFBRTs7NEJBQzdELGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU07d0JBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7cUJBQ2xDO29CQUNELElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7d0JBRXZDLFlBQVksR0FBUSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUk7Ozs7O29CQUM1QyxVQUFDLEVBQU8sRUFBRSxLQUFhLElBQUssT0FBQSxFQUFFLElBQUksS0FBSyxLQUFLLEtBQUksQ0FBQyxrQkFBa0IsRUFBdkMsQ0FBdUMsRUFDcEU7b0JBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztvQkFFdEUsTUFBTTtnQkFDUixLQUFLLFFBQVE7b0JBQ1gsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN2QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ1osTUFBTTtnQkFDUixLQUFLLE9BQU87b0JBQ1YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDOzt3QkFDakIsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRzs7OztvQkFBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsRUFBRixDQUFFLEVBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7b0JBQzdFLElBQUksY0FBYyxFQUFFO3dCQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7d0JBQzlFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7cUJBQzNFO29CQUVELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDWixNQUFNO2FBQ1Q7U0FDRjtJQUNILENBQUM7Ozs7O0lBRUQsMkRBQXVCOzs7O0lBQXZCLFVBQXdCLElBQVk7O1lBQzlCLFVBQVUsR0FBRyxDQUFDOztZQUNkLFNBQVMsR0FBRyxJQUFJLENBQUMsa0JBQWtCO1FBRXZDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsRUFBTztZQUM5QixVQUFVLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7UUFDOUMsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRTs7Z0JBQ2QsWUFBVSxHQUFHLENBQUM7WUFFbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPOzs7OztZQUFDLFVBQUMsRUFBYyxFQUFFLENBQVM7Z0JBQ2hELElBQUksQ0FBQyxLQUFLLFNBQVMsR0FBRyxDQUFDLEVBQUU7b0JBQ3ZCLFlBQVUsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQztpQkFDOUQ7WUFDSCxDQUFDLEVBQUMsQ0FBQzs7Z0JBRUcsT0FBTyxHQUFHLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLFlBQVU7O2dCQUN0QyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUzs7Z0JBQy9DLFVBQVUsR0FBRyxPQUFPLEdBQUcsVUFBVTtZQUV2QyxJQUFJLElBQUksS0FBSyxXQUFXLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxPQUFPLEdBQUcsWUFBVSxDQUFDLENBQUM7YUFDM0Y7aUJBQU0sSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUM3QixJQUFJLFNBQVMsS0FBSyxDQUFDLEVBQUU7b0JBQ25CLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7aUJBQ3hDO3FCQUFNO29CQUNMLFNBQVMsRUFBRSxDQUFDO2lCQUNiO2dCQUVELElBQUksU0FBUyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMzQixXQUFXLEVBQ1gsVUFBVSxHQUFHLFlBQVUsQ0FDeEIsQ0FBQztpQkFDSDtxQkFBTTtvQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQzNCLFdBQVcsRUFDWCxTQUFTLEdBQUcsWUFBVSxDQUN2QixDQUFDO2lCQUNIO2FBQ0Y7U0FDRjtJQUNILENBQUM7Ozs7O0lBRUQsa0RBQWM7Ozs7SUFBZCxVQUFlLFVBQXdFO1FBQXZGLGlCQVlDO1FBWEMsVUFBVTs7O1FBQUM7WUFDVCxJQUFJLEtBQUksQ0FBQyxRQUFRLEVBQUU7O29CQUNYLEtBQUcsR0FDUCxLQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLE1BQU07b0JBQzFELENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVk7b0JBQzNELENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRztnQkFDcEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDdkUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQ3BGLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQ3ZGO1FBQ0gsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQzs7Ozs7SUFFTSxrREFBYzs7OztJQUFyQixVQUFzQixVQUErRDtRQUNuRixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTs7Z0JBQ2xDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQzs7Z0JBQ3JDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWE7WUFFdEMsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsc0RBQWtCOzs7SUFBbEI7UUFDRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFRCwrQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7Z0JBM1RGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QiwwYkFBZ0Q7b0JBRWhELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUsa0JBQWtCOztpQkFDN0I7Ozs7Z0JBcEJDLFNBQVM7Z0JBUFQsVUFBVTs2Q0EwRVAsTUFBTSxTQUFDLFdBQVc7OztnQ0E3Q3BCLEtBQUs7OEJBQ0wsS0FBSztzQ0FDTCxLQUFLOytCQUNMLEtBQUs7MkJBQ0wsS0FBSzt5QkFFTCxNQUFNOzZCQUtOLGVBQWUsU0FBQyxrQkFBa0IsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTs2QkFHM0UsZUFBZSxTQUFDLGtCQUFrQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTsyQkFJekQsU0FBUyxTQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7OEJBQ3ZDLFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2tDQStCeEMsWUFBWSxTQUFDLGtCQUFrQixFQUFFLENBQUMsUUFBUSxDQUFDOztJQWtROUMsZ0NBQUM7Q0FBQSxBQTVURCxJQTRUQztTQXJUWSx5QkFBeUI7OztJQUNwQyxrREFBK0I7O0lBQy9CLGdEQUE0Qjs7SUFDNUIsd0RBQWlDOztJQUNqQyxpREFBK0I7O0lBQy9CLDZDQUEyQjs7SUFFM0IsMkNBR0s7O0lBRUwsK0NBRUU7O0lBQ0YsK0NBRUU7O0lBRUYsNkNBQStEOztJQUMvRCxnREFBbUU7Ozs7O0lBRW5FLDZDQUF1Qzs7Ozs7SUFFdkMsMENBQW1DOztJQUVuQywrQ0FNRTs7Ozs7SUFFRixvREFBMkQ7Ozs7O0lBRTNELDhDQUFtQzs7Ozs7SUFDbkMsNENBQXdCOzs7OztJQUN4Qix1REFBZ0M7Ozs7O0lBQ2hDLGtEQUF1Qzs7Ozs7SUFDdkMseURBQWdFOzs7OztJQUNoRSwrQ0FBMkI7Ozs7O0lBR3pCLDZDQUEyQjs7Ozs7SUFDM0IsdUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFF1ZXJ5TGlzdCxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1kYk9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vbWRiLW9wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgSVNlbGVjdGVkT3B0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zZWxlY3RlZC1vcHRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBkb2N1bWVudCwgd2luZG93IH0gZnJvbSAnLi4vLi4vLi4vZnJlZS91dGlscy9mYWNhZGUvYnJvd3Nlcic7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4vLi4vLi4vLi4vZnJlZS91dGlscy91dGlscy5jbGFzcyc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItYXV0by1jb21wbGV0ZXInLFxuICB0ZW1wbGF0ZVVybDogJ21kYi1hdXRvLWNvbXBsZXRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuLy4uL2F1dG8tY29tcGxldGVyLW1vZHVsZS5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnbWRiQXV0b0NvbXBsZXRlcicsXG59KVxuZXhwb3J0IGNsYXNzIE1kYkF1dG9Db21wbGV0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSB0ZXh0Tm9SZXN1bHRzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNsZWFyQnV0dG9uID0gdHJ1ZTtcbiAgQElucHV0KCkgY2xlYXJCdXR0b25UYWJJbmRleCA9IDA7XG4gIEBJbnB1dCgpIGFwcGVuZFRvQm9keTogYm9vbGVhbjtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPHsgdGV4dDogc3RyaW5nOyBlbGVtZW50OiBhbnkgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICB0ZXh0OiBzdHJpbmc7XG4gICAgZWxlbWVudDogYW55O1xuICB9PigpO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTWRiT3B0aW9uQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlLCByZWFkOiBFbGVtZW50UmVmIH0pIG9wdGlvbkxpc3Q6IEFycmF5PFxuICAgIGFueVxuICA+O1xuICBAQ29udGVudENoaWxkcmVuKE1kYk9wdGlvbkNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBtZGJPcHRpb25zOiBRdWVyeUxpc3Q8XG4gICAgTWRiT3B0aW9uQ29tcG9uZW50XG4gID47XG5cbiAgQFZpZXdDaGlsZCgnZHJvcGRvd24nLCB7IHN0YXRpYzogZmFsc2UgfSkgZHJvcGRvd246IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ25vUmVzdWx0cycsIHsgc3RhdGljOiBmYWxzZSB9KSBub1Jlc3VsdHNFbDogRWxlbWVudFJlZjtcblxuICBwcml2YXRlIF9kZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwcml2YXRlIHV0aWxzOiBVdGlscyA9IG5ldyBVdGlscygpO1xuXG4gIHB1YmxpYyBwYXJhbWV0ZXJzOiB7XG4gICAgbGVmdDogbnVtYmVyO1xuICAgIHRvcDogbnVtYmVyO1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgYm90dG9tOiBudW1iZXI7XG4gICAgaW5wdXRIZWlnaHQ6IG51bWJlcjtcbiAgfTtcblxuICBwcml2YXRlIF9pc0Ryb3Bkb3duT3BlbjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIHByaXZhdGUgX2FsbEl0ZW1zOiBBcnJheTxhbnk+ID0gW107XG4gIHByaXZhdGUgX2lzT3BlbiA9IGZhbHNlO1xuICBwcml2YXRlIF9zZWxlY3RlZEl0ZW1JbmRleCA9IC0xO1xuICBwcml2YXRlIF9zZWxlY3RlZEl0ZW06IElTZWxlY3RlZE9wdGlvbjtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRJdGVtQ2hhbmdlZDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwcml2YXRlIF9pc0Jyb3dzZXIgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy5faXNCcm93c2VyID0gaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6bW91c2Vkb3duJywgWyckZXZlbnQnXSkgd2luZG93TW91c2VEb3duKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAodGhpcy5kcm9wZG93biAmJiAhdGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkpIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RlblRvT3B0aW9uQ2xpY2soKSB7XG4gICAgdGhpcy5tZGJPcHRpb25zLmNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgodGhpcy5tZGJPcHRpb25zKSxcbiAgICAgICAgc3dpdGNoTWFwKChvcHRpb25zOiBRdWVyeUxpc3Q8TWRiT3B0aW9uQ29tcG9uZW50PikgPT4ge1xuICAgICAgICAgIHJldHVybiBtZXJnZSguLi5vcHRpb25zLm1hcCgob3B0aW9uOiBNZGJPcHRpb25Db21wb25lbnQpID0+IG9wdGlvbi5jbGljayQpKTtcbiAgICAgICAgfSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoY2xpY2tlZE9wdGlvbjogTWRiT3B0aW9uQ29tcG9uZW50KSA9PiB0aGlzLl9oYW5kbGVPcHRpb25DbGljayhjbGlja2VkT3B0aW9uKSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVPcHRpb25DbGljayhvcHRpb246IE1kYk9wdGlvbkNvbXBvbmVudCkge1xuICAgIHRoaXMuc2V0U2VsZWN0ZWRJdGVtKHsgdGV4dDogb3B0aW9uLnZhbHVlLCBlbGVtZW50OiBvcHRpb24gfSk7XG4gICAgdGhpcy5oaWdobGlnaHRSb3coMCk7XG4gICAgdGhpcy5zZWxlY3QuZW1pdCh7IHRleHQ6IG9wdGlvbi52YWx1ZSwgZWxlbWVudDogb3B0aW9uIH0pO1xuICAgIHRoaXMuaGlkZSgpO1xuICB9XG5cbiAgcHVibGljIHNldFNlbGVjdGVkSXRlbShpdGVtOiBJU2VsZWN0ZWRPcHRpb24pIHtcbiAgICB0aGlzLl9zZWxlY3RlZEl0ZW0gPSBpdGVtO1xuICAgIHRoaXMuX3NlbGVjdGVkSXRlbUNoYW5nZWQubmV4dCh0aGlzLmdldFNlbGVjdGVkSXRlbSgpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTZWxlY3RlZEl0ZW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSXRlbTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RlZEl0ZW1DaGFuZ2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSXRlbUNoYW5nZWQ7XG4gIH1cblxuICBwdWJsaWMgaXNPcGVuKCkge1xuICAgIHJldHVybiB0aGlzLl9pc09wZW47XG4gIH1cblxuICBwdWJsaWMgc2hvdygpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2lzT3BlbiA9IHRydWU7XG4gICAgICB0aGlzLl9pc0Ryb3Bkb3duT3Blbi5uZXh0KHRoaXMuaXNPcGVuKCkpO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmRyb3Bkb3duICYmICF0aGlzLmFwcGVuZFRvQm9keSkge1xuICAgICAgICBjb25zdCBtb2RhbEVsID0gdGhpcy51dGlscy5nZXRDbG9zZXN0RWwodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnLm1vZGFsLWRpYWxvZycpO1xuICAgICAgICBjb25zdCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wbGV0ZXItZHJvcGRvd24nKSk7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IFsnaGVpZ2h0JywgJ3BhZGRpbmctdG9wJywgJ3BhZGRpbmctYm90dG9tJywgJ21hcmdpbi10b3AnLCAnbWFyZ2luLWJvdHRvbSddXG4gICAgICAgICAgLm1hcChrZXkgPT4gcGFyc2VJbnQoc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShrZXkpLCAxMCkpXG4gICAgICAgICAgLnJlZHVjZSgocHJldiwgY3VyKSA9PiBwcmV2ICsgY3VyKTtcblxuICAgICAgICBjb25zdCB0b3BSZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXBsZXRlci1kcm9wZG93bicpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgICAgY29uc3QgYm90dG9tID0gbW9kYWxFbCA/IHdpbmRvdy5pbm5lckhlaWdodCAtIGhlaWdodCAtIHRvcFJlY3QgOiB0aGlzLnBhcmFtZXRlcnMuYm90dG9tO1xuXG4gICAgICAgIGNvbnN0IHRvcCA9XG4gICAgICAgICAgdGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCA+IGJvdHRvbVxuICAgICAgICAgICAgPyBgLSR7dGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCAtIHRoaXMucGFyYW1ldGVycy5pbnB1dEhlaWdodH1gXG4gICAgICAgICAgICA6IHRoaXMucGFyYW1ldGVycy5pbnB1dEhlaWdodCArIDM7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCB0b3AgKyAncHgnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgMCArICdweCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgdGhpcy5wYXJhbWV0ZXJzLndpZHRoICsgJ3B4Jyk7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH1cblxuICBwdWJsaWMgaGlkZSgpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5faXNEcm9wZG93bk9wZW4ubmV4dCh0aGlzLmlzT3BlbigpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNEcm9wZG93bk9wZW4oKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5faXNEcm9wZG93bk9wZW47XG4gIH1cblxuICByZW1vdmVIaWdobGlnaHQoaW5kZXg6IG51bWJlcikge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5vcHRpb25MaXN0LmZvckVhY2goKGVsOiBhbnksIGk6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBjb21wbGV0ZXJSb3cgPSBlbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21wbGV0ZXItcm93Jyk7XG4gICAgICAgIGlmIChpID09PSBpbmRleCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZWwubmF0aXZlRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCwgJ2hpZ2hsaWdodC1yb3cnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpICE9PSBpbmRleCkge1xuICAgICAgICAgIGNvbXBsZXRlclJvdy5mb3JFYWNoKChlbGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZWxlbSwgJ2hpZ2hsaWdodC1yb3cnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBoaWdobGlnaHRSb3coaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX2FsbEl0ZW1zID0gdGhpcy5vcHRpb25MaXN0XG4gICAgICAuZmlsdGVyKGVsID0+IGVsLm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb21wbGV0ZXItcm93JykpXG4gICAgICAubWFwKGVsZW0gPT4gZWxlbS5uYXRpdmVFbGVtZW50KTtcblxuICAgIGlmICh0aGlzLl9hbGxJdGVtc1tpbmRleF0pIHtcbiAgICAgIHRoaXMub3B0aW9uTGlzdC5mb3JFYWNoKChlbDogYW55LCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgY29tcGxldGVyUm93ID0gZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tcGxldGVyLXJvdycpO1xuXG4gICAgICAgIGlmIChpbmRleCA9PT0gaSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlSGlnaGxpZ2h0KGluZGV4KTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGNvbXBsZXRlclJvd1tjb21wbGV0ZXJSb3cubGVuZ3RoIC0gMV0sICdoaWdobGlnaHQtcm93Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9zZWxlY3RlZEl0ZW1JbmRleCA9IGluZGV4O1xuICB9XG5cbiAgbmF2aWdhdGVVc2luZ0tleWJvYXJkKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAodGhpcy5kcm9wZG93bikge1xuICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMubW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcoZXZlbnQua2V5KTtcblxuICAgICAgICAgIGlmICghdGhpcy5pc09wZW4oKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSXRlbUluZGV4ICsgMSA8PSB0aGlzLl9hbGxJdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFJvdygrK3RoaXMuX3NlbGVjdGVkSXRlbUluZGV4KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkSXRlbUluZGV4ICsgMSA9PT0gdGhpcy5fYWxsSXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFJvdygwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Um93KDApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkRWxlbWVudDogYW55ID0gdGhpcy5tZGJPcHRpb25zLmZpbmQoXG4gICAgICAgICAgICAoZWw6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gZWwgJiYgaW5kZXggPT09IHRoaXMuX3NlbGVjdGVkSXRlbUluZGV4XG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWRFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdC5lbWl0KHsgdGV4dDogc2VsZWN0ZWRFbGVtZW50LnZhbHVlLCBlbGVtZW50OiBzZWxlY3RlZEVsZW1lbnQgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5tb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldyhldmVudC5rZXkpO1xuICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEl0ZW1JbmRleCA9PT0gLTEgfHwgdGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggPSB0aGlzLm1kYk9wdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRSb3cobGFzdEl0ZW1JbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Um93KC0tdGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXgpO1xuXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtOiBhbnkgPSB0aGlzLm1kYk9wdGlvbnMuZmluZChcbiAgICAgICAgICAgIChlbDogYW55LCBpbmRleDogbnVtYmVyKSA9PiBlbCAmJiBpbmRleCA9PT0gdGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuc2VsZWN0LmVtaXQoeyB0ZXh0OiBzZWxlY3RlZEl0ZW0udmFsdWUsIGVsZW1lbnQ6IHNlbGVjdGVkSXRlbSB9KTtcblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gdGhpcy5tZGJPcHRpb25zLm1hcChlbCA9PiBlbClbdGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXhdO1xuICAgICAgICAgIGlmIChzZWxlY3RlZE9wdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZEl0ZW0oeyB0ZXh0OiBzZWxlY3RlZE9wdGlvbi52YWx1ZSwgZWxlbWVudDogc2VsZWN0ZWRPcHRpb24gfSk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdC5lbWl0KHsgdGV4dDogc2VsZWN0ZWRPcHRpb24udmFsdWUsIGVsZW1lbnQ6IHNlbGVjdGVkT3B0aW9uIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdmVIaWdobGlnaHRlZEludG9WaWV3KHR5cGU6IHN0cmluZykge1xuICAgIGxldCBsaXN0SGVpZ2h0ID0gMDtcbiAgICBsZXQgaXRlbUluZGV4ID0gdGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXg7XG5cbiAgICB0aGlzLm9wdGlvbkxpc3QuZm9yRWFjaCgoZWw6IGFueSkgPT4ge1xuICAgICAgbGlzdEhlaWdodCArPSBlbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICB9KTtcblxuICAgIGlmIChpdGVtSW5kZXggPiAtMSkge1xuICAgICAgbGV0IGl0ZW1IZWlnaHQgPSAwO1xuXG4gICAgICB0aGlzLm9wdGlvbkxpc3QuZm9yRWFjaCgoZWw6IEVsZW1lbnRSZWYsIGk6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiAoaSA9PT0gaXRlbUluZGV4ICsgMSkge1xuICAgICAgICAgIGl0ZW1IZWlnaHQgPSBlbC5uYXRpdmVFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLmNsaWVudEhlaWdodDtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGl0ZW1Ub3AgPSAoaXRlbUluZGV4ICsgMSkgKiBpdGVtSGVpZ2h0O1xuICAgICAgY29uc3Qgdmlld1RvcCA9IHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICBjb25zdCB2aWV3Qm90dG9tID0gdmlld1RvcCArIGxpc3RIZWlnaHQ7XG5cbiAgICAgIGlmICh0eXBlID09PSAnQXJyb3dEb3duJykge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudCwgJ3Njcm9sbFRvcCcsIGl0ZW1Ub3AgLSBpdGVtSGVpZ2h0KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICAgIGlmIChpdGVtSW5kZXggPT09IDApIHtcbiAgICAgICAgICBpdGVtSW5kZXggPSB0aGlzLm9wdGlvbkxpc3QubGVuZ3RoIC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtSW5kZXgtLTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtSW5kZXggPT09IHRoaXMuX2FsbEl0ZW1zLmxlbmd0aCAtIDIpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgJ3Njcm9sbFRvcCcsXG4gICAgICAgICAgICB2aWV3Qm90dG9tIC0gaXRlbUhlaWdodFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICdzY3JvbGxUb3AnLFxuICAgICAgICAgICAgaXRlbUluZGV4ICogaXRlbUhlaWdodFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVQb3NpdGlvbihwYXJhbWV0ZXJzOiB7IGxlZnQ6IG51bWJlcjsgdG9wOiBudW1iZXI7IHdpZHRoOiBudW1iZXI7IGJvdHRvbTogbnVtYmVyIH0pIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmRyb3Bkb3duKSB7XG4gICAgICAgIGNvbnN0IHRvcCA9XG4gICAgICAgICAgdGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCA+IHBhcmFtZXRlcnMuYm90dG9tXG4gICAgICAgICAgICA/IHBhcmFtZXRlcnMudG9wIC0gdGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodFxuICAgICAgICAgICAgOiBwYXJhbWV0ZXJzLnRvcDtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCB0b3AgKyAncHgnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgcGFyYW1ldGVycy5sZWZ0ICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBwYXJhbWV0ZXJzLndpZHRoICsgJ3B4Jyk7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH1cblxuICBwdWJsaWMgYXBwZW5kRHJvcGRvd24ocGFyYW1ldGVyczogeyBsZWZ0OiBhbnk7IHRvcDogYW55OyB3aWR0aDogYW55OyBib3R0b206IG51bWJlciB9KSB7XG4gICAgaWYgKHRoaXMuX2lzQnJvd3NlciAmJiB0aGlzLmFwcGVuZFRvQm9keSkge1xuICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgIGNvbnN0IGRyb3Bkb3duID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICBpZiAoYm9keSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGJvZHksIGRyb3Bkb3duKTtcbiAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbihwYXJhbWV0ZXJzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fbGlzdGVuVG9PcHRpb25DbGljaygpO1xuICAgIHRoaXMuaGlnaGxpZ2h0Um93KDApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=