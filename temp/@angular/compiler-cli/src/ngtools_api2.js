/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngtools_api2", ["require", "exports", "typescript", "@angular/compiler-cli/src/perform_compile", "@angular/compiler-cli/src/transformers/compiler_host", "@angular/compiler-cli/src/transformers/program"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ts = require("typescript");
    var perform_compile_1 = require("@angular/compiler-cli/src/perform_compile");
    var compiler_host_1 = require("@angular/compiler-cli/src/transformers/compiler_host");
    var program_1 = require("@angular/compiler-cli/src/transformers/program");
    var EmitFlags;
    (function (EmitFlags) {
        EmitFlags[EmitFlags["DTS"] = 1] = "DTS";
        EmitFlags[EmitFlags["JS"] = 2] = "JS";
        EmitFlags[EmitFlags["Metadata"] = 4] = "Metadata";
        EmitFlags[EmitFlags["I18nBundle"] = 8] = "I18nBundle";
        EmitFlags[EmitFlags["Codegen"] = 16] = "Codegen";
        EmitFlags[EmitFlags["Default"] = 19] = "Default";
        EmitFlags[EmitFlags["All"] = 31] = "All";
    })(EmitFlags = exports.EmitFlags || (exports.EmitFlags = {}));
    // Wrapper for createProgram.
    function createProgram(_a) {
        var rootNames = _a.rootNames, options = _a.options, host = _a.host, oldProgram = _a.oldProgram;
        return program_1.createProgram({ rootNames: rootNames, options: options, host: host, oldProgram: oldProgram });
    }
    exports.createProgram = createProgram;
    // Wrapper for createCompilerHost.
    function createCompilerHost(_a) {
        var options = _a.options, _b = _a.tsHost, tsHost = _b === void 0 ? ts.createCompilerHost(options, true) : _b;
        return compiler_host_1.createCompilerHost({ options: options, tsHost: tsHost });
    }
    exports.createCompilerHost = createCompilerHost;
    function formatDiagnostics(diags) {
        return perform_compile_1.formatDiagnostics(diags);
    }
    exports.formatDiagnostics = formatDiagnostics;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd0b29sc19hcGkyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL3NyYy9uZ3Rvb2xzX2FwaTIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFrQkgsK0JBQWlDO0lBRWpDLDZFQUE2RTtJQUU3RSxzRkFBc0Y7SUFDdEYsMEVBQTBFO0lBNEMxRSxJQUFZLFNBU1g7SUFURCxXQUFZLFNBQVM7UUFDbkIsdUNBQVksQ0FBQTtRQUNaLHFDQUFXLENBQUE7UUFDWCxpREFBaUIsQ0FBQTtRQUNqQixxREFBbUIsQ0FBQTtRQUNuQixnREFBZ0IsQ0FBQTtRQUVoQixnREFBNEIsQ0FBQTtRQUM1Qix3Q0FBZ0QsQ0FBQTtJQUNsRCxDQUFDLEVBVFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFTcEI7SUFnREQsNkJBQTZCO0lBQzdCLFNBQWdCLGFBQWEsQ0FDekIsRUFDNkY7WUFENUYsd0JBQVMsRUFBRSxvQkFBTyxFQUFFLGNBQUksRUFBRSwwQkFBVTtRQUd2QyxPQUFPLHVCQUFpQixDQUFDLEVBQUMsU0FBUyxXQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsVUFBVSxFQUFFLFVBQWlCLEVBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFMRCxzQ0FLQztJQUVELGtDQUFrQztJQUNsQyxTQUFnQixrQkFBa0IsQ0FDOUIsRUFDd0Q7WUFEdkQsb0JBQU8sRUFBRSxjQUE2QyxFQUE3QyxrRUFBNkM7UUFFekQsT0FBTyxrQ0FBa0IsQ0FBQyxFQUFDLE9BQU8sU0FBQSxFQUFFLE1BQU0sUUFBQSxFQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBSkQsZ0RBSUM7SUFJRCxTQUFnQixpQkFBaUIsQ0FBQyxLQUFrQjtRQUNsRCxPQUFPLG1DQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFGRCw4Q0FFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBUaGlzIGlzIGEgcHJpdmF0ZSBBUEkgZm9yIEBuZ3Rvb2xzL3dlYnBhY2suIFRoaXMgQVBJIHNob3VsZCBiZSBzdGFibGUgZm9yIE5HIDUuXG4gKlxuICogSXQgY29udGFpbnMgY29waWVzIG9mIHRoZSBpbnRlcmZhY2VzIG5lZWRlZCBhbmQgd3JhcHBlciBmdW5jdGlvbnMgdG8gZW5zdXJlIHRoYXRcbiAqIHRoZXkgYXJlIG5vdCBicm9rZW4gYWNjaWRlbnRhbGx5LlxuICpcbiAqIE9uY2UgdGhlIG5nYyBhcGkgaXMgcHVibGljIGFuZCBzdGFibGUsIHRoaXMgY2FuIGJlIHJlbW92ZWQuXG4gKi9cblxuLyoqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBDaGFuZ2VzIHRvIHRoaXMgZmlsZSBuZWVkIHRvIGJlIGFwcHJvdmVkIGJ5IHRoZSBBbmd1bGFyIENMSSB0ZWFtLiAqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKi9cblxuaW1wb3J0IHtQYXJzZVNvdXJjZVNwYW59IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge2Zvcm1hdERpYWdub3N0aWNzIGFzIGZvcm1hdERpYWdub3N0aWNzT3JpZ30gZnJvbSAnLi9wZXJmb3JtX2NvbXBpbGUnO1xuaW1wb3J0IHtQcm9ncmFtIGFzIFByb2dyYW1PcmlnfSBmcm9tICcuL3RyYW5zZm9ybWVycy9hcGknO1xuaW1wb3J0IHtjcmVhdGVDb21waWxlckhvc3QgYXMgY3JlYXRlQ29tcGlsZXJPcmlnfSBmcm9tICcuL3RyYW5zZm9ybWVycy9jb21waWxlcl9ob3N0JztcbmltcG9ydCB7Y3JlYXRlUHJvZ3JhbSBhcyBjcmVhdGVQcm9ncmFtT3JpZ30gZnJvbSAnLi90cmFuc2Zvcm1lcnMvcHJvZ3JhbSc7XG5cblxuLy8gSW50ZXJmYWNlcyBmcm9tIC4vdHJhbnNmb3JtZXJzL2FwaTtcbmV4cG9ydCBpbnRlcmZhY2UgRGlhZ25vc3RpYyB7XG4gIG1lc3NhZ2VUZXh0OiBzdHJpbmc7XG4gIHNwYW4/OiBQYXJzZVNvdXJjZVNwYW47XG4gIGNhdGVnb3J5OiB0cy5EaWFnbm9zdGljQ2F0ZWdvcnk7XG4gIGNvZGU6IG51bWJlcjtcbiAgc291cmNlOiAnYW5ndWxhcic7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGlsZXJPcHRpb25zIGV4dGVuZHMgdHMuQ29tcGlsZXJPcHRpb25zIHtcbiAgYmFzZVBhdGg/OiBzdHJpbmc7XG4gIHNraXBNZXRhZGF0YUVtaXQ/OiBib29sZWFuO1xuICBzdHJpY3RNZXRhZGF0YUVtaXQ/OiBib29sZWFuO1xuICBza2lwVGVtcGxhdGVDb2RlZ2VuPzogYm9vbGVhbjtcbiAgZmxhdE1vZHVsZU91dEZpbGU/OiBzdHJpbmc7XG4gIGZsYXRNb2R1bGVJZD86IHN0cmluZztcbiAgZ2VuZXJhdGVDb2RlRm9yTGlicmFyaWVzPzogYm9vbGVhbjtcbiAgYW5ub3RhdGVGb3JDbG9zdXJlQ29tcGlsZXI/OiBib29sZWFuO1xuICBhbm5vdGF0aW9uc0FzPzogJ2RlY29yYXRvcnMnfCdzdGF0aWMgZmllbGRzJztcbiAgdHJhY2U/OiBib29sZWFuO1xuICBkaXNhYmxlRXhwcmVzc2lvbkxvd2VyaW5nPzogYm9vbGVhbjtcbiAgaTE4bk91dExvY2FsZT86IHN0cmluZztcbiAgaTE4bk91dEZvcm1hdD86IHN0cmluZztcbiAgaTE4bk91dEZpbGU/OiBzdHJpbmc7XG4gIGkxOG5JbkZvcm1hdD86IHN0cmluZztcbiAgaTE4bkluTG9jYWxlPzogc3RyaW5nO1xuICBpMThuSW5GaWxlPzogc3RyaW5nO1xuICBpMThuSW5NaXNzaW5nVHJhbnNsYXRpb25zPzogJ2Vycm9yJ3wnd2FybmluZyd8J2lnbm9yZSc7XG4gIHByZXNlcnZlV2hpdGVzcGFjZXM/OiBib29sZWFuO1xuICBkaXNhYmxlVHlwZVNjcmlwdFZlcnNpb25DaGVjaz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGlsZXJIb3N0IGV4dGVuZHMgdHMuQ29tcGlsZXJIb3N0IHtcbiAgbW9kdWxlTmFtZVRvRmlsZU5hbWU/KG1vZHVsZU5hbWU6IHN0cmluZywgY29udGFpbmluZ0ZpbGU/OiBzdHJpbmcpOiBzdHJpbmd8bnVsbDtcbiAgZmlsZU5hbWVUb01vZHVsZU5hbWU/KGltcG9ydGVkRmlsZVBhdGg6IHN0cmluZywgY29udGFpbmluZ0ZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmc7XG4gIHJlc291cmNlTmFtZVRvRmlsZU5hbWU/KHJlc291cmNlTmFtZTogc3RyaW5nLCBjb250YWluaW5nRmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZ3xudWxsO1xuICB0b1N1bW1hcnlGaWxlTmFtZT8oZmlsZU5hbWU6IHN0cmluZywgcmVmZXJyaW5nU3JjRmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZztcbiAgZnJvbVN1bW1hcnlGaWxlTmFtZT8oZmlsZU5hbWU6IHN0cmluZywgcmVmZXJyaW5nTGliRmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZztcbiAgcmVhZFJlc291cmNlPyhmaWxlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+fHN0cmluZztcbn1cblxuZXhwb3J0IGVudW0gRW1pdEZsYWdzIHtcbiAgRFRTID0gMSA8PCAwLFxuICBKUyA9IDEgPDwgMSxcbiAgTWV0YWRhdGEgPSAxIDw8IDIsXG4gIEkxOG5CdW5kbGUgPSAxIDw8IDMsXG4gIENvZGVnZW4gPSAxIDw8IDQsXG5cbiAgRGVmYXVsdCA9IERUUyB8IEpTIHwgQ29kZWdlbixcbiAgQWxsID0gRFRTIHwgSlMgfCBNZXRhZGF0YSB8IEkxOG5CdW5kbGUgfCBDb2RlZ2VuLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVRyYW5zZm9ybWVycyB7XG4gIGJlZm9yZVRzPzogdHMuVHJhbnNmb3JtZXJGYWN0b3J5PHRzLlNvdXJjZUZpbGU+W107XG4gIGFmdGVyVHM/OiB0cy5UcmFuc2Zvcm1lckZhY3Rvcnk8dHMuU291cmNlRmlsZT5bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUc0VtaXRBcmd1bWVudHMge1xuICBwcm9ncmFtOiB0cy5Qcm9ncmFtO1xuICBob3N0OiBDb21waWxlckhvc3Q7XG4gIG9wdGlvbnM6IENvbXBpbGVyT3B0aW9ucztcbiAgdGFyZ2V0U291cmNlRmlsZT86IHRzLlNvdXJjZUZpbGU7XG4gIHdyaXRlRmlsZT86IHRzLldyaXRlRmlsZUNhbGxiYWNrO1xuICBjYW5jZWxsYXRpb25Ub2tlbj86IHRzLkNhbmNlbGxhdGlvblRva2VuO1xuICBlbWl0T25seUR0c0ZpbGVzPzogYm9vbGVhbjtcbiAgY3VzdG9tVHJhbnNmb3JtZXJzPzogdHMuQ3VzdG9tVHJhbnNmb3JtZXJzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRzRW1pdENhbGxiYWNrIHsgKGFyZ3M6IFRzRW1pdEFyZ3VtZW50cyk6IHRzLkVtaXRSZXN1bHQ7IH1cblxuZXhwb3J0IGludGVyZmFjZSBMYXp5Um91dGUge1xuICBtb2R1bGU6IHtuYW1lOiBzdHJpbmcsIGZpbGVQYXRoOiBzdHJpbmd9O1xuICByb3V0ZTogc3RyaW5nO1xuICByZWZlcmVuY2VkTW9kdWxlOiB7bmFtZTogc3RyaW5nLCBmaWxlUGF0aDogc3RyaW5nfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmFtIHtcbiAgZ2V0VHNQcm9ncmFtKCk6IHRzLlByb2dyYW07XG4gIGdldFRzT3B0aW9uRGlhZ25vc3RpY3MoY2FuY2VsbGF0aW9uVG9rZW4/OiB0cy5DYW5jZWxsYXRpb25Ub2tlbik6IFJlYWRvbmx5QXJyYXk8dHMuRGlhZ25vc3RpYz47XG4gIGdldE5nT3B0aW9uRGlhZ25vc3RpY3MoY2FuY2VsbGF0aW9uVG9rZW4/OiB0cy5DYW5jZWxsYXRpb25Ub2tlbik6XG4gICAgICBSZWFkb25seUFycmF5PHRzLkRpYWdub3N0aWN8RGlhZ25vc3RpYz47XG4gIGdldFRzU3ludGFjdGljRGlhZ25vc3RpY3Moc291cmNlRmlsZT86IHRzLlNvdXJjZUZpbGUsIGNhbmNlbGxhdGlvblRva2VuPzogdHMuQ2FuY2VsbGF0aW9uVG9rZW4pOlxuICAgICAgUmVhZG9ubHlBcnJheTx0cy5EaWFnbm9zdGljPjtcbiAgZ2V0TmdTdHJ1Y3R1cmFsRGlhZ25vc3RpY3MoY2FuY2VsbGF0aW9uVG9rZW4/OiB0cy5DYW5jZWxsYXRpb25Ub2tlbik6IFJlYWRvbmx5QXJyYXk8RGlhZ25vc3RpYz47XG4gIGdldFRzU2VtYW50aWNEaWFnbm9zdGljcyhzb3VyY2VGaWxlPzogdHMuU291cmNlRmlsZSwgY2FuY2VsbGF0aW9uVG9rZW4/OiB0cy5DYW5jZWxsYXRpb25Ub2tlbik6XG4gICAgICBSZWFkb25seUFycmF5PHRzLkRpYWdub3N0aWM+O1xuICBnZXROZ1NlbWFudGljRGlhZ25vc3RpY3MoZmlsZU5hbWU/OiBzdHJpbmcsIGNhbmNlbGxhdGlvblRva2VuPzogdHMuQ2FuY2VsbGF0aW9uVG9rZW4pOlxuICAgICAgUmVhZG9ubHlBcnJheTx0cy5EaWFnbm9zdGljfERpYWdub3N0aWM+O1xuICBsb2FkTmdTdHJ1Y3R1cmVBc3luYygpOiBQcm9taXNlPHZvaWQ+O1xuICBsaXN0TGF6eVJvdXRlcyhlbnRyeVJvdXRlPzogc3RyaW5nKTogTGF6eVJvdXRlW107XG4gIGVtaXQoe2VtaXRGbGFncywgY2FuY2VsbGF0aW9uVG9rZW4sIGN1c3RvbVRyYW5zZm9ybWVycywgZW1pdENhbGxiYWNrfToge1xuICAgIGVtaXRGbGFncz86IEVtaXRGbGFncyxcbiAgICBjYW5jZWxsYXRpb25Ub2tlbj86IHRzLkNhbmNlbGxhdGlvblRva2VuLFxuICAgIGN1c3RvbVRyYW5zZm9ybWVycz86IEN1c3RvbVRyYW5zZm9ybWVycyxcbiAgICBlbWl0Q2FsbGJhY2s/OiBUc0VtaXRDYWxsYmFja1xuICB9KTogdHMuRW1pdFJlc3VsdDtcbn1cblxuLy8gV3JhcHBlciBmb3IgY3JlYXRlUHJvZ3JhbS5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm9ncmFtKFxuICAgIHtyb290TmFtZXMsIG9wdGlvbnMsIGhvc3QsIG9sZFByb2dyYW19OlxuICAgICAgICB7cm9vdE5hbWVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ29tcGlsZXJPcHRpb25zLCBob3N0OiBDb21waWxlckhvc3QsIG9sZFByb2dyYW0/OiBQcm9ncmFtfSk6XG4gICAgUHJvZ3JhbSB7XG4gIHJldHVybiBjcmVhdGVQcm9ncmFtT3JpZyh7cm9vdE5hbWVzLCBvcHRpb25zLCBob3N0LCBvbGRQcm9ncmFtOiBvbGRQcm9ncmFtIGFzIGFueX0pO1xufVxuXG4vLyBXcmFwcGVyIGZvciBjcmVhdGVDb21waWxlckhvc3QuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29tcGlsZXJIb3N0KFxuICAgIHtvcHRpb25zLCB0c0hvc3QgPSB0cy5jcmVhdGVDb21waWxlckhvc3Qob3B0aW9ucywgdHJ1ZSl9OlxuICAgICAgICB7b3B0aW9uczogQ29tcGlsZXJPcHRpb25zLCB0c0hvc3Q/OiB0cy5Db21waWxlckhvc3R9KTogQ29tcGlsZXJIb3N0IHtcbiAgcmV0dXJuIGNyZWF0ZUNvbXBpbGVyT3JpZyh7b3B0aW9ucywgdHNIb3N0fSk7XG59XG5cbi8vIFdyYXBwZXIgZm9yIGZvcm1hdERpYWdub3N0aWNzLlxuZXhwb3J0IHR5cGUgRGlhZ25vc3RpY3MgPSBSZWFkb25seUFycmF5PHRzLkRpYWdub3N0aWN8RGlhZ25vc3RpYz47XG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGlhZ25vc3RpY3MoZGlhZ3M6IERpYWdub3N0aWNzKTogc3RyaW5nIHtcbiAgcmV0dXJuIGZvcm1hdERpYWdub3N0aWNzT3JpZyhkaWFncyk7XG59XG4iXX0=