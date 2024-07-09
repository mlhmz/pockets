import { CategoryType } from "@/types/CategoryType";
import { Category } from "./Category";

export const Dashboard = () => {
  return (
    <div>
      {Object.values(CategoryType).map((categoryType) => (
        <Category category={categoryType} />
      ))}
    </div>
  );
};
