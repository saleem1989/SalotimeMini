/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';
export class SimpleChartComponent {
    constructor() {
        this.options = {
            barColor: null,
            trackColor: null,
            scaleColor: null,
            scaleLength: '',
            lineCap: null,
            lineWidth: null,
            trackWidth: null,
            size: null,
            rotate: null,
            duration: null,
            enableAnimation: null,
            animate: {
                duration: 1000,
                enabled: true,
            },
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options.barColor = '#' + this.barColor;
        this.options.trackColor = '#' + this.trackColor;
        this.options.scaleColor = '#' + this.scaleColor;
        this.options.scaleLength = this.scaleLength;
        this.options.lineCap = this.lineCap;
        this.options.lineWidth = this.lineWidth;
        this.options.trackWidth = this.trackWidth;
        this.options.size = this.size;
        this.options.rotate = this.rotate;
        this.options.animate.duration = this.animate.duration;
        this.options.animate.enabled = this.animate.enabled;
    }
}
SimpleChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-simple-chart',
                template: "<span class=\"min-chart\">\n  <span \n  *ngIf=\"customText\"  \n  class=\"chart-custom-text\"\n  [ngStyle]=\"{\n  'line-height': size + 'px',\n  'width': size + 'px',\n  'height': size + 'px'}\">{{ customText }}</span>\n  <span \n  *ngIf=\"!customText\" \n  class=\"percent\">{{ percent }}</span>\n  <mdb-easy-pie-chart [percent]=\"percent\" [options]=\"options\"></mdb-easy-pie-chart>\n</span>",
                encapsulation: ViewEncapsulation.None,
                styles: [".min-chart{position:relative;display:inline-block;width:110px;height:110px;margin-top:50px;margin-bottom:50px;text-align:center}.min-chart canvas{position:absolute;top:0;left:0}.min-chart .percent{display:inline-block;line-height:110px;z-index:2}.min-chart .percent:after{content:'%';margin-left:.1em;font-size:.8rem}.chart-custom-text{display:inline-block;overflow:hidden;z-index:2}"]
            }] }
];
/** @nocollapse */
SimpleChartComponent.ctorParameters = () => [];
SimpleChartComponent.propDecorators = {
    customText: [{ type: Input }],
    percent: [{ type: Input }],
    barColor: [{ type: Input }],
    trackColor: [{ type: Input }],
    scaleColor: [{ type: Input }],
    scaleLength: [{ type: Input }],
    lineCap: [{ type: Input }],
    lineWidth: [{ type: Input }],
    trackWidth: [{ type: Input }],
    size: [{ type: Input }],
    rotate: [{ type: Input }],
    animate: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    SimpleChartComponent.prototype.customText;
    /** @type {?} */
    SimpleChartComponent.prototype.percent;
    /** @type {?} */
    SimpleChartComponent.prototype.barColor;
    /** @type {?} */
    SimpleChartComponent.prototype.trackColor;
    /** @type {?} */
    SimpleChartComponent.prototype.scaleColor;
    /** @type {?} */
    SimpleChartComponent.prototype.scaleLength;
    /** @type {?} */
    SimpleChartComponent.prototype.lineCap;
    /** @type {?} */
    SimpleChartComponent.prototype.lineWidth;
    /** @type {?} */
    SimpleChartComponent.prototype.trackWidth;
    /** @type {?} */
    SimpleChartComponent.prototype.size;
    /** @type {?} */
    SimpleChartComponent.prototype.rotate;
    /** @type {?} */
    SimpleChartComponent.prototype.animate;
    /** @type {?} */
    SimpleChartComponent.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtc2ltcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vZWFzeS1jaGFydHMvY2hhcnQtc2ltcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRNUUsTUFBTSxPQUFPLG9CQUFvQjtJQStCL0I7UUFsQk8sWUFBTyxHQUFRO1lBQ3BCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsVUFBVSxFQUFFLElBQUk7WUFDaEIsVUFBVSxFQUFFLElBQUk7WUFDaEIsV0FBVyxFQUFFLEVBQUU7WUFDZixPQUFPLEVBQUUsSUFBSTtZQUNiLFNBQVMsRUFBRSxJQUFJO1lBQ2YsVUFBVSxFQUFFLElBQUk7WUFDaEIsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsSUFBSTtZQUNaLFFBQVEsRUFBRSxJQUFJO1lBQ2QsZUFBZSxFQUFFLElBQUk7WUFDckIsT0FBTyxFQUFFO2dCQUNQLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2FBQ2Q7U0FDRixDQUFDO0lBRWEsQ0FBQzs7OztJQUVoQixRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUN0RCxDQUFDOzs7WUFuREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLHNaQUE0QztnQkFFNUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7Ozt5QkFFRSxLQUFLO3NCQUNMLEtBQUs7dUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7MEJBQ0wsS0FBSztzQkFDTCxLQUFLO3dCQUNMLEtBQUs7eUJBQ0wsS0FBSzttQkFDTCxLQUFLO3FCQUNMLEtBQUs7c0JBQ0wsS0FBSzs7OztJQVhOLDBDQUE0Qjs7SUFDNUIsdUNBQXlCOztJQUN6Qix3Q0FBMEI7O0lBQzFCLDBDQUE0Qjs7SUFDNUIsMENBQTRCOztJQUM1QiwyQ0FBNkI7O0lBQzdCLHVDQUF5Qjs7SUFDekIseUNBQTJCOztJQUMzQiwwQ0FBNEI7O0lBQzVCLG9DQUFzQjs7SUFDdEIsc0NBQXdCOztJQUN4Qix1Q0FBeUQ7O0lBQ3pELHVDQWdCRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLXNpbXBsZS1jaGFydCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jaGFydC1zaW1wbGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9lYXN5LWNoYXJ0cy1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBTaW1wbGVDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGN1c3RvbVRleHQ6IHN0cmluZztcbiAgQElucHV0KCkgcGVyY2VudDogbnVtYmVyO1xuICBASW5wdXQoKSBiYXJDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSB0cmFja0NvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNjYWxlQ29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgc2NhbGVMZW5ndGg6IG51bWJlcjtcbiAgQElucHV0KCkgbGluZUNhcDogc3RyaW5nO1xuICBASW5wdXQoKSBsaW5lV2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgdHJhY2tXaWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBzaXplOiBudW1iZXI7XG4gIEBJbnB1dCgpIHJvdGF0ZTogbnVtYmVyO1xuICBASW5wdXQoKSBhbmltYXRlOiB7IGR1cmF0aW9uOiBzdHJpbmc7IGVuYWJsZWQ6IGJvb2xlYW4gfTtcbiAgcHVibGljIG9wdGlvbnM6IGFueSA9IHtcbiAgICBiYXJDb2xvcjogbnVsbCxcbiAgICB0cmFja0NvbG9yOiBudWxsLFxuICAgIHNjYWxlQ29sb3I6IG51bGwsXG4gICAgc2NhbGVMZW5ndGg6ICcnLFxuICAgIGxpbmVDYXA6IG51bGwsXG4gICAgbGluZVdpZHRoOiBudWxsLFxuICAgIHRyYWNrV2lkdGg6IG51bGwsXG4gICAgc2l6ZTogbnVsbCxcbiAgICByb3RhdGU6IG51bGwsXG4gICAgZHVyYXRpb246IG51bGwsXG4gICAgZW5hYmxlQW5pbWF0aW9uOiBudWxsLFxuICAgIGFuaW1hdGU6IHtcbiAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMuYmFyQ29sb3IgPSAnIycgKyB0aGlzLmJhckNvbG9yO1xuICAgIHRoaXMub3B0aW9ucy50cmFja0NvbG9yID0gJyMnICsgdGhpcy50cmFja0NvbG9yO1xuICAgIHRoaXMub3B0aW9ucy5zY2FsZUNvbG9yID0gJyMnICsgdGhpcy5zY2FsZUNvbG9yO1xuICAgIHRoaXMub3B0aW9ucy5zY2FsZUxlbmd0aCA9IHRoaXMuc2NhbGVMZW5ndGg7XG4gICAgdGhpcy5vcHRpb25zLmxpbmVDYXAgPSB0aGlzLmxpbmVDYXA7XG4gICAgdGhpcy5vcHRpb25zLmxpbmVXaWR0aCA9IHRoaXMubGluZVdpZHRoO1xuICAgIHRoaXMub3B0aW9ucy50cmFja1dpZHRoID0gdGhpcy50cmFja1dpZHRoO1xuICAgIHRoaXMub3B0aW9ucy5zaXplID0gdGhpcy5zaXplO1xuICAgIHRoaXMub3B0aW9ucy5yb3RhdGUgPSB0aGlzLnJvdGF0ZTtcbiAgICB0aGlzLm9wdGlvbnMuYW5pbWF0ZS5kdXJhdGlvbiA9IHRoaXMuYW5pbWF0ZS5kdXJhdGlvbjtcbiAgICB0aGlzLm9wdGlvbnMuYW5pbWF0ZS5lbmFibGVkID0gdGhpcy5hbmltYXRlLmVuYWJsZWQ7XG4gIH1cbn1cbiJdfQ==