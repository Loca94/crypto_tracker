import {CoinMonitored} from "./CoinMonitored";

export class User {
  id: string;
  email: string;
  password: string;
  coinMonitored: CoinMonitored[];
  createdAt: Date;
  updatedAt: Date;
}