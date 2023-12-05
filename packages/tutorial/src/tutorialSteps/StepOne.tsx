// inside TutorialStep1 component

// import { useDispatch } from "react-redux";
// import { setStep } from "../store/tutorialSlice";
import CompoundsFormulas from "../../../frontend/src/shared/utils/Formulas";
import {
  TutorialProps,
  baseCompoundsCost,
  defenceCostBase,
  energyCostBase,
  shipCostBase,
  techCostBase,
} from "../shared/types";
import Dashboard from "../views/DashBoard";

export const StepOne = () => {
  //   const dispatch = useDispatch();

  //   const onNextStep = () => {
  //     // Dispatch action to update the step
  //     dispatch(setStep(2)); // Assuming next step is 2
  //   };
  const stepOneProps: TutorialProps = {
    address: "0x0",
    planetId: 1,
    spendableResources: { steel: 500, quartz: 300, tritium: 100 },
    collectibleResources: { steel: 0, quartz: 0, tritium: 0 },
    compoundsLevels: {
      steel: 0,
      quartz: 0,
      tritium: 0,
      energy: 0,
      lab: 0,
      dockyard: 0,
    },
    compoundsCost: baseCompoundsCost,
    energyCost: energyCostBase,
    energyGain: CompoundsFormulas.energyProduction(1),
    techLevels: {
      armour: 0,
      energy: 0,
      combustion: 0,
      digital: 0,
      ion: 0,
      thrust: 0,
      plasma: 0,
      weapons: 0,
      warp: 0,
      beam: 0,
      shield: 0,
      spacetime: 0,
    },
    techCost: techCostBase,
    shipsLevels: {
      celestia: 0,
      carrier: 0,
      scraper: 0,
      sparrow: 0,
      frigate: 0,
      armade: 0,
    },
    shipsCost: shipCostBase,
    celestiaAvailable: 0,
    defencesLevels: {
      blaster: 0,
      beam: 0,
      astral: 0,
      plasma: 0,
    },
    defencesCost: defenceCostBase,
    energyAvailable: 0,
    energyFromCelestia: 0,
  };

  return <Dashboard {...stepOneProps} />;
};
