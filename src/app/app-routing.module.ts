import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { HomeComponent } from './components/home/home.component';
import { LandingDashboardComponent } from './components/landing-dashboard/landing-dashboard.component';
import { LoginMiddlewareComponent } from './components/login-middleware/login-middleware.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login-middleware', component: LoginMiddlewareComponent, canActivate: [OktaAuthGuard] },
  { path: 'implicit/callback', component: OktaCallbackComponent },
  {
    path: 'dashboard', component: LandingDashboardComponent, children: [
      { path: 'home', component: HomeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
