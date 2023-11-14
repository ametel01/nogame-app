import { useState } from "react";
import { useContract } from "@starknet-react/core";
import { useContractWrite } from "@starknet-react/core";
import { TransactionStatus } from "../../shared/utils/TransactionStatus";
import { StyledButton } from "../../shared/styled/Button";
import { useTransactionManager } from "../../hooks/useTransactionManager";
// import { TransactionStatus } from "../../shared/utils/TransactionStatus";
import { GAMEADDRESS } from "../../constants/addresses";
import game from "../../constants/nogame.json";

interface Props {
  unitName: string;
  disabled?: boolean;
  noRequirements?: boolean;
}

export function TestButton({ unitName, disabled, noRequirements }: Props) {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });
  const { writeAsync, isLoading: isContractLoading } = useContractWrite({
    calls: [contract?.populateTransaction[`${unitName}_upgrade`]!()],
  });

  const { add, hashes } = useTransactionManager();

  const [isTransactionLoading, setAnyTransactionLoading] = useState(false);

  const handleTransactionStatus = (loading: boolean) => {
    setAnyTransactionLoading(loading);
  };

  const submitTx = async () => {
    const tx = await writeAsync({});
    add(tx.transaction_hash);
  };

  return (
    <div>
      {!disabled && !noRequirements && (
        <StyledButton
          onClick={submitTx}
          fullWidth={true}
          disabled={isContractLoading || isTransactionLoading} // Disable button if any transaction or contract is loading
          sx={{
            background: "#4A63AA",
            position: "relative",
          }}
        >
          {isContractLoading || isTransactionLoading ? null : "Upgrade"}
          {hashes.map((hash) => (
            <TransactionStatus
              key={hash}
              hash={hash}
              onStatusChange={(loading) => handleTransactionStatus(loading)}
            />
          ))}
        </StyledButton>
      )}
      {!disabled && noRequirements && (
        <StyledButton
          disabled
          fullWidth={true}
          sx={{
            background: "#3B3F53",
          }}
        >
          "No Requirements"
        </StyledButton>
      )}
      {disabled && (
        <StyledButton
          fullWidth={true}
          disabled
          sx={{
            background: "#E67E51",
          }}
        >
          "Needs Resources"
        </StyledButton>
      )}
    </div>
  );
}
