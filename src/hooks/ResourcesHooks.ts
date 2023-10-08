import { GAMEADDRESS } from "../constants/addresses";
import game from "../constants/nogame.json";

import { useContractRead } from "@starknet-react/core";
import { Resources } from "../shared/types";

export function useSpendableResources(planetId: number | undefined) {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_spendable_resources",
    args: [planetId],
  });
  return data as unknown as Resources;
}

export function useCollectibleResources(planetId: number | undefined) {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_collectible_resources",
    args: [planetId],
  });
  return data as unknown as Resources;
}

export function useEnergyAvailable(planetId: number | undefined) {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_energy_available",
    args: [planetId],
  });
  return data as unknown as number;
}
