var SalonModel = /** @class */ (function () {
    function SalonModel(_salonName, _salonPhoneNumber, _fbLink, _instaLink, _location, _employee) {
        this._salonName = _salonName;
        this._salonPhoneNumber = _salonPhoneNumber;
        this._fbLink = _fbLink;
        this._instaLink = _instaLink;
        this._location = _location;
        this._employee = _employee;
        this.salonName = _salonName;
        this.salonPhoneNumber = _salonPhoneNumber;
        this.employees = _employee;
        this.fbLink = _fbLink;
        this.instaLink = _instaLink;
        this.location = _location;
    }
    return SalonModel;
}());
export { SalonModel };
//# sourceMappingURL=salon-model.js.map