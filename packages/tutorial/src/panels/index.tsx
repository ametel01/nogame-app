import { useState } from "react";
import { RowCentered } from "../../../frontend/src/components/ui/Row";
import {
  PrecisionManufacturing,
  Biotech,
  Rocket,
  Security,
  Explore,
} from "@mui/icons-material";
import {
  ResourceTab,
  ResourcesTabs,
  ResourcesTabList,
} from "../../../frontend/src/shared/styled/Tabs";
import { ResearchTabPanel } from "./ResearchTab";
import { DockyardTabPanel } from "./DockyardTab";
import { DefenceTabPanel } from "./DefencesTab";

import { CompoundsTabPanel } from "./CompoundsTab";
import { UniverseViewTabPanel } from "./UniverseViewTab";
import {
  CompoundsLevels,
  CompoundsCostUpgrade,
  EnergyCost,
  Resources,
  TechCost,
  TechLevels,
  ShipsCost,
  ShipsLevels,
  DefenceCost,
  DefenceLevels,
} from "../../../frontend/src/shared/types";
import { Typography } from "@mui/material";
import { TutorialProps } from "../shared/types";

export const ResourcesSection = ({
  planetId,
  spendableResources,
  compoundsLevels,
  compoundsCost,
  energyCost,
  energyGain,
  techLevels,
  techCost,
  shipsLevels,
  shipsCost,
  celestiaAvailable,
  defencesLevels,
  defencesCost,
}: TutorialProps) => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <ResourcesTabs>
      <ResourcesTabList>
        <ResourceTab
          onClick={() => setActiveTab(1)}
          active={activeTab === 1 ? "true" : "false"}
        >
          <RowCentered gap={"8px"}>
            <PrecisionManufacturing />
            <Typography>Compounds</Typography>
          </RowCentered>
        </ResourceTab>
        <ResourceTab
          onClick={() => setActiveTab(2)}
          active={activeTab === 2 ? "true" : "false"}
        >
          <RowCentered gap={"8px"}>
            <Biotech />
            <Typography>Research Lab</Typography>
          </RowCentered>
        </ResourceTab>
        <ResourceTab
          onClick={() => setActiveTab(3)}
          active={activeTab === 3 ? "true" : "false"}
        >
          <RowCentered gap={"8px"}>
            <Rocket />
            <Typography>Dockyard</Typography>
          </RowCentered>
        </ResourceTab>
        <ResourceTab
          onClick={() => setActiveTab(4)}
          active={activeTab === 4 ? "true" : "false"}
        >
          <RowCentered gap={"8px"}>
            <Security />
            <Typography>Defences</Typography>
          </RowCentered>
        </ResourceTab>
        <ResourceTab
          onClick={() => setActiveTab(5)}
          active={activeTab === 5 ? "true" : "false"}
        >
          <RowCentered gap={"8px"}>
            <Explore />
            <Typography>Universe</Typography>
          </RowCentered>
        </ResourceTab>
      </ResourcesTabList>
      {activeTab === 1 &&
        renderCompounds(
          spendableResources,
          compoundsLevels,
          compoundsCost,
          energyCost,
          energyGain
        )}
      {activeTab === 2 &&
        renderLabPanel(
          spendableResources,
          techLevels,
          techCost,
          compoundsLevels?.lab
        )}
      {activeTab === 3 &&
        renderDockyardTab(
          spendableResources,
          shipsLevels,
          shipsCost,
          compoundsLevels?.dockyard,
          techLevels,
          celestiaAvailable
        )}
      {activeTab === 4 &&
        renderDefencesPanel(
          spendableResources,
          defencesLevels,
          defencesCost,
          compoundsLevels?.dockyard,
          techLevels
        )}
      {activeTab === 5 && renderUniversePanel(planetId)}
    </ResourcesTabs>
  );
};

function renderCompounds(
  spendable?: Resources,
  compounds?: CompoundsLevels,
  compoundsCost?: CompoundsCostUpgrade,
  energy?: EnergyCost,
  energyGain?: number
) {
  return (
    <CompoundsTabPanel
      spendableResources={spendable}
      compoundsLevels={compounds}
      compoundsCostUpgrade={compoundsCost}
      energyRequired={energy}
      energyGain={energyGain}
    />
  );
}

function renderLabPanel(
  spendable?: Resources,
  techs?: TechLevels,
  techCost?: TechCost,
  labLevel?: number
) {
  return (
    <ResearchTabPanel
      spendableResources={spendable}
      techLevels={techs}
      techCostUpgrade={techCost}
      labLevel={labLevel}
    />
  );
}

function renderDockyardTab(
  spendable?: Resources,
  ships?: ShipsLevels,
  shipCost?: ShipsCost,
  dockyard?: number,
  techs?: TechLevels,
  celestia?: number
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
  spendable?: Resources,
  defences?: DefenceLevels,
  defencesCost?: DefenceCost,
  dockyard?: number,
  techs?: TechLevels
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

function renderUniversePanel(planetId?: number) {
  return <UniverseViewTabPanel ownPlanetId={planetId} />;
}
