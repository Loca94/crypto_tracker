import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MyCryptoComponent } from './pages/my-crypto/my-crypto.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoinDetailComponent } from './pages/my-crypto/coin-detail/coin-detail.component';
import { HistoryChartComponent } from './shared/components/history-chart/history-chart.component';
import { NgChartsModule } from "ng2-charts";
import {NgxPaginationModule} from "ngx-pagination";
import { ModalComponent } from './shared/components/modal/modal.component';
import { VerifyAccountComponent } from './pages/verify-account/verify-account.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    NotFoundComponent,
    MyCryptoComponent,
    CoinDetailComponent,
    HistoryChartComponent,
    ModalComponent,
    VerifyAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgChartsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
