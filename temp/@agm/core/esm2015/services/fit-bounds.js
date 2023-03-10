import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, timer } from 'rxjs';
import { flatMap, map, sample, shareReplay, switchMap, } from 'rxjs/operators';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
/**
 * Class to implement when you what to be able to make it work with the auto fit bounds feature
 * of AGM.
 */
export class FitBoundsAccessor {
}
/**
 * The FitBoundsService is responsible for computing the bounds of the a single map.
 */
let FitBoundsService = class FitBoundsService {
    constructor(loader) {
        this._boundsChangeSampleTime$ = new BehaviorSubject(200);
        this._includeInBounds$ = new BehaviorSubject(new Map());
        this.bounds$ = from(loader.load()).pipe(flatMap(() => this._includeInBounds$), sample(this._boundsChangeSampleTime$.pipe(switchMap(time => timer(0, time)))), map(includeInBounds => this._generateBounds(includeInBounds)), shareReplay(1));
    }
    _generateBounds(includeInBounds) {
        const bounds = new google.maps.LatLngBounds();
        includeInBounds.forEach(b => bounds.extend(b));
        return bounds;
    }
    addToBounds(latLng) {
        const id = this._createIdentifier(latLng);
        if (this._includeInBounds$.value.has(id)) {
            return;
        }
        const map = this._includeInBounds$.value;
        map.set(id, latLng);
        this._includeInBounds$.next(map);
    }
    removeFromBounds(latLng) {
        const map = this._includeInBounds$.value;
        map.delete(this._createIdentifier(latLng));
        this._includeInBounds$.next(map);
    }
    changeFitBoundsChangeSampleTime(timeMs) {
        this._boundsChangeSampleTime$.next(timeMs);
    }
    getBounds$() {
        return this.bounds$;
    }
    _createIdentifier(latLng) {
        return `${latLng.lat}+${latLng.lng}`;
    }
};
FitBoundsService.ctorParameters = () => [
    { type: MapsAPILoader }
];
FitBoundsService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [MapsAPILoader])
], FitBoundsService);
export { FitBoundsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml0LWJvdW5kcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2ZpdC1ib3VuZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQWMsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFDTCxPQUFPLEVBQ1AsR0FBRyxFQUNILE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxHQUNWLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBYWxFOzs7R0FHRztBQUNILE1BQU0sT0FBZ0IsaUJBQWlCO0NBRXRDO0FBRUQ7O0dBRUc7QUFFSCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUszQixZQUFZLE1BQXFCO1FBSGQsNkJBQXdCLEdBQUcsSUFBSSxlQUFlLENBQVMsR0FBRyxDQUFDLENBQUM7UUFDNUQsc0JBQWlCLEdBQUcsSUFBSSxlQUFlLENBQVksSUFBSSxHQUFHLEVBQWtDLENBQUMsQ0FBQztRQUcvRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ3JDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFDckMsTUFBTSxDQUNKLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ3RFLEVBQ0QsR0FBRyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUM3RCxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQ2YsQ0FBQztJQUNKLENBQUM7SUFFTyxlQUFlLENBQ3JCLGVBQW9EO1FBRXBELE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQWtCLENBQUM7UUFDOUQsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsV0FBVyxDQUFDLE1BQThCO1FBQ3hDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3hDLE9BQU87U0FDUjtRQUNELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7UUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsTUFBOEI7UUFDN0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQztRQUN6QyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELCtCQUErQixDQUFDLE1BQWM7UUFDNUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRVMsaUJBQWlCLENBQUMsTUFBOEI7UUFDeEQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Q0FDRixDQUFBOztZQTlDcUIsYUFBYTs7QUFMdEIsZ0JBQWdCO0lBRDVCLFVBQVUsRUFBRTs2Q0FNUyxhQUFhO0dBTHRCLGdCQUFnQixDQW1ENUI7U0FuRFksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBmcm9tLCBPYnNlcnZhYmxlLCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZmxhdE1hcCxcbiAgbWFwLFxuICBzYW1wbGUsXG4gIHNoYXJlUmVwbGF5LFxuICBzd2l0Y2hNYXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExhdExuZywgTGF0TG5nQm91bmRzLCBMYXRMbmdMaXRlcmFsIH0gZnJvbSAnLi9nb29nbGUtbWFwcy10eXBlcyc7XG5pbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSAnLi9tYXBzLWFwaS1sb2FkZXIvbWFwcy1hcGktbG9hZGVyJztcblxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRml0Qm91bmRzRGV0YWlscyB7XG4gIGxhdExuZzogTGF0TG5nIHwgTGF0TG5nTGl0ZXJhbDtcbn1cblxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IHR5cGUgQm91bmRzTWFwID0gTWFwPHN0cmluZywgTGF0TG5nIHwgTGF0TG5nTGl0ZXJhbD47XG5cbi8qKlxuICogQ2xhc3MgdG8gaW1wbGVtZW50IHdoZW4geW91IHdoYXQgdG8gYmUgYWJsZSB0byBtYWtlIGl0IHdvcmsgd2l0aCB0aGUgYXV0byBmaXQgYm91bmRzIGZlYXR1cmVcbiAqIG9mIEFHTS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZpdEJvdW5kc0FjY2Vzc29yIHtcbiAgYWJzdHJhY3QgZ2V0Rml0Qm91bmRzRGV0YWlscyQoKTogT2JzZXJ2YWJsZTxGaXRCb3VuZHNEZXRhaWxzPjtcbn1cblxuLyoqXG4gKiBUaGUgRml0Qm91bmRzU2VydmljZSBpcyByZXNwb25zaWJsZSBmb3IgY29tcHV0aW5nIHRoZSBib3VuZHMgb2YgdGhlIGEgc2luZ2xlIG1hcC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZpdEJvdW5kc1NlcnZpY2Uge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgYm91bmRzJDogT2JzZXJ2YWJsZTxMYXRMbmdCb3VuZHM+O1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2JvdW5kc0NoYW5nZVNhbXBsZVRpbWUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDIwMCk7XG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5jbHVkZUluQm91bmRzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Qm91bmRzTWFwPihuZXcgTWFwPHN0cmluZywgTGF0TG5nIHwgTGF0TG5nTGl0ZXJhbD4oKSk7XG5cbiAgY29uc3RydWN0b3IobG9hZGVyOiBNYXBzQVBJTG9hZGVyKSB7XG4gICAgdGhpcy5ib3VuZHMkID0gZnJvbShsb2FkZXIubG9hZCgpKS5waXBlKFxuICAgICAgZmxhdE1hcCgoKSA9PiB0aGlzLl9pbmNsdWRlSW5Cb3VuZHMkKSxcbiAgICAgIHNhbXBsZShcbiAgICAgICAgdGhpcy5fYm91bmRzQ2hhbmdlU2FtcGxlVGltZSQucGlwZShzd2l0Y2hNYXAodGltZSA9PiB0aW1lcigwLCB0aW1lKSkpLFxuICAgICAgKSxcbiAgICAgIG1hcChpbmNsdWRlSW5Cb3VuZHMgPT4gdGhpcy5fZ2VuZXJhdGVCb3VuZHMoaW5jbHVkZUluQm91bmRzKSksXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2VuZXJhdGVCb3VuZHMoXG4gICAgaW5jbHVkZUluQm91bmRzOiBNYXA8c3RyaW5nLCBMYXRMbmcgfCBMYXRMbmdMaXRlcmFsPixcbiAgKSB7XG4gICAgY29uc3QgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpIGFzIExhdExuZ0JvdW5kcztcbiAgICBpbmNsdWRlSW5Cb3VuZHMuZm9yRWFjaChiID0+IGJvdW5kcy5leHRlbmQoYikpO1xuICAgIHJldHVybiBib3VuZHM7XG4gIH1cblxuICBhZGRUb0JvdW5kcyhsYXRMbmc6IExhdExuZyB8IExhdExuZ0xpdGVyYWwpIHtcbiAgICBjb25zdCBpZCA9IHRoaXMuX2NyZWF0ZUlkZW50aWZpZXIobGF0TG5nKTtcbiAgICBpZiAodGhpcy5faW5jbHVkZUluQm91bmRzJC52YWx1ZS5oYXMoaWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG1hcCA9IHRoaXMuX2luY2x1ZGVJbkJvdW5kcyQudmFsdWU7XG4gICAgbWFwLnNldChpZCwgbGF0TG5nKTtcbiAgICB0aGlzLl9pbmNsdWRlSW5Cb3VuZHMkLm5leHQobWFwKTtcbiAgfVxuXG4gIHJlbW92ZUZyb21Cb3VuZHMobGF0TG5nOiBMYXRMbmcgfCBMYXRMbmdMaXRlcmFsKSB7XG4gICAgY29uc3QgbWFwID0gdGhpcy5faW5jbHVkZUluQm91bmRzJC52YWx1ZTtcbiAgICBtYXAuZGVsZXRlKHRoaXMuX2NyZWF0ZUlkZW50aWZpZXIobGF0TG5nKSk7XG4gICAgdGhpcy5faW5jbHVkZUluQm91bmRzJC5uZXh0KG1hcCk7XG4gIH1cblxuICBjaGFuZ2VGaXRCb3VuZHNDaGFuZ2VTYW1wbGVUaW1lKHRpbWVNczogbnVtYmVyKSB7XG4gICAgdGhpcy5fYm91bmRzQ2hhbmdlU2FtcGxlVGltZSQubmV4dCh0aW1lTXMpO1xuICB9XG5cbiAgZ2V0Qm91bmRzJCgpOiBPYnNlcnZhYmxlPExhdExuZ0JvdW5kcz4ge1xuICAgIHJldHVybiB0aGlzLmJvdW5kcyQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NyZWF0ZUlkZW50aWZpZXIobGF0TG5nOiBMYXRMbmcgfCBMYXRMbmdMaXRlcmFsKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7bGF0TG5nLmxhdH0rJHtsYXRMbmcubG5nfWA7XG4gIH1cbn1cbiJdfQ==