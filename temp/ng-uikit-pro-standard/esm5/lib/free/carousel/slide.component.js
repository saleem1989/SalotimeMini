/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostBinding, Input, ElementRef } from '@angular/core';
// import { CarouselComponent } from './carousel.component';
var SlideComponent = /** @class */ (function () {
    function SlideComponent(el) {
        this.animated = false;
        this.directionNext = false;
        this.directionLeft = false;
        this.directionPrev = false;
        this.directionRight = false;
        /**
         * Wraps element by appropriate CSS classes
         */
        this.el = null;
        // this.carousel = carousel;
        this.el = el;
    }
    /** Fires changes in container collection after adding a new slide instance */
    /**
     * Fires changes in container collection after adding a new slide instance
     * @return {?}
     */
    SlideComponent.prototype.ngOnInit = /**
     * Fires changes in container collection after adding a new slide instance
     * @return {?}
     */
    function () {
        // this.carousel.addSlide(this);
    };
    /** Fires changes in container collection after removing of this slide instance */
    /**
     * Fires changes in container collection after removing of this slide instance
     * @return {?}
     */
    SlideComponent.prototype.ngOnDestroy = /**
     * Fires changes in container collection after removing of this slide instance
     * @return {?}
     */
    function () {
        // this.carousel.removeSlide(this);
    };
    SlideComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-slide, mdb-carousel-item',
                    template: "\n  <ng-content></ng-content>\n  "
                }] }
    ];
    /** @nocollapse */
    SlideComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    SlideComponent.propDecorators = {
        active: [{ type: HostBinding, args: ['class.active',] }, { type: Input }],
        animated: [{ type: HostBinding, args: ['class.animated',] }],
        directionNext: [{ type: HostBinding, args: ['class.carousel-item-next',] }],
        directionLeft: [{ type: HostBinding, args: ['class.carousel-item-left',] }],
        directionPrev: [{ type: HostBinding, args: ['class.carousel-item-prev',] }],
        directionRight: [{ type: HostBinding, args: ['class.carousel-item-right',] }],
        el: [{ type: HostBinding, args: ['class.carousel-item',] }]
    };
    return SlideComponent;
}());
export { SlideComponent };
if (false) {
    /**
     * Is current slide active
     * @type {?}
     */
    SlideComponent.prototype.active;
    /** @type {?} */
    SlideComponent.prototype.animated;
    /** @type {?} */
    SlideComponent.prototype.directionNext;
    /** @type {?} */
    SlideComponent.prototype.directionLeft;
    /** @type {?} */
    SlideComponent.prototype.directionPrev;
    /** @type {?} */
    SlideComponent.prototype.directionRight;
    /**
     * Wraps element by appropriate CSS classes
     * @type {?}
     */
    SlideComponent.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvY2Fyb3VzZWwvc2xpZGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBYSxLQUFLLEVBQVUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUk3RjtJQXlCRSx3QkFBbUIsRUFBYztRQWRGLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDUCxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUNyQixtQkFBYyxHQUFHLEtBQUssQ0FBQzs7OztRQVExRCxPQUFFLEdBQXFCLElBQUksQ0FBQztRQUdqQyw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsOEVBQThFOzs7OztJQUN2RSxpQ0FBUTs7OztJQUFmO1FBQ0UsZ0NBQWdDO0lBQ2xDLENBQUM7SUFFRCxrRkFBa0Y7Ozs7O0lBQzNFLG9DQUFXOzs7O0lBQWxCO1FBQ0UsbUNBQW1DO0lBQ3JDLENBQUM7O2dCQXRDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtvQkFDeEMsUUFBUSxFQUFFLG1DQUVUO2lCQUNGOzs7O2dCQVQwRCxVQUFVOzs7eUJBYWxFLFdBQVcsU0FBQyxjQUFjLGNBQzFCLEtBQUs7MkJBQ0wsV0FBVyxTQUFDLGdCQUFnQjtnQ0FDNUIsV0FBVyxTQUFDLDBCQUEwQjtnQ0FDdEMsV0FBVyxTQUFDLDBCQUEwQjtnQ0FDdEMsV0FBVyxTQUFDLDBCQUEwQjtpQ0FDdEMsV0FBVyxTQUFDLDJCQUEyQjtxQkFFdkMsV0FBVyxTQUFDLHFCQUFxQjs7SUFzQnBDLHFCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7U0FqQ1ksY0FBYzs7Ozs7O0lBR3pCLGdDQUNnQzs7SUFDaEMsa0NBQWdEOztJQUNoRCx1Q0FBK0Q7O0lBQy9ELHVDQUErRDs7SUFDL0QsdUNBQStEOztJQUMvRCx3Q0FBaUU7Ozs7O0lBRWpFLDRCQU1tQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIE9uRGVzdHJveSwgSW5wdXQsIE9uSW5pdCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBpbXBvcnQgeyBDYXJvdXNlbENvbXBvbmVudCB9IGZyb20gJy4vY2Fyb3VzZWwuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLXNsaWRlLCBtZGItY2Fyb3VzZWwtaXRlbScsXG4gIHRlbXBsYXRlOiBgXG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAvKiogSXMgY3VycmVudCBzbGlkZSBhY3RpdmUgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxuICBASW5wdXQoKSBwdWJsaWMgYWN0aXZlOiBib29sZWFuO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFuaW1hdGVkJykgYW5pbWF0ZWQgPSBmYWxzZTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jYXJvdXNlbC1pdGVtLW5leHQnKSBkaXJlY3Rpb25OZXh0ID0gZmFsc2U7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuY2Fyb3VzZWwtaXRlbS1sZWZ0JykgZGlyZWN0aW9uTGVmdCA9IGZhbHNlO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNhcm91c2VsLWl0ZW0tcHJldicpIGRpcmVjdGlvblByZXYgPSBmYWxzZTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jYXJvdXNlbC1pdGVtLXJpZ2h0JykgZGlyZWN0aW9uUmlnaHQgPSBmYWxzZTtcbiAgLyoqIFdyYXBzIGVsZW1lbnQgYnkgYXBwcm9wcmlhdGUgQ1NTIGNsYXNzZXMgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jYXJvdXNlbC1pdGVtJylcblxuXG4gIC8qKiBMaW5rIHRvIFBhcmVudChjb250YWluZXItY29sbGVjdGlvbikgY29tcG9uZW50ICovXG4gIC8vIHB1YmxpYyBjYXJvdXNlbDogQ2Fyb3VzZWxDb21wb25lbnQ7XG4gIC8vIHB1YmxpYyBlbDogRWxlbWVudFJlZiA9IG51bGw7XG4gIHB1YmxpYyBlbDogRWxlbWVudFJlZiB8IGFueSA9IG51bGw7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgLy8gdGhpcy5jYXJvdXNlbCA9IGNhcm91c2VsO1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgfVxuXG4gIC8qKiBGaXJlcyBjaGFuZ2VzIGluIGNvbnRhaW5lciBjb2xsZWN0aW9uIGFmdGVyIGFkZGluZyBhIG5ldyBzbGlkZSBpbnN0YW5jZSAqL1xuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gdGhpcy5jYXJvdXNlbC5hZGRTbGlkZSh0aGlzKTtcbiAgfVxuXG4gIC8qKiBGaXJlcyBjaGFuZ2VzIGluIGNvbnRhaW5lciBjb2xsZWN0aW9uIGFmdGVyIHJlbW92aW5nIG9mIHRoaXMgc2xpZGUgaW5zdGFuY2UgKi9cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIC8vIHRoaXMuY2Fyb3VzZWwucmVtb3ZlU2xpZGUodGhpcyk7XG4gIH1cbn1cbiJdfQ==