/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, Renderer2, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
export class EasyPieChartComponent {
    /**
     * @param {?} el
     * @param {?} platformId
     * @param {?} _r
     */
    constructor(el, platformId, _r) {
        this._r = _r;
        this.isBrowser = false;
        this.isBrowser = isPlatformBrowser(platformId);
        this.element = el;
        /** @type {?} */
        const options = {
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
    ngOnInit() {
        if (this.isBrowser) {
            /** @type {?} */
            const size = this.options.size;
            this.element.nativeElement.innerHTML = '';
            this.pieChart = new EasyPieChart(this.element.nativeElement, this.options);
            this.pieChart.update(this.percent);
            // Positioning text in center of chart
            /** @type {?} */
            const percent = document.querySelector('.percent');
            if (percent) {
                this._r.setStyle(percent, 'line-height', size + 'px');
                this._r.setStyle(percent, 'width', size + 'px');
                this._r.setStyle(percent, 'height', size + 'px');
            }
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!changes['percent'].isFirstChange()) {
            this.pieChart.update(this.percent);
        }
    }
}
EasyPieChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-easy-pie-chart',
                template: '<div>Loading</div>'
            }] }
];
/** @nocollapse */
EasyPieChartComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: Renderer2 }
];
EasyPieChartComponent.propDecorators = {
    percent: [{ type: Input }],
    options: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtc21hbGxwaWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9lYXN5LWNoYXJ0cy9jaGFydC1zbWFsbHBpZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUlWLEtBQUssRUFDTCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPcEQsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7O0lBT2hDLFlBQVksRUFBYyxFQUF1QixVQUFrQixFQUFVLEVBQWE7UUFBYixPQUFFLEdBQUYsRUFBRSxDQUFXO1FBRjFGLGNBQVMsR0FBUSxLQUFLLENBQUM7UUFHckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzs7Y0FDWixPQUFPLEdBQUc7WUFDZCxRQUFRLEVBQUUsU0FBUztZQUNuQixVQUFVLEVBQUUsU0FBUztZQUNyQixVQUFVLEVBQUUsU0FBUztZQUNyQixXQUFXLEVBQUUsQ0FBQztZQUNkLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFNBQVMsRUFBRSxDQUFDO1lBQ1osSUFBSSxFQUFFLEdBQUc7WUFDVCxNQUFNLEVBQUUsQ0FBQztZQUNULE9BQU8sRUFBRTtnQkFDUCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsSUFBSTthQUNkO1NBQ0Y7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTs7a0JBQ1osSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O2tCQUU3QixPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7WUFDbEQsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQzthQUNsRDtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDcEM7SUFDSCxDQUFDOzs7WUFuREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRSxvQkFBb0I7YUFDL0I7Ozs7WUFkQyxVQUFVO3lDQXNCbUIsTUFBTSxTQUFDLFdBQVc7WUFqQi9DLFNBQVM7OztzQkFXUixLQUFLO3NCQUNMLEtBQUs7Ozs7SUFETix3Q0FBc0I7O0lBQ3RCLHdDQUFzQjs7SUFDdEIsd0NBQWE7O0lBQ2IseUNBQWM7O0lBQ2QsMENBQXVCOzs7OztJQUU4QyxtQ0FBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBJbnB1dCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBMQVRGT1JNX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmRlY2xhcmUgdmFyIEVhc3lQaWVDaGFydDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItZWFzeS1waWUtY2hhcnQnLFxuICB0ZW1wbGF0ZTogJzxkaXY+TG9hZGluZzwvZGl2PicsXG59KVxuZXhwb3J0IGNsYXNzIEVhc3lQaWVDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgcGVyY2VudDogYW55O1xuICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XG4gIGVsZW1lbnQ6IGFueTtcbiAgcGllQ2hhcnQ6IGFueTtcbiAgaXNCcm93c2VyOiBhbnkgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZiwgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogc3RyaW5nLCBwcml2YXRlIF9yOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLmlzQnJvd3NlciA9IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBiYXJDb2xvcjogJyNlZjFlMjUnLFxuICAgICAgdHJhY2tDb2xvcjogJyNmOWY5ZjknLFxuICAgICAgc2NhbGVDb2xvcjogJyNkZmUwZTAnLFxuICAgICAgc2NhbGVMZW5ndGg6IDUsXG4gICAgICBsaW5lQ2FwOiAncm91bmQnLFxuICAgICAgbGluZVdpZHRoOiAzLFxuICAgICAgc2l6ZTogMTEwLFxuICAgICAgcm90YXRlOiAwLFxuICAgICAgYW5pbWF0ZToge1xuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHRoaXMub3B0aW9ucyk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgIGNvbnN0IHNpemUgPSB0aGlzLm9wdGlvbnMuc2l6ZTtcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgdGhpcy5waWVDaGFydCA9IG5ldyBFYXN5UGllQ2hhcnQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG4gICAgICB0aGlzLnBpZUNoYXJ0LnVwZGF0ZSh0aGlzLnBlcmNlbnQpO1xuICAgICAgLy8gUG9zaXRpb25pbmcgdGV4dCBpbiBjZW50ZXIgb2YgY2hhcnRcbiAgICAgIGNvbnN0IHBlcmNlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGVyY2VudCcpO1xuICAgICAgaWYgKHBlcmNlbnQpIHtcbiAgICAgICAgdGhpcy5fci5zZXRTdHlsZShwZXJjZW50LCAnbGluZS1oZWlnaHQnLCBzaXplICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMuX3Iuc2V0U3R5bGUocGVyY2VudCwgJ3dpZHRoJywgc2l6ZSArICdweCcpO1xuICAgICAgICB0aGlzLl9yLnNldFN0eWxlKHBlcmNlbnQsICdoZWlnaHQnLCBzaXplICsgJ3B4Jyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICghY2hhbmdlc1sncGVyY2VudCddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5waWVDaGFydC51cGRhdGUodGhpcy5wZXJjZW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==