import { Transaction } from "@/types/Transaction";
import { useMutation } from "@tanstack/react-query";
import { Loader, Upload } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { useAuth } from "react-oidc-context";

async function uploadCsv(file: File, token: string) {
  const result = await fetch("/api/v1/dkb", {
    method: "POST",
    body: file,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await result.json();
  return data as Transaction[];
}

export const DkbCsvUpload = () => {
  const fileSelectRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>();
  const { user } = useAuth();
  const { mutate } = useMutation({
    mutationFn: (file: File) => uploadCsv(file, user?.access_token!),
    onSuccess: () => setFile(undefined),
  });

  const onClick = () => {
    fileSelectRef.current?.click();
  };

  const onFileUploadChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.currentTarget.files?.item(0);
    if (file) {
      setFile(file);
      mutate(file);
    }
  };

  return (
    <div
      onClick={onClick}
      className="flex flex-col bg-muted hover:bg-muted/80 rounded-md border border-border items-center justify-center min-h-31 p-5 transition-all cursor-pointer w-full"
    >
      {file ? (
        <Loader className="text-muted-foreground animate-spin" />
      ) : (
        <Upload className="text-muted-foreground" width={36} height={36} />
      )}

      <input
        type="file"
        id="dkb-csv-file-upload"
        ref={fileSelectRef}
        onChange={onFileUploadChange}
        hidden
      />
      <p className="text-muted-foreground">Upload DKB CSV</p>
      <p className="text-muted-foreground text-xs">{file?.name}</p>
    </div>
  );
};
