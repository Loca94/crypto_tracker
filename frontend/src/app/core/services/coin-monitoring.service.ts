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
  
  addCoinToWatchlist(userId: number, coin: CoinMonitored): Observable<CoinMonitored> {
    let data = {
      userId: userId,
      coinMonitored: coin
    };
    
    return this.http.post<CoinMonitored>(`/api/crypto-monitored/add`, data);
  }
  
  removeCoinFromWatchlist(coinId: number): Observable<any> {
    let data = {
      coinId
    };
    
    return this.http.post<CoinMonitored>(`/api/crypto-monitored/remove`, data);
  }
  
  getAllConsUserIsMonitoring(userId: number): Observable<CoinMonitored[]> {
    return this.http.get<CoinMonitored[]>(`/api/crypto-monitored/get-all/${userId}`);
  }
  
}
