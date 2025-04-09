import { useReadContract } from "@starknet-react/core";
import { PLANETADDRESS } from "../../constants/addresses";
import { BlockTag } from "starknet";
import type { Abi } from "starknet";

const pointsAbi = [
  {
    type: "function",
    name: "get_planet_points",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [
      {
        type: "core::integer::u128",
      },
    ],
    state_mutability: "view",
  },
] as const satisfies Abi;

export function useGetPlanetPoints(planetId: number | undefined) {
  const { data } = useReadContract({
    address: PLANETADDRESS,
    abi: pointsAbi,
    functionName: "get_planet_points",
    args: planetId !== undefined ? [planetId] : undefined,
    blockIdentifier: BlockTag.PENDING,
  });
  return data as unknown as number;
}
