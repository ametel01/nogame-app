import { useContractRead } from "@starknet-react/core";
import { GAMEADDRESS } from "../constants/addresses";
import gameContract from "../constants/nogame.json";
import { Position } from "../shared/types";

export function usePlanetPosition(planetId: number) {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: gameContract.abi,
    functionName: "get_planet_position",
    args: [planetId],
  });

  return data as unknown as Position;
}
