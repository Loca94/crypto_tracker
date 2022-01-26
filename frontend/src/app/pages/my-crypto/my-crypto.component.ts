import { Component, OnInit } from '@angular/core';
import {CryptoGeckoService} from "../../core/services/crypto-gecko.service";
import {Coin} from "../../models/Coin";
import {DropdownAnimation} from "../../shared/animations/dropdown.animation";
import {CoinMonitoringService} from "../../core/services/coin-monitoring.service";
import {SubjectService} from "../../core/services/subject.service";
import {CoinMonitored} from "../../models/CoinMonitored";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-crypto',
  templateUrl: './my-crypto.component.html',
  styles: [],
  animations: [
    DropdownAnimation.dropdownAnimation
  ]
})
export class MyCryptoComponent implements OnInit {
  coinsInWatchList: CoinMonitored[] = [];
  p: number = 1;
  userId: number;

  constructor(
    private router: Router,
    public subjectService: SubjectService,
    private coinMonitoringService: CoinMonitoringService
  ) { }

  ngOnInit(): void {
    this.subjectService.getUser().subscribe(user => {
      if (user) {
        this.userId = user.id;
        this.updateCoinsInWatchlist();
      } else {
        // TODO: sarebbe da usare delle guardie. vediamo se ho tempo di implementarle
        this.router.navigate(['/login']);
      }
    });
  }
  
  private updateCoinsInWatchlist() {
    this.coinMonitoringService.getAllCoinsUserIsMonitoring(this.userId).subscribe(coins => {
      this.coinsInWatchList = coins;
    });
  }
  
  goToCoinDetailPage(coin: CoinMonitored) {
    this.router.navigate(
      ['/my-crypto/coin-detail'],
      { queryParams: { coinId: coin.coinId } }
    );
  }
  
  removeCoinFromWatchList(coin: CoinMonitored): void {
    this.coinMonitoringService.removeCoinFromWatchlist(coin.id).subscribe(() => {
      this.updateCoinsInWatchlist();
    });
  }
  
  trackCoinId(index: number, coin: Coin) {
    return coin.id;
  }
}
