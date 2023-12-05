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
  Position,
  HostileMission,
} from "../../../frontend/src/shared/types";
import CompoundsFormulas from "../../../frontend/src/shared/utils/Formulas";
import { techCostFormula } from "../../../frontend/src/shared/utils/Formulas";
import {
  baseTechCost,
  baseShipCost,
  baseDefenceCost,
} from "../../../frontend/src/constants/costs";

export interface TutorialProps {
  planetId?: number;
  account?: string;
  spendableResources?: Resources;
  collectibleResources?: Resources;
  compoundsLevels?: CompoundsLevels;
  compoundsCost?: CompoundsCostUpgrade;
  energyCost?: EnergyCost;
  energyGain?: number;
  techLevels?: TechLevels;
  techCost?: TechCost;
  shipsLevels?: ShipsLevels;
  shipsCost?: ShipsCost;
  celestiaAvailable?: number;
  defencesLevels?: DefenceLevels;
  defencesCost?: DefenceCost;
  ownPlanetId?: number;
  position?: string;
  img?: string;
  owner?: string;
  points?: number;
  highlighted?: boolean;
  ownPosition?: Position;
  ownFleet?: ShipsLevels;
  isNoobProtected?: boolean;
  address?: string;
  title?: string;
  energyAvailable?: number;
  energyFromCelestia?: number;
  hostileMissions?: HostileMission[];
}

export const baseCompoundsCost: CompoundsCostUpgrade = {
  steel: CompoundsFormulas.steelCost(1),
  quartz: CompoundsFormulas.quartzCost(1),
  tritium: CompoundsFormulas.tritiumCost(1),
  energy: CompoundsFormulas.energyCost(1),
  lab: CompoundsFormulas.labCost(1),
  dockyard: CompoundsFormulas.dockyardCost(1),
};

export const energyCostBase: EnergyCost = {
  steel: CompoundsFormulas.steelConsumption(1),
  quartz: CompoundsFormulas.steelConsumption(1),
  tritium: CompoundsFormulas.steelConsumption(1),
  energy: CompoundsFormulas.energyProduction(1),
  celestia: 20,
  null: 0,
};

export const techCostBase: TechCost = {
  digital: techCostFormula(
    1,
    baseTechCost.digital.steel,
    baseTechCost.digital.quartz,
    baseTechCost.digital.tritium
  ),
  weapons: techCostFormula(
    1,
    baseTechCost.weapon.steel,
    baseTechCost.weapon.quartz,
    baseTechCost.weapon.tritium
  ),
  shield: techCostFormula(
    1,
    baseTechCost.shield.steel,
    baseTechCost.shield.quartz,
    baseTechCost.shield.tritium
  ),
  armour: techCostFormula(
    1,
    baseTechCost.armour.steel,
    baseTechCost.armour.quartz,
    baseTechCost.armour.tritium
  ),
  energy: techCostFormula(
    1,
    baseTechCost.energy.steel,
    baseTechCost.energy.quartz,
    baseTechCost.energy.tritium
  ),
  combustion: techCostFormula(
    1,
    baseTechCost.combustion.steel,
    baseTechCost.combustion.quartz,
    baseTechCost.combustion.tritium
  ),
  thrust: techCostFormula(
    1,
    baseTechCost.thrust.steel,
    baseTechCost.thrust.quartz,
    baseTechCost.thrust.tritium
  ),
  warp: techCostFormula(
    1,
    baseTechCost.warp.steel,
    baseTechCost.warp.quartz,
    baseTechCost.warp.tritium
  ),
  spacetime: techCostFormula(
    1,
    baseTechCost.spacetime.steel,
    baseTechCost.spacetime.quartz,
    baseTechCost.spacetime.tritium
  ),
  beam: techCostFormula(
    1,
    baseTechCost.beam.steel,
    baseTechCost.beam.quartz,
    baseTechCost.beam.tritium
  ),
  ion: techCostFormula(
    1,
    baseTechCost.ion.steel,
    baseTechCost.ion.quartz,
    baseTechCost.ion.tritium
  ),
  plasma: techCostFormula(
    1,
    baseTechCost.plasma.steel,
    baseTechCost.plasma.quartz,
    baseTechCost.plasma.tritium
  ),
};

export const shipCostBase: ShipsCost = {
  celestia: baseShipCost.celestia,
  carrier: baseShipCost.carrier,
  scraper: baseShipCost.scraper,
  sparrow: baseShipCost.sparrow,
  frigate: baseShipCost.frigate,
  armade: baseShipCost.armade,
};

export const defenceCostBase: DefenceCost = {
  blaster: baseDefenceCost.blaster,
  beam: baseDefenceCost.beam,
  astral: baseDefenceCost.astral,
  plasma: baseDefenceCost.plasma,
};
