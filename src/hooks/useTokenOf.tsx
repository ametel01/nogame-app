import { useAccount, useContractRead } from "@starknet-react/core";
import erc721 from "../constants/erc721.json";
import { ERC721ADDRESS } from "../constants/addresses";

export function useTokenOf() {
  const { address } = useAccount();
  const { data, isLoading } = useContractRead({
    address: ERC721ADDRESS,
    abi: erc721.abi,
    functionName: "token_of",
    args: [address!],
    watch: false,
  });

  const planetId = data as unknown as number;

  return { planetId, isLoading };
}
