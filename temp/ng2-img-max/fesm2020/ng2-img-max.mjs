import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as exifr from 'exifr';
import { Subject } from 'rxjs';
import * as pica from 'pica';

class ImgExifService {
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

const MAX_STEPS = 15;
class ImgMaxSizeService {
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
ImgMaxSizeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImgMaxSizeService, deps: [{ token: ImgExifService }], target: i0.ɵɵFactoryTarget.Injectable });
ImgMaxSizeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImgMaxSizeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImgMaxSizeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: ImgExifService }]; } });

const globalWindow = window;
class Ng2PicaService {
    constructor(imageExifService) {
        this.imageExifService = imageExifService;
    }
    resize(files, width, height, keepAspectRatio = false) {
        let resizedFile = new Subject();
        for (let i = 0; i < files.length; i++) {
            this.resizeFile(files[i], width, height, keepAspectRatio).then((returnedFile) => {
                resizedFile.next(returnedFile);
            }).catch((error) => {
                resizedFile.error(error);
            });
        }
        return resizedFile.asObservable();
    }
    resizeCanvas(from, to, options) {
        let result = new Promise((resolve, reject) => {
            let curPica = new pica();
            if (!curPica || !curPica.resize) {
                curPica = new globalWindow.pica();
            }
            curPica.resize(from, to, options)
                .then((response) => {
                resolve(response);
            }, (error) => {
                reject(error);
            });
        });
        return result;
    }
    resizeBuffer(options) {
        let result = new Promise((resolve, reject) => {
            let curPica = new pica();
            if (!curPica || !curPica.resizeBuffer) {
                curPica = new globalWindow.pica();
            }
            curPica.resizeBuffer(options)
                .then((response) => {
                resolve(response);
            }, (error) => {
                reject(error);
            });
        });
        return result;
    }
    resizeFile(file, width, height, keepAspectRatio = false) {
        let result = new Promise((resolve, reject) => {
            let fromCanvas = document.createElement('canvas');
            let ctx = fromCanvas.getContext('2d');
            let img = new Image();
            img.onload = () => {
                this.imageExifService.getOrientedImage(img).then(orientedImg => {
                    globalWindow.URL.revokeObjectURL(img.src);
                    fromCanvas.width = orientedImg.width;
                    fromCanvas.height = orientedImg.height;
                    ctx?.drawImage(orientedImg, 0, 0);
                    let imageData = ctx?.getImageData(0, 0, orientedImg.width, orientedImg.height);
                    if (keepAspectRatio && imageData) {
                        let ratio = Math.min(width / imageData.width, height / imageData.height);
                        width = Math.round(imageData.width * ratio);
                        height = Math.round(imageData.height * ratio);
                    }
                    let useAlpha = true;
                    if (file.type === "image/jpeg" || (file.type === "image/png" && !this.isImgUsingAlpha(imageData))) {
                        //image without alpha
                        useAlpha = false;
                        ctx = fromCanvas.getContext('2d', { 'alpha': false });
                        ctx?.drawImage(orientedImg, 0, 0);
                    }
                    let toCanvas = document.createElement('canvas');
                    toCanvas.width = width;
                    toCanvas.height = height;
                    this.resizeCanvas(fromCanvas, toCanvas, { 'alpha': useAlpha })
                        .then((resizedCanvas) => {
                        resizedCanvas.toBlob((blob) => {
                            if (!blob) {
                                return reject('error blob');
                            }
                            let newFile = this.generateResultFile(blob, file.name, file.type, new Date().getTime());
                            resolve(newFile);
                        }, file.type);
                    })
                        .catch((error) => {
                        reject(error);
                    });
                });
            };
            img.src = globalWindow.URL.createObjectURL(file);
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
}
Ng2PicaService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: Ng2PicaService, deps: [{ token: ImgExifService }], target: i0.ɵɵFactoryTarget.Injectable });
Ng2PicaService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: Ng2PicaService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: Ng2PicaService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: ImgExifService }]; } });

class ImgMaxPXSizeService {
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
ImgMaxPXSizeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImgMaxPXSizeService, deps: [{ token: Ng2PicaService }, { token: ImgExifService }], target: i0.ɵɵFactoryTarget.Injectable });
ImgMaxPXSizeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImgMaxPXSizeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImgMaxPXSizeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: Ng2PicaService }, { type: ImgExifService }]; } });

class Ng2ImgMaxService {
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
Ng2ImgMaxService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: Ng2ImgMaxService, deps: [{ token: ImgMaxSizeService }, { token: ImgMaxPXSizeService }, { token: ImgExifService }], target: i0.ɵɵFactoryTarget.Injectable });
Ng2ImgMaxService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: Ng2ImgMaxService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: Ng2ImgMaxService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: ImgMaxSizeService }, { type: ImgMaxPXSizeService }, { type: ImgExifService }]; } });

class Ng2ImgMaxModule {
}
Ng2ImgMaxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: Ng2ImgMaxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
Ng2ImgMaxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: Ng2ImgMaxModule });
Ng2ImgMaxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: Ng2ImgMaxModule, providers: [
        Ng2PicaService,
        ImgMaxPXSizeService,
        ImgMaxSizeService,
        ImgExifService,
        Ng2ImgMaxService,
        Ng2PicaService
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: Ng2ImgMaxModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        Ng2PicaService,
                        ImgMaxPXSizeService,
                        ImgMaxSizeService,
                        ImgExifService,
                        Ng2ImgMaxService,
                        Ng2PicaService
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ImgExifService, ImgMaxPXSizeService, ImgMaxSizeService, Ng2ImgMaxModule, Ng2ImgMaxService, Ng2PicaService };
//# sourceMappingURL=ng2-img-max.mjs.map
