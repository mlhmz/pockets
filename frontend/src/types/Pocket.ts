import { Transactions } from "./Transaction";

export interface Pocket {
  uuid?: string;
  name?: string;
  description?: string;
  keywords?: string;
  transactionSum?: number;
}

export type PocketTransactions = {
  pocket?: Pocket;
  transactions?: Transactions;
};

export type Pockets = Array<Pocket>;
