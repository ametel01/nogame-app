import React, { useState } from 'react';
import { RowCentered } from '../components/ui/Row';
import CircularProgress from '@mui/material/CircularProgress';
import { PrecisionManufacturing, Security } from '@mui/icons-material';
import {
  ResourceTab,
  ResourcesTabs,
  ResourcesTabList,
} from '../shared/styled/Tabs';
import { useTechLevels } from '../hooks/LevelsHooks';
import {
  type CompoundsLevels,
  type Resources,
  type TechLevels,
  type DefenceCost,
  type DefenceLevels,
} from '../shared/types';
import { Typography } from '@mui/material';
import { getBaseDefenceCost } from '../constants/costs';
import { DefenceTabPanel } from '../panels/DefencesTab';
import { ColonyCompoundTabPanel } from './ColonyTab';

interface ResourcesSectionArgs {
  planetId: number;
  colonyId: number;
  spendableResources: Resources;
  collectibleResource: Resources;
  compoundsLevels: CompoundsLevels;
  defencesLevels: DefenceLevels;
}

export const ColonyResourcesSection = ({
  planetId,
  colonyId,
  spendableResources,
  collectibleResource,
  compoundsLevels,
  defencesLevels,
}: ResourcesSectionArgs) => {
  const [activeTab, setActiveTab] = useState(1);
  const techLevels = useTechLevels(planetId);
  const defencesCost = getBaseDefenceCost();

  if (
    !compoundsLevels ||
    !techLevels ||
    !spendableResources ||
    !collectibleResource
  ) {
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100vh',
                width: '100vh',
              }}
            >
              <CircularProgress />
            </div>
          </ResourcesTabList>
        </ResourcesTabs>
      </div>
    );
  }

  const totalResources: Resources = {
    steel: spendableResources.steel + (collectibleResource?.steel ?? 0),
    quartz: spendableResources.quartz + (collectibleResource?.quartz ?? 0),
    tritium: spendableResources.tritium + (collectibleResource?.tritium ?? 0),
  };

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
          active={activeTab === 4 ? 'true' : 'false'}
        >
          <RowCentered gap={'8px'}>
            <Security />
            <Typography>Defences</Typography>
          </RowCentered>
        </ResourceTab>
      </ResourcesTabList>
      {activeTab === 1 &&
        renderCompounds(colonyId, totalResources, compoundsLevels)}
      {activeTab === 2 &&
        renderDefencesPanel(
          totalResources,
          defencesLevels,
          defencesCost,
          compoundsLevels.dockyard,
          techLevels,
          colonyId
        )}
    </ResourcesTabs>
  );
};

function renderCompounds(
  colonyId: number,
  spendable: Resources,
  compounds: CompoundsLevels
) {
  return (
    <ColonyCompoundTabPanel
      colonyId={colonyId}
      spendableResources={spendable}
      compoundsLevels={compounds}
    />
  );
}

function renderDefencesPanel(
  spendable: Resources,
  defences: DefenceLevels,
  defencesCost: DefenceCost,
  dockyard: number,
  techs: TechLevels,
  colonyId: number
) {
  return (
    <DefenceTabPanel
      spendableResources={spendable}
      defenceLevels={defences}
      defenceCost={defencesCost}
      dockyardLevel={dockyard}
      techLevels={techs}
      colonyId={colonyId}
    />
  );
}
