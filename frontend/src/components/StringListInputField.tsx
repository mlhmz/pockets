import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Dispatch, useState } from "react";

export const StringListInputField = ({
  id,
  name,
  value,
  onChange,
}: {
  id: string;
  name: string;
  value: string[];
  onChange: Dispatch<string[]>;
}) => {
  const [keyword, setKeyword] = useState("");

  const listIncludesIgnoreCase = (entry: string) => {
    return (
      value.filter(
        (listValue) => listValue.toLowerCase() === entry.toLowerCase()
      ).length === 0
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="px-3 py-1 rounded-lg border flex justify-between items-center">
        <ul className="flex gap-2 py-2 flex-wrap flex-grow min-h-10">
          {value.map((keywordEntry) => (
            <Badge
              className="flex justify-center items-center gap-1 hover:bg-red-500 cursor-pointer"
              onClick={() =>
                onChange(value.filter((entry) => entry !== keywordEntry))
              }
            >
              {keywordEntry}{" "}
              <span>
                <X width={16} height={16} />
              </span>
            </Badge>
          ))}
        </ul>
        <p className="flex-shrink text-gray-400">
          {value.length !== 0 ? value.length : "Empty"}
        </p>
      </div>
      <div className="flex gap-2">
        <Input
          id={id}
          name={name}
          value={keyword}
          onChange={(e) => setKeyword(e.currentTarget.value)}
        />
        <Button
          onClick={() =>
            !!keyword &&
            listIncludesIgnoreCase(keyword) &&
            onChange([...value, keyword])
          }
          variant="outline"
        >
          Add
        </Button>
      </div>
    </div>
  );
};
