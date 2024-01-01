import { useContract, useContractWrite } from '@starknet-react/core';
import { GAMEADDRESS } from '../../constants/addresses';
import game from '../../constants/nogame.json';

export default function useBuild(unitName: string, quantity: number) {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });

  const calls = [contract?.populateTransaction[`${unitName}_build`]!(quantity)];

  const {
    writeAsync,
    isPending,
    data: tx,
  } = useContractWrite({
    calls,
  });

  return { writeAsync, isPending, tx };
}
