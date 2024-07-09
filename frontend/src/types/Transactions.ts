interface Transactions {
  id?: string;
  reason?: string;
  issuer?: string;
  localDate?: Date;
  amount?: Number;
  category?: CategoryType
}

enum CategoryType {
  Vacation = "VACATION",
  Liability = "LIABILITY",
  Gas = "GAS",
  CarInsurance = "CAR_INSURANCE",
  PublicBroadcast = "PUBLIC_BROADCAST",
  NoCategory = "NO_CATEGORY"
}