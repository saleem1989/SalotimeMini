/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
export { BarComponent } from './bar.component';
export { ProgressDirective } from './progress.directive';
export { ProgressbarComponent } from './progressbar.component';
export { ProgressbarModule } from './progressbar.module';
export { ProgressbarConfigComponent } from './progressbar.config.component';
export { ProgressSpinnerComponent } from './progress-spinner.component';
import { ProgressbarModule } from './progressbar.module';
import { MdProgressSpinnerModule } from './progress-spinner-module/index';
import { MdProgressBarModule } from './progress-bars-module/index';
/** @type {?} */
var MATERIAL_MODULES = [MdProgressBarModule, MdProgressSpinnerModule, ProgressbarModule];
var PreloadersModule = /** @class */ (function () {
    function PreloadersModule() {
    }
    PreloadersModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        // tslint:disable-next-line: deprecation
                        MdProgressBarModule.forRoot(),
                        // tslint:disable-next-line: deprecation
                        MdProgressSpinnerModule.forRoot(),
                        ProgressbarModule.forRoot(),
                    ],
                    exports: MATERIAL_MODULES,
                },] }
    ];
    return PreloadersModule;
}());
export { PreloadersModule };
/**
 * @deprecated
 */
var ProgressBars = /** @class */ (function () {
    function ProgressBars() {
    }
    /** @deprecated */
    /**
     * @deprecated
     * @return {?}
     */
    ProgressBars.forRoot = /**
     * @deprecated
     * @return {?}
     */
    function () {
        return { ngModule: PreloadersModule };
    };
    ProgressBars.decorators = [
        { type: NgModule, args: [{
                    imports: MATERIAL_MODULES,
                    exports: MATERIAL_MODULES,
                },] }
    ];
    return ProgressBars;
}());
export { ProgressBars };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3Byb2dyZXNzYmFycy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztJQUU3RCxnQkFBZ0IsR0FBRyxDQUFDLG1CQUFtQixFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixDQUFDO0FBRTFGO0lBQUE7SUFVK0IsQ0FBQzs7Z0JBVi9CLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1Asd0NBQXdDO3dCQUN4QyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUU7d0JBQzdCLHdDQUF3Qzt3QkFDeEMsdUJBQXVCLENBQUMsT0FBTyxFQUFFO3dCQUNqQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUU7cUJBQzVCO29CQUNELE9BQU8sRUFBRSxnQkFBZ0I7aUJBQzFCOztJQUM4Qix1QkFBQztDQUFBLEFBVmhDLElBVWdDO1NBQW5CLGdCQUFnQjs7OztBQUc3QjtJQUFBO0lBU0EsQ0FBQztJQUpDLGtCQUFrQjs7Ozs7SUFDWCxvQkFBTzs7OztJQUFkO1FBQ0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3hDLENBQUM7O2dCQVJGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixPQUFPLEVBQUUsZ0JBQWdCO2lCQUMxQjs7SUFNRCxtQkFBQztDQUFBLEFBVEQsSUFTQztTQUxZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgeyBCYXJDb21wb25lbnQgfSBmcm9tICcuL2Jhci5jb21wb25lbnQnO1xuZXhwb3J0IHsgUHJvZ3Jlc3NEaXJlY3RpdmUgfSBmcm9tICcuL3Byb2dyZXNzLmRpcmVjdGl2ZSc7XG5leHBvcnQgeyBQcm9ncmVzc2JhckNvbXBvbmVudCB9IGZyb20gJy4vcHJvZ3Jlc3NiYXIuY29tcG9uZW50JztcbmV4cG9ydCB7IFByb2dyZXNzYmFyTW9kdWxlIH0gZnJvbSAnLi9wcm9ncmVzc2Jhci5tb2R1bGUnO1xuZXhwb3J0IHsgUHJvZ3Jlc3NiYXJDb25maWdDb21wb25lbnQgfSBmcm9tICcuL3Byb2dyZXNzYmFyLmNvbmZpZy5jb21wb25lbnQnO1xuZXhwb3J0IHsgUHJvZ3Jlc3NTcGlubmVyQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9ncmVzcy1zcGlubmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9ncmVzc2Jhck1vZHVsZSB9IGZyb20gJy4vcHJvZ3Jlc3NiYXIubW9kdWxlJztcblxuaW1wb3J0IHsgTWRQcm9ncmVzc1NwaW5uZXJNb2R1bGUgfSBmcm9tICcuL3Byb2dyZXNzLXNwaW5uZXItbW9kdWxlL2luZGV4JztcbmltcG9ydCB7IE1kUHJvZ3Jlc3NCYXJNb2R1bGUgfSBmcm9tICcuL3Byb2dyZXNzLWJhcnMtbW9kdWxlL2luZGV4JztcblxuY29uc3QgTUFURVJJQUxfTU9EVUxFUyA9IFtNZFByb2dyZXNzQmFyTW9kdWxlLCBNZFByb2dyZXNzU3Bpbm5lck1vZHVsZSwgUHJvZ3Jlc3NiYXJNb2R1bGVdO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgIE1kUHJvZ3Jlc3NCYXJNb2R1bGUuZm9yUm9vdCgpLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICBNZFByb2dyZXNzU3Bpbm5lck1vZHVsZS5mb3JSb290KCksXG4gICAgUHJvZ3Jlc3NiYXJNb2R1bGUuZm9yUm9vdCgpLFxuICBdLFxuICBleHBvcnRzOiBNQVRFUklBTF9NT0RVTEVTLFxufSlcbmV4cG9ydCBjbGFzcyBQcmVsb2FkZXJzTW9kdWxlIHt9XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogTUFURVJJQUxfTU9EVUxFUyxcbiAgZXhwb3J0czogTUFURVJJQUxfTU9EVUxFUyxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXJzIHtcbiAgLyoqIEBkZXByZWNhdGVkICovXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7IG5nTW9kdWxlOiBQcmVsb2FkZXJzTW9kdWxlIH07XG4gIH1cbn1cbiJdfQ==