import { useReadContract } from "@starknet-react/core";
import { DEFENCEADDRESS } from "../../constants/addresses";
import { BlockTag } from "starknet";
import type { Abi } from "starknet";
import { DefenceLevels } from "../../shared/types";

const defencesAbi = [
  {
    type: "function",
    name: "get_defences_levels",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [
      {
        type: "nogame::libraries::types::Defences",
      },
    ],
    state_mutability: "external",
  },
] as const satisfies Abi;

export function useGetCelestiaAvailable(planetId: number | undefined): number {
  const { data } = useReadContract({
    address: DEFENCEADDRESS,
    abi: defencesAbi,
    functionName: "get_defences_levels",
    args: planetId !== undefined ? [planetId] : undefined,
    blockIdentifier: BlockTag.PENDING,
  });

  // Extract the celestia value from defences levels data
  if (data) {
    const defencesLevels = data as unknown as DefenceLevels;
    return Number(defencesLevels.celestia || 0);
  }

  return 0;
}
