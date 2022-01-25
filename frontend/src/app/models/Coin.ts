export class Coin {
  id: string;
  name: string;
  symbol: string;
  alias: string;
  targetPrice: number;
  tags: string[];
  
  static parseToCoinMonitored(coin: Coin) {
    return {
      id: null,
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      alias: null,
      targetPrice: null,
      tags: null,
      userId: null,
      user: null,
      createdAt: null,
      updatedAt: null
    }
  }
}