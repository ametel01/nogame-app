import UniverseViewBox from "../components/boxes/UniverseViewBox";
// import tempPlanet from "../assets/gameElements/planets/2.png";
import { StyledTabPanel } from "./styleds";
import { useGetPositionsArray } from "../hooks/useGetPositionsArray";
import { PositionObject } from "../shared/types";
import { getPlanetImageUrl } from "../components/ui/PlanetSection";
import { useGetPositionSlotOccupant } from "../hooks/useGetPositionSlotOccupant";
import { useOwnerOf } from "../hooks/useOwnerOf";
import { useGetPlanetPoints } from "../hooks/useGetPlanetPoints";

interface UniverseBoxItemProps {
  position: PositionObject;
}

const UniverseBoxItem: React.FC<UniverseBoxItemProps> = ({ position }) => {
  const planetId = useGetPositionSlotOccupant(position.system, position.orbit);
  const points_data = useGetPlanetPoints(planetId);
  const points: number = points_data ? points_data : 0;
  const img = getPlanetImageUrl(planetId);
  const owner_data = useOwnerOf(planetId);
  const owner: string = owner_data ? owner_data.toString(16) : "";

  const shortenedAddress = owner
    ? `${owner.substring(0, 4)}...${owner.substring(59)}`
    : "null";
  console.log(points);
  return (
    <UniverseViewBox
      planetId={planetId}
      img={img}
      owner={shortenedAddress}
      position={`${position.system}/${position.orbit}`}
      points={points}
    />
  );
};

export const UniverseViewTabPanel = ({ ...rest }) => {
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
