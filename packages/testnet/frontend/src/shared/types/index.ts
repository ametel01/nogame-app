export interface Resources {
  steel: number;
  quartz: number;
  tritium: number;
}

export type CompoundsEntities =
  | "steel"
  | "quartz"
  | "tritium"
  | "energy"
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

export type EnergyEntities =
  | "steel"
  | "quartz"
  | "tritium"
  | "energy"
  | "celestia"
  | "null";

export type EnergyCost = { [key in EnergyEntities]: number };
export type CompoundsCostUpgrade = { [key in CompoundsEntities]: Resources };
export type CompoundsLevels = { [key in CompoundsEntities]: number };

export type ShipsCost = { [key in ShipsEntities]: Resources };
export type ShipsLevels = { [key in ShipsEntities]: number };

export type DefenceCost = { [key in DefencesEntities]: Resources };
export type DefenceLevels = { [key in DefencesEntities]: number };

export type TechCost = { [key in TechEntities]: Resources };
export type TechLevels = { [key in TechEntities]: number };

export type DebrisField = {
  steel: number;
  quartz: number;
};

export type Fleet = {
  carrier: number;
  scraper: number;
  sparrow: number;
  frigate: number;
  armade: number;
};

export type Position = {
  system: number;
  orbit: number;
};

export type PlanetDetails = {
  planetId: number;
  account: string;
  position: Position;
  points: number;
  lastActive: string;
};

export type Mission = {
  id: number;
  time_start: number;
  destination: number;
  time_arrival: number;
  fleet: Fleet;
  is_debris: boolean;
};

export type HostileMission = {
  origin: number;
  id_at_origin: number;
  time_arrival: number;
  number_of_ships: number;
};
