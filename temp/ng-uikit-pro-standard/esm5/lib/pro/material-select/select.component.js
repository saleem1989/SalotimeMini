/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, forwardRef, ElementRef, Renderer2, Inject, PLATFORM_ID, ChangeDetectorRef, ChangeDetectionStrategy, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectDropdownComponent } from './select-dropdown.component';
import { OptionList } from './option-list';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
/** @type {?} */
export var SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return SelectComponent; })),
    multi: true,
};
var SelectComponent = /** @class */ (function () {
    /** Event handlers. **/
    // Angular lifecycle hooks.
    function SelectComponent(el, renderer, document, platformId, cdRef) {
        this.el = el;
        this.renderer = renderer;
        this.document = document;
        this.cdRef = cdRef;
        this.customClass = '';
        this.allowClear = false;
        this.disabled = false;
        this.highlightFirst = true;
        this.multiple = false;
        this.noFilter = 0;
        this.notFoundMsg = 'No results found';
        this.placeholder = '';
        this.filterPlaceholder = '';
        this.label = '';
        this.filterEnabled = false;
        this.filterAutocomplete = true;
        this.optionHeight = 37;
        this.enableSelectAll = true;
        this.selectAllLabel = 'Select all';
        this.outline = false;
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.selected = new EventEmitter();
        this.deselected = new EventEmitter();
        this.noOptionsFound = new EventEmitter();
        this.changed = new EventEmitter();
        // Angular lifecycle hooks.
        this.KEYS = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            SPACE: 32,
            UP: 38,
            DOWN: 40,
        };
        this._value = [];
        this.visibleOptionsDefault = 4;
        // Selection state variables.
        this.hasSelected = false;
        // View state variables.
        this.hasFocus = false;
        this.isOpen = false;
        this.isBelow = true;
        this.filterInputWidth = 1;
        this.isDisabled = false;
        this.placeholderView = '';
        this.labelActive = false;
        this.labelRefActive = false;
        this.dropdownAnimationDone = false;
        this.clearClicked = false;
        this.selectContainerClicked = false;
        this.filterHeight = 0;
        this.itemsBefore = [];
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
        this.isBrowser = isPlatformBrowser(platformId);
    }
    /**
     * @return {?}
     */
    SelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.placeholderView = this.placeholder;
        this.updateFilterHeight();
        this.updateDropdownHeight();
        if (this.label) {
            this.updateLabelState();
        }
        this.labelRef = this._getLabelRef();
        if (this.labelRef) {
            this.updateLabelRefState();
        }
        if (this.highlightFirst) {
            this.optionList.highlightFirst = true;
        }
    };
    /**
     * @private
     * @return {?}
     */
    SelectComponent.prototype._getLabelRef = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selectParentEl = this.el.nativeElement.parentNode;
        /** @type {?} */
        var labelRef = selectParentEl.querySelector('label');
        return labelRef;
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.updateFilterHeight = /**
     * @return {?}
     */
    function () {
        this.filterEnabled ? (this.filterHeight = 78) : (this.filterHeight = 0);
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.updateDropdownHeight = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var customContentHeight = this.dropdown
            ? this.dropdown.customContent.nativeElement.clientHeight
            : 0;
        if (this.multiple && this.enableSelectAll) {
            this.dropdownMaxHeight = this.visibleOptions
                ? this.optionHeight * (this.visibleOptions + 1) + customContentHeight
                : this.optionHeight * (this.visibleOptionsDefault + 1) + customContentHeight;
            this.dropdownHeight =
                this.optionHeight * (this.optionList.options.length + 1) + customContentHeight;
        }
        else {
            this.dropdownMaxHeight = this.visibleOptions
                ? this.optionHeight * this.visibleOptions + customContentHeight
                : this.optionHeight * this.visibleOptionsDefault + customContentHeight;
            this.dropdownHeight =
                this.optionHeight * this.optionList.options.length + customContentHeight;
        }
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.onDropdownAnimationDone = /**
     * @return {?}
     */
    function () {
        this.dropdownAnimationDone = true;
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.onDropdownAnimationStart = /**
     * @return {?}
     */
    function () {
        this.dropdownAnimationDone = false;
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.updateState();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    SelectComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty('outline')) {
            if (changes['outline'].currentValue) {
                this.renderer.addClass(this.el.nativeElement, 'mdb-select-outline');
            }
            else {
                this.renderer.removeClass(this.el.nativeElement, 'mdb-select-outline');
            }
        }
        if (changes.hasOwnProperty('options')) {
            this.updateOptionsList(changes.options.currentValue);
            this.updateState();
            this.updateDropdownHeight();
            this.appendToBody ? this._updateAppendedPosition() : this.updatePosition();
            this.changed.emit({
                previousValue: changes.options.previousValue,
                currentValue: changes.options.currentValue,
            });
        }
        if (changes.hasOwnProperty('noFilter')) {
            /** @type {?} */
            var numOptions = this.optionList.options.length;
            /** @type {?} */
            var minNumOptions = changes['noFilter'].currentValue;
            this.filterEnabled = numOptions >= minNumOptions;
        }
        if (changes.hasOwnProperty('placeholder')) {
            this.updateState();
        }
    };
    /**
     * @param {?} elemnt
     * @return {?}
     */
    SelectComponent.prototype.isChild = /**
     * @param {?} elemnt
     * @return {?}
     */
    function (elemnt) {
        /** @type {?} */
        var node = elemnt.parentNode;
        while (node != null) {
            if (node === this.el.nativeElement) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.onWindowResize = /**
     * @return {?}
     */
    function () {
        this.updateWidth();
    };
    // Select container.
    // Select container.
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.onSelectContainerClick = 
    // Select container.
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.isChild(event.target)) {
            this.selectContainerClicked = true;
            this.openDropdown();
            if (this.label) {
                this.updateLabelState();
            }
            if (this.labelRef) {
                this.updateLabelRefState();
            }
        }
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.onSelectContainerFocus = /**
     * @return {?}
     */
    function () {
        if (this.label) {
            this.labelActive = true;
        }
        if (this.labelRef) {
            this.renderer.addClass(this.labelRef, 'active');
        }
        this.openDropdown();
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.onSelectContainerBlur = /**
     * @return {?}
     */
    function () {
        if (this.label) {
            this.updateLabelState();
        }
        if (this.labelRef) {
            this.updateLabelRefState();
        }
        if (!this.isOpen && !this.disabled) {
            this.onTouched();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.onSelectContainerKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.handleSelectContainerKeydown(event);
    };
    // Dropdown container.
    // Dropdown container.
    /**
     * @param {?} option
     * @return {?}
     */
    SelectComponent.prototype.onDropdownOptionClicked = 
    // Dropdown container.
    /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.multiple ? this.toggleSelectOption(option) : this.selectOption(option);
    };
    /**
     * @param {?} focus
     * @return {?}
     */
    SelectComponent.prototype.onDropdownClose = /**
     * @param {?} focus
     * @return {?}
     */
    function (focus) {
        this.closeDropdown(focus);
    };
    // Single filter input.
    // Single filter input.
    /**
     * @return {?}
     */
    SelectComponent.prototype.onSingleFilterClick = 
    // Single filter input.
    /**
     * @return {?}
     */
    function () {
        this.selectContainerClicked = true;
    };
    /**
     * @param {?} term
     * @return {?}
     */
    SelectComponent.prototype.onSingleFilterInput = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        /** @type {?} */
        var hasShown = this.optionList.filter(term);
        if (this.multiple && this.enableSelectAll) {
            this.dropdownHeight = (this.optionList.filtered.length + 1) * this.optionHeight;
        }
        else {
            this.dropdownHeight = this.optionList.filtered.length * this.optionHeight;
        }
        if (!hasShown) {
            this.noOptionsFound.emit(term);
            this.dropdownHeight = this.optionHeight;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.onSingleFilterKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.handleSingleFilterKeydown(event);
    };
    // Multiple filter input.
    // Multiple filter input.
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.onMultipleFilterInput = 
    // Multiple filter input.
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.isOpen) {
            this.openDropdown();
        }
        this.updateFilterWidth();
        /** @type {?} */
        var term = event.target.value;
        /** @type {?} */
        var hasShown = this.optionList.filter(term);
        if (!hasShown) {
            this.noOptionsFound.emit(term);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.onMultipleFilterKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.handleMultipleFilterKeydown(event);
    };
    // Single clear select.
    // Single clear select.
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.onClearSelectionClick = 
    // Single clear select.
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.clearClicked = true;
        this.clearSelection();
        this.placeholderView = this.placeholder;
        this.onTouched();
        if (this.label) {
            this.updateLabelState();
        }
        if (this.labelRef) {
            this.updateLabelRefState();
        }
    };
    // Multiple deselect option.
    // Multiple deselect option.
    /**
     * @param {?} option
     * @return {?}
     */
    SelectComponent.prototype.onDeselectOptionClick = 
    // Multiple deselect option.
    /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.clearClicked = true;
        this.deselectOption(option);
    };
    /** API. **/
    // TODO fix issues with global click/key handler that closes the dropdown.
    /**
     * API. *
     * @return {?}
     */
    // TODO fix issues with global click/key handler that closes the dropdown.
    SelectComponent.prototype.open = /**
     * API. *
     * @return {?}
     */
    // TODO fix issues with global click/key handler that closes the dropdown.
    function () {
        var _this = this;
        Promise.resolve().then((/**
         * @return {?}
         */
        function () {
            _this.openDropdown();
        }));
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        this.closeDropdown();
    };
    Object.defineProperty(SelectComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.multiple ? this._value : this._value[0];
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (typeof v === 'undefined' || v === null || v === '') {
                v = [];
            }
            else if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
                v = [v];
            }
            else if (!Array.isArray(v)) {
                throw new TypeError('Value must be a string or an array.');
            }
            this.optionList.value = v;
            this._value = v;
            this.updateState();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectComponent.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.clearSelection();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SelectComponent.prototype.select = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        this.optionList.getOptionsByValue(value).forEach((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            _this.selectOption(option);
        }));
    };
    /** ControlValueAccessor interface methods. **/
    /**
     * ControlValueAccessor interface methods. *
     * @param {?} value
     * @return {?}
     */
    SelectComponent.prototype.writeValue = /**
     * ControlValueAccessor interface methods. *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
        this.hasSelected = true;
        if (!value && value !== 0) {
            this.hasSelected = false;
        }
        if (this.label) {
            this.updateLabelState();
        }
        if (this.labelRef) {
            this.updateLabelRefState();
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    SelectComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
        this.cdRef.markForCheck();
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.valueChanged = /**
     * @return {?}
     */
    function () {
        this._value = this.optionList.value;
        this.updateState();
        this.onChange(this.value);
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.updateState = /**
     * @return {?}
     */
    function () {
        this.placeholderView = this.placeholder;
        this.updateFilterWidth();
        this.cdRef.markForCheck();
    };
    /** Initialization. **/
    /**
     * Initialization. *
     * @param {?} options
     * @return {?}
     */
    SelectComponent.prototype.updateOptionsList = /**
     * Initialization. *
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.optionList = new OptionList(options);
        this.optionList.value = this._value;
        this.cdRef.markForCheck();
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.updateLabelState = /**
     * @return {?}
     */
    function () {
        if (!this.placeholder && !this.hasSelected && !this.isOpen) {
            this.labelActive = false;
        }
        else {
            this.labelActive = true;
        }
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.updateLabelRefState = /**
     * @return {?}
     */
    function () {
        if (!this.placeholder && !this.hasSelected && !this.isOpen) {
            this.renderer.removeClass(this.labelRef, 'active');
        }
        else {
            this.renderer.addClass(this.labelRef, 'active');
        }
    };
    /** Dropdown. **/
    /**
     * Dropdown. *
     * @return {?}
     */
    SelectComponent.prototype.toggleDropdown = /**
     * Dropdown. *
     * @return {?}
     */
    function () {
        if (!this.isDisabled) {
            this.isOpen ? this.closeDropdown(true) : this.openDropdown();
        }
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.openDropdown = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.renderer.setStyle(this.el.nativeElement, 'z-index', '1000');
        if (!this.isOpen) {
            this.isOpen = true;
            if (this.appendToBody) {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this._appendDropdown();
                }), 0);
            }
            this.updateWidth();
            this.appendToBody ? this._updateAppendedPosition() : this.updatePosition();
            ['click', 'touchstart'].forEach((/**
             * @param {?} ev
             * @return {?}
             */
            function (ev) {
                _this.documentClickFun = _this.renderer.listen('document', ev, (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (!_this.isChild(event.target) &&
                        _this.isOpen &&
                        _this.dropdownAnimationDone &&
                        event.target !== _this.el.nativeElement) {
                        _this.closeDropdown();
                        _this.clearFilterInput();
                        if (_this.label) {
                            _this.updateLabelState();
                        }
                        if (_this.labelRef) {
                            _this.updateLabelRefState();
                        }
                    }
                }));
            }));
            this.opened.emit(this);
        }
        this.cdRef.markForCheck();
    };
    /**
     * @param {?=} focus
     * @return {?}
     */
    SelectComponent.prototype.closeDropdown = /**
     * @param {?=} focus
     * @return {?}
     */
    function (focus) {
        if (focus === void 0) { focus = false; }
        if (this.appendToBody && this.isOpen) {
            this.renderer.removeChild('body', this.dropdown._elementRef.nativeElement);
        }
        /** @type {?} */
        var container = this.el.nativeElement.lastElementChild.classList;
        this.renderer.removeStyle(this.el.nativeElement, 'z-index');
        container.remove('fadeInSelect');
        if (this.isOpen) {
            this.clearFilterInput();
            this.isOpen = false;
            if (focus) {
                this.focus();
            }
            this.closed.emit(this);
        }
        this.documentClickFun();
        this.onTouched();
        this.cdRef.markForCheck();
    };
    /** Select. **/
    /**
     * Select. *
     * @param {?} option
     * @return {?}
     */
    SelectComponent.prototype.selectOption = /**
     * Select. *
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (!option.disabled) {
            this.optionList.select(option, this.multiple);
            this.valueChanged();
            this.selected.emit(option.wrappedOption);
            this.hasSelected = true;
            if (this.label) {
                this.updateLabelState();
            }
            if (this.labelRef) {
                this.updateLabelRefState();
            }
        }
        if (!this.multiple && !option.disabled) {
            this.closeDropdown();
        }
        this.cdRef.markForCheck();
    };
    /**
     * @param {?} option
     * @return {?}
     */
    SelectComponent.prototype.deselectOption = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (option.selected) {
            this.optionList.deselect(option);
            this.valueChanged();
            this.placeholderView = this.placeholder;
            if (this.optionList.selection.length === 0) {
                this.hasSelected = false;
                if (this.label) {
                    this.updateLabelState();
                }
                if (this.labelRef) {
                    this.updateLabelRefState();
                }
            }
            this.deselected.emit(option.wrappedOption);
        }
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.clearSelection = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selection = this.optionList.selection;
        if (selection.length > 0) {
            this.optionList.clearSelection();
            this.valueChanged();
            this.hasSelected = false;
            if (selection.length === 1) {
                this.deselected.emit(selection[0].wrappedOption);
            }
            else {
                this.deselected.emit(selection.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) {
                    return option.wrappedOption;
                })));
            }
        }
    };
    /**
     * @param {?} option
     * @return {?}
     */
    SelectComponent.prototype.toggleSelectOption = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        option.selected ? this.deselectOption(option) : this.selectOption(option);
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.selectHighlightedOption = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var option = this.optionList.highlightedOption;
        if (this.multiple && option !== null) {
            this.toggleSelectOption(option);
        }
        if (!this.multiple && option !== null) {
            this.selectOption(option);
            this.closeDropdown(true);
        }
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.deselectLast = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sel = this.optionList.selection;
        if (sel.length > 0) {
            /** @type {?} */
            var option = sel[sel.length - 1];
            this.deselectOption(option);
            this.setMultipleFilterInput(option.label + ' ');
        }
    };
    /**
     * @param {?} isSelected
     * @return {?}
     */
    SelectComponent.prototype.onSelectAll = /**
     * @param {?} isSelected
     * @return {?}
     */
    function (isSelected) {
        var _this = this;
        if (isSelected) {
            this.optionList.filtered
                .filter((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return !option.disabled; }))
                .forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                _this.selectOption(option);
            }));
        }
        else {
            this.optionList.filtered
                .filter((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return !option.disabled; }))
                .forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                _this.deselectOption(option);
            }));
        }
    };
    /** Filter. **/
    /**
     * Filter. *
     * @return {?}
     */
    SelectComponent.prototype.clearFilterInput = /**
     * Filter. *
     * @return {?}
     */
    function () {
        this.dropdown.clearFilterInput();
        this.updateDropdownHeight();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SelectComponent.prototype.setMultipleFilterInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.filterEnabled) {
            this.filterInput.nativeElement.value = value;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.handleSelectContainerKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var key = event.keyCode;
        if (this.isOpen) {
            if (key === this.KEYS.ESC || (key === this.KEYS.UP && event.altKey)) {
                event.preventDefault();
                this.closeDropdown(true);
                if (this.label) {
                    this.updateLabelState();
                }
                if (this.labelRef) {
                    this.updateLabelRefState();
                }
            }
            else if (key === this.KEYS.TAB) {
                this.closeDropdown();
            }
            else if (key === this.KEYS.ENTER) {
                this.selectHighlightedOption();
                if (this.multiple && this.enableSelectAll) {
                    this.dropdown.updateSelectAllState();
                }
            }
            else if (key === this.KEYS.UP) {
                event.preventDefault();
                this.optionList.highlightPreviousOption();
                this.dropdown.moveHighlightedIntoView();
            }
            else if (key === this.KEYS.DOWN) {
                event.preventDefault();
                this.optionList.highlightNextOption();
                this.dropdown.moveHighlightedIntoView();
            }
        }
        else {
            if (key === this.KEYS.ENTER ||
                key === this.KEYS.SPACE ||
                (key === this.KEYS.DOWN && event.altKey)) {
                event.preventDefault();
                this.openDropdown();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.handleMultipleFilterKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var key = event.which;
        if (key === this.KEYS.BACKSPACE) {
            if (this.hasSelected && this.filterEnabled && this.filterInput.nativeElement.value === '') {
                this.deselectLast();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.handleSingleFilterKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var key = event.which;
        if (key === this.KEYS.ESC ||
            key === this.KEYS.TAB ||
            key === this.KEYS.UP ||
            key === this.KEYS.DOWN ||
            key === this.KEYS.ENTER) {
            this.handleSelectContainerKeydown(event);
        }
    };
    /** View. **/
    /**
     * View. *
     * @return {?}
     */
    SelectComponent.prototype.focus = /**
     * View. *
     * @return {?}
     */
    function () {
        this.hasFocus = true;
        try {
            if (this.filterEnabled) {
                this.filterInput.nativeElement.focus();
            }
            else {
                this.selectionSpan.nativeElement.focus();
            }
        }
        catch (error) { }
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.blur = /**
     * @return {?}
     */
    function () {
        this.hasFocus = false;
        this.selectionSpan.nativeElement.blur();
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.updateWidth = /**
     * @return {?}
     */
    function () {
        this.width = this.selectionSpan.nativeElement.offsetWidth;
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.updatePosition = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var docEl = document.documentElement;
            /** @type {?} */
            var elPosition = 0;
            if (_this.isBrowser) {
                elPosition =
                    _this.el.nativeElement.getBoundingClientRect().bottom +
                        _this.document.documentElement.scrollTop;
            }
            /** @type {?} */
            var selectSpan = _this.selectionSpan.nativeElement;
            _this.left = selectSpan.offsetLeft;
            /** @type {?} */
            var bottom = docEl.scrollTop + docEl.clientHeight;
            /** @type {?} */
            var dropdownHeight = _this.dropdownMaxHeight > _this.dropdownHeight ? _this.dropdownHeight : _this.dropdownMaxHeight;
            _this.updateDropdownHeight();
            if (elPosition + dropdownHeight >= bottom) {
                _this.top = selectSpan.offsetHeight - dropdownHeight - _this.filterHeight;
            }
            else {
                _this.top = 0;
            }
            _this.cdRef.markForCheck();
        }), 0);
    };
    /**
     * @private
     * @return {?}
     */
    SelectComponent.prototype._updateAppendedPosition = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.isBrowser) {
            /** @type {?} */
            var selectRect = this.el.nativeElement.getBoundingClientRect();
            /** @type {?} */
            var scrollTop = this.document.documentElement.scrollTop || this.document.body.scrollTop;
            /** @type {?} */
            var offsetTop = selectRect.top + scrollTop;
            /** @type {?} */
            var height = selectRect.height;
            /** @type {?} */
            var dropdownHeight = this.dropdownMaxHeight > this.dropdownHeight ? this.dropdownHeight : this.dropdownMaxHeight;
            this.left = selectRect.left;
            if (offsetTop + dropdownHeight + this.filterHeight >
                scrollTop + this.document.documentElement.clientHeight) {
                this.top = offsetTop - dropdownHeight + height - this.filterHeight;
            }
            else {
                this.top = offsetTop;
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    SelectComponent.prototype._appendDropdown = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.isBrowser) {
            /** @type {?} */
            var body = this.document.querySelector('body');
            /** @type {?} */
            var dropdown = this.dropdown._elementRef.nativeElement;
            if (body) {
                this.renderer.appendChild(body, dropdown);
            }
        }
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.updateFilterWidth = /**
     * @return {?}
     */
    function () {
        if (typeof this.filterInput !== 'undefined') {
            /** @type {?} */
            var value = this.filterInput.nativeElement.value;
            this.filterInputWidth =
                value.length === 0 ? 1 + this.placeholderView.length * 10 : 1 + value.length * 10;
        }
    };
    SelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-select',
                    template: "<label *ngIf=\"label !== ''\" [ngClass]=\"{'active': labelActive }\">\n  {{label}}\n</label>\n<div\n  #selection\n  [attr.tabindex]=\"disabled ? null : 0\"\n  [ngClass]=\"{'open': isOpen, 'focus': hasFocus, 'below': isBelow, 'disabled': disabled}\"\n  [tabindex]=\"tabindex\"\n  (mousedown)=\"onSelectContainerClick($event)\"\n  (focus)=\"onSelectContainerFocus()\"\n  (blur)=\"onSelectContainerBlur()\"\n  (keydown)=\"onSelectContainerKeydown($event)\"\n  (window:resize)=\"onWindowResize()\">\n\n  <div class=\"single form-control\"\n    *ngIf=\"!multiple\">\n    <div class=\"value\"\n      *ngIf=\"optionList.hasSelected()\">\n      {{optionList.selection[0].label}}\n    </div>\n    <div class=\"placeholder\"\n      *ngIf=\"!optionList.hasSelected()\">\n      {{placeholderView}}\n    </div>\n    <div #clear class=\"clear\"\n      *ngIf=\"allowClear && hasSelected\"\n      (mousedown)=\"onClearSelectionClick($event)\">\n      &#x2715;\n    </div>\n    <span class=\"mdb-select-toggle\"></span>\n  </div>\n\n  <div class=\"multiple form-control\"\n      *ngIf=\"multiple\">\n      <div class=\"placeholder\"\n        *ngIf=\"!optionList.hasSelected()\">\n        {{placeholderView}}\n      </div>\n\n      <div [ngStyle]=\"allowClear && { 'width.%': 90}\" class=\"option\">\n        <span *ngFor=\"let option of optionList.selection\">\n          {{option.label}}<span class=\"deselect-option\">,</span>\n        </span>\n      </div>\n\n      <div #clear class=\"clear\"\n      *ngIf=\"allowClear && hasSelected\"\n      (mousedown)=\"onClearSelectionClick($event)\">\n      &#x2715;\n    </div>\n\n    <span class=\"mdb-select-toggle\"></span>\n\n  </div>\n</div>\n<mdb-select-dropdown\n  *ngIf=\"isOpen\"\n  #dropdown\n  [enableSelectAll]=\"enableSelectAll\"\n  [multiple]=\"multiple\"\n  [dropdownHeight]=\"dropdownHeight\"\n  [dropdownMaxHeight]=\"dropdownMaxHeight\"\n  [optionHeight]=\"optionHeight\"\n  [optionList]=\"optionList\"\n  [notFoundMsg]=\"notFoundMsg\"\n  [customClass]=\"customClass\"\n  [highlightColor]=\"highlightColor\"\n  [highlightTextColor]=\"highlightTextColor\"\n  [filterEnabled]=\"filterEnabled\"\n  [filterAutocomplete]=\"filterAutocomplete\"\n  [placeholder]=\"filterPlaceholder\"\n  [selectAllLabel]=\"selectAllLabel\"\n  [outline]=\"outline\"\n  [top]=\"top\"\n  [left]=\"left\"\n  [width]=\"width\"\n  (close)=\"onDropdownClose($event)\"\n  (optionClicked)=\"onDropdownOptionClicked($event)\"\n  (singleFilterClick)=\"onSingleFilterClick()\"\n  (singleFilterInput)=\"onSingleFilterInput($event)\"\n  (singleFilterKeydown)=\"onSingleFilterKeydown($event)\"\n  (selectAll)=\"onSelectAll($event)\"\n  (animationDone)=\"onDropdownAnimationDone()\"\n  (animationStart)=\"onDropdownAnimationStart()\">\n  <ng-content></ng-content>\n</mdb-select-dropdown>\n",
                    providers: [SELECT_VALUE_ACCESSOR],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".select-wrapper .select-dropdown{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.select-label{position:absolute}.select-wrapper{position:relative}.select-wrapper input.select-dropdown{position:relative;cursor:pointer;background-color:transparent;border:none;border-bottom:1px solid #ced4da;outline:0;height:38px;line-height:2.9rem;width:100%;font-size:1rem;margin:0 0 .94rem;padding:0;display:block;text-overflow:ellipsis;z-index:2}.select-wrapper input.select-dropdown:disabled{color:rgba(0,0,0,.3);border-bottom-color:rgba(0,0,0,.2);cursor:default}.select-wrapper input.select-dropdown .selected,.select-wrapper input.select-dropdown li:focus{background-color:rgba(0,0,0,.15)}.select-wrapper input.select-dropdown li.active{background:0 0}.select-wrapper input.select-dropdown .fab,.select-wrapper input.select-dropdown .far,.select-wrapper input.select-dropdown .fas{color:inherit}.select-wrapper input.active{box-shadow:0 1px 0 0 #4285f4;border-bottom:1px solid #4285f4}.select-wrapper .search-wrap{padding:1rem 0 0;display:block;margin:0 .7rem}.select-wrapper .search-wrap .md-form{margin-top:0;margin-bottom:1rem}.select-wrapper .search-wrap .md-form input{padding-bottom:.4rem;margin-bottom:0}.select-wrapper span.caret{color:initial;position:absolute;right:0;top:.8rem;font-size:.63rem}.select-wrapper span.caret.disabled{color:rgba(0,0,0,.3)}.select-wrapper+label{position:absolute;top:2.125rem;transition:.2s ease-out;color:#757575;font-weight:300}.select-wrapper+label.active{-webkit-transform:translateY(-14px);transform:translateY(-14px);font-size:.8rem;top:1.5rem;left:15px}.select-wrapper+label.active-check{color:#4285f4}.select-wrapper+label.mdb-main-label{z-index:1}.select-wrapper i,.select-wrapper+label.disabled{color:rgba(0,0,0,.3)}.select-wrapper ul{list-style-type:none;padding-left:0}.select-wrapper.md-form>ul li label{top:0;color:#4285f4;font-size:.9rem;-webkit-transform:none;transform:none}.select-wrapper.md-form>ul li.select-toggle-all label{padding-left:38px}.select-wrapper.md-form.colorful-select>ul li.select-toggle-all:hover label{color:#fff}.select-wrapper.md-form.md-outline span.caret{padding-right:.75rem;padding-left:.75rem;color:#495057!important}.select-wrapper.md-form.md-outline span.caret.active{color:#4285f4!important}.select-wrapper.md-form.md-outline .dropdown-content{top:2.7rem!important}.select-wrapper.md-form.md-outline input.select-dropdown{padding:.375rem .75rem;color:#495057}.select-wrapper.md-form.md-outline input.select-dropdown:focus{border-color:#4285f4;box-shadow:inset 0 0 0 1px #4285f4}.select-wrapper.md-form.md-outline+label{position:absolute;-webkit-transform:translateY(40%);transform:translateY(40%);left:23px;color:#757575;background:#fff;font-size:13px;font-weight:500;padding-right:5px;padding-left:5px;top:.5em!important;z-index:2!important}.select-wrapper.md-form.md-outline+label.active{color:#4285f4}select{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;display:none!important}select.browser-default{display:block!important}select:disabled{color:rgba(0,0,0,.3)}.select-dropdown [type=checkbox]:disabled:not(:checked)+label:before{margin-left:0;margin-top:3px}.select-dropdown ul{list-style-type:none;padding:0}.select-dropdown li img{height:30px;width:30px;margin:.3rem .75rem;float:right}.select-dropdown li.disabled,.select-dropdown li.disabled>span,.select-dropdown li.optgroup{color:rgba(0,0,0,.3);background-color:transparent!important;cursor:context-menu}.select-dropdown li.optgroup{border-top:1px solid #eee}.select-dropdown li.optgroup.selected>span{color:rgba(0,0,0,.7)}.select-dropdown li.optgroup>span{color:rgba(0,0,0,.4)}.dropdown-content{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);background-color:#fff;margin:0;display:none;min-width:6.25rem;max-height:40.625rem;overflow-y:auto;opacity:0;position:absolute;z-index:999;will-change:width,height}.dropdown-content li{clear:both;color:#000;cursor:pointer;line-height:1.3rem;width:100%;text-align:left;text-transform:none}.dropdown-content li.active,.dropdown-content li:hover{background-color:#eee}.dropdown-content li>a,.dropdown-content li>span{color:#4285f4;display:block;padding:.5rem}.dropdown-content li>a>i{height:inherit;line-height:inherit}.colorful-select .dropdown-content{padding:.5rem}.colorful-select .dropdown-content li.active span{color:#fff!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)}.colorful-select .dropdown-content li.active span [type=checkbox]:checked+label:before{border-color:transparent #fff #fff transparent}.colorful-select .dropdown-content li a:hover,.colorful-select .dropdown-content li span:hover{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);color:#fff!important;transition:.15s;border-radius:.125rem}.colorful-select .dropdown-content li a:hover [type=checkbox]+label:before,.colorful-select .dropdown-content li span:hover [type=checkbox]+label:before{border-color:#fff}.colorful-select .dropdown-content li a:hover [type=checkbox]:checked+label:before,.colorful-select .dropdown-content li span:hover [type=checkbox]:checked+label:before{border-color:transparent #fff #fff transparent}.colorful-select .dropdown-content li.disabled.active span,.colorful-select .dropdown-content li.optgroup.active span,.colorful-select .dropdown-content li:disabled.active span{box-shadow:none;color:rgba(0,0,0,.3)!important;border-bottom-color:rgba(0,0,0,.3);cursor:default}.colorful-select .dropdown-content li.disabled a:hover,.colorful-select .dropdown-content li.disabled span:hover,.colorful-select .dropdown-content li.optgroup a:hover,.colorful-select .dropdown-content li.optgroup span:hover,.colorful-select .dropdown-content li:disabled a:hover,.colorful-select .dropdown-content li:disabled span:hover{box-shadow:none;color:rgba(0,0,0,.3)!important;border-bottom-color:rgba(0,0,0,.3);cursor:default;background-color:#fff!important}.colorful-select .dropdown-content li.disabled label,.colorful-select .dropdown-content li.optgroup label,.colorful-select .dropdown-content li:disabled label{cursor:default}.dropdown-primary .dropdown-content li a,.dropdown-primary .dropdown-content li span:hover,.dropdown-primary .dropdown-content li.active{background-color:#4285f4!important}.dropdown-primary .dropdown-content li.disabled.active{background-color:transparent!important}.dropdown-primary .search-wrap input:focus{border-bottom:1px solid #4285f4;box-shadow:0 1px 0 0 #4285f4}.dropdown-danger .dropdown-content li a,.dropdown-danger .dropdown-content li span:hover,.dropdown-danger .dropdown-content li.active{background-color:#c00!important}.dropdown-danger .dropdown-content li.disabled.active{background-color:transparent!important}.dropdown-danger .search-wrap input:focus{border-bottom:1px solid #c00;box-shadow:0 1px 0 0 #c00}.dropdown-default .dropdown-content li a,.dropdown-default .dropdown-content li span:hover,.dropdown-default .dropdown-content li.active{background-color:#2bbbad!important}.dropdown-default .dropdown-content li.disabled.active{background-color:transparent!important}.dropdown-default .search-wrap input:focus{border-bottom:1px solid #2bbbad;box-shadow:0 1px 0 0 #2bbbad}.dropdown-secondary .dropdown-content li a,.dropdown-secondary .dropdown-content li span:hover,.dropdown-secondary .dropdown-content li.active{background-color:#a6c!important}.dropdown-secondary .dropdown-content li.disabled.active{background-color:transparent!important}.dropdown-secondary .search-wrap input:focus{border-bottom:1px solid #a6c;box-shadow:0 1px 0 0 #a6c}.dropdown-success .dropdown-content li a,.dropdown-success .dropdown-content li span:hover,.dropdown-success .dropdown-content li.active{background-color:#00c851!important}.dropdown-success .dropdown-content li.disabled.active{background-color:transparent!important}.dropdown-success .search-wrap input:focus{border-bottom:1px solid #00c851;box-shadow:0 1px 0 0 #00c851}.dropdown-info .dropdown-content li a,.dropdown-info .dropdown-content li span:hover,.dropdown-info .dropdown-content li.active{background-color:#33b5e5!important}.dropdown-info .dropdown-content li.disabled.active{background-color:transparent!important}.dropdown-info .search-wrap input:focus{border-bottom:1px solid #33b5e5;box-shadow:0 1px 0 0 #33b5e5}.dropdown-warning .dropdown-content li a,.dropdown-warning .dropdown-content li span:hover,.dropdown-warning .dropdown-content li.active{background-color:#fb3!important}.dropdown-warning .dropdown-content li.disabled.active{background-color:transparent!important}.dropdown-warning .search-wrap input:focus{border-bottom:1px solid #fb3;box-shadow:0 1px 0 0 #fb3}.dropdown-dark .dropdown-content li a,.dropdown-dark .dropdown-content li span:hover,.dropdown-dark .dropdown-content li.active{background-color:#2e2e2e!important}.dropdown-dark .dropdown-content li.disabled.active{background-color:transparent!important}.dropdown-dark .search-wrap input:focus{border-bottom:1px solid #2e2e2e;box-shadow:0 1px 0 0 #2e2e2e}.dropdown-ins .dropdown-content li a,.dropdown-ins .dropdown-content li span:hover,.dropdown-ins .dropdown-content li.active{background-color:#2e5e86!important}.dropdown-ins .dropdown-content li.disabled.active{background-color:transparent!important}.dropdown-ins .search-wrap input:focus{border-bottom:1px solid #2e5e86;box-shadow:0 1px 0 0 #2e5e86}.md-dropdown li.disabled.active{background-color:transparent!important}mdb-select{display:inline-block;margin:0;position:relative;vertical-align:middle;width:100%}mdb-select *{box-sizing:border-box;font-family:Roboto,sans-serif;outline:0}mdb-select.mdb-select-outline{transition:.2s}mdb-select.mdb-select-outline>label{padding-left:10px}mdb-select.mdb-select-outline:active label,mdb-select.mdb-select-outline:focus label,mdb-select.mdb-select-outline:focus-within label{color:#4285f4}mdb-select.mdb-select-outline:active .below>.form-control,mdb-select.mdb-select-outline:focus .below>.form-control,mdb-select.mdb-select-outline:focus-within .below>.form-control{border-color:#4285f4;box-shadow:inset 0 0 0 1px #4285f4}mdb-select.mdb-select-outline .form-control{padding:6px 12px;border:1px solid #dadce0;border-radius:4px}mdb-select.mdb-select-outline>label.active{-webkit-transform:translateY(-17px) scale(.8);transform:translateY(-17px) scale(.8);background:#fff;font-weight:500;padding:0;font-size:1rem;z-index:1}mdb-select>div{border:transparent;box-sizing:border-box;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:100%}mdb-select>div.disabled{color:#aaa!important;cursor:default;pointer-events:none;background-color:transparent}mdb-select>div.disabled>div.single>div.clear,mdb-select>div.disabled>div.single>div.placeholder,mdb-select>div.disabled>div.single>div.toggle{color:rgba(0,0,0,.3)}mdb-select>div>div.single{position:relative;cursor:pointer;background-color:transparent;border:none;border-bottom:1px solid #ccc;outline:0;line-height:2rem;width:100%;font-size:1rem;margin:0;padding:0;display:block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-align:start}mdb-select>div>div.single>div.value{flex:1;line-height:2rem;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding-right:1.2rem!important;color:#292b2c;padding:0 0 5px}mdb-select>div>div.single>div.placeholder{flex:1;line-height:2rem;overflow:hidden;white-space:nowrap;padding:0 0 5px;color:#000}mdb-select>div>div.single>div.clear,mdb-select>div>div.single>div.toggle{float:right;color:#000;line-height:2rem;text-align:center;width:30px;position:absolute;right:0;top:50%;margin-top:-2px;-webkit-transform:translateY(-50%);transform:translateY(-50%)}mdb-select>div>div.single>div.toggle:before{content:'\\25B2'}mdb-select>div>div.single>div.clear:hover,mdb-select>div>div.single>div.toggle:hover{background-color:#ececec}mdb-select>div>div.single>div.clear,mdb-select>div>div.single>div.toggle:hover{background-color:transparent}mdb-select>div>div.single>div.clear{font-size:18px}mdb-select>div>div.single>div.toggle{font-size:14px}mdb-select>div>div.multiple{position:relative;cursor:pointer;background-color:transparent;border:none;border-bottom:1px solid #ccc;outline:0;line-height:2rem;width:100%;font-size:1rem;margin:0;padding:0;display:block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-align:start}mdb-select>div>div.multiple>div.clear,mdb-select>div>div.multiple>div.toggle{float:right;color:#000;line-height:2rem;text-align:center;width:30px;position:absolute;right:0;top:50%;margin-top:-2px;-webkit-transform:translateY(-50%);transform:translateY(-50%)}mdb-select>div>div.multiple>div.clear:hover,mdb-select>div>div.multiple>div.toggle:hover{background-color:#ececec}mdb-select>div>div.multiple>div.clear,mdb-select>div>div.multiple>div.toggle:hover{background-color:transparent}mdb-select>div>div.multiple>div.clear{font-size:18px}mdb-select>div>div.multiple>div.toggle{font-size:14px}mdb-select>div>div.multiple>div.option{overflow:hidden;min-width:0;width:95%;text-overflow:ellipsis;white-space:nowrap;cursor:default;line-height:2rem}mdb-select>div>div.multiple>div.option span:last-child .deselect-option{display:none}mdb-select>div>div.multiple>div.option span.deselect-option{cursor:pointer;height:20px;line-height:2rem;background-color:transparent;border:0;border-radius:0;color:#292b2c;font-size:1rem;margin:0;padding:0}mdb-select>div>div.multiple>div.option span.deselect-option:hover{color:#555}mdb-select>div>div.multiple input{background-color:transparent;border:none;height:30px;line-height:2rem;padding:0}mdb-select>div>div.multiple input:focus{outline:0}mdb-select label{color:#757575;font-size:1rem;position:absolute;top:7px;left:0;transition:.2s ease-out;cursor:text}mdb-select label.active{font-size:.8rem;-webkit-transform:translateY(-120%);transform:translateY(-120%)}mdb-select-dropdown{box-sizing:border-box;font-family:Sans-Serif;color:#4285f4;font-size:19.2px}mdb-select-dropdown *{box-sizing:border-box;font-family:Sans-Serif}mdb-select-dropdown>div{background-color:#fff;outline:transparent;border:0;box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);border-top:none;box-sizing:border-box;position:absolute;z-index:1}mdb-select-dropdown>div .filter{margin-bottom:9.6px!important;margin-top:9.6px!important;height:38px}mdb-select-dropdown>div .options{position:relative;overflow-y:auto}mdb-select-dropdown>div .options ul{list-style:none;margin:0;padding:0}mdb-select-dropdown>div .options ul li{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}mdb-select-dropdown>div .options ul li .filtrable{flex-direction:row;align-items:center}mdb-select-dropdown>div .options ul .selected{background-color:#eee}mdb-select-dropdown>div .options ul .highlighted{background-color:#eee;color:#4285f4}mdb-select-dropdown>div .options ul .disabled{background-color:#fff;color:#9e9e9e;cursor:default;pointer-events:none}mdb-select-dropdown>div .options::-webkit-scrollbar{width:4px;height:4px}mdb-select-dropdown>div .options::-webkit-scrollbar-button:end:increment,mdb-select-dropdown>div .options::-webkit-scrollbar-button:start:decrement{display:block;height:0;background-color:transparent}mdb-select-dropdown>div .options::-webkit-scrollbar-track-piece{background-color:transparent;border-radius:0 0 4px 4px}mdb-select-dropdown>div .options::-webkit-scrollbar-thumb:vertical{height:50px;background-color:#999;border-radius:4px}mdb-select-dropdown .dropdown-content{background-color:#fff;margin:0;width:100%;display:block;min-width:100px;max-height:unset;overflow-y:hidden;opacity:1;position:absolute;z-index:1000;will-change:width,height}mdb-select-dropdown .dropdown-content li>a,mdb-select-dropdown .dropdown-content li>span{color:#4285f4;padding:0 .5rem}mdb-select-dropdown .dropdown-content li.disabled,mdb-select-dropdown .dropdown-content li.disabled>span{color:rgba(0,0,0,.3);background-color:transparent!important}mdb-select-dropdown .dropdown-content li.optgroup{color:rgba(0,0,0,.3);background-color:transparent!important;border-top:1px solid #eee}mdb-select-dropdown .dropdown-content li.optgroup:first-child{border-top:0}mdb-select-dropdown .dropdown-content li.optgroup>span{color:rgba(0,0,0,.4)!important}.dropdown-content li>a,.dropdown-content li>span{font-size:.9rem}.select-dropdown li{overflow:hidden;text-overflow:ellipsis}.colorful-select .multiple-select-dropdown li.active span.filtrable,.colorful-select .multiple-select-dropdown li.selected span.filtrable{color:#fff}.colorful-select .multiple-select-dropdown li.active [type=checkbox]:checked+label:before,.colorful-select .multiple-select-dropdown li.selected [type=checkbox]:checked+label:before{border-color:transparent #fff #fff transparent!important}.dropdown-primary.colorful-select .dropdown-content li.active,.dropdown-primary.colorful-select .dropdown-content li.selected{background-color:transparent!important}.dropdown-primary.colorful-select .dropdown-content li.active span,.dropdown-primary.colorful-select .dropdown-content li.selected span{background-color:#4285f4;color:#fff}.dropdown-danger.colorful-select .dropdown-content li.active,.dropdown-danger.colorful-select .dropdown-content li.selected{background-color:transparent!important}.dropdown-danger.colorful-select .dropdown-content li.active span,.dropdown-danger.colorful-select .dropdown-content li.selected span{background-color:#c00;color:#fff}.dropdown-default.colorful-select .dropdown-content li.active,.dropdown-default.colorful-select .dropdown-content li.selected{background-color:transparent!important}.dropdown-default.colorful-select .dropdown-content li.active span,.dropdown-default.colorful-select .dropdown-content li.selected span{background-color:#2bbbad;color:#fff}.dropdown-secondary.colorful-select .dropdown-content li.active,.dropdown-secondary.colorful-select .dropdown-content li.selected{background-color:transparent!important}.dropdown-secondary.colorful-select .dropdown-content li.active span,.dropdown-secondary.colorful-select .dropdown-content li.selected span{background-color:#a6c;color:#fff}.dropdown-success.colorful-select .dropdown-content li.active,.dropdown-success.colorful-select .dropdown-content li.selected{background-color:transparent!important}.dropdown-success.colorful-select .dropdown-content li.active span,.dropdown-success.colorful-select .dropdown-content li.selected span{background-color:#00c851;color:#fff}.dropdown-info.colorful-select .dropdown-content li.active,.dropdown-info.colorful-select .dropdown-content li.selected{background-color:transparent!important}.dropdown-info.colorful-select .dropdown-content li.active span,.dropdown-info.colorful-select .dropdown-content li.selected span{background-color:#33b5e5;color:#fff}.dropdown-warning.colorful-select .dropdown-content li.active,.dropdown-warning.colorful-select .dropdown-content li.selected{background-color:transparent!important}.dropdown-warning.colorful-select .dropdown-content li.active span,.dropdown-warning.colorful-select .dropdown-content li.selected span{background-color:#fb3;color:#fff}.dropdown-ins.colorful-select .dropdown-content li.active,.dropdown-ins.colorful-select .dropdown-content li.selected{background-color:transparent!important}.dropdown-ins.colorful-select .dropdown-content li.active span,.dropdown-ins.colorful-select .dropdown-content li.selected span{background-color:#3f729b;color:#fff}.dropdown-dark.colorful-select .dropdown-content li.active,.dropdown-dark.colorful-select .dropdown-content li.selected{background-color:transparent!important}.dropdown-dark.colorful-select .dropdown-content li.active span,.dropdown-dark.colorful-select .dropdown-content li.selected span{background-color:#2e2e2e;color:#fff}.multiple-select-dropdown li [type=checkbox]+label{height:10px;top:0!important;margin-top:-2px!important}mdb-select .clear{position:absolute;top:50%;right:30px!important;font-size:18px;color:#000;width:30px;margin-top:-2px;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.md-form mdb-select .form-control{height:calc(2.25rem + 5px);margin-bottom:0}.md-form mdb-select label{color:#757575;font-size:1rem;position:absolute;top:7px;left:0;transition:.2s ease-out;-webkit-transform:translateY(0);transform:translateY(0);cursor:text}.md-form mdb-select label.active{font-size:.8rem;-webkit-transform:translateY(-120%);transform:translateY(-120%)}.md-form mdb-select+label{color:#757575;font-size:1rem;position:absolute;top:7px;left:0;transition:.2s ease-out;-webkit-transform:translateY(0);transform:translateY(0);cursor:text}.md-form mdb-select+label.active{font-size:.8rem;-webkit-transform:translateY(-120%);transform:translateY(-120%)}mdb-select+label{color:#757575;font-size:1rem;position:absolute;top:7px;left:15px;transition:.2s ease-out;-webkit-transform:translateY(0);transform:translateY(0);cursor:text}mdb-select+label.active{font-size:.8rem;-webkit-transform:translateY(-120%);transform:translateY(-120%)}mdb-select .form-control{border-radius:0}mdb-select.validate-success.ng-valid.ng-touched div.multiple,mdb-select.validate-success.ng-valid.ng-touched div.single{border-bottom:1px solid #00c851!important;box-shadow:0 1px 0 0 #00c851!important}mdb-select.validate-success.ng-valid.ng-touched label,mdb-select.validate-success.ng-valid.ng-touched+label{color:#00c851!important}.form-submitted mdb-select.validate-error.ng-invalid div.multiple,.form-submitted mdb-select.validate-error.ng-invalid div.single,mdb-select.validate-error.ng-invalid.ng-touched div.multiple,mdb-select.validate-error.ng-invalid.ng-touched div.single{border-bottom:1px solid #f44336!important;box-shadow:0 1px 0 0 #f44336!important}.form-submitted mdb-select.validate-error.ng-invalid.ng-touched label .form-submitted mdb-select.validate-error.ng-invalid.ng-touched+label,mdb-select.validate-error.ng-invalid.ng-touched label,mdb-select.validate-error.ng-invalid.ng-touched+label{color:#f44336!important}mdb-select.colorful-select .select-dropdown li.selected,mdb-select.colorful-select .select-dropdown li:hover{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)}.mdb-select-toggle{float:right;color:#000;line-height:2rem;text-align:center;width:30px;position:absolute;right:0;top:calc(50% + 6.4px);margin-top:-.5rem;-webkit-transform:translateY(-50%);transform:translateY(-50%);font-size:14px}.mdb-select-toggle:before{content:'\\25BC'}.dropdown-content .custom-select-content:hover{background-color:transparent}[type=checkbox]:checked,[type=checkbox]:not(:checked){position:absolute;opacity:0;pointer-events:none}.form-check-input[type=checkbox]+label,label.btn input[type=checkbox]+label{position:relative;padding-left:35px;cursor:pointer;display:inline-block;height:1.5625rem;line-height:1.5625rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.form-check-input[type=checkbox]+label:before,.form-check-input[type=checkbox]:not(.filled-in)+label:after,label.btn input[type=checkbox]+label:before,label.btn input[type=checkbox]:not(.filled-in)+label:after{content:'';position:absolute;top:0;left:0;width:18px;height:18px;z-index:0;border:2px solid #8a8a8a;border-radius:1px;margin-top:3px;transition:.2s}.form-check-input[type=checkbox]:not(.filled-in)+label:after,label.btn input[type=checkbox]:not(.filled-in)+label:after{border:0;-webkit-transform:scale(0);transform:scale(0)}.form-check-input[type=checkbox]:not(:checked):disabled+label:before,label.btn input[type=checkbox]:not(:checked):disabled+label:before{border:none;background-color:#bdbdbd}.form-check-input[type=checkbox]:checked+label:before,label.btn input[type=checkbox]:checked+label:before{top:-4px;left:-5px;width:12px;height:1.375rem;border-top:2px solid transparent;border-left:2px solid transparent;border-right:2px solid #4285f4;border-bottom:2px solid #4285f4;-webkit-transform:rotate(40deg);transform:rotate(40deg);-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform-origin:100% 100%;transform-origin:100% 100%}.form-check-input[type=checkbox]:checked:disabled+label:before,label.btn input[type=checkbox]:checked:disabled+label:before{border-right:2px solid #bdbdbd;border-bottom:2px solid #bdbdbd}.form-check-input[type=checkbox]:indeterminate+label:before,label.btn input[type=checkbox]:indeterminate+label:before{top:-11px;left:-12px;width:10px;height:1.375rem;border-top:none;border-left:none;border-right:2px solid #4285f4;border-bottom:none;-webkit-transform:rotate(90deg);transform:rotate(90deg);-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform-origin:100% 100%;transform-origin:100% 100%}.form-check-input[type=checkbox]:indeterminate:disabled+label:before,label.btn input[type=checkbox]:indeterminate:disabled+label:before{border-right:2px solid rgba(0,0,0,.46);background-color:transparent}.form-check-input[type=checkbox].filled-in+label:after,label.btn input[type=checkbox].filled-in+label:after{border-radius:.125rem}.form-check-input[type=checkbox].filled-in+label:after,.form-check-input[type=checkbox].filled-in+label:before,label.btn input[type=checkbox].filled-in+label:after,label.btn input[type=checkbox].filled-in+label:before{content:'';left:0;position:absolute;transition:border .25s,background-color .25s,width .2s .1s,height .2s .1s,top .2s .1s,left .2s .1s;z-index:1}.form-check-input[type=checkbox].filled-in:not(:checked)+label:before,label.btn input[type=checkbox].filled-in:not(:checked)+label:before{width:0;height:0;border:3px solid transparent;left:6px;top:10px;-webkit-transform:rotateZ(37deg);transform:rotateZ(37deg);-webkit-transform-origin:100% 100%;transform-origin:100% 100%}.form-check-input[type=checkbox].filled-in:not(:checked)+label:after,label.btn input[type=checkbox].filled-in:not(:checked)+label:after{height:20px;width:20px;background-color:transparent;border:2px solid #5a5a5a;top:0;z-index:0}.form-check-input[type=checkbox].filled-in:checked+label:before,label.btn input[type=checkbox].filled-in:checked+label:before{top:0;left:1px;width:8px;height:13px;border-top:2px solid transparent;border-left:2px solid transparent;border-right:2px solid #fff;border-bottom:2px solid #fff;-webkit-transform:rotateZ(37deg);transform:rotateZ(37deg);-webkit-transform-origin:100% 100%;transform-origin:100% 100%}.form-check-input[type=checkbox].filled-in:checked+label:after,label.btn input[type=checkbox].filled-in:checked+label:after{top:0;width:20px;height:20px;border:2px solid #a6c;background-color:#a6c;z-index:0}.form-check-input[type=checkbox].filled-in.filled-in-danger:checked+label:after,label.btn input[type=checkbox].filled-in.filled-in-danger:checked+label:after{background-color:#f44336;border-color:#f44336}.form-check-input[type=checkbox]:disabled:not(:checked)+label:before,label.btn input[type=checkbox]:disabled:not(:checked)+label:before{background-color:#bdbdbd;border-color:#bdbdbd}.form-check-input[type=checkbox]:disabled:not(:checked)+label:after,label.btn input[type=checkbox]:disabled:not(:checked)+label:after{border-color:#bdbdbd;background-color:#bdbdbd}.form-check-input[type=checkbox]:disabled:checked+label:before,label.btn input[type=checkbox]:disabled:checked+label:before{background-color:transparent}.form-check-input[type=checkbox]:disabled:checked+label:after,label.btn input[type=checkbox]:disabled:checked+label:after{background-color:#bdbdbd;border-color:#bdbdbd}"]
                }] }
    ];
    /** @nocollapse */
    SelectComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ChangeDetectorRef }
    ]; };
    SelectComponent.propDecorators = {
        options: [{ type: Input }],
        customClass: [{ type: Input }],
        allowClear: [{ type: Input }],
        disabled: [{ type: Input }],
        highlightColor: [{ type: Input }],
        highlightTextColor: [{ type: Input }],
        highlightFirst: [{ type: Input }],
        multiple: [{ type: Input }],
        noFilter: [{ type: Input }],
        notFoundMsg: [{ type: Input }],
        placeholder: [{ type: Input }],
        filterPlaceholder: [{ type: Input }],
        label: [{ type: Input }],
        filterEnabled: [{ type: Input }],
        filterAutocomplete: [{ type: Input }],
        visibleOptions: [{ type: Input }],
        optionHeight: [{ type: Input }],
        tabindex: [{ type: Input }],
        enableSelectAll: [{ type: Input }],
        appendToBody: [{ type: Input }],
        selectAllLabel: [{ type: Input }],
        outline: [{ type: Input }],
        opened: [{ type: Output }],
        closed: [{ type: Output }],
        selected: [{ type: Output }],
        deselected: [{ type: Output }],
        noOptionsFound: [{ type: Output }],
        changed: [{ type: Output }],
        selectionSpan: [{ type: ViewChild, args: ['selection', { static: true },] }],
        dropdown: [{ type: ViewChild, args: ['dropdown', { static: false },] }],
        filterInput: [{ type: ViewChild, args: ['filterInput', { static: false },] }],
        clearButton: [{ type: ViewChild, args: ['clear', { static: false },] }]
    };
    return SelectComponent;
}());
export { SelectComponent };
if (false) {
    /** @type {?} */
    SelectComponent.prototype.options;
    /** @type {?} */
    SelectComponent.prototype.customClass;
    /** @type {?} */
    SelectComponent.prototype.allowClear;
    /** @type {?} */
    SelectComponent.prototype.disabled;
    /** @type {?} */
    SelectComponent.prototype.highlightColor;
    /** @type {?} */
    SelectComponent.prototype.highlightTextColor;
    /** @type {?} */
    SelectComponent.prototype.highlightFirst;
    /** @type {?} */
    SelectComponent.prototype.multiple;
    /** @type {?} */
    SelectComponent.prototype.noFilter;
    /** @type {?} */
    SelectComponent.prototype.notFoundMsg;
    /** @type {?} */
    SelectComponent.prototype.placeholder;
    /** @type {?} */
    SelectComponent.prototype.filterPlaceholder;
    /** @type {?} */
    SelectComponent.prototype.label;
    /** @type {?} */
    SelectComponent.prototype.filterEnabled;
    /** @type {?} */
    SelectComponent.prototype.filterAutocomplete;
    /** @type {?} */
    SelectComponent.prototype.visibleOptions;
    /** @type {?} */
    SelectComponent.prototype.optionHeight;
    /** @type {?} */
    SelectComponent.prototype.tabindex;
    /** @type {?} */
    SelectComponent.prototype.enableSelectAll;
    /** @type {?} */
    SelectComponent.prototype.appendToBody;
    /** @type {?} */
    SelectComponent.prototype.selectAllLabel;
    /** @type {?} */
    SelectComponent.prototype.outline;
    /** @type {?} */
    SelectComponent.prototype.opened;
    /** @type {?} */
    SelectComponent.prototype.closed;
    /** @type {?} */
    SelectComponent.prototype.selected;
    /** @type {?} */
    SelectComponent.prototype.deselected;
    /** @type {?} */
    SelectComponent.prototype.noOptionsFound;
    /** @type {?} */
    SelectComponent.prototype.changed;
    /** @type {?} */
    SelectComponent.prototype.selectionSpan;
    /** @type {?} */
    SelectComponent.prototype.dropdown;
    /** @type {?} */
    SelectComponent.prototype.filterInput;
    /** @type {?} */
    SelectComponent.prototype.clearButton;
    /** @type {?} */
    SelectComponent.prototype.KEYS;
    /** @type {?} */
    SelectComponent.prototype._value;
    /** @type {?} */
    SelectComponent.prototype.optionList;
    /** @type {?} */
    SelectComponent.prototype.optionsLength;
    /** @type {?} */
    SelectComponent.prototype.visibleOptionsDefault;
    /** @type {?} */
    SelectComponent.prototype.hasSelected;
    /** @type {?} */
    SelectComponent.prototype.isBrowser;
    /** @type {?} */
    SelectComponent.prototype.hasFocus;
    /** @type {?} */
    SelectComponent.prototype.isOpen;
    /** @type {?} */
    SelectComponent.prototype.isBelow;
    /** @type {?} */
    SelectComponent.prototype.filterInputWidth;
    /** @type {?} */
    SelectComponent.prototype.isDisabled;
    /** @type {?} */
    SelectComponent.prototype.placeholderView;
    /** @type {?} */
    SelectComponent.prototype.labelActive;
    /** @type {?} */
    SelectComponent.prototype.labelRef;
    /** @type {?} */
    SelectComponent.prototype.labelRefActive;
    /** @type {?} */
    SelectComponent.prototype.dropdownAnimationDone;
    /** @type {?} */
    SelectComponent.prototype.clearClicked;
    /** @type {?} */
    SelectComponent.prototype.selectContainerClicked;
    /** @type {?} */
    SelectComponent.prototype.filterHeight;
    /** @type {?} */
    SelectComponent.prototype.dropdownHeight;
    /** @type {?} */
    SelectComponent.prototype.dropdownMaxHeight;
    /** @type {?} */
    SelectComponent.prototype.width;
    /** @type {?} */
    SelectComponent.prototype.top;
    /** @type {?} */
    SelectComponent.prototype.left;
    /** @type {?} */
    SelectComponent.prototype.documentClickFun;
    /** @type {?} */
    SelectComponent.prototype.itemsBefore;
    /** @type {?} */
    SelectComponent.prototype.onChange;
    /** @type {?} */
    SelectComponent.prototype.onTouched;
    /** @type {?} */
    SelectComponent.prototype.el;
    /** @type {?} */
    SelectComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    SelectComponent.prototype.document;
    /**
     * @type {?}
     * @private
     */
    SelectComponent.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vbWF0ZXJpYWwtc2VsZWN0L3NlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUdMLE1BQU0sRUFDTixZQUFZLEVBRVosU0FBUyxFQUNULGlCQUFpQixFQUNqQixVQUFVLEVBQ1YsVUFBVSxFQUNWLFNBQVMsRUFHVCxNQUFNLEVBQ04sV0FBVyxFQUNYLGlCQUFpQixFQUNqQix1QkFBdUIsR0FDeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3RFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUU5RCxNQUFNLEtBQU8scUJBQXFCLEdBQXFCO0lBQ3JELE9BQU8sRUFBRSxpQkFBaUI7O0lBRTFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxjQUFNLE9BQUEsZUFBZSxFQUFmLENBQWUsRUFBQztJQUM5QyxLQUFLLEVBQUUsSUFBSTtDQUNaO0FBRUQ7SUE4RkUsdUJBQXVCO0lBRXZCLDJCQUEyQjtJQUMzQix5QkFDUyxFQUFjLEVBQ2QsUUFBbUIsRUFDQSxRQUFhLEVBQ2xCLFVBQWtCLEVBQy9CLEtBQXdCO1FBSnpCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ0EsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUUvQixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQTVGbEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDeEIsZUFBVSxH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dUNBQTJCOztJQUMzQixtQ0FBMEI7O0lBQzFCLDBDQUFnQzs7SUFDaEMsdUNBQStCOztJQUMvQix5Q0FBdUM7O0lBQ3ZDLGtDQUF5Qjs7SUFFekIsaUNBQThEOztJQUM5RCxpQ0FBOEQ7O0lBQzlELG1DQUF3RTs7SUFDeEUscUNBQWtHOztJQUNsRyx5Q0FBNEU7O0lBQzVFLGtDQUF1Qzs7SUFFdkMsd0NBQW9FOztJQUNwRSxtQ0FBNEU7O0lBQzVFLHNDQUFxRTs7SUFDckUsc0NBQStEOztJQUcvRCwrQkFRRTs7SUFFRixpQ0FBd0I7O0lBQ3hCLHFDQUF1Qjs7SUFDdkIsd0NBQXNCOztJQUN0QixnREFBMEI7O0lBRTFCLHNDQUFvQjs7SUFDcEIsb0NBQW1COztJQUduQixtQ0FBaUI7O0lBQ2pCLGlDQUFlOztJQUNmLGtDQUFlOztJQUNmLDJDQUFxQjs7SUFDckIscUNBQW1COztJQUNuQiwwQ0FBcUI7O0lBQ3JCLHNDQUFvQjs7SUFDcEIsbUNBQXNCOztJQUN0Qix5Q0FBdUI7O0lBQ3ZCLGdEQUE4Qjs7SUFFOUIsdUNBQXFCOztJQUNyQixpREFBK0I7O0lBRS9CLHVDQUFpQjs7SUFDakIseUNBQXVCOztJQUN2Qiw0Q0FBMEI7O0lBRzFCLGdDQUFjOztJQUNkLDhCQUFZOztJQUNaLCtCQUFhOztJQUViLDJDQUEyQjs7SUFFM0Isc0NBQTZCOztJQUU3QixtQ0FBMEI7O0lBQzFCLG9DQUFxQjs7SUFNbkIsNkJBQXFCOztJQUNyQixtQ0FBMEI7Ozs7O0lBQzFCLG1DQUF1Qzs7Ozs7SUFFdkMsZ0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBFeGlzdGluZ1Byb3ZpZGVyLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBmb3J3YXJkUmVmLFxuICBFbGVtZW50UmVmLFxuICBSZW5kZXJlcjIsXG4gIEFmdGVyVmlld0luaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEluamVjdCxcbiAgUExBVEZPUk1fSUQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTZWxlY3REcm9wZG93bkNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LWRyb3Bkb3duLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24taW50ZXJmYWNlJztcbmltcG9ydCB7IE9wdGlvbiB9IGZyb20gJy4vb3B0aW9uJztcbmltcG9ydCB7IE9wdGlvbkxpc3QgfSBmcm9tICcuL29wdGlvbi1saXN0JztcbmltcG9ydCB7IERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCBjb25zdCBTRUxFQ1RfVkFMVUVfQUNDRVNTT1I6IEV4aXN0aW5nUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVzZS1iZWZvcmUtZGVjbGFyZVxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTZWxlY3RDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJ3NlbGVjdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hdGVyaWFsLXNlbGVjdC1tb2R1bGUuc2NzcyddLFxuICBwcm92aWRlcnM6IFtTRUxFQ1RfVkFMVUVfQUNDRVNTT1JdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcywgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgb3B0aW9uczogQXJyYXk8SU9wdGlvbj47XG4gIEBJbnB1dCgpIHB1YmxpYyBjdXN0b21DbGFzcyA9ICcnO1xuICBASW5wdXQoKSBhbGxvd0NsZWFyID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGhpZ2hsaWdodENvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhpZ2hsaWdodFRleHRDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSBoaWdobGlnaHRGaXJzdCA9IHRydWU7XG4gIEBJbnB1dCgpIG11bHRpcGxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIG5vRmlsdGVyID0gMDtcbiAgQElucHV0KCkgbm90Rm91bmRNc2cgPSAnTm8gcmVzdWx0cyBmb3VuZCc7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XG4gIEBJbnB1dCgpIGZpbHRlclBsYWNlaG9sZGVyID0gJyc7XG4gIEBJbnB1dCgpIGxhYmVsID0gJyc7XG4gIEBJbnB1dCgpIGZpbHRlckVuYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgZmlsdGVyQXV0b2NvbXBsZXRlID0gdHJ1ZTtcbiAgQElucHV0KCkgdmlzaWJsZU9wdGlvbnM6IG51bWJlcjtcbiAgQElucHV0KCkgb3B0aW9uSGVpZ2h0ID0gMzc7XG4gIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXI7XG4gIEBJbnB1dCgpIGVuYWJsZVNlbGVjdEFsbCA9IHRydWU7XG4gIEBJbnB1dCgpIGFwcGVuZFRvQm9keTogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0QWxsTGFiZWwgPSAnU2VsZWN0IGFsbCc7XG4gIEBJbnB1dCgpIG91dGxpbmUgPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgb3BlbmVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgY2xvc2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxJT3B0aW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8SU9wdGlvbj4oKTtcbiAgQE91dHB1dCgpIGRlc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxJT3B0aW9uIHwgSU9wdGlvbltdPiA9IG5ldyBFdmVudEVtaXR0ZXI8SU9wdGlvbiB8IElPcHRpb25bXT4oKTtcbiAgQE91dHB1dCgpIG5vT3B0aW9uc0ZvdW5kOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgY2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKCdzZWxlY3Rpb24nLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZWxlY3Rpb25TcGFuOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdkcm9wZG93bicsIHsgc3RhdGljOiBmYWxzZSB9KSBkcm9wZG93bjogU2VsZWN0RHJvcGRvd25Db21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoJ2ZpbHRlcklucHV0JywgeyBzdGF0aWM6IGZhbHNlIH0pIGZpbHRlcklucHV0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdjbGVhcicsIHsgc3RhdGljOiBmYWxzZSB9KSBjbGVhckJ1dHRvbjogRWxlbWVudFJlZjtcblxuICAvLyBBbmd1bGFyIGxpZmVjeWNsZSBob29rcy5cbiAgS0VZUzogYW55ID0ge1xuICAgIEJBQ0tTUEFDRTogOCxcbiAgICBUQUI6IDksXG4gICAgRU5URVI6IDEzLFxuICAgIEVTQzogMjcsXG4gICAgU1BBQ0U6IDMyLFxuICAgIFVQOiAzOCxcbiAgICBET1dOOiA0MCxcbiAgfTtcblxuICBfdmFsdWU6IEFycmF5PGFueT4gPSBbXTtcbiAgb3B0aW9uTGlzdDogT3B0aW9uTGlzdDtcbiAgb3B0aW9uc0xlbmd0aDogbnVtYmVyO1xuICB2aXNpYmxlT3B0aW9uc0RlZmF1bHQgPSA0O1xuICAvLyBTZWxlY3Rpb24gc3RhdGUgdmFyaWFibGVzLlxuICBoYXNTZWxlY3RlZCA9IGZhbHNlO1xuICBpc0Jyb3dzZXI6IGJvb2xlYW47XG5cbiAgLy8gVmlldyBzdGF0ZSB2YXJpYWJsZXMuXG4gIGhhc0ZvY3VzID0gZmFsc2U7XG4gIGlzT3BlbiA9IGZhbHNlO1xuICBpc0JlbG93ID0gdHJ1ZTtcbiAgZmlsdGVySW5wdXRXaWR0aCA9IDE7XG4gIGlzRGlzYWJsZWQgPSBmYWxzZTtcbiAgcGxhY2Vob2xkZXJWaWV3ID0gJyc7XG4gIGxhYmVsQWN0aXZlID0gZmFsc2U7XG4gIGxhYmVsUmVmOiBIVE1MRWxlbWVudDtcbiAgbGFiZWxSZWZBY3RpdmUgPSBmYWxzZTtcbiAgZHJvcGRvd25BbmltYXRpb25Eb25lID0gZmFsc2U7XG5cbiAgY2xlYXJDbGlja2VkID0gZmFsc2U7XG4gIHNlbGVjdENvbnRhaW5lckNsaWNrZWQgPSBmYWxzZTtcblxuICBmaWx0ZXJIZWlnaHQgPSAwO1xuICBkcm9wZG93bkhlaWdodDogbnVtYmVyO1xuICBkcm9wZG93bk1heEhlaWdodDogbnVtYmVyO1xuXG4gIC8vIFdpZHRoIGFuZCBwb3NpdGlvbiBmb3IgdGhlIGRyb3Bkb3duIGNvbnRhaW5lci5cbiAgd2lkdGg6IG51bWJlcjtcbiAgdG9wOiBudW1iZXI7XG4gIGxlZnQ6IG51bWJlcjtcblxuICBkb2N1bWVudENsaWNrRnVuOiBGdW5jdGlvbjtcblxuICBpdGVtc0JlZm9yZTogQXJyYXk8YW55PiA9IFtdO1xuXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIC8qKiBFdmVudCBoYW5kbGVycy4gKiovXG5cbiAgLy8gQW5ndWxhciBsaWZlY3ljbGUgaG9va3MuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogc3RyaW5nLFxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuICAgIHRoaXMuaXNCcm93c2VyID0gaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBsYWNlaG9sZGVyVmlldyA9IHRoaXMucGxhY2Vob2xkZXI7XG4gICAgdGhpcy51cGRhdGVGaWx0ZXJIZWlnaHQoKTtcbiAgICB0aGlzLnVwZGF0ZURyb3Bkb3duSGVpZ2h0KCk7XG4gICAgaWYgKHRoaXMubGFiZWwpIHtcbiAgICAgIHRoaXMudXBkYXRlTGFiZWxTdGF0ZSgpO1xuICAgIH1cblxuICAgIHRoaXMubGFiZWxSZWYgPSB0aGlzLl9nZXRMYWJlbFJlZigpO1xuXG4gICAgaWYgKHRoaXMubGFiZWxSZWYpIHtcbiAgICAgIHRoaXMudXBkYXRlTGFiZWxSZWZTdGF0ZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhpZ2hsaWdodEZpcnN0KSB7XG4gICAgICB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0Rmlyc3QgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dldExhYmVsUmVmKCk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCBzZWxlY3RQYXJlbnRFbCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlO1xuICAgIGNvbnN0IGxhYmVsUmVmID0gc2VsZWN0UGFyZW50RWwucXVlcnlTZWxlY3RvcignbGFiZWwnKTtcbiAgICByZXR1cm4gbGFiZWxSZWY7XG4gIH1cblxuICB1cGRhdGVGaWx0ZXJIZWlnaHQoKSB7XG4gICAgdGhpcy5maWx0ZXJFbmFibGVkID8gKHRoaXMuZmlsdGVySGVpZ2h0ID0gNzgpIDogKHRoaXMuZmlsdGVySGVpZ2h0ID0gMCk7XG4gIH1cblxuICB1cGRhdGVEcm9wZG93bkhlaWdodCgpIHtcbiAgICBjb25zdCBjdXN0b21Db250ZW50SGVpZ2h0ID0gdGhpcy5kcm9wZG93blxuICAgICAgPyB0aGlzLmRyb3Bkb3duLmN1c3RvbUNvbnRlbnQubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICAgIDogMDtcblxuICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMuZW5hYmxlU2VsZWN0QWxsKSB7XG4gICAgICB0aGlzLmRyb3Bkb3duTWF4SGVpZ2h0ID0gdGhpcy52aXNpYmxlT3B0aW9uc1xuICAgICAgICA/IHRoaXMub3B0aW9uSGVpZ2h0ICogKHRoaXMudmlzaWJsZU9wdGlvbnMgKyAxKSArIGN1c3RvbUNvbnRlbnRIZWlnaHRcbiAgICAgICAgOiB0aGlzLm9wdGlvbkhlaWdodCAqICh0aGlzLnZpc2libGVPcHRpb25zRGVmYXVsdCArIDEpICsgY3VzdG9tQ29udGVudEhlaWdodDtcblxuICAgICAgdGhpcy5kcm9wZG93bkhlaWdodCA9XG4gICAgICAgIHRoaXMub3B0aW9uSGVpZ2h0ICogKHRoaXMub3B0aW9uTGlzdC5vcHRpb25zLmxlbmd0aCArIDEpICsgY3VzdG9tQ29udGVudEhlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcm9wZG93bk1heEhlaWdodCA9IHRoaXMudmlzaWJsZU9wdGlvbnNcbiAgICAgICAgPyB0aGlzLm9wdGlvbkhlaWdodCAqIHRoaXMudmlzaWJsZU9wdGlvbnMgKyBjdXN0b21Db250ZW50SGVpZ2h0XG4gICAgICAgIDogdGhpcy5vcHRpb25IZWlnaHQgKiB0aGlzLnZpc2libGVPcHRpb25zRGVmYXVsdCArIGN1c3RvbUNvbnRlbnRIZWlnaHQ7XG5cbiAgICAgIHRoaXMuZHJvcGRvd25IZWlnaHQgPVxuICAgICAgICB0aGlzLm9wdGlvbkhlaWdodCAqIHRoaXMub3B0aW9uTGlzdC5vcHRpb25zLmxlbmd0aCArIGN1c3RvbUNvbnRlbnRIZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgb25Ecm9wZG93bkFuaW1hdGlvbkRvbmUoKSB7XG4gICAgdGhpcy5kcm9wZG93bkFuaW1hdGlvbkRvbmUgPSB0cnVlO1xuICB9XG5cbiAgb25Ecm9wZG93bkFuaW1hdGlvblN0YXJ0KCkge1xuICAgIHRoaXMuZHJvcGRvd25BbmltYXRpb25Eb25lID0gZmFsc2U7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdvdXRsaW5lJykpIHtcbiAgICAgIGlmIChjaGFuZ2VzWydvdXRsaW5lJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbWRiLXNlbGVjdC1vdXRsaW5lJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ21kYi1zZWxlY3Qtb3V0bGluZScpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9ucycpKSB7XG4gICAgICB0aGlzLnVwZGF0ZU9wdGlvbnNMaXN0KGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUpO1xuICAgICAgdGhpcy51cGRhdGVTdGF0ZSgpO1xuICAgICAgdGhpcy51cGRhdGVEcm9wZG93bkhlaWdodCgpO1xuICAgICAgdGhpcy5hcHBlbmRUb0JvZHkgPyB0aGlzLl91cGRhdGVBcHBlbmRlZFBvc2l0aW9uKCkgOiB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICB0aGlzLmNoYW5nZWQuZW1pdCh7XG4gICAgICAgIHByZXZpb3VzVmFsdWU6IGNoYW5nZXMub3B0aW9ucy5wcmV2aW91c1ZhbHVlLFxuICAgICAgICBjdXJyZW50VmFsdWU6IGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUsXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ25vRmlsdGVyJykpIHtcbiAgICAgIGNvbnN0IG51bU9wdGlvbnM6IG51bWJlciA9IHRoaXMub3B0aW9uTGlzdC5vcHRpb25zLmxlbmd0aDtcbiAgICAgIGNvbnN0IG1pbk51bU9wdGlvbnM6IG51bWJlciA9IGNoYW5nZXNbJ25vRmlsdGVyJ10uY3VycmVudFZhbHVlO1xuICAgICAgdGhpcy5maWx0ZXJFbmFibGVkID0gbnVtT3B0aW9ucyA+PSBtaW5OdW1PcHRpb25zO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdwbGFjZWhvbGRlcicpKSB7XG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgaXNDaGlsZChlbGVtbnQ6IGFueSkge1xuICAgIGxldCBub2RlID0gZWxlbW50LnBhcmVudE5vZGU7XG4gICAgd2hpbGUgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgaWYgKG5vZGUgPT09IHRoaXMuZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG9uV2luZG93UmVzaXplKCkge1xuICAgIHRoaXMudXBkYXRlV2lkdGgoKTtcbiAgfVxuXG4gIC8vIFNlbGVjdCBjb250YWluZXIuXG5cbiAgb25TZWxlY3RDb250YWluZXJDbGljayhldmVudDogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNDaGlsZChldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLnNlbGVjdENvbnRhaW5lckNsaWNrZWQgPSB0cnVlO1xuICAgICAgdGhpcy5vcGVuRHJvcGRvd24oKTtcblxuICAgICAgaWYgKHRoaXMubGFiZWwpIHtcbiAgICAgICAgdGhpcy51cGRhdGVMYWJlbFN0YXRlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmxhYmVsUmVmKSB7XG4gICAgICAgIHRoaXMudXBkYXRlTGFiZWxSZWZTdGF0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uU2VsZWN0Q29udGFpbmVyRm9jdXMoKSB7XG4gICAgaWYgKHRoaXMubGFiZWwpIHtcbiAgICAgIHRoaXMubGFiZWxBY3RpdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxhYmVsUmVmKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMubGFiZWxSZWYsICdhY3RpdmUnKTtcbiAgICB9XG4gICAgdGhpcy5vcGVuRHJvcGRvd24oKTtcbiAgfVxuXG4gIG9uU2VsZWN0Q29udGFpbmVyQmx1cigpIHtcbiAgICBpZiAodGhpcy5sYWJlbCkge1xuICAgICAgdGhpcy51cGRhdGVMYWJlbFN0YXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGFiZWxSZWYpIHtcbiAgICAgIHRoaXMudXBkYXRlTGFiZWxSZWZTdGF0ZSgpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc09wZW4gJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuICB9XG5cbiAgb25TZWxlY3RDb250YWluZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmhhbmRsZVNlbGVjdENvbnRhaW5lcktleWRvd24oZXZlbnQpO1xuICB9XG5cbiAgLy8gRHJvcGRvd24gY29udGFpbmVyLlxuXG4gIG9uRHJvcGRvd25PcHRpb25DbGlja2VkKG9wdGlvbjogT3B0aW9uKSB7XG4gICAgdGhpcy5tdWx0aXBsZSA/IHRoaXMudG9nZ2xlU2VsZWN0T3B0aW9uKG9wdGlvbikgOiB0aGlzLnNlbGVjdE9wdGlvbihvcHRpb24pO1xuICB9XG5cbiAgb25Ecm9wZG93bkNsb3NlKGZvY3VzOiBhbnkpIHtcbiAgICB0aGlzLmNsb3NlRHJvcGRvd24oZm9jdXMpO1xuICB9XG5cbiAgLy8gU2luZ2xlIGZpbHRlciBpbnB1dC5cbiAgb25TaW5nbGVGaWx0ZXJDbGljaygpIHtcbiAgICB0aGlzLnNlbGVjdENvbnRhaW5lckNsaWNrZWQgPSB0cnVlO1xuICB9XG5cbiAgb25TaW5nbGVGaWx0ZXJJbnB1dCh0ZXJtOiBzdHJpbmcpIHtcbiAgICBjb25zdCBoYXNTaG93bjogYm9vbGVhbiA9IHRoaXMub3B0aW9uTGlzdC5maWx0ZXIodGVybSk7XG4gICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy5lbmFibGVTZWxlY3RBbGwpIHtcbiAgICAgIHRoaXMuZHJvcGRvd25IZWlnaHQgPSAodGhpcy5vcHRpb25MaXN0LmZpbHRlcmVkLmxlbmd0aCArIDEpICogdGhpcy5vcHRpb25IZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJvcGRvd25IZWlnaHQgPSB0aGlzLm9wdGlvbkxpc3QuZmlsdGVyZWQubGVuZ3RoICogdGhpcy5vcHRpb25IZWlnaHQ7XG4gICAgfVxuICAgIGlmICghaGFzU2hvd24pIHtcbiAgICAgIHRoaXMubm9PcHRpb25zRm91bmQuZW1pdCh0ZXJtKTtcbiAgICAgIHRoaXMuZHJvcGRvd25IZWlnaHQgPSB0aGlzLm9wdGlvbkhlaWdodDtcbiAgICB9XG4gIH1cblxuICBvblNpbmdsZUZpbHRlcktleWRvd24oZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuaGFuZGxlU2luZ2xlRmlsdGVyS2V5ZG93bihldmVudCk7XG4gIH1cblxuICAvLyBNdWx0aXBsZSBmaWx0ZXIgaW5wdXQuXG5cbiAgb25NdWx0aXBsZUZpbHRlcklucHV0KGV2ZW50OiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLm9wZW5Ecm9wZG93bigpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUZpbHRlcldpZHRoKCk7XG4gICAgY29uc3QgdGVybTogc3RyaW5nID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIGNvbnN0IGhhc1Nob3duOiBib29sZWFuID0gdGhpcy5vcHRpb25MaXN0LmZpbHRlcih0ZXJtKTtcbiAgICBpZiAoIWhhc1Nob3duKSB7XG4gICAgICB0aGlzLm5vT3B0aW9uc0ZvdW5kLmVtaXQodGVybSk7XG4gICAgfVxuICB9XG5cbiAgb25NdWx0aXBsZUZpbHRlcktleWRvd24oZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuaGFuZGxlTXVsdGlwbGVGaWx0ZXJLZXlkb3duKGV2ZW50KTtcbiAgfVxuXG4gIC8vIFNpbmdsZSBjbGVhciBzZWxlY3QuXG5cbiAgb25DbGVhclNlbGVjdGlvbkNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuY2xlYXJDbGlja2VkID0gdHJ1ZTtcbiAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgdGhpcy5wbGFjZWhvbGRlclZpZXcgPSB0aGlzLnBsYWNlaG9sZGVyO1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG5cbiAgICBpZiAodGhpcy5sYWJlbCkge1xuICAgICAgdGhpcy51cGRhdGVMYWJlbFN0YXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGFiZWxSZWYpIHtcbiAgICAgIHRoaXMudXBkYXRlTGFiZWxSZWZTdGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIE11bHRpcGxlIGRlc2VsZWN0IG9wdGlvbi5cblxuICBvbkRlc2VsZWN0T3B0aW9uQ2xpY2sob3B0aW9uOiBPcHRpb24pIHtcbiAgICB0aGlzLmNsZWFyQ2xpY2tlZCA9IHRydWU7XG4gICAgdGhpcy5kZXNlbGVjdE9wdGlvbihvcHRpb24pO1xuICB9XG5cbiAgLyoqIEFQSS4gKiovXG5cbiAgLy8gVE9ETyBmaXggaXNzdWVzIHdpdGggZ2xvYmFsIGNsaWNrL2tleSBoYW5kbGVyIHRoYXQgY2xvc2VzIHRoZSBkcm9wZG93bi5cbiAgb3BlbigpIHtcbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMub3BlbkRyb3Bkb3duKCk7XG4gICAgfSk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLl92YWx1ZSA6IHRoaXMuX3ZhbHVlWzBdO1xuICB9XG5cbiAgc2V0IHZhbHVlKHY6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG4gICAgaWYgKHR5cGVvZiB2ID09PSAndW5kZWZpbmVkJyB8fCB2ID09PSBudWxsIHx8IHYgPT09ICcnKSB7XG4gICAgICB2ID0gW107XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHYgPT09ICdudW1iZXInIHx8IHR5cGVvZiB2ID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHYgPSBbdl07XG4gICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgbXVzdCBiZSBhIHN0cmluZyBvciBhbiBhcnJheS4nKTtcbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbkxpc3QudmFsdWUgPSB2O1xuICAgIHRoaXMuX3ZhbHVlID0gdjtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKCk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gIH1cblxuICBzZWxlY3QodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMub3B0aW9uTGlzdC5nZXRPcHRpb25zQnlWYWx1ZSh2YWx1ZSkuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgdGhpcy5zZWxlY3RPcHRpb24ob3B0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UgbWV0aG9kcy4gKiovXG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuaGFzU2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgICAgdGhpcy5oYXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxhYmVsKSB7XG4gICAgICB0aGlzLnVwZGF0ZUxhYmVsU3RhdGUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sYWJlbFJlZikge1xuICAgICAgdGhpcy51cGRhdGVMYWJlbFJlZlN0YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4gdm9pZCkge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICB2YWx1ZUNoYW5nZWQoKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLm9wdGlvbkxpc3QudmFsdWU7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSgpO1xuICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gIH1cblxuICB1cGRhdGVTdGF0ZSgpIHtcbiAgICB0aGlzLnBsYWNlaG9sZGVyVmlldyA9IHRoaXMucGxhY2Vob2xkZXI7XG4gICAgdGhpcy51cGRhdGVGaWx0ZXJXaWR0aCgpO1xuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogSW5pdGlhbGl6YXRpb24uICoqL1xuXG4gIHVwZGF0ZU9wdGlvbnNMaXN0KG9wdGlvbnM6IEFycmF5PElPcHRpb24+KSB7XG4gICAgdGhpcy5vcHRpb25MaXN0ID0gbmV3IE9wdGlvbkxpc3Qob3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25MaXN0LnZhbHVlID0gdGhpcy5fdmFsdWU7XG4gICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHVwZGF0ZUxhYmVsU3RhdGUoKSB7XG4gICAgaWYgKCF0aGlzLnBsYWNlaG9sZGVyICYmICF0aGlzLmhhc1NlbGVjdGVkICYmICF0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5sYWJlbEFjdGl2ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxhYmVsQWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVMYWJlbFJlZlN0YXRlKCkge1xuICAgIGlmICghdGhpcy5wbGFjZWhvbGRlciAmJiAhdGhpcy5oYXNTZWxlY3RlZCAmJiAhdGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5sYWJlbFJlZiwgJ2FjdGl2ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMubGFiZWxSZWYsICdhY3RpdmUnKTtcbiAgICB9XG4gIH1cblxuICAvKiogRHJvcGRvd24uICoqL1xuICB0b2dnbGVEcm9wZG93bigpIHtcbiAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCkge1xuICAgICAgdGhpcy5pc09wZW4gPyB0aGlzLmNsb3NlRHJvcGRvd24odHJ1ZSkgOiB0aGlzLm9wZW5Ecm9wZG93bigpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5Ecm9wZG93bigpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3otaW5kZXgnLCAnMTAwMCcpO1xuICAgIGlmICghdGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcblxuICAgICAgaWYgKHRoaXMuYXBwZW5kVG9Cb2R5KSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX2FwcGVuZERyb3Bkb3duKCk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnVwZGF0ZVdpZHRoKCk7XG4gICAgICB0aGlzLmFwcGVuZFRvQm9keSA/IHRoaXMuX3VwZGF0ZUFwcGVuZGVkUG9zaXRpb24oKSA6IHRoaXMudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgIFsnY2xpY2snLCAndG91Y2hzdGFydCddLmZvckVhY2goKGV2OiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrRnVuID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgZXYsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMuaXNDaGlsZChldmVudC50YXJnZXQpICYmXG4gICAgICAgICAgICB0aGlzLmlzT3BlbiAmJlxuICAgICAgICAgICAgdGhpcy5kcm9wZG93bkFuaW1hdGlvbkRvbmUgJiZcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldCAhPT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJJbnB1dCgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5sYWJlbCkge1xuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUxhYmVsU3RhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubGFiZWxSZWYpIHtcbiAgICAgICAgICAgICAgdGhpcy51cGRhdGVMYWJlbFJlZlN0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLm9wZW5lZC5lbWl0KHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBjbG9zZURyb3Bkb3duKGZvY3VzOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAodGhpcy5hcHBlbmRUb0JvZHkgJiYgdGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQoJ2JvZHknLCB0aGlzLmRyb3Bkb3duLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5sYXN0RWxlbWVudENoaWxkLmNsYXNzTGlzdDtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3otaW5kZXgnKTtcbiAgICBjb250YWluZXIucmVtb3ZlKCdmYWRlSW5TZWxlY3QnKTtcblxuICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5jbGVhckZpbHRlcklucHV0KCk7XG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgaWYgKGZvY3VzKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2xvc2VkLmVtaXQodGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5kb2N1bWVudENsaWNrRnVuKCk7XG5cbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogU2VsZWN0LiAqKi9cblxuICBzZWxlY3RPcHRpb24ob3B0aW9uOiBPcHRpb24pIHtcbiAgICBpZiAoIW9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5vcHRpb25MaXN0LnNlbGVjdChvcHRpb24sIHRoaXMubXVsdGlwbGUpO1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZWQoKTtcbiAgICAgIHRoaXMuc2VsZWN0ZWQuZW1pdChvcHRpb24ud3JhcHBlZE9wdGlvbik7XG4gICAgICB0aGlzLmhhc1NlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgaWYgKHRoaXMubGFiZWwpIHtcbiAgICAgICAgdGhpcy51cGRhdGVMYWJlbFN0YXRlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmxhYmVsUmVmKSB7XG4gICAgICAgIHRoaXMudXBkYXRlTGFiZWxSZWZTdGF0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRoaXMubXVsdGlwbGUgJiYgIW9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgfVxuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBkZXNlbGVjdE9wdGlvbihvcHRpb246IE9wdGlvbikge1xuICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMub3B0aW9uTGlzdC5kZXNlbGVjdChvcHRpb24pO1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZWQoKTtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJWaWV3ID0gdGhpcy5wbGFjZWhvbGRlcjtcblxuICAgICAgaWYgKHRoaXMub3B0aW9uTGlzdC5zZWxlY3Rpb24ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuaGFzU2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5sYWJlbCkge1xuICAgICAgICAgIHRoaXMudXBkYXRlTGFiZWxTdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGFiZWxSZWYpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUxhYmVsUmVmU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5kZXNlbGVjdGVkLmVtaXQob3B0aW9uLndyYXBwZWRPcHRpb24pO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgIGNvbnN0IHNlbGVjdGlvbjogQXJyYXk8T3B0aW9uPiA9IHRoaXMub3B0aW9uTGlzdC5zZWxlY3Rpb247XG4gICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLm9wdGlvbkxpc3QuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKCk7XG4gICAgICB0aGlzLmhhc1NlbGVjdGVkID0gZmFsc2U7XG5cbiAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRoaXMuZGVzZWxlY3RlZC5lbWl0KHNlbGVjdGlvblswXS53cmFwcGVkT3B0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGVzZWxlY3RlZC5lbWl0KFxuICAgICAgICAgIHNlbGVjdGlvbi5tYXAob3B0aW9uID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24ud3JhcHBlZE9wdGlvbjtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVNlbGVjdE9wdGlvbihvcHRpb246IE9wdGlvbikge1xuICAgIG9wdGlvbi5zZWxlY3RlZCA/IHRoaXMuZGVzZWxlY3RPcHRpb24ob3B0aW9uKSA6IHRoaXMuc2VsZWN0T3B0aW9uKG9wdGlvbik7XG4gIH1cblxuICBzZWxlY3RIaWdobGlnaHRlZE9wdGlvbigpIHtcbiAgICBjb25zdCBvcHRpb246IE9wdGlvbiA9IHRoaXMub3B0aW9uTGlzdC5oaWdobGlnaHRlZE9wdGlvbjtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiBvcHRpb24gIT09IG51bGwpIHtcbiAgICAgIHRoaXMudG9nZ2xlU2VsZWN0T3B0aW9uKG9wdGlvbik7XG4gICAgfVxuICAgIGlmICghdGhpcy5tdWx0aXBsZSAmJiBvcHRpb24gIT09IG51bGwpIHtcbiAgICAgIHRoaXMuc2VsZWN0T3B0aW9uKG9wdGlvbik7XG4gICAgICB0aGlzLmNsb3NlRHJvcGRvd24odHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZGVzZWxlY3RMYXN0KCkge1xuICAgIGNvbnN0IHNlbDogQXJyYXk8T3B0aW9uPiA9IHRoaXMub3B0aW9uTGlzdC5zZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG9wdGlvbjogT3B0aW9uID0gc2VsW3NlbC5sZW5ndGggLSAxXTtcbiAgICAgIHRoaXMuZGVzZWxlY3RPcHRpb24ob3B0aW9uKTtcbiAgICAgIHRoaXMuc2V0TXVsdGlwbGVGaWx0ZXJJbnB1dChvcHRpb24ubGFiZWwgKyAnICcpO1xuICAgIH1cbiAgfVxuXG4gIG9uU2VsZWN0QWxsKGlzU2VsZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgdGhpcy5vcHRpb25MaXN0LmZpbHRlcmVkXG4gICAgICAgIC5maWx0ZXIob3B0aW9uID0+ICFvcHRpb24uZGlzYWJsZWQpXG4gICAgICAgIC5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RPcHRpb24ob3B0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0aW9uTGlzdC5maWx0ZXJlZFxuICAgICAgICAuZmlsdGVyKG9wdGlvbiA9PiAhb3B0aW9uLmRpc2FibGVkKVxuICAgICAgICAuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgICAgIHRoaXMuZGVzZWxlY3RPcHRpb24ob3B0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEZpbHRlci4gKiovXG5cbiAgY2xlYXJGaWx0ZXJJbnB1dCgpIHtcbiAgICB0aGlzLmRyb3Bkb3duLmNsZWFyRmlsdGVySW5wdXQoKTtcbiAgICB0aGlzLnVwZGF0ZURyb3Bkb3duSGVpZ2h0KCk7XG4gIH1cblxuICBzZXRNdWx0aXBsZUZpbHRlcklucHV0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5maWx0ZXJFbmFibGVkKSB7XG4gICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTZWxlY3RDb250YWluZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBrZXkgPSBldmVudC5rZXlDb2RlO1xuXG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICBpZiAoa2V5ID09PSB0aGlzLktFWVMuRVNDIHx8IChrZXkgPT09IHRoaXMuS0VZUy5VUCAmJiBldmVudC5hbHRLZXkpKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bih0cnVlKTtcblxuICAgICAgICBpZiAodGhpcy5sYWJlbCkge1xuICAgICAgICAgIHRoaXMudXBkYXRlTGFiZWxTdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGFiZWxSZWYpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUxhYmVsUmVmU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChrZXkgPT09IHRoaXMuS0VZUy5UQUIpIHtcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gdGhpcy5LRVlTLkVOVEVSKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0SGlnaGxpZ2h0ZWRPcHRpb24oKTtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy5lbmFibGVTZWxlY3RBbGwpIHtcbiAgICAgICAgICB0aGlzLmRyb3Bkb3duLnVwZGF0ZVNlbGVjdEFsbFN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSB0aGlzLktFWVMuVVApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodFByZXZpb3VzT3B0aW9uKCk7XG4gICAgICAgIHRoaXMuZHJvcGRvd24ubW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcoKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSB0aGlzLktFWVMuRE9XTikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLm9wdGlvbkxpc3QuaGlnaGxpZ2h0TmV4dE9wdGlvbigpO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLm1vdmVIaWdobGlnaHRlZEludG9WaWV3KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChcbiAgICAgICAga2V5ID09PSB0aGlzLktFWVMuRU5URVIgfHxcbiAgICAgICAga2V5ID09PSB0aGlzLktFWVMuU1BBQ0UgfHxcbiAgICAgICAgKGtleSA9PT0gdGhpcy5LRVlTLkRPV04gJiYgZXZlbnQuYWx0S2V5KVxuICAgICAgKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMub3BlbkRyb3Bkb3duKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTXVsdGlwbGVGaWx0ZXJLZXlkb3duKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBrZXkgPSBldmVudC53aGljaDtcblxuICAgIGlmIChrZXkgPT09IHRoaXMuS0VZUy5CQUNLU1BBQ0UpIHtcbiAgICAgIGlmICh0aGlzLmhhc1NlbGVjdGVkICYmIHRoaXMuZmlsdGVyRW5hYmxlZCAmJiB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPT09ICcnKSB7XG4gICAgICAgIHRoaXMuZGVzZWxlY3RMYXN0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlU2luZ2xlRmlsdGVyS2V5ZG93bihldmVudDogYW55KSB7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQud2hpY2g7XG5cbiAgICBpZiAoXG4gICAgICBrZXkgPT09IHRoaXMuS0VZUy5FU0MgfHxcbiAgICAgIGtleSA9PT0gdGhpcy5LRVlTLlRBQiB8fFxuICAgICAga2V5ID09PSB0aGlzLktFWVMuVVAgfHxcbiAgICAgIGtleSA9PT0gdGhpcy5LRVlTLkRPV04gfHxcbiAgICAgIGtleSA9PT0gdGhpcy5LRVlTLkVOVEVSXG4gICAgKSB7XG4gICAgICB0aGlzLmhhbmRsZVNlbGVjdENvbnRhaW5lcktleWRvd24oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBWaWV3LiAqKi9cblxuICBmb2N1cygpIHtcbiAgICB0aGlzLmhhc0ZvY3VzID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuZmlsdGVyRW5hYmxlZCkge1xuICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU3Bhbi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gIH1cblxuICBibHVyKCkge1xuICAgIHRoaXMuaGFzRm9jdXMgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdGlvblNwYW4ubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gIH1cblxuICB1cGRhdGVXaWR0aCgpIHtcbiAgICB0aGlzLndpZHRoID0gdGhpcy5zZWxlY3Rpb25TcGFuLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gIH1cblxuICB1cGRhdGVQb3NpdGlvbigpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IGRvY0VsOiBhbnkgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICBsZXQgZWxQb3NpdGlvbiA9IDA7XG4gICAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgZWxQb3NpdGlvbiA9XG4gICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSArXG4gICAgICAgICAgdGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgfVxuICAgICAgY29uc3Qgc2VsZWN0U3BhbiA9IHRoaXMuc2VsZWN0aW9uU3Bhbi5uYXRpdmVFbGVtZW50O1xuICAgICAgdGhpcy5sZWZ0ID0gc2VsZWN0U3Bhbi5vZmZzZXRMZWZ0O1xuICAgICAgY29uc3QgYm90dG9tOiBhbnkgPSBkb2NFbC5zY3JvbGxUb3AgKyBkb2NFbC5jbGllbnRIZWlnaHQ7XG4gICAgICBjb25zdCBkcm9wZG93bkhlaWdodCA9XG4gICAgICAgIHRoaXMuZHJvcGRvd25NYXhIZWlnaHQgPiB0aGlzLmRyb3Bkb3duSGVpZ2h0ID8gdGhpcy5kcm9wZG93bkhlaWdodCA6IHRoaXMuZHJvcGRvd25NYXhIZWlnaHQ7XG4gICAgICB0aGlzLnVwZGF0ZURyb3Bkb3duSGVpZ2h0KCk7XG4gICAgICBpZiAoZWxQb3NpdGlvbiArIGRyb3Bkb3duSGVpZ2h0ID49IGJvdHRvbSkge1xuICAgICAgICB0aGlzLnRvcCA9IHNlbGVjdFNwYW4ub2Zmc2V0SGVpZ2h0IC0gZHJvcGRvd25IZWlnaHQgLSB0aGlzLmZpbHRlckhlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudG9wID0gMDtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVBcHBlbmRlZFBvc2l0aW9uKCkge1xuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgY29uc3Qgc2VsZWN0UmVjdDogQ2xpZW50UmVjdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCB0aGlzLmRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgICAgY29uc3Qgb2Zmc2V0VG9wID0gc2VsZWN0UmVjdC50b3AgKyBzY3JvbGxUb3A7XG4gICAgICBjb25zdCBoZWlnaHQgPSBzZWxlY3RSZWN0LmhlaWdodDtcbiAgICAgIGNvbnN0IGRyb3Bkb3duSGVpZ2h0ID1cbiAgICAgICAgdGhpcy5kcm9wZG93bk1heEhlaWdodCA+IHRoaXMuZHJvcGRvd25IZWlnaHQgPyB0aGlzLmRyb3Bkb3duSGVpZ2h0IDogdGhpcy5kcm9wZG93bk1heEhlaWdodDtcblxuICAgICAgdGhpcy5sZWZ0ID0gc2VsZWN0UmVjdC5sZWZ0O1xuICAgICAgaWYgKFxuICAgICAgICBvZmZzZXRUb3AgKyBkcm9wZG93bkhlaWdodCArIHRoaXMuZmlsdGVySGVpZ2h0ID5cbiAgICAgICAgc2Nyb2xsVG9wICsgdGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgICApIHtcbiAgICAgICAgdGhpcy50b3AgPSBvZmZzZXRUb3AgLSBkcm9wZG93bkhlaWdodCArIGhlaWdodCAtIHRoaXMuZmlsdGVySGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50b3AgPSBvZmZzZXRUb3A7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYXBwZW5kRHJvcGRvd24oKSB7XG4gICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICBjb25zdCBib2R5ID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICBjb25zdCBkcm9wZG93biA9IHRoaXMuZHJvcGRvd24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgaWYgKGJvZHkpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChib2R5LCBkcm9wZG93bik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlRmlsdGVyV2lkdGgoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmZpbHRlcklucHV0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgIHRoaXMuZmlsdGVySW5wdXRXaWR0aCA9XG4gICAgICAgIHZhbHVlLmxlbmd0aCA9PT0gMCA/IDEgKyB0aGlzLnBsYWNlaG9sZGVyVmlldy5sZW5ndGggKiAxMCA6IDEgKyB2YWx1ZS5sZW5ndGggKiAxMDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==