export interface Transaction {
  id?: string;
  reason?: string;
  issuer?: string;
  localDate?: Date;
  amount?: number;
  category?: CategoryType;
}

export type Transactions = Array<Transaction>;

export enum CategoryType {
  Vacation = "VACATION",
  Liability = "LIABILITY",
  Gas = "GAS",
  CarInsurance = "CAR_INSURANCE",
  PublicBroadcast = "PUBLIC_BROADCAST",
  NoCategory = "NO_CATEGORY",
}
