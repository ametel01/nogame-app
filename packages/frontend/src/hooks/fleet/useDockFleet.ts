import { useContract, useSendTransaction } from "@starknet-react/core";
import { FLEETADDRESS } from "../../constants/addresses";
import type { Abi } from "starknet";

const fleetAbi = [
  {
    type: "function",
    name: "dock_fleet",
    inputs: [
      {
        name: "mission_id",
        type: "core::integer::u32",
      },
      {
        name: "colony_id",
        type: "core::integer::u8",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
] as const satisfies Abi;

export interface UseDockFleetReturnType {
  tx: { transaction_hash: string } | undefined;
  writeAsync: () => void;
  send: () => void;
  error: Error | null;
}

export default function useDockFleet(
  missionId: number | null,
  colonyId: number = 0,
): UseDockFleetReturnType {
  const { contract } = useContract({
    abi: fleetAbi,
    address: FLEETADDRESS,
  });

  const calls =
    contract && missionId !== null
      ? [contract.populate("dock_fleet", [missionId, colonyId])]
      : undefined;

  const { send, error } = useSendTransaction({
    calls,
  });

  // Add the missing properties to match the interface
  const writeAsync = send;
  const tx = undefined;

  return { send, error, writeAsync, tx };
}
