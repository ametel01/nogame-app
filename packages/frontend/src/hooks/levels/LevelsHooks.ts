import {
  DEFENCEADDRESS,
  DOCKYARDADDRESS,
  COMPOUNDADDRESS,
  TECHADDRESS,
} from "../../constants/addresses";
import { BlockTag } from "starknet";
import { useReadContract } from "@starknet-react/core";
import {
  TechLevels,
  type DefenceLevels,
  type ShipsLevels,
  CompoundsLevels,
} from "../../shared/types";
import type { Abi } from "starknet";

const levelsAbi = [
  {
    type: "function",
    name: "get_compounds_levels",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
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
    name: "get_tech_levels",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [
      {
        type: "nogame::libraries::types::TechLevels",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_ships_levels",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [
      {
        type: "nogame::libraries::types::ShipsLevels",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "get_defences_levels",
    inputs: [
      {
        name: "planet_id",
        type: "core::integer::u32",
      },
    ],
    outputs: [
      {
        type: "nogame::libraries::types::Defences",
      },
    ],
    state_mutability: "external",
  },
] as const satisfies Abi;

export function useCompoundsLevels(
  planetId: number | undefined,
): CompoundsLevels {
  const { data } = useReadContract({
    address: COMPOUNDADDRESS,
    abi: levelsAbi,
    functionName: "get_compounds_levels",
    args: planetId !== undefined ? [planetId] : undefined,
    blockIdentifier: BlockTag.PENDING,
  });
  return data as unknown as CompoundsLevels;
}

export function useTechLevels(planetId: number | undefined): TechLevels {
  const { data } = useReadContract({
    address: TECHADDRESS,
    abi: levelsAbi,
    functionName: "get_tech_levels",
    args: planetId !== undefined ? [planetId] : undefined,
    blockIdentifier: BlockTag.PENDING,
  });
  return data as unknown as TechLevels;
}

export function useShipsLevels(planetId: number | undefined): ShipsLevels {
  const { data } = useReadContract({
    address: DOCKYARDADDRESS,
    abi: levelsAbi,
    functionName: "get_ships_levels",
    args: planetId !== undefined ? [planetId] : undefined,
    blockIdentifier: BlockTag.PENDING,
  });
  return data as unknown as ShipsLevels;
}

export function useDefencesLevels(planetId: number | undefined): DefenceLevels {
  const { data } = useReadContract({
    address: DEFENCEADDRESS,
    abi: levelsAbi,
    functionName: "get_defences_levels",
    args: planetId !== undefined ? [planetId] : undefined,
    blockIdentifier: BlockTag.PENDING,
  });
  return data as unknown as DefenceLevels;
}
