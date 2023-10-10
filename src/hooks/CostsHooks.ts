import { GAMEADDRESS } from "../constants/addresses";
import game from "../constants/nogame.json";

import { useContractRead } from "@starknet-react/core";
import {
  CompoundsCostUpgrade,
  DefenceCost,
  ShipsCost,
  TechCost,
  EnergyCost,
} from "../shared/types";

export function useCompoundsUpgradeCost(planetId: number | undefined) {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_compounds_upgrade_cost",
    args: [planetId],
  });
  return data as unknown as CompoundsCostUpgrade;
}

export function useTechsUpgradeCost(planetId: number | undefined) {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_techs_upgrade_cost",
    args: [planetId],
  });
  return data as unknown as TechCost;
}

export function useShipsCost() {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_ships_cost",
    args: [],
  });
  return data as unknown as ShipsCost;
}

export function useDefencesCost(planetId: number | undefined) {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_defences_cost",
    args: [planetId],
  });
  return data as unknown as DefenceCost;
}

export function useEnergyCost(planetId: number | undefined) {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_energy_for_upgrade",
    args: [planetId],
  });
  return data as unknown as EnergyCost;
}
