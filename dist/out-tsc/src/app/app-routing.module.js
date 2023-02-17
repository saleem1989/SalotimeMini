import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthphoneComponent } from './login/authphone/authphone.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProfileComponent } from './profile/profile.component';
import { MyappointmentComponent } from './myappointment/myappointment.component';
import { OpenSalonComponent } from './open-salon/open-salon.component';
import { MySalonComponent } from './my-salon/my-salon.component';
import { SalonPanelComponent } from './salon-panel/salon-panel.component';
import { AuthGuard } from "../../src/app/helpers/auth/authguard.service";
import { SalonListComponent } from './salon-list/salon-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ReservationAppComponent } from './reservationApp/reservationApp.component';
import { DayOffComponent } from './day-off/day-off.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';
import { UpdateSalonComponent } from './update-salon/update-salon.component';
var routes = [
    //{ path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'auth', component: AuthphoneComponent },
    { path: 'contact-us', component: ContactUsComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'my-appointment', component: MyappointmentComponent, canActivate: [AuthGuard] },
    { path: 'open-salon', component: OpenSalonComponent, canActivate: [AuthGuard] },
    { path: 'my-salon', component: MySalonComponent, canActivate: [AuthGuard] },
    { path: 'salon-panel/:id', component: SalonPanelComponent, canActivate: [AuthGuard] },
    { path: 'salon-panel', component: SalonPanelComponent, canActivate: [AuthGuard] },
    { path: 'salonList/:id', component: SalonListComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'reservationApp', component: ReservationAppComponent },
    { path: 'DayOff', component: DayOffComponent },
    { path: 'photoList', component: PhotoListComponent },
    { path: 'googleMaps', component: GooglemapsComponent },
    { path: 'update-salon', component: UpdateSalonComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '/login' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
export var routingComponents = [LoginComponent, HomeComponent, ContactUsComponent, ProfileComponent, MyappointmentComponent, OpenSalonComponent, MySalonComponent, SalonPanelComponent, SalonListComponent, CalendarComponent, ReservationAppComponent, DayOffComponent, PhotoListComponent, GooglemapsComponent, UpdateSalonComponent];
//# sourceMappingURL=app-routing.module.js.map