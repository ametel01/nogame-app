import UniverseViewBox from "../components/boxes/UniverseViewBox";
import { StyledTabPanel } from "./styleds";
import { Position } from "../../../frontend/src/shared/types";
import { TutorialProps } from "../shared/types";
import { positionToString } from "../shared/utils";

const UniverseBoxItem = ({
  planetId,
  img,
  ownPlanetId,
  owner,
  position,
  points,
  address,
  ownFleet,
  isNoobProtected,
}: TutorialProps) => {
  return (
    <UniverseViewBox
      planetId={planetId}
      img={img}
      owner={owner}
      position={position}
      points={points}
      highlighted={address === "0x" + owner}
      ownPlanetId={ownPlanetId}
      ownFleet={ownFleet}
      isNoobProtected={isNoobProtected}
    />
  );
};

export const UniverseViewTabPanel = ({ ownPlanetId }: TutorialProps) => {
  const planets_data: Position[] = [];

  const sortedPlanetsData = planets_data.sort((a, b) => {
    if (Number(a.system) === Number(b.system)) {
      return Number(a.orbit) - Number(b.orbit); // If same system, compare by orbit
    }
    return Number(a.system) - Number(b.system); // Else, compare by system
  });

  return (
    <StyledTabPanel>
      {sortedPlanetsData.map((position, index) => (
        <UniverseBoxItem
          ownPlanetId={ownPlanetId}
          key={index}
          position={positionToString(position)}
        />
      ))}
    </StyledTabPanel>
  );
};

UniverseViewTabPanel.tabsRole = "TabPanel";
