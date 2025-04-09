import React, { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { TransactionStatus } from "../ui/TransactionStatus";
import { COLONYADDRESS } from "../../constants/addresses";
import { useContract, useSendTransaction } from "@starknet-react/core";
import { StyledButton } from "../../shared/styled/Button";
import type { Abi } from "starknet";

const colonyAbi = [
  {
    type: "function",
    name: "generate_colony",
    inputs: [],
    outputs: [],
    state_mutability: "external",
  },
] as const satisfies Abi;

const StyledBox = styled(Box)(() => ({
  position: "relative",
  display: "flex",
  justifyContent: "center", // center horizontally
  alignItems: "center", // center vertically
  padding: "8px 0",
}));

interface Props {
  isActivated: boolean;
}

export function GenerateColony({ isActivated }: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const [txHash, setTxHash] = useState<string | undefined>(undefined);

  const { contract } = useContract({
    abi: colonyAbi,
    address: COLONYADDRESS,
  });

  const calls = contract
    ? [contract.populate("generate_colony", [])]
    : undefined;

  const { send } = useSendTransaction({
    calls,
    onSuccess: (tx) => {
      setTxHash(tx.transaction_hash);
    },
  });

  const handleOnClick = () => {
    send();
    setIsClicked(true);
  };

  return (
    <>
      <StyledBox>
        {isActivated ? (
          <StyledButton
            fullWidth
            style={{ margin: "4px", background: "#4A63AA" }}
            onClick={handleOnClick}
            variant="contained"
            disabled={!isActivated}
          >
            Generate Colony
          </StyledButton>
        ) : (
          <StyledButton
            fullWidth
            style={{ margin: "4px", background: "#3B3F53" }}
            variant="contained"
            disabled={!isActivated}
          >
            No Requirements
          </StyledButton>
        )}
      </StyledBox>
      {isClicked ? (
        <TransactionStatus name="Generate Colony" tx={txHash} />
      ) : (
        <></>
      )}
    </>
  );
}
