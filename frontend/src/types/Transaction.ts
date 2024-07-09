import { CategoryType } from "./CategoryType";

export interface Transaction {
  id?: string;
  reason?: string;
  issuer?: string;
  localDate?: Date;
  amount?: number;
  category?: CategoryType;
}

export type Transactions = Array<Transaction>;

export function calculateSum(transactions: Transactions) {
  const totalAmount = transactions.reduce((sum, transaction) => {
    return sum + (transaction.amount || 0);
  }, 0);
  return totalAmount;
}
