import { type Resources } from '../shared/types';

export const baseTechCost: Record<string, Resources> = {
  energy: { steel: 0, quartz: 800, tritium: 400 },
  digital: { steel: 0, quartz: 800, tritium: 400 },
  beam: { steel: 0, quartz: 400, tritium: 200 },
  armour: { steel: 1000, quartz: 0, tritium: 0 },
  ion: { steel: 1000, quartz: 300, tritium: 1000 },
  plasma: { steel: 2000, quartz: 4000, tritium: 1000 },
  weapon: { steel: 800, quartz: 200, tritium: 0 },
  shield: { steel: 200, quartz: 600, tritium: 0 },
  spacetime: { steel: 0, quartz: 4000, tritium: 2000 },
  combustion: { steel: 400, quartz: 0, tritium: 600 },
  thrust: { steel: 2000, quartz: 4000, tritium: 600 },
  warp: { steel: 10000, quartz: 20000, tritium: 6000 },
};

export function getBaseShipsCost() {
  return {
    celestia: { steel: 0, quartz: 2000, tritium: 500 },
    carrier: { steel: 2000, quartz: 2000, tritium: 0 },
    scraper: { steel: 10000, quartz: 6000, tritium: 2000 },
    sparrow: { steel: 3000, quartz: 1000, tritium: 0 },
    frigate: { steel: 20000, quartz: 7000, tritium: 200 },
    armade: { steel: 45000, quartz: 15000, tritium: 0 },
  };
}

export const baseShipCost: Record<string, Resources> = {
  celestia: { steel: 0, quartz: 2000, tritium: 500 },
  carrier: { steel: 2000, quartz: 2000, tritium: 0 },
  scraper: { steel: 10000, quartz: 6000, tritium: 2000 },
  sparrow: { steel: 3000, quartz: 1000, tritium: 0 },
  frigate: { steel: 20000, quartz: 7000, tritium: 200 },
  armade: { steel: 45000, quartz: 15000, tritium: 0 },
};

export function getBaseDefenceCost() {
  return {
    blaster: { steel: 2000, quartz: 0, tritium: 0 },
    beam: { steel: 6000, quartz: 2000, tritium: 0 },
    astral: { steel: 20000, quartz: 15000, tritium: 0 },
    plasma: { steel: 50000, quartz: 50000, tritium: 0 },
  };
}
export const baseDefenceCost: Record<string, Resources> = {
  blaster: { steel: 2000, quartz: 0, tritium: 0 },
  beam: { steel: 6000, quartz: 2000, tritium: 0 },
  astral: { steel: 20000, quartz: 15000, tritium: 0 },
  plasma: { steel: 50000, quartz: 50000, tritium: 0 },
};

type BaseTechCostKey = keyof typeof baseTechCost;

// Mapping from functionCallName to baseTechCost key
export const techCostMapping: Record<string, BaseTechCostKey> = {
  digital_systems: 'digital',
  weapons_development: 'weapon',
  shield_tech: 'shield',
  armour_innovation: 'armour',
  energy_innovation: 'energy',
  combustive_engine: 'combustion',
  thrust_propulsion: 'thrust',
  warp_drive: 'warp',
  spacetime_warp: 'spacetime',
  beam_technology: 'beam',
  ion_systems: 'ion',
  plasma_engineering: 'plasma',
};
