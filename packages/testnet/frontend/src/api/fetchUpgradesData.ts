import { CompoundsLevels, TechLevels } from "../shared/types";

const fetchUpgradesData = async ({ planetId }: { planetId: number }) => {
  const nodeEnv = import.meta.env.VITE_NODE_ENV;
  const apiUrl =
    nodeEnv === "production"
      ? `https://api.testnet.no-game.xyz/upgrades-levels?planet_id=${planetId}`
      : `http://localhost:3001/upgrades-levels?planet_id=${planetId}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    if (data.length === 0) {
      throw new Error("No data found for the given planet ID.");
    }

    const upgrades = data[0]; // Assuming the first item is the one we need

    const compoundsLevels: CompoundsLevels = {
      steel: upgrades.steel || 0,
      quartz: upgrades.quartz || 0,
      tritium: upgrades.tritium || 0,
      energy: upgrades.energy_plant || 0,
      dockyard: upgrades.dockyard || 0,
      lab: upgrades.lab || 0,
    };

    const techLevels: TechLevels = {
      armour: upgrades.armour || 0,
      combustion: upgrades.combustion || 0,
      digital: upgrades.digital || 0,
      energy: upgrades.energy_tech || 0,
      warp: upgrades.warp || 0,
      spacetime: upgrades.spacetime || 0,
      thrust: upgrades.thrust || 0,
      ion: upgrades.ion || 0,
      beam: upgrades.beam_tech || 0,
      plasma: upgrades.plasma_tech || 0,
      shield: upgrades.shield || 0,
      weapons: upgrades.weapons || 0,
    };

    return { compoundsLevels, techLevels };
  } catch (error) {
    console.error("Error fetching upgrades data:", error);
    throw error;
  }
};

export default fetchUpgradesData;
