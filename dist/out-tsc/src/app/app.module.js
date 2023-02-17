import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule, ToastService } from 'ng-uikit-pro-standard';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProfileComponent } from './profile/profile.component';
import { MyappointmentComponent } from './myappointment/myappointment.component';
import { MySalonComponent } from './my-salon/my-salon.component';
import { OpenSalonComponent } from './open-salon/open-salon.component';
import { NgwWowModule } from 'ngx-wow';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from "./helpers/auth/token-interceptor.service";
import { AuthphoneComponent } from './login/authphone/authphone.component';
import { Step2Component } from './open-salon/step2/step2.component';
import { Step3Component } from './open-salon/step3/step3.component';
import { SalonPanelComponent } from './salon-panel/salon-panel.component';
import { SalonListComponent } from './salon-list/salon-list.component';
import { EmployeeDropDownComponent } from './employee-drop-down/employee-drop-down.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DayOffComponent } from './day-off/day-off.component';
import { ModalComponent } from './modal/modal.component';
import { InfoComponent } from './info/info.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { UpdateSalonComponent } from './update-salon/update-salon.component';
import { DynamicModalComponent } from './dynamic-modal/dynamic-modal.component';
import { SuccessDynamicModalComponent } from './success-dynamic-modal/success-dynamic-modal.component';

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [AppComponent, routingComponents, LoginComponent, HomeComponent, ContactUsComponent, ProfileComponent, MyappointmentComponent, MySalonComponent, OpenSalonComponent, AuthphoneComponent, Step1Component, Step2Component, Step3Component, SalonPanelComponent, SalonListComponent, CalendarComponent, EmployeeDropDownComponent, DayOffComponent, ModalComponent, InfoComponent, PhotoListComponent, GooglemapsComponent, HeaderNavComponent, UpdateSalonComponent, DynamicModalComponent, SuccessDynamicModalComponent],
            imports: [
                GooglePlaceModule,
                BrowserModule,
                MDBBootstrapModulesPro.forRoot(),
                NgMultiSelectDropDownModule.forRoot(),
                ToastModule.forRoot(),
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                AppRoutingModule,
                NgwWowModule,
                CalendarModule.forRoot({
                    provide: DateAdapter,
                    useFactory: adapterFactory
                }),
                NgbModule
            ],
            entryComponents: [SuccessDynamicModalComponent],
            providers: [
                MDBSpinningPreloader,
                ToastService,
                { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
            ],
            bootstrap: [AppComponent],
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map