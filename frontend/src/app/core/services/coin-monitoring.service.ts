import { Injectable } from '@angular/core';
import {CoinMonitored} from "../../models/CoinMonitored";
import {Coin} from "../../models/Coin";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoinMonitoringService {

  constructor(private http: HttpClient) { }
  
  addCoinToWatchlist(userId: number, coin: Coin): Observable<CoinMonitored> {
    let data = {
      userId: userId,
      coin
    };
    
    return this.http.post<CoinMonitored>(`/api/crypto-monitored/add`, data);
  }
  
  removeCoinFromWatchlist(coinId: number): Observable<any> {
    let data = {
      coinId
    };
    
    return this.http.post<CoinMonitored>(`/api/crypto-monitored/remove`, data);
  }
  
  getAllCoinsUserIsMonitoring(userId: number): Observable<CoinMonitored[]> {
    return this.http.get<CoinMonitored[]>(`/api/crypto-monitored/get-all/${userId}`);
  }
  
  getCoinUserIsMonitoring(userId: number, coinName: string): Observable<CoinMonitored> {
    return this.http.get<CoinMonitored>(`/api/crypto-monitored/get-one/${userId}/${coinName}`);
  }
  
}
