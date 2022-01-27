import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Coin} from "../../models/Coin";
import {CoinHistory} from "../../models/CoinHistory";

@Injectable({
  providedIn: 'root'
})
export class CryptoGeckoService {

  constructor(private http: HttpClient) { }

  getCoinList(): Observable<Coin[]> {
    return this.http.get<Coin[]>(`${environment.basePathCryptoGecko}/coins/list`);
  }
  
  getCoinHistory(coinId: string, numDays: string): Observable<CoinHistory> {
    return this.http.get<CoinHistory>(`${environment.basePathCryptoGecko}/coins/${coinId}/market_chart`, {
      params: new HttpParams().set('vs_currency', 'eur').set('days', numDays)
    });
  }
  
  getCoinDetails(coinId: string): Observable<any> {
    return this.http.get(`${environment.basePathCryptoGecko}/coins/${coinId}`, {
      params: new HttpParams().set('tickers', true)
    });
  }
}
