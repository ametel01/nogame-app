import { useContract, useSendTransaction } from "@starknet-react/core";
import { DOCKYARDADDRESS, COLONYADDRESS } from "../../constants/addresses";
import game from "../../constants/nogame.json";
import { getBuildType, getColonyBuildType } from "../../shared/types";
import type { Abi } from "starknet";

const shipAbi = [
  {
    type: "function",
    name: "process_ship_build",
    inputs: [
      {
        name: "component",
        type: "nogame::libraries::types::ShipBuildType",
      },
      {
        name: "quantity",
        type: "core::integer::u32",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "process_colony_unit_build",
    inputs: [
      {
        name: "colony_id",
        type: "core::integer::u8",
      },
      {
        name: "name",
        type: "nogame::libraries::types::ColonyBuildType",
      },
      {
        name: "quantity",
        type: "core::integer::u32",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
] as const satisfies Abi;

// Define a type for the return value of useBuild
export interface UseBuildReturnType {
  tx: { transaction_hash: string } | undefined;
  writeAsync: () => void;
  send: () => void;
  error: Error | null;
}

export function useShipBuild(
  unitName: number,
  quantity: number,
  colonyId: number,
): UseBuildReturnType {
  const { contract } = useContract({
    abi: shipAbi,
    address: DOCKYARDADDRESS,
  });

  const name =
    colonyId === 0 ? getBuildType(unitName) : getColonyBuildType(unitName);

  const calls = contract
    ? colonyId === 0
      ? [contract.populate("process_ship_build", [name ? name : 20, quantity])]
      : [
          contract.populate("process_colony_unit_build", [
            colonyId,
            name ? name : 20,
            quantity,
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

export function useDefenceBuild(
  unitName: number,
  quantity: number,
  colonyId: number,
): UseBuildReturnType {
  const { contract } = useContract({
    abi: game.abi as Abi,
    address: COLONYADDRESS,
  });

  const name =
    colonyId === 0 ? getBuildType(unitName) : getColonyBuildType(unitName);

  const calls = contract
    ? colonyId === 0
      ? [
          contract.populate("process_defence_build", [
            name ? name : 20,
            quantity,
          ]),
        ]
      : [
          contract.populate("process_colony_unit_build", [
            colonyId,
            name ? name : 20,
            quantity,
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
