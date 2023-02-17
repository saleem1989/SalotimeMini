/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input, ChangeDetectorRef, } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MdbTableDirective } from '../directives/mdb-table.directive';
var MdbTablePaginationComponent = /** @class */ (function () {
    function MdbTablePaginationComponent(cdRef) {
        this.cdRef = cdRef;
        this.searchPagination = false;
        this.searchDataSource = null;
        this.ofKeyword = 'of';
        this.dashKeyword = '-';
        this.paginationAlign = '';
        this.hideDescription = false;
        this.maxVisibleItems = 10;
        this.firstItemIndex = 0;
        this.lastItemIndex = this.maxVisibleItems;
        this.lastVisibleItemIndex = 5;
        this.activePageNumber = 1;
        this.allItemsLength = 0;
        this.nextShouldBeDisabled = false;
        this.previousShouldBeDisabled = true;
        this.searchText = '';
        this.pagination = new Subject();
        this.nextPageClick = new EventEmitter();
        this.previousPageClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.tableEl) {
            this.allItemsLength = this.tableEl.getDataSource().length;
        }
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.tableEl) {
            this.tableEl.dataSourceChange().subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.allItemsLength = data.length;
                _this.lastVisibleItemIndex = data.length;
                _this.calculateFirstItemIndex();
                _this.calculateLastItemIndex();
                _this.disableNextButton(data);
                if (_this.searchDataSource) {
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        if (_this.searchDataSource.length !== data.length) {
                            _this.activePageNumber = 1;
                            _this.firstItemIndex = 1;
                        }
                    }), 0);
                }
            }));
        }
        this.paginationChange().subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.firstItemIndex = data.first;
            _this.lastVisibleItemIndex = data.last;
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var searchDataSource = changes['searchDataSource'];
        if (searchDataSource.currentValue.length !== 0) {
            this.allItemsLength = searchDataSource.currentValue.length;
        }
        if (this.lastVisibleItemIndex > this.allItemsLength) {
            this.lastVisibleItemIndex = this.allItemsLength;
        }
        if (searchDataSource.currentValue.length === 0) {
            this.firstItemIndex = 0;
            this.lastItemIndex = 0;
            this.lastVisibleItemIndex = 0;
            this.allItemsLength = 0;
        }
        if (!searchDataSource.isFirstChange() &&
            searchDataSource.currentValue.length <= this.maxVisibleItems) {
            this.nextShouldBeDisabled = true;
            this.lastVisibleItemIndex = searchDataSource.currentValue.length;
        }
        else {
            this.nextShouldBeDisabled = false;
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.setMaxVisibleItemsNumberTo = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.lastItemIndex = value;
        this.lastVisibleItemIndex = value;
        this.maxVisibleItems = value;
        this.cdRef.detectChanges();
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.searchTextObs = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // tslint:disable-next-line: deprecation
        /** @type {?} */
        var observable = Observable.create((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            observer.next(_this.searchText);
        }));
        return observable;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.disableNextButton = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (data.length <= this.maxVisibleItems) {
            this.nextShouldBeDisabled = true;
        }
        else {
            this.nextShouldBeDisabled = false;
        }
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.calculateFirstItemIndex = /**
     * @return {?}
     */
    function () {
        this.firstItemIndex = this.activePageNumber * this.maxVisibleItems - this.maxVisibleItems + 1;
        this.pagination.next({ first: this.firstItemIndex, last: this.lastItemIndex });
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.calculateLastItemIndex = /**
     * @return {?}
     */
    function () {
        this.lastItemIndex = this.activePageNumber * this.maxVisibleItems;
        this.lastVisibleItemIndex = this.lastItemIndex;
        if (this.searchDataSource && this.lastItemIndex > this.searchDataSource.length) {
            this.lastVisibleItemIndex = this.searchDataSource.length;
        }
        else if (!this.searchDataSource) {
            this.lastVisibleItemIndex = this.lastItemIndex;
        }
        if (this.lastItemIndex > this.tableEl.getDataSource().length) {
            this.lastItemIndex = this.tableEl.getDataSource().length;
            this.lastVisibleItemIndex = this.tableEl.getDataSource().length;
        }
        this.pagination.next({ first: this.firstItemIndex, last: this.lastItemIndex });
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.paginationChange = /**
     * @return {?}
     */
    function () {
        return this.pagination;
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.calculateHowManyPagesShouldBe = /**
     * @return {?}
     */
    function () {
        return Math.ceil(this.tableEl.getDataSource().length / this.maxVisibleItems);
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.previousPage = /**
     * @return {?}
     */
    function () {
        this.activePageNumber--;
        this.calculateFirstItemIndex();
        this.calculateLastItemIndex();
        this.previousPageClick.emit({ first: this.firstItemIndex, last: this.lastItemIndex });
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.nextPage = /**
     * @return {?}
     */
    function () {
        this.activePageNumber++;
        this.calculateFirstItemIndex();
        this.calculateLastItemIndex();
        if (this.lastItemIndex > this.tableEl.getDataSource().length) {
            this.lastItemIndex = this.tableEl.getDataSource().length;
        }
        if (this.lastVisibleItemIndex > this.allItemsLength) {
            this.lastVisibleItemIndex = this.allItemsLength;
        }
        this.nextPageClick.emit({ first: this.firstItemIndex, last: this.lastItemIndex });
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.nextPageObservable = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // tslint:disable-next-line: deprecation
        /** @type {?} */
        var obs = Observable.create((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            observer.next(_this.firstItemIndex);
        }));
        return obs;
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.previousPageObservable = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // tslint:disable-next-line: deprecation
        /** @type {?} */
        var obs = Observable.create((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            observer.next(_this.lastVisibleItemIndex);
        }));
        return obs;
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.checkIfNextShouldBeDisabled = /**
     * @return {?}
     */
    function () {
        if (this.searchDataSource && this.lastVisibleItemIndex === this.searchDataSource.length) {
            return true;
        }
        if (this.activePageNumber >= this.calculateHowManyPagesShouldBe()) {
            return true;
        }
        if (this.nextShouldBeDisabled) {
            return this.nextShouldBeDisabled;
        }
    };
    /**
     * @return {?}
     */
    MdbTablePaginationComponent.prototype.checkIfPreviousShouldBeDisabled = /**
     * @return {?}
     */
    function () {
        if (this.activePageNumber === 1) {
            return true;
        }
    };
    MdbTablePaginationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-table-pagination',
                    template: "<!--Pagination -->\n<nav>\n  <ul class=\"pagination pagination-circle pg-blue d-flex flex-center\" [ngClass]=\"{\n      'justify-content-end': paginationAlign =='end',\n      'justify-content-start': paginationAlign =='start'\n    }\">\n\n    <li *ngIf=\"!hideDescription\">{{firstItemIndex}} {{dashKeyword}} {{lastVisibleItemIndex}} {{ofKeyword}} {{allItemsLength}}</li>\n    <!--Arrow left-->\n    <li class=\"page-item\" [ngClass]=\"{'disabled': checkIfPreviousShouldBeDisabled()}\">\n      <a class=\"page-link\" mdbWavesEffect aria-label=\"Previous\" (click)=\"previousPage()\">\n        <span aria-hidden=\"true\">\u00AB</span>\n      </a>\n    </li>\n\n    <!--Arrow right-->\n    <li class=\"page-item\" [ngClass]=\"{'disabled': checkIfNextShouldBeDisabled()}\">\n      <a class=\"page-link\" mdbWavesEffect aria-label=\"Next\" (click)=\"nextPage()\">\n        <span aria-hidden=\"true\">\u00BB</span>\n      </a>\n    </li>\n\n  </ul>\n</nav>\n<!--/Pagination -->\n"
                }] }
    ];
    /** @nocollapse */
    MdbTablePaginationComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    MdbTablePaginationComponent.propDecorators = {
        tableEl: [{ type: Input }],
        searchPagination: [{ type: Input }],
        searchDataSource: [{ type: Input }],
        ofKeyword: [{ type: Input }],
        dashKeyword: [{ type: Input }],
        paginationAlign: [{ type: Input }],
        hideDescription: [{ type: Input }],
        nextPageClick: [{ type: Output }],
        previousPageClick: [{ type: Output }]
    };
    return MdbTablePaginationComponent;
}());
export { MdbTablePaginationComponent };
if (false) {
    /** @type {?} */
    MdbTablePaginationComponent.prototype.tableEl;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.searchPagination;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.searchDataSource;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.ofKeyword;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.dashKeyword;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.paginationAlign;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.hideDescription;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.maxVisibleItems;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.firstItemIndex;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.lastItemIndex;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.lastVisibleItemIndex;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.activePageNumber;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.allItemsLength;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.nextShouldBeDisabled;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.previousShouldBeDisabled;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.searchText;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.pagination;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.nextPageClick;
    /** @type {?} */
    MdbTablePaginationComponent.prototype.previousPageClick;
    /**
     * @type {?}
     * @private
     */
    MdbTablePaginationComponent.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXRhYmxlLXBhZ2luYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvdGFibGVzL2NvbXBvbmVudHMvbWRiLXRhYmxlLXBhZ2luYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULE1BQU0sRUFDTixZQUFZLEVBQ1osS0FBSyxFQUNMLGlCQUFpQixHQUlsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUV0RTtJQW9DRSxxQ0FBb0IsS0FBd0I7UUFBeEIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUE5Qm5DLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixxQkFBZ0IsR0FBUSxJQUFJLENBQUM7UUFDN0IsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixnQkFBVyxHQUFHLEdBQUcsQ0FBQztRQUNsQixvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUNyQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUVqQyxvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUVyQixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQixrQkFBYSxHQUFXLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDN0MseUJBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBRXpCLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQUVyQixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUVuQix5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDN0IsNkJBQXdCLEdBQUcsSUFBSSxDQUFDO1FBRWhDLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFFaEIsZUFBVSxHQUE2QyxJQUFJLE9BQU8sRUFHOUQsQ0FBQztRQUVLLGtCQUFh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OztJQUVuQiwyREFBNkI7O0lBQzdCLCtEQUFnQzs7SUFFaEMsaURBQWdCOztJQUVoQixpREFHSzs7SUFFTCxvREFBa0Q7O0lBQ2xELHdEQUFzRDs7Ozs7SUFFMUMsNENBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQWZ0ZXJWaWV3SW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNZGJUYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4uL2RpcmVjdGl2ZXMvbWRiLXRhYmxlLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi10YWJsZS1wYWdpbmF0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21kYi10YWJsZS1wYWdpbmF0aW9uLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgTWRiVGFibGVQYWdpbmF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSB0YWJsZUVsOiBNZGJUYWJsZURpcmVjdGl2ZTtcbiAgQElucHV0KCkgc2VhcmNoUGFnaW5hdGlvbiA9IGZhbHNlO1xuICBASW5wdXQoKSBzZWFyY2hEYXRhU291cmNlOiBhbnkgPSBudWxsO1xuICBASW5wdXQoKSBvZktleXdvcmQgPSAnb2YnO1xuICBASW5wdXQoKSBkYXNoS2V5d29yZCA9ICctJztcbiAgQElucHV0KCkgcGFnaW5hdGlvbkFsaWduID0gJyc7XG4gIEBJbnB1dCgpIGhpZGVEZXNjcmlwdGlvbiA9IGZhbHNlO1xuXG4gIG1heFZpc2libGVJdGVtcyA9IDEwO1xuXG4gIGZpcnN0SXRlbUluZGV4ID0gMDtcbiAgbGFzdEl0ZW1JbmRleDogbnVtYmVyID0gdGhpcy5tYXhWaXNpYmxlSXRlbXM7XG4gIGxhc3RWaXNpYmxlSXRlbUluZGV4ID0gNTtcblxuICBhY3RpdmVQYWdlTnVtYmVyID0gMTtcblxuICBhbGxJdGVtc0xlbmd0aCA9IDA7XG5cbiAgbmV4dFNob3VsZEJlRGlzYWJsZWQgPSBmYWxzZTtcbiAgcHJldmlvdXNTaG91bGRCZURpc2FibGVkID0gdHJ1ZTtcblxuICBzZWFyY2hUZXh0ID0gJyc7XG5cbiAgcGFnaW5hdGlvbjogU3ViamVjdDx7IGZpcnN0OiBudW1iZXI7IGxhc3Q6IG51bWJlciB9PiA9IG5ldyBTdWJqZWN0PHtcbiAgICBmaXJzdDogbnVtYmVyO1xuICAgIGxhc3Q6IG51bWJlcjtcbiAgfT4oKTtcblxuICBAT3V0cHV0KCkgbmV4dFBhZ2VDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcHJldmlvdXNQYWdlQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy50YWJsZUVsKSB7XG4gICAgICB0aGlzLmFsbEl0ZW1zTGVuZ3RoID0gdGhpcy50YWJsZUVsLmdldERhdGFTb3VyY2UoKS5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLnRhYmxlRWwpIHtcbiAgICAgIHRoaXMudGFibGVFbC5kYXRhU291cmNlQ2hhbmdlKCkuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5hbGxJdGVtc0xlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgICAgICB0aGlzLmxhc3RWaXNpYmxlSXRlbUluZGV4ID0gZGF0YS5sZW5ndGg7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlRmlyc3RJdGVtSW5kZXgoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVMYXN0SXRlbUluZGV4KCk7XG4gICAgICAgIHRoaXMuZGlzYWJsZU5leHRCdXR0b24oZGF0YSk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoRGF0YVNvdXJjZSkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoRGF0YVNvdXJjZS5sZW5ndGggIT09IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHRoaXMuYWN0aXZlUGFnZU51bWJlciA9IDE7XG4gICAgICAgICAgICAgIHRoaXMuZmlyc3RJdGVtSW5kZXggPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnBhZ2luYXRpb25DaGFuZ2UoKS5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgdGhpcy5maXJzdEl0ZW1JbmRleCA9IGRhdGEuZmlyc3Q7XG4gICAgICB0aGlzLmxhc3RWaXNpYmxlSXRlbUluZGV4ID0gZGF0YS5sYXN0O1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IHNlYXJjaERhdGFTb3VyY2UgPSBjaGFuZ2VzWydzZWFyY2hEYXRhU291cmNlJ107XG4gICAgaWYgKHNlYXJjaERhdGFTb3VyY2UuY3VycmVudFZhbHVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdGhpcy5hbGxJdGVtc0xlbmd0aCA9IHNlYXJjaERhdGFTb3VyY2UuY3VycmVudFZhbHVlLmxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IHRoaXMuYWxsSXRlbXNMZW5ndGgpIHtcbiAgICAgIHRoaXMubGFzdFZpc2libGVJdGVtSW5kZXggPSB0aGlzLmFsbEl0ZW1zTGVuZ3RoO1xuICAgIH1cblxuICAgIGlmIChzZWFyY2hEYXRhU291cmNlLmN1cnJlbnRWYWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuZmlyc3RJdGVtSW5kZXggPSAwO1xuICAgICAgdGhpcy5sYXN0SXRlbUluZGV4ID0gMDtcbiAgICAgIHRoaXMubGFzdFZpc2libGVJdGVtSW5kZXggPSAwO1xuICAgICAgdGhpcy5hbGxJdGVtc0xlbmd0aCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgIXNlYXJjaERhdGFTb3VyY2UuaXNGaXJzdENoYW5nZSgpICYmXG4gICAgICBzZWFyY2hEYXRhU291cmNlLmN1cnJlbnRWYWx1ZS5sZW5ndGggPD0gdGhpcy5tYXhWaXNpYmxlSXRlbXNcbiAgICApIHtcbiAgICAgIHRoaXMubmV4dFNob3VsZEJlRGlzYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5sYXN0VmlzaWJsZUl0ZW1JbmRleCA9IHNlYXJjaERhdGFTb3VyY2UuY3VycmVudFZhbHVlLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uZXh0U2hvdWxkQmVEaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHNldE1heFZpc2libGVJdGVtc051bWJlclRvKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLmxhc3RJdGVtSW5kZXggPSB2YWx1ZTtcbiAgICB0aGlzLmxhc3RWaXNpYmxlSXRlbUluZGV4ID0gdmFsdWU7XG4gICAgdGhpcy5tYXhWaXNpYmxlSXRlbXMgPSB2YWx1ZTtcbiAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHNlYXJjaFRleHRPYnMoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgY29uc3Qgb2JzZXJ2YWJsZSA9IE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogYW55KSA9PiB7XG4gICAgICBvYnNlcnZlci5uZXh0KHRoaXMuc2VhcmNoVGV4dCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9ic2VydmFibGU7XG4gIH1cblxuICBkaXNhYmxlTmV4dEJ1dHRvbihkYXRhOiBhbnkpIHtcbiAgICBpZiAoZGF0YS5sZW5ndGggPD0gdGhpcy5tYXhWaXNpYmxlSXRlbXMpIHtcbiAgICAgIHRoaXMubmV4dFNob3VsZEJlRGlzYWJsZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5leHRTaG91bGRCZURpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY2FsY3VsYXRlRmlyc3RJdGVtSW5kZXgoKSB7XG4gICAgdGhpcy5maXJzdEl0ZW1JbmRleCA9IHRoaXMuYWN0aXZlUGFnZU51bWJlciAqIHRoaXMubWF4VmlzaWJsZUl0ZW1zIC0gdGhpcy5tYXhWaXNpYmxlSXRlbXMgKyAxO1xuICAgIHRoaXMucGFnaW5hdGlvbi5uZXh0KHsgZmlyc3Q6IHRoaXMuZmlyc3RJdGVtSW5kZXgsIGxhc3Q6IHRoaXMubGFzdEl0ZW1JbmRleCB9KTtcbiAgfVxuXG4gIGNhbGN1bGF0ZUxhc3RJdGVtSW5kZXgoKSB7XG4gICAgdGhpcy5sYXN0SXRlbUluZGV4ID0gdGhpcy5hY3RpdmVQYWdlTnVtYmVyICogdGhpcy5tYXhWaXNpYmxlSXRlbXM7XG4gICAgdGhpcy5sYXN0VmlzaWJsZUl0ZW1JbmRleCA9IHRoaXMubGFzdEl0ZW1JbmRleDtcblxuICAgIGlmICh0aGlzLnNlYXJjaERhdGFTb3VyY2UgJiYgdGhpcy5sYXN0SXRlbUluZGV4ID4gdGhpcy5zZWFyY2hEYXRhU291cmNlLmxlbmd0aCkge1xuICAgICAgdGhpcy5sYXN0VmlzaWJsZUl0ZW1JbmRleCA9IHRoaXMuc2VhcmNoRGF0YVNvdXJjZS5sZW5ndGg7XG4gICAgfSBlbHNlIGlmICghdGhpcy5zZWFyY2hEYXRhU291cmNlKSB7XG4gICAgICB0aGlzLmxhc3RWaXNpYmxlSXRlbUluZGV4ID0gdGhpcy5sYXN0SXRlbUluZGV4O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxhc3RJdGVtSW5kZXggPiB0aGlzLnRhYmxlRWwuZ2V0RGF0YVNvdXJjZSgpLmxlbmd0aCkge1xuICAgICAgdGhpcy5sYXN0SXRlbUluZGV4ID0gdGhpcy50YWJsZUVsLmdldERhdGFTb3VyY2UoKS5sZW5ndGg7XG4gICAgICB0aGlzLmxhc3RWaXNpYmxlSXRlbUluZGV4ID0gdGhpcy50YWJsZUVsLmdldERhdGFTb3VyY2UoKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgdGhpcy5wYWdpbmF0aW9uLm5leHQoeyBmaXJzdDogdGhpcy5maXJzdEl0ZW1JbmRleCwgbGFzdDogdGhpcy5sYXN0SXRlbUluZGV4IH0pO1xuICB9XG5cbiAgcGFnaW5hdGlvbkNoYW5nZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2luYXRpb247XG4gIH1cblxuICBjYWxjdWxhdGVIb3dNYW55UGFnZXNTaG91bGRCZSgpIHtcbiAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMudGFibGVFbC5nZXREYXRhU291cmNlKCkubGVuZ3RoIC8gdGhpcy5tYXhWaXNpYmxlSXRlbXMpO1xuICB9XG5cbiAgcHJldmlvdXNQYWdlKCkge1xuICAgIHRoaXMuYWN0aXZlUGFnZU51bWJlci0tO1xuICAgIHRoaXMuY2FsY3VsYXRlRmlyc3RJdGVtSW5kZXgoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUxhc3RJdGVtSW5kZXgoKTtcbiAgICB0aGlzLnByZXZpb3VzUGFnZUNsaWNrLmVtaXQoeyBmaXJzdDogdGhpcy5maXJzdEl0ZW1JbmRleCwgbGFzdDogdGhpcy5sYXN0SXRlbUluZGV4IH0pO1xuICB9XG5cbiAgbmV4dFBhZ2UoKSB7XG4gICAgdGhpcy5hY3RpdmVQYWdlTnVtYmVyKys7XG4gICAgdGhpcy5jYWxjdWxhdGVGaXJzdEl0ZW1JbmRleCgpO1xuICAgIHRoaXMuY2FsY3VsYXRlTGFzdEl0ZW1JbmRleCgpO1xuXG4gICAgaWYgKHRoaXMubGFzdEl0ZW1JbmRleCA+IHRoaXMudGFibGVFbC5nZXREYXRhU291cmNlKCkubGVuZ3RoKSB7XG4gICAgICB0aGlzLmxhc3RJdGVtSW5kZXggPSB0aGlzLnRhYmxlRWwuZ2V0RGF0YVNvdXJjZSgpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IHRoaXMuYWxsSXRlbXNMZW5ndGgpIHtcbiAgICAgIHRoaXMubGFzdFZpc2libGVJdGVtSW5kZXggPSB0aGlzLmFsbEl0ZW1zTGVuZ3RoO1xuICAgIH1cblxuICAgIHRoaXMubmV4dFBhZ2VDbGljay5lbWl0KHsgZmlyc3Q6IHRoaXMuZmlyc3RJdGVtSW5kZXgsIGxhc3Q6IHRoaXMubGFzdEl0ZW1JbmRleCB9KTtcbiAgfVxuXG4gIG5leHRQYWdlT2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICBjb25zdCBvYnMgPSBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xuICAgICAgb2JzZXJ2ZXIubmV4dCh0aGlzLmZpcnN0SXRlbUluZGV4KTtcbiAgICB9KTtcbiAgICByZXR1cm4gb2JzO1xuICB9XG5cbiAgcHJldmlvdXNQYWdlT2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICBjb25zdCBvYnMgPSBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xuICAgICAgb2JzZXJ2ZXIubmV4dCh0aGlzLmxhc3RWaXNpYmxlSXRlbUluZGV4KTtcbiAgICB9KTtcbiAgICByZXR1cm4gb2JzO1xuICB9XG5cbiAgY2hlY2tJZk5leHRTaG91bGRCZURpc2FibGVkKCkge1xuICAgIGlmICh0aGlzLnNlYXJjaERhdGFTb3VyY2UgJiYgdGhpcy5sYXN0VmlzaWJsZUl0ZW1JbmRleCA9PT0gdGhpcy5zZWFyY2hEYXRhU291cmNlLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWN0aXZlUGFnZU51bWJlciA+PSB0aGlzLmNhbGN1bGF0ZUhvd01hbnlQYWdlc1Nob3VsZEJlKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm5leHRTaG91bGRCZURpc2FibGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5uZXh0U2hvdWxkQmVEaXNhYmxlZDtcbiAgICB9XG4gIH1cblxuICBjaGVja0lmUHJldmlvdXNTaG91bGRCZURpc2FibGVkKCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZVBhZ2VOdW1iZXIgPT09IDEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19