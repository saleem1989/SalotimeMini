/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter, ElementRef, Input, Output, Directive } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
var BaseChartDirective = /** @class */ (function () {
    function BaseChartDirective(element, platformId) {
        this.labels = [];
        this.options = {
            legend: { display: false }
        };
        this.legend = false;
        this.chartClick = new EventEmitter();
        this.chartHover = new EventEmitter();
        this.initFlag = false;
        this.isBrowser = false;
        this.element = element;
        this.isBrowser = isPlatformBrowser(platformId);
    }
    /**
     * @return {?}
     */
    BaseChartDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.isBrowser) {
            this.ctx = this.element.nativeElement.getContext('2d');
            this.cvs = this.element.nativeElement;
            this.initFlag = true;
            if (this.data || this.datasets) {
                this.refresh();
            }
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    BaseChartDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.initFlag) {
            // Check if the changes are in the data or datasets
            if ((changes.hasOwnProperty('data') || changes.hasOwnProperty('datasets')) && !changes.hasOwnProperty('labels')) {
                if (changes['data']) {
                    this.updateChartData(changes['data'].currentValue);
                }
                else {
                    this.updateChartData(changes['datasets'].currentValue);
                }
                this.chart.update();
            }
            else {
                // otherwise rebuild the chart
                this.refresh();
            }
        }
    };
    /**
     * @return {?}
     */
    BaseChartDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.chart) {
            this.chart.destroy();
            this.chart = void 0;
        }
    };
    /**
     * @param {?} ctx
     * @return {?}
     */
    BaseChartDirective.prototype.getChartBuilder = /**
     * @param {?} ctx
     * @return {?}
     */
    function (ctx /*, data:Array<any>, options:any*/) {
        var _this = this;
        /** @type {?} */
        var datasets = this.getDatasets();
        /** @type {?} */
        var options = Object.assign({}, this.options);
        if (this.legend === false) {
            options.legend = { display: false };
        }
        // hock for onHover and onClick events
        options.hover = options.hover || {};
        if (!options.hover.onHover) {
            options.hover.onHover = (/**
             * @param {?} event
             * @param {?} active
             * @return {?}
             */
            function (event, active) {
                if (active && active.length) {
                    _this.chartHover.emit({ event: event, active: active });
                }
            });
        }
        if (!options.onClick) {
            options.onClick = (/**
             * @param {?} event
             * @param {?} active
             * @return {?}
             */
            function (event, active) {
                _this.chartClick.emit({ event: event, active: active });
            });
        }
        /** @type {?} */
        var opts = {
            type: this.chartType,
            data: {
                labels: this.labels,
                datasets: datasets
            },
            options: options
        };
        return new Chart(ctx, opts);
    };
    /**
     * @private
     * @param {?} newDataValues
     * @return {?}
     */
    BaseChartDirective.prototype.updateChartData = /**
     * @private
     * @param {?} newDataValues
     * @return {?}
     */
    function (newDataValues) {
        if (Array.isArray(newDataValues[0].data)) {
            this.chart.data.datasets.forEach((/**
             * @param {?} dataset
             * @param {?} i
             * @return {?}
             */
            function (dataset, i) {
                dataset.data = newDataValues[i].data;
                if (newDataValues[i].label) {
                    dataset.label = newDataValues[i].label;
                }
            }));
        }
        else {
            this.chart.data.datasets[0].data = newDataValues;
        }
    };
    /**
     * @private
     * @return {?}
     */
    BaseChartDirective.prototype.getDatasets = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var datasets = void 0;
        // in case if datasets is not provided, but data is present
        if (!this.datasets || !this.datasets.length && (this.data && this.data.length)) {
            if (Array.isArray(this.data[0])) {
                datasets = ((/** @type {?} */ (this.data))).map((/**
                 * @param {?} data
                 * @param {?} index
                 * @return {?}
                 */
                function (data, index) {
                    return { data: data, label: _this.labels[index] || "Label " + index };
                }));
            }
            else {
                datasets = [{ data: this.data, label: "Label 0" }];
            }
        }
        if (this.datasets && this.datasets.length ||
            (datasets && datasets.length)) {
            datasets = (this.datasets || datasets)
                .map((/**
             * @param {?} elm
             * @param {?} index
             * @return {?}
             */
            function (elm, index) {
                /** @type {?} */
                var newElm = Object.assign({}, elm);
                if (_this.colors && _this.colors.length) {
                    Object.assign(newElm, _this.colors[index]);
                }
                else {
                    Object.assign(newElm, getColors(_this.chartType, index, newElm.data.length));
                }
                return newElm;
            }));
        }
        if (!datasets) {
            throw new Error("ng-charts configuration error,\n      data or datasets field are required to render char " + this.chartType);
        }
        return datasets;
    };
    /**
     * @private
     * @return {?}
     */
    BaseChartDirective.prototype.refresh = /**
     * @private
     * @return {?}
     */
    function () {
        this.ngOnDestroy();
        this.chart = this.getChartBuilder(this.ctx /*, data, this.options*/);
    };
    BaseChartDirective.defaultColors = [
        [255, 99, 132],
        [54, 162, 235],
        [255, 206, 86],
        [231, 233, 237],
        [75, 192, 192],
        [151, 187, 205],
        [220, 220, 220],
        [247, 70, 74],
        [70, 191, 189],
        [253, 180, 92],
        [148, 159, 177],
        [77, 83, 96]
    ];
    BaseChartDirective.decorators = [
        { type: Directive, args: [{ selector: 'canvas[mdbChart]', exportAs: 'mdb-base-chart' },] }
    ];
    /** @nocollapse */
    BaseChartDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    BaseChartDirective.propDecorators = {
        data: [{ type: Input }],
        datasets: [{ type: Input }],
        labels: [{ type: Input }],
        options: [{ type: Input }],
        chartType: [{ type: Input }],
        colors: [{ type: Input }],
        legend: [{ type: Input }],
        chartClick: [{ type: Output }],
        chartHover: [{ type: Output }]
    };
    return BaseChartDirective;
}());
export { BaseChartDirective };
if (false) {
    /** @type {?} */
    BaseChartDirective.defaultColors;
    /** @type {?} */
    BaseChartDirective.prototype.data;
    /** @type {?} */
    BaseChartDirective.prototype.datasets;
    /** @type {?} */
    BaseChartDirective.prototype.labels;
    /** @type {?} */
    BaseChartDirective.prototype.options;
    /** @type {?} */
    BaseChartDirective.prototype.chartType;
    /** @type {?} */
    BaseChartDirective.prototype.colors;
    /** @type {?} */
    BaseChartDirective.prototype.legend;
    /** @type {?} */
    BaseChartDirective.prototype.chartClick;
    /** @type {?} */
    BaseChartDirective.prototype.chartHover;
    /** @type {?} */
    BaseChartDirective.prototype.ctx;
    /** @type {?} */
    BaseChartDirective.prototype.chart;
    /** @type {?} */
    BaseChartDirective.prototype.cvs;
    /** @type {?} */
    BaseChartDirective.prototype.initFlag;
    /** @type {?} */
    BaseChartDirective.prototype.element;
    /** @type {?} */
    BaseChartDirective.prototype.isBrowser;
}
/**
 * @param {?} colour
 * @param {?} alpha
 * @return {?}
 */
function rgba(colour, alpha) {
    return 'rgba(' + colour.concat(alpha).join(',') + ')';
}
/**
 * @param {?} min
 * @param {?} max
 * @return {?}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * @param {?} colors
 * @return {?}
 */
function formatLineColor(colors) {
    return {
        backgroundColor: rgba(colors, 0.4),
        borderColor: rgba(colors, 1),
        pointBackgroundColor: rgba(colors, 1),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: rgba(colors, 0.8)
    };
}
/**
 * @param {?} colors
 * @return {?}
 */
function formatBarColor(colors) {
    return {
        backgroundColor: rgba(colors, 0.6),
        borderColor: rgba(colors, 1),
        hoverBackgroundColor: rgba(colors, 0.8),
        hoverBorderColor: rgba(colors, 1)
    };
}
/**
 * @param {?} colors
 * @return {?}
 */
function formatPieColors(colors) {
    return {
        backgroundColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        function (color) { return rgba(color, 0.6); })),
        borderColor: colors.map((/**
         * @return {?}
         */
        function () { return '#fff'; })),
        pointBackgroundColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        function (color) { return rgba(color, 1); })),
        pointBorderColor: colors.map((/**
         * @return {?}
         */
        function () { return '#fff'; })),
        pointHoverBackgroundColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        function (color) { return rgba(color, 1); })),
        pointHoverBorderColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        function (color) { return rgba(color, 1); }))
    };
}
/**
 * @param {?} colors
 * @return {?}
 */
function formatPolarAreaColors(colors) {
    return {
        backgroundColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        function (color) { return rgba(color, 0.6); })),
        borderColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        function (color) { return rgba(color, 1); })),
        hoverBackgroundColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        function (color) { return rgba(color, 0.8); })),
        hoverBorderColor: colors.map((/**
         * @param {?} color
         * @return {?}
         */
        function (color) { return rgba(color, 1); }))
    };
}
/**
 * @return {?}
 */
function getRandomColor() {
    return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
}
/**
 * Generate colors for line|bar charts
 * @param {?} index
 * @return {?}
 */
function generateColor(index) {
    return BaseChartDirective.defaultColors[index] || getRandomColor();
}
/**
 * Generate colors for pie|doughnut charts
 * @param {?} count
 * @return {?}
 */
function generateColors(count) {
    /** @type {?} */
    var colorsArr = new Array(count);
    for (var i = 0; i < count; i++) {
        colorsArr[i] = BaseChartDirective.defaultColors[i] || getRandomColor();
    }
    return colorsArr;
}
/**
 * Generate colors by chart type
 * @param {?} chartType
 * @param {?} index
 * @param {?} count
 * @return {?}
 */
function getColors(chartType, index, count) {
    if (chartType === 'pie' || chartType === 'doughnut') {
        return formatPieColors(generateColors(count));
    }
    if (chartType === 'polarArea') {
        return formatPolarAreaColors(generateColors(count));
    }
    if (chartType === 'line' || chartType === 'radar') {
        return formatLineColor(generateColor(index));
    }
    if (chartType === 'bar' || chartType === 'horizontalBar') {
        return formatBarColor(generateColor(index));
    }
    return generateColor(index);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvY2hhcnRzL2NoYXJ0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUlMLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFFTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFLdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHcEQ7SUFxQ0UsNEJBQW1CLE9BQW1CLEVBQXVCLFVBQWtCO1FBbEIvRCxXQUFNLEdBQWUsRUFBRSxDQUFDO1FBQ3hCLFlBQU8sR0FBUTtZQUM3QixNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO1NBQzNCLENBQUM7UUFHYyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25ELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUtwRSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2pCLGNBQVMsR0FBUSxLQUFLLENBQUM7UUFFckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7O0lBRU0scUNBQVE7OztJQUFmO1FBQ0UsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFh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Q25CLENBQUM7Ozs7Ozs7O0FBS0QsU0FBUyxTQUFTLENBQUMsU0FBaUIsRUFBRSxLQUFhLEVBQUUsS0FBYTtJQUNoRSxJQUFJLFNBQVMsS0FBSyxLQUFLLElBQUksU0FBUyxLQUFLLFVBQVUsRUFBRTtRQUNuRCxPQUFPLGVBQWUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUMvQztJQUVELElBQUksU0FBUyxLQUFLLFdBQVcsRUFBRTtRQUM3QixPQUFPLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ3JEO0lBRUQsSUFBSSxTQUFTLEtBQUssTUFBTSxJQUFJLFNBQVMsS0FBSyxPQUFPLEVBQUU7UUFDakQsT0FBTyxlQUFlLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDOUM7SUFFRCxJQUFJLFNBQVMsS0FBSyxLQUFLLElBQUksU0FBUyxLQUFLLGVBQWUsRUFBRTtRQUN4RCxPQUFPLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUM3QztJQUNELE9BQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzLFxuICBFdmVudEVtaXR0ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIERpcmVjdGl2ZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICcuL2NvbG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29sb3JzIH0gZnJvbSAnLi9jb2xvcnMuc2VydmljZSc7XG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBMQVRGT1JNX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIGltcG9ydCAqIGFzIENoYXJ0IGZyb20gJ2NoYXJ0LmpzJztcbmRlY2xhcmUgdmFyIENoYXJ0OiBhbnk7XG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjYW52YXNbbWRiQ2hhcnRdJywgZXhwb3J0QXM6ICdtZGItYmFzZS1jaGFydCcgfSlcbmV4cG9ydCBjbGFzcyBCYXNlQ2hhcnREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgT25Jbml0LCBDb2xvcnMge1xuICBwdWJsaWMgc3RhdGljIGRlZmF1bHRDb2xvcnM6IEFycmF5PG51bWJlcltdPiA9IFtcbiAgICBbMjU1LCA5OSwgMTMyXSxcbiAgICBbNTQsIDE2MiwgMjM1XSxcbiAgICBbMjU1LCAyMDYsIDg2XSxcbiAgICBbMjMxLCAyMzMsIDIzN10sXG4gICAgWzc1LCAxOTIsIDE5Ml0sXG4gICAgWzE1MSwgMTg3LCAyMDVdLFxuICAgIFsyMjAsIDIyMCwgMjIwXSxcbiAgICBbMjQ3LCA3MCwgNzRdLFxuICAgIFs3MCwgMTkxLCAxODldLFxuICAgIFsyNTMsIDE4MCwgOTJdLFxuICAgIFsxNDgsIDE1OSwgMTc3XSxcbiAgICBbNzcsIDgzLCA5Nl1cbiAgXTtcblxuICBASW5wdXQoKSBwdWJsaWMgZGF0YTogbnVtYmVyW10gfCBhbnlbXTtcbiAgQElucHV0KCkgcHVibGljIGRhdGFzZXRzOiBhbnlbXTtcbiAgQElucHV0KCkgcHVibGljIGxhYmVsczogQXJyYXk8YW55PiA9IFtdO1xuICBASW5wdXQoKSBwdWJsaWMgb3B0aW9uczogYW55ID0ge1xuICAgIGxlZ2VuZDogeyBkaXNwbGF5OiBmYWxzZSB9XG4gIH07XG4gIEBJbnB1dCgpIHB1YmxpYyBjaGFydFR5cGU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGNvbG9yczogQXJyYXk8YW55PjtcbiAgQElucHV0KCkgcHVibGljIGxlZ2VuZCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBwdWJsaWMgY2hhcnRDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgY2hhcnRIb3ZlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIGN0eDogYW55O1xuICBwdWJsaWMgY2hhcnQ6IGFueTtcbiAgY3ZzOiBhbnk7XG4gIGluaXRGbGFnID0gZmFsc2U7XG5cbiAgZWxlbWVudDogRWxlbWVudFJlZjtcbiAgaXNCcm93c2VyOiBhbnkgPSBmYWxzZTtcbiAgcHVibGljIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IHN0cmluZykge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5pc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiBhbnkge1xuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5jdHggPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgdGhpcy5jdnMgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMuaW5pdEZsYWcgPSB0cnVlO1xuICAgICAgaWYgKHRoaXMuZGF0YSB8fCB0aGlzLmRhdGFzZXRzKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5pdEZsYWcpIHtcbiAgICAgIC8vIENoZWNrIGlmIHRoZSBjaGFuZ2VzIGFyZSBpbiB0aGUgZGF0YSBvciBkYXRhc2V0c1xuICAgICAgaWYgKChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdkYXRhJykgfHwgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnZGF0YXNldHMnKSkgJiYgIWNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2xhYmVscycpKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzWydkYXRhJ10pIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJ0RGF0YShjaGFuZ2VzWydkYXRhJ10uY3VycmVudFZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJ0RGF0YShjaGFuZ2VzWydkYXRhc2V0cyddLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYXJ0LnVwZGF0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gb3RoZXJ3aXNlIHJlYnVpbGQgdGhlIGNoYXJ0XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiBhbnkge1xuICAgIGlmICh0aGlzLmNoYXJ0KSB7XG4gICAgICB0aGlzLmNoYXJ0LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuY2hhcnQgPSB2b2lkIDA7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldENoYXJ0QnVpbGRlcihjdHg6IGFueS8qLCBkYXRhOkFycmF5PGFueT4sIG9wdGlvbnM6YW55Ki8pOiBhbnkge1xuICAgIGNvbnN0IGRhdGFzZXRzOiBhbnkgPSB0aGlzLmdldERhdGFzZXRzKCk7XG5cbiAgICBjb25zdCBvcHRpb25zOiBhbnkgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMpO1xuICAgIGlmICh0aGlzLmxlZ2VuZCA9PT0gZmFsc2UpIHtcbiAgICAgIG9wdGlvbnMubGVnZW5kID0geyBkaXNwbGF5OiBmYWxzZSB9O1xuICAgIH1cbiAgICAvLyBob2NrIGZvciBvbkhvdmVyIGFuZCBvbkNsaWNrIGV2ZW50c1xuICAgIG9wdGlvbnMuaG92ZXIgPSBvcHRpb25zLmhvdmVyIHx8IHt9O1xuICAgIGlmICghb3B0aW9ucy5ob3Zlci5vbkhvdmVyKSB7XG4gICAgICBvcHRpb25zLmhvdmVyLm9uSG92ZXIgPSAoZXZlbnQ6IGFueSwgYWN0aXZlOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgIGlmIChhY3RpdmUgJiYgYWN0aXZlLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuY2hhcnRIb3Zlci5lbWl0KHsgZXZlbnQsIGFjdGl2ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMub25DbGljaykge1xuICAgICAgb3B0aW9ucy5vbkNsaWNrID0gKGV2ZW50OiBhbnksIGFjdGl2ZTogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICB0aGlzLmNoYXJ0Q2xpY2suZW1pdCh7IGV2ZW50LCBhY3RpdmUgfSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbGFiZWxzOiB0aGlzLmxhYmVscyxcbiAgICAgICAgZGF0YXNldHM6IGRhdGFzZXRzXG4gICAgICB9LFxuICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IENoYXJ0KGN0eCwgb3B0cyk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNoYXJ0RGF0YShuZXdEYXRhVmFsdWVzOiBudW1iZXJbXSB8IGFueVtdKTogdm9pZCB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobmV3RGF0YVZhbHVlc1swXS5kYXRhKSkge1xuICAgICAgdGhpcy5jaGFydC5kYXRhLmRhdGFzZXRzLmZvckVhY2goKGRhdGFzZXQ6IGFueSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgIGRhdGFzZXQuZGF0YSA9IG5ld0RhdGFWYWx1ZXNbaV0uZGF0YTtcblxuICAgICAgICBpZiAobmV3RGF0YVZhbHVlc1tpXS5sYWJlbCkge1xuICAgICAgICAgIGRhdGFzZXQubGFiZWwgPSBuZXdEYXRhVmFsdWVzW2ldLmxhYmVsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jaGFydC5kYXRhLmRhdGFzZXRzWzBdLmRhdGEgPSBuZXdEYXRhVmFsdWVzO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGF0YXNldHMoKTogYW55IHtcbiAgICBsZXQgZGF0YXNldHM6IGFueSA9IHZvaWQgMDtcbiAgICAvLyBpbiBjYXNlIGlmIGRhdGFzZXRzIGlzIG5vdCBwcm92aWRlZCwgYnV0IGRhdGEgaXMgcHJlc2VudFxuICAgIGlmICghdGhpcy5kYXRhc2V0cyB8fCAhdGhpcy5kYXRhc2V0cy5sZW5ndGggJiYgKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEubGVuZ3RoKSkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5kYXRhWzBdKSkge1xuICAgICAgICBkYXRhc2V0cyA9ICh0aGlzLmRhdGEgYXMgQXJyYXk8bnVtYmVyW10+KS5tYXAoKGRhdGE6IG51bWJlcltdLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHsgZGF0YSwgbGFiZWw6IHRoaXMubGFiZWxzW2luZGV4XSB8fCBgTGFiZWwgJHtpbmRleH1gIH07XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YXNldHMgPSBbeyBkYXRhOiB0aGlzLmRhdGEsIGxhYmVsOiBgTGFiZWwgMGAgfV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGF0YXNldHMgJiYgdGhpcy5kYXRhc2V0cy5sZW5ndGggfHxcbiAgICAgIChkYXRhc2V0cyAmJiBkYXRhc2V0cy5sZW5ndGgpKSB7XG4gICAgICBkYXRhc2V0cyA9ICh0aGlzLmRhdGFzZXRzIHx8IGRhdGFzZXRzKVxuICAgICAgICAubWFwKChlbG06IG51bWJlciwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld0VsbTogYW55ID0gT2JqZWN0LmFzc2lnbih7fSwgZWxtKTtcbiAgICAgICAgICBpZiAodGhpcy5jb2xvcnMgJiYgdGhpcy5jb2xvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKG5ld0VsbSwgdGhpcy5jb2xvcnNbaW5kZXhdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihuZXdFbG0sIGdldENvbG9ycyh0aGlzLmNoYXJ0VHlwZSwgaW5kZXgsIG5ld0VsbS5kYXRhLmxlbmd0aCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3RWxtO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIWRhdGFzZXRzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYG5nLWNoYXJ0cyBjb25maWd1cmF0aW9uIGVycm9yLFxuICAgICAgZGF0YSBvciBkYXRhc2V0cyBmaWVsZCBhcmUgcmVxdWlyZWQgdG8gcmVuZGVyIGNoYXIgJHt0aGlzLmNoYXJ0VHlwZX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YXNldHM7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2goKTogYW55IHtcbiAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5jaGFydCA9IHRoaXMuZ2V0Q2hhcnRCdWlsZGVyKHRoaXMuY3R4LyosIGRhdGEsIHRoaXMub3B0aW9ucyovKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZ2JhKGNvbG91cjogQXJyYXk8bnVtYmVyPiwgYWxwaGE6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiAncmdiYSgnICsgY29sb3VyLmNvbmNhdChhbHBoYSkuam9pbignLCcpICsgJyknO1xufVxuXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG59XG5cbmZ1bmN0aW9uIGZvcm1hdExpbmVDb2xvcihjb2xvcnM6IEFycmF5PG51bWJlcj4pOiBDb2xvciB7XG4gIHJldHVybiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiByZ2JhKGNvbG9ycywgMC40KSxcbiAgICBib3JkZXJDb2xvcjogcmdiYShjb2xvcnMsIDEpLFxuICAgIHBvaW50QmFja2dyb3VuZENvbG9yOiByZ2JhKGNvbG9ycywgMSksXG4gICAgcG9pbnRCb3JkZXJDb2xvcjogJyNmZmYnLFxuICAgIHBvaW50SG92ZXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICBwb2ludEhvdmVyQm9yZGVyQ29sb3I6IHJnYmEoY29sb3JzLCAwLjgpXG4gIH07XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEJhckNvbG9yKGNvbG9yczogQXJyYXk8bnVtYmVyPik6IENvbG9yIHtcbiAgcmV0dXJuIHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IHJnYmEoY29sb3JzLCAwLjYpLFxuICAgIGJvcmRlckNvbG9yOiByZ2JhKGNvbG9ycywgMSksXG4gICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHJnYmEoY29sb3JzLCAwLjgpLFxuICAgIGhvdmVyQm9yZGVyQ29sb3I6IHJnYmEoY29sb3JzLCAxKVxuICB9O1xufVxuXG5mdW5jdGlvbiBmb3JtYXRQaWVDb2xvcnMoY29sb3JzOiBBcnJheTxudW1iZXJbXT4pOiBhbnkge1xuICByZXR1cm4ge1xuICAgIGJhY2tncm91bmRDb2xvcjogY29sb3JzLm1hcCgoY29sb3I6IG51bWJlcltdKSA9PiByZ2JhKGNvbG9yLCAwLjYpKSxcbiAgICBib3JkZXJDb2xvcjogY29sb3JzLm1hcCgoKSA9PiAnI2ZmZicpLFxuICAgIHBvaW50QmFja2dyb3VuZENvbG9yOiBjb2xvcnMubWFwKChjb2xvcjogbnVtYmVyW10pID0+IHJnYmEoY29sb3IsIDEpKSxcbiAgICBwb2ludEJvcmRlckNvbG9yOiBjb2xvcnMubWFwKCgpID0+ICcjZmZmJyksXG4gICAgcG9pbnRIb3ZlckJhY2tncm91bmRDb2xvcjogY29sb3JzLm1hcCgoY29sb3I6IG51bWJlcltdKSA9PiByZ2JhKGNvbG9yLCAxKSksXG4gICAgcG9pbnRIb3ZlckJvcmRlckNvbG9yOiBjb2xvcnMubWFwKChjb2xvcjogbnVtYmVyW10pID0+IHJnYmEoY29sb3IsIDEpKVxuICB9O1xufVxuXG5mdW5jdGlvbiBmb3JtYXRQb2xhckFyZWFDb2xvcnMoY29sb3JzOiBBcnJheTxudW1iZXJbXT4pOiBDb2xvciB7XG4gIHJldHVybiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiBjb2xvcnMubWFwKChjb2xvcjogbnVtYmVyW10pID0+IHJnYmEoY29sb3IsIDAuNikpLFxuICAgIGJvcmRlckNvbG9yOiBjb2xvcnMubWFwKChjb2xvcjogbnVtYmVyW10pID0+IHJnYmEoY29sb3IsIDEpKSxcbiAgICBob3ZlckJhY2tncm91bmRDb2xvcjogY29sb3JzLm1hcCgoY29sb3I6IG51bWJlcltdKSA9PiByZ2JhKGNvbG9yLCAwLjgpKSxcbiAgICBob3ZlckJvcmRlckNvbG9yOiBjb2xvcnMubWFwKChjb2xvcjogbnVtYmVyW10pID0+IHJnYmEoY29sb3IsIDEpKVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRSYW5kb21Db2xvcigpOiBudW1iZXJbXSB7XG4gIHJldHVybiBbZ2V0UmFuZG9tSW50KDAsIDI1NSksIGdldFJhbmRvbUludCgwLCAyNTUpLCBnZXRSYW5kb21JbnQoMCwgMjU1KV07XG59XG5cbi8qKlxuICogR2VuZXJhdGUgY29sb3JzIGZvciBsaW5lfGJhciBjaGFydHNcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVDb2xvcihpbmRleDogbnVtYmVyKTogbnVtYmVyW10ge1xuICByZXR1cm4gQmFzZUNoYXJ0RGlyZWN0aXZlLmRlZmF1bHRDb2xvcnNbaW5kZXhdIHx8IGdldFJhbmRvbUNvbG9yKCk7XG59XG5cbi8qKlxuICogR2VuZXJhdGUgY29sb3JzIGZvciBwaWV8ZG91Z2hudXQgY2hhcnRzXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlQ29sb3JzKGNvdW50OiBudW1iZXIpOiBBcnJheTxudW1iZXJbXT4ge1xuICBjb25zdCBjb2xvcnNBcnI6IEFycmF5PG51bWJlcltdPiA9IG5ldyBBcnJheShjb3VudCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgIGNvbG9yc0FycltpXSA9IEJhc2VDaGFydERpcmVjdGl2ZS5kZWZhdWx0Q29sb3JzW2ldIHx8IGdldFJhbmRvbUNvbG9yKCk7XG4gIH1cbiAgcmV0dXJuIGNvbG9yc0Fycjtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBjb2xvcnMgYnkgY2hhcnQgdHlwZVxuICovXG5mdW5jdGlvbiBnZXRDb2xvcnMoY2hhcnRUeXBlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIsIGNvdW50OiBudW1iZXIpOiBhbnkge1xuICBpZiAoY2hhcnRUeXBlID09PSAncGllJyB8fCBjaGFydFR5cGUgPT09ICdkb3VnaG51dCcpIHtcbiAgICByZXR1cm4gZm9ybWF0UGllQ29sb3JzKGdlbmVyYXRlQ29sb3JzKGNvdW50KSk7XG4gIH1cblxuICBpZiAoY2hhcnRUeXBlID09PSAncG9sYXJBcmVhJykge1xuICAgIHJldHVybiBmb3JtYXRQb2xhckFyZWFDb2xvcnMoZ2VuZXJhdGVDb2xvcnMoY291bnQpKTtcbiAgfVxuXG4gIGlmIChjaGFydFR5cGUgPT09ICdsaW5lJyB8fCBjaGFydFR5cGUgPT09ICdyYWRhcicpIHtcbiAgICByZXR1cm4gZm9ybWF0TGluZUNvbG9yKGdlbmVyYXRlQ29sb3IoaW5kZXgpKTtcbiAgfVxuXG4gIGlmIChjaGFydFR5cGUgPT09ICdiYXInIHx8IGNoYXJ0VHlwZSA9PT0gJ2hvcml6b250YWxCYXInKSB7XG4gICAgcmV0dXJuIGZvcm1hdEJhckNvbG9yKGdlbmVyYXRlQ29sb3IoaW5kZXgpKTtcbiAgfVxuICByZXR1cm4gZ2VuZXJhdGVDb2xvcihpbmRleCk7XG59XG5cblxuIl19