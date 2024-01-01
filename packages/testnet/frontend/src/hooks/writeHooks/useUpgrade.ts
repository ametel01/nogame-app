import { useContract, useContractWrite } from '@starknet-react/core';
import { GAMEADDRESS } from '../../constants/addresses';
import game from '../../constants/nogame.json';

export default function useUpgrade(unitName: string, amount: number) {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });

  const {
    data: tx,
    writeAsync,
    isPending,
  } = useContractWrite({
    calls: [contract?.populateTransaction[`${unitName}_upgrade`]!(amount)],
  });

  return { writeAsync, isPending, tx };
}
