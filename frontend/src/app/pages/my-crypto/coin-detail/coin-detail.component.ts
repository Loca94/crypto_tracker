import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CryptoGeckoService } from "../../../core/services/crypto-gecko.service";
import { forkJoin } from "rxjs";
import {Chart, ChartOptions} from "chart.js";
import {CoinHistory} from "../../../models/CoinHistory";
import 'chartjs-adapter-date-fns';


@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styles: [
  ]
})
export class CoinDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  chart: Chart;
  loading: boolean = true;
  private lastDayData: any;
  private lastWeekData: any;
  private lastMonthData: any;


  constructor(private cryptoGeckoService: CryptoGeckoService) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.fetchCoinData();
  }
  
  private fetchCoinData() {
    forkJoin({
      lastDay: this.cryptoGeckoService.getCoinHistory('bitcoin', '1'),
      lastWeek: this.cryptoGeckoService.getCoinHistory('bitcoin', '7'),
      lastMonth: this.cryptoGeckoService.getCoinHistory('bitcoin', '30'),
      coinDetails: this.cryptoGeckoService.getCoinDetails('bitcoin')
    }).subscribe(({lastDay, lastWeek, lastMonth, coinDetails}) => {
      this.loading = false;
      this.initChart(CoinHistory.formatPricesForChart(lastDay), CoinHistory.formatPricesForChart(lastWeek), CoinHistory.formatPricesForChart(lastMonth));
    });
  }
  
  private initChart(lastDayData, lastWeekData, lastMonthData): void {
    this.lastDayData = lastDayData;
    this.lastWeekData = lastWeekData;
    this.lastMonthData = lastMonthData;
    
    // @ts-ignore
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Last 24h',
            data: lastDayData,
            fill: false,
            borderColor: '#3cba9f',
            backgroundColor: '#3cba9f',
            pointBorderColor: '#3cba9f',
            pointBackgroundColor: '#c8ece2',
            pointBorderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        animation: {
          duration: 1500
        },
        scales: {
          x: {
            type: 'time'
          }
        }
      },
    });
  }
  
  changeGraphVisualization(historyRange: string): void {
    this.chart.data.datasets[0].data = this.getDataBasedOnSelectedHistoryRange(historyRange);
    this.chart.update();
  }
  
  
  getDataBasedOnSelectedHistoryRange(historyRange: string) {
    switch (historyRange) {
      case '24h':
        return this.lastDayData;
      case '7d':
        return this.lastWeekData;
      case '30d':
        return this.lastMonthData;
    }
    return undefined;
  }
}
