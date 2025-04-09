import { useContract, useSendTransaction } from "@starknet-react/core";
import { FLEETADDRESS } from "../../constants/addresses";
import type { Abi } from "starknet";

const fleetAbi = [
  {
    type: "function",
    name: "collect_debris",
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

export interface UseCollectDebrisReturnType {
  tx: { transaction_hash: string } | undefined;
  writeAsync: () => void;
  send: () => void;
  error: Error | null;
}

export default function useCollectDebris(
  missionId: number | null,
): UseCollectDebrisReturnType {
  const { contract } = useContract({
    abi: fleetAbi,
    address: FLEETADDRESS,
  });

  const calls =
    contract && missionId !== null
      ? [contract.populate("collect_debris", [missionId])]
      : undefined;

  const { send, error } = useSendTransaction({
    calls,
  });

  // Add the missing properties to match the interface
  const writeAsync = send;
  const tx = undefined;

  return { send, error, writeAsync, tx };
}
