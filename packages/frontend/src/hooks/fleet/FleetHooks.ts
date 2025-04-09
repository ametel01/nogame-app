import {
  useReadContract,
  useSendTransaction,
  useContract,
} from "@starknet-react/core";
import { FLEETADDRESS } from "../../constants/addresses";
import { BlockTag } from "starknet";
import { type HostileMission, type Mission } from "../../shared/types";
import type { Abi } from "starknet";

const fleetAbi = [
  {
    type: "function",
    name: "get_mission_details",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
      {
        name: "mission_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [
      {
        type: "nogame::libraries::types::Mission",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_incoming_missions",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [
      {
        type: "core::array::Array::<nogame::libraries::types::IncomingMission>",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_last_active",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [
      {
        type: "core::integer::u64",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_active_missions",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [
      {
        type: "core::array::Array::<nogame::libraries::types::Mission>",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_is_noob_protected",
    inputs: [
      {
        name: "planet1_id",
        type: "core::integer::u32",
      },
      {
        name: "planet2_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "attack_planet",
    inputs: [
      {
        name: "mission_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "recall_fleet",
    inputs: [
      {
        name: "mission_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "dock_fleet",
    inputs: [
      {
        name: "mission_id",
        type: "core::integer::u32",
      },
      {
        name: "colony_id",
        type: "core::integer::u8",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "collect_debris",
    inputs: [
      {
        name: "mission_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
] as const satisfies Abi;

export function useGetMissionDetails(
  planetId: number,
  missionId: number,
): Mission {
  const { data } = useReadContract({
    address: FLEETADDRESS,
    abi: fleetAbi,
    functionName: "get_mission_details",
    args: [planetId, missionId],
    blockIdentifier: BlockTag.PENDING,
  });
  return data as unknown as Mission;
}

export function useLastActive(planetId?: number): number {
  const { data } = useReadContract({
    address: FLEETADDRESS,
    abi: fleetAbi,
    functionName: "get_last_active",
    args: planetId !== undefined ? [planetId] : undefined,
    blockIdentifier: BlockTag.PENDING,
  });
  return data as unknown as number;
}

export function useGetHostileMissions(planetId: number): HostileMission[] {
  const { data } = useReadContract({
    address: FLEETADDRESS,
    abi: fleetAbi,
    functionName: "get_incoming_missions",
    args: [planetId],
    blockIdentifier: BlockTag.PENDING,
  });
  return data as unknown as HostileMission[];
}

export function useGetActiveMissions(planetId: number): Mission[] {
  const { data } = useReadContract({
    address: FLEETADDRESS,
    abi: fleetAbi,
    functionName: "get_active_missions",
    args: [planetId],
    blockIdentifier: BlockTag.PENDING,
  });
  return data as unknown as Mission[];
}

export function useGetIsNoobProtected(
  planetOne: number,
  planetTwo: number,
): boolean {
  const { data } = useReadContract({
    address: FLEETADDRESS,
    abi: fleetAbi,
    functionName: "get_is_noob_protected",
    args: [planetOne, planetTwo],
    blockIdentifier: BlockTag.PENDING,
  });
  return data as unknown as boolean;
}

export function useGetLastActive(planetId: number): number {
  const { data } = useReadContract({
    address: FLEETADDRESS,
    abi: fleetAbi,
    functionName: "get_last_active",
    args: [planetId],
    blockIdentifier: BlockTag.PENDING,
  });
  return data as unknown as number;
}

export function useAttackPlanet(missionId: number | null) {
  const { contract } = useContract({
    abi: fleetAbi,
    address: FLEETADDRESS,
  });

  const calls =
    contract && missionId !== null
      ? [contract.populate("attack_planet", [missionId])]
      : undefined;

  const { send, error } = useSendTransaction({
    calls,
  });

  return { send, error };
}

export function useRecallFleet(missionId: number | null) {
  const { contract } = useContract({
    abi: fleetAbi,
    address: FLEETADDRESS,
  });

  const calls =
    contract && missionId !== null
      ? [contract.populate("recall_fleet", [missionId])]
      : undefined;

  const { send, error } = useSendTransaction({
    calls,
  });

  return { send, error };
}

export function useCollectDebris(missionId: number | null) {
  const { contract } = useContract({
    abi: fleetAbi,
    address: FLEETADDRESS,
  });

  const calls =
    contract && missionId !== null
      ? [contract.populate("collect_debris", [missionId])]
      : undefined;

  const { send, error } = useSendTransaction({
    calls,
  });

  return { send, error };
}

export function useDockFleet(
  missionId: number | null,
  colonyId: number | null,
) {
  const { contract } = useContract({
    abi: fleetAbi,
    address: FLEETADDRESS,
  });

  const calls =
    contract && missionId !== null && colonyId !== null
      ? [contract.populate("dock_fleet", [missionId, colonyId])]
      : undefined;

  const { send, error } = useSendTransaction({
    calls,
  });

  return { send, error };
}
