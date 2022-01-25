import {CoinMonitored} from "./CoinMonitored";

export class User {
  id: number;
  email: string;
  password: string;
  cognitoUserId: string;
  coinMonitored: CoinMonitored[];
  createdAt: Date;
  updatedAt: Date;
}