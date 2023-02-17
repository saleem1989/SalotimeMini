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
        define("@angular/compiler-cli/src/transformers/api", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_ERROR_CODE = 100;
    exports.UNKNOWN_ERROR_CODE = 500;
    exports.SOURCE = 'angular';
    function isTsDiagnostic(diagnostic) {
        return diagnostic != null && diagnostic.source !== 'angular';
    }
    exports.isTsDiagnostic = isTsDiagnostic;
    function isNgDiagnostic(diagnostic) {
        return diagnostic != null && diagnostic.source === 'angular';
    }
    exports.isNgDiagnostic = isNgDiagnostic;
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL3NyYy90cmFuc2Zvcm1lcnMvYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7O0lBS1UsUUFBQSxrQkFBa0IsR0FBRyxHQUFHLENBQUM7SUFDekIsUUFBQSxrQkFBa0IsR0FBRyxHQUFHLENBQUM7SUFDekIsUUFBQSxNQUFNLEdBQUcsU0FBc0IsQ0FBQztJQWtCN0MsU0FBZ0IsY0FBYyxDQUFDLFVBQWU7UUFDNUMsT0FBTyxVQUFVLElBQUksSUFBSSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDO0lBQy9ELENBQUM7SUFGRCx3Q0FFQztJQUVELFNBQWdCLGNBQWMsQ0FBQyxVQUFlO1FBQzVDLE9BQU8sVUFBVSxJQUFJLElBQUksSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQztJQUMvRCxDQUFDO0lBRkQsd0NBRUM7SUF3UEQsSUFBWSxTQVNYO0lBVEQsV0FBWSxTQUFTO1FBQ25CLHVDQUFZLENBQUE7UUFDWixxQ0FBVyxDQUFBO1FBQ1gsaURBQWlCLENBQUE7UUFDakIscURBQW1CLENBQUE7UUFDbkIsZ0RBQWdCLENBQUE7UUFFaEIsZ0RBQTRCLENBQUE7UUFDNUIsd0NBQWdELENBQUE7SUFDbEQsQ0FBQyxFQVRXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBU3BCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0dlbmVyYXRlZEZpbGUsIFBhcnNlU291cmNlU3BhbiwgUG9zaXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9FUlJPUl9DT0RFID0gMTAwO1xuZXhwb3J0IGNvbnN0IFVOS05PV05fRVJST1JfQ09ERSA9IDUwMDtcbmV4cG9ydCBjb25zdCBTT1VSQ0UgPSAnYW5ndWxhcicgYXMgJ2FuZ3VsYXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIERpYWdub3N0aWNNZXNzYWdlQ2hhaW4ge1xuICBtZXNzYWdlVGV4dDogc3RyaW5nO1xuICBwb3NpdGlvbj86IFBvc2l0aW9uO1xuICBuZXh0PzogRGlhZ25vc3RpY01lc3NhZ2VDaGFpbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEaWFnbm9zdGljIHtcbiAgbWVzc2FnZVRleHQ6IHN0cmluZztcbiAgc3Bhbj86IFBhcnNlU291cmNlU3BhbjtcbiAgcG9zaXRpb24/OiBQb3NpdGlvbjtcbiAgY2hhaW4/OiBEaWFnbm9zdGljTWVzc2FnZUNoYWluO1xuICBjYXRlZ29yeTogdHMuRGlhZ25vc3RpY0NhdGVnb3J5O1xuICBjb2RlOiBudW1iZXI7XG4gIHNvdXJjZTogJ2FuZ3VsYXInO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUc0RpYWdub3N0aWMoZGlhZ25vc3RpYzogYW55KTogZGlhZ25vc3RpYyBpcyB0cy5EaWFnbm9zdGljIHtcbiAgcmV0dXJuIGRpYWdub3N0aWMgIT0gbnVsbCAmJiBkaWFnbm9zdGljLnNvdXJjZSAhPT0gJ2FuZ3VsYXInO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOZ0RpYWdub3N0aWMoZGlhZ25vc3RpYzogYW55KTogZGlhZ25vc3RpYyBpcyBEaWFnbm9zdGljIHtcbiAgcmV0dXJuIGRpYWdub3N0aWMgIT0gbnVsbCAmJiBkaWFnbm9zdGljLnNvdXJjZSA9PT0gJ2FuZ3VsYXInO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBpbGVyT3B0aW9ucyBleHRlbmRzIHRzLkNvbXBpbGVyT3B0aW9ucyB7XG4gIC8vIE5PVEU6IFRoZXNlIGNvbW1lbnRzIGFuZCBhaW8vY29udGVudC9ndWlkZXMvYW90LWNvbXBpbGVyLm1kIHNob3VsZCBiZSBrZXB0IGluIHN5bmMuXG5cbiAgLy8gV3JpdGUgc3RhdGlzdGljcyBhYm91dCBjb21waWxhdGlvbiAoZS5nLiB0b3RhbCB0aW1lLCAuLi4pXG4gIC8vIE5vdGU6IHRoaXMgaXMgdGhlIC0tZGlhZ25vc3RpY3MgY29tbWFuZCBsaW5lIG9wdGlvbiBmcm9tIFRTICh3aGljaCBpcyBAaW50ZXJuYWxcbiAgLy8gb24gdHMuQ29tcGlsZXJPcHRpb25zIGludGVyZmFjZSkuXG4gIGRpYWdub3N0aWNzPzogYm9vbGVhbjtcblxuICAvLyBBYnNvbHV0ZSBwYXRoIHRvIGEgZGlyZWN0b3J5IHdoZXJlIGdlbmVyYXRlZCBmaWxlIHN0cnVjdHVyZSBpcyB3cml0dGVuLlxuICAvLyBJZiB1bnNwZWNpZmllZCwgZ2VuZXJhdGVkIGZpbGVzIHdpbGwgYmUgd3JpdHRlbiBhbG9uZ3NpZGUgc291cmNlcy5cbiAgLy8gQGRlcHJlY2F0ZWQgLSBubyBlZmZlY3RcbiAgZ2VuRGlyPzogc3RyaW5nO1xuXG4gIC8vIFBhdGggdG8gdGhlIGRpcmVjdG9yeSBjb250YWluaW5nIHRoZSB0c2NvbmZpZy5qc29uIGZpbGUuXG4gIGJhc2VQYXRoPzogc3RyaW5nO1xuXG4gIC8vIERvbid0IHByb2R1Y2UgLm1ldGFkYXRhLmpzb24gZmlsZXMgKHRoZXkgZG9uJ3Qgd29yayBmb3IgYnVuZGxlZCBlbWl0IHdpdGggLS1vdXQpXG4gIHNraXBNZXRhZGF0YUVtaXQ/OiBib29sZWFuO1xuXG4gIC8vIFByb2R1Y2UgYW4gZXJyb3IgaWYgdGhlIG1ldGFkYXRhIHdyaXR0ZW4gZm9yIGEgY2xhc3Mgd291bGQgcHJvZHVjZSBhbiBlcnJvciBpZiB1c2VkLlxuICBzdHJpY3RNZXRhZGF0YUVtaXQ/OiBib29sZWFuO1xuXG4gIC8vIERvbid0IHByb2R1Y2UgLm5nZmFjdG9yeS5qcyBvciAubmdzdHlsZS5qcyBmaWxlc1xuICBza2lwVGVtcGxhdGVDb2RlZ2VuPzogYm9vbGVhbjtcblxuICAvLyBBbHdheXMgcmVwb3J0IGVycm9ycyB3aGVuIHRoZSB0eXBlIG9mIGEgcGFyYW1ldGVyIHN1cHBsaWVkIHdob3NlIGluamVjdGlvbiB0eXBlIGNhbm5vdFxuICAvLyBiZSBkZXRlcm1pbmVkLiBXaGVuIHRoaXMgdmFsdWUgb3B0aW9uIGlzIG5vdCBwcm92aWRlZCBvciBpcyBgZmFsc2VgLCBjb25zdHJ1Y3RvclxuICAvLyBwYXJhbWV0ZXJzIG9mIGNsYXNzZXMgbWFya2VkIHdpdGggYEBJbmplY3RhYmxlYCB3aG9zZSB0eXBlIGNhbm5vdCBiZSByZXNvbHZlZCB3aWxsXG4gIC8vIHByb2R1Y2UgYSB3YXJuaW5nLiBXaXRoIHRoaXMgb3B0aW9uIGB0cnVlYCwgdGhleSBwcm9kdWNlIGFuIGVycm9yLiBXaGVuIHRoaXMgb3B0aW9uIGlzXG4gIC8vIG5vdCBwcm92aWRlZCBpcyB0cmVhdGVkIGFzIGlmIGl0IHdlcmUgYGZhbHNlYC4gSW4gQW5ndWxhciA2LjAsIGlmIHRoaXMgb3B0aW9uIGlzIG5vdFxuICAvLyBwcm92aWRlZCwgaXQgd2lsbCBiZSB0cmVhdGVkIGFzIGB0cnVlYC5cbiAgc3RyaWN0SW5qZWN0aW9uUGFyYW1ldGVycz86IGJvb2xlYW47XG5cbiAgLy8gV2hldGhlciB0byBnZW5lcmF0ZSBhIGZsYXQgbW9kdWxlIGluZGV4IG9mIHRoZSBnaXZlbiBuYW1lIGFuZCB0aGUgY29ycmVzcG9uZGluZ1xuICAvLyBmbGF0IG1vZHVsZSBtZXRhZGF0YS4gVGhpcyBvcHRpb24gaXMgaW50ZW5kZWQgdG8gYmUgdXNlZCB3aGVuIGNyZWF0aW5nIGZsYXRcbiAgLy8gbW9kdWxlcyBzaW1pbGFyIHRvIGhvdyBgQGFuZ3VsYXIvY29yZWAgYW5kIGBAYW5ndWxhci9jb21tb25gIGFyZSBwYWNrYWdlZC5cbiAgLy8gV2hlbiB0aGlzIG9wdGlvbiBpcyB1c2VkIHRoZSBgcGFja2FnZS5qc29uYCBmb3IgdGhlIGxpYnJhcnkgc2hvdWxkIHJlZmVycmVkIHRvIHRoZVxuICAvLyBnZW5lcmF0ZWQgZmxhdCBtb2R1bGUgaW5kZXggaW5zdGVhZCBvZiB0aGUgbGlicmFyeSBpbmRleCBmaWxlLiBXaGVuIHVzaW5nIHRoaXNcbiAgLy8gb3B0aW9uIG9ubHkgb25lIC5tZXRhZGF0YS5qc29uIGZpbGUgaXMgcHJvZHVjZWQgdGhhdCBjb250YWlucyBhbGwgdGhlIG1ldGFkYXRhXG4gIC8vIG5lY2Vzc2FyeSBmb3Igc3ltYm9scyBleHBvcnRlZCBmcm9tIHRoZSBsaWJyYXJ5IGluZGV4LlxuICAvLyBJbiB0aGUgZ2VuZXJhdGVkIC5uZ2ZhY3RvcnkudHMgZmlsZXMgZmxhdCBtb2R1bGUgaW5kZXggaXMgdXNlZCB0byBpbXBvcnQgc3ltYm9sc1xuICAvLyBpbmNsdWRlcyBib3RoIHRoZSBwdWJsaWMgQVBJIGZyb20gdGhlIGxpYnJhcnkgaW5kZXggYXMgd2VsbCBhcyBzaHJvd2RlZCBpbnRlcm5hbFxuICAvLyBzeW1ib2xzLlxuICAvLyBCeSBkZWZhdWx0IHRoZSAudHMgZmlsZSBzdXBwbGllZCBpbiB0aGUgYGZpbGVzYCBmaWxlcyBmaWVsZCBpcyBhc3N1bWVkIHRvIGJlXG4gIC8vIGxpYnJhcnkgaW5kZXguIElmIG1vcmUgdGhhbiBvbmUgaXMgc3BlY2lmaWVkLCB1c2VzIGBsaWJyYXJ5SW5kZXhgIHRvIHNlbGVjdCB0aGVcbiAgLy8gZmlsZSB0byB1c2UuIElmIG1vcmUgdGhhbiBvbiAudHMgZmlsZSBpcyBzdXBwbGllZCBhbmQgbm8gYGxpYnJhcnlJbmRleGAgaXMgc3VwcGxpZWRcbiAgLy8gYW4gZXJyb3IgaXMgcHJvZHVjZWQuXG4gIC8vIEEgZmxhdCBtb2R1bGUgaW5kZXggLmQudHMgYW5kIC5qcyB3aWxsIGJlIGNyZWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gYGZsYXRNb2R1bGVPdXRGaWxlYFxuICAvLyBuYW1lIGluIHRoZSBzYW1lIGxvY2F0aW9uIGFzIHRoZSBsaWJyYXJ5IGluZGV4IC5kLnRzIGZpbGUgaXMgZW1pdHRlZC5cbiAgLy8gRm9yIGV4YW1wbGUsIGlmIGEgbGlicmFyeSB1c2VzIGBwdWJsaWNfYXBpLnRzYCBmaWxlIGFzIHRoZSBsaWJyYXJ5IGluZGV4IG9mIHRoZVxuICAvLyBtb2R1bGUgdGhlIGB0c2NvbmZpZy5qc29uYCBgZmlsZXNgIGZpZWxkIHdvdWxkIGJlIGBbXCJwdWJsaWNfYXBpLnRzXCJdYC4gVGhlXG4gIC8vIGBmbGF0TW9kdWxlT3V0RmlsZWAgb3B0aW9ucyBjb3VsZCB0aGVuIGJlIHNldCB0bywgZm9yIGV4YW1wbGUgYFwiaW5kZXguanNcImAsIHdoaWNoXG4gIC8vIHByb2R1Y2VzIGBpbmRleC5kLnRzYCBhbmQgIGBpbmRleC5tZXRhZGF0YS5qc29uYCBmaWxlcy4gVGhlIGxpYnJhcnknc1xuICAvLyBgcGFja2FnZS5qc29uYCdzIGBtb2R1bGVgIGZpZWxkIHdvdWxkIGJlIGBcImluZGV4LmpzXCJgIGFuZCB0aGUgYHR5cGluZ3NgIGZpZWxkIHdvdWxkXG4gIC8vIGJlIGBcImluZGV4LmQudHNcImAuXG4gIGZsYXRNb2R1bGVPdXRGaWxlPzogc3RyaW5nO1xuXG4gIC8vIFByZWZlcnJlZCBtb2R1bGUgaWQgdG8gdXNlIGZvciBpbXBvcnRpbmcgZmxhdCBtb2R1bGUuIFJlZmVyZW5jZXMgZ2VuZXJhdGVkIGJ5IGBuZ2NgXG4gIC8vIHdpbGwgdXNlIHRoaXMgbW9kdWxlIG5hbWUgd2hlbiBpbXBvcnRpbmcgc3ltYm9scyBmcm9tIHRoZSBmbGF0IG1vZHVsZS4gVGhpcyBpcyBvbmx5XG4gIC8vIG1lYW5pbmdmdWwgd2hlbiBgZmxhdE1vZHVsZU91dEZpbGVgIGlzIGFsc28gc3VwcGxpZWQuIEl0IGlzIG90aGVyd2lzZSBpZ25vcmVkLlxuICBmbGF0TW9kdWxlSWQ/OiBzdHJpbmc7XG5cbiAgLy8gQSBwcmVmaXggdG8gaW5zZXJ0IGluIGdlbmVyYXRlZCBwcml2YXRlIHN5bWJvbHMsIGUuZy4gZm9yIFwibXlfcHJlZml4X1wiIHdlXG4gIC8vIHdvdWxkIGdlbmVyYXRlIHByaXZhdGUgc3ltYm9scyBuYW1lZCBsaWtlIGDJtW15X3ByZWZpeF9hYC5cbiAgZmxhdE1vZHVsZVByaXZhdGVTeW1ib2xQcmVmaXg/OiBzdHJpbmc7XG5cbiAgLy8gV2hldGhlciB0byBnZW5lcmF0ZSBjb2RlIGZvciBsaWJyYXJ5IGNvZGUuXG4gIC8vIElmIHRydWUsIHByb2R1Y2UgLm5nZmFjdG9yeS50cyBhbmQgLm5nc3R5bGUudHMgZmlsZXMgZm9yIC5kLnRzIGlucHV0cy5cbiAgLy8gRGVmYXVsdCBpcyB0cnVlLlxuICBnZW5lcmF0ZUNvZGVGb3JMaWJyYXJpZXM/OiBib29sZWFuO1xuXG4gIC8vIFdoZXRoZXIgdG8gZW5hYmxlIGFsbCB0eXBlIGNoZWNrcyBmb3IgdGVtcGxhdGVzLlxuICAvLyBUaGlzIHdpbGwgYmUgdHJ1ZSBiZSBkZWZhdWx0IGluIEFuZ3VsYXIgNi5cbiAgZnVsbFRlbXBsYXRlVHlwZUNoZWNrPzogYm9vbGVhbjtcblxuICAvLyBXaGV0aGVyIHRvIHVzZSB0aGUgQ29tcGlsZXJIb3N0J3MgZmlsZU5hbWVUb01vZHVsZU5hbWUgdXRpbGl0eSAoaWYgYXZhaWxhYmxlKSB0byBnZW5lcmF0ZVxuICAvLyBpbXBvcnQgbW9kdWxlIHNwZWNpZmllcnMuIFRoaXMgaXMgZmFsc2UgYnkgZGVmYXVsdCwgYW5kIGV4aXN0cyB0byBzdXBwb3J0IHJ1bm5pbmcgbmd0c2NcbiAgLy8gd2l0aGluIEdvb2dsZS4gVGhpcyBvcHRpb24gaXMgaW50ZXJuYWwgYW5kIGlzIHVzZWQgYnkgdGhlIG5nX21vZHVsZS5iemwgcnVsZSB0byBzd2l0Y2hcbiAgLy8gYmVoYXZpb3IgYmV0d2VlbiBCYXplbCBhbmQgQmxhemUuXG4gIF91c2VIb3N0Rm9ySW1wb3J0R2VuZXJhdGlvbj86IGJvb2xlYW47XG5cbiAgLy8gSW5zZXJ0IEpTRG9jIHR5cGUgYW5ub3RhdGlvbnMgbmVlZGVkIGJ5IENsb3N1cmUgQ29tcGlsZXJcbiAgYW5ub3RhdGVGb3JDbG9zdXJlQ29tcGlsZXI/OiBib29sZWFuO1xuXG4gIC8vIE1vZGlmeSBob3cgYW5ndWxhciBhbm5vdGF0aW9ucyBhcmUgZW1pdHRlZCB0byBpbXByb3ZlIHRyZWUtc2hha2luZy5cbiAgLy8gRGVmYXVsdCBpcyBzdGF0aWMgZmllbGRzLlxuICAvLyBkZWNvcmF0b3JzOiBMZWF2ZSB0aGUgRGVjb3JhdG9ycyBpbi1wbGFjZS4gVGhpcyBtYWtlcyBjb21waWxhdGlvbiBmYXN0ZXIuXG4gIC8vICAgICAgICAgICAgIFR5cGVTY3JpcHQgd2lsbCBlbWl0IGNhbGxzIHRvIHRoZSBfX2RlY29yYXRlIGhlbHBlci5cbiAgLy8gICAgICAgICAgICAgYC0tZW1pdERlY29yYXRvck1ldGFkYXRhYCBjYW4gYmUgdXNlZCBmb3IgcnVudGltZSByZWZsZWN0aW9uLlxuICAvLyAgICAgICAgICAgICBIb3dldmVyLCB0aGUgcmVzdWx0aW5nIGNvZGUgd2lsbCBub3QgcHJvcGVybHkgdHJlZS1zaGFrZS5cbiAgLy8gc3RhdGljIGZpZWxkczogUmVwbGFjZSBkZWNvcmF0b3JzIHdpdGggYSBzdGF0aWMgZmllbGQgaW4gdGhlIGNsYXNzLlxuICAvLyAgICAgICAgICAgICAgICBBbGxvd3MgYWR2YW5jZWQgdHJlZS1zaGFrZXJzIGxpa2UgQ2xvc3VyZSBDb21waWxlciB0byByZW1vdmVcbiAgLy8gICAgICAgICAgICAgICAgdW51c2VkIGNsYXNzZXMuXG4gIGFubm90YXRpb25zQXM/OiAnZGVjb3JhdG9ycyd8J3N0YXRpYyBmaWVsZHMnO1xuXG4gIC8vIFByaW50IGV4dHJhIGluZm9ybWF0aW9uIHdoaWxlIHJ1bm5pbmcgdGhlIGNvbXBpbGVyXG4gIHRyYWNlPzogYm9vbGVhbjtcblxuICAvLyBXaGV0aGVyIHRvIGVuYWJsZSBsb3dlcmluZyBleHByZXNzaW9ucyBsYW1iZGFzIGFuZCBleHByZXNzaW9ucyBpbiBhIHJlZmVyZW5jZSB2YWx1ZVxuICAvLyBwb3NpdGlvbi5cbiAgZGlzYWJsZUV4cHJlc3Npb25Mb3dlcmluZz86IGJvb2xlYW47XG5cbiAgLy8gRGlzYWJsZSBUeXBlU2NyaXB0IFZlcnNpb24gQ2hlY2suXG4gIGRpc2FibGVUeXBlU2NyaXB0VmVyc2lvbkNoZWNrPzogYm9vbGVhbjtcblxuICAvLyBMb2NhbGUgb2YgdGhlIGFwcGxpY2F0aW9uXG4gIGkxOG5PdXRMb2NhbGU/OiBzdHJpbmc7XG4gIC8vIEV4cG9ydCBmb3JtYXQgKHhsZiwgeGxmMiBvciB4bWIpXG4gIGkxOG5PdXRGb3JtYXQ/OiBzdHJpbmc7XG4gIC8vIFBhdGggdG8gdGhlIGV4dHJhY3RlZCBtZXNzYWdlIGZpbGVcbiAgaTE4bk91dEZpbGU/OiBzdHJpbmc7XG5cbiAgLy8gSW1wb3J0IGZvcm1hdCBpZiBkaWZmZXJlbnQgZnJvbSBgaTE4bkZvcm1hdGBcbiAgaTE4bkluRm9ybWF0Pzogc3RyaW5nO1xuICAvLyBMb2NhbGUgb2YgdGhlIGltcG9ydGVkIHRyYW5zbGF0aW9uc1xuICBpMThuSW5Mb2NhbGU/OiBzdHJpbmc7XG4gIC8vIFBhdGggdG8gdGhlIHRyYW5zbGF0aW9uIGZpbGVcbiAgaTE4bkluRmlsZT86IHN0cmluZztcbiAgLy8gSG93IHRvIGhhbmRsZSBtaXNzaW5nIG1lc3NhZ2VzXG4gIGkxOG5Jbk1pc3NpbmdUcmFuc2xhdGlvbnM/OiAnZXJyb3InfCd3YXJuaW5nJ3wnaWdub3JlJztcbiAgLy8gV2hldGhlciB0cmFuc2xhdGlvbiB2YXJpYWJsZSBuYW1lIHNob3VsZCBjb250YWluIGV4dGVybmFsIG1lc3NhZ2UgaWRcbiAgLy8gKHVzZWQgYnkgQ2xvc3VyZSBDb21waWxlcidzIG91dHB1dCBvZiBgZ29vZy5nZXRNc2dgIGZvciB0cmFuc2l0aW9uIHBlcmlvZClcbiAgaTE4blVzZUV4dGVybmFsSWRzPzogYm9vbGVhbjtcblxuICAvLyBXaGV0aGVyIHRvIHJlbW92ZSBibGFuayB0ZXh0IG5vZGVzIGZyb20gY29tcGlsZWQgdGVtcGxhdGVzLiBJdCBpcyBgZmFsc2VgIGJ5IGRlZmF1bHQgc3RhcnRpbmdcbiAgLy8gZnJvbSBBbmd1bGFyIDYuXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM/OiBib29sZWFuO1xuXG4gIC8qKiBnZW5lcmF0ZSBhbGwgcG9zc2libGUgZ2VuZXJhdGVkIGZpbGVzICAqL1xuICBhbGxvd0VtcHR5Q29kZWdlbkZpbGVzPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBnZW5lcmF0ZSAubmdzdW1tYXJ5LnRzIGZpbGVzIHRoYXQgYWxsb3cgdG8gdXNlIEFPVGVkIGFydGlmYWN0c1xuICAgKiBpbiBKSVQgbW9kZS4gVGhpcyBpcyBvZmYgYnkgZGVmYXVsdC5cbiAgICovXG4gIGVuYWJsZVN1bW1hcmllc0ZvckppdD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gcmVwbGFjZSB0aGUgYHRlbXBsYXRlVXJsYCBhbmQgYHN0eWxlVXJsc2AgcHJvcGVydHkgaW4gYWxsXG4gICAqIEBDb21wb25lbnQgZGVjb3JhdG9ycyB3aXRoIGlubGluZWQgY29udGVudHMgaW4gYHRlbXBsYXRlYCBhbmQgYHN0eWxlc2BcbiAgICogcHJvcGVydGllcy5cbiAgICogV2hlbiBlbmFibGVkLCB0aGUgLmpzIG91dHB1dCBvZiBuZ2Mgd2lsbCBoYXZlIG5vIGxhenktbG9hZGVkIGB0ZW1wbGF0ZVVybGBcbiAgICogb3IgYHN0eWxlVXJsYHMuIE5vdGUgdGhhdCB0aGlzIHJlcXVpcmVzIHRoYXQgcmVzb3VyY2VzIGJlIGF2YWlsYWJsZSB0b1xuICAgKiBsb2FkIHN0YXRpY2FsbHkgYXQgY29tcGlsZS10aW1lLlxuICAgKi9cbiAgZW5hYmxlUmVzb3VyY2VJbmxpbmluZz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRlbGxzIHRoZSBjb21waWxlciB0byBnZW5lcmF0ZSBkZWZpbml0aW9ucyB1c2luZyB0aGUgUmVuZGVyMyBzdHlsZSBjb2RlIGdlbmVyYXRpb24uXG4gICAqIFRoaXMgb3B0aW9uIGRlZmF1bHRzIHRvIGBmYWxzZWAuXG4gICAqXG4gICAqIE5vdCBhbGwgZmVhdHVyZXMgYXJlIHN1cHBvcnRlZCB3aXRoIHRoaXMgb3B0aW9uIGVuYWJsZWQuIEl0IGlzIG9ubHkgc3VwcG9ydGVkXG4gICAqIGZvciBleHBlcmltZW50YXRpb24gYW5kIHRlc3Rpbmcgb2YgUmVuZGVyMyBzdHlsZSBjb2RlIGdlbmVyYXRpb24uXG4gICAqXG4gICAqIEFjY2VwdGFibGUgdmFsdWVzIGFyZSBhcyBmb2xsb3dzOlxuICAgKlxuICAgKiBgZmFsc2VgIC0gcnVuIG5nYyBub3JtYWxseVxuICAgKiBgdHJ1ZWAgLSBydW4gdGhlIG5ndHNjIGNvbXBpbGVyIGluc3RlYWQgb2YgdGhlIG5vcm1hbCBuZ2MgY29tcGlsZXJcbiAgICogYG5ndHNjYCAtIGFsaWFzIGZvciBgdHJ1ZWBcbiAgICogYHRzY2AgLSBiZWhhdmUgbGlrZSBwbGFpbiB0c2MgYXMgbXVjaCBhcyBwb3NzaWJsZSAodXNlZCBmb3IgdGVzdGluZyBKSVQgY29kZSlcbiAgICpcbiAgICogQHB1YmxpY0FwaVxuICAgKi9cbiAgZW5hYmxlSXZ5PzogYm9vbGVhbnwnbmd0c2MnfCd0c2MnO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY29sbGVjdEFsbEVycm9ycz86IGJvb2xlYW47XG5cbiAgLyoqIEFuIG9wdGlvbiB0byBlbmFibGUgbmd0c2MncyBpbnRlcm5hbCBwZXJmb3JtYW5jZSB0cmFjaW5nLlxuICAgKlxuICAgKiBUaGlzIHNob3VsZCBiZSBhIHBhdGggdG8gYSBKU09OIGZpbGUgd2hlcmUgdHJhY2UgaW5mb3JtYXRpb24gd2lsbCBiZSB3cml0dGVuLiBBbiBvcHRpb25hbCAndHM6J1xuICAgKiBwcmVmaXggd2lsbCBjYXVzZSB0aGUgdHJhY2UgdG8gYmUgd3JpdHRlbiB2aWEgdGhlIFRTIGhvc3QgaW5zdGVhZCBvZiBkaXJlY3RseSB0byB0aGUgZmlsZXN5c3RlbVxuICAgKiAobm90IGFsbCBob3N0cyBzdXBwb3J0IHRoaXMgbW9kZSBvZiBvcGVyYXRpb24pLlxuICAgKlxuICAgKiBUaGlzIGlzIGN1cnJlbnRseSBub3QgZXhwb3NlZCB0byB1c2VycyBhcyB0aGUgdHJhY2UgZm9ybWF0IGlzIHN0aWxsIHVuc3RhYmxlLlxuICAgKlxuICAgKiBAaW50ZXJuYWwgKi9cbiAgdHJhY2VQZXJmb3JtYW5jZT86IHN0cmluZztcblxuICAvKipcbiAgICogV2hldGhlciBOR0Mgc2hvdWxkIGdlbmVyYXRlIHJlLWV4cG9ydHMgZm9yIGV4dGVybmFsIHN5bWJvbHMgd2hpY2ggYXJlIHJlZmVyZW5jZWRcbiAgICogaW4gQW5ndWxhciBtZXRhZGF0YSAoZS5nLiBAQ29tcG9uZW50LCBASW5qZWN0LCBAVmlld0NoaWxkKS4gVGhpcyBjYW4gYmUgZW5hYmxlZCBpblxuICAgKiBvcmRlciB0byBhdm9pZCBkeW5hbWljYWxseSBnZW5lcmF0ZWQgbW9kdWxlIGRlcGVuZGVuY2llcyB3aGljaCBjYW4gYnJlYWsgc3RyaWN0XG4gICAqIGRlcGVuZGVuY3kgZW5mb3JjZW1lbnRzLiBUaGlzIGlzIG5vdCBlbmFibGVkIGJ5IGRlZmF1bHQuXG4gICAqIFJlYWQgbW9yZSBhYm91dCB0aGlzIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzI1NjQ0LlxuICAgKi9cbiAgY3JlYXRlRXh0ZXJuYWxTeW1ib2xGYWN0b3J5UmVleHBvcnRzPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogVHVybiBvbiB0ZW1wbGF0ZSB0eXBlLWNoZWNraW5nIGluIHRoZSBJdnkgY29tcGlsZXIuXG4gICAqXG4gICAqIFRoaXMgaXMgYW4gaW50ZXJuYWwgZmxhZyBiZWluZyB1c2VkIHRvIHJvbGwgb3V0IHRlbXBsYXRlIHR5cGUtY2hlY2tpbmcgaW4gbmd0c2MuIFR1cm5pbmcgaXQgb25cbiAgICogYnkgZGVmYXVsdCBiZWZvcmUgaXQncyByZWFkeSBtaWdodCBicmVhayBvdGhlciB1c2VycyBhdHRlbXB0aW5nIHRvIHRlc3QgdGhlIG5ldyBjb21waWxlcidzXG4gICAqIGJlaGF2aW9yLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGl2eVRlbXBsYXRlVHlwZUNoZWNrPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21waWxlckhvc3QgZXh0ZW5kcyB0cy5Db21waWxlckhvc3Qge1xuICAvKipcbiAgICogQ29udmVydHMgYSBtb2R1bGUgbmFtZSB0aGF0IGlzIHVzZWQgaW4gYW4gYGltcG9ydGAgdG8gYSBmaWxlIHBhdGguXG4gICAqIEkuZS4gYHBhdGgvdG8vY29udGFpbmluZ0ZpbGUudHNgIGNvbnRhaW5pbmcgYGltcG9ydCB7Li4ufSBmcm9tICdtb2R1bGUtbmFtZSdgLlxuICAgKi9cbiAgbW9kdWxlTmFtZVRvRmlsZU5hbWU/KG1vZHVsZU5hbWU6IHN0cmluZywgY29udGFpbmluZ0ZpbGU6IHN0cmluZyk6IHN0cmluZ3xudWxsO1xuICAvKipcbiAgICogQ29udmVydHMgYSBmaWxlIHBhdGggdG8gYSBtb2R1bGUgbmFtZSB0aGF0IGNhbiBiZSB1c2VkIGFzIGFuIGBpbXBvcnQgLi4uYFxuICAgKiBJLmUuIGBwYXRoL3RvL2ltcG9ydGVkRmlsZS50c2Agc2hvdWxkIGJlIGltcG9ydGVkIGJ5IGBwYXRoL3RvL2NvbnRhaW5pbmdGaWxlLnRzYC5cbiAgICovXG4gIGZpbGVOYW1lVG9Nb2R1bGVOYW1lPyhpbXBvcnRlZEZpbGVQYXRoOiBzdHJpbmcsIGNvbnRhaW5pbmdGaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nO1xuICAvKipcbiAgICogQ29udmVydHMgYSBmaWxlIHBhdGggZm9yIGEgcmVzb3VyY2UgdGhhdCBpcyB1c2VkIGluIGEgc291cmNlIGZpbGUgb3IgYW5vdGhlciByZXNvdXJjZVxuICAgKiBpbnRvIGEgZmlsZXBhdGguXG4gICAqL1xuICByZXNvdXJjZU5hbWVUb0ZpbGVOYW1lPyhyZXNvdXJjZU5hbWU6IHN0cmluZywgY29udGFpbmluZ0ZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmd8bnVsbDtcbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgZmlsZSBuYW1lIGludG8gYSByZXByZXNlbnRhdGlvbiB0aGF0IHNob3VsZCBiZSBzdG9yZWQgaW4gYSBzdW1tYXJ5IGZpbGUuXG4gICAqIFRoaXMgaGFzIHRvIGluY2x1ZGUgY2hhbmdpbmcgdGhlIHN1ZmZpeCBhcyB3ZWxsLlxuICAgKiBFLmcuXG4gICAqIGBzb21lX2ZpbGUudHNgIC0+IGBzb21lX2ZpbGUuZC50c2BcbiAgICpcbiAgICogQHBhcmFtIHJlZmVycmluZ1NyY0ZpbGVOYW1lIHRoZSBzb3VyZSBmaWxlIHRoYXQgcmVmZXJzIHRvIGZpbGVOYW1lXG4gICAqL1xuICB0b1N1bW1hcnlGaWxlTmFtZT8oZmlsZU5hbWU6IHN0cmluZywgcmVmZXJyaW5nU3JjRmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZztcbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgZmlsZU5hbWUgdGhhdCB3YXMgcHJvY2Vzc2VkIGJ5IGB0b1N1bW1hcnlGaWxlTmFtZWAgYmFjayBpbnRvIGEgcmVhbCBmaWxlTmFtZVxuICAgKiBnaXZlbiB0aGUgZmlsZU5hbWUgb2YgdGhlIGxpYnJhcnkgdGhhdCBpcyByZWZlcnJpZyB0byBpdC5cbiAgICovXG4gIGZyb21TdW1tYXJ5RmlsZU5hbWU/KGZpbGVOYW1lOiBzdHJpbmcsIHJlZmVycmluZ0xpYkZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBMb2FkIGEgcmVmZXJlbmNlZCByZXNvdXJjZSBlaXRoZXIgc3RhdGljYWxseSBvciBhc3luY2hyb25vdXNseS4gSWYgdGhlIGhvc3QgcmV0dXJucyBhXG4gICAqIGBQcm9taXNlPHN0cmluZz5gIGl0IGlzIGFzc3VtZWQgdGhlIHVzZXIgb2YgdGhlIGNvcnJlc3BvbmRpbmcgYFByb2dyYW1gIHdpbGwgY2FsbFxuICAgKiBgbG9hZE5nU3RydWN0dXJlQXN5bmMoKWAuIFJldHVybmluZyAgYFByb21pc2U8c3RyaW5nPmAgb3V0c2lkZSBgbG9hZE5nU3RydWN0dXJlQXN5bmMoKWAgd2lsbFxuICAgKiBjYXVzZSBhIGRpYWdub3N0aWNzIGRpYWdub3N0aWMgZXJyb3Igb3IgYW4gZXhjZXB0aW9uIHRvIGJlIHRocm93bi5cbiAgICovXG4gIHJlYWRSZXNvdXJjZT8oZmlsZU5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPnxzdHJpbmc7XG4gIC8qKlxuICAgKiBQcm9kdWNlIGFuIEFNRCBtb2R1bGUgbmFtZSBmb3IgdGhlIHNvdXJjZSBmaWxlLiBVc2VkIGluIEJhemVsLlxuICAgKlxuICAgKiBBbiBBTUQgbW9kdWxlIGNhbiBoYXZlIGFuIGFyYml0cmFyeSBuYW1lLCBzbyB0aGF0IGl0IGlzIHJlcXVpcmUnZCBieSBuYW1lXG4gICAqIHJhdGhlciB0aGFuIGJ5IHBhdGguIFNlZSBodHRwOi8vcmVxdWlyZWpzLm9yZy9kb2NzL3doeWFtZC5odG1sI25hbWVkbW9kdWxlc1xuICAgKi9cbiAgYW1kTW9kdWxlTmFtZT8oc2Y6IHRzLlNvdXJjZUZpbGUpOiBzdHJpbmd8dW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZW51bSBFbWl0RmxhZ3Mge1xuICBEVFMgPSAxIDw8IDAsXG4gIEpTID0gMSA8PCAxLFxuICBNZXRhZGF0YSA9IDEgPDwgMixcbiAgSTE4bkJ1bmRsZSA9IDEgPDwgMyxcbiAgQ29kZWdlbiA9IDEgPDwgNCxcblxuICBEZWZhdWx0ID0gRFRTIHwgSlMgfCBDb2RlZ2VuLFxuICBBbGwgPSBEVFMgfCBKUyB8IE1ldGFkYXRhIHwgSTE4bkJ1bmRsZSB8IENvZGVnZW4sXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tVHJhbnNmb3JtZXJzIHtcbiAgYmVmb3JlVHM/OiB0cy5UcmFuc2Zvcm1lckZhY3Rvcnk8dHMuU291cmNlRmlsZT5bXTtcbiAgYWZ0ZXJUcz86IHRzLlRyYW5zZm9ybWVyRmFjdG9yeTx0cy5Tb3VyY2VGaWxlPltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRzRW1pdEFyZ3VtZW50cyB7XG4gIHByb2dyYW06IHRzLlByb2dyYW07XG4gIGhvc3Q6IENvbXBpbGVySG9zdDtcbiAgb3B0aW9uczogQ29tcGlsZXJPcHRpb25zO1xuICB0YXJnZXRTb3VyY2VGaWxlPzogdHMuU291cmNlRmlsZTtcbiAgd3JpdGVGaWxlPzogdHMuV3JpdGVGaWxlQ2FsbGJhY2s7XG4gIGNhbmNlbGxhdGlvblRva2VuPzogdHMuQ2FuY2VsbGF0aW9uVG9rZW47XG4gIGVtaXRPbmx5RHRzRmlsZXM/OiBib29sZWFuO1xuICBjdXN0b21UcmFuc2Zvcm1lcnM/OiB0cy5DdXN0b21UcmFuc2Zvcm1lcnM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHNFbWl0Q2FsbGJhY2sgeyAoYXJnczogVHNFbWl0QXJndW1lbnRzKTogdHMuRW1pdFJlc3VsdDsgfVxuZXhwb3J0IGludGVyZmFjZSBUc01lcmdlRW1pdFJlc3VsdHNDYWxsYmFjayB7IChyZXN1bHRzOiB0cy5FbWl0UmVzdWx0W10pOiB0cy5FbWl0UmVzdWx0OyB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlicmFyeVN1bW1hcnkge1xuICBmaWxlTmFtZTogc3RyaW5nO1xuICB0ZXh0OiBzdHJpbmc7XG4gIHNvdXJjZUZpbGU/OiB0cy5Tb3VyY2VGaWxlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExhenlSb3V0ZSB7XG4gIHJvdXRlOiBzdHJpbmc7XG4gIG1vZHVsZToge25hbWU6IHN0cmluZywgZmlsZVBhdGg6IHN0cmluZ307XG4gIHJlZmVyZW5jZWRNb2R1bGU6IHtuYW1lOiBzdHJpbmcsIGZpbGVQYXRoOiBzdHJpbmd9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyYW0ge1xuICAvKipcbiAgICogUmV0cmlldmUgdGhlIFR5cGVTY3JpcHQgcHJvZ3JhbSB1c2VkIHRvIHByb2R1Y2Ugc2VtYW50aWMgZGlhZ25vc3RpY3MgYW5kIGVtaXQgdGhlIHNvdXJjZXMuXG4gICAqXG4gICAqIEFuZ3VsYXIgc3RydWN0dXJhbCBpbmZvcm1hdGlvbiBpcyByZXF1aXJlZCB0byBwcm9kdWNlIHRoZSBwcm9ncmFtLlxuICAgKi9cbiAgZ2V0VHNQcm9ncmFtKCk6IHRzLlByb2dyYW07XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIG9wdGlvbnMgZGlhZ25vc3RpY3MgZm9yIHRoZSBUeXBlU2NyaXB0IG9wdGlvbnMgdXNlZCB0byBjcmVhdGUgdGhlIHByb2dyYW0uIFRoaXMgaXNcbiAgICogZmFzdGVyIHRoYW4gY2FsbGluZyBgZ2V0VHNQcm9ncmFtKCkuZ2V0T3B0aW9uc0RpYWdub3N0aWNzKClgIHNpbmNlIGl0IGRvZXMgbm90IG5lZWQgdG9cbiAgICogY29sbGVjdCBBbmd1bGFyIHN0cnVjdHVyYWwgaW5mb3JtYXRpb24gdG8gcHJvZHVjZSB0aGUgZXJyb3JzLlxuICAgKi9cbiAgZ2V0VHNPcHRpb25EaWFnbm9zdGljcyhjYW5jZWxsYXRpb25Ub2tlbj86IHRzLkNhbmNlbGxhdGlvblRva2VuKTogUmVhZG9ubHlBcnJheTx0cy5EaWFnbm9zdGljPjtcblxuICAvKipcbiAgICogUmV0cmlldmUgb3B0aW9ucyBkaWFnbm9zdGljcyBmb3IgdGhlIEFuZ3VsYXIgb3B0aW9ucyB1c2VkIHRvIGNyZWF0ZSB0aGUgcHJvZ3JhbS5cbiAgICovXG4gIGdldE5nT3B0aW9uRGlhZ25vc3RpY3MoY2FuY2VsbGF0aW9uVG9rZW4/OiB0cy5DYW5jZWxsYXRpb25Ub2tlbik6XG4gICAgICBSZWFkb25seUFycmF5PHRzLkRpYWdub3N0aWN8RGlhZ25vc3RpYz47XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIHRoZSBzeW50YXggZGlhZ25vc3RpY3MgZnJvbSBUeXBlU2NyaXB0LiBUaGlzIGlzIGZhc3RlciB0aGFuIGNhbGxpbmdcbiAgICogYGdldFRzUHJvZ3JhbSgpLmdldFN5bnRhY3RpY0RpYWdub3N0aWNzKClgIHNpbmNlIGl0IGRvZXMgbm90IG5lZWQgdG8gY29sbGVjdCBBbmd1bGFyIHN0cnVjdHVyYWxcbiAgICogaW5mb3JtYXRpb24gdG8gcHJvZHVjZSB0aGUgZXJyb3JzLlxuICAgKi9cbiAgZ2V0VHNTeW50YWN0aWNEaWFnbm9zdGljcyhzb3VyY2VGaWxlPzogdHMuU291cmNlRmlsZSwgY2FuY2VsbGF0aW9uVG9rZW4/OiB0cy5DYW5jZWxsYXRpb25Ub2tlbik6XG4gICAgICBSZWFkb25seUFycmF5PHRzLkRpYWdub3N0aWM+O1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB0aGUgZGlhZ25vc3RpY3MgZm9yIHRoZSBzdHJ1Y3R1cmUgb2YgYW4gQW5ndWxhciBhcHBsaWNhdGlvbiBpcyBjb3JyZWN0bHkgZm9ybWVkLlxuICAgKiBUaGlzIGluY2x1ZGVzIHZhbGlkYXRpbmcgQW5ndWxhciBhbm5vdGF0aW9ucyBhbmQgdGhlIHN5bnRheCBvZiByZWZlcmVuY2VkIGFuZCBpbWJlZGRlZCBIVE1MXG4gICAqIGFuZCBDU1MuXG4gICAqXG4gICAqIE5vdGUgaXQgaXMgaW1wb3J0YW50IHRvIGRpc3BsYXlpbmcgVHlwZVNjcmlwdCBzZW1hbnRpYyBkaWFnbm9zdGljcyBhbG9uZyB3aXRoIEFuZ3VsYXJcbiAgICogc3RydWN0dXJhbCBkaWFnbm9zdGljcyBhcyBhbiBlcnJvciBpbiB0aGUgcHJvZ3JhbSBzdHJ1Y3R1cmUgbWlnaHQgY2F1c2UgZXJyb3JzIGRldGVjdGVkIGluXG4gICAqIHNlbWFudGljIGFuYWx5c2lzIGFuZCBhIHNlbWFudGljIGVycm9yIG1pZ2h0IGNhdXNlIGVycm9ycyBpbiBzcGVjaWZ5aW5nIHRoZSBwcm9ncmFtIHN0cnVjdHVyZS5cbiAgICpcbiAgICogQW5ndWxhciBzdHJ1Y3R1cmFsIGluZm9ybWF0aW9uIGlzIHJlcXVpcmVkIHRvIHByb2R1Y2UgdGhlc2UgZGlhZ25vc3RpY3MuXG4gICAqL1xuICBnZXROZ1N0cnVjdHVyYWxEaWFnbm9zdGljcyhjYW5jZWxsYXRpb25Ub2tlbj86IHRzLkNhbmNlbGxhdGlvblRva2VuKTogUmVhZG9ubHlBcnJheTxEaWFnbm9zdGljPjtcblxuICAvKipcbiAgICogUmV0cmlldmUgdGhlIHNlbWFudGljIGRpYWdub3N0aWNzIGZyb20gVHlwZVNjcmlwdC4gVGhpcyBpcyBlcXVpdmFsZW50IHRvIGNhbGxpbmdcbiAgICogYGdldFRzUHJvZ3JhbSgpLmdldFNlbWFudGljRGlhZ25vc3RpY3MoKWAgZGlyZWN0bHkgYW5kIGlzIGluY2x1ZGVkIGZvciBjb21wbGV0ZW5lc3MuXG4gICAqL1xuICBnZXRUc1NlbWFudGljRGlhZ25vc3RpY3Moc291cmNlRmlsZT86IHRzLlNvdXJjZUZpbGUsIGNhbmNlbGxhdGlvblRva2VuPzogdHMuQ2FuY2VsbGF0aW9uVG9rZW4pOlxuICAgICAgUmVhZG9ubHlBcnJheTx0cy5EaWFnbm9zdGljPjtcblxuICAvKipcbiAgICogUmV0cmlldmUgdGhlIEFuZ3VsYXIgc2VtYW50aWMgZGlhZ25vc3RpY3MuXG4gICAqXG4gICAqIEFuZ3VsYXIgc3RydWN0dXJhbCBpbmZvcm1hdGlvbiBpcyByZXF1aXJlZCB0byBwcm9kdWNlIHRoZXNlIGRpYWdub3N0aWNzLlxuICAgKi9cbiAgZ2V0TmdTZW1hbnRpY0RpYWdub3N0aWNzKGZpbGVOYW1lPzogc3RyaW5nLCBjYW5jZWxsYXRpb25Ub2tlbj86IHRzLkNhbmNlbGxhdGlvblRva2VuKTpcbiAgICAgIFJlYWRvbmx5QXJyYXk8dHMuRGlhZ25vc3RpY3xEaWFnbm9zdGljPjtcblxuICAvKipcbiAgICogTG9hZCBBbmd1bGFyIHN0cnVjdHVyYWwgaW5mb3JtYXRpb24gYXN5bmNocm9ub3VzbHkuIElmIHRoaXMgbWV0aG9kIGlzIG5vdCBjYWxsZWQgdGhlbiB0aGVcbiAgICogQW5ndWxhciBzdHJ1Y3R1cmFsIGluZm9ybWF0aW9uLCBpbmNsdWRpbmcgcmVmZXJlbmNlZCBIVE1MIGFuZCBDU1MgZmlsZXMsIGFyZSBsb2FkZWRcbiAgICogc3luY2hyb25vdXNseS4gSWYgdGhlIHN1cHBsaWVkIEFuZ3VsYXIgY29tcGlsZXIgaG9zdCByZXR1cm5zIGEgcHJvbWlzZSBmcm9tIGBsb2FkUmVzb3VyY2UoKWBcbiAgICogd2lsbCBwcm9kdWNlIGEgZGlhZ25vc3RpYyBlcnJvciBtZXNzYWdlIG9yLCBgZ2V0VHNQcm9ncmFtKClgIG9yIGBlbWl0YCB0byB0aHJvdy5cbiAgICovXG4gIGxvYWROZ1N0cnVjdHVyZUFzeW5jKCk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGxhenkgcm91dGVzIGluIHRoZSBwcm9ncmFtLlxuICAgKiBAcGFyYW0gZW50cnlSb3V0ZSBBIHJlZmVyZW5jZSB0byBhbiBOZ01vZHVsZSBsaWtlIGBzb21lTW9kdWxlI25hbWVgLiBJZiBnaXZlbixcbiAgICogICAgICAgICAgICAgIHdpbGwgcmVjdXJzaXZlbHkgYW5hbHl6ZSByb3V0ZXMgc3RhcnRpbmcgZnJvbSB0aGlzIHN5bWJvbCBvbmx5LlxuICAgKiAgICAgICAgICAgICAgT3RoZXJ3aXNlIHdpbGwgbGlzdCBhbGwgcm91dGVzIGZvciBhbGwgTmdNb2R1bGVzIGluIHRoZSBwcm9ncmFtL1xuICAgKi9cbiAgbGlzdExhenlSb3V0ZXMoZW50cnlSb3V0ZT86IHN0cmluZyk6IExhenlSb3V0ZVtdO1xuXG4gIC8qKlxuICAgKiBFbWl0IHRoZSBmaWxlcyByZXF1ZXN0ZWQgYnkgZW1pdEZsYWdzIGltcGxpZWQgYnkgdGhlIHByb2dyYW0uXG4gICAqXG4gICAqIEFuZ3VsYXIgc3RydWN0dXJhbCBpbmZvcm1hdGlvbiBpcyByZXF1aXJlZCB0byBlbWl0IGZpbGVzLlxuICAgKi9cbiAgZW1pdCh7ZW1pdEZsYWdzLCBjYW5jZWxsYXRpb25Ub2tlbiwgY3VzdG9tVHJhbnNmb3JtZXJzLCBlbWl0Q2FsbGJhY2ssXG4gICAgICAgIG1lcmdlRW1pdFJlc3VsdHNDYWxsYmFja30/OiB7XG4gICAgZW1pdEZsYWdzPzogRW1pdEZsYWdzLFxuICAgIGNhbmNlbGxhdGlvblRva2VuPzogdHMuQ2FuY2VsbGF0aW9uVG9rZW4sXG4gICAgY3VzdG9tVHJhbnNmb3JtZXJzPzogQ3VzdG9tVHJhbnNmb3JtZXJzLFxuICAgIGVtaXRDYWxsYmFjaz86IFRzRW1pdENhbGxiYWNrLFxuICAgIG1lcmdlRW1pdFJlc3VsdHNDYWxsYmFjaz86IFRzTWVyZ2VFbWl0UmVzdWx0c0NhbGxiYWNrXG4gIH0pOiB0cy5FbWl0UmVzdWx0O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSAuZC50cyAvIC5uZ3N1bW1hcnkuanNvbiAvIC5uZ2ZhY3RvcnkuZC50cyBmaWxlcyBvZiBsaWJyYXJpZXMgdGhhdCBoYXZlIGJlZW4gZW1pdHRlZFxuICAgKiBpbiB0aGlzIHByb2dyYW0gb3IgcHJldmlvdXMgcHJvZ3JhbXMgd2l0aCBwYXRocyB0aGF0IGVtdWxhdGUgdGhlIGZhY3QgdGhhdCB0aGVzZSBsaWJyYXJpZXNcbiAgICogaGF2ZSBiZWVuIGNvbXBpbGVkIGJlZm9yZSB3aXRoIG5vIG91dERpci5cbiAgICovXG4gIGdldExpYnJhcnlTdW1tYXJpZXMoKTogTWFwPHN0cmluZywgTGlicmFyeVN1bW1hcnk+O1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGdldEVtaXR0ZWRHZW5lcmF0ZWRGaWxlcygpOiBNYXA8c3RyaW5nLCBHZW5lcmF0ZWRGaWxlPjtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBnZXRFbWl0dGVkU291cmNlRmlsZXMoKTogTWFwPHN0cmluZywgdHMuU291cmNlRmlsZT47XG59XG4iXX0=