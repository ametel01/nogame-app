import { useReadContract } from "@starknet-react/core";
import { PLANETADDRESS } from "../../constants/addresses";
import { type DebrisField } from "../../shared/types";
import { BlockTag } from "starknet";
import type { Abi } from "starknet";

const debrisAbi = [
  {
    type: "function",
    name: "get_planet_debris_field",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [
      {
        type: "nogame::libraries::types::Debris",
      },
    ],
    state_mutability: "view",
  },
] as const satisfies Abi;

export function useGetDebrisField(planetId: number | undefined): DebrisField {
  const zeroDebris: DebrisField = { steel: 0, quartz: 0 };

  const { data } = useReadContract({
    address: PLANETADDRESS,
    abi: debrisAbi,
    functionName: "get_planet_debris_field",
    args: planetId !== undefined ? [planetId] : undefined,
    blockIdentifier: BlockTag.PENDING,
  });

  if (planetId === undefined) {
    return zeroDebris;
  }

  return data ? (data as unknown as DebrisField) : zeroDebris;
}
