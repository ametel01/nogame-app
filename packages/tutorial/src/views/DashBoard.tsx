import SideBar from "../components/ui/SideBar";
import { PlanetSection } from "../components/ui/PlanetSection";
import { ResourcesSection } from "../panels";
import {
  GameContainer,
  DashboardMainContainer,
  DashboardSubBodyContainer,
} from "../../../frontend/src/views/DashBoard";
import { TutorialProps } from "../shared/types";

export default function Dashboard({
  planetId,
  spendableResources,
  collectibleResources,
  energyAvailable,
  energyFromCelestia,
  compoundsLevels,
  compoundsCost,
  energyCost,
  energyGain,
  techLevels,
  techCost,
  shipsLevels,
  shipsCost,
  celestiaAvailable,
  defencesLevels,
  defencesCost,
}: TutorialProps) {
  console.log("DashBoard", energyAvailable);
  return (
    <DashboardMainContainer>
      <SideBar
        planetId={planetId}
        spendableResources={spendableResources}
        collectibleResources={collectibleResources}
        energyAvailable={energyAvailable}
        energyFromCelestia={energyFromCelestia}
      />
      <GameContainer>
        <DashboardSubBodyContainer>
          <PlanetSection planetId={planetId} />
        </DashboardSubBodyContainer>
        <DashboardSubBodyContainer>
          <ResourcesSection
            spendableResources={spendableResources}
            energyAvailable={energyAvailable}
            energyFromCelestia={energyFromCelestia}
            compoundsLevels={compoundsLevels}
            compoundsCost={compoundsCost}
            energyCost={energyCost}
            energyGain={energyGain}
            techLevels={techLevels}
            techCost={techCost}
            shipsLevels={shipsLevels}
            shipsCost={shipsCost}
            celestiaAvailable={celestiaAvailable}
            defencesLevels={defencesLevels}
            defencesCost={defencesCost}
          />
        </DashboardSubBodyContainer>
      </GameContainer>
    </DashboardMainContainer>
  );
}
