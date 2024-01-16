import { useContractRead } from '@starknet-react/core';
import { GAMEADDRESS } from '../constants/addresses';
import gameContract from '../constants/nogame.json';

export function useGetPlanetPoints(planetId: number | undefined) {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: gameContract.abi,
    functionName: 'get_planet_points',
    args: [Number(planetId)],
  });
  return data as unknown as number;
}
