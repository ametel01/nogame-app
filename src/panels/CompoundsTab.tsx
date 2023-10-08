import { StyledTabPanel } from "./styleds";
import steelImg from "../assets/compounds/steel-mine.png";
import quartzImg from "../assets/compounds/quartz-mine.png";
import tritiumImg from "../assets/compounds/tritium-mine.png";
import energyImg from "../assets/compounds/energy-plant.png";
import labImg from "../assets/compounds/lab.png";
import dockyardImg from "../assets/compounds/dockyard.png";
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
import { ComponentUpgradeType } from "../hooks/useUpgrade";

type CompoundConfigType = {
  description: React.ReactNode;
  img: string;
  title: string;
  functionCallName: ComponentUpgradeType;
  compoundName: keyof CompoundsLevels;
  energyKey: keyof EnergyCost;
};

interface Props {
  spendableResources: Resources;
  compoundsLevels: CompoundsLevels;
  compoundsCostUpgrade: CompoundsCostUpgrade;
  energyRequired: EnergyCost;
}

export const CompoundsTabPanel = ({
  spendableResources,
  compoundsLevels,
  compoundsCostUpgrade,
  // energyRequired,
  ...rest
}: Props) => {
  const compoundsConfig: CompoundConfigType[] = [
    {
      description: <SteelMineDescription />,
      img: steelImg,
      title: "Steel Mine",
      functionCallName: "steel_mine",
      compoundName: "steelMine",
      energyKey: "steel",
    },
    {
      description: <QuartzMineDescription />,
      img: quartzImg,
      title: "Quartz Mine",
      functionCallName: "quartz_mine",
      compoundName: "quartzMine",
      energyKey: "quartz",
    },
    {
      description: <TritiumMineDescription />,
      img: tritiumImg,
      title: "Tritium Mine",
      functionCallName: "tritium_mine",
      compoundName: "tritiumMine",
      energyKey: "tritium",
    },
    {
      description: <EnergyMineDescription />,
      img: energyImg,
      title: "Energy Plant",
      functionCallName: "energy_plant",
      compoundName: "energyPlant",
      energyKey: "null",
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
          level={compoundsLevels?.[compound.compoundName]}
          costUpdate={compoundsCostUpgrade?.[compound.compoundName]}
          energyRequired={0}
          // energyRequired={energyRequired[compound.energyKey]}
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
