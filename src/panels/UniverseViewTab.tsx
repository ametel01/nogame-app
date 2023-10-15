import UniverseViewBox from "../components/boxes/UniverseViewBox";
// import tempPlanet from "../assets/gameElements/planets/2.png";
import { StyledTabPanel } from "./styleds";
import { useGetPositionsArray } from "../hooks/useGetPositionsArray";
import {
  DefenceLevels,
  PositionObject,
  Resources,
  ShipsLevels,
} from "../shared/types";
import { getPlanetImageUrl } from "../components/ui/PlanetSection";
import { useGetPositionSlotOccupant } from "../hooks/useGetPositionSlotOccupant";
import { useOwnerOf } from "../hooks/useOwnerOf";
import { useGetPlanetPoints } from "../hooks/useGetPlanetPoints";
import { useAccount } from "@starknet-react/core";
import { useShipsLevels } from "../hooks/LevelsHooks";
import { useTokenOf } from "../hooks/useTokenOf";

interface UniverseBoxItemProps {
  position: PositionObject;
}

const UniverseBoxItem = ({ position }: UniverseBoxItemProps) => {
  const { address: address_data } = useAccount();
  const address = address_data ? address_data : "";

  const planetId = useGetPositionSlotOccupant(position.system, position.orbit);

  const { planetId: ownPlanetId } = useTokenOf();
  const ownFleetData = useShipsLevels(Number(ownPlanetId));
  const ownFleet: ShipsLevels = ownFleetData
    ? ownFleetData
    : {
        carrier: 0,
        scraper: 0,
        sparrow: 0,
        frigate: 0,
        armade: 0,
        celestia: 0,
      };

  const points_data = useGetPlanetPoints(planetId);
  const points: number = points_data ? points_data : 0;

  const img = getPlanetImageUrl(planetId);

  const owner_data = useOwnerOf(planetId);
  const owner: string = owner_data ? owner_data.toString(16) : "";

  const formattedPosition = `${String(position.system).padStart(
    2,
    "0"
  )} / ${String(position.orbit).padStart(2, "0")}`;

  const shortenedAddress = owner
    ? `${owner.substring(0, 4)}...${owner.substring(59)}`
    : "null";
  return (
    <UniverseViewBox
      planetId={planetId}
      // address={address}
      img={img}
      owner={shortenedAddress}
      position={formattedPosition}
      points={points}
      highlighted={address === "0x" + owner}
      ownFleet={ownFleet}
    />
  );
};

interface Props {
  spendable?: Resources;
  collectible?: Resources;
  fleet?: ShipsLevels;
  defences?: DefenceLevels;
}

export const UniverseViewTabPanel = ({ ...rest }: Props) => {
  const planets_data = useGetPositionsArray() || [];

  const sortedPlanetsData = planets_data.sort((a, b) => {
    if (Number(a.system) === Number(b.system)) {
      return Number(a.orbit) - Number(b.orbit); // If same system, compare by orbit
    }
    return Number(a.system) - Number(b.system); // Else, compare by system
  });

  return (
    <StyledTabPanel {...rest}>
      {sortedPlanetsData.map((position, index) => (
        <UniverseBoxItem key={index} position={position} />
      ))}
    </StyledTabPanel>
  );
};

UniverseViewTabPanel.tabsRole = "TabPanel";
