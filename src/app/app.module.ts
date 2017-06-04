import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {PostsService} from './posts.service';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { TimeleftDirective } from './timeleft.directive';
import { ParallexAboutComponent } from './parallex-about/parallex-about.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    FooterComponent,
    HeaderComponent,
    HomeSliderComponent,
    TimeleftDirective,
    ParallexAboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent, PostsComponent, FooterComponent, HeaderComponent, HomeSliderComponent, ParallexAboutComponent]
})
export class AppModule { }
