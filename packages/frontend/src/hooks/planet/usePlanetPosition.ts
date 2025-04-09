import { useReadContract } from "@starknet-react/core";
import { PLANETADDRESS } from "../../constants/addresses";
import { type Position } from "../../shared/types";
import { BlockTag } from "starknet";
import type { Abi } from "starknet";

const positionAbi = [
  {
    type: "function",
    name: "get_planet_position",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [
      {
        type: "nogame::libraries::types::PlanetPosition",
      },
    ],
    state_mutability: "view",
  },
] as const satisfies Abi;

export const DefaultPosition: Position = {
  system: 0,
  orbit: 0,
};

export function usePlanetPosition(planetId: number | undefined) {
  const isValidPlanetId = planetId !== undefined;

  const { data } = useReadContract({
    address: PLANETADDRESS,
    abi: positionAbi,
    functionName: "get_planet_position",
    args: isValidPlanetId ? [planetId] : undefined,
    blockIdentifier: BlockTag.PENDING,
  });

  if (!isValidPlanetId) {
    return DefaultPosition;
  }

  return data as unknown as Position;
}
