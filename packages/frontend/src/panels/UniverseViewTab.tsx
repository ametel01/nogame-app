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
import {
  useGetColonyMotherPlanet,
  useGetColonyShips,
} from '../hooks/ColoniesHooks';
import { useDestination } from '../context/DestinationContext';

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

  const colonyFleetData = useGetColonyShips(Number(ownPlanetId), colonyId);
  const colonyFleet: ShipsLevels = colonyFleetData || {
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
      ownFleet={colonyId === 0 ? ownFleet : colonyFleet}
      ownTechs={ownTechs}
      isNoobProtected={isNoobProtected}
      lastActive={Number(lastActive)}
      winLoss={[winLoss.wins, winLoss.losses]}
      colonyId={colonyId}
    />
  );
};

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
  const itemsPerPage = 6;
  const pageCount = Math.ceil(planetsData.length / itemsPerPage);

  const { selectedDestination } = useDestination();

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

        if (selectedDestination !== null) {
          const destinationIndex = sortedData.findIndex(
            (planet) => planet.planetId === Number(selectedDestination)
          );
          if (destinationIndex !== -1) {
            // Check if index is valid
            const destinationPage = Math.ceil(
              (destinationIndex + 1) / itemsPerPage
            );
            setCurrentPage(destinationPage);
          }
        } else {
          // Default page setting logic
          const ownPlanetIndex = sortedData.findIndex((planet) =>
            colonyId === 0
              ? planet.planetId === ownPlanetId
              : planet.planetId === ownPlanetId * 1000 + colonyId
          );
          const initialPage = Math.ceil((ownPlanetIndex + 1) / itemsPerPage);
          setCurrentPage(initialPage);
        }
      })
      .catch((error) => {
        console.error('Error fetching planets data:', error);
      });
  }, [colonyId, ownPlanetId, selectedDestination]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedPlanets = planetsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <StyledTabPanel {...rest}>
      {selectedPlanets.map((planet, index) => (
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
            '.MuiPaginationItem-root.MuiPaginationItem-root': {
              color: 'white',
            },
            '.MuiPaginationItem-root.Mui-selected': {
              backgroundColor: 'rgba(211, 211, 211, 0.5)',
            },
          }}
        />
      </Stack>
    </StyledTabPanel>
  );
};

UniverseViewTabPanel.tabsRole = 'TabPanel';
