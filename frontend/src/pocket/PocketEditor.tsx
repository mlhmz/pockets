import { StringListInputField } from "@/components/StringListInputField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pocket, PocketMutation } from "@/types/Pocket";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useMutatePocket } from "./hooks/use-mutate-pocket";

export const PocketEditor = ({
  pocket,
  onSuccess,
}: {
  pocket?: Pocket;
  onSuccess: () => void;
}) => {
  const { register, handleSubmit, control, formState } =
    useForm<PocketMutation>({
      resolver: zodResolver(PocketMutation),
      defaultValues: {
        uuid: pocket?.uuid,
        description: pocket?.description,
        identifier: pocket?.identifier,
        name: pocket?.name,
        keywords: pocket?.keywords ?? [],
      },
    });
  const { mutate } = useMutatePocket();

  const onSubmit = (data: PocketMutation) => {
    mutate(data, { onSuccess: onSuccess });
  };

  const renderFieldError = (value: keyof PocketMutation) => {
    const fieldError = formState.errors[value];
    return fieldError && <p>{fieldError.message}</p>;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex flex-col gap-5 items-center m-auto w-full"
    >
      <div className="w-full">
        <label htmlFor="identifier">Identifier</label>
        <Input id="identifier" {...register("identifier")} />
        {renderFieldError("identifier")}
      </div>
      <div className="w-full">
        <label htmlFor="name">Name</label>
        <Input id="name" {...register("name")} />
        {renderFieldError("name")}
      </div>
      <div className="w-full">
        <label htmlFor="description">Description</label>
        <Textarea id="description" {...register("description")}></Textarea>
        {renderFieldError("description")}
      </div>
      <div className="w-full">
        <label htmlFor="keywords">Keywords</label>
        <Controller
          name="keywords"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <StringListInputField
              id="keywords"
              name={name}
              onChange={onChange}
              value={value}
            />
          )}
        />
        {renderFieldError("keywords")}
      </div>
      <div className="flex w-full justify-end">
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </div>
    </form>
  );
};
