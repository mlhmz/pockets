export const CurrencyDisplay = ({ value }: { value: number }) => {
  const getClassNameByValue = () => {
    if (value < 0) {
      return "text-red-600";
    } else {
      return "";
    }
  };

  return <p className={getClassNameByValue()}>{value.toFixed(2).toString().replace(".", ",")}€</p>;
};
