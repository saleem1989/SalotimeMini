import { TestBed } from '@angular/core/testing';
import { ReservationApiService } from './reservationapi.service';
describe('ReservationapiService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ReservationApiService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=reservationapi.service.spec.js.map