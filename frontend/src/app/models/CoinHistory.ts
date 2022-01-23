export class CoinHistory {
  prices: any[];
  total_volumes: any[];
  market_caps: any[];
  
  /**
   * @param prices
   *
   * The return object contains on the `x`attribute the Unix timestamp of the price point,
   * and on the `y` attribute the price.
   */
  static formatPricesForChart({ prices }): any[] {
    return prices.map(price => {
      return {
        x: price[0],
        y: price[1].toFixed(2)
      };
    });
  }
}