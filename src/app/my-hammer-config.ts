import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
declare var Hammer: any;
// to override hammerjs touchAction none to pan-y
export class MyHammerConfig extends HammerGestureConfig {
buildHammer(element: HTMLElement) {
let mc = new Hammer(element, {
touchAction: "pan-y"
});
return mc;
}
}