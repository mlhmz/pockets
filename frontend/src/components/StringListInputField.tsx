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

  return (
    <div>
      <label htmlFor="keywords">Keywords</label>
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
            !value.includes(keyword) &&
            onChange([...value, keyword])
          }
        >
          Add
        </Button>
      </div>
      <ul className="flex gap-2 py-2 flex-wrap">
        {value.map((keywordEntry) => (
          <Badge>
            {keywordEntry}{" "}
            <span
              className="cursor-pointer"
              onClick={() =>
                onChange(value.filter((entry) => entry !== keywordEntry))
              }
            >
              <X />
            </span>
          </Badge>
        ))}
      </ul>
    </div>
  );
};
