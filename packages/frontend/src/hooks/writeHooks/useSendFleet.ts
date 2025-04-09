import { useContract, useSendTransaction } from "@starknet-react/core";
import { FLEETADDRESS } from "../../constants/addresses";
import { type Fleet, type Position } from "../../shared/types";
import type { Abi } from "starknet";

const fleetAbi = [
  {
    type: "function",
    name: "send_fleet",
    inputs: [
      {
        name: "f",
        type: "nogame::libraries::types::Fleet",
      },
      {
        name: "destination",
        type: "nogame::libraries::types::PlanetPosition",
      },
      {
        name: "mission_type",
        type: "core::integer::u8",
      },
      {
        name: "speed_modifier",
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

export default function useSendFleet(
  fleet: Fleet,
  position: Position,
  missionCategory: number,
  speedModifier: number,
  colonyId: number,
): {
  tx: { transaction_hash: string } | undefined;
  writeAsync: () => void;
  send: () => void;
  error: Error | null;
} {
  const { contract } = useContract({
    abi: fleetAbi,
    address: FLEETADDRESS,
  });

  const calls = contract
    ? [
        contract.populate("send_fleet", [
          fleet,
          position,
          missionCategory,
          speedModifier,
          colonyId,
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
