import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
import {InfoComponent} from './info/info.component';

import {routing} from './app.routes';
import {LoginComponent} from './login/login.component';
import {HeaderTopComponent} from './header-top/header-top.component';
import {FundraiserDetailsComponent} from './fundraiser-detail/fundraiser-detail.component';
import {AuthGuard} from './app.authguard';
import {FundraiserHeaderComponent} from './fundraiser-detail/fundraiser-header/fundraiser-header.component';
import {LoginService} from './login/login.service';
import {EditFundraiserComponent} from './fundraiser-detail/edit-fundraiser/edit-fundraiser.component';
import {DonateComponent} from './fundraiser-detail/donate/donate.component';
import {WizardComponent} from './form-wizard/wizard.component';
import {WizardStepComponent} from './form-wizard/wizard-step.component';
import {PostsFilter} from './posts.filter';
import {FacebookModule} from 'ngx-facebook';
import {HomeComponent} from './home/home.component';
import {PercentcalcPipe} from './percentcalc.pipe';
import {EditAuthorComponent} from './fundraiser-detail/edit-author/edit-author.component';
import {SetupPaymentsComponent} from './fundraiser-detail/setup-payments/setup-payments.component';
import {ToastyModule} from 'ng2-toasty';
import {S3UploadService} from './s3-upload.service';
import {StripeRedirectComponent} from './stripe-redirect/stripe-redirect.component';
import {StripeService} from './stripe.service';
import {StripeCreateAccountComponent} from './fundraiser-detail/setup-payments/stripe-create-account/stripe-create-account.component';
import {PhonePipe} from './phone.filter';
import {PhoneVerifyService} from './phone-verify.service';
import {FirstLoginComponent} from './first-login/first-login.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {MessageDisplayComponent} from './message-display/message-display.component';
import {FirstLoginService} from './first-login/first-login.service';
import {ResetPasswordService} from './reset-password/reset-password.service';
import { LogoutComponent } from './logout/logout.component';
import { GoLiveComponent } from './fundraiser-detail/go-live/go-live.component';
import {GoLiveService} from "./fundraiser-detail/go-live/go-live.service";
import { StripeComponentComponent } from './fundraiser-detail/donate/stripe-component/stripe-component.component';


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
    InfoComponent,
    HeaderTopComponent,
    FundraiserDetailsComponent,
    FundraiserHeaderComponent,
    EditFundraiserComponent,
    DonateComponent,
    WizardComponent,
    WizardStepComponent,
    PostsFilter,
    PhonePipe,
    HomeComponent,
    PercentcalcPipe,
    EditAuthorComponent,
    SetupPaymentsComponent,
    StripeRedirectComponent,
    StripeCreateAccountComponent,
    FirstLoginComponent,
    ResetPasswordComponent,
    MessageDisplayComponent,
    LogoutComponent,
    GoLiveComponent,
    StripeComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    StickyModule,
    routing,
    FacebookModule.forRoot(),
    ToastyModule.forRoot()
  ],
  providers: [PostsService, AuthGuard, LoginService, S3UploadService, StripeService,
    PhoneVerifyService, FirstLoginService, ResetPasswordService, GoLiveService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
