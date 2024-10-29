import { Button } from "@/components/ui/button";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useQueryPockets } from "@/pocket/hooks/use-query-pockets";
import { Transaction, TransactionMutation } from "@/types/Transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@radix-ui/react-select";
import { Controller, useForm } from "react-hook-form";
import { useMutateTransaction } from "./hooks/use-mutate-transaction";

export const TransactionEditor = ({
  transaction,
  onSuccess,
}: {
  transaction: Transaction;
  onSuccess: () => void;
}) => {
  const { register, formState, handleSubmit, control } =
    useForm<TransactionMutation>({
      resolver: zodResolver(TransactionMutation),
      defaultValues: {
        forceReason: transaction.forceReason,
        // Only set pocket uuid when pocket was forced before
        pocketUuid: transaction.pocketForced
          ? transaction.pocket?.uuid
          : undefined,
        hideForced: transaction.hideForced,
        pocketForced: transaction.pocketForced,
      },
    });
  const { data: pockets } = useQueryPockets();
  const { mutate } = useMutateTransaction({
    transactionId: transaction.id ?? "",
  });

  const renderFieldError = (value: keyof TransactionMutation) => {
    const fieldError = formState.errors[value];
    return fieldError && <p className="text-red-500">{fieldError.message}</p>;
  };

  const onSubmit = (transactionMutation: TransactionMutation) => {
    mutate(transactionMutation, { onSuccess: onSuccess });
  };

  return (
    <div className="flex flex-col gap-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-3"
      >
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="pocket-forced"
              {...register("pocketForced")}
            />
            <label htmlFor="pocketForced">Force Pocket</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="hide-forced"
              {...register("hideForced", {})}
            />
            <label htmlFor="hideForced">Hide</label>
          </div>
        </div>
        {renderFieldError("pocketForced")}
        {renderFieldError("hideForced")}
        <div>
          <label htmlFor="pocketUuid">Pocket</label>
          <Controller
            control={control}
            name="pocketUuid"
            render={({ field: { onChange, value, name } }) => (
              <Select name={name} value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Auto" />
                </SelectTrigger>
                <SelectContent>
                  {pockets &&
                    pockets?.map(
                      (pocket) =>
                        pocket.uuid && (
                          <SelectItem value={pocket.uuid}>
                            {pocket.name}
                          </SelectItem>
                        )
                    )}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="w-full">
          <label htmlFor="forceReason">Force Reason</label>
          <Textarea id="force-reason" {...register("forceReason")} />
          {renderFieldError("forceReason")}
        </div>
      </form>
      <Button className="self-end" onClick={handleSubmit(onSubmit)}>
        Update
      </Button>
    </div>
  );
};
