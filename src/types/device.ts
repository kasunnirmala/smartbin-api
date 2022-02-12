import { Level3 } from "./level3";
import { History } from "./history";

export type Device = {
  id?: number;
  binId: string | null;
  status?: boolean;
  lastUpdatedValue?: number;
  level3?: Level3;
  level3Id: number;
  createdAt?: Date;
  updatedAt?: Date;
  History?: History[];
};
