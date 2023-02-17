/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Inject, Input, Output, PLATFORM_ID, Renderer2, ViewChild, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
/** @type {?} */
export var TIME_PIRCKER_VALUE_ACCESSOT = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return ClockPickerComponent; })),
    multi: true,
};
var ClockPickerComponent = /** @class */ (function () {
    function ClockPickerComponent(elem, renderer, platformId) {
        var _this = this;
        this.elem = elem;
        this.renderer = renderer;
        this.twelvehour = false;
        this.darktheme = false;
        this.placeholder = '';
        this.label = '';
        this.duration = 300;
        this.showClock = false;
        this.disabled = false;
        this.outlineInput = false;
        this.timeChanged = new EventEmitter();
        this.isMobile = null;
        this.touchDevice = 'ontouchstart' in ((/** @type {?} */ (document.documentElement)));
        this.showHours = false;
        this.elements = document.getElementsByClassName('clockpicker');
        this.dialRadius = 135;
        this.outerRadius = 110;
        this.innerRadius = 80;
        this.tickRadius = 20;
        this.diameter = this.dialRadius * 2;
        this.isBrowser = false;
        this.hoursTicks = [];
        this.minutesTicks = [];
        this.selectedHours = { h: '12', m: '00', ampm: 'AM' };
        this.endHours = '';
        this.touchSupported = 'ontouchstart' in window;
        this.mousedownEvent = 'mousedown' + (this.touchSupported ? ' touchstart' : '');
        this.mousemoveEvent = 'mousemove' + (this.touchSupported ? ' touchmove' : '');
        this.mouseupEvent = 'mouseup' + (this.touchSupported ? ' touchend' : '');
        this.isMouseDown = false;
        this.onChangeCb = (/**
         * @return {?}
         */
        function () { });
        this.onTouchedCb = (/**
         * @return {?}
         */
        function () { });
        this.isBrowser = isPlatformBrowser(platformId);
        renderer.listen(this.elem.nativeElement, 'click', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (_this.showClock &&
                event.target &&
                _this.elem.nativeElement !== event.target &&
                !_this.elem.nativeElement.contains(event.target)) {
                _this.showClock = false;
            }
            if (event.target.classList.contains('picker__holder')) {
                _this.showClock = false;
            }
        }));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ClockPickerComponent.prototype.ontouchmove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.rotateTimePickerArrow(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ClockPickerComponent.prototype.onMouseMove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.isMouseDown) {
            this.rotateTimePickerArrow(event);
        }
    };
    /**
     * @return {?}
     */
    ClockPickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.generateTick();
        if (this.isBrowser) {
            this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        }
    };
    /**
     * @return {?}
     */
    ClockPickerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        ['mousedown', 'mouseup'].forEach((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.renderer.listen(_this.elem.nativeElement.querySelector('.clockpicker-plate'), event, (/**
             * @param {?} ev
             * @return {?}
             */
            function (ev) {
                if (event === 'mousedown') {
                    _this.mousedown(ev, false);
                    _this.isMouseDown = true;
                }
                else {
                    _this.isMouseDown = false;
                }
            }));
        }));
    };
    /**
     * @return {?}
     */
    ClockPickerComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.isBrowser) {
            // Fix for visible date / time picker input when picker plate is visible.
            try {
                /** @type {?} */
                var openedPicker = document.querySelector('.picker--opened');
                /** @type {?} */
                var allPickers = document.querySelectorAll('.picker');
                allPickers.forEach((/**
                 * @param {?} element
                 * @return {?}
                 */
                function (element) {
                    _this.renderer.setStyle(element, 'z-index', '0');
                }));
                this.renderer.setStyle(openedPicker, 'z-index', '1000');
            }
            catch (error) { }
        }
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    ClockPickerComponent.prototype.rotateTimePickerArrow = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (event.target.parentElement.classList.contains('clockpicker-dial')) {
            ((/** @type {?} */ (this.elem.nativeElement.querySelectorAll('.clockpicker-tick')))).forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
                _this.renderer.setStyle(element, 'background-color', 'rgba(0, 150, 136, 0');
            }));
            this.mousedown(event);
        }
    };
    /**
     * @return {?}
     */
    ClockPickerComponent.prototype.checkDraw = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value;
        /** @type {?} */
        var isHours = this.showHours;
        if (isHours) {
            value = parseInt(this.selectedHours.h, 0);
        }
        else {
            value = parseInt(this.selectedHours.m, 0);
        }
        /** @type {?} */
        var unit = Math.PI / (isHours ? 6 : 30);
        /** @type {?} */
        var radian = value * unit;
        /** @type {?} */
        var radius = isHours && value > 0 && value < 13 ? this.innerRadius : this.outerRadius;
        /** @type {?} */
        var xd = Math.sin(radian) * radius;
        /** @type {?} */
        var yd = -Math.cos(radian) * radius;
        this.setHand(xd, yd, false);
    };
    /**
     * @param {?} e
     * @param {?=} space
     * @return {?}
     */
    ClockPickerComponent.prototype.mousedown = /**
     * @param {?} e
     * @param {?=} space
     * @return {?}
     */
    function (e, space) {
        var _this = this;
        /** @type {?} */
        var offset = this.plate.nativeElement.getBoundingClientRect();
        /** @type {?} */
        var isTouch = /^touch/.test(e.type);
        /** @type {?} */
        var x0 = offset.left + this.dialRadius;
        /** @type {?} */
        var y0 = offset.top + this.dialRadius;
        /** @type {?} */
        var dx = (isTouch ? e.touches[0] : e).clientX - x0;
        /** @type {?} */
        var dy = (isTouch ? e.touches[0] : e).clientY - y0;
        /** @type {?} */
        var z = Math.sqrt(dx * dx + dy * dy);
        /** @type {?} */
        var moved = false;
        if (space &&
            (z < this.outerRadius - this.tickRadius || z > this.outerRadius + this.tickRadius)) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (this.showHours) {
            this.setHand(dx, dy, true);
        }
        else {
            this.setHand(dx, dy, false);
        }
        /** @type {?} */
        var mousemoveEventMethod = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.preventDefault();
            event.stopPropagation();
            /** @type {?} */
            var x = event.clientX - x0;
            /** @type {?} */
            var y = event.clientY - y0;
            if (!moved && x === dx && y === dy) {
                return;
            }
            moved = true;
            _this.setHand(x, y, false);
        });
        /** @type {?} */
        var mouseupEventMethod = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            document.removeEventListener(_this.mousemoveEvent, mousemoveEventMethod);
            e.preventDefault();
            /** @type {?} */
            var x = event.clientX - x0;
            /** @type {?} */
            var y = event.clientX - y0;
            if ((space || moved) && x === dx && y === dy) {
                _this.setHand(x, y, false);
            }
            _this.showMinutesClock();
            document.removeEventListener(_this.mouseupEvent, mouseupEventMethod);
        });
        document.addEventListener(this.mousemoveEvent, mousemoveEventMethod);
        document.addEventListener('mouseup', mouseupEventMethod);
    };
    /**
     * @return {?}
     */
    ClockPickerComponent.prototype.hideKeyboard = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // this set timeout needed for case when hideKeyborad
        // is called inside of 'onfocus' event handler
        try {
            setTimeout((/**
             * @return {?}
             */
            function () {
                // creating temp field
                // const field = document.createElement('input');
                /** @type {?} */
                var field = _this.renderer.createElement('input');
                _this.renderer.appendChild(_this.elem.nativeElement, field);
                /** @type {?} */
                var inputReference = _this.elem.nativeElement.lastElementChild;
                _this.renderer.setAttribute(inputReference, 'type', 'text');
                _this.renderer.setAttribute(inputReference, 'type', 'text');
                _this.renderer.setStyle(inputReference, 'opacity', '0');
                _this.renderer.setStyle(inputReference, '-webkit-user-modify', 'read-write-plaintext-only');
                // // hiding temp field from peoples eyes
                // // -webkit-user-modify is nessesary for Android 4.x
                // adding onfocus event handler for out temp field
                field.onfocus = (/**
                 * @return {?}
                 */
                function () {
                    // this timeout of 200ms is nessasary for Android 2.3.x
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        _this.renderer.setStyle(field, 'display', 'none');
                        setTimeout((/**
                         * @return {?}
                         */
                        function () {
                            _this.renderer.removeChild(_this.elem.nativeElement, field);
                            document.body.focus();
                        }), 0);
                    }), 0);
                });
                // focusing it
                field.focus();
            }), 0);
        }
        catch (error) { }
    };
    /**
     * @return {?}
     */
    ClockPickerComponent.prototype.openBtnClicked = /**
     * @return {?}
     */
    function () {
        this.showClock = true;
        this.showHours = true;
        this.checkDraw();
        if (this.isMobile) {
            this.hideKeyboard();
        }
    };
    /**
     * @return {?}
     */
    ClockPickerComponent.prototype.closeBtnClicked = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var h = this.selectedHours.h;
        /** @type {?} */
        var m = this.selectedHours.m;
        /** @type {?} */
        var ampm = this.selectedHours.ampm;
        if (this.twelvehour) {
            this.endHours = h + ':' + m + ampm;
        }
        else {
            this.endHours = h + ':' + m;
        }
        this.onChangeCb(this.endHours);
        this.onTouchedCb();
        this.timeChanged.emit(this.endHours);
        this.showClock = false;
    };
    /**
     * @return {?}
     */
    ClockPickerComponent.prototype.clearTimeInput = /**
     * @return {?}
     */
    function () {
        this.selectedHours = { h: '12', m: '00', ampm: 'AM' };
        this.endHours = '';
    };
    /**
     * @param {?} hour
     * @return {?}
     */
    ClockPickerComponent.prototype.setHour = /**
     * @param {?} hour
     * @return {?}
     */
    function (hour) {
        this.selectedHours.h = hour;
    };
    /**
     * @param {?} min
     * @return {?}
     */
    ClockPickerComponent.prototype.setMinute = /**
     * @param {?} min
     * @return {?}
     */
    function (min) {
        // event.stopPropagation();
        this.selectedHours.m = min;
    };
    /**
     * @param {?} ampm
     * @return {?}
     */
    ClockPickerComponent.prototype.setAmPm = /**
     * @param {?} ampm
     * @return {?}
     */
    function (ampm) {
        // event.stopPropagation();
        this.selectedHours.ampm = ampm;
    };
    /**
     * @return {?}
     */
    ClockPickerComponent.prototype.showHoursClock = /**
     * @return {?}
     */
    function () {
        this.showHours = true;
        this.checkDraw();
    };
    /**
     * @return {?}
     */
    ClockPickerComponent.prototype.showMinutesClock = /**
     * @return {?}
     */
    function () {
        this.showHours = false;
        this.checkDraw();
    };
    /**
     * @return {?}
     */
    ClockPickerComponent.prototype.generateTick = /**
     * @return {?}
     */
    function () {
        if (this.twelvehour) {
            for (var i = 1; i < 13; i++) {
                /** @type {?} */
                var radian = (i / 6) * Math.PI;
                /** @type {?} */
                var radius = this.outerRadius;
                /** @type {?} */
                var tick = {
                    hour: i,
                    left: this.dialRadius + Math.sin(radian) * radius - this.tickRadius,
                    top: this.dialRadius - Math.cos(radian) * radius - this.tickRadius,
                };
                this.hoursTicks.push(tick);
            }
        }
        else {
            for (var i = 0; i < 24; i++) {
                /** @type {?} */
                var radian = (i / 6) * Math.PI;
                /** @type {?} */
                var inner = i > 0 && i < 13;
                /** @type {?} */
                var radius = inner ? this.innerRadius : this.outerRadius;
                /** @type {?} */
                var h = void 0;
                if (i === 0) {
                    h = '0' + i.toString();
                }
                else {
                    h = i;
                }
                /** @type {?} */
                var tick = {
                    hour: h,
                    left: this.dialRadius + Math.sin(radian) * radius - this.tickRadius,
                    top: this.dialRadius - Math.cos(radian) * radius - this.tickRadius,
                };
                this.hoursTicks.push(tick);
            }
        }
        for (var i = 0; i < 60; i += 5) {
            /** @type {?} */
            var radian = (i / 30) * Math.PI;
            /** @type {?} */
            var min = i.toString();
            if (i < 10) {
                min = '0' + i.toString();
            }
            /** @type {?} */
            var tick = {
                min: min,
                left: this.dialRadius + Math.sin(radian) * this.outerRadius - this.tickRadius,
                top: this.dialRadius - Math.cos(radian) * this.outerRadius - this.tickRadius,
            };
            this.minutesTicks.push(tick);
        }
    };
    /**
     * @param {?} x
     * @param {?} y
     * @param {?} roundBy5
     * @return {?}
     */
    ClockPickerComponent.prototype.setHand = /**
     * @param {?} x
     * @param {?} y
     * @param {?} roundBy5
     * @return {?}
     */
    function (x, y, roundBy5) {
        /** @type {?} */
        var radian = Math.atan2(x, -y);
        /** @type {?} */
        var isHours = this.showHours;
        /** @type {?} */
        var unit = Math.PI / (isHours || roundBy5 ? 6 : 30);
        /** @type {?} */
        var z = Math.sqrt(x * x + y * y);
        /** @type {?} */
        var inner = isHours && z < (this.outerRadius + this.innerRadius) / 2;
        /** @type {?} */
        var radius = inner ? this.innerRadius : this.outerRadius;
        /** @type {?} */
        var value;
        if (this.showHours) {
            value = parseInt(this.selectedHours.h, 0);
        }
        else {
            value = parseInt(this.selectedHours.m, 0);
        }
        if (this.twelvehour) {
            radius = this.outerRadius;
        }
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        value = Math.round(radian / unit);
        radian = value * unit;
        if (this.twelvehour) {
            if (isHours) {
                if (value === 0) {
                    value = 12;
                }
            }
            else {
                if (roundBy5) {
                    value *= 5;
                }
                if (value === 60) {
                    value = 0;
                }
            }
        }
        else {
            if (isHours) {
                value = !inner ? value + 12 : value;
                value = value === 24 ? 0 : value;
                value = inner && value === 0 ? 12 : value;
                value = !inner && value === 12 ? 0 : value;
            }
            else {
                if (roundBy5) {
                    value *= 5;
                }
                if (value === 60) {
                    value = 0;
                }
            }
        }
        if (isHours) {
            this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg');
        }
        else {
            if (value % 5 === 0) {
                this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg');
            }
            else {
                this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg active');
            }
        }
        /** @type {?} */
        var cx1 = Math.sin(radian) * (radius - this.tickRadius);
        /** @type {?} */
        var cy1 = -Math.cos(radian) * (radius - this.tickRadius);
        /** @type {?} */
        var cx2 = Math.sin(radian) * radius;
        /** @type {?} */
        var cy2 = -Math.cos(radian) * radius;
        this.hand.nativeElement.setAttribute('x2', cx1);
        this.hand.nativeElement.setAttribute('y2', cy1);
        this.bg.nativeElement.setAttribute('cx', cx2);
        this.bg.nativeElement.setAttribute('cy', cy2);
        this.fg.nativeElement.setAttribute('cx', cx2);
        this.fg.nativeElement.setAttribute('cy', cy2);
        if (this.showHours) {
            if (value < 10) {
                this.setHour('0' + value.toString());
            }
            else {
                this.setHour(value.toString());
            }
        }
        else {
            if (value < 10) {
                this.setMinute('0' + value.toString());
            }
            else {
                this.setMinute(value.toString());
            }
        }
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    ClockPickerComponent.prototype.offset = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        /** @type {?} */
        var left = 0;
        /** @type {?} */
        var top = 0;
        if (obj.offsetParent) {
            do {
                left += obj.offsetLeft;
                top += obj.offsetTop;
            } while ((obj = obj.offsetParent));
        }
        return { left: left, top: top };
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ClockPickerComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.endHours = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ClockPickerComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCb = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ClockPickerComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCb = fn;
    };
    ClockPickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-time-picker',
                    template: "<div class=\"tp\">\n  <div class=\"md-form\" [ngClass]=\"{ 'md-outline': outlineInput }\">\n    <input\n      [disabled]=\"disabled\"\n      [tabindex]=\"tabIndex\"\n      [placeholder]=\"placeholder\"\n      [value]=\"endHours\"\n      type=\"text\"\n      class=\"form-control timepicker\"\n      (click)=\"openBtnClicked()\"\n      [(ngModel)]=\"endHours\"\n    />\n    <label class=\"active\">{{ label }}</label>\n  </div>\n  <div\n    class=\"clockpicker picker\"\n    [hidden]=\"!showClock\"\n    [ngClass]=\"{ 'picker--opened': showClock, darktheme: darktheme }\"\n  >\n    <div class=\"picker__holder\">\n      <div class=\"picker__frame\">\n        <div class=\"picker__wrap\">\n          <div class=\"picker__box\">\n            <div class=\"picker__date-display\">\n              <div class=\"clockpicker-display\">\n                <div class=\"clockpicker-display-column\">\n                  <span\n                    class=\"clockpicker-span-hours text-primary\"\n                    [ngClass]=\"{ 'text-primary': showHours }\"\n                    (click)=\"showHoursClock()\"\n                  >\n                    {{ selectedHours.h }}</span\n                  >:<span\n                    class=\"clockpicker-span-minutes\"\n                    [ngClass]=\"{ 'text-primary': !showHours }\"\n                    (click)=\"showMinutesClock()\"\n                    >{{ selectedHours.m }}</span\n                  >\n                </div>\n                <div\n                  class=\"clockpicker-display-column clockpicker-display-am-pm\"\n                  *ngIf=\"twelvehour\"\n                >\n                  <div class=\"clockpicker-span-am-pm\">{{ selectedHours.ampm }}</div>\n                </div>\n              </div>\n            </div>\n            <div class=\"picker__calendar-container\">\n              <div class=\"clockpicker-plate\" #plate>\n                <div class=\"clockpicker-canvas\">\n                  <svg class=\"clockpicker-svg\" width=\"270\" height=\"270\" #svg>\n                    <g transform=\"translate(135,135)\" #g>\n                      <line\n                        x1=\"0\"\n                        y1=\"0\"\n                        x2=\"77.94228634059948\"\n                        y2=\"-45.00000000000001\"\n                        #hand\n                      ></line>\n                      <circle\n                        class=\"clockpicker-canvas-fg\"\n                        r=\"5\"\n                        cx=\"95.26279441628824\"\n                        cy=\"-55.000000000000014\"\n                        #fg\n                      ></circle>\n                      <circle\n                        class=\"clockpicker-canvas-bg\"\n                        r=\"20\"\n                        cx=\"95.26279441628824\"\n                        cy=\"-55.000000000000014\"\n                        #bg\n                      ></circle>\n                      <circle\n                        class=\"clockpicker-canvas-bearing\"\n                        cx=\"0\"\n                        cy=\"0\"\n                        r=\"2\"\n                        #bearing\n                      ></circle>\n                    </g>\n                  </svg>\n                </div>\n                <div\n                  class=\"clockpicker-dial clockpicker-hours\"\n                  #hoursPlate\n                  [ngClass]=\"{ 'clockpicker-dial-out': !showHours }\"\n                  [ngStyle]=\"{ visibility: !showHours ? 'hidden' : 'visible' }\"\n                >\n                  <div\n                    *ngFor=\"let tick of hoursTicks\"\n                    class=\"clockpicker-tick\"\n                    style=\"font-size: 140%;\"\n                    [ngStyle]=\"{ left: tick.left + 'px', top: tick.top + 'px' }\"\n                    id=\"{{ tick.hour }}\"\n                  >\n                    {{ tick.hour }}\n                  </div>\n                </div>\n                <div\n                  class=\"clockpicker-dial clockpicker-minutes\"\n                  #minutesPlate\n                  [ngClass]=\"{ 'clockpicker-dial-out': showHours }\"\n                  [ngStyle]=\"{ visibility: showHours ? 'hidden' : 'visible' }\"\n                >\n                  <div\n                    *ngFor=\"let tick of minutesTicks\"\n                    class=\"clockpicker-tick\"\n                    style=\"font-size: 120%;\"\n                    [ngStyle]=\"{ left: tick.left + 'px', top: tick.top + 'px' }\"\n                  >\n                    {{ tick.min }}\n                  </div>\n                </div>\n              </div>\n              <div class=\"clockpicker-am-pm-block\" *ngIf=\"twelvehour\">\n                <button\n                  type=\"button\"\n                  mdbBtn\n                  floating=\"true\"\n                  flat=\"true\"\n                  mdbWavesEffect\n                  class=\"clockpicker-button am-button\"\n                  [ngClass]=\"{ active: selectedHours.ampm == 'AM' }\"\n                  (click)=\"setAmPm('AM')\"\n                >\n                  AM\n                </button>\n\n                <button\n                  type=\"button\"\n                  mdbBtn\n                  floating=\"true\"\n                  flat=\"true\"\n                  mdbWavesEffect\n                  class=\"clockpicker-button pm-button white-text\"\n                  [ngClass]=\"{ active: selectedHours.ampm == 'PM' }\"\n                  (click)=\"setAmPm('PM')\"\n                >\n                  PM\n                </button>\n              </div>\n            </div>\n            <div class=\"picker__footer\">\n              <button\n                type=\"button\"\n                *ngIf=\"buttonLabel\"\n                mdbBtn\n                flat=\"true\"\n                mdbWavesEffect\n                class=\"clockpicker-button\"\n                (click)=\"closeBtnClicked()\"\n              >\n                {{ buttonLabel }}\n              </button>\n              <button\n                type=\"button\"\n                *ngIf=\"!buttonLabel\"\n                mdbBtn\n                flat=\"true\"\n                mdbWavesEffect\n                class=\"clockpicker-button\"\n                (click)=\"closeBtnClicked()\"\n              >\n                Done\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    providers: [TIME_PIRCKER_VALUE_ACCESSOT],
                    styles: [".mdb-color.lighten-5{background-color:#d0d6e2!important}.mdb-color.lighten-4{background-color:#b1bace!important}.mdb-color.lighten-3{background-color:#929fba!important}.mdb-color.lighten-2{background-color:#7283a7!important}.mdb-color.lighten-1{background-color:#59698d!important}.mdb-color{background-color:#45526e!important}.mdb-color-text{color:#45526e!important}.rgba-mdb-color-slight,.rgba-mdb-color-slight:after{background-color:rgba(69,82,110,.1)}.rgba-mdb-color-light,.rgba-mdb-color-light:after{background-color:rgba(69,82,110,.3)}.rgba-mdb-color-strong,.rgba-mdb-color-strong:after{background-color:rgba(69,82,110,.7)}.mdb-color.darken-1{background-color:#3b465e!important}.mdb-color.darken-2{background-color:#2e3951!important}.mdb-color.darken-3{background-color:#1c2a48!important}.mdb-color.darken-4{background-color:#1c2331!important}.red.lighten-5{background-color:#ffebee!important}.red.lighten-4{background-color:#ffcdd2!important}.red.lighten-3{background-color:#ef9a9a!important}.red.lighten-2{background-color:#e57373!important}.red.lighten-1{background-color:#ef5350!important}.red{background-color:#f44336!important}.red-text{color:#f44336!important}.rgba-red-slight,.rgba-red-slight:after{background-color:rgba(244,67,54,.1)}.rgba-red-light,.rgba-red-light:after{background-color:rgba(244,67,54,.3)}.rgba-red-strong,.rgba-red-strong:after{background-color:rgba(244,67,54,.7)}.red.darken-1{background-color:#e53935!important}.red.darken-2{background-color:#d32f2f!important}.red.darken-3{background-color:#c62828!important}.red.darken-4{background-color:#b71c1c!important}.red.accent-1{background-color:#ff8a80!important}.red.accent-2{background-color:#ff5252!important}.red.accent-3{background-color:#ff1744!important}.red.accent-4{background-color:#d50000!important}.pink.lighten-5{background-color:#fce4ec!important}.pink.lighten-4{background-color:#f8bbd0!important}.pink.lighten-3{background-color:#f48fb1!important}.pink.lighten-2{background-color:#f06292!important}.pink.lighten-1{background-color:#ec407a!important}.pink{background-color:#e91e63!important}.pink-text{color:#e91e63!important}.rgba-pink-slight,.rgba-pink-slight:after{background-color:rgba(233,30,99,.1)}.rgba-pink-light,.rgba-pink-light:after{background-color:rgba(233,30,99,.3)}.rgba-pink-strong,.rgba-pink-strong:after{background-color:rgba(233,30,99,.7)}.pink.darken-1{background-color:#d81b60!important}.pink.darken-2{background-color:#c2185b!important}.pink.darken-3{background-color:#ad1457!important}.pink.darken-4{background-color:#880e4f!important}.pink.accent-1{background-color:#ff80ab!important}.pink.accent-2{background-color:#ff4081!important}.pink.accent-3{background-color:#f50057!important}.pink.accent-4{background-color:#c51162!important}.purple.lighten-5{background-color:#f3e5f5!important}.purple.lighten-4{background-color:#e1bee7!important}.purple.lighten-3{background-color:#ce93d8!important}.purple.lighten-2{background-color:#ba68c8!important}.purple.lighten-1{background-color:#ab47bc!important}.purple{background-color:#9c27b0!important}.purple-text{color:#9c27b0!important}.rgba-purple-slight,.rgba-purple-slight:after{background-color:rgba(156,39,176,.1)}.rgba-purple-light,.rgba-purple-light:after{background-color:rgba(156,39,176,.3)}.rgba-purple-strong,.rgba-purple-strong:after{background-color:rgba(156,39,176,.7)}.purple.darken-1{background-color:#8e24aa!important}.purple.darken-2{background-color:#7b1fa2!important}.purple.darken-3{background-color:#6a1b9a!important}.purple.darken-4{background-color:#4a148c!important}.purple.accent-1{background-color:#ea80fc!important}.purple.accent-2{background-color:#e040fb!important}.purple.accent-3{background-color:#d500f9!important}.purple.accent-4{background-color:#a0f!important}.deep-purple.lighten-5{background-color:#ede7f6!important}.deep-purple.lighten-4{background-color:#d1c4e9!important}.deep-purple.lighten-3{background-color:#b39ddb!important}.deep-purple.lighten-2{background-color:#9575cd!important}.deep-purple.lighten-1{background-color:#7e57c2!important}.deep-purple{background-color:#673ab7!important}.deep-purple-text{color:#673ab7!important}.rgba-deep-purple-slight,.rgba-deep-purple-slight:after{background-color:rgba(103,58,183,.1)}.rgba-deep-purple-light,.rgba-deep-purple-light:after{background-color:rgba(103,58,183,.3)}.rgba-deep-purple-strong,.rgba-deep-purple-strong:after{background-color:rgba(103,58,183,.7)}.deep-purple.darken-1{background-color:#5e35b1!important}.deep-purple.darken-2{background-color:#512da8!important}.deep-purple.darken-3{background-color:#4527a0!important}.deep-purple.darken-4{background-color:#311b92!important}.deep-purple.accent-1{background-color:#b388ff!important}.deep-purple.accent-2{background-color:#7c4dff!important}.deep-purple.accent-3{background-color:#651fff!important}.deep-purple.accent-4{background-color:#6200ea!important}.indigo.lighten-5{background-color:#e8eaf6!important}.indigo.lighten-4{background-color:#c5cae9!important}.indigo.lighten-3{background-color:#9fa8da!important}.indigo.lighten-2{background-color:#7986cb!important}.indigo.lighten-1{background-color:#5c6bc0!important}.indigo{background-color:#3f51b5!important}.indigo-text{color:#3f51b5!important}.rgba-indigo-slight,.rgba-indigo-slight:after{background-color:rgba(63,81,181,.1)}.rgba-indigo-light,.rgba-indigo-light:after{background-color:rgba(63,81,181,.3)}.rgba-indigo-strong,.rgba-indigo-strong:after{background-color:rgba(63,81,181,.7)}.indigo.darken-1{background-color:#3949ab!important}.indigo.darken-2{background-color:#303f9f!important}.indigo.darken-3{background-color:#283593!important}.indigo.darken-4{background-color:#1a237e!important}.indigo.accent-1{background-color:#8c9eff!important}.indigo.accent-2{background-color:#536dfe!important}.indigo.accent-3{background-color:#3d5afe!important}.indigo.accent-4{background-color:#304ffe!important}.blue.lighten-5{background-color:#e3f2fd!important}.blue.lighten-4{background-color:#bbdefb!important}.blue.lighten-3{background-color:#90caf9!important}.blue.lighten-2{background-color:#64b5f6!important}.blue.lighten-1{background-color:#42a5f5!important}.blue{background-color:#2196f3!important}.blue-text{color:#2196f3!important}.rgba-blue-slight,.rgba-blue-slight:after{background-color:rgba(33,150,243,.1)}.rgba-blue-light,.rgba-blue-light:after{background-color:rgba(33,150,243,.3)}.rgba-blue-strong,.rgba-blue-strong:after{background-color:rgba(33,150,243,.7)}.blue.darken-1{background-color:#1e88e5!important}.blue.darken-2{background-color:#1976d2!important}.blue.darken-3{background-color:#1565c0!important}.blue.darken-4{background-color:#0d47a1!important}.blue.accent-1{background-color:#82b1ff!important}.blue.accent-2{background-color:#448aff!important}.blue.accent-3{background-color:#2979ff!important}.blue.accent-4{background-color:#2962ff!important}.light-blue.lighten-5{background-color:#e1f5fe!important}.light-blue.lighten-4{background-color:#b3e5fc!important}.light-blue.lighten-3{background-color:#81d4fa!important}.light-blue.lighten-2{background-color:#4fc3f7!important}.light-blue.lighten-1{background-color:#29b6f6!important}.light-blue{background-color:#03a9f4!important}.light-blue-text{color:#03a9f4!important}.rgba-light-blue-slight,.rgba-light-blue-slight:after{background-color:rgba(3,169,244,.1)}.rgba-light-blue-light,.rgba-light-blue-light:after{background-color:rgba(3,169,244,.3)}.rgba-light-blue-strong,.rgba-light-blue-strong:after{background-color:rgba(3,169,244,.7)}.light-blue.darken-1{background-color:#039be5!important}.light-blue.darken-2{background-color:#0288d1!important}.light-blue.darken-3{background-color:#0277bd!important}.light-blue.darken-4{background-color:#01579b!important}.light-blue.accent-1{background-color:#80d8ff!important}.light-blue.accent-2{background-color:#40c4ff!important}.light-blue.accent-3{background-color:#00b0ff!important}.light-blue.accent-4{background-color:#0091ea!important}.cyan.lighten-5{background-color:#e0f7fa!important}.cyan.lighten-4{background-color:#b2ebf2!important}.cyan.lighten-3{background-color:#80deea!important}.cyan.lighten-2{background-color:#4dd0e1!important}.cyan.lighten-1{background-color:#26c6da!important}.cyan{background-color:#00bcd4!important}.cyan-text{color:#00bcd4!important}.rgba-cyan-slight,.rgba-cyan-slight:after{background-color:rgba(0,188,212,.1)}.rgba-cyan-light,.rgba-cyan-light:after{background-color:rgba(0,188,212,.3)}.rgba-cyan-strong,.rgba-cyan-strong:after{background-color:rgba(0,188,212,.7)}.cyan.darken-1{background-color:#00acc1!important}.cyan.darken-2{background-color:#0097a7!important}.cyan.darken-3{background-color:#00838f!important}.cyan.darken-4{background-color:#006064!important}.cyan.accent-1{background-color:#84ffff!important}.cyan.accent-2{background-color:#18ffff!important}.cyan.accent-3{background-color:#00e5ff!important}.cyan.accent-4{background-color:#00b8d4!important}.teal.lighten-5{background-color:#e0f2f1!important}.teal.lighten-4{background-color:#b2dfdb!important}.teal.lighten-3{background-color:#80cbc4!important}.teal.lighten-2{background-color:#4db6ac!important}.teal.lighten-1{background-color:#26a69a!important}.teal{background-color:#009688!important}.teal-text{color:#009688!important}.rgba-teal-slight,.rgba-teal-slight:after{background-color:rgba(0,150,136,.1)}.rgba-teal-light,.rgba-teal-light:after{background-color:rgba(0,150,136,.3)}.rgba-teal-strong,.rgba-teal-strong:after{background-color:rgba(0,150,136,.7)}.teal.darken-1{background-color:#00897b!important}.teal.darken-2{background-color:#00796b!important}.teal.darken-3{background-color:#00695c!important}.teal.darken-4{background-color:#004d40!important}.teal.accent-1{background-color:#a7ffeb!important}.teal.accent-2{background-color:#64ffda!important}.teal.accent-3{background-color:#1de9b6!important}.teal.accent-4{background-color:#00bfa5!important}.green.lighten-5{background-color:#e8f5e9!important}.green.lighten-4{background-color:#c8e6c9!important}.green.lighten-3{background-color:#a5d6a7!important}.green.lighten-2{background-color:#81c784!important}.green.lighten-1{background-color:#66bb6a!important}.green{background-color:#4caf50!important}.green-text{color:#4caf50!important}.rgba-green-slight,.rgba-green-slight:after{background-color:rgba(76,175,80,.1)}.rgba-green-light,.rgba-green-light:after{background-color:rgba(76,175,80,.3)}.rgba-green-strong,.rgba-green-strong:after{background-color:rgba(76,175,80,.7)}.green.darken-1{background-color:#43a047!important}.green.darken-2{background-color:#388e3c!important}.green.darken-3{background-color:#2e7d32!important}.green.darken-4{background-color:#1b5e20!important}.green.accent-1{background-color:#b9f6ca!important}.green.accent-2{background-color:#69f0ae!important}.green.accent-3{background-color:#00e676!important}.green.accent-4{background-color:#00c853!important}.light-green.lighten-5{background-color:#f1f8e9!important}.light-green.lighten-4{background-color:#dcedc8!important}.light-green.lighten-3{background-color:#c5e1a5!important}.light-green.lighten-2{background-color:#aed581!important}.light-green.lighten-1{background-color:#9ccc65!important}.light-green{background-color:#8bc34a!important}.light-green-text{color:#8bc34a!important}.rgba-light-green-slight,.rgba-light-green-slight:after{background-color:rgba(139,195,74,.1)}.rgba-light-green-light,.rgba-light-green-light:after{background-color:rgba(139,195,74,.3)}.rgba-light-green-strong,.rgba-light-green-strong:after{background-color:rgba(139,195,74,.7)}.light-green.darken-1{background-color:#7cb342!important}.light-green.darken-2{background-color:#689f38!important}.light-green.darken-3{background-color:#558b2f!important}.light-green.darken-4{background-color:#33691e!important}.light-green.accent-1{background-color:#ccff90!important}.light-green.accent-2{background-color:#b2ff59!important}.light-green.accent-3{background-color:#76ff03!important}.light-green.accent-4{background-color:#64dd17!important}.lime.lighten-5{background-color:#f9fbe7!important}.lime.lighten-4{background-color:#f0f4c3!important}.lime.lighten-3{background-color:#e6ee9c!important}.lime.lighten-2{background-color:#dce775!important}.lime.lighten-1{background-color:#d4e157!important}.lime{background-color:#cddc39!important}.lime-text{color:#cddc39!important}.rgba-lime-slight,.rgba-lime-slight:after{background-color:rgba(205,220,57,.1)}.rgba-lime-light,.rgba-lime-light:after{background-color:rgba(205,220,57,.3)}.rgba-lime-strong,.rgba-lime-strong:after{background-color:rgba(205,220,57,.7)}.lime.darken-1{background-color:#c0ca33!important}.lime.darken-2{background-color:#afb42b!important}.lime.darken-3{background-color:#9e9d24!important}.lime.darken-4{background-color:#827717!important}.lime.accent-1{background-color:#f4ff81!important}.lime.accent-2{background-color:#eeff41!important}.lime.accent-3{background-color:#c6ff00!important}.lime.accent-4{background-color:#aeea00!important}.yellow.lighten-5{background-color:#fffde7!important}.yellow.lighten-4{background-color:#fff9c4!important}.yellow.lighten-3{background-color:#fff59d!important}.yellow.lighten-2{background-color:#fff176!important}.yellow.lighten-1{background-color:#ffee58!important}.yellow{background-color:#ffeb3b!important}.yellow-text{color:#ffeb3b!important}.rgba-yellow-slight,.rgba-yellow-slight:after{background-color:rgba(255,235,59,.1)}.rgba-yellow-light,.rgba-yellow-light:after{background-color:rgba(255,235,59,.3)}.rgba-yellow-strong,.rgba-yellow-strong:after{background-color:rgba(255,235,59,.7)}.yellow.darken-1{background-color:#fdd835!important}.yellow.darken-2{background-color:#fbc02d!important}.yellow.darken-3{background-color:#f9a825!important}.yellow.darken-4{background-color:#f57f17!important}.yellow.accent-1{background-color:#ffff8d!important}.yellow.accent-2{background-color:#ff0!important}.yellow.accent-3{background-color:#ffea00!important}.yellow.accent-4{background-color:#ffd600!important}.amber.lighten-5{background-color:#fff8e1!important}.amber.lighten-4{background-color:#ffecb3!important}.amber.lighten-3{background-color:#ffe082!important}.amber.lighten-2{background-color:#ffd54f!important}.amber.lighten-1{background-color:#ffca28!important}.amber{background-color:#ffc107!important}.amber-text{color:#ffc107!important}.rgba-amber-slight,.rgba-amber-slight:after{background-color:rgba(255,193,7,.1)}.rgba-amber-light,.rgba-amber-light:after{background-color:rgba(255,193,7,.3)}.rgba-amber-strong,.rgba-amber-strong:after{background-color:rgba(255,193,7,.7)}.amber.darken-1{background-color:#ffb300!important}.amber.darken-2{background-color:#ffa000!important}.amber.darken-3{background-color:#ff8f00!important}.amber.darken-4{background-color:#ff6f00!important}.amber.accent-1{background-color:#ffe57f!important}.amber.accent-2{background-color:#ffd740!important}.amber.accent-3{background-color:#ffc400!important}.amber.accent-4{background-color:#ffab00!important}.orange.lighten-5{background-color:#fff3e0!important}.orange.lighten-4{background-color:#ffe0b2!important}.orange.lighten-3{background-color:#ffcc80!important}.orange.lighten-2{background-color:#ffb74d!important}.orange.lighten-1{background-color:#ffa726!important}.orange{background-color:#ff9800!important}.orange-text{color:#ff9800!important}.rgba-orange-slight,.rgba-orange-slight:after{background-color:rgba(255,152,0,.1)}.rgba-orange-light,.rgba-orange-light:after{background-color:rgba(255,152,0,.3)}.rgba-orange-strong,.rgba-orange-strong:after{background-color:rgba(255,152,0,.7)}.orange.darken-1{background-color:#fb8c00!important}.orange.darken-2{background-color:#f57c00!important}.orange.darken-3{background-color:#ef6c00!important}.orange.darken-4{background-color:#e65100!important}.orange.accent-1{background-color:#ffd180!important}.orange.accent-2{background-color:#ffab40!important}.orange.accent-3{background-color:#ff9100!important}.orange.accent-4{background-color:#ff6d00!important}.deep-orange.lighten-5{background-color:#fbe9e7!important}.deep-orange.lighten-4{background-color:#ffccbc!important}.deep-orange.lighten-3{background-color:#ffab91!important}.deep-orange.lighten-2{background-color:#ff8a65!important}.deep-orange.lighten-1{background-color:#ff7043!important}.deep-orange{background-color:#ff5722!important}.deep-orange-text{color:#ff5722!important}.rgba-deep-orange-slight,.rgba-deep-orange-slight:after{background-color:rgba(255,87,34,.1)}.rgba-deep-orange-light,.rgba-deep-orange-light:after{background-color:rgba(255,87,34,.3)}.rgba-deep-orange-strong,.rgba-deep-orange-strong:after{background-color:rgba(255,87,34,.7)}.deep-orange.darken-1{background-color:#f4511e!important}.deep-orange.darken-2{background-color:#e64a19!important}.deep-orange.darken-3{background-color:#d84315!important}.deep-orange.darken-4{background-color:#bf360c!important}.deep-orange.accent-1{background-color:#ff9e80!important}.deep-orange.accent-2{background-color:#ff6e40!important}.deep-orange.accent-3{background-color:#ff3d00!important}.deep-orange.accent-4{background-color:#dd2c00!important}.brown.lighten-5{background-color:#efebe9!important}.brown.lighten-4{background-color:#d7ccc8!important}.brown.lighten-3{background-color:#bcaaa4!important}.brown.lighten-2{background-color:#a1887f!important}.brown.lighten-1{background-color:#8d6e63!important}.brown{background-color:#795548!important}.brown-text{color:#795548!important}.rgba-brown-slight,.rgba-brown-slight:after{background-color:rgba(121,85,72,.1)}.rgba-brown-light,.rgba-brown-light:after{background-color:rgba(121,85,72,.3)}.rgba-brown-strong,.rgba-brown-strong:after{background-color:rgba(121,85,72,.7)}.brown.darken-1{background-color:#6d4c41!important}.brown.darken-2{background-color:#5d4037!important}.brown.darken-3{background-color:#4e342e!important}.brown.darken-4{background-color:#3e2723!important}.blue-grey.lighten-5{background-color:#eceff1!important}.blue-grey.lighten-4{background-color:#cfd8dc!important}.blue-grey.lighten-3{background-color:#b0bec5!important}.blue-grey.lighten-2{background-color:#90a4ae!important}.blue-grey.lighten-1{background-color:#78909c!important}.blue-grey{background-color:#607d8b!important}.blue-grey-text{color:#607d8b!important}.rgba-blue-grey-slight,.rgba-blue-grey-slight:after{background-color:rgba(96,125,139,.1)}.rgba-blue-grey-light,.rgba-blue-grey-light:after{background-color:rgba(96,125,139,.3)}.rgba-blue-grey-strong,.rgba-blue-grey-strong:after{background-color:rgba(96,125,139,.7)}.blue-grey.darken-1{background-color:#546e7a!important}.blue-grey.darken-2{background-color:#455a64!important}.blue-grey.darken-3{background-color:#37474f!important}.blue-grey.darken-4{background-color:#263238!important}.grey.lighten-5{background-color:#fafafa!important}.grey.lighten-4{background-color:#f5f5f5!important}.grey.lighten-3{background-color:#eee!important}.grey.lighten-2{background-color:#e0e0e0!important}.grey.lighten-1{background-color:#bdbdbd!important}.grey{background-color:#9e9e9e!important}.grey-text{color:#9e9e9e!important}.rgba-grey-slight,.rgba-grey-slight:after{background-color:rgba(158,158,158,.1)}.rgba-grey-light,.rgba-grey-light:after{background-color:rgba(158,158,158,.3)}.rgba-grey-strong,.rgba-grey-strong:after{background-color:rgba(158,158,158,.7)}.grey.darken-1{background-color:#757575!important}.grey.darken-2{background-color:#616161!important}.grey.darken-3{background-color:#424242!important}.grey.darken-4{background-color:#212121!important}.black,.picker__list-item:hover{background-color:#000!important}.black-text{color:#000!important}.rgba-black-slight,.rgba-black-slight:after{background-color:rgba(0,0,0,.1)}.rgba-black-light,.rgba-black-light:after{background-color:rgba(0,0,0,.3)}.rgba-black-strong,.rgba-black-strong:after{background-color:rgba(0,0,0,.7)}.picker__list-item,.white{background-color:#fff!important}.clockpicker-display .clockpicker-display-column #click-am.text-primary,.clockpicker-display .clockpicker-display-column #click-pm.text-primary,.clockpicker-display .clockpicker-display-column .clockpicker-span-hours.text-primary,.clockpicker-display .clockpicker-display-column .clockpicker-span-minutes.text-primary,.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-tick,.darktheme .picker__box .picker__date-display .clockpicker-display,.darktheme .picker__box .picker__date-display .clockpicker-display .clockpicker-span-am-pm,.darktheme .picker__box .picker__footer button,.picker--focused .picker__list-item--selected,.picker--time .picker__button--clear:focus,.picker--time .picker__button--clear:focus:before,.picker--time .picker__button--clear:hover,.picker--time .picker__button--clear:hover:before,.picker__date-display,.picker__date-display .clockpicker-display .clockpicker-display-column #click-am.text-primary,.picker__date-display .clockpicker-display .clockpicker-display-column #click-pm.text-primary,.picker__date-display .clockpicker-display .clockpicker-display-column .clockpicker-span-hours.text-primary,.picker__date-display .clockpicker-display .clockpicker-display-column .clockpicker-span-minutes.text-primary,.picker__list-item--selected,.picker__list-item--selected:hover,.white-text{color:#fff!important}.rgba-white-slight,.rgba-white-slight:after{background-color:rgba(255,255,255,.1)}.rgba-white-light,.rgba-white-light:after{background-color:rgba(255,255,255,.3)}.rgba-white-strong,.rgba-white-strong:after{background-color:rgba(255,255,255,.7)}.rgba-stylish-slight{background-color:rgba(62,69,81,.1)}.rgba-stylish-light{background-color:rgba(62,69,81,.3)}.rgba-stylish-strong{background-color:rgba(62,69,81,.7)}.primary-color{background-color:#4285f4!important}.primary-color-dark{background-color:#0d47a1!important}.secondary-color{background-color:#a6c!important}.secondary-color-dark{background-color:#93c!important}.default-color{background-color:#2bbbad!important}.default-color-dark{background-color:#00695c!important}.info-color{background-color:#33b5e5!important}.info-color-dark{background-color:#09c!important}.success-color{background-color:#00c851!important}.success-color-dark{background-color:#007e33!important}.warning-color{background-color:#fb3!important}.warning-color-dark{background-color:#f80!important}.danger-color{background-color:#ff3547!important}.danger-color-dark{background-color:#c00!important}.elegant-color{background-color:#2e2e2e!important}.elegant-color-dark{background-color:#212121!important}.stylish-color{background-color:#4b515d!important}.stylish-color-dark{background-color:#3e4551!important}.unique-color{background-color:#3f729b!important}.unique-color-dark{background-color:#1c2331!important}.special-color{background-color:#37474f!important}.special-color-dark{background-color:#263238!important}.purple-gradient{background:linear-gradient(40deg,#ff6ec4,#7873f5)!important}.peach-gradient{background:linear-gradient(40deg,#ffd86f,#fc6262)!important}.aqua-gradient{background:linear-gradient(40deg,#2096ff,#05ffa3)!important}.blue-gradient{background:linear-gradient(40deg,#45cafc,#303f9f)!important}.purple-gradient-rgba{background:linear-gradient(40deg,rgba(255,110,196,.9),rgba(120,115,245,.9))!important}.peach-gradient-rgba{background:linear-gradient(40deg,rgba(255,216,111,.9),rgba(252,98,98,.9))!important}.aqua-gradient-rgba{background:linear-gradient(40deg,rgba(32,150,255,.9),rgba(5,255,163,.9))!important}.blue-gradient-rgba{background:linear-gradient(40deg,rgba(69,202,252,.9),rgba(48,63,159,.9))!important}.dark-grey-text,.dark-grey-text:focus,.dark-grey-text:hover{color:#4f4f4f!important}.hoverable{box-shadow:none;transition:.55s ease-in-out}.hoverable:hover{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);transition:.55s ease-in-out}.z-depth-0{box-shadow:none!important}.z-depth-1{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)!important}.z-depth-1-half{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)!important}.z-depth-2{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)!important}.z-depth-3{box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19)!important}.z-depth-4{box-shadow:0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)!important}.z-depth-5{box-shadow:0 27px 24px 0 rgba(0,0,0,.2),0 40px 77px 0 rgba(0,0,0,.22)!important}.disabled,:disabled{pointer-events:none!important}a{cursor:pointer;text-decoration:none;color:#0275d8;transition:.2s ease-in-out}a:hover{text-decoration:none;color:#014c8c;transition:.2s ease-in-out}a.disabled:hover,a:disabled:hover{color:#0275d8}a:not([href]):not([tabindex]),a:not([href]):not([tabindex]):focus,a:not([href]):not([tabindex]):hover{color:inherit;text-decoration:none}.picker__input{cursor:default}.picker__input.picker__input--active{border-color:#0089ec}.picker{font-size:1rem;text-align:center;line-height:1.2;color:#000;position:absolute;z-index:10000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none/*!\n   * Default mobile-first, responsive styling for pickadate.js\n   * Demo: http://amsul.github.io/pickadate.js\n   */}.picker .picker__holder{width:100%;overflow-y:auto;overflow-scrolling:touch;position:fixed;transition:background .15s ease-out,top .15s;-webkit-backface-visibility:hidden;backface-visibility:hidden}.picker .picker__frame,.picker .picker__holder{bottom:0;left:0;right:0;top:100%}.picker .picker__frame{position:absolute;margin:0 auto;min-width:16rem;max-width:20.3125rem;width:18.75rem;max-height:21.875rem;opacity:0;transition:.15s ease-out}@media (min-height:40.125em){.picker .picker__frame{margin-bottom:7.5%}}.picker .picker__frame .picker__wrap{display:table;width:100%;height:100%}.picker .picker__box{background:#fff;display:table-cell;vertical-align:middle}@media (min-height:28.875em){.picker .picker__frame{overflow:visible;top:auto;bottom:-100%;max-height:80%}.picker .picker__frame .picker__wrap{display:block}.picker .picker__box{display:block;border:1px solid #777;border-top-color:#898989;border-bottom-width:0;border-radius:5px 5px 0 0;box-shadow:0 .75rem 2.25rem 1rem rgba(0,0,0,.24)}}.picker--opened .picker__holder{top:0;background:rgba(0,0,0,.32);zoom:1;transition:background .15s ease-out}.picker--opened .picker__frame{top:0;opacity:1}@media (min-height:35.875em){.picker--opened .picker__frame{top:10%;bottom:auto}}.datepicker.picker__input.picker__input--active,.timepicker.picker__input.picker__input--active{border-bottom:1px solid #e3f2fd}.picker__list{list-style:none;padding:.75em 0 4.2em;margin:0}.picker__list-item{border-bottom:1px solid #ddd;border-top:1px solid #ddd;margin-bottom:-1px;position:relative;padding:.75em 1.25em}@media (min-height:46.75em){.picker__list-item{padding:.5em 1em}}.picker__list-item:hover{cursor:pointer;background:#b1dcfb;border-color:#0089ec;z-index:10}.picker__list-item--highlighted{border-color:#0089ec;z-index:10}.picker--focused .picker__list-item--highlighted,.picker__list-item--highlighted:hover{cursor:pointer;color:#000;background:#b1dcfb}.picker--focused .picker__list-item--selected,.picker__list-item--selected,.picker__list-item--selected:hover{background:#0089ec;z-index:10}.picker--focused .picker__list-item--disabled,.picker__list-item--disabled,.picker__list-item--disabled:hover{background:#f5f5f5;border-color:#ddd;color:#ddd;cursor:default;z-index:auto}.picker--time .picker__button--clear{display:block;width:80%;margin:1em auto 0;padding:1em 1.25em;background:0 0;border:0;font-weight:500;font-size:.67em;text-align:center;text-transform:uppercase;color:#666}.picker--time .picker__button--clear:focus,.picker--time .picker__button--clear:hover{color:#000;background:#b1dcfb;border-color:#e20;cursor:pointer;outline:0}.picker--time .picker__button--clear:before{top:-.25em;color:#666;font-size:1.25em;font-weight:700}.picker--time .picker__frame{min-width:16rem;max-width:20rem}.picker--time .picker__box{font-size:1em;background:#f2f2f2;padding:0}@media (min-height:40.125em){.picker--time .picker__box{margin-bottom:5em}}/*!\n * ClockPicker v0.0.7 for jQuery (http://weareoutman.github.io/clockpicker/)\n * Copyright 2014 Wang Shenwei.\n * Licensed under MIT (https://github.com/weareoutman/clockpicker/blob/gh-pages/LICENSE)\n *\n * Further modified\n * Copyright 2015 Ching Yaw Hao.\n *\n * Bootstrap v3.1.1 (http://getbootstrap.com)\n * Copyright 2011-2014 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */.picker__date-display{text-align:center;background-color:#4285f4;padding-bottom:.9375rem;font-weight:300;margin-bottom:1rem}.picker__date-display .clockpicker-display{vertical-align:middle;display:inline-block;margin:auto;height:5.3125rem;font-size:4.375rem;padding:.625rem .625rem 0;color:#b2dfdb}.picker__date-display .clockpicker-display .clockpicker-display-column{float:left}.picker__date-display .clockpicker-display .clockpicker-display-column #click-am.text-primary,.picker__date-display .clockpicker-display .clockpicker-display-column #click-pm.text-primary,.picker__date-display .clockpicker-display .clockpicker-display-column .clockpicker-span-hours.text-primary,.picker__date-display .clockpicker-display .clockpicker-display-column .clockpicker-span-minutes.text-primary{-webkit-animation-name:pulse;animation-name:pulse}.picker__date-display .clockpicker-display .clockpicker-display-column #click-am,.picker__date-display .clockpicker-display .clockpicker-display-column #click-pm{cursor:pointer}.picker__date-display .clockpicker-display .clockpicker-display-am-pm{padding-left:.3125rem;vertical-align:bottom;height:5.3125rem}.picker__date-display .clockpicker-display .clockpicker-display-am-pm .clockpicker-span-am-pm{display:inline-block;font-size:1.4375rem;line-height:1.5625rem;color:#b2dfdb}.picker__date-display .clockpicker-display .clockpicker-span-hours,.picker__date-display .clockpicker-display .clockpicker-span-minutes{-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-fill-mode:both;animation-fill-mode:both;transition:color .5s;cursor:pointer}.clockpicker-display{text-align:center;vertical-align:middle;display:inline-block;margin:auto;height:5.3125rem;font-size:4.375rem;padding:.625rem .625rem 0;color:#b2dfdb}.clockpicker-display .clockpicker-display-column{float:left}.clockpicker-display .clockpicker-display-column #click-am.text-primary,.clockpicker-display .clockpicker-display-column #click-pm.text-primary,.clockpicker-display .clockpicker-display-column .clockpicker-span-hours.text-primary,.clockpicker-display .clockpicker-display-column .clockpicker-span-minutes.text-primary{-webkit-animation-name:pulse;animation-name:pulse}.clockpicker-display .clockpicker-display-column #click-am,.clockpicker-display .clockpicker-display-column #click-pm{cursor:pointer}.clockpicker-display .clockpicker-display-am-pm{padding-left:.3125rem;vertical-align:bottom;height:5.3125rem}.clockpicker-display .clockpicker-display-am-pm .clockpicker-span-am-pm{display:inline-block;font-size:1.4375rem;line-height:1.5625rem;color:#b2dfdb}.clockpicker-display .clockpicker-span-hours,.clockpicker-display .clockpicker-span-minutes{-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-fill-mode:both;animation-fill-mode:both;cursor:pointer;transition:color .5s}@-webkit-keyframes pulse{from,to{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}50%{-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}}@keyframes pulse{from,to{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}50%{-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}}.clockpicker-moving{cursor:move}.clockpicker-plate{background-color:#eee;border-radius:50%;width:16.875rem;height:16.875rem;overflow:visible;position:relative;margin:1.25rem auto auto;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.clockpicker-plate .clockpicker-canvas,.clockpicker-plate .clockpicker-dial{width:16.875rem;height:16.875rem;position:absolute;left:-1px;top:-1px}.clockpicker-plate .clockpicker-dial{transition:transform 350ms,opacity 350ms,-webkit-transform 350ms}.clockpicker-plate .clockpicker-dial .clockpicker-tick{border-radius:50%;color:#666;line-height:2.5rem;text-align:center;width:2.5rem;height:2.5rem;position:absolute;cursor:pointer;transition:background-color .3s;background-color:rgba(0,150,136,0)}.clockpicker-plate .clockpicker-dial .clockpicker-tick.active,.clockpicker-plate .clockpicker-dial .clockpicker-tick:hover{background-color:rgba(0,150,136,.25)}.clockpicker-plate .clockpicker-minutes{visibility:hidden}.clockpicker-plate .clockpicker-dial-out{opacity:0}.clockpicker-plate .clockpicker-hours.clockpicker-dial-out{-webkit-transform:scale(1.2,1.2);transform:scale(1.2,1.2)}.clockpicker-plate .clockpicker-minutes.clockpicker-dial-out{-webkit-transform:scale(.8,.8);transform:scale(.8,.8)}.clockpicker-canvas{transition:opacity .3s}.clockpicker-canvas line{stroke:rgba(0,150,136,.25);stroke-width:1}.clockpicker-canvas-out{opacity:.25}.clockpicker-canvas-bearing{stroke:none;fill:rgba(0,77,64,.75)}.clockpicker-canvas-fg{stroke:none;fill:rgba(0,77,64,0)}.clockpicker-canvas-fg.active{fill:rgba(0,77,64,.5)}.clockpicker-canvas-bg{stroke:none;fill:rgba(0,150,136,.25)}.clockpicker-canvas-bg-trans{fill:rgba(0,150,136,.25)}.clockpicker-am-pm-block{margin-top:-.625rem;width:100%;height:3.125rem}.clockpicker-am-pm-block .clockpicker-button.am-button{height:2.8125rem;width:2.8125rem;float:left;border:0}.clockpicker-am-pm-block .clockpicker-button.pm-button{height:2.8125rem;width:2.8125rem;float:right;border:0}.btn-floating.btn-flat{color:#fff;padding:0;background:#4285f4}.btn-floating.btn-flat:hover{box-shadow:none}.btn-floating.btn-flat:focus,.btn-floating.btn-flat:hover{background-color:#5a95f5!important}.btn-floating.btn-flat.active{background-color:#0b51c5!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)}.picker__footer{width:100%}.picker__footer .clockpicker-button{margin:.9375rem auto auto;background-color:transparent;text-transform:uppercase}.picker__footer .clockpicker-button:focus{background-color:transparent}.picker__footer .clockpicker-button:active{background-color:rgba(0,150,136,.25)}.darktheme .picker__box{background-color:#212121}.darktheme .picker__box .picker__calendar-container .clockpicker-plate,.darktheme .picker__box .picker__date-display{background-color:transparent}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-tick{background-color:rgba(255,64,129,0)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-tick.active,.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-tick:hover{background-color:rgba(255,64,129,.25)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas line{stroke:rgba(255,64,129,.25)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas-bearing{fill:#fff}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas-fg{fill:rgba(255,64,129,0)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas-fg.active{fill:rgba(255,64,129,.5)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas-bg{fill:rgba(255,64,129,.25)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas-bg-trans{fill:rgba(255,64,129,.5)}.darktheme .picker__box .picker__footer .clockpicker-button:active{background-color:rgba(255,64,129,.25)}.hand-move .clockpicker-tick{cursor:all-scroll!important}.clockpicker-button{cursor:pointer;transition:.3s}.clockpicker-button:hover{background-color:rgba(0,150,136,.25)}.darktheme .clockpicker-button:hover{background-color:rgba(255,64,129,.25)}.validate-success.ng-valid .timepicker{border-bottom:1px solid #00c851!important;box-shadow:0 1px 0 0 #00c851!important}.validate-success.ng-valid .tp label{color:#00c851!important}.form-submitted .validate-error.ng-invalid .timepicker,.validate-error.ng-invalid.ng-touched .timepicker{border-bottom:1px solid #f44336!important;box-shadow:0 1px 0 0 #f44336!important}.form-submitted .validate-error.ng-invalid .tp label,.validate-error.ng-invalid.ng-touched .tp label{color:#f44336!important}.timepicker{height:32px!important}.md-outline input:focus>label.active{color:#4285f4}.md-outline .timepicker{height:36px!important}.clockpicker-button.am-button,.clockpicker-button.pm-button{color:#fff!important}"]
                }] }
    ];
    /** @nocollapse */
    ClockPickerComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    ClockPickerComponent.propDecorators = {
        hoursPlate: [{ type: ViewChild, args: ['hoursPlate', { static: true },] }],
        minutesPlate: [{ type: ViewChild, args: ['minutesPlate', { static: true },] }],
        plate: [{ type: ViewChild, args: ['plate', { static: true },] }],
        svg: [{ type: ViewChild, args: ['svg', { static: true },] }],
        g: [{ type: ViewChild, args: ['g', { static: true },] }],
        hand: [{ type: ViewChild, args: ['hand', { static: true },] }],
        fg: [{ type: ViewChild, args: ['fg', { static: true },] }],
        bg: [{ type: ViewChild, args: ['bg', { static: true },] }],
        bearing: [{ type: ViewChild, args: ['bearing', { static: true },] }],
        twelvehour: [{ type: Input }],
        darktheme: [{ type: Input }],
        placeholder: [{ type: Input }],
        label: [{ type: Input }],
        duration: [{ type: Input }],
        showClock: [{ type: Input }],
        buttonLabel: [{ type: Input }],
        disabled: [{ type: Input }],
        tabIndex: [{ type: Input }],
        outlineInput: [{ type: Input }],
        timeChanged: [{ type: Output }],
        ontouchmove: [{ type: HostListener, args: ['touchmove', ['$event'],] }],
        onMouseMove: [{ type: HostListener, args: ['mousemove', ['$event'],] }]
    };
    return ClockPickerComponent;
}());
export { ClockPickerComponent };
if (false) {
    /** @type {?} */
    ClockPickerComponent.prototype.hoursPlate;
    /** @type {?} */
    ClockPickerComponent.prototype.minutesPlate;
    /** @type {?} */
    ClockPickerComponent.prototype.plate;
    /** @type {?} */
    ClockPickerComponent.prototype.svg;
    /** @type {?} */
    ClockPickerComponent.prototype.g;
    /** @type {?} */
    ClockPickerComponent.prototype.hand;
    /** @type {?} */
    ClockPickerComponent.prototype.fg;
    /** @type {?} */
    ClockPickerComponent.prototype.bg;
    /** @type {?} */
    ClockPickerComponent.prototype.bearing;
    /** @type {?} */
    ClockPickerComponent.prototype.twelvehour;
    /** @type {?} */
    ClockPickerComponent.prototype.darktheme;
    /** @type {?} */
    ClockPickerComponent.prototype.placeholder;
    /** @type {?} */
    ClockPickerComponent.prototype.label;
    /** @type {?} */
    ClockPickerComponent.prototype.duration;
    /** @type {?} */
    ClockPickerComponent.prototype.showClock;
    /** @type {?} */
    ClockPickerComponent.prototype.buttonLabel;
    /** @type {?} */
    ClockPickerComponent.prototype.disabled;
    /** @type {?} */
    ClockPickerComponent.prototype.tabIndex;
    /** @type {?} */
    ClockPickerComponent.prototype.outlineInput;
    /** @type {?} */
    ClockPickerComponent.prototype.timeChanged;
    /** @type {?} */
    ClockPickerComponent.prototype.isMobile;
    /** @type {?} */
    ClockPickerComponent.prototype.touchDevice;
    /** @type {?} */
    ClockPickerComponent.prototype.showHours;
    /** @type {?} */
    ClockPickerComponent.prototype.elements;
    /** @type {?} */
    ClockPickerComponent.prototype.elementNumber;
    /** @type {?} */
    ClockPickerComponent.prototype.dialRadius;
    /** @type {?} */
    ClockPickerComponent.prototype.outerRadius;
    /** @type {?} */
    ClockPickerComponent.prototype.innerRadius;
    /** @type {?} */
    ClockPickerComponent.prototype.tickRadius;
    /** @type {?} */
    ClockPickerComponent.prototype.diameter;
    /** @type {?} */
    ClockPickerComponent.prototype.isBrowser;
    /** @type {?} */
    ClockPickerComponent.prototype.hoursTicks;
    /** @type {?} */
    ClockPickerComponent.prototype.minutesTicks;
    /** @type {?} */
    ClockPickerComponent.prototype.selectedHours;
    /** @type {?} */
    ClockPickerComponent.prototype.endHours;
    /** @type {?} */
    ClockPickerComponent.prototype.touchSupported;
    /** @type {?} */
    ClockPickerComponent.prototype.mousedownEvent;
    /** @type {?} */
    ClockPickerComponent.prototype.mousemoveEvent;
    /** @type {?} */
    ClockPickerComponent.prototype.mouseupEvent;
    /** @type {?} */
    ClockPickerComponent.prototype.isMouseDown;
    /** @type {?} */
    ClockPickerComponent.prototype.onChangeCb;
    /** @type {?} */
    ClockPickerComponent.prototype.onTouchedCb;
    /** @type {?} */
    ClockPickerComponent.prototype.elem;
    /** @type {?} */
    ClockPickerComponent.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3RpbWUtcGlja2VyL3RpbWVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBR0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUVwRCxNQUFNLEtBQU8sMkJBQTJCLEdBQVE7SUFDOUMsT0FBTyxFQUFFLGlCQUFpQjs7SUFFMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLGNBQU0sT0FBQSxvQkFBb0IsRUFBcEIsQ0FBb0IsRUFBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNaO0FBRUQ7SUEwREUsOEJBQ1MsSUFBZ0IsRUFDaEIsUUFBbUIsRUFDTCxVQUFrQjtRQUh6QyxpQkFtQkM7UUFsQlEsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBeENuQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFDekIsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLGFBQVEsR0FBRyxHQUFHLENBQUM7UUFDZixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFFcEIsZ0JBQVcsR0FBeUIsSUFB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TCxLQUFLOzJCQUNMLEtBQUs7NEJBQ0wsS0FBSzs4QkFDTCxLQUFLOzJCQUNMLEtBQUs7MkJBQ0wsS0FBSzsrQkFDTCxLQUFLOzhCQUVMLE1BQU07OEJBZ0ROLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7OEJBSXBDLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBNlh2QywyQkFBQztDQUFBLEFBaGRELElBZ2RDO1NBemNZLG9CQUFvQjs7O0lBRS9CLDBDQUF5RTs7SUFDekUsNENBQTZFOztJQUU3RSxxQ0FBK0Q7O0lBQy9ELG1DQUEyRDs7SUFDM0QsaUNBQXVEOztJQUN2RCxvQ0FBNkQ7O0lBQzdELGtDQUF5RDs7SUFDekQsa0NBQXlEOztJQUN6RCx1Q0FBbUU7O0lBRW5FLDBDQUE0Qjs7SUFDNUIseUNBQTJCOztJQUMzQiwyQ0FBa0M7O0lBQ2xDLHFDQUFvQjs7SUFDcEIsd0NBQXdCOztJQUN4Qix5Q0FBMkI7O0lBQzNCLDJDQUE2Qjs7SUFDN0Isd0NBQTBCOztJQUMxQix3Q0FBdUI7O0lBQ3ZCLDRDQUE4Qjs7SUFFOUIsMkNBQXlFOztJQUV6RSx3Q0FBcUI7O0lBQ3JCLDJDQUFrRTs7SUFDbEUseUNBQWtCOztJQUVsQix3Q0FBaUU7O0lBQ2pFLDZDQUEwQjs7SUFFMUIsMENBQWlCOztJQUNqQiwyQ0FBa0I7O0lBQ2xCLDJDQUFpQjs7SUFDakIsMENBQWdCOztJQUNoQix3Q0FBK0I7O0lBQy9CLHlDQUF1Qjs7SUFFdkIsMENBQXFCOztJQUNyQiw0Q0FBdUI7O0lBQ3ZCLDZDQUFzRDs7SUFDdEQsd0NBQWM7O0lBRWQsOENBQStDOztJQUMvQyw4Q0FBK0U7O0lBQy9FLDhDQUE4RTs7SUFDOUUsNENBQXlFOztJQUN6RSwyQ0FBb0I7O0lBMFlwQiwwQ0FBd0M7O0lBQ3hDLDJDQUFtQzs7SUF4WWpDLG9DQUF1Qjs7SUFDdkIsd0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlckNvbnRlbnRDaGVja2VkLFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFBMQVRGT1JNX0lELFxyXG4gIFJlbmRlcmVyMixcclxuICBWaWV3Q2hpbGQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuZXhwb3J0IGNvbnN0IFRJTUVfUElSQ0tFUl9WQUxVRV9BQ0NFU1NPVDogYW55ID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdXNlLWJlZm9yZS1kZWNsYXJlXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2xvY2tQaWNrZXJDb21wb25lbnQpLFxyXG4gIG11bHRpOiB0cnVlLFxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtZGItdGltZS1waWNrZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90aW1lLXBpY2tlci1tb2R1bGUuc2NzcyddLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgcHJvdmlkZXJzOiBbVElNRV9QSVJDS0VSX1ZBTFVFX0FDQ0VTU09UXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIENsb2NrUGlja2VyQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlckNvbnRlbnRDaGVja2VkIHtcclxuICBAVmlld0NoaWxkKCdob3Vyc1BsYXRlJywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIGhvdXJzUGxhdGU6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnbWludXRlc1BsYXRlJywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIG1pbnV0ZXNQbGF0ZTogRWxlbWVudFJlZjtcclxuXHJcbiAgQFZpZXdDaGlsZCgncGxhdGUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwdWJsaWMgcGxhdGU6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnc3ZnJywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIHN2ZzogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdnJywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIGc6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnaGFuZCcsIHsgc3RhdGljOiB0cnVlIH0pIHB1YmxpYyBoYW5kOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2ZnJywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIGZnOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2JnJywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIGJnOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2JlYXJpbmcnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwdWJsaWMgYmVhcmluZzogRWxlbWVudFJlZjtcclxuXHJcbiAgQElucHV0KCkgdHdlbHZlaG91ciA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGRhcmt0aGVtZSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBTdHJpbmcgPSAnJztcclxuICBASW5wdXQoKSBsYWJlbCA9ICcnO1xyXG4gIEBJbnB1dCgpIGR1cmF0aW9uID0gMzAwO1xyXG4gIEBJbnB1dCgpIHNob3dDbG9jayA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBASW5wdXQoKSB0YWJJbmRleDogYW55O1xyXG4gIEBJbnB1dCgpIG91dGxpbmVJbnB1dCA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KCkgdGltZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gIGlzTW9iaWxlOiBhbnkgPSBudWxsO1xyXG4gIHRvdWNoRGV2aWNlID0gJ29udG91Y2hzdGFydCcgaW4gKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCBhcyBhbnkpO1xyXG4gIHNob3dIb3VycyA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjbG9ja3BpY2tlcicpO1xyXG4gIHB1YmxpYyBlbGVtZW50TnVtYmVyOiBhbnk7XHJcblxyXG4gIGRpYWxSYWRpdXMgPSAxMzU7XHJcbiAgb3V0ZXJSYWRpdXMgPSAxMTA7XHJcbiAgaW5uZXJSYWRpdXMgPSA4MDtcclxuICB0aWNrUmFkaXVzID0gMjA7XHJcbiAgZGlhbWV0ZXIgPSB0aGlzLmRpYWxSYWRpdXMgKiAyO1xyXG4gIGlzQnJvd3NlcjogYW55ID0gZmFsc2U7XHJcblxyXG4gIGhvdXJzVGlja3M6IGFueSA9IFtdO1xyXG4gIG1pbnV0ZXNUaWNrczogYW55ID0gW107XHJcbiAgc2VsZWN0ZWRIb3VyczogYW55ID0geyBoOiAnMTInLCBtOiAnMDAnLCBhbXBtOiAnQU0nIH07XHJcbiAgZW5kSG91cnMgPSAnJztcclxuXHJcbiAgdG91Y2hTdXBwb3J0ZWQ6IGFueSA9ICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdztcclxuICBtb3VzZWRvd25FdmVudDogYW55ID0gJ21vdXNlZG93bicgKyAodGhpcy50b3VjaFN1cHBvcnRlZCA/ICcgdG91Y2hzdGFydCcgOiAnJyk7XHJcbiAgbW91c2Vtb3ZlRXZlbnQ6IGFueSA9ICdtb3VzZW1vdmUnICsgKHRoaXMudG91Y2hTdXBwb3J0ZWQgPyAnIHRvdWNobW92ZScgOiAnJyk7XHJcbiAgbW91c2V1cEV2ZW50OiBhbnkgPSAnbW91c2V1cCcgKyAodGhpcy50b3VjaFN1cHBvcnRlZCA/ICcgdG91Y2hlbmQnIDogJycpO1xyXG4gIGlzTW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGVsZW06IEVsZW1lbnRSZWYsXHJcbiAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IHN0cmluZ1xyXG4gICkge1xyXG4gICAgdGhpcy5pc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKTtcclxuICAgIHJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCwgJ2NsaWNrJywgKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuc2hvd0Nsb2NrICYmXHJcbiAgICAgICAgZXZlbnQudGFyZ2V0ICYmXHJcbiAgICAgICAgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQgIT09IGV2ZW50LnRhcmdldCAmJlxyXG4gICAgICAgICF0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMuc2hvd0Nsb2NrID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BpY2tlcl9faG9sZGVyJykpIHtcclxuICAgICAgICB0aGlzLnNob3dDbG9jayA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3RvdWNobW92ZScsIFsnJGV2ZW50J10pIG9udG91Y2htb3ZlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMucm90YXRlVGltZVBpY2tlckFycm93KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbW92ZScsIFsnJGV2ZW50J10pIG9uTW91c2VNb3ZlKGV2ZW50OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLmlzTW91c2VEb3duKSB7XHJcbiAgICAgIHRoaXMucm90YXRlVGltZVBpY2tlckFycm93KGV2ZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5nZW5lcmF0ZVRpY2soKTtcclxuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xyXG4gICAgICB0aGlzLmlzTW9iaWxlID0gL2lQaG9uZXxpUGFkfGlQb2R8QW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBbJ21vdXNlZG93bicsICdtb3VzZXVwJ10uZm9yRWFjaCgoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihcclxuICAgICAgICB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvY2twaWNrZXItcGxhdGUnKSxcclxuICAgICAgICBldmVudCxcclxuICAgICAgICAoZXY6IGFueSkgPT4ge1xyXG4gICAgICAgICAgaWYgKGV2ZW50ID09PSAnbW91c2Vkb3duJykge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlZG93bihldiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmlzTW91c2VEb3duID0gdHJ1ZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNNb3VzZURvd24gPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcclxuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xyXG4gICAgICAvLyBGaXggZm9yIHZpc2libGUgZGF0ZSAvIHRpbWUgcGlja2VyIGlucHV0IHdoZW4gcGlja2VyIHBsYXRlIGlzIHZpc2libGUuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qgb3BlbmVkUGlja2VyOiBhbnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGlja2VyLS1vcGVuZWQnKTtcclxuICAgICAgICBjb25zdCBhbGxQaWNrZXJzOiBhbnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGlja2VyJyk7XHJcbiAgICAgICAgYWxsUGlja2Vycy5mb3JFYWNoKChlbGVtZW50OiBhbnkpID0+IHtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZWxlbWVudCwgJ3otaW5kZXgnLCAnMCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUob3BlbmVkUGlja2VyLCAnei1pbmRleCcsICcxMDAwJyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByb3RhdGVUaW1lUGlja2VyQXJyb3coZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnY2xvY2twaWNrZXItZGlhbCcpKSB7XHJcbiAgICAgICh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xvY2twaWNrZXItdGljaycpIGFzIGFueSkuZm9yRWFjaChcclxuICAgICAgICAoZWxlbWVudDogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGVsZW1lbnQsICdiYWNrZ3JvdW5kLWNvbG9yJywgJ3JnYmEoMCwgMTUwLCAxMzYsIDAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMubW91c2Vkb3duKGV2ZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoZWNrRHJhdygpIHtcclxuICAgIGxldCB2YWx1ZTtcclxuICAgIGNvbnN0IGlzSG91cnMgPSB0aGlzLnNob3dIb3VycztcclxuICAgIGlmIChpc0hvdXJzKSB7XHJcbiAgICAgIHZhbHVlID0gcGFyc2VJbnQodGhpcy5zZWxlY3RlZEhvdXJzLmgsIDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWUgPSBwYXJzZUludCh0aGlzLnNlbGVjdGVkSG91cnMubSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdW5pdCA9IE1hdGguUEkgLyAoaXNIb3VycyA/IDYgOiAzMCksXHJcbiAgICAgIHJhZGlhbiA9IHZhbHVlICogdW5pdCxcclxuICAgICAgcmFkaXVzID0gaXNIb3VycyAmJiB2YWx1ZSA+IDAgJiYgdmFsdWUgPCAxMyA/IHRoaXMuaW5uZXJSYWRpdXMgOiB0aGlzLm91dGVyUmFkaXVzLFxyXG4gICAgICB4ZCA9IE1hdGguc2luKHJhZGlhbikgKiByYWRpdXMsXHJcbiAgICAgIHlkID0gLU1hdGguY29zKHJhZGlhbikgKiByYWRpdXM7XHJcbiAgICB0aGlzLnNldEhhbmQoeGQsIHlkLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBtb3VzZWRvd24oZTogYW55LCBzcGFjZT86IGFueSkge1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5wbGF0ZS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICBpc1RvdWNoID0gL150b3VjaC8udGVzdChlLnR5cGUpLFxyXG4gICAgICB4MCA9IG9mZnNldC5sZWZ0ICsgdGhpcy5kaWFsUmFkaXVzLFxyXG4gICAgICB5MCA9IG9mZnNldC50b3AgKyB0aGlzLmRpYWxSYWRpdXMsXHJcbiAgICAgIGR4ID0gKGlzVG91Y2ggPyBlLnRvdWNoZXNbMF0gOiBlKS5jbGllbnRYIC0geDAsXHJcbiAgICAgIGR5ID0gKGlzVG91Y2ggPyBlLnRvdWNoZXNbMF0gOiBlKS5jbGllbnRZIC0geTAsXHJcbiAgICAgIHogPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG4gICAgbGV0IG1vdmVkID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBzcGFjZSAmJlxyXG4gICAgICAoeiA8IHRoaXMub3V0ZXJSYWRpdXMgLSB0aGlzLnRpY2tSYWRpdXMgfHwgeiA+IHRoaXMub3V0ZXJSYWRpdXMgKyB0aGlzLnRpY2tSYWRpdXMpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICBpZiAodGhpcy5zaG93SG91cnMpIHtcclxuICAgICAgdGhpcy5zZXRIYW5kKGR4LCBkeSwgdHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldEhhbmQoZHgsIGR5LCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbW91c2Vtb3ZlRXZlbnRNZXRob2QgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgY29uc3QgeCA9IGV2ZW50LmNsaWVudFggLSB4MCxcclxuICAgICAgICB5ID0gZXZlbnQuY2xpZW50WSAtIHkwO1xyXG4gICAgICBpZiAoIW1vdmVkICYmIHggPT09IGR4ICYmIHkgPT09IGR5KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIG1vdmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIHRoaXMuc2V0SGFuZCh4LCB5LCBmYWxzZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG1vdXNldXBFdmVudE1ldGhvZCA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5tb3VzZW1vdmVFdmVudCwgbW91c2Vtb3ZlRXZlbnRNZXRob2QpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0IHggPSBldmVudC5jbGllbnRYIC0geDAsXHJcbiAgICAgICAgeSA9IGV2ZW50LmNsaWVudFggLSB5MDtcclxuICAgICAgaWYgKChzcGFjZSB8fCBtb3ZlZCkgJiYgeCA9PT0gZHggJiYgeSA9PT0gZHkpIHtcclxuICAgICAgICB0aGlzLnNldEhhbmQoeCwgeSwgZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2hvd01pbnV0ZXNDbG9jaygpO1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMubW91c2V1cEV2ZW50LCBtb3VzZXVwRXZlbnRNZXRob2QpO1xyXG4gICAgfTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodGhpcy5tb3VzZW1vdmVFdmVudCwgbW91c2Vtb3ZlRXZlbnRNZXRob2QpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXBFdmVudE1ldGhvZCk7XHJcbiAgfVxyXG5cclxuICBoaWRlS2V5Ym9hcmQoKSB7XHJcbiAgICAvLyB0aGlzIHNldCB0aW1lb3V0IG5lZWRlZCBmb3IgY2FzZSB3aGVuIGhpZGVLZXlib3JhZFxyXG4gICAgLy8gaXMgY2FsbGVkIGluc2lkZSBvZiAnb25mb2N1cycgZXZlbnQgaGFuZGxlclxyXG4gICAgdHJ5IHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgLy8gY3JlYXRpbmcgdGVtcCBmaWVsZFxyXG4gICAgICAgIC8vIGNvbnN0IGZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LCBmaWVsZCk7XHJcbiAgICAgICAgY29uc3QgaW5wdXRSZWZlcmVuY2UgPSB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5sYXN0RWxlbWVudENoaWxkO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGlucHV0UmVmZXJlbmNlLCAndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoaW5wdXRSZWZlcmVuY2UsICd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGlucHV0UmVmZXJlbmNlLCAnb3BhY2l0eScsICcwJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShpbnB1dFJlZmVyZW5jZSwgJy13ZWJraXQtdXNlci1tb2RpZnknLCAncmVhZC13cml0ZS1wbGFpbnRleHQtb25seScpO1xyXG4gICAgICAgIC8vIC8vIGhpZGluZyB0ZW1wIGZpZWxkIGZyb20gcGVvcGxlcyBleWVzXHJcbiAgICAgICAgLy8gLy8gLXdlYmtpdC11c2VyLW1vZGlmeSBpcyBuZXNzZXNhcnkgZm9yIEFuZHJvaWQgNC54XHJcbiAgICAgICAgLy8gYWRkaW5nIG9uZm9jdXMgZXZlbnQgaGFuZGxlciBmb3Igb3V0IHRlbXAgZmllbGRcclxuICAgICAgICBmaWVsZC5vbmZvY3VzID0gKCkgPT4ge1xyXG4gICAgICAgICAgLy8gdGhpcyB0aW1lb3V0IG9mIDIwMG1zIGlzIG5lc3Nhc2FyeSBmb3IgQW5kcm9pZCAyLjMueFxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZmllbGQsICdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCwgZmllbGQpO1xyXG4gICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuZm9jdXMoKTtcclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICB9LCAwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIGZvY3VzaW5nIGl0XHJcbiAgICAgICAgZmllbGQuZm9jdXMoKTtcclxuICAgICAgfSwgMCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge31cclxuICB9XHJcblxyXG4gIG9wZW5CdG5DbGlja2VkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zaG93Q2xvY2sgPSB0cnVlO1xyXG4gICAgdGhpcy5zaG93SG91cnMgPSB0cnVlO1xyXG4gICAgdGhpcy5jaGVja0RyYXcoKTtcclxuICAgIGlmICh0aGlzLmlzTW9iaWxlKSB7XHJcbiAgICAgIHRoaXMuaGlkZUtleWJvYXJkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjbG9zZUJ0bkNsaWNrZWQoKSB7XHJcbiAgICBjb25zdCBoID0gdGhpcy5zZWxlY3RlZEhvdXJzLmg7XHJcbiAgICBjb25zdCBtID0gdGhpcy5zZWxlY3RlZEhvdXJzLm07XHJcbiAgICBjb25zdCBhbXBtID0gdGhpcy5zZWxlY3RlZEhvdXJzLmFtcG07XHJcblxyXG4gICAgaWYgKHRoaXMudHdlbHZlaG91cikge1xyXG4gICAgICB0aGlzLmVuZEhvdXJzID0gaCArICc6JyArIG0gKyBhbXBtO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbmRIb3VycyA9IGggKyAnOicgKyBtO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vbkNoYW5nZUNiKHRoaXMuZW5kSG91cnMpO1xyXG4gICAgdGhpcy5vblRvdWNoZWRDYigpO1xyXG4gICAgdGhpcy50aW1lQ2hhbmdlZC5lbWl0KHRoaXMuZW5kSG91cnMpO1xyXG4gICAgdGhpcy5zaG93Q2xvY2sgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNsZWFyVGltZUlucHV0KCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZEhvdXJzID0geyBoOiAnMTInLCBtOiAnMDAnLCBhbXBtOiAnQU0nIH07XHJcbiAgICB0aGlzLmVuZEhvdXJzID0gJyc7XHJcbiAgfVxyXG5cclxuICBzZXRIb3VyKGhvdXI6IFN0cmluZykge1xyXG4gICAgdGhpcy5zZWxlY3RlZEhvdXJzLmggPSBob3VyO1xyXG4gIH1cclxuXHJcbiAgc2V0TWludXRlKG1pbjogU3RyaW5nKSB7XHJcbiAgICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRIb3Vycy5tID0gbWluO1xyXG4gIH1cclxuXHJcbiAgc2V0QW1QbShhbXBtOiBTdHJpbmcpIHtcclxuICAgIC8vIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgdGhpcy5zZWxlY3RlZEhvdXJzLmFtcG0gPSBhbXBtO1xyXG4gIH1cclxuXHJcbiAgc2hvd0hvdXJzQ2xvY2soKSB7XHJcbiAgICB0aGlzLnNob3dIb3VycyA9IHRydWU7XHJcbiAgICB0aGlzLmNoZWNrRHJhdygpO1xyXG4gIH1cclxuXHJcbiAgc2hvd01pbnV0ZXNDbG9jaygpIHtcclxuICAgIHRoaXMuc2hvd0hvdXJzID0gZmFsc2U7XHJcbiAgICB0aGlzLmNoZWNrRHJhdygpO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVUaWNrKCkge1xyXG4gICAgaWYgKHRoaXMudHdlbHZlaG91cikge1xyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDEzOyBpKyspIHtcclxuICAgICAgICBjb25zdCByYWRpYW4gPSAoaSAvIDYpICogTWF0aC5QSTtcclxuICAgICAgICBjb25zdCByYWRpdXMgPSB0aGlzLm91dGVyUmFkaXVzO1xyXG5cclxuICAgICAgICBjb25zdCB0aWNrID0ge1xyXG4gICAgICAgICAgaG91cjogaSxcclxuICAgICAgICAgIGxlZnQ6IHRoaXMuZGlhbFJhZGl1cyArIE1hdGguc2luKHJhZGlhbikgKiByYWRpdXMgLSB0aGlzLnRpY2tSYWRpdXMsXHJcbiAgICAgICAgICB0b3A6IHRoaXMuZGlhbFJhZGl1cyAtIE1hdGguY29zKHJhZGlhbikgKiByYWRpdXMgLSB0aGlzLnRpY2tSYWRpdXMsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmhvdXJzVGlja3MucHVzaCh0aWNrKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgcmFkaWFuID0gKGkgLyA2KSAqIE1hdGguUEk7XHJcbiAgICAgICAgY29uc3QgaW5uZXIgPSBpID4gMCAmJiBpIDwgMTM7XHJcbiAgICAgICAgY29uc3QgcmFkaXVzID0gaW5uZXIgPyB0aGlzLmlubmVyUmFkaXVzIDogdGhpcy5vdXRlclJhZGl1cztcclxuICAgICAgICBsZXQgaDtcclxuXHJcbiAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgIGggPSAnMCcgKyBpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGggPSBpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGljayA9IHtcclxuICAgICAgICAgIGhvdXI6IGgsXHJcbiAgICAgICAgICBsZWZ0OiB0aGlzLmRpYWxSYWRpdXMgKyBNYXRoLnNpbihyYWRpYW4pICogcmFkaXVzIC0gdGhpcy50aWNrUmFkaXVzLFxyXG4gICAgICAgICAgdG9wOiB0aGlzLmRpYWxSYWRpdXMgLSBNYXRoLmNvcyhyYWRpYW4pICogcmFkaXVzIC0gdGhpcy50aWNrUmFkaXVzLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ob3Vyc1RpY2tzLnB1c2godGljayk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDYwOyBpICs9IDUpIHtcclxuICAgICAgY29uc3QgcmFkaWFuID0gKGkgLyAzMCkgKiBNYXRoLlBJO1xyXG4gICAgICBsZXQgbWluID0gaS50b1N0cmluZygpO1xyXG4gICAgICBpZiAoaSA8IDEwKSB7XHJcbiAgICAgICAgbWluID0gJzAnICsgaS50b1N0cmluZygpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHRpY2sgPSB7XHJcbiAgICAgICAgbWluOiBtaW4sXHJcbiAgICAgICAgbGVmdDogdGhpcy5kaWFsUmFkaXVzICsgTWF0aC5zaW4ocmFkaWFuKSAqIHRoaXMub3V0ZXJSYWRpdXMgLSB0aGlzLnRpY2tSYWRpdXMsXHJcbiAgICAgICAgdG9wOiB0aGlzLmRpYWxSYWRpdXMgLSBNYXRoLmNvcyhyYWRpYW4pICogdGhpcy5vdXRlclJhZGl1cyAtIHRoaXMudGlja1JhZGl1cyxcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5taW51dGVzVGlja3MucHVzaCh0aWNrKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEhhbmQoeDogYW55LCB5OiBhbnksIHJvdW5kQnk1OiBhbnkpIHtcclxuICAgIGxldCByYWRpYW4gPSBNYXRoLmF0YW4yKHgsIC15KTtcclxuICAgIGNvbnN0IGlzSG91cnMgPSB0aGlzLnNob3dIb3VycztcclxuICAgIGNvbnN0IHVuaXQgPSBNYXRoLlBJIC8gKGlzSG91cnMgfHwgcm91bmRCeTUgPyA2IDogMzApO1xyXG4gICAgY29uc3QgeiA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcclxuICAgIGNvbnN0IGlubmVyID0gaXNIb3VycyAmJiB6IDwgKHRoaXMub3V0ZXJSYWRpdXMgKyB0aGlzLmlubmVyUmFkaXVzKSAvIDI7XHJcbiAgICBsZXQgcmFkaXVzID0gaW5uZXIgPyB0aGlzLmlubmVyUmFkaXVzIDogdGhpcy5vdXRlclJhZGl1cztcclxuICAgIGxldCB2YWx1ZTtcclxuXHJcbiAgICBpZiAodGhpcy5zaG93SG91cnMpIHtcclxuICAgICAgdmFsdWUgPSBwYXJzZUludCh0aGlzLnNlbGVjdGVkSG91cnMuaCwgMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWx1ZSA9IHBhcnNlSW50KHRoaXMuc2VsZWN0ZWRIb3Vycy5tLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50d2VsdmVob3VyKSB7XHJcbiAgICAgIHJhZGl1cyA9IHRoaXMub3V0ZXJSYWRpdXM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJhZGlhbiA8IDApIHtcclxuICAgICAgcmFkaWFuID0gTWF0aC5QSSAqIDIgKyByYWRpYW47XHJcbiAgICB9XHJcblxyXG4gICAgdmFsdWUgPSBNYXRoLnJvdW5kKHJhZGlhbiAvIHVuaXQpO1xyXG4gICAgcmFkaWFuID0gdmFsdWUgKiB1bml0O1xyXG5cclxuICAgIGlmICh0aGlzLnR3ZWx2ZWhvdXIpIHtcclxuICAgICAgaWYgKGlzSG91cnMpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09IDApIHtcclxuICAgICAgICAgIHZhbHVlID0gMTI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChyb3VuZEJ5NSkge1xyXG4gICAgICAgICAgdmFsdWUgKj0gNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSA2MCkge1xyXG4gICAgICAgICAgdmFsdWUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGlzSG91cnMpIHtcclxuICAgICAgICB2YWx1ZSA9ICFpbm5lciA/IHZhbHVlICsgMTIgOiB2YWx1ZTtcclxuICAgICAgICB2YWx1ZSA9IHZhbHVlID09PSAyNCA/IDAgOiB2YWx1ZTtcclxuICAgICAgICB2YWx1ZSA9IGlubmVyICYmIHZhbHVlID09PSAwID8gMTIgOiB2YWx1ZTtcclxuICAgICAgICB2YWx1ZSA9ICFpbm5lciAmJiB2YWx1ZSA9PT0gMTIgPyAwIDogdmFsdWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHJvdW5kQnk1KSB7XHJcbiAgICAgICAgICB2YWx1ZSAqPSA1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsdWUgPT09IDYwKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzSG91cnMpIHtcclxuICAgICAgdGhpcy5mZy5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2xvY2twaWNrZXItY2FudmFzLWZnJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodmFsdWUgJSA1ID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5mZy5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2xvY2twaWNrZXItY2FudmFzLWZnJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5mZy5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2xvY2twaWNrZXItY2FudmFzLWZnIGFjdGl2ZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY3gxID0gTWF0aC5zaW4ocmFkaWFuKSAqIChyYWRpdXMgLSB0aGlzLnRpY2tSYWRpdXMpLFxyXG4gICAgICBjeTEgPSAtTWF0aC5jb3MocmFkaWFuKSAqIChyYWRpdXMgLSB0aGlzLnRpY2tSYWRpdXMpLFxyXG4gICAgICBjeDIgPSBNYXRoLnNpbihyYWRpYW4pICogcmFkaXVzLFxyXG4gICAgICBjeTIgPSAtTWF0aC5jb3MocmFkaWFuKSAqIHJhZGl1cztcclxuXHJcbiAgICB0aGlzLmhhbmQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3gyJywgY3gxKTtcclxuICAgIHRoaXMuaGFuZC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgneTInLCBjeTEpO1xyXG4gICAgdGhpcy5iZy5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnY3gnLCBjeDIpO1xyXG4gICAgdGhpcy5iZy5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnY3knLCBjeTIpO1xyXG4gICAgdGhpcy5mZy5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnY3gnLCBjeDIpO1xyXG4gICAgdGhpcy5mZy5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnY3knLCBjeTIpO1xyXG5cclxuICAgIGlmICh0aGlzLnNob3dIb3Vycykge1xyXG4gICAgICBpZiAodmFsdWUgPCAxMCkge1xyXG4gICAgICAgIHRoaXMuc2V0SG91cignMCcgKyB2YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNldEhvdXIodmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XHJcbiAgICAgICAgdGhpcy5zZXRNaW51dGUoJzAnICsgdmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZXRNaW51dGUodmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9mZnNldChvYmo6IGFueSkge1xyXG4gICAgbGV0IGxlZnQgPSAwLFxyXG4gICAgICB0b3AgPSAwO1xyXG5cclxuICAgIGlmIChvYmoub2Zmc2V0UGFyZW50KSB7XHJcbiAgICAgIGRvIHtcclxuICAgICAgICBsZWZ0ICs9IG9iai5vZmZzZXRMZWZ0O1xyXG4gICAgICAgIHRvcCArPSBvYmoub2Zmc2V0VG9wO1xyXG4gICAgICB9IHdoaWxlICgob2JqID0gb2JqLm9mZnNldFBhcmVudCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgbGVmdCwgdG9wIH07XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZUNiOiAoXzogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XHJcbiAgb25Ub3VjaGVkQ2I6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLmVuZEhvdXJzID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25DaGFuZ2VDYiA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWRDYiA9IGZuO1xyXG4gIH1cclxufVxyXG4iXX0=