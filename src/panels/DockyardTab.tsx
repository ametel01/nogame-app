import { StyledTabPanel } from "./styleds";
import {
  calculEnoughResources,
  carrierRequirements,
  celestiaRequirements,
  scraperRequirements,
  sparrowRequirements,
  frigateRequirements,
  armadeRequirements,
} from "../shared/utils";
import {
  CarrierDescription,
  CelestiaDescription,
  ScraperDescription,
  SparrowDescription,
  FrigateDescription,
  ArmadeDescription,
} from "../components/descriptions/DockyardPopover";
import { ShipsCost, Resources, ShipsLevels, TechLevels } from "../shared/types";
import DockyardBox from "../components/boxes/DockyardBox";
import armadeImg from "../assets/ships/armade.png";
import frigateImg from "../assets/ships/frigate.png";
import carrierImg from "../assets/ships/carrier.png";
import sparrowImg from "../assets/ships/sparrow.png";
import scraperImg from "../assets/ships/scraper.png";
import celestiaImg from "../assets/ships/celestia.png";
import { ComponentBuildType } from "../hooks/useBuild";

type ShipConfigType = {
  description: React.ReactNode;
  img: string;
  title: string;
  functionCallName: string;
  shipName: keyof ShipsLevels;
  requirements: (dockyardLevel?: number, techLevels?: TechLevels) => boolean;
};

interface Props {
  spendableResources?: Resources;
  shipsLevels?: ShipsLevels;
  shipsCost?: ShipsCost;
  dockyardLevel?: number;
  techLevels?: TechLevels;
}

const shipsConfig: ShipConfigType[] = [
  {
    description: <CarrierDescription />,
    img: carrierImg,
    title: "Carrier",
    functionCallName: "carrier",
    shipName: "carrier",
    requirements: carrierRequirements,
  },
  {
    description: <CelestiaDescription />,
    img: celestiaImg,
    title: "Celestia",
    functionCallName: "celestia",
    shipName: "celestia",
    requirements: celestiaRequirements,
  },
  {
    description: <ScraperDescription />,
    img: scraperImg,
    title: "Scraper",
    functionCallName: "scraper",
    shipName: "scraper",
    requirements: scraperRequirements,
  },
  {
    description: <SparrowDescription />,
    img: sparrowImg,
    title: "Sparrow",
    functionCallName: "sparrow",
    shipName: "sparrow",
    requirements: sparrowRequirements,
  },
  {
    description: <FrigateDescription />,
    img: frigateImg,
    title: "Frigate",
    functionCallName: "frigate",
    shipName: "frigate",
    requirements: frigateRequirements,
  },
  {
    description: <ArmadeDescription />,
    img: armadeImg,
    title: "Armade",
    functionCallName: "armade",
    shipName: "armade",
    requirements: armadeRequirements,
  },
];

export const DockyardTabPanel = ({
  spendableResources,
  shipsLevels,
  shipsCost,
  dockyardLevel,
  techLevels,
  ...rest
}: Props) => {
  return (
    <StyledTabPanel {...rest}>
      {shipsConfig.map((ship) => (
        <DockyardBox
          key={ship.functionCallName}
          description={ship.description}
          img={ship.img}
          title={ship.title}
          functionCallName={ship.functionCallName as ComponentBuildType}
          level={shipsLevels?.[ship.shipName]}
          costUpdate={shipsCost?.[ship.shipName]}
          hasEnoughResources={
            spendableResources &&
            shipsCost?.[ship.shipName] &&
            calculEnoughResources(shipsCost[ship.shipName], spendableResources)
          }
          requirementsMet={ship.requirements(dockyardLevel, techLevels)}
        />
      ))}
    </StyledTabPanel>
  );
};

DockyardTabPanel.tabsRole = "TabPanel";
