import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { SEOServiceService } from 'src/app/services/seoservice.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  showNavigationArrows = false;
  showNavigationIndicators = false;
  images = ["/assets/img/bs-bg-1.webp","/assets/img/bs-bg-2.webp"];
  imageLoded:number=0;
  constructor(config: NgbCarouselConfig,private router:Router ,private activatedRoute:ActivatedRoute,private _seoService: SEOServiceService) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }
  ngOnInit(): void {

        var rt = this.getChild(this.activatedRoute)

        rt.data.subscribe((data: any) => {

          this._seoService.updateTitle(data.title);
          this._seoService.updateOgUrl(data.ogUrl);
          //Updating Description tag dynamically with title
          this._seoService.updateDescription(data.description)
        });
   }

  getChild(activatedRoute: ActivatedRoute):any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
  onload() {
    console.log("image loded")
    this.imageLoded++;
  }
}

const routes: Routes = [{path: '', component: HomepageComponent}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FlexLayoutModule,
    ],
  exports: [HomepageComponent],
  declarations: [HomepageComponent],
  providers: []
})
export class HomepageModule {
}
