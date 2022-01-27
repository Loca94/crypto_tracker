import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {MyCryptoComponent} from "./pages/my-crypto/my-crypto.component";
import {Coin} from "./models/Coin";
import {CoinDetailComponent} from "./pages/my-crypto/coin-detail/coin-detail.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {VerifyAccountComponent} from "./pages/verify-account/verify-account.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'my-crypto',
    component: MyCryptoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-crypto/coin-detail',
    component: CoinDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'verify-account',
    component: VerifyAccountComponent
  },
  {
    path: '**',
    redirectTo: '/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
