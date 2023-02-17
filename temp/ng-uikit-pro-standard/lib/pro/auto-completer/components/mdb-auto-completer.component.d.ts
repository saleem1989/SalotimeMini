import { AfterContentInit, ElementRef, EventEmitter, Renderer2, QueryList, OnDestroy } from '@angular/core';
import { MdbOptionComponent } from './mdb-option.component';
import { ISelectedOption } from '../interfaces/selected-option.interface';
import { Observable } from 'rxjs';
export declare class MdbAutoCompleterComponent implements AfterContentInit, OnDestroy {
    private renderer;
    private el;
    textNoResults: string;
    clearButton: boolean;
    clearButtonTabIndex: number;
    appendToBody: boolean;
    disabled: boolean;
    select: EventEmitter<{
        text: string;
        element: any;
    }>;
    optionList: Array<any>;
    mdbOptions: QueryList<MdbOptionComponent>;
    dropdown: ElementRef;
    noResultsEl: ElementRef;
    private _destroy;
    private utils;
    parameters: {
        left: number;
        top: number;
        width: number;
        bottom: number;
        inputHeight: number;
    };
    private _isDropdownOpen;
    private _allItems;
    private _isOpen;
    private _selectedItemIndex;
    private _selectedItem;
    private _selectedItemChanged;
    private _isBrowser;
    constructor(renderer: Renderer2, el: ElementRef, platformId: string);
    windowMouseDown(event: any): void;
    private _listenToOptionClick;
    private _handleOptionClick;
    setSelectedItem(item: ISelectedOption): void;
    getSelectedItem(): ISelectedOption;
    selectedItemChanged(): Observable<any>;
    isOpen(): boolean;
    show(): void;
    hide(): void;
    isDropdownOpen(): Observable<any>;
    removeHighlight(index: number): void;
    highlightRow(index: number): void;
    navigateUsingKeyboard(event: any): void;
    moveHighlightedIntoView(type: string): void;
    updatePosition(parameters: {
        left: number;
        top: number;
        width: number;
        bottom: number;
    }): void;
    appendDropdown(parameters: {
        left: any;
        top: any;
        width: any;
        bottom: number;
    }): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
