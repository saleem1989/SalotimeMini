/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef, ViewEncapsulation, Renderer2, forwardRef, ViewChild, PLATFORM_ID, Inject, ChangeDetectionStrategy, ChangeDetectorRef, HostListener, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { LocaleService } from './services/datepickerLocale.service';
import { UtilService } from './services/datepickerUtil.service';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Utils } from '../../free/utils';
/** @type {?} */
export const MYDP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => MDBDatePickerComponent)),
    multi: true,
};
/** @enum {number} */
const CalToggle = {
    Open: 1,
    CloseByDateSel: 2,
    CloseByCalBtn: 3,
    CloseByOutClick: 4,
};
CalToggle[CalToggle.Open] = 'Open';
CalToggle[CalToggle.CloseByDateSel] = 'CloseByDateSel';
CalToggle[CalToggle.CloseByCalBtn] = 'CloseByCalBtn';
CalToggle[CalToggle.CloseByOutClick] = 'CloseByOutClick';
/** @enum {number} */
const Year = {
    min: 1000,
    max: 9999,
};
Year[Year.min] = 'min';
Year[Year.max] = 'max';
/** @enum {number} */
const InputFocusBlur = {
    focus: 1,
    blur: 2,
};
InputFocusBlur[InputFocusBlur.focus] = 'focus';
InputFocusBlur[InputFocusBlur.blur] = 'blur';
/** @enum {number} */
const KeyCode = {
    enter: 13,
    space: 32,
};
KeyCode[KeyCode.enter] = 'enter';
KeyCode[KeyCode.space] = 'space';
/** @enum {number} */
const MonthId = {
    prev: 1,
    curr: 2,
    next: 3,
};
MonthId[MonthId.prev] = 'prev';
MonthId[MonthId.curr] = 'curr';
MonthId[MonthId.next] = 'next';
export class MDBDatePickerComponent {
    /**
     * @param {?} elem
     * @param {?} renderer
     * @param {?} localeService
     * @param {?} utilService
     * @param {?} cdRef
     * @param {?} document
     * @param {?} platformId
     */
    constructor(elem, renderer, localeService, utilService, cdRef, document, platformId) {
        this.elem = elem;
        this.renderer = renderer;
        this.localeService = localeService;
        this.utilService = utilService;
        this.cdRef = cdRef;
        this.document = document;
        this.label = '';
        this.placeholder = '';
        this.openOnFocus = true;
        this.outlineInput = false;
        this.inline = false;
        this.inlineIcon = 'far fa-calendar-alt';
        this.dateChanged = new EventEmitter();
        this.inputFieldChanged = new EventEmitter();
        this.calendarViewChanged = new EventEmitter();
        this.calendarToggle = new EventEmitter();
        this.inputFocusBlur = new EventEmitter();
        this.closeButtonClicked = new EventEmitter();
        this.clearButtonClicked = new EventEmitter();
        this.todayButtonClicked = new EventEmitter();
        this.isDateSelected = false;
        this.labelActive = false;
        this.showSelector = false;
        this.visibleMonth = { monthTxt: '', monthNbr: 0, year: 1 };
        this.selectedMonth = { monthTxt: '', monthNbr: 0, year: 0 };
        this.selectedDate = { year: 0, month: 0, day: 0 };
        this.weekDays = [];
        this.dates = [];
        this.selectionDayTxt = '';
        this.invalidDate = false;
        this.disableTodayBtn = false;
        this.dayIdx = 0;
        this.weekDayOpts = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
        this.editMonth = false;
        this.invalidMonth = false;
        this.editYear = false;
        this.invalidYear = false;
        this.prevMonthDisabled = false;
        this.nextMonthDisabled = false;
        this.prevYearDisabled = false;
        this.nextYearDisabled = false;
        this.prevMonthId = MonthId.prev;
        this.currMonthId = MonthId.curr;
        this.nextMonthId = MonthId.next;
        this.isOpen = false;
        this.isDisabled = false;
        this.tmp = {
            year: this.getToday().year,
            month: this.getToday().month,
            day: this.getToday().day,
        };
        // Default options
        this.opts = {
            startDate: (/** @type {?} */ ('')),
            closeAfterSelect: (/** @type {?} */ (false)),
            dayLabelsFull: (/** @type {?} */ ({})),
            dayLabels: (/** @type {?} */ ({})),
            monthLabelsFull: (/** @type {?} */ ({})),
            monthLabels: (/** @type {?} */ ({})),
            dateFormat: (/** @type {?} */ ('')),
            showTodayBtn: (/** @type {?} */ (true)),
            todayBtnTxt: (/** @type {?} */ ('')),
            firstDayOfWeek: (/** @type {?} */ ('')),
            sunHighlight: (/** @type {?} */ (true)),
            markCurrentDay: (/** @type {?} */ (true)),
            disableUntil: (/** @type {?} */ ({ year: 0, month: 0, day: 0 })),
            disableSince: (/** @type {?} */ ({ year: 0, month: 0, day: 0 })),
            disableDays: (/** @type {?} */ ([])),
            enableDays: (/** @type {?} */ ([])),
            editableDateField: (/** @type {?} */ (true)),
            markDates: (/** @type {?} */ ([])),
            markWeekends: (/** @type {?} */ ({})),
            disableDateRanges: (/** @type {?} */ ([])),
            disableWeekends: (/** @type {?} */ (false)),
            showWeekNumbers: (/** @type {?} */ (false)),
            height: (/** @type {?} */ ('32px')),
            width: (/** @type {?} */ ('100%')),
            selectionTxtFontSize: (/** @type {?} */ ('1rem')),
            showClearDateBtn: (/** @type {?} */ (true)),
            alignSelectorRight: (/** @type {?} */ (false)),
            disableHeaderButtons: (/** @type {?} */ (true)),
            minYear: (/** @type {?} */ (Year.min)),
            maxYear: (/** @type {?} */ (Year.max)),
            componentDisabled: (/** @type {?} */ (false)),
            showSelectorArrow: (/** @type {?} */ (true)),
            ariaLabelInputField: (/** @type {?} */ ('Date input field')),
            ariaLabelClearDate: (/** @type {?} */ ('Clear Date')),
            ariaLabelOpenCalendar: (/** @type {?} */ ('Open Calendar')),
            ariaLabelPrevMonth: (/** @type {?} */ ('Previous Month')),
            ariaLabelNextMonth: (/** @type {?} */ ('Next Month')),
            ariaLabelPrevYear: (/** @type {?} */ ('Previous Year')),
            ariaLabelNextYear: (/** @type {?} */ ('Next Year')),
        };
        this.months = [];
        this.years = [];
        this.utils = new Utils();
        this.firstTimeOpenedModal = true;
        this.modalHeightBefore = null;
        this.isMobile = null;
        this.isBrowser = false;
        this.onChangeCb = (/**
         * @return {?}
         */
        () => { });
        this.onTouchedCb = (/**
         * @return {?}
         */
        () => { });
        this.isBrowser = isPlatformBrowser(platformId);
        if (this.isBrowser) {
            this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        }
        this.setLocaleOptions();
        renderer.listen(this.elem.nativeElement, 'click', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (this.showSelector &&
                event.target &&
                this.elem.nativeElement !== event.target &&
                !this.elem.nativeElement.contains(event.target)) {
                this.closeBtnClicked();
                this.calendarToggle.emit(CalToggle.CloseByOutClick);
            }
            if (event.target.classList.contains('picker__holder')) {
                this.closeBtnClicked();
                this.cdRef.detectChanges();
            }
            if (true && event.target && this.elem.nativeElement.contains(event.target)) {
                this.resetMonthYearEdit();
                this.cdRef.detectChanges();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.opts.startDate) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (this.opts.startDate.toString().indexOf('T') !== -1) {
                    /** @type {?} */
                    const index = this.opts.startDate.toString().indexOf('T');
                    /** @type {?} */
                    const startDate = this.opts.startDate.toString().substr(0, index);
                    this.onUserDateInput(startDate);
                }
            }), 0);
        }
    }
    /**
     * @return {?}
     */
    ChangeZIndex() {
        if (this.isBrowser) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                // Fix for visible date / time picker input when picker plate is visible.
                try {
                    /** @type {?} */
                    const openedPicker = this.document.querySelector('.picker--opened');
                    /** @type {?} */
                    const allPickers = this.document.querySelectorAll('.picker');
                    allPickers.forEach((/**
                     * @param {?} element
                     * @return {?}
                     */
                    (element) => {
                        this.renderer.setStyle(element, 'z-index', '0');
                    }));
                    this.renderer.setStyle(openedPicker, 'z-index', '100');
                }
                catch (error) { }
            }), 0);
        }
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
        if (this.inline) {
            if (isDisabled) {
                this.inlineIcon += ' disabled grey-text';
            }
            else {
                /** @type {?} */
                const to = this.inlineIcon.indexOf('disabled');
                this.inlineIcon = this.inlineIcon.substr(0, to);
                this.cdRef.detectChanges();
            }
        }
    }
    /**
     * @return {?}
     */
    removeInlineStyle() {
        try {
            if (this.elem.nativeElement.parentElement.parentElement.classList.contains('modal-content')) {
                this.renderer.setStyle(this.elem.nativeElement.parentElement.parentElement, 'transition', 'height 0.3s');
                this.elem.nativeElement.parentElement.parentElement.style.height =
                    this.modalHeightBefore + 'px';
            }
        }
        catch (error) { }
        setTimeout((/**
         * @return {?}
         */
        () => {
            ((/** @type {?} */ (this.document.documentElement))).style.removeProperty('overflow');
        }), 155);
        this.labelActive = false;
    }
    /**
     * @return {?}
     */
    setLocaleOptions() {
        /** @type {?} */
        const opts = this.localeService.getLocaleOptions(this.locale);
        Object.keys(opts).forEach((/**
         * @param {?} k
         * @return {?}
         */
        k => {
            this.opts[k] = opts[k];
        }));
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    addLocale(locale) {
        this.localeService.locales = Object.assign({}, this.localeService.locales, locale);
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.setLocaleOptions();
        }), 0);
    }
    /**
     * @return {?}
     */
    setOptions() {
        /** @type {?} */
        const thisYear = new Date();
        /** @type {?} */
        const currentYear = thisYear.getFullYear();
        if (this.options !== undefined) {
            Object.keys(this.options).forEach((/**
             * @param {?} k
             * @return {?}
             */
            k => {
                this.opts[k] = this.options[k];
            }));
        }
        if (this.disabled !== undefined) {
            this.opts.componentDisabled = this.disabled;
        }
        if (this.opts.minYear === 1000) {
            this.opts.minYear = currentYear - 7;
        }
        if (this.opts.maxYear === 9999) {
            this.opts.maxYear = currentYear + 7;
        }
    }
    /**
     * @return {?}
     */
    resetMonthYearEdit() {
        this.editMonth = false;
        this.editYear = false;
        this.invalidMonth = false;
        this.invalidYear = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onUserDateInput(value) {
        this.invalidDate = false;
        if (value.length === 0) {
            this.clearDate();
        }
        else {
            /** @type {?} */
            const date = this.utilService.isDateValid(value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDays, this.opts.disableDateRanges, this.opts.monthLabels, this.opts.enableDays);
            if (this.utilService.isInitializedDate(date)) {
                this.selectDate(date);
                this.setVisibleMonth();
            }
            else {
                this.invalidDate = true;
            }
        }
        if (this.invalidDate) {
            this.inputFieldChanged.emit({
                value: value,
                dateFormat: this.opts.dateFormat,
                valid: !(value.length === 0 || this.invalidDate),
            });
            this.onChangeCb('');
            this.onTouchedCb();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onFocusInput(event) {
        if (this.openOnFocus && !this.isOpen) {
            this.openBtnClicked();
        }
        this.inputFocusBlur.emit({ reason: InputFocusBlur.focus, value: event.target.value });
        ((/** @type {?} */ (this.document.documentElement))).style.overflow = 'hidden';
        // this.divFocus.nativeElement.focus();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onBlurInput(event) {
        this.selectionDayTxt = event.target.value;
        this.onTouchedCb();
        this.inputFocusBlur.emit({ reason: InputFocusBlur.blur, value: event.target.value });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onUserMonthInput(value) {
        this.invalidMonth = false;
        /** @type {?} */
        const m = this.utilService.isMonthLabelValid(value, this.opts.monthLabels);
        if (m !== -1) {
            this.editMonth = false;
            if (m !== this.visibleMonth.monthNbr) {
                this.visibleMonth = {
                    monthTxt: this.monthText(m),
                    monthNbr: m,
                    year: this.visibleMonth.year,
                };
                this.generateCalendar(m, this.visibleMonth.year, true);
            }
        }
        else {
            this.invalidMonth = true;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onUserYearInput(value) {
        this.invalidYear = false;
        /** @type {?} */
        const y = this.utilService.isYearLabelValid(Number(value), this.opts.minYear, this.opts.maxYear);
        if (y !== -1) {
            this.editYear = false;
            if (y !== this.visibleMonth.year) {
                this.visibleMonth = {
                    monthTxt: this.visibleMonth.monthTxt,
                    monthNbr: this.visibleMonth.monthNbr,
                    year: y,
                };
                this.generateCalendar(this.visibleMonth.monthNbr, y, true);
            }
        }
        else {
            this.invalidYear = true;
        }
    }
    /**
     * @return {?}
     */
    isTodayDisabled() {
        this.disableTodayBtn = this.utilService.isDisabledDay(this.getToday(), this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays);
    }
    /**
     * @return {?}
     */
    parseOptions() {
        if (this.locale) {
            this.setLocaleOptions();
        }
        this.setOptions();
        this.isTodayDisabled();
        this.dayIdx = this.weekDayOpts.indexOf(this.opts.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            /** @type {?} */
            let idx = this.dayIdx;
            for (let i = 0; i < this.weekDayOpts.length; i++) {
                this.weekDays.push(this.opts.dayLabels[this.weekDayOpts[idx]]);
                idx = this.weekDayOpts[idx] === 'sa' ? 0 : idx + 1;
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value && typeof value === 'string') {
            this.updateDateValue(this.parseSelectedDate(value), false);
        }
        else if (value && value['date']) {
            this.updateDateValue(this.parseSelectedDate(value['date']), false);
        }
        else if (value === '' || value === null) {
            this.selectedDate = { year: 0, month: 0, day: 0 };
            this.selectionDayTxt = '';
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCb = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCb = fn;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('selector') && changes['selector'].currentValue > 0) {
            this.openBtnClicked();
        }
        if (changes.hasOwnProperty('placeholder')) {
            this.placeholder = changes['placeholder'].currentValue;
        }
        if (changes.hasOwnProperty('locale')) {
            this.locale = changes['locale'].currentValue;
            this.setLocaleOptions();
            this.updateDateValue(this.selectedDate, false);
        }
        if (changes.hasOwnProperty('disabled')) {
            this.disabled = changes['disabled'].currentValue;
        }
        if (changes.hasOwnProperty('options')) {
            this.options = changes['options'].currentValue;
            if (changes.options.currentValue.startDate) {
                this.onUserDateInput(changes.options.currentValue.startDate);
            }
        }
        this.weekDays.length = 0;
        this.parseOptions();
        if (changes.hasOwnProperty('defaultMonth')) {
            /** @type {?} */
            const dm = changes['defaultMonth'].currentValue;
            if (dm !== null && dm !== undefined && dm !== '') {
                this.selectedMonth = this.parseSelectedMonth(dm);
            }
            else {
                this.selectedMonth = { monthTxt: '', monthNbr: 0, year: 0 };
            }
        }
        if (changes.hasOwnProperty('selDate')) {
            /** @type {?} */
            const sd = changes['selDate'];
            if (sd.currentValue !== null &&
                sd.currentValue !== undefined &&
                sd.currentValue !== '' &&
                Object.keys(sd.currentValue).length !== 0) {
                this.selectedDate = this.parseSelectedDate(sd.currentValue);
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.onChangeCb(this.getDateModel(this.selectedDate));
                }));
                this.isDateSelected = true;
            }
            else {
                // Do not clear on init
                if (!sd.isFirstChange()) {
                    this.clearDate();
                }
            }
        }
        if (this.showSelector) {
            this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, false);
        }
    }
    /**
     * @return {?}
     */
    hideKeyboard() {
        try {
            setTimeout((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const field = this.renderer.createElement('input');
                this.renderer.appendChild(this.elem.nativeElement, field);
                /** @type {?} */
                const inputReference = this.elem.nativeElement.lastElementChild;
                this.renderer.setAttribute(inputReference, 'type', 'text');
                this.renderer.setAttribute(inputReference, 'type', 'text');
                this.renderer.setStyle(inputReference, 'opacity', '0');
                this.renderer.setStyle(inputReference, '-webkit-user-modify', 'read-write-plaintext-only');
                field.onfocus = (/**
                 * @return {?}
                 */
                () => {
                    setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        this.renderer.setStyle(field, 'display', 'none');
                        setTimeout((/**
                         * @return {?}
                         */
                        () => {
                            this.renderer.removeChild(this.elem.nativeElement, field);
                            this.document.body.focus();
                        }), 0);
                    }), 0);
                });
                field.focus();
            }), 0);
        }
        catch (error) { }
    }
    /**
     * @return {?}
     */
    removeBtnClicked() {
        this.clearDate();
        if (this.showSelector) {
            this.calendarToggle.emit(CalToggle.CloseByCalBtn);
        }
        this.isDateSelected = false;
        this.clearButtonClicked.emit(this);
        this.cdRef.markForCheck();
    }
    /**
     * @return {?}
     */
    closeBtnClicked() {
        this.showSelector = false;
        this.removeInlineStyle();
        this.isOpen = false;
        this.closeButtonClicked.emit(this);
        this.cdRef.markForCheck();
    }
    /**
     * @return {?}
     */
    openBtnClicked() {
        this.isOpen = true;
        try {
            if (this.elem.nativeElement.parentElement.parentElement.classList.contains('modal-content')) {
                if (this.firstTimeOpenedModal) {
                    this.modalHeightBefore = this.elem.nativeElement.parentElement.parentElement.offsetHeight;
                }
                this.firstTimeOpenedModal = false;
                this.renderer.setStyle(this.elem.nativeElement.parentElement.parentElement, 'transition', 'height 0.3s');
                // tslint:disable-next-line:max-line-length
                this.elem.nativeElement.parentElement.parentElement.style.height =
                    this.modalHeightBefore + this.pickerFrame.nativeElement.offsetHeight + 'px';
            }
        }
        catch (error) { }
        // Open selector button clicked
        this.showSelector = !this.showSelector;
        if (this.showSelector) {
            this.setVisibleMonth();
            this.calendarToggle.emit(CalToggle.Open);
        }
        else {
            this.calendarToggle.emit(CalToggle.CloseByCalBtn);
        }
        if (this.isMobile) {
            this.hideKeyboard();
        }
        this.labelActive = true;
        this.ChangeZIndex();
        this.cdRef.markForCheck();
    }
    /**
     * @return {?}
     */
    setVisibleMonth() {
        // Sets visible month of calendar
        /** @type {?} */
        let y = 0;
        /** @type {?} */
        let m = 0;
        if (!this.utilService.isInitializedDate(this.selectedDate)) {
            if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
                /** @type {?} */
                const today = this.getToday();
                y = today.year;
                m = today.month;
            }
            else {
                y = this.selectedMonth.year;
                m = this.selectedMonth.monthNbr;
            }
        }
        else {
            y = this.selectedDate.year;
            m = this.selectedDate.month;
        }
        this.visibleMonth = { monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y };
        // Create current month
        this.generateCalendar(m, y, true);
    }
    /**
     * @return {?}
     */
    monthList() {
        this.months = [];
        for (let i = 1; i <= 12; i++) {
            this.months.push({
                index: i,
                short: this.opts.monthLabels[i],
                label: this.opts.monthLabelsFull[i],
            });
        }
    }
    /**
     * @return {?}
     */
    yearsList() {
        this.years = [];
        /** @type {?} */
        const firstYear = this.opts.minYear;
        /** @type {?} */
        const lastYear = this.opts.maxYear;
        for (let i = firstYear; i <= lastYear; i++) {
            this.years.push(i);
        }
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    prevMonth(event) {
        // Previous month from calendar
        /** @type {?} */
        const d = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() - 1);
        /** @type {?} */
        const y = d.getFullYear();
        /** @type {?} */
        const m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
        // Prevents trigger (click) event when using Enter
        if (event.code === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    nextMonth(event) {
        // Next month from calendar
        /** @type {?} */
        const d = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() + 1);
        /** @type {?} */
        const y = d.getFullYear();
        /** @type {?} */
        const m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
        // Prevents trigger (click) event when using Enter
        if (event.code === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
     * @return {?}
     */
    prevYear() {
        // Previous year from calendar
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    }
    /**
     * @return {?}
     */
    nextYear() {
        // Next year from calendar
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    }
    /**
     * @return {?}
     */
    todayClicked() {
        // Today button clicked
        /** @type {?} */
        const today = this.getToday();
        if (!this.utilService.isDisabledDay(today, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays)) {
            this.selectDate(today);
        }
        if (today.year !== this.visibleMonth.year || today.month !== this.visibleMonth.monthNbr) {
            this.visibleMonth = {
                monthTxt: this.opts.monthLabels[today.month],
                monthNbr: today.month,
                year: today.year,
            };
            this.generateCalendar(today.month, today.year, true);
        }
        this.todayButtonClicked.emit(this);
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    cellClicked(cell) {
        // Cell clicked on the calendar
        if (cell.cmo === this.prevMonthId) {
            // Previous month day
            this.prevMonth();
        }
        else if (cell.cmo === this.currMonthId) {
            // Current month day - if date is already selected clear it
            if (cell.dateObj.year === this.selectedDate.year &&
                cell.dateObj.month === this.selectedDate.month &&
                cell.dateObj.day === this.selectedDate.day) {
                this.clearDate();
            }
            else {
                this.selectDate(cell.dateObj);
            }
        }
        else if (cell.cmo === this.nextMonthId) {
            // Next month day
            this.nextMonth();
        }
        this.resetMonthYearEdit();
    }
    /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    cellKeyDown(event, cell) {
        // Cell keyboard handling
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.cellClicked(cell);
        }
    }
    /**
     * @return {?}
     */
    clearDate() {
        // Clears the date and notifies parent using callbacks and value accessor
        /** @type {?} */
        const date = { year: 0, month: 0, day: 0 };
        this.dateChanged.emit({ date: date, jsdate: null, formatted: '', epoc: 0 });
        this.onChangeCb(null);
        this.onTouchedCb();
        this.updateDateValue(date, true);
        this.tmp = {
            year: this.getToday().year,
            month: this.getToday().month,
            day: this.getToday().day,
        };
        this.setVisibleMonth();
        this.labelActive = false;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    selectDate(date) {
        // Date selected, notifies parent using callbacks and value accessor
        this.tmp = date;
        /** @type {?} */
        const dateModel = this.getDateModel(date);
        // this.dateChanged.emit({ previousDate: this.selectionDayTxt, actualDate: dateModel });
        this.dateChanged.emit({
            date: date,
            jsdate: this.getDate(date.year, date.month, date.day),
            previousDateFormatted: this.selectionDayTxt,
            actualDateFormatted: dateModel,
            epoc: Math.round(this.getTimeInMilliseconds(date) / 1000.0),
        });
        this.onChangeCb(dateModel);
        this.onTouchedCb();
        this.updateDateValue(date, false);
        if (this.showSelector) {
            this.calendarToggle.emit(CalToggle.CloseByDateSel);
        }
        if (this.opts.closeAfterSelect) {
            this.closeBtnClicked();
        }
        this.labelActive = true;
        // hide calendar when date was clicked
        // this.showSelector = false;
    }
    /**
     * @param {?} date
     * @param {?} clear
     * @return {?}
     */
    updateDateValue(date, clear) {
        // Updates date values
        this.selectedDate = date;
        this.tmp = date;
        this.isDateSelected = true;
        this.selectionDayTxt = clear ? '' : this.formatDate(date);
        this.inputFieldChanged.emit({
            value: this.selectionDayTxt,
            dateFormat: this.opts.dateFormat,
            valid: !clear,
        });
        this.invalidDate = false;
        this.cdRef.markForCheck();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDateModel(date) {
        // Creates a date model object from the given parameter
        return this.formatDate(date);
    }
    /**
     * @param {?} val
     * @return {?}
     */
    preZero(val) {
        // Prepend zero if smaller than 10
        return parseInt(val, 0) < 10 ? '0' + val : val;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    formatDate(val) {
        // Returns formatted date string, if mmm is part of dateFormat returns month as a string
        // days
        /** @type {?} */
        const d = val.day;
        // 1 - 31
        /** @type {?} */
        const dd = this.preZero(val.day);
        // 01 - 31
        /** @type {?} */
        const ddd = this.opts.dayLabels[this.getWeekday(val)];
        // Sun-Sat
        /** @type {?} */
        const dddd = this.opts.dayLabelsFull[this.getWeekday(val)];
        // Sunday – Saturday
        /** @type {?} */
        const m = val.month;
        // 1 - 12
        /** @type {?} */
        const mm = this.preZero(val.month);
        // 01 - 12
        /** @type {?} */
        const mmm = this.getMonthShort(val.month);
        // Jan - Dec
        /** @type {?} */
        const mmmm = this.getMonthFull(val.month);
        // January – December
        /** @type {?} */
        const yy = val.year.toString().length === 2 ? val.year : val.year.toString().slice(2, 4);
        // 00 - 99
        /** @type {?} */
        const yyyy = val.year;
        /** @type {?} */
        const toReplace = this.opts.dateFormat.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
        /** @type {?} */
        let formatted = '';
        toReplace.forEach((/**
         * @param {?} el
         * @return {?}
         */
        (el) => {
            switch (el) {
                case 'dddd':
                    el = el.replace(el, dddd);
                    break;
                case 'ddd':
                    el = el.replace(el, ddd);
                    break;
                case 'dd':
                    el = el.replace(el, dd);
                    break;
                case 'd':
                    el = el.replace(el, d);
                    break;
                case 'mmmm':
                    el = el.replace(el, mmmm);
                    break;
                case 'mmm':
                    el = el.replace(el, mmm);
                    break;
                case 'mm':
                    el = el.replace(el, mm);
                    break;
                case 'm':
                    el = el.replace(el, m);
                    break;
                case 'yyyy':
                    el = el.replace(el, yyyy);
                    break;
                case 'yy':
                    el = el.replace(el, yy);
                    break;
            }
            formatted += el;
        }));
        return formatted;
    }
    /**
     * @param {?} m
     * @return {?}
     */
    monthText(m) {
        // Returns month as a text
        return this.opts.monthLabels[m];
    }
    /**
     * @param {?} m
     * @return {?}
     */
    weekText(m) {
        // Returns month as a text
        return this.opts.dayLabelsFull[m];
    }
    /**
     * @param {?} m
     * @return {?}
     */
    getMonthShort(m) {
        return this.opts.monthLabels[m];
    }
    /**
     * @param {?} m
     * @return {?}
     */
    getMonthFull(m) {
        return this.opts.monthLabelsFull[m];
    }
    /**
     * @param {?} y
     * @param {?} m
     * @return {?}
     */
    monthStartIdx(y, m) {
        // Month start index
        /** @type {?} */
        const d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        /** @type {?} */
        const idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    }
    /**
     * @param {?} m
     * @param {?} y
     * @return {?}
     */
    daysInMonth(m, y) {
        // Return number of days of current month
        return new Date(y, m, 0).getDate();
    }
    /**
     * @param {?} m
     * @param {?} y
     * @return {?}
     */
    daysInPrevMonth(m, y) {
        // Return number of days of the previous month
        /** @type {?} */
        const d = this.getDate(y, m, 1);
        d.setMonth(d.getMonth() - 1);
        return this.daysInMonth(d.getMonth() + 1, d.getFullYear());
    }
    /**
     * @param {?} d
     * @param {?} m
     * @param {?} y
     * @param {?} cmo
     * @param {?} today
     * @return {?}
     */
    isCurrDay(d, m, y, cmo, today) {
        // Check is a given date the today
        return d === today.day && m === today.month && y === today.year && cmo === this.currMonthId;
    }
    /**
     * @return {?}
     */
    getToday() {
        /** @type {?} */
        const date = new Date();
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getTimeInMilliseconds(date) {
        return this.getDate(date.year, date.month, date.day).getTime();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekday(date) {
        // Get weekday: su, mo, tu, we ...
        return this.weekDayOpts[this.utilService.getDayNumber(date)];
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} day
     * @return {?}
     */
    getDate(year, month, day) {
        // Creates a date object from given year, month and day
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    }
    /**
     * @return {?}
     */
    sundayIdx() {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    }
    /**
     * @param {?} m
     * @param {?} y
     * @param {?} notifyChange
     * @return {?}
     */
    generateCalendar(m, y, notifyChange) {
        this.dates.length = 0;
        /** @type {?} */
        const today = this.getToday();
        /** @type {?} */
        const monthStart = this.monthStartIdx(y, m);
        /** @type {?} */
        const dInThisM = this.daysInMonth(m, y);
        /** @type {?} */
        const dInPrevM = this.daysInPrevMonth(m, y);
        /** @type {?} */
        let dayNbr = 1;
        /** @type {?} */
        let cmo = this.prevMonthId;
        for (let i = 1; i < 7; i++) {
            /** @type {?} */
            const week = [];
            if (i === 1) {
                // First week
                /** @type {?} */
                const pm = dInPrevM - monthStart + 1;
                // Previous month
                for (let j = pm; j <= dInPrevM; j++) {
                    /** @type {?} */
                    const date = { year: y, month: m - 1, day: j };
                    week.push({
                        dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(j, m, y, cmo, today),
                        dayNbr: this.utilService.getDayNumber(date),
                        disabled: this.utilService.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                    });
                }
                cmo = this.currMonthId;
                // Current month
                /** @type {?} */
                const daysLeft = 7 - week.length;
                for (let j = 0; j < daysLeft; j++) {
                    /** @type {?} */
                    const date = { year: y, month: m, day: dayNbr };
                    week.push({
                        dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(dayNbr, m, y, cmo, today),
                        dayNbr: this.utilService.getDayNumber(date),
                        disabled: this.utilService.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                    });
                    dayNbr++;
                }
            }
            else {
                // Rest of the weeks
                for (let j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
                        dayNbr = 1;
                        cmo = this.nextMonthId;
                    }
                    /** @type {?} */
                    const date = {
                        year: y,
                        month: cmo === this.currMonthId ? m : m + 1,
                        day: dayNbr,
                    };
                    week.push({
                        dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(dayNbr, m, y, cmo, today),
                        dayNbr: this.utilService.getDayNumber(date),
                        disabled: this.utilService.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                    });
                    dayNbr++;
                }
            }
            /** @type {?} */
            const weekNbr = this.opts.showWeekNumbers && this.opts.firstDayOfWeek === 'mo'
                ? this.utilService.getWeekNumber(week[0].dateObj)
                : 0;
            this.dates.push({ week: week, weekNbr: weekNbr });
        }
        this.setHeaderBtnDisabledState(m, y);
        if (notifyChange) {
            // Notify parent
            this.calendarViewChanged.emit({
                year: y,
                month: m,
                first: {
                    number: 1,
                    weekday: this.getWeekday({
                        year: y,
                        month: m,
                        day: 1,
                    }),
                },
                last: {
                    number: dInThisM,
                    weekday: this.getWeekday({
                        year: y,
                        month: m,
                        day: dInThisM,
                    }),
                },
            });
        }
        this.monthList();
        this.yearsList();
    }
    /**
     * @param {?} selDate
     * @return {?}
     */
    parseSelectedDate(selDate) {
        // Parse selDate value - it can be string or IMyDate object
        // Removes everything from selDate if it's ISO date format to allow to use ISO date in date picker
        if (selDate.toString().indexOf('T') !== -1) {
            selDate = selDate.substr(0, selDate.indexOf('T'));
        }
        /** @type {?} */
        let date = { day: 0, month: 0, year: 0 };
        if (typeof selDate === 'string') {
            /** @type {?} */
            const sd = (/** @type {?} */ (selDate));
            /** @type {?} */
            const df = this.opts.dateFormat;
            /** @type {?} */
            const delimeters = this.utilService.getDateFormatDelimeters(df);
            /** @type {?} */
            const dateValue = this.utilService.getDateValue(sd, df, delimeters);
            date.year = this.utilService.getNumberByValue(dateValue[0]);
            if (df.indexOf('mmmm') !== -1) {
                date.month = this.utilService.getMonthNumberByMonthName(dateValue[1], this.opts.monthLabelsFull);
            }
            else if (df.indexOf('mmm') !== -1) {
                date.month = this.utilService.getMonthNumberByMonthName(dateValue[1], this.opts.monthLabels);
            }
            else {
                date.month = this.utilService.getNumberByValue(dateValue[1]);
            }
            date.day = this.utilService.getNumberByValue(dateValue[2]);
        }
        else if (typeof selDate === 'object') {
            date = selDate;
        }
        this.selectionDayTxt = this.formatDate(date);
        return date;
    }
    /**
     * @param {?} ms
     * @return {?}
     */
    parseSelectedMonth(ms) {
        return this.utilService.parseDefaultMonth(ms);
    }
    /**
     * @param {?} m
     * @param {?} y
     * @return {?}
     */
    setHeaderBtnDisabledState(m, y) {
        /** @type {?} */
        let dpm = false;
        /** @type {?} */
        let dpy = false;
        /** @type {?} */
        let dnm = false;
        /** @type {?} */
        let dny = false;
        if (this.opts.disableHeaderButtons) {
            dpm = this.utilService.isMonthDisabledByDisableUntil({
                year: m === 1 ? y - 1 : y,
                month: m === 1 ? 12 : m - 1,
                day: this.daysInMonth(m === 1 ? 12 : m - 1, m === 1 ? y - 1 : y),
            }, this.opts.disableUntil);
            dpy = this.utilService.isMonthDisabledByDisableUntil({
                year: y - 1,
                month: m,
                day: this.daysInMonth(m, y - 1),
            }, this.opts.disableUntil);
            dnm = this.utilService.isMonthDisabledByDisableSince({
                year: m === 12 ? y + 1 : y,
                month: m === 12 ? 1 : m + 1,
                day: 1,
            }, this.opts.disableSince);
            dny = this.utilService.isMonthDisabledByDisableSince({ year: y + 1, month: m, day: 1 }, this.opts.disableSince);
        }
        this.prevMonthDisabled = (m === 1 && y === this.opts.minYear) || dpm;
        this.prevYearDisabled = y - 1 < this.opts.minYear || dpy;
        this.nextMonthDisabled = (m === 12 && y === this.opts.maxYear) || dnm;
        this.nextYearDisabled = y + 1 > this.opts.maxYear || dny;
    }
    /**
     * @return {?}
     */
    checkActive() {
        if (this.placeholder.length > 0) {
            return true;
        }
        if (this.labelActive) {
            return true;
        }
        if (this.isDateSelected) {
            return true;
        }
        return false;
    }
    // INLINE DATE PICKER
    /**
     * @return {?}
     */
    toggleInlineDatePicker() {
        if (this.isOpen) {
            this.closeBtnClicked();
        }
        else {
            this.openBtnClicked();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onWindowClick(event) {
        if (this.isOpen &&
            this.inline &&
            !this.utils.getClosestEl(event.target, '.datepicker-inline-icon') &&
            !this.utils.getClosestEl(event.target, '.datepicker-inline-icon') &&
            !this.utils.getClosestEl(event.target, '.picker__frame') &&
            !this.utils.getClosestEl(event.target, '.mydp-date')) {
            this.closeBtnClicked();
        }
    }
}
MDBDatePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-date-picker',
                exportAs: 'mdbdatepicker',
                template: "<!-- Line 27: Deleted (focus)=\"onFocusInput($event)\" for better use in Firefox. If other strange problems will occur, please paste it in line 27. -->\r\n<div\r\n  class=\"mydp picker\"\r\n  [ngClass]=\"{ 'picker--opened': showSelector }\"\r\n  [ngStyle]=\"{ width: opts.width }\"\r\n  *ngIf=\"!inline\"\r\n>\r\n  <div class=\"md-form\" [ngClass]=\"{ 'md-outline': outlineInput }\">\r\n    <input\r\n      type=\"text\"\r\n      class=\"form-control mydp-date\"\r\n      [readonly]=\"!opts.editableDateField\"\r\n      [attr.aria-label]=\"opts.ariaLabelInputField\"\r\n      (mousedown)=\"openBtnClicked()\"\r\n      [attr.maxlength]=\"opts.dateFormat.length\"\r\n      [ngClass]=\"{\r\n        selectiondisabled: opts.componentDisabled,\r\n        disabled: opts.componentDisabled\r\n      }\"\r\n      placeholder=\"{{ placeholder }}\"\r\n      [ngModel]=\"selectionDayTxt\"\r\n      (ngModelChange)=\"onUserDateInput($event)\"\r\n      [value]=\"selectionDayTxt\"\r\n      [ngStyle]=\"{\r\n        'font-size': opts.selectionTxtFontSize\r\n      }\"\r\n      (blur)=\"onBlurInput($event)\"\r\n      (focus)=\"onFocusInput($event)\"\r\n      [disabled]=\"opts.componentDisabled || isDisabled\"\r\n      autocomplete=\"off\"\r\n      [tabindex]=\"tabIndex\"\r\n    />\r\n    <label\r\n      (click)=\"openBtnClicked()\"\r\n      *ngIf=\"label.length > 0\"\r\n      [ngClass]=\"{\r\n        active: checkActive(),\r\n        disabled: opts.componentDisabled\r\n      }\"\r\n      >{{ label }}</label\r\n    >\r\n  </div>\r\n  <div\r\n    *ngIf=\"showSelector\"\r\n    class=\"selector picker__holder selectorarrow selectorarrowleft selectorarrowright\"\r\n    #divFocus\r\n    [ngClass]=\"{ alignselectorright: opts.alignSelectorRight }\"\r\n    tabindex=\"0\"\r\n  >\r\n    <div class=\"picker__frame picker__box\" #pickerFrame>\r\n      <div class=\"picker__header\">\r\n        <div class=\"picker__date-display\">\r\n          <div class=\"picker__weekday-display\">\r\n            {{ weekText(getWeekday(tmp)) }}\r\n          </div>\r\n          <div class=\"picker__month-display\">\r\n            <div>{{ monthText(tmp.month) }}</div>\r\n          </div>\r\n          <div class=\"picker__day-display\">\r\n            <div>{{ tmp.day }}</div>\r\n          </div>\r\n          <div class=\"picker__year-display\">\r\n            <div>{{ tmp.year }}</div>\r\n          </div>\r\n        </div>\r\n        <select\r\n          class=\"picker__select--year\"\r\n          [(ngModel)]=\"visibleMonth.year\"\r\n          (ngModelChange)=\"onUserYearInput($event)\"\r\n          role=\"menu\"\r\n          aria-label=\"Year selector\"\r\n        >\r\n          <option *ngFor=\"let year of years\" [value]=\"year\">{{ year }}</option>\r\n        </select>\r\n        <select\r\n          class=\"picker__select--month\"\r\n          [(ngModel)]=\"visibleMonth.monthTxt\"\r\n          (ngModelChange)=\"onUserMonthInput($event)\"\r\n          role=\"menu\"\r\n          aria-label=\"Month selector\"\r\n        >\r\n          <option *ngFor=\"let month of months\" [value]=\"month.short\">{{ month.label }}</option>\r\n        </select>\r\n        <a\r\n          href=\"javascript:;\"\r\n          role=\"button\"\r\n          class=\"picker__nav--prev black-text\"\r\n          data-nav=\"-1\"\r\n          aria-controls=\"date-picker-example_table\"\r\n          title=\"Previous month\"\r\n          (click)=\"prevMonth($event)\"\r\n          (keydown.enter)=\"prevMonth($event)\"\r\n          [ngClass]=\"{\r\n            headerbtnenabled: !prevMonthDisabled,\r\n            headerbtndisabled: prevMonthDisabled,\r\n            'disabled grey-text': prevMonthDisabled\r\n          }\"\r\n        ></a>\r\n        <a\r\n          role=\"button\"\r\n          href=\"javascript:;\"\r\n          class=\"picker__nav--next black-text\"\r\n          data-nav=\"1\"\r\n          aria-controls=\"date-picker-example_table\"\r\n          title=\"Next month\"\r\n          (click)=\"nextMonth($event)\"\r\n          (keydown.enter)=\"nextMonth($event)\"\r\n          [ngClass]=\"{\r\n            headerbtnenabled: !nextMonthDisabled,\r\n            headerbtndisabled: nextMonthDisabled,\r\n            'disabled grey-text': nextMonthDisabled\r\n          }\"\r\n        ></a>\r\n      </div>\r\n      <table class=\"picker__table\">\r\n        <thead>\r\n          <tr>\r\n            <th\r\n              class=\"picker__weekday weekdaytitleweeknbr\"\r\n              *ngIf=\"opts.showWeekNumbers && opts.firstDayOfWeek === 'mo'\"\r\n            >\r\n              #\r\n            </th>\r\n            <th class=\"picker__weekday\" scope=\"col\" *ngFor=\"let d of weekDays\">{{ d }}</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let w of dates\">\r\n            <td\r\n              class=\"picker__day daycellweeknbr\"\r\n              *ngIf=\"opts.showWeekNumbers && opts.firstDayOfWeek === 'mo'\"\r\n            >\r\n              {{ w.weekNbr }}\r\n            </td>\r\n            <td\r\n              class=\"picker__day\"\r\n              *ngFor=\"let d of w.week\"\r\n              [ngClass]=\"{\r\n                'picker__day--infocus': d.cmo === currMonthId && !d.disabled,\r\n                disabled: d.disabled,\r\n                tablesingleday: d.cmo === currMonthId && !d.disabled\r\n              }\"\r\n            >\r\n              <div\r\n                *ngIf=\"d.markedDate.marked\"\r\n                class=\"markdate\"\r\n                [ngStyle]=\"{ 'background-color': d.markedDate.color }\"\r\n              ></div>\r\n              <div\r\n                class=\"picker__day\"\r\n                [ngClass]=\"{\r\n                  'picker__day--infocus': d.cmo === currMonthId,\r\n                  'picker__day--outfocus': d.cmo === nextMonthId || d.cmo === prevMonthId,\r\n                  'picker__day--today': d.currDay && opts.markCurrentDay,\r\n                  'picker__day--selected picker__day--highlighted':\r\n                    selectedDate.day === d.dateObj.day &&\r\n                    selectedDate.month === d.dateObj.month &&\r\n                    selectedDate.year === d.dateObj.year &&\r\n                    d.cmo === currMonthId\r\n                }\"\r\n                (click)=\"!d.disabled && cellClicked(d); $event.stopPropagation()\"\r\n                (keydown)=\"cellKeyDown($event, d)\"\r\n                tabindex=\"0\"\r\n              >\r\n                {{ d.dateObj.day }}\r\n              </div>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <div class=\"picker__footer\">\r\n        <button\r\n          type=\"button\"\r\n          *ngIf=\"opts.showTodayBtn\"\r\n          class=\"picker__button--today\"\r\n          (click)=\"todayClicked()\"\r\n          role=\"button\"\r\n          [attr.aria-label]=\"opts.todayBtnTxt\"\r\n        >\r\n          {{ opts.todayBtnTxt }}\r\n        </button>\r\n        <button\r\n          type=\"button\"\r\n          *ngIf=\"opts.showClearDateBtn\"\r\n          class=\"picker__button--clear\"\r\n          (click)=\"removeBtnClicked()\"\r\n          role=\"button\"\r\n          [attr.aria-label]=\"opts.clearBtnTxt\"\r\n        >\r\n          {{ opts.clearBtnTxt }}\r\n        </button>\r\n        <button\r\n          type=\"button\"\r\n          [ngClass]=\"{ 'ml-auto': !opts.showTodayBtn }\"\r\n          class=\"picker__button--close\"\r\n          (click)=\"closeBtnClicked()\"\r\n          role=\"button\"\r\n          [attr.aria-label]=\"opts.closeBtnTxt\"\r\n        >\r\n          {{ opts.closeBtnTxt }}\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div\r\n  class=\"md-form my-0 d-flex align-items-center justify-content-center\"\r\n  *ngIf=\"inline\"\r\n  [ngClass]=\"{ 'md-outline': outlineInput }\"\r\n>\r\n  <input\r\n    type=\"text\"\r\n    class=\"form-control mydp-date\"\r\n    [readonly]=\"!opts.editableDateField\"\r\n    [attr.aria-label]=\"opts.ariaLabelInputField\"\r\n    [attr.maxlength]=\"opts.dateFormat.length\"\r\n    [ngClass]=\"{\r\n      selectiondisabled: opts.componentDisabled,\r\n      disabled: opts.componentDisabled\r\n    }\"\r\n    placeholder=\"{{ placeholder }}\"\r\n    [ngModel]=\"selectionDayTxt\"\r\n    (ngModelChange)=\"onUserDateInput($event)\"\r\n    [value]=\"selectionDayTxt\"\r\n    [ngStyle]=\"{\r\n      'font-size': opts.selectionTxtFontSize\r\n    }\"\r\n    (focus)=\"onFocusInput($event)\"\r\n    (blur)=\"onBlurInput($event)\"\r\n    [disabled]=\"opts.componentDisabled || isDisabled\"\r\n    autocomplete=\"off\"\r\n    [tabindex]=\"tabIndex\"\r\n  />\r\n  <label\r\n    (click)=\"openBtnClicked()\"\r\n    *ngIf=\"label.length > 0\"\r\n    [ngClass]=\"{\r\n      active: checkActive(),\r\n      disabled: opts.componentDisabled\r\n    }\"\r\n    >{{ label }}</label\r\n  >\r\n  <i [ngClass]=\"inlineIcon\" class=\"datepicker-inline-icon\" (click)=\"toggleInlineDatePicker()\"></i>\r\n</div>\r\n<div\r\n  class=\"mydp picker datepicker-inline\"\r\n  [ngClass]=\"{ 'picker--opened': showSelector }\"\r\n  *ngIf=\"inline && isOpen\"\r\n>\r\n  <div class=\"picker__frame picker__box z-depth-1\" #pickerFrame [ngClass]=\"{ 'd-none': !isOpen }\">\r\n    <div class=\"picker__header d-flex flex-center\">\r\n      <select\r\n        class=\"picker__select--year\"\r\n        [(ngModel)]=\"visibleMonth.year\"\r\n        (ngModelChange)=\"onUserYearInput($event)\"\r\n        role=\"menu\"\r\n        aria-label=\"Year selector\"\r\n      >\r\n        <option *ngFor=\"let year of years\" [value]=\"year\">{{ year }}</option>\r\n      </select>\r\n      <select\r\n        class=\"picker__select--month\"\r\n        [(ngModel)]=\"visibleMonth.monthTxt\"\r\n        (ngModelChange)=\"onUserMonthInput($event)\"\r\n        role=\"menu\"\r\n        aria-label=\"Month selector\"\r\n      >\r\n        <option *ngFor=\"let month of months\" [value]=\"month.short\">{{ month.label }}</option>\r\n      </select>\r\n      <a\r\n        href=\"javascript:;\"\r\n        type=\"button\"\r\n        role=\"button\"\r\n        class=\"picker__nav--prev black-text\"\r\n        data-nav=\"-1\"\r\n        aria-controls=\"date-picker-example_table\"\r\n        title=\"Previous month\"\r\n        (click)=\"prevMonth($event)\"\r\n        (keydown.enter)=\"prevMonth($event)\"\r\n        [ngClass]=\"{\r\n          headerbtnenabled: !prevMonthDisabled,\r\n          headerbtndisabled: prevMonthDisabled,\r\n          'disabled grey-text': prevMonthDisabled\r\n        }\"\r\n      ></a>\r\n      <a\r\n        href=\"javascript:;\"\r\n        type=\"button\"\r\n        role=\"button\"\r\n        class=\"picker__nav--next black-text\"\r\n        data-nav=\"1\"\r\n        aria-controls=\"date-picker-example_table\"\r\n        title=\"Next month\"\r\n        (click)=\"nextMonth($event)\"\r\n        (keydown.enter)=\"nextMonth($event)\"\r\n        [ngClass]=\"{\r\n          headerbtnenabled: !nextMonthDisabled,\r\n          headerbtndisabled: nextMonthDisabled,\r\n          'disabled grey-text': nextMonthDisabled\r\n        }\"\r\n      ></a>\r\n    </div>\r\n    <table class=\"picker__table\">\r\n      <thead>\r\n        <tr>\r\n          <th\r\n            class=\"picker__weekday weekdaytitleweeknbr\"\r\n            *ngIf=\"opts.showWeekNumbers && opts.firstDayOfWeek === 'mo'\"\r\n          >\r\n            #\r\n          </th>\r\n          <th class=\"picker__weekday\" scope=\"col\" *ngFor=\"let d of weekDays\">{{ d }}</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let w of dates\">\r\n          <td\r\n            class=\"picker__day daycellweeknbr\"\r\n            *ngIf=\"opts.showWeekNumbers && opts.firstDayOfWeek === 'mo'\"\r\n          >\r\n            {{ w.weekNbr }}\r\n          </td>\r\n          <td\r\n            class=\"picker__day\"\r\n            *ngFor=\"let d of w.week\"\r\n            [ngClass]=\"{\r\n              'picker__day--infocus': d.cmo === currMonthId && !d.disabled,\r\n              disabled: d.disabled,\r\n              tablesingleday: d.cmo === currMonthId && !d.disabled\r\n            }\"\r\n          >\r\n            <div\r\n              *ngIf=\"d.markedDate.marked\"\r\n              class=\"markdate\"\r\n              [ngStyle]=\"{ 'background-color': d.markedDate.color }\"\r\n            ></div>\r\n            <div\r\n              class=\"picker__day\"\r\n              [ngClass]=\"{\r\n                'picker__day--infocus': d.cmo === currMonthId,\r\n                'picker__day--outfocus': d.cmo === nextMonthId || d.cmo === prevMonthId,\r\n                'picker__day--today': d.currDay && opts.markCurrentDay,\r\n                'picker__day--selected picker__day--highlighted':\r\n                  selectedDate.day === d.dateObj.day &&\r\n                  selectedDate.month === d.dateObj.month &&\r\n                  selectedDate.year === d.dateObj.year &&\r\n                  d.cmo === currMonthId\r\n              }\"\r\n              (click)=\"!d.disabled && cellClicked(d); $event.stopPropagation()\"\r\n              (keydown)=\"cellKeyDown($event, d)\"\r\n              tabindex=\"0\"\r\n            >\r\n              {{ d.dateObj.day }}\r\n            </div>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n    <div class=\"picker__footer\">\r\n      <button\r\n        type=\"button\"\r\n        *ngIf=\"opts.showTodayBtn\"\r\n        class=\"picker__button--today\"\r\n        (click)=\"todayClicked()\"\r\n        role=\"button\"\r\n        [attr.aria-label]=\"opts.todayBtnTxt\"\r\n      >\r\n        {{ opts.todayBtnTxt }}\r\n      </button>\r\n      <button\r\n        type=\"button\"\r\n        *ngIf=\"opts.showClearDateBtn\"\r\n        class=\"picker__button--clear\"\r\n        (click)=\"removeBtnClicked()\"\r\n        role=\"button\"\r\n        [attr.aria-label]=\"opts.clearBtnTxt\"\r\n      >\r\n        {{ opts.clearBtnTxt }}\r\n      </button>\r\n      <button\r\n        type=\"button\"\r\n        [ngClass]=\"{ 'ml-auto': !opts.showTodayBtn }\"\r\n        class=\"picker__button--close\"\r\n        (click)=\"closeBtnClicked()\"\r\n        role=\"button\"\r\n        [attr.aria-label]=\"opts.closeBtnTxt\"\r\n      >\r\n        {{ opts.closeBtnTxt }}\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                providers: [UtilService, MYDP_VALUE_ACCESSOR],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mdb-color.lighten-5{background-color:#d0d6e2!important}.mdb-color.lighten-4{background-color:#b1bace!important}.mdb-color.lighten-3{background-color:#929fba!important}.mdb-color.lighten-2{background-color:#7283a7!important}.mdb-color.lighten-1{background-color:#59698d!important}.mdb-color{background-color:#45526e!important}.mdb-color-text{color:#45526e!important}.rgba-mdb-color-slight,.rgba-mdb-color-slight:after{background-color:rgba(69,82,110,.1)}.rgba-mdb-color-light,.rgba-mdb-color-light:after{background-color:rgba(69,82,110,.3)}.rgba-mdb-color-strong,.rgba-mdb-color-strong:after{background-color:rgba(69,82,110,.7)}.mdb-color.darken-1{background-color:#3b465e!important}.mdb-color.darken-2{background-color:#2e3951!important}.mdb-color.darken-3{background-color:#1c2a48!important}.mdb-color.darken-4{background-color:#1c2331!important}.red.lighten-5{background-color:#ffebee!important}.red.lighten-4{background-color:#ffcdd2!important}.red.lighten-3{background-color:#ef9a9a!important}.red.lighten-2{background-color:#e57373!important}.red.lighten-1{background-color:#ef5350!important}.red{background-color:#f44336!important}.red-text{color:#f44336!important}.rgba-red-slight,.rgba-red-slight:after{background-color:rgba(244,67,54,.1)}.rgba-red-light,.rgba-red-light:after{background-color:rgba(244,67,54,.3)}.rgba-red-strong,.rgba-red-strong:after{background-color:rgba(244,67,54,.7)}.red.darken-1{background-color:#e53935!important}.red.darken-2{background-color:#d32f2f!important}.red.darken-3{background-color:#c62828!important}.red.darken-4{background-color:#b71c1c!important}.red.accent-1{background-color:#ff8a80!important}.red.accent-2{background-color:#ff5252!important}.red.accent-3{background-color:#ff1744!important}.red.accent-4{background-color:#d50000!important}.pink.lighten-5{background-color:#fce4ec!important}.pink.lighten-4{background-color:#f8bbd0!important}.pink.lighten-3{background-color:#f48fb1!important}.pink.lighten-2{background-color:#f06292!important}.pink.lighten-1{background-color:#ec407a!important}.pink{background-color:#e91e63!important}.pink-text{color:#e91e63!important}.rgba-pink-slight,.rgba-pink-slight:after{background-color:rgba(233,30,99,.1)}.rgba-pink-light,.rgba-pink-light:after{background-color:rgba(233,30,99,.3)}.rgba-pink-strong,.rgba-pink-strong:after{background-color:rgba(233,30,99,.7)}.pink.darken-1{background-color:#d81b60!important}.pink.darken-2{background-color:#c2185b!important}.pink.darken-3{background-color:#ad1457!important}.pink.darken-4{background-color:#880e4f!important}.pink.accent-1{background-color:#ff80ab!important}.pink.accent-2{background-color:#ff4081!important}.pink.accent-3{background-color:#f50057!important}.pink.accent-4{background-color:#c51162!important}.purple.lighten-5{background-color:#f3e5f5!important}.purple.lighten-4{background-color:#e1bee7!important}.purple.lighten-3{background-color:#ce93d8!important}.purple.lighten-2{background-color:#ba68c8!important}.purple.lighten-1{background-color:#ab47bc!important}.purple{background-color:#9c27b0!important}.purple-text{color:#9c27b0!important}.rgba-purple-slight,.rgba-purple-slight:after{background-color:rgba(156,39,176,.1)}.rgba-purple-light,.rgba-purple-light:after{background-color:rgba(156,39,176,.3)}.rgba-purple-strong,.rgba-purple-strong:after{background-color:rgba(156,39,176,.7)}.purple.darken-1{background-color:#8e24aa!important}.purple.darken-2{background-color:#7b1fa2!important}.purple.darken-3{background-color:#6a1b9a!important}.purple.darken-4{background-color:#4a148c!important}.purple.accent-1{background-color:#ea80fc!important}.purple.accent-2{background-color:#e040fb!important}.purple.accent-3{background-color:#d500f9!important}.purple.accent-4{background-color:#a0f!important}.deep-purple.lighten-5{background-color:#ede7f6!important}.deep-purple.lighten-4{background-color:#d1c4e9!important}.deep-purple.lighten-3{background-color:#b39ddb!important}.deep-purple.lighten-2{background-color:#9575cd!important}.deep-purple.lighten-1{background-color:#7e57c2!important}.deep-purple{background-color:#673ab7!important}.deep-purple-text{color:#673ab7!important}.rgba-deep-purple-slight,.rgba-deep-purple-slight:after{background-color:rgba(103,58,183,.1)}.rgba-deep-purple-light,.rgba-deep-purple-light:after{background-color:rgba(103,58,183,.3)}.rgba-deep-purple-strong,.rgba-deep-purple-strong:after{background-color:rgba(103,58,183,.7)}.deep-purple.darken-1{background-color:#5e35b1!important}.deep-purple.darken-2{background-color:#512da8!important}.deep-purple.darken-3{background-color:#4527a0!important}.deep-purple.darken-4{background-color:#311b92!important}.deep-purple.accent-1{background-color:#b388ff!important}.deep-purple.accent-2{background-color:#7c4dff!important}.deep-purple.accent-3{background-color:#651fff!important}.deep-purple.accent-4{background-color:#6200ea!important}.indigo.lighten-5{background-color:#e8eaf6!important}.indigo.lighten-4{background-color:#c5cae9!important}.indigo.lighten-3{background-color:#9fa8da!important}.indigo.lighten-2{background-color:#7986cb!important}.indigo.lighten-1{background-color:#5c6bc0!important}.indigo{background-color:#3f51b5!important}.indigo-text{color:#3f51b5!important}.rgba-indigo-slight,.rgba-indigo-slight:after{background-color:rgba(63,81,181,.1)}.rgba-indigo-light,.rgba-indigo-light:after{background-color:rgba(63,81,181,.3)}.rgba-indigo-strong,.rgba-indigo-strong:after{background-color:rgba(63,81,181,.7)}.indigo.darken-1{background-color:#3949ab!important}.indigo.darken-2{background-color:#303f9f!important}.indigo.darken-3{background-color:#283593!important}.indigo.darken-4{background-color:#1a237e!important}.indigo.accent-1{background-color:#8c9eff!important}.indigo.accent-2{background-color:#536dfe!important}.indigo.accent-3{background-color:#3d5afe!important}.indigo.accent-4{background-color:#304ffe!important}.blue.lighten-5{background-color:#e3f2fd!important}.blue.lighten-4{background-color:#bbdefb!important}.blue.lighten-3{background-color:#90caf9!important}.blue.lighten-2{background-color:#64b5f6!important}.blue.lighten-1{background-color:#42a5f5!important}.blue{background-color:#2196f3!important}.blue-text{color:#2196f3!important}.rgba-blue-slight,.rgba-blue-slight:after{background-color:rgba(33,150,243,.1)}.rgba-blue-light,.rgba-blue-light:after{background-color:rgba(33,150,243,.3)}.rgba-blue-strong,.rgba-blue-strong:after{background-color:rgba(33,150,243,.7)}.blue.darken-1{background-color:#1e88e5!important}.blue.darken-2{background-color:#1976d2!important}.blue.darken-3{background-color:#1565c0!important}.blue.darken-4{background-color:#0d47a1!important}.blue.accent-1{background-color:#82b1ff!important}.blue.accent-2{background-color:#448aff!important}.blue.accent-3{background-color:#2979ff!important}.blue.accent-4{background-color:#2962ff!important}.light-blue.lighten-5{background-color:#e1f5fe!important}.light-blue.lighten-4{background-color:#b3e5fc!important}.light-blue.lighten-3{background-color:#81d4fa!important}.light-blue.lighten-2{background-color:#4fc3f7!important}.light-blue.lighten-1{background-color:#29b6f6!important}.light-blue{background-color:#03a9f4!important}.light-blue-text{color:#03a9f4!important}.rgba-light-blue-slight,.rgba-light-blue-slight:after{background-color:rgba(3,169,244,.1)}.rgba-light-blue-light,.rgba-light-blue-light:after{background-color:rgba(3,169,244,.3)}.rgba-light-blue-strong,.rgba-light-blue-strong:after{background-color:rgba(3,169,244,.7)}.light-blue.darken-1{background-color:#039be5!important}.light-blue.darken-2{background-color:#0288d1!important}.light-blue.darken-3{background-color:#0277bd!important}.light-blue.darken-4{background-color:#01579b!important}.light-blue.accent-1{background-color:#80d8ff!important}.light-blue.accent-2{background-color:#40c4ff!important}.light-blue.accent-3{background-color:#00b0ff!important}.light-blue.accent-4{background-color:#0091ea!important}.cyan.lighten-5{background-color:#e0f7fa!important}.cyan.lighten-4{background-color:#b2ebf2!important}.cyan.lighten-3{background-color:#80deea!important}.cyan.lighten-2{background-color:#4dd0e1!important}.cyan.lighten-1{background-color:#26c6da!important}.cyan{background-color:#00bcd4!important}.cyan-text{color:#00bcd4!important}.rgba-cyan-slight,.rgba-cyan-slight:after{background-color:rgba(0,188,212,.1)}.rgba-cyan-light,.rgba-cyan-light:after{background-color:rgba(0,188,212,.3)}.rgba-cyan-strong,.rgba-cyan-strong:after{background-color:rgba(0,188,212,.7)}.cyan.darken-1{background-color:#00acc1!important}.cyan.darken-2{background-color:#0097a7!important}.cyan.darken-3{background-color:#00838f!important}.cyan.darken-4{background-color:#006064!important}.cyan.accent-1{background-color:#84ffff!important}.cyan.accent-2{background-color:#18ffff!important}.cyan.accent-3{background-color:#00e5ff!important}.cyan.accent-4{background-color:#00b8d4!important}.teal.lighten-5{background-color:#e0f2f1!important}.teal.lighten-4{background-color:#b2dfdb!important}.teal.lighten-3{background-color:#80cbc4!important}.teal.lighten-2{background-color:#4db6ac!important}.teal.lighten-1{background-color:#26a69a!important}.teal{background-color:#009688!important}.teal-text{color:#009688!important}.rgba-teal-slight,.rgba-teal-slight:after{background-color:rgba(0,150,136,.1)}.rgba-teal-light,.rgba-teal-light:after{background-color:rgba(0,150,136,.3)}.rgba-teal-strong,.rgba-teal-strong:after{background-color:rgba(0,150,136,.7)}.teal.darken-1{background-color:#00897b!important}.teal.darken-2{background-color:#00796b!important}.teal.darken-3{background-color:#00695c!important}.teal.darken-4{background-color:#004d40!important}.teal.accent-1{background-color:#a7ffeb!important}.teal.accent-2{background-color:#64ffda!important}.teal.accent-3{background-color:#1de9b6!important}.teal.accent-4{background-color:#00bfa5!important}.green.lighten-5{background-color:#e8f5e9!important}.green.lighten-4{background-color:#c8e6c9!important}.green.lighten-3{background-color:#a5d6a7!important}.green.lighten-2{background-color:#81c784!important}.green.lighten-1{background-color:#66bb6a!important}.green{background-color:#4caf50!important}.green-text{color:#4caf50!important}.rgba-green-slight,.rgba-green-slight:after{background-color:rgba(76,175,80,.1)}.rgba-green-light,.rgba-green-light:after{background-color:rgba(76,175,80,.3)}.rgba-green-strong,.rgba-green-strong:after{background-color:rgba(76,175,80,.7)}.green.darken-1{background-color:#43a047!important}.green.darken-2{background-color:#388e3c!important}.green.darken-3{background-color:#2e7d32!important}.green.darken-4{background-color:#1b5e20!important}.green.accent-1{background-color:#b9f6ca!important}.green.accent-2{background-color:#69f0ae!important}.green.accent-3{background-color:#00e676!important}.green.accent-4{background-color:#00c853!important}.light-green.lighten-5{background-color:#f1f8e9!important}.light-green.lighten-4{background-color:#dcedc8!important}.light-green.lighten-3{background-color:#c5e1a5!important}.light-green.lighten-2{background-color:#aed581!important}.light-green.lighten-1{background-color:#9ccc65!important}.light-green{background-color:#8bc34a!important}.light-green-text{color:#8bc34a!important}.rgba-light-green-slight,.rgba-light-green-slight:after{background-color:rgba(139,195,74,.1)}.rgba-light-green-light,.rgba-light-green-light:after{background-color:rgba(139,195,74,.3)}.rgba-light-green-strong,.rgba-light-green-strong:after{background-color:rgba(139,195,74,.7)}.light-green.darken-1{background-color:#7cb342!important}.light-green.darken-2{background-color:#689f38!important}.light-green.darken-3{background-color:#558b2f!important}.light-green.darken-4{background-color:#33691e!important}.light-green.accent-1{background-color:#ccff90!important}.light-green.accent-2{background-color:#b2ff59!important}.light-green.accent-3{background-color:#76ff03!important}.light-green.accent-4{background-color:#64dd17!important}.lime.lighten-5{background-color:#f9fbe7!important}.lime.lighten-4{background-color:#f0f4c3!important}.lime.lighten-3{background-color:#e6ee9c!important}.lime.lighten-2{background-color:#dce775!important}.lime.lighten-1{background-color:#d4e157!important}.lime{background-color:#cddc39!important}.lime-text{color:#cddc39!important}.rgba-lime-slight,.rgba-lime-slight:after{background-color:rgba(205,220,57,.1)}.rgba-lime-light,.rgba-lime-light:after{background-color:rgba(205,220,57,.3)}.rgba-lime-strong,.rgba-lime-strong:after{background-color:rgba(205,220,57,.7)}.lime.darken-1{background-color:#c0ca33!important}.lime.darken-2{background-color:#afb42b!important}.lime.darken-3{background-color:#9e9d24!important}.lime.darken-4{background-color:#827717!important}.lime.accent-1{background-color:#f4ff81!important}.lime.accent-2{background-color:#eeff41!important}.lime.accent-3{background-color:#c6ff00!important}.lime.accent-4{background-color:#aeea00!important}.yellow.lighten-5{background-color:#fffde7!important}.yellow.lighten-4{background-color:#fff9c4!important}.yellow.lighten-3{background-color:#fff59d!important}.yellow.lighten-2{background-color:#fff176!important}.yellow.lighten-1{background-color:#ffee58!important}.yellow{background-color:#ffeb3b!important}.yellow-text{color:#ffeb3b!important}.rgba-yellow-slight,.rgba-yellow-slight:after{background-color:rgba(255,235,59,.1)}.rgba-yellow-light,.rgba-yellow-light:after{background-color:rgba(255,235,59,.3)}.rgba-yellow-strong,.rgba-yellow-strong:after{background-color:rgba(255,235,59,.7)}.yellow.darken-1{background-color:#fdd835!important}.yellow.darken-2{background-color:#fbc02d!important}.yellow.darken-3{background-color:#f9a825!important}.yellow.darken-4{background-color:#f57f17!important}.yellow.accent-1{background-color:#ffff8d!important}.yellow.accent-2{background-color:#ff0!important}.yellow.accent-3{background-color:#ffea00!important}.yellow.accent-4{background-color:#ffd600!important}.amber.lighten-5{background-color:#fff8e1!important}.amber.lighten-4{background-color:#ffecb3!important}.amber.lighten-3{background-color:#ffe082!important}.amber.lighten-2{background-color:#ffd54f!important}.amber.lighten-1{background-color:#ffca28!important}.amber{background-color:#ffc107!important}.amber-text{color:#ffc107!important}.rgba-amber-slight,.rgba-amber-slight:after{background-color:rgba(255,193,7,.1)}.rgba-amber-light,.rgba-amber-light:after{background-color:rgba(255,193,7,.3)}.rgba-amber-strong,.rgba-amber-strong:after{background-color:rgba(255,193,7,.7)}.amber.darken-1{background-color:#ffb300!important}.amber.darken-2{background-color:#ffa000!important}.amber.darken-3{background-color:#ff8f00!important}.amber.darken-4{background-color:#ff6f00!important}.amber.accent-1{background-color:#ffe57f!important}.amber.accent-2{background-color:#ffd740!important}.amber.accent-3{background-color:#ffc400!important}.amber.accent-4{background-color:#ffab00!important}.orange.lighten-5{background-color:#fff3e0!important}.orange.lighten-4{background-color:#ffe0b2!important}.orange.lighten-3{background-color:#ffcc80!important}.orange.lighten-2{background-color:#ffb74d!important}.orange.lighten-1{background-color:#ffa726!important}.orange{background-color:#ff9800!important}.orange-text{color:#ff9800!important}.rgba-orange-slight,.rgba-orange-slight:after{background-color:rgba(255,152,0,.1)}.rgba-orange-light,.rgba-orange-light:after{background-color:rgba(255,152,0,.3)}.rgba-orange-strong,.rgba-orange-strong:after{background-color:rgba(255,152,0,.7)}.orange.darken-1{background-color:#fb8c00!important}.orange.darken-2{background-color:#f57c00!important}.orange.darken-3{background-color:#ef6c00!important}.orange.darken-4{background-color:#e65100!important}.orange.accent-1{background-color:#ffd180!important}.orange.accent-2{background-color:#ffab40!important}.orange.accent-3{background-color:#ff9100!important}.orange.accent-4{background-color:#ff6d00!important}.deep-orange.lighten-5{background-color:#fbe9e7!important}.deep-orange.lighten-4{background-color:#ffccbc!important}.deep-orange.lighten-3{background-color:#ffab91!important}.deep-orange.lighten-2{background-color:#ff8a65!important}.deep-orange.lighten-1{background-color:#ff7043!important}.deep-orange{background-color:#ff5722!important}.deep-orange-text{color:#ff5722!important}.rgba-deep-orange-slight,.rgba-deep-orange-slight:after{background-color:rgba(255,87,34,.1)}.rgba-deep-orange-light,.rgba-deep-orange-light:after{background-color:rgba(255,87,34,.3)}.rgba-deep-orange-strong,.rgba-deep-orange-strong:after{background-color:rgba(255,87,34,.7)}.deep-orange.darken-1{background-color:#f4511e!important}.deep-orange.darken-2{background-color:#e64a19!important}.deep-orange.darken-3{background-color:#d84315!important}.deep-orange.darken-4{background-color:#bf360c!important}.deep-orange.accent-1{background-color:#ff9e80!important}.deep-orange.accent-2{background-color:#ff6e40!important}.deep-orange.accent-3{background-color:#ff3d00!important}.deep-orange.accent-4{background-color:#dd2c00!important}.brown.lighten-5{background-color:#efebe9!important}.brown.lighten-4{background-color:#d7ccc8!important}.brown.lighten-3{background-color:#bcaaa4!important}.brown.lighten-2{background-color:#a1887f!important}.brown.lighten-1{background-color:#8d6e63!important}.brown{background-color:#795548!important}.brown-text{color:#795548!important}.rgba-brown-slight,.rgba-brown-slight:after{background-color:rgba(121,85,72,.1)}.rgba-brown-light,.rgba-brown-light:after{background-color:rgba(121,85,72,.3)}.rgba-brown-strong,.rgba-brown-strong:after{background-color:rgba(121,85,72,.7)}.brown.darken-1{background-color:#6d4c41!important}.brown.darken-2{background-color:#5d4037!important}.brown.darken-3{background-color:#4e342e!important}.brown.darken-4{background-color:#3e2723!important}.blue-grey.lighten-5{background-color:#eceff1!important}.blue-grey.lighten-4{background-color:#cfd8dc!important}.blue-grey.lighten-3{background-color:#b0bec5!important}.blue-grey.lighten-2{background-color:#90a4ae!important}.blue-grey.lighten-1{background-color:#78909c!important}.blue-grey{background-color:#607d8b!important}.blue-grey-text{color:#607d8b!important}.rgba-blue-grey-slight,.rgba-blue-grey-slight:after{background-color:rgba(96,125,139,.1)}.rgba-blue-grey-light,.rgba-blue-grey-light:after{background-color:rgba(96,125,139,.3)}.rgba-blue-grey-strong,.rgba-blue-grey-strong:after{background-color:rgba(96,125,139,.7)}.blue-grey.darken-1{background-color:#546e7a!important}.blue-grey.darken-2{background-color:#455a64!important}.blue-grey.darken-3{background-color:#37474f!important}.blue-grey.darken-4{background-color:#263238!important}.grey.lighten-5{background-color:#fafafa!important}.grey.lighten-4{background-color:#f5f5f5!important}.grey.lighten-3{background-color:#eee!important}.grey.lighten-2{background-color:#e0e0e0!important}.grey.lighten-1{background-color:#bdbdbd!important}.grey{background-color:#9e9e9e!important}.grey-text{color:#9e9e9e!important}.rgba-grey-slight,.rgba-grey-slight:after{background-color:rgba(158,158,158,.1)}.rgba-grey-light,.rgba-grey-light:after{background-color:rgba(158,158,158,.3)}.rgba-grey-strong,.rgba-grey-strong:after{background-color:rgba(158,158,158,.7)}.grey.darken-1{background-color:#757575!important}.grey.darken-2{background-color:#616161!important}.grey.darken-3{background-color:#424242!important}.grey.darken-4{background-color:#212121!important}.black{background-color:#000!important}.black-text{color:#000!important}.rgba-black-slight,.rgba-black-slight:after{background-color:rgba(0,0,0,.1)}.rgba-black-light,.rgba-black-light:after{background-color:rgba(0,0,0,.3)}.rgba-black-strong,.rgba-black-strong:after{background-color:rgba(0,0,0,.7)}.picker__box .picker__header .picker__select--month.browser-default,.picker__box .picker__header .picker__select--year.browser-default,.white{background-color:#fff!important}.picker__box .picker__header .picker__date-display,.picker__box .picker__table .picker--focused,.picker__box .picker__table .picker__day--outfocus,.picker__box .picker__table .picker__day--selected,.picker__box .picker__table .picker__day--selected:hover,.white-text{color:#fff!important}.rgba-white-slight,.rgba-white-slight:after{background-color:rgba(255,255,255,.1)}.rgba-white-light,.rgba-white-light:after{background-color:rgba(255,255,255,.3)}.rgba-white-strong,.rgba-white-strong:after{background-color:rgba(255,255,255,.7)}.rgba-stylish-slight{background-color:rgba(62,69,81,.1)}.rgba-stylish-light{background-color:rgba(62,69,81,.3)}.rgba-stylish-strong{background-color:rgba(62,69,81,.7)}.primary-color{background-color:#4285f4!important}.primary-color-dark{background-color:#0d47a1!important}.secondary-color{background-color:#a6c!important}.secondary-color-dark{background-color:#93c!important}.default-color{background-color:#2bbbad!important}.default-color-dark{background-color:#00695c!important}.info-color{background-color:#33b5e5!important}.info-color-dark{background-color:#09c!important}.success-color{background-color:#00c851!important}.success-color-dark{background-color:#007e33!important}.warning-color{background-color:#fb3!important}.warning-color-dark{background-color:#f80!important}.danger-color{background-color:#ff3547!important}.danger-color-dark{background-color:#c00!important}.elegant-color{background-color:#2e2e2e!important}.elegant-color-dark{background-color:#212121!important}.stylish-color{background-color:#4b515d!important}.stylish-color-dark{background-color:#3e4551!important}.unique-color{background-color:#3f729b!important}.unique-color-dark{background-color:#1c2331!important}.special-color{background-color:#37474f!important}.special-color-dark{background-color:#263238!important}.purple-gradient{background:linear-gradient(40deg,#ff6ec4,#7873f5)!important}.peach-gradient{background:linear-gradient(40deg,#ffd86f,#fc6262)!important}.aqua-gradient{background:linear-gradient(40deg,#2096ff,#05ffa3)!important}.blue-gradient{background:linear-gradient(40deg,#45cafc,#303f9f)!important}.purple-gradient-rgba{background:linear-gradient(40deg,rgba(255,110,196,.9),rgba(120,115,245,.9))!important}.peach-gradient-rgba{background:linear-gradient(40deg,rgba(255,216,111,.9),rgba(252,98,98,.9))!important}.aqua-gradient-rgba{background:linear-gradient(40deg,rgba(32,150,255,.9),rgba(5,255,163,.9))!important}.blue-gradient-rgba{background:linear-gradient(40deg,rgba(69,202,252,.9),rgba(48,63,159,.9))!important}.dark-grey-text,.dark-grey-text:focus,.dark-grey-text:hover{color:#4f4f4f!important}.hoverable{box-shadow:none;transition:.55s ease-in-out}.hoverable:hover{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);transition:.55s ease-in-out}.z-depth-0{box-shadow:none!important}.z-depth-1{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)!important}.z-depth-1-half{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)!important}.z-depth-2{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)!important}.z-depth-3{box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19)!important}.z-depth-4{box-shadow:0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)!important}.z-depth-5{box-shadow:0 27px 24px 0 rgba(0,0,0,.2),0 40px 77px 0 rgba(0,0,0,.22)!important}.disabled,:disabled{pointer-events:none!important}a{cursor:pointer;text-decoration:none;color:#0275d8;transition:.2s ease-in-out}a:hover{text-decoration:none;color:#014c8c;transition:.2s ease-in-out}a.disabled:hover,a:disabled:hover{color:#0275d8}a:not([href]):not([tabindex]),a:not([href]):not([tabindex]):focus,a:not([href]):not([tabindex]):hover{color:inherit;text-decoration:none}.picker__input{cursor:default}.picker__input.picker__input--active{border-color:#0089ec}.picker{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;/*!\n   * Default mobile-first, responsive styling for pickadate.js\n   * Demo: http://amsul.github.io/pickadate.js\n   */z-index:90;font-size:15px;text-align:left;line-height:1.2;color:#000;position:absolute;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker .picker__holder{width:100%;overflow-scrolling:touch;position:fixed;transition:background .15s ease-out,top .15s;-webkit-backface-visibility:hidden;backface-visibility:hidden}.picker .picker__frame,.picker .picker__holder{bottom:0;left:0;right:0;top:100%}.picker .picker__frame{position:absolute;margin:0 auto;min-width:16rem;max-width:20.3125rem;width:18.75rem;max-height:21.875rem;opacity:0;transition:.15s ease-out}@media (min-height:40.125em){.picker .picker__frame{margin-bottom:7.5%}}.picker .picker__frame .picker__wrap{display:table;width:100%;height:100%}.picker .picker__box{background:#fff;display:table-cell;vertical-align:middle}@media (min-height:28.875em){.picker .picker__frame{overflow:visible;top:auto;bottom:-100%;max-height:80%}.picker .picker__frame .picker__wrap{display:block}.picker .picker__box{display:block;border:1px solid #777;border-top-color:#898989;border-bottom-width:0;border-radius:5px 5px 0 0;box-shadow:0 .75rem 2.25rem 1rem rgba(0,0,0,.24)}}.picker--opened .picker__holder{top:0;background:rgba(0,0,0,.32);zoom:1;transition:background .15s ease-out}.picker--opened .picker__frame{top:0;opacity:1}@media (min-height:35.875em){.picker--opened .picker__frame{top:10%;bottom:auto}}.datepicker.picker__input.picker__input--active,.timepicker.picker__input.picker__input--active{border-bottom:1px solid #e3f2fd}.picker__box{padding:0;border-radius:.125rem;overflow:hidden}.picker__box .picker__header{text-align:center;position:relative;margin-bottom:1.25rem}.picker__box .picker__header select{display:inline-block!important}.picker__box .picker__header .picker__date-display{display:flex;justify-content:center;background-color:#4285f4;font-weight:400;padding-bottom:.3125rem}.picker__box .picker__header .picker__date-display .picker__weekday-display{padding:.875rem .4375rem .3125rem .5rem;letter-spacing:.5;font-size:2.1rem;margin-top:1.25rem}.picker__box .picker__header .picker__date-display .picker__day-display,.picker__box .picker__header .picker__date-display .picker__month-display{font-size:2.1rem;padding:.875rem .3125rem .25rem;margin-top:1.25rem}.picker__box .picker__header .picker__date-display .picker__year-display{font-size:1.1rem;color:rgba(255,255,255,.4);position:absolute;top:.625rem;left:45%}.picker__box .picker__header .picker__month,.picker__box .picker__header .picker__year{display:inline-block;margin-left:.25em;margin-right:.25em}.picker__box .picker__header .picker__select--month,.picker__box .picker__header .picker__select--year{height:2em;padding:0;margin-left:.25em;margin-right:.25em;display:inline-block;border:none;background:0 0;border-bottom:1px solid #ced4da;outline:0}.picker__box .picker__header .picker__select--month:focus,.picker__box .picker__header .picker__select--year:focus{border-color:rgba(0,0,0,.05)}.picker__box .picker__header .picker__select--year{width:30%}.picker__box .picker__header .picker__select--month.browser-default{display:inline;width:40%}.picker__box .picker__header .picker__select--year.browser-default{display:inline;width:25%}.picker__box .picker__header .picker__nav--next,.picker__box .picker__header .picker__nav--prev{position:absolute;padding:.1875rem .625rem;box-sizing:content-box}.picker__box .picker__header .picker__nav--next:hover,.picker__box .picker__header .picker__nav--prev:hover{cursor:pointer;color:#000}.picker__box .picker__header .picker__nav--next:before,.picker__box .picker__header .picker__nav--prev:before{display:block}.picker__box .picker__header .picker__nav--prev{left:-.5em;padding-right:1.25em}.picker__box .picker__header .picker__nav--prev:before{content:'\\f104'}.picker__box .picker__header .picker__nav--next{right:-.2em;padding-left:1.25em}.picker__box .picker__header .picker__nav--next:before{content:'\\f105'}.picker__box .picker__header .picker__nav--disabled,.picker__box .picker__header .picker__nav--disabled:before,.picker__box .picker__header .picker__nav--disabled:before:hover,.picker__box .picker__header .picker__nav--disabled:hover{cursor:default;background:0 0;border-right-color:#f5f5f5;border-left-color:#f5f5f5}.picker__box .picker__table{text-align:center;border-collapse:collapse;border-spacing:0;table-layout:fixed;font-size:1rem;width:100%;margin-top:.75em;margin-bottom:.5em}.picker__box .picker__table td,.picker__box .picker__table th{text-align:center}.picker__box .picker__table td{margin:0;padding:0}.picker__box .picker__table .picker__weekday{width:14%;font-size:.9em;padding-bottom:.25em;color:#999;font-weight:500}@media (min-height:33.875em){.picker__box .picker__table .picker__weekday{padding-bottom:.25em}}.picker__box .picker__table .picker__day--today{position:relative;letter-spacing:-.3;padding:.75rem 0;font-weight:400;border:1px solid transparent}.picker__box .picker__table .picker__day.picker__day--today{color:#4285f4}.picker__box .picker__table .picker__day--disabled:before{border-top-color:#aaa}.picker__box .picker__table .picker__day--infocus{color:#595959;letter-spacing:-.3;padding:.75rem 0;font-weight:400;border:#595959}.picker__box .picker__table .picker__day--infocus:hover{cursor:pointer;color:#000;font-weight:500}.picker__box .picker__table .picker__day--outfocus{display:none;padding:.75rem 0}.picker__box .picker__table .picker__day--outfocus:hover{cursor:pointer;color:#ddd;font-weight:500}.picker__box .picker__table .picker--focused .picker__day--highlighted,.picker__box .picker__table .picker__day--highlighted:hover{cursor:pointer}.picker__box .picker__table .picker--focused,.picker__box .picker__table .picker__day--selected,.picker__box .picker__table .picker__day--selected:hover{border-radius:50%;-webkit-transform:scale(.9);transform:scale(.9);background-color:#4285f4;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)}.picker__box .picker__table .picker--focused.picker__day--outfocus,.picker__box .picker__table .picker__day--selected.picker__day--outfocus,.picker__box .picker__table .picker__day--selected:hover.picker__day--outfocus{background-color:#ecf2fc}.picker__box .picker__table .picker--focused,.picker__box .picker__table .picker__day--disabled,.picker__box .picker__table .picker__day--disabled:hover{background:#f5f5f5;border-color:#f5f5f5;color:#ddd;cursor:default}.picker__box .picker__table .picker__day--highlighted.picker__day--disabled,.picker__box .picker__table .picker__day--highlighted.picker__day--disabled:hover{background:#bbb}.picker__box .picker__footer{text-align:right;padding:.3125rem .625rem;display:flex;align-items:center;justify-content:space-between}.picker__box .picker__footer .picker__button--clear,.picker__box .picker__footer .picker__button--close,.picker__box .picker__footer .picker__button--today{border:1px solid #fff;background:#fff;font-size:.8em;padding:1rem 0 .7rem;font-weight:700;width:33%;display:inline-block;vertical-align:bottom;text-transform:uppercase}.picker__box .picker__footer .picker__button--clear:hover,.picker__box .picker__footer .picker__button--close:hover,.picker__box .picker__footer .picker__button--today:hover{cursor:pointer;color:#000;background:#b1dcfb;border-bottom-color:#b1dcfb}.picker__box .picker__footer .picker__button--clear:focus,.picker__box .picker__footer .picker__button--close:focus,.picker__box .picker__footer .picker__button--today:focus{background:#b1dcfb;border-color:rgba(0,0,0,.05);outline:0}.picker__box .picker__footer .picker__button--clear:before,.picker__box .picker__footer .picker__button--close:before,.picker__box .picker__footer .picker__button--today:before{position:relative;display:inline-block;height:0}.picker__box .picker__footer .picker__button--clear:before,.picker__box .picker__footer .picker__button--today:before{content:' ';margin-right:.45em}.picker__box .picker__footer .picker__button--today:before{top:-.05em;width:0;border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker__box .picker__footer .picker__button--clear:before{top:-.25em;width:.66em;border-top:3px solid #e20}.picker__box .picker__footer .picker__button--close:before{content:'\\D7';top:-.1em;vertical-align:top;font-size:1.1em;margin-right:.35em;color:#777}.picker__box .picker__footer .picker__button--today[disabled],.picker__box .picker__footer .picker__button--today[disabled]:hover{background:#f5f5f5;border-color:#f5f5f5;color:#ddd;cursor:default}.picker__box .picker__footer .picker__button--today[disabled]:before{border-top-color:#aaa}.picker__calendar-container{padding:0 1rem}.picker__calendar-container thead{border:none}.picker__select--month,.picker__select--year{display:inline-block!important;height:2em;padding:0;margin-left:.25em;margin-right:.25em}.picker .picker__holder{overflow-y:visible;display:none}.picker.picker--opened .picker__holder{display:block}.picker__box .picker__table td.picker__day div.picker__day{border-radius:50%}.picker__day-display,.picker__month-display,.picker__weekday-display{font-size:2rem!important}.clockpicker-am-pm-block button{color:#fff!important}.mydp{line-height:1.1;display:inline-block;position:relative;border-radius:4px}.picker__frame:not{min-height:625px!important}.picker__nav--next,.picker__nav--prev{position:absolute;padding:.5em 1.55em;width:1em;height:1em;box-sizing:content-box;bottom:0;border:0;background:0 0}.picker__nav--next:before,.picker__nav--prev:before{font-family:'Font Awesome 5 Pro','Font Awesome 5 Free'!important}.picker__nav--prev{padding-right:1.25em;left:0!important}.picker__nav--next{right:-1em;padding-left:1.25em}.picker__box .picker__header .picker__nav--next:before,.picker__box .picker__header .picker__nav--prev:before{font-family:unset;font-weight:unset;content:unset}.picker__box .picker__header .picker__nav--next:after,.picker__box .picker__header .picker__nav--prev:after{content:'';display:block;border-style:solid;border-width:0 2px 2px 0;padding:2.5px;position:absolute}.picker__nav--prev::after{-webkit-transform:rotate(135deg);transform:rotate(135deg)}.picker__nav--next::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.picker__header{overflow:hidden}.picker__box .picker__table td.picker__day{padding:0;position:relative}.picker__box .picker__table td.picker__day.disabled{color:#ccc;background:#eee}.picker__box .picker__table td.picker__day div.picker__day{color:#595959;letter-spacing:-.3;padding:.75rem 0;font-weight:400;border:1px solid transparent;outline:0;transition:.3s}.picker__box .picker__table td.picker__day div.picker__day:focus,.picker__box .picker__table td.picker__day div.picker__day:hover{cursor:pointer;color:#000;font-weight:500}.picker__box .picker__table td.picker__day div.picker__day.picker__day--today{color:#4285f4}.mydp .markdate{position:absolute;width:5px;height:5px;border-radius:50%;top:2px;right:2px}@media (max-height:35.875em){.picker--opened .picker__holder{overflow-y:scroll}}.validate-success.ng-valid .mydp-date{border-bottom:1px solid #00c851!important;box-shadow:0 1px 0 0 #00c851!important}.validate-success.ng-valid .mydp label{color:#00c851!important}.form-submitted .validate-error.ng-invalid .mydp-date,.validate-error.ng-invalid.ng-touched .mydp-date{border-bottom:1px solid #f44336!important;box-shadow:0 1px 0 0 #f44336!important}.form-submitted .validate-error.ng-invalid .mydp label,.validate-error.ng-invalid.ng-touched .mydp label{color:#f44336!important}.md-form mdb-date-picker .md-form{margin:0}.datepicker-inline-icon{position:absolute;top:5px;right:0;padding:.5rem}.md-outline>.datepicker-inline-icon{top:4px}.datepicker-inline{position:absolute}.datepicker-inline .picker__header{padding:.3125rem .625rem}.datepicker-inline .picker__nav--next,.datepicker-inline .picker__nav--prev{bottom:unset!important}.datepicker-inline .picker__frame{min-height:unset!important;max-height:unset!important;position:unset!important;margin:unset;border:0}"]
            }] }
];
/** @nocollapse */
MDBDatePickerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocaleService },
    { type: UtilService },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
MDBDatePickerComponent.propDecorators = {
    tabIndex: [{ type: Input }],
    options: [{ type: Input }],
    locale: [{ type: Input }],
    defaultMonth: [{ type: Input }],
    selDate: [{ type: Input }],
    label: [{ type: Input }],
    placeholder: [{ type: Input }],
    selector: [{ type: Input }],
    disabled: [{ type: Input }],
    openOnFocus: [{ type: Input }],
    outlineInput: [{ type: Input }],
    inline: [{ type: Input }],
    inlineIcon: [{ type: Input }],
    dateChanged: [{ type: Output }],
    inputFieldChanged: [{ type: Output }],
    calendarViewChanged: [{ type: Output }],
    calendarToggle: [{ type: Output }],
    inputFocusBlur: [{ type: Output }],
    closeButtonClicked: [{ type: Output }],
    clearButtonClicked: [{ type: Output }],
    todayButtonClicked: [{ type: Output }],
    divFocus: [{ type: ViewChild, args: ['divFocus', { static: false },] }],
    pickerFrame: [{ type: ViewChild, args: ['pickerFrame', { static: false },] }],
    onWindowClick: [{ type: HostListener, args: ['window:click', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    MDBDatePickerComponent.prototype.tabIndex;
    /** @type {?} */
    MDBDatePickerComponent.prototype.options;
    /** @type {?} */
    MDBDatePickerComponent.prototype.locale;
    /** @type {?} */
    MDBDatePickerComponent.prototype.defaultMonth;
    /** @type {?} */
    MDBDatePickerComponent.prototype.selDate;
    /** @type {?} */
    MDBDatePickerComponent.prototype.label;
    /** @type {?} */
    MDBDatePickerComponent.prototype.placeholder;
    /** @type {?} */
    MDBDatePickerComponent.prototype.selector;
    /** @type {?} */
    MDBDatePickerComponent.prototype.disabled;
    /** @type {?} */
    MDBDatePickerComponent.prototype.openOnFocus;
    /** @type {?} */
    MDBDatePickerComponent.prototype.outlineInput;
    /** @type {?} */
    MDBDatePickerComponent.prototype.inline;
    /** @type {?} */
    MDBDatePickerComponent.prototype.inlineIcon;
    /** @type {?} */
    MDBDatePickerComponent.prototype.dateChanged;
    /** @type {?} */
    MDBDatePickerComponent.prototype.inputFieldChanged;
    /** @type {?} */
    MDBDatePickerComponent.prototype.calendarViewChanged;
    /** @type {?} */
    MDBDatePickerComponent.prototype.calendarToggle;
    /** @type {?} */
    MDBDatePickerComponent.prototype.inputFocusBlur;
    /** @type {?} */
    MDBDatePickerComponent.prototype.closeButtonClicked;
    /** @type {?} */
    MDBDatePickerComponent.prototype.clearButtonClicked;
    /** @type {?} */
    MDBDatePickerComponent.prototype.todayButtonClicked;
    /** @type {?} */
    MDBDatePickerComponent.prototype.divFocus;
    /** @type {?} */
    MDBDatePickerComponent.prototype.pickerFrame;
    /** @type {?} */
    MDBDatePickerComponent.prototype.isDateSelected;
    /** @type {?} */
    MDBDatePickerComponent.prototype.labelActive;
    /** @type {?} */
    MDBDatePickerComponent.prototype.showSelector;
    /** @type {?} */
    MDBDatePickerComponent.prototype.visibleMonth;
    /** @type {?} */
    MDBDatePickerComponent.prototype.selectedMonth;
    /** @type {?} */
    MDBDatePickerComponent.prototype.selectedDate;
    /** @type {?} */
    MDBDatePickerComponent.prototype.weekDays;
    /** @type {?} */
    MDBDatePickerComponent.prototype.dates;
    /** @type {?} */
    MDBDatePickerComponent.prototype.selectionDayTxt;
    /** @type {?} */
    MDBDatePickerComponent.prototype.invalidDate;
    /** @type {?} */
    MDBDatePickerComponent.prototype.disableTodayBtn;
    /** @type {?} */
    MDBDatePickerComponent.prototype.dayIdx;
    /** @type {?} */
    MDBDatePickerComponent.prototype.weekDayOpts;
    /** @type {?} */
    MDBDatePickerComponent.prototype.editMonth;
    /** @type {?} */
    MDBDatePickerComponent.prototype.invalidMonth;
    /** @type {?} */
    MDBDatePickerComponent.prototype.editYear;
    /** @type {?} */
    MDBDatePickerComponent.prototype.invalidYear;
    /** @type {?} */
    MDBDatePickerComponent.prototype.prevMonthDisabled;
    /** @type {?} */
    MDBDatePickerComponent.prototype.nextMonthDisabled;
    /** @type {?} */
    MDBDatePickerComponent.prototype.prevYearDisabled;
    /** @type {?} */
    MDBDatePickerComponent.prototype.nextYearDisabled;
    /** @type {?} */
    MDBDatePickerComponent.prototype.prevMonthId;
    /** @type {?} */
    MDBDatePickerComponent.prototype.currMonthId;
    /** @type {?} */
    MDBDatePickerComponent.prototype.nextMonthId;
    /** @type {?} */
    MDBDatePickerComponent.prototype.isOpen;
    /** @type {?} */
    MDBDatePickerComponent.prototype.isDisabled;
    /** @type {?} */
    MDBDatePickerComponent.prototype.tmp;
    /** @type {?} */
    MDBDatePickerComponent.prototype.opts;
    /** @type {?} */
    MDBDatePickerComponent.prototype.months;
    /** @type {?} */
    MDBDatePickerComponent.prototype.years;
    /** @type {?} */
    MDBDatePickerComponent.prototype.elementNumber;
    /**
     * @type {?}
     * @private
     */
    MDBDatePickerComponent.prototype.utils;
    /** @type {?} */
    MDBDatePickerComponent.prototype.firstTimeOpenedModal;
    /** @type {?} */
    MDBDatePickerComponent.prototype.modalHeightBefore;
    /** @type {?} */
    MDBDatePickerComponent.prototype.isMobile;
    /** @type {?} */
    MDBDatePickerComponent.prototype.isBrowser;
    /** @type {?} */
    MDBDatePickerComponent.prototype.onChangeCb;
    /** @type {?} */
    MDBDatePickerComponent.prototype.onTouchedCb;
    /** @type {?} */
    MDBDatePickerComponent.prototype.elem;
    /**
     * @type {?}
     * @private
     */
    MDBDatePickerComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    MDBDatePickerComponent.prototype.localeService;
    /**
     * @type {?}
     * @private
     */
    MDBDatePickerComponent.prototype.utilService;
    /**
     * @type {?}
     * @private
     */
    MDBDatePickerComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    MDBDatePickerComponent.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL2RhdGUtcGlja2VyL2RhdGVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdaLFVBQVUsRUFDVixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixTQUFTLEVBRVQsV0FBVyxFQUNYLE1BQU0sRUFDTix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFlekUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDOztBQUV6QyxNQUFNLE9BQU8sbUJBQW1CLEdBQVE7SUFDdEMsT0FBTyxFQUFFLGlCQUFpQjs7SUFFMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixFQUFDO0lBQ3JELEtBQUssRUFBRSxJQUFJO0NBQ1o7OztJQUdDLE9BQVE7SUFDUixpQkFBa0I7SUFDbEIsZ0JBQWlCO0lBQ2pCLGtCQUFtQjs7Ozs7Ozs7SUFJbkIsU0FBVTtJQUNWLFNBQVU7Ozs7OztJQUlWLFFBQVM7SUFDVCxPQUFROzs7Ozs7SUFJUixTQUFVO0lBQ1YsU0FBVTs7Ozs7O0lBSVYsT0FBUTtJQUNSLE9BQVE7SUFDUixPQUFROzs7OztBQVlWLE1BQU0sT0FBTyxz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QUFDO2dCQUMzQixHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pFLEVBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQ3ZCLENBQUM7WUFDRixHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyw2QkFBNkIsQ0FDbEQ7Z0JBQ0UsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDO2dCQUNYLEtBQUssRUFBRSxDQUFDO2dCQUNSLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2hDLEVBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQ3ZCLENBQUM7WUFDRixHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyw2QkFBNkIsQ0FDbEQ7Z0JBQ0UsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUMzQixHQUFHLEVBQUUsQ0FBQzthQUNQLEVBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQ3ZCLENBQUM7WUFDRixHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyw2QkFBNkIsQ0FDbEQsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQ3ZCLENBQUM7U0FDSDtRQUNELElBQUks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QS9EakMsc0NBQXVCOzs7OztJQUN2QiwwQ0FBMkI7Ozs7O0lBQzNCLCtDQUFvQzs7Ozs7SUFDcEMsNkNBQWdDOzs7OztJQUNoQyx1Q0FBZ0M7Ozs7O0lBQ2hDLDBDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUxvY2FsZXMgfSBmcm9tICcuL2ludGVyZmFjZXMvbG9jYWxlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgRWxlbWVudFJlZixcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICBSZW5kZXJlcjIsXHJcbiAgZm9yd2FyZFJlZixcclxuICBWaWV3Q2hpbGQsXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBQTEFURk9STV9JRCxcclxuICBJbmplY3QsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7XHJcbiAgSU15RGF0ZSxcclxuICBJTXlEYXRlUmFuZ2UsXHJcbiAgSU15TW9udGgsXHJcbiAgSU15Q2FsZW5kYXJEYXksXHJcbiAgSU15V2VlayxcclxuICBJTXlEYXlMYWJlbHMsXHJcbiAgSU15TW9udGhMYWJlbHMsXHJcbiAgSU15SW5wdXRGaWVsZENoYW5nZWQsXHJcbiAgSU15Q2FsZW5kYXJWaWV3Q2hhbmdlZCxcclxuICBJTXlJbnB1dEZvY3VzQmx1cixcclxuICBJTXlNYXJrZWREYXRlcyxcclxuICBJTXlNYXJrZWREYXRlLFxyXG59IGZyb20gJy4vaW50ZXJmYWNlcy9pbmRleCc7XHJcbmltcG9ydCB7IExvY2FsZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2RhdGVwaWNrZXJMb2NhbGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFV0aWxTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9kYXRlcGlja2VyVXRpbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIsIERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9mcmVlL3V0aWxzJztcclxuXHJcbmV4cG9ydCBjb25zdCBNWURQX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11c2UtYmVmb3JlLWRlY2xhcmVcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNREJEYXRlUGlja2VyQ29tcG9uZW50KSxcclxuICBtdWx0aTogdHJ1ZSxcclxufTtcclxuXHJcbmVudW0gQ2FsVG9nZ2xlIHtcclxuICBPcGVuID0gMSxcclxuICBDbG9zZUJ5RGF0ZVNlbCA9IDIsXHJcbiAgQ2xvc2VCeUNhbEJ0biA9IDMsXHJcbiAgQ2xvc2VCeU91dENsaWNrID0gNCxcclxufVxyXG5cclxuZW51bSBZZWFyIHtcclxuICBtaW4gPSAxMDAwLFxyXG4gIG1heCA9IDk5OTksXHJcbn1cclxuXHJcbmVudW0gSW5wdXRGb2N1c0JsdXIge1xyXG4gIGZvY3VzID0gMSxcclxuICBibHVyID0gMixcclxufVxyXG5cclxuZW51bSBLZXlDb2RlIHtcclxuICBlbnRlciA9IDEzLFxyXG4gIHNwYWNlID0gMzIsXHJcbn1cclxuXHJcbmVudW0gTW9udGhJZCB7XHJcbiAgcHJldiA9IDEsXHJcbiAgY3VyciA9IDIsXHJcbiAgbmV4dCA9IDMsXHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWRiLWRhdGUtcGlja2VyJyxcclxuICBleHBvcnRBczogJ21kYmRhdGVwaWNrZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRhcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9kYXRlLXBpY2tlci1tb2R1bGUuc2NzcyddLFxyXG4gIHByb3ZpZGVyczogW1V0aWxTZXJ2aWNlLCBNWURQX1ZBTFVFX0FDQ0VTU09SXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTURCRGF0ZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQge1xyXG4gIEBJbnB1dCgpIHRhYkluZGV4OiBhbnk7XHJcbiAgQElucHV0KCkgb3B0aW9uczogYW55O1xyXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGRlZmF1bHRNb250aDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHNlbERhdGU6IHN0cmluZztcclxuICBASW5wdXQoKSBsYWJlbCA9ICcnO1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XHJcbiAgQElucHV0KCkgc2VsZWN0b3I6IG51bWJlcjtcclxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBvcGVuT25Gb2N1cyA9IHRydWU7XHJcbiAgQElucHV0KCkgb3V0bGluZUlucHV0ID0gZmFsc2U7XHJcbiAgQElucHV0KCkgaW5saW5lID0gZmFsc2U7XHJcbiAgQElucHV0KCkgaW5saW5lSWNvbiA9ICdmYXIgZmEtY2FsZW5kYXItYWx0JztcclxuXHJcbiAgQE91dHB1dCgpIGRhdGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBpbnB1dEZpZWxkQ2hhbmdlZDogRXZlbnRFbWl0dGVyPElNeUlucHV0RmllbGRDaGFuZ2VkPiA9IG5ldyBFdmVudEVtaXR0ZXI8XHJcbiAgICBJTXlJbnB1dEZpZWxkQ2hhbmdlZFxyXG4gID4oKTtcclxuICBAT3V0cHV0KCkgY2FsZW5kYXJWaWV3Q2hhbmdlZDogRXZlbnRFbWl0dGVyPElNeUNhbGVuZGFyVmlld0NoYW5nZWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxcclxuICAgIElNeUNhbGVuZGFyVmlld0NoYW5nZWRcclxuICA+KCk7XHJcbiAgQE91dHB1dCgpIGNhbGVuZGFyVG9nZ2xlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG4gIEBPdXRwdXQoKSBpbnB1dEZvY3VzQmx1cjogRXZlbnRFbWl0dGVyPElNeUlucHV0Rm9jdXNCbHVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8SU15SW5wdXRGb2N1c0JsdXI+KCk7XHJcbiAgQE91dHB1dCgpIGNsb3NlQnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPE1EQkRhdGVQaWNrZXJDb21wb25lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxcclxuICAgIE1EQkRhdGVQaWNrZXJDb21wb25lbnRcclxuICA+KCk7XHJcbiAgQE91dHB1dCgpIGNsZWFyQnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPE1EQkRhdGVQaWNrZXJDb21wb25lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxcclxuICAgIE1EQkRhdGVQaWNrZXJDb21wb25lbnRcclxuICA+KCk7XHJcbiAgQE91dHB1dCgpIHRvZGF5QnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPE1EQkRhdGVQaWNrZXJDb21wb25lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxcclxuICAgIE1EQkRhdGVQaWNrZXJDb21wb25lbnRcclxuICA+KCk7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ2RpdkZvY3VzJywgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBkaXZGb2N1czogYW55O1xyXG4gIEBWaWV3Q2hpbGQoJ3BpY2tlckZyYW1lJywgeyBzdGF0aWM6IGZhbHNlIH0pIHBpY2tlckZyYW1lOiBFbGVtZW50UmVmO1xyXG5cclxuICBwdWJsaWMgaXNEYXRlU2VsZWN0ZWQgPSBmYWxzZTtcclxuICBwdWJsaWMgbGFiZWxBY3RpdmUgPSBmYWxzZTtcclxuICBwdWJsaWMgc2hvd1NlbGVjdG9yID0gZmFsc2U7XHJcbiAgcHVibGljIHZpc2libGVNb250aDogSU15TW9udGggPSB7IG1vbnRoVHh0OiAnJywgbW9udGhOYnI6IDAsIHllYXI6IDEgfTtcclxuICBwdWJsaWMgc2VsZWN0ZWRNb250aDogSU15TW9udGggPSB7IG1vbnRoVHh0OiAnJywgbW9udGhOYnI6IDAsIHllYXI6IDAgfTtcclxuICBwdWJsaWMgc2VsZWN0ZWREYXRlOiBJTXlEYXRlID0geyB5ZWFyOiAwLCBtb250aDogMCwgZGF5OiAwIH07XHJcbiAgcHVibGljIHdlZWtEYXlzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgcHVibGljIGRhdGVzOiBBcnJheTxJTXlXZWVrPiA9IFtdO1xyXG4gIHB1YmxpYyBzZWxlY3Rpb25EYXlUeHQgPSAnJztcclxuICBwdWJsaWMgaW52YWxpZERhdGUgPSBmYWxzZTtcclxuICBwdWJsaWMgZGlzYWJsZVRvZGF5QnRuID0gZmFsc2U7XHJcbiAgcHVibGljIGRheUlkeCA9IDA7XHJcbiAgcHVibGljIHdlZWtEYXlPcHRzOiBBcnJheTxzdHJpbmc+ID0gWydzdScsICdtbycsICd0dScsICd3ZScsICd0aCcsICdmcicsICdzYSddO1xyXG5cclxuICBwdWJsaWMgZWRpdE1vbnRoID0gZmFsc2U7XHJcbiAgcHVibGljIGludmFsaWRNb250aCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBlZGl0WWVhciA9IGZhbHNlO1xyXG4gIHB1YmxpYyBpbnZhbGlkWWVhciA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgcHJldk1vbnRoRGlzYWJsZWQgPSBmYWxzZTtcclxuICBwdWJsaWMgbmV4dE1vbnRoRGlzYWJsZWQgPSBmYWxzZTtcclxuICBwdWJsaWMgcHJldlllYXJEaXNhYmxlZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBuZXh0WWVhckRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIHB1YmxpYyBwcmV2TW9udGhJZDogbnVtYmVyID0gTW9udGhJZC5wcmV2O1xyXG4gIHB1YmxpYyBjdXJyTW9udGhJZDogbnVtYmVyID0gTW9udGhJZC5jdXJyO1xyXG4gIHB1YmxpYyBuZXh0TW9udGhJZDogbnVtYmVyID0gTW9udGhJZC5uZXh0O1xyXG5cclxuICBpc09wZW4gPSBmYWxzZTtcclxuICBpc0Rpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIHB1YmxpYyB0bXA6IElNeURhdGUgPSB7XHJcbiAgICB5ZWFyOiB0aGlzLmdldFRvZGF5KCkueWVhcixcclxuICAgIG1vbnRoOiB0aGlzLmdldFRvZGF5KCkubW9udGgsXHJcbiAgICBkYXk6IHRoaXMuZ2V0VG9kYXkoKS5kYXksXHJcbiAgfTtcclxuXHJcbiAgLy8gRGVmYXVsdCBvcHRpb25zXHJcbiAgcHVibGljIG9wdHM6IGFueSA9IHtcclxuICAgIHN0YXJ0RGF0ZTogPGFueT4nJyxcclxuICAgIGNsb3NlQWZ0ZXJTZWxlY3Q6IDxib29sZWFuPmZhbHNlLFxyXG4gICAgZGF5TGFiZWxzRnVsbDogPElNeURheUxhYmVscz57fSxcclxuICAgIGRheUxhYmVsczogPElNeURheUxhYmVscz57fSxcclxuICAgIG1vbnRoTGFiZWxzRnVsbDogPElNeU1vbnRoTGFiZWxzPnt9LFxyXG4gICAgbW9udGhMYWJlbHM6IDxJTXlNb250aExhYmVscz57fSxcclxuICAgIGRhdGVGb3JtYXQ6IDxzdHJpbmc+JycsXHJcbiAgICBzaG93VG9kYXlCdG46IDxib29sZWFuPnRydWUsXHJcbiAgICB0b2RheUJ0blR4dDogPHN0cmluZz4nJyxcclxuICAgIGZpcnN0RGF5T2ZXZWVrOiA8c3RyaW5nPicnLFxyXG4gICAgc3VuSGlnaGxpZ2h0OiA8Ym9vbGVhbj50cnVlLFxyXG4gICAgbWFya0N1cnJlbnREYXk6IDxib29sZWFuPnRydWUsXHJcbiAgICBkaXNhYmxlVW50aWw6IDxJTXlEYXRlPnsgeWVhcjogMCwgbW9udGg6IDAsIGRheTogMCB9LFxyXG4gICAgZGlzYWJsZVNpbmNlOiA8SU15RGF0ZT57IHllYXI6IDAsIG1vbnRoOiAwLCBkYXk6IDAgfSxcclxuICAgIGRpc2FibGVEYXlzOiA8QXJyYXk8SU15RGF0ZSB8IG51bWJlcj4+W10sXHJcbiAgICBlbmFibGVEYXlzOiA8QXJyYXk8SU15RGF0ZSB8IG51bWJlcj4+W10sXHJcbiAgICBlZGl0YWJsZURhdGVGaWVsZDogPGJvb2xlYW4+dHJ1ZSxcclxuICAgIG1hcmtEYXRlczogPEFycmF5PElNeU1hcmtlZERhdGVzPj5bXSxcclxuICAgIG1hcmtXZWVrZW5kczogPElNeU1hcmtlZERhdGU+e30sXHJcbiAgICBkaXNhYmxlRGF0ZVJhbmdlczogPEFycmF5PElNeURhdGVSYW5nZT4+W10sXHJcbiAgICBkaXNhYmxlV2Vla2VuZHM6IDxib29sZWFuPmZhbHNlLFxyXG4gICAgc2hvd1dlZWtOdW1iZXJzOiA8Ym9vbGVhbj5mYWxzZSxcclxuICAgIGhlaWdodDogPHN0cmluZz4nMzJweCcsXHJcbiAgICB3aWR0aDogPHN0cmluZz4nMTAwJScsXHJcbiAgICBzZWxlY3Rpb25UeHRGb250U2l6ZTogPHN0cmluZz4nMXJlbScsXHJcbiAgICBzaG93Q2xlYXJEYXRlQnRuOiA8Ym9vbGVhbj50cnVlLFxyXG4gICAgYWxpZ25TZWxlY3RvclJpZ2h0OiA8Ym9vbGVhbj5mYWxzZSxcclxuICAgIGRpc2FibGVIZWFkZXJCdXR0b25zOiA8Ym9vbGVhbj50cnVlLFxyXG4gICAgbWluWWVhcjogPG51bWJlcj5ZZWFyLm1pbixcclxuICAgIG1heFllYXI6IDxudW1iZXI+WWVhci5tYXgsXHJcbiAgICBjb21wb25lbnREaXNhYmxlZDogPGJvb2xlYW4+ZmFsc2UsXHJcbiAgICBzaG93U2VsZWN0b3JBcnJvdzogPGJvb2xlYW4+dHJ1ZSxcclxuICAgIGFyaWFMYWJlbElucHV0RmllbGQ6IDxzdHJpbmc+J0RhdGUgaW5wdXQgZmllbGQnLFxyXG4gICAgYXJpYUxhYmVsQ2xlYXJEYXRlOiA8c3RyaW5nPidDbGVhciBEYXRlJyxcclxuICAgIGFyaWFMYWJlbE9wZW5DYWxlbmRhcjogPHN0cmluZz4nT3BlbiBDYWxlbmRhcicsXHJcbiAgICBhcmlhTGFiZWxQcmV2TW9udGg6IDxzdHJpbmc+J1ByZXZpb3VzIE1vbnRoJyxcclxuICAgIGFyaWFMYWJlbE5leHRNb250aDogPHN0cmluZz4nTmV4dCBNb250aCcsXHJcbiAgICBhcmlhTGFiZWxQcmV2WWVhcjogPHN0cmluZz4nUHJldmlvdXMgWWVhcicsXHJcbiAgICBhcmlhTGFiZWxOZXh0WWVhcjogPHN0cmluZz4nTmV4dCBZZWFyJyxcclxuICB9O1xyXG5cclxuICBwdWJsaWMgbW9udGhzOiBhbnkgPSBbXTtcclxuICBwdWJsaWMgeWVhcnM6IGFueSA9IFtdO1xyXG4gIHB1YmxpYyBlbGVtZW50TnVtYmVyOiBhbnk7XHJcblxyXG4gIHByaXZhdGUgdXRpbHM6IFV0aWxzID0gbmV3IFV0aWxzKCk7XHJcblxyXG4gIGZpcnN0VGltZU9wZW5lZE1vZGFsID0gdHJ1ZTtcclxuICBtb2RhbEhlaWdodEJlZm9yZTogYW55ID0gbnVsbDtcclxuICBpc01vYmlsZTogYW55ID0gbnVsbDtcclxuICBpc0Jyb3dzZXI6IGFueSA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBlbGVtOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBsb2NhbGVTZXJ2aWNlOiBMb2NhbGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB1dGlsU2VydmljZTogVXRpbFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcclxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IHN0cmluZ1xyXG4gICkge1xyXG4gICAgdGhpcy5pc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKTtcclxuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xyXG4gICAgICB0aGlzLmlzTW9iaWxlID0gL2lQaG9uZXxpUGFkfGlQb2R8QW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldExvY2FsZU9wdGlvbnMoKTtcclxuICAgIHJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCwgJ2NsaWNrJywgKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuc2hvd1NlbGVjdG9yICYmXHJcbiAgICAgICAgZXZlbnQudGFyZ2V0ICYmXHJcbiAgICAgICAgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQgIT09IGV2ZW50LnRhcmdldCAmJlxyXG4gICAgICAgICF0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdG5DbGlja2VkKCk7XHJcbiAgICAgICAgdGhpcy5jYWxlbmRhclRvZ2dsZS5lbWl0KENhbFRvZ2dsZS5DbG9zZUJ5T3V0Q2xpY2spO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwaWNrZXJfX2hvbGRlcicpKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ0bkNsaWNrZWQoKTtcclxuICAgICAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHJ1ZSAmJiBldmVudC50YXJnZXQgJiYgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xyXG4gICAgICAgIHRoaXMucmVzZXRNb250aFllYXJFZGl0KCk7XHJcbiAgICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgaWYgKHRoaXMub3B0cy5zdGFydERhdGUpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy5zdGFydERhdGUudG9TdHJpbmcoKS5pbmRleE9mKCdUJykgIT09IC0xKSB7XHJcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMub3B0cy5zdGFydERhdGUudG9TdHJpbmcoKS5pbmRleE9mKCdUJyk7XHJcbiAgICAgICAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLm9wdHMuc3RhcnREYXRlLnRvU3RyaW5nKCkuc3Vic3RyKDAsIGluZGV4KTtcclxuICAgICAgICAgIHRoaXMub25Vc2VyRGF0ZUlucHV0KHN0YXJ0RGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIENoYW5nZVpJbmRleCgpIHtcclxuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAvLyBGaXggZm9yIHZpc2libGUgZGF0ZSAvIHRpbWUgcGlja2VyIGlucHV0IHdoZW4gcGlja2VyIHBsYXRlIGlzIHZpc2libGUuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IG9wZW5lZFBpY2tlcjogYW55ID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGlja2VyLS1vcGVuZWQnKTtcclxuICAgICAgICAgIGNvbnN0IGFsbFBpY2tlcnM6IGFueSA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBpY2tlcicpO1xyXG4gICAgICAgICAgYWxsUGlja2Vycy5mb3JFYWNoKChlbGVtZW50OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LCAnei1pbmRleCcsICcwJyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUob3BlbmVkUGlja2VyLCAnei1pbmRleCcsICcxMDAnKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge31cclxuICAgICAgfSwgMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZUNiOiAoXzogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XHJcbiAgb25Ub3VjaGVkQ2I6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzRGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgaWYgKHRoaXMuaW5saW5lKSB7XHJcbiAgICAgIGlmIChpc0Rpc2FibGVkKSB7XHJcbiAgICAgICAgdGhpcy5pbmxpbmVJY29uICs9ICcgZGlzYWJsZWQgZ3JleS10ZXh0JztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCB0byA9IHRoaXMuaW5saW5lSWNvbi5pbmRleE9mKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIHRoaXMuaW5saW5lSWNvbiA9IHRoaXMuaW5saW5lSWNvbi5zdWJzdHIoMCwgdG8pO1xyXG4gICAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVJbmxpbmVTdHlsZSgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmICh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtb2RhbC1jb250ZW50JykpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxyXG4gICAgICAgICAgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LFxyXG4gICAgICAgICAgJ3RyYW5zaXRpb24nLFxyXG4gICAgICAgICAgJ2hlaWdodCAwLjNzJ1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnN0eWxlLmhlaWdodCA9XHJcbiAgICAgICAgICB0aGlzLm1vZGFsSGVpZ2h0QmVmb3JlICsgJ3B4JztcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHt9XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgKHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IGFzIGFueSkuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ292ZXJmbG93Jyk7XHJcbiAgICB9LCAxNTUpO1xyXG4gICAgdGhpcy5sYWJlbEFjdGl2ZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc2V0TG9jYWxlT3B0aW9ucygpOiB2b2lkIHtcclxuICAgIGNvbnN0IG9wdHM6IGFueSA9IHRoaXMubG9jYWxlU2VydmljZS5nZXRMb2NhbGVPcHRpb25zKHRoaXMubG9jYWxlKTtcclxuICAgIE9iamVjdC5rZXlzKG9wdHMpLmZvckVhY2goayA9PiB7XHJcbiAgICAgIHRoaXMub3B0c1trXSA9IG9wdHNba107XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFkZExvY2FsZShsb2NhbGU6IElNeUxvY2FsZXMpIHtcclxuICAgIHRoaXMubG9jYWxlU2VydmljZS5sb2NhbGVzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5sb2NhbGVTZXJ2aWNlLmxvY2FsZXMsIGxvY2FsZSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5zZXRMb2NhbGVPcHRpb25zKCk7XHJcbiAgICB9LCAwKTtcclxuICB9XHJcblxyXG4gIHNldE9wdGlvbnMoKTogdm9pZCB7XHJcbiAgICBjb25zdCB0aGlzWWVhciA9IG5ldyBEYXRlKCk7XHJcbiAgICBjb25zdCBjdXJyZW50WWVhciA9IHRoaXNZZWFyLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgT2JqZWN0LmtleXModGhpcy5vcHRpb25zKS5mb3JFYWNoKGsgPT4ge1xyXG4gICAgICAgIHRoaXMub3B0c1trXSA9IHRoaXMub3B0aW9uc1trXTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMub3B0cy5jb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3B0cy5taW5ZZWFyID09PSAxMDAwKSB7XHJcbiAgICAgIHRoaXMub3B0cy5taW5ZZWFyID0gY3VycmVudFllYXIgLSA3O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm9wdHMubWF4WWVhciA9PT0gOTk5OSkge1xyXG4gICAgICB0aGlzLm9wdHMubWF4WWVhciA9IGN1cnJlbnRZZWFyICsgNztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0TW9udGhZZWFyRWRpdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZWRpdE1vbnRoID0gZmFsc2U7XHJcbiAgICB0aGlzLmVkaXRZZWFyID0gZmFsc2U7XHJcbiAgICB0aGlzLmludmFsaWRNb250aCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pbnZhbGlkWWVhciA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgb25Vc2VyRGF0ZUlucHV0KHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuaW52YWxpZERhdGUgPSBmYWxzZTtcclxuICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5jbGVhckRhdGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGRhdGU6IElNeURhdGUgPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGF0ZVZhbGlkKFxyXG4gICAgICAgIHZhbHVlLFxyXG4gICAgICAgIHRoaXMub3B0cy5kYXRlRm9ybWF0LFxyXG4gICAgICAgIHRoaXMub3B0cy5taW5ZZWFyLFxyXG4gICAgICAgIHRoaXMub3B0cy5tYXhZZWFyLFxyXG4gICAgICAgIHRoaXMub3B0cy5kaXNhYmxlVW50aWwsXHJcbiAgICAgICAgdGhpcy5vcHRzLmRpc2FibGVTaW5jZSxcclxuICAgICAgICB0aGlzLm9wdHMuZGlzYWJsZVdlZWtlbmRzLFxyXG4gICAgICAgIHRoaXMub3B0cy5kaXNhYmxlRGF5cyxcclxuICAgICAgICB0aGlzLm9wdHMuZGlzYWJsZURhdGVSYW5nZXMsXHJcbiAgICAgICAgdGhpcy5vcHRzLm1vbnRoTGFiZWxzLFxyXG4gICAgICAgIHRoaXMub3B0cy5lbmFibGVEYXlzXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAodGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZShkYXRlKSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0RGF0ZShkYXRlKTtcclxuICAgICAgICB0aGlzLnNldFZpc2libGVNb250aCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaW52YWxpZERhdGUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pbnZhbGlkRGF0ZSkge1xyXG4gICAgICB0aGlzLmlucHV0RmllbGRDaGFuZ2VkLmVtaXQoe1xyXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICBkYXRlRm9ybWF0OiB0aGlzLm9wdHMuZGF0ZUZvcm1hdCxcclxuICAgICAgICB2YWxpZDogISh2YWx1ZS5sZW5ndGggPT09IDAgfHwgdGhpcy5pbnZhbGlkRGF0ZSksXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlQ2IoJycpO1xyXG4gICAgICB0aGlzLm9uVG91Y2hlZENiKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkZvY3VzSW5wdXQoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMub3Blbk9uRm9jdXMgJiYgIXRoaXMuaXNPcGVuKSB7XHJcbiAgICAgIHRoaXMub3BlbkJ0bkNsaWNrZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmlucHV0Rm9jdXNCbHVyLmVtaXQoeyByZWFzb246IElucHV0Rm9jdXNCbHVyLmZvY3VzLCB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlIH0pO1xyXG4gICAgKHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IGFzIGFueSkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuICAgIC8vIHRoaXMuZGl2Rm9jdXMubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgb25CbHVySW5wdXQoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3Rpb25EYXlUeHQgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICB0aGlzLm9uVG91Y2hlZENiKCk7XHJcbiAgICB0aGlzLmlucHV0Rm9jdXNCbHVyLmVtaXQoeyByZWFzb246IElucHV0Rm9jdXNCbHVyLmJsdXIsIHZhbHVlOiBldmVudC50YXJnZXQudmFsdWUgfSk7XHJcbiAgfVxyXG5cclxuICBvblVzZXJNb250aElucHV0KHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuaW52YWxpZE1vbnRoID0gZmFsc2U7XHJcbiAgICBjb25zdCBtOiBudW1iZXIgPSB0aGlzLnV0aWxTZXJ2aWNlLmlzTW9udGhMYWJlbFZhbGlkKHZhbHVlLCB0aGlzLm9wdHMubW9udGhMYWJlbHMpO1xyXG4gICAgaWYgKG0gIT09IC0xKSB7XHJcbiAgICAgIHRoaXMuZWRpdE1vbnRoID0gZmFsc2U7XHJcbiAgICAgIGlmIChtICE9PSB0aGlzLnZpc2libGVNb250aC5tb250aE5icikge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZU1vbnRoID0ge1xyXG4gICAgICAgICAgbW9udGhUeHQ6IHRoaXMubW9udGhUZXh0KG0pLFxyXG4gICAgICAgICAgbW9udGhOYnI6IG0sXHJcbiAgICAgICAgICB5ZWFyOiB0aGlzLnZpc2libGVNb250aC55ZWFyLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKG0sIHRoaXMudmlzaWJsZU1vbnRoLnllYXIsIHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmludmFsaWRNb250aCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblVzZXJZZWFySW5wdXQodmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5pbnZhbGlkWWVhciA9IGZhbHNlO1xyXG4gICAgY29uc3QgeTogbnVtYmVyID0gdGhpcy51dGlsU2VydmljZS5pc1llYXJMYWJlbFZhbGlkKFxyXG4gICAgICBOdW1iZXIodmFsdWUpLFxyXG4gICAgICB0aGlzLm9wdHMubWluWWVhcixcclxuICAgICAgdGhpcy5vcHRzLm1heFllYXJcclxuICAgICk7XHJcbiAgICBpZiAoeSAhPT0gLTEpIHtcclxuICAgICAgdGhpcy5lZGl0WWVhciA9IGZhbHNlO1xyXG4gICAgICBpZiAoeSAhPT0gdGhpcy52aXNpYmxlTW9udGgueWVhcikge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZU1vbnRoID0ge1xyXG4gICAgICAgICAgbW9udGhUeHQ6IHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoVHh0LFxyXG4gICAgICAgICAgbW9udGhOYnI6IHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoTmJyLFxyXG4gICAgICAgICAgeWVhcjogeSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcih0aGlzLnZpc2libGVNb250aC5tb250aE5iciwgeSwgdHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW52YWxpZFllYXIgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNUb2RheURpc2FibGVkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kaXNhYmxlVG9kYXlCdG4gPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGlzYWJsZWREYXkoXHJcbiAgICAgIHRoaXMuZ2V0VG9kYXkoKSxcclxuICAgICAgdGhpcy5vcHRzLmRpc2FibGVVbnRpbCxcclxuICAgICAgdGhpcy5vcHRzLmRpc2FibGVTaW5jZSxcclxuICAgICAgdGhpcy5vcHRzLmRpc2FibGVXZWVrZW5kcyxcclxuICAgICAgdGhpcy5vcHRzLmRpc2FibGVEYXlzLFxyXG4gICAgICB0aGlzLm9wdHMuZGlzYWJsZURhdGVSYW5nZXMsXHJcbiAgICAgIHRoaXMub3B0cy5lbmFibGVEYXlzXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcGFyc2VPcHRpb25zKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMubG9jYWxlKSB7XHJcbiAgICAgIHRoaXMuc2V0TG9jYWxlT3B0aW9ucygpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRPcHRpb25zKCk7XHJcbiAgICB0aGlzLmlzVG9kYXlEaXNhYmxlZCgpO1xyXG4gICAgdGhpcy5kYXlJZHggPSB0aGlzLndlZWtEYXlPcHRzLmluZGV4T2YodGhpcy5vcHRzLmZpcnN0RGF5T2ZXZWVrKTtcclxuICAgIGlmICh0aGlzLmRheUlkeCAhPT0gLTEpIHtcclxuICAgICAgbGV0IGlkeDogbnVtYmVyID0gdGhpcy5kYXlJZHg7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53ZWVrRGF5T3B0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMud2Vla0RheXMucHVzaCh0aGlzLm9wdHMuZGF5TGFiZWxzW3RoaXMud2Vla0RheU9wdHNbaWR4XV0pO1xyXG4gICAgICAgIGlkeCA9IHRoaXMud2Vla0RheU9wdHNbaWR4XSA9PT0gJ3NhJyA/IDAgOiBpZHggKyAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlRGF0ZVZhbHVlKHRoaXMucGFyc2VTZWxlY3RlZERhdGUodmFsdWUpLCBmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlICYmIHZhbHVlWydkYXRlJ10pIHtcclxuICAgICAgdGhpcy51cGRhdGVEYXRlVmFsdWUodGhpcy5wYXJzZVNlbGVjdGVkRGF0ZSh2YWx1ZVsnZGF0ZSddKSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSB7IHllYXI6IDAsIG1vbnRoOiAwLCBkYXk6IDAgfTtcclxuICAgICAgdGhpcy5zZWxlY3Rpb25EYXlUeHQgPSAnJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkNoYW5nZUNiID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZENiID0gZm47XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnc2VsZWN0b3InKSAmJiBjaGFuZ2VzWydzZWxlY3RvciddLmN1cnJlbnRWYWx1ZSA+IDApIHtcclxuICAgICAgdGhpcy5vcGVuQnRuQ2xpY2tlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdwbGFjZWhvbGRlcicpKSB7XHJcbiAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBjaGFuZ2VzWydwbGFjZWhvbGRlciddLmN1cnJlbnRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnbG9jYWxlJykpIHtcclxuICAgICAgdGhpcy5sb2NhbGUgPSBjaGFuZ2VzWydsb2NhbGUnXS5jdXJyZW50VmFsdWU7XHJcbiAgICAgIHRoaXMuc2V0TG9jYWxlT3B0aW9ucygpO1xyXG4gICAgICB0aGlzLnVwZGF0ZURhdGVWYWx1ZSh0aGlzLnNlbGVjdGVkRGF0ZSwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdkaXNhYmxlZCcpKSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSBjaGFuZ2VzWydkaXNhYmxlZCddLmN1cnJlbnRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9ucycpKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucyA9IGNoYW5nZXNbJ29wdGlvbnMnXS5jdXJyZW50VmFsdWU7XHJcbiAgICAgIGlmIChjaGFuZ2VzLm9wdGlvbnMuY3VycmVudFZhbHVlLnN0YXJ0RGF0ZSkge1xyXG4gICAgICAgIHRoaXMub25Vc2VyRGF0ZUlucHV0KGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUuc3RhcnREYXRlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMud2Vla0RheXMubGVuZ3RoID0gMDtcclxuICAgIHRoaXMucGFyc2VPcHRpb25zKCk7XHJcblxyXG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHRNb250aCcpKSB7XHJcbiAgICAgIGNvbnN0IGRtOiBzdHJpbmcgPSBjaGFuZ2VzWydkZWZhdWx0TW9udGgnXS5jdXJyZW50VmFsdWU7XHJcbiAgICAgIGlmIChkbSAhPT0gbnVsbCAmJiBkbSAhPT0gdW5kZWZpbmVkICYmIGRtICE9PSAnJykge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRNb250aCA9IHRoaXMucGFyc2VTZWxlY3RlZE1vbnRoKGRtKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTW9udGggPSB7IG1vbnRoVHh0OiAnJywgbW9udGhOYnI6IDAsIHllYXI6IDAgfTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdzZWxEYXRlJykpIHtcclxuICAgICAgY29uc3Qgc2Q6IGFueSA9IGNoYW5nZXNbJ3NlbERhdGUnXTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHNkLmN1cnJlbnRWYWx1ZSAhPT0gbnVsbCAmJlxyXG4gICAgICAgIHNkLmN1cnJlbnRWYWx1ZSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgc2QuY3VycmVudFZhbHVlICE9PSAnJyAmJlxyXG4gICAgICAgIE9iamVjdC5rZXlzKHNkLmN1cnJlbnRWYWx1ZSkubGVuZ3RoICE9PSAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gdGhpcy5wYXJzZVNlbGVjdGVkRGF0ZShzZC5jdXJyZW50VmFsdWUpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5vbkNoYW5nZUNiKHRoaXMuZ2V0RGF0ZU1vZGVsKHRoaXMuc2VsZWN0ZWREYXRlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pc0RhdGVTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gRG8gbm90IGNsZWFyIG9uIGluaXRcclxuICAgICAgICBpZiAoIXNkLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICAgICAgdGhpcy5jbGVhckRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zaG93U2VsZWN0b3IpIHtcclxuICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoTmJyLCB0aGlzLnZpc2libGVNb250aC55ZWFyLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWRlS2V5Ym9hcmQoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LCBmaWVsZCk7XHJcbiAgICAgICAgY29uc3QgaW5wdXRSZWZlcmVuY2UgPSB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5sYXN0RWxlbWVudENoaWxkO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGlucHV0UmVmZXJlbmNlLCAndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoaW5wdXRSZWZlcmVuY2UsICd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGlucHV0UmVmZXJlbmNlLCAnb3BhY2l0eScsICcwJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShpbnB1dFJlZmVyZW5jZSwgJy13ZWJraXQtdXNlci1tb2RpZnknLCAncmVhZC13cml0ZS1wbGFpbnRleHQtb25seScpO1xyXG4gICAgICAgIGZpZWxkLm9uZm9jdXMgPSAoKSA9PiB7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShmaWVsZCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LCBmaWVsZCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmaWVsZC5mb2N1cygpO1xyXG4gICAgICB9LCAwKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQnRuQ2xpY2tlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2xlYXJEYXRlKCk7XHJcbiAgICBpZiAodGhpcy5zaG93U2VsZWN0b3IpIHtcclxuICAgICAgdGhpcy5jYWxlbmRhclRvZ2dsZS5lbWl0KENhbFRvZ2dsZS5DbG9zZUJ5Q2FsQnRuKTtcclxuICAgIH1cclxuICAgIHRoaXMuaXNEYXRlU2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuY2xlYXJCdXR0b25DbGlja2VkLmVtaXQodGhpcyk7XHJcbiAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgY2xvc2VCdG5DbGlja2VkKCkge1xyXG4gICAgdGhpcy5zaG93U2VsZWN0b3IgPSBmYWxzZTtcclxuICAgIHRoaXMucmVtb3ZlSW5saW5lU3R5bGUoKTtcclxuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uQ2xpY2tlZC5lbWl0KHRoaXMpO1xyXG4gICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIG9wZW5CdG5DbGlja2VkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ21vZGFsLWNvbnRlbnQnKSkge1xyXG4gICAgICAgIGlmICh0aGlzLmZpcnN0VGltZU9wZW5lZE1vZGFsKSB7XHJcbiAgICAgICAgICB0aGlzLm1vZGFsSGVpZ2h0QmVmb3JlID0gdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5maXJzdFRpbWVPcGVuZWRNb2RhbCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXHJcbiAgICAgICAgICB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQsXHJcbiAgICAgICAgICAndHJhbnNpdGlvbicsXHJcbiAgICAgICAgICAnaGVpZ2h0IDAuM3MnXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICAgICAgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnN0eWxlLmhlaWdodCA9XHJcbiAgICAgICAgICB0aGlzLm1vZGFsSGVpZ2h0QmVmb3JlICsgdGhpcy5waWNrZXJGcmFtZS5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCArICdweCc7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxyXG4gICAgLy8gT3BlbiBzZWxlY3RvciBidXR0b24gY2xpY2tlZFxyXG4gICAgdGhpcy5zaG93U2VsZWN0b3IgPSAhdGhpcy5zaG93U2VsZWN0b3I7XHJcbiAgICBpZiAodGhpcy5zaG93U2VsZWN0b3IpIHtcclxuICAgICAgdGhpcy5zZXRWaXNpYmxlTW9udGgoKTtcclxuICAgICAgdGhpcy5jYWxlbmRhclRvZ2dsZS5lbWl0KENhbFRvZ2dsZS5PcGVuKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2FsZW5kYXJUb2dnbGUuZW1pdChDYWxUb2dnbGUuQ2xvc2VCeUNhbEJ0bik7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc01vYmlsZSkge1xyXG4gICAgICB0aGlzLmhpZGVLZXlib2FyZCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sYWJlbEFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLkNoYW5nZVpJbmRleCgpO1xyXG4gICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHNldFZpc2libGVNb250aCgpOiB2b2lkIHtcclxuICAgIC8vIFNldHMgdmlzaWJsZSBtb250aCBvZiBjYWxlbmRhclxyXG4gICAgbGV0IHkgPSAwLFxyXG4gICAgICBtID0gMDtcclxuICAgIGlmICghdGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZSkpIHtcclxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRNb250aC55ZWFyID09PSAwICYmIHRoaXMuc2VsZWN0ZWRNb250aC5tb250aE5iciA9PT0gMCkge1xyXG4gICAgICAgIGNvbnN0IHRvZGF5OiBJTXlEYXRlID0gdGhpcy5nZXRUb2RheSgpO1xyXG4gICAgICAgIHkgPSB0b2RheS55ZWFyO1xyXG4gICAgICAgIG0gPSB0b2RheS5tb250aDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB5ID0gdGhpcy5zZWxlY3RlZE1vbnRoLnllYXI7XHJcbiAgICAgICAgbSA9IHRoaXMuc2VsZWN0ZWRNb250aC5tb250aE5icjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgeSA9IHRoaXMuc2VsZWN0ZWREYXRlLnllYXI7XHJcbiAgICAgIG0gPSB0aGlzLnNlbGVjdGVkRGF0ZS5tb250aDtcclxuICAgIH1cclxuICAgIHRoaXMudmlzaWJsZU1vbnRoID0geyBtb250aFR4dDogdGhpcy5vcHRzLm1vbnRoTGFiZWxzW21dLCBtb250aE5icjogbSwgeWVhcjogeSB9O1xyXG5cclxuICAgIC8vIENyZWF0ZSBjdXJyZW50IG1vbnRoXHJcbiAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIobSwgeSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBtb250aExpc3QoKTogdm9pZCB7XHJcbiAgICB0aGlzLm1vbnRocyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTI7IGkrKykge1xyXG4gICAgICB0aGlzLm1vbnRocy5wdXNoKHtcclxuICAgICAgICBpbmRleDogaSxcclxuICAgICAgICBzaG9ydDogdGhpcy5vcHRzLm1vbnRoTGFiZWxzW2ldLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLm9wdHMubW9udGhMYWJlbHNGdWxsW2ldLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHllYXJzTGlzdCgpOiB2b2lkIHtcclxuICAgIHRoaXMueWVhcnMgPSBbXTtcclxuXHJcbiAgICBjb25zdCBmaXJzdFllYXIgPSB0aGlzLm9wdHMubWluWWVhcjtcclxuICAgIGNvbnN0IGxhc3RZZWFyID0gdGhpcy5vcHRzLm1heFllYXI7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IGZpcnN0WWVhcjsgaSA8PSBsYXN0WWVhcjsgaSsrKSB7XHJcbiAgICAgIHRoaXMueWVhcnMucHVzaChpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByZXZNb250aChldmVudD86IGFueSk6IHZvaWQge1xyXG4gICAgLy8gUHJldmlvdXMgbW9udGggZnJvbSBjYWxlbmRhclxyXG4gICAgY29uc3QgZDogRGF0ZSA9IHRoaXMuZ2V0RGF0ZSh0aGlzLnZpc2libGVNb250aC55ZWFyLCB0aGlzLnZpc2libGVNb250aC5tb250aE5iciwgMSk7XHJcbiAgICBkLnNldE1vbnRoKGQuZ2V0TW9udGgoKSAtIDEpO1xyXG5cclxuICAgIGNvbnN0IHk6IG51bWJlciA9IGQuZ2V0RnVsbFllYXIoKTtcclxuICAgIGNvbnN0IG06IG51bWJlciA9IGQuZ2V0TW9udGgoKSArIDE7XHJcblxyXG4gICAgdGhpcy52aXNpYmxlTW9udGggPSB7IG1vbnRoVHh0OiB0aGlzLm1vbnRoVGV4dChtKSwgbW9udGhOYnI6IG0sIHllYXI6IHkgfTtcclxuICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcihtLCB5LCB0cnVlKTtcclxuXHJcbiAgICAvLyBQcmV2ZW50cyB0cmlnZ2VyIChjbGljaykgZXZlbnQgd2hlbiB1c2luZyBFbnRlclxyXG4gICAgaWYgKGV2ZW50LmNvZGUgPT09ICdFbnRlcicpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0TW9udGgoZXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgIC8vIE5leHQgbW9udGggZnJvbSBjYWxlbmRhclxyXG4gICAgY29uc3QgZDogRGF0ZSA9IHRoaXMuZ2V0RGF0ZSh0aGlzLnZpc2libGVNb250aC55ZWFyLCB0aGlzLnZpc2libGVNb250aC5tb250aE5iciwgMSk7XHJcbiAgICBkLnNldE1vbnRoKGQuZ2V0TW9udGgoKSArIDEpO1xyXG5cclxuICAgIGNvbnN0IHk6IG51bWJlciA9IGQuZ2V0RnVsbFllYXIoKTtcclxuICAgIGNvbnN0IG06IG51bWJlciA9IGQuZ2V0TW9udGgoKSArIDE7XHJcblxyXG4gICAgdGhpcy52aXNpYmxlTW9udGggPSB7IG1vbnRoVHh0OiB0aGlzLm1vbnRoVGV4dChtKSwgbW9udGhOYnI6IG0sIHllYXI6IHkgfTtcclxuICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcihtLCB5LCB0cnVlKTtcclxuXHJcbiAgICAvLyBQcmV2ZW50cyB0cmlnZ2VyIChjbGljaykgZXZlbnQgd2hlbiB1c2luZyBFbnRlclxyXG4gICAgaWYgKGV2ZW50LmNvZGUgPT09ICdFbnRlcicpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcmV2WWVhcigpOiB2b2lkIHtcclxuICAgIC8vIFByZXZpb3VzIHllYXIgZnJvbSBjYWxlbmRhclxyXG4gICAgdGhpcy52aXNpYmxlTW9udGgueWVhci0tO1xyXG4gICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoTmJyLCB0aGlzLnZpc2libGVNb250aC55ZWFyLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIG5leHRZZWFyKCk6IHZvaWQge1xyXG4gICAgLy8gTmV4dCB5ZWFyIGZyb20gY2FsZW5kYXJcclxuICAgIHRoaXMudmlzaWJsZU1vbnRoLnllYXIrKztcclxuICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcih0aGlzLnZpc2libGVNb250aC5tb250aE5iciwgdGhpcy52aXNpYmxlTW9udGgueWVhciwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICB0b2RheUNsaWNrZWQoKTogdm9pZCB7XHJcbiAgICAvLyBUb2RheSBidXR0b24gY2xpY2tlZFxyXG4gICAgY29uc3QgdG9kYXk6IElNeURhdGUgPSB0aGlzLmdldFRvZGF5KCk7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnV0aWxTZXJ2aWNlLmlzRGlzYWJsZWREYXkoXHJcbiAgICAgICAgdG9kYXksXHJcbiAgICAgICAgdGhpcy5vcHRzLmRpc2FibGVVbnRpbCxcclxuICAgICAgICB0aGlzLm9wdHMuZGlzYWJsZVNpbmNlLFxyXG4gICAgICAgIHRoaXMub3B0cy5kaXNhYmxlV2Vla2VuZHMsXHJcbiAgICAgICAgdGhpcy5vcHRzLmRpc2FibGVEYXlzLFxyXG4gICAgICAgIHRoaXMub3B0cy5kaXNhYmxlRGF0ZVJhbmdlcyxcclxuICAgICAgICB0aGlzLm9wdHMuZW5hYmxlRGF5c1xyXG4gICAgICApXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5zZWxlY3REYXRlKHRvZGF5KTtcclxuICAgIH1cclxuICAgIGlmICh0b2RheS55ZWFyICE9PSB0aGlzLnZpc2libGVNb250aC55ZWFyIHx8IHRvZGF5Lm1vbnRoICE9PSB0aGlzLnZpc2libGVNb250aC5tb250aE5icikge1xyXG4gICAgICB0aGlzLnZpc2libGVNb250aCA9IHtcclxuICAgICAgICBtb250aFR4dDogdGhpcy5vcHRzLm1vbnRoTGFiZWxzW3RvZGF5Lm1vbnRoXSxcclxuICAgICAgICBtb250aE5icjogdG9kYXkubW9udGgsXHJcbiAgICAgICAgeWVhcjogdG9kYXkueWVhcixcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKHRvZGF5Lm1vbnRoLCB0b2RheS55ZWFyLCB0cnVlKTtcclxuICAgIH1cclxuICAgIHRoaXMudG9kYXlCdXR0b25DbGlja2VkLmVtaXQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBjZWxsQ2xpY2tlZChjZWxsOiBhbnkpOiB2b2lkIHtcclxuICAgIC8vIENlbGwgY2xpY2tlZCBvbiB0aGUgY2FsZW5kYXJcclxuICAgIGlmIChjZWxsLmNtbyA9PT0gdGhpcy5wcmV2TW9udGhJZCkge1xyXG4gICAgICAvLyBQcmV2aW91cyBtb250aCBkYXlcclxuICAgICAgdGhpcy5wcmV2TW9udGgoKTtcclxuICAgIH0gZWxzZSBpZiAoY2VsbC5jbW8gPT09IHRoaXMuY3Vyck1vbnRoSWQpIHtcclxuICAgICAgLy8gQ3VycmVudCBtb250aCBkYXkgLSBpZiBkYXRlIGlzIGFscmVhZHkgc2VsZWN0ZWQgY2xlYXIgaXRcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGNlbGwuZGF0ZU9iai55ZWFyID09PSB0aGlzLnNlbGVjdGVkRGF0ZS55ZWFyICYmXHJcbiAgICAgICAgY2VsbC5kYXRlT2JqLm1vbnRoID09PSB0aGlzLnNlbGVjdGVkRGF0ZS5tb250aCAmJlxyXG4gICAgICAgIGNlbGwuZGF0ZU9iai5kYXkgPT09IHRoaXMuc2VsZWN0ZWREYXRlLmRheVxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLmNsZWFyRGF0ZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0RGF0ZShjZWxsLmRhdGVPYmopO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGNlbGwuY21vID09PSB0aGlzLm5leHRNb250aElkKSB7XHJcbiAgICAgIC8vIE5leHQgbW9udGggZGF5XHJcbiAgICAgIHRoaXMubmV4dE1vbnRoKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlc2V0TW9udGhZZWFyRWRpdCgpO1xyXG4gIH1cclxuXHJcbiAgY2VsbEtleURvd24oZXZlbnQ6IGFueSwgY2VsbDogYW55KSB7XHJcbiAgICAvLyBDZWxsIGtleWJvYXJkIGhhbmRsaW5nXHJcbiAgICBpZiAoKGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGUuZW50ZXIgfHwgZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZS5zcGFjZSkgJiYgIWNlbGwuZGlzYWJsZWQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdGhpcy5jZWxsQ2xpY2tlZChjZWxsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsZWFyRGF0ZSgpOiB2b2lkIHtcclxuICAgIC8vIENsZWFycyB0aGUgZGF0ZSBhbmQgbm90aWZpZXMgcGFyZW50IHVzaW5nIGNhbGxiYWNrcyBhbmQgdmFsdWUgYWNjZXNzb3JcclxuICAgIGNvbnN0IGRhdGU6IElNeURhdGUgPSB7IHllYXI6IDAsIG1vbnRoOiAwLCBkYXk6IDAgfTtcclxuICAgIHRoaXMuZGF0ZUNoYW5nZWQuZW1pdCh7IGRhdGU6IGRhdGUsIGpzZGF0ZTogbnVsbCwgZm9ybWF0dGVkOiAnJywgZXBvYzogMCB9KTtcclxuICAgIHRoaXMub25DaGFuZ2VDYihudWxsKTtcclxuICAgIHRoaXMub25Ub3VjaGVkQ2IoKTtcclxuICAgIHRoaXMudXBkYXRlRGF0ZVZhbHVlKGRhdGUsIHRydWUpO1xyXG4gICAgdGhpcy50bXAgPSB7XHJcbiAgICAgIHllYXI6IHRoaXMuZ2V0VG9kYXkoKS55ZWFyLFxyXG4gICAgICBtb250aDogdGhpcy5nZXRUb2RheSgpLm1vbnRoLFxyXG4gICAgICBkYXk6IHRoaXMuZ2V0VG9kYXkoKS5kYXksXHJcbiAgICB9O1xyXG4gICAgdGhpcy5zZXRWaXNpYmxlTW9udGgoKTtcclxuICAgIHRoaXMubGFiZWxBY3RpdmUgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHNlbGVjdERhdGUoZGF0ZTogSU15RGF0ZSk6IHZvaWQge1xyXG4gICAgLy8gRGF0ZSBzZWxlY3RlZCwgbm90aWZpZXMgcGFyZW50IHVzaW5nIGNhbGxiYWNrcyBhbmQgdmFsdWUgYWNjZXNzb3JcclxuICAgIHRoaXMudG1wID0gZGF0ZTtcclxuICAgIGNvbnN0IGRhdGVNb2RlbDogYW55ID0gdGhpcy5nZXREYXRlTW9kZWwoZGF0ZSk7XHJcbiAgICAvLyB0aGlzLmRhdGVDaGFuZ2VkLmVtaXQoeyBwcmV2aW91c0RhdGU6IHRoaXMuc2VsZWN0aW9uRGF5VHh0LCBhY3R1YWxEYXRlOiBkYXRlTW9kZWwgfSk7XHJcbiAgICB0aGlzLmRhdGVDaGFuZ2VkLmVtaXQoe1xyXG4gICAgICBkYXRlOiBkYXRlLFxyXG4gICAgICBqc2RhdGU6IHRoaXMuZ2V0RGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KSxcclxuICAgICAgcHJldmlvdXNEYXRlRm9ybWF0dGVkOiB0aGlzLnNlbGVjdGlvbkRheVR4dCxcclxuICAgICAgYWN0dWFsRGF0ZUZvcm1hdHRlZDogZGF0ZU1vZGVsLFxyXG4gICAgICBlcG9jOiBNYXRoLnJvdW5kKHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGRhdGUpIC8gMTAwMC4wKSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5vbkNoYW5nZUNiKGRhdGVNb2RlbCk7XHJcbiAgICB0aGlzLm9uVG91Y2hlZENiKCk7XHJcbiAgICB0aGlzLnVwZGF0ZURhdGVWYWx1ZShkYXRlLCBmYWxzZSk7XHJcbiAgICBpZiAodGhpcy5zaG93U2VsZWN0b3IpIHtcclxuICAgICAgdGhpcy5jYWxlbmRhclRvZ2dsZS5lbWl0KENhbFRvZ2dsZS5DbG9zZUJ5RGF0ZVNlbCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vcHRzLmNsb3NlQWZ0ZXJTZWxlY3QpIHtcclxuICAgICAgdGhpcy5jbG9zZUJ0bkNsaWNrZWQoKTtcclxuICAgIH1cclxuICAgIHRoaXMubGFiZWxBY3RpdmUgPSB0cnVlO1xyXG4gICAgLy8gaGlkZSBjYWxlbmRhciB3aGVuIGRhdGUgd2FzIGNsaWNrZWRcclxuICAgIC8vIHRoaXMuc2hvd1NlbGVjdG9yID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEYXRlVmFsdWUoZGF0ZTogSU15RGF0ZSwgY2xlYXI6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIC8vIFVwZGF0ZXMgZGF0ZSB2YWx1ZXNcclxuICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZTtcclxuICAgIHRoaXMudG1wID0gZGF0ZTtcclxuICAgIHRoaXMuaXNEYXRlU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5zZWxlY3Rpb25EYXlUeHQgPSBjbGVhciA/ICcnIDogdGhpcy5mb3JtYXREYXRlKGRhdGUpO1xyXG4gICAgdGhpcy5pbnB1dEZpZWxkQ2hhbmdlZC5lbWl0KHtcclxuICAgICAgdmFsdWU6IHRoaXMuc2VsZWN0aW9uRGF5VHh0LFxyXG4gICAgICBkYXRlRm9ybWF0OiB0aGlzLm9wdHMuZGF0ZUZvcm1hdCxcclxuICAgICAgdmFsaWQ6ICFjbGVhcixcclxuICAgIH0pO1xyXG4gICAgdGhpcy5pbnZhbGlkRGF0ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGdldERhdGVNb2RlbChkYXRlOiBJTXlEYXRlKTogYW55IHtcclxuICAgIC8vIENyZWF0ZXMgYSBkYXRlIG1vZGVsIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBwYXJhbWV0ZXJcclxuICAgIHJldHVybiB0aGlzLmZvcm1hdERhdGUoZGF0ZSk7XHJcbiAgfVxyXG5cclxuICBwcmVaZXJvKHZhbDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIC8vIFByZXBlbmQgemVybyBpZiBzbWFsbGVyIHRoYW4gMTBcclxuICAgIHJldHVybiBwYXJzZUludCh2YWwsIDApIDwgMTAgPyAnMCcgKyB2YWwgOiB2YWw7XHJcbiAgfVxyXG5cclxuICBmb3JtYXREYXRlKHZhbDogYW55KTogc3RyaW5nIHtcclxuICAgIC8vIFJldHVybnMgZm9ybWF0dGVkIGRhdGUgc3RyaW5nLCBpZiBtbW0gaXMgcGFydCBvZiBkYXRlRm9ybWF0IHJldHVybnMgbW9udGggYXMgYSBzdHJpbmdcclxuICAgIC8vIGRheXNcclxuICAgIGNvbnN0IGQgPSB2YWwuZGF5OyAvLyAxIC0gMzFcclxuICAgIGNvbnN0IGRkID0gdGhpcy5wcmVaZXJvKHZhbC5kYXkpOyAvLyAwMSAtIDMxXHJcbiAgICBjb25zdCBkZGQgPSB0aGlzLm9wdHMuZGF5TGFiZWxzW3RoaXMuZ2V0V2Vla2RheSh2YWwpXTsgLy8gU3VuLVNhdFxyXG4gICAgY29uc3QgZGRkZCA9IHRoaXMub3B0cy5kYXlMYWJlbHNGdWxsW3RoaXMuZ2V0V2Vla2RheSh2YWwpXTsgLy8gU3VuZGF5IOKAkyBTYXR1cmRheVxyXG4gICAgY29uc3QgbSA9IHZhbC5tb250aDsgLy8gMSAtIDEyXHJcbiAgICBjb25zdCBtbSA9IHRoaXMucHJlWmVybyh2YWwubW9udGgpOyAvLyAwMSAtIDEyXHJcbiAgICBjb25zdCBtbW0gPSB0aGlzLmdldE1vbnRoU2hvcnQodmFsLm1vbnRoKTsgLy8gSmFuIC0gRGVjXHJcbiAgICBjb25zdCBtbW1tID0gdGhpcy5nZXRNb250aEZ1bGwodmFsLm1vbnRoKTsgLy8gSmFudWFyeSDigJMgRGVjZW1iZXJcclxuICAgIGNvbnN0IHl5ID0gdmFsLnllYXIudG9TdHJpbmcoKS5sZW5ndGggPT09IDIgPyB2YWwueWVhciA6IHZhbC55ZWFyLnRvU3RyaW5nKCkuc2xpY2UoMiwgNCk7IC8vIDAwIC0gOTlcclxuICAgIGNvbnN0IHl5eXkgPSB2YWwueWVhcjtcclxuXHJcbiAgICBjb25zdCB0b1JlcGxhY2UgPSB0aGlzLm9wdHMuZGF0ZUZvcm1hdC5zcGxpdCgvKGR7MSw0fXxtezEsNH18eXs0fXx5eXwhLikvZyk7XHJcbiAgICBsZXQgZm9ybWF0dGVkID0gJyc7XHJcbiAgICB0b1JlcGxhY2UuZm9yRWFjaCgoZWw6IGFueSkgPT4ge1xyXG4gICAgICBzd2l0Y2ggKGVsKSB7XHJcbiAgICAgICAgY2FzZSAnZGRkZCc6XHJcbiAgICAgICAgICBlbCA9IGVsLnJlcGxhY2UoZWwsIGRkZGQpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZGRkJzpcclxuICAgICAgICAgIGVsID0gZWwucmVwbGFjZShlbCwgZGRkKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2RkJzpcclxuICAgICAgICAgIGVsID0gZWwucmVwbGFjZShlbCwgZGQpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZCc6XHJcbiAgICAgICAgICBlbCA9IGVsLnJlcGxhY2UoZWwsIGQpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbW1tbSc6XHJcbiAgICAgICAgICBlbCA9IGVsLnJlcGxhY2UoZWwsIG1tbW0pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbW1tJzpcclxuICAgICAgICAgIGVsID0gZWwucmVwbGFjZShlbCwgbW1tKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ21tJzpcclxuICAgICAgICAgIGVsID0gZWwucmVwbGFjZShlbCwgbW0pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbSc6XHJcbiAgICAgICAgICBlbCA9IGVsLnJlcGxhY2UoZWwsIG0pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAneXl5eSc6XHJcbiAgICAgICAgICBlbCA9IGVsLnJlcGxhY2UoZWwsIHl5eXkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAneXknOlxyXG4gICAgICAgICAgZWwgPSBlbC5yZXBsYWNlKGVsLCB5eSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBmb3JtYXR0ZWQgKz0gZWw7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZm9ybWF0dGVkO1xyXG4gIH1cclxuXHJcbiAgbW9udGhUZXh0KG06IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAvLyBSZXR1cm5zIG1vbnRoIGFzIGEgdGV4dFxyXG4gICAgcmV0dXJuIHRoaXMub3B0cy5tb250aExhYmVsc1ttXTtcclxuICB9XHJcblxyXG4gIHdlZWtUZXh0KG06IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAvLyBSZXR1cm5zIG1vbnRoIGFzIGEgdGV4dFxyXG4gICAgcmV0dXJuIHRoaXMub3B0cy5kYXlMYWJlbHNGdWxsW21dO1xyXG4gIH1cclxuXHJcbiAgZ2V0TW9udGhTaG9ydChtOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0cy5tb250aExhYmVsc1ttXTtcclxuICB9XHJcblxyXG4gIGdldE1vbnRoRnVsbChtOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0cy5tb250aExhYmVsc0Z1bGxbbV07XHJcbiAgfVxyXG5cclxuICBtb250aFN0YXJ0SWR4KHk6IG51bWJlciwgbTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIC8vIE1vbnRoIHN0YXJ0IGluZGV4XHJcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcclxuICAgIGQuc2V0RGF0ZSgxKTtcclxuICAgIGQuc2V0TW9udGgobSAtIDEpO1xyXG4gICAgZC5zZXRGdWxsWWVhcih5KTtcclxuICAgIGNvbnN0IGlkeCA9IGQuZ2V0RGF5KCkgKyB0aGlzLnN1bmRheUlkeCgpO1xyXG4gICAgcmV0dXJuIGlkeCA+PSA3ID8gaWR4IC0gNyA6IGlkeDtcclxuICB9XHJcblxyXG4gIGRheXNJbk1vbnRoKG06IG51bWJlciwgeTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIC8vIFJldHVybiBudW1iZXIgb2YgZGF5cyBvZiBjdXJyZW50IG1vbnRoXHJcbiAgICByZXR1cm4gbmV3IERhdGUoeSwgbSwgMCkuZ2V0RGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgZGF5c0luUHJldk1vbnRoKG06IG51bWJlciwgeTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIC8vIFJldHVybiBudW1iZXIgb2YgZGF5cyBvZiB0aGUgcHJldmlvdXMgbW9udGhcclxuICAgIGNvbnN0IGQ6IERhdGUgPSB0aGlzLmdldERhdGUoeSwgbSwgMSk7XHJcbiAgICBkLnNldE1vbnRoKGQuZ2V0TW9udGgoKSAtIDEpO1xyXG4gICAgcmV0dXJuIHRoaXMuZGF5c0luTW9udGgoZC5nZXRNb250aCgpICsgMSwgZC5nZXRGdWxsWWVhcigpKTtcclxuICB9XHJcblxyXG4gIGlzQ3VyckRheShkOiBudW1iZXIsIG06IG51bWJlciwgeTogbnVtYmVyLCBjbW86IG51bWJlciwgdG9kYXk6IElNeURhdGUpOiBib29sZWFuIHtcclxuICAgIC8vIENoZWNrIGlzIGEgZ2l2ZW4gZGF0ZSB0aGUgdG9kYXlcclxuICAgIHJldHVybiBkID09PSB0b2RheS5kYXkgJiYgbSA9PT0gdG9kYXkubW9udGggJiYgeSA9PT0gdG9kYXkueWVhciAmJiBjbW8gPT09IHRoaXMuY3Vyck1vbnRoSWQ7XHJcbiAgfVxyXG5cclxuICBnZXRUb2RheSgpOiBJTXlEYXRlIHtcclxuICAgIGNvbnN0IGRhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgcmV0dXJuIHsgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLCBtb250aDogZGF0ZS5nZXRNb250aCgpICsgMSwgZGF5OiBkYXRlLmdldERhdGUoKSB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0VGltZUluTWlsbGlzZWNvbmRzKGRhdGU6IElNeURhdGUpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KS5nZXRUaW1lKCk7XHJcbiAgfVxyXG5cclxuICBnZXRXZWVrZGF5KGRhdGU6IElNeURhdGUpOiBzdHJpbmcge1xyXG4gICAgLy8gR2V0IHdlZWtkYXk6IHN1LCBtbywgdHUsIHdlIC4uLlxyXG4gICAgcmV0dXJuIHRoaXMud2Vla0RheU9wdHNbdGhpcy51dGlsU2VydmljZS5nZXREYXlOdW1iZXIoZGF0ZSldO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICAvLyBDcmVhdGVzIGEgZGF0ZSBvYmplY3QgZnJvbSBnaXZlbiB5ZWFyLCBtb250aCBhbmQgZGF5XHJcbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXksIDAsIDAsIDAsIDApO1xyXG4gIH1cclxuXHJcbiAgc3VuZGF5SWR4KCk6IG51bWJlciB7XHJcbiAgICAvLyBJbmRleCBvZiBTdW5kYXkgZGF5XHJcbiAgICByZXR1cm4gdGhpcy5kYXlJZHggPiAwID8gNyAtIHRoaXMuZGF5SWR4IDogMDtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlQ2FsZW5kYXIobTogbnVtYmVyLCB5OiBudW1iZXIsIG5vdGlmeUNoYW5nZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5kYXRlcy5sZW5ndGggPSAwO1xyXG4gICAgY29uc3QgdG9kYXk6IElNeURhdGUgPSB0aGlzLmdldFRvZGF5KCk7XHJcbiAgICBjb25zdCBtb250aFN0YXJ0OiBudW1iZXIgPSB0aGlzLm1vbnRoU3RhcnRJZHgoeSwgbSk7XHJcbiAgICBjb25zdCBkSW5UaGlzTTogbnVtYmVyID0gdGhpcy5kYXlzSW5Nb250aChtLCB5KTtcclxuICAgIGNvbnN0IGRJblByZXZNOiBudW1iZXIgPSB0aGlzLmRheXNJblByZXZNb250aChtLCB5KTtcclxuXHJcbiAgICBsZXQgZGF5TmJyID0gMTtcclxuICAgIGxldCBjbW86IG51bWJlciA9IHRoaXMucHJldk1vbnRoSWQ7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IDc7IGkrKykge1xyXG4gICAgICBjb25zdCB3ZWVrOiBBcnJheTxJTXlDYWxlbmRhckRheT4gPSBbXTtcclxuICAgICAgaWYgKGkgPT09IDEpIHtcclxuICAgICAgICAvLyBGaXJzdCB3ZWVrXHJcbiAgICAgICAgY29uc3QgcG0gPSBkSW5QcmV2TSAtIG1vbnRoU3RhcnQgKyAxO1xyXG4gICAgICAgIC8vIFByZXZpb3VzIG1vbnRoXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IHBtOyBqIDw9IGRJblByZXZNOyBqKyspIHtcclxuICAgICAgICAgIGNvbnN0IGRhdGU6IElNeURhdGUgPSB7IHllYXI6IHksIG1vbnRoOiBtIC0gMSwgZGF5OiBqIH07XHJcbiAgICAgICAgICB3ZWVrLnB1c2goe1xyXG4gICAgICAgICAgICBkYXRlT2JqOiBkYXRlLFxyXG4gICAgICAgICAgICBjbW86IGNtbyxcclxuICAgICAgICAgICAgY3VyckRheTogdGhpcy5pc0N1cnJEYXkoaiwgbSwgeSwgY21vLCB0b2RheSksXHJcbiAgICAgICAgICAgIGRheU5icjogdGhpcy51dGlsU2VydmljZS5nZXREYXlOdW1iZXIoZGF0ZSksXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnV0aWxTZXJ2aWNlLmlzRGlzYWJsZWREYXkoXHJcbiAgICAgICAgICAgICAgZGF0ZSxcclxuICAgICAgICAgICAgICB0aGlzLm9wdHMuZGlzYWJsZVVudGlsLFxyXG4gICAgICAgICAgICAgIHRoaXMub3B0cy5kaXNhYmxlU2luY2UsXHJcbiAgICAgICAgICAgICAgdGhpcy5vcHRzLmRpc2FibGVXZWVrZW5kcyxcclxuICAgICAgICAgICAgICB0aGlzLm9wdHMuZGlzYWJsZURheXMsXHJcbiAgICAgICAgICAgICAgdGhpcy5vcHRzLmRpc2FibGVEYXRlUmFuZ2VzLFxyXG4gICAgICAgICAgICAgIHRoaXMub3B0cy5lbmFibGVEYXlzXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIG1hcmtlZERhdGU6IHRoaXMudXRpbFNlcnZpY2UuaXNNYXJrZWREYXRlKFxyXG4gICAgICAgICAgICAgIGRhdGUsXHJcbiAgICAgICAgICAgICAgdGhpcy5vcHRzLm1hcmtEYXRlcyxcclxuICAgICAgICAgICAgICB0aGlzLm9wdHMubWFya1dlZWtlbmRzXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNtbyA9IHRoaXMuY3Vyck1vbnRoSWQ7XHJcbiAgICAgICAgLy8gQ3VycmVudCBtb250aFxyXG4gICAgICAgIGNvbnN0IGRheXNMZWZ0OiBudW1iZXIgPSA3IC0gd2Vlay5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXlzTGVmdDsgaisrKSB7XHJcbiAgICAgICAgICBjb25zdCBkYXRlOiBJTXlEYXRlID0geyB5ZWFyOiB5LCBtb250aDogbSwgZGF5OiBkYXlOYnIgfTtcclxuICAgICAgICAgIHdlZWsucHVzaCh7XHJcbiAgICAgICAgICAgIGRhdGVPYmo6IGRhdGUsXHJcbiAgICAgICAgICAgIGNtbzogY21vLFxyXG4gICAgICAgICAgICBjdXJyRGF5OiB0aGlzLmlzQ3VyckRheShkYXlOYnIsIG0sIHksIGNtbywgdG9kYXkpLFxyXG4gICAgICAgICAgICBkYXlOYnI6IHRoaXMudXRpbFNlcnZpY2UuZ2V0RGF5TnVtYmVyKGRhdGUpLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy51dGlsU2VydmljZS5pc0Rpc2FibGVkRGF5KFxyXG4gICAgICAgICAgICAgIGRhdGUsXHJcbiAgICAgICAgICAgICAgdGhpcy5vcHRzLmRpc2FibGVVbnRpbCxcclxuICAgICAgICAgICAgICB0aGlzLm9wdHMuZGlzYWJsZVNpbmNlLFxyXG4gICAgICAgICAgICAgIHRoaXMub3B0cy5kaXNhYmxlV2Vla2VuZHMsXHJcbiAgICAgICAgICAgICAgdGhpcy5vcHRzLmRpc2FibGVEYXlzLFxyXG4gICAgICAgICAgICAgIHRoaXMub3B0cy5kaXNhYmxlRGF0ZVJhbmdlcyxcclxuICAgICAgICAgICAgICB0aGlzLm9wdHMuZW5hYmxlRGF5c1xyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBtYXJrZWREYXRlOiB0aGlzLnV0aWxTZXJ2aWNlLmlzTWFya2VkRGF0ZShcclxuICAgICAgICAgICAgICBkYXRlLFxyXG4gICAgICAgICAgICAgIHRoaXMub3B0cy5tYXJrRGF0ZXMsXHJcbiAgICAgICAgICAgICAgdGhpcy5vcHRzLm1hcmtXZWVrZW5kc1xyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBkYXlOYnIrKztcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gUmVzdCBvZiB0aGUgd2Vla3NcclxuICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgaWYgKGRheU5iciA+IGRJblRoaXNNKSB7XHJcbiAgICAgICAgICAgIC8vIE5leHQgbW9udGhcclxuICAgICAgICAgICAgZGF5TmJyID0gMTtcclxuICAgICAgICAgICAgY21vID0gdGhpcy5uZXh0TW9udGhJZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IGRhdGU6IElNeURhdGUgPSB7XHJcbiAgICAgICAgICAgIHllYXI6IHksXHJcbiAgICAgICAgICAgIG1vbnRoOiBjbW8gPT09IHRoaXMuY3Vyck1vbnRoSWQgPyBtIDogbSArIDEsXHJcbiAgICAgICAgICAgIGRheTogZGF5TmJyLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHdlZWsucHVzaCh7XHJcbiAgICAgICAgICAgIGRhdGVPYmo6IGRhdGUsXHJcbiAgICAgICAgICAgIGNtbzogY21vLFxyXG4gICAgICAgICAgICBjdXJyRGF5OiB0aGlzLmlzQ3VyckRheShkYXlOYnIsIG0sIHksIGNtbywgdG9kYXkpLFxyXG4gICAgICAgICAgICBkYXlOYnI6IHRoaXMudXRpbFNlcnZpY2UuZ2V0RGF5TnVtYmVyKGRhdGUpLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy51dGlsU2VydmljZS5pc0Rpc2FibGVkRGF5KFxyXG4gICAgICAgICAgICAgIGRhdGUsXHJcbiAgICAgICAgICAgICAgdGhpcy5vcHRzLmRpc2FibGVVbnRpbCxcclxuICAgICAgICAgICAgICB0aGlzLm9wdHMuZGlzYWJsZVNpbmNlLFxyXG4gICAgICAgICAgICAgIHRoaXMub3B0cy5kaXNhYmxlV2Vla2VuZHMsXHJcbiAgICAgICAgICAgICAgdGhpcy5vcHRzLmRpc2FibGVEYXlzLFxyXG4gICAgICAgICAgICAgIHRoaXMub3B0cy5kaXNhYmxlRGF0ZVJhbmdlcyxcclxuICAgICAgICAgICAgICB0aGlzLm9wdHMuZW5hYmxlRGF5c1xyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBtYXJrZWREYXRlOiB0aGlzLnV0aWxTZXJ2aWNlLmlzTWFya2VkRGF0ZShcclxuICAgICAgICAgICAgICBkYXRlLFxyXG4gICAgICAgICAgICAgIHRoaXMub3B0cy5tYXJrRGF0ZXMsXHJcbiAgICAgICAgICAgICAgdGhpcy5vcHRzLm1hcmtXZWVrZW5kc1xyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBkYXlOYnIrKztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgd2Vla05icjogbnVtYmVyID1cclxuICAgICAgICB0aGlzLm9wdHMuc2hvd1dlZWtOdW1iZXJzICYmIHRoaXMub3B0cy5maXJzdERheU9mV2VlayA9PT0gJ21vJ1xyXG4gICAgICAgICAgPyB0aGlzLnV0aWxTZXJ2aWNlLmdldFdlZWtOdW1iZXIod2Vla1swXS5kYXRlT2JqKVxyXG4gICAgICAgICAgOiAwO1xyXG4gICAgICB0aGlzLmRhdGVzLnB1c2goeyB3ZWVrOiB3ZWVrLCB3ZWVrTmJyOiB3ZWVrTmJyIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0SGVhZGVyQnRuRGlzYWJsZWRTdGF0ZShtLCB5KTtcclxuXHJcbiAgICBpZiAobm90aWZ5Q2hhbmdlKSB7XHJcbiAgICAgIC8vIE5vdGlmeSBwYXJlbnRcclxuICAgICAgdGhpcy5jYWxlbmRhclZpZXdDaGFuZ2VkLmVtaXQoe1xyXG4gICAgICAgIHllYXI6IHksXHJcbiAgICAgICAgbW9udGg6IG0sXHJcbiAgICAgICAgZmlyc3Q6IHtcclxuICAgICAgICAgIG51bWJlcjogMSxcclxuICAgICAgICAgIHdlZWtkYXk6IHRoaXMuZ2V0V2Vla2RheSh7XHJcbiAgICAgICAgICAgIHllYXI6IHksXHJcbiAgICAgICAgICAgIG1vbnRoOiBtLFxyXG4gICAgICAgICAgICBkYXk6IDEsXHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxhc3Q6IHtcclxuICAgICAgICAgIG51bWJlcjogZEluVGhpc00sXHJcbiAgICAgICAgICB3ZWVrZGF5OiB0aGlzLmdldFdlZWtkYXkoe1xyXG4gICAgICAgICAgICB5ZWFyOiB5LFxyXG4gICAgICAgICAgICBtb250aDogbSxcclxuICAgICAgICAgICAgZGF5OiBkSW5UaGlzTSxcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubW9udGhMaXN0KCk7XHJcbiAgICB0aGlzLnllYXJzTGlzdCgpO1xyXG4gIH1cclxuXHJcbiAgcGFyc2VTZWxlY3RlZERhdGUoc2VsRGF0ZTogYW55KTogSU15RGF0ZSB7XHJcbiAgICAvLyBQYXJzZSBzZWxEYXRlIHZhbHVlIC0gaXQgY2FuIGJlIHN0cmluZyBvciBJTXlEYXRlIG9iamVjdFxyXG5cclxuICAgIC8vIFJlbW92ZXMgZXZlcnl0aGluZyBmcm9tIHNlbERhdGUgaWYgaXQncyBJU08gZGF0ZSBmb3JtYXQgdG8gYWxsb3cgdG8gdXNlIElTTyBkYXRlIGluIGRhdGUgcGlja2VyXHJcbiAgICBpZiAoc2VsRGF0ZS50b1N0cmluZygpLmluZGV4T2YoJ1QnKSAhPT0gLTEpIHtcclxuICAgICAgc2VsRGF0ZSA9IHNlbERhdGUuc3Vic3RyKDAsIHNlbERhdGUuaW5kZXhPZignVCcpKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZGF0ZTogSU15RGF0ZSA9IHsgZGF5OiAwLCBtb250aDogMCwgeWVhcjogMCB9O1xyXG4gICAgaWYgKHR5cGVvZiBzZWxEYXRlID09PSAnc3RyaW5nJykge1xyXG4gICAgICBjb25zdCBzZDogc3RyaW5nID0gPHN0cmluZz5zZWxEYXRlO1xyXG4gICAgICBjb25zdCBkZjogc3RyaW5nID0gdGhpcy5vcHRzLmRhdGVGb3JtYXQ7XHJcblxyXG4gICAgICBjb25zdCBkZWxpbWV0ZXJzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy51dGlsU2VydmljZS5nZXREYXRlRm9ybWF0RGVsaW1ldGVycyhkZik7XHJcbiAgICAgIGNvbnN0IGRhdGVWYWx1ZSA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0RGF0ZVZhbHVlKHNkLCBkZiwgZGVsaW1ldGVycyk7XHJcbiAgICAgIGRhdGUueWVhciA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0TnVtYmVyQnlWYWx1ZShkYXRlVmFsdWVbMF0pO1xyXG5cclxuICAgICAgaWYgKGRmLmluZGV4T2YoJ21tbW0nKSAhPT0gLTEpIHtcclxuICAgICAgICBkYXRlLm1vbnRoID0gdGhpcy51dGlsU2VydmljZS5nZXRNb250aE51bWJlckJ5TW9udGhOYW1lKFxyXG4gICAgICAgICAgZGF0ZVZhbHVlWzFdLFxyXG4gICAgICAgICAgdGhpcy5vcHRzLm1vbnRoTGFiZWxzRnVsbFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZGYuaW5kZXhPZignbW1tJykgIT09IC0xKSB7XHJcbiAgICAgICAgZGF0ZS5tb250aCA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0TW9udGhOdW1iZXJCeU1vbnRoTmFtZShcclxuICAgICAgICAgIGRhdGVWYWx1ZVsxXSxcclxuICAgICAgICAgIHRoaXMub3B0cy5tb250aExhYmVsc1xyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGF0ZS5tb250aCA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0TnVtYmVyQnlWYWx1ZShkYXRlVmFsdWVbMV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGRhdGUuZGF5ID0gdGhpcy51dGlsU2VydmljZS5nZXROdW1iZXJCeVZhbHVlKGRhdGVWYWx1ZVsyXSk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxEYXRlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBkYXRlID0gc2VsRGF0ZTtcclxuICAgIH1cclxuICAgIHRoaXMuc2VsZWN0aW9uRGF5VHh0ID0gdGhpcy5mb3JtYXREYXRlKGRhdGUpO1xyXG4gICAgcmV0dXJuIGRhdGU7XHJcbiAgfVxyXG5cclxuICBwYXJzZVNlbGVjdGVkTW9udGgobXM6IHN0cmluZyk6IElNeU1vbnRoIHtcclxuICAgIHJldHVybiB0aGlzLnV0aWxTZXJ2aWNlLnBhcnNlRGVmYXVsdE1vbnRoKG1zKTtcclxuICB9XHJcblxyXG4gIHNldEhlYWRlckJ0bkRpc2FibGVkU3RhdGUobTogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGxldCBkcG0gPSBmYWxzZTtcclxuICAgIGxldCBkcHkgPSBmYWxzZTtcclxuICAgIGxldCBkbm0gPSBmYWxzZTtcclxuICAgIGxldCBkbnkgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLm9wdHMuZGlzYWJsZUhlYWRlckJ1dHRvbnMpIHtcclxuICAgICAgZHBtID0gdGhpcy51dGlsU2VydmljZS5pc01vbnRoRGlzYWJsZWRCeURpc2FibGVVbnRpbChcclxuICAgICAgICB7XHJcbiAgICAgICAgICB5ZWFyOiBtID09PSAxID8geSAtIDEgOiB5LFxyXG4gICAgICAgICAgbW9udGg6IG0gPT09IDEgPyAxMiA6IG0gLSAxLFxyXG4gICAgICAgICAgZGF5OiB0aGlzLmRheXNJbk1vbnRoKG0gPT09IDEgPyAxMiA6IG0gLSAxLCBtID09PSAxID8geSAtIDEgOiB5KSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMub3B0cy5kaXNhYmxlVW50aWxcclxuICAgICAgKTtcclxuICAgICAgZHB5ID0gdGhpcy51dGlsU2VydmljZS5pc01vbnRoRGlzYWJsZWRCeURpc2FibGVVbnRpbChcclxuICAgICAgICB7XHJcbiAgICAgICAgICB5ZWFyOiB5IC0gMSxcclxuICAgICAgICAgIG1vbnRoOiBtLFxyXG4gICAgICAgICAgZGF5OiB0aGlzLmRheXNJbk1vbnRoKG0sIHkgLSAxKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMub3B0cy5kaXNhYmxlVW50aWxcclxuICAgICAgKTtcclxuICAgICAgZG5tID0gdGhpcy51dGlsU2VydmljZS5pc01vbnRoRGlzYWJsZWRCeURpc2FibGVTaW5jZShcclxuICAgICAgICB7XHJcbiAgICAgICAgICB5ZWFyOiBtID09PSAxMiA/IHkgKyAxIDogeSxcclxuICAgICAgICAgIG1vbnRoOiBtID09PSAxMiA/IDEgOiBtICsgMSxcclxuICAgICAgICAgIGRheTogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMub3B0cy5kaXNhYmxlU2luY2VcclxuICAgICAgKTtcclxuICAgICAgZG55ID0gdGhpcy51dGlsU2VydmljZS5pc01vbnRoRGlzYWJsZWRCeURpc2FibGVTaW5jZShcclxuICAgICAgICB7IHllYXI6IHkgKyAxLCBtb250aDogbSwgZGF5OiAxIH0sXHJcbiAgICAgICAgdGhpcy5vcHRzLmRpc2FibGVTaW5jZVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wcmV2TW9udGhEaXNhYmxlZCA9IChtID09PSAxICYmIHkgPT09IHRoaXMub3B0cy5taW5ZZWFyKSB8fCBkcG07XHJcbiAgICB0aGlzLnByZXZZZWFyRGlzYWJsZWQgPSB5IC0gMSA8IHRoaXMub3B0cy5taW5ZZWFyIHx8IGRweTtcclxuICAgIHRoaXMubmV4dE1vbnRoRGlzYWJsZWQgPSAobSA9PT0gMTIgJiYgeSA9PT0gdGhpcy5vcHRzLm1heFllYXIpIHx8IGRubTtcclxuICAgIHRoaXMubmV4dFllYXJEaXNhYmxlZCA9IHkgKyAxID4gdGhpcy5vcHRzLm1heFllYXIgfHwgZG55O1xyXG4gIH1cclxuXHJcbiAgY2hlY2tBY3RpdmUoKSB7XHJcbiAgICBpZiAodGhpcy5wbGFjZWhvbGRlci5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubGFiZWxBY3RpdmUpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc0RhdGVTZWxlY3RlZCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8vIElOTElORSBEQVRFIFBJQ0tFUlxyXG5cclxuICBwdWJsaWMgdG9nZ2xlSW5saW5lRGF0ZVBpY2tlcigpIHtcclxuICAgIGlmICh0aGlzLmlzT3Blbikge1xyXG4gICAgICB0aGlzLmNsb3NlQnRuQ2xpY2tlZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcGVuQnRuQ2xpY2tlZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmNsaWNrJywgWyckZXZlbnQnXSkgb25XaW5kb3dDbGljayhldmVudDogYW55KSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuaXNPcGVuICYmXHJcbiAgICAgIHRoaXMuaW5saW5lICYmXHJcbiAgICAgICF0aGlzLnV0aWxzLmdldENsb3Nlc3RFbChldmVudC50YXJnZXQsICcuZGF0ZXBpY2tlci1pbmxpbmUtaWNvbicpICYmXHJcbiAgICAgICF0aGlzLnV0aWxzLmdldENsb3Nlc3RFbChldmVudC50YXJnZXQsICcuZGF0ZXBpY2tlci1pbmxpbmUtaWNvbicpICYmXHJcbiAgICAgICF0aGlzLnV0aWxzLmdldENsb3Nlc3RFbChldmVudC50YXJnZXQsICcucGlja2VyX19mcmFtZScpICYmXHJcbiAgICAgICF0aGlzLnV0aWxzLmdldENsb3Nlc3RFbChldmVudC50YXJnZXQsICcubXlkcC1kYXRlJylcclxuICAgICkge1xyXG4gICAgICB0aGlzLmNsb3NlQnRuQ2xpY2tlZCgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=