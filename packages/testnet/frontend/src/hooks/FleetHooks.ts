import { InvokeFunctionResponse } from 'starknet';
import { ContractWriteVariables } from '@starknet-react/core';
import { GAMEADDRESS } from '../constants/addresses';
import game from '../constants/nogame.json';
import {
  useContractRead,
  useContract,
  useContractWrite,
} from '@starknet-react/core';
import { type HostileMission, type Mission } from '../shared/types';

interface InvokeResult {
  writeAsync: (
    args?: ContractWriteVariables | undefined
  ) => Promise<InvokeFunctionResponse>;
  data: InvokeFunctionResponse | undefined;
}

export function useGetMissionDetails(
  planetId: number,
  missionId: number
): Mission {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: 'get_mission_details',
    args: [planetId, missionId],
  });
  return data as unknown as Mission;
}

export function useGetHostileMissions(planetId: number): HostileMission[] {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: 'get_hostile_missions',
    args: [planetId],
  });
  return data as unknown as HostileMission[];
}

export function useGetActiveMissions(planetId: number): Mission[] {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: 'get_active_missions',
    args: [Number(planetId)],
  });
  return data as unknown as Mission[];
}

export function useGetIsNoobProtected(
  planetOne: number,
  planteTwo: number
): boolean {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: 'is_noob_protected',
    args: [planetOne, planteTwo],
  });
  return data as unknown as boolean;
}

export function useGetLastActive(planetId: number): number {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: 'get_last_active',
    args: [planetId],
  });
  return data as unknown as number;
}

export function useAttackPlanet(missionId: number | null): InvokeResult {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });

  const calls =
    missionId != null
      ? [contract?.populateTransaction.attack_planet!(missionId)]
      : [];

  const { writeAsync, data } = useContractWrite({
    ...(missionId != null && { calls }),
  });
  return { writeAsync, data };
}

export function useRecallFleet(missionId: number | null): InvokeResult {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });

  const calls =
    missionId != null
      ? [contract?.populateTransaction.recall_fleet!(missionId)]
      : [];

  const { writeAsync, data } = useContractWrite({
    ...(missionId != null && { calls }),
  });

  return { writeAsync, data };
}

export function useCollectDebris(missionId: number | null): InvokeResult {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });

  const calls =
    missionId != null
      ? [contract?.populateTransaction.collect_debris!(missionId)]
      : [];

  const { writeAsync, data } = useContractWrite({
    ...(missionId != null && { calls }),
  });

  return { writeAsync, data };
}
