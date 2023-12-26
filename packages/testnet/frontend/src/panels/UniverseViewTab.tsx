import { useState, useEffect } from "react";
import UniverseViewBox from "../components/boxes/UniverseViewBox";
import { StyledTabPanel } from "./styleds";
import {
  DefenceLevels,
  Resources,
  ShipsLevels,
  PlanetDetails,
} from "../shared/types";
import { useAccount } from "@starknet-react/core";
import { useShipsLevels } from "../hooks/LevelsHooks";
import { useGetIsNoobProtected } from "../hooks/FleetHooks";
import { getPlanetImage, ImageId } from "../shared/utils/getPlanetImage";
import fetchPlanetsData from "../api/fetchPlanetsData";

interface UniverseBoxItemProps {
  ownPlanetId: number;
  planet: PlanetDetails;
}

const UniverseBoxItem = ({ ownPlanetId, planet }: UniverseBoxItemProps) => {
  const { address: address_data } = useAccount();
  const address = address_data ? address_data : "";
  const highlighted = parseInt(address, 16) === parseInt(planet.account, 16);

  const isNoobProtected = useGetIsNoobProtected(
    Number(ownPlanetId),
    planet.planetId
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

  const img = getPlanetImage(
    planet.position.orbit.toString() as unknown as ImageId
  );

  const formattedPosition = `${String(planet.position.system).padStart(
    2,
    "0"
  )} / ${String(planet.position.orbit).padStart(2, "0")}`;

  const shortenedAddress = `${planet.account.slice(
    0,
    4
  )}...${planet.account.slice(-4)}`;

  return (
    <UniverseViewBox
      planetId={planet.planetId}
      img={img}
      owner={shortenedAddress}
      position={formattedPosition}
      points={planet.points}
      highlighted={highlighted}
      ownPlanetId={ownPlanetId}
      ownFleet={ownFleet}
      isNoobProtected={isNoobProtected}
      lastActive={Number(planet.lastActive)}
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
  const [planetsData, setPlanetsData] = useState<PlanetDetails[]>([]);

  useEffect(() => {
    fetchPlanetsData()
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          if (Number(a.position.system) === Number(b.position.system)) {
            return Number(a.position.orbit) - Number(b.position.orbit);
          }
          return Number(a.position.system) - Number(b.position.system);
        });
        setPlanetsData(sortedData);
      })
      .catch((error) => console.error("Error fetching planets data:", error));
  }, []);

  const sortedPlanetsData = planetsData.sort((a, b) => {
    if (Number(a.position.system) === Number(b.position.system)) {
      return Number(a.position.orbit) - Number(b.position.orbit); // If same system, compare by orbit
    }
    return Number(a.position.system) - Number(b.position.system); // Else, compare by system
  });

  return (
    <StyledTabPanel {...rest}>
      {sortedPlanetsData.map((planet, index) => (
        <UniverseBoxItem
          ownPlanetId={ownPlanetId}
          key={index}
          planet={planet}
        />
      ))}
    </StyledTabPanel>
  );
};

UniverseViewTabPanel.tabsRole = "TabPanel";
