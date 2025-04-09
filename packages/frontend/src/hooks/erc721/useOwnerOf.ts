import { useReadContract } from "@starknet-react/core";
import { ERC721ADDRESS } from "../../constants/addresses";
import { BlockTag } from "starknet";
import type { Abi } from "starknet";

const erc721Abi = [
  {
    type: "function",
    name: "owner_of",
    inputs: [
      {
        name: "token_id",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    state_mutability: "view",
  },
] as const satisfies Abi;

export function useOwnerOf(planetId: number) {
  const id = { low: Number(planetId), high: 0 };
  const { data, isLoading, error } = useReadContract({
    address: ERC721ADDRESS,
    abi: erc721Abi,
    functionName: "owner_of",
    args: [id],
    watch: false,
    blockIdentifier: BlockTag.PENDING,
  });
  return { data, isLoading, error };
}
