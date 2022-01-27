import { Component, OnInit } from '@angular/core';
import {Coin} from "../../models/Coin";
import {CryptoGeckoService} from "../../core/services/crypto-gecko.service";
import {SubjectService} from "../../core/services/subject.service";
import {CoinMonitoringService} from "../../core/services/coin-monitoring.service";
import {CoinMonitored} from "../../models/CoinMonitored";
import {User} from "../../models/User";
import {take} from "rxjs";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styles: [
  ]
})
export class HomepageComponent implements OnInit {
  coinList: Coin[] = [];
  p: number = 1;
  showModal: boolean = false;
  selectedCoinToAddInWatchlist: Coin;
  user: User;

  constructor(
    private cryptoGeckoService: CryptoGeckoService,
    public subjectService: SubjectService,
    private coinMonitoringService: CoinMonitoringService
  ) { }

  async ngOnInit(): Promise<void> {
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
          this.coinList = this.removeElementsFromList(data, this.user.monitoredCoins);
        } else {
          this.coinList = data;
        }
      }
    );
  }
  
  private removeElementsFromList(data: Coin[], elementsToRemove: CoinMonitored[]) {
    return data.filter(({ id: id1 }) => !elementsToRemove.some(({ coinId: id2 }) => id2 === id1))
  }
  
  openModalAddCoin(coin: Coin) {
    this.selectedCoinToAddInWatchlist = coin;
    this.showModal = true;
  }
  
  addCoinToWatchlist(coinExtraInformation: { alias: string; targetPrice: number; tags: string[] }) {
    this.selectedCoinToAddInWatchlist.alias = coinExtraInformation.alias;
    this.selectedCoinToAddInWatchlist.targetPrice = coinExtraInformation.targetPrice;
    this.selectedCoinToAddInWatchlist.tags = coinExtraInformation.tags;
    
    this.subjectService.getUser().pipe(take(1)).subscribe(
      (user: User) => {
        if (user) {
          this.coinMonitoringService.addCoinToWatchlist(user.id, this.selectedCoinToAddInWatchlist).subscribe(
            (data: CoinMonitored) => {
              
              if (user.monitoredCoins) {
                user.monitoredCoins.push(data);
              } else {
                user.monitoredCoins = [data];
              }
              
              console.log({user});
              this.subjectService.setUser(user); // updating the user in the service so that the data is updated in the component
              this.showModal = false;
            }
          );
        } else {
          console.log('You must be logged in to add a coin');
        }
      }
    );
  }
}
