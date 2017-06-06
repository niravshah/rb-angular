import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {PostsService} from './posts.service';

import { AppComponent } from './app.component';
import { FundraiseListingComponent } from './fundraiser-listing/fundraiser-listing.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeSliderComponent } from './index/home-slider/home-slider.component';
import { TimeleftDirective } from './timeleft.directive';
import { HomeDifferenceComponent } from './index/home-difference/home-difference.component';
import { HomeOverlayComponent } from './index/home-overlay/home-overlay.component';
import { IndexComponent } from './index/index.component';

import {routing} from './app.routes';
import { LoginComponent } from './login/login.component';
import { HeaderTopComponent } from './header-top/header-top.component';
import { FundraiserDetailsComponent } from './fundraiser-detail/fundraiser-detail.component';
import {AuthGuard} from './app.authguard';
import { FundraiserHeaderComponent } from './fundraiser-header/fundraiser-header.component';

@NgModule({
  declarations: [
    AppComponent,
    FundraiseListingComponent,
    FooterComponent,
    HeaderComponent,
    HomeSliderComponent,
    TimeleftDirective,
    HomeDifferenceComponent,
    HomeOverlayComponent,
    IndexComponent,
    LoginComponent,
    HeaderTopComponent,
    FundraiserDetailsComponent,
    FundraiserHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [PostsService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
