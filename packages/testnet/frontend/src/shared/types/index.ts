import { CairoCustomEnum } from 'starknet';

export interface Resources {
  steel: number;
  quartz: number;
  tritium: number;
}

export type CompoundsEntities =
  | 'steel'
  | 'quartz'
  | 'tritium'
  | 'energy'
  | 'dockyard'
  | 'lab';
export type ShipsEntities =
  | 'carrier'
  | 'scraper'
  | 'celestia'
  | 'sparrow'
  | 'frigate'
  | 'armade';
type DefencesEntities = 'blaster' | 'beam' | 'astral' | 'plasma';
export type TechEntities =
  | 'armour'
  | 'combustion'
  | 'digital'
  | 'energy'
  | 'warp'
  | 'spacetime'
  | 'thrust'
  | 'ion'
  | 'beam'
  | 'plasma'
  | 'shield'
  | 'weapons';

export type EnergyEntities =
  | 'steel'
  | 'quartz'
  | 'tritium'
  | 'energy'
  | 'celestia'
  | 'null';

export type EnergyCost = { [key in EnergyEntities]: number };
export type CompoundsCostUpgrade = { [key in CompoundsEntities]: Resources };
export type CompoundsLevels = { [key in CompoundsEntities]: number };

export type ShipsCost = { [key in ShipsEntities]: Resources };
export type ShipsLevels = { [key in ShipsEntities]: number };

export type DefenceCost = { [key in DefencesEntities]: Resources };
export type DefenceLevels = { [key in DefencesEntities]: number };

export type TechCost = { [key in TechEntities]: Resources };
export type TechLevels = { [key in TechEntities]: number };

export interface DebrisField {
  steel: number;
  quartz: number;
}

export interface Fleet {
  carrier: number;
  scraper: number;
  sparrow: number;
  frigate: number;
  armade: number;
}

export interface Position {
  system: number;
  orbit: number;
}

export interface PlanetDetails {
  planetId: number;
  account: string;
  position: Position;
  points: number;
  lastActive: string;
}

export interface Mission {
  id: number;
  time_start: number;
  destination: number;
  time_arrival: number;
  fleet: Fleet;
  is_debris: boolean;
}

export interface HostileMission {
  origin: number;
  id_at_origin: number;
  time_arrival: number;
  number_of_ships: number;
}

export const UpgradeType = {
  SteelMine: 0,
  QuartzMine: 1,
  TritiumMine: 2,
  EnergyPlant: 3,
  Lab: 4,
  Dockyard: 5,
  EnergyTech: 6,
  Digital: 7,
  BeamTech: 8,
  Armour: 9,
  Ion: 10,
  PlasmaTech: 11,
  Weapons: 12,
  Shield: 13,
  Spacetime: 14,
  Combustion: 15,
  Thrust: 16,
  Warp: 17,
};

export function getUpgradeType(name: number): CairoCustomEnum | undefined {
  switch (name) {
    case 0:
      return new CairoCustomEnum({ SteelMine: {} });
    case 1:
      return new CairoCustomEnum({ QuartzMine: {} });
    case 2:
      return new CairoCustomEnum({ TritiumMine: {} });
    case 3:
      return new CairoCustomEnum({ EnergyPlant: {} });
    case 4:
      return new CairoCustomEnum({ Lab: {} });
    case 5:
      return new CairoCustomEnum({ Dockyard: {} });
    case 6:
      return new CairoCustomEnum({ EnergyTech: {} });
    case 7:
      return new CairoCustomEnum({ Digital: {} });
    case 8:
      return new CairoCustomEnum({ BeamTech: {} });
    case 9:
      return new CairoCustomEnum({ Armour: {} });
    case 10:
      return new CairoCustomEnum({ Ion: {} });
    case 11:
      return new CairoCustomEnum({ PlasmaTech: {} });
    case 12:
      return new CairoCustomEnum({ Weapons: {} });
    case 13:
      return new CairoCustomEnum({ Shield: {} });
    case 14:
      return new CairoCustomEnum({ Spacetime: {} });
    case 15:
      return new CairoCustomEnum({ Combustion: {} });
    case 16:
      return new CairoCustomEnum({ Thrust: {} });
    case 17:
      return new CairoCustomEnum({ Warp: {} });
  }
}

export const BuildType = {
  Carrier: 0,
  Scraper: 1,
  Celestia: 2,
  Sparrow: 3,
  Frigate: 4,
  Armade: 5,
  Blaster: 6,
  Beam: 7,
  Astral: 8,
  Plasma: 9,
};

export function getBuildType(name: number): CairoCustomEnum | undefined {
  switch (name) {
    case 0:
      return new CairoCustomEnum({ Carrier: {} });
    case 1:
      return new CairoCustomEnum({ Scraper: {} });
    case 2:
      return new CairoCustomEnum({ Celestia: {} });
    case 3:
      return new CairoCustomEnum({ Sparrow: {} });
    case 4:
      return new CairoCustomEnum({ Frigate: {} });
    case 5:
      return new CairoCustomEnum({ Armade: {} });
    case 6:
      return new CairoCustomEnum({ Blaster: {} });
    case 7:
      return new CairoCustomEnum({ Beam: {} });
    case 8:
      return new CairoCustomEnum({ Astral: {} });
    case 9:
      return new CairoCustomEnum({ Plasma: {} });
  }
}
