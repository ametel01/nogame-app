import { StyledTabPanel } from "./styleds";
import steelImg from "../assets/gameElements/compounds/steel4.png";
import quartzImg from "../assets/gameElements/compounds/quartz4.png";
import tritiumImg from "../assets/gameElements/compounds/tritium4.png";
import energyImg from "../assets/gameElements/compounds/energy4.png";
import labImg from "../assets/gameElements/compounds/lab4.png";
import dockyardImg from "../assets/gameElements/compounds/dockyard4.png";
import {
  CompoundsCostUpgrade,
  CompoundsLevels,
  EnergyCost,
  Resources,
} from "../shared/types";
import CompoundsBox from "../components/boxes/CompoundsBox";
import {
  EnergyPlantDescription,
  QuartzMineDescription,
  SteelMineDescription,
  TritiumMineDescription,
  LabDescription,
  DockyardDescription,
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
  spendableResources?: Resources;
  compoundsLevels: CompoundsLevels;
  compoundsCostUpgrade: CompoundsCostUpgrade;
  energyRequired: EnergyCost;
  energyGain: number;
}

export const CompoundsTabPanel = ({
  spendableResources,
  compoundsLevels,
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
      description: <EnergyPlantDescription />,
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
      {compoundsConfig.map((compound) => {
        const level = Number(compoundsLevels?.[compound.compoundName]);

        return (
          <CompoundsBox
            key={compound.functionCallName}
            description={compound.description}
            img={compound.img}
            title={compound.title}
            functionCallName={compound.functionCallName}
            level={level}
            resourcesAvailable={spendableResources}
          />
        );
      })}
    </StyledTabPanel>
  );
};

CompoundsTabPanel.tabsRole = "TabPanel";
