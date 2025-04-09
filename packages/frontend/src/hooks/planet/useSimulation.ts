import { useReadContract } from "@starknet-react/core";
import { PLANETADDRESS } from "../../constants/addresses";
import {
  type DefenceLevels,
  type ShipsLevels,
  type SimulationResult,
  type Fleet,
} from "../../shared/types";
import { BlockTag } from "starknet";
import type { Abi } from "starknet";

const simulationAbi = [
  {
    type: "function",
    name: "simulate_attack",
    inputs: [
      {
        name: "attacker_fleet",
        type: "nogame::libraries::types::Fleet",
      },
      {
        name: "defender_fleet",
        type: "nogame::libraries::types::Fleet",
      },
      {
        name: "defences",
        type: "nogame::libraries::types::Defences",
      },
    ],
    outputs: [
      {
        type: "nogame::libraries::types::SimulationResult",
      },
    ],
    state_mutability: "view",
  },
] as const satisfies Abi;

// Convert ShipsLevels to Fleet by removing celestia
function convertToFleet(ships: ShipsLevels): Fleet {
  return {
    carrier: ships.carrier,
    scraper: ships.scraper,
    sparrow: ships.sparrow,
    frigate: ships.frigate,
    armade: ships.armade,
  };
}

export const useSimulation = (
  attacker: ShipsLevels,
  defender: ShipsLevels,
  defences: DefenceLevels,
) => {
  const { data } = useReadContract({
    abi: simulationAbi,
    address: PLANETADDRESS,
    functionName: "simulate_attack",
    args: [convertToFleet(attacker), convertToFleet(defender), defences],
    blockIdentifier: BlockTag.PENDING,
  });

  const result = data as unknown as SimulationResult;

  return { result };
};
