/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/** @type {?} */
export var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return MaterialChipsComponent; })),
    multi: true,
};
var MaterialChipsComponent = /** @class */ (function () {
    function MaterialChipsComponent() {
        this.placeholder = '';
        this.isTagsFocused = false;
        this.tagsfocusedChange = new EventEmitter();
        this.labelsChange = new EventEmitter();
        this.onTouchedCallback = this.noop;
        this.onChangeCallback = this.noop;
        this.onTouchedCallback =
            this.onTouchedCallback === undefined ? this.noop : this.onTouchedCallback;
        this.onChangeCallback = this.onChangeCallback === undefined ? this.noop : this.onChangeCallback;
    }
    Object.defineProperty(MaterialChipsComponent.prototype, "tagsfocused", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isTagsFocused;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} fn
     * @return {?}
     */
    MaterialChipsComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaterialChipsComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MaterialChipsComponent.prototype.removeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var index = this.values.indexOf(value, 0);
        if (index !== undefined) {
            this.values.splice(index, 1);
            this.labelsChange.emit(this.values);
        }
    };
    /**
     * @param {?} value
     * @param {?} event
     * @return {?}
     */
    MaterialChipsComponent.prototype.addValue = /**
     * @param {?} value
     * @param {?} event
     * @return {?}
     */
    function (value, event) {
        event.preventDefault();
        if (!value || value.trim() === '') {
            return;
        }
        this.values.push(value);
        this.labelsChange.emit(this.values);
        this.labelToAdd = '';
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MaterialChipsComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this.values) {
            this.values = value;
        }
    };
    /**
     * @return {?}
     */
    MaterialChipsComponent.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.focused = 'md-focused';
        this.isTagsFocused = true;
        this.tagsfocusedChange.emit(this.isTagsFocused);
    };
    /**
     * @return {?}
     */
    MaterialChipsComponent.prototype.focusOutFunction = /**
     * @return {?}
     */
    function () {
        this.focused = '';
        this.isTagsFocused = false;
        this.tagsfocusedChange.emit(this.isTagsFocused);
    };
    MaterialChipsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-material-chips',
                    template: "<div *ngIf=\"values && values.length\" class=\"md-chip-list\" [ngClass]=\"focused\">\n  <span *ngFor=\"let value of values\" class=\"md-chip\" selected>\n    {{ value }} <i class=\"close fas fa-times\" aria-hidden=\"true\" (click)=\"removeValue(value)\"></i>\n  </span>\n\n  <span>\n    <input\n      [(ngModel)]=\"labelToAdd\"\n      (keyup.enter)=\"addValue(box.value, $event)\"\n      (focus)=\"onFocus()\"\n      (focusout)=\"focusOutFunction()\"\n      #box\n    />\n  </span>\n</div>\n<div *ngIf=\"!values || !values.length\">\n  <input\n    class=\"md-chips-input\"\n    placeholder=\"{{ placeholder }}\"\n    #tbox\n    (keyup.enter)=\"addValue(tbox.value, $event)\"\n  />\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
                }] }
    ];
    /** @nocollapse */
    MaterialChipsComponent.ctorParameters = function () { return []; };
    MaterialChipsComponent.propDecorators = {
        placeholder: [{ type: Input }],
        tagsfocusedChange: [{ type: Output }],
        labelsChange: [{ type: Output }],
        tagsfocused: [{ type: Input }]
    };
    return MaterialChipsComponent;
}());
export { MaterialChipsComponent };
if (false) {
    /** @type {?} */
    MaterialChipsComponent.prototype.placeholder;
    /** @type {?} */
    MaterialChipsComponent.prototype.addAreaDisplayed;
    /** @type {?} */
    MaterialChipsComponent.prototype.isTagsFocused;
    /** @type {?} */
    MaterialChipsComponent.prototype.values;
    /** @type {?} */
    MaterialChipsComponent.prototype.labelToAdd;
    /** @type {?} */
    MaterialChipsComponent.prototype.focused;
    /** @type {?} */
    MaterialChipsComponent.prototype.selected;
    /** @type {?} */
    MaterialChipsComponent.prototype.noop;
    /** @type {?} */
    MaterialChipsComponent.prototype.tagsfocusedChange;
    /** @type {?} */
    MaterialChipsComponent.prototype.labelsChange;
    /**
     * @type {?}
     * @private
     */
    MaterialChipsComponent.prototype.onTouchedCallback;
    /**
     * @type {?}
     * @private
     */
    MaterialChipsComponent.prototype.onChangeCallback;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9jaGlwcy9jaGlwcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFbkQsTUFBTSxLQUFPLG1DQUFtQyxHQUFRO0lBQ3RELE9BQU8sRUFBRSxpQkFBaUI7O0lBRTFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxjQUFNLE9BQUEsc0JBQXNCLEVBQXRCLENBQXNCLEVBQUM7SUFDckQsS0FBSyxFQUFFLElBQUk7Q0FDWjtBQUVEO0lBaUNFO1FBMUJTLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBRzFCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBT1osc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2QyxpQkFBWSxHQUEyQixJQUFJLFlBQVksRUFBWSxDQUFDO1FBT3RFLHNCQUFpQixHQUFlLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUMscUJBQWdCLEdBQXFCLElBQUksQ0FBQyxJQUFJLENBQUM7UUFRckQsSUFBSSxDQUFDLGlCQUFpQjtZQUNwQixJQUFJLENBQUMsaUJBQWlCLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDNUUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUNsRyxDQUFDO0lBakJELHNCQUNJLCtDQUFXOzs7O1FBRGY7WUFFRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7Ozs7O0lBSUQsaURBQWdCOzs7O0lBQWhCLFVBQWlCLEVBQU87UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7OztJQUNELGtEQUFpQjs7OztJQUFqQixVQUFrQixFQUFPO1FBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUFPRCw0Q0FBVzs7OztJQUFYLFVBQVksS0FBYTs7WUFDakIsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDOzs7Ozs7SUFFRCx5Q0FBUTs7Ozs7SUFBUixVQUFTLEtBQWEsRUFBRSxLQUFVO1FBQ2hDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDakMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRUQsMkNBQVU7Ozs7SUFBVixVQUFXLEtBQWU7UUFDeEIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUNyQjtJQUNILENBQUM7Ozs7SUFFRCx3Q0FBTzs7O0lBQVA7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7O0lBQ0QsaURBQWdCOzs7SUFBaEI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNsRCxDQUFDOztnQkF4RUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLDhyQkFBbUM7b0JBQ25DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztpQkFDakQ7Ozs7OzhCQUVFLEtBQUs7b0NBVUwsTUFBTTsrQkFDTixNQUFNOzhCQUVOLEtBQUs7O0lBcURSLDZCQUFDO0NBQUEsQUF6RUQsSUF5RUM7U0FuRVksc0JBQXNCOzs7SUFDakMsNkNBQTBCOztJQUUxQixrREFBMEI7O0lBQzFCLCtDQUFzQjs7SUFDdEIsd0NBQWlCOztJQUNqQiw0Q0FBbUI7O0lBQ25CLHlDQUFnQjs7SUFDaEIsMENBQWlCOztJQUNqQixzQ0FBVTs7SUFFVixtREFBaUQ7O0lBQ2pELDhDQUE4RTs7Ozs7SUFPOUUsbURBQWtEOzs7OztJQUNsRCxrREFBdUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVzZS1iZWZvcmUtZGVjbGFyZVxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRlcmlhbENoaXBzQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItbWF0ZXJpYWwtY2hpcHMnLFxuICB0ZW1wbGF0ZVVybDogJ2NoaXBzLmNvbXBvbmVudC5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbENoaXBzQ29tcG9uZW50IHtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnJztcblxuICBhZGRBcmVhRGlzcGxheWVkOiBib29sZWFuO1xuICBpc1RhZ3NGb2N1c2VkID0gZmFsc2U7XG4gIHZhbHVlczogc3RyaW5nW107XG4gIGxhYmVsVG9BZGQ6IHN0cmluZztcbiAgZm9jdXNlZDogc3RyaW5nO1xuICBzZWxlY3RlZDogc3RyaW5nO1xuICBub29wOiBhbnk7XG5cbiAgQE91dHB1dCgpIHRhZ3Nmb2N1c2VkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbGFiZWxzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmdbXT4oKTtcblxuICBASW5wdXQoKVxuICBnZXQgdGFnc2ZvY3VzZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNUYWdzRm9jdXNlZDtcbiAgfVxuXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSB0aGlzLm5vb3A7XG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IHRoaXMubm9vcDtcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID1cbiAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPT09IHVuZGVmaW5lZCA/IHRoaXMubm9vcCA6IHRoaXMub25Ub3VjaGVkQ2FsbGJhY2s7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gdGhpcy5vbkNoYW5nZUNhbGxiYWNrID09PSB1bmRlZmluZWQgPyB0aGlzLm5vb3AgOiB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2s7XG4gIH1cblxuICByZW1vdmVWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnZhbHVlcy5pbmRleE9mKHZhbHVlLCAwKTtcbiAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy52YWx1ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHRoaXMubGFiZWxzQ2hhbmdlLmVtaXQodGhpcy52YWx1ZXMpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFZhbHVlKHZhbHVlOiBzdHJpbmcsIGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghdmFsdWUgfHwgdmFsdWUudHJpbSgpID09PSAnJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICB0aGlzLmxhYmVsc0NoYW5nZS5lbWl0KHRoaXMudmFsdWVzKTtcbiAgICB0aGlzLmxhYmVsVG9BZGQgPSAnJztcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZ1tdKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlcykge1xuICAgICAgdGhpcy52YWx1ZXMgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBvbkZvY3VzKCkge1xuICAgIHRoaXMuZm9jdXNlZCA9ICdtZC1mb2N1c2VkJztcbiAgICB0aGlzLmlzVGFnc0ZvY3VzZWQgPSB0cnVlO1xuICAgIHRoaXMudGFnc2ZvY3VzZWRDaGFuZ2UuZW1pdCh0aGlzLmlzVGFnc0ZvY3VzZWQpO1xuICB9XG4gIGZvY3VzT3V0RnVuY3Rpb24oKSB7XG4gICAgdGhpcy5mb2N1c2VkID0gJyc7XG4gICAgdGhpcy5pc1RhZ3NGb2N1c2VkID0gZmFsc2U7XG4gICAgdGhpcy50YWdzZm9jdXNlZENoYW5nZS5lbWl0KHRoaXMuaXNUYWdzRm9jdXNlZCk7XG4gIH1cbn1cbiJdfQ==