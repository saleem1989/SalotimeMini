/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
export class MdbStepComponent {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.editable = true;
        this._isActive = false;
    }
    /**
     * @return {?}
     */
    get isDone() {
        return this._isDone;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isDone(value) {
        this._isDone = value;
    }
    /**
     * @return {?}
     */
    get isWrong() {
        return this._isWrong;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isWrong(value) {
        this._isWrong = value;
    }
    /**
     * @return {?}
     */
    get isActive() {
        return this._isActive;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isActive(value) {
        this._isActive = value;
    }
    /**
     * @private
     * @return {?}
     */
    _removeClasses() {
        this.isActive = false;
        this.isDone = false;
        this.isWrong = false;
    }
    /**
     * @return {?}
     */
    reset() {
        if (this.stepForm) {
            this.stepForm.reset();
        }
        this._removeClasses();
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
}
MdbStepComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-step',
                exportAs: 'mdbStep',
                template: '<ng-template><ng-content></ng-content></ng-template>'
            }] }
];
/** @nocollapse */
MdbStepComponent.ctorParameters = () => [
    { type: ElementRef }
];
MdbStepComponent.propDecorators = {
    content: [{ type: ViewChild, args: [TemplateRef, { static: true },] }],
    editable: [{ type: Input }],
    name: [{ type: Input }],
    label: [{ type: Input }],
    stepForm: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MdbStepComponent.prototype.content;
    /** @type {?} */
    MdbStepComponent.prototype.editable;
    /** @type {?} */
    MdbStepComponent.prototype.name;
    /** @type {?} */
    MdbStepComponent.prototype.label;
    /** @type {?} */
    MdbStepComponent.prototype.stepForm;
    /**
     * @type {?}
     * @private
     */
    MdbStepComponent.prototype._isDone;
    /**
     * @type {?}
     * @private
     */
    MdbStepComponent.prototype._isWrong;
    /**
     * @type {?}
     * @private
     */
    MdbStepComponent.prototype._isActive;
    /** @type {?} */
    MdbStepComponent.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3N0ZXBwZXIvc3RlcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU8zQyxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBTzNCLFlBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBTHhCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUE2QmpCLGNBQVMsR0FBRyxLQUFLLENBQUM7SUF4QlUsQ0FBQzs7OztJQUVyQyxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFjO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFHRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFjO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFHRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBR08sY0FBYztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDOzs7O0lBRUQsS0FBSztRQUNILElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFFRCxRQUFRLEtBQUksQ0FBQzs7O1lBbkRkLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLFFBQVEsRUFBRSxzREFBc0Q7YUFDakU7Ozs7WUFQa0QsVUFBVTs7O3NCQVMxRCxTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTt1QkFDdkMsS0FBSzttQkFDTCxLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSzs7OztJQUpOLG1DQUFvRTs7SUFDcEUsb0NBQXlCOztJQUN6QixnQ0FBc0I7O0lBQ3RCLGlDQUF1Qjs7SUFDdkIsb0NBQTZCOzs7OztJQVU3QixtQ0FBeUI7Ozs7O0lBUXpCLG9DQUEwQjs7Ozs7SUFRMUIscUNBQTBCOztJQXhCZCw4QkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIFRlbXBsYXRlUmVmLCBFbGVtZW50UmVmLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLXN0ZXAnLFxuICBleHBvcnRBczogJ21kYlN0ZXAnLFxuICB0ZW1wbGF0ZTogJzxuZy10ZW1wbGF0ZT48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9uZy10ZW1wbGF0ZT4nLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJTdGVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZiwgeyBzdGF0aWM6IHRydWUgfSkgY29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgZWRpdGFibGUgPSB0cnVlO1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0ZXBGb3JtOiBGb3JtR3JvdXA7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gIGdldCBpc0RvbmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzRG9uZTtcbiAgfVxuICBzZXQgaXNEb25lKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNEb25lID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfaXNEb25lOiBib29sZWFuO1xuXG4gIGdldCBpc1dyb25nKCkge1xuICAgIHJldHVybiB0aGlzLl9pc1dyb25nO1xuICB9XG4gIHNldCBpc1dyb25nKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNXcm9uZyA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX2lzV3Jvbmc6IGJvb2xlYW47XG5cbiAgZ2V0IGlzQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0FjdGl2ZTtcbiAgfVxuICBzZXQgaXNBY3RpdmUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc0FjdGl2ZSA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX2lzQWN0aXZlID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlQ2xhc3NlcygpIHtcbiAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5pc0RvbmUgPSBmYWxzZTtcbiAgICB0aGlzLmlzV3JvbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIGlmICh0aGlzLnN0ZXBGb3JtKSB7XG4gICAgICB0aGlzLnN0ZXBGb3JtLnJlc2V0KCk7XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZUNsYXNzZXMoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge31cbn1cbiJdfQ==