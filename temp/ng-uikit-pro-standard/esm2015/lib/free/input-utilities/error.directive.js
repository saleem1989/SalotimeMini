/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Input, HostBinding, ElementRef, Renderer2, ViewEncapsulation, Component, } from '@angular/core';
/** @type {?} */
let defaultIdNumber = 0;
// tslint:disable-next-line:component-class-suffix
export class MdbErrorDirective {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.id = `mdb-error-${defaultIdNumber++}`;
        this.errorMsg = true;
        this.messageId = this.id;
    }
    /**
     * @private
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    _getClosestEl(el, selector) {
        for (; el && el !== document; el = el.previousElementSibling) {
            if (el.matches(selector)) {
                return el;
            }
        }
        return null;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const textarea = this._getClosestEl(this.el.nativeElement, '.md-textarea');
        if (textarea) {
            /** @type {?} */
            let height = textarea.offsetHeight + 4 + 'px';
            this.renderer.setStyle(this.el.nativeElement, 'top', height);
            this.textareaListenFunction = this.renderer.listen(textarea, 'keyup', (/**
             * @return {?}
             */
            () => {
                height = textarea.offsetHeight + 4 + 'px';
                this.renderer.setStyle(this.el.nativeElement, 'top', height);
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.textareaListenFunction) {
            this.textareaListenFunction();
        }
    }
}
MdbErrorDirective.decorators = [
    { type: Component, args: [{
                selector: 'mdb-error',
                template: '<ng-content></ng-content>',
                encapsulation: ViewEncapsulation.None,
                styles: [".error-message{position:absolute;top:40px;left:0;font-size:.8rem;color:#f44336}.success-message{position:absolute;top:40px;left:0;font-size:.8rem;color:#00c851}"]
            }] }
];
/** @nocollapse */
MdbErrorDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
MdbErrorDirective.propDecorators = {
    id: [{ type: Input }],
    errorMsg: [{ type: HostBinding, args: ['class.error-message',] }],
    messageId: [{ type: HostBinding, args: ['attr.id',] }]
};
if (false) {
    /** @type {?} */
    MdbErrorDirective.prototype.id;
    /** @type {?} */
    MdbErrorDirective.prototype.errorMsg;
    /** @type {?} */
    MdbErrorDirective.prototype.messageId;
    /** @type {?} */
    MdbErrorDirective.prototype.textareaListenFunction;
    /**
     * @type {?}
     * @private
     */
    MdbErrorDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    MdbErrorDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvaW5wdXQtdXRpbGl0aWVzL2Vycm9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLEtBQUssRUFDTCxXQUFXLEVBRVgsVUFBVSxFQUNWLFNBQVMsRUFFVCxpQkFBaUIsRUFDakIsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDOztJQUVuQixlQUFlLEdBQUcsQ0FBQztBQVF2QixrREFBa0Q7QUFDbEQsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7SUFRNUIsWUFBb0IsRUFBYyxFQUFVLFFBQW1CO1FBQTNDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBUHRELE9BQUUsR0FBRyxhQUFhLGVBQWUsRUFBRSxFQUFFLENBQUM7UUFFWCxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQzVCLGNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBSXNCLENBQUM7Ozs7Ozs7SUFFM0QsYUFBYSxDQUFDLEVBQU8sRUFBRSxRQUFnQjtRQUM3QyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsc0JBQXNCLEVBQUU7WUFDNUQsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN4QixPQUFPLEVBQUUsQ0FBQzthQUNYO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7SUFFRCxRQUFROztjQUNBLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQztRQUUxRSxJQUFJLFFBQVEsRUFBRTs7Z0JBQ1IsTUFBTSxHQUFHLFFBQVEsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLElBQUk7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRTdELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTzs7O1lBQUUsR0FBRyxFQUFFO2dCQUN6RSxNQUFNLEdBQUcsUUFBUSxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDL0QsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDL0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDL0I7SUFDSCxDQUFDOzs7WUE1Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUUsMkJBQTJCO2dCQUVyQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7Ozs7WUFkQyxVQUFVO1lBQ1YsU0FBUzs7O2lCQWdCUixLQUFLO3VCQUVMLFdBQVcsU0FBQyxxQkFBcUI7d0JBQ2pDLFdBQVcsU0FBQyxTQUFTOzs7O0lBSHRCLCtCQUErQzs7SUFFL0MscUNBQW9EOztJQUNwRCxzQ0FBNEM7O0lBRTVDLG1EQUFpQzs7Ozs7SUFFckIsK0JBQXNCOzs7OztJQUFFLHFDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIElucHV0LFxuICBIb3N0QmluZGluZyxcbiAgT25Jbml0LFxuICBFbGVtZW50UmVmLFxuICBSZW5kZXJlcjIsXG4gIE9uRGVzdHJveSxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENvbXBvbmVudCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmxldCBkZWZhdWx0SWROdW1iZXIgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItZXJyb3InLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBzdHlsZVVybHM6IFsnLi9pbnB1dC11dGlsaXRpZXMtbW9kdWxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE1kYkVycm9yRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBpZCA9IGBtZGItZXJyb3ItJHtkZWZhdWx0SWROdW1iZXIrK31gO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZXJyb3ItbWVzc2FnZScpIGVycm9yTXNnID0gdHJ1ZTtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJykgbWVzc2FnZUlkID0gdGhpcy5pZDtcblxuICB0ZXh0YXJlYUxpc3RlbkZ1bmN0aW9uOiBGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgcHJpdmF0ZSBfZ2V0Q2xvc2VzdEVsKGVsOiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpIHtcbiAgICBmb3IgKDsgZWwgJiYgZWwgIT09IGRvY3VtZW50OyBlbCA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICAgIGlmIChlbC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgdGV4dGFyZWEgPSB0aGlzLl9nZXRDbG9zZXN0RWwodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnLm1kLXRleHRhcmVhJyk7XG5cbiAgICBpZiAodGV4dGFyZWEpIHtcbiAgICAgIGxldCBoZWlnaHQgPSB0ZXh0YXJlYS5vZmZzZXRIZWlnaHQgKyA0ICsgJ3B4JztcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndG9wJywgaGVpZ2h0KTtcblxuICAgICAgdGhpcy50ZXh0YXJlYUxpc3RlbkZ1bmN0aW9uID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGV4dGFyZWEsICdrZXl1cCcsICgpID0+IHtcbiAgICAgICAgaGVpZ2h0ID0gdGV4dGFyZWEub2Zmc2V0SGVpZ2h0ICsgNCArICdweCc7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndG9wJywgaGVpZ2h0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnRleHRhcmVhTGlzdGVuRnVuY3Rpb24pIHtcbiAgICAgIHRoaXMudGV4dGFyZWFMaXN0ZW5GdW5jdGlvbigpO1xuICAgIH1cbiAgfVxufVxuIl19