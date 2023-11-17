// Constants for growth factors
const GROWTH_FACTOR_LINEAR = 1.1;
const GROWTH_FACTOR_STEEL_QUARTZ = 1.5;

// Utility function for exponential growth
function calculateExponentialGrowth(
  base: number,
  level: number,
  factor: number
) {
  return Math.round(base * level * Math.pow(factor, level));
}

// Utility function for calculating cost
function calculateCost(
  steelMultiplier: number,
  quartzMultiplier: number,
  level: number
) {
  const steel = Math.round(
    steelMultiplier * Math.pow(GROWTH_FACTOR_STEEL_QUARTZ, level - 1)
  );
  const quartz = Math.round(
    quartzMultiplier * Math.pow(GROWTH_FACTOR_STEEL_QUARTZ, level - 1)
  );
  const tritium = 0;
  return { steel, quartz, tritium };
}

// Functions grouped in a single object
const CompoundsFormulas = {
  steelProduction(level: number) {
    return calculateExponentialGrowth(30, level, GROWTH_FACTOR_LINEAR);
  },

  quartzProduction(level: number) {
    return calculateExponentialGrowth(20, level, GROWTH_FACTOR_LINEAR);
  },

  tritiumProduction(level: number) {
    return calculateExponentialGrowth(10, level, GROWTH_FACTOR_LINEAR);
  },

  energyProduction(level: number) {
    return calculateExponentialGrowth(20, level, GROWTH_FACTOR_LINEAR);
  },

  steelCost(level: number) {
    return calculateCost(60, 15, level);
  },

  quartzCost(level: number) {
    return calculateCost(48, 24, level);
  },

  tritiumCost(level: number) {
    return calculateCost(225, 75, level);
  },

  energyCost(level: number) {
    return calculateCost(75, 30, level);
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
    return calculateExponentialGrowth(10, level, GROWTH_FACTOR_LINEAR);
  },

  quartzConsumption(level: number) {
    return calculateExponentialGrowth(10, level, GROWTH_FACTOR_LINEAR);
  },

  tritiumConsumption(level: number) {
    return calculateExponentialGrowth(20, level, GROWTH_FACTOR_LINEAR);
  },
};

export default CompoundsFormulas;
