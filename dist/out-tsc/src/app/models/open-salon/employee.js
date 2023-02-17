var Employee = /** @class */ (function () {
    //todo: contructor for test should to remove it 
    function Employee(employeename, cat, worktimes, _services) {
        this.employeename = employeename;
        this.cat = cat;
        this.worktimes = worktimes;
        this._services = _services;
        this.employeeName = employeename;
        this.servers = cat;
        this.workTimeObj = worktimes;
        this.subServersObj = _services;
    }
    return Employee;
}());
export { Employee };
//# sourceMappingURL=employee.js.map