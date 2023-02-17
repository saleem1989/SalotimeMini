/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChild, Input } from '@angular/core';
import { SBItemBodyComponent } from './sb-item.body';
import { MdbAccordionService } from '../mdb-accordion.service';
export class SBItemComponent {
    /**
     * @param {?} accordionService
     */
    constructor(accordionService) {
        this.accordionService = accordionService;
        this.collapsed = true;
        this.idModifier = Math.floor(Math.random() * 1000);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.body !== undefined) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.collapsed
                    ? (this.body.expandAnimationState = 'collapsed')
                    : (this.body.expandAnimationState = 'expanded');
            }), 0);
            this.body.toggle(this.collapsed);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.body && this.body.expandAnimationState === 'expanded') {
                this.collapsed = false;
            }
        }), 40);
        if (this.body) {
            this.body.id = `mdb-accordion-body-${this.idModifier}`;
        }
    }
    /**
     * @param {?} collapsed
     * @return {?}
     */
    toggle(collapsed) {
        this.accordionService.didItemToggled(this);
        this.applyToggle(collapsed);
    }
    /**
     * @param {?} collapsed
     * @return {?}
     */
    applyToggle(collapsed) {
        if (this.body !== undefined) {
            this.collapsed = collapsed;
            this.body.toggle(collapsed);
        }
    }
}
SBItemComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'sbItem',
                selector: 'mdb-item, mdb-accordion-item',
                template: "<div class=\"card {{ customClass }}\" [ngClass]=\"{'is-collapsed': collapsed, 'active': !collapsed}\">\n  <ng-content></ng-content>\n</div>"
            }] }
];
/** @nocollapse */
SBItemComponent.ctorParameters = () => [
    { type: MdbAccordionService }
];
SBItemComponent.propDecorators = {
    collapsed: [{ type: Input }],
    customClass: [{ type: Input }],
    body: [{ type: ContentChild, args: [SBItemBodyComponent, { static: false },] }]
};
if (false) {
    /** @type {?} */
    SBItemComponent.prototype.collapsed;
    /** @type {?} */
    SBItemComponent.prototype.customClass;
    /** @type {?} */
    SBItemComponent.prototype.idModifier;
    /** @type {?} */
    SBItemComponent.prototype.body;
    /**
     * @type {?}
     * @private
     */
    SBItemComponent.prototype.accordionService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ItaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vYWNjb3JkaW9uL2NvbXBvbmVudHMvc2ItaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFtQyxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU8vRCxNQUFNLE9BQU8sZUFBZTs7OztJQVExQixZQUFvQixnQkFBcUM7UUFBckMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFxQjtRQVB6QyxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRzFCLGVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUlPLENBQUM7Ozs7SUFFN0QsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDM0IsVUFBVTs7O1lBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxTQUFTO29CQUNaLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsV0FBVyxDQUFDO29CQUNoRCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFVBQVUsQ0FBQyxDQUFDO1lBQ3BELENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNsQztJQUNILENBQUM7Ozs7SUFFRCxrQkFBa0I7UUFDaEIsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEtBQUssVUFBVSxFQUFFO2dCQUM5RCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzthQUN4QjtRQUNILENBQUMsR0FBRSxFQUFFLENBQUMsQ0FBQztRQUNQLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLHNCQUFzQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDeEQ7SUFDSCxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxTQUFrQjtRQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsU0FBa0I7UUFDNUIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM3QjtJQUNILENBQUM7OztZQS9DRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLHVKQUEyQjthQUM1Qjs7OztZQU5RLG1CQUFtQjs7O3dCQVF6QixLQUFLOzBCQUNMLEtBQUs7bUJBSUwsWUFBWSxTQUFDLG1CQUFtQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7OztJQUxwRCxvQ0FBaUM7O0lBQ2pDLHNDQUE2Qjs7SUFFN0IscUNBQXFEOztJQUVyRCwrQkFBZ0Y7Ozs7O0lBRXBFLDJDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU0JJdGVtQm9keUNvbXBvbmVudCB9IGZyb20gJy4vc2ItaXRlbS5ib2R5JztcbmltcG9ydCB7IE1kYkFjY29yZGlvblNlcnZpY2UgfSBmcm9tICcuLi9tZGItYWNjb3JkaW9uLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgZXhwb3J0QXM6ICdzYkl0ZW0nLFxuICBzZWxlY3RvcjogJ21kYi1pdGVtLCBtZGItYWNjb3JkaW9uLWl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJ3NiLWl0ZW0uaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFNCSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXQge1xuICBASW5wdXQoKSBwdWJsaWMgY29sbGFwc2VkID0gdHJ1ZTtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZztcblxuICBwdWJsaWMgaWRNb2RpZmllciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDApO1xuXG4gIEBDb250ZW50Q2hpbGQoU0JJdGVtQm9keUNvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pIGJvZHk6IFNCSXRlbUJvZHlDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY2NvcmRpb25TZXJ2aWNlOiBNZGJBY2NvcmRpb25TZXJ2aWNlKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAodGhpcy5ib2R5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbGxhcHNlZFxuICAgICAgICAgID8gKHRoaXMuYm9keS5leHBhbmRBbmltYXRpb25TdGF0ZSA9ICdjb2xsYXBzZWQnKVxuICAgICAgICAgIDogKHRoaXMuYm9keS5leHBhbmRBbmltYXRpb25TdGF0ZSA9ICdleHBhbmRlZCcpO1xuICAgICAgfSwgMCk7XG4gICAgICB0aGlzLmJvZHkudG9nZ2xlKHRoaXMuY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5ib2R5ICYmIHRoaXMuYm9keS5leHBhbmRBbmltYXRpb25TdGF0ZSA9PT0gJ2V4cGFuZGVkJykge1xuICAgICAgICB0aGlzLmNvbGxhcHNlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sIDQwKTtcbiAgICBpZiAodGhpcy5ib2R5KSB7XG4gICAgICB0aGlzLmJvZHkuaWQgPSBgbWRiLWFjY29yZGlvbi1ib2R5LSR7dGhpcy5pZE1vZGlmaWVyfWA7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlKGNvbGxhcHNlZDogYm9vbGVhbikge1xuICAgIHRoaXMuYWNjb3JkaW9uU2VydmljZS5kaWRJdGVtVG9nZ2xlZCh0aGlzKTtcbiAgICB0aGlzLmFwcGx5VG9nZ2xlKGNvbGxhcHNlZCk7XG4gIH1cblxuICBhcHBseVRvZ2dsZShjb2xsYXBzZWQ6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5ib2R5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY29sbGFwc2VkID0gY29sbGFwc2VkO1xuICAgICAgdGhpcy5ib2R5LnRvZ2dsZShjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxufVxuIl19