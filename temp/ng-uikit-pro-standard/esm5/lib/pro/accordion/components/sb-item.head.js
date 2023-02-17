/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostListener, Input } from '@angular/core';
import { SBItemComponent } from './sb-item';
var SBItemHeadComponent = /** @class */ (function () {
    function SBItemHeadComponent(sbItem) {
        this.sbItem = sbItem;
        this.isDisabled = false;
        this.indicator = true;
        this.id = "mdb-accordion-";
        this.ariaExpanded = false;
        this.ariaControls = '';
        this.id = "mdb-accordion-head-" + this.sbItem.idModifier;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    SBItemHeadComponent.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line: deprecation
        if (event.keyCode === 32) {
            this.toggleClick(event);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SBItemHeadComponent.prototype.toggleClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        if (!this.isDisabled) {
            this.sbItem.collapsed = !this.sbItem.collapsed;
            this.sbItem.toggle(this.sbItem.collapsed);
            this.ariaExpanded = !this.ariaExpanded;
        }
    };
    /**
     * @return {?}
     */
    SBItemHeadComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.sbItem.body) {
                _this.ariaControls = _this.sbItem.body.id;
                _this.sbItem.body.ariaLabelledBy = _this.id;
            }
        }), 0);
    };
    SBItemHeadComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'sbItemHead',
                    selector: 'mdb-item-head, mdb-accordion-item-head',
                    template: "<div\n  class=\"card-header {{ customClass }}\"\n  [ngClass]=\"{ 'item-disabled': isDisabled }\"\n  (click)=\"toggleClick($event)\"\n  [id]=\"id\"\n>\n  <a\n    role=\"button\"\n    href=\"javascript:;\"\n    [attr.aria-expanded]=\"ariaExpanded\"\n    [attr.aria-controls]=\"ariaControls\"\n  >\n    <h5 class=\"mb-0\">\n      <span class=\"\">\n        <ng-content></ng-content>\n      </span>\n      <i *ngIf=\"indicator\" class=\"mdb-accordion-indicator rotate-icon\" aria-hidden=\"true\"></i>\n    </h5>\n  </a>\n</div>\n"
                }] }
    ];
    /** @nocollapse */
    SBItemHeadComponent.ctorParameters = function () { return [
        { type: SBItemComponent }
    ]; };
    SBItemHeadComponent.propDecorators = {
        isDisabled: [{ type: Input }],
        customClass: [{ type: Input }],
        indicator: [{ type: Input }],
        onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return SBItemHeadComponent;
}());
export { SBItemHeadComponent };
if (false) {
    /** @type {?} */
    SBItemHeadComponent.prototype.isDisabled;
    /** @type {?} */
    SBItemHeadComponent.prototype.customClass;
    /** @type {?} */
    SBItemHeadComponent.prototype.indicator;
    /** @type {?} */
    SBItemHeadComponent.prototype.id;
    /** @type {?} */
    SBItemHeadComponent.prototype.ariaExpanded;
    /** @type {?} */
    SBItemHeadComponent.prototype.ariaControls;
    /**
     * @type {?}
     * @private
     */
    SBItemHeadComponent.prototype.sbItem;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ItaXRlbS5oZWFkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9hY2NvcmRpb24vY29tcG9uZW50cy9zYi1pdGVtLmhlYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUU1QztJQWNFLDZCQUFvQixNQUF1QjtRQUF2QixXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQVJsQyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRW5CLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFbkIsT0FBRSxHQUFHLGdCQUFnQixDQUFDO1FBQzdCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBR2hCLElBQUksQ0FBQyxFQUFFLEdBQUcsd0JBQXNCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBWSxDQUFDO0lBQzNELENBQUM7Ozs7O0lBRW9DLHVDQUFTOzs7O0lBQTlDLFVBQStDLEtBQW9CO1FBQ2pFLHdDQUF3QztRQUN4QyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7SUFDSCxDQUFDOzs7OztJQUVELHlDQUFXOzs7O0lBQVgsVUFBWSxLQUFVO1FBQ3BCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDeEM7SUFDSCxDQUFDOzs7O0lBRUQsNkNBQWU7OztJQUFmO1FBQUEsaUJBT0M7UUFOQyxVQUFVOzs7UUFBQztZQUNULElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3BCLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUN4QyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLEVBQUUsQ0FBQzthQUMzQztRQUNILENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7O2dCQXpDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLFFBQVEsRUFBRSx3Q0FBd0M7b0JBQ2xELHloQkFBZ0M7aUJBQ2pDOzs7O2dCQU5RLGVBQWU7Ozs2QkFRckIsS0FBSzs4QkFDTCxLQUFLOzRCQUNMLEtBQUs7NEJBVUwsWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUF3QnJDLDBCQUFDO0NBQUEsQUExQ0QsSUEwQ0M7U0FyQ1ksbUJBQW1COzs7SUFDOUIseUNBQTRCOztJQUM1QiwwQ0FBNkI7O0lBQzdCLHdDQUEwQjs7SUFFMUIsaUNBQTZCOztJQUM3QiwyQ0FBcUI7O0lBQ3JCLDJDQUFrQjs7Ozs7SUFFTixxQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNCSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vc2ItaXRlbSc7XG5cbkBDb21wb25lbnQoe1xuICBleHBvcnRBczogJ3NiSXRlbUhlYWQnLFxuICBzZWxlY3RvcjogJ21kYi1pdGVtLWhlYWQsIG1kYi1hY2NvcmRpb24taXRlbS1oZWFkJyxcbiAgdGVtcGxhdGVVcmw6ICdzYi1pdGVtLmhlYWQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFNCSXRlbUhlYWRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgaXNEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBjdXN0b21DbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSBpbmRpY2F0b3IgPSB0cnVlO1xuXG4gIHB1YmxpYyBpZCA9IGBtZGItYWNjb3JkaW9uLWA7XG4gIGFyaWFFeHBhbmRlZCA9IGZhbHNlO1xuICBhcmlhQ29udHJvbHMgPSAnJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNiSXRlbTogU0JJdGVtQ29tcG9uZW50KSB7XG4gICAgdGhpcy5pZCA9IGBtZGItYWNjb3JkaW9uLWhlYWQtJHt0aGlzLnNiSXRlbS5pZE1vZGlmaWVyfWA7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSkgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzMikge1xuICAgICAgdGhpcy50b2dnbGVDbGljayhldmVudCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlQ2xpY2soZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuc2JJdGVtLmNvbGxhcHNlZCA9ICF0aGlzLnNiSXRlbS5jb2xsYXBzZWQ7XG4gICAgICB0aGlzLnNiSXRlbS50b2dnbGUodGhpcy5zYkl0ZW0uY29sbGFwc2VkKTtcbiAgICAgIHRoaXMuYXJpYUV4cGFuZGVkID0gIXRoaXMuYXJpYUV4cGFuZGVkO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnNiSXRlbS5ib2R5KSB7XG4gICAgICAgIHRoaXMuYXJpYUNvbnRyb2xzID0gdGhpcy5zYkl0ZW0uYm9keS5pZDtcbiAgICAgICAgdGhpcy5zYkl0ZW0uYm9keS5hcmlhTGFiZWxsZWRCeSA9IHRoaXMuaWQ7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH1cbn1cbiJdfQ==