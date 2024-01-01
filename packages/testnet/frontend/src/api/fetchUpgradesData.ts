import { type CompoundsLevels, type TechLevels } from '../shared/types'

const fetchUpgradesData = async ({ planetId }: { planetId: number }) => {
  const nodeEnv = import.meta.env.MODE
  const apiUrl =
    nodeEnv === 'production'
      ? `https://www.api.testnet.no-game.xyz/upgrades-levels?planet_id=${planetId}`
      : `http://localhost:3001/upgrades-levels?planet_id=${planetId}`

  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()

    if (data.length === 0) {
      // Return default objects with all fields set to 0
      const defaultLevels = {
        steel: 0,
        quartz: 0,
        tritium: 0,
        energy: 0,
        dockyard: 0,
        lab: 0,
        armour: 0,
        combustion: 0,
        digital: 0,
        energy_tech: 0,
        warp: 0,
        spacetime: 0,
        thrust: 0,
        ion: 0,
        beam_tech: 0,
        plasma_tech: 0,
        shield: 0,
        weapons: 0
      }

      const compoundsLevels: CompoundsLevels = {
        steel: defaultLevels.steel,
        quartz: defaultLevels.quartz,
        tritium: defaultLevels.tritium,
        energy: defaultLevels.energy,
        dockyard: defaultLevels.dockyard,
        lab: defaultLevels.lab
      }

      const techLevels: TechLevels = {
        armour: defaultLevels.armour,
        combustion: defaultLevels.combustion,
        digital: defaultLevels.digital,
        energy: defaultLevels.energy_tech,
        warp: defaultLevels.warp,
        spacetime: defaultLevels.spacetime,
        thrust: defaultLevels.thrust,
        ion: defaultLevels.ion,
        beam: defaultLevels.beam_tech,
        plasma: defaultLevels.plasma_tech,
        shield: defaultLevels.shield,
        weapons: defaultLevels.weapons
      }

      return { compoundsLevels, techLevels }
    }

    const upgrades = data[0] // Assuming the first item is the one we need

    const compoundsLevels: CompoundsLevels = {
      steel: upgrades.steel || 0,
      quartz: upgrades.quartz || 0,
      tritium: upgrades.tritium || 0,
      energy: upgrades.energy_plant || 0,
      dockyard: upgrades.dockyard || 0,
      lab: upgrades.lab || 0
    }

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
      weapons: upgrades.weapons || 0
    }

    return { compoundsLevels, techLevels }
  } catch (error) {
    console.error('Error fetching upgrades data:', error)
    throw error
  }
}

export default fetchUpgradesData
