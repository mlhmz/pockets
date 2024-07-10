import {
  Car,
  CircleSlash,
  Heater,
  ShieldCheck,
  TreePalm,
  Tv,
} from "lucide-react";

export enum CategoryType {
  Vacation = "VACATION",
  Liability = "LIABILITY",
  Gas = "GAS",
  CarInsurance = "CAR_INSURANCE",
  PublicBroadcast = "PUBLIC_BROADCAST",
  NoCategory = "NO_CATEGORY",
}

export function getCategoryName(category?: CategoryType) {
  switch (category) {
    case CategoryType.Vacation:
      return "Category";
    case CategoryType.Liability:
      return "Liability";
    case CategoryType.Gas:
      return "Gas";
    case CategoryType.CarInsurance:
      return "Car Insurance";
    case CategoryType.PublicBroadcast:
      return "Public Broadcast";
    default:
      return "No Category";
  }
}

export function getCategoryIcon(category: CategoryType) {
  switch (category) {
    case CategoryType.Vacation:
      return <TreePalm />;
    case CategoryType.Liability:
      return <ShieldCheck />;
    case CategoryType.Gas:
      return <Heater />;
    case CategoryType.CarInsurance:
      return <Car />;
    case CategoryType.PublicBroadcast:
      return <Tv />;
    default:
      return <CircleSlash />;
  }
}
