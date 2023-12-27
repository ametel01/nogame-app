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
import blasterImg from "../assets/gameElements/defences/blaster4.webp";
import beamImg from "../assets/gameElements/defences/beam4.webp";
import astralLauncherImg from "../assets/gameElements/defences/astral_not_availa.webp";
import plasmaImg from "../assets/gameElements/defences/plasma_not_available.webp";
import {
  BlasterDescription,
  BeamDescription,
  AstralDescription,
  PlasmaDescription,
} from "../components/descriptions/DefencesPopover";

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
      functionCallName: "astral_launcher",
      level: defenceLevels?.astral,
      cost: defenceCost?.astral,
      requirements: astralRequirements(dockyardLevel, techLevels),
    },
    {
      description: <PlasmaDescription />,
      img: plasmaImg,
      title: "Plasma Projector",
      functionCallName: "plasma_projector",
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
          functionCallName={defence.functionCallName}
          level={Number(defence.level)}
          costUpdate={defence.cost}
          hasEnoughResources={
            spendableResources &&
            defence.cost &&
            calculEnoughResources(defence.cost, spendableResources)
          }
          requirementsMet={defence.requirements}
          resourcesAvailable={spendableResources!}
        />
      ))}
    </StyledTabPanel>
  );
};

DefenceTabPanel.tabsRole = "TabPanel";
