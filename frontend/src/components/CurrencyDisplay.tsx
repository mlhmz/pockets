interface CurrencyDisplayProps extends React.HTMLAttributes<HTMLParagraphElement> {
  value: number;
}

export const CurrencyDisplay = ({ value, ...props }: CurrencyDisplayProps) => {
  const getClassNameByValue = () => {
    if (value < 0) {
      return "text-red-600";
    } else {
      return "";
    }
  };

  return <p className={getClassNameByValue()} {...props}>{value.toFixed(2).toString().replace(".", ",")}€</p>;
};
