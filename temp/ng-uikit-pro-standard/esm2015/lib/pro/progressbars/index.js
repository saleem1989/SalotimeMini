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
const MATERIAL_MODULES = [MdProgressBarModule, MdProgressSpinnerModule, ProgressbarModule];
export class PreloadersModule {
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
/**
 * @deprecated
 */
export class ProgressBars {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return { ngModule: PreloadersModule };
    }
}
ProgressBars.decorators = [
    { type: NgModule, args: [{
                imports: MATERIAL_MODULES,
                exports: MATERIAL_MODULES,
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3Byb2dyZXNzYmFycy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztNQUU3RCxnQkFBZ0IsR0FBRyxDQUFDLG1CQUFtQixFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixDQUFDO0FBWTFGLE1BQU0sT0FBTyxnQkFBZ0I7OztZQVY1QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLHdDQUF3QztvQkFDeEMsbUJBQW1CLENBQUMsT0FBTyxFQUFFO29CQUM3Qix3Q0FBd0M7b0JBQ3hDLHVCQUF1QixDQUFDLE9BQU8sRUFBRTtvQkFDakMsaUJBQWlCLENBQUMsT0FBTyxFQUFFO2lCQUM1QjtnQkFDRCxPQUFPLEVBQUUsZ0JBQWdCO2FBQzFCOzs7OztBQVFELE1BQU0sT0FBTyxZQUFZOzs7OztJQUV2QixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU8sRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztJQUN4QyxDQUFDOzs7WUFSRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLGdCQUFnQjtnQkFDekIsT0FBTyxFQUFFLGdCQUFnQjthQUMxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCB7IEJhckNvbXBvbmVudCB9IGZyb20gJy4vYmFyLmNvbXBvbmVudCc7XG5leHBvcnQgeyBQcm9ncmVzc0RpcmVjdGl2ZSB9IGZyb20gJy4vcHJvZ3Jlc3MuZGlyZWN0aXZlJztcbmV4cG9ydCB7IFByb2dyZXNzYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9ncmVzc2Jhci5jb21wb25lbnQnO1xuZXhwb3J0IHsgUHJvZ3Jlc3NiYXJNb2R1bGUgfSBmcm9tICcuL3Byb2dyZXNzYmFyLm1vZHVsZSc7XG5leHBvcnQgeyBQcm9ncmVzc2JhckNvbmZpZ0NvbXBvbmVudCB9IGZyb20gJy4vcHJvZ3Jlc3NiYXIuY29uZmlnLmNvbXBvbmVudCc7XG5leHBvcnQgeyBQcm9ncmVzc1NwaW5uZXJDb21wb25lbnQgfSBmcm9tICcuL3Byb2dyZXNzLXNwaW5uZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2dyZXNzYmFyTW9kdWxlIH0gZnJvbSAnLi9wcm9ncmVzc2Jhci5tb2R1bGUnO1xuXG5pbXBvcnQgeyBNZFByb2dyZXNzU3Bpbm5lck1vZHVsZSB9IGZyb20gJy4vcHJvZ3Jlc3Mtc3Bpbm5lci1tb2R1bGUvaW5kZXgnO1xuaW1wb3J0IHsgTWRQcm9ncmVzc0Jhck1vZHVsZSB9IGZyb20gJy4vcHJvZ3Jlc3MtYmFycy1tb2R1bGUvaW5kZXgnO1xuXG5jb25zdCBNQVRFUklBTF9NT0RVTEVTID0gW01kUHJvZ3Jlc3NCYXJNb2R1bGUsIE1kUHJvZ3Jlc3NTcGlubmVyTW9kdWxlLCBQcm9ncmVzc2Jhck1vZHVsZV07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgTWRQcm9ncmVzc0Jhck1vZHVsZS5mb3JSb290KCksXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgIE1kUHJvZ3Jlc3NTcGlubmVyTW9kdWxlLmZvclJvb3QoKSxcbiAgICBQcm9ncmVzc2Jhck1vZHVsZS5mb3JSb290KCksXG4gIF0sXG4gIGV4cG9ydHM6IE1BVEVSSUFMX01PRFVMRVMsXG59KVxuZXhwb3J0IGNsYXNzIFByZWxvYWRlcnNNb2R1bGUge31cblxuLyoqIEBkZXByZWNhdGVkICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBNQVRFUklBTF9NT0RVTEVTLFxuICBleHBvcnRzOiBNQVRFUklBTF9NT0RVTEVTLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc0JhcnMge1xuICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHsgbmdNb2R1bGU6IFByZWxvYWRlcnNNb2R1bGUgfTtcbiAgfVxufVxuIl19