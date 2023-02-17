var Service = /** @class */ (function () {
    //todo: contructor for test should to remove it 
    function Service(_service, _timeInMin, _price) {
        this._service = _service;
        this._timeInMin = _timeInMin;
        this._price = _price;
        this.subServicesDp = _service;
        this.subServiceTime = _timeInMin;
        this.subServicePrice = _price;
    }
    return Service;
}());
export { Service };
//# sourceMappingURL=service.js.map