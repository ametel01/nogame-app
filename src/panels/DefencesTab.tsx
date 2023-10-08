import { StyledTabPanel } from "./styleds";
import {
  DefenceCost,
  DefenceLevels,
  Resources,
  TechLevels,
} from "../shared/types";
import DefencesBox from "../components/boxes/DefencesBox";
import {
  calculEnoughResources,
  blasterRequirements,
  beamRequirements,
  astralRequirements,
  plasmaRequirements,
} from "../shared/utils";
import blasterImg from "../assets/defences/blaster.png";
import beamImg from "../assets/defences/beam.png";
import astralLauncherImg from "../assets/defences/astral.png";
import plasmaImg from "../assets/defences/plasma.png";
import {
  BlasterDescription,
  BeamDescription,
  AstralDescription,
  PlasmaDescription,
} from "../components/descriptions/DefencesPopover";
import { ComponentBuildType } from "../hooks/useBuild";

interface Props {
  spendableResources?: Resources;
  defenceLevels?: DefenceLevels;
  defenceCost?: DefenceCost;
  dockyardLevel?: number;
  techLevels?: TechLevels;
}

export const DefenceTabPanel = ({
  spendableResources,
  defenceLevels,
  defenceCost,
  dockyardLevel,
  techLevels,
  ...rest
}: Props) => {
  const defencesConfig = [
    {
      description: <BlasterDescription />,
      img: blasterImg,
      title: "Blaster",
      functionCallName: "blaster",
      level: defenceLevels?.blaster,
      cost: defenceCost?.blaster,
      requirements: blasterRequirements(dockyardLevel),
    },
    {
      description: <BeamDescription />,
      img: beamImg,
      title: "Beam",
      functionCallName: "beam",
      level: defenceLevels?.beam,
      cost: defenceCost?.beam,
      requirements: beamRequirements(dockyardLevel, techLevels),
    },
    {
      description: <AstralDescription />,
      img: astralLauncherImg,
      title: "Astral Launcher",
      functionCallName: "astralLauncher",
      level: defenceLevels?.astral,
      cost: defenceCost?.astral,
      requirements: astralRequirements(dockyardLevel, techLevels),
    },
    {
      description: <PlasmaDescription />,
      img: plasmaImg,
      title: "Plasma Projector",
      functionCallName: "plasmaProjector",
      level: defenceLevels?.plasma,
      cost: defenceCost?.plasma,
      requirements: plasmaRequirements(dockyardLevel, techLevels),
    },
  ];

  return (
    <StyledTabPanel {...rest}>
      {defencesConfig.map((defence) => (
        <DefencesBox
          key={defence.functionCallName}
          description={defence.description}
          img={defence.img}
          title={defence.title}
          functionCallName={defence.functionCallName as ComponentBuildType}
          level={defence.level}
          costUpdate={defence.cost}
          hasEnoughResources={
            spendableResources &&
            defence.cost &&
            calculEnoughResources(defence.cost, spendableResources)
          }
          requirementsMet={defence.requirements}
        />
      ))}
    </StyledTabPanel>
  );
};

DefenceTabPanel.tabsRole = "TabPanel";
