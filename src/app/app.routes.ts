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
import {StripeRedirectComponent} from "./stripe-redirect/stripe-redirect.component";
import {StripeCreateAccountComponent} from "./fundraiser-detail/setup-payments/stripe-create-account/stripe-create-account.component";
import {FirstLoginComponent} from "./first-login/first-login.component";
import {ResetPasswordComponent} from "./first-login/reset-password/reset-password.component";

export const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'login', component: LoginComponent},
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
        {path: '', component: SetupPaymentsComponent},
        {path: 'create-stripe-account', component: StripeCreateAccountComponent}
      ]
      },
      {path: 'donate', component: DonateComponent}
    ]
    },
    {path: 'stripe-connect', component: StripeRedirectComponent},

  ]
;

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
