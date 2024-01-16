import { useContractRead } from '@starknet-react/core';
import { GAMEADDRESS } from '../constants/addresses';
import game from '../constants/nogame.json';
import { Fleet } from '../shared/types';
import { DefenceLevels } from '../shared/types/index';
import { BlockTag } from 'starknet';

export type SimulationResult = {
  attackerLosses: Fleet;
  defenderLosses: Fleet;
  defencesLosses: DefenceLevels;
};

export const useSimulation = (
  attcker: Fleet,
  defender: Fleet,
  defences: DefenceLevels
) => {
  const { data } = useContractRead({
    abi: game.abi,
    address: GAMEADDRESS,
    functionName: 'simulate_attack',
    args: [attcker, defender, defences],
    blockIdentifier: BlockTag.pending,
  });

  return data as SimulationResult;
};
