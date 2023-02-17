import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ComponentRestrictions } from 'ngx-google-places-autocomplete/objects/options/componentRestrictions';
var GooglemapsComponent = /** @class */ (function () {
    function GooglemapsComponent() {
    }
    GooglemapsComponent.prototype.onChange = function (address) {
        if (address.photos && address.photos.length > 0) {
            console.dir(address.photos[0].getUrl({ maxHeight: 500, maxWidth: 500 }));
        }
        var x = this.getComponentByType(address, "street_number");
        console.log(address.geometry.location.lng());
        console.log(address.geometry.location.lat());
        console.log(address.geometry.location.toJSON());
        console.log(address.geometry.viewport.getNorthEast());
    };
    GooglemapsComponent.prototype.getComponentByType = function (address, type) {
        var e_1, _a;
        if (!type)
            return null;
        if (!address || !address.address_components || address.address_components.length == 0)
            return null;
        type = type.toLowerCase();
        try {
            for (var _b = tslib_1.__values(address.address_components), _c = _b.next(); !_c.done; _c = _b.next()) {
                var comp = _c.value;
                if (!comp.types || comp.types.length == 0)
                    continue;
                if (comp.types.findIndex(function (x) { return x.toLowerCase() == type; }) > -1)
                    return comp;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return null;
    };
    GooglemapsComponent.prototype.search = function () {
    };
    GooglemapsComponent.prototype.changeConfig = function () {
        this.places.options.componentRestrictions = new ComponentRestrictions({
            country: "UA"
        });
        this.places.reset();
    };
    tslib_1.__decorate([
        ViewChild('places', { static: false })
    ], GooglemapsComponent.prototype, "places", void 0);
    GooglemapsComponent = tslib_1.__decorate([
        Component({
            selector: 'google-maps',
            templateUrl: './googlemaps.component.html',
            styleUrls: ['./googlemaps.component.scss']
        })
    ], GooglemapsComponent);
    return GooglemapsComponent;
}());
export { GooglemapsComponent };
//# sourceMappingURL=googlemaps.component.js.map