/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
export class EqualValidatorDirective {
    /**
     * @param {?} validateEqual
     * @param {?} reverse
     */
    constructor(validateEqual, reverse) {
        this.validateEqual = validateEqual;
        this.reverse = reverse;
    }
    /**
     * @private
     * @return {?}
     */
    get isReverse() {
        if (!this.reverse) {
            return false;
        }
        return this.reverse === 'true' ? true : false;
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        /** @type {?} */
        const setToNullValue = null;
        // self value (e.g. retype password)
        /** @type {?} */
        const v = c.value;
        // control value (e.g. password)
        // const e: any = c.root.get(this.validateEqual);
        /** @type {?} */
        const e = c.root.get(this.validateEqual);
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
    }
}
EqualValidatorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mdb-validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
                providers: [
                    { provide: NG_VALIDATORS, useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => EqualValidatorDirective)), multi: true }
                ]
            },] }
];
/** @nocollapse */
EqualValidatorDirective.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['validateEqual',] }] },
    { type: String, decorators: [{ type: Attribute, args: ['reverse',] }] }
];
if (false) {
    /** @type {?} */
    EqualValidatorDirective.prototype.validateEqual;
    /** @type {?} */
    EqualValidatorDirective.prototype.reverse;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXF1YWwtdmFsaWRhdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9mcmVlL2lucHV0cy9lcXVhbC12YWxpZGF0b3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVMzRSxNQUFNLE9BQU8sdUJBQXVCOzs7OztJQUNsQyxZQUFnRCxhQUFxQixFQUN0QyxPQUFlO1FBREUsa0JBQWEsR0FBYixhQUFhLENBQVE7UUFDdEMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUU5QyxDQUFDOzs7OztJQUVELElBQVksU0FBUztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDaEQsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsQ0FBa0I7O2NBQ25CLGNBQWMsR0FBUSxJQUFJOzs7Y0FFMUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLOzs7O2NBSVgsQ0FBQyxHQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFFN0Msa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ3RCLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDakM7UUFFRCwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN4QyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDakMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQjtTQUNGO1FBRUQsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDeEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDVixhQUFhLEVBQUUsS0FBSzthQUNyQixDQUFDLENBQUM7U0FDSjtRQUVELGVBQWU7UUFDZixPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDOzs7WUFuREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw0RkFBNEY7Z0JBQ3RHLFNBQVMsRUFBRTtvQkFDWCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFVBQVU7Ozt3QkFBQyxHQUFHLEVBQUUsQ0FBQyx1QkFBdUIsRUFBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7aUJBQzlGO2FBQ0Y7Ozs7eUNBR2UsU0FBUyxTQUFDLGVBQWU7eUNBQ3BDLFNBQVMsU0FBQyxTQUFTOzs7O0lBRFQsZ0RBQXdEOztJQUNuRSwwQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYsIEF0dHJpYnV0ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZGItdmFsaWRhdGVFcXVhbF1bZm9ybUNvbnRyb2xOYW1lXSxbdmFsaWRhdGVFcXVhbF1bZm9ybUNvbnRyb2xdLFt2YWxpZGF0ZUVxdWFsXVtuZ01vZGVsXScsXG4gIHByb3ZpZGVyczogW1xuICB7IHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEVxdWFsVmFsaWRhdG9yRGlyZWN0aXZlKSwgbXVsdGk6IHRydWUgfVxuICBdXG59KVxuXG5leHBvcnQgY2xhc3MgRXF1YWxWYWxpZGF0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvciggQEF0dHJpYnV0ZSgndmFsaWRhdGVFcXVhbCcpIHB1YmxpYyB2YWxpZGF0ZUVxdWFsOiBzdHJpbmcsXG4gICAgQEF0dHJpYnV0ZSgncmV2ZXJzZScpIHB1YmxpYyByZXZlcnNlOiBzdHJpbmcpIHtcblxuICB9XG5cbiAgcHJpdmF0ZSBnZXQgaXNSZXZlcnNlKCkge1xuICAgIGlmICghdGhpcy5yZXZlcnNlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJldmVyc2UgPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xuICAgIGNvbnN0IHNldFRvTnVsbFZhbHVlOiBhbnkgPSBudWxsO1xuICAgIC8vIHNlbGYgdmFsdWUgKGUuZy4gcmV0eXBlIHBhc3N3b3JkKVxuICAgIGNvbnN0IHYgPSBjLnZhbHVlO1xuXG4gICAgLy8gY29udHJvbCB2YWx1ZSAoZS5nLiBwYXNzd29yZClcbiAgICAvLyBjb25zdCBlOiBhbnkgPSBjLnJvb3QuZ2V0KHRoaXMudmFsaWRhdGVFcXVhbCk7XG4gICAgY29uc3QgZTogYW55ID0gYy5yb290LmdldCh0aGlzLnZhbGlkYXRlRXF1YWwpO1xuXG4gICAgLy8gdmFsdWUgbm90IGVxdWFsXG4gICAgaWYgKGUgJiYgdiAhPT0gZS52YWx1ZSkge1xuICAgICAgcmV0dXJuIHsgdmFsaWRhdGVFcXVhbDogZmFsc2UgfTtcbiAgICB9XG5cbiAgICAvLyB2YWx1ZSBlcXVhbCBhbmQgcmV2ZXJzZVxuICAgIGlmIChlICYmIHYgPT09IGUudmFsdWUgJiYgdGhpcy5pc1JldmVyc2UpIHtcbiAgICAgIGRlbGV0ZSBlLmVycm9yc1sndmFsaWRhdGVFcXVhbCddO1xuICAgICAgaWYgKCFPYmplY3Qua2V5cyhlLmVycm9ycykubGVuZ3RoKSB7XG4gICAgICAgIGUuc2V0RXJyb3JzKG51bGwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHZhbHVlIG5vdCBlcXVhbCBhbmQgcmV2ZXJzZVxuICAgIGlmIChlICYmIHYgIT09IGUudmFsdWUgJiYgdGhpcy5pc1JldmVyc2UpIHtcbiAgICAgIGUuc2V0RXJyb3JzKHtcbiAgICAgICAgdmFsaWRhdGVFcXVhbDogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHJldHVybiBudWxsO1xuICAgIHJldHVybiBzZXRUb051bGxWYWx1ZTtcbiAgfVxufVxuXG4iXX0=