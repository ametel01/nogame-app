import { useContract, useSendTransaction } from "@starknet-react/core";
import { FLEETADDRESS } from "../../constants/addresses";
import type { Abi } from "starknet";

const fleetAbi = [
  {
    type: "function",
    name: "recall_fleet",
    inputs: [
      {
        name: "mission_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
] as const satisfies Abi;

export interface UseRecallFleetReturnType {
  tx: { transaction_hash: string } | undefined;
  writeAsync: () => void;
  send: () => void;
  error: Error | null;
}

export default function useRecallFleet(
  missionId: number | null,
): UseRecallFleetReturnType {
  const { contract } = useContract({
    abi: fleetAbi,
    address: FLEETADDRESS,
  });

  const calls =
    contract && missionId !== null
      ? [contract.populate("recall_fleet", [missionId])]
      : undefined;

  const { send, error } = useSendTransaction({
    calls,
  });

  // Add the missing properties to match the interface
  const writeAsync = send;
  const tx = undefined;

  return { send, error, writeAsync, tx };
}
