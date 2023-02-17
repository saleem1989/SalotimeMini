/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID, Renderer2, ViewChild, ViewEncapsulation, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
var ImageModalComponent = /** @class */ (function () {
    function ImageModalComponent(platformId, element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.opened = false;
        this.loading = false;
        this.showRepeat = false;
        this.isMobile = null;
        this.clicked = false;
        this.isBrowser = false;
        this.zoomed = 'inactive';
        this.SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
        this.smooth = true;
        this.cancelEvent = new EventEmitter();
        this.isBrowser = isPlatformBrowser(platformId);
        this._element = this.element.nativeElement;
        if (this.isBrowser) {
            this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        }
    }
    /**
     * @return {?}
     */
    ImageModalComponent.prototype.toggleZoomed = /**
     * @return {?}
     */
    function () {
        if (!this.clicked) {
            this.renderer.setStyle(this.galleryImg.nativeElement, 'transform', 'scale(1.0, 1.0)');
            this.renderer.setStyle(this.galleryImg.nativeElement, 'animate', '300ms ease-out');
            this.renderer.setStyle(this.galleryImg.nativeElement, 'cursor', 'zoom-out');
            this.clicked = true;
        }
        else if (this.clicked) {
            this.renderer.setStyle(this.galleryImg.nativeElement, 'transform', 'scale(0.9, 0.9)');
            this.renderer.setStyle(this.galleryImg.nativeElement, 'animate', '300ms ease-in');
            this.renderer.setStyle(this.galleryImg.nativeElement, 'cursor', 'zoom-in');
            this.clicked = false;
        }
    };
    /**
     * @return {?}
     */
    ImageModalComponent.prototype.toggleRestart = /**
     * @return {?}
     */
    function () {
        this.zoomed = this.zoomed === 'inactive' ? 'active' : 'inactive';
    };
    /**
     * @return {?}
     */
    ImageModalComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    ImageModalComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.loading = true;
        if (this.imagePointer >= 0) {
            this.showRepeat = false;
            this.openGallery(this.imagePointer);
        }
        else {
            this.showRepeat = true;
        }
    };
    /**
     * @return {?}
     */
    ImageModalComponent.prototype.closeGallery = /**
     * @return {?}
     */
    function () {
        this.zoom = false;
        if (screenfull.enabled) {
            screenfull.exit();
        }
        this.opened = false;
        this.cancelEvent.emit(null);
    };
    /**
     * @return {?}
     */
    ImageModalComponent.prototype.prevImage = /**
     * @return {?}
     */
    function () {
        this.loading = true;
        this.currentImageIndex--;
        if (this.currentImageIndex < 0) {
            this.currentImageIndex = this.modalImages.length - 1;
        }
        this.openGallery(this.currentImageIndex);
    };
    /**
     * @return {?}
     */
    ImageModalComponent.prototype.nextImage = /**
     * @return {?}
     */
    function () {
        this.loading = true;
        this.currentImageIndex++;
        if (this.modalImages.length === this.currentImageIndex) {
            this.currentImageIndex = 0;
        }
        this.openGallery(this.currentImageIndex);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ImageModalComponent.prototype.openGallery = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var _this = this;
        if (!index) {
            this.currentImageIndex = 1;
        }
        this.currentImageIndex = index;
        this.opened = true;
        for (var i = 0; i < this.modalImages.length; i++) {
            if (i === this.currentImageIndex) {
                this.imgSrc = this.modalImages[i].img;
                this.caption = this.modalImages[i].caption;
                this.loading = false;
                break;
            }
        }
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.galleryDescription) {
                /** @type {?} */
                var descriptionHeight = _this.galleryDescription.nativeElement.clientHeight;
                _this.renderer.setStyle(_this.galleryImg.nativeElement, 'max-height', "calc(100% - " + (descriptionHeight + 25) + "px)");
            }
        }), 0);
    };
    /**
     * @return {?}
     */
    ImageModalComponent.prototype.fullScreen = /**
     * @return {?}
     */
    function () {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
    };
    Object.defineProperty(ImageModalComponent.prototype, "is_iPhone_or_iPod", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.isBrowser) {
                if (navigator && navigator.userAgent && navigator.userAgent != null) {
                    /** @type {?} */
                    var strUserAgent = navigator.userAgent.toLowerCase();
                    /** @type {?} */
                    var arrMatches = strUserAgent.match(/ipad/);
                    if (arrMatches != null) {
                        return true;
                    }
                }
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    ImageModalComponent.prototype.keyboardControl = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.opened) {
            // tslint:disable-next-line: deprecation
            if (event.keyCode === 39) {
                this.nextImage();
            }
            // tslint:disable-next-line: deprecation
            if (event.keyCode === 37) {
                this.prevImage();
            }
            // tslint:disable-next-line: deprecation
            if (event.keyCode === 27) {
                this.closeGallery();
            }
        }
    };
    /**
     * @param {?=} action
     * @return {?}
     */
    ImageModalComponent.prototype.swipe = /**
     * @param {?=} action
     * @return {?}
     */
    function (action) {
        if (action === void 0) { action = this.SWIPE_ACTION.RIGHT; }
        if (action === this.SWIPE_ACTION.RIGHT) {
            this.prevImage();
        }
        if (action === this.SWIPE_ACTION.LEFT) {
            this.nextImage();
        }
    };
    ImageModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-image-modal',
                    template: "<div class=\"ng-gallery mdb-lightbox {{ type }}\" *ngIf=\"modalImages && showRepeat\">\n  <figure class=\"col-md-4\" *ngFor=\"let i of modalImages; let index = index\">\n    <img src=\"{{ !i.thumb ? i.img : i.thumb }}\" class=\"ng-thumb\" (click)=\"openGallery(index)\"\n         alt=\"Image {{ index + 1 }}\"/>\n  </figure>\n</div>\n<div tabindex=\"0\" class=\"ng-overlay\" [class.hide_lightbox]=\"opened == false\">\n  <div class=\"top-bar\" style='z-index: 100000'>\n    <span *ngIf=\"modalImages\" class=\"info-text\">{{ currentImageIndex + 1 }}/{{ modalImages.length }}</span>\n    <a class=\"close-popup\" (click)=\"closeGallery()\" (click)=\"toggleRestart()\"></a>\n    <a *ngIf=\"!is_iPhone_or_iPod\" class=\"fullscreen-toogle\" [class.toggled]='fullscreen' (click)=\"fullScreen()\"></a>\n    <a class=\"zoom-toogle\" [class.zoom]='zoom' (click)=\"toggleZoomed()\" *ngIf=\"!isMobile\"></a>\n  </div>\n  <div class=\"ng-gallery-content\">\n    <img #galleryImg *ngIf=\"!loading\" src=\"{{imgSrc}}\" [class.smooth]='smooth' class=\"effect\" (swipeleft)=\"swipe($event.type)\"\n         (swiperight)=\"swipe($event.type)\" (click)=\"toggleZoomed()\" style=\"\"/>\n\n    <div class=\"uil-ring-css\" *ngIf=\"loading\">\n      <div></div>\n    </div>\n    <a class=\"nav-left\" *ngIf=\"modalImages && modalImages.length >1 && !isMobile\" (click)=\"prevImage()\">\n      <span></span>\n    </a>\n    <a class=\"nav-right\" *ngIf=\"modalImages && modalImages.length >1 && !isMobile\" (click)=\"nextImage()\">\n      <span></span>\n    </a>\n  </div>\n  <div class=\"row\" *ngIf=\"caption\">\n    <div class=\"col-md-12 mx-auto bottom-bar text-center\">\n      <figcaption #galleryDescription class=\"text-white lightbox-caption\">{{caption}}</figcaption>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"openModalWindow\">\n  <mdb-image-modal [imagePointer]=\"imagePointer\"></mdb-image-modal>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".bottom-bar{z-index:100000;position:absolute;left:0;right:0;width:100%;bottom:0!important}mdb-image-modal{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none}mdb-image-modal .hide_lightbox{display:none}mdb-image-modal .ng-gallery{display:flex;width:auto;flex-wrap:wrap}mdb-image-modal .ng-gallery img.ng-thumb{width:100%;height:100%;float:none;display:block;cursor:pointer}mdb-image-modal .ng-overlay{outline:0;position:fixed;top:0;left:0;width:100%;height:100%;background:#000;opacity:1;z-index:9999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none}mdb-image-modal .ng-overlay .ng-gallery-content{position:fixed;top:0;left:0;width:100%;height:100%;z-index:10000;text-align:center;overflow:hidden}mdb-image-modal .ng-overlay .ng-gallery-content>a.close-popup{font-size:42px;float:right;color:#fff;text-decoration:none;margin:0 30px 0 0;cursor:pointer;position:absolute;top:20px;right:0}mdb-image-modal .ng-overlay .ng-gallery-content>a.download-image{font-size:42px;float:right;color:#fff;text-decoration:none;margin:0 30px 0 0;cursor:pointer;position:absolute;top:20px;right:63px}mdb-image-modal .ng-overlay .ng-gallery-content .nav-left span{display:block;background-color:transparent}mdb-image-modal .ng-overlay .ng-gallery-content .nav-left span:before{content:' ';display:block;width:32px;height:30px;background-position:-138px -44px;opacity:.75;transition:opacity .2s;background-color:transparent}mdb-image-modal .ng-overlay .ng-gallery-content .nav-left:hover span:before{opacity:1}mdb-image-modal .ng-overlay .ng-gallery-content .nav-right span{display:block;background-color:transparent}mdb-image-modal .ng-overlay .ng-gallery-content .nav-right span:before{content:' ';display:block;width:32px;height:30px;background-position:-94px -44px;opacity:.75;transition:opacity .2s;background-color:transparent}mdb-image-modal .ng-overlay .ng-gallery-content .nav-right:hover span:before{opacity:1}mdb-image-modal .ng-overlay .ng-gallery-content>img{max-width:100%!important;max-width:1600px;max-height:1067px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none;position:absolute;margin:auto;top:0;left:0;right:0;bottom:0}mdb-image-modal .ng-overlay .ng-gallery-content>img.smooth{transition:.2s}mdb-image-modal .ng-overlay .ng-gallery-content>a.nav-left,mdb-image-modal .ng-overlay .ng-gallery-content>a.nav-right{color:#fff;text-decoration:none;font-size:60px;cursor:pointer;outline:0}mdb-image-modal .ng-overlay .ng-gallery-content>a.nav-left{position:fixed;left:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}mdb-image-modal .ng-overlay .ng-gallery-content>a.nav-right{position:fixed;right:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}mdb-image-modal .ng-overlay .ng-gallery-content>img.effect{-webkit-animation:.5s fadeIn;animation:.5s fadeIn}mdb-image-modal .ng-overlay .ng-gallery-content>span.info-text{color:#fff;display:inline-block;width:100%;height:20px;font-weight:700;text-align:center;position:fixed;left:0;right:0;bottom:100px;font-size:16px}mdb-image-modal .ng-overlay .ng-gallery-content>.ng-thumbnails-wrapper{width:400px;height:70px;text-align:center;position:fixed;bottom:20px;left:0;right:0;margin-left:auto;margin-right:auto;overflow-x:hidden}mdb-image-modal .ng-overlay .ng-gallery-content>.ng-thumbnails-wrapper>.ng-thumbnails{width:4000px;height:70px}mdb-image-modal .ng-overlay .ng-gallery-content>.ng-thumbnails-wrapper>.ng-thumbnails>div>img{width:auto;height:70px;float:left;margin-right:10px;cursor:pointer;opacity:.6}mdb-image-modal .ng-overlay .ng-gallery-content>.ng-thumbnails-wrapper>.ng-thumbnails>div>img.active,mdb-image-modal .ng-overlay .ng-gallery-content>.ng-thumbnails-wrapper>.ng-thumbnails>div>img:hover{transition:opacity .25s;opacity:1}@-webkit-keyframes fadeIn{from{opacity:.3}to{opacity:1}}@keyframes fadeIn{from{opacity:.3}to{opacity:1}}.lightbox-caption{font-size:13px;max-height:50px}.effect{-webkit-transform:scale(.9,.9);transform:scale(.9,.9)}.top-bar{position:absolute;top:0;left:0;right:0;height:44px;width:100%;z-index:10001}.top-bar .info-text{position:absolute;height:44px;top:0;left:0;font-size:16px;line-height:44px;color:#fff;opacity:.75;padding:0 10px}.top-bar .close-popup{position:relative;float:right;background-size:264px 88px;display:block;width:44px;height:44px;background-position:0 -44px;opacity:.75;transition:opacity .2s}.top-bar .close-popup:hover{opacity:1}.top-bar .fullscreen-toogle{position:relative;float:right;background-size:264px 88px;display:block;width:44px;height:44px;opacity:.75;transition:opacity .2s}.top-bar .fullscreen-toogle.toggled{background-position:-44px 0}.top-bar .fullscreen-toogle:hover{opacity:1}.top-bar .zoom-toogle{position:relative;float:right;background-size:264px 88px;display:block;width:44px;height:44px;background-position:-88px 0;opacity:.75;transition:opacity .2s}.top-bar .zoom-toogle.zoom{background-position:-132px 0}.top-bar .zoom-toogle:hover{opacity:1}"]
                }] }
    ];
    /** @nocollapse */
    ImageModalComponent.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    ImageModalComponent.propDecorators = {
        modalImages: [{ type: Input }],
        imagePointer: [{ type: Input }],
        fullscreen: [{ type: Input }],
        zoom: [{ type: Input }],
        smooth: [{ type: Input }],
        type: [{ type: Input }],
        galleryImg: [{ type: ViewChild, args: ['galleryImg', { static: false },] }],
        galleryDescription: [{ type: ViewChild, args: ['galleryDescription', { static: false },] }],
        cancelEvent: [{ type: Output }],
        keyboardControl: [{ type: HostListener, args: ['document:keyup', ['$event'],] }]
    };
    return ImageModalComponent;
}());
export { ImageModalComponent };
if (false) {
    /** @type {?} */
    ImageModalComponent.prototype._element;
    /** @type {?} */
    ImageModalComponent.prototype.opened;
    /** @type {?} */
    ImageModalComponent.prototype.imgSrc;
    /** @type {?} */
    ImageModalComponent.prototype.currentImageIndex;
    /** @type {?} */
    ImageModalComponent.prototype.loading;
    /** @type {?} */
    ImageModalComponent.prototype.showRepeat;
    /** @type {?} */
    ImageModalComponent.prototype.openModalWindow;
    /** @type {?} */
    ImageModalComponent.prototype.caption;
    /** @type {?} */
    ImageModalComponent.prototype.isMobile;
    /** @type {?} */
    ImageModalComponent.prototype.clicked;
    /** @type {?} */
    ImageModalComponent.prototype.isBrowser;
    /** @type {?} */
    ImageModalComponent.prototype.zoomed;
    /** @type {?} */
    ImageModalComponent.prototype.SWIPE_ACTION;
    /** @type {?} */
    ImageModalComponent.prototype.modalImages;
    /** @type {?} */
    ImageModalComponent.prototype.imagePointer;
    /** @type {?} */
    ImageModalComponent.prototype.fullscreen;
    /** @type {?} */
    ImageModalComponent.prototype.zoom;
    /** @type {?} */
    ImageModalComponent.prototype.smooth;
    /** @type {?} */
    ImageModalComponent.prototype.type;
    /** @type {?} */
    ImageModalComponent.prototype.galleryImg;
    /** @type {?} */
    ImageModalComponent.prototype.galleryDescription;
    /** @type {?} */
    ImageModalComponent.prototype.cancelEvent;
    /** @type {?} */
    ImageModalComponent.prototype.element;
    /** @type {?} */
    ImageModalComponent.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtcG9wdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL2xpZ2h0Ym94L2ltYWdlLXBvcHVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBRUwsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUlwRDtJQW1DRSw2QkFDdUIsVUFBa0IsRUFDaEMsT0FBbUIsRUFDbkIsUUFBbUI7UUFEbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBOUJyQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBR2YsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBSTFCLGFBQVEsR0FBUSxJQUFJLENBQUM7UUFDckIsWUFBTyxHQUFRLEtBQUssQ0FBQztRQUNyQixjQUFTLEdBQVEsS0FBSyxDQUFDO1FBQ3ZCLFdBQU0sR0FBRyxVQUFVLENBQUM7UUFFcEIsaUJBQVksR0FBRyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxDQUFDO1FBTWpELFdBQU0sR0FBRyxJQUFJLENBQUM7UUFNYixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFPOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQzNDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJ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QXNCOztJQUV0Qix5Q0FBbUU7O0lBQ25FLGlEQUFtRjs7SUFFbkYsMENBQWdEOztJQUk5QyxzQ0FBMEI7O0lBQzFCLHVDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZGVjbGFyZSB2YXIgc2NyZWVuZnVsbDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItaW1hZ2UtbW9kYWwnLFxuICB0ZW1wbGF0ZVVybDogJ2ltYWdlLXBvcHVwLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9saWdodGJveC1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBJbWFnZU1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgcHVibGljIF9lbGVtZW50OiBhbnk7XG4gIHB1YmxpYyBvcGVuZWQgPSBmYWxzZTtcbiAgcHVibGljIGltZ1NyYzogc3RyaW5nO1xuICBwdWJsaWMgY3VycmVudEltYWdlSW5kZXg6IG51bWJlcjtcbiAgcHVibGljIGxvYWRpbmcgPSBmYWxzZTtcbiAgcHVibGljIHNob3dSZXBlYXQgPSBmYWxzZTtcbiAgcHVibGljIG9wZW5Nb2RhbFdpbmRvdzogYW55O1xuICBwdWJsaWMgY2FwdGlvbjogc3RyaW5nO1xuXG4gIGlzTW9iaWxlOiBhbnkgPSBudWxsO1xuICBjbGlja2VkOiBhbnkgPSBmYWxzZTtcbiAgaXNCcm93c2VyOiBhbnkgPSBmYWxzZTtcbiAgem9vbWVkID0gJ2luYWN0aXZlJztcblxuICBTV0lQRV9BQ1RJT04gPSB7IExFRlQ6ICdzd2lwZWxlZnQnLCBSSUdIVDogJ3N3aXBlcmlnaHQnIH07XG5cbiAgQElucHV0KCkgbW9kYWxJbWFnZXM6IGFueTtcbiAgQElucHV0KCkgaW1hZ2VQb2ludGVyOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZ1bGxzY3JlZW46IGJvb2xlYW47XG4gIEBJbnB1dCgpIHpvb206IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNtb290aCA9IHRydWU7XG4gIEBJbnB1dCgpIHR5cGU6IFN0cmluZztcblxuICBAVmlld0NoaWxkKCdnYWxsZXJ5SW1nJywgeyBzdGF0aWM6IGZhbHNlIH0pIGdhbGxlcnlJbWc6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2dhbGxlcnlEZXNjcmlwdGlvbicsIHsgc3RhdGljOiBmYWxzZSB9KSBnYWxsZXJ5RGVzY3JpcHRpb246IEVsZW1lbnRSZWY7XG5cbiAgQE91dHB1dCgpIGNhbmNlbEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogc3RyaW5nLFxuICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHRoaXMuaXNCcm93c2VyID0gaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCk7XG4gICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5pc01vYmlsZSA9IC9pUGhvbmV8aVBhZHxpUG9kfEFuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVpvb21lZCgpIHtcbiAgICBpZiAoIXRoaXMuY2xpY2tlZCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmdhbGxlcnlJbWcubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICdzY2FsZSgxLjAsIDEuMCknKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5nYWxsZXJ5SW1nLm5hdGl2ZUVsZW1lbnQsICdhbmltYXRlJywgJzMwMG1zIGVhc2Utb3V0Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZ2FsbGVyeUltZy5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgJ3pvb20tb3V0Jyk7XG4gICAgICB0aGlzLmNsaWNrZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jbGlja2VkKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZ2FsbGVyeUltZy5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3NjYWxlKDAuOSwgMC45KScpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmdhbGxlcnlJbWcubmF0aXZlRWxlbWVudCwgJ2FuaW1hdGUnLCAnMzAwbXMgZWFzZS1pbicpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmdhbGxlcnlJbWcubmF0aXZlRWxlbWVudCwgJ2N1cnNvcicsICd6b29tLWluJyk7XG4gICAgICB0aGlzLmNsaWNrZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVSZXN0YXJ0KCkge1xuICAgIHRoaXMuem9vbWVkID0gdGhpcy56b29tZWQgPT09ICdpbmFjdGl2ZScgPyAnYWN0aXZlJyA6ICdpbmFjdGl2ZSc7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgaWYgKHRoaXMuaW1hZ2VQb2ludGVyID49IDApIHtcbiAgICAgIHRoaXMuc2hvd1JlcGVhdCA9IGZhbHNlO1xuICAgICAgdGhpcy5vcGVuR2FsbGVyeSh0aGlzLmltYWdlUG9pbnRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvd1JlcGVhdCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VHYWxsZXJ5KCkge1xuICAgIHRoaXMuem9vbSA9IGZhbHNlO1xuICAgIGlmIChzY3JlZW5mdWxsLmVuYWJsZWQpIHtcbiAgICAgIHNjcmVlbmZ1bGwuZXhpdCgpO1xuICAgIH1cbiAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMuY2FuY2VsRXZlbnQuZW1pdChudWxsKTtcbiAgfVxuXG4gIHByZXZJbWFnZSgpIHtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuY3VycmVudEltYWdlSW5kZXgtLTtcbiAgICBpZiAodGhpcy5jdXJyZW50SW1hZ2VJbmRleCA8IDApIHtcbiAgICAgIHRoaXMuY3VycmVudEltYWdlSW5kZXggPSB0aGlzLm1vZGFsSW1hZ2VzLmxlbmd0aCAtIDE7XG4gICAgfVxuICAgIHRoaXMub3BlbkdhbGxlcnkodGhpcy5jdXJyZW50SW1hZ2VJbmRleCk7XG4gIH1cblxuICBuZXh0SW1hZ2UoKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmN1cnJlbnRJbWFnZUluZGV4Kys7XG4gICAgaWYgKHRoaXMubW9kYWxJbWFnZXMubGVuZ3RoID09PSB0aGlzLmN1cnJlbnRJbWFnZUluZGV4KSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbWFnZUluZGV4ID0gMDtcbiAgICB9XG4gICAgdGhpcy5vcGVuR2FsbGVyeSh0aGlzLmN1cnJlbnRJbWFnZUluZGV4KTtcbiAgfVxuXG4gIG9wZW5HYWxsZXJ5KGluZGV4OiBhbnkpIHtcbiAgICBpZiAoIWluZGV4KSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbWFnZUluZGV4ID0gMTtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnRJbWFnZUluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5vcGVuZWQgPSB0cnVlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tb2RhbEltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGkgPT09IHRoaXMuY3VycmVudEltYWdlSW5kZXgpIHtcbiAgICAgICAgdGhpcy5pbWdTcmMgPSB0aGlzLm1vZGFsSW1hZ2VzW2ldLmltZztcbiAgICAgICAgdGhpcy5jYXB0aW9uID0gdGhpcy5tb2RhbEltYWdlc1tpXS5jYXB0aW9uO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZ2FsbGVyeURlc2NyaXB0aW9uKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uSGVpZ2h0ID0gdGhpcy5nYWxsZXJ5RGVzY3JpcHRpb24ubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgdGhpcy5nYWxsZXJ5SW1nLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgJ21heC1oZWlnaHQnLFxuICAgICAgICAgIGBjYWxjKDEwMCUgLSAke2Rlc2NyaXB0aW9uSGVpZ2h0ICsgMjV9cHgpYFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sIDApO1xuICB9XG5cbiAgZnVsbFNjcmVlbigpOiBhbnkge1xuICAgIGlmIChzY3JlZW5mdWxsLmVuYWJsZWQpIHtcbiAgICAgIHNjcmVlbmZ1bGwudG9nZ2xlKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzX2lQaG9uZV9vcl9pUG9kKCkge1xuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgaWYgKG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBzdHJVc2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGFyck1hdGNoZXMgPSBzdHJVc2VyQWdlbnQubWF0Y2goL2lwYWQvKTtcbiAgICAgICAgaWYgKGFyck1hdGNoZXMgIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5dXAnLCBbJyRldmVudCddKVxuICBrZXlib2FyZENvbnRyb2woZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5vcGVuZWQpIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzOSkge1xuICAgICAgICB0aGlzLm5leHRJbWFnZSgpO1xuICAgICAgfVxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3KSB7XG4gICAgICAgIHRoaXMucHJldkltYWdlKCk7XG4gICAgICB9XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgdGhpcy5jbG9zZUdhbGxlcnkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzd2lwZShhY3Rpb246IFN0cmluZyA9IHRoaXMuU1dJUEVfQUNUSU9OLlJJR0hUKSB7XG4gICAgaWYgKGFjdGlvbiA9PT0gdGhpcy5TV0lQRV9BQ1RJT04uUklHSFQpIHtcbiAgICAgIHRoaXMucHJldkltYWdlKCk7XG4gICAgfVxuXG4gICAgaWYgKGFjdGlvbiA9PT0gdGhpcy5TV0lQRV9BQ1RJT04uTEVGVCkge1xuICAgICAgdGhpcy5uZXh0SW1hZ2UoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==