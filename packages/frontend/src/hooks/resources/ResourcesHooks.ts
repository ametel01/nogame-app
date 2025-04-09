import { useReadContract } from "@starknet-react/core";
import { PLANETADDRESS } from "../../constants/addresses";
import { BlockTag } from "starknet";
import { type Resources } from "../../shared/types";
import type { Abi } from "starknet";

const resourcesAbi = [
  {
    type: "function",
    name: "get_spendable_resources",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [
      {
        type: "nogame::libraries::types::ERC20s",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_collectible_resources",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [
      {
        type: "nogame::libraries::types::ERC20s",
      },
    ],
    state_mutability: "view",
  },
] as const satisfies Abi;

const DefaultResources: Resources = { steel: 0, quartz: 0, tritium: 0 };

export function useSpendableResources(planetId: number) {
  const isValidPlanetId = planetId !== undefined && !isNaN(planetId);

  const { data } = useReadContract({
    address: PLANETADDRESS,
    abi: resourcesAbi,
    functionName: "get_spendable_resources",
    args: isValidPlanetId ? [planetId] : undefined,
    blockIdentifier: BlockTag.PENDING,
  });

  if (!isValidPlanetId) {
    return DefaultResources;
  }

  return data as unknown as Resources;
}

export function useCollectibleResources(planetId: number) {
  const isValidPlanetId = planetId !== undefined && !isNaN(planetId);

  const { data } = useReadContract({
    address: PLANETADDRESS,
    abi: resourcesAbi,
    functionName: "get_collectible_resources",
    args: isValidPlanetId ? [planetId] : undefined,
    blockIdentifier: BlockTag.PENDING,
  });

  if (!isValidPlanetId) {
    return DefaultResources;
  }

  return data as unknown as Resources;
}
