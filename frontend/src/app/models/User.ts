import {CoinMonitored} from "./CoinMonitored";

export class User {
  id: number;
  username: string;
  email: string;
  monitoredCoins: CoinMonitored[];
  createdAt: Date;
  updatedAt: Date;
}