import { ElementRef } from '@angular/core';
import { ISelectedOption } from '../interfaces/selected-option.interface';
import { Subject, Observable } from 'rxjs';
export declare class MdbOptionComponent {
    el: ElementRef;
    value: string;
    clicked: boolean;
    selectedItem: ISelectedOption;
    clickSource: Subject<MdbOptionComponent>;
    click$: Observable<MdbOptionComponent>;
    constructor(el: ElementRef);
    onClick(): void;
    readonly label: any;
}
