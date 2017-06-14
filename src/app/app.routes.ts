import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { FundraiserDetailsComponent } from './fundraiser-detail/fundraiser-detail.component';
import {EditFundraiserComponent} from './fundraiser-detail/edit-fundraiser/edit-fundraiser.component';
import {DonateComponent} from './fundraiser-detail/donate/donate.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'fundraisers/:id', component: FundraiserDetailsComponent, children: [
    {path: 'edit', component: EditFundraiserComponent}
  ]},
  {path: 'fundraisers/:id/donate', component: DonateComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
