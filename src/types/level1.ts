import { Level2 } from "./level2";

export type Level1 = {
  id?: number;
  code: string | null;
  name: string | null;
  status?: boolean;
  Level2?: Level2[];
  createdAt?: Date;
  updatedAt?: Date;
};
