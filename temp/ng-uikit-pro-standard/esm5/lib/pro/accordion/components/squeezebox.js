/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChildren, Input, QueryList, ViewEncapsulation, } from '@angular/core';
import { SBItemComponent } from './sb-item';
import { MdbAccordionService } from '../mdb-accordion.service';
var SqueezeBoxComponent = /** @class */ (function () {
    function SqueezeBoxComponent(accordionService) {
        this.accordionService = accordionService;
        this._multiple = true;
    }
    Object.defineProperty(SqueezeBoxComponent.prototype, "multiple", {
        get: /**
         * @return {?}
         */
        function () {
            return this._multiple;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._multiple = value;
            this.accordionService.updateMultipleState(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SqueezeBoxComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.accordionService.updateMultipleState(this.multiple);
    };
    /**
     * @return {?}
     */
    SqueezeBoxComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.multiple) {
            this.items.forEach((/**
             * @param {?} el
             * @return {?}
             */
            function (el) {
                /** @type {?} */
                var collapsed = el.collapsed ? true : false;
                el.applyToggle(collapsed);
            }));
        }
        this.itemsChanges = this.items.changes.subscribe((/**
         * @param {?} accordionItems
         * @return {?}
         */
        function (accordionItems) {
            _this.items = accordionItems;
            /** @type {?} */
            var accordionItemsArray = accordionItems.toArray();
            _this.accordionService.updateItemsArray(accordionItemsArray);
        }));
        this.items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.accordionService.addItem(item); }));
    };
    /**
     * @return {?}
     */
    SqueezeBoxComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.itemsChanges) {
            this.itemsChanges.unsubscribe();
        }
    };
    SqueezeBoxComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'squeezebox',
                    selector: 'mdb-squeezebox, mdb-accordion',
                    template: "<div class=\"accordion md-accordion\">\n  <ng-content></ng-content>\n</div>",
                    encapsulation: ViewEncapsulation.None,
                    providers: [MdbAccordionService],
                    styles: [".md-accordion .card{overflow:visible;box-shadow:none;border-bottom:1px solid #e0e0e0;border-radius:0}.md-accordion .card:first-of-type,.md-accordion .card:not(:first-of-type):not(:last-of-type){border-bottom:1px solid #e0e0e0}.md-accordion .card .card-header{border-bottom:0;padding:1rem 1.5rem;background:0 0}.md-accordion .card .card-header .card-title{font-weight:400}.md-accordion .card .card-header a{transition:.3s ease-in-out}.md-accordion .card .card-header a:not(.collapsed) .rotate-icon{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.md-accordion .card .fa-angle-down{float:right}.md-accordion .card .card-body{font-size:.9rem;line-height:1.7;font-weight:300;color:#626262}.accordion-gradient-bcg{background:linear-gradient(45deg,rgba(234,21,129,.6),rgba(10,23,187,.6) 100%)}.accordion.md-accordion.accordion-1 p,.accordion.md-accordion.accordion-2 p,.accordion.md-accordion.accordion-3 p,.accordion.md-accordion.accordion-4 p,.accordion.md-accordion.accordion-5 p{font-size:1rem}.accordion.md-accordion.accordion-1 .card,.accordion.md-accordion.accordion-1 .card .card-header,.accordion.md-accordion.accordion-2 .card,.accordion.md-accordion.accordion-2 .card .card-header,.accordion.md-accordion.accordion-4 .card,.accordion.md-accordion.accordion-4 .card .card-header,.accordion.md-accordion.accordion-5 .card,.accordion.md-accordion.accordion-5 .card .card-header{border:0}.accordion.md-accordion.accordion-1 .card .card-body{line-height:1.4}.accordion.md-accordion.accordion-2 .card{background-color:transparent}.accordion.md-accordion.accordion-2 .card .card-body{border:0;border-radius:3px}.accordion.md-accordion.accordion-3{border-radius:3px}.accordion.md-accordion.accordion-3 .fab.fa-angle-down,.accordion.md-accordion.accordion-3 .far.fa-angle-down,.accordion.md-accordion.accordion-3 .fas.fa-angle-down{margin-top:-10px}.accordion.md-accordion.accordion-4 .card:last-of-type .card-body{border-bottom-right-radius:3px;border-bottom-left-radius:3px}.accordion.md-accordion.accordion-5 .card{background-color:transparent}.accordion.md-accordion.accordion-5 .card .card-header{background-color:#f44336;transition:.3s}.accordion.md-accordion.accordion-5 .card .card-header:hover{transition:.3s;background-color:#455a64}.accordion.md-accordion.accordion-5 .card .card-header .fab,.accordion.md-accordion.accordion-5 .card .card-header .far,.accordion.md-accordion.accordion-5 .card .card-header .fas{background-color:#fff;border-top-left-radius:3px}.accordion.md-accordion.accordion-5 .card .card-body{border-bottom-right-radius:3px;border-bottom-left-radius:3px}.accordion.md-accordion.accordion-blocks .card{margin-bottom:1.2rem;box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}.accordion.md-accordion.accordion-blocks .card .card-body{border-top:1px solid #eee}.accordion .waves-effect,.accordion .waves-light{z-index:unset}.accordion .sb-item-body{transition:.5s;overflow:hidden}.accordion .card{border-bottom:1px solid #eee;box-shadow:none}.accordion .card .card-header{color:#0275d8;padding:1rem 1.5rem;background:0 0;border-bottom:0;cursor:pointer}.accordion .card .card-header a .rotate-icon{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.accordion .card .fa-angle-down{float:right}.accordion .card .card-body{padding-top:.25rem}.accordion .card.is-collapsed .card-header a .rotate-icon{-webkit-transform:rotate(0);transform:rotate(0)}.collapsible-body{display:none}.card{position:relative}.card .card-body{flex:1 1 auto;padding:1.25rem}mdb-accordion-item>.card,mdb-item>.card{border:0}.mdb-accordion-indicator.rotate-icon{transition:150ms ease-in}.item-disabled,.item-disabled a>h5{color:#bdbdbd!important;cursor:default!important}mdb-accordion-item-head{outline:0!important}mdb-accordion-item-head .card-header a{color:inherit}.mdb-accordion-indicator{position:absolute;right:0}.mdb-accordion-indicator::after{content:'';display:block;border-style:solid;border-width:0 3px 3px 0;padding:3.5px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}"]
                }] }
    ];
    /** @nocollapse */
    SqueezeBoxComponent.ctorParameters = function () { return [
        { type: MdbAccordionService }
    ]; };
    SqueezeBoxComponent.propDecorators = {
        multiple: [{ type: Input }],
        items: [{ type: ContentChildren, args: [SBItemComponent,] }]
    };
    return SqueezeBoxComponent;
}());
export { SqueezeBoxComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SqueezeBoxComponent.prototype.itemsChanges;
    /**
     * @type {?}
     * @private
     */
    SqueezeBoxComponent.prototype._multiple;
    /** @type {?} */
    SqueezeBoxComponent.prototype.items;
    /**
     * @type {?}
     * @private
     */
    SqueezeBoxComponent.prototype.accordionService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3F1ZWV6ZWJveC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vYWNjb3JkaW9uL2NvbXBvbmVudHMvc3F1ZWV6ZWJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsS0FBSyxFQUdMLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM1QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUcvRDtJQXVCRSw2QkFBb0IsZ0JBQXFDO1FBQXJDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBcUI7UUFKakQsY0FBUyxHQUFHLElBQUksQ0FBQztJQUltQyxDQUFDO0lBWjdELHNCQUNJLHlDQUFROzs7O1FBRFo7WUFFRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzs7Ozs7UUFDRCxVQUFhLEtBQWM7WUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25ELENBQUM7OztPQUpBOzs7O0lBV0Qsc0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7O0lBRUQsZ0RBQWtCOzs7SUFBbEI7UUFBQSxpQkFlQztRQWRDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTzs7OztZQUFDLFVBQUMsRUFBTzs7b0JBQ25CLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUs7Z0JBQzdDLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsY0FBbUI7WUFDbkUsS0FBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7O2dCQUN0QixtQkFBbUIsR0FBRyxjQUFjLENBQUMsT0FBTyxFQUFFO1lBQ3BELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzlELENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxJQUFTLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFuQyxDQUFtQyxFQUFDLENBQUM7SUFDekUsQ0FBQzs7OztJQUVELHlDQUFXOzs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQzs7Z0JBbERGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLCtCQUErQjtvQkFDekMsdUZBQThCO29CQUU5QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7O2lCQUNqQzs7OztnQkFWUSxtQkFBbUI7OzsyQkFjekIsS0FBSzt3QkFVTCxlQUFlLFNBQUMsZUFBZTs7SUE4QmxDLDBCQUFDO0NBQUEsQUFuREQsSUFtREM7U0EzQ1ksbUJBQW1COzs7Ozs7SUFDOUIsMkNBQW1DOzs7OztJQVVuQyx3Q0FBeUI7O0lBRXpCLG9DQUFvRTs7Ozs7SUFFeEQsK0NBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTQkl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3NiLWl0ZW0nO1xuaW1wb3J0IHsgTWRiQWNjb3JkaW9uU2VydmljZSB9IGZyb20gJy4uL21kYi1hY2NvcmRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIGV4cG9ydEFzOiAnc3F1ZWV6ZWJveCcsXG4gIHNlbGVjdG9yOiAnbWRiLXNxdWVlemVib3gsIG1kYi1hY2NvcmRpb24nLFxuICB0ZW1wbGF0ZVVybDogJ3NxdWVlemVib3guaHRtbCcsXG4gIHN0eWxlVXJsczogWycuLy4uL2FjY29yZGlvbi1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFtNZGJBY2NvcmRpb25TZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgU3F1ZWV6ZUJveENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBpdGVtc0NoYW5nZXM6IFN1YnNjcmlwdGlvbjtcblxuICBASW5wdXQoKVxuICBnZXQgbXVsdGlwbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX211bHRpcGxlO1xuICB9XG4gIHNldCBtdWx0aXBsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX211bHRpcGxlID0gdmFsdWU7XG4gICAgdGhpcy5hY2NvcmRpb25TZXJ2aWNlLnVwZGF0ZU11bHRpcGxlU3RhdGUodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX211bHRpcGxlID0gdHJ1ZTtcblxuICBAQ29udGVudENoaWxkcmVuKFNCSXRlbUNvbXBvbmVudCkgaXRlbXM6IFF1ZXJ5TGlzdDxTQkl0ZW1Db21wb25lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYWNjb3JkaW9uU2VydmljZTogTWRiQWNjb3JkaW9uU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFjY29yZGlvblNlcnZpY2UudXBkYXRlTXVsdGlwbGVTdGF0ZSh0aGlzLm11bHRpcGxlKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoZWw6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBjb2xsYXBzZWQgPSBlbC5jb2xsYXBzZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIGVsLmFwcGx5VG9nZ2xlKGNvbGxhcHNlZCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLml0ZW1zQ2hhbmdlcyA9IHRoaXMuaXRlbXMuY2hhbmdlcy5zdWJzY3JpYmUoKGFjY29yZGlvbkl0ZW1zOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuaXRlbXMgPSBhY2NvcmRpb25JdGVtcztcbiAgICAgIGNvbnN0IGFjY29yZGlvbkl0ZW1zQXJyYXkgPSBhY2NvcmRpb25JdGVtcy50b0FycmF5KCk7XG4gICAgICB0aGlzLmFjY29yZGlvblNlcnZpY2UudXBkYXRlSXRlbXNBcnJheShhY2NvcmRpb25JdGVtc0FycmF5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB0aGlzLmFjY29yZGlvblNlcnZpY2UuYWRkSXRlbShpdGVtKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5pdGVtc0NoYW5nZXMpIHtcbiAgICAgIHRoaXMuaXRlbXNDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=