export interface Transaction {
  id?: string;
  reason?: string;
  issuer?: string;
  date?: string;
  amount?: number;
  pocket?: TransactionPocket;
}

export type Transactions = Array<Transaction>;

export interface TransactionPocket {
  uuid?: string;
  name?: string;
}
