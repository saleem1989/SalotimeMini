/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
export class FixedButtonCaptionDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     */
    constructor(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.createCaptionElement();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.renderer.listen(this.collapseButtonActivator, 'click', (/**
         * @return {?}
         */
        () => {
            this.renderer.addClass(this.paragraphEl, 'fixed-button-caption');
            this.renderer.setStyle(this.paragraphEl, 'position', 'absolute');
            this.renderer.setStyle(this.paragraphEl, 'right', `60px`);
            this.renderer.setStyle(this.paragraphEl, 'top', '10px');
            this.renderer.setStyle(this.el.nativeElement, 'overflow', 'visible');
        }));
    }
    /**
     * @return {?}
     */
    createCaptionElement() {
        /** @type {?} */
        const paragraph = this.renderer.createElement('p');
        /** @type {?} */
        const text = this.renderer.createText(this.caption);
        this.renderer.appendChild(paragraph, text);
        this.renderer.appendChild(this.el.nativeElement, paragraph);
        this.paragraphEl = paragraph;
    }
}
FixedButtonCaptionDirective.decorators = [
    { type: Directive, args: [{ selector: '[mdbFixedCaption]' },] }
];
/** @nocollapse */
FixedButtonCaptionDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
FixedButtonCaptionDirective.propDecorators = {
    caption: [{ type: Input, args: ['mdbFixedCaption',] }],
    collapseButtonActivator: [{ type: Input, args: ['collapseButton',] }]
};
if (false) {
    /** @type {?} */
    FixedButtonCaptionDirective.prototype.caption;
    /** @type {?} */
    FixedButtonCaptionDirective.prototype.collapseButtonActivator;
    /**
     * @type {?}
     * @private
     */
    FixedButtonCaptionDirective.prototype.paragraphEl;
    /**
     * @type {?}
     * @private
     */
    FixedButtonCaptionDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    FixedButtonCaptionDirective.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml4ZWQtY2FwdGlvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvZnJlZS9idXR0b25zL2ZpeGVkLWNhcHRpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcvRixNQUFNLE9BQU8sMkJBQTJCOzs7OztJQUt0QyxZQUFvQixRQUFtQixFQUFVLEVBQWM7UUFBM0MsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7SUFBRyxDQUFDOzs7O0lBRW5FLFFBQVE7UUFDTixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxPQUFPOzs7UUFBRSxHQUFHLEVBQUU7WUFDL0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2RSxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxvQkFBb0I7O2NBQ1osU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQzs7Y0FDNUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7OztZQTVCRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7Ozs7WUFGa0IsU0FBUztZQUFwQyxVQUFVOzs7c0JBSTFDLEtBQUssU0FBQyxpQkFBaUI7c0NBRXZCLEtBQUssU0FBQyxnQkFBZ0I7Ozs7SUFGdkIsOENBQTBDOztJQUUxQyw4REFBc0Q7Ozs7O0lBQ3RELGtEQUF5Qjs7Ozs7SUFDYiwrQ0FBMkI7Ozs7O0lBQUUseUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25Jbml0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW21kYkZpeGVkQ2FwdGlvbl0nIH0pXG5leHBvcnQgY2xhc3MgRml4ZWRCdXR0b25DYXB0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCdtZGJGaXhlZENhcHRpb24nKSBjYXB0aW9uOiBzdHJpbmc7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCdjb2xsYXBzZUJ1dHRvbicpIGNvbGxhcHNlQnV0dG9uQWN0aXZhdG9yOiBhbnk7XG4gIHByaXZhdGUgcGFyYWdyYXBoRWw6IGFueTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY3JlYXRlQ2FwdGlvbkVsZW1lbnQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmNvbGxhcHNlQnV0dG9uQWN0aXZhdG9yLCAnY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMucGFyYWdyYXBoRWwsICdmaXhlZC1idXR0b24tY2FwdGlvbicpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnBhcmFncmFwaEVsLCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5wYXJhZ3JhcGhFbCwgJ3JpZ2h0JywgYDYwcHhgKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5wYXJhZ3JhcGhFbCwgJ3RvcCcsICcxMHB4Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93JywgJ3Zpc2libGUnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUNhcHRpb25FbGVtZW50KCkge1xuICAgIGNvbnN0IHBhcmFncmFwaCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGNvbnN0IHRleHQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQodGhpcy5jYXB0aW9uKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHBhcmFncmFwaCwgdGV4dCk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHBhcmFncmFwaCk7XG4gICAgdGhpcy5wYXJhZ3JhcGhFbCA9IHBhcmFncmFwaDtcbiAgfVxufVxuIl19