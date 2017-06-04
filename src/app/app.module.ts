import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeSliderComponent } from './home-slider/home-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    FooterComponent,
    HeaderComponent,
    HomeSliderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent, PostsComponent, FooterComponent, HeaderComponent, HomeSliderComponent]
})
export class AppModule { }
