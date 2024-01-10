import { useContract, useContractWrite } from '@starknet-react/core';
import { InvokeFunctionResponse } from 'starknet';
import { GAMEADDRESS } from '../../constants/addresses';
import game from '../../constants/nogame.json';
import { getBuildType } from '../../shared/types';

// Define a type for the return value of useBuild
interface UseBuildReturnType {
  writeAsync: () => Promise<InvokeFunctionResponse>;
  tx: InvokeFunctionResponse | undefined;
}

export function useShipBuild(
  unitName: number,
  quantity: number
): UseBuildReturnType {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });

  const name = getBuildType(unitName);

  const calls = [
    contract?.populateTransaction['process_ship_build']!(
      name ? name : 20,
      quantity
    ),
  ];

  const { writeAsync, data: tx } = useContractWrite({
    calls,
  });

  return { writeAsync, tx };
}

export function useDefenceBuild(
  unitName: number,
  quantity: number
): UseBuildReturnType {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });

  const name = getBuildType(unitName);

  const calls = [
    contract?.populateTransaction['process_defence_build']!(
      name ? name : 20,
      quantity
    ),
  ];

  const { writeAsync, data: tx } = useContractWrite({
    calls,
  });

  return { writeAsync, tx };
}
