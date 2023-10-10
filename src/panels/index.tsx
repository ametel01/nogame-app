import { FC } from "react";
import { useState } from "react";
import { RowCentered } from "../components/ui/Row";
import {
  ResourcesTabList,
  ResourcesTabs,
  ResourceTab,
} from "../components/popups/ResourcesSection/styleds";
import { CompoundsIcon } from "../assets/uiIcons/factory";
import { ResearchIcon } from "../assets/uiIcons/lab";
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
        <ResourceTab onClick={() => setActiveTab(0)}>
          <RowCentered gap={"8px"}>
            <CompoundsIcon /> Compounds
          </RowCentered>
        </ResourceTab>
        <ResourceTab onClick={() => setActiveTab(1)}>
          <RowCentered gap={"8px"}>
            <ResearchIcon /> Research Lab
          </RowCentered>
        </ResourceTab>
        <ResourceTab onClick={() => setActiveTab(2)}>
          <RowCentered gap={"8px"}>
            <ResearchIcon /> Dockyard
          </RowCentered>
        </ResourceTab>
        <ResourceTab onClick={() => setActiveTab(3)}>
          <RowCentered gap={"8px"}>
            <ResearchIcon /> Defences
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
    </ResourcesTabs>
  );
};
