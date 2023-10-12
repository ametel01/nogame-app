import { FC } from "react";
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
import { useTokenOf } from "../hooks/useTokenOf";
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

export const ResourcesSection: FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const data = useTokenOf();
  const planetId = Number(data!.planetId);
  // Data Retrieval Hooks
  const compoundsLevels =
    planetId !== undefined ? useCompoundsLevels(planetId) : undefined;
  const spendableResources =
    planetId !== undefined ? useSpendableResources(planetId) : undefined;
  const compoundsCost =
    planetId !== undefined ? useCompoundsUpgradeCost(planetId) : undefined;
  const energyCost =
    planetId !== undefined ? useEnergyCost(planetId) : undefined;
  const techLevels =
    planetId !== undefined ? useTechsLevels(planetId) : undefined;
  const techCost =
    planetId !== undefined ? useTechsUpgradeCost(planetId) : undefined;
  const shipsLevels =
    planetId !== undefined ? useShipsLevels(planetId) : undefined;
  const shipsCost = useShipsCost();
  const defencesLevels =
    planetId !== undefined ? useDefencesLevels(planetId) : undefined;
  const defencesCost = useDefencesCost();
  return (
    <ResourcesTabs>
      <ResourcesTabList>
        <ResourceTab
          onClick={() => setActiveTab(0)}
          active={activeTab === 0 ? true : false}
        >
          <RowCentered gap={"8px"}>
            <PrecisionManufacturing /> Compounds
          </RowCentered>
        </ResourceTab>
        <ResourceTab
          onClick={() => setActiveTab(1)}
          active={activeTab === 1 ? true : false}
        >
          <RowCentered gap={"8px"}>
            <Biotech /> Research Lab
          </RowCentered>
        </ResourceTab>
        <ResourceTab
          onClick={() => setActiveTab(2)}
          active={activeTab === 2 ? true : false}
        >
          <RowCentered gap={"8px"}>
            <Rocket /> Dockyard
          </RowCentered>
        </ResourceTab>
        <ResourceTab
          onClick={() => setActiveTab(3)}
          active={activeTab === 3 ? true : false}
        >
          <RowCentered gap={"8px"}>
            <Security /> Defences
          </RowCentered>
        </ResourceTab>
        <ResourceTab
          onClick={() => setActiveTab(4)}
          active={activeTab === 4 ? true : false}
        >
          <RowCentered gap={"8px"}>
            <Explore /> Universe
          </RowCentered>
        </ResourceTab>
      </ResourcesTabList>
      {activeTab === 0 && (
        <CompoundsTabPanel
          spendableResources={spendableResources!}
          compoundsLevels={compoundsLevels!}
          compoundsCostUpgrade={compoundsCost!}
          energyRequired={energyCost!}
        />
      )}
      {activeTab === 1 && (
        <ResearchTabPanel
          spendableResources={spendableResources}
          techLevels={techLevels}
          techCostUpgrade={techCost}
          labLevel={Number(compoundsLevels?.lab)}
        />
      )}
      {activeTab === 2 && (
        <DockyardTabPanel
          spendableResources={spendableResources}
          shipsLevels={shipsLevels}
          shipsCost={shipsCost}
          dockyardLevel={Number(compoundsLevels?.dockyard)}
          techLevels={techLevels}
        />
      )}
      {activeTab === 3 && (
        <DefenceTabPanel
          spendableResources={spendableResources}
          defenceLevels={defencesLevels}
          defenceCost={defencesCost}
          dockyardLevel={Number(compoundsLevels?.dockyard)}
          techLevels={techLevels}
        />
      )}
      {activeTab === 4 && <UniverseViewTabPanel />}
    </ResourcesTabs>
  );
};
