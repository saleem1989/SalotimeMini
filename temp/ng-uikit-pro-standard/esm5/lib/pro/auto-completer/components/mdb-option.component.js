/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
var MdbOptionComponent = /** @class */ (function () {
    function MdbOptionComponent(el) {
        this.el = el;
        this.clicked = false;
        this.clickSource = new Subject();
        this.click$ = this.clickSource.asObservable();
        this.clicked = false;
    }
    /**
     * @return {?}
     */
    MdbOptionComponent.prototype.onClick = /**
     * @return {?}
     */
    function () {
        this.clickSource.next(this);
    };
    Object.defineProperty(MdbOptionComponent.prototype, "label", {
        get: /**
         * @return {?}
         */
        function () {
            return this.el.nativeElement.textContent;
        },
        enumerable: true,
        configurable: true
    });
    MdbOptionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-option',
                    template: "<div class=\"completer-row\" mdbAutoCompleterOption>\n  <ng-content></ng-content>\n</div>\n"
                }] }
    ];
    /** @nocollapse */
    MdbOptionComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    MdbOptionComponent.propDecorators = {
        value: [{ type: Input }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return MdbOptionComponent;
}());
export { MdbOptionComponent };
if (false) {
    /** @type {?} */
    MdbOptionComponent.prototype.value;
    /** @type {?} */
    MdbOptionComponent.prototype.clicked;
    /** @type {?} */
    MdbOptionComponent.prototype.selectedItem;
    /** @type {?} */
    MdbOptionComponent.prototype.clickSource;
    /** @type {?} */
    MdbOptionComponent.prototype.click$;
    /** @type {?} */
    MdbOptionComponent.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLW9wdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL2F1dG8tY29tcGxldGVyL2NvbXBvbmVudHMvbWRiLW9wdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0UsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUUzQztJQVlFLDRCQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQU5qQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBR2hCLGdCQUFXLEdBQWdDLElBQUksT0FBTyxFQUFzQixDQUFDO1FBQzdFLFdBQU0sR0FBbUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUd2RSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDOzs7O0lBR0Qsb0NBQU87OztJQURQO1FBRUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELHNCQUFJLHFDQUFLOzs7O1FBQVQ7WUFDRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTs7Z0JBdkJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsdUdBQXdDO2lCQUN6Qzs7OztnQkFQbUIsVUFBVTs7O3dCQVMzQixLQUFLOzBCQVdMLFlBQVksU0FBQyxPQUFPOztJQVF2Qix5QkFBQztDQUFBLEFBeEJELElBd0JDO1NBcEJZLGtCQUFrQjs7O0lBQzdCLG1DQUF1Qjs7SUFDdkIscUNBQWdCOztJQUNoQiwwQ0FBOEI7O0lBRTlCLHlDQUE2RTs7SUFDN0Usb0NBQXlFOztJQUU3RCxnQ0FBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElTZWxlY3RlZE9wdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2VsZWN0ZWQtb3B0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1vcHRpb24nLFxuICB0ZW1wbGF0ZVVybDogJ21kYi1vcHRpb24uY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJPcHRpb25Db21wb25lbnQge1xuICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nO1xuICBjbGlja2VkID0gZmFsc2U7XG4gIHNlbGVjdGVkSXRlbTogSVNlbGVjdGVkT3B0aW9uO1xuXG4gIGNsaWNrU291cmNlOiBTdWJqZWN0PE1kYk9wdGlvbkNvbXBvbmVudD4gPSBuZXcgU3ViamVjdDxNZGJPcHRpb25Db21wb25lbnQ+KCk7XG4gIGNsaWNrJDogT2JzZXJ2YWJsZTxNZGJPcHRpb25Db21wb25lbnQ+ID0gdGhpcy5jbGlja1NvdXJjZS5hc09ic2VydmFibGUoKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmNsaWNrZWQgPSBmYWxzZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLmNsaWNrU291cmNlLm5leHQodGhpcyk7XG4gIH1cblxuICBnZXQgbGFiZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudDtcbiAgfVxufVxuIl19