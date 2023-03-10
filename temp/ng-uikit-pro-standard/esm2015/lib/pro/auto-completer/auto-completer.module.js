/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { MdbAutoCompleterComponent } from './components/mdb-auto-completer.component';
import { MdbOptionComponent } from './components/mdb-option.component';
import { MdbAutoCompleterDirective } from './directives/mdb-auto-completer.directive';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MdbAutoCompleterOptionDirective } from './directives/mdb-auto-completer-option.directive';
export class AutoCompleterModule {
}
AutoCompleterModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, HttpClientModule, FormsModule],
                declarations: [MdbAutoCompleterComponent, MdbOptionComponent, MdbAutoCompleterDirective, MdbAutoCompleterOptionDirective],
                exports: [MdbAutoCompleterComponent, MdbOptionComponent, MdbAutoCompleterDirective, MdbAutoCompleterOptionDirective],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1jb21wbGV0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9hdXRvLWNvbXBsZXRlci9hdXRvLWNvbXBsZXRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDcEYsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDcEYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsK0JBQStCLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQU1qRyxNQUFNLE9BQU8sbUJBQW1COzs7WUFML0IsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLENBQUM7Z0JBQ3RELFlBQVksRUFBRSxDQUFDLHlCQUF5QixFQUFFLGtCQUFrQixFQUFFLHlCQUF5QixFQUFFLCtCQUErQixDQUFDO2dCQUN6SCxPQUFPLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxrQkFBa0IsRUFBRSx5QkFBeUIsRUFBRSwrQkFBK0IsQ0FBQzthQUNySCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge01kYkF1dG9Db21wbGV0ZXJDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9tZGItYXV0by1jb21wbGV0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7TWRiT3B0aW9uQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvbWRiLW9wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHtNZGJBdXRvQ29tcGxldGVyRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbWRiLWF1dG8tY29tcGxldGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNZGJBdXRvQ29tcGxldGVyT3B0aW9uRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbWRiLWF1dG8tY29tcGxldGVyLW9wdGlvbi5kaXJlY3RpdmUnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSHR0cENsaWVudE1vZHVsZSwgRm9ybXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtNZGJBdXRvQ29tcGxldGVyQ29tcG9uZW50LCBNZGJPcHRpb25Db21wb25lbnQsIE1kYkF1dG9Db21wbGV0ZXJEaXJlY3RpdmUsIE1kYkF1dG9Db21wbGV0ZXJPcHRpb25EaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbTWRiQXV0b0NvbXBsZXRlckNvbXBvbmVudCwgTWRiT3B0aW9uQ29tcG9uZW50LCBNZGJBdXRvQ29tcGxldGVyRGlyZWN0aXZlLCBNZGJBdXRvQ29tcGxldGVyT3B0aW9uRGlyZWN0aXZlXSxcbn0pXG5leHBvcnQgY2xhc3MgQXV0b0NvbXBsZXRlck1vZHVsZSB7XG59XG4iXX0=