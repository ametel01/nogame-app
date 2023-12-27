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
import armadeImg from "../assets/gameElements/ships/armade_not_available.webp";
import frigateImg from "../assets/gameElements/ships/frigate_not_available.webp";
import carrierImg from "../assets/gameElements/ships/carrier4.webp";
import sparrowImg from "../assets/gameElements/ships/sparrow4.webp";
import scraperImg from "../assets/gameElements/ships/scraper4.webp";
import celestiaImg from "../assets/gameElements/ships/celestia4.webp";

type ShipConfigType = {
  description: React.ReactNode;
  img: string;
  title: string;
  functionCallName: string;
  shipName: keyof ShipsLevels;
  requirements: boolean;
};

interface Props {
  spendableResources?: Resources;
  shipsLevels?: ShipsLevels;
  shipsCost?: ShipsCost;
  dockyardLevel?: number;
  techLevels?: TechLevels;
  celestia?: number;
}

export const DockyardTabPanel = ({
  spendableResources,
  shipsLevels,
  shipsCost,
  dockyardLevel,
  techLevels,
  celestia,
  ...rest
}: Props) => {
  const shipsConfig: ShipConfigType[] = [
    {
      description: <CarrierDescription />,
      img: carrierImg,
      title: "Carrier",
      functionCallName: "carrier",
      shipName: "carrier",
      requirements: carrierRequirements(dockyardLevel, techLevels),
    },
    {
      description: <CelestiaDescription />,
      img: celestiaImg,
      title: "Celestia",
      functionCallName: "celestia",
      shipName: "celestia",
      requirements: celestiaRequirements(dockyardLevel, techLevels),
    },
    {
      description: <ScraperDescription />,
      img: scraperImg,
      title: "Scraper",
      functionCallName: "scraper",
      shipName: "scraper",
      requirements: scraperRequirements(dockyardLevel, techLevels),
    },
    {
      description: <SparrowDescription />,
      img: sparrowImg,
      title: "Sparrow",
      functionCallName: "sparrow",
      shipName: "sparrow",
      requirements: sparrowRequirements(dockyardLevel, techLevels),
    },
    {
      description: <FrigateDescription />,
      img: frigateImg,
      title: "Frigate",
      functionCallName: "frigate",
      shipName: "frigate",
      requirements: frigateRequirements(dockyardLevel, techLevels),
    },
    {
      description: <ArmadeDescription />,
      img: armadeImg,
      title: "Armade",
      functionCallName: "armade",
      shipName: "armade",
      requirements: armadeRequirements(dockyardLevel, techLevels),
    },
  ];

  return (
    <StyledTabPanel {...rest}>
      {shipsConfig.map((ship) => (
        <DockyardBox
          key={ship.functionCallName}
          description={ship.description}
          img={ship.img}
          title={ship.title}
          functionCallName={ship.functionCallName}
          level={
            ship.title === "Celestia"
              ? Number(celestia)
              : Number(shipsLevels?.[ship.shipName])
          }
          costUpdate={shipsCost?.[ship.shipName]}
          hasEnoughResources={
            spendableResources &&
            shipsCost?.[ship.shipName] &&
            calculEnoughResources(shipsCost[ship.shipName], spendableResources)
          }
          requirementsMet={ship.requirements}
          resourcesAvailable={spendableResources!}
        />
      ))}
    </StyledTabPanel>
  );
};

DockyardTabPanel.tabsRole = "TabPanel";
