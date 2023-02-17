import { Component, OnInit, ViewChild } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
import { ApiUserService } from "../api/api-user.service"
import { Category } from '../models/Home/category';
import { StaticObjectsService } from '../helpers/global/static-objects.service';
import { AuthenticationService } from '../helpers/auth/authentication.service';
import { ActivatedRoute, Router, ɵangular_packages_router_router_b } from '@angular/router';
import { MDBModalService, MDBModalRef, CarouselComponent, ModalDirective, SidenavComponent } from 'ng-uikit-pro-standard';
import { ModalComponent } from '../modal/modal.component';
import { ApiOpensalonService } from '../api/api-opensalon.service';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { apiMain } from '../api/api-main.service';
import { LoginInfoComponent } from '../login-info/login-info.component';
import { TranslateService } from '@ngx-translate/core';
import { ApiConfigService } from '../api/api-config.service';
import { BottomNavBarComponent } from '../bottom-nav-bar/bottom-nav-bar.component';


export interface Favorites {
  opensalonId: String,
  profileimg: String,
  location: String,
  rating: String,
  salonName: String,
  salonPhone: String,
  distance: String,
  address: any
}

export enum Tabs {
  recent,
  favorite,
  main
}

declare var FirebasePlugin;
declare var cordova: any;
declare var StatusBar: any;
var allSalons: any;
declare var window;
@Component({

  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public activeTab: string = "main";
  public favorites: Favorites[];
  public models: any;
  public recently: any;
  public categories: Category[] = [];
  public isAdmin: boolean;
  public iso : boolean;
  public profileImg;
  public smallProfileImg;
  public isLoading: Boolean = true;
  public isBottomLoading: Boolean = false;
  public currentLoc;
  public allowGeoRecall: boolean = true;
  public selectedID: number = -1;
  public myLocation: any = "";
  public photos:any = [];
  public host:any;
  public salonName:any;
  public curOp:any;
  public locationIsActive : boolean;
  public userNum : any;
  public isSearchTextFocus : boolean = false;
  public pageNumber : number;
  public scrollDistance : number;
  public isDebugMode : Boolean = false;

  @ViewChild('sidenav', { static: true }) sidenav: SidenavComponent;

  searchText: string;
  isStartingType : boolean = false;
  searchedSalons: any;
  closestSalons: any;
  timeOutVar: any;
  Gate: Boolean = false;
  typingTimer: any;
  doneTypingInterval: number = 600;
  modalRef: MDBModalRef;
  newNotificationCount : any ;
  public numberOfAllSalons : number;


  @ViewChild('carouselRef', { static: false }) private carouselRef: CarouselComponent;
  @ViewChild('msgLocationModal', { static: false }) private locationModal: ModalDirective;
  @ViewChild(BottomNavBarComponent, { static: false }) child: BottomNavBarComponent;
  @ViewChild('deleteModal', { static: false }) deleteModal: ModalDirective;
  

  constructor(private apiUser: ApiUserService,
    private router: Router,
    private route:ActivatedRoute,
    private staticObj: StaticObjectsService,
    private modalService: MDBModalService,
    private authObj: AuthenticationService,
    private ApiMain: apiMain,
    private apiConfig: ApiConfigService,
    private translate: TranslateService,
    private apiOpenSalon: ApiOpensalonService) { 
      
      route.params.subscribe(params => {
        if(params)
        {
        this.changeActiveTab(params.activeTab);
        }
    });

    }

    useLanguage(language: string) {
      this.translate.use(language);
      this.staticObj.changeCssFile(language);
      this.staticObj.clearsCategories();
      this.staticObj.setCategories();
      localStorage.setItem('Lang', language);
}


    onScroll() {
      if(this.numberOfAllSalons <= this.models.length) return;

      this.pageNumber +=1;
      this.getModelByCategories(this.selectedID,this.pageNumber);
    }

  public  changeActiveTab(activeTab): Boolean {
    this.activeTab = activeTab;
    if(activeTab == "Recent")
    {
        this.getRecently();
        return true;
    }
    else if(activeTab == "Favorite")
    {
        this.getFavorites();
        return true;
    }
    else if(activeTab == "home")
    {
        this.getModelByCategories(0);
        return true;
    }
    return false;
  }

  getProfleUrl() {
    return  `url('${this.profileImg})`;
  }

  onFavorites() {
    this.getFavorites();
  }

  showNavBar()
  {
    this.sidenav.show();
  }

  focusFunction()
  {
    if(this.curOp != "PC")
    {
     this.isSearchTextFocus = true;
    }
  }

  displayDeleteAccountModal()
{

  this.deleteModal.show();
}

  focusOutFunction()
  {
    if(this.curOp != "PC")
    {
      setTimeout(() => {
        this.isSearchTextFocus = false;
      }, 100);
    } 
  }

  navigateToCalendar() {

    let calendarParams = JSON.parse(localStorage.getItem("calendarParams"));

    if (calendarParams && calendarParams.minWH) {
      this.router.navigate(["/calendar", { minH: calendarParams.minWH, maxH: calendarParams.maxWH, mST: calendarParams.minST, from: 'home' }]);
    }
  }




  getModelByCategories(typeID: any,pageNumber = 1) {

    localStorage.setItem("lastTypeIDSelected",typeID);
    let lat= "";
    let lon = "";
     this.locationIsActive = true;

   if (!this.getCurLocation()) {
      this.locationIsActive = false;
     // this.locationModal.show();
    //  return;
    }
    else
    {

      lat = this.myLocation.lat;
      lon = this.myLocation.lon;
    }

    this.pageNumber = pageNumber; 
    this.activeTab = "Main";
    this.selectedID = typeID;
    if(pageNumber == 1)
    {
     this.isBottomLoading = true;
     this.numberOfAllSalons = 0;
    }
    this.apiOpenSalon.getSalonByTypeIDEx(typeID, lat, lon,this.locationIsActive,pageNumber,this.isDebugMode)
      .subscribe(
        res => {
          try
          {    
            this.scrollDistance = res.infiniteScrollDistance;  

            let data = res.data.filter(x=>x.blockedUsers.filter(y=>y.number == this.userNum).length == 0);
            if(pageNumber > 1)
            {
              this.models = this.models.concat(data); 
            }    
            else
            {
              this.numberOfAllSalons = res.numberOfRecords;;
              this.models =  data;
            }

            for(let i=0;i<this.models.length;i++)
            {
              this.models[i].profileimg100x100 = this.models[i].profileimg100x100.split('?')[0] + "?" +  new Date().getTime();
            }


          }
          catch(error)
          {
           this.models = res.data;
          }
          
          this.updateHoursAndDistance();

          if (this.router.url.toLocaleLowerCase().indexOf('favorite') > -1) {
            this.child.changeActiveTab("home");
            this.router.navigate(['/home']);
          }


          this.isBottomLoading = false;
          this.isLoading = false;

          console.log(res);
        },

        err => { }
      );
  }

  
  changeConfirmTypeState(state,id)
  {
    let checkboxState  = state.currentTarget.checked;
    this.changeVisiblity(checkboxState,id);
  }


  changeVisiblity(isVisible : boolean,userid : string)
  {
    this.apiOpenSalon.setVisibility(isVisible,userid).subscribe(
      res => {

      });
  }



  sendMail() {
    window.location.href = 'mailto:info@salotime.com';
  }


  updateHoursAndDistance()
  {
    let dayName = this.staticObj.getDayName();

    for (let i = 0; i < this.models.length; i++) {

     let workTimeObjLen = this.models[i].employees[0].workTimeObj.length;
     var Data;
     var isFound = false;
     for(let j=0;j<workTimeObjLen;j++)
     {
        Data = this.models[i].employees[0].workTimeObj[j].daysDropDown.indexOf(dayName); 
          var openHour;
          if(Data >= 0)
          {
          let from =  this.models[i].employees[0].workTimeObj[j].from;
          let at =this.models[i].employees[0].workTimeObj[j].at;
          openHour = from + "-" + at;
          isFound = true;

          break;
          }

     }
     this.models[i].openHour = isFound == false  ? this.translate.instant('Common.closed') : openHour;        
     this.models[i].distance = this.staticObj.getDistanceFromLatLonInKm(this.myLocation.lat, this.myLocation.lon, this.models[i].address.lat, this.models[i].address.lon);
    }
  }



  getFavorites() {
    /*if (!this.getCurLocation()) {
      this.requestPermission();
      this.locationModal.show();
      return;
    }*/

    this.getCurLocation();
    this.selectedID = -1;
    if (!this.favorites) {
      this.isBottomLoading = true;

      this.apiUser.getFavorites().subscribe(
        res => {
          this.models = res.data;
          this.favorites = res.data;
          this.isBottomLoading = false;
          this.models = res.data.filter(x=>x.blockedUsers.filter(y=>y.number == this.userNum).length == 0);
          
          if(this.myLocation)
          {
            this.locationIsActive = true;
            for (let i = 0; i < this.models.length; i++) {
              this.models[i].distance = this.staticObj.getDistanceFromLatLonInKm(this.myLocation.lat, this.myLocation.lon, this.models[i].address.lat, this.models[i].address.lon);
            }
          }
          else
          {
            this.locationIsActive = false;
          }

   

          this.isLoading = false;
        },
        err => { }
      );
    }
    else {
      this.models = this.favorites;
    }
  }



  getRecently() {

    /*if (!this.getCurLocation()) {
      this.requestPermission();
      this.locationModal.show();
      return;
    }*/
    this.getCurLocation();
    this.selectedID = -1;
    if (!this.recently) {
      this.isBottomLoading = true;
      this.apiUser.getRecently().subscribe(
        res => {
          debugger;
          this.recently = res.data;
          this.models = res.data;

          this.isBottomLoading = false;

        if(this.myLocation)
        {
          this.locationIsActive = true;
          for (let i = 0; i < this.models.length; i++) {
            this.models[i].distance = this.staticObj.getDistanceFromLatLonInKm(this.myLocation.lat, this.myLocation.lon, this.models[i].address.lat, this.models[i].address.lon);
          }
        }
        else
        {
          this.locationIsActive = false;
        }
        this.isLoading = false;
        },
        err => { }
      );
    }
    else {
      this.models = this.recently;
    }
  }

  // TODO : click on this so it would remove the selected favorite from the user
  toggleFavorites(opensalonId: String) {
    this.apiUser.toggleFavorites(opensalonId, true).subscribe(
      res => {
        this.favorites = res.data;
      },
      err => { }
    );
  }

  getCurLocationSuccess() {

  }

  curLocationError(modal: ModalDirective = null) {
    if (modal) {
      modal.show();
    }
  }

  getPermission(){
    this.locationModal.show();
    this.requestPermission();
  }
  openLocationSetting() {
    this.curOp = this.staticObj.getMobileOperatingSystem();
 
    if (cordova.plugins.settings) {
      if(this.curOp == "Android"  )
      {
      cordova.plugins.settings.open("application_details", function () { },
        function () {
          console.log('failed to open settings');
        }
      );
      }
      else
      {
      cordova.plugins.settings.open("application_details", function () { },
        function () {
          console.log('failed to open settings');
        }
      );
      }
    }
  }


  keyup(searchValue: string) {
    this.searchText = searchValue;
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.doneTyping(searchValue);
    }, this.doneTypingInterval);

  }

  keydown(searchValue: string) {
    if(!this.isStartingType)
    {
      this.closestSalons = this.models;
    }
    this.isStartingType = true;
    this.isBottomLoading = true;
    clearTimeout(this.typingTimer);
  }

  doneTyping(searchValue: string) {
    this.getSalonBySearch(searchValue);
  }

  getSalonBySearch(searchValue) {
    if (!searchValue) {
      this.isBottomLoading = false;
      this.isStartingType = false;
      //this.searchedSalons = this.closestSalons;
      this.models = this.closestSalons;
      return;
    }

    this.isBottomLoading = true;
    this.apiOpenSalon.salonSearch(searchValue).subscribe(
      res => {
       // this.searchedSalons = res.data;
        this.models = res.data;
        this.isBottomLoading = false;
        this.Gate = true;

        this.models = res.data.filter(x=>x.blockedUsers.filter(y=>y.number == this.userNum).length == 0);

        this.updateHoursAndDistance();

      },
      err => { }
    );
  }


  ngOnInit() {
    new WOW().init();
    this.isDebugMode = StaticObjectsService.isDebugMode;
    this.isAdmin = this.authObj.isAdmin();
    this.staticObj.defaultTheme();
    let jsonStr = localStorage.getItem("currentUser");
    let obj = JSON.parse(jsonStr);
    if(obj && obj.user)
    {
      this.userNum = obj.user.phone;
      this.iso = obj.user.iso === '61cda11b1ba0fde73c5863c4';
    }

debugger;
    this.categories = this.staticObj.getCategories();

    this.curOp = this.staticObj.getMobileOperatingSystem();


    if(this.isAdmin)
    {
      this.translate.get('Home.sideBar.MySalon').subscribe(()=>{
        this.salonName = localStorage.getItem("salonName");
        this.salonName = this.salonName  ? this.salonName : this.translate.instant('Home.sideBar.MySalon');
       })
    }

    

    this.activeTab = this.route.snapshot.paramMap.get('activeTab');
 
  

    let onDeviceReady = () => {

      this.requestPermission();

      if (this.curOp === "IOS") {     
        FirebasePlugin.grantPermission(function(hasPermission){ });
       }

       let isSalonOwner = this.authObj.isAdmin();

       if(!isSalonOwner && this.curOp !== "PC")
       {
        window.StatusBar.backgroundColorByHexString("#10B4FA");
       }

        this.ApiMain.getMainImages(isSalonOwner).subscribe(
          res => {
            this.host = res.url;

            this.newNotificationCount = res.newNotificationCount;
         

            for(let i=0;i<res.data.imagesInfo.length;i++)
            {
              this.photos.push({path:this.host +  res.data.imagesInfo[i].fileName,title:res.data.imagesInfo[i].title})
            }
             
            localStorage.setItem('host',this.host);

           let lastTypeIDSelected =  localStorage.getItem("lastTypeIDSelected");
           let lastTypeIDSelectedInNum = lastTypeIDSelected ? parseInt(lastTypeIDSelected) : 0;
          
           let boolval = this.changeActiveTab(this.activeTab);
       
           if(!boolval)
           {
            this.getModelByCategories(lastTypeIDSelectedInNum);
           }
           else
           {
            setTimeout(() => {
              this.isLoading = false;
            }, 200);
           }

          });
    };



    setTimeout(() => {
      if(this.carouselRef)
      {
        this.carouselRef.nextSlide();
      }
    }, 3000);

    debugger;

    this.profileImg = localStorage.getItem('profileimg100x100') + "?" + new Date().getTime();

    this.smallProfileImg = localStorage.getItem('pathImg40x40') + "?" + new Date().getTime();


    if (this.curOp === "PC") {
      onDeviceReady();
    }
    else {
      document.addEventListener('deviceready', onDeviceReady, false);
    }

  }


  openSearch() {

    /*if (!this.getCurLocation()) {
      this.requestPermission();
      this.locationModal.show();
      return;
    }*/

    this.modalRef = this.modalService.show(SearchDialogComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'fullH',
      containerClass: 'fullH',
      animated: true
    });
  }

  requestPermission() {
    this.staticObj.updateCurLocation(this.getCurLocationSuccess, this.curLocationError);
  }



  getCurLocation() {
    let curLoc = localStorage.getItem("myLocation")
    if (curLoc) {
      this.myLocation = JSON.parse(curLoc);
      return true;
    }
    else {
      return false;
    }
  }





  logout() {
    let curLoc = localStorage.getItem("myLocation");
    let Lang = localStorage.getItem("Lang");
    let fName = localStorage.getItem("fName");
    let version = localStorage.getItem("version");

    localStorage.clear();

    if (curLoc) {
      localStorage.setItem("myLocation", curLoc);
    }

    if(Lang)
    {
    localStorage.setItem("Lang", Lang);
    }

    if(version)
    {
      localStorage.setItem("version", version);
    }
    
    localStorage.setItem("fName", fName);

    this.router.navigate(['/login']);
  }

  inviteFriend() {
  
    this.shareWith();

    
  }

  shareWith()
  {
    let uid =  localStorage.getItem("uid");
    let lang =  this.staticObj.getUserLang();
    var Name = '';
    if(this.isAdmin)
    {
       Name ='salonpage'
    }
    

    this.apiConfig.getDeepLink(uid,lang,Name)
    .subscribe(
      res => {  
        this.isLoading = false;
       window["plugins"].socialsharing.share(res.title, null, null, res.deepLink);
      },
      err => { }
    );
  }


  ngAfterViewInit() {
    new WOW().init();
  }


  openInstruction() {
    window.open("https://support.google.com/chrome/answer/142065?hl=en", '_blank');
  }




}
