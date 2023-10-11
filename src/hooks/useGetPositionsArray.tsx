import { useContractRead } from "@starknet-react/core";
import { GAMEADDRESS } from "../constants/addresses";
import gameContract from "../constants/nogame.json";

export function useGetPositionsArray() {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: gameContract.abi,
    functionName: "get_generated_planets_positions",
    args: [],
  });
  return data;
}
