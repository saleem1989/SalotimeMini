import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { Validators, FormArray } from '@angular/forms';
import { Employee } from 'src/app/models/open-salon/employee';
import { WorkTime } from 'src/app/models/open-salon/work-time';
import { Service } from 'src/app/models/open-salon/service';
import { DayList } from 'src/app/models/open-salon/day-list';
import { SubServerList } from 'src/app/models/open-salon/sub-server-list';
import { openHoursValidation } from 'src/app/shared/timesFrom.validator';
var Step2Component = /** @class */ (function () {
    //Constructor
    function Step2Component(ref, fb, apiOpenSalon, router) {
        this.ref = ref;
        this.fb = fb;
        this.apiOpenSalon = apiOpenSalon;
        this.router = router;
        this.setter = new EventEmitter();
        this.stam = false;
        this.step2 = {};
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
        this.isLoading = true;
    }
    Object.defineProperty(Step2Component.prototype, "salonName", {
        get: function () {
            return this.secondFormGroup.get('salonName');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Step2Component.prototype, "salonPhoneNumber", {
        get: function () {
            return this.secondFormGroup.get('salonPhoneNumber');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Step2Component.prototype, "fbLink", {
        get: function () {
            return this.secondFormGroup.get('fbLink');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Step2Component.prototype, "instaLink", {
        get: function () {
            return this.secondFormGroup.get('instaLink');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Step2Component.prototype, "location", {
        get: function () {
            return this.secondFormGroup.get('location');
        },
        enumerable: true,
        configurable: true
    });
    Step2Component.prototype.change = function () {
        this.locationIsValid = false;
    };
    Step2Component.prototype.onChange = function (address) {
        this.locationIsValid = true;
        // this.SalonModel.location = address.formatted_address;\
        this.secondFormGroup.get('location').patchValue(address.formatted_address);
        if (address.photos && address.photos.length > 0) {
            console.dir(address.photos[0].getUrl({ maxHeight: 500, maxWidth: 500 }));
        }
        var x = this.getComponentByType(address, "street_number");
        console.log(address.geometry.location.lng());
        console.log(address.geometry.location.lat());
        console.log(address.geometry.location.toJSON());
        console.log(address.geometry.viewport.getNorthEast());
    };
    Step2Component.prototype.getComponentByType = function (address, type) {
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
    Step2Component.prototype.nextStep = function () {
        this.step2 = {
            salonName: "tamer",
            salonPhoneNumber: "0529310278",
            fbLink: "www.facebook.com...",
            instaLink: "www.instegram.com...",
            location: "https://www.google.com/maps/place/..",
            employees: [
                {
                    EmployeeName: "saleem",
                    domain: "מספר גברים,מספרת נשים",
                    openTime: [
                        { sunFrom: "8:00", sunAt: "5:00", monFrom: "08:00", monAt: "05:00" },
                    ],
                    services: [
                        { serviceName: "החלקת שיער", timeInMin: "30", price: "50" },
                        { serviceName: "הברקת שיער", timeInMin: "30", price: "50" },
                    ]
                },
                {
                    EmployeeName: "Eassa",
                    domain: "מספר גברים,מספרת נשים",
                    openTime: [
                        { sunFrom: "8:00", sunAt: "5:00", monFrom: "08:00", monAt: "05:00" },
                    ],
                    services: [
                        { serviceName: "החלקת שיער", timeInMin: "30", price: "50" },
                        { serviceName: "הברקת שיער", timeInMin: "30", price: "50" },
                    ]
                },
            ]
        };
        console.log(JSON.stringify(this.secondFormGroup.value));
        // this.setter.emit(this.step2);
    };
    Step2Component.prototype.onSubmit = function () {
        var _this = this;
        this.secondFormGroup.markAsTouched();
        if (this.secondFormGroup.invalid)
            return;
        var obj = this.secondFormGroup.value;
        this.apiOpenSalon.register(obj).subscribe(function (res) {
            //user was set as admin , store the new token in localstorage
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            currentUser.refreshToken = res.refreshToken;
            currentUser.token = res.token;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            _this.router.navigate(["/salon-panel"]);
        }, function (err) {
            alert("fail!");
        });
    };
    Step2Component.prototype.addRowWorkTimes = function (i) {
        this.daysList = [];
        this.daysList.push(new DayList(1, "א"));
        this.daysList.push(new DayList(2, "ב"));
        this.Employees[i].workTimeObj.push(new WorkTime(this.daysList, "1:00", "2:00"));
        this.addItem(i);
    };
    Step2Component.prototype.removeRowWorkTimes = function (i, j) {
        var openingHours;
        openingHours = this.t.at(i).get('workTimeObj');
        openingHours.removeAt(j);
        this.Employees[i].workTimeObj.splice(j, 1);
    };
    Step2Component.prototype.addSubService = function (i) {
        this.addItem2(i);
        this.numberOfServices++;
        this.Employees[i].subServersObj.push(new Service(null, undefined, undefined));
    };
    Step2Component.prototype.removeSubService = function (i, j) {
        this.numberOfServices--;
        var openingHours;
        openingHours = this.t.at(i).get('subServersObj');
        openingHours.removeAt(j);
        this.Employees[i].subServersObj.splice(j, 1);
    };
    Step2Component.prototype.addEmployee = function () {
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
    Step2Component.prototype.removeEmployee = function (index) {
        this.numberOfEmployee--;
        this.addRemoveEmployeee();
    };
    Step2Component.prototype.submitEmployee = function () {
        console.log(this.Employees);
    };
    Object.defineProperty(Step2Component.prototype, "employeeName", {
        get: function () {
            return this.t.at(0).get('employeeName');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Step2Component.prototype, "f", {
        get: function () { return this.secondFormGroup.controls; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Step2Component.prototype, "t", {
        get: function () { return this.f.employees; },
        enumerable: true,
        configurable: true
    });
    Step2Component.prototype.addNewEmployee = function () {
        if (this.t.length < this.numberOfEmployee) {
            for (var i = this.t.length; i < this.numberOfEmployee; i++) {
                this.t.push(this.fb.group({
                    employeeName: ['', Validators.required],
                    servers: ['', Validators.required],
                    workTimeObj: this.createWorkTimeItem(this.Employees[i].workTimeObj),
                    subServersObj: this.createServersItem(this.Employees[i].subServersObj),
                }));
            }
        }
    };
    Step2Component.prototype.addRemoveEmployeee = function (isNewEmployee) {
        var _this = this;
        if (isNewEmployee === void 0) { isNewEmployee = false; }
        if (this.t.length < this.numberOfEmployee) {
            for (var i = this.t.length; i < this.numberOfEmployee; i++) {
                this.t.push(this.fb.group({
                    employeeName: [this.Employees[i].employeeName, Validators.required],
                    servers: [this.Employees[i].servers, Validators.required],
                    workTimeObj: this.createWorkTimeItem(this.Employees[i].workTimeObj),
                    subServersObj: this.createServersItem(this.Employees[i].subServersObj),
                }));
                if (this.Employees[i] && this.Employees[i].servers.length > 0) {
                    this.loadSubCategories(this.Employees[i].servers);
                }
                this.t.at(i).get('servers').valueChanges.subscribe(function (val) {
                    if (val && val.length > 0) {
                        _this.loadSubCategories(val);
                    }
                    else {
                        _this.groupOptionsSelect = [{}];
                    }
                });
            }
        }
        else {
            for (var i = this.t.length; i >= this.numberOfEmployee; i--) {
                this.t.removeAt(i);
            }
        }
    };
    Step2Component.prototype.getSelectedValues = function (event) {
    };
    Step2Component.prototype.createServersItem = function (subCategoriesList) {
        var serverItems = new FormArray([]);
        for (var i = 0; i < subCategoriesList.length; i++) {
            serverItems.push(this.fb.group({
                subServicesDp: [subCategoriesList[i].subServicesDp, Validators.required],
                subServiceTime: [subCategoriesList[i].subServiceTime, [Validators.required, Validators.pattern("^[0-9]*$")]],
                subServicePrice: [subCategoriesList[i].subServicePrice, [Validators.required, Validators.pattern("^[0-9]*$")]]
            }));
        }
        return serverItems;
    };
    Step2Component.prototype.createSingleServerItem = function () {
        return this.fb.group({
            subServicesDp: ['', Validators.required],
            subServiceTime: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
            subServicePrice: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
        });
    };
    Step2Component.prototype.createWorkTimeItem = function (workTimes) {
        var wTimes = new FormArray([]);
        for (var i = 0; i < workTimes.length; i++) {
            wTimes.push(this.fb.group({
                daysDropDown: [workTimes[i].daysDropDown, Validators.required],
                from: [workTimes[i].from, Validators.required],
                at: [workTimes[i].at, Validators.required],
            }));
        }
        return wTimes;
    };
    Step2Component.prototype.createSingleWorkItem = function () {
        return this.fb.group({
            daysDropDown: ['', Validators.required],
            from: ['', Validators.required],
            at: ['', Validators.required],
        });
    };
    Step2Component.prototype.onOpenHourChanged = function (i, j) {
        var openingHours;
        openingHours = this.t.at(i).get('workTimeObj');
        openingHours.at(j).get('at').updateValueAndValidity();
    };
    Step2Component.prototype.addItem = function (i) {
        var _this = this;
        this.worktimesFormArr = this.t.at(i).get('workTimeObj');
        this.worktimesFormArr.push(this.createSingleWorkItem());
        var j = this.worktimesFormArr.length - 1;
        this.worktimesFormArr.at(j).get('at').valueChanges.subscribe(function (val) {
            _this.worktimesFormArr.at(j).get('at').setValidators(Validators.compose([Validators.required, openHoursValidation(_this.worktimesFormArr.at(j).get('from').value, _this.worktimesFormArr.at(j).get('at').value)]));
        });
    };
    Step2Component.prototype.addItem2 = function (i) {
        var _this = this;
        this.subServersArr = this.t.at(i).get('subServersObj');
        this.subServersArr.push(this.createSingleServerItem());
        var j = this.subServersArr.length - 1;
        this.subServersArr.at(j).get('subServicesDp').valueChanges.subscribe(function (val) {
            _this.subServersArr.at(j).get('subServicesDp').setValidators(Validators.compose([Validators.required]));
        });
    };
    Step2Component.prototype.loadSubCategories = function (typeID) {
        var _this = this;
        this.apiOpenSalon.getSubCategory(typeID)
            .subscribe(function (res) {
            _this.groupOptionsSelect = res.data;
            //this.subServersArr = this.t.at(0).get('subServersObj') as FormArray;
            //this.subServersArr =this.createServersItem(this.Employees[0].subServersObj);
            //  var obj3 = JSON.parse('[{"_id": "5e4ebe048d4075078aa9c2c5","value":"","label":"team1 (TEST)","group":"true","type":"1"},{"_id": "5e4ebe048d4075078aa9c2c3","value":"1","label":"Option 1","group":"false"},{"_id": "5e4ebe048d4075078aa9c2c5","value":"2","label":"Option 2"}]')
            // this.groupOptionsSelect.push(res.data);
        }, function (err) {
        });
    };
    Step2Component.prototype.loadData = function () {
        var _this = this;
        this.apiOpenSalon.getSalonPanel("-1")
            .subscribe(function (res) {
            console.log(res);
            _this.secondFormGroup = _this.fb.group({
                salonName: [res.data.salonName, [Validators.required, Validators.minLength(3)]],
                salonPhoneNumber: [res.data.salonPhoneNumber, [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]*$")]],
                fbLink: [res.data.fbLink, [Validators.pattern("^.*(?:facebook\.com).*$")]],
                instaLink: [res.data.instaLink, [Validators.pattern("^.*(?:instagram\.com).*$")]],
                location: [res.data.location, [Validators.required]],
                employees: new FormArray([])
            });
            // this.Employees = res.data.employees;
            _this.numberOfServices = 1;
            _this.numberOfEmployee = 1;
            _this.locationIsValid = true;
            // Example
            _this.daysList.push(new DayList(1, "א"));
            _this.daysList.push(new DayList(2, "ב"));
            _this.worktime.push(new WorkTime(_this.daysList, "9:00", "10:00"));
            //create service instant for Test
            _this.subServerList.push(new SubServerList(1, "פין"));
            _this.services.push(new Service("1", 30, 50));
            _this.serverList = [];
            //this.Employees.push(new Employee("employee0", ["1"], this.worktime, this.services));
            _this.Employees = res.data.employees;
            console.log(JSON.stringify(_this.Employees));
            _this.addRemoveEmployeee();
            _this.initElements();
        }, function (err) { });
    };
    Step2Component.prototype.initElements = function () {
        //server multiselect init
        this.serverDropdownList = [
            { value: '1', label: 'איפור קבוע' },
            { value: '2', label: 'איפור' },
            { value: '3', label: 'גבות' },
            { value: '4', label: 'ספרות גברים' },
            { value: '5', label: 'ריסים' }
        ];
        //days multiselect init
        this.daysDropdownList = [
            { value: 'א', label: 'א' },
            { value: 'ב', label: 'ב' },
            { value: 'ג', label: 'ג' },
            { value: 'ד', label: 'ד' },
            { value: 'ה', label: 'ה' },
            { value: 'ו', label: 'ו' },
            { value: 'ז', label: 'ז' }
        ];
        this.addRemoveEmployeee();
        /*this.serverSelectedItems = [
          { id: 7, text: 'קוסמטיקה' },
          { id: 8, text: 'ציפורניים' }
       
        ];*/
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
        this.isLoading = false;
    };
    Step2Component.prototype.initEmployee = function () {
        return this.fb.group({
            employeeName: ["", Validators.required],
            servers: ["", Validators.required],
            workTimeObj: new FormArray([this.createSingleWorkItem()]),
            subServersObj: new FormArray([this.createSingleServerItem()]),
        });
    };
    Step2Component.prototype.ngOnInit = function () {
        var obj = localStorage.getItem('dataSource');
        this.groupOptionsSelect = [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
        ];
        if (this.isUpdateMode == "true") {
            this.loadData();
        }
        else {
            this.secondFormGroup = this.fb.group({
                salonName: ["", [Validators.required, Validators.minLength(3)]],
                salonPhoneNumber: ["", [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]*$")]],
                fbLink: ["", [Validators.pattern("^.*(?:facebook\.com).*$")]],
                instaLink: ["", [Validators.pattern("^.*(?:instagram\.com).*$")]],
                location: ["", [Validators.required]],
                employees: new FormArray([]),
            });
            this.numberOfServices = 1;
            this.numberOfEmployee = 1;
            this.locationIsValid = true;
            this.worktime.push(new WorkTime(this.daysList, "", ""));
            this.services.push(new Service("", null, null));
            this.Employees.push(new Employee("", [""], this.worktime, this.services));
            //this.Employees = res.data.employees;
            console.log(JSON.stringify(this.Employees));
            this.addRemoveEmployeee(true);
            this.initElements();
        }
    };
    //Server functions
    Step2Component.prototype.onServerItemSelect = function (item) {
        // console.log(item);
    };
    Step2Component.prototype.onServerSelectAll = function (items) {
        console.log(items);
    };
    //days functions
    Step2Component.prototype.onDaysItemSelect = function (item) {
        console.log(item);
    };
    Step2Component.prototype.onDaysSelectAll = function (items) {
        console.log(items);
    };
    //Services function
    Step2Component.prototype.onSubServicesItemSelect = function (item) {
        console.log(item);
    };
    Step2Component.prototype.onSubServicesSelectAll = function (items) {
        console.log(items);
    };
    tslib_1.__decorate([
        Output()
    ], Step2Component.prototype, "setter", void 0);
    tslib_1.__decorate([
        Input('isUpdateMode')
    ], Step2Component.prototype, "isUpdateMode", void 0);
    tslib_1.__decorate([
        ViewChild('scrollMe', { static: false })
    ], Step2Component.prototype, "myScrollContainer", void 0);
    Step2Component = tslib_1.__decorate([
        Component({
            selector: 'app-step2',
            templateUrl: './step2.component.html',
            styleUrls: ['./step2.component.scss']
        })
    ], Step2Component);
    return Step2Component;
}());
export { Step2Component };
//# sourceMappingURL=step2.component.js.map