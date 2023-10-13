import { useContractRead } from "@starknet-react/core";
import { GAMEADDRESS } from "../constants/addresses";
import gameContract from "../constants/nogame.json";
import { DebrisField } from "../shared/types";

export function useGetDebrisField(planetId: number | undefined) {
  const { data } = useContractRead({
    address: GAMEADDRESS,
    abi: gameContract.abi,
    functionName: "get_debris_field",
    args: [Number(planetId)],
  });
  return data as unknown as DebrisField;
}
