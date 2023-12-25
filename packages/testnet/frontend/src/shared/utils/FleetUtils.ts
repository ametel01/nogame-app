import { Fleet, Position, TechLevels } from "../types";

export function getDistance(start: Position, end: Position): number {
  if (start.system === end.system && start.orbit === end.orbit) {
    return 5;
  }
  if (start.system === end.system) {
    const dis = Math.abs(start.orbit - end.orbit);
    return 1000 + 5 * dis;
  } else {
    const dis = Math.abs(start.system - end.system);
    return 2700 + 95 * dis;
  }
}

function getUnitConsumption(ship: Unit, distance: number): number {
  return (ship.consumption * distance) / 35000;
}

export function getFuelConsumption(fleet: Fleet, distance: number): number {
  return Math.ceil(
    fleet.carrier * getUnitConsumption(CARRIER, distance) +
      fleet.scraper * getUnitConsumption(SCRAPER, distance) +
      fleet.sparrow * getUnitConsumption(SPARROW, distance) +
      fleet.frigate * getUnitConsumption(FRIGATE, distance) +
      fleet.armade * getUnitConsumption(ARMADE, distance)
  );
}

export function getFlightTime(speed: number, distance: number): number {
  const result = 10 + 3500 * Math.sqrt((10 * distance) / speed);
  return Math.floor(result); // Assuming we need an integer result
}

export function getFleetSpeed(fleet: Fleet, techs: TechLevels) {
  let minSpeed = Number.MAX_SAFE_INTEGER;

  const calculateSpeed = (
    baseSpeed: number,
    techLevel: number,
    multiplier: number
  ) => {
    return baseSpeed + (baseSpeed * techLevel * multiplier) / 10;
  };

  if (fleet.carrier > 0) {
    const baseSpeed = CARRIER.speed;
    const speed =
      techs.thrust >= 4
        ? calculateSpeed(baseSpeed * 2, techs.thrust - 4, 2)
        : calculateSpeed(baseSpeed, techs.combustion, 1);
    minSpeed = Math.min(minSpeed, speed);
  }

  if (fleet.scraper > 0) {
    const speed = calculateSpeed(SCRAPER.speed, techs.combustion, 1);
    minSpeed = Math.min(minSpeed, speed);
  }

  if (fleet.sparrow > 0) {
    const speed = calculateSpeed(SPARROW.speed, techs.combustion, 1);
    minSpeed = Math.min(minSpeed, speed);
  }

  if (fleet.frigate > 0) {
    const baseSpeed = FRIGATE.speed;
    const speed =
      techs.thrust >= 4
        ? calculateSpeed(baseSpeed, techs.thrust - 4, 2)
        : calculateSpeed(baseSpeed, techs.combustion, 1);
    minSpeed = Math.min(minSpeed, speed);
  }

  if (fleet.armade > 0) {
    const baseSpeed = ARMADE.speed;
    const speed = calculateSpeed(baseSpeed, techs.warp - 3, 3);
    minSpeed = Math.min(minSpeed, speed);
  }

  // Additional ship types can be added here following the same pattern

  return minSpeed;
}

export function calculateTotalCargoCapacity(fleet: Fleet) {
  let totalCargoCapacity = 0;

  if (fleet.carrier) {
    totalCargoCapacity += fleet.carrier * CARRIER.cargo;
  }
  if (fleet.scraper) {
    totalCargoCapacity += fleet.scraper * SCRAPER.cargo;
  }
  if (fleet.sparrow) {
    totalCargoCapacity += fleet.sparrow * SPARROW.cargo;
  }
  if (fleet.frigate) {
    totalCargoCapacity += fleet.frigate * FRIGATE.cargo;
  }
  if (fleet.armade) {
    totalCargoCapacity += fleet.armade * ARMADE.cargo;
  }

  return totalCargoCapacity;
}

interface Unit {
  id: number;
  weapon: number;
  shield: number;
  hull: number;
  speed: number;
  cargo: number;
  consumption: number;
}

export const CARRIER: Unit = {
  id: 0,
  weapon: 50,
  shield: 10,
  hull: 1000,
  speed: 5000,
  cargo: 5000,
  consumption: 10,
};
export const SCRAPER: Unit = {
  id: 1,
  weapon: 50,
  shield: 100,
  hull: 1600,
  speed: 2000,
  cargo: 20000,
  consumption: 300,
};
export const SPARROW: Unit = {
  id: 2,
  weapon: 250,
  shield: 10,
  hull: 1000,
  speed: 12500,
  cargo: 50,
  consumption: 20,
};
export const FRIGATE: Unit = {
  id: 3,
  weapon: 400,
  shield: 50,
  hull: 6750,
  speed: 15000,
  cargo: 800,
  consumption: 300,
};
export const ARMADE: Unit = {
  id: 4,
  weapon: 600,
  shield: 200,
  hull: 15000,
  speed: 10000,
  cargo: 1500,
  consumption: 500,
};
export const CELESTIA: Unit = {
  id: 5,
  weapon: 1,
  shield: 1,
  hull: 500,
  speed: 0,
  cargo: 0,
  consumption: 0,
};
export const BLASTER: Unit = {
  id: 6,
  weapon: 125,
  shield: 20,
  hull: 500,
  speed: 0,
  cargo: 0,
  consumption: 0,
};
export const BEAM: Unit = {
  id: 7,
  weapon: 250,
  shield: 100,
  hull: 2000,
  speed: 0,
  cargo: 0,
  consumption: 0,
};
export const ASTRAL: Unit = {
  id: 8,
  weapon: 1100,
  shield: 200,
  hull: 8750,
  speed: 0,
  cargo: 0,
  consumption: 0,
};
export const PLASMA: Unit = {
  id: 9,
  weapon: 2000,
  shield: 300,
  hull: 20000,
  speed: 0,
  cargo: 0,
  consumption: 0,
};
