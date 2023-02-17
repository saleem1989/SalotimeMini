import * as tslib_1 from "tslib";
import { Validators } from '@angular/forms';
import { Component, HostListener } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
import { EmailModel } from '../models/email-model/EmailModel';
var ContactUsComponent = /** @class */ (function () {
    function ContactUsComponent(fb, route) {
        this.fb = fb;
        this.route = route;
        this.disabledSubmitButton = true;
        this.backButtonPointOpts = ['home', 'salon-panel'];
        this.EmailModel = new EmailModel("t1", "t2", "Feedback", "Feedback", true);
        this.contactForm = fb.group({
            'contactFormName': ['', Validators.required],
            'contactFormEmail': ['', Validators.compose([Validators.required, Validators.email])],
            'contactFormSubjects': ['', Validators.required],
            'contactFormMessage': ['', Validators.required],
            'contactFormCopy': [''],
        });
    }
    ContactUsComponent.prototype.oninput = function () {
        if (this.contactForm.valid) {
            this.disabledSubmitButton = false;
        }
    };
    ContactUsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.optionsSelect = [
            { value: 'Feedback', label: 'Feedback' },
            { value: 'Report a bug', label: 'Report a bug' },
            { value: 'Feature request', label: 'Feature request' },
            { value: 'Other stuff', label: 'Other stuff' },
        ];
        this.route.queryParams.subscribe(function (params) {
            _this.backButtonPoint = _this.backButtonPointOpts.indexOf(params.from) == -1 ? "/home" : "/" + params.from;
        });
    };
    ContactUsComponent.prototype.ngAfterViewInit = function () {
        new WOW().init();
    };
    ContactUsComponent.prototype.onSubmit = function () {
        /* this.connectionService.sendMessage(this.contactForm.value).subscribe(() => {
            alert('Your message has been sent.');
            this.contactForm.reset();
            this.disabledSubmitButton = true;
          }, error => {
            console.log('Error', error);
          });
        }*/
    };
    tslib_1.__decorate([
        HostListener('input')
    ], ContactUsComponent.prototype, "oninput", null);
    ContactUsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-contact-us',
            templateUrl: './contact-us.component.html',
            styleUrls: ['./contact-us.component.scss']
        })
    ], ContactUsComponent);
    return ContactUsComponent;
}());
export { ContactUsComponent };
//# sourceMappingURL=contact-us.component.js.map