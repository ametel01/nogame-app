import React, { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { TransactionStatus } from "../ui/TransactionStatus";
import { PLANETADDRESS, COLONYADDRESS } from "../../constants/addresses";
import { useContract, useSendTransaction } from "@starknet-react/core";
import { StyledButton } from "../../shared/styled/Button";
import type { Abi } from "starknet";

const collectAbi = [
  {
    type: "function",
    name: "collect_resources",
    inputs: [],
    outputs: [
      {
        type: "nogame::libraries::types::ERC20s",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "collect_resources",
    inputs: [
      {
        name: "colony_id",
        type: "core::integer::u8",
      },
    ],
    outputs: [
      {
        type: "nogame::libraries::types::ERC20s",
      },
    ],
    state_mutability: "external",
  },
] as const satisfies Abi;

const StyledBox = styled(Box)(() => ({
  position: "relative",
  display: "flex",
  justifyContent: "center", // center horizontally
  alignItems: "center", // center vertically
}));

interface Props {
  selectedColonyId: number;
}

export function UseCollectResources({ selectedColonyId }: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const [txHash, setTxHash] = useState<string | undefined>(undefined);

  const { contract: planetContract } = useContract({
    abi: collectAbi,
    address: PLANETADDRESS,
  });

  const { contract: colonyContract } = useContract({
    abi: collectAbi,
    address: COLONYADDRESS,
  });

  const motherCalls = planetContract
    ? [planetContract.populate("collect_resources", [])]
    : undefined;

  const colonyCalls =
    colonyContract && selectedColonyId !== 0
      ? [colonyContract.populate("collect_resources", [selectedColonyId])]
      : undefined;

  const { send: motherCollect } = useSendTransaction({
    calls: motherCalls,
    onSuccess: (tx) => {
      setTxHash(tx.transaction_hash);
    },
  });

  const { send: colonyCollect } = useSendTransaction({
    calls: colonyCalls,
    onSuccess: (tx) => {
      setTxHash(tx.transaction_hash);
    },
  });

  const handleMotherOnClick = () => {
    motherCollect();
    setIsClicked(true);
  };

  const handleColonyOnClick = () => {
    colonyCollect();
    setIsClicked(true);
  };

  return (
    <>
      <StyledBox>
        <StyledButton
          fullWidth
          style={{ margin: "4px", background: "#4A63AA" }}
          onClick={
            selectedColonyId === 0 ? handleMotherOnClick : handleColonyOnClick
          }
          variant="contained"
        >
          Collect Resources
        </StyledButton>
      </StyledBox>
      {isClicked ? (
        <TransactionStatus name="Collect Resources" tx={txHash} />
      ) : (
        <></>
      )}
    </>
  );
}
