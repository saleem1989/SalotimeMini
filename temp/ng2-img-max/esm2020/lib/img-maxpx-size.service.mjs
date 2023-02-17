import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./ng2-pica.service";
import * as i2 from "./img-exif.service";
export class ImgMaxPXSizeService {
    constructor(ng2PicaService, imageExifService) {
        this.ng2PicaService = ng2PicaService;
        this.imageExifService = imageExifService;
        this.timeAtStart = 0;
    }
    resizeImage(file, maxWidth, maxHeight, logExecutionTime = false) {
        let resizedFileSubject = new Subject();
        this.timeAtStart = new Date().getTime();
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
            //END OF RESIZE
            setTimeout(() => {
                resizedFileSubject.error({
                    resizedFile: file,
                    reason: "The provided File is neither of type jpg nor of type png.",
                    error: "INVALID_EXTENSION"
                });
            }, 0);
            return resizedFileSubject.asObservable();
        }
        let img = new Image();
        let self = this;
        img.onload = () => {
            this.imageExifService.getOrientedImage(img).then(orientedImg => {
                window.URL.revokeObjectURL(img.src);
                let currentWidth = orientedImg.width;
                let currentHeight = orientedImg.height;
                let newWidth = currentWidth;
                let newHeight = currentHeight;
                if (newWidth > maxWidth) {
                    newWidth = maxWidth;
                    //resize height proportionally
                    let ratio = maxWidth / currentWidth; //is gonna be <1
                    newHeight = newHeight * ratio;
                }
                currentHeight = newHeight;
                if (newHeight > maxHeight) {
                    newHeight = maxHeight;
                    //resize width proportionally
                    let ratio = maxHeight / currentHeight; //is gonna be <1
                    newWidth = newWidth * ratio;
                }
                if (newHeight === orientedImg.height && newWidth === orientedImg.width) {
                    //no resizing necessary
                    resizedFileSubject.next(file);
                    self.logExecutionTime(logExecutionTime);
                }
                else {
                    self.ng2PicaService.resize([file], newWidth, newHeight).subscribe((result) => {
                        //all good, result is a file
                        resizedFileSubject.next(result);
                        self.logExecutionTime(logExecutionTime);
                    }, error => {
                        //something went wrong
                        resizedFileSubject.error({ resizedFile: file, reason: error, error: "PICA_ERROR" });
                        self.logExecutionTime(logExecutionTime);
                    });
                }
            });
        };
        img.src = window.URL.createObjectURL(file);
        return resizedFileSubject.asObservable();
    }
    ;
    logExecutionTime(logExecutionTime) {
        if (logExecutionTime) {
            console.info("Execution time: ", new Date().getTime() - this.timeAtStart + "ms");
        }
    }
}
ImgMaxPXSizeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImgMaxPXSizeService, deps: [{ token: i1.Ng2PicaService }, { token: i2.ImgExifService }], target: i0.ɵɵFactoryTarget.Injectable });
ImgMaxPXSizeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImgMaxPXSizeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImgMaxPXSizeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.Ng2PicaService }, { type: i2.ImgExifService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLW1heHB4LXNpemUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvaW1nLW1heHB4LXNpemUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBYSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7Ozs7QUFRekMsTUFBTSxPQUFPLG1CQUFtQjtJQUc5QixZQUFvQixjQUE4QixFQUM5QixnQkFBZ0M7UUFEaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBZ0I7UUFIcEQsZ0JBQVcsR0FBVyxDQUFDLENBQUM7SUFJeEIsQ0FBQztJQUVNLFdBQVcsQ0FBQyxJQUFVLEVBQUUsUUFBZ0IsRUFBRSxTQUFpQixFQUFFLG1CQUE0QixLQUFLO1FBQ25HLElBQUksa0JBQWtCLEdBQWlCLElBQUksT0FBTyxFQUFPLENBQUM7UUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3hDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDM0QsZUFBZTtZQUNmLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2Qsa0JBQWtCLENBQUMsS0FBSyxDQUFDO29CQUN2QixXQUFXLEVBQUUsSUFBSTtvQkFDakIsTUFBTSxFQUFFLDJEQUEyRDtvQkFDbkUsS0FBSyxFQUFFLG1CQUFtQjtpQkFDM0IsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ04sT0FBTyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUMxQztRQUNELElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFDdEIsSUFBSSxJQUFJLEdB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dGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHtJbWdFeGlmU2VydmljZX0gZnJvbSAnLi9pbWctZXhpZi5zZXJ2aWNlJztcclxuaW1wb3J0IHtOZzJQaWNhU2VydmljZX0gZnJvbSAnLi9uZzItcGljYS5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEltZ01heFBYU2l6ZVNlcnZpY2Uge1xyXG4gIHRpbWVBdFN0YXJ0OiBudW1iZXIgPSAwO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nMlBpY2FTZXJ2aWNlOiBOZzJQaWNhU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIGltYWdlRXhpZlNlcnZpY2U6IEltZ0V4aWZTZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzaXplSW1hZ2UoZmlsZTogRmlsZSwgbWF4V2lkdGg6IG51bWJlciwgbWF4SGVpZ2h0OiBudW1iZXIsIGxvZ0V4ZWN1dGlvblRpbWU6IGJvb2xlYW4gPSBmYWxzZSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzaXplZEZpbGVTdWJqZWN0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICB0aGlzLnRpbWVBdFN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICBpZiAoZmlsZS50eXBlICE9PSBcImltYWdlL2pwZWdcIiAmJiBmaWxlLnR5cGUgIT09IFwiaW1hZ2UvcG5nXCIpIHtcclxuICAgICAgLy9FTkQgT0YgUkVTSVpFXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHJlc2l6ZWRGaWxlU3ViamVjdC5lcnJvcih7XHJcbiAgICAgICAgICByZXNpemVkRmlsZTogZmlsZSxcclxuICAgICAgICAgIHJlYXNvbjogXCJUaGUgcHJvdmlkZWQgRmlsZSBpcyBuZWl0aGVyIG9mIHR5cGUganBnIG5vciBvZiB0eXBlIHBuZy5cIixcclxuICAgICAgICAgIGVycm9yOiBcIklOVkFMSURfRVhURU5TSU9OXCJcclxuICAgICAgICB9KTtcclxuICAgICAgfSwgMCk7XHJcbiAgICAgIHJldHVybiByZXNpemVkRmlsZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcbiAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLmltYWdlRXhpZlNlcnZpY2UuZ2V0T3JpZW50ZWRJbWFnZShpbWcpLnRoZW4ob3JpZW50ZWRJbWcgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGltZy5zcmMpO1xyXG4gICAgICAgIGxldCBjdXJyZW50V2lkdGggPSBvcmllbnRlZEltZy53aWR0aDtcclxuICAgICAgICBsZXQgY3VycmVudEhlaWdodCA9IG9yaWVudGVkSW1nLmhlaWdodDtcclxuICAgICAgICBsZXQgbmV3V2lkdGggPSBjdXJyZW50V2lkdGg7XHJcbiAgICAgICAgbGV0IG5ld0hlaWdodCA9IGN1cnJlbnRIZWlnaHQ7XHJcbiAgICAgICAgaWYgKG5ld1dpZHRoID4gbWF4V2lkdGgpIHtcclxuICAgICAgICAgIG5ld1dpZHRoID0gbWF4V2lkdGhcclxuICAgICAgICAgIC8vcmVzaXplIGhlaWdodCBwcm9wb3J0aW9uYWxseVxyXG4gICAgICAgICAgbGV0IHJhdGlvID0gbWF4V2lkdGggLyBjdXJyZW50V2lkdGg7IC8vaXMgZ29ubmEgYmUgPDFcclxuICAgICAgICAgIG5ld0hlaWdodCA9IG5ld0hlaWdodCAqIHJhdGlvO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdXJyZW50SGVpZ2h0ID0gbmV3SGVpZ2h0O1xyXG4gICAgICAgIGlmIChuZXdIZWlnaHQgPiBtYXhIZWlnaHQpIHtcclxuICAgICAgICAgIG5ld0hlaWdodCA9IG1heEhlaWdodDtcclxuICAgICAgICAgIC8vcmVzaXplIHdpZHRoIHByb3BvcnRpb25hbGx5XHJcbiAgICAgICAgICBsZXQgcmF0aW8gPSBtYXhIZWlnaHQgLyBjdXJyZW50SGVpZ2h0OyAvL2lzIGdvbm5hIGJlIDwxXHJcbiAgICAgICAgICBuZXdXaWR0aCA9IG5ld1dpZHRoICogcmF0aW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXdIZWlnaHQgPT09IG9yaWVudGVkSW1nLmhlaWdodCAmJiBuZXdXaWR0aCA9PT0gb3JpZW50ZWRJbWcud2lkdGgpIHtcclxuICAgICAgICAgIC8vbm8gcmVzaXppbmcgbmVjZXNzYXJ5XHJcbiAgICAgICAgICByZXNpemVkRmlsZVN1YmplY3QubmV4dChmaWxlKTtcclxuICAgICAgICAgIHNlbGYubG9nRXhlY3V0aW9uVGltZShsb2dFeGVjdXRpb25UaW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc2VsZi5uZzJQaWNhU2VydmljZS5yZXNpemUoW2ZpbGVdLCBuZXdXaWR0aCwgbmV3SGVpZ2h0KS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAvL2FsbCBnb29kLCByZXN1bHQgaXMgYSBmaWxlXHJcbiAgICAgICAgICAgIHJlc2l6ZWRGaWxlU3ViamVjdC5uZXh0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHNlbGYubG9nRXhlY3V0aW9uVGltZShsb2dFeGVjdXRpb25UaW1lKTtcclxuICAgICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgICAgLy9zb21ldGhpbmcgd2VudCB3cm9uZ1xyXG4gICAgICAgICAgICByZXNpemVkRmlsZVN1YmplY3QuZXJyb3Ioe3Jlc2l6ZWRGaWxlOiBmaWxlLCByZWFzb246IGVycm9yLCBlcnJvcjogXCJQSUNBX0VSUk9SXCJ9KTtcclxuICAgICAgICAgICAgc2VsZi5sb2dFeGVjdXRpb25UaW1lKGxvZ0V4ZWN1dGlvblRpbWUpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcbiAgICBpbWcuc3JjID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc2l6ZWRGaWxlU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9O1xyXG5cclxuICBwcml2YXRlIGxvZ0V4ZWN1dGlvblRpbWUobG9nRXhlY3V0aW9uVGltZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKGxvZ0V4ZWN1dGlvblRpbWUpIHtcclxuICAgICAgY29uc29sZS5pbmZvKFwiRXhlY3V0aW9uIHRpbWU6IFwiLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMudGltZUF0U3RhcnQgKyBcIm1zXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=