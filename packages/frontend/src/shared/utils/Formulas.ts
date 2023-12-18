const GROWTH_FACTOR_LINEAR = 1.1;
const GROWTH_FACTOR_STEEL = 1.5;
const GROWTH_FACTOR_QUARTZ = 1.6;

// Utility function for calculating cost
function calculateCost(
  steelMultiplier: number,
  quartzMultiplier: number,
  level: number,
  growthFactor: number
) {
  const steel = Math.round(steelMultiplier * Math.pow(growthFactor, level - 1));
  const quartz = Math.round(
    quartzMultiplier * Math.pow(growthFactor, level - 1)
  );
  const tritium = 0;
  return { steel, quartz, tritium };
}

// Functions grouped in a single object
export const CompoundsFormulas = {
  steelProduction(level: number) {
    return Math.round(30 * level * Math.pow(GROWTH_FACTOR_LINEAR, level));
  },

  quartzProduction(level: number) {
    return Math.round(20 * level * Math.pow(GROWTH_FACTOR_LINEAR, level));
  },

  tritiumProduction(level: number) {
    return Math.round(10 * level * Math.pow(GROWTH_FACTOR_LINEAR, level));
  },

  energyProduction(level: number) {
    return Math.round(
      20 * (level - 1) * Math.pow(GROWTH_FACTOR_LINEAR, level - 1)
    );
  },

  steelCost(level: number) {
    return calculateCost(60, 15, level, GROWTH_FACTOR_STEEL);
  },

  quartzCost(level: number) {
    return calculateCost(48, 24, level, GROWTH_FACTOR_QUARTZ);
  },

  tritiumCost(level: number) {
    return calculateCost(225, 75, level, GROWTH_FACTOR_STEEL);
  },

  energyCost(level: number) {
    return calculateCost(75, 30, level, GROWTH_FACTOR_STEEL);
  },

  labCost(level: number) {
    const steel = Math.round(200 * Math.pow(2, level - 1));
    const quartz = Math.round(400 * Math.pow(2, level - 1));
    const tritium = Math.round(200 * Math.pow(2, level - 1));
    return { steel, quartz, tritium };
  },

  dockyardCost(level: number) {
    const steel = Math.round(400 * Math.pow(2, level - 1));
    const quartz = Math.round(200 * Math.pow(2, level - 1));
    const tritium = Math.round(100 * Math.pow(2, level - 1));
    return { steel, quartz, tritium };
  },

  steelConsumption(level: number) {
    return Math.round(
      10 * (level - 1) * Math.pow(GROWTH_FACTOR_LINEAR, level - 1)
    );
  },

  quartzConsumption(level: number) {
    return Math.round(
      10 * (level - 1) * Math.pow(GROWTH_FACTOR_LINEAR, level - 1)
    );
  },

  tritiumConsumption(level: number) {
    return Math.round(
      20 * (level - 1) * Math.pow(GROWTH_FACTOR_LINEAR, level - 1)
    );
  },
};

export function techCostFormula(
  level: number,
  steelCost: number,
  quartzCost: number,
  tritiumCost: number
) {
  const steel = Math.round(steelCost * Math.pow(2, level - 1));
  const quartz = Math.round(quartzCost * Math.pow(2, level - 1));
  const tritium = Math.round(tritiumCost * Math.pow(2, level - 1));
  return { steel, quartz, tritium };
}

export function calculateFleetLoss(timeSeconds: number): number {
  const decay = Math.exp(-0.02 * (timeSeconds / 60));

  const fleetLoss = 100 * (1 - decay);

  return Math.round(fleetLoss);
}

export const getCompoundCost = (
  functionCallName: string,
  level: number,
  quantity: number
) => {
  const totalCost = { steel: 0, quartz: 0, tritium: 0 };
  for (let i = 0; i < quantity; i++) {
    let levelCost;
    switch (functionCallName) {
      case "steel_mine":
        levelCost = CompoundsFormulas.steelCost(level + i);
        break;
      case "quartz_mine":
        levelCost = CompoundsFormulas.quartzCost(level + i);
        break;
      case "tritium_mine":
        levelCost = CompoundsFormulas.tritiumCost(level + i);
        break;
      case "energy_plant":
        levelCost = CompoundsFormulas.energyCost(level + i);
        break;
      case "lab":
        levelCost = CompoundsFormulas.labCost(level + i);
        break;
      case "dockyard":
        levelCost = CompoundsFormulas.dockyardCost(level + i);
        break;
      default:
        console.warn(`No cost formula for ${functionCallName}`);
        levelCost = { steel: 0, quartz: 0, tritium: 0 };
    }
    totalCost.steel += levelCost.steel;
    totalCost.quartz += levelCost.quartz;
    totalCost.tritium += levelCost.tritium;
  }
  return totalCost;
};

export const getCumulativeEnergyChange = (
  functionCallName: string,
  level: number,
  quantity: number
) => {
  let output = 0;

  switch (functionCallName) {
    case "steel_mine":
      output = -(
        CompoundsFormulas.steelConsumption(level + quantity) -
        CompoundsFormulas.steelConsumption(level)
      );
      break;
    case "quartz_mine":
      output = -(
        CompoundsFormulas.quartzConsumption(level + quantity) -
        CompoundsFormulas.quartzConsumption(level)
      );
      break;
    case "tritium_mine":
      output = -(
        CompoundsFormulas.tritiumConsumption(level + quantity) -
        CompoundsFormulas.tritiumConsumption(level)
      );
      break;
    case "energy_plant":
      // Get the output for the upgraded level
      output =
        CompoundsFormulas.energyProduction(level + quantity) -
        CompoundsFormulas.energyProduction(level);
      break;
    default:
      output = 0;
  }
  return output;
};

export const getCumulativeTechCost = (
  level: number,
  quantity: number,
  baseSteelCost: number,
  baseQuartzCost: number,
  baseTritiumCost: number
) => {
  const totalCost = { steel: 0, quartz: 0, tritium: 0 };

  for (let i = 0; i < quantity; i++) {
    const costAtLevel = techCostFormula(
      level + i,
      baseSteelCost,
      baseQuartzCost,
      baseTritiumCost
    );

    totalCost.steel += costAtLevel.steel;
    totalCost.quartz += costAtLevel.quartz;
    totalCost.tritium += costAtLevel.tritium;
  }

  return totalCost;
};

export default CompoundsFormulas;
