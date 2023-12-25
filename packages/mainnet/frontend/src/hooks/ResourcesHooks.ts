import { GAMEADDRESS } from "../constants/addresses";
import game from "../constants/nogame.json";

import { useContractRead } from "@starknet-react/core";
import { Resources } from "../shared/types";

export function useSpendableResources(planetId: number) {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_spendable_resources",
    args: [planetId],
  });
  const resourcesData = data as unknown as Resources;
  return resourcesData;
}

export function useCollectibleResources(planetId: number) {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_collectible_resources",
    args: [planetId],
  });
  const resourcesData = data as unknown as Resources;
  return resourcesData;
}

export function useEnergyAvailable(planetId: number) {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_energy_available",
    args: [planetId],
  });
  return data as unknown as number;
}
