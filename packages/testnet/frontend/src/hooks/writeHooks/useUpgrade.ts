import { useContract, useContractWrite } from '@starknet-react/core';
import { InvokeFunctionResponse } from 'starknet';
import { GAMEADDRESS } from '../../constants/addresses';
import game from '../../constants/nogame.json';
import { getUpgradeType } from '../../shared/types';

// Define a type for the return value of useUpgrade
interface UseUpgradeReturnType {
  writeAsync: () => Promise<InvokeFunctionResponse>;
  tx: InvokeFunctionResponse | undefined;
}

export function useCompoundUpgrade(
  unitName: number,
  amount: number
): UseUpgradeReturnType {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });

  const name = getUpgradeType(unitName);

  const { data: tx, writeAsync } = useContractWrite({
    calls: [
      contract?.populateTransaction['process_compound_upgrade']!(
        name ? name : 20,
        amount
      ),
    ],
  });

  return { writeAsync, tx };
}

export function useTechUpgrade(
  unitName: number,
  amount: number
): UseUpgradeReturnType {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });

  const name = getUpgradeType(unitName);

  const { data: tx, writeAsync } = useContractWrite({
    calls: [
      contract?.populateTransaction['process_tech_upgrade']!(
        name ? name : 20,
        amount
      ),
    ],
  });

  return { writeAsync, tx };
}
