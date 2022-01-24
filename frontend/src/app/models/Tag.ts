import {TagsOfCoinMonitored} from "./TagsOfCoinMonitored";

export class Tag {
  id: number;
  name: string;
  coins: TagsOfCoinMonitored[];
  createdAt: Date;
  updatedAt: Date;
}