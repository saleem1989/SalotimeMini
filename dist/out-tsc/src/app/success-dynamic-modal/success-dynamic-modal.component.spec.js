import { async, TestBed } from '@angular/core/testing';
import { SuccessDynamicModalComponent } from './success-dynamic-modal.component';
describe('SuccessDynamicModalComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SuccessDynamicModalComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SuccessDynamicModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=success-dynamic-modal.component.spec.js.map