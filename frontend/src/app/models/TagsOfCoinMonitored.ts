import {CoinMonitored} from "./CoinMonitored";
import {Tag} from "./Tag";

export class TagsOfCoinMonitored {
  id: number;
  tag: Tag;
  tagId: number
  coinMonitored: CoinMonitored;
  coinId: number
  createdAt: Date;
  updatedAt: Date;
}