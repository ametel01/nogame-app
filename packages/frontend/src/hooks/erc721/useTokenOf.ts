import { useReadContract } from "@starknet-react/core";
import { ERC721ADDRESS } from "../../constants/addresses";
import { BlockTag } from "starknet";
import type { Abi } from "starknet";

const tokenAbi = [
  {
    type: "function",
    name: "token_of",
    inputs: [
      {
        name: "address",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
] as const satisfies Abi;

export function useTokenOf(address: string | undefined) {
  const { data, isLoading } = useReadContract({
    address: ERC721ADDRESS,
    abi: tokenAbi,
    functionName: "token_of",
    args: address ? [address] : undefined,
    watch: false,
    blockIdentifier: BlockTag.PENDING,
  });

  const planetId = data as unknown as number;

  return { planetId, isLoading };
}
