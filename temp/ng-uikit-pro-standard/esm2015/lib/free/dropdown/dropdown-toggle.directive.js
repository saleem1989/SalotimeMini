/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';
import { BsDropdownState } from './dropdown.state';
export class BsDropdownToggleDirective {
    /**
     * @param {?} _state
     * @param {?} _element
     */
    constructor(_state, _element) {
        this._state = _state;
        this._element = _element;
        this._subscriptions = [];
        this.ariaHaspopup = true;
        // @HostBinding('attr.disabled') isDisabled: boolean = null;
        this.isDisabled = null;
        // sync is open value with state
        this._subscriptions.push(this._state
            .isOpenChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => this.isOpen = value)));
        // populate disabled state
        this._subscriptions.push(this._state
            .isDisabledChange
            // .subscribe((value: boolean) => this.isDisabled = value || null));
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => this.isDisabled = value || null)));
    }
    /**
     * @return {?}
     */
    onClick() {
        if (this.isDisabled) {
            return;
        }
        this._state.toggleClick.emit();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDocumentClick(event) {
        if (this._state.autoClose && event.button !== 2 &&
            !this._element.nativeElement.contains(event.target)) {
            this._state.toggleClick.emit(false);
        }
    }
    /**
     * @return {?}
     */
    onEsc() {
        if (this._state.autoClose) {
            this._state.toggleClick.emit(false);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        for (const sub of this._subscriptions) {
            sub.unsubscribe();
        }
    }
}
BsDropdownToggleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mdbDropdownToggle],[dropdownToggle]',
                exportAs: 'bs-dropdown-toggle'
            },] }
];
/** @nocollapse */
BsDropdownToggleDirective.ctorParameters = () => [
    { type: BsDropdownState },
    { type: ElementRef }
];
BsDropdownToggleDirective.propDecorators = {
    ariaHaspopup: [{ type: HostBinding, args: ['attr.aria-haspopup',] }],
    isDisabled: [{ type: HostBinding, args: ['attr.disabled',] }],
    isOpen: [{ type: HostBinding, args: ['attr.aria-expanded',] }],
    onClick: [{ type: HostListener, args: ['click',] }],
    onDocumentClick: [{ type: HostListener, args: ['document:click', ['$event'],] }],
    onEsc: [{ type: HostListener, args: ['keyup.esc',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    BsDropdownToggleDirective.prototype._subscriptions;
    /** @type {?} */
    BsDropdownToggleDirective.prototype.ariaHaspopup;
    /** @type {?} */
    BsDropdownToggleDirective.prototype.isDisabled;
    /** @type {?} */
    BsDropdownToggleDirective.prototype.isOpen;
    /**
     * @type {?}
     * @private
     */
    BsDropdownToggleDirective.prototype._state;
    /**
     * @type {?}
     * @private
     */
    BsDropdownToggleDirective.prototype._element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tdG9nZ2xlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9mcmVlL2Ryb3Bkb3duL2Ryb3Bkb3duLXRvZ2dsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFHNUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBTW5ELE1BQU0sT0FBTyx5QkFBeUI7Ozs7O0lBaUN0QyxZQUFvQixNQUF1QixFQUNqQyxRQUFvQjtRQURWLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQ2pDLGFBQVEsR0FBUixRQUFRLENBQVk7UUFqQ3BCLG1CQUFjLEdBQW1CLEVBQUUsQ0FBQztRQUVULGlCQUFZLEdBQUcsSUFBSSxDQUFDOztRQUV6QixlQUFVLEdBQWtCLElBQUksQ0FBQztRQThCL0QsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO2FBQ2pDLFlBQVksQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxLQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUNwRSwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07YUFDakMsZ0JBQWdCO1lBQ2pCLG9FQUFvRTthQUNuRSxTQUFTOzs7O1FBQUMsQ0FBQyxLQUFvQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssSUFBSSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7Ozs7SUFoQ0MsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUdELGVBQWUsQ0FBQyxLQUFVO1FBQ3hCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQzdDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDOzs7O0lBR0QsS0FBSztRQUNILElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQzs7OztJQWNELFdBQVc7UUFDVCxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQzs7O1lBckRBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0NBQXNDO2dCQUNoRCxRQUFRLEVBQUUsb0JBQW9CO2FBQy9COzs7O1lBTFEsZUFBZTtZQUhKLFVBQVU7OzsyQkFZM0IsV0FBVyxTQUFDLG9CQUFvQjt5QkFFaEMsV0FBVyxTQUFDLGVBQWU7cUJBRzNCLFdBQVcsU0FBQyxvQkFBb0I7c0JBRWhDLFlBQVksU0FBQyxPQUFPOzhCQVFwQixZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0JBUTNDLFlBQVksU0FBQyxXQUFXOzs7Ozs7O0lBekJ2QixtREFBNEM7O0lBRTVDLGlEQUF1RDs7SUFFdkQsK0NBQStEOztJQUcvRCwyQ0FBbUQ7Ozs7O0lBeUJ6QywyQ0FBK0I7Ozs7O0lBQ3pDLDZDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQnNEcm9wZG93blN0YXRlIH0gZnJvbSAnLi9kcm9wZG93bi5zdGF0ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZGJEcm9wZG93blRvZ2dsZV0sW2Ryb3Bkb3duVG9nZ2xlXScsXG4gIGV4cG9ydEFzOiAnYnMtZHJvcGRvd24tdG9nZ2xlJ1xufSlcbmV4cG9ydCBjbGFzcyBCc0Ryb3Bkb3duVG9nZ2xlRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1oYXNwb3B1cCcpIGFyaWFIYXNwb3B1cCA9IHRydWU7XG4gIC8vIEBIb3N0QmluZGluZygnYXR0ci5kaXNhYmxlZCcpIGlzRGlzYWJsZWQ6IGJvb2xlYW4gPSBudWxsO1xuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGlzYWJsZWQnKSBpc0Rpc2FibGVkOiBib29sZWFuIHwgYW55ID0gbnVsbDtcblxuICAvLyBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjdGl2ZScpXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWV4cGFuZGVkJykgaXNPcGVuOiBib29sZWFuO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3N0YXRlLnRvZ2dsZUNsaWNrLmVtaXQoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgb25Eb2N1bWVudENsaWNrKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc3RhdGUuYXV0b0Nsb3NlICYmIGV2ZW50LmJ1dHRvbiAhPT0gMiAmJlxuICAgICAgIXRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLl9zdGF0ZS50b2dnbGVDbGljay5lbWl0KGZhbHNlKTtcbiAgfVxufVxuXG5ASG9zdExpc3RlbmVyKCdrZXl1cC5lc2MnKVxub25Fc2MoKTogdm9pZCB7XG4gIGlmICh0aGlzLl9zdGF0ZS5hdXRvQ2xvc2UpIHtcbiAgICB0aGlzLl9zdGF0ZS50b2dnbGVDbGljay5lbWl0KGZhbHNlKTtcbiAgfVxufVxuXG5jb25zdHJ1Y3Rvcihwcml2YXRlIF9zdGF0ZTogQnNEcm9wZG93blN0YXRlLFxuICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gIC8vIHN5bmMgaXMgb3BlbiB2YWx1ZSB3aXRoIHN0YXRlXG4gIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaCh0aGlzLl9zdGF0ZVxuICAgIC5pc09wZW5DaGFuZ2Uuc3Vic2NyaWJlKCh2YWx1ZTogYm9vbGVhbikgPT4gdGhpcy5pc09wZW4gPSB2YWx1ZSkpO1xuICAvLyBwb3B1bGF0ZSBkaXNhYmxlZCBzdGF0ZVxuICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2godGhpcy5fc3RhdGVcbiAgICAuaXNEaXNhYmxlZENoYW5nZVxuICAgIC8vIC5zdWJzY3JpYmUoKHZhbHVlOiBib29sZWFuKSA9PiB0aGlzLmlzRGlzYWJsZWQgPSB2YWx1ZSB8fCBudWxsKSk7XG4gICAgLnN1YnNjcmliZSgodmFsdWU6IGJvb2xlYW4gfCBhbnkpID0+IHRoaXMuaXNEaXNhYmxlZCA9IHZhbHVlIHx8IG51bGwpKTtcbn1cblxubmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gIGZvciAoY29uc3Qgc3ViIG9mIHRoaXMuX3N1YnNjcmlwdGlvbnMpIHtcbiAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxufVxuIl19