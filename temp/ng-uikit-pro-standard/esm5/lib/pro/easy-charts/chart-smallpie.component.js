/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, Renderer2, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
var EasyPieChartComponent = /** @class */ (function () {
    function EasyPieChartComponent(el, platformId, _r) {
        this._r = _r;
        this.isBrowser = false;
        this.isBrowser = isPlatformBrowser(platformId);
        this.element = el;
        /** @type {?} */
        var options = {
            barColor: '#ef1e25',
            trackColor: '#f9f9f9',
            scaleColor: '#dfe0e0',
            scaleLength: 5,
            lineCap: 'round',
            lineWidth: 3,
            size: 110,
            rotate: 0,
            animate: {
                duration: 1000,
                enabled: true,
            },
        };
        this.options = Object.assign(options, this.options);
    }
    /**
     * @return {?}
     */
    EasyPieChartComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.isBrowser) {
            /** @type {?} */
            var size = this.options.size;
            this.element.nativeElement.innerHTML = '';
            this.pieChart = new EasyPieChart(this.element.nativeElement, this.options);
            this.pieChart.update(this.percent);
            // Positioning text in center of chart
            /** @type {?} */
            var percent = document.querySelector('.percent');
            if (percent) {
                this._r.setStyle(percent, 'line-height', size + 'px');
                this._r.setStyle(percent, 'width', size + 'px');
                this._r.setStyle(percent, 'height', size + 'px');
            }
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    EasyPieChartComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!changes['percent'].isFirstChange()) {
            this.pieChart.update(this.percent);
        }
    };
    EasyPieChartComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-easy-pie-chart',
                    template: '<div>Loading</div>'
                }] }
    ];
    /** @nocollapse */
    EasyPieChartComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: Renderer2 }
    ]; };
    EasyPieChartComponent.propDecorators = {
        percent: [{ type: Input }],
        options: [{ type: Input }]
    };
    return EasyPieChartComponent;
}());
export { EasyPieChartComponent };
if (false) {
    /** @type {?} */
    EasyPieChartComponent.prototype.percent;
    /** @type {?} */
    EasyPieChartComponent.prototype.options;
    /** @type {?} */
    EasyPieChartComponent.prototype.element;
    /** @type {?} */
    EasyPieChartComponent.prototype.pieChart;
    /** @type {?} */
    EasyPieChartComponent.prototype.isBrowser;
    /**
     * @type {?}
     * @private
     */
    EasyPieChartComponent.prototype._r;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtc21hbGxwaWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9lYXN5LWNoYXJ0cy9jaGFydC1zbWFsbHBpZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUlWLEtBQUssRUFDTCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHcEQ7SUFXRSwrQkFBWSxFQUFjLEVBQXVCLFVBQWtCLEVBQVUsRUFBYTtRQUFiLE9BQUUsR0FBRixFQUFFLENBQVc7UUFGMUYsY0FBUyxHQUFRLEtBQUssQ0FBQztRQUdyQixJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDOztZQUNaLE9BQU8sR0FBRztZQUNkLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFdBQVcsRUFBRSxDQUFDO1lBQ2QsT0FBTyxFQUFFLE9BQU87WUFDaEIsU0FBUyxFQUFFLENBQUM7WUFDWixJQUFJLEVBQUUsR0FBRztZQUNULE1BQU0sRUFBRSxDQUFDO1lBQ1QsT0FBTyxFQUFFO2dCQUNQLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2FBQ2Q7U0FDRjtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELENBQUM7Ozs7SUFFRCx3Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7O2dCQUNaLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7WUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7OztnQkFFN0IsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1lBQ2xELElBQUksT0FBTyxFQUFFO2dCQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDbEQ7U0FDRjtJQUNILENBQUM7Ozs7O0lBRUQsMkNBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQzs7Z0JBbkRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUsb0JBQW9CO2lCQUMvQjs7OztnQkFkQyxVQUFVOzZDQXNCbUIsTUFBTSxTQUFDLFdBQVc7Z0JBakIvQyxTQUFTOzs7MEJBV1IsS0FBSzswQkFDTCxLQUFLOztJQThDUiw0QkFBQztDQUFBLEFBcERELElBb0RDO1NBaERZLHFCQUFxQjs7O0lBQ2hDLHdDQUFzQjs7SUFDdEIsd0NBQXNCOztJQUN0Qix3Q0FBYTs7SUFDYix5Q0FBYzs7SUFDZCwwQ0FBdUI7Ozs7O0lBRThDLG1DQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIElucHV0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUExBVEZPUk1fSUQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZGVjbGFyZSB2YXIgRWFzeVBpZUNoYXJ0OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1lYXN5LXBpZS1jaGFydCcsXG4gIHRlbXBsYXRlOiAnPGRpdj5Mb2FkaW5nPC9kaXY+Jyxcbn0pXG5leHBvcnQgY2xhc3MgRWFzeVBpZUNoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBwZXJjZW50OiBhbnk7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcbiAgZWxlbWVudDogYW55O1xuICBwaWVDaGFydDogYW55O1xuICBpc0Jyb3dzZXI6IGFueSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBzdHJpbmcsIHByaXZhdGUgX3I6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuaXNCcm93c2VyID0gaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCk7XG4gICAgdGhpcy5lbGVtZW50ID0gZWw7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIGJhckNvbG9yOiAnI2VmMWUyNScsXG4gICAgICB0cmFja0NvbG9yOiAnI2Y5ZjlmOScsXG4gICAgICBzY2FsZUNvbG9yOiAnI2RmZTBlMCcsXG4gICAgICBzY2FsZUxlbmd0aDogNSxcbiAgICAgIGxpbmVDYXA6ICdyb3VuZCcsXG4gICAgICBsaW5lV2lkdGg6IDMsXG4gICAgICBzaXplOiAxMTAsXG4gICAgICByb3RhdGU6IDAsXG4gICAgICBhbmltYXRlOiB7XG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9O1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucywgdGhpcy5vcHRpb25zKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMub3B0aW9ucy5zaXplO1xuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICB0aGlzLnBpZUNoYXJ0ID0gbmV3IEVhc3lQaWVDaGFydCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgdGhpcy5vcHRpb25zKTtcbiAgICAgIHRoaXMucGllQ2hhcnQudXBkYXRlKHRoaXMucGVyY2VudCk7XG4gICAgICAvLyBQb3NpdGlvbmluZyB0ZXh0IGluIGNlbnRlciBvZiBjaGFydFxuICAgICAgY29uc3QgcGVyY2VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wZXJjZW50Jyk7XG4gICAgICBpZiAocGVyY2VudCkge1xuICAgICAgICB0aGlzLl9yLnNldFN0eWxlKHBlcmNlbnQsICdsaW5lLWhlaWdodCcsIHNpemUgKyAncHgnKTtcbiAgICAgICAgdGhpcy5fci5zZXRTdHlsZShwZXJjZW50LCAnd2lkdGgnLCBzaXplICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMuX3Iuc2V0U3R5bGUocGVyY2VudCwgJ2hlaWdodCcsIHNpemUgKyAncHgnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKCFjaGFuZ2VzWydwZXJjZW50J10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLnBpZUNoYXJ0LnVwZGF0ZSh0aGlzLnBlcmNlbnQpO1xuICAgIH1cbiAgfVxufVxuIl19