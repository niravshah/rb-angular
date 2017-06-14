import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {FormWizardModule} from 'angular2-wizard/dist';

import {StickyModule} from '../../node_modules/ng2-sticky-kit/ng2-sticky-kit';

import {PostsService} from './posts.service';
import {AppComponent} from './app.component';
import {FundraiseListingComponent} from './fundraiser-listing/fundraiser-listing.component';
import {FooterComponent} from './footer/footer.component';
import {HomeHeaderComponent} from './index/home-header/header.component';
import {HomeSliderComponent} from './index/home-slider/home-slider.component';
import {TimeleftDirective} from './timeleft.directive';
import {HomeDifferenceComponent} from './index/home-difference/home-difference.component';
import {HomeOverlayComponent} from './index/home-overlay/home-overlay.component';
import {IndexComponent} from './index/index.component';

import {routing} from './app.routes';
import {LoginComponent} from './login/login.component';
import {HeaderTopComponent} from './header-top/header-top.component';
import {FundraiserDetailsComponent} from './fundraiser-detail/fundraiser-detail.component';
import {AuthGuard} from './app.authguard';
import {FundraiserHeaderComponent} from './fundraiser-detail/fundraiser-header/fundraiser-header.component';
import {LoginService} from './login/login.service';
import { EditFundraiserComponent } from './fundraiser-detail/edit-fundraiser/edit-fundraiser.component';
import { DonateComponent } from './fundraiser-detail/donate/donate.component';




@NgModule({
  declarations: [
    AppComponent,
    FundraiseListingComponent,
    FooterComponent,
    HomeHeaderComponent,
    HomeSliderComponent,
    TimeleftDirective,
    HomeDifferenceComponent,
    HomeOverlayComponent,
    IndexComponent,
    LoginComponent,
    HeaderTopComponent,
    FundraiserDetailsComponent,
    FundraiserHeaderComponent,
    EditFundraiserComponent,
    DonateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    StickyModule,
    routing,
    SimpleNotificationsModule.forRoot(),
    FormWizardModule
  ],
  providers: [PostsService, AuthGuard, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
