import { Component, OnInit } from '@angular/core';
import {CryptoGeckoService} from "../../core/services/crypto-gecko.service";
import {Coin} from "../../models/Coin";
import {DropdownAnimation} from "../../shared/animations/dropdown.animation";

@Component({
  selector: 'app-my-crypto',
  templateUrl: './my-crypto.component.html',
  styles: [],
  animations: [
    DropdownAnimation.dropdownAnimation
  ]
})
export class MyCryptoComponent implements OnInit {
  coinList: Coin[];
  coinsInWatchList: Coin[] = [];
  showCoinsDropdown: boolean = false;
  loading: boolean = true;

  constructor(
    private cryptoGeckoService: CryptoGeckoService,
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
  
  addCoinToWatchList(coin: Coin): void {
    this.showCoinsDropdown = false;
    this.coinsInWatchList.push(coin);
    
    console.log(this.coinsInWatchList);
    
    // TODO: gestire la casisitica di coin già selezionate dall'utente. come le filtro? Con delle pipes??
  }
  
  removeCoinFromWatchList(coin: Coin): void {
    this.coinsInWatchList = this.coinsInWatchList.filter(c => c.id !== coin.id);
    
    // TODO: chiamta api che elimina il coin dalla lista dei coin in osservazione
  }
  
  trackCoinId(index: number, coin: Coin) {
    return coin.id;
  }
}
