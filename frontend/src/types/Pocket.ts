import { z } from "zod";
import { Transactions } from "./Transaction";

export interface Pocket {
  uuid?: string;
  name?: string;
  identifier?: string;
  description?: string;
  keywords?: string[];
  transactionSum?: number;
}

export const PocketMutation = z.object({
  name: z.string(),
  identifier: z.string(),
  description: z.string().optional(),
  keywords: z.string().array(),
});

export type PocketMutation = z.infer<typeof PocketMutation>;

export type PocketTransactions = {
  pocket?: Pocket;
  transactions?: Transactions;
};

export type Pockets = Array<Pocket>;
