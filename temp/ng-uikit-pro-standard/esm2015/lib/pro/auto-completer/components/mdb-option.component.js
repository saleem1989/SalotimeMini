/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
export class MdbOptionComponent {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.clicked = false;
        this.clickSource = new Subject();
        this.click$ = this.clickSource.asObservable();
        this.clicked = false;
    }
    /**
     * @return {?}
     */
    onClick() {
        this.clickSource.next(this);
    }
    /**
     * @return {?}
     */
    get label() {
        return this.el.nativeElement.textContent;
    }
}
MdbOptionComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-option',
                template: "<div class=\"completer-row\" mdbAutoCompleterOption>\n  <ng-content></ng-content>\n</div>\n"
            }] }
];
/** @nocollapse */
MdbOptionComponent.ctorParameters = () => [
    { type: ElementRef }
];
MdbOptionComponent.propDecorators = {
    value: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLW9wdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL2F1dG8tY29tcGxldGVyL2NvbXBvbmVudHMvbWRiLW9wdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0UsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQztBQU0zQyxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBUTdCLFlBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBTmpDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFHaEIsZ0JBQVcsR0FBZ0MsSUFBSSxPQUFPLEVBQXNCLENBQUM7UUFDN0UsV0FBTSxHQUFtQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBR3ZFLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFHRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO0lBQzNDLENBQUM7OztZQXZCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLHVHQUF3QzthQUN6Qzs7OztZQVBtQixVQUFVOzs7b0JBUzNCLEtBQUs7c0JBV0wsWUFBWSxTQUFDLE9BQU87Ozs7SUFYckIsbUNBQXVCOztJQUN2QixxQ0FBZ0I7O0lBQ2hCLDBDQUE4Qjs7SUFFOUIseUNBQTZFOztJQUM3RSxvQ0FBeUU7O0lBRTdELGdDQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVNlbGVjdGVkT3B0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zZWxlY3RlZC1vcHRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLW9wdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnbWRiLW9wdGlvbi5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIE1kYk9wdGlvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmc7XG4gIGNsaWNrZWQgPSBmYWxzZTtcbiAgc2VsZWN0ZWRJdGVtOiBJU2VsZWN0ZWRPcHRpb247XG5cbiAgY2xpY2tTb3VyY2U6IFN1YmplY3Q8TWRiT3B0aW9uQ29tcG9uZW50PiA9IG5ldyBTdWJqZWN0PE1kYk9wdGlvbkNvbXBvbmVudD4oKTtcbiAgY2xpY2skOiBPYnNlcnZhYmxlPE1kYk9wdGlvbkNvbXBvbmVudD4gPSB0aGlzLmNsaWNrU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuY2xpY2tlZCA9IGZhbHNlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMuY2xpY2tTb3VyY2UubmV4dCh0aGlzKTtcbiAgfVxuXG4gIGdldCBsYWJlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50O1xuICB9XG59XG4iXX0=