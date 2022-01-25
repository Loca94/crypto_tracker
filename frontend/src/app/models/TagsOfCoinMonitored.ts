import {CoinMonitored} from "./CoinMonitored";
import {Tag} from "./Tag";

export class TagsOfCoinMonitored {
  id: number;
  tag: Tag;
  tagId: number
  coinMonitored: CoinMonitored;
  coinMonitoredId: number
  createdAt: Date;
  updatedAt: Date;
}