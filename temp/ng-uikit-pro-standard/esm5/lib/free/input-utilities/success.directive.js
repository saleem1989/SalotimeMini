/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Input, HostBinding, ElementRef, Renderer2, Component, ViewEncapsulation, } from '@angular/core';
/** @type {?} */
var defaultIdNumber = 0;
var MdbSuccessDirective = /** @class */ (function () {
    function MdbSuccessDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.id = "mdb-success-" + defaultIdNumber++;
        this.successMsg = true;
        this.messageId = this.id;
    }
    /**
     * @private
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    MdbSuccessDirective.prototype._getClosestEl = /**
     * @private
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    function (el, selector) {
        for (; el && el !== document; el = el.previousElementSibling) {
            if (el.matches(selector)) {
                return el;
            }
        }
        return null;
    };
    /**
     * @return {?}
     */
    MdbSuccessDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var textarea = this._getClosestEl(this.el.nativeElement, '.md-textarea');
        if (textarea) {
            /** @type {?} */
            var height_1 = textarea.offsetHeight + 4 + 'px';
            this.renderer.setStyle(this.el.nativeElement, 'top', height_1);
            this.textareaListenFunction = this.renderer.listen(textarea, 'keyup', (/**
             * @return {?}
             */
            function () {
                height_1 = textarea.offsetHeight + 4 + 'px';
                _this.renderer.setStyle(_this.el.nativeElement, 'top', height_1);
            }));
        }
    };
    /**
     * @return {?}
     */
    MdbSuccessDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.textareaListenFunction) {
            this.textareaListenFunction();
        }
    };
    MdbSuccessDirective.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-success',
                    template: '<ng-content></ng-content>',
                    encapsulation: ViewEncapsulation.None,
                    styles: [".error-message{position:absolute;top:40px;left:0;font-size:.8rem;color:#f44336}.success-message{position:absolute;top:40px;left:0;font-size:.8rem;color:#00c851}"]
                }] }
    ];
    /** @nocollapse */
    MdbSuccessDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    MdbSuccessDirective.propDecorators = {
        id: [{ type: Input }],
        successMsg: [{ type: HostBinding, args: ['class.success-message',] }],
        messageId: [{ type: HostBinding, args: ['attr.id',] }]
    };
    return MdbSuccessDirective;
}());
export { MdbSuccessDirective };
if (false) {
    /** @type {?} */
    MdbSuccessDirective.prototype.id;
    /** @type {?} */
    MdbSuccessDirective.prototype.successMsg;
    /** @type {?} */
    MdbSuccessDirective.prototype.messageId;
    /** @type {?} */
    MdbSuccessDirective.prototype.textareaListenFunction;
    /**
     * @type {?}
     * @private
     */
    MdbSuccessDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    MdbSuccessDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VjY2Vzcy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvZnJlZS9pbnB1dC11dGlsaXRpZXMvc3VjY2Vzcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxLQUFLLEVBQ0wsV0FBVyxFQUNYLFVBQVUsRUFDVixTQUFTLEVBR1QsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQzs7SUFFbkIsZUFBZSxHQUFHLENBQUM7QUFFdkI7SUFlRSw2QkFBb0IsRUFBYyxFQUFVLFFBQW1CO1FBQTNDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBUHRELE9BQUUsR0FBRyxpQkFBZSxlQUFlLEVBQUksQ0FBQztRQUVYLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDaEMsY0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7SUFJc0IsQ0FBQzs7Ozs7OztJQUUzRCwyQ0FBYTs7Ozs7O0lBQXJCLFVBQXNCLEVBQU8sRUFBRSxRQUFnQjtRQUM3QyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsc0JBQXNCLEVBQUU7WUFDNUQsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN4QixPQUFPLEVBQUUsQ0FBQzthQUNYO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7SUFFRCxzQ0FBUTs7O0lBQVI7UUFBQSxpQkFZQzs7WUFYTyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUM7UUFFMUUsSUFBSSxRQUFRLEVBQUU7O2dCQUNSLFFBQU0sR0FBRyxRQUFRLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxJQUFJO1lBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxRQUFNLENBQUMsQ0FBQztZQUU3RCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU87OztZQUFFO2dCQUNwRSxRQUFNLEdBQUcsUUFBUSxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUMxQyxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsUUFBTSxDQUFDLENBQUM7WUFDL0QsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7SUFFRCx5Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUMvQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUMvQjtJQUNILENBQUM7O2dCQTVDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSwyQkFBMkI7b0JBRXJDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDdEM7Ozs7Z0JBZkMsVUFBVTtnQkFDVixTQUFTOzs7cUJBaUJSLEtBQUs7NkJBRUwsV0FBVyxTQUFDLHVCQUF1Qjs0QkFDbkMsV0FBVyxTQUFDLFNBQVM7O0lBa0N4QiwwQkFBQztDQUFBLEFBN0NELElBNkNDO1NBdENZLG1CQUFtQjs7O0lBQzlCLGlDQUFpRDs7SUFFakQseUNBQXdEOztJQUN4RCx3Q0FBNEM7O0lBRTVDLHFEQUFpQzs7Ozs7SUFFckIsaUNBQXNCOzs7OztJQUFFLHVDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIElucHV0LFxuICBIb3N0QmluZGluZyxcbiAgRWxlbWVudFJlZixcbiAgUmVuZGVyZXIyLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgQ29tcG9uZW50LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmxldCBkZWZhdWx0SWROdW1iZXIgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItc3VjY2VzcycsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIHN0eWxlVXJsczogWycuL2lucHV0LXV0aWxpdGllcy1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgTWRiU3VjY2Vzc0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgaWQgPSBgbWRiLXN1Y2Nlc3MtJHtkZWZhdWx0SWROdW1iZXIrK31gO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3VjY2Vzcy1tZXNzYWdlJykgc3VjY2Vzc01zZyA9IHRydWU7XG4gIEBIb3N0QmluZGluZygnYXR0ci5pZCcpIG1lc3NhZ2VJZCA9IHRoaXMuaWQ7XG5cbiAgdGV4dGFyZWFMaXN0ZW5GdW5jdGlvbjogRnVuY3Rpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIHByaXZhdGUgX2dldENsb3Nlc3RFbChlbDogYW55LCBzZWxlY3Rvcjogc3RyaW5nKSB7XG4gICAgZm9yICg7IGVsICYmIGVsICE9PSBkb2N1bWVudDsgZWwgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgICBpZiAoZWwubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IHRleHRhcmVhID0gdGhpcy5fZ2V0Q2xvc2VzdEVsKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy5tZC10ZXh0YXJlYScpO1xuXG4gICAgaWYgKHRleHRhcmVhKSB7XG4gICAgICBsZXQgaGVpZ2h0ID0gdGV4dGFyZWEub2Zmc2V0SGVpZ2h0ICsgNCArICdweCc7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RvcCcsIGhlaWdodCk7XG5cbiAgICAgIHRoaXMudGV4dGFyZWFMaXN0ZW5GdW5jdGlvbiA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRleHRhcmVhLCAna2V5dXAnLCAoKSA9PiB7XG4gICAgICAgIGhlaWdodCA9IHRleHRhcmVhLm9mZnNldEhlaWdodCArIDQgKyAncHgnO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RvcCcsIGhlaWdodCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy50ZXh0YXJlYUxpc3RlbkZ1bmN0aW9uKSB7XG4gICAgICB0aGlzLnRleHRhcmVhTGlzdGVuRnVuY3Rpb24oKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==