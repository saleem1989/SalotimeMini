/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, Renderer2 } from '@angular/core';
import { document } from './../utils/facade/browser';
export class MdbIconComponent {
    /**
     * @param {?} _el
     * @param {?} _renderer
     */
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this.fab = false;
        this.far = false;
        this.fal = false;
        this.fas = true;
        this.sizeClass = '';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.size) {
            this.sizeClass = `fa-${this.size}`;
        }
        if (this._el.nativeElement.parentElement.classList.contains('md-form')) {
            this._renderer.addClass(this._el.nativeElement, 'prefix');
        }
        /** @type {?} */
        const classList = this._el.nativeElement.classList;
        this.fab = classList.contains('fab');
        this.far = classList.contains('far');
        this.fas = classList.contains('fas');
        this.fal = classList.contains('fal');
        /** @type {?} */
        const formWrapper = this._getClosestEl(this._el.nativeElement, '.md-form') ||
            this._getClosestEl(this._el.nativeElement, '.md-outline');
        if (formWrapper) {
            formWrapper.childNodes.forEach((/**
             * @param {?} el
             * @return {?}
             */
            (el) => {
                if (el.tagName === 'INPUT') {
                    this._renderer.listen(el, 'focus', (/**
                     * @return {?}
                     */
                    () => {
                        this._renderer.addClass(this._el.nativeElement, 'active');
                    }));
                    this._renderer.listen(el, 'blur', (/**
                     * @return {?}
                     */
                    () => {
                        this._renderer.removeClass(this._el.nativeElement, 'active');
                    }));
                }
            }));
        }
    }
    /**
     * @private
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    _getClosestEl(el, selector) {
        for (; el && el !== document; el = el.parentNode) {
            if (el.matches && el.matches(selector)) {
                return el;
            }
        }
        return null;
    }
}
MdbIconComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-icon',
                template: "<i [ngClass]=\"{'fas': fas, 'far': far, 'fab': fab, 'fal': fal}\" class=\"fa-{{icon}} {{class}} {{classInside}} {{sizeClass}}\"></i>\n"
            }] }
];
/** @nocollapse */
MdbIconComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
MdbIconComponent.propDecorators = {
    icon: [{ type: Input }],
    size: [{ type: Input }],
    class: [{ type: Input }],
    classInside: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MdbIconComponent.prototype.icon;
    /** @type {?} */
    MdbIconComponent.prototype.size;
    /** @type {?} */
    MdbIconComponent.prototype.class;
    /** @type {?} */
    MdbIconComponent.prototype.classInside;
    /** @type {?} */
    MdbIconComponent.prototype.fab;
    /** @type {?} */
    MdbIconComponent.prototype.far;
    /** @type {?} */
    MdbIconComponent.prototype.fal;
    /** @type {?} */
    MdbIconComponent.prototype.fas;
    /** @type {?} */
    MdbIconComponent.prototype.sizeClass;
    /**
     * @type {?}
     * @private
     */
    MdbIconComponent.prototype._el;
    /**
     * @type {?}
     * @private
     */
    MdbIconComponent.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvZnJlZS9pY29ucy9pY29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFVLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFNckQsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7SUFhM0IsWUFBb0IsR0FBZSxFQUFVLFNBQW9CO1FBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBUGpFLFFBQUcsR0FBRyxLQUFLLENBQUM7UUFDWixRQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ1osUUFBRyxHQUFHLEtBQUssQ0FBQztRQUNaLFFBQUcsR0FBRyxJQUFJLENBQUM7UUFFWCxjQUFTLEdBQUcsRUFBRSxDQUFDO0lBRXFELENBQUM7Ozs7SUFFckUsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDcEM7UUFFRCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3RFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzNEOztjQUVLLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTO1FBQ2xELElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Y0FFL0IsV0FBVyxHQUNmLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDO1lBQ3RELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDO1FBRTNELElBQUksV0FBVyxFQUFFO1lBQ2YsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPOzs7O1lBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRTtnQkFDekMsSUFBSSxFQUFFLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBRTtvQkFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU87OztvQkFBRSxHQUFHLEVBQUU7d0JBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM1RCxDQUFDLEVBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTTs7O29CQUFFLEdBQUcsRUFBRTt3QkFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQy9ELENBQUMsRUFBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7Ozs7SUFFTyxhQUFhLENBQUMsRUFBTyxFQUFFLFFBQWdCO1FBQzdDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLEVBQUU7WUFDaEQsSUFBSSxFQUFFLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3RDLE9BQU8sRUFBRSxDQUFDO2FBQ1g7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7O1lBM0RGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsa0pBQW9DO2FBQ3JDOzs7O1lBTjBCLFVBQVU7WUFBVSxTQUFTOzs7bUJBUXJELEtBQUs7bUJBQ0wsS0FBSztvQkFDTCxLQUFLOzBCQUNMLEtBQUs7Ozs7SUFITixnQ0FBc0I7O0lBQ3RCLGdDQUFzQjs7SUFDdEIsaUNBQXVCOztJQUN2Qix1Q0FBNkI7O0lBRTdCLCtCQUFZOztJQUNaLCtCQUFZOztJQUNaLCtCQUFZOztJQUNaLCtCQUFXOztJQUVYLHFDQUFlOzs7OztJQUVILCtCQUF1Qjs7Ozs7SUFBRSxxQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFbGVtZW50UmVmLCBPbkluaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZG9jdW1lbnQgfSBmcm9tICcuLy4uL3V0aWxzL2ZhY2FkZS9icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLWljb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vaWNvbi5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIE1kYkljb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBpY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNpemU6IHN0cmluZztcbiAgQElucHV0KCkgY2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgY2xhc3NJbnNpZGU6IHN0cmluZztcblxuICBmYWIgPSBmYWxzZTtcbiAgZmFyID0gZmFsc2U7XG4gIGZhbCA9IGZhbHNlO1xuICBmYXMgPSB0cnVlO1xuXG4gIHNpemVDbGFzcyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLnNpemUpIHtcbiAgICAgIHRoaXMuc2l6ZUNsYXNzID0gYGZhLSR7dGhpcy5zaXplfWA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ21kLWZvcm0nKSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ3ByZWZpeCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzTGlzdCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xuICAgIHRoaXMuZmFiID0gY2xhc3NMaXN0LmNvbnRhaW5zKCdmYWInKTtcbiAgICB0aGlzLmZhciA9IGNsYXNzTGlzdC5jb250YWlucygnZmFyJyk7XG4gICAgdGhpcy5mYXMgPSBjbGFzc0xpc3QuY29udGFpbnMoJ2ZhcycpO1xuICAgIHRoaXMuZmFsID0gY2xhc3NMaXN0LmNvbnRhaW5zKCdmYWwnKTtcblxuICAgIGNvbnN0IGZvcm1XcmFwcGVyID1cbiAgICAgIHRoaXMuX2dldENsb3Nlc3RFbCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnLm1kLWZvcm0nKSB8fFxuICAgICAgdGhpcy5fZ2V0Q2xvc2VzdEVsKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICcubWQtb3V0bGluZScpO1xuXG4gICAgaWYgKGZvcm1XcmFwcGVyKSB7XG4gICAgICBmb3JtV3JhcHBlci5jaGlsZE5vZGVzLmZvckVhY2goKGVsOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGVsLnRhZ05hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5saXN0ZW4oZWwsICdmb2N1cycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdhY3RpdmUnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5saXN0ZW4oZWwsICdibHVyJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2FjdGl2ZScpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZXRDbG9zZXN0RWwoZWw6IGFueSwgc2VsZWN0b3I6IHN0cmluZykge1xuICAgIGZvciAoOyBlbCAmJiBlbCAhPT0gZG9jdW1lbnQ7IGVsID0gZWwucGFyZW50Tm9kZSkge1xuICAgICAgaWYgKGVsLm1hdGNoZXMgJiYgZWwubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl19