/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { ToastPackage } from './toast.config';
/**
 * Reference to a toast opened via the Toast service.
 * @template T
 */
var /**
 * Reference to a toast opened via the Toast service.
 * @template T
 */
ToastRef = /** @class */ (function () {
    function ToastRef(_overlayRef) {
        this._overlayRef = _overlayRef;
        /**
         * Subject for notifying the user that the toast has finished closing.
         */
        this._afterClosed = new Subject();
        this._activate = new Subject();
        this._manualClose = new Subject();
    }
    /**
     * @return {?}
     */
    ToastRef.prototype.manualClose = /**
     * @return {?}
     */
    function () {
        this._manualClose.next();
        this._manualClose.complete();
    };
    /**
     * @return {?}
     */
    ToastRef.prototype.manualClosed = /**
     * @return {?}
     */
    function () {
        return this._manualClose.asObservable();
    };
    /**
     * Close the toast.
     */
    /**
     * Close the toast.
     * @return {?}
     */
    ToastRef.prototype.close = /**
     * Close the toast.
     * @return {?}
     */
    function () {
        this._overlayRef.detach();
        this._afterClosed.next();
        this._afterClosed.complete();
    };
    /** Gets an observable that is notified when the toast is finished closing. */
    /**
     * Gets an observable that is notified when the toast is finished closing.
     * @return {?}
     */
    ToastRef.prototype.afterClosed = /**
     * Gets an observable that is notified when the toast is finished closing.
     * @return {?}
     */
    function () {
        return this._afterClosed.asObservable();
    };
    /**
     * @return {?}
     */
    ToastRef.prototype.isInactive = /**
     * @return {?}
     */
    function () {
        return this._activate.isStopped;
    };
    /**
     * @return {?}
     */
    ToastRef.prototype.activate = /**
     * @return {?}
     */
    function () {
        this._activate.next();
        this._activate.complete();
    };
    /** Gets an observable that is notified when the toast has started opening. */
    /**
     * Gets an observable that is notified when the toast has started opening.
     * @return {?}
     */
    ToastRef.prototype.afterActivate = /**
     * Gets an observable that is notified when the toast has started opening.
     * @return {?}
     */
    function () {
        return this._activate.asObservable();
    };
    return ToastRef;
}());
/**
 * Reference to a toast opened via the Toast service.
 * @template T
 */
export { ToastRef };
if (false) {
    /**
     * The instance of component opened into the toast.
     * @type {?}
     */
    ToastRef.prototype.componentInstance;
    /**
     * Subject for notifying the user that the toast has finished closing.
     * @type {?}
     * @private
     */
    ToastRef.prototype._afterClosed;
    /**
     * @type {?}
     * @private
     */
    ToastRef.prototype._activate;
    /**
     * @type {?}
     * @private
     */
    ToastRef.prototype._manualClose;
    /**
     * @type {?}
     * @private
     */
    ToastRef.prototype._overlayRef;
}
/**
 * Custom injector type specifically for instantiating components with a toast.
 */
var /**
 * Custom injector type specifically for instantiating components with a toast.
 */
ToastInjector = /** @class */ (function () {
    function ToastInjector(_toastPackage, _parentInjector) {
        this._toastPackage = _toastPackage;
        this._parentInjector = _parentInjector;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    ToastInjector.prototype.get = /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    function (token, notFoundValue) {
        if (token === ToastPackage && this._toastPackage) {
            return this._toastPackage;
        }
        // tslint:disable-next-line: deprecation
        return this._parentInjector.get(token, notFoundValue);
    };
    return ToastInjector;
}());
/**
 * Custom injector type specifically for instantiating components with a toast.
 */
export { ToastInjector };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ToastInjector.prototype._toastPackage;
    /**
     * @type {?}
     * @private
     */
    ToastInjector.prototype._parentInjector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuaW5qZWN0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL2FsZXJ0cy90b2FzdC90b2FzdC5pbmplY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUczQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBSzlDOzs7OztJQVNFLGtCQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTs7OztRQUpuQyxpQkFBWSxHQUFpQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzNDLGNBQVMsR0FBaUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUN4QyxpQkFBWSxHQUFpQixJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRUwsQ0FBQzs7OztJQUUvQyw4QkFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELCtCQUFZOzs7SUFBWjtRQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsd0JBQUs7Ozs7SUFBTDtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCw4RUFBOEU7Ozs7O0lBQzlFLDhCQUFXOzs7O0lBQVg7UUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUMsQ0FBQzs7OztJQUVELDZCQUFVOzs7SUFBVjtRQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELDJCQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsOEVBQThFOzs7OztJQUM5RSxnQ0FBYTs7OztJQUFiO1FBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQyxBQS9DRCxJQStDQzs7Ozs7Ozs7Ozs7SUE3Q0MscUNBQXFCOzs7Ozs7SUFHckIsZ0NBQW1EOzs7OztJQUNuRCw2QkFBZ0Q7Ozs7O0lBQ2hELGdDQUFtRDs7Ozs7SUFFdkMsK0JBQStCOzs7OztBQXlDN0M7Ozs7SUFDRSx1QkFBb0IsYUFBMkIsRUFBVSxlQUF5QjtRQUE5RCxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFVO0lBQUcsQ0FBQzs7Ozs7O0lBRXRGLDJCQUFHOzs7OztJQUFILFVBQUksS0FBVSxFQUFFLGFBQW1CO1FBQ2pDLElBQUksS0FBSyxLQUFLLFlBQVksSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2hELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUMzQjtRQUNELHdDQUF3QztRQUN4QyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQzs7Ozs7Ozs7OztJQVRhLHNDQUFtQzs7Ozs7SUFBRSx3Q0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBPdmVybGF5UmVmIH0gZnJvbSAnLi4vb3ZlcmxheS9vdmVybGF5LXJlZic7XG5pbXBvcnQgeyBUb2FzdFBhY2thZ2UgfSBmcm9tICcuL3RvYXN0LmNvbmZpZyc7XG5cbi8qKlxuICogUmVmZXJlbmNlIHRvIGEgdG9hc3Qgb3BlbmVkIHZpYSB0aGUgVG9hc3Qgc2VydmljZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFRvYXN0UmVmPFQ+IHtcbiAgLyoqIFRoZSBpbnN0YW5jZSBvZiBjb21wb25lbnQgb3BlbmVkIGludG8gdGhlIHRvYXN0LiAqL1xuICBjb21wb25lbnRJbnN0YW5jZTogVDtcblxuICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoZSB1c2VyIHRoYXQgdGhlIHRvYXN0IGhhcyBmaW5pc2hlZCBjbG9zaW5nLiAqL1xuICBwcml2YXRlIF9hZnRlckNsb3NlZDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBfYWN0aXZhdGU6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgX21hbnVhbENsb3NlOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWYpIHt9XG5cbiAgbWFudWFsQ2xvc2UoKSB7XG4gICAgdGhpcy5fbWFudWFsQ2xvc2UubmV4dCgpO1xuICAgIHRoaXMuX21hbnVhbENsb3NlLmNvbXBsZXRlKCk7XG4gIH1cblxuICBtYW51YWxDbG9zZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fbWFudWFsQ2xvc2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2UgdGhlIHRvYXN0LlxuICAgKi9cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICB0aGlzLl9hZnRlckNsb3NlZC5uZXh0KCk7XG4gICAgdGhpcy5fYWZ0ZXJDbG9zZWQuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGFuIG9ic2VydmFibGUgdGhhdCBpcyBub3RpZmllZCB3aGVuIHRoZSB0b2FzdCBpcyBmaW5pc2hlZCBjbG9zaW5nLiAqL1xuICBhZnRlckNsb3NlZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9hZnRlckNsb3NlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGlzSW5hY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2YXRlLmlzU3RvcHBlZDtcbiAgfVxuXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMuX2FjdGl2YXRlLm5leHQoKTtcbiAgICB0aGlzLl9hY3RpdmF0ZS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqIEdldHMgYW4gb2JzZXJ2YWJsZSB0aGF0IGlzIG5vdGlmaWVkIHdoZW4gdGhlIHRvYXN0IGhhcyBzdGFydGVkIG9wZW5pbmcuICovXG4gIGFmdGVyQWN0aXZhdGUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIH1cbn1cblxuLyoqIEN1c3RvbSBpbmplY3RvciB0eXBlIHNwZWNpZmljYWxseSBmb3IgaW5zdGFudGlhdGluZyBjb21wb25lbnRzIHdpdGggYSB0b2FzdC4gKi9cbmV4cG9ydCBjbGFzcyBUb2FzdEluamVjdG9yIGltcGxlbWVudHMgSW5qZWN0b3Ige1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90b2FzdFBhY2thZ2U6IFRvYXN0UGFja2FnZSwgcHJpdmF0ZSBfcGFyZW50SW5qZWN0b3I6IEluamVjdG9yKSB7fVxuXG4gIGdldCh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlPzogYW55KTogYW55IHtcbiAgICBpZiAodG9rZW4gPT09IFRvYXN0UGFja2FnZSAmJiB0aGlzLl90b2FzdFBhY2thZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLl90b2FzdFBhY2thZ2U7XG4gICAgfVxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICByZXR1cm4gdGhpcy5fcGFyZW50SW5qZWN0b3IuZ2V0KHRva2VuLCBub3RGb3VuZFZhbHVlKTtcbiAgfVxufVxuIl19