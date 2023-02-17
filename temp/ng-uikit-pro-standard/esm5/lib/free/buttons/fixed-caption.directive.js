/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
var FixedButtonCaptionDirective = /** @class */ (function () {
    function FixedButtonCaptionDirective(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * @return {?}
     */
    FixedButtonCaptionDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createCaptionElement();
    };
    /**
     * @return {?}
     */
    FixedButtonCaptionDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.renderer.listen(this.collapseButtonActivator, 'click', (/**
         * @return {?}
         */
        function () {
            _this.renderer.addClass(_this.paragraphEl, 'fixed-button-caption');
            _this.renderer.setStyle(_this.paragraphEl, 'position', 'absolute');
            _this.renderer.setStyle(_this.paragraphEl, 'right', "60px");
            _this.renderer.setStyle(_this.paragraphEl, 'top', '10px');
            _this.renderer.setStyle(_this.el.nativeElement, 'overflow', 'visible');
        }));
    };
    /**
     * @return {?}
     */
    FixedButtonCaptionDirective.prototype.createCaptionElement = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var paragraph = this.renderer.createElement('p');
        /** @type {?} */
        var text = this.renderer.createText(this.caption);
        this.renderer.appendChild(paragraph, text);
        this.renderer.appendChild(this.el.nativeElement, paragraph);
        this.paragraphEl = paragraph;
    };
    FixedButtonCaptionDirective.decorators = [
        { type: Directive, args: [{ selector: '[mdbFixedCaption]' },] }
    ];
    /** @nocollapse */
    FixedButtonCaptionDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    FixedButtonCaptionDirective.propDecorators = {
        caption: [{ type: Input, args: ['mdbFixedCaption',] }],
        collapseButtonActivator: [{ type: Input, args: ['collapseButton',] }]
    };
    return FixedButtonCaptionDirective;
}());
export { FixedButtonCaptionDirective };
if (false) {
    /** @type {?} */
    FixedButtonCaptionDirective.prototype.caption;
    /** @type {?} */
    FixedButtonCaptionDirective.prototype.collapseButtonActivator;
    /**
     * @type {?}
     * @private
     */
    FixedButtonCaptionDirective.prototype.paragraphEl;
    /**
     * @type {?}
     * @private
     */
    FixedButtonCaptionDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    FixedButtonCaptionDirective.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml4ZWQtY2FwdGlvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvZnJlZS9idXR0b25zL2ZpeGVkLWNhcHRpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvRjtJQU1FLHFDQUFvQixRQUFtQixFQUFVLEVBQWM7UUFBM0MsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7SUFBRyxDQUFDOzs7O0lBRW5FLDhDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7Ozs7SUFFRCxxREFBZTs7O0lBQWY7UUFBQSxpQkFRQztRQVBDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxPQUFPOzs7UUFBRTtZQUMxRCxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsV0FBVyxFQUFFLHNCQUFzQixDQUFDLENBQUM7WUFDakUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDakUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDMUQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDeEQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELDBEQUFvQjs7O0lBQXBCOztZQUNRLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7O1lBQzVDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDOztnQkE1QkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFOzs7O2dCQUZrQixTQUFTO2dCQUFwQyxVQUFVOzs7MEJBSTFDLEtBQUssU0FBQyxpQkFBaUI7MENBRXZCLEtBQUssU0FBQyxnQkFBZ0I7O0lBeUJ6QixrQ0FBQztDQUFBLEFBN0JELElBNkJDO1NBNUJZLDJCQUEyQjs7O0lBQ3RDLDhDQUEwQzs7SUFFMUMsOERBQXNEOzs7OztJQUN0RCxrREFBeUI7Ozs7O0lBQ2IsK0NBQTJCOzs7OztJQUFFLHlDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uSW5pdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1ttZGJGaXhlZENhcHRpb25dJyB9KVxuZXhwb3J0IGNsYXNzIEZpeGVkQnV0dG9uQ2FwdGlvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgnbWRiRml4ZWRDYXB0aW9uJykgY2FwdGlvbjogc3RyaW5nO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgnY29sbGFwc2VCdXR0b24nKSBjb2xsYXBzZUJ1dHRvbkFjdGl2YXRvcjogYW55O1xuICBwcml2YXRlIHBhcmFncmFwaEVsOiBhbnk7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZUNhcHRpb25FbGVtZW50KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5jb2xsYXBzZUJ1dHRvbkFjdGl2YXRvciwgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnBhcmFncmFwaEVsLCAnZml4ZWQtYnV0dG9uLWNhcHRpb24nKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5wYXJhZ3JhcGhFbCwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMucGFyYWdyYXBoRWwsICdyaWdodCcsIGA2MHB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMucGFyYWdyYXBoRWwsICd0b3AnLCAnMTBweCcpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdvdmVyZmxvdycsICd2aXNpYmxlJyk7XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVDYXB0aW9uRWxlbWVudCgpIHtcbiAgICBjb25zdCBwYXJhZ3JhcGggPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBjb25zdCB0ZXh0ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KHRoaXMuY2FwdGlvbik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChwYXJhZ3JhcGgsIHRleHQpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBwYXJhZ3JhcGgpO1xuICAgIHRoaXMucGFyYWdyYXBoRWwgPSBwYXJhZ3JhcGg7XG4gIH1cbn1cbiJdfQ==