/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
var MdbStepComponent = /** @class */ (function () {
    function MdbStepComponent(el) {
        this.el = el;
        this.editable = true;
        this._isActive = false;
    }
    Object.defineProperty(MdbStepComponent.prototype, "isDone", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isDone;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._isDone = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdbStepComponent.prototype, "isWrong", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isWrong;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._isWrong = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdbStepComponent.prototype, "isActive", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isActive;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._isActive = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    MdbStepComponent.prototype._removeClasses = /**
     * @private
     * @return {?}
     */
    function () {
        this.isActive = false;
        this.isDone = false;
        this.isWrong = false;
    };
    /**
     * @return {?}
     */
    MdbStepComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        if (this.stepForm) {
            this.stepForm.reset();
        }
        this._removeClasses();
    };
    /**
     * @return {?}
     */
    MdbStepComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    MdbStepComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-step',
                    exportAs: 'mdbStep',
                    template: '<ng-template><ng-content></ng-content></ng-template>'
                }] }
    ];
    /** @nocollapse */
    MdbStepComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    MdbStepComponent.propDecorators = {
        content: [{ type: ViewChild, args: [TemplateRef, { static: true },] }],
        editable: [{ type: Input }],
        name: [{ type: Input }],
        label: [{ type: Input }],
        stepForm: [{ type: Input }]
    };
    return MdbStepComponent;
}());
export { MdbStepComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3N0ZXBwZXIvc3RlcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQztJQVlFLDBCQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUx4QixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBNkJqQixjQUFTLEdBQUcsS0FBSyxDQUFDO0lBeEJVLENBQUM7SUFFckMsc0JBQUksb0NBQU07Ozs7UUFBVjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QixDQUFDOzs7OztRQUNELFVBQVcsS0FBYztZQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDOzs7T0FIQTtJQU1ELHNCQUFJLHFDQUFPOzs7O1FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzs7Ozs7UUFDRCxVQUFZLEtBQWM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQzs7O09BSEE7SUFNRCxzQkFBSSxzQ0FBUTs7OztRQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7Ozs7O1FBQ0QsVUFBYSxLQUFjO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUM7OztPQUhBOzs7OztJQU1PLHlDQUFjOzs7O0lBQXRCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELGdDQUFLOzs7SUFBTDtRQUNFLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFFRCxtQ0FBUTs7O0lBQVIsY0FBWSxDQUFDOztnQkFuRGQsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO29CQUNwQixRQUFRLEVBQUUsU0FBUztvQkFDbkIsUUFBUSxFQUFFLHNEQUFzRDtpQkFDakU7Ozs7Z0JBUGtELFVBQVU7OzswQkFTMUQsU0FBUyxTQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7MkJBQ3ZDLEtBQUs7dUJBQ0wsS0FBSzt3QkFDTCxLQUFLOzJCQUNMLEtBQUs7O0lBMENSLHVCQUFDO0NBQUEsQUFwREQsSUFvREM7U0EvQ1ksZ0JBQWdCOzs7SUFDM0IsbUNBQW9FOztJQUNwRSxvQ0FBeUI7O0lBQ3pCLGdDQUFzQjs7SUFDdEIsaUNBQXVCOztJQUN2QixvQ0FBNkI7Ozs7O0lBVTdCLG1DQUF5Qjs7Ozs7SUFRekIsb0NBQTBCOzs7OztJQVExQixxQ0FBMEI7O0lBeEJkLDhCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgVGVtcGxhdGVSZWYsIEVsZW1lbnRSZWYsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItc3RlcCcsXG4gIGV4cG9ydEFzOiAnbWRiU3RlcCcsXG4gIHRlbXBsYXRlOiAnPG5nLXRlbXBsYXRlPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L25nLXRlbXBsYXRlPicsXG59KVxuZXhwb3J0IGNsYXNzIE1kYlN0ZXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmLCB7IHN0YXRpYzogdHJ1ZSB9KSBjb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSBlZGl0YWJsZSA9IHRydWU7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgc3RlcEZvcm06IEZvcm1Hcm91cDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgZ2V0IGlzRG9uZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNEb25lO1xuICB9XG4gIHNldCBpc0RvbmUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc0RvbmUgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9pc0RvbmU6IGJvb2xlYW47XG5cbiAgZ2V0IGlzV3JvbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzV3Jvbmc7XG4gIH1cbiAgc2V0IGlzV3JvbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc1dyb25nID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfaXNXcm9uZzogYm9vbGVhbjtcblxuICBnZXQgaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzQWN0aXZlO1xuICB9XG4gIHNldCBpc0FjdGl2ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzQWN0aXZlID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfaXNBY3RpdmUgPSBmYWxzZTtcblxuICBwcml2YXRlIF9yZW1vdmVDbGFzc2VzKCkge1xuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLmlzRG9uZSA9IGZhbHNlO1xuICAgIHRoaXMuaXNXcm9uZyA9IGZhbHNlO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgaWYgKHRoaXMuc3RlcEZvcm0pIHtcbiAgICAgIHRoaXMuc3RlcEZvcm0ucmVzZXQoKTtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlQ2xhc3NlcygpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7fVxufVxuIl19