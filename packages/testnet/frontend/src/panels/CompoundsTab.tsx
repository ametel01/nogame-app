import React from 'react';
import { StyledTabPanel } from './styleds';
import steelImg from '../assets/gameElements/compounds/steel4.webp';
import quartzImg from '../assets/gameElements/compounds/quartz4.webp';
import tritiumImg from '../assets/gameElements/compounds/tritium4.webp';
import energyImg from '../assets/gameElements/compounds/energy4.webp';
import labImg from '../assets/gameElements/compounds/lab4.webp';
import dockyardImg from '../assets/gameElements/compounds/dockyard4.webp';
import {
  type CompoundsLevels,
  type EnergyCost,
  type Resources,
  UpgradeType,
} from '../shared/types';
import CompoundsBox from '../components/boxes/CompoundsBox';
import {
  EnergyPlantDescription,
  QuartzMineDescription,
  SteelMineDescription,
  TritiumMineDescription,
  LabDescription,
  DockyardDescription,
} from '../components/descriptions/CompoundsPopover';

interface CompoundConfigType {
  description: React.ReactNode;
  img: string;
  title: string;
  functionCallName: number;
  compoundName: keyof CompoundsLevels;
  energyKey: keyof EnergyCost;
}

interface Props {
  spendableResources?: Resources;
  compoundsLevels: CompoundsLevels;
}

export const CompoundsTabPanel = ({
  spendableResources,
  compoundsLevels,
  ...rest
}: Props) => {
  const compoundsConfig: CompoundConfigType[] = [
    {
      description: (
        <SteelMineDescription currentLevel={compoundsLevels.steel} />
      ),
      img: steelImg,
      title: 'Steel Mine',
      functionCallName: UpgradeType.SteelMine,
      compoundName: 'steel',
      energyKey: 'steel',
    },
    {
      description: (
        <QuartzMineDescription currentLevel={compoundsLevels.quartz} />
      ),
      img: quartzImg,
      title: 'Quartz Mine',
      functionCallName: UpgradeType.QuartzMine,
      compoundName: 'quartz',
      energyKey: 'quartz',
    },
    {
      description: (
        <TritiumMineDescription currentLevel={compoundsLevels.tritium} />
      ),
      img: tritiumImg,
      title: 'Tritium Mine',
      functionCallName: UpgradeType.TritiumMine,
      compoundName: 'tritium',
      energyKey: 'tritium',
    },
    {
      description: (
        <EnergyPlantDescription currentLevel={compoundsLevels.energy} />
      ),
      img: energyImg,
      title: 'Energy Plant',
      functionCallName: UpgradeType.EnergyPlant,
      compoundName: 'energy',
      energyKey: 'energy',
    },
    {
      description: <LabDescription currentLevel={compoundsLevels.lab} />,
      img: labImg,
      title: 'Research Lab',
      functionCallName: UpgradeType.Lab,
      compoundName: 'lab',
      energyKey: 'null',
    },
    {
      description: (
        <DockyardDescription currentLevel={compoundsLevels.dockyard} />
      ),
      img: dockyardImg,
      title: 'Dockyard',
      functionCallName: UpgradeType.Dockyard,
      compoundName: 'dockyard',
      energyKey: 'null',
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

CompoundsTabPanel.tabsRole = 'TabPanel';
