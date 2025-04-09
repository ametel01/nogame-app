import {
  useReadContract,
  useSendTransaction,
  useContract,
} from "@starknet-react/core";
import { COLONYADDRESS } from "../../constants/addresses";
import { BlockTag } from "starknet";
import {
  CompoundsLevels,
  DefenceLevels,
  getColonyBuildType,
  Resources,
  getColonyUpgradeType,
  ShipsLevels,
} from "../../shared/types";
import { UseUpgradeReturnType } from "../writeHooks/useUpgrade";
import type { Abi } from "starknet";

const baseCompounds: CompoundsLevels = {
  steel: 0,
  quartz: 0,
  tritium: 0,
  energy: 0,
  lab: 0,
  dockyard: 0,
};

const baseResources: Resources = {
  steel: 0,
  quartz: 0,
  tritium: 0,
};

const baseDefences: DefenceLevels = {
  celestia: 0,
  blaster: 0,
  beam: 0,
  astral: 0,
  plasma: 0,
};

const baseShips: ShipsLevels = {
  carrier: 0,
  scraper: 0,
  celestia: 0,
  sparrow: 0,
  frigate: 0,
  armade: 0,
};

export type ColonyArrayElement = [bigint, { orbit: bigint; system: bigint }];
export type ColonyArray = ColonyArrayElement[];

const colonyAbi = [
  {
    type: "function",
    name: "get_colony_mother_planet",
    inputs: [
      {
        name: "colony_planet_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [
      {
        type: "core::integer::u32",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_colonies_for_planet",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [
      {
        type: "core::array::Array::<(core::integer::u8, nogame::libraries::types::PlanetPosition)>",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_colony_compounds",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
      {
        name: "colony_id",
        type: "core::integer::u8",
      },
    ],
    outputs: [
      {
        type: "nogame::libraries::types::CompoundsLevels",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_colony_defences",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
      {
        name: "colony_id",
        type: "core::integer::u8",
      },
    ],
    outputs: [
      {
        type: "nogame::libraries::types::Defences",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_colony_ships",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
      {
        name: "colony_id",
        type: "core::integer::u8",
      },
    ],
    outputs: [
      {
        type: "nogame::libraries::types::ShipsLevels",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_colony_resources",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
      {
        name: "colony_id",
        type: "core::integer::u8",
      },
    ],
    outputs: [
      {
        type: "nogame::libraries::types::ERC20s",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "process_colony_compound_upgrade",
    inputs: [
      {
        name: "colony_id",
        type: "core::integer::u8",
      },
      {
        name: "name",
        type: "nogame::libraries::types::ColonyUpgradeType",
      },
      {
        name: "quantity",
        type: "core::integer::u8",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "process_colony_unit_build",
    inputs: [
      {
        name: "colony_id",
        type: "core::integer::u8",
      },
      {
        name: "name",
        type: "nogame::libraries::types::ColonyBuildType",
      },
      {
        name: "quantity",
        type: "core::integer::u32",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
] as const satisfies Abi;

export function useGetColonyMotherPlanet(planetId: number | undefined): number {
  const { data } = useReadContract({
    address: COLONYADDRESS,
    abi: colonyAbi,
    functionName: "get_colony_mother_planet",
    args: planetId !== undefined ? [planetId] : undefined,
    blockIdentifier: BlockTag.PENDING,
  });

  if (!planetId) {
    return 0;
  }
  return data as unknown as number;
}

export function useGetPlanetColonies(
  planetId: number | undefined,
): ColonyArray {
  const { data } = useReadContract({
    address: COLONYADDRESS,
    abi: colonyAbi,
    functionName: "get_colonies_for_planet",
    args: planetId !== undefined ? [planetId] : undefined,
    blockIdentifier: BlockTag.PENDING,
  });

  if (!planetId) {
    return [];
  }

  return data as unknown as ColonyArray;
}

export function useGetColonyCompounds(
  planetId: number | undefined,
  colonyId: number | undefined,
): CompoundsLevels {
  const { data } = useReadContract({
    address: COLONYADDRESS,
    abi: colonyAbi,
    functionName: "get_colony_compounds",
    args:
      planetId !== undefined && colonyId !== undefined
        ? [planetId, colonyId]
        : undefined,
    blockIdentifier: BlockTag.PENDING,
  });

  if (!planetId) {
    return baseCompounds;
  }

  return data as unknown as CompoundsLevels;
}

export function useGetColonyDefences(
  planetId: number | undefined,
  colonyId: number | undefined,
): DefenceLevels {
  const { data } = useReadContract({
    address: COLONYADDRESS,
    abi: colonyAbi,
    functionName: "get_colony_defences",
    args:
      planetId !== undefined && colonyId !== undefined
        ? [planetId, colonyId]
        : undefined,
    blockIdentifier: BlockTag.PENDING,
  });

  if (!planetId) {
    return baseDefences;
  }

  return data as unknown as DefenceLevels;
}

export function useGetColonyShips(
  planetId: number | undefined,
  colonyId: number | undefined,
): ShipsLevels {
  const { data } = useReadContract({
    address: COLONYADDRESS,
    abi: colonyAbi,
    functionName: "get_colony_ships",
    args:
      planetId !== undefined && colonyId !== undefined
        ? [planetId, colonyId]
        : undefined,
    blockIdentifier: BlockTag.PENDING,
  });

  if (!planetId) {
    return baseShips;
  }

  return data as unknown as ShipsLevels;
}

export function useGetColonyResources(
  planetId: number | undefined,
  colonyId: number | undefined,
): Resources {
  const { data } = useReadContract({
    address: COLONYADDRESS,
    abi: colonyAbi,
    functionName: "get_colony_resources",
    args:
      planetId !== undefined && colonyId !== undefined
        ? [planetId, colonyId]
        : undefined,
    blockIdentifier: BlockTag.PENDING,
  });

  if (!planetId) {
    return baseResources;
  }

  return data as unknown as Resources;
}

export function useColonyCompoundUpgrade(
  colonyId: number,
  unitName: number | undefined,
  amount: number,
): UseUpgradeReturnType {
  const { contract } = useContract({
    abi: colonyAbi,
    address: COLONYADDRESS,
  });

  const safeUnitName = unitName ?? 0;
  const name = getColonyUpgradeType(safeUnitName);

  const calls = contract
    ? [
        contract.populate("process_colony_compound_upgrade", [
          colonyId,
          name ?? 20,
          amount,
        ]),
      ]
    : undefined;

  const { send, error } = useSendTransaction({
    calls,
  });

  const writeAsync = send;
  const tx = undefined;

  return { send, error, writeAsync, tx };
}

export function useColonyUnitBuild(
  colonyId: number,
  unitName: number | undefined,
  amount: number,
): UseUpgradeReturnType {
  const { contract } = useContract({
    abi: colonyAbi,
    address: COLONYADDRESS,
  });

  const safeUnitName = unitName ?? 0;
  const name = getColonyBuildType(safeUnitName);

  const calls = contract
    ? [
        contract.populate("process_colony_unit_build", [
          colonyId,
          name ?? 20,
          amount,
        ]),
      ]
    : undefined;

  const { send, error } = useSendTransaction({
    calls,
  });

  const writeAsync = send;
  const tx = undefined;

  return { send, error, writeAsync, tx };
}
