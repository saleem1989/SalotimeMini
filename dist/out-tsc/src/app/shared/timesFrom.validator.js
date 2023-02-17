export function openHoursValidation(from, at) {
    return function (c) {
        if (Date.parse('01/01/2011 ' + from) >= Date.parse('01/01/2011 ' + at)) {
            return {
                'openHoursIsValid': true
            };
        }
        return null;
    };
}
//# sourceMappingURL=timesFrom.validator.js.map