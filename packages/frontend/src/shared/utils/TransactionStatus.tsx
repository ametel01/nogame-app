import { useEffect } from "react";
import { useWaitForTransaction } from "@starknet-react/core";
import { CircularProgress } from "@mui/material";

export function TransactionStatus({
  hash,
  onStatusChange,
}: {
  hash: string;
  onStatusChange: (isLoading: boolean) => void;
}) {
  const { isLoading } = useWaitForTransaction({
    hash,
    watch: true,
    retry: true,
  });

  useEffect(() => {
    onStatusChange(isLoading);
  }, [isLoading, onStatusChange]);

  return (
    <>{isLoading ? <CircularProgress size={24} color="inherit" /> : null}</>
  );
}
