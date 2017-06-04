import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {PostsService} from './posts.service';

import { AppComponent } from './app.component';
import { OngoingFundraisersComponent } from './ongoing-fundraisers/ongoing-fundraisers.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { TimeleftDirective } from './timeleft.directive';
import { ParallexAboutComponent } from './parallex-about/parallex-about.component';
import { HomeOverlayComponent } from './home-overlay/home-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    OngoingFundraisersComponent,
    FooterComponent,
    HeaderComponent,
    HomeSliderComponent,
    TimeleftDirective,
    ParallexAboutComponent,
    HomeOverlayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent, OngoingFundraisersComponent, FooterComponent, HeaderComponent, HomeSliderComponent, ParallexAboutComponent, HomeOverlayComponent]
})
export class AppModule { }
