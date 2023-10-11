import UniverseViewBox from "../components/boxes/UniverseViewBox";
// import tempPlanet from "../assets/gameElements/planets/2.png";
import { StyledTabPanel } from "./styleds";
import { useGetPositionsArray } from "../hooks/useGetPositionsArray";
import { PositionObject } from "../shared/types";
import { getPlanetImageUrl } from "../components/ui/PlanetSection";
import { useGetPositionSlotOccupant } from "../hooks/useGetPositionSlotOccupant";
import { useOwnerOf } from "../hooks/useOwnerOf";
import { useGetPlanetPoints } from "../hooks/useGetPlanetPoints";

export const UniverseViewTabPanel = ({ ...rest }) => {
  const planets_data = useGetPositionsArray();
  const position_zero: PositionObject = { system: 0, orbit: 0 };
  const position = planets_data ? planets_data[0] : position_zero;

  // Always call the hook and handle the condition inside the hook or after the hook call.
  const planetId = useGetPositionSlotOccupant(position.system, position.orbit);
  const points_data = useGetPlanetPoints(planetId);
  const points: number = points_data ? points_data : 0;
  const img = getPlanetImageUrl(planetId);
  const owner_data = useOwnerOf(planetId);
  const owner: string = owner_data ? owner_data.toString(16) : "";
  console.log(points_data);

  const shortenedAddress = owner
    ? `${owner.substring(0, 4)}...${owner.substring(59)}`
    : "null";
  console.log(shortenedAddress);
  return (
    <StyledTabPanel {...rest}>
      <UniverseViewBox
        planetId={planetId}
        img={img}
        owner={shortenedAddress}
        position={Number(position.system) + "/" + Number(position.orbit)}
        points={Number(points)}
      ></UniverseViewBox>
    </StyledTabPanel>
  );
};

UniverseViewTabPanel.tabsRole = "TabPanel";
