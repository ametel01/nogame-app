import { useCallback } from "react";
import { GAMEADDRESS } from "../constants/addresses";
import game from "../constants/nogame.json";
import {
  useContractRead,
  useContract,
  useContractWrite,
} from "@starknet-react/core";
import { useTransactionManager } from "./useTransactionManager";
import {
  Fleet,
  HostileMission,
  Mission,
  Position,
  TechLevels,
} from "../shared/types";

export function useGetMissionDetails(
  planetId: number,
  missionId: number
): Mission {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_mission_details",
    args: [planetId, missionId],
  });
  return data as unknown as Mission;
}

export function useGetHostileMissions(planetId: number): HostileMission[] {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_hostile_missions",
    args: [planetId],
  });
  return data as unknown as HostileMission[];
}

export function useGetActiveMissions(planetId: number): Mission[] {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_active_missions",
    args: [Number(planetId)],
  });
  return data as unknown as Mission[];
}

export function useGetTravelTime(
  origin: Position,
  destination: Position,
  fleet: Fleet,
  techs: TechLevels
): number {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_travel_time",
    args: [origin, destination, fleet, techs],
  });
  return data as unknown as number;
}

export function useGetFuelConsumption(
  origin: Position,
  destination: Position,
  fleet: Fleet
): number | undefined {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_fuel_consumption",
    args: [origin, destination, fleet],
  });
  return data as unknown as number;
}

export function useGetIsNoobProtected(
  planetOne: number,
  planteTwo: number
): boolean {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "is_noob_protected",
    args: [planetOne, planteTwo],
  });
  return data as unknown as boolean;
}

export function useGetLastActive(planetId: number): number {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_last_active",
    args: [planetId],
  });
  return data as unknown as number;
}

export function useAttackPlanet(missionId: number | null) {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });

  const calls =
    missionId != null
      ? [contract?.populateTransaction["attack_planet"]!(missionId)]
      : [];

  const {
    writeAsync,
    isPending,
    data: tx,
  } = useContractWrite({
    ...(missionId != null && { calls }),
  });

  const { add } = useTransactionManager();

  const submitTx = useCallback(async () => {
    const tx = await writeAsync();
    add(tx.transaction_hash);
  }, [writeAsync]);

  return { submitTx, isPending, tx };
}

export function useRecallFleet(missionId: number | null) {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });

  const calls =
    missionId != null
      ? [contract?.populateTransaction["recall_fleet"]!(missionId)]
      : [];

  const {
    writeAsync,
    isPending,
    data: tx,
  } = useContractWrite({
    ...(missionId != null && { calls }),
  });

  const { add } = useTransactionManager();

  const submitTx = useCallback(async () => {
    const tx = await writeAsync();
    add(tx.transaction_hash);
  }, [writeAsync]);

  return { submitTx, isPending, tx };
}

export function useCollectDebris(missionId: number | null) {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });

  const calls =
    missionId != null
      ? [contract?.populateTransaction["collect_debris"]!(missionId)]
      : [];

  const {
    writeAsync,
    isPending,
    data: tx,
  } = useContractWrite({
    ...(missionId != null && { calls }),
  });

  const { add } = useTransactionManager();

  const submitTx = useCallback(async () => {
    const tx = await writeAsync();
    add(tx.transaction_hash);
  }, [writeAsync]);

  return { submitTx, isPending, tx };
}
