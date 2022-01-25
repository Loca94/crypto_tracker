import {User} from "./User";
import {Tag} from "./Tag";

export class CoinMonitored {
  id: number;
  coinId: string;
  name: string;
  symbol: string;
  alias: string;
  targetPrice: number;
  userId: number;
  user: User;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
}