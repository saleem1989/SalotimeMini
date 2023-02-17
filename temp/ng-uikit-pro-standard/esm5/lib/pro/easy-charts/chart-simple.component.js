/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';
var SimpleChartComponent = /** @class */ (function () {
    function SimpleChartComponent() {
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
    SimpleChartComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    SimpleChartComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-simple-chart',
                    template: "<span class=\"min-chart\">\n  <span \n  *ngIf=\"customText\"  \n  class=\"chart-custom-text\"\n  [ngStyle]=\"{\n  'line-height': size + 'px',\n  'width': size + 'px',\n  'height': size + 'px'}\">{{ customText }}</span>\n  <span \n  *ngIf=\"!customText\" \n  class=\"percent\">{{ percent }}</span>\n  <mdb-easy-pie-chart [percent]=\"percent\" [options]=\"options\"></mdb-easy-pie-chart>\n</span>",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".min-chart{position:relative;display:inline-block;width:110px;height:110px;margin-top:50px;margin-bottom:50px;text-align:center}.min-chart canvas{position:absolute;top:0;left:0}.min-chart .percent{display:inline-block;line-height:110px;z-index:2}.min-chart .percent:after{content:'%';margin-left:.1em;font-size:.8rem}.chart-custom-text{display:inline-block;overflow:hidden;z-index:2}"]
                }] }
    ];
    /** @nocollapse */
    SimpleChartComponent.ctorParameters = function () { return []; };
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
    return SimpleChartComponent;
}());
export { SimpleChartComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtc2ltcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vZWFzeS1jaGFydHMvY2hhcnQtc2ltcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUU7SUFxQ0U7UUFsQk8sWUFBTyxHQUFRO1lBQ3BCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsVUFBVSxFQUFFLElBQUk7WUFDaEIsVUFBVSxFQUFFLElBQUk7WUFDaEIsV0FBVyxFQUFFLEVBQUU7WUFDZixPQUFPLEVBQUUsSUFBSTtZQUNiLFNBQVMsRUFBRSxJQUFJO1lBQ2YsVUFBVSxFQUFFLElBQUk7WUFDaEIsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsSUFBSTtZQUNaLFFBQVEsRUFBRSxJQUFJO1lBQ2QsZUFBZSxFQUFFLElBQUk7WUFDckIsT0FBTyxFQUFFO2dCQUNQLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2FBQ2Q7U0FDRixDQUFDO0lBRWEsQ0FBQzs7OztJQUVoQix1Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQ3RELENBQUM7O2dCQW5ERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsc1pBQTRDO29CQUU1QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOzs7Ozs2QkFFRSxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSzs2QkFDTCxLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsS0FBSzswQkFDTCxLQUFLOzRCQUNMLEtBQUs7NkJBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7MEJBQ0wsS0FBSzs7SUFrQ1IsMkJBQUM7Q0FBQSxBQXBERCxJQW9EQztTQTlDWSxvQkFBb0I7OztJQUMvQiwwQ0FBNEI7O0lBQzVCLHVDQUF5Qjs7SUFDekIsd0NBQTBCOztJQUMxQiwwQ0FBNEI7O0lBQzVCLDBDQUE0Qjs7SUFDNUIsMkNBQTZCOztJQUM3Qix1Q0FBeUI7O0lBQ3pCLHlDQUEyQjs7SUFDM0IsMENBQTRCOztJQUM1QixvQ0FBc0I7O0lBQ3RCLHNDQUF3Qjs7SUFDeEIsdUNBQXlEOztJQUN6RCx1Q0FnQkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1zaW1wbGUtY2hhcnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2hhcnQtc2ltcGxlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZWFzeS1jaGFydHMtbW9kdWxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgU2ltcGxlQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBjdXN0b21UZXh0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBlcmNlbnQ6IG51bWJlcjtcbiAgQElucHV0KCkgYmFyQ29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgdHJhY2tDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSBzY2FsZUNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNjYWxlTGVuZ3RoOiBudW1iZXI7XG4gIEBJbnB1dCgpIGxpbmVDYXA6IHN0cmluZztcbiAgQElucHV0KCkgbGluZVdpZHRoOiBudW1iZXI7XG4gIEBJbnB1dCgpIHRyYWNrV2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgc2l6ZTogbnVtYmVyO1xuICBASW5wdXQoKSByb3RhdGU6IG51bWJlcjtcbiAgQElucHV0KCkgYW5pbWF0ZTogeyBkdXJhdGlvbjogc3RyaW5nOyBlbmFibGVkOiBib29sZWFuIH07XG4gIHB1YmxpYyBvcHRpb25zOiBhbnkgPSB7XG4gICAgYmFyQ29sb3I6IG51bGwsXG4gICAgdHJhY2tDb2xvcjogbnVsbCxcbiAgICBzY2FsZUNvbG9yOiBudWxsLFxuICAgIHNjYWxlTGVuZ3RoOiAnJyxcbiAgICBsaW5lQ2FwOiBudWxsLFxuICAgIGxpbmVXaWR0aDogbnVsbCxcbiAgICB0cmFja1dpZHRoOiBudWxsLFxuICAgIHNpemU6IG51bGwsXG4gICAgcm90YXRlOiBudWxsLFxuICAgIGR1cmF0aW9uOiBudWxsLFxuICAgIGVuYWJsZUFuaW1hdGlvbjogbnVsbCxcbiAgICBhbmltYXRlOiB7XG4gICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgfSxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zLmJhckNvbG9yID0gJyMnICsgdGhpcy5iYXJDb2xvcjtcbiAgICB0aGlzLm9wdGlvbnMudHJhY2tDb2xvciA9ICcjJyArIHRoaXMudHJhY2tDb2xvcjtcbiAgICB0aGlzLm9wdGlvbnMuc2NhbGVDb2xvciA9ICcjJyArIHRoaXMuc2NhbGVDb2xvcjtcbiAgICB0aGlzLm9wdGlvbnMuc2NhbGVMZW5ndGggPSB0aGlzLnNjYWxlTGVuZ3RoO1xuICAgIHRoaXMub3B0aW9ucy5saW5lQ2FwID0gdGhpcy5saW5lQ2FwO1xuICAgIHRoaXMub3B0aW9ucy5saW5lV2lkdGggPSB0aGlzLmxpbmVXaWR0aDtcbiAgICB0aGlzLm9wdGlvbnMudHJhY2tXaWR0aCA9IHRoaXMudHJhY2tXaWR0aDtcbiAgICB0aGlzLm9wdGlvbnMuc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICB0aGlzLm9wdGlvbnMucm90YXRlID0gdGhpcy5yb3RhdGU7XG4gICAgdGhpcy5vcHRpb25zLmFuaW1hdGUuZHVyYXRpb24gPSB0aGlzLmFuaW1hdGUuZHVyYXRpb247XG4gICAgdGhpcy5vcHRpb25zLmFuaW1hdGUuZW5hYmxlZCA9IHRoaXMuYW5pbWF0ZS5lbmFibGVkO1xuICB9XG59XG4iXX0=