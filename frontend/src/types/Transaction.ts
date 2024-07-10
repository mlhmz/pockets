import { CategoryType } from "./CategoryType";

export interface CategoryTransaction {
  type?: CategoryType;
  sum?: number;
  transactions?: Transactions;
}

export type CategoryTransactions = Array<CategoryTransaction>;

export interface Transaction {
  id?: string;
  reason?: string;
  issuer?: string;
  localDate?: Date;
  amount?: number;
  category?: CategoryType;
}

export type Transactions = Array<Transaction>;
