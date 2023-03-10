/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
var EqualValidatorDirective = /** @class */ (function () {
    function EqualValidatorDirective(validateEqual, reverse) {
        this.validateEqual = validateEqual;
        this.reverse = reverse;
    }
    Object.defineProperty(EqualValidatorDirective.prototype, "isReverse", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            if (!this.reverse) {
                return false;
            }
            return this.reverse === 'true' ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} c
     * @return {?}
     */
    EqualValidatorDirective.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        /** @type {?} */
        var setToNullValue = null;
        // self value (e.g. retype password)
        /** @type {?} */
        var v = c.value;
        // control value (e.g. password)
        // const e: any = c.root.get(this.validateEqual);
        /** @type {?} */
        var e = c.root.get(this.validateEqual);
        // value not equal
        if (e && v !== e.value) {
            return { validateEqual: false };
        }
        // value equal and reverse
        if (e && v === e.value && this.isReverse) {
            delete e.errors['validateEqual'];
            if (!Object.keys(e.errors).length) {
                e.setErrors(null);
            }
        }
        // value not equal and reverse
        if (e && v !== e.value && this.isReverse) {
            e.setErrors({
                validateEqual: false
            });
        }
        // return null;
        return setToNullValue;
    };
    EqualValidatorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mdb-validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
                    providers: [
                        { provide: NG_VALIDATORS, useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return EqualValidatorDirective; })), multi: true }
                    ]
                },] }
    ];
    /** @nocollapse */
    EqualValidatorDirective.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Attribute, args: ['validateEqual',] }] },
        { type: String, decorators: [{ type: Attribute, args: ['reverse',] }] }
    ]; };
    return EqualValidatorDirective;
}());
export { EqualValidatorDirective };
if (false) {
    /** @type {?} */
    EqualValidatorDirective.prototype.validateEqual;
    /** @type {?} */
    EqualValidatorDirective.prototype.reverse;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXF1YWwtdmFsaWRhdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9mcmVlL2lucHV0cy9lcXVhbC12YWxpZGF0b3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzRTtJQVFFLGlDQUFnRCxhQUFxQixFQUN0QyxPQUFlO1FBREUsa0JBQWEsR0FBYixhQUFhLENBQVE7UUFDdEMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUU5QyxDQUFDO0lBRUQsc0JBQVksOENBQVM7Ozs7O1FBQXJCO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pCLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFDRCxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNoRCxDQUFDOzs7T0FBQTs7Ozs7SUFFRCwwQ0FBUTs7OztJQUFSLFVBQVMsQ0FBa0I7O1lBQ25CLGNBQWMsR0FBUSxJQUFJOzs7WUFFMUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLOzs7O1lBSVgsQ0FBQyxHQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFFN0Msa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ3RCLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDakM7UUFFRCwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN4QyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDakMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQjtTQUNGO1FBRUQsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDeEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDVixhQUFhLEVBQUUsS0FBSzthQUNyQixDQUFDLENBQUM7U0FDSjtRQUVELGVBQWU7UUFDZixPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDOztnQkFuREYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw0RkFBNEY7b0JBQ3RHLFNBQVMsRUFBRTt3QkFDWCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFVBQVU7Ozs0QkFBQyxjQUFNLE9BQUEsdUJBQXVCLEVBQXZCLENBQXVCLEVBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO3FCQUM5RjtpQkFDRjs7Ozs2Q0FHZSxTQUFTLFNBQUMsZUFBZTs2Q0FDcEMsU0FBUyxTQUFDLFNBQVM7O0lBMkN4Qiw4QkFBQztDQUFBLEFBcERELElBb0RDO1NBN0NZLHVCQUF1Qjs7O0lBQ3JCLGdEQUF3RDs7SUFDbkUsMENBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBBdHRyaWJ1dGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWRiLXZhbGlkYXRlRXF1YWxdW2Zvcm1Db250cm9sTmFtZV0sW3ZhbGlkYXRlRXF1YWxdW2Zvcm1Db250cm9sXSxbdmFsaWRhdGVFcXVhbF1bbmdNb2RlbF0nLFxuICBwcm92aWRlcnM6IFtcbiAgeyBwcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBFcXVhbFZhbGlkYXRvckRpcmVjdGl2ZSksIG11bHRpOiB0cnVlIH1cbiAgXVxufSlcblxuZXhwb3J0IGNsYXNzIEVxdWFsVmFsaWRhdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3IoIEBBdHRyaWJ1dGUoJ3ZhbGlkYXRlRXF1YWwnKSBwdWJsaWMgdmFsaWRhdGVFcXVhbDogc3RyaW5nLFxuICAgIEBBdHRyaWJ1dGUoJ3JldmVyc2UnKSBwdWJsaWMgcmV2ZXJzZTogc3RyaW5nKSB7XG5cbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGlzUmV2ZXJzZSgpIHtcbiAgICBpZiAoIXRoaXMucmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXZlcnNlID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcbiAgICBjb25zdCBzZXRUb051bGxWYWx1ZTogYW55ID0gbnVsbDtcbiAgICAvLyBzZWxmIHZhbHVlIChlLmcuIHJldHlwZSBwYXNzd29yZClcbiAgICBjb25zdCB2ID0gYy52YWx1ZTtcblxuICAgIC8vIGNvbnRyb2wgdmFsdWUgKGUuZy4gcGFzc3dvcmQpXG4gICAgLy8gY29uc3QgZTogYW55ID0gYy5yb290LmdldCh0aGlzLnZhbGlkYXRlRXF1YWwpO1xuICAgIGNvbnN0IGU6IGFueSA9IGMucm9vdC5nZXQodGhpcy52YWxpZGF0ZUVxdWFsKTtcblxuICAgIC8vIHZhbHVlIG5vdCBlcXVhbFxuICAgIGlmIChlICYmIHYgIT09IGUudmFsdWUpIHtcbiAgICAgIHJldHVybiB7IHZhbGlkYXRlRXF1YWw6IGZhbHNlIH07XG4gICAgfVxuXG4gICAgLy8gdmFsdWUgZXF1YWwgYW5kIHJldmVyc2VcbiAgICBpZiAoZSAmJiB2ID09PSBlLnZhbHVlICYmIHRoaXMuaXNSZXZlcnNlKSB7XG4gICAgICBkZWxldGUgZS5lcnJvcnNbJ3ZhbGlkYXRlRXF1YWwnXTtcbiAgICAgIGlmICghT2JqZWN0LmtleXMoZS5lcnJvcnMpLmxlbmd0aCkge1xuICAgICAgICBlLnNldEVycm9ycyhudWxsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB2YWx1ZSBub3QgZXF1YWwgYW5kIHJldmVyc2VcbiAgICBpZiAoZSAmJiB2ICE9PSBlLnZhbHVlICYmIHRoaXMuaXNSZXZlcnNlKSB7XG4gICAgICBlLnNldEVycm9ycyh7XG4gICAgICAgIHZhbGlkYXRlRXF1YWw6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gc2V0VG9OdWxsVmFsdWU7XG4gIH1cbn1cblxuIl19