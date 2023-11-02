import { useContractRead } from "@starknet-react/core";
import { GAMEADDRESS } from "../constants/addresses";
import gameContract from "../constants/nogame.json";

export function useGetPlanetPrice() {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: gameContract.abi,
    functionName: "get_current_planet_price",
    args: [],
  });
  return data as unknown as number;
}
