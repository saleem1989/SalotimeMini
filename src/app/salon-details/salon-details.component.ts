
import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { SalonModel } from 'src/app/models/open-salon/salon-model';
import { Employee } from 'src/app/models/open-salon/employee';
import { WorkTime } from 'src/app/models/open-salon/work-time';
import { MdbStepperComponent, MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard'
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { AddressComponent } from 'ngx-google-places-autocomplete/objects/addressComponent';
import { Service } from 'src/app/models/open-salon/service';
import { DayList } from 'src/app/models/open-salon/day-list';
import { ServerList } from 'src/app/models/open-salon/server-list';
import { SubServerList } from 'src/app/models/open-salon/sub-server-list';
import { openHoursValidation, breakTimesValidation, restTimeValidation } from 'src/app/shared/timesFrom.validator';
import { ApiOpensalonService } from 'src/app/api/api-opensalon.service';
import { ApiEmployeesPhotosService } from 'src/app/api/api-employeesphotos.services';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { LoginInfoComponent } from 'src/app/login-info/login-info.component';
import { TranslateService } from '@ngx-translate/core';
import { StaticObjectsService } from 'src/app/helpers/global/static-objects.service'
import { NgxImageCompressService } from 'ngx-image-compress';
import { profile } from '../models/open-salon/profile';
import { ApiConfigService } from '../api/api-config.service';
import { DataService } from '../shared/data.service';
import { CropperImageComponent } from '../cropper-image/cropper-image.component';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { ImageComponent } from '../image/image.component';
import { ImageHandler } from '../helpers/global/ImageHandler';







@Component({
  selector: 'app-salon-details',
  templateUrl: './salon-details.component.html',
  styleUrls: ['./salon-details.component.scss']
})
export class SalonDetailsComponent implements OnInit, OnDestroy {
  public SalonModel: SalonModel;
  public locationIsValid: boolean;
  public numberOfEmployee: number;
  public numberOfServices: number;
  public Employees: Employee[] = [];
  public worktime: WorkTime[] = [];
  public services: Service[] = [];
  public daysList: DayList[] = [];
  public serverList: ServerList[] = [];
  public subServerList: SubServerList[] = [];
  public sModel: SalonModel;
  public selectedValues: any;
  public imagePreview: string;
  public lat: number;
  public lon: number;
  public city_long_name: string;
  public city_short_name: string;
  public thereAnyChanged = false;
  public isContainBreakTime = false;
  public isHasBreakAfter  = false
  public onBackKeyDown: any;
  public onDeviceReady: any;
  public galeryImagesLength : number;
  public host : any;
  public selected_EmployeeID : string;
  public selected_EmployeeIndex : any;
  public numOfEmpsAllowedtoAdd : any;
  public serviceNumber : any;
  public fileName1: string;
  public fileName2: string;
  public fileName3: string;
  public backButtonPointOpts: string[] = ['home', 'salon-panel'];
  modalRef: MDBModalRef;
  groupOptionsSelect: Array<any>;
  dynamicForm: FormGroup;
  worktimesFormArr: FormArray;
  subServersArr: FormArray;
  orderForm: FormGroup;
  isLoading = true;
  isUploading = false;
  issubServicesLoading = false;
  daysIsDuplicated: Boolean = false;
  serverIsDuplicated: Boolean = false;
  isHaveProfileImage : Boolean = false;
  compressedFile: File;
  fbInfoIsVisible: Boolean;
  instaInfoIsVisible : Boolean;
  step2: any = {};
  form: FormGroup;
  secondFormGroup: FormGroup;
  btnDateTimeLabel : any;

    //server List
    serverDropdownList = [];
    serverSelectedItems = [];
    serverDropdownSettings = {};
  
    //days List
    daysDropdownList = [];
    daysSelectedItems = [];
    daysDropdownSettings = {};
  
    //sub server List
    subServicesDropdownList = [];
    subServicesSelectedItems = [];
    subServicesDropdownSettings = {};

  @Input() backButtonPoint = ''; 
  @Input() headerName = '';
  @Input('isUpdateMode') isUpdateMode: string;
  @ViewChild('confirmationModal', { static: false }) modal: ModalDirective;
  @ViewChild('employeeListDialog', { static: false }) employeeListDialog: ModalDirective;
  @ViewChild('AcceptAppointmentInfoDialog', { static: false }) AcceptAppointmentInfoDialog: ModalDirective;
  @ViewChild('exceedMaxEmpDialog', { static: false }) exceedMaxEmpDialog: ModalDirective;

  @Output()
  setter: EventEmitter<MdbStepperComponent> = new EventEmitter();




  

  //Constructor
  constructor(private ref: ChangeDetectorRef, private modalCroperService: MDBModalService,
    private route: ActivatedRoute, private toastrService: ToastService,
    private fb: FormBuilder, private apiOpenSalon: ApiOpensalonService,
    private router: Router, private ng2ImgMax: Ng2ImgMaxService,
    private globalFunc: StaticObjectsService,
    private imageHandler: ImageHandler,
    private imageCompress: NgxImageCompressService,
    private apiConfig: ApiConfigService,
    private dataService: DataService,
    private translate: TranslateService) {

  }

  get salonName() {
    return this.secondFormGroup.get('salonName');
  }

  get salonPhoneNumber() {
    return this.secondFormGroup.get('salonPhoneNumber');
  }

  get whatsAppNumber() {
    return this.secondFormGroup.get('whatsAppNumber');
  }

  get fbLink() {
    return this.secondFormGroup.get('fbLink');
  }

  get instaLink() {
    return this.secondFormGroup.get('instaLink');
  }
  get location() {
    return this.secondFormGroup.get('location');
  }

  get isConfirmType() {
    return this.secondFormGroup.get('isConfirmType');
  }

  set isConfirmType(state) {
     this.secondFormGroup.get("isConfirmType").setValue(state);
  }


  changeConfirmTypeState(state)
  {
    this.thereAnyChanged = true;
    let checkboxState  = state.currentTarget.checked;
    this.isConfirmType = checkboxState;

    if(checkboxState)
    {
      this.AcceptAppointmentInfoDialog.show();
    }
  }


  breakTimeOrderIDArr: any = [1590,1605,1645,1655,1665,1675,1682,1686,1690,1694,1698,1702,1706,1590,1605,1645,1655,1665,1675,1682,1686,1690,1694,1698,1702,1706];

  resetTimeOrderTypeID: any = [10];

  openGalery() {
   // this.router.navigate(["/Image"]);

    this.modalRef = this.modalCroperService.show(ImageComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'h-100 m-0 m-auto',
      containerClass: 'h-100 m-0 m-auto',
      animated: true
    });
  }


  change() {
    this.thereAnyChanged = true;
  }

  locationChanged() {
    this.locationIsValid = false;
  }

  public onChange(address: Address) {
    this.thereAnyChanged = true;
    this.locationIsValid = true;
    this.secondFormGroup.get('location').patchValue(address.formatted_address);

    for (var i = 0; i < address.address_components.length; i++) {
      var addressType = address.address_components[i].types[0];
      if (addressType == "country") {
        this.city_long_name = address.address_components[i].long_name;
        this.city_short_name = address.address_components[i].short_name;
      }
    }

    this.lat = address.geometry.location.lat();
    this.lon = address.geometry.location.lng();
  }


  public getComponentByType(address: Address, type: string): AddressComponent {
    if (!type)
      return null;

    if (!address || !address.address_components || address.address_components.length == 0)
      return null;

    type = type.toLowerCase();

    for (let comp of address.address_components) {
      if (!comp.types || comp.types.length == 0)
        continue;

      if (comp.types.findIndex(x => x.toLowerCase() == type) > -1)
        return comp;
    }

    return null;
  }

  nextStep() {
    console.log(JSON.stringify(this.secondFormGroup.value));
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.secondFormGroup.controls;
    for (const name in controls.employees) {
        if (controls[name].invalid) {
          debugger;
            invalid.push(name);
        }
    }
    return invalid;
}


public findInvalidControlsRecursive(formToInvestigate:FormGroup|FormArray):string[] {
  var invalidControls:string[] = [];
  let recursiveFunc = (form:FormGroup|FormArray) => {
    Object.keys(form.controls).forEach(field => { 
      const control = form.get(field);
      if (control.invalid) invalidControls.push(field);
      if (control instanceof FormGroup) {
        recursiveFunc(control);
      } else if (control instanceof FormArray) {
        recursiveFunc(control);
      }        
    });
  }
  recursiveFunc(formToInvestigate);
  return invalidControls;
}

  onSubmit() {


    this.secondFormGroup.markAsTouched();
    var obj = this.secondFormGroup.value;
    this.isHaveProfileImage = localStorage.getItem("isHaveProfileImage") == 'true';

    if (this.secondFormGroup.invalid || !this.locationIsValid ||(!this.isHaveProfileImage && !this.isUpdateMode)) {
      this.secondFormGroup.markAllAsTouched();
      if(!this.isHaveProfileImage && !this.isUpdateMode)
      {
        this.scrollToTop();
      }
      else
      {
       this.scrollToError();
      }
      this.showError();
      if(this.numberOfEmployee > 0)
      {
          let invalidObj = this.findInvalidControlsRecursive(this.secondFormGroup);
          let employeeIndex = invalidObj.indexOf("employees");
          if(employeeIndex != -1)
          {
            let invalidEmployeeIndex = invalidObj[employeeIndex + 1];
            let element:HTMLElement = document.getElementById('employee_' + invalidEmployeeIndex) as HTMLElement;
            element.click();
          }
      }
  
      return;
    }

   
    this.isLoading = true;

    if (this.lon && this.lat) {
      obj.address = { location: obj.location, lat: this.lat, lon: this.lon, city_long_name: this.city_long_name, city_short_name: this.city_short_name };

      obj.coordinators = {
        type: "Point",
        coordinates: [this.lon, this.lat]
      }
    }


    this.apiOpenSalon.register(obj).subscribe(
      res => {

        //user was set as admin , store the new token in localstorage
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        currentUser.refreshToken = res.refreshToken;
        currentUser.token = res.token;
        localStorage.setItem("salonName",obj.salonName);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.router.navigate(["/salon-panel"]);

      },
      err => {
        alert("fail!");
      }
    );

  }




  scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  scrollToError(): void {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]');
    this.scrollTo(firstElementWithError);
  }

  scrollToBottom(): void {
    window.scroll({ 
      top: document.body.scrollHeight, 
      left: 0, 
      behavior: 'smooth' 
      });
  }

  scrollToTop(): void {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
      });
  }


  addRowWorkTimes(i: number) {
    this.daysList = [];
    this.Employees[i].workTimeObj.push(new WorkTime(this.daysList, "", "", "", ""));
    this.addItem(i);
  }

  removeRowWorkTimes(i: number, j: number) {
    var openingHours: FormArray;
    openingHours = this.t.at(i).get('workTimeObj') as FormArray;
    openingHours.removeAt(j);

    this.Employees[i].workTimeObj.splice(j, 1);
  }

  initEmptyServices() {
    return new Service(null, undefined, undefined, 
      undefined, undefined, undefined, undefined, undefined,undefined,undefined,undefined);
  } 


  addSubService(i: number) {
    this.addItem2(i);
    this.numberOfServices++;
    this.Employees[i].subServersObj.push(this.initEmptyServices());

  }
  

  removeSubService(i: number, j: number) {
    this.numberOfServices--;
    var openingHours: FormArray;
    openingHours = this.t.at(i).get('subServersObj') as FormArray;
    openingHours.removeAt(j);
    this.Employees[i].subServersObj.splice(j, 1);
  }

  addEmployee() {
    if((this.numberOfEmployee + 1) > this.numOfEmpsAllowedtoAdd)
    {
      this.exceedMaxEmpDialog.show();
      return;
    }
    let mongoID = this.globalFunc.mongoObjectId();
    this.thereAnyChanged = true;
    this.numberOfEmployee++;
    this.worktime = [];
    this.daysList = [];
    this.services = [];
    this.subServerList = [];
    this.worktime.push(new WorkTime(this.daysList, "", "", "", ""));
    this.services.push(this.initEmptyServices());
    this.Employees.push(new Employee("", [""], this.worktime, this.services,mongoID,""));
    this.addRemoveEmployeee(true);
    this.selected_EmployeeID = mongoID;
    this.selected_EmployeeIndex = this.numberOfEmployee - 1;
  }

  removeEmployee(index: number) {
    this.thereAnyChanged = true;
    this.numberOfEmployee--;
    this.addRemoveEmployeee();
  }

  submitEmployee() {
    console.log(this.Employees);
  }


  ngOnDestroy(): void {
    if (this.onBackKeyDown) {
      document.removeEventListener("backbutton", this.onBackKeyDown, false);
    }
    if (this.onDeviceReady) {
      document.removeEventListener('deviceready', this.onDeviceReady, false);
    }
  }


  get employeeName() {
    return this.t.at(0).get('employeeName');
  }


  get f() { return this.secondFormGroup.controls; }
  get t() { return this.f.employees as FormArray; }



  addNewEmployee() {
    this.thereAnyChanged = true;
    if (this.t.length < this.numberOfEmployee) {
      for (let i = this.t.length; i < this.numberOfEmployee; i++) {
        this.t.push(this.fb.group({
          employeeName: ['', Validators.required],
          servers: ['', Validators.required],
          serversDisplayName: [''],
          workTimeObj: this.createWorkTimeItem(this.Employees[i].workTimeObj),
          subServersObj: this.createServersItem(this.Employees[i].subServersObj),
        }));
      }
    }


  }

  selectEmployee(empID : string,index : any)
  {
    //if it's already selected then no need to referesh again
    if( empID == this.selected_EmployeeID ) return;

   this.selected_EmployeeID  = empID;
   this.selected_EmployeeIndex = index;
   this.t.at(index).get('servers').updateValueAndValidity();
  }

   makeMdbSelectDisabled(indexI: number,isDisabled : boolean) {

   let serviceSection = this.t.at(indexI).get('subServersObj') as FormArray;
  
    if(isDisabled)
    {
        for (let j = 0; j < serviceSection.length; j++) {
        serviceSection.at(j).get('subServicesDp').disable();
        serviceSection.at(j).get('subServiceTime').disable();
        serviceSection.at(j).get('subServicePrice').disable();
        }
    }
    else
    {
        for (let j = 0; j < serviceSection.length; j++) {
          serviceSection.at(j).get('subServicesDp').enable();
          serviceSection.at(j).get('subServiceTime').enable();
          serviceSection.at(j).get('subServicePrice').enable();
        }
    }
  }

  addRemoveEmployeee(isNewEmployee: Boolean = false) {
    let servercies = [];
    if (this.t.length < this.numberOfEmployee) {
      for (let i = this.t.length; i < this.numberOfEmployee; i++) {
        this.t.push(this.fb.group({
          _id:[this.Employees[i]._id],
          employeeName: [this.Employees[i].employeeName, Validators.required],
          profile:[this.Employees[i].profile],
          servers: [this.Employees[i].servers, Validators.required],
          serversDisplayName: [this.Employees[i].serversDisplayName],
          workTimeObj: this.createWorkTimeItem(this.Employees[i].workTimeObj),
          subServersObj: this.createServersItem(this.Employees[i].subServersObj),
        }));
        
        this.refreshEmployeesProfile(i);
        this.selected_EmployeeID = this.Employees[0]._id;
        this.t.at(i).get('servers').valueChanges.subscribe(val => {

          this.thereAnyChanged = true;
          if (val && val.length > 0 && String(val) != '') {
            this.makeMdbSelectDisabled(i,false);
            this.loadSubCategories(val);
   
            let sDL = this.serverDropdownList;
            let sDN = [];
      
            for (let i = 0; i < val.length; i++) {
              let label = sDL.find(x=>x.value == (parseInt(val[i]))).label;
              sDN.push(label);
            }
            this.t.at(i).get('serversDisplayName').patchValue(sDN);
          }
          else {
            this.groupOptionsSelect = [{}];
            this.t.at(i).get('serversDisplayName').patchValue([{}]);
            this.makeMdbSelectDisabled(i,true);
          }
        })
      }
 
      if(!isNewEmployee)
      {
        if (this.Employees[0] && this.Employees[0].servers.length > 0) {
          
            if(servercies.indexOf(this.Employees[0].servers[0]) == -1)
            {
              servercies.push(this.Employees[0].servers);
            }
        }

        this.loadSubCategories(servercies);
      }
      else
      {
        this.groupOptionsSelect = null;
        this.makeMdbSelectDisabled(this.numberOfEmployee-1,true);
      }
    } else {
      for (let i = this.t.length; i >= this.numberOfEmployee; i--) {
        this.t.removeAt(i);
      }
    }

    var worktimesFA: FormArray;
    var subServersObjArr: FormArray;
    var orderID: number;
    var ssObj: any;
    var typeID : number;
    var isContainAtLeastOneBT = false;

    for (let i = 0; i < this.t.length; i++) {
      worktimesFA = this.t.at(i).get('workTimeObj') as FormArray;
      this.worktimesFormArr = worktimesFA;
      for (let j = 0; j < worktimesFA.length; j++) {
        this.workTimesSubscribe(j);
      }

      subServersObjArr = this.t.at(i).get('subServersObj') as FormArray;
      this.subServersArr = subServersObjArr;
      for (let j = 0; j < subServersObjArr.length; j++) {
        ssObj = this.Employees[i].subServersObj[j];
        orderID = parseInt(ssObj.orderID);
        typeID = parseInt(ssObj.typeID);
        ssObj.isContainBreakTime = this.breakTimeOrderIDArr.indexOf(orderID) != -1;
        ssObj.isContainResetTime = this.resetTimeOrderTypeID.indexOf(typeID) != -1;
        if (ssObj.isContainBreakTime) {
          isContainAtLeastOneBT = true;
        }
        this.subServersSubScribe(j);
      }
      this.isContainBreakTime = isContainAtLeastOneBT;
      isContainAtLeastOneBT = false;
    }

  }


  createServersItem(subCategoriesList: Service[]): FormArray {

    var serverItems = new FormArray([]);
    for (var i = 0; i < subCategoriesList.length; i++) {
      serverItems.push(this.fb.group({
        typeID: [subCategoriesList[i].typeID],
        orderID: [subCategoriesList[i].orderID],
        subServicesDp: [subCategoriesList[i].subServicesDp, Validators.required],
        subServiceTime: [subCategoriesList[i].subServiceTime, [Validators.required, Validators.pattern("^[0-9]*$"),Validators.min(1),  Validators.maxLength(3)]],
        subServicePrice: [subCategoriesList[i].subServicePrice, [Validators.pattern("^[0-9]*$"),Validators.min(1), Validators.maxLength(4)]],
        breakTimeFrom: [subCategoriesList[i].breakTimeFrom, [Validators.pattern("^[0-9]*$"),Validators.min(1), Validators.maxLength(3)]],
        breakTimeAt: [subCategoriesList[i].breakTimeAt, [Validators.pattern("^[0-9]*$"),Validators.min(1), Validators.maxLength(3)]],
        resetTime: [subCategoriesList[i].resetTime, [Validators.pattern("^[0-9]*$"),Validators.min(0), Validators.maxLength(3)]],
        additionalInfo: [subCategoriesList[i].additionalInfo, Validators.maxLength(500)],
      }));
    }
    return serverItems;
  }

  createSingleServerItem(): FormGroup {
    return this.fb.group({
      typeID: [''],
      orderID: [''],
      subServicesDp: ['', Validators.required],
      subServiceTime: ['', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.min(1), Validators.maxLength(3)]],
      subServicePrice: ['', [Validators.pattern("^[0-9]*$"),Validators.min(1), Validators.maxLength(4)]],
      breakTimeFrom: ['', [Validators.pattern("^[0-9]*$"),Validators.min(1), Validators.maxLength(3)]],
      breakTimeAt: ['', [Validators.pattern("^[0-9]*$"),Validators.min(1), Validators.maxLength(3)]],
      resetTime:  ['', [Validators.pattern("^[0-9]*$"),Validators.min(0), Validators.maxLength(3)]],
      additionalInfo: ['',Validators.maxLength(500)]
    });
  }


  createWorkTimeItem(workTimes: WorkTime[]): FormArray {
    var wTimes = new FormArray([]);
    for (var i = 0; i < workTimes.length; i++) {
      wTimes.push(this.fb.group({
        daysDropDown: [workTimes[i].daysDropDown, Validators.required],
        from: [workTimes[i].from, Validators.required],
        at: [workTimes[i].at, Validators.required],
        restTimeFrom: [workTimes[i].restTimeFrom],
        restTimeAt: [workTimes[i].restTimeAt]
      }));
    }
    return wTimes;
  }

  createSingleWorkItem(): FormGroup {
    return this.fb.group({
      daysDropDown: ['', Validators.required],
      from: ['', Validators.required],
      at: ['', Validators.required],
      restTimeFrom: [''],
      restTimeAt: ['']
    });
  }



  onOpenHourChanged(i: number, j: number) {
    this.thereAnyChanged = true;
    var openingHours: FormArray;
    openingHours = this.t.at(i).get('workTimeObj') as FormArray;
    openingHours.at(j).get('from').updateValueAndValidity();
    openingHours.at(j).get('at').updateValueAndValidity();
    openingHours.at(j).get('restTimeFrom').updateValueAndValidity();
    openingHours.at(j).get('restTimeAt').updateValueAndValidity();
  }

  addItem(i: number): void {
    this.thereAnyChanged = true;
    this.worktimesFormArr = this.t.at(i).get('workTimeObj') as FormArray;
    this.worktimesFormArr.push(this.createSingleWorkItem());
    let j = this.worktimesFormArr.length - 1;
    this.workTimesSubscribe(j);
  }

  workTimesSubscribe(j: number) {
    this.worktimesFormArr.at(j).get('from').valueChanges.subscribe(val => {
      debugger;
      console.log("test111");
      this.thereAnyChanged = true;
      let tObj  = this.t.at(this.selected_EmployeeIndex).get('workTimeObj') as FormArray;
      tObj.at(j).get('from').setValidators(Validators.compose([Validators.required, openHoursValidation(tObj.at(j).get('from').value, tObj.at(j).get('at').value)]));
      tObj.at(j).get('from').updateValueAndValidity({ emitEvent: false });
      tObj.at(j).get('at').setValidators(Validators.compose([Validators.required, openHoursValidation(tObj.at(j).get('from').value, tObj.at(j).get('at').value)]));
      tObj.at(j).get('at').updateValueAndValidity({ emitEvent: false });
    })


    this.worktimesFormArr.at(j).get('at').valueChanges.subscribe(val => {
      this.thereAnyChanged = true;
      let tObj  = this.t.at(this.selected_EmployeeIndex).get('workTimeObj') as FormArray;
      tObj.at(j).get('from').setValidators(Validators.compose([Validators.required, openHoursValidation(tObj.at(j).get('from').value, tObj.at(j).get('at').value)]));
      tObj.at(j).get('from').updateValueAndValidity({ emitEvent: false });
      tObj.at(j).get('at').setValidators(Validators.compose([Validators.required, openHoursValidation(tObj.at(j).get('from').value, tObj.at(j).get('at').value)]));
      tObj.at(j).get('at').updateValueAndValidity({ emitEvent: false });
    })

    this.worktimesFormArr.at(j).get('restTimeFrom').valueChanges.subscribe(val => {
      this.thereAnyChanged = true;
      this.restTimeValidation(j);
    })

    this.worktimesFormArr.at(j).get('restTimeAt').valueChanges.subscribe(val => {
      this.thereAnyChanged = true;
      this.restTimeValidation(j);
    })
  }


  restTimeValidation(j: number) {
    this.worktimesFormArr.at(j).get('restTimeAt').setValidators(Validators.compose([restTimeValidation(this.worktimesFormArr.at(j).get('restTimeFrom').value,
      this.worktimesFormArr.at(j).get('restTimeAt').value, this.worktimesFormArr.at(j).get('from').value, this.worktimesFormArr.at(j).get('at').value)]));
    this.worktimesFormArr.at(j).get('restTimeFrom').setValidators(Validators.compose([restTimeValidation(this.worktimesFormArr.at(j).get('restTimeFrom').value,
      this.worktimesFormArr.at(j).get('restTimeAt').value, this.worktimesFormArr.at(j).get('from').value, this.worktimesFormArr.at(j).get('at').value)]));
    this.worktimesFormArr.at(j).get('restTimeFrom').updateValueAndValidity({ emitEvent: false });
    this.worktimesFormArr.at(j).get('restTimeAt').updateValueAndValidity({ emitEvent: false });
  }




  addItem2(i: number): void {
    this.thereAnyChanged = true;
    this.subServersArr = this.t.at(i).get('subServersObj') as FormArray;
    this.subServersArr.push(this.createSingleServerItem());
    let j = this.subServersArr.length - 1;
    this.subServersSubScribe(j);

  }

  subServersSubScribe(j: number) {
    this.subServersArr.at(j).get('subServicesDp').valueChanges.subscribe(val => {
      this.subServersArr.at(j).get('subServicesDp').setValidators(Validators.compose([Validators.required]));
      this.subServersArr.at(j).get('subServicesDp').updateValueAndValidity({ emitEvent: false });
    })

    this.subServersArr.at(j).get('resetTime').valueChanges.subscribe(val => {
      this.thereAnyChanged = true;
      this.resetTimeValidator(j);
    })

    this.subServersArr.at(j).get('breakTimeFrom').valueChanges.subscribe(val => {
      this.thereAnyChanged = true;
      this.breakTimeValidator(j);
    })

    this.subServersArr.at(j).get('breakTimeAt').valueChanges.subscribe(val => {
      this.thereAnyChanged = true;
      this.breakTimeValidator(j);
    })

    this.subServersArr.at(j).get('subServiceTime').valueChanges.subscribe(val => {
      this.thereAnyChanged = true;
      this.breakTimeValidator(j);
    })
  }

  resetTimeValidator(j: number) {
  }

  breakTimeValidator(j: number) {
    this.subServersArr.at(j).get('breakTimeFrom').setValidators(Validators.compose([breakTimesValidation(this.subServersArr.at(j).get('breakTimeFrom').value,
      this.subServersArr.at(j).get('breakTimeAt').value, this.subServersArr.at(j).get('subServiceTime').value)]));
    this.subServersArr.at(j).get('breakTimeAt').setValidators(Validators.compose([breakTimesValidation(this.subServersArr.at(j).get('breakTimeFrom').value,
      this.subServersArr.at(j).get('breakTimeAt').value, this.subServersArr.at(j).get('subServiceTime').value)]));
    this.subServersArr.at(j).get('breakTimeFrom').updateValueAndValidity({ emitEvent: false });
    this.subServersArr.at(j).get('breakTimeAt').updateValueAndValidity({ emitEvent: false });
    
  }

  loadSubCategories(typeID: any) {
    this.issubServicesLoading = true;
    let defLang = this.translate.defaultLang;
    let curLang = this.translate.currentLang;
    curLang = curLang ? curLang : defLang;
    this.apiOpenSalon.getSubCategory(typeID, curLang)
      .subscribe(
        res => {
          debugger;
          this.groupOptionsSelect = res.data;
          this.issubServicesLoading = false;
        },

        err => {
        }
      );

  }


  loadData() {
    this.apiOpenSalon.getSalonPanel("-1")
      .subscribe(
        res => {
          this.secondFormGroup = this.fb.group({
            salonName: [res.data.salonName, [Validators.required, Validators.minLength(3)]],
            salonPhoneNumber: [res.data.salonPhoneNumber, [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]*$")]],
            whatsAppNumber:[res.data.whatsAppNumber, [Validators.minLength(6), Validators.pattern("^[0-9]*$")]],
            fbLink: [res.data.fbLink, [Validators.pattern("^.*(?:facebook\.com/[a-zA-Z0-9.]).*$")]],
            instaLink: [res.data.instaLink, [Validators.pattern("^.*(?:instagram\.com).*$")]],
            location: [res.data.address.location, [Validators.required]],
            employees: new FormArray([]),
            isConfirmType:[res.data.isConfirmType],
            
          });

          if(!res.data.fbLink)
          {
             this.fbInfoIsVisible = true;
          }

          if(!res.data.instaLink)
          {
             this.instaInfoIsVisible = true;
          }
          
          if(res.data.numOfEmpsAllowedtoAdd)
          {
            this.numOfEmpsAllowedtoAdd = Number(res.data.numOfEmpsAllowedtoAdd);
          }

          this.numberOfServices = 1;        
          this.locationIsValid = true;
          this.serverList = [];
          this.Employees = res.data.employees;
          this.numberOfEmployee = res.data.employees.length;
          this.addRemoveEmployeee();
          this.initElements();

        },

        err => { }
      );
  }

  serviciesSearch(nameKey) {
    let arr = this.groupOptionsSelect;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].value === nameKey) {
        return arr[i];
      }
    }
  }

  subServiceTime_onChanged(i: number, j: any, value: any) {
    let subServicesDp =  (this.t.at(i).get('subServersObj') as FormArray).at(j).get('subServicesDp');
    this.onSubServicesDpChanged(i,j,subServicesDp.value);
  }

  onSubServicesDpChanged(i: number, j: any, value: any) {
    let obj = this.serviciesSearch(value);
    let sSObj = this.Employees[i].subServersObj;
    let isthisContainBreakTime = this.breakTimeOrderIDArr.indexOf(parseInt(obj.orderID)) != -1;
    let isContainResetTime = this.resetTimeOrderTypeID.indexOf(parseInt(obj.typeID)) != -1;

    sSObj[j].isContainBreakTime = isthisContainBreakTime;
    sSObj[j].isContainResetTime = isContainResetTime;
    this.isContainBreakTime = sSObj.filter(sSObj => sSObj.isContainBreakTime).length > 0;
    let subServerArr = this.t.at(i).get('subServersObj') as FormArray;
    let subServerArrCTRL = subServerArr.controls[j];
    subServerArrCTRL.get("typeID").setValue(obj.typeID);
    subServerArr.controls[j].get("orderID").setValue(obj.orderID);

    let subServerLength = subServerArr.length;
    let val_arr = [], val_arr_temp = [],time_arr = [];
    let dropDownElement;
    let hasError = false;
    let sSTime;
    var coords = [];
    
    for (let ind = 0; ind < subServerLength; ind++) {
      dropDownElement = (this.t.at(i).get('subServersObj') as FormArray).at(ind).get('subServicesDp');
      sSTime = (this.t.at(i).get('subServersObj') as FormArray).at(ind).get('subServiceTime');
      val_arr_temp = dropDownElement.value;
      val_arr = val_arr.concat(val_arr_temp + sSTime.value);
      
      if (this.hasDuplicates(val_arr)) {
        dropDownElement.setErrors({ 'incorrect': true });
        hasError = true;
        break;
      }
      else {
        dropDownElement.clearValidators();
        dropDownElement.updateValueAndValidity();
      }
    }


    if (hasError) {
      this.serverIsDuplicated = true;
    }
    else {
      this.serverIsDuplicated = false;
    }

  }



  onDaysIsChanged(i: number, j: any, value: any) {
    debugger;
    this.thereAnyChanged = true;
    let worktimesFormArr = this.t.at(0).get('workTimeObj') as FormArray;
    let worktimesFormArrLength = worktimesFormArr.length;
    let val_arr = [], val_arr_temp = [];
    let dropDownElement;
    let hasError = false;

    for (let ind = 0; ind < worktimesFormArrLength; ind++) {
      dropDownElement = (this.t.at(i).get('workTimeObj') as FormArray).at(ind).get('daysDropDown');
      val_arr_temp = dropDownElement.value;
      val_arr = val_arr.concat(val_arr_temp);

      if (this.hasDuplicates(val_arr)) {
        dropDownElement.setErrors({ 'incorrect': true });
        hasError = true;
        break;
      }
      else {
        dropDownElement.updateValueAndValidity();
      }
    }
    
    if (hasError) {
      this.daysIsDuplicated = true;
      this.showError();
    }
    else {
      this.daysIsDuplicated = false;
    }

  }


  showError() {
    let str = "";
    this.toastrService.clear();
    if (!this.locationIsValid) {
      str = this.translate.instant('updateSalon.salonAddressIsNotValid');
    }
    else if (this.daysIsDuplicated) {
      str = this.translate.instant('updateSalon.duplicateDaysDetected');
    }
    else if (this.serverIsDuplicated) {
      str = this.translate.instant('updateSalon.duplicateServerDetected');
    }
    else if (!this.isHaveProfileImage && !this.isUpdateMode) {
      str = this.translate.instant('updateSalon.profilePicIsRequired');
    }

    if (str) {
      const options = { positionClass: 'md-toast-top-center', opacity: 0.8, toastClass: 'mt-6' };
      this.toastrService.error(str, this.translate.instant('Common.Error'), options);
    }
  }

  hasDuplicates(array) {
    array = array.filter(function (el) { return el; });
    return (new Set(array)).size !== array.length;
  }



  initElements() {
    //server multiselect init
    this.serverDropdownList = [
      { value: '1', label: this.translate.instant('Services.permanentMakeup') },
      { value: '2', label: this.translate.instant('Services.Makeup') },
      { value: '3', label: this.translate.instant('Services.Eyebrows') },
      { value: '4', label: this.translate.instant('Services.Barber') },
      { value: '5', label: this.translate.instant('Services.eyelash') },
      { value: '6', label: this.translate.instant('Services.hairRemoval') },
      { value: '7', label: this.translate.instant('Services.cosmetics') },
      { value: '8', label: this.translate.instant('Services.nails') },
      { value: '9', label: this.translate.instant('Services.hairStyle') },
      { value: '10', label: this.translate.instant('Services.Massage') },
      { value: '11', label: this.translate.instant('Services.Aesthetics') }
    ];

    //days multiselect init
    this.daysDropdownList = [
      { value: "Sun", label: this.translate.instant('updateSalon.Days.Sun') },
      { value: "Mon", label: this.translate.instant('updateSalon.Days.Mon') },
      { value: "Tue", label: this.translate.instant('updateSalon.Days.Tue') },
      { value: "Wed", label: this.translate.instant('updateSalon.Days.Wed') },
      { value: "Thu", label: this.translate.instant('updateSalon.Days.Thu') },
      { value: "Fri", label: this.translate.instant('updateSalon.Days.Fri') },
      { value: "Sat", label: this.translate.instant('updateSalon.Days.Sat') }
    ];





    this.addRemoveEmployeee();


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



    this.daysSelectedItems = [

    ];

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


    this.modalCroperService.closed.subscribe(() => this.galeryImagesLength = Number(localStorage.getItem("salonImagesLength"))    );
    this.galeryImagesLength = Number(localStorage.getItem("salonImagesLength"));
    this.isLoading = false;
  }

  getDateNow()
  {
    return new Date().getTime();
  }

  
  onImagePicked(event: Event,empid : any): void {
    this.isLoading = true;
    
    this.employeeListDialog.hide();

    let file = (event.target as HTMLInputElement).files[0];

    this.imageHandler.openCropImage(file,empid, (res) => { this.cropperOnClose2(res) });

    this.isLoading = false;
    
  }


  cropperOnClose2(param)
  {

        let data = this.dataService.getData;

        if(data == "isEmployeesDialog")
        {   
          

            let res = JSON.parse(param);

            for(let i=0;i<this.Employees.length;i++)
            {    
              if(this.Employees[i]._id == res.empid)
              {
                let parm = '?' +  this.getDateNow();
                this.Employees[i].profile = new profile( res.profileimg + parm,res.profileimg40x40 + parm,res.profileimg100x100 + parm);
              }
            }
          

        }

        this.isLoading = false;  
    
  }


  
  initEmployee(): FormGroup {

    return this.fb.group({
      employeeName: ["", Validators.required],
      servers: ["", Validators.required],
      serversDisplayName: [''],
      workTimeObj: new FormArray([this.createSingleWorkItem()]),
      subServersObj: new FormArray([this.createSingleServerItem()]),
    });

  }


  uploadEmpProfile(empid : any  , file: File, file40x40: File, file100x100: File)
  {
    this.apiOpenSalon.setEmployeeProfile(empid,file, file40x40, file100x100)
      .subscribe(
        res => {

          if (res.message === "not allowed content") {

            this.isLoading = false;
            this.notAllowedContent();
            return;
          }
        

          for(let i=0;i<this.Employees.length;i++)
          {    
            if(this.Employees[i]._id == empid)
            {
              let parm = '?' +  this.getDateNow();
              this.Employees[i].profile = new profile( res.profileimg + parm,res.profileimg40x40 + parm,res.profileimg100x100 + parm);
              break;
            }
          }

          this.isUploading = false;

        })
  }

  notAllowedContent() {
    const options = { positionClass: 'md-toast-top-center', opacity: 0.8, toastClass: 'mt-5' };
    this.toastrService.error("Detect Not Allowed Content!.", 'ERROR', options);
  }


  navigateToBack() {
    this.modal.hide();
  
    this.route.queryParams.subscribe(params => {
      let url = this.backButtonPointOpts.indexOf(params.from) == -1 ? "/home" : "/" + params.from;
      setTimeout(() => {
        this.router.navigate([url]);
      }, 500);
    });
  }

  openInfo() {
    
    history.pushState(null, 'modalOpened');
 

    this.modalCroperService.show(LoginInfoComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'h-100',
      containerClass: 'h-100',
      animated: true
    });
  }
  
  GoToBottom()
  {

     setTimeout(() => {
       this.scrollToBottom();
     }, 500);
  }


  ngOnInit() {

    this.selected_EmployeeIndex = 0;
    this.host = localStorage.getItem('host');


    window.onpopstate = ()=> {
      this.modalCroperService.hide(1);
    };

    this.onDeviceReady = () => {
      this.onBackKeyDown = () => {
        if (this.thereAnyChanged) {
          this.modal.show();
        }
        else {
          this.navigateToBack();
        }
      }
      document.addEventListener("backbutton", this.onBackKeyDown, false);
    }
    document.addEventListener('deviceready', this.onDeviceReady, false);

    this.groupOptionsSelect = [{}];

    if (this.isUpdateMode == "true") {
      this.loadData();
    }
    else {

      if (!localStorage.getItem("openSalonIsVisited")) {
          this.openInfo();
         localStorage.setItem('openSalonIsVisited', "true");
       }


      this.secondFormGroup = this.fb.group({
        salonName: ["", [Validators.required, Validators.minLength(3)]],
        salonPhoneNumber: ["", [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]*$")]],
        whatsAppNumber: ["", [Validators.minLength(6), Validators.pattern("^[0-9]*$")]],
        fbLink: ["", [Validators.pattern("^.*(?:facebook\.com/[a-zA-Z0-9.]).*$")]],
        instaLink: ["", [Validators.pattern("^.*(?:instagram\.com).*$")]],
        location: ["", [Validators.required]],
        employees: new FormArray([]),
        isConfirmType: false
      });


      let mongoID = this.globalFunc.mongoObjectId();
      this.locationIsValid = true;
      this.worktime.push(new WorkTime(this.daysList, "", "", "", ""));
      this.services.push(this.initEmptyServices());
      this.Employees.push(new Employee("", [""], this.worktime, this.services,mongoID,""));

      this.instaInfoIsVisible = true;
      this.fbInfoIsVisible = true;
      this.numberOfEmployee = 1;

      this.initElements();
      this.makeMdbSelectDisabled(0,true);
    }

    this.btnDateTimeLabel = this.translate.instant('Common.update');

  }

  services_click(index : number)
  {
    let category = this.t.at(index).get('servers').value;

    if(category && String(category).trim().length == 0)
    {
      

      const options = { positionClass: 'md-toast-top-center', opacity: 1, toastClass: 'mt-3 text-center' , timeOut: 2000};
      this.toastrService.error(this.translate.instant('updateSalon.HaveToChooseProfessionFirst'),"", options);
    }
  
  }

  showCropperDialog(empid)
  {
    this.modalRef = this.modalCroperService.show(CropperImageComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'h-100 m-0',
      containerClass: 'h-100 m-0',
      animated: true
    });
  }

  refreshEmployeesProfile(i)
  {
    if(this.Employees[i].profile && this.Employees[i].profile.profileimg)
    {
        this.Employees[i].profile.profileimg = this.Employees[i].profile.profileimg.split('?')[0] + '?' + new Date().getTime();
        this.Employees[i].profile.profileimg40x40 = this.Employees[i].profile.profileimg40x40.split('?')[0] + '?' + new Date().getTime();
        this.Employees[i].profile.profileimg100x100 = this.Employees[i].profile.profileimg100x100.split('?')[0] + '?' + new Date().getTime();
    }
  }


  getServiceNumber()
  {
    this.isLoading = true;
    this.apiConfig.getServiceNumber()
    .subscribe(
      res => {  
        location.href = "https://wa.me/"+res.serviceNumber+"?text=";
        this.isLoading = false;
      },
      err => { }
    );
  }

  deleteEmployee(emp_index,emp_id)
  {
    this.thereAnyChanged = true;
    this.numberOfEmployee--;
    this.t.removeAt(emp_index);
    this.Employees.splice(emp_index,1);

    if(this.selected_EmployeeID  == emp_id)
    {
      this.selected_EmployeeID =  this.Employees[0]._id;
    }
  }


  Clear(id, i, j) {
    (this.t.at(i).get('workTimeObj') as FormArray).at(j).get(id).patchValue("");
  }


}

