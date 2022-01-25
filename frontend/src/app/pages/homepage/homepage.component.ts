import { Component, OnInit } from '@angular/core';
import {Coin} from "../../models/Coin";
import {CryptoGeckoService} from "../../core/services/crypto-gecko.service";
import {SubjectService} from "../../core/services/subject.service";
import {CoinMonitoringService} from "../../core/services/coin-monitoring.service";
import {CoinMonitored} from "../../models/CoinMonitored";
import {User} from "../../models/User";

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
  showModal: boolean = false;
  selectedCoinToAddInWatchlist: Coin;
  private user: User;

  constructor(
    private cryptoGeckoService: CryptoGeckoService,
    public subjectService: SubjectService,
    private coinMonitoringService: CoinMonitoringService
  ) { }

  async ngOnInit(): Promise<void> {
    this.loading = false;
  
    // TODO: fetch the current user every time the page is loaded, so that the data can be filtered correctly
    this.subjectService.getUser().subscribe(user => {
      this.user = user;
      
      this.getCoinListFromCryptoGecko();
    });
  }
  
  private getCoinListFromCryptoGecko() {
    this.cryptoGeckoService.getCoinList().subscribe(
      (data: Coin[]) => {
        
        if (this.user) {
          // User is logged in and we need to filter the coin list removing the coins the user has already added to his watchlist
          this.coinList = this.removeElementsFromList(data, this.user.coinMonitored);
        } else {
          this.coinList = data;
        }
        this.loading = false;
      }
    );
  }
  
  private removeElementsFromList(data: Coin[], elementsToRemove: CoinMonitored[]) {
    return data.filter(
      (coin: Coin) => {
        return !elementsToRemove.find(
          (coinToRemove: CoinMonitored) => {
            return coinToRemove.coinId === coin.id;
          }
        );
      }
    );
  }
  
  openModalAddCoin(coin: Coin) {
    this.selectedCoinToAddInWatchlist = coin;
    this.showModal = true;
  }
  
  addCoinToWatchlist(coinExtraInformation: { alias: string; targetPrice: number; tags: string[] }) {
    this.selectedCoinToAddInWatchlist.alias = coinExtraInformation.alias;
    this.selectedCoinToAddInWatchlist.targetPrice = coinExtraInformation.targetPrice;
    this.selectedCoinToAddInWatchlist.tags = coinExtraInformation.tags;
    
    this.subjectService.getUser().subscribe(
      (user: User) => {
        if (user) {
          this.coinMonitoringService.addCoinToWatchlist(user.id, this.selectedCoinToAddInWatchlist).subscribe(
            (data: CoinMonitored) => {
              user.coinMonitored.push(data);
              this.showModal = false;
            }
          );
          user.id;
        } else {
          console.log('You must be logged in to add a coin');
        }
      }
    );
  }
}
