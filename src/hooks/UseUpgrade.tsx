import { useContractWrite } from "@starknet-react/core";
import { GAMEADDRESS } from "../constants/addresses";

export type ComponentUpgradeType =
  | "steel_mine"
  | "quartz_mine"
  | "tritium_mine"
  | "energy_plant"
  | "dockyard"
  | "lab"
  | "energy_innovation"
  | "digital_systems"
  | "beam_technology"
  | "ion_systems"
  | "plasma_engineering"
  | "spacetime_warp"
  | "combustive_engine"
  | "thrust_propulsion"
  | "warp_drive"
  | "armour_innovation"
  | "weapons_development"
  | "shield_tech";

export default function useUpgrade(unitName: ComponentUpgradeType) {
  const tx = {
    contractAddress: GAMEADDRESS,
    entrypoint: `${unitName}_upgrade`,
    calldata: [],
  };
  const { write, isLoading } = useContractWrite({ calls: [tx] });
  return { write, isLoading };
}
