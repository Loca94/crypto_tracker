import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CryptoGeckoService } from "../../../core/services/crypto-gecko.service";
import { forkJoin } from "rxjs";
import {Chart} from "chart.js";
import {CoinHistory} from "../../../models/CoinHistory";
import 'chartjs-adapter-date-fns';
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectService} from "../../../core/services/subject.service";
import {CoinMonitoringService} from "../../../core/services/coin-monitoring.service";
import {CoinMonitored} from "../../../models/CoinMonitored";


@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styles: [
  ]
})
export class CoinDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  chart: Chart;
  selectedHistoryVisualization: '24h' | '7d' | '30d' = '24h';
  loading: boolean = true;
  coinDetails: any;
  coinMonitored: CoinMonitored;
  private coinId: string;
  private lastDayData: any;
  private lastWeekData: any;
  private lastMonthData: any;


  constructor(
    private subjectService: SubjectService,
    private coinMonitoringService: CoinMonitoringService,
    private cryptoGeckoService: CryptoGeckoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.retrieveCoinIdFromQueryParams();
  }
  
  private retrieveCoinIdFromQueryParams(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.coinId = params.coinId;
  
      if (this.coinId)
        this.fetchCoinData();
      else
        this.goToHome();
    });
  }
  
  private goToHome() {
    this.router.navigate(['/']);
  }
  
  private async fetchCoinData() {
    forkJoin({
      lastDay: this.cryptoGeckoService.getCoinHistory(this.coinId, '1'),
      lastWeek: this.cryptoGeckoService.getCoinHistory(this.coinId, '7'),
      lastMonth: this.cryptoGeckoService.getCoinHistory(this.coinId, '30'),
      coinDetails: this.cryptoGeckoService.getCoinDetails(this.coinId),
      coinMonitored: this.subjectService.getMonitoredCoinByName(this.coinId)
    }).subscribe(({lastDay, lastWeek, lastMonth, coinDetails, coinMonitored}) => {
      this.loading = false;
      this.coinDetails = coinDetails;
      this.coinMonitored = coinMonitored;
      this.initChart(
        CoinHistory.formatPricesForChart(lastDay),
        CoinHistory.formatPricesForChart(lastWeek),
        CoinHistory.formatPricesForChart(lastMonth)
      );
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
            pointBorderWidth: 1,
            pointRadius: 0,
            pointHoverRadius: 1,
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
  
  changeGraphVisualization(historyRange: '24h' | '7d' | '30d'): void {
    this.selectedHistoryVisualization = historyRange;
    this.chart.data.datasets[0].data = this.getDataBasedOnSelectedHistoryRange(historyRange);
    this.chart.data.datasets[0].label = 'last ' + historyRange;
    this.chart.update();
  }
  
  
  getDataBasedOnSelectedHistoryRange(historyRange: '24h' | '7d' | '30d'): any {
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
