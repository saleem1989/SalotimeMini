import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from "../helpers/auth/authentication.service"
import {FormBuilder,  FormGroup, Validators, FormControl } from '@angular/forms';
import { CarouselComponent, ModalDirective, ToastService, MDBModalService } from 'ng-uikit-pro-standard';
import { LoginInfoComponent } from '../login-info/login-info.component';
import { StaticObjectsService } from '../helpers/global/static-objects.service';
import { TranslateService } from '@ngx-translate/core';


declare var FirebasePlugin;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

//declare var navigator: any;

export class LoginComponent implements OnInit {




  @ViewChild("myinput",{static:false}) myInputField: ElementRef;
  slides : string[] = [];
  loginForm: FormGroup;
  authForm: FormGroup;
  public code:any;
  isLoading: Boolean;
  isAMember : Boolean;
  expiresIn:Number;
  resendCodeIsAvailable:Boolean;
  public onDeviceReady : any;
  public onBackKeyDown : any;
  private fcmToken: any;
  private appIsntanceId : any;
  private fcmTokenRefresh : any;
  private deviceType : string;
  public screenHeight: any;
  public curLang : any;
  public curVer : any;

  @ViewChild("test", {static: false}) testLabel: ElementRef;
  @ViewChild('pNumber', {static: false}) pNumber:ElementRef;

  @ViewChild('notExistModal',{static: false}) private notExistModal: ModalDirective;


  @ViewChild('carouselRef',{static: false}) public carouselRef: CarouselComponent;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastrService: ToastService ,
    private globalFunc: StaticObjectsService,
    private modalService: MDBModalService,
    private authObj: AuthenticationService,
    private translate: TranslateService
  ) {

    this.getScreenSize();
   }



  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    if(!this.screenHeight)
    {
        this.screenHeight = screen.height + "px";
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.globalFunc.changeCssFile(language);
    this.globalFunc.clearsCategories();
    this.globalFunc.setCategories();
    localStorage.setItem('Lang', language);
    this.curLang = language;
    this.loadScripts(language);
}


      // Method to dynamically load JavaScript 
      loadScripts(lang) { 
        let element  = document.getElementById("mapsGoogleApi");
        if(element)
        {
          element.parentNode.removeChild(element);
        }
        const script = document.createElement('script'); 
        script.id="mapsGoogleApi";
        script.src = 'https://maps.googleapis.com/maps/api/js?radius=50&language=' + lang + '&key=AIzaSyBy53hKpD250Cn_IkQHyP9Lt2Ysv_8oxH0&libraries=places'; 
        document.getElementsByTagName('head')[0].appendChild(script); 
   } 



   startCountdown(seconds) {
    let counter = seconds;
      
    const interval = setInterval(() => {
      console.log(counter);
      counter--;
        
      this.expiresIn = counter;

      if (counter <= 0 ) {
        clearInterval(interval);
      }
    }, 1000);
  }
  ngOnInit() {
   new WOW().init();
   this.slides.push("Login");
   this.slides.push("SignUp");
   this.isAMember = false;
   this.expiresIn = 60;
   this.resendCodeIsAvailable = true;
   this.curLang = "He";
   this.curVer = localStorage.getItem("version");
   this.curVer = this.curVer  ? (this.curVer + 'v')  : '';

    this.loginForm = this.formBuilder.group({
      phoneNum: ['', [Validators.required,Validators.minLength(8),Validators.pattern("^[0-9]*$")]],
      fullName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(20),Validators.pattern("^([a-zA-Z\-ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïòóôõöùúûüýÿ\u0590-\u05fe']{1,75} ?){2,5}$")]],
    });

    this.authForm = this.formBuilder.group({
      authcode: ['', [Validators.required,Validators.pattern("^[0-9]*$")]]
    });

    this.deviceType = this.globalFunc.getMobileOperatingSystem();

    if(this.deviceType !== "PC")
    {
        this.onDeviceReady = () => {  
          this.onBackKeyDown = () =>{

            navigator["app"].exitApp();
          }

          document.addEventListener("backbutton",this.onBackKeyDown, false);
        };
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }

  }


  get authF() { return this.authForm.controls; }

  get authcode(){
    return this.authForm.get('authcode');
  }

  
  test()
  {
    return new Promise((resolve, reject) => {
      FirebasePlugin.onNotification(function(data){
        if(data.wasTapped){
          //Notification was received on device tray and tapped by the user.
          alert( JSON.stringify(data) );
        }else{
          //Notification was received in foreground. Maybe the user needs to be notified.
          alert( JSON.stringify(data) );
        }
    });
  });
  }

  getToken()
  {
    return new Promise((resolve, reject) => {
     FirebasePlugin.getToken(function(fcmToken) {
      resolve(fcmToken);
      }, function(error) {
      reject("");
    });
  });
  }

  getTokenRefresh()
  {
   
    return new Promise((resolve, reject) => {
    FirebasePlugin.onTokenRefresh(function(fcmTokenRefresh) {
      resolve(fcmTokenRefresh);
        }, function(error) {
          reject("error");
      });
    });
  }


  getId()
  {
    return new Promise((resolve, reject) => {
      FirebasePlugin.getId(function(appIsntanceId) {
        resolve(appIsntanceId);
          }, function(error) {
            reject("error");
        });
      });
  }




  async   updateTokenAndAuthenticate(){

    this.getToken()
    .then(result => { 
      this.fcmToken = result; 
      this.getTokenRefresh().then(result => { 
        this.fcmTokenRefresh = result;

        this.getId().then(result => { 
          this.appIsntanceId = result;
          this.authenticate();
        });
      })   
    })

  }


  async onSubmit() {

    if (this.authForm.invalid) {
      return;
    }

  debugger;
    
        if(this.deviceType !== "PC")
        {
        await  this.updateTokenAndAuthenticate();

        }
        else
        {
            this.authenticate();
        }
  }

  authenticate()
  {
    debugger;
    this.isLoading = true;
    let phone = localStorage.getItem('phone');
    let authCode = this.authF.authcode.value;
    let curTime = new Date().getTime();
    let notification = {
      token: this.fcmToken,
      tokenRefresh: this.fcmTokenRefresh,
      appIsntanceId: this.appIsntanceId,
      deviceType:this.deviceType,
    }
    this.authenticationService.login(phone, authCode,curTime.toString(),JSON.stringify(notification))
      .pipe(first())
      .subscribe(
        data => {
        debugger;
          try
          {
          if(!data.isMatch)
          {
            this.toastrService.clear();

            const options = { positionClass: 'md-toast-top-center' , opacity: 0.9 , toastClass: 'mt-1 rtlTxt'  };
            
            this.toastrService.error(this.translate.instant('login.codeYouEnteredNotMatch'), this.translate.instant('login.verificationError'), options);

            this.isLoading = false;
            
            return;
          }

          let profileimg = `${data.host}${data.pathObj.profileimg}`;
          let profileimg40x40 = `${data.host}${data.pathObj.profileimg40x40}`;
          let profileimg100x100 = `${data.host}${data.pathObj.profileimg100x100}`;
          
     
          let InvitedToId = localStorage.getItem("InvitedToId");
          let InvitedToName = localStorage.getItem("InvitedToName");
          InvitedToName = InvitedToName ? InvitedToName.toLowerCase() : "home";
        

          try
          {
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser !== null) {
              localStorage.setItem('isHaveProfileImage', currentUser.user.isHaveProfileImage);
            }
          }catch{}
         
          
          localStorage.setItem('pathImg',profileimg);
          localStorage.setItem('pathImg40x40',profileimg40x40);
          localStorage.setItem('profileimg100x100',profileimg100x100);



            this.router.navigate(["/home"]);
          
        }
        catch(ex)
        {
          alert(ex.message);
        }
         
        },
        error => {
          //this.alertService.error(error);
          this.isLoading = false;
        });

  }

  NextElementOnEnter(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if ( (code==13) || (code==10))
        {
          this.pNumber.nativeElement.focus()         
        }
    
  }

  submtOnEnter(e,isRegisterPage) {
  var code = (e.keyCode ? e.keyCode : e.which);
          if((code==13) || (code==10))
          {
            isRegisterPage ? this.onSubmit() : this.sentCode();      
          }
  
  }

  resendCode()
  {
    this.sentCode(true);
  }

  logIn()
  {
     
    this.isAMember = true;
    this.loginForm.controls["fullName"].setErrors(null);

  };

  signUp(){
    this.isAMember = false;
    this.loginForm.controls["fullName"].setErrors({'incorrect': true});
  };

  get phoneNum(){
    return this.loginForm.get('phoneNum');
  }

  get fullName(){
    return this.loginForm.get('fullName');
  }


  get f() { return this.loginForm.controls; }

  public sentCode(isResend = false): void {
    debugger;
          this.testLabel.nativeElement.click();
    // stop here if form is invalid
   if (this.loginForm.invalid) {
      return;
    }

   const phone =   this.f.phoneNum.value;
   const fName = this.f.fullName.value;
   const lang = this.globalFunc.getUserLang();
   let curVersion =  localStorage.getItem("version");
   let downloadBy = localStorage.getItem("downloadBy");
   downloadBy = downloadBy ? downloadBy : "";
   curVersion = curVersion ? curVersion : "";

    this.isLoading = true;
 

    this.authenticationService.authPhone(phone,fName,this.isAMember,lang,downloadBy,curVersion,isResend)
      .pipe(first())
      .subscribe(
        data => {
          if(this.isAMember && data.userIsNotExist)
          {
            this.notExistModal.show();
            this.isLoading = false;
            return;
          }

 
          localStorage.setItem('phone', phone);
          localStorage.setItem('uid', data.uid);

          if(data.fName)
          {
            localStorage.setItem('fName', data.fName);
          }
    
   
          this.code = data.phoneToken;

          if(!isResend)
          {
            this.carouselRef.nextSlide();

            setTimeout(() => {
              this.isLoading = false;

              this.myInputField.nativeElement.focus();
              //saleem:todo expire code 
              //this.startCountdown(this.expiresIn );
            }, 200);
          }
          else
          {
            this.isLoading = false;
            this.resendCodeIsAvailable = false;
            this.toastrService.clear();
            const options = { positionClass: 'md-toast-top-center' , opacity: 0.9 , toastClass: 'mt-1 rtlTxt'  };
            this.toastrService.success(this.translate.instant('login.aVerificationCodeHasBeenSentAgain'), this.translate.instant('login.verificationCode'), options);
          }

    
        },
        error => {
          alert(error.error.message);
        });

  }

  public goToMain():void {

  }




}
