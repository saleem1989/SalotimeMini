import { AfterContentChecked, AfterViewInit, ElementRef, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const TIME_PIRCKER_VALUE_ACCESSOT: any;
export declare class ClockPickerComponent implements OnInit, AfterViewInit, ControlValueAccessor, AfterContentChecked {
    elem: ElementRef;
    renderer: Renderer2;
    hoursPlate: ElementRef;
    minutesPlate: ElementRef;
    plate: ElementRef;
    svg: ElementRef;
    g: ElementRef;
    hand: ElementRef;
    fg: ElementRef;
    bg: ElementRef;
    bearing: ElementRef;
    twelvehour: boolean;
    darktheme: boolean;
    placeholder: String;
    label: string;
    duration: number;
    showClock: boolean;
    buttonLabel: string;
    disabled: boolean;
    tabIndex: any;
    outlineInput: boolean;
    timeChanged: EventEmitter<string>;
    isMobile: any;
    touchDevice: boolean;
    showHours: boolean;
    elements: HTMLCollectionOf<Element>;
    elementNumber: any;
    dialRadius: number;
    outerRadius: number;
    innerRadius: number;
    tickRadius: number;
    diameter: number;
    isBrowser: any;
    hoursTicks: any;
    minutesTicks: any;
    selectedHours: any;
    endHours: string;
    touchSupported: any;
    mousedownEvent: any;
    mousemoveEvent: any;
    mouseupEvent: any;
    isMouseDown: boolean;
    constructor(elem: ElementRef, renderer: Renderer2, platformId: string);
    ontouchmove(event: any): void;
    onMouseMove(event: any): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngAfterContentChecked(): void;
    private rotateTimePickerArrow;
    checkDraw(): void;
    mousedown(e: any, space?: any): void;
    hideKeyboard(): void;
    openBtnClicked(): void;
    closeBtnClicked(): void;
    clearTimeInput(): void;
    setHour(hour: String): void;
    setMinute(min: String): void;
    setAmPm(ampm: String): void;
    showHoursClock(): void;
    showMinutesClock(): void;
    generateTick(): void;
    setHand(x: any, y: any, roundBy5: any): void;
    offset(obj: any): {
        left: number;
        top: number;
    };
    onChangeCb: (_: any) => void;
    onTouchedCb: () => void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
