/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule, createPlatformFactory } from '@angular/core';
import { TestComponentRenderer } from '@angular/core/testing';
import { ÉµINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS as INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { DOMTestComponentRenderer } from './dom_test_component_renderer';
import { platformCoreDynamicTesting } from './platform_core_dynamic_testing';
export { ÉµDOMTestComponentRenderer, ÉµplatformCoreDynamicTesting } from './private_export_testing';
/**
 * \@publicApi
 * @type {?}
 */
export const platformBrowserDynamicTesting = createPlatformFactory(platformCoreDynamicTesting, 'browserDynamicTesting', INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 * \@publicApi
 */
export class BrowserDynamicTestingModule {
}
BrowserDynamicTestingModule.decorators = [
    { type: NgModule, args: [{
                exports: [BrowserTestingModule],
                providers: [
                    { provide: TestComponentRenderer, useClass: DOMTestComponentRenderer },
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYy90ZXN0aW5nL3NyYy90ZXN0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBK0IscUJBQXFCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFDLDRDQUE0QyxJQUFJLDJDQUEyQyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDOUksT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFFdkUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDdkUsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFFM0UsdUVBQWMsMEJBQTBCLENBQUM7Ozs7O0FBS3pDLE1BQU0sT0FBTyw2QkFBNkIsR0FBRyxxQkFBcUIsQ0FDOUQsMEJBQTBCLEVBQUUsdUJBQXVCLEVBQ25ELDJDQUEyQyxDQUFDOzs7Ozs7QUFhaEQsTUFBTSxPQUFPLDJCQUEyQjs7O1lBTnZDLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDL0IsU0FBUyxFQUFFO29CQUNULEVBQUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBQztpQkFDckU7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZSwgUGxhdGZvcm1SZWYsIFN0YXRpY1Byb3ZpZGVyLCBjcmVhdGVQbGF0Zm9ybUZhY3Rvcnl9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUZXN0Q29tcG9uZW50UmVuZGVyZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvdGVzdGluZyc7XG5pbXBvcnQge8m1SU5URVJOQUxfQlJPV1NFUl9EWU5BTUlDX1BMQVRGT1JNX1BST1ZJREVSUyBhcyBJTlRFUk5BTF9CUk9XU0VSX0RZTkFNSUNfUExBVEZPUk1fUFJPVklERVJTfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xuaW1wb3J0IHtCcm93c2VyVGVzdGluZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci90ZXN0aW5nJztcblxuaW1wb3J0IHtET01UZXN0Q29tcG9uZW50UmVuZGVyZXJ9IGZyb20gJy4vZG9tX3Rlc3RfY29tcG9uZW50X3JlbmRlcmVyJztcbmltcG9ydCB7cGxhdGZvcm1Db3JlRHluYW1pY1Rlc3Rpbmd9IGZyb20gJy4vcGxhdGZvcm1fY29yZV9keW5hbWljX3Rlc3RpbmcnO1xuXG5leHBvcnQgKiBmcm9tICcuL3ByaXZhdGVfZXhwb3J0X3Rlc3RpbmcnO1xuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtQnJvd3NlckR5bmFtaWNUZXN0aW5nID0gY3JlYXRlUGxhdGZvcm1GYWN0b3J5KFxuICAgIHBsYXRmb3JtQ29yZUR5bmFtaWNUZXN0aW5nLCAnYnJvd3NlckR5bmFtaWNUZXN0aW5nJyxcbiAgICBJTlRFUk5BTF9CUk9XU0VSX0RZTkFNSUNfUExBVEZPUk1fUFJPVklERVJTKTtcblxuLyoqXG4gKiBOZ01vZHVsZSBmb3IgdGVzdGluZy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtCcm93c2VyVGVzdGluZ01vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBUZXN0Q29tcG9uZW50UmVuZGVyZXIsIHVzZUNsYXNzOiBET01UZXN0Q29tcG9uZW50UmVuZGVyZXJ9LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJEeW5hbWljVGVzdGluZ01vZHVsZSB7XG59XG4iXX0=