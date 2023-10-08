import { FC } from "react";
import { useAccount } from "@starknet-react/core";

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
import { EmptyTabPanel } from "./EmptyTabPanel";
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
  const { address } = useAccount();
  const { data: planetIdData } = useTokenOf(address);

  // Check if planetIdData is defined and extract the first item (assuming it's the planetId)
  const planetId = planetIdData && planetIdData[0];

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
  const shipsCost = planetId !== undefined ? useShipsCost(planetId) : undefined;
  const defencesLevels =
    planetId !== undefined ? useDefencesLevels(planetId) : undefined;
  const defencesCost =
    planetId !== undefined ? useDefencesCost(planetId) : undefined;

  return (
    <ResourcesTabs>
      <ResourcesTabList>
        <ResourceTab>
          <RowCentered gap={"8px"}>
            <CompoundsIcon /> Compounds
          </RowCentered>
        </ResourceTab>
        <ResourceTab>
          <RowCentered gap={"8px"}>
            <ResearchIcon /> Research Lab
          </RowCentered>
        </ResourceTab>
        <ResourceTab>
          <RowCentered gap={"8px"}>
            <ResearchIcon /> Dockyard
          </RowCentered>
        </ResourceTab>
        <ResourceTab>
          <RowCentered gap={"8px"}>
            <ResearchIcon /> Defences
          </RowCentered>
        </ResourceTab>
      </ResourcesTabList>
      <CompoundsTabPanel
        spendableResources={spendableResources!}
        compoundsLevels={compoundsLevels!}
        compoundsCostUpgrade={compoundsCost!}
        energyRequired={energyCost!}
      />
      <ResearchTabPanel
        spendableResources={spendableResources}
        techLevels={techLevels}
        techCostUpgrade={techCost}
        labLevel={Number(compoundsLevels?.lab)}
      />
      <DockyardTabPanel
        spendableResources={spendableResources}
        shipsLevels={shipsLevels}
        shipsCost={shipsCost}
        dockyardLevel={Number(compoundsLevels?.dockyard)}
        techLevels={techLevels}
      />
      <DefenceTabPanel
        spendableResources={spendableResources}
        defenceLevels={defencesLevels}
        defenceCost={defencesCost}
        dockyardLevel={Number(compoundsLevels?.dockyard)}
        techLevels={techLevels}
      />
      <EmptyTabPanel />
    </ResourcesTabs>
  );
};
