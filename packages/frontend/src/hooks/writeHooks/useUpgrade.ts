import { useCallback } from "react";
import { useContract } from "@starknet-react/core";
import { useContractWrite } from "@starknet-react/core";
import { useTransactionManager } from "../useTransactionManager";
import { GAMEADDRESS } from "../../constants/addresses";
import game from "../../constants/nogame.json";

export default function useUpgrade(unitName: string) {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });

  const {
    data: tx,
    writeAsync,
    isPending,
  } = useContractWrite({
    calls: [contract?.populateTransaction[`${unitName}_upgrade`]!()],
  });

  const { add } = useTransactionManager();

  const submitTx = useCallback(async () => {
    const tx = await writeAsync();
    add(tx.transaction_hash);
  }, [writeAsync]);

  return { submitTx, isPending, tx };
}
