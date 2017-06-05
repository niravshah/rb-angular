import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {PostsService} from './posts.service';

import { AppComponent } from './app.component';
import { HomeFundraisersComponent } from './index/home-fundraisers/home-fundraisers.component';
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
import { FundraiserDetailsComponent } from './fundraiser-details/fundraiser-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeFundraisersComponent,
    FooterComponent,
    HeaderComponent,
    HomeSliderComponent,
    TimeleftDirective,
    HomeDifferenceComponent,
    HomeOverlayComponent,
    IndexComponent,
    LoginComponent,
    HeaderTopComponent,
    FundraiserDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
