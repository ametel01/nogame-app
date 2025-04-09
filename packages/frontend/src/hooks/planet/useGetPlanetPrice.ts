import { useReadContract } from "@starknet-react/core";
import { PLANETADDRESS } from "../../constants/addresses";
import { BlockTag } from "starknet";
import type { Abi } from "starknet";

const priceAbi = [
  {
    type: "function",
    name: "get_current_planet_price",
    inputs: [],
    outputs: [
      {
        type: "core::integer::u128",
      },
    ],
    state_mutability: "view",
  },
] as const satisfies Abi;

export function useGetPlanetPrice() {
  const { data } = useReadContract({
    address: PLANETADDRESS,
    abi: priceAbi,
    functionName: "get_current_planet_price",
    args: undefined,
    blockIdentifier: BlockTag.PENDING,
  });
  return data as unknown as number;
}
