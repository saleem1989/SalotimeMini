import { Injectable } from '@angular/core';
import * as exifr from 'exifr';
import * as i0 from "@angular/core";
export class ImgExifService {
    getOrientedImage(image) {
        return new Promise(resolve => {
            let img;
            exifr.orientation(image).catch(err => undefined).then(orientation => {
                if (orientation != 1) {
                    let canvas = document.createElement("canvas"), ctx = canvas.getContext("2d"), cw = image.width, ch = image.height, cx = 0, cy = 0, deg = 0;
                    switch (orientation) {
                        case 3:
                        case 4:
                            cx = -image.width;
                            cy = -image.height;
                            deg = 180;
                            break;
                        case 5:
                        case 6:
                            cw = image.height;
                            ch = image.width;
                            cy = -image.height;
                            deg = 90;
                            break;
                        case 7:
                        case 8:
                            cw = image.height;
                            ch = image.width;
                            cx = -image.width;
                            deg = 270;
                            break;
                        default:
                            break;
                    }
                    canvas.width = cw;
                    canvas.height = ch;
                    if (orientation && [2, 4, 5, 7].indexOf(orientation) > -1) {
                        //flip image
                        ctx.translate(cw, 0);
                        ctx.scale(-1, 1);
                    }
                    ctx.rotate(deg * Math.PI / 180);
                    ctx.drawImage(image, cx, cy);
                    img = document.createElement("img");
                    img.width = cw;
                    img.height = ch;
                    img.addEventListener('load', function () {
                        resolve(img);
                    });
                    img.src = canvas.toDataURL("image/png");
                }
                else {
                    resolve(image);
                }
            });
        });
    }
}
ImgExifService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImgExifService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ImgExifService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImgExifService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImgExifService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLWV4aWYuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvaW1nLWV4aWYuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDOztBQUsvQixNQUFNLE9BQU8sY0FBYztJQUNsQixnQkFBZ0IsQ0FBQyxLQUF1QjtRQUM3QyxPQUFPLElBQUksT0FBTyxDQUFtQixPQUFPLENBQUMsRUFBRTtZQUM3QyxJQUFJLEdBQVEsQ0FBQztZQUNiLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUNsRSxJQUFJLFdBQVcsSUFBSSxDQUFDLEVBQUU7b0JBQ3BCLElBQUksTUFBTSxHQUFzQixRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUM5RCxHQUFHLEdBQXVELE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQ2pGLEVBQUUsR0FBVyxLQUFLLENBQUMsS0FBSyxFQUN4QixFQUFFLEdBQVcsS0FBSyxDQUFDLE1BQU0sRUFDekIsRUFBRSxHQUFXLENBQUMsRUFDZCxFQUFFLEdBQVcsQ0FBQyxFQUNkLEdBQUcsR0FBVyxDQUFDLENBQUM7b0JBQ2xCLFFBQVEsV0FBVyxFQUFFO3dCQUNuQixLQUFLLENBQUMsQ0FBQzt3QkFDUCxLQUFLLENBQUM7NEJBQ0osRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzs0QkFDbEIsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzs0QkFDbkIsR0FBRyxHQUFHLEdBQUcsQ0FBQzs0QkFDVixNQUFNO3dCQUNSLEtBQUssQ0FBQyxDQUFDO3dCQUNQLEtBQUssQ0FBQzs0QkFDSixFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQzs0QkFDbEIsRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7NEJBQ2pCLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7NEJBQ25CLEdBQUcsR0FBRyxFQUFFLENBQUM7NEJBQ1QsTUFBTTt3QkFDUixLQUFLLENBQUMsQ0FBQzt3QkFDUCxLQUFLLENBQUM7NEJBQ0osRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7NEJBQ2xCLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDOzRCQUNqQixFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDOzRCQUNsQixHQUFHLEdBQUcsR0FBRyxDQUFDOzRCQUNWLE1BQU07d0JBQ1I7NEJBQ0UsTUFBTTtxQkFDVDtvQkFFRCxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDbEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7b0JBQ25CLElBQUksV0FBVyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO3dCQUN6RCxZQUFZO3dCQUNaLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNyQixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNsQjtvQkFDRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUNoQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzdCLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNwQyxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDZixHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTt3QkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNmLENBQUMsQ0FBQyxDQUFDO29CQUNILEdBQUcsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDekM7cUJBQU07b0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoQjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzsyR0EzRFUsY0FBYzsrR0FBZCxjQUFjLGNBRmIsTUFBTTsyRkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIGV4aWZyIGZyb20gJ2V4aWZyJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEltZ0V4aWZTZXJ2aWNlIHtcclxuICBwdWJsaWMgZ2V0T3JpZW50ZWRJbWFnZShpbWFnZTogSFRNTEltYWdlRWxlbWVudCk6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+KHJlc29sdmUgPT4ge1xyXG4gICAgICBsZXQgaW1nOiBhbnk7XHJcbiAgICAgIGV4aWZyLm9yaWVudGF0aW9uKGltYWdlKS5jYXRjaChlcnIgPT4gdW5kZWZpbmVkKS50aGVuKG9yaWVudGF0aW9uID0+IHtcclxuICAgICAgICBpZiAob3JpZW50YXRpb24gIT0gMSkge1xyXG4gICAgICAgICAgbGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLFxyXG4gICAgICAgICAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IDxDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ+Y2FudmFzLmdldENvbnRleHQoXCIyZFwiKSxcclxuICAgICAgICAgICAgY3c6IG51bWJlciA9IGltYWdlLndpZHRoLFxyXG4gICAgICAgICAgICBjaDogbnVtYmVyID0gaW1hZ2UuaGVpZ2h0LFxyXG4gICAgICAgICAgICBjeDogbnVtYmVyID0gMCxcclxuICAgICAgICAgICAgY3k6IG51bWJlciA9IDAsXHJcbiAgICAgICAgICAgIGRlZzogbnVtYmVyID0gMDtcclxuICAgICAgICAgIHN3aXRjaCAob3JpZW50YXRpb24pIHtcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgY3ggPSAtaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgICAgY3kgPSAtaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgIGRlZyA9IDE4MDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgY3cgPSBpbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgY2ggPSBpbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgICBjeSA9IC1pbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgZGVnID0gOTA7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgIGN3ID0gaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgIGNoID0gaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgICAgY3ggPSAtaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgICAgZGVnID0gMjcwO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNhbnZhcy53aWR0aCA9IGN3O1xyXG4gICAgICAgICAgY2FudmFzLmhlaWdodCA9IGNoO1xyXG4gICAgICAgICAgaWYgKG9yaWVudGF0aW9uICYmIFsyLCA0LCA1LCA3XS5pbmRleE9mKG9yaWVudGF0aW9uKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIC8vZmxpcCBpbWFnZVxyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKGN3LCAwKTtcclxuICAgICAgICAgICAgY3R4LnNjYWxlKC0xLCAxKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGN0eC5yb3RhdGUoZGVnICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCBjeCwgY3kpO1xyXG4gICAgICAgICAgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICAgIGltZy53aWR0aCA9IGN3O1xyXG4gICAgICAgICAgaW1nLmhlaWdodCA9IGNoO1xyXG4gICAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoaW1nKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaW1nLnNyYyA9IGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc29sdmUoaW1hZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19