/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { BsDropdownState } from './dropdown.state';
var BsDropdownContainerComponent = /** @class */ (function () {
    function BsDropdownContainerComponent(_state) {
        var _this = this;
        this._state = _state;
        this.isOpen = false;
        this.display = 'block';
        this.position = 'absolute';
        this._subscription = _state.isOpenChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _this.isOpen = value;
        }));
    }
    Object.defineProperty(BsDropdownContainerComponent.prototype, "direction", {
        get: /**
         * @return {?}
         */
        function () {
            return this._state.direction;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BsDropdownContainerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    BsDropdownContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-dropdown-container',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n  <div [class.dropup]=\"direction === 'up'\"\n  [class.dropdown]=\"direction === 'down'\"\n  [class.show]=\"isOpen\"\n  [class.open]=\"isOpen\">\n    <ng-content></ng-content>\n  </div>\n  "
                }] }
    ];
    /** @nocollapse */
    BsDropdownContainerComponent.ctorParameters = function () { return [
        { type: BsDropdownState }
    ]; };
    BsDropdownContainerComponent.propDecorators = {
        display: [{ type: HostBinding, args: ['style.display',] }],
        position: [{ type: HostBinding, args: ['style.position',] }]
    };
    return BsDropdownContainerComponent;
}());
export { BsDropdownContainerComponent };
if (false) {
    /** @type {?} */
    BsDropdownContainerComponent.prototype.isOpen;
    /** @type {?} */
    BsDropdownContainerComponent.prototype.display;
    /** @type {?} */
    BsDropdownContainerComponent.prototype.position;
    /**
     * @type {?}
     * @private
     */
    BsDropdownContainerComponent.prototype._subscription;
    /**
     * @type {?}
     * @private
     */
    BsDropdownContainerComponent.prototype._state;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9mcmVlL2Ryb3Bkb3duL2Ryb3Bkb3duLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQWEsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVuRDtJQXdCRSxzQ0FBb0IsTUFBdUI7UUFBM0MsaUJBSUM7UUFKbUIsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFYM0MsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVlLFlBQU8sR0FBRyxPQUFPLENBQUM7UUFDakIsYUFBUSxHQUFHLFVBQVUsQ0FBQztRQVNuRCxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsS0FBYztZQUNoRSxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFWRCxzQkFBSSxtREFBUzs7OztRQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUMvQixDQUFDOzs7T0FBQTs7OztJQVVELGtEQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7Z0JBaENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFLGlNQU9UO2lCQUNGOzs7O2dCQWJRLGVBQWU7OzswQkFpQnJCLFdBQVcsU0FBQyxlQUFlOzJCQUMzQixXQUFXLFNBQUMsZ0JBQWdCOztJQWlCL0IsbUNBQUM7Q0FBQSxBQWpDRCxJQWlDQztTQXJCWSw0QkFBNEI7OztJQUN2Qyw4Q0FBZTs7SUFFZiwrQ0FBZ0Q7O0lBQ2hELGdEQUFxRDs7Ozs7SUFNckQscURBQTJCOzs7OztJQUVmLDhDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uRGVzdHJveSwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJzRHJvcGRvd25TdGF0ZSB9IGZyb20gJy4vZHJvcGRvd24uc3RhdGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItZHJvcGRvd24tY29udGFpbmVyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gIDxkaXYgW2NsYXNzLmRyb3B1cF09XCJkaXJlY3Rpb24gPT09ICd1cCdcIlxuICBbY2xhc3MuZHJvcGRvd25dPVwiZGlyZWN0aW9uID09PSAnZG93bidcIlxuICBbY2xhc3Muc2hvd109XCJpc09wZW5cIlxuICBbY2xhc3Mub3Blbl09XCJpc09wZW5cIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEJzRHJvcGRvd25Db250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBpc09wZW4gPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmRpc3BsYXknKSBkaXNwbGF5ID0gJ2Jsb2NrJztcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5wb3NpdGlvbicpIHBvc2l0aW9uID0gJ2Fic29sdXRlJztcblxuICBnZXQgZGlyZWN0aW9uKCk6ICdkb3duJyB8ICd1cCcge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZS5kaXJlY3Rpb247XG4gIH1cblxuICBwcml2YXRlIF9zdWJzY3JpcHRpb246IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zdGF0ZTogQnNEcm9wZG93blN0YXRlKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gX3N0YXRlLmlzT3BlbkNoYW5nZS5zdWJzY3JpYmUoKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgICB0aGlzLmlzT3BlbiA9IHZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==