import {CoinMonitored} from "./CoinMonitored";

export class User {
  id: number;
  email: string;
  cognitoUserId: string;
  monitoredCoins: CoinMonitored[];
  createdAt: Date;
  updatedAt: Date;
}