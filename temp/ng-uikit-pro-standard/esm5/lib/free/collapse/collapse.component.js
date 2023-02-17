/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostBinding, Input, Output, EventEmitter, HostListener, } from '@angular/core';
import { state, style, trigger, transition, animate } from '@angular/animations';
var CollapseComponent = /** @class */ (function () {
    function CollapseComponent() {
        this.isCollapsed = true;
        this.showBsCollapse = new EventEmitter();
        this.shownBsCollapse = new EventEmitter();
        this.hideBsCollapse = new EventEmitter();
        this.hiddenBsCollapse = new EventEmitter();
        this.collapsed = new EventEmitter();
        this.expanded = new EventEmitter();
        this.overflow = 'hidden';
    }
    /**
     * @param {?} event
     * @return {?}
     */
    CollapseComponent.prototype.onExpandBodyDone = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (event.toState === 'expanded') {
                _this.shownBsCollapse.emit(_this);
                _this.expanded.emit(_this);
                _this.overflow = 'visible';
            }
            else {
                _this.hiddenBsCollapse.emit(_this);
                _this.collapsed.emit(_this);
            }
        }), 0);
    };
    /**
     * @return {?}
     */
    CollapseComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.isCollapsed ? this.show() : this.hide();
    };
    /**
     * @return {?}
     */
    CollapseComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        this.expandAnimationState = 'expanded';
        this.isCollapsed = false;
        this.showBsCollapse.emit(this);
    };
    /**
     * @return {?}
     */
    CollapseComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.overflow = 'hidden';
        this.expandAnimationState = 'collapsed';
        this.isCollapsed = true;
        this.hideBsCollapse.emit(this);
    };
    /**
     * @return {?}
     */
    CollapseComponent.prototype.initializeCollapseState = /**
     * @return {?}
     */
    function () {
        this.isCollapsed ? this.hide() : this.show();
    };
    /**
     * @return {?}
     */
    CollapseComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initializeCollapseState();
    };
    CollapseComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[mdbCollapse]',
                    exportAs: 'bs-collapse',
                    template: '<ng-content></ng-content>',
                    animations: [
                        trigger('expandBody', [
                            state('collapsed', style({ height: '0px' })),
                            state('expanded', style({ height: '*' })),
                            transition('expanded <=> collapsed', animate('500ms ease')),
                        ]),
                    ]
                }] }
    ];
    /** @nocollapse */
    CollapseComponent.ctorParameters = function () { return []; };
    CollapseComponent.propDecorators = {
        isCollapsed: [{ type: Input }],
        showBsCollapse: [{ type: Output }],
        shownBsCollapse: [{ type: Output }],
        hideBsCollapse: [{ type: Output }],
        hiddenBsCollapse: [{ type: Output }],
        collapsed: [{ type: Output }],
        expanded: [{ type: Output }],
        expandAnimationState: [{ type: HostBinding, args: ['@expandBody',] }],
        overflow: [{ type: HostBinding, args: ['style.overflow',] }],
        onExpandBodyDone: [{ type: HostListener, args: ['@expandBody.done', ['$event'],] }]
    };
    return CollapseComponent;
}());
export { CollapseComponent };
if (false) {
    /** @type {?} */
    CollapseComponent.prototype.isCollapsed;
    /** @type {?} */
    CollapseComponent.prototype.showBsCollapse;
    /** @type {?} */
    CollapseComponent.prototype.shownBsCollapse;
    /** @type {?} */
    CollapseComponent.prototype.hideBsCollapse;
    /** @type {?} */
    CollapseComponent.prototype.hiddenBsCollapse;
    /** @type {?} */
    CollapseComponent.prototype.collapsed;
    /** @type {?} */
    CollapseComponent.prototype.expanded;
    /** @type {?} */
    CollapseComponent.prototype.expandAnimationState;
    /** @type {?} */
    CollapseComponent.prototype.overflow;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvY29sbGFwc2UvY29sbGFwc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFdBQVcsRUFDWCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVqRjtJQXVCRTtRQVRTLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRWxCLG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4RCxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZELHFCQUFnQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pELGNBQVMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNsRCxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFNM0QsYUFBUSxHQUFHLFFBQVEsQ0FBQztJQUpMLENBQUM7Ozs7O0lBT2hCLDRDQUFnQjs7OztJQURoQixVQUNpQixLQUFVO1FBRDNCLGlCQVlDO1FBVkMsVUFBVTs7O1FBQUM7WUFDVCxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO2dCQUNoQyxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQztnQkFDaEMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO2FBQzNCO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7Z0JBQ2pDLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO2FBQzNCO1FBQ0gsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQzs7OztJQUVELGtDQUFNOzs7SUFBTjtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9DLENBQUM7Ozs7SUFFRCxnQ0FBSTs7O0lBQUo7UUFDRSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsVUFBVSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBRXpCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7SUFFRCxnQ0FBSTs7O0lBQUo7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsV0FBVyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRXhCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7SUFFRCxtREFBdUI7OztJQUF2QjtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9DLENBQUM7Ozs7SUFFRCxvQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUNqQyxDQUFDOztnQkFwRUYsU0FBUyxTQUFDOztvQkFFVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFVBQVUsRUFBRTt3QkFDVixPQUFPLENBQUMsWUFBWSxFQUFFOzRCQUNwQixLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDOzRCQUM1QyxLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDOzRCQUN6QyxVQUFVLENBQUMsd0JBQXdCLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO3lCQUM1RCxDQUFDO3FCQUNIO2lCQUNGOzs7Ozs4QkFFRSxLQUFLO2lDQUVMLE1BQU07a0NBQ04sTUFBTTtpQ0FDTixNQUFNO21DQUNOLE1BQU07NEJBQ04sTUFBTTsyQkFDTixNQUFNO3VDQUlOLFdBQVcsU0FBQyxhQUFhOzJCQUN6QixXQUFXLFNBQUMsZ0JBQWdCO21DQUc1QixZQUFZLFNBQUMsa0JBQWtCLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBd0M5Qyx3QkFBQztDQUFBLEFBckVELElBcUVDO1NBeERZLGlCQUFpQjs7O0lBQzVCLHdDQUE0Qjs7SUFFNUIsMkNBQWlFOztJQUNqRSw0Q0FBa0U7O0lBQ2xFLDJDQUFpRTs7SUFDakUsNkNBQW1FOztJQUNuRSxzQ0FBNEQ7O0lBQzVELHFDQUEyRDs7SUFJM0QsaURBQXlEOztJQUN6RCxxQ0FDb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHN0YXRlLCBzdHlsZSwgdHJpZ2dlciwgdHJhbnNpdGlvbiwgYW5pbWF0ZSB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1ttZGJDb2xsYXBzZV0nLFxuICBleHBvcnRBczogJ2JzLWNvbGxhcHNlJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2V4cGFuZEJvZHknLCBbXG4gICAgICBzdGF0ZSgnY29sbGFwc2VkJywgc3R5bGUoeyBoZWlnaHQ6ICcwcHgnIH0pKSxcbiAgICAgIHN0YXRlKCdleHBhbmRlZCcsIHN0eWxlKHsgaGVpZ2h0OiAnKicgfSkpLFxuICAgICAgdHJhbnNpdGlvbignZXhwYW5kZWQgPD0+IGNvbGxhcHNlZCcsIGFuaW1hdGUoJzUwMG1zIGVhc2UnKSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbGxhcHNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgaXNDb2xsYXBzZWQgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBzaG93QnNDb2xsYXBzZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzaG93bkJzQ29sbGFwc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgaGlkZUJzQ29sbGFwc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgaGlkZGVuQnNDb2xsYXBzZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjb2xsYXBzZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZXhwYW5kZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBASG9zdEJpbmRpbmcoJ0BleHBhbmRCb2R5JykgZXhwYW5kQW5pbWF0aW9uU3RhdGU6IHN0cmluZztcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5vdmVyZmxvdycpXG4gIG92ZXJmbG93ID0gJ2hpZGRlbic7XG5cbiAgQEhvc3RMaXN0ZW5lcignQGV4cGFuZEJvZHkuZG9uZScsIFsnJGV2ZW50J10pXG4gIG9uRXhwYW5kQm9keURvbmUoZXZlbnQ6IGFueSkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICdleHBhbmRlZCcpIHtcbiAgICAgICAgdGhpcy5zaG93bkJzQ29sbGFwc2UuZW1pdCh0aGlzKTtcbiAgICAgICAgdGhpcy5leHBhbmRlZC5lbWl0KHRoaXMpO1xuICAgICAgICB0aGlzLm92ZXJmbG93ID0gJ3Zpc2libGUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oaWRkZW5Cc0NvbGxhcHNlLmVtaXQodGhpcyk7XG4gICAgICAgIHRoaXMuY29sbGFwc2VkLmVtaXQodGhpcyk7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5pc0NvbGxhcHNlZCA/IHRoaXMuc2hvdygpIDogdGhpcy5oaWRlKCk7XG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMuZXhwYW5kQW5pbWF0aW9uU3RhdGUgPSAnZXhwYW5kZWQnO1xuICAgIHRoaXMuaXNDb2xsYXBzZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuc2hvd0JzQ29sbGFwc2UuZW1pdCh0aGlzKTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIHRoaXMuZXhwYW5kQW5pbWF0aW9uU3RhdGUgPSAnY29sbGFwc2VkJztcbiAgICB0aGlzLmlzQ29sbGFwc2VkID0gdHJ1ZTtcblxuICAgIHRoaXMuaGlkZUJzQ29sbGFwc2UuZW1pdCh0aGlzKTtcbiAgfVxuXG4gIGluaXRpYWxpemVDb2xsYXBzZVN0YXRlKCkge1xuICAgIHRoaXMuaXNDb2xsYXBzZWQgPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdygpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplQ29sbGFwc2VTdGF0ZSgpO1xuICB9XG59XG4iXX0=