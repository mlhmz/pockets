import { StringListInputField } from "@/components/StringListInputField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PocketMutation } from "@/types/Pocket";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useMutatePocket } from "./hooks/use-mutate-pocket";

export const PocketEditor = () => {
  const { register, handleSubmit, control, formState } =
    useForm<PocketMutation>({
      resolver: zodResolver(PocketMutation),
      defaultValues: {
        keywords: [],
      },
    });
  const { mutate } = useMutatePocket();

  const onSubmit = (data: PocketMutation) => {
    mutate(data);
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
      className="flex flex-col gap-5 items-center w-[80vw] m-auto p-1"
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
