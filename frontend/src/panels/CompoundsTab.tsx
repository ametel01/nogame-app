import { StyledTabPanel } from "./styleds";
import steelImg from "../assets/gameElements/compounds/steel-mine-1-v2.png";
import quartzImg from "../assets/gameElements/compounds/quartz-mine-2-v2.png";
import tritiumImg from "../assets/gameElements/compounds/tritium-v2-2.png";
import energyImg from "../assets/gameElements/compounds/energy-plant-v2-2.png";
import labImg from "../assets/gameElements/compounds/research-lab-v2-1.png";
import dockyardImg from "../assets/gameElements/compounds/dockyard-v2-1.png";
import {
  CompoundsCostUpgrade,
  CompoundsLevels,
  EnergyCost,
  Resources,
} from "../shared/types";
import { calculEnoughResources } from "../shared/utils";
import CompoundsBox from "../components/boxes/CompoundsBox";
import {
  DockyardDescription,
  EnergyMineDescription,
  LabDescription,
  QuartzMineDescription,
  SteelMineDescription,
  TritiumMineDescription,
} from "../components/descriptions/CompoundsPopover";

type CompoundConfigType = {
  description: React.ReactNode;
  img: string;
  title: string;
  functionCallName: string;
  compoundName: keyof CompoundsLevels;
  energyKey: keyof EnergyCost;
};

interface Props {
  spendableResources: Resources;
  compoundsLevels: CompoundsLevels;
  compoundsCostUpgrade: CompoundsCostUpgrade;
  energyRequired: EnergyCost;
  energyGain: number;
}

export const CompoundsTabPanel = ({
  spendableResources,
  compoundsLevels,
  compoundsCostUpgrade,
  energyRequired,
  energyGain,
  ...rest
}: Props) => {
  const compoundsConfig: CompoundConfigType[] = [
    {
      description: <SteelMineDescription />,
      img: steelImg,
      title: "Steel Mine",
      functionCallName: "steel_mine",
      compoundName: "steel",
      energyKey: "steel",
    },
    {
      description: <QuartzMineDescription />,
      img: quartzImg,
      title: "Quartz Mine",
      functionCallName: "quartz_mine",
      compoundName: "quartz",
      energyKey: "quartz",
    },
    {
      description: <TritiumMineDescription />,
      img: tritiumImg,
      title: "Tritium Mine",
      functionCallName: "tritium_mine",
      compoundName: "tritium",
      energyKey: "tritium",
    },
    {
      description: <EnergyMineDescription />,
      img: energyImg,
      title: "Energy Plant",
      functionCallName: "energy_plant",
      compoundName: "energy",
      energyKey: "energy",
    },
    {
      description: <LabDescription />,
      img: labImg,
      title: "Research Lab",
      functionCallName: "lab",
      compoundName: "lab",
      energyKey: "null",
    },
    {
      description: <DockyardDescription />,
      img: dockyardImg,
      title: "Dockyard",
      functionCallName: "dockyard",
      compoundName: "dockyard",
      energyKey: "null",
    },
  ];

  return (
    <StyledTabPanel {...rest}>
      {compoundsConfig.map((compound) => (
        <CompoundsBox
          key={compound.functionCallName}
          description={compound.description}
          img={compound.img}
          title={compound.title}
          functionCallName={compound.functionCallName}
          level={Number(compoundsLevels?.[compound.compoundName])}
          costUpdate={compoundsCostUpgrade?.[compound.compoundName]}
          energyRequired={
            compound.energyKey === "null"
              ? 0
              : compound.energyKey === "energy"
              ? Number(energyGain)
              : Number(-energyRequired?.[compound.energyKey])
          }
          hasEnoughResources={
            spendableResources &&
            compoundsCostUpgrade?.[compound.compoundName] &&
            calculEnoughResources(
              compoundsCostUpgrade[compound.compoundName],
              spendableResources
            )
          }
        />
      ))}
    </StyledTabPanel>
  );
};

CompoundsTabPanel.tabsRole = "TabPanel";
