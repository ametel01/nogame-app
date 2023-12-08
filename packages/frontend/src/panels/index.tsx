import { useState } from "react";
import { RowCentered } from "../components/ui/Row";
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
} from "../shared/styled/Tabs";
import { ResearchTabPanel } from "./ResearchTab";
import { DockyardTabPanel } from "./DockyardTab";
import { DefenceTabPanel } from "./DefencesTab";

import { CompoundsTabPanel } from "./CompoundsTab";
import { useSpendableResources } from "../hooks/ResourcesHooks";
import {
  useCompoundsLevels,
  useDefencesLevels,
  useShipsLevels,
  useTechsLevels,
} from "../hooks/LevelsHooks";
import {
  useCompoundsUpgradeCost,
  useDefencesCost,
  useEnergyCost,
  useShipsCost,
  useTechsUpgradeCost,
} from "../hooks/CostsHooks";
import { UniverseViewTabPanel } from "./UniverseViewTab";
import {
  useGetCelestiaAvailable,
  useGetEnergyGainAfterUpgrade,
} from "../hooks/EnergyHooks";
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
} from "../shared/types";
import { Typography } from "@mui/material";

interface ResourcesSectionArgs {
  planetId: number;
}

export const ResourcesSection = ({ planetId }: ResourcesSectionArgs) => {
  const [activeTab, setActiveTab] = useState(1);
  // Data Retrieval Hooks
  const compoundsLevels = useCompoundsLevels(planetId);
  const spendableResources = useSpendableResources(planetId);
  const compoundsCost = useCompoundsUpgradeCost(planetId);
  const energyCost = useEnergyCost(planetId);
  const techLevels = useTechsLevels(planetId);
  const techCost = useTechsUpgradeCost(planetId);
  const shipsLevels = useShipsLevels(planetId);
  const shipsCost = useShipsCost();
  const defencesLevels = useDefencesLevels(planetId);
  const celestiaAvailable = useGetCelestiaAvailable(planetId);
  const energyGain = useGetEnergyGainAfterUpgrade(planetId);
  const defencesCost = useDefencesCost();

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
      {activeTab === 5 && renderUniversePanel(planetId)}
    </ResourcesTabs>
  );
};

function renderCompounds(
  spendable: Resources,
  compounds: CompoundsLevels,
  compoundsCost: CompoundsCostUpgrade,
  energy: EnergyCost,
  energyGain: number
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
  spendable: Resources,
  techs: TechLevels,
  techCost: TechCost,
  labLevel: number
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

function renderUniversePanel(planetId: number) {
  return <UniverseViewTabPanel ownPlanetId={planetId} />;
}
