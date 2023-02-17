/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class MdbTableService {
    constructor() {
        this._dataSource = [];
        this._dataSourceChanged = new Subject();
    }
    /**
     * @param {?} newRow
     * @return {?}
     */
    addRow(newRow) {
        this.getDataSource().push(newRow);
    }
    /**
     * @param {?} index
     * @param {?} row
     * @return {?}
     */
    addRowAfter(index, row) {
        this.getDataSource().splice(index, 0, row);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeRow(index) {
        this.getDataSource().splice(index, 1);
    }
    /**
     * @return {?}
     */
    rowRemoved() {
        // tslint:disable-next-line: deprecation
        /** @type {?} */
        const rowRemoved = Observable.create((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            observer.next(true);
        }));
        return rowRemoved;
    }
    /**
     * @return {?}
     */
    removeLastRow() {
        this.getDataSource().pop();
    }
    /**
     * @return {?}
     */
    getDataSource() {
        return this._dataSource;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    setDataSource(data) {
        this._dataSource = data;
        this._dataSourceChanged.next(this.getDataSource());
    }
    /**
     * @return {?}
     */
    dataSourceChange() {
        return this._dataSourceChanged;
    }
    /**
     * @param {?} searchKey
     * @return {?}
     */
    filterLocalDataBy(searchKey) {
        return this.getDataSource().filter((/**
         * @param {?} obj
         * @return {?}
         */
        (obj) => {
            return Object.keys(obj).some((/**
             * @param {?} key
             * @return {?}
             */
            (key) => {
                if (obj[key]) {
                    return obj[key]
                        .toString()
                        .toLowerCase()
                        .includes(searchKey);
                }
            }));
        }));
    }
    /**
     * @param {?} searchKey
     * @return {?}
     */
    searchLocalDataBy(searchKey) {
        if (!searchKey) {
            return this.getDataSource();
        }
        if (searchKey) {
            return this.filterLocalDataBy(searchKey.toLowerCase());
        }
    }
    /**
     * @param {?} searchKey
     * @return {?}
     */
    searchDataObservable(searchKey) {
        // tslint:disable-next-line: deprecation
        /** @type {?} */
        const observable = Observable.create((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            observer.next(this.searchLocalDataBy(searchKey));
        }));
        return observable;
    }
}
MdbTableService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
MdbTableService.ctorParameters = () => [];
/** @nocollapse */ MdbTableService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function MdbTableService_Factory() { return new MdbTableService(); }, token: MdbTableService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    MdbTableService.prototype._dataSource;
    /**
     * @type {?}
     * @private
     */
    MdbTableService.prototype._dataSourceChanged;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXRhYmxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvZnJlZS90YWJsZXMvc2VydmljZXMvbWRiLXRhYmxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSzNDLE1BQU0sT0FBTyxlQUFlO0lBRzFCO1FBRlEsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsdUJBQWtCLEdBQWlCLElBQUksT0FBTyxFQUFPLENBQUM7SUFDL0MsQ0FBQzs7Ozs7SUFFaEIsTUFBTSxDQUFDLE1BQVc7UUFDaEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFFRCxXQUFXLENBQUMsS0FBYSxFQUFFLEdBQVE7UUFDakMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7OztJQUVELFVBQVU7OztjQUVGLFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTTs7OztRQUFDLENBQUMsUUFBYSxFQUFFLEVBQUU7WUFDckQsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDLEVBQUM7UUFDRixPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDOzs7O0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxJQUFTO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDckQsQ0FBQzs7OztJQUVELGdCQUFnQjtRQUNkLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBRUQsaUJBQWlCLENBQUMsU0FBYztRQUM5QixPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxHQUFlLEVBQUUsRUFBRTtZQUNyRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSTs7OztZQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7Z0JBQ3hDLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNaLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQzt5QkFDWixRQUFRLEVBQUU7eUJBQ1YsV0FBVyxFQUFFO3lCQUNiLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDeEI7WUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxTQUFjO1FBQzlCLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUM3QjtRQUVELElBQUksU0FBUyxFQUFFO1lBQ2IsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDOzs7OztJQUVELG9CQUFvQixDQUFDLFNBQWM7OztjQUUzQixVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU07Ozs7UUFBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO1lBQ3JELFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsQ0FBQyxFQUFDO1FBQ0YsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQzs7O1lBMUVGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7Ozs7OztJQUVDLHNDQUE4Qjs7Ozs7SUFDOUIsNkNBQThEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTWRiVGFibGVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogYW55ID0gW107XG4gIHByaXZhdGUgX2RhdGFTb3VyY2VDaGFuZ2VkOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBhZGRSb3cobmV3Um93OiBhbnkpIHtcbiAgICB0aGlzLmdldERhdGFTb3VyY2UoKS5wdXNoKG5ld1Jvdyk7XG4gIH1cblxuICBhZGRSb3dBZnRlcihpbmRleDogbnVtYmVyLCByb3c6IGFueSkge1xuICAgIHRoaXMuZ2V0RGF0YVNvdXJjZSgpLnNwbGljZShpbmRleCwgMCwgcm93KTtcbiAgfVxuXG4gIHJlbW92ZVJvdyhpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5nZXREYXRhU291cmNlKCkuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIHJvd1JlbW92ZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgIGNvbnN0IHJvd1JlbW92ZWQgPSBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xuICAgICAgb2JzZXJ2ZXIubmV4dCh0cnVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcm93UmVtb3ZlZDtcbiAgfVxuXG4gIHJlbW92ZUxhc3RSb3coKSB7XG4gICAgdGhpcy5nZXREYXRhU291cmNlKCkucG9wKCk7XG4gIH1cblxuICBnZXREYXRhU291cmNlKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xuICB9XG5cbiAgc2V0RGF0YVNvdXJjZShkYXRhOiBhbnkpIHtcbiAgICB0aGlzLl9kYXRhU291cmNlID0gZGF0YTtcbiAgICB0aGlzLl9kYXRhU291cmNlQ2hhbmdlZC5uZXh0KHRoaXMuZ2V0RGF0YVNvdXJjZSgpKTtcbiAgfVxuXG4gIGRhdGFTb3VyY2VDaGFuZ2UoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZUNoYW5nZWQ7XG4gIH1cblxuICBmaWx0ZXJMb2NhbERhdGFCeShzZWFyY2hLZXk6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmdldERhdGFTb3VyY2UoKS5maWx0ZXIoKG9iajogQXJyYXk8YW55PikgPT4ge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikuc29tZSgoa2V5OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKG9ialtrZXldKSB7XG4gICAgICAgICAgcmV0dXJuIG9ialtrZXldXG4gICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgIC5pbmNsdWRlcyhzZWFyY2hLZXkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNlYXJjaExvY2FsRGF0YUJ5KHNlYXJjaEtleTogYW55KSB7XG4gICAgaWYgKCFzZWFyY2hLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERhdGFTb3VyY2UoKTtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoS2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXJMb2NhbERhdGFCeShzZWFyY2hLZXkudG9Mb3dlckNhc2UoKSk7XG4gICAgfVxuICB9XG5cbiAgc2VhcmNoRGF0YU9ic2VydmFibGUoc2VhcmNoS2V5OiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICBjb25zdCBvYnNlcnZhYmxlID0gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgIG9ic2VydmVyLm5leHQodGhpcy5zZWFyY2hMb2NhbERhdGFCeShzZWFyY2hLZXkpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgfVxufVxuIl19