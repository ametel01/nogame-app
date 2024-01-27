import React, { useState, useEffect } from 'react';
import {
  UniverseProps,
  useAccount,
  useGetIsNoobProtected,
  useGetPlanetRanking,
  useCalculateWinsAndLosses,
  useLastActive,
  useShipsLevels,
  ShipsLevels,
  getPlanetImage,
  ImageId,
  UniverseViewBox,
  Resources,
  TechLevels,
  DefenceLevels,
  PlanetDetails,
  fetchPlanetsData,
  StyledTabPanel,
  Stack,
  Pagination,
} from '.';
import { useGetColonyMotherPlanet } from '../hooks/ColoniesHooks';
// import { Switch, Typography } from '@mui/material';

const UniverseBoxItem = ({
  ownPlanetId,
  planet,
  ownTechs,
  colonyId,
}: UniverseProps) => {
  const { address: address_data } = useAccount();
  const address = address_data || '';
  const highlighted = parseInt(address, 16) === parseInt(planet.account, 16);

  const motherPlanet = useGetColonyMotherPlanet(planet.planetId);
  const planetArg = planet.planetId > 500 ? motherPlanet : planet.planetId;

  const planetRanking = useGetPlanetRanking(planetArg);
  const winLoss = useCalculateWinsAndLosses(planetArg);
  const lastActive = useLastActive(planetArg);
  const isNoobProtected = useGetIsNoobProtected(Number(ownPlanetId), planetArg);

  const ownFleetData = useShipsLevels(Number(ownPlanetId));
  const ownFleet: ShipsLevels = ownFleetData || {
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

  const shortenedAddress = `${planet.account.slice(
    0,
    4
  )}...${planet.account.slice(-4)}`;

  return (
    <UniverseViewBox
      planetId={planet.planetId}
      img={img}
      owner={shortenedAddress}
      position={planet.position}
      points={planetRanking}
      highlighted={highlighted}
      ownPlanetId={ownPlanetId}
      ownFleet={ownFleet}
      ownTechs={ownTechs}
      isNoobProtected={isNoobProtected}
      lastActive={Number(lastActive)}
      winLoss={[winLoss.wins, winLoss.losses]}
      colonyId={colonyId}
    />
  );
};

// Define a type for the systems structure
type SystemsType = {
  [key: number]: (PlanetDetails | null)[];
};

const groupPlanetsBySystem = (planets: PlanetDetails[]): SystemsType => {
  const systems: SystemsType = {};
  for (let i = 1; i <= 10; i++) {
    // Initialize each system with 10 orbits (null represents empty orbit)
    systems[i] = Array(10).fill(null);
  }

  planets.forEach((planet: PlanetDetails) => {
    const system = planet.position.system;
    const orbit = planet.position.orbit - 1; // Adjusting for 0-based index
    if (systems[system]) {
      systems[system][orbit] = planet;
    }
  });

  return systems;
};

const EmptyPlanetSlot = () => (
  <div style={{ padding: '10px', border: '1px dashed gray', margin: '5px' }}>
    Empty Slot
  </div>
);

interface UniverseViewTabPanelProps {
  spendable?: Resources;
  collectible?: Resources;
  ownTechs?: TechLevels;
  fleet?: ShipsLevels;
  defences?: DefenceLevels;
  ownPlanetId: number;
  colonyId: number;
}

export const UniverseViewTabPanel = ({
  ownPlanetId,
  ownTechs,
  colonyId,
  ...rest
}: UniverseViewTabPanelProps) => {
  const [planetsData, setPlanetsData] = useState<PlanetDetails[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isExtendedView] = useState(false);
  const itemsPerPage = 6;
  const pageCount = isExtendedView
    ? 10
    : Math.ceil(planetsData.length / itemsPerPage); // Adjust as needed

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
        const ownPlanetIndex = sortedData.findIndex(
          (planet) => planet.planetId === ownPlanetId
        );
        // Calculate the initial page based on the index
        const initialPage = Math.ceil((ownPlanetIndex + 1) / itemsPerPage);

        setPlanetsData(sortedData);
        // Set the initial page
        setCurrentPage(initialPage);
      })
      .catch((error) => {
        console.error('Error fetching planets data:', error);
      });
  }, [ownPlanetId]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedPlanets = planetsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const renderPlanets = () => {
    if (isExtendedView) {
      const systems = groupPlanetsBySystem(planetsData);
      const currentSystemPlanets = systems[currentPage]; // currentPage now refers to the system number
      return currentSystemPlanets.map((planet, index) =>
        planet ? (
          <UniverseBoxItem
            ownPlanetId={ownPlanetId}
            ownTechs={ownTechs}
            key={index}
            planet={planet}
            colonyId={colonyId}
          />
        ) : (
          <EmptyPlanetSlot key={index} /> // Render a placeholder for empty slots
        )
      );
    } else {
      return selectedPlanets.map((planet, index) => (
        <UniverseBoxItem
          ownPlanetId={ownPlanetId}
          ownTechs={ownTechs}
          key={index}
          planet={planet}
          colonyId={colonyId}
        />
      ));
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <StyledTabPanel {...rest}>
      {/* <Stack direction="row" justifyContent="center" spacing={2}>
        <Typography>Normal View</Typography>
        <Switch
          checked={isExtendedView}
          onChange={(e) => setIsExtendedView(e.target.checked)}
        />
        <Typography>Extended View</Typography>
      </Stack> */}
      {isExtendedView
        ? renderPlanets()
        : selectedPlanets.map((planet, index) => (
            <UniverseBoxItem
              ownPlanetId={ownPlanetId}
              ownTechs={ownTechs}
              key={index}
              planet={planet}
              colonyId={colonyId}
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
            '.MuiPaginationItem-root.MuiPaginationItem-root': {
              color: 'white',
            },
            '.MuiPaginationItem-root.Mui-selected': {
              backgroundColor: 'rgba(211, 211, 211, 0.5)', // Lighter gray background for the selected page
            },
          }}
        />
      </Stack>
    </StyledTabPanel>
  );
};

UniverseViewTabPanel.tabsRole = 'TabPanel';
