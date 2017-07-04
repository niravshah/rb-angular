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
import {EditBankComponent} from './fundraiser-detail/edit-bank/edit-bank.component';

export const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'info', component: InfoComponent},
    {
      path: 'fundraisers/:id', component: FundraiserDetailsComponent, children: [
      {path: 'edit', component: EditFundraiserComponent},
      {path: 'edit-author', component: EditAuthorComponent},
      {path: 'edit-bank', component: EditBankComponent},
      {path: 'donate', component: DonateComponent}
    ]
    }
  ]
;

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
