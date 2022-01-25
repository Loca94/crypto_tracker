import { Component, OnInit } from '@angular/core';
import {Coin} from "../../models/Coin";
import {CryptoGeckoService} from "../../core/services/crypto-gecko.service";
import {SubjectService} from "../../core/services/subject.service";
import {CoinMonitoringService} from "../../core/services/coin-monitoring.service";
import {CoinMonitored} from "../../models/CoinMonitored";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styles: [
  ]
})
export class HomepageComponent implements OnInit {
  loading: boolean = true;
  coinList: Coin[] = [];
  p: number = 1;
  openModal: boolean = false;

  constructor(
    private cryptoGeckoService: CryptoGeckoService,
    public subjectService: SubjectService,
    private coinMonitoringService: CoinMonitoringService
  ) { }

  ngOnInit(): void {
    this.loading = false;
  
    this.cryptoGeckoService.getCoinList().subscribe(
      (data: Coin[]) => {
        this.coinList = data;
        this.loading = false;
      }
    );
  }
  
  openModalAddCoin(coin: Coin) {
    this.subjectService.getUser().subscribe(
      (user) => {
        if (user) {
          let coinMonitored: CoinMonitored = Coin.parseToCoinMonitored(coin);
          coinMonitored.userId = user.id;
          this.openModal = true;
        } else {
          console.log('You must be logged in to add a coin');
        }
      }
    );
  }
  
  addCoinToWatchlist(coin: CoinMonitored) {
    this.subjectService.getUser().subscribe(
      (user) => {
        this.coinMonitoringService.addCoinToWatchlist(user.id, coin).subscribe(
          (data) => {
            this.openModal = false;
          }
        );
      }
    );
  }

}
