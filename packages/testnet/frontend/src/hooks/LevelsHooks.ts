import { GAMEADDRESS } from '../constants/addresses';
import game from '../constants/nogame.json';

import { useContractRead } from '@starknet-react/core';
import { type DefenceLevels, type ShipsLevels } from '../shared/types';

export function useShipsLevels(planetId: number | undefined): ShipsLevels {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: 'get_ships_levels',
    args: [planetId!],
  });
  return data as unknown as ShipsLevels;
}

export function useDefencesLevels(planetId: number | undefined): DefenceLevels {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: 'get_defences_levels',
    args: [planetId!],
  });
  return data as unknown as DefenceLevels;
}
