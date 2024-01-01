import { useContract, useContractWrite } from '@starknet-react/core';
import { GAMEADDRESS } from '../../constants/addresses';
import game from '../../constants/nogame.json';
import { type Fleet, type Position } from '../../shared/types';

export default function useSendFleet(
  fleet: Fleet,
  position: Position,
  isDebris: boolean
) {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });
  const { writeAsync, isPending } = useContractWrite({
    calls: [
      contract?.populateTransaction.send_fleet!(fleet, position, isDebris),
    ],
  });

  return { writeAsync, isPending };
}
