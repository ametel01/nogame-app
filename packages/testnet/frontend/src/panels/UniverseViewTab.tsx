import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
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
  const [currentPage, setCurrentPage] = useState(1); // MUI Pagination is 1-indexed
  const itemsPerPage = 6;

  useEffect(() => {
    fetchPlanetsData()
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          if (Number(a.position.system) === Number(b.position.system)) {
            return Number(a.position.orbit) - Number(b.position.orbit);
          }
          return Number(a.position.system) - Number(b.position.system);
        });

        // Find the index of the planet with the ownPlanetId
        const ownPlanetIndex = sortedData.findIndex(planet => planet.planetId === ownPlanetId);
        // Calculate the initial page based on the index
        const initialPage = Math.ceil((ownPlanetIndex + 1) / itemsPerPage);

        setPlanetsData(sortedData);
        // Set the initial page
        setCurrentPage(initialPage);
      })
      .catch((error) => console.error("Error fetching planets data:", error));
  }, [ownPlanetId]); // Add ownPlanetId as a dependency to recalculate if it changes

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedPlanets = planetsData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const pageCount = Math.ceil(planetsData.length / itemsPerPage);

  return (
    <StyledTabPanel {...rest}>
      {selectedPlanets.map((planet, index) => (
        <UniverseBoxItem
          ownPlanetId={ownPlanetId}
          key={index}
          planet={planet}
        />
      ))}
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          sx={{
            // ...
            ".MuiPaginationItem-root.MuiPaginationItem-root": {
              color: 'white',
            },
            ".MuiPaginationItem-root.Mui-selected": {
              backgroundColor: 'rgba(211, 211, 211, 0.5)', // Lighter gray background for the selected page
            },
          }}
        />
      </Stack>
    </StyledTabPanel>
  );
};

UniverseViewTabPanel.tabsRole = "TabPanel";
