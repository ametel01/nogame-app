import { useCallback } from "react";
import { useContract } from "@starknet-react/core";
import { useContractWrite } from "@starknet-react/core";
import { useTransactionManager } from "./useTransactionManager";
import { GAMEADDRESS } from "../constants/addresses";
import game from "../constants/nogame.json";
import { Fleet, Position } from "../shared/types";

export default function useSendFleet(fleet: Fleet, position: Position) {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });
  const { writeAsync, isLoading } = useContractWrite({
    calls: [contract?.populateTransaction["send_fleet"]!(fleet, position)],
  });

  const { add } = useTransactionManager();

  const submitTx = useCallback(async () => {
    const tx = await writeAsync({});
    add(tx.transaction_hash);
  }, [writeAsync]);

  return { submitTx, isLoading };
}
