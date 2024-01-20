import React from 'react';
import { StyledTabPanel } from './styleds';
import {
  type Resources,
  type TechLevels,
  type TechEntities,
  UpgradeType,
} from '../shared/types';
import ResearchBox from '../components/boxes/ResearchBox';
import {
  armourRequirements,
  beamTechRequirements,
  combustionRequirements,
  digitalRequirements,
  energyRequirements,
  ionRequirements,
  plasmaTechRequirements,
  shieldRequirements,
  spacetimeRequirements,
  thrustRequirements,
  warpRequirements,
  weaponsRequirements,
} from '../shared/utils';

import armourImg from '../assets/gameElements/techs/armour4.webp';
import beamImg from '../assets/gameElements/techs/beam4.webp';
import ionImg from '../assets/gameElements/techs/ion_not_available.webp';
import plasmaImg from '../assets/gameElements/techs/plasma_not_available.webp';
import spacetimeImg from '../assets/gameElements/techs/spacetime_not_available.webp';
import warpEnginImg from '../assets/gameElements/techs/warp_not_available.webp';
import combustionImg from '../assets/gameElements/techs/combustion4.webp';
import thrustImg from '../assets/gameElements/techs/thrust4.webp';
import weaponsImg from '../assets/gameElements/techs/weapons4.webp';
import digitalImg from '../assets/gameElements/techs/digital4.webp';
import shieldImg from '../assets/gameElements/techs/shield4.webp';
import energyImg from '../assets/gameElements/techs/energy4.webp';
import exoImg from '../assets/gameElements/techs/exocraft.webp';

import {
  ArmourDescription,
  BeamDescription,
  CombustionDescription,
  ComputerDescription,
  EnergyDescription,
  IonDescription,
  PlasmaDescription,
  ShieldDescription,
  SpacetimeDescription,
  ThrustDescription,
  WarpDescription,
  WeaponsDescription,
} from '../components/descriptions/LabPopover';

interface ResearchConfigType {
  description: React.ReactNode;
  img: string;
  title: string;
  functionCallName: number;
  techName: TechEntities; // <-- make sure of this type
  requirements: boolean;
}

interface Props {
  spendableResources: Resources;
  techLevels?: TechLevels;
  labLevel?: number;
}

export const ResearchTabPanel = ({
  spendableResources,
  techLevels,
  labLevel,
  ...rest
}: Props) => {
  const researchConfig: ResearchConfigType[] = [
    {
      description: <EnergyDescription />,
      img: energyImg,
      title: 'Energy Innovation',
      functionCallName: UpgradeType.EnergyTech,
      techName: 'energy',
      requirements: energyRequirements(labLevel),
    },
    {
      description: <ComputerDescription />,
      img: digitalImg,
      title: 'Digital Systems',
      functionCallName: UpgradeType.Digital,
      techName: 'digital',
      requirements: digitalRequirements(labLevel),
    },
    {
      description: <BeamDescription />,
      img: beamImg,
      title: 'Beam Technology',
      functionCallName: UpgradeType.BeamTech,
      techName: 'beam',
      requirements: beamTechRequirements(labLevel, techLevels),
    },
    {
      description: <IonDescription />,
      img: ionImg,
      title: 'Ion Systems',
      functionCallName: UpgradeType.Ion,
      techName: 'ion',
      requirements: ionRequirements(labLevel, techLevels),
    },
    {
      description: <PlasmaDescription />,
      img: plasmaImg,
      title: 'Plasma Engineering',
      functionCallName: UpgradeType.PlasmaTech,
      techName: 'plasma',
      requirements: plasmaTechRequirements(labLevel, techLevels),
    },
    {
      description: <SpacetimeDescription />,
      img: spacetimeImg,
      title: 'Spacetime Technology',
      functionCallName: UpgradeType.Warp,
      techName: 'spacetime',
      requirements: spacetimeRequirements(labLevel, techLevels),
    },
    {
      description: <CombustionDescription />,
      img: combustionImg,
      title: 'Combustion Drive',
      functionCallName: UpgradeType.Combustion,
      techName: 'combustion',
      requirements: combustionRequirements(labLevel, techLevels),
    },
    {
      description: <ThrustDescription />,
      img: thrustImg,
      title: 'Thrust Propulsion',
      functionCallName: UpgradeType.Thrust,
      techName: 'thrust',
      requirements: thrustRequirements(labLevel, techLevels),
    },
    {
      description: <WarpDescription />,
      img: warpEnginImg,
      title: 'Warp Drive',
      functionCallName: UpgradeType.Warp,
      techName: 'warp',
      requirements: warpRequirements(labLevel, techLevels),
    },
    {
      description: <ArmourDescription />,
      img: armourImg,
      title: 'Armour Innovation',
      functionCallName: UpgradeType.Armour,
      techName: 'armour',
      requirements: armourRequirements(labLevel),
    },
    {
      description: <WeaponsDescription />,
      img: weaponsImg,
      title: 'Weapons Development',
      functionCallName: UpgradeType.Weapons,
      techName: 'weapons',
      requirements: weaponsRequirements(labLevel),
    },
    {
      description: <ShieldDescription />,
      img: shieldImg,
      title: 'Shields Technology',
      functionCallName: UpgradeType.Shield,
      techName: 'shield',
      requirements: shieldRequirements(labLevel, techLevels),
    },
  ];

  return (
    <StyledTabPanel {...rest}>
      {researchConfig.map((research) => (
        <ResearchBox
          key={research.functionCallName}
          description={research.description}
          img={research.img}
          title={research.title}
          functionCallName={research.functionCallName}
          level={Number(techLevels?.[research.techName])}
          resourcesAvailable={spendableResources}
          requirementsMet={research.requirements}
          techs={techLevels!}
        />
      ))}
    </StyledTabPanel>
  );
};

ResearchTabPanel.tabsRole = 'TabPanel';
