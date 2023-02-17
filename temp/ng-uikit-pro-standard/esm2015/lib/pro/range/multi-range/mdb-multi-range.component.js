/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, Renderer2, ViewChild, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/** @type {?} */
export const RANGE_VALUE_ACCESOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => MdbMultiRangeInputComponent)),
    multi: true,
};
export class MdbMultiRangeInputComponent {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
        this.renderer = renderer;
        this.value = { first: 0, second: 0 };
        this.min = 0;
        this.max = 100;
        this.rangeValueChange = new EventEmitter();
        this.firstVisibility = false;
        this.secondVisibility = false;
        this.cloudRange = 0;
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
     * @return {?}
     */
    ngOnInit() {
        this.range = this.value;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.steps = this.max - this.min;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    firstRangeInput(event) {
        this.rangeValueChange.emit(this.range);
        if (typeof this.range === 'object' && this.range.first === 0) {
            return this.range;
        }
        this.focusRangeInput('first');
        this.moveValueCloud(event, 'first');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    secondRangeInput(event) {
        this.rangeValueChange.emit(this.range);
        if (typeof this.range === 'object' && this.range.second === 0) {
            return this.range;
        }
        this.focusRangeInput('second');
        this.moveValueCloud(event, 'second');
    }
    /**
     * @private
     * @param {?} event
     * @param {?} element
     * @return {?}
     */
    moveValueCloud(event, element) {
        /** @type {?} */
        const newValue = event.target.value;
        /** @type {?} */
        const newRelativeGain = newValue - this.min;
        /** @type {?} */
        const inputWidth = element === 'first'
            ? this.firstInput.nativeElement.offsetWidth
            : this.secondInput.nativeElement.offsetWidth;
        /** @type {?} */
        let thumbOffset = 0;
        /** @type {?} */
        const offsetAmmount = 15;
        /** @type {?} */
        const distanceFromMiddle = newRelativeGain - this.steps / 2;
        this.stepLength = inputWidth / this.steps;
        thumbOffset = (distanceFromMiddle / this.steps) * offsetAmmount;
        this.cloudRange = this.stepLength * newRelativeGain - thumbOffset;
        this.renderer.setStyle(element === 'first'
            ? this.firstRangeCloud.nativeElement
            : this.secondRangeCloud.nativeElement, 'left', this.cloudRange + 'px');
    }
    /**
     * @param {?} element
     * @return {?}
     */
    focusRangeInput(element) {
        if (this.checkIfSafari()) {
            element === 'first'
                ? this.firstInput.nativeElement.focus()
                : this.secondInput.nativeElement.focus();
        }
        element === 'first' ? (this.firstVisibility = true) : (this.secondVisibility = true);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    blurRangeInput(element) {
        if (this.checkIfSafari()) {
            element === 'first'
                ? this.firstInput.nativeElement.blur()
                : this.secondInput.nativeElement.blur();
        }
        element === 'first' ? (this.firstVisibility = false) : (this.secondVisibility = false);
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
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
        this.range = value;
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
MdbMultiRangeInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-multi-range-input',
                template: "<div class=\"multi-range-field my-5 pb-5\">\n  <div class=\"range-field\" #rangeField>\n    <div class=\"track\">\n      <div #firstRangeCloud class=\"range-cloud\" title=\"range\"\n           [ngClass]=\"{'visible': this.firstVisibility, 'hidden': !this.firstVisibility}\">\n        <span class=\"text-transform\">{{range.first}}</span>\n      </div>\n    </div>\n    <input #firstInput\n           [value]=\"value.first\"\n           [attr.value]=\"value.first\"\n           [name]=\"name\"\n           [id]=\"id\"\n           [min]=\"min\"\n           [max]=\"max\"\n           [step]=\"step\"\n           [disabled]=\"disabled\"\n           type=\"range\"\n           class=\"mdbMultiRange original active\"\n           (input)=\"firstRangeInput($event)\"\n           [(ngModel)]=\"range.first\"\n           (focus)=\"this.firstVisibility = true\"\n           (blur)=\"this.firstVisibility = false; blurRangeInput('first')\"\n           (touchend)=\"blurRangeInput('first')\"\n           (click)=\"focusRangeInput('first')\">\n\n\n    <div class=\"track\">\n      <div #secondRangeCloud class=\"range-cloud\" title=\"range\"\n           [ngClass]=\"{'visible': this.secondVisibility, 'hidden': !this.secondVisibility}\">\n        <span class=\"text-transform\">{{range.second}}</span>\n      </div>\n    </div>\n    <input #secondInput\n           [value]=\"value.second\"\n           [attr.value]=\"value.second\"\n           [name]=\"name\"\n           [id]=\"id\"\n           [min]=\"min\"\n           [max]=\"max\"\n           [step]=\"step\"\n           [disabled]=\"disabled\"\n           type=\"range\"\n           class=\"mdbMultiRange original ghost active\"\n           (input)=\"secondRangeInput($event)\"\n           [(ngModel)]=\"range.second\"\n           (focus)=\"this.secondVisibility = true\"\n           (blur)=\"this.secondVisibility = false; blurRangeInput('second')\"\n           (touchend)=\"blurRangeInput('second')\"\n           (click)=\"focusRangeInput('second')\">\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                providers: [RANGE_VALUE_ACCESOR],
                styles: [".range-field input[type=range]{cursor:pointer;position:relative;background-color:transparent;border:1px solid #fff;outline:0;width:100%;margin:15px 0;padding:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}.range-field input[type=range]:focus{outline:0}.range-field input[type=range]+.thumb{position:absolute;border:none;height:0;width:0;border-radius:50%;background-color:#4285f4;top:10px;margin-left:-6px;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.range-field input[type=range]+.thumb .value{display:block;width:30px;text-align:center;color:#4285f4;font-size:0;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.range-field input[type=range]+.thumb.active{border-radius:50% 50% 50% 0}.range-field input[type=range]+.thumb.active .value{color:#fff;margin-left:-1px;margin-top:8px;font-size:10px}.range-field input[type=range]::-webkit-slider-runnable-track{height:3px;background:#c2c0c2;border:none}.range-field input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;border:none;height:14px;width:14px;border-radius:50%;background-color:#4285f4;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;margin:-5px 0 0;transition:.3s}.range-field input[type=range]:focus::-webkit-slider-runnable-track{background:#ccc}.range-field input[type=range]::-moz-range-track{height:3px;background:#c2c0c2;border:none}.range-field input[type=range]::-moz-range-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#4285f4;margin-top:-5px}.range-field input[type=range]:-moz-focusring{outline:#fff solid 1px;outline-offset:-1px}.range-field input[type=range]:focus::-moz-range-track{background:#c2c0c2}.range-field input[type=range]::-ms-track{height:3px;background:0 0;border-color:transparent;border-width:6px 0;color:transparent}.range-field input[type=range]::-ms-fill-lower{background:#c2c0c2}.range-field input[type=range]::-ms-fill-upper{background:#c2c0c2}.range-field input[type=range]::-ms-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#4285f4}.range-field input[type=range]:focus::-ms-fill-lower{background:#c2c0c2}.range-field input[type=range]:focus::-ms-fill-upper{background:#c2c0c2}@supports (--css:variables){input[type=range].mdbMultiRange{padding:0;margin:0;display:inline-block;vertical-align:top}input[type=range].mdbMultiRange.original{position:absolute}input[type=range].mdbMultiRange.original::-webkit-slider-thumb{position:relative;z-index:2}input[type=range].mdbMultiRange.original::-moz-range-thumb{transform:scale(1);z-index:1}input[type=range].mdbMultiRange::-moz-range-track{border-color:transparent}input[type=range].mdbMultiRange.ghost{position:relative}input[type=range].mdbMultiRange.ghost:nth-of-type(n+1){position:absolute}}.multi-range-field{position:relative}.multi-range-field input[type=range]{cursor:pointer;position:relative;background-color:transparent;border:1px solid #fff;outline:0;width:100%;margin:15px 0;padding:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}.multi-range-field input[type=range]:focus{outline:0}.multi-range-field input[type=range]+.thumb{position:absolute;border:none;height:0;width:0;border-radius:50%;background-color:#4285f4;top:10px;margin-left:-6px;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.multi-range-field input[type=range]+.thumb .value{display:block;width:30px;text-align:center;color:#4285f4;font-size:0;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.multi-range-field input[type=range]+.thumb.active{border-radius:50% 50% 50% 0}.multi-range-field input[type=range]+.thumb.active .value{color:#fff;margin-left:-1px;margin-top:8px;font-size:10px}.multi-range-field input[type=range]::-webkit-slider-runnable-track{height:3px;background:#c2c0c2;border:none}.multi-range-field input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;border:none;height:14px;width:14px;border-radius:50%;background-color:#4285f4;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;margin:-5px 0 0;transition:.3s}.multi-range-field input[type=range]:focus::-webkit-slider-runnable-track{background:#ccc}.multi-range-field input[type=range]::-moz-range-track{height:3px;background:#c2c0c2;border:none}.multi-range-field input[type=range]::-moz-range-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#4285f4;margin-top:-5px}.multi-range-field input[type=range]:-moz-focusring{outline:#fff solid 1px;outline-offset:-1px}.multi-range-field input[type=range]:focus::-moz-range-track{background:#c2c0c2}.multi-range-field input[type=range]::-ms-track{height:3px;background:0 0;border-color:transparent;border-width:6px 0;color:transparent}.multi-range-field input[type=range]::-ms-fill-lower{background:#c2c0c2}.multi-range-field input[type=range]::-ms-fill-upper{background:#c2c0c2}.multi-range-field input[type=range]::-ms-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#4285f4}.multi-range-field input[type=range]:focus::-ms-fill-lower{background:#c2c0c2}.multi-range-field input[type=range]:focus::-ms-fill-upper{background:#c2c0c2}.thumb-horizontal-wrapper{position:relative;-webkit-transform:rotate(-270deg);transform:rotate(-270deg);top:500px}.multi-range-field input[type=range]+.thumb-horizontal .value{-webkit-transform:rotate(315deg)!important;transform:rotate(315deg)!important}.range-field{position:relative}.range-field .track{position:absolute;right:8px;left:8px;margin-left:-7.5px}.range-field .track .range-cloud{height:30px;width:30px;top:-25px;background-color:#4285f4;position:absolute;color:#fff;border-radius:50%;font-size:12px;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.range-field .track .range-cloud:after{content:'';position:absolute;bottom:0;left:50%;-webkit-transform:translate(-50%,70%);transform:translate(-50%,70%);width:0;height:0;border-style:solid;border-width:7px 7px 0;border-color:#4285f4 transparent transparent}.range-field .track .range-cloud.hidden{display:none}.range-field .track .range-cloud.visible{display:block}.range-field .track .range-cloud .text-transform{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}"]
            }] }
];
/** @nocollapse */
MdbMultiRangeInputComponent.ctorParameters = () => [
    { type: Renderer2 }
];
MdbMultiRangeInputComponent.propDecorators = {
    id: [{ type: Input }],
    required: [{ type: Input }],
    name: [{ type: Input }],
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    step: [{ type: Input }],
    rangeValueChange: [{ type: Output }],
    firstInput: [{ type: ViewChild, args: ['firstInput', { static: true },] }],
    secondInput: [{ type: ViewChild, args: ['secondInput', { static: true },] }],
    firstRangeCloud: [{ type: ViewChild, args: ['firstRangeCloud', { static: true },] }],
    secondRangeCloud: [{ type: ViewChild, args: ['secondRangeCloud', { static: true },] }],
    rangeField: [{ type: ViewChild, args: ['rangeField', { static: true },] }]
};
if (false) {
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.id;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.required;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.name;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.value;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.disabled;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.min;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.max;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.step;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.rangeValueChange;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.firstInput;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.secondInput;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.firstRangeCloud;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.secondRangeCloud;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.rangeField;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.range;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.steps;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.stepLength;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.firstVisibility;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.secondVisibility;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.cloudRange;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.onChange;
    /** @type {?} */
    MdbMultiRangeInputComponent.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    MdbMultiRangeInputComponent.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLW11bHRpLXJhbmdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vcmFuZ2UvbXVsdGktcmFuZ2UvbWRiLW11bHRpLXJhbmdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEdBR2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFekUsTUFBTSxPQUFPLG1CQUFtQixHQUFRO0lBQ3RDLE9BQU8sRUFBRSxpQkFBaUI7O0lBRTFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxHQUFHLEVBQUUsQ0FBQywyQkFBMkIsRUFBQztJQUMxRCxLQUFLLEVBQUUsSUFBSTtDQUNaO0FBU0QsTUFBTSxPQUFPLDJCQUEyQjs7OztJQTBCdEMsWUFBb0IsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXRCOUIsVUFBSyxHQUF3RCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBRXJGLFFBQUcsR0FBRyxDQUFDLENBQUM7UUFDUixRQUFHLEdBQUcsR0FBRyxDQUFDO1FBR1QscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQXFDLENBQUM7UUFZbkYsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLGVBQVUsR0FBRyxDQUFDLENBQUM7O1FBNEZmLGFBQVE7Ozs7UUFBRyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUUsQ0FBQyxFQUFDO1FBQzFCLGNBQVM7OztRQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBQztJ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MkNBQXNCOztJQUV0Qix1REFBbUY7O0lBRW5GLGlEQUFrRTs7SUFDbEUsa0RBQW9FOztJQUNwRSxzREFBNEU7O0lBQzVFLHVEQUE4RTs7SUFDOUUsaURBQWtFOztJQUVsRSw0Q0FBVzs7SUFFWCw0Q0FBYzs7SUFDZCxpREFBbUI7O0lBQ25CLHNEQUF3Qjs7SUFDeEIsdURBQXlCOztJQUN6QixpREFBZTs7SUE0RmYsK0NBQTBCOztJQUMxQixnREFBcUI7Ozs7O0lBM0ZULCtDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE9uSW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBSQU5HRV9WQUxVRV9BQ0NFU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVzZS1iZWZvcmUtZGVjbGFyZVxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNZGJNdWx0aVJhbmdlSW5wdXRDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1tdWx0aS1yYW5nZS1pbnB1dCcsXG4gIHRlbXBsYXRlVXJsOiAnbWRiLW11bHRpLXJhbmdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vLi4vcmFuZ2UtbW9kdWxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJvdmlkZXJzOiBbUkFOR0VfVkFMVUVfQUNDRVNPUl0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYk11bHRpUmFuZ2VJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSB2YWx1ZTogeyBmaXJzdDogbnVtYmVyIHwgc3RyaW5nOyBzZWNvbmQ6IG51bWJlciB8IHN0cmluZyB9ID0geyBmaXJzdDogMCwgc2Vjb25kOiAwIH07XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBtaW4gPSAwO1xuICBASW5wdXQoKSBtYXggPSAxMDA7XG4gIEBJbnB1dCgpIHN0ZXA6IG51bWJlcjtcblxuICBAT3V0cHV0KCkgcmFuZ2VWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBmaXJzdDogbnVtYmVyOyBzZWNvbmQ6IG51bWJlciB9PigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2ZpcnN0SW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBmaXJzdElucHV0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzZWNvbmRJbnB1dCcsIHsgc3RhdGljOiB0cnVlIH0pIHNlY29uZElucHV0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdmaXJzdFJhbmdlQ2xvdWQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBmaXJzdFJhbmdlQ2xvdWQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3NlY29uZFJhbmdlQ2xvdWQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZWNvbmRSYW5nZUNsb3VkOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdyYW5nZUZpZWxkJywgeyBzdGF0aWM6IHRydWUgfSkgcmFuZ2VGaWVsZDogRWxlbWVudFJlZjtcblxuICByYW5nZTogYW55O1xuXG4gIHN0ZXBzOiBudW1iZXI7XG4gIHN0ZXBMZW5ndGg6IG51bWJlcjtcbiAgZmlyc3RWaXNpYmlsaXR5ID0gZmFsc2U7XG4gIHNlY29uZFZpc2liaWxpdHkgPSBmYWxzZTtcbiAgY2xvdWRSYW5nZSA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucmFuZ2UgPSB0aGlzLnZhbHVlO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc3RlcHMgPSB0aGlzLm1heCAtIHRoaXMubWluO1xuICB9XG5cbiAgZmlyc3RSYW5nZUlucHV0KGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnJhbmdlVmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnJhbmdlKTtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5yYW5nZSA9PT0gJ29iamVjdCcgJiYgdGhpcy5yYW5nZS5maXJzdCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMucmFuZ2U7XG4gICAgfVxuXG4gICAgdGhpcy5mb2N1c1JhbmdlSW5wdXQoJ2ZpcnN0Jyk7XG4gICAgdGhpcy5tb3ZlVmFsdWVDbG91ZChldmVudCwgJ2ZpcnN0Jyk7XG4gIH1cblxuICBzZWNvbmRSYW5nZUlucHV0KGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnJhbmdlVmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnJhbmdlKTtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5yYW5nZSA9PT0gJ29iamVjdCcgJiYgdGhpcy5yYW5nZS5zZWNvbmQgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnJhbmdlO1xuICAgIH1cblxuICAgIHRoaXMuZm9jdXNSYW5nZUlucHV0KCdzZWNvbmQnKTtcbiAgICB0aGlzLm1vdmVWYWx1ZUNsb3VkKGV2ZW50LCAnc2Vjb25kJyk7XG4gIH1cblxuICBwcml2YXRlIG1vdmVWYWx1ZUNsb3VkKGV2ZW50OiBhbnksIGVsZW1lbnQ6IHN0cmluZykge1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIGNvbnN0IG5ld1JlbGF0aXZlR2FpbiA9IG5ld1ZhbHVlIC0gdGhpcy5taW47XG4gICAgY29uc3QgaW5wdXRXaWR0aCA9XG4gICAgICBlbGVtZW50ID09PSAnZmlyc3QnXG4gICAgICAgID8gdGhpcy5maXJzdElucHV0Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGhcbiAgICAgICAgOiB0aGlzLnNlY29uZElucHV0Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICBsZXQgdGh1bWJPZmZzZXQgPSAwO1xuICAgIGNvbnN0IG9mZnNldEFtbW91bnQgPSAxNTtcbiAgICBjb25zdCBkaXN0YW5jZUZyb21NaWRkbGUgPSBuZXdSZWxhdGl2ZUdhaW4gLSB0aGlzLnN0ZXBzIC8gMjtcblxuICAgIHRoaXMuc3RlcExlbmd0aCA9IGlucHV0V2lkdGggLyB0aGlzLnN0ZXBzO1xuXG4gICAgdGh1bWJPZmZzZXQgPSAoZGlzdGFuY2VGcm9tTWlkZGxlIC8gdGhpcy5zdGVwcykgKiBvZmZzZXRBbW1vdW50O1xuICAgIHRoaXMuY2xvdWRSYW5nZSA9IHRoaXMuc3RlcExlbmd0aCAqIG5ld1JlbGF0aXZlR2FpbiAtIHRodW1iT2Zmc2V0O1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgIGVsZW1lbnQgPT09ICdmaXJzdCdcbiAgICAgICAgPyB0aGlzLmZpcnN0UmFuZ2VDbG91ZC5uYXRpdmVFbGVtZW50XG4gICAgICAgIDogdGhpcy5zZWNvbmRSYW5nZUNsb3VkLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAnbGVmdCcsXG4gICAgICB0aGlzLmNsb3VkUmFuZ2UgKyAncHgnXG4gICAgKTtcbiAgfVxuXG4gIGZvY3VzUmFuZ2VJbnB1dChlbGVtZW50OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5jaGVja0lmU2FmYXJpKCkpIHtcbiAgICAgIGVsZW1lbnQgPT09ICdmaXJzdCdcbiAgICAgICAgPyB0aGlzLmZpcnN0SW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpXG4gICAgICAgIDogdGhpcy5zZWNvbmRJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICAgIGVsZW1lbnQgPT09ICdmaXJzdCcgPyAodGhpcy5maXJzdFZpc2liaWxpdHkgPSB0cnVlKSA6ICh0aGlzLnNlY29uZFZpc2liaWxpdHkgPSB0cnVlKTtcbiAgfVxuXG4gIGJsdXJSYW5nZUlucHV0KGVsZW1lbnQ6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmNoZWNrSWZTYWZhcmkoKSkge1xuICAgICAgZWxlbWVudCA9PT0gJ2ZpcnN0J1xuICAgICAgICA/IHRoaXMuZmlyc3RJbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKVxuICAgICAgICA6IHRoaXMuc2Vjb25kSW5wdXQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgfVxuICAgIGVsZW1lbnQgPT09ICdmaXJzdCcgPyAodGhpcy5maXJzdFZpc2liaWxpdHkgPSBmYWxzZSkgOiAodGhpcy5zZWNvbmRWaXNpYmlsaXR5ID0gZmFsc2UpO1xuICB9XG5cbiAgY2hlY2tJZlNhZmFyaSgpIHtcbiAgICBjb25zdCBpc1NhZmFyaSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgPiAtMTtcbiAgICBjb25zdCBpc0Nocm9tZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgPiAtMTtcbiAgICBjb25zdCBpc0ZpcmVmb3ggPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0ZpcmVmb3gnKSA+IC0xO1xuICAgIGNvbnN0IGlzT3BlcmEgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09wZXJhJykgPiAtMTtcblxuICAgIGlmIChpc1NhZmFyaSAmJiAhaXNDaHJvbWUgJiYgIWlzRmlyZWZveCAmJiAhaXNPcGVyYSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBDb250cm9sIFZhbHVlIEFjY2Vzc29yIE1ldGhvZHNcbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMucmFuZ2UgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxufVxuIl19