import { StyledTabPanel } from "./styleds";
import { TechCost, Resources, TechLevels, TechEntities } from "../shared/types";
import ResearchBox from "../components/boxes/ResearchBox";
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
} from "../shared/utils";

import armourImg from "../assets/gameElements/techs/armour4.png";
import beamImg from "../assets/gameElements/techs/beam4.png";
import ionImg from "../assets/gameElements/techs/ion4.png";
import plasmaImg from "../assets/gameElements/techs/plasma4.png";
import spacetimeImg from "../assets/gameElements/techs/spacetime4.png";
import warpEnginImg from "../assets/gameElements/techs/warp4.png";
import combustionImg from "../assets/gameElements/techs/combustion4.png";
import thrustImg from "../assets/gameElements/techs/thrust4.png";
import weaponsImg from "../assets/gameElements/techs/weapons4.png";
import digitalImg from "../assets/gameElements/techs/digital4.png";
import shieldImg from "../assets/gameElements/techs/shield4.png";
import energyImg from "../assets/gameElements/techs/energy4.png";

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
} from "../components/descriptions/LabPopover";

type ResearchConfigType = {
  description: React.ReactNode;
  img: string;
  title: string;
  functionCallName: string;
  techName: TechEntities; // <-- make sure of this type
  requirements: boolean;
};

interface Props {
  spendableResources: Resources;
  techLevels?: TechLevels;
  techCostUpgrade?: TechCost;
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
      title: "Energy Innovation",
      functionCallName: "energy_innovation",
      techName: "energy",
      requirements: energyRequirements(labLevel),
    },
    {
      description: <ComputerDescription />,
      img: digitalImg,
      title: "Digital Systems",
      functionCallName: "digital_systems",
      techName: "digital",
      requirements: digitalRequirements(labLevel),
    },
    {
      description: <BeamDescription />,
      img: beamImg,
      title: "Beam Technology",
      functionCallName: "beam_technology",
      techName: "beam",
      requirements: beamTechRequirements(labLevel, techLevels),
    },
    {
      description: <IonDescription />,
      img: ionImg,
      title: "Ion Systems",
      functionCallName: "ion_systems",
      techName: "ion",
      requirements: ionRequirements(labLevel, techLevels),
    },
    {
      description: <PlasmaDescription />,
      img: plasmaImg,
      title: "Plasma Engineering",
      functionCallName: "plasma_engineering",
      techName: "plasma",
      requirements: plasmaTechRequirements(labLevel, techLevels),
    },
    {
      description: <SpacetimeDescription />,
      img: spacetimeImg,
      title: "Spacetime Technology",
      functionCallName: "spacetime_warp",
      techName: "spacetime",
      requirements: spacetimeRequirements(labLevel, techLevels),
    },
    {
      description: <CombustionDescription />,
      img: combustionImg,
      title: "Combustion Drive",
      functionCallName: "combustive_engine",
      techName: "combustion",
      requirements: combustionRequirements(labLevel, techLevels),
    },
    {
      description: <ThrustDescription />,
      img: thrustImg,
      title: "Thrust Propulsion",
      functionCallName: "thrust_propulsion",
      techName: "thrust",
      requirements: thrustRequirements(labLevel, techLevels),
    },
    {
      description: <WarpDescription />,
      img: warpEnginImg,
      title: "Warp Drive",
      functionCallName: "warp_drive",
      techName: "warp",
      requirements: warpRequirements(labLevel, techLevels),
    },
    {
      description: <ArmourDescription />,
      img: armourImg,
      title: "Armour Innovation",
      functionCallName: "armour_innovation",
      techName: "armour",
      requirements: armourRequirements(labLevel),
    },
    {
      description: <WeaponsDescription />,
      img: weaponsImg,
      title: "Weapons Development",
      functionCallName: "weapons_development",
      techName: "weapons",
      requirements: weaponsRequirements(labLevel),
    },
    {
      description: <ShieldDescription />,
      img: shieldImg,
      title: "Shields Technology",
      functionCallName: "shield_tech",
      techName: "shield",
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

ResearchTabPanel.tabsRole = "TabPanel";
