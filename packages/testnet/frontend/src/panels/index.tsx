import React, { useState, useEffect } from 'react';
import { RowCentered } from '../components/ui/Row';
import CircularProgress from '@mui/material/CircularProgress';
import {
  PrecisionManufacturing,
  Biotech,
  Rocket,
  Security,
  Explore,
} from '@mui/icons-material';
import {
  ResourceTab,
  ResourcesTabs,
  ResourcesTabList,
} from '../shared/styled/Tabs';
import { ResearchTabPanel } from './ResearchTab';
import { DockyardTabPanel } from './DockyardTab';
import { DefenceTabPanel } from './DefencesTab';

import { CompoundsTabPanel } from './CompoundsTab';
import { useSpendableResources } from '../hooks/ResourcesHooks';
import { useDefencesLevels, useShipsLevels } from '../hooks/LevelsHooks';
import { useDefencesCost, useShipsCost } from '../hooks/CostsHooks';
import { UniverseViewTabPanel } from './UniverseViewTab';
import { useGetCelestiaAvailable } from '../hooks/EnergyHooks';
import {
  type CompoundsLevels,
  type Resources,
  type TechLevels,
  type ShipsCost,
  type ShipsLevels,
  type DefenceCost,
  type DefenceLevels,
} from '../shared/types';
import { Typography } from '@mui/material';
import fetchUpgradesData from '../api/fetchUpgradesData';

interface ResourcesSectionArgs {
  planetId: number;
}

export const ResourcesSection = ({ planetId }: ResourcesSectionArgs) => {
  const [activeTab, setActiveTab] = useState(1);
  const [compoundsLevels, setCompoundsLevels] =
    useState<CompoundsLevels | null>(null);
  const [techLevels, setTechLevels] = useState<TechLevels | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUpgradesData({ planetId });
        setCompoundsLevels(data.compoundsLevels);
        setTechLevels(data.techLevels);
      } catch (error) {
        console.error('Error fetching upgrades data:', error);
        // Handle the error appropriately
      }
    };

    fetchData();
  }, [planetId]);
  // Data Retrieval Hooks
  const spendableResources = useSpendableResources(planetId);
  const shipsLevels = useShipsLevels(planetId);
  const shipsCost = useShipsCost();
  const defencesLevels = useDefencesLevels(planetId);
  const celestiaAvailable = useGetCelestiaAvailable(planetId);
  const defencesCost = useDefencesCost();

  if (!compoundsLevels || !techLevels) {
    // Centered CircularProgress
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <ResourcesTabs>
          <ResourcesTabList>
            <CircularProgress />
          </ResourcesTabList>
        </ResourcesTabs>
      </div>
    );
  }

  return (
    <ResourcesTabs>
      <ResourcesTabList>
        <ResourceTab
          onClick={() => {
            setActiveTab(1);
          }}
          active={activeTab === 1 ? 'true' : 'false'}
        >
          <RowCentered gap={'8px'}>
            <PrecisionManufacturing />
            <Typography>Compounds</Typography>
          </RowCentered>
        </ResourceTab>
        <ResourceTab
          onClick={() => {
            setActiveTab(2);
          }}
          active={activeTab === 2 ? 'true' : 'false'}
        >
          <RowCentered gap={'8px'}>
            <Biotech />
            <Typography>Research Lab</Typography>
          </RowCentered>
        </ResourceTab>
        <ResourceTab
          onClick={() => {
            setActiveTab(3);
          }}
          active={activeTab === 3 ? 'true' : 'false'}
        >
          <RowCentered gap={'8px'}>
            <Rocket />
            <Typography>Dockyard</Typography>
          </RowCentered>
        </ResourceTab>
        <ResourceTab
          onClick={() => {
            setActiveTab(4);
          }}
          active={activeTab === 4 ? 'true' : 'false'}
        >
          <RowCentered gap={'8px'}>
            <Security />
            <Typography>Defences</Typography>
          </RowCentered>
        </ResourceTab>
        <ResourceTab
          onClick={() => {
            setActiveTab(5);
          }}
          active={activeTab === 5 ? 'true' : 'false'}
        >
          <RowCentered gap={'8px'}>
            <Explore />
            <Typography>Universe</Typography>
          </RowCentered>
        </ResourceTab>
      </ResourcesTabList>
      {activeTab === 1 && renderCompounds(spendableResources, compoundsLevels)}
      {activeTab === 2 &&
        renderLabPanel(
          spendableResources,
          techLevels,
          Number(compoundsLevels.lab)
        )}
      {activeTab === 3 &&
        renderDockyardTab(
          spendableResources,
          shipsLevels,
          shipsCost,
          compoundsLevels.dockyard,
          techLevels,
          celestiaAvailable
        )}
      {activeTab === 4 &&
        renderDefencesPanel(
          spendableResources,
          defencesLevels,
          defencesCost,
          compoundsLevels.dockyard,
          techLevels
        )}
      {activeTab === 5 && renderUniversePanel(planetId, techLevels)}
    </ResourcesTabs>
  );
};

function renderCompounds(spendable: Resources, compounds: CompoundsLevels) {
  return (
    <CompoundsTabPanel
      spendableResources={spendable}
      compoundsLevels={compounds}
    />
  );
}

function renderLabPanel(
  spendable: Resources,
  techs: TechLevels,
  labLevel: number
) {
  return (
    <ResearchTabPanel
      spendableResources={spendable}
      techLevels={techs}
      labLevel={labLevel}
    />
  );
}

function renderDockyardTab(
  spendable: Resources,
  ships: ShipsLevels,
  shipCost: ShipsCost,
  dockyard: number,
  techs: TechLevels,
  celestia: number
) {
  return (
    <DockyardTabPanel
      spendableResources={spendable}
      shipsLevels={ships}
      shipsCost={shipCost}
      dockyardLevel={dockyard}
      techLevels={techs}
      celestia={celestia}
    />
  );
}

function renderDefencesPanel(
  spendable: Resources,
  defences: DefenceLevels,
  defencesCost: DefenceCost,
  dockyard: number,
  techs: TechLevels
) {
  return (
    <DefenceTabPanel
      spendableResources={spendable}
      defenceLevels={defences}
      defenceCost={defencesCost}
      dockyardLevel={dockyard}
      techLevels={techs}
    />
  );
}

function renderUniversePanel(planetId: number, techLevels: TechLevels) {
  return <UniverseViewTabPanel ownPlanetId={planetId} ownTechs={techLevels} />;
}
