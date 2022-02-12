import { Device } from "./device";
import { Level2 } from "./level2";

export type Level3 = {
  id?: number;
  code: string | null;
  name: string | null;
  level2?: Level2;
  status?: boolean;
  level2Id: number;
  Device?: Device[];
  createdAt?: Date;
  updatedAt?: Date;
};
