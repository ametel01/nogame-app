import { StyledTabPanel } from "./styleds";
import { TechCost, Resources, TechLevels, TechEntities } from "../shared/types";
import ResearchBox from "../boxes/ResearchBox";
import {
  armourRequirements,
  beamTechRequirements,
  calculEnoughResources,
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

import armourImg from "../assets/techs/armour.png";
import beamImg from "../assets/techs/laser.png";
import ionImg from "../assets/techs/ion.png";
import plasmaImg from "../assets/techs/plasma.png";
import spacetimeImg from "../assets/techs/spacetime.png";
import warpEnginImg from "../assets/techs/warp.png";
import combustionImg from "../assets/techs/combustion.png";
import thrustImg from "../assets/techs/thrust.png";
import weaponsImg from "../assets/techs/weapons.png";
import computerImg from "../assets/techs/computer.png";
import shieldImg from "../assets/techs/shield.png";
import energyImg from "../assets/techs/energy.png";

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
} from "../components/Descriptions/LabPopover";

type ResearchConfigType = {
  description: React.ReactNode;
  img: string;
  title: string;
  functionCallName: string;
  techName: TechEntities; // <-- make sure of this type
  requirements: boolean;
};

interface Props {
  spendableResources?: Resources;
  techLevels?: TechLevels;
  techCostUpgrade?: TechCost;
  labLevel?: number;
}

export const ResearchTabPanel = ({
  spendableResources,
  techLevels,
  techCostUpgrade,
  labLevel,
  ...rest
}: Props) => {
  const researchConfig: ResearchConfigType[] = [
    {
      description: <EnergyDescription />,
      img: energyImg,
      title: "Energy Innovation",
      functionCallName: "energyInnovation",
      techName: "energy",
      requirements: energyRequirements(labLevel),
    },
    {
      description: <ComputerDescription />,
      img: computerImg,
      title: "Digital Systems",
      functionCallName: "digitalSystems",
      techName: "digital",
      requirements: digitalRequirements(labLevel),
    },
    {
      description: <BeamDescription />,
      img: beamImg,
      title: "Beam Technology",
      functionCallName: "beamTechnology",
      techName: "beam",
      requirements: beamTechRequirements(labLevel, techLevels),
    },
    {
      description: <IonDescription />,
      img: ionImg,
      title: "Ion Systems",
      functionCallName: "ionSystems",
      techName: "ion",
      requirements: ionRequirements(labLevel, techLevels),
    },
    {
      description: <PlasmaDescription />,
      img: plasmaImg,
      title: "Plasma Engineering",
      functionCallName: "plasmaEngineering",
      techName: "plasma",
      requirements: plasmaTechRequirements(labLevel, techLevels),
    },
    {
      description: <SpacetimeDescription />,
      img: spacetimeImg,
      title: "Spacetime Warp",
      functionCallName: "spacetimeWarp",
      techName: "spacetime",
      requirements: spacetimeRequirements(labLevel, techLevels),
    },
    {
      description: <CombustionDescription />,
      img: combustionImg,
      title: "Combustion Drive",
      functionCallName: "combustionDrive",
      techName: "combustion",
      requirements: combustionRequirements(labLevel, techLevels),
    },
    {
      description: <ThrustDescription />,
      img: thrustImg,
      title: "Thrust Propulsion",
      functionCallName: "thrustPropulsion",
      techName: "thrust",
      requirements: thrustRequirements(labLevel, techLevels),
    },
    {
      description: <WarpDescription />,
      img: warpEnginImg,
      title: "Warp Drive",
      functionCallName: "warpDrive",
      techName: "warp",
      requirements: warpRequirements(labLevel, techLevels),
    },
    {
      description: <ArmourDescription />,
      img: armourImg,
      title: "Armour Innovation",
      functionCallName: "armourInnovation",
      techName: "armour",
      requirements: armourRequirements(labLevel),
    },
    {
      description: <WeaponsDescription />,
      img: weaponsImg,
      title: "Weapons Development",
      functionCallName: "weaponsDevelopment",
      techName: "weapons",
      requirements: weaponsRequirements(labLevel),
    },
    {
      description: <ShieldDescription />,
      img: shieldImg,
      title: "Shields Technology",
      functionCallName: "shieldTech",
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
          level={techLevels?.[research.techName]}
          costUpdate={techCostUpgrade?.[research.techName]}
          hasEnoughResources={
            spendableResources &&
            techCostUpgrade?.[research.techName] &&
            calculEnoughResources(
              techCostUpgrade[research.techName],
              spendableResources,
            )
          }
          requirementsMet={research.requirements}
        />
      ))}
    </StyledTabPanel>
  );
};

ResearchTabPanel.tabsRole = "TabPanel";
