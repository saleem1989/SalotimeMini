/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, ViewChild, ElementRef, Renderer2, Input, HostListener, forwardRef, Output, EventEmitter, ChangeDetectorRef, ViewEncapsulation, } from '@angular/core';
/** @type {?} */
export var RANGE_VALUE_ACCESOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return MdbRangeInputComponent; })),
    multi: true,
};
var MdbRangeInputComponent = /** @class */ (function () {
    function MdbRangeInputComponent(renderer, cdRef) {
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
    MdbRangeInputComponent.prototype.onchange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onChange(event.target.value);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MdbRangeInputComponent.prototype.oninput = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var value = +event.target.value;
        this.rangeValueChange.emit({ value: value });
        if (this.checkIfSafari()) {
            this.focusRangeInput();
        }
    };
    /**
     * @return {?}
     */
    MdbRangeInputComponent.prototype.onclick = /**
     * @return {?}
     */
    function () {
        this.focusRangeInput();
    };
    /**
     * @return {?}
     */
    MdbRangeInputComponent.prototype.onTouchStart = /**
     * @return {?}
     */
    function () {
        this.focusRangeInput();
    };
    /**
     * @return {?}
     */
    MdbRangeInputComponent.prototype.onmouseleave = /**
     * @return {?}
     */
    function () {
        if (this.checkIfSafari()) {
            this.blurRangeInput();
        }
    };
    /**
     * @return {?}
     */
    MdbRangeInputComponent.prototype.focusRangeInput = /**
     * @return {?}
     */
    function () {
        this.input.nativeElement.focus();
        this.visibility = true;
    };
    /**
     * @return {?}
     */
    MdbRangeInputComponent.prototype.blurRangeInput = /**
     * @return {?}
     */
    function () {
        this.input.nativeElement.blur();
        this.visibility = false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MdbRangeInputComponent.prototype.coverage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (typeof this.range === 'string' && this.range.length !== 0) {
            return this.range;
        }
        if (!this.default) {
            /** @type {?} */
            var newValue = event.target.value;
            /** @type {?} */
            var newRelativeGain = newValue - this.min;
            /** @type {?} */
            var inputWidth = this.input.nativeElement.offsetWidth;
            /** @type {?} */
            var thumbOffset = 0;
            /** @type {?} */
            var offsetAmmount = 15;
            /** @type {?} */
            var distanceFromMiddle = newRelativeGain - this.steps / 2;
            this.stepLength = inputWidth / this.steps;
            thumbOffset = (distanceFromMiddle / this.steps) * offsetAmmount;
            this.cloudRange = this.stepLength * newRelativeGain - thumbOffset;
            this.renderer.setStyle(this.rangeCloud.nativeElement, 'left', this.cloudRange + 'px');
        }
    };
    /**
     * @return {?}
     */
    MdbRangeInputComponent.prototype.checkIfSafari = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var isSafari = navigator.userAgent.indexOf('Safari') > -1;
        /** @type {?} */
        var isChrome = navigator.userAgent.indexOf('Chrome') > -1;
        /** @type {?} */
        var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
        /** @type {?} */
        var isOpera = navigator.userAgent.indexOf('Opera') > -1;
        if (isSafari && !isChrome && !isFirefox && !isOpera) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    MdbRangeInputComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.steps = this.max - this.min;
        if (this.value) {
            this.range = this.value;
            this.cdRef.detectChanges();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MdbRangeInputComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MdbRangeInputComponent.prototype.registerOnChange = /**
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
    MdbRangeInputComponent.prototype.registerOnTouched = /**
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
    MdbRangeInputComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
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
    MdbRangeInputComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
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
    return MdbRangeInputComponent;
}());
export { MdbRangeInputComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXJhbmdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vcmFuZ2UvbWRiLXJhbmdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixTQUFTLEVBQ1QsS0FBSyxFQUNMLFlBQVksRUFDWixVQUFVLEVBRVYsTUFBTSxFQUNOLFlBQVksRUFDWixpQkFBaUIsRUFDakIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDOztBQUV2QixNQUFNLEtBQU8sbUJBQW1CLEdBQVE7SUFDdEMsT0FBTyxFQUFFLGlCQUFpQjs7SUFFMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLGNBQU0sT0FBQSxzQkFBc0IsRUFBdEIsQ0FBc0IsRUFBQztJQUNyRCxLQUFLLEVBQUUsSUFBSTtDQUNaO0FBRUQ7SUF5REUsZ0NBQW9CLFFBQW1CLEVBQVUsS0FBd0I7UUFBckQsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBeENoRSxRQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1IsUUFBRyxHQUFHLEdBQUcsQ0FBQztRQUtULHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFckQsVUFBSyxHQUFRLENBQUMsQ0FBQztRQUdmLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixlQUFVLEdBQUcsS0FBSyxDQUFDOztRQXNGbkIsYUFBUTs7OztRQUFHLFVBQUMsQ0FBTSxJQUFNLENBQUMsRUFBQztRQUMxQixjQUFTOzs7UUFBRyxjQUFPLENBQUMsRUFBQztJQTNEdUQsQ0FBQzs7Ozs7SUExQnpDLHlDQUFROzs7O0lBQTVDLFVBQTZDLEtBQVU7UUFDckQsSUFBSSxDQUFDLFFBQVEs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S0FBSyxFQUFFOzZCQUNwQyxTQUFTLFNBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs2QkFDekMsU0FBUyxTQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7cUJBRXpDLEtBQUs7MkJBQ0wsS0FBSzt1QkFDTCxLQUFLO3dCQUNMLEtBQUs7MkJBQ0wsS0FBSztzQkFDTCxLQUFLO3NCQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLOzJDQUNMLEtBQUs7bUNBRUwsTUFBTTsyQkFRTixZQUFZLFNBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDOzBCQUlqQyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDOzBCQVNoQyxZQUFZLFNBQUMsT0FBTzsrQkFJcEIsWUFBWSxTQUFDLFlBQVk7K0JBSXpCLFlBQVksU0FBQyxZQUFZOztJQWlGNUIsNkJBQUM7Q0FBQSxBQXJJRCxJQXFJQztTQTlIWSxzQkFBc0I7OztJQUNqQyx1Q0FBeUQ7O0lBQ3pELDRDQUFtRTs7SUFDbkUsNENBQW1FOztJQUVuRSxvQ0FBb0I7O0lBQ3BCLDBDQUEyQjs7SUFDM0Isc0NBQXNCOztJQUN0Qix1Q0FBdUI7O0lBQ3ZCLDBDQUEyQjs7SUFDM0IscUNBQWlCOztJQUNqQixxQ0FBbUI7O0lBQ25CLHNDQUFzQjs7SUFDdEIseUNBQTBCOztJQUMxQiwwREFBMEM7O0lBRTFDLGtEQUFxRDs7SUFFckQsdUNBQWU7O0lBQ2YsNENBQW1COztJQUNuQix1Q0FBYzs7SUFDZCw0Q0FBZTs7SUFDZiw0Q0FBbUI7O0lBc0ZuQiwwQ0FBMEI7O0lBQzFCLDJDQUFxQjs7Ozs7SUEzRFQsMENBQTJCOzs7OztJQUFFLHVDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBSZW5kZXJlcjIsXG4gIElucHV0LFxuICBIb3N0TGlzdGVuZXIsXG4gIGZvcndhcmRSZWYsXG4gIEFmdGVyVmlld0luaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgUkFOR0VfVkFMVUVfQUNDRVNPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11c2UtYmVmb3JlLWRlY2xhcmVcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWRiUmFuZ2VJbnB1dENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLXJhbmdlLWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL21kYi1yYW5nZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3JhbmdlLW1vZHVsZS5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByb3ZpZGVyczogW1JBTkdFX1ZBTFVFX0FDQ0VTT1JdLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJSYW5nZUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdpbnB1dCcsIHsgc3RhdGljOiBmYWxzZSB9KSBpbnB1dDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgncmFuZ2VDbG91ZCcsIHsgc3RhdGljOiBmYWxzZSB9KSByYW5nZUNsb3VkOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdyYW5nZUZpZWxkJywgeyBzdGF0aWM6IGZhbHNlIH0pIHJhbmdlRmllbGQ6IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG1pbiA9IDA7XG4gIEBJbnB1dCgpIG1heCA9IDEwMDtcbiAgQElucHV0KCkgc3RlcDogbnVtYmVyO1xuICBASW5wdXQoKSBkZWZhdWx0OiBib29sZWFuO1xuICBASW5wdXQoKSBkZWZhdWx0UmFuZ2VDb3VudGVyQ2xhc3M6IHN0cmluZztcblxuICBAT3V0cHV0KCkgcmFuZ2VWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHJhbmdlOiBhbnkgPSAwO1xuICBzdGVwTGVuZ3RoOiBudW1iZXI7XG4gIHN0ZXBzOiBudW1iZXI7XG4gIGNsb3VkUmFuZ2UgPSAwO1xuICB2aXNpYmlsaXR5ID0gZmFsc2U7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJywgWyckZXZlbnQnXSkgb25jaGFuZ2UoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSkgb25pbnB1dChldmVudDogYW55KSB7XG4gICAgY29uc3QgdmFsdWU6IG51bWJlciA9ICtldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5yYW5nZVZhbHVlQ2hhbmdlLmVtaXQoeyB2YWx1ZTogdmFsdWUgfSk7XG5cbiAgICBpZiAodGhpcy5jaGVja0lmU2FmYXJpKCkpIHtcbiAgICAgIHRoaXMuZm9jdXNSYW5nZUlucHV0KCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKSBvbmNsaWNrKCkge1xuICAgIHRoaXMuZm9jdXNSYW5nZUlucHV0KCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd0b3VjaHN0YXJ0Jykgb25Ub3VjaFN0YXJ0KCkge1xuICAgIHRoaXMuZm9jdXNSYW5nZUlucHV0KCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJykgb25tb3VzZWxlYXZlKCkge1xuICAgIGlmICh0aGlzLmNoZWNrSWZTYWZhcmkoKSkge1xuICAgICAgdGhpcy5ibHVyUmFuZ2VJbnB1dCgpO1xuICAgIH1cbiAgfVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIGZvY3VzUmFuZ2VJbnB1dCgpIHtcbiAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB0aGlzLnZpc2liaWxpdHkgPSB0cnVlO1xuICB9XG5cbiAgYmx1clJhbmdlSW5wdXQoKSB7XG4gICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICB0aGlzLnZpc2liaWxpdHkgPSBmYWxzZTtcbiAgfVxuXG4gIGNvdmVyYWdlKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMucmFuZ2UgPT09ICdzdHJpbmcnICYmIHRoaXMucmFuZ2UubGVuZ3RoICE9PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5yYW5nZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZGVmYXVsdCkge1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICBjb25zdCBuZXdSZWxhdGl2ZUdhaW4gPSBuZXdWYWx1ZSAtIHRoaXMubWluO1xuICAgICAgY29uc3QgaW5wdXRXaWR0aCA9IHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcblxuICAgICAgbGV0IHRodW1iT2Zmc2V0ID0gMDtcbiAgICAgIGNvbnN0IG9mZnNldEFtbW91bnQgPSAxNTtcbiAgICAgIGNvbnN0IGRpc3RhbmNlRnJvbU1pZGRsZSA9IG5ld1JlbGF0aXZlR2FpbiAtIHRoaXMuc3RlcHMgLyAyO1xuXG4gICAgICB0aGlzLnN0ZXBMZW5ndGggPSBpbnB1dFdpZHRoIC8gdGhpcy5zdGVwcztcblxuICAgICAgdGh1bWJPZmZzZXQgPSAoZGlzdGFuY2VGcm9tTWlkZGxlIC8gdGhpcy5zdGVwcykgKiBvZmZzZXRBbW1vdW50O1xuICAgICAgdGhpcy5jbG91ZFJhbmdlID0gdGhpcy5zdGVwTGVuZ3RoICogbmV3UmVsYXRpdmVHYWluIC0gdGh1bWJPZmZzZXQ7XG5cbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5yYW5nZUNsb3VkLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgdGhpcy5jbG91ZFJhbmdlICsgJ3B4Jyk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tJZlNhZmFyaSgpIHtcbiAgICBjb25zdCBpc1NhZmFyaSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgPiAtMTtcbiAgICBjb25zdCBpc0Nocm9tZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgPiAtMTtcbiAgICBjb25zdCBpc0ZpcmVmb3ggPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0ZpcmVmb3gnKSA+IC0xO1xuICAgIGNvbnN0IGlzT3BlcmEgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09wZXJhJykgPiAtMTtcblxuICAgIGlmIChpc1NhZmFyaSAmJiAhaXNDaHJvbWUgJiYgIWlzRmlyZWZveCAmJiAhaXNPcGVyYSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zdGVwcyA9IHRoaXMubWF4IC0gdGhpcy5taW47XG5cbiAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5yYW5nZSA9IHRoaXMudmFsdWU7XG4gICAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICAvLyBDb250cm9sIFZhbHVlIEFjY2Vzc29yIE1ldGhvZHNcbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG59XG4iXX0=