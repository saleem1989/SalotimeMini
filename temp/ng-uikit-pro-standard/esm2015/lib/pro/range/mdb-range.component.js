/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, ViewChild, ElementRef, Renderer2, Input, HostListener, forwardRef, Output, EventEmitter, ChangeDetectorRef, ViewEncapsulation, } from '@angular/core';
/** @type {?} */
export const RANGE_VALUE_ACCESOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => MdbRangeInputComponent)),
    multi: true,
};
export class MdbRangeInputComponent {
    /**
     * @param {?} renderer
     * @param {?} cdRef
     */
    constructor(renderer, cdRef) {
        this.renderer = renderer;
        this.cdRef = cdRef;
        this.min = 0;
        this.max = 100;
        this.rangeValueChange = new EventEmitter();
        this.range = 0;
        this.cloudRange = 0;
        this.visibility = false;
        // Control Value Accessor Methods
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onchange(event) {
        this.onChange(event.target.value);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    oninput(event) {
        /** @type {?} */
        const value = +event.target.value;
        this.rangeValueChange.emit({ value: value });
        if (this.checkIfSafari()) {
            this.focusRangeInput();
        }
    }
    /**
     * @return {?}
     */
    onclick() {
        this.focusRangeInput();
    }
    /**
     * @return {?}
     */
    onTouchStart() {
        this.focusRangeInput();
    }
    /**
     * @return {?}
     */
    onmouseleave() {
        if (this.checkIfSafari()) {
            this.blurRangeInput();
        }
    }
    /**
     * @return {?}
     */
    focusRangeInput() {
        this.input.nativeElement.focus();
        this.visibility = true;
    }
    /**
     * @return {?}
     */
    blurRangeInput() {
        this.input.nativeElement.blur();
        this.visibility = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    coverage(event) {
        if (typeof this.range === 'string' && this.range.length !== 0) {
            return this.range;
        }
        if (!this.default) {
            /** @type {?} */
            const newValue = event.target.value;
            /** @type {?} */
            const newRelativeGain = newValue - this.min;
            /** @type {?} */
            const inputWidth = this.input.nativeElement.offsetWidth;
            /** @type {?} */
            let thumbOffset = 0;
            /** @type {?} */
            const offsetAmmount = 15;
            /** @type {?} */
            const distanceFromMiddle = newRelativeGain - this.steps / 2;
            this.stepLength = inputWidth / this.steps;
            thumbOffset = (distanceFromMiddle / this.steps) * offsetAmmount;
            this.cloudRange = this.stepLength * newRelativeGain - thumbOffset;
            this.renderer.setStyle(this.rangeCloud.nativeElement, 'left', this.cloudRange + 'px');
        }
    }
    /**
     * @return {?}
     */
    checkIfSafari() {
        /** @type {?} */
        const isSafari = navigator.userAgent.indexOf('Safari') > -1;
        /** @type {?} */
        const isChrome = navigator.userAgent.indexOf('Chrome') > -1;
        /** @type {?} */
        const isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
        /** @type {?} */
        const isOpera = navigator.userAgent.indexOf('Opera') > -1;
        if (isSafari && !isChrome && !isFirefox && !isOpera) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.steps = this.max - this.min;
        if (this.value) {
            this.range = this.value;
            this.cdRef.detectChanges();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
MdbRangeInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-range-input',
                template: "<div *ngIf=\"!default\" class=\"range-field\" #rangeField>\n  <div class=\"track\">\n    <div #rangeCloud class=\"range-cloud\" title=\"range\"\n         [ngClass]=\"{'visible': this.visibility, 'hidden': !this.visibility}\">\n      <span class=\"text-transform\">{{range}}</span>\n    </div>\n  </div>\n  <input #input\n         [name]=\"name\"\n         type=\"range\"\n         [disabled]=\"disabled\"\n         [id]=\"id\"\n         [min]=\"min\"\n         [max]=\"max\"\n         [step]=\"step\"\n         [value]=\"value\"\n         [(ngModel)]=\"range\"\n         (focus)=\"this.visibility = true\"\n         (blur)=\"this.visibility = false\"\n         (input)=\"coverage($event)\">\n</div>\n\n<div *ngIf=\"default\">\n  <label for=\"customRange1\">Example range</label>\n  <input #input\n         class=\"custom-range\"\n         [name]=\"name\"\n         type=\"range\"\n         [id]=\"id\"\n         [min]=\"min\"\n         [max]=\"max\"\n         [step]=\"step\"\n         [attr.value]=\"value\"\n         [value]=\"value\"\n         [(ngModel)]=\"range\"\n         (focus)=\"this.visibility = true\"\n         (blur)=\"this.visibility = false\"\n         (input)=\"coverage($event)\"\n         (touchend)=\"blurRangeInput()\">\n  <span class=\"{{defaultRangeCounterClass}}\">{{ range }}</span>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                providers: [RANGE_VALUE_ACCESOR],
                styles: [".range-field input[type=range]{cursor:pointer;position:relative;background-color:transparent;border:1px solid #fff;outline:0;width:100%;margin:15px 0;padding:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}.range-field input[type=range]:focus{outline:0}.range-field input[type=range]+.thumb{position:absolute;border:none;height:0;width:0;border-radius:50%;background-color:#4285f4;top:10px;margin-left:-6px;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.range-field input[type=range]+.thumb .value{display:block;width:30px;text-align:center;color:#4285f4;font-size:0;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.range-field input[type=range]+.thumb.active{border-radius:50% 50% 50% 0}.range-field input[type=range]+.thumb.active .value{color:#fff;margin-left:-1px;margin-top:8px;font-size:10px}.range-field input[type=range]::-webkit-slider-runnable-track{height:3px;background:#c2c0c2;border:none}.range-field input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;border:none;height:14px;width:14px;border-radius:50%;background-color:#4285f4;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;margin:-5px 0 0;transition:.3s}.range-field input[type=range]:focus::-webkit-slider-runnable-track{background:#ccc}.range-field input[type=range]::-moz-range-track{height:3px;background:#c2c0c2;border:none}.range-field input[type=range]::-moz-range-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#4285f4;margin-top:-5px}.range-field input[type=range]:-moz-focusring{outline:#fff solid 1px;outline-offset:-1px}.range-field input[type=range]:focus::-moz-range-track{background:#c2c0c2}.range-field input[type=range]::-ms-track{height:3px;background:0 0;border-color:transparent;border-width:6px 0;color:transparent}.range-field input[type=range]::-ms-fill-lower{background:#c2c0c2}.range-field input[type=range]::-ms-fill-upper{background:#c2c0c2}.range-field input[type=range]::-ms-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#4285f4}.range-field input[type=range]:focus::-ms-fill-lower{background:#c2c0c2}.range-field input[type=range]:focus::-ms-fill-upper{background:#c2c0c2}@supports (--css:variables){input[type=range].mdbMultiRange{padding:0;margin:0;display:inline-block;vertical-align:top}input[type=range].mdbMultiRange.original{position:absolute}input[type=range].mdbMultiRange.original::-webkit-slider-thumb{position:relative;z-index:2}input[type=range].mdbMultiRange.original::-moz-range-thumb{transform:scale(1);z-index:1}input[type=range].mdbMultiRange::-moz-range-track{border-color:transparent}input[type=range].mdbMultiRange.ghost{position:relative}input[type=range].mdbMultiRange.ghost:nth-of-type(n+1){position:absolute}}.multi-range-field{position:relative}.multi-range-field input[type=range]{cursor:pointer;position:relative;background-color:transparent;border:1px solid #fff;outline:0;width:100%;margin:15px 0;padding:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}.multi-range-field input[type=range]:focus{outline:0}.multi-range-field input[type=range]+.thumb{position:absolute;border:none;height:0;width:0;border-radius:50%;background-color:#4285f4;top:10px;margin-left:-6px;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.multi-range-field input[type=range]+.thumb .value{display:block;width:30px;text-align:center;color:#4285f4;font-size:0;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.multi-range-field input[type=range]+.thumb.active{border-radius:50% 50% 50% 0}.multi-range-field input[type=range]+.thumb.active .value{color:#fff;margin-left:-1px;margin-top:8px;font-size:10px}.multi-range-field input[type=range]::-webkit-slider-runnable-track{height:3px;background:#c2c0c2;border:none}.multi-range-field input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;border:none;height:14px;width:14px;border-radius:50%;background-color:#4285f4;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;margin:-5px 0 0;transition:.3s}.multi-range-field input[type=range]:focus::-webkit-slider-runnable-track{background:#ccc}.multi-range-field input[type=range]::-moz-range-track{height:3px;background:#c2c0c2;border:none}.multi-range-field input[type=range]::-moz-range-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#4285f4;margin-top:-5px}.multi-range-field input[type=range]:-moz-focusring{outline:#fff solid 1px;outline-offset:-1px}.multi-range-field input[type=range]:focus::-moz-range-track{background:#c2c0c2}.multi-range-field input[type=range]::-ms-track{height:3px;background:0 0;border-color:transparent;border-width:6px 0;color:transparent}.multi-range-field input[type=range]::-ms-fill-lower{background:#c2c0c2}.multi-range-field input[type=range]::-ms-fill-upper{background:#c2c0c2}.multi-range-field input[type=range]::-ms-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#4285f4}.multi-range-field input[type=range]:focus::-ms-fill-lower{background:#c2c0c2}.multi-range-field input[type=range]:focus::-ms-fill-upper{background:#c2c0c2}.thumb-horizontal-wrapper{position:relative;-webkit-transform:rotate(-270deg);transform:rotate(-270deg);top:500px}.multi-range-field input[type=range]+.thumb-horizontal .value{-webkit-transform:rotate(315deg)!important;transform:rotate(315deg)!important}.range-field{position:relative}.range-field .track{position:absolute;right:8px;left:8px;margin-left:-7.5px}.range-field .track .range-cloud{height:30px;width:30px;top:-25px;background-color:#4285f4;position:absolute;color:#fff;border-radius:50%;font-size:12px;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.range-field .track .range-cloud:after{content:'';position:absolute;bottom:0;left:50%;-webkit-transform:translate(-50%,70%);transform:translate(-50%,70%);width:0;height:0;border-style:solid;border-width:7px 7px 0;border-color:#4285f4 transparent transparent}.range-field .track .range-cloud.hidden{display:none}.range-field .track .range-cloud.visible{display:block}.range-field .track .range-cloud .text-transform{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}"]
            }] }
];
/** @nocollapse */
MdbRangeInputComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
MdbRangeInputComponent.propDecorators = {
    input: [{ type: ViewChild, args: ['input', { static: false },] }],
    rangeCloud: [{ type: ViewChild, args: ['rangeCloud', { static: false },] }],
    rangeField: [{ type: ViewChild, args: ['rangeField', { static: false },] }],
    id: [{ type: Input }],
    required: [{ type: Input }],
    name: [{ type: Input }],
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    step: [{ type: Input }],
    default: [{ type: Input }],
    defaultRangeCounterClass: [{ type: Input }],
    rangeValueChange: [{ type: Output }],
    onchange: [{ type: HostListener, args: ['change', ['$event'],] }],
    oninput: [{ type: HostListener, args: ['input', ['$event'],] }],
    onclick: [{ type: HostListener, args: ['click',] }],
    onTouchStart: [{ type: HostListener, args: ['touchstart',] }],
    onmouseleave: [{ type: HostListener, args: ['mouseleave',] }]
};
if (false) {
    /** @type {?} */
    MdbRangeInputComponent.prototype.input;
    /** @type {?} */
    MdbRangeInputComponent.prototype.rangeCloud;
    /** @type {?} */
    MdbRangeInputComponent.prototype.rangeField;
    /** @type {?} */
    MdbRangeInputComponent.prototype.id;
    /** @type {?} */
    MdbRangeInputComponent.prototype.required;
    /** @type {?} */
    MdbRangeInputComponent.prototype.name;
    /** @type {?} */
    MdbRangeInputComponent.prototype.value;
    /** @type {?} */
    MdbRangeInputComponent.prototype.disabled;
    /** @type {?} */
    MdbRangeInputComponent.prototype.min;
    /** @type {?} */
    MdbRangeInputComponent.prototype.max;
    /** @type {?} */
    MdbRangeInputComponent.prototype.step;
    /** @type {?} */
    MdbRangeInputComponent.prototype.default;
    /** @type {?} */
    MdbRangeInputComponent.prototype.defaultRangeCounterClass;
    /** @type {?} */
    MdbRangeInputComponent.prototype.rangeValueChange;
    /** @type {?} */
    MdbRangeInputComponent.prototype.range;
    /** @type {?} */
    MdbRangeInputComponent.prototype.stepLength;
    /** @type {?} */
    MdbRangeInputComponent.prototype.steps;
    /** @type {?} */
    MdbRangeInputComponent.prototype.cloudRange;
    /** @type {?} */
    MdbRangeInputComponent.prototype.visibility;
    /** @type {?} */
    MdbRangeInputComponent.prototype.onChange;
    /** @type {?} */
    MdbRangeInputComponent.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    MdbRangeInputComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    MdbRangeInputComponent.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXJhbmdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vcmFuZ2UvbWRiLXJhbmdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixTQUFTLEVBQ1QsS0FBSyxFQUNMLFlBQVksRUFDWixVQUFVLEVBRVYsTUFBTSxFQUNOLFlBQVksRUFDWixpQkFBaUIsRUFDakIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDOztBQUV2QixNQUFNLE9BQU8sbUJBQW1CLEdBQVE7SUFDdEMsT0FBTyxFQUFFLGlCQUFpQjs7SUFFMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixFQUFDO0lBQ3JELEtBQUssRUFBRSxJQUFJO0NBQ1o7QUFTRCxNQUFNLE9BQU8sc0JBQXNCOzs7OztJQWtEakMsWUFBb0IsUUFBbUIsRUFBVSxLQUF3QjtRQUFyRCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUF4Q2hFLFFBQUcsR0FBRyxDQUFDLENBQUM7UUFDUixRQUFHLEdBQUcsR0FBRyxDQUFDO1FBS1QscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUVyRCxVQUFLLEdBQVEsQ0FBQyxDQUFDO1FBR2YsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGVBQVUsR0FBRyxLQUFLLENBQUM7O1FBc0ZuQixhQUFROzs7O1FBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFFLENBQUMsRUFBQztRQUMxQixjQUFTOzs7UUFBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLEVBQUM7SUEzRHVELENBQUM7Ozs7O0lBMUJ6QyxRQUFRLENBQUMsS0FB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QUFNLEVBQUUsS0FBSyxFQUFFO2lCQUV6QyxLQUFLO3VCQUNMLEtBQUs7bUJBQ0wsS0FBSztvQkFDTCxLQUFLO3VCQUNMLEtBQUs7a0JBQ0wsS0FBSztrQkFDTCxLQUFLO21CQUNMLEtBQUs7c0JBQ0wsS0FBSzt1Q0FDTCxLQUFLOytCQUVMLE1BQU07dUJBUU4sWUFBWSxTQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQztzQkFJakMsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztzQkFTaEMsWUFBWSxTQUFDLE9BQU87MkJBSXBCLFlBQVksU0FBQyxZQUFZOzJCQUl6QixZQUFZLFNBQUMsWUFBWTs7OztJQTVDMUIsdUNBQXlEOztJQUN6RCw0Q0FBbUU7O0lBQ25FLDRDQUFtRTs7SUFFbkUsb0NBQW9COztJQUNwQiwwQ0FBMkI7O0lBQzNCLHNDQUFzQjs7SUFDdEIsdUNBQXVCOztJQUN2QiwwQ0FBMkI7O0lBQzNCLHFDQUFpQjs7SUFDakIscUNBQW1COztJQUNuQixzQ0FBc0I7O0lBQ3RCLHlDQUEwQjs7SUFDMUIsMERBQTBDOztJQUUxQyxrREFBcUQ7O0lBRXJELHVDQUFlOztJQUNmLDRDQUFtQjs7SUFDbkIsdUNBQWM7O0lBQ2QsNENBQWU7O0lBQ2YsNENBQW1COztJQXNGbkIsMENBQTBCOztJQUMxQiwyQ0FBcUI7Ozs7O0lBM0RULDBDQUEyQjs7Ozs7SUFBRSx1Q0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgUmVuZGVyZXIyLFxuICBJbnB1dCxcbiAgSG9zdExpc3RlbmVyLFxuICBmb3J3YXJkUmVmLFxuICBBZnRlclZpZXdJbml0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNvbnN0IFJBTkdFX1ZBTFVFX0FDQ0VTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdXNlLWJlZm9yZS1kZWNsYXJlXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1kYlJhbmdlSW5wdXRDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1yYW5nZS1pbnB1dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9tZGItcmFuZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9yYW5nZS1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFtSQU5HRV9WQUxVRV9BQ0NFU09SXSxcbn0pXG5leHBvcnQgY2xhc3MgTWRiUmFuZ2VJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnaW5wdXQnLCB7IHN0YXRpYzogZmFsc2UgfSkgaW5wdXQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3JhbmdlQ2xvdWQnLCB7IHN0YXRpYzogZmFsc2UgfSkgcmFuZ2VDbG91ZDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgncmFuZ2VGaWVsZCcsIHsgc3RhdGljOiBmYWxzZSB9KSByYW5nZUZpZWxkOiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBtaW4gPSAwO1xuICBASW5wdXQoKSBtYXggPSAxMDA7XG4gIEBJbnB1dCgpIHN0ZXA6IG51bWJlcjtcbiAgQElucHV0KCkgZGVmYXVsdDogYm9vbGVhbjtcbiAgQElucHV0KCkgZGVmYXVsdFJhbmdlQ291bnRlckNsYXNzOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIHJhbmdlVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICByYW5nZTogYW55ID0gMDtcbiAgc3RlcExlbmd0aDogbnVtYmVyO1xuICBzdGVwczogbnVtYmVyO1xuICBjbG91ZFJhbmdlID0gMDtcbiAgdmlzaWJpbGl0eSA9IGZhbHNlO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScsIFsnJGV2ZW50J10pIG9uY2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pIG9uaW5wdXQoZXZlbnQ6IGFueSkge1xuICAgIGNvbnN0IHZhbHVlOiBudW1iZXIgPSArZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMucmFuZ2VWYWx1ZUNoYW5nZS5lbWl0KHsgdmFsdWU6IHZhbHVlIH0pO1xuXG4gICAgaWYgKHRoaXMuY2hlY2tJZlNhZmFyaSgpKSB7XG4gICAgICB0aGlzLmZvY3VzUmFuZ2VJbnB1dCgpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgb25jbGljaygpIHtcbiAgICB0aGlzLmZvY3VzUmFuZ2VJbnB1dCgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hzdGFydCcpIG9uVG91Y2hTdGFydCgpIHtcbiAgICB0aGlzLmZvY3VzUmFuZ2VJbnB1dCgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpIG9ubW91c2VsZWF2ZSgpIHtcbiAgICBpZiAodGhpcy5jaGVja0lmU2FmYXJpKCkpIHtcbiAgICAgIHRoaXMuYmx1clJhbmdlSW5wdXQoKTtcbiAgICB9XG4gIH1cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBmb2N1c1JhbmdlSW5wdXQoKSB7XG4gICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgdGhpcy52aXNpYmlsaXR5ID0gdHJ1ZTtcbiAgfVxuXG4gIGJsdXJSYW5nZUlucHV0KCkge1xuICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgdGhpcy52aXNpYmlsaXR5ID0gZmFsc2U7XG4gIH1cblxuICBjb3ZlcmFnZShldmVudDogYW55KSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnJhbmdlID09PSAnc3RyaW5nJyAmJiB0aGlzLnJhbmdlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMucmFuZ2U7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmRlZmF1bHQpIHtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgY29uc3QgbmV3UmVsYXRpdmVHYWluID0gbmV3VmFsdWUgLSB0aGlzLm1pbjtcbiAgICAgIGNvbnN0IGlucHV0V2lkdGggPSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICAgIGxldCB0aHVtYk9mZnNldCA9IDA7XG4gICAgICBjb25zdCBvZmZzZXRBbW1vdW50ID0gMTU7XG4gICAgICBjb25zdCBkaXN0YW5jZUZyb21NaWRkbGUgPSBuZXdSZWxhdGl2ZUdhaW4gLSB0aGlzLnN0ZXBzIC8gMjtcblxuICAgICAgdGhpcy5zdGVwTGVuZ3RoID0gaW5wdXRXaWR0aCAvIHRoaXMuc3RlcHM7XG5cbiAgICAgIHRodW1iT2Zmc2V0ID0gKGRpc3RhbmNlRnJvbU1pZGRsZSAvIHRoaXMuc3RlcHMpICogb2Zmc2V0QW1tb3VudDtcbiAgICAgIHRoaXMuY2xvdWRSYW5nZSA9IHRoaXMuc3RlcExlbmd0aCAqIG5ld1JlbGF0aXZlR2FpbiAtIHRodW1iT2Zmc2V0O1xuXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMucmFuZ2VDbG91ZC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIHRoaXMuY2xvdWRSYW5nZSArICdweCcpO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrSWZTYWZhcmkoKSB7XG4gICAgY29uc3QgaXNTYWZhcmkgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1NhZmFyaScpID4gLTE7XG4gICAgY29uc3QgaXNDaHJvbWUgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0Nocm9tZScpID4gLTE7XG4gICAgY29uc3QgaXNGaXJlZm94ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdGaXJlZm94JykgPiAtMTtcbiAgICBjb25zdCBpc09wZXJhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdPcGVyYScpID4gLTE7XG5cbiAgICBpZiAoaXNTYWZhcmkgJiYgIWlzQ2hyb21lICYmICFpc0ZpcmVmb3ggJiYgIWlzT3BlcmEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc3RlcHMgPSB0aGlzLm1heCAtIHRoaXMubWluO1xuXG4gICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMucmFuZ2UgPSB0aGlzLnZhbHVlO1xuICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ29udHJvbCBWYWx1ZSBBY2Nlc3NvciBNZXRob2RzXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxufVxuIl19