import { Level1 } from "./level1";
import { Level3 } from "./level3";

export type Level2 = {
  id?: number;
  code: string | null;
  name: string | null;
  level1?: Level1;
  status?: boolean;
  level1Id: number;
  Level3?: Level3[];
  createdAt?: Date;
  updatedAt?: Date;
};
