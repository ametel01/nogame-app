import { useContractRead } from '@starknet-react/core';
import { GAMEADDRESS } from '../constants/addresses';
import gameContract from '../constants/nogame.json';
import { type Position } from '../shared/types';

const DefaultPosition = {
  system: 0,
  orbit: 0,
};

export function usePlanetPosition(planetId: number | undefined) {
  const isValidPlanetId = planetId !== undefined && !isNaN(planetId);

  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: gameContract.abi,
    functionName: 'get_planet_position',
    args: isValidPlanetId ? [planetId] : undefined,
  });

  if (!isValidPlanetId) {
    return DefaultPosition;
  }

  return data as unknown as Position;
}
