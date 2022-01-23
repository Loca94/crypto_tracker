import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Coin} from "../../../models/Coin";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-crypto-card',
  templateUrl: './my-crypto-card.component.html',
  styles: [
  ]
})
export class MyCryptoCardComponent implements OnInit {
  @Input() coin: Coin;
  @Output() removeCoinFromWatchList = new EventEmitter<Coin>();

  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  goToCoinDetailPage() {
    this.router.navigate(
      ['/my-crypto/coin-detail'],
      { queryParams: {coinId: this.coin.id} }
    );
  }
  
  removeCoinFromWatchListEvent() {
    this.removeCoinFromWatchList.emit(this.coin);
  }

}
