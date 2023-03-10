(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'rxjs'], factory) :
    (factory((global.ngxWow = {}),global.ng.core,global.ng.common,global.rxjs));
}(this, (function (exports,i0,common,rxjs) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Main module of the library
     */
    var NgwWowModule = /** @class */ (function () {
        function NgwWowModule() {
        }
        NgwWowModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ]
                    },] },
        ];
        return NgwWowModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Configuration for the NgwWowService service.
     */
    var  /**
     * Configuration for the NgwWowService service.
     */
    NgwWowConfig = /** @class */ (function () {
        function NgwWowConfig() {
            /**
             * Class name that reveals the hidden box when user scrolls.
             */
            this.boxClass = 'wow';
            /**
             * Class name that triggers the CSS animations ('animated' by default for the animate.css library)
             */
            this.animateClass = 'animated';
            /**
             * Define the distance between the bottom of browser viewport and the top of hidden box.
             * When the user scrolls and reach this distance the hidden box is revealed.
             */
            this.offset = 0;
            /**
             * Turn on/off WOW.js on mobile devices.
             */
            this.mobile = true;
            /**
             * Consatantly check for new WOW elements on the page.
             */
            this.live = true;
        }
        return NgwWowConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Service to interact with the window object.
     */
    var WindowService = /** @class */ (function () {
        function WindowService() {
        }
        Object.defineProperty(WindowService.prototype, "nativeWindow", {
            get: /**
             * @return {?}
             */
            function () {
                return _window();
            },
            enumerable: true,
            configurable: true
        });
        WindowService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root',
                    },] },
        ];
        /** @nocollapse */ WindowService.ngInjectableDef = i0.defineInjectable({ factory: function WindowService_Factory() { return new WindowService(); }, token: WindowService, providedIn: "root" });
        return WindowService;
    }());
    /**
     * @return {?}
     */
    function _window() {
        // Return the global native browser window object
        return typeof window !== 'undefined' ? window : undefined;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgwWowService = /** @class */ (function () {
        function NgwWowService(windowService) {
            // Observable  source
            this.itemRevealedSource = new rxjs.Subject();
            // Observable  stream
            this.itemRevealed$ = this.itemRevealedSource.asObservable();
            this.window = windowService.nativeWindow;
        }
        /**
         * @param {?=} config
         * @return {?}
         */
        NgwWowService.prototype.init = /**
         * @param {?=} config
         * @return {?}
         */
        function (config) {
            var _this = this;
            if (this.window) {
                // For Angular Universal suport
                var /** @type {?} */ wowConfig = config || {};
                // Set callback hook:
                wowConfig.callback = function () { return _this.itemRevealedSource.next(); };
                // Initializes the library
                new WOW(wowConfig).init();
            }
        };
        NgwWowService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root',
                    },] },
        ];
        /** @nocollapse */
        NgwWowService.ctorParameters = function () { return [
            { type: WindowService, },
        ]; };
        /** @nocollapse */ NgwWowService.ngInjectableDef = i0.defineInjectable({ factory: function NgwWowService_Factory() { return new NgwWowService(i0.inject(WindowService)); }, token: NgwWowService, providedIn: "root" });
        return NgwWowService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NgwWowModule = NgwWowModule;
    exports.NgwWowConfig = NgwWowConfig;
    exports.WindowService = WindowService;
    exports.NgwWowService = NgwWowService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-wow.umd.js.map
