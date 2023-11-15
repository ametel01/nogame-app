import UniverseViewBox from "../components/boxes/UniverseViewBox";
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
import { useGetIsNoobProtected } from "../hooks/FleetHooks";

interface UniverseBoxItemProps {
  ownPlanetId: number;
  position: PositionObject;
}

const UniverseBoxItem = ({ ownPlanetId, position }: UniverseBoxItemProps) => {
  const { address: address_data } = useAccount();
  const address = address_data ? address_data : "";

  const planetId = useGetPositionSlotOccupant(position.system, position.orbit);

  const isNoobProtected = useGetIsNoobProtected(
    Number(ownPlanetId),
    Number(planetId)
  );

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

  const { data } = useOwnerOf(planetId);
  const owner: string = data ? data.toString(16) : "";

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
      img={img}
      owner={shortenedAddress}
      position={formattedPosition}
      points={points}
      highlighted={address === "0x" + owner}
      ownPlanetId={ownPlanetId}
      ownFleet={ownFleet}
      isNoobProtected={isNoobProtected}
    />
  );
};

interface UniverseViewTabPanelProps {
  spendable?: Resources;
  collectible?: Resources;
  fleet?: ShipsLevels;
  defences?: DefenceLevels;
  ownPlanetId: number;
}

export const UniverseViewTabPanel = ({
  ownPlanetId,
  ...rest
}: UniverseViewTabPanelProps) => {
  const planets_data: PositionObject[] = useGetPositionsArray() || [];

  const sortedPlanetsData = planets_data.sort((a, b) => {
    if (Number(a.system) === Number(b.system)) {
      return Number(a.orbit) - Number(b.orbit); // If same system, compare by orbit
    }
    return Number(a.system) - Number(b.system); // Else, compare by system
  });

  return (
    <StyledTabPanel {...rest}>
      {sortedPlanetsData.map((position, index) => (
        <UniverseBoxItem
          ownPlanetId={ownPlanetId}
          key={index}
          position={position}
        />
      ))}
    </StyledTabPanel>
  );
};

UniverseViewTabPanel.tabsRole = "TabPanel";
