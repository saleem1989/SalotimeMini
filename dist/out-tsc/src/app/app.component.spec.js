import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('AppComponent', function () {
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    }));
    it('should create the app', function () {
        var fixture = TestBed.createComponent(AppComponent);
        var app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
    it("should have as title 'ng-uikit-pro-standard-compile-app'", function () {
        var fixture = TestBed.createComponent(AppComponent);
        var app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('ng-uikit-pro-standard-compile-app');
    });
    it('should render title in a h1 tag', function () {
        var fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        var compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Welcome to ng-uikit-pro-standard-compile-app!');
    });
});
//# sourceMappingURL=app.component.spec.js.map