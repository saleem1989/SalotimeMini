var Day;
(function (Day) {
    Day[Day["Sun"] = 1] = "Sun";
    Day[Day["Mon"] = 2] = "Mon";
    Day[Day["Tue"] = 3] = "Tue";
    Day[Day["Wed"] = 4] = "Wed";
    Day[Day["Thur"] = 5] = "Thur";
    Day[Day["Fri"] = 6] = "Fri";
    Day[Day["Sat"] = 7] = "Sat";
})(Day || (Day = {}));
var Days = /** @class */ (function () {
    //todo: contructor for test should to remove it 
    function Days(_id, _value) {
        this._id = _id;
        this._value = _value;
        this.id = _id;
        this.value = _value;
    }
    return Days;
}());
export { Days };
//# sourceMappingURL=days.js.map