import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { TransactionStatus } from "../ui/TransactionStatus";
import { useContract, useSendTransaction } from "@starknet-react/core";
import { PLANETADDRESS, ETH_ADDRESS } from "../../constants/addresses";
import type { Abi } from "starknet";

const planetAbi = [
  {
    type: "function",
    name: "generate_planet",
    inputs: [],
    outputs: [],
    state_mutability: "external",
  },
] as const satisfies Abi;

const erc20Abi = [
  {
    type: "function",
    name: "approve",
    inputs: [
      {
        name: "spender",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "external",
  },
] as const satisfies Abi;

interface Props {
  price: number;
}

export const GeneratePlanet = ({ price }: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [txHash, setTxHash] = useState<string | undefined>(undefined);

  const { contract: planet } = useContract({
    abi: planetAbi,
    address: PLANETADDRESS,
  });

  const { contract: eth } = useContract({
    abi: erc20Abi,
    address: ETH_ADDRESS,
  });

  const calls =
    eth && planet
      ? [
          eth.populate("approve", [
            PLANETADDRESS,
            { low: Number(price), high: 0 },
          ]),
          planet.populate("generate_planet", []),
        ]
      : undefined;

  const { send } = useSendTransaction({
    calls,
    onSuccess: (tx) => {
      setTxHash(tx.transaction_hash);
      setIsPending(false);
    },
    onError: () => {
      setIsPending(false);
    },
  });

  const handleOnClick = () => {
    setIsPending(true);
    send();
    setIsClicked(true);
  };

  return (
    <Box position="relative" display="inline-flex">
      {isPending && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
      <Button
        // variant="outlined"
        size="large"
        sx={{
          color: "#E7ECEE",
          width: "345px",
          height: "75px",
          backgroundColor: "#4A63AA",
          border: "1px solid #0F111A",
          borderRadius: "8px",
          marginTop: "32px",
          fontWeight: "700",
          "&:hover": {
            background: "#212530", // Slightly lighter than #1B1E2A for a subtle hover effect
          },
        }}
        onClick={() => {
          handleOnClick();
        }}
        disabled={isPending}
      >
        Mint Planet
      </Button>
      {isClicked ? <TransactionStatus name="Mint Planet" tx={txHash} /> : <></>}
    </Box>
  );
};
