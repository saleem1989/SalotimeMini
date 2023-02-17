import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
var TokenInterceptorService = /** @class */ (function () {
    function TokenInterceptorService(auth) {
        this.auth = auth;
        this.refreshTokenInProgress = false;
        // Refresh Token Subject tracks the current token, or is null if no token is currently
        // available (e.g. refresh pending).
        this.refreshTokenSubject = new BehaviorSubject(null);
    }
    TokenInterceptorService.prototype.intercept = function (req, next) {
        var _this = this;
        var token = this.auth.getAccessToken();
        var tokenizedReq = req;
        if (token !== null) {
            var auth = 'Bearer ' + token;
            tokenizedReq = req.clone({
                setHeaders: {
                    Authorization: auth
                }
            });
        }
        return next.handle(tokenizedReq).catch(function (error) {
            if (error.status !== 401) {
                return Observable.throw(error);
            }
            if (_this.refreshTokenInProgress) {
                // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
                // – which means the new token is ready and we can retry the request again
                return _this.refreshTokenSubject
                    .filter(function (result) { return result !== null; })
                    .take(1)
                    .switchMap(function () { return next.handle(_this.addAuthenticationToken(req)); });
            }
            else {
                _this.refreshTokenInProgress = true;
                // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
                _this.refreshTokenSubject.next(null);
                // Call auth.refreshAccessToken(this is an Observable that will be returned)
                return _this.auth.refreshAccessToken()
                    .switchMap(function (token) {
                    //When the call to refreshToken completes we reset the refreshTokenInProgress to false
                    // for the next time the token needs to be refreshed
                    _this.refreshTokenInProgress = false;
                    _this.refreshTokenSubject.next(token);
                    return next.handle(_this.addAuthenticationToken(req));
                })
                    .catch(function (err) {
                    _this.refreshTokenInProgress = false;
                    alert("ERROR!!");
                     this.auth.logout();
                    return Observable.throw(error);
                });
            }
        });
    };
    TokenInterceptorService.prototype.addAuthenticationToken = function (request) {
        // Get access token from Local Storage
        var accessToken = this.auth.getAccessToken();
        // If access token is null this means that user is not logged in
        // And we return the original request
        if (!accessToken) {
            return request;
        }
        // We clone the request, because the original request is immutable
        return request.clone({
            setHeaders: {
                Authorization: "Bearer " + this.auth.getAccessToken()
            }
        });
    };
    TokenInterceptorService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], TokenInterceptorService);
    return TokenInterceptorService;
}());
export { TokenInterceptorService };
//# sourceMappingURL=token-interceptor.service.js.map