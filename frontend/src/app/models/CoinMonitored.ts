import {User} from "./User";
import {Tag} from "./Tag";
import {TagsOfCoinMonitored} from "./TagsOfCoinMonitored";

export class CoinMonitored {
  id: number;
  coinId: string;
  name: string;
  symbol: string;
  alias: string;
  targetPrice: number;
  userId: number;
  user: User;
  tags: TagsOfCoinMonitored[];
  createdAt: Date;
  updatedAt: Date;
}