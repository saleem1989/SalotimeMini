import * as tslib_1 from "tslib";
import { CalendarDateFormatter } from 'angular-calendar';
import { DatePipe } from '@angular/common';
var CustomDateFormatter = /** @class */ (function (_super) {
    tslib_1.__extends(CustomDateFormatter, _super);
    function CustomDateFormatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // you can override any of the methods defined in the parent class
    CustomDateFormatter.prototype.monthViewColumnHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'EEE', locale);
    };
    CustomDateFormatter.prototype.monthViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'MMM y', locale);
    };
    CustomDateFormatter.prototype.weekViewColumnHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'EEE', locale);
    };
    CustomDateFormatter.prototype.dayViewHour = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'HH:mm', locale);
    };
    return CustomDateFormatter;
}(CalendarDateFormatter));
export { CustomDateFormatter };
//# sourceMappingURL=custom-date-formatter.provider.js.map