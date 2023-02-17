import { NgModule } from "@angular/core";
import { Ng2ImgMaxService } from "./ng2-img-max.service";
import { ImgMaxSizeService } from "./img-max-size.service";
import { ImgMaxPXSizeService } from "./img-maxpx-size.service";
import { ImgExifService } from "./img-exif.service";
import { Ng2PicaService } from './ng2-pica.service';
import * as i0 from "@angular/core";
export class Ng2ImgMaxModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWltZy1tYXgubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9uZzItaW1nLW1heC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDOztBQVlsRCxNQUFNLE9BQU8sZUFBZTs7NEdBQWYsZUFBZTs2R0FBZixlQUFlOzZHQUFmLGVBQWUsYUFUZjtRQUNULGNBQWM7UUFDZCxtQkFBbUI7UUFDbkIsaUJBQWlCO1FBQ2pCLGNBQWM7UUFDZCxnQkFBZ0I7UUFDaEIsY0FBYztLQUNmOzJGQUVVLGVBQWU7a0JBVjNCLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULGNBQWM7d0JBQ2QsbUJBQW1CO3dCQUNuQixpQkFBaUI7d0JBQ2pCLGNBQWM7d0JBQ2QsZ0JBQWdCO3dCQUNoQixjQUFjO3FCQUNmO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtOZzJJbWdNYXhTZXJ2aWNlfSBmcm9tIFwiLi9uZzItaW1nLW1heC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SW1nTWF4U2l6ZVNlcnZpY2V9IGZyb20gXCIuL2ltZy1tYXgtc2l6ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SW1nTWF4UFhTaXplU2VydmljZX0gZnJvbSBcIi4vaW1nLW1heHB4LXNpemUuc2VydmljZVwiO1xyXG5pbXBvcnQge0ltZ0V4aWZTZXJ2aWNlfSBmcm9tIFwiLi9pbWctZXhpZi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7TmcyUGljYVNlcnZpY2V9IGZyb20gJy4vbmcyLXBpY2Euc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgTmcyUGljYVNlcnZpY2UsXHJcbiAgICBJbWdNYXhQWFNpemVTZXJ2aWNlLFxyXG4gICAgSW1nTWF4U2l6ZVNlcnZpY2UsXHJcbiAgICBJbWdFeGlmU2VydmljZSxcclxuICAgIE5nMkltZ01heFNlcnZpY2UsXHJcbiAgICBOZzJQaWNhU2VydmljZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nMkltZ01heE1vZHVsZSB7XHJcbn1cclxuIl19