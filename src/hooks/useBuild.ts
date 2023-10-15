import { useCallback } from "react";
import { useContract } from "@starknet-react/core";
import { useContractWrite } from "@starknet-react/core";
import { useTransactionManager } from "./useTransactionManager";
import { GAMEADDRESS } from "../constants/addresses";
import game from "../constants/nogame.json";

// export default function useBuild(unitName: string, quantity: number) {
//   const tx = {
//     contractAddress: GAMEADDRESS,
//     entrypoint: `${unitName}_build`,
//     calldata: [quantity],
//   };
//   const { write, isLoading } = useContractWrite({ calls: [tx] });
//   return { write, isLoading };
// }

export default function useBuild(unitName: string, quantity: number) {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });
  const { writeAsync, isLoading } = useContractWrite({
    calls: [contract?.populateTransaction[`${unitName}_build`]!(quantity)],
  });

  const { add } = useTransactionManager();

  const submitTx = useCallback(async () => {
    const tx = await writeAsync({});
    add(tx.transaction_hash);
  }, [writeAsync]);

  return { submitTx, isLoading };
}
