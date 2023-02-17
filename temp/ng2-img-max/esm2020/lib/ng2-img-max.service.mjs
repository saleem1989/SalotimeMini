import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./img-max-size.service";
import * as i2 from "./img-maxpx-size.service";
import * as i3 from "./img-exif.service";
export class Ng2ImgMaxService {
    constructor(imgMaxSizeService, imgMaxPXSizeService, imageExifService) {
        this.imgMaxSizeService = imgMaxSizeService;
        this.imgMaxPXSizeService = imgMaxPXSizeService;
        this.imageExifService = imageExifService;
    }
    compress(files, maxSizeInMB, ignoreAlpha = false, logExecutionTime = false) {
        let compressedFileSubject = new Subject();
        files.forEach((file) => {
            this.compressImage(file, maxSizeInMB, ignoreAlpha, logExecutionTime).subscribe((value) => {
                compressedFileSubject.next(value);
            }, error => {
                compressedFileSubject.error(error);
            });
        });
        return compressedFileSubject.asObservable();
    }
    resize(files, maxWidth, maxHeight, logExecutionTime = false) {
        let resizedFileSubject = new Subject();
        files.forEach((file) => {
            this.resizeImage(file, maxWidth, maxHeight, logExecutionTime).subscribe((value) => {
                resizedFileSubject.next(value);
            }, error => {
                resizedFileSubject.error(error);
            });
        });
        return resizedFileSubject.asObservable();
    }
    compressImage(file, maxSizeInMB, ignoreAlpha = false, logExecutionTime = false) {
        return this.imgMaxSizeService.compressImage(file, maxSizeInMB, ignoreAlpha, logExecutionTime);
    }
    resizeImage(file, maxWidth, maxHeight, logExecutionTime = false) {
        return this.imgMaxPXSizeService.resizeImage(file, maxWidth, maxHeight, logExecutionTime);
    }
    getEXIFOrientedImage(image) {
        return this.imageExifService.getOrientedImage(image);
    }
}
Ng2ImgMaxService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: Ng2ImgMaxService, deps: [{ token: i1.ImgMaxSizeService }, { token: i2.ImgMaxPXSizeService }, { token: i3.ImgExifService }], target: i0.ɵɵFactoryTarget.Injectable });
Ng2ImgMaxService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: Ng2ImgMaxService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: Ng2ImgMaxService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.ImgMaxSizeService }, { type: i2.ImgMaxPXSizeService }, { type: i3.ImgExifService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWltZy1tYXguc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbmcyLWltZy1tYXguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBYSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7Ozs7O0FBUXpDLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsWUFBb0IsaUJBQW9DLEVBQ3BDLG1CQUF3QyxFQUN4QyxnQkFBZ0M7UUFGaEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBZ0I7SUFDcEQsQ0FBQztJQUVNLFFBQVEsQ0FBQyxLQUFhLEVBQUUsV0FBbUIsRUFBRSxjQUF1QixLQUFLLEVBQUUsbUJBQTRCLEtBQUs7UUFDakgsSUFBSSxxQkFBcUIsR0FBaUIsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUM3RCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUN2RixxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNULHFCQUFxQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQWEsRUFBRSxRQUFnQixFQUFFLFNBQWlCLEVBQUUsbUJBQTRCLEtBQUs7UUFDakcsSUFBSSxrQkFBa0IsR0FBaUIsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUMxRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNoRixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNULGtCQUFrQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRU0sYUFBYSxDQUFDLElBQVUsRUFBRSxXQUFtQixFQUFFLGNBQXVCLEtBQUssRUFBRSxtQkFBNEIsS0FBSztRQUNuSCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRU0sV0FBVyxDQUFDLElBQVUsRUFBRSxRQUFnQixFQUFFLFNBQWlCLEVBQUUsbUJBQTRCLEtBQUs7UUFDbkcsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVNLG9CQUFvQixDQUFDLEtBQXVCO1FBQ2pELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7OzZHQXhDVSxnQkFBZ0I7aUhBQWhCLGdCQUFnQixjQUZmLE1BQU07MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7SW1nTWF4U2l6ZVNlcnZpY2V9IGZyb20gJy4vaW1nLW1heC1zaXplLnNlcnZpY2UnO1xyXG5pbXBvcnQge0ltZ01heFBYU2l6ZVNlcnZpY2V9IGZyb20gJy4vaW1nLW1heHB4LXNpemUuc2VydmljZSc7XHJcbmltcG9ydCB7SW1nRXhpZlNlcnZpY2V9IGZyb20gJy4vaW1nLWV4aWYuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZzJJbWdNYXhTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGltZ01heFNpemVTZXJ2aWNlOiBJbWdNYXhTaXplU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIGltZ01heFBYU2l6ZVNlcnZpY2U6IEltZ01heFBYU2l6ZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBpbWFnZUV4aWZTZXJ2aWNlOiBJbWdFeGlmU2VydmljZSkge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbXByZXNzKGZpbGVzOiBGaWxlW10sIG1heFNpemVJbk1COiBudW1iZXIsIGlnbm9yZUFscGhhOiBib29sZWFuID0gZmFsc2UsIGxvZ0V4ZWN1dGlvblRpbWU6IGJvb2xlYW4gPSBmYWxzZSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgY29tcHJlc3NlZEZpbGVTdWJqZWN0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICBmaWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XHJcbiAgICAgIHRoaXMuY29tcHJlc3NJbWFnZShmaWxlLCBtYXhTaXplSW5NQiwgaWdub3JlQWxwaGEsIGxvZ0V4ZWN1dGlvblRpbWUpLnN1YnNjcmliZSgodmFsdWUpID0+IHtcclxuICAgICAgICBjb21wcmVzc2VkRmlsZVN1YmplY3QubmV4dCh2YWx1ZSk7XHJcbiAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICBjb21wcmVzc2VkRmlsZVN1YmplY3QuZXJyb3IoZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvbXByZXNzZWRGaWxlU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNpemUoZmlsZXM6IEZpbGVbXSwgbWF4V2lkdGg6IG51bWJlciwgbWF4SGVpZ2h0OiBudW1iZXIsIGxvZ0V4ZWN1dGlvblRpbWU6IGJvb2xlYW4gPSBmYWxzZSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgcmVzaXplZEZpbGVTdWJqZWN0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICBmaWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XHJcbiAgICAgIHRoaXMucmVzaXplSW1hZ2UoZmlsZSwgbWF4V2lkdGgsIG1heEhlaWdodCwgbG9nRXhlY3V0aW9uVGltZSkuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHJlc2l6ZWRGaWxlU3ViamVjdC5uZXh0KHZhbHVlKTtcclxuICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgIHJlc2l6ZWRGaWxlU3ViamVjdC5lcnJvcihlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzaXplZEZpbGVTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbXByZXNzSW1hZ2UoZmlsZTogRmlsZSwgbWF4U2l6ZUluTUI6IG51bWJlciwgaWdub3JlQWxwaGE6IGJvb2xlYW4gPSBmYWxzZSwgbG9nRXhlY3V0aW9uVGltZTogYm9vbGVhbiA9IGZhbHNlKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmltZ01heFNpemVTZXJ2aWNlLmNvbXByZXNzSW1hZ2UoZmlsZSwgbWF4U2l6ZUluTUIsIGlnbm9yZUFscGhhLCBsb2dFeGVjdXRpb25UaW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNpemVJbWFnZShmaWxlOiBGaWxlLCBtYXhXaWR0aDogbnVtYmVyLCBtYXhIZWlnaHQ6IG51bWJlciwgbG9nRXhlY3V0aW9uVGltZTogYm9vbGVhbiA9IGZhbHNlKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmltZ01heFBYU2l6ZVNlcnZpY2UucmVzaXplSW1hZ2UoZmlsZSwgbWF4V2lkdGgsIG1heEhlaWdodCwgbG9nRXhlY3V0aW9uVGltZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RVhJRk9yaWVudGVkSW1hZ2UoaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQpOiBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+IHtcclxuICAgIHJldHVybiB0aGlzLmltYWdlRXhpZlNlcnZpY2UuZ2V0T3JpZW50ZWRJbWFnZShpbWFnZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==