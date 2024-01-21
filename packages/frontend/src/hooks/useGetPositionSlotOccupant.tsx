import { useContractRead } from '@starknet-react/core';
import { GAMEADDRESS } from '../constants/addresses';
import gameContract from '../constants/nogame.json';
import { type Position } from '../shared/types';
import { BlockTag } from 'starknet';

export function useGetPositionSlotOccupant(system: number, orbit: number) {
  const position: Position = {
    system: Number(system),
    orbit: Number(orbit),
  };
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: gameContract.abi,
    functionName: 'get_position_slot_occupant',
    args: [position],
    blockIdentifier: BlockTag.pending,
  });

  return data as unknown as number;
}
