import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { FundraiserDetailsComponent } from './fundraiser-detail/fundraiser-detail.component';
import { AuthGuard } from './app.authguard';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'fundraisers/:id', component: FundraiserDetailsComponent, canActivate: [AuthGuard] },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
