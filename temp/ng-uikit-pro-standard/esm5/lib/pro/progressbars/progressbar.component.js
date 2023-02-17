/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ProgressbarConfigComponent } from './progressbar.config.component';
var ProgressbarComponent = /** @class */ (function () {
    function ProgressbarComponent(config) {
        Object.assign(this, config);
    }
    ProgressbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-progressbar, mdb-progress',
                    template: "<div mdbProgress [animate]=\"animate\" [max]=\"max\">\n  <mdb-bar [type]=\"type\" [value]=\"value\">\n    <ng-content></ng-content>\n  </mdb-bar>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    ProgressbarComponent.ctorParameters = function () { return [
        { type: ProgressbarConfigComponent }
    ]; };
    ProgressbarComponent.propDecorators = {
        animate: [{ type: Input }],
        max: [{ type: Input }],
        type: [{ type: Input }],
        value: [{ type: Input }]
    };
    return ProgressbarComponent;
}());
export { ProgressbarComponent };
if (false) {
    /**
     * if `true` changing value of progress bar will be animated (note: not supported by Bootstrap 4)
     * @type {?}
     */
    ProgressbarComponent.prototype.animate;
    /**
     * maximum total value of progress element
     * @type {?}
     */
    ProgressbarComponent.prototype.max;
    /**
     * provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger`
     * @type {?}
     */
    ProgressbarComponent.prototype.type;
    /**
     * current value of progress bar
     * @type {?}
     */
    ProgressbarComponent.prototype.value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9wcm9ncmVzc2JhcnMvcHJvZ3Jlc3NiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUU1RTtJQWdCRSw4QkFBbUIsTUFBa0M7UUFDbkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7Z0JBbEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsK0JBQStCO29CQUN6Qyx1S0FBMkM7b0JBRTNDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDdEM7Ozs7Z0JBUFEsMEJBQTBCOzs7MEJBVWhDLEtBQUs7c0JBRUwsS0FBSzt1QkFFTCxLQUFLO3dCQUVMLEtBQUs7O0lBS1IsMkJBQUM7Q0FBQSxBQW5CRCxJQW1CQztTQWJZLG9CQUFvQjs7Ozs7O0lBRS9CLHVDQUFpQzs7Ozs7SUFFakMsbUNBQTRCOzs7OztJQUU1QixvQ0FBNkI7Ozs7O0lBRTdCLHFDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9ncmVzc2JhckNvbmZpZ0NvbXBvbmVudCB9IGZyb20gJy4vcHJvZ3Jlc3NiYXIuY29uZmlnLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1wcm9ncmVzc2JhciwgbWRiLXByb2dyZXNzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Byb2dyZXNzYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHJvZ3Jlc3NiYXJzLW1vZHVsZS5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzYmFyQ29tcG9uZW50IHtcbiAgLyoqIGlmIGB0cnVlYCBjaGFuZ2luZyB2YWx1ZSBvZiBwcm9ncmVzcyBiYXIgd2lsbCBiZSBhbmltYXRlZCAobm90ZTogbm90IHN1cHBvcnRlZCBieSBCb290c3RyYXAgNCkgKi9cbiAgQElucHV0KCkgcHVibGljIGFuaW1hdGU6IGJvb2xlYW47XG4gIC8qKiBtYXhpbXVtIHRvdGFsIHZhbHVlIG9mIHByb2dyZXNzIGVsZW1lbnQgKi9cbiAgQElucHV0KCkgcHVibGljIG1heDogbnVtYmVyO1xuICAvKiogcHJvdmlkZSBvbmUgb2YgdGhlIGZvdXIgc3VwcG9ydGVkIGNvbnRleHR1YWwgY2xhc3NlczogYHN1Y2Nlc3NgLCBgaW5mb2AsIGB3YXJuaW5nYCwgYGRhbmdlcmAgKi9cbiAgQElucHV0KCkgcHVibGljIHR5cGU6IHN0cmluZztcbiAgLyoqIGN1cnJlbnQgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyICovXG4gIEBJbnB1dCgpIHB1YmxpYyB2YWx1ZTogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWc6IFByb2dyZXNzYmFyQ29uZmlnQ29tcG9uZW50KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcpO1xuICB9XG59XG4iXX0=