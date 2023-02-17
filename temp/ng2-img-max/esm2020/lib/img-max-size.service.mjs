import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./img-exif.service";
const MAX_STEPS = 15;
export class ImgMaxSizeService {
    constructor(imageExifService) {
        this.imageExifService = imageExifService;
        this.timeAtStart = 0;
    }
    compressImage(file, maxSizeInMB, ignoreAlpha = false, logExecutionTime = false) {
        let compressedFileSubject = new Subject();
        this.timeAtStart = new Date().getTime();
        this.initialFile = file;
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
            //END OF COMPRESSION
            setTimeout(() => {
                compressedFileSubject.error({
                    compressedFile: file,
                    reason: "File provided is neither of type jpg nor of type png.",
                    error: "INVALID_EXTENSION"
                });
            }, 0);
            return compressedFileSubject.asObservable();
        }
        let oldFileSize = file.size / 1024 / 1024;
        if (oldFileSize < maxSizeInMB) {
            // END OF COMPRESSION
            // FILE SIZE ALREADY BELOW MAX_SIZE -> no compression needed
            setTimeout(() => {
                compressedFileSubject.next(file);
            }, 0);
            return compressedFileSubject.asObservable();
        }
        let cvs = document.createElement('canvas');
        let ctx = cvs.getContext('2d');
        let img = new Image();
        let self = this;
        img.onload = () => {
            this.imageExifService.getOrientedImage(img).then(orientedImg => {
                window.URL.revokeObjectURL(img.src);
                cvs.width = orientedImg.width;
                cvs.height = orientedImg.height;
                ctx?.drawImage(orientedImg, 0, 0);
                let imageData = ctx?.getImageData(0, 0, orientedImg.width, orientedImg.height);
                if (file.type === "image/png" && this.isImgUsingAlpha(imageData) && !ignoreAlpha) {
                    //png image with alpha
                    compressedFileSubject.error({
                        compressedFile: file,
                        reason: "File provided is a png image which uses the alpha channel. No compression possible.",
                        error: "PNG_WITH_ALPHA"
                    });
                }
                ctx = cvs.getContext('2d', { 'alpha': false });
                ctx?.drawImage(orientedImg, 0, 0);
                self.getCompressedFile(cvs, 50, maxSizeInMB, 1).then((compressedFile) => {
                    compressedFileSubject.next(compressedFile);
                    self.logExecutionTime(logExecutionTime);
                }).catch((error) => {
                    compressedFileSubject.error(error);
                    self.logExecutionTime(logExecutionTime);
                });
            });
        };
        img.src = window.URL.createObjectURL(file);
        return compressedFileSubject.asObservable();
    }
    ;
    getCompressedFile(cvs, quality, maxSizeInMB, currentStep) {
        let result = new Promise((resolve, reject) => {
            cvs.toBlob((blob) => {
                if (!blob) {
                    return reject({
                        compressedFile: null,
                        reason: "Blob error",
                        error: "BAD_BLOB"
                    });
                }
                if (currentStep + 1 > MAX_STEPS) {
                    //COMPRESSION END
                    //maximal steps reached
                    reject({
                        compressedFile: this.getResultFile(blob),
                        reason: "Could not find the correct compression quality in " + MAX_STEPS + " steps.",
                        error: "MAX_STEPS_EXCEEDED"
                    });
                }
                else {
                    let newQuality = this.getCalculatedQuality(blob, quality, maxSizeInMB, currentStep);
                    this.checkCompressionStatus(cvs, blob, quality, maxSizeInMB, currentStep, newQuality)
                        .then(result => {
                        resolve(result);
                    })
                        .catch(result => {
                        reject(result);
                    });
                }
            }, "image/jpeg", quality / 100);
        });
        return result;
    }
    getResultFile(blob) {
        if (!this.initialFile) {
            return null;
        }
        return this.generateResultFile(blob, this.initialFile.name, this.initialFile.type, new Date().getTime());
    }
    generateResultFile(blob, name, type, lastModified) {
        let resultFile = new Blob([blob], { type: type });
        return this.blobToFile(resultFile, name, lastModified);
    }
    blobToFile(blob, name, lastModified) {
        let file = blob;
        file.name = name;
        file.lastModified = lastModified;
        //Cast to a File() type
        return file;
    }
    getCalculatedQuality(blob, quality, maxSizeInMB, currentStep) {
        if (!this.initialFile) {
            return 0;
        }
        //CALCULATE NEW QUALITY
        let currentSize = blob.size / 1024 / 1024;
        let ratioMaxSizeToCurrentSize = maxSizeInMB / currentSize;
        if (ratioMaxSizeToCurrentSize > 5) {
            //max ratio to avoid extreme quality values
            ratioMaxSizeToCurrentSize = 5;
        }
        let ratioMaxSizeToInitialSize = currentSize / (this.initialFile.size / 1024 / 1024);
        if (ratioMaxSizeToInitialSize < 0.05) {
            //min ratio to avoid extreme quality values
            ratioMaxSizeToInitialSize = 0.05;
        }
        let newQuality = 0;
        let multiplicator = Math.abs(ratioMaxSizeToInitialSize - 1) * 10 / (currentStep * 1.7) / ratioMaxSizeToCurrentSize;
        if (multiplicator < 1) {
            multiplicator = 1;
        }
        if (ratioMaxSizeToCurrentSize >= 1) {
            newQuality = quality + (ratioMaxSizeToCurrentSize - 1) * 10 * multiplicator;
        }
        else {
            newQuality = quality - (1 - ratioMaxSizeToCurrentSize) * 10 * multiplicator;
        }
        if (newQuality > 100) {
            //max quality = 100, so let's set the new quality to the value in between the old quality and 100 in case of > 100
            newQuality = quality + (100 - quality) / 2;
        }
        if (newQuality < 0) {
            //min quality = 0, so let's set the new quality to the value in between the old quality and 0 in case of < 0
            newQuality = quality - quality / 2;
        }
        return newQuality;
    }
    checkCompressionStatus(cvs, blob, quality, maxSizeInMB, currentStep, newQuality) {
        let result = new Promise((resolve, reject) => {
            if (quality === 100 && newQuality >= 100) {
                //COMPRESSION END
                //Seems like quality 100 is max but file still too small, case that shouldn't exist as the compression shouldn't even have started in the first place
                reject({
                    compressedFile: this.initialFile,
                    reason: "Unfortunately there was an error while compressing the file.",
                    error: "FILE_BIGGER_THAN_INITIAL_FILE"
                });
            }
            else if ((quality < 1) && (newQuality < quality)) {
                //COMPRESSION END
                //File size still too big but can't compress further than quality=0
                reject({
                    compressedFile: this.getResultFile(blob),
                    reason: "Could not compress image enough to fit the maximal file size limit.",
                    error: "UNABLE_TO_COMPRESS_ENOUGH"
                });
            }
            else if ((newQuality > quality) && (Math.round(quality) == Math.round(newQuality))) {
                //COMPRESSION END
                //next steps quality would be the same quality but newQuality is slightly bigger than old one, means we most likely found the nearest quality to compress to maximal size
                resolve(this.getResultFile(blob));
            }
            else if (currentStep > 5 && (newQuality > quality) && (newQuality < quality + 2)) {
                //COMPRESSION END
                //for some rare occasions the algorithm might be stuck around e.g. 98.5 and 97.4 because of the maxQuality of 100, the current quality is the nearest possible quality in that case
                resolve(this.getResultFile(blob));
            }
            else if ((newQuality > quality) && Number.isInteger(quality) && (Math.floor(newQuality) == quality)) {
                //COMPRESSION END
                /*
                    in the previous step if ((quality > newQuality) && (Math.round(quality) == Math.round(newQuality))) applied, so
                    newQuality = Math.round(newQuality) - 1; this was done to reduce the quality at least a full integer down to not waste a step
                    with the same compression rate quality as before. Now, the newQuality is still only in between the old quality (e.g. 93)
                    and the newQuality (e.g. 94) which most likely means that the value for the newQuality (the bigger one) would make the filesize
                    too big so we should just stick with the current, lower quality and return that file.
                */
                resolve(this.getResultFile(blob));
            }
            else {
                //CONTINUE COMPRESSION
                if ((quality > newQuality) && (Math.round(quality) == Math.round(newQuality))) {
                    //quality can only be an integer -> make sure difference between old quality and new one is at least a whole integer number
                    // - it would be nonsense to compress again with the same quality
                    newQuality = Math.round(newQuality) - 1;
                }
                //recursively call function again
                resolve(this.getCompressedFile(cvs, newQuality, maxSizeInMB, currentStep + 1));
            }
        });
        return result;
    }
    isImgUsingAlpha(imageData) {
        for (var i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i + 3] !== 255) {
                return true;
            }
        }
        return false;
    }
    logExecutionTime(logExecutionTime) {
        if (logExecutionTime) {
            console.info("Execution time: ", new Date().getTime() - this.timeAtStart + "ms");
        }
    }
}
ImgMaxSizeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImgMaxSizeService, deps: [{ token: i1.ImgExifService }], target: i0.ɵɵFactoryTarget.Injectable });
ImgMaxSizeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImgMaxSizeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImgMaxSizeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.ImgExifService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLW1heC1zaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2ltZy1tYXgtc2l6ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFhLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQzs7O0FBS3pDLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQU1yQixNQUFNLE9BQU8saUJBQWlCO0lBSTVCLFlBQW9CLGdCQUFnQztRQUFoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWdCO1FBSHBELGdCQUFXLEdBQVcsQ0FBQyxDQUFDO0lBSXhCLENBQUM7SUFFTSxhQUFhLENBQUMsSUFBVSxFQUFFLFdBQW1CLEVBQUUsY0FBdUIsS0FBSyxFQUFFLG1CQUE0QixLQUFLO1FBQ25ILElBQUkscUJBQXFCLEdBQWlCLElBQUksT0FBTyxFQUFPLENBQUM7UUFDN0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDM0Qsb0JBQW9CO1lBQ3BCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QscUJBQXFCLENBQUMsS0FBSyxDQUFDO29CQUMxQixjQUFjLEVBQUUsSUFBSTtvQkFDcEIsTUFBTSxFQUFFLHVEQUF1RDtvQkFDL0QsS0FBSyxFQUFFLG1CQUFtQjtpQkFDM0IsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ04sT0FBTyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUM3QztRQUVELElBQUksV0FBVyxHQUFHLElBQUksQ0FB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QUcsRUFBRTtnQkFDakMsT0FBTyxJQUFJLENBQUM7YUFDYjtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU8sZ0JBQWdCLENBQUMsZ0JBQXlCO1FBQ2hELElBQUksZ0JBQWdCLEVBQUU7WUFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDbEY7SUFDSCxDQUFDOzs4R0FyT1UsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FGaEIsTUFBTTsyRkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7SW1nRXhpZlNlcnZpY2V9IGZyb20gJy4vaW1nLWV4aWYuc2VydmljZSc7XHJcblxyXG5cclxuY29uc3QgTUFYX1NURVBTID0gMTU7XHJcbmRlY2xhcmUgdmFyIHNlbGY6IGFueTtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEltZ01heFNpemVTZXJ2aWNlIHtcclxuICB0aW1lQXRTdGFydDogbnVtYmVyID0gMDtcclxuICBpbml0aWFsRmlsZTogRmlsZSB8IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbWFnZUV4aWZTZXJ2aWNlOiBJbWdFeGlmU2VydmljZSkge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbXByZXNzSW1hZ2UoZmlsZTogRmlsZSwgbWF4U2l6ZUluTUI6IG51bWJlciwgaWdub3JlQWxwaGE6IGJvb2xlYW4gPSBmYWxzZSwgbG9nRXhlY3V0aW9uVGltZTogYm9vbGVhbiA9IGZhbHNlKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCBjb21wcmVzc2VkRmlsZVN1YmplY3Q6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHRoaXMudGltZUF0U3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIHRoaXMuaW5pdGlhbEZpbGUgPSBmaWxlO1xyXG4gICAgaWYgKGZpbGUudHlwZSAhPT0gXCJpbWFnZS9qcGVnXCIgJiYgZmlsZS50eXBlICE9PSBcImltYWdlL3BuZ1wiKSB7XHJcbiAgICAgIC8vRU5EIE9GIENPTVBSRVNTSU9OXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNvbXByZXNzZWRGaWxlU3ViamVjdC5lcnJvcih7XHJcbiAgICAgICAgICBjb21wcmVzc2VkRmlsZTogZmlsZSxcclxuICAgICAgICAgIHJlYXNvbjogXCJGaWxlIHByb3ZpZGVkIGlzIG5laXRoZXIgb2YgdHlwZSBqcGcgbm9yIG9mIHR5cGUgcG5nLlwiLFxyXG4gICAgICAgICAgZXJyb3I6IFwiSU5WQUxJRF9FWFRFTlNJT05cIlxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LCAwKTtcclxuICAgICAgcmV0dXJuIGNvbXByZXNzZWRGaWxlU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgb2xkRmlsZVNpemUgPSBmaWxlLnNpemUgLyAxMDI0IC8gMTAyNDtcclxuICAgIGlmIChvbGRGaWxlU2l6ZSA8IG1heFNpemVJbk1CKSB7XHJcbiAgICAgIC8vIEVORCBPRiBDT01QUkVTU0lPTlxyXG4gICAgICAvLyBGSUxFIFNJWkUgQUxSRUFEWSBCRUxPVyBNQVhfU0laRSAtPiBubyBjb21wcmVzc2lvbiBuZWVkZWRcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29tcHJlc3NlZEZpbGVTdWJqZWN0Lm5leHQoZmlsZSlcclxuICAgICAgfSwgMCk7XHJcbiAgICAgIHJldHVybiBjb21wcmVzc2VkRmlsZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGN2cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgbGV0IGN0eCA9IGN2cy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgdGhpcy5pbWFnZUV4aWZTZXJ2aWNlLmdldE9yaWVudGVkSW1hZ2UoaW1nKS50aGVuKG9yaWVudGVkSW1nID0+IHtcclxuICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTChpbWcuc3JjKTtcclxuICAgICAgICBjdnMud2lkdGggPSBvcmllbnRlZEltZy53aWR0aDtcclxuICAgICAgICBjdnMuaGVpZ2h0ID0gb3JpZW50ZWRJbWcuaGVpZ2h0O1xyXG4gICAgICAgIGN0eD8uZHJhd0ltYWdlKG9yaWVudGVkSW1nLCAwLCAwKTtcclxuICAgICAgICBsZXQgaW1hZ2VEYXRhID0gY3R4Py5nZXRJbWFnZURhdGEoMCwgMCwgb3JpZW50ZWRJbWcud2lkdGgsIG9yaWVudGVkSW1nLmhlaWdodCk7XHJcbiAgICAgICAgaWYgKGZpbGUudHlwZSA9PT0gXCJpbWFnZS9wbmdcIiAmJiB0aGlzLmlzSW1nVXNpbmdBbHBoYShpbWFnZURhdGEpICYmICFpZ25vcmVBbHBoYSkge1xyXG4gICAgICAgICAgLy9wbmcgaW1hZ2Ugd2l0aCBhbHBoYVxyXG4gICAgICAgICAgY29tcHJlc3NlZEZpbGVTdWJqZWN0LmVycm9yKHtcclxuICAgICAgICAgICAgY29tcHJlc3NlZEZpbGU6IGZpbGUsXHJcbiAgICAgICAgICAgIHJlYXNvbjogXCJGaWxlIHByb3ZpZGVkIGlzIGEgcG5nIGltYWdlIHdoaWNoIHVzZXMgdGhlIGFscGhhIGNoYW5uZWwuIE5vIGNvbXByZXNzaW9uIHBvc3NpYmxlLlwiLFxyXG4gICAgICAgICAgICBlcnJvcjogXCJQTkdfV0lUSF9BTFBIQVwiXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4ID0gY3ZzLmdldENvbnRleHQoJzJkJywgeydhbHBoYSc6IGZhbHNlfSk7XHJcbiAgICAgICAgY3R4Py5kcmF3SW1hZ2Uob3JpZW50ZWRJbWcsIDAsIDApO1xyXG4gICAgICAgIHNlbGYuZ2V0Q29tcHJlc3NlZEZpbGUoY3ZzLCA1MCwgbWF4U2l6ZUluTUIsIDEpLnRoZW4oKGNvbXByZXNzZWRGaWxlKSA9PiB7XHJcbiAgICAgICAgICBjb21wcmVzc2VkRmlsZVN1YmplY3QubmV4dChjb21wcmVzc2VkRmlsZSk7XHJcbiAgICAgICAgICBzZWxmLmxvZ0V4ZWN1dGlvblRpbWUobG9nRXhlY3V0aW9uVGltZSk7XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICBjb21wcmVzc2VkRmlsZVN1YmplY3QuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgc2VsZi5sb2dFeGVjdXRpb25UaW1lKGxvZ0V4ZWN1dGlvblRpbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGltZy5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcclxuICAgIHJldHVybiBjb21wcmVzc2VkRmlsZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBnZXRDb21wcmVzc2VkRmlsZShjdnM6IEhUTUxDYW52YXNFbGVtZW50LCBxdWFsaXR5OiBudW1iZXIsIG1heFNpemVJbk1COiBudW1iZXIsIGN1cnJlbnRTdGVwOiBudW1iZXIpOiBQcm9taXNlPEZpbGU+IHtcclxuICAgIGxldCByZXN1bHQ6IFByb21pc2U8RmlsZT4gPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGN2cy50b0Jsb2IoKGJsb2IpID0+IHtcclxuXHJcbiAgICAgICAgaWYoIWJsb2Ipe1xyXG4gICAgICAgICAgcmV0dXJuIHJlamVjdCh7XHJcbiAgICAgICAgICAgIGNvbXByZXNzZWRGaWxlOiBudWxsLFxyXG4gICAgICAgICAgICByZWFzb246IFwiQmxvYiBlcnJvclwiLFxyXG4gICAgICAgICAgICBlcnJvcjogXCJCQURfQkxPQlwiXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50U3RlcCArIDEgPiBNQVhfU1RFUFMpIHtcclxuICAgICAgICAgIC8vQ09NUFJFU1NJT04gRU5EXHJcbiAgICAgICAgICAvL21heGltYWwgc3RlcHMgcmVhY2hlZFxyXG4gICAgICAgICAgcmVqZWN0KHtcclxuICAgICAgICAgICAgY29tcHJlc3NlZEZpbGU6IHRoaXMuZ2V0UmVzdWx0RmlsZShibG9iKSxcclxuICAgICAgICAgICAgcmVhc29uOiBcIkNvdWxkIG5vdCBmaW5kIHRoZSBjb3JyZWN0IGNvbXByZXNzaW9uIHF1YWxpdHkgaW4gXCIgKyBNQVhfU1RFUFMgKyBcIiBzdGVwcy5cIixcclxuICAgICAgICAgICAgZXJyb3I6IFwiTUFYX1NURVBTX0VYQ0VFREVEXCJcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsZXQgbmV3UXVhbGl0eSA9IHRoaXMuZ2V0Q2FsY3VsYXRlZFF1YWxpdHkoYmxvYiwgcXVhbGl0eSwgbWF4U2l6ZUluTUIsIGN1cnJlbnRTdGVwKTtcclxuICAgICAgICAgIHRoaXMuY2hlY2tDb21wcmVzc2lvblN0YXR1cyhjdnMsIGJsb2IsIHF1YWxpdHksIG1heFNpemVJbk1CLCBjdXJyZW50U3RlcCwgbmV3UXVhbGl0eSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgIHJlamVjdChyZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIFwiaW1hZ2UvanBlZ1wiLCBxdWFsaXR5IC8gMTAwKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UmVzdWx0RmlsZShibG9iOiBCbG9iKTogRmlsZSB8IG51bGwge1xyXG5cclxuICAgIGlmKCF0aGlzLmluaXRpYWxGaWxlKXtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVSZXN1bHRGaWxlKGJsb2IsIHRoaXMuaW5pdGlhbEZpbGUubmFtZSwgdGhpcy5pbml0aWFsRmlsZS50eXBlLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdlbmVyYXRlUmVzdWx0RmlsZShibG9iOiBCbG9iLCBuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgbGFzdE1vZGlmaWVkOiBudW1iZXIpOiBGaWxlIHtcclxuICAgIGxldCByZXN1bHRGaWxlID0gbmV3IEJsb2IoW2Jsb2JdLCB7dHlwZTogdHlwZX0pO1xyXG4gICAgcmV0dXJuIHRoaXMuYmxvYlRvRmlsZShyZXN1bHRGaWxlLCBuYW1lLCBsYXN0TW9kaWZpZWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBibG9iVG9GaWxlKGJsb2I6IEJsb2IsIG5hbWU6IHN0cmluZywgbGFzdE1vZGlmaWVkOiBudW1iZXIpOiBGaWxlIHtcclxuICAgIGxldCBmaWxlOiBhbnkgPSBibG9iO1xyXG4gICAgZmlsZS5uYW1lID0gbmFtZTtcclxuICAgIGZpbGUubGFzdE1vZGlmaWVkID0gbGFzdE1vZGlmaWVkO1xyXG5cclxuICAgIC8vQ2FzdCB0byBhIEZpbGUoKSB0eXBlXHJcbiAgICByZXR1cm4gPEZpbGU+ZmlsZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Q2FsY3VsYXRlZFF1YWxpdHkoYmxvYjogQmxvYiwgcXVhbGl0eTogbnVtYmVyLCBtYXhTaXplSW5NQjogbnVtYmVyLCBjdXJyZW50U3RlcDogbnVtYmVyKTogbnVtYmVyIHtcclxuXHJcbiAgICBpZighdGhpcy5pbml0aWFsRmlsZSl7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vQ0FMQ1VMQVRFIE5FVyBRVUFMSVRZXHJcbiAgICBsZXQgY3VycmVudFNpemUgPSBibG9iLnNpemUgLyAxMDI0IC8gMTAyNDtcclxuICAgIGxldCByYXRpb01heFNpemVUb0N1cnJlbnRTaXplID0gbWF4U2l6ZUluTUIgLyBjdXJyZW50U2l6ZTtcclxuICAgIGlmIChyYXRpb01heFNpemVUb0N1cnJlbnRTaXplID4gNSkge1xyXG4gICAgICAvL21heCByYXRpbyB0byBhdm9pZCBleHRyZW1lIHF1YWxpdHkgdmFsdWVzXHJcbiAgICAgIHJhdGlvTWF4U2l6ZVRvQ3VycmVudFNpemUgPSA1O1xyXG4gICAgfVxyXG4gICAgbGV0IHJhdGlvTWF4U2l6ZVRvSW5pdGlhbFNpemUgPSBjdXJyZW50U2l6ZSAvICh0aGlzLmluaXRpYWxGaWxlLnNpemUgLyAxMDI0IC8gMTAyNCk7XHJcbiAgICBpZiAocmF0aW9NYXhTaXplVG9Jbml0aWFsU2l6ZSA8IDAuMDUpIHtcclxuICAgICAgLy9taW4gcmF0aW8gdG8gYXZvaWQgZXh0cmVtZSBxdWFsaXR5IHZhbHVlc1xyXG4gICAgICByYXRpb01heFNpemVUb0luaXRpYWxTaXplID0gMC4wNTtcclxuICAgIH1cclxuICAgIGxldCBuZXdRdWFsaXR5ID0gMDtcclxuICAgIGxldCBtdWx0aXBsaWNhdG9yID0gTWF0aC5hYnMocmF0aW9NYXhTaXplVG9Jbml0aWFsU2l6ZSAtIDEpICogMTAgLyAoY3VycmVudFN0ZXAgKiAxLjcpIC8gcmF0aW9NYXhTaXplVG9DdXJyZW50U2l6ZTtcclxuICAgIGlmIChtdWx0aXBsaWNhdG9yIDwgMSkge1xyXG4gICAgICBtdWx0aXBsaWNhdG9yID0gMTtcclxuICAgIH1cclxuICAgIGlmIChyYXRpb01heFNpemVUb0N1cnJlbnRTaXplID49IDEpIHtcclxuICAgICAgbmV3UXVhbGl0eSA9IHF1YWxpdHkgKyAocmF0aW9NYXhTaXplVG9DdXJyZW50U2l6ZSAtIDEpICogMTAgKiBtdWx0aXBsaWNhdG9yO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbmV3UXVhbGl0eSA9IHF1YWxpdHkgLSAoMSAtIHJhdGlvTWF4U2l6ZVRvQ3VycmVudFNpemUpICogMTAgKiBtdWx0aXBsaWNhdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuZXdRdWFsaXR5ID4gMTAwKSB7XHJcbiAgICAgIC8vbWF4IHF1YWxpdHkgPSAxMDAsIHNvIGxldCdzIHNldCB0aGUgbmV3IHF1YWxpdHkgdG8gdGhlIHZhbHVlIGluIGJldHdlZW4gdGhlIG9sZCBxdWFsaXR5IGFuZCAxMDAgaW4gY2FzZSBvZiA+IDEwMFxyXG4gICAgICBuZXdRdWFsaXR5ID0gcXVhbGl0eSArICgxMDAgLSBxdWFsaXR5KSAvIDI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5ld1F1YWxpdHkgPCAwKSB7XHJcbiAgICAgIC8vbWluIHF1YWxpdHkgPSAwLCBzbyBsZXQncyBzZXQgdGhlIG5ldyBxdWFsaXR5IHRvIHRoZSB2YWx1ZSBpbiBiZXR3ZWVuIHRoZSBvbGQgcXVhbGl0eSBhbmQgMCBpbiBjYXNlIG9mIDwgMFxyXG4gICAgICBuZXdRdWFsaXR5ID0gcXVhbGl0eSAtIHF1YWxpdHkgLyAyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld1F1YWxpdHk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNoZWNrQ29tcHJlc3Npb25TdGF0dXMoY3ZzOiBIVE1MQ2FudmFzRWxlbWVudCwgYmxvYjogQmxvYiwgcXVhbGl0eTogbnVtYmVyLCBtYXhTaXplSW5NQjogbnVtYmVyLCBjdXJyZW50U3RlcDogbnVtYmVyLCBuZXdRdWFsaXR5OiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdDogUHJvbWlzZTxhbnk+ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpZiAocXVhbGl0eSA9PT0gMTAwICYmIG5ld1F1YWxpdHkgPj0gMTAwKSB7XHJcbiAgICAgICAgLy9DT01QUkVTU0lPTiBFTkRcclxuICAgICAgICAvL1NlZW1zIGxpa2UgcXVhbGl0eSAxMDAgaXMgbWF4IGJ1dCBmaWxlIHN0aWxsIHRvbyBzbWFsbCwgY2FzZSB0aGF0IHNob3VsZG4ndCBleGlzdCBhcyB0aGUgY29tcHJlc3Npb24gc2hvdWxkbid0IGV2ZW4gaGF2ZSBzdGFydGVkIGluIHRoZSBmaXJzdCBwbGFjZVxyXG4gICAgICAgIHJlamVjdCh7XHJcbiAgICAgICAgICBjb21wcmVzc2VkRmlsZTogdGhpcy5pbml0aWFsRmlsZSxcclxuICAgICAgICAgIHJlYXNvbjogXCJVbmZvcnR1bmF0ZWx5IHRoZXJlIHdhcyBhbiBlcnJvciB3aGlsZSBjb21wcmVzc2luZyB0aGUgZmlsZS5cIixcclxuICAgICAgICAgIGVycm9yOiBcIkZJTEVfQklHR0VSX1RIQU5fSU5JVElBTF9GSUxFXCJcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmICgocXVhbGl0eSA8IDEpICYmIChuZXdRdWFsaXR5IDwgcXVhbGl0eSkpIHtcclxuICAgICAgICAvL0NPTVBSRVNTSU9OIEVORFxyXG4gICAgICAgIC8vRmlsZSBzaXplIHN0aWxsIHRvbyBiaWcgYnV0IGNhbid0IGNvbXByZXNzIGZ1cnRoZXIgdGhhbiBxdWFsaXR5PTBcclxuICAgICAgICByZWplY3Qoe1xyXG4gICAgICAgICAgY29tcHJlc3NlZEZpbGU6IHRoaXMuZ2V0UmVzdWx0RmlsZShibG9iKSxcclxuICAgICAgICAgIHJlYXNvbjogXCJDb3VsZCBub3QgY29tcHJlc3MgaW1hZ2UgZW5vdWdoIHRvIGZpdCB0aGUgbWF4aW1hbCBmaWxlIHNpemUgbGltaXQuXCIsXHJcbiAgICAgICAgICBlcnJvcjogXCJVTkFCTEVfVE9fQ09NUFJFU1NfRU5PVUdIXCJcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmICgobmV3UXVhbGl0eSA+IHF1YWxpdHkpICYmIChNYXRoLnJvdW5kKHF1YWxpdHkpID09IE1hdGgucm91bmQobmV3UXVhbGl0eSkpKSB7XHJcbiAgICAgICAgLy9DT01QUkVTU0lPTiBFTkRcclxuICAgICAgICAvL25leHQgc3RlcHMgcXVhbGl0eSB3b3VsZCBiZSB0aGUgc2FtZSBxdWFsaXR5IGJ1dCBuZXdRdWFsaXR5IGlzIHNsaWdodGx5IGJpZ2dlciB0aGFuIG9sZCBvbmUsIG1lYW5zIHdlIG1vc3QgbGlrZWx5IGZvdW5kIHRoZSBuZWFyZXN0IHF1YWxpdHkgdG8gY29tcHJlc3MgdG8gbWF4aW1hbCBzaXplXHJcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmdldFJlc3VsdEZpbGUoYmxvYikpO1xyXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTdGVwID4gNSAmJiAobmV3UXVhbGl0eSA+IHF1YWxpdHkpICYmIChuZXdRdWFsaXR5IDwgcXVhbGl0eSArIDIpKSB7XHJcbiAgICAgICAgLy9DT01QUkVTU0lPTiBFTkRcclxuICAgICAgICAvL2ZvciBzb21lIHJhcmUgb2NjYXNpb25zIHRoZSBhbGdvcml0aG0gbWlnaHQgYmUgc3R1Y2sgYXJvdW5kIGUuZy4gOTguNSBhbmQgOTcuNCBiZWNhdXNlIG9mIHRoZSBtYXhRdWFsaXR5IG9mIDEwMCwgdGhlIGN1cnJlbnQgcXVhbGl0eSBpcyB0aGUgbmVhcmVzdCBwb3NzaWJsZSBxdWFsaXR5IGluIHRoYXQgY2FzZVxyXG4gICAgICAgIHJlc29sdmUodGhpcy5nZXRSZXN1bHRGaWxlKGJsb2IpKTtcclxuICAgICAgfSBlbHNlIGlmICgobmV3UXVhbGl0eSA+IHF1YWxpdHkpICYmIE51bWJlci5pc0ludGVnZXIocXVhbGl0eSkgJiYgKE1hdGguZmxvb3IobmV3UXVhbGl0eSkgPT0gcXVhbGl0eSkpIHtcclxuICAgICAgICAvL0NPTVBSRVNTSU9OIEVORFxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICAgIGluIHRoZSBwcmV2aW91cyBzdGVwIGlmICgocXVhbGl0eSA+IG5ld1F1YWxpdHkpICYmIChNYXRoLnJvdW5kKHF1YWxpdHkpID09IE1hdGgucm91bmQobmV3UXVhbGl0eSkpKSBhcHBsaWVkLCBzb1xyXG4gICAgICAgICAgICBuZXdRdWFsaXR5ID0gTWF0aC5yb3VuZChuZXdRdWFsaXR5KSAtIDE7IHRoaXMgd2FzIGRvbmUgdG8gcmVkdWNlIHRoZSBxdWFsaXR5IGF0IGxlYXN0IGEgZnVsbCBpbnRlZ2VyIGRvd24gdG8gbm90IHdhc3RlIGEgc3RlcFxyXG4gICAgICAgICAgICB3aXRoIHRoZSBzYW1lIGNvbXByZXNzaW9uIHJhdGUgcXVhbGl0eSBhcyBiZWZvcmUuIE5vdywgdGhlIG5ld1F1YWxpdHkgaXMgc3RpbGwgb25seSBpbiBiZXR3ZWVuIHRoZSBvbGQgcXVhbGl0eSAoZS5nLiA5MylcclxuICAgICAgICAgICAgYW5kIHRoZSBuZXdRdWFsaXR5IChlLmcuIDk0KSB3aGljaCBtb3N0IGxpa2VseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlIG5ld1F1YWxpdHkgKHRoZSBiaWdnZXIgb25lKSB3b3VsZCBtYWtlIHRoZSBmaWxlc2l6ZVxyXG4gICAgICAgICAgICB0b28gYmlnIHNvIHdlIHNob3VsZCBqdXN0IHN0aWNrIHdpdGggdGhlIGN1cnJlbnQsIGxvd2VyIHF1YWxpdHkgYW5kIHJldHVybiB0aGF0IGZpbGUuXHJcbiAgICAgICAgKi9cclxuICAgICAgICByZXNvbHZlKHRoaXMuZ2V0UmVzdWx0RmlsZShibG9iKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy9DT05USU5VRSBDT01QUkVTU0lPTlxyXG4gICAgICAgIGlmICgocXVhbGl0eSA+IG5ld1F1YWxpdHkpICYmIChNYXRoLnJvdW5kKHF1YWxpdHkpID09IE1hdGgucm91bmQobmV3UXVhbGl0eSkpKSB7XHJcbiAgICAgICAgICAvL3F1YWxpdHkgY2FuIG9ubHkgYmUgYW4gaW50ZWdlciAtPiBtYWtlIHN1cmUgZGlmZmVyZW5jZSBiZXR3ZWVuIG9sZCBxdWFsaXR5IGFuZCBuZXcgb25lIGlzIGF0IGxlYXN0IGEgd2hvbGUgaW50ZWdlciBudW1iZXJcclxuICAgICAgICAgIC8vIC0gaXQgd291bGQgYmUgbm9uc2Vuc2UgdG8gY29tcHJlc3MgYWdhaW4gd2l0aCB0aGUgc2FtZSBxdWFsaXR5XHJcbiAgICAgICAgICBuZXdRdWFsaXR5ID0gTWF0aC5yb3VuZChuZXdRdWFsaXR5KSAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vcmVjdXJzaXZlbHkgY2FsbCBmdW5jdGlvbiBhZ2FpblxyXG4gICAgICAgIHJlc29sdmUodGhpcy5nZXRDb21wcmVzc2VkRmlsZShjdnMsIG5ld1F1YWxpdHksIG1heFNpemVJbk1CLCBjdXJyZW50U3RlcCArIDEpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc0ltZ1VzaW5nQWxwaGEoaW1hZ2VEYXRhOmFueSk6IGJvb2xlYW4ge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWFnZURhdGEuZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xyXG4gICAgICBpZiAoaW1hZ2VEYXRhLmRhdGFbaSArIDNdICE9PSAyNTUpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsb2dFeGVjdXRpb25UaW1lKGxvZ0V4ZWN1dGlvblRpbWU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlmIChsb2dFeGVjdXRpb25UaW1lKSB7XHJcbiAgICAgIGNvbnNvbGUuaW5mbyhcIkV4ZWN1dGlvbiB0aW1lOiBcIiwgbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLnRpbWVBdFN0YXJ0ICsgXCJtc1wiKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19