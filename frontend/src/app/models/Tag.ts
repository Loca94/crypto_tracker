import {CoinMonitored} from "./CoinMonitored";

export class Tag {
  id: number;
  name: string;
  coins: CoinMonitored[];
  createdAt: Date;
  updatedAt: Date;
}