/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, forwardRef, HostListener, Input, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, timer } from 'rxjs';
import { take } from 'rxjs/operators';
/** @type {?} */
export var CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return CheckboxComponent; })),
    multi: true,
};
/** @type {?} */
var defaultIdNumber = 0;
var MdbCheckboxChange = /** @class */ (function () {
    function MdbCheckboxChange() {
    }
    return MdbCheckboxChange;
}());
export { MdbCheckboxChange };
if (false) {
    /** @type {?} */
    MdbCheckboxChange.prototype.element;
    /** @type {?} */
    MdbCheckboxChange.prototype.checked;
}
var CheckboxComponent = /** @class */ (function () {
    function CheckboxComponent() {
        this.defaultId = "mdb-checkbox-" + ++defaultIdNumber;
        this.id = this.defaultId;
        this.checked = false;
        this.filledIn = false;
        this.indeterminate = false;
        this.rounded = false;
        this.checkboxPosition = 'left';
        this.default = false;
        this.inline = false;
        this.change = new EventEmitter();
        this.checkboxClicked = new Subject();
        // Control Value Accessor Methods
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    CheckboxComponent.prototype.onLabelClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this.checkboxClicked.next(true);
    };
    /**
     * @return {?}
     */
    CheckboxComponent.prototype.onDocumentClick = /**
     * @return {?}
     */
    function () {
        this.checkboxClicked.next(false);
    };
    /**
     * @return {?}
     */
    CheckboxComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.indeterminate && !this.filledIn && !this.rounded) {
            this.inputEl.indeterminate = true;
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CheckboxComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty('checked')) {
            this.checked = changes.checked.currentValue;
        }
    };
    Object.defineProperty(CheckboxComponent.prototype, "changeEvent", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var newChangeEvent = new MdbCheckboxChange();
            newChangeEvent.element = this;
            newChangeEvent.checked = this.checked;
            return newChangeEvent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CheckboxComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        this.checked = !this.checked;
        this.indeterminate = false;
        this.onChange(this.checked);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CheckboxComponent.prototype.onCheckboxClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this.toggle();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CheckboxComponent.prototype.onCheckboxChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        event.stopPropagation();
        timer(0).subscribe((/**
         * @return {?}
         */
        function () { return _this.change.emit(_this.changeEvent); }));
    };
    /**
     * @return {?}
     */
    CheckboxComponent.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.checkboxClicked.pipe(take(1)).subscribe((/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (!val) {
                _this.onTouched();
            }
        }));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    CheckboxComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
        this.checked = !!value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    CheckboxComponent.prototype.registerOnChange = /**
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
    CheckboxComponent.prototype.registerOnTouched = /**
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
    CheckboxComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    CheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-checkbox',
                    template: "<div\n  [ngClass]=\"{\n  'custom-control custom-checkbox': default,\n  'form-check': !default,\n  'custom-control-inline': inline,\n  'form-check-inline': inline && !default }\">\n  <input\n    #input\n    type=\"checkbox\"\n    class=\"custom-control-input\"\n    [ngClass]=\"{\n      'filled-in': filledIn || rounded,\n      'custom-control-input': default,\n      'form-check-input': !default }\"\n    [id]=\"id\"\n    [checked]=\"checked\"\n    [disabled]=\"disabled\"\n    [required]=\"required\"\n    [indeterminate]=\"indeterminate\"\n    [attr.name]=\"name\"\n    [attr.value]=\"value\"\n    [tabIndex]=\"tabIndex\"\n    (blur)=\"onBlur()\"\n    (click)=\"onCheckboxClick($event)\"\n    (change)=\"onCheckboxChange($event)\">\n  <label\n    [ngClass]=\"{\n      'custom-control-label': default,\n      'form-check-label': !default,\n      'label-before': checkboxPosition === 'right',\n      'checkbox-rounded': rounded,\n      'disabled': disabled }\"\n    [attr.for]=\"id\">\n    <ng-content></ng-content>\n  </label>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    providers: [CHECKBOX_VALUE_ACCESSOR],
                    styles: [".form-check-label.label-before:after,.form-check-label.label-before:before{top:0!important;right:0!important;left:auto!important}.custom-control-label.label-before:after,.custom-control-label.label-before:before{top:.25rem!important;right:0!important;left:auto!important}.custom-control-label.label-before{position:absolute}.custom-control-inline .label-before{position:relative}.form-check-label.label-before{padding-left:0!important;padding-right:35px}.custom-control-label.label-before{padding-left:0!important;padding-right:25px!important}.form-check-input[type=checkbox]:checked+.label-before:before,label.btn input[type=checkbox]:checked+.label-before:before{top:-4px!important;right:10px!important;left:auto!important}.form-check-input[type=checkbox]:indeterminate+.label-before:before,label.btn input[type=checkbox]:indeterminate+.label-before:before{top:-11px!important;right:16px!important;left:auto!important}.form-check-input[type=checkbox].filled-in+.label-before:before,.form-check-input[type=checkbox].filled-in:checked+.label-before:before,label.btn input[type=checkbox].filled-in+.label-before:before,label.btn input[type=checkbox].filled-in:checked+.label-before:before{top:0!important;right:10px!important;left:auto!important}.form-check-input[type=checkbox].filled-in+.label-before:after,label.btn input[type=checkbox].filled-in+.label-before:after{top:0!important;left:auto!important}.checkbox-rounded:after{border-radius:50%!important}mdb-checkbox .form-check{padding-left:0!important}[type=checkbox]:checked,[type=checkbox]:not(:checked){position:absolute;opacity:0;pointer-events:none}.form-check-input[type=checkbox]+label,label.btn input[type=checkbox]+label{position:relative;padding-left:35px;cursor:pointer;display:inline-block;height:1.5625rem;line-height:1.5625rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.form-check-input[type=checkbox]+label:before,.form-check-input[type=checkbox]:not(.filled-in)+label:after,label.btn input[type=checkbox]+label:before,label.btn input[type=checkbox]:not(.filled-in)+label:after{content:'';position:absolute;top:0;left:0;width:18px;height:18px;z-index:0;border:2px solid #8a8a8a;border-radius:1px;margin-top:3px;transition:.2s}.form-check-input[type=checkbox]:not(.filled-in)+label:after,label.btn input[type=checkbox]:not(.filled-in)+label:after{border:0;-webkit-transform:scale(0);transform:scale(0)}.form-check-input[type=checkbox]:not(:checked):disabled+label:before,label.btn input[type=checkbox]:not(:checked):disabled+label:before{border:none;background-color:#bdbdbd}.form-check-input[type=checkbox]:checked+label:before,label.btn input[type=checkbox]:checked+label:before{top:-4px;left:-5px;width:12px;height:1.375rem;border-top:2px solid transparent;border-left:2px solid transparent;border-right:2px solid #4285f4;border-bottom:2px solid #4285f4;-webkit-transform:rotate(40deg);transform:rotate(40deg);-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform-origin:100% 100%;transform-origin:100% 100%}.form-check-input[type=checkbox]:checked:disabled+label:before,label.btn input[type=checkbox]:checked:disabled+label:before{border-right:2px solid #bdbdbd;border-bottom:2px solid #bdbdbd}.form-check-input[type=checkbox]:indeterminate+label:before,label.btn input[type=checkbox]:indeterminate+label:before{top:-11px;left:-12px;width:10px;height:1.375rem;border-top:none;border-left:none;border-right:2px solid #4285f4;border-bottom:none;-webkit-transform:rotate(90deg);transform:rotate(90deg);-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform-origin:100% 100%;transform-origin:100% 100%}.form-check-input[type=checkbox]:indeterminate:disabled+label:before,label.btn input[type=checkbox]:indeterminate:disabled+label:before{border-right:2px solid rgba(0,0,0,.46);background-color:transparent}.form-check-input[type=checkbox].filled-in+label:after,label.btn input[type=checkbox].filled-in+label:after{border-radius:.125rem}.form-check-input[type=checkbox].filled-in+label:after,.form-check-input[type=checkbox].filled-in+label:before,label.btn input[type=checkbox].filled-in+label:after,label.btn input[type=checkbox].filled-in+label:before{content:'';left:0;position:absolute;transition:border .25s,background-color .25s,width .2s .1s,height .2s .1s,top .2s .1s,left .2s .1s;z-index:1}.form-check-input[type=checkbox].filled-in:not(:checked)+label:before,label.btn input[type=checkbox].filled-in:not(:checked)+label:before{width:0;height:0;border:3px solid transparent;left:6px;top:10px;-webkit-transform:rotateZ(37deg);transform:rotateZ(37deg);-webkit-transform-origin:100% 100%;transform-origin:100% 100%}.form-check-input[type=checkbox].filled-in:not(:checked)+label:after,label.btn input[type=checkbox].filled-in:not(:checked)+label:after{height:20px;width:20px;background-color:transparent;border:2px solid #5a5a5a;top:0;z-index:0}.form-check-input[type=checkbox].filled-in:checked+label:before,label.btn input[type=checkbox].filled-in:checked+label:before{top:0;left:1px;width:8px;height:13px;border-top:2px solid transparent;border-left:2px solid transparent;border-right:2px solid #fff;border-bottom:2px solid #fff;-webkit-transform:rotateZ(37deg);transform:rotateZ(37deg);-webkit-transform-origin:100% 100%;transform-origin:100% 100%}.form-check-input[type=checkbox].filled-in:checked+label:after,label.btn input[type=checkbox].filled-in:checked+label:after{top:0;width:20px;height:20px;border:2px solid #a6c;background-color:#a6c;z-index:0}.form-check-input[type=checkbox].filled-in.filled-in-danger:checked+label:after,label.btn input[type=checkbox].filled-in.filled-in-danger:checked+label:after{background-color:#f44336;border-color:#f44336}.form-check-input[type=checkbox]:disabled:not(:checked)+label:before,label.btn input[type=checkbox]:disabled:not(:checked)+label:before{background-color:#bdbdbd;border-color:#bdbdbd}.form-check-input[type=checkbox]:disabled:not(:checked)+label:after,label.btn input[type=checkbox]:disabled:not(:checked)+label:after{border-color:#bdbdbd;background-color:#bdbdbd}.form-check-input[type=checkbox]:disabled:checked+label:before,label.btn input[type=checkbox]:disabled:checked+label:before{background-color:transparent}.form-check-input[type=checkbox]:disabled:checked+label:after,label.btn input[type=checkbox]:disabled:checked+label:after{background-color:#bdbdbd;border-color:#bdbdbd}"]
                }] }
    ];
    /** @nocollapse */
    CheckboxComponent.ctorParameters = function () { return []; };
    CheckboxComponent.propDecorators = {
        inputEl: [{ type: ViewChild, args: ['input', { static: true },] }],
        class: [{ type: Input }],
        id: [{ type: Input }],
        required: [{ type: Input }],
        name: [{ type: Input }],
        value: [{ type: Input }],
        checked: [{ type: Input }],
        filledIn: [{ type: Input }],
        indeterminate: [{ type: Input }],
        disabled: [{ type: Input }],
        rounded: [{ type: Input }],
        checkboxPosition: [{ type: Input }],
        default: [{ type: Input }],
        inline: [{ type: Input }],
        tabIndex: [{ type: Input }],
        change: [{ type: Output }],
        onLabelClick: [{ type: HostListener, args: ['click', ['$event'],] }],
        onDocumentClick: [{ type: HostListener, args: ['document:click',] }]
    };
    return CheckboxComponent;
}());
export { CheckboxComponent };
if (false) {
    /** @type {?} */
    CheckboxComponent.prototype.inputEl;
    /**
     * @type {?}
     * @private
     */
    CheckboxComponent.prototype.defaultId;
    /** @type {?} */
    CheckboxComponent.prototype.class;
    /** @type {?} */
    CheckboxComponent.prototype.id;
    /** @type {?} */
    CheckboxComponent.prototype.required;
    /** @type {?} */
    CheckboxComponent.prototype.name;
    /** @type {?} */
    CheckboxComponent.prototype.value;
    /** @type {?} */
    CheckboxComponent.prototype.checked;
    /** @type {?} */
    CheckboxComponent.prototype.filledIn;
    /** @type {?} */
    CheckboxComponent.prototype.indeterminate;
    /** @type {?} */
    CheckboxComponent.prototype.disabled;
    /** @type {?} */
    CheckboxComponent.prototype.rounded;
    /** @type {?} */
    CheckboxComponent.prototype.checkboxPosition;
    /** @type {?} */
    CheckboxComponent.prototype.default;
    /** @type {?} */
    CheckboxComponent.prototype.inline;
    /** @type {?} */
    CheckboxComponent.prototype.tabIndex;
    /** @type {?} */
    CheckboxComponent.prototype.change;
    /**
     * @type {?}
     * @private
     */
    CheckboxComponent.prototype.checkboxClicked;
    /** @type {?} */
    CheckboxComponent.prototype.onChange;
    /** @type {?} */
    CheckboxComponent.prototype.onTouched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvY2hlY2tib3gvY2hlY2tib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBRU4sU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRXRDLE1BQU0sS0FBTyx1QkFBdUIsR0FBUTtJQUMxQyxPQUFPLEVBQUUsaUJBQWlCOztJQUUxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsY0FBTSxPQUFBLGlCQUFpQixFQUFqQixDQUFpQixFQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ1o7O0lBRUcsZUFBZSxHQUFHLENBQUM7QUFFdkI7SUFBQTtJQUdBLENBQUM7SUFBRCx3QkFBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7O0lBRkMsb0NBQTJCOztJQUMzQixvQ0FBaUI7O0FBR25CO0lBK0JFO1FBckJRLGNBQVMsR0FBRyxrQkFBZ0IsRUFBRSxlQUFpQixDQUFDO1FBRy9DLE9BQUUsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBSTVCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUV0QixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLHFCQUFnQixHQUFHLE1BQU0sQ0FBQztRQUMxQixZQUFPLEdBQUcs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QXdCOztJQUN4QixxQ0FBMEI7O0lBRTFCLG1DQUEwRjs7Ozs7SUFFMUYsNENBQWlEOztJQStEakQscUNBQTBCOztJQUMxQixzQ0FBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1YmplY3QsIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY29uc3QgQ0hFQ0tCT1hfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdXNlLWJlZm9yZS1kZWNsYXJlXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENoZWNrYm94Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5sZXQgZGVmYXVsdElkTnVtYmVyID0gMDtcblxuZXhwb3J0IGNsYXNzIE1kYkNoZWNrYm94Q2hhbmdlIHtcbiAgZWxlbWVudDogQ2hlY2tib3hDb21wb25lbnQ7XG4gIGNoZWNrZWQ6IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1jaGVja2JveCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jaGVja2JveC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaGVja2JveC1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFtDSEVDS0JPWF9WQUxVRV9BQ0NFU1NPUl0sXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrYm94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBAVmlld0NoaWxkKCdpbnB1dCcsIHsgc3RhdGljOiB0cnVlIH0pIGlucHV0RWw6IGFueTtcblxuICBwcml2YXRlIGRlZmF1bHRJZCA9IGBtZGItY2hlY2tib3gtJHsrK2RlZmF1bHRJZE51bWJlcn1gO1xuXG4gIEBJbnB1dCgpIGNsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSB0aGlzLmRlZmF1bHRJZDtcbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcbiAgQElucHV0KCkgY2hlY2tlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBmaWxsZWRJbiA9IGZhbHNlO1xuICBASW5wdXQoKSBpbmRldGVybWluYXRlID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSByb3VuZGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGNoZWNrYm94UG9zaXRpb24gPSAnbGVmdCc7XG4gIEBJbnB1dCgpIGRlZmF1bHQgPSBmYWxzZTtcbiAgQElucHV0KCkgaW5saW5lID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRhYkluZGV4OiBudW1iZXI7XG5cbiAgQE91dHB1dCgpIGNoYW5nZTogRXZlbnRFbWl0dGVyPE1kYkNoZWNrYm94Q2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWRiQ2hlY2tib3hDaGFuZ2U+KCk7XG5cbiAgcHJpdmF0ZSBjaGVja2JveENsaWNrZWQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uTGFiZWxDbGljayhldmVudDogYW55KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5jaGVja2JveENsaWNrZWQubmV4dCh0cnVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJylcbiAgb25Eb2N1bWVudENsaWNrKCkge1xuICAgIHRoaXMuY2hlY2tib3hDbGlja2VkLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuaW5kZXRlcm1pbmF0ZSAmJiAhdGhpcy5maWxsZWRJbiAmJiAhdGhpcy5yb3VuZGVkKSB7XG4gICAgICB0aGlzLmlucHV0RWwuaW5kZXRlcm1pbmF0ZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdjaGVja2VkJykpIHtcbiAgICAgIHRoaXMuY2hlY2tlZCA9IGNoYW5nZXMuY2hlY2tlZC5jdXJyZW50VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGNoYW5nZUV2ZW50KCkge1xuICAgIGNvbnN0IG5ld0NoYW5nZUV2ZW50ID0gbmV3IE1kYkNoZWNrYm94Q2hhbmdlKCk7XG4gICAgbmV3Q2hhbmdlRXZlbnQuZWxlbWVudCA9IHRoaXM7XG4gICAgbmV3Q2hhbmdlRXZlbnQuY2hlY2tlZCA9IHRoaXMuY2hlY2tlZDtcbiAgICByZXR1cm4gbmV3Q2hhbmdlRXZlbnQ7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgIHRoaXMub25DaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgfVxuXG4gIG9uQ2hlY2tib3hDbGljayhldmVudDogYW55KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIG9uQ2hlY2tib3hDaGFuZ2UoZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRpbWVyKDApLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuY2hhbmdlRXZlbnQpKTtcbiAgfVxuXG4gIG9uQmx1cigpIHtcbiAgICB0aGlzLmNoZWNrYm94Q2xpY2tlZC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgaWYgKCF2YWwpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIENvbnRyb2wgVmFsdWUgQWNjZXNzb3IgTWV0aG9kc1xuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5jaGVja2VkID0gISF2YWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxufVxuIl19