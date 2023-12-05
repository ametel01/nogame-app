import { StyledTabPanel } from "./styleds";
import {
  DefenceCost,
  DefenceLevels,
  Resources,
  TechLevels,
} from "../../../frontend/src/shared/types";
import DefencesBox from "../components/boxes/DefencesBox";
import {
  calculEnoughResources,
  blasterRequirements,
  beamRequirements,
  astralRequirements,
  plasmaRequirements,
} from "../../../frontend/src/shared/utils";
import blasterImg from "../../../frontend/src/assets/gameElements/defences/blaster-v2.png";
import beamImg from "../../../frontend/src/assets/gameElements/defences/beam-v2-1.png";
import astralLauncherImg from "../../../frontend/src/assets/gameElements/defences/astral-v2-1.png";
import plasmaImg from "../../../frontend/src/assets/gameElements/defences/plasma-v2-2.png";
import {
  BlasterDescription,
  BeamDescription,
  AstralDescription,
  PlasmaDescription,
} from "../../../frontend/src/components/descriptions/DefencesPopover";

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
