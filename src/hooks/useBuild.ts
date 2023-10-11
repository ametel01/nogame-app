import { useContractWrite } from "@starknet-react/core";
import { GAMEADDRESS } from "../constants/addresses";

export default function useBuild(unitName: string, quantity: number) {
  const tx = {
    contractAddress: GAMEADDRESS,
    entrypoint: `${unitName}_build`,
    calldata: [quantity],
  };
  const { write, isLoading } = useContractWrite({ calls: [tx] });
  return { write, isLoading };
}
