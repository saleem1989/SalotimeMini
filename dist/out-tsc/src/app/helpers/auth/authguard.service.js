import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (environment.login) {
            var currentUser = this.authenticationService.currentUserValue;
            if (currentUser) {
                // authorised so return true
                return true;
            }
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        else {
            return true;
        }
    };
    AuthGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=authguard.service.js.map