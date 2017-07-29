import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {LoginComponent} from './login/login.component';
import {FundraiserDetailsComponent} from './fundraiser-detail/fundraiser-detail.component';
import {EditFundraiserComponent} from './fundraiser-detail/edit-fundraiser/edit-fundraiser.component';
import {DonateComponent} from './fundraiser-detail/donate/donate.component';
import {InfoComponent} from './info/info.component';
import {HomeComponent} from './home/home.component';
import {EditAuthorComponent} from './fundraiser-detail/edit-author/edit-author.component';
import {SetupPaymentsComponent} from './fundraiser-detail/setup-payments/setup-payments.component';
import {StripeRedirectComponent} from './stripe-redirect/stripe-redirect.component';
import {FirstLoginComponent} from './first-login/first-login.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {LogoutComponent} from 'app/logout/logout.component';
import {GoLiveComponent} from './fundraiser-detail/go-live/go-live.component';
import {ShareComponent} from './fundraiser-detail/share/share.component';
import {SignupComponent} from './signup/signup.component';
import {PersonalInvitesComponent} from './fundraiser-detail/personal-invites/personal-invites.component';


export const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'first-login', component: FirstLoginComponent},
    {path: 'reset-password', component: ResetPasswordComponent},
    {path: 'home', component: HomeComponent},
    {path: 'info', component: InfoComponent},
    {
      path: 'fundraisers/:id', component: FundraiserDetailsComponent, children: [
      {path: 'edit', component: EditFundraiserComponent},
      {path: 'edit-author', component: EditAuthorComponent},
      {
        path: 'setup-payments', children: [
        {path: '', component: SetupPaymentsComponent}
      ]
      },
      {path: 'go-live', component: GoLiveComponent},
      {path: 'donate', component: DonateComponent},
      {path: 'share', component: ShareComponent},
      {path: 'invite', component: PersonalInvitesComponent}
    ]
    },
    {path: 'stripe-connect', component: StripeRedirectComponent},

  ]
;

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
