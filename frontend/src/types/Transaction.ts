import { z } from "zod";

export interface Transaction {
  id?: string;
  reason?: string;
  issuer?: string;
  date?: string;
  amount?: number;
  pocket?: TransactionPocket;
  hideForced?: boolean;
  pocketForced?: boolean;
  forceReason?: string;
}

export const TransactionMutation = z.object({
  forceReason: z.string().optional(),
  pocketUuid: z.string().uuid().optional(),
  pocketForced: z.boolean().optional(),
  hideForced: z.boolean().optional(),
});

export type TransactionMutation = z.infer<typeof TransactionMutation>;

export type Transactions = Array<Transaction>;

export interface TransactionPocket {
  uuid?: string;
  name?: string;
}
