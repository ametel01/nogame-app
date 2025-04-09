import { useContract, useSendTransaction } from "@starknet-react/core";
import {
  COMPOUNDADDRESS,
  TECHADDRESS,
  COLONYADDRESS,
} from "../../constants/addresses";
import { getUpgradeType, getColonyUpgradeType } from "../../shared/types";
import type { Abi } from "starknet";

const upgradeAbi = [
  {
    type: "function",
    name: "process_upgrade",
    inputs: [
      {
        name: "component",
        type: "nogame::libraries::types::CompoundUpgradeType",
      },
      {
        name: "quantity",
        type: "core::integer::u8",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "process_tech_upgrade",
    inputs: [
      {
        name: "component",
        type: "nogame::libraries::types::TechUpgradeType",
      },
      {
        name: "quantity",
        type: "core::integer::u8",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "process_colony_compound_upgrade",
    inputs: [
      {
        name: "colony_id",
        type: "core::integer::u8",
      },
      {
        name: "component",
        type: "nogame::libraries::types::CompoundUpgradeType",
      },
      {
        name: "quantity",
        type: "core::integer::u8",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
] as const satisfies Abi;

// Define a type for the return value of useUpgrade
export interface UseUpgradeReturnType {
  tx: { transaction_hash: string } | undefined;
  writeAsync: () => void;
  send: () => void;
  error: Error | null;
}

export function useCompoundUpgrade(
  unitName: number,
  amount: number,
  colonyId: number,
): UseUpgradeReturnType {
  const { contract } = useContract({
    abi: upgradeAbi,
    address: COMPOUNDADDRESS,
  });

  const name =
    colonyId === 0 ? getUpgradeType(unitName) : getColonyUpgradeType(unitName);

  const calls = contract
    ? colonyId === 0
      ? [contract.populate("process_upgrade", [name ?? 20, amount])]
      : [
          contract.populate("process_colony_compound_upgrade", [
            colonyId,
            name ?? 20,
            amount,
          ]),
        ]
    : undefined;

  const { send, error } = useSendTransaction({
    calls,
  });

  // Add the missing properties to match the interface
  const writeAsync = send;
  const tx = undefined;

  return { send, error, writeAsync, tx };
}

export function useTechUpgrade(
  unitName: number,
  amount: number,
): UseUpgradeReturnType {
  const { contract } = useContract({
    abi: upgradeAbi,
    address: TECHADDRESS,
  });

  const name = getUpgradeType(unitName);

  const calls = contract
    ? [contract.populate("process_tech_upgrade", [name ? name : 20, amount])]
    : undefined;

  const { send, error } = useSendTransaction({
    calls,
  });

  // Add the missing properties to match the interface
  const writeAsync = send;
  const tx = undefined;

  return { send, error, writeAsync, tx };
}
