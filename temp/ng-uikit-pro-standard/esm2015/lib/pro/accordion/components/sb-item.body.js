/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewChild, Input, ContentChildren, QueryList, Output, EventEmitter, } from '@angular/core';
import { state, style, trigger, transition, animate } from '@angular/animations';
import { RouterLinkWithHref } from '@angular/router';
import { window } from '../../../free/utils/facade/browser';
/**
 * @record
 */
export function IAccordionAnimationState() { }
if (false) {
    /** @type {?} */
    IAccordionAnimationState.prototype.state;
    /** @type {?} */
    IAccordionAnimationState.prototype.accordionEl;
}
export class SBItemBodyComponent {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.animationStateChange = new EventEmitter();
        this.height = '0';
        this.expandAnimationState = 'collapsed';
        this.id = `mdb-accordion-`;
        this.ariaLabelledBy = '';
    }
    /**
     * @param {?} collapsed
     * @return {?}
     */
    toggle(collapsed) {
        setTimeout((/**
         * @return {?}
         */
        () => {
            collapsed
                ? (this.expandAnimationState = 'collapsed')
                : (this.expandAnimationState = 'expanded');
        }), 0);
    }
    /**
     * @return {?}
     */
    animationCallback() {
        this.animationStateChange.emit({
            state: this.expandAnimationState,
            accordionEl: this.el.nativeElement.parentElement.parentElement,
        });
    }
    /**
     * @return {?}
     */
    openSidenavOnActiveLink() {
        /** @type {?} */
        const pathStrategyUrl = window.location.pathname;
        /** @type {?} */
        const hashStrategyUrl = window.location.hash;
        /** @type {?} */
        const activeLink = this.routerLinks.find((/**
         * @param {?} link
         * @return {?}
         */
        (link) => {
            return link.href === pathStrategyUrl || link.href === hashStrategyUrl;
        }));
        if (activeLink) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.expandAnimationState = 'expanded';
            }), 40);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.openSidenavOnActiveLink();
    }
}
SBItemBodyComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'sbItemBody',
                selector: 'mdb-item-body, mdb-accordion-item-body',
                template: "<div #body class=\"sb-item-body\"\n     [style.height]=\"height\"\n     (@expandBody.done)=\"animationCallback()\"\n     [@expandBody]=\"expandAnimationState\"\n     [id]=\"id\"\n     role=\"region\"\n     [attr.aria-labelledby]=\"ariaLabelledBy\">\n    <div class=\"card-body {{ customClass }}\">\n    \t<ng-content></ng-content>\n    </div>\n</div>\n",
                animations: [
                    trigger('expandBody', [
                        state('collapsed', style({ height: '0px', visibility: 'hidden' })),
                        state('expanded', style({ height: '*', visibility: 'visible' })),
                        transition('expanded <=> collapsed', animate('500ms ease')),
                    ]),
                ]
            }] }
];
/** @nocollapse */
SBItemBodyComponent.ctorParameters = () => [
    { type: ElementRef }
];
SBItemBodyComponent.propDecorators = {
    customClass: [{ type: Input }],
    animationStateChange: [{ type: Output }],
    routerLinks: [{ type: ContentChildren, args: [RouterLinkWithHref,] }],
    bodyEl: [{ type: ViewChild, args: ['body', { static: true },] }]
};
if (false) {
    /** @type {?} */
    SBItemBodyComponent.prototype.customClass;
    /** @type {?} */
    SBItemBodyComponent.prototype.animationStateChange;
    /** @type {?} */
    SBItemBodyComponent.prototype.routerLinks;
    /** @type {?} */
    SBItemBodyComponent.prototype.height;
    /** @type {?} */
    SBItemBodyComponent.prototype.expandAnimationState;
    /** @type {?} */
    SBItemBodyComponent.prototype.id;
    /** @type {?} */
    SBItemBodyComponent.prototype.ariaLabelledBy;
    /** @type {?} */
    SBItemBodyComponent.prototype.bodyEl;
    /**
     * @type {?}
     * @private
     */
    SBItemBodyComponent.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ItaXRlbS5ib2R5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9hY2NvcmRpb24vY29tcG9uZW50cy9zYi1pdGVtLmJvZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFNBQVMsRUFDVCxLQUFLLEVBQ0wsZUFBZSxFQUVmLFNBQVMsRUFDVCxNQUFNLEVBQ04sWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7O0FBRTVELDhDQUdDOzs7SUFGQyx5Q0FBYzs7SUFDZCwrQ0FBd0I7O0FBZTFCLE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUFlOUIsWUFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFieEIseUJBQW9CLEdBQTJDLElBQUksWUFBWSxFQUV0RixDQUFDO1FBR0csV0FBTSxHQUFHLEdBQUcsQ0FBQztRQUNwQix5QkFBb0IsR0FBRyxXQUFXLENBQUM7UUFFNUIsT0FBRSxHQUFHLGdCQUFnQixDQUFDO1FBQzdCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO0lBSWlCLENBQUM7Ozs7O0lBRXRDLE1BQU0sQ0FBQyxTQUFrQjtRQUN2QixVQUFVOzs7UUFBQyxHQUFHLEVBQUU7WUFDZCxTQUFTO2dCQUNQLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxXQUFXLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxVQUFVLENBQUMsQ0FBQztRQUMvQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDOzs7O0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQztZQUM3QixLQUFLLEVBQUUsSUFBSSxDQUFDLG9CQUFvQjtZQUNoQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGFBQWE7U0FDL0QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELHVCQUF1Qjs7Y0FDZixlQUFlLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFROztjQUMxQyxlQUFlLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJOztjQUV0QyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUNyRCxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssZUFBZSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDO1FBQ3hFLENBQUMsRUFBQztRQUVGLElBQUksVUFBVSxFQUFFO1lBQ2QsVUFBVTs7O1lBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxVQUFVLENBQUM7WUFDekMsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ1I7SUFDSCxDQUFDOzs7O0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7OztZQTdERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRSx3Q0FBd0M7Z0JBQ2xELDRXQUFnQztnQkFDaEMsVUFBVSxFQUFFO29CQUNWLE9BQU8sQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDbEUsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO3dCQUNoRSxVQUFVLENBQUMsd0JBQXdCLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO3FCQUM1RCxDQUFDO2lCQUNIO2FBQ0Y7Ozs7WUE3QkMsVUFBVTs7OzBCQStCVCxLQUFLO21DQUNMLE1BQU07MEJBR04sZUFBZSxTQUFDLGtCQUFrQjtxQkFRbEMsU0FBUyxTQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Ozs7SUFabkMsMENBQTZCOztJQUM3QixtREFFSTs7SUFDSiwwQ0FBZ0Y7O0lBRWhGLHFDQUFvQjs7SUFDcEIsbURBQW1DOztJQUVuQyxpQ0FBNkI7O0lBQzdCLDZDQUFvQjs7SUFFcEIscUNBQXdEOzs7OztJQUU1QyxpQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIFZpZXdDaGlsZCxcbiAgSW5wdXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgUXVlcnlMaXN0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzdGF0ZSwgc3R5bGUsIHRyaWdnZXIsIHRyYW5zaXRpb24sIGFuaW1hdGUgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IFJvdXRlckxpbmtXaXRoSHJlZiB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyB3aW5kb3cgfSBmcm9tICcuLi8uLi8uLi9mcmVlL3V0aWxzL2ZhY2FkZS9icm93c2VyJztcblxuZXhwb3J0IGludGVyZmFjZSBJQWNjb3JkaW9uQW5pbWF0aW9uU3RhdGUge1xuICBzdGF0ZTogc3RyaW5nO1xuICBhY2NvcmRpb25FbDogRWxlbWVudFJlZjtcbn1cblxuQENvbXBvbmVudCh7XG4gIGV4cG9ydEFzOiAnc2JJdGVtQm9keScsXG4gIHNlbGVjdG9yOiAnbWRiLWl0ZW0tYm9keSwgbWRiLWFjY29yZGlvbi1pdGVtLWJvZHknLFxuICB0ZW1wbGF0ZVVybDogJ3NiLWl0ZW0uYm9keS5odG1sJyxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2V4cGFuZEJvZHknLCBbXG4gICAgICBzdGF0ZSgnY29sbGFwc2VkJywgc3R5bGUoeyBoZWlnaHQ6ICcwcHgnLCB2aXNpYmlsaXR5OiAnaGlkZGVuJyB9KSksXG4gICAgICBzdGF0ZSgnZXhwYW5kZWQnLCBzdHlsZSh7IGhlaWdodDogJyonLCB2aXNpYmlsaXR5OiAndmlzaWJsZScgfSkpLFxuICAgICAgdHJhbnNpdGlvbignZXhwYW5kZWQgPD0+IGNvbGxhcHNlZCcsIGFuaW1hdGUoJzUwMG1zIGVhc2UnKSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFNCSXRlbUJvZHlDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZztcbiAgQE91dHB1dCgpIGFuaW1hdGlvblN0YXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8SUFjY29yZGlvbkFuaW1hdGlvblN0YXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgSUFjY29yZGlvbkFuaW1hdGlvblN0YXRlXG4gID4oKTtcbiAgQENvbnRlbnRDaGlsZHJlbihSb3V0ZXJMaW5rV2l0aEhyZWYpIHJvdXRlckxpbmtzOiBRdWVyeUxpc3Q8Um91dGVyTGlua1dpdGhIcmVmPjtcblxuICBwdWJsaWMgaGVpZ2h0ID0gJzAnO1xuICBleHBhbmRBbmltYXRpb25TdGF0ZSA9ICdjb2xsYXBzZWQnO1xuXG4gIHB1YmxpYyBpZCA9IGBtZGItYWNjb3JkaW9uLWA7XG4gIGFyaWFMYWJlbGxlZEJ5ID0gJyc7XG5cbiAgQFZpZXdDaGlsZCgnYm9keScsIHsgc3RhdGljOiB0cnVlIH0pIGJvZHlFbDogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gIHRvZ2dsZShjb2xsYXBzZWQ6IGJvb2xlYW4pIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbGxhcHNlZFxuICAgICAgICA/ICh0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlID0gJ2NvbGxhcHNlZCcpXG4gICAgICAgIDogKHRoaXMuZXhwYW5kQW5pbWF0aW9uU3RhdGUgPSAnZXhwYW5kZWQnKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIGFuaW1hdGlvbkNhbGxiYWNrKCkge1xuICAgIHRoaXMuYW5pbWF0aW9uU3RhdGVDaGFuZ2UuZW1pdCh7XG4gICAgICBzdGF0ZTogdGhpcy5leHBhbmRBbmltYXRpb25TdGF0ZSxcbiAgICAgIGFjY29yZGlvbkVsOiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LFxuICAgIH0pO1xuICB9XG5cbiAgb3BlblNpZGVuYXZPbkFjdGl2ZUxpbmsoKSB7XG4gICAgY29uc3QgcGF0aFN0cmF0ZWd5VXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIGNvbnN0IGhhc2hTdHJhdGVneVVybCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuXG4gICAgY29uc3QgYWN0aXZlTGluayA9IHRoaXMucm91dGVyTGlua3MuZmluZCgobGluazogYW55KSA9PiB7XG4gICAgICByZXR1cm4gbGluay5ocmVmID09PSBwYXRoU3RyYXRlZ3lVcmwgfHwgbGluay5ocmVmID09PSBoYXNoU3RyYXRlZ3lVcmw7XG4gICAgfSk7XG5cbiAgICBpZiAoYWN0aXZlTGluaykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZXhwYW5kQW5pbWF0aW9uU3RhdGUgPSAnZXhwYW5kZWQnO1xuICAgICAgfSwgNDApO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLm9wZW5TaWRlbmF2T25BY3RpdmVMaW5rKCk7XG4gIH1cbn1cbiJdfQ==