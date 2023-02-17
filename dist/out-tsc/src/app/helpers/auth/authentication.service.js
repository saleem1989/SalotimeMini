import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment.prod";
import { JwtHelperService } from '@auth0/angular-jwt';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, apiAuth) {
        this.http = http;
        this.apiAuth = apiAuth;
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    Object.defineProperty(AuthenticationService.prototype, "currentUserValue", {
        get: function () {
            return this.currentUserSubject.value;
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.authPhone = function (phone, fName) {
        return this.apiAuth.authPhone(phone, fName);
    };
    AuthenticationService.prototype.login = function (username, code) {
        var _this = this;
        return this.http.post(environment.APIUrl + "/users/authenticate", { username: username, code: code })
            .pipe(map(function (user) {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                _this.currentUserSubject.next(user);
            }
            return user;
        }));
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    };
    AuthenticationService.prototype.refreshAccessToken = function () {
        var token = this.apiAuth.refreshToken(this.getRefreshToken())
            .subscribe(function (res) {
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser === null) {
                return null;
            }
            currentUser.refreshToken = res.refreshToken;
            currentUser.token = res.token;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            return res.token;
        });
        return Observable.of(token).delay(2000);
    };
    AuthenticationService.prototype.getRefreshToken = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser === null) {
            return null;
        }
        return currentUser.refreshToken;
    };
    AuthenticationService.prototype.getAccessToken = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser === null) {
            return null;
        }
        return currentUser.token;
    };
    AuthenticationService.prototype.isAdmin = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser === null || currentUser.token === null) {
            //this.logout();
            return null;
        }
        var helper = new JwtHelperService();
        var decodedToken = helper.decodeToken(currentUser.token);
        var isUserAdmin = decodedToken.role === 'admin';
        //isUserAdmin = true;
        return isUserAdmin;
    };
    AuthenticationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
        //TODO: if currentuser == null it should logout
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map