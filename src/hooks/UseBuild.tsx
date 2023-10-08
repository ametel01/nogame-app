import { useContractWrite } from "@starknet-react/core";
import { GAMEADDRESS } from "../constants/addresses";

export type ComponentBuildType =
  | "steelMine"
  | "quartzMine"
  | "tritiumMine"
  | "energyPlant"
  | "dockyard"
  | "lab"
  | "energyInnovation"
  | "digitalSystems"
  | "beamTechnology"
  | "ionSystems"
  | "plasmaEngineering"
  | "spacetimeWarp"
  | "combustionDrive"
  | "thrustPropulsion"
  | "warpDrive"
  | "armourInnovation"
  | "weaponsDevelopment"
  | "shieldTech";

export default function useBuild(
  unitName: ComponentBuildType,
  quantity: number
) {
  const tx = {
    contractAddress: GAMEADDRESS,
    entrypoint: `${unitName}_build`,
    calldata: [quantity],
  };
  const { write, isLoading } = useContractWrite({ calls: [tx] });
  return { write, isLoading };
}
