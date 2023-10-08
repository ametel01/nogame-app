export interface Resources {
  steel: number;
  quartz: number;
  tritium: number;
}

export type CompoundsEntities =
  | "steelMine"
  | "quartzMine"
  | "tritiumMine"
  | "energyPlant"
  | "dockyard"
  | "lab";
export type ShipsEntities =
  | "carrier"
  | "scraper"
  | "celestia"
  | "sparrow"
  | "frigate"
  | "armade";
type DefencesEntities = "blaster" | "beam" | "astral" | "plasma";
export type TechEntities =
  | "armour"
  | "combustion"
  | "digital"
  | "energy"
  | "warp"
  | "spacetime"
  | "thrust"
  | "ion"
  | "beam"
  | "plasma"
  | "shield"
  | "weapons";

export type CompoundsCostUpgrade = { [key in CompoundsEntities]: Resources };
export type CompoundsLevels = { [key in CompoundsEntities]: number };

export type ShipsCost = { [key in ShipsEntities]: Resources };
export type ShipsLevels = { [key in ShipsEntities]: number };

export type DefenceCost = { [key in DefencesEntities]: Resources };
export type DefenceLevels = { [key in DefencesEntities]: number };

export type TechCost = { [key in TechEntities]: Resources };
export type TechLevels = { [key in TechEntities]: number };

export interface EnergyCost {
  steel: number;
  quartz: number;
  tritium: number;
  null: number;
}
