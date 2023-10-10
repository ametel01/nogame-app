import { StyledTabPanel } from "./styleds";
import steelImg from "../assets/gameElements/compounds/steel-mine.png";
import quartzImg from "../assets/gameElements/compounds/quartz-mine.png";
import tritiumImg from "../assets/gameElements/compounds/tritium-mine.png";
import energyImg from "../assets/gameElements/compounds/energy-plant.png";
import labImg from "../assets/gameElements/compounds/lab.png";
import dockyardImg from "../assets/gameElements/compounds/dockyard.png";
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
  energyRequired,
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

  console.log(energyRequired);

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
              : Number(energyRequired?.[compound.energyKey])
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
