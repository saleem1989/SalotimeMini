import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Employee } from 'src/app/models/open-salon/employee';
import { Validators, FormArray } from '@angular/forms';
import { WorkTime } from 'src/app/models/open-salon/work-time';
import { Service } from 'src/app/models/open-salon/service';
import { DayList } from 'src/app/models/open-salon/day-list';
import { ServerList } from 'src/app/models/open-salon/server-list';
import { SubServerList } from 'src/app/models/open-salon/sub-server-list';
import { openHoursValidation } from 'src/app/shared/timesFrom.validator';
var EmployeeComponent = /** @class */ (function () {
    //Constructor
    function EmployeeComponent(ref, fb) {
        this.ref = ref;
        this.fb = fb;
        //server List
        this.serverDropdownList = [];
        this.serverSelectedItems = [];
        this.serverDropdownSettings = {};
        //days List
        this.daysDropdownList = [];
        this.daysSelectedItems = [];
        this.daysDropdownSettings = {};
        //sub server List
        this.subServicesDropdownList = [];
        this.subServicesSelectedItems = [];
        this.subServicesDropdownSettings = {};
        this.Employees = [];
        this.worktime = [];
        this.services = [];
        this.daysList = [];
        this.serverList = [];
        this.subServerList = [];
        this.days = [];
        this.dynamicForm = this.fb.group({
            employees: new FormArray([]),
        });
    }
    EmployeeComponent.prototype.addRowWorkTimes = function (i) {
        this.daysList = [];
        this.daysList.push(new DayList(1, "א"));
        this.daysList.push(new DayList(2, "ב"));
        this.Employees[i].workTimeObj.push(new WorkTime(this.daysList, "1:00", "2:00"));
        this.addItem(i);
    };
    EmployeeComponent.prototype.removeRowWorkTimes = function (i, j) {
        this.Employees[i].workTimeObj.splice(j, 1);
    };
    EmployeeComponent.prototype.addSubService = function (i) {
        this.addItem2(i);
        this.numberOfServices++;
        this.Employees[i].subServersObj.push(new Service(null, undefined, undefined));
    };
    EmployeeComponent.prototype.removeSubService = function (i, j) {
        this.numberOfServices--;
        this.Employees[i].subServersObj.splice(j, 1);
    };
    EmployeeComponent.prototype.addEmployee = function () {
        this.numberOfEmployee++;
        this.worktime = [];
        this.daysList = [];
        this.services = [];
        this.subServerList = [];
        this.daysList.push(new DayList(1, "א"));
        this.daysList.push(new DayList(2, "ב"));
        this.worktime.push(new WorkTime(this.daysList, "1:00", "2:00"));
        this.services.push(new Service("1", 30, 50));
        this.Employees.push(new Employee("employee1", ["1"], this.worktime, this.services));
        this.addRemoveEmployeee();
    };
    EmployeeComponent.prototype.removeEmployee = function (index) {
        this.numberOfEmployee--;
        this.addRemoveEmployeee();
    };
    EmployeeComponent.prototype.submitEmployee = function () {
        console.log(this.Employees);
    };
    Object.defineProperty(EmployeeComponent.prototype, "employeeName", {
        get: function () {
            return this.t.at(0).get('employeeName');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeComponent.prototype, "f", {
        get: function () { return this.dynamicForm.controls; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeComponent.prototype, "t", {
        get: function () { return this.f.employees; },
        enumerable: true,
        configurable: true
    });
    EmployeeComponent.prototype.addRemoveEmployeee = function () {
        if (this.t.length < this.numberOfEmployee) {
            for (var i = this.t.length; i < this.numberOfEmployee; i++) {
                this.t.push(this.fb.group({
                    employeeName: [this.Employees[i].employeeName, Validators.required],
                    servers: [this.serverList, Validators.required],
                    workTimeObj: new FormArray([
                        this.createWorkTimeItem()
                    ]),
                    subServersObj: new FormArray([
                        this.createServersItem()
                    ]),
                }));
            }
        }
        else {
            for (var i = this.t.length; i >= this.numberOfEmployee; i--) {
                this.t.removeAt(i);
            }
        }
    };
    EmployeeComponent.prototype.createServersItem = function () {
        return this.fb.group({
            subServicesDp: ['', Validators.required],
            subServiceTime: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
            subServicePrice: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
        });
    };
    EmployeeComponent.prototype.createWorkTimeItem = function () {
        return this.fb.group({
            daysDropDown: [this.daysList, Validators.required],
            from: ['', Validators.required],
            at: ['', Validators.required],
        });
    };
    EmployeeComponent.prototype.onOpenHourChanged = function (i, j) {
        var openingHours;
        openingHours = this.t.at(i).get('workTimeObj');
        openingHours.at(j).get('at').updateValueAndValidity();
    };
    EmployeeComponent.prototype.addItem = function (i) {
        var _this = this;
        this.worktimesFormArr = this.t.at(i).get('workTimeObj');
        this.worktimesFormArr.push(this.createWorkTimeItem());
        var j = this.worktimesFormArr.length - 1;
        this.worktimesFormArr.at(j).get('at').valueChanges.subscribe(function (val) {
            _this.worktimesFormArr.at(j).get('at').setValidators(Validators.compose([Validators.required, openHoursValidation(_this.worktimesFormArr.at(j).get('from').value, _this.worktimesFormArr.at(j).get('at').value)]));
        });
    };
    EmployeeComponent.prototype.addItem2 = function (i) {
        var _this = this;
        this.subServersArr = this.t.at(i).get('subServersObj');
        this.subServersArr.push(this.createServersItem());
        var j = this.subServersArr.length - 1;
        this.subServersArr.at(j).get('subServicesDp').valueChanges.subscribe(function (val) {
            _this.subServersArr.at(j).get('subServicesDp').setValidators(Validators.compose([Validators.required]));
        });
    };
    EmployeeComponent.prototype.ngOnInit = function () {
        this.numberOfServices = 1;
        this.numberOfEmployee = 1;
        // Example
        this.daysList.push(new DayList(1, "א"));
        this.worktime.push(new WorkTime(this.daysList, "9:00", "10:00"));
        //create service instant for Test
        this.subServerList.push(new SubServerList(1, "פין"));
        this.services.push(new Service("2", 30, 50));
        this.serverList = [];
        this.serverList.push(new ServerList(3, "קוסמטיקה"));
        this.serverList.push(new ServerList(5, "ציפורניים"));
        this.Employees.push(new Employee("employee0", ["1"], this.worktime, this.services));
        //this.Employees.push(new Employee("employee1", this.serverList, this.worktime, this.services));
        this.addRemoveEmployeee();
        //server multiselect init
        this.serverDropdownList = [
            { id: 1, value: 'תספורת גברעם' },
            { id: 2, value: 'תספורת נשים' },
            { id: 3, value: 'קוסמטיקה' },
            { id: 4, value: 'עיצוב גבות' },
            { id: 5, value: 'ציפורניים' }
        ];
        this.serverSelectedItems = [
            { id: 3, text: 'קוסמטיקה' },
            { id: 4, text: 'עיצוב גבות' }
        ];
        this.serverDropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'value',
            required: true,
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            searchPlaceholderText: "חפש",
            allowSearchFilter: true,
            enableCheckAll: false
        };
        //days multiselect init
        this.daysDropdownList = [
            { id: 1, value: 'א' },
            { id: 2, value: 'ב' },
            { id: 3, value: 'ג' },
            { id: 4, value: 'ד' },
            { id: 5, value: 'ה' },
            { id: 6, value: 'ו' },
            { id: 7, value: 'ד' },
        ];
        this.daysSelectedItems = [];
        this.daysDropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'value',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 0,
            searchPlaceholderText: "חפש",
            allowSearchFilter: false,
            enableCheckAll: false
        };
        //subServices multiselect init 
        this.subServicesDropdownList = [
            { id: 1, value: 'פין' },
            { id: 2, value: 'החלקה' },
            { id: 3, value: 'הברקה' }
        ];
        this.subServicesSelectedItems = [{ id: 2, value: 'החלקה' }];
        this.subServicesDropdownSettings = {
            singleSelection: true,
            idField: 'id',
            textField: 'value',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            searchPlaceholderText: "חפש",
            allowSearchFilter: true,
            enableCheckAll: false
        };
        var worktimesFA;
        for (var i = 0; i < this.t.length; i++) {
            worktimesFA = this.t.at(i).get('workTimeObj');
            var _loop_1 = function (j) {
                worktimesFA.at(j).get('at').valueChanges.subscribe(function (test) {
                    worktimesFA.at(j).get('at').setValidators(Validators.compose([Validators.required, openHoursValidation(worktimesFA.at(j).get('from').value, worktimesFA.at(j).get('at').value)]));
                });
            };
            for (var j = 0; j < worktimesFA.length; j++) {
                _loop_1(j);
            }
        }
        this.groupOptionsSelect = [
            { value: '', label: 'team 1', group: true },
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '', label: 'team 2', group: true },
            { value: '3', label: 'Option 3' },
            { value: '4', label: 'Option 4' },
        ];
    };
    //Server functions
    EmployeeComponent.prototype.onServerItemSelect = function (item) {
        console.log(item);
    };
    EmployeeComponent.prototype.onServerSelectAll = function (items) {
        console.log(items);
    };
    //days functions
    EmployeeComponent.prototype.onDaysItemSelect = function (item) {
        console.log(item);
    };
    EmployeeComponent.prototype.onDaysSelectAll = function (items) {
        console.log(items);
    };
    //Services function
    EmployeeComponent.prototype.onSubServicesItemSelect = function (item) {
        console.log(item);
    };
    EmployeeComponent.prototype.onSubServicesSelectAll = function (items) {
        console.log(items);
    };
    EmployeeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-employee',
            templateUrl: './employee.component.html',
            styleUrls: ['./employee.component.scss']
        })
    ], EmployeeComponent);
    return EmployeeComponent;
}());
export { EmployeeComponent };
//# sourceMappingURL=employee.component.js.map