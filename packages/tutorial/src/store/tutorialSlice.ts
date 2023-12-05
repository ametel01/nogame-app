import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TutorialState } from "./tutorialState";

const initialState: TutorialState = {
  currentStep: 1,
  isCompleted: false,
};

const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    completeTutorial: (state) => {
      state.isCompleted = true;
    },
    // Add other reducers as needed
  },
});

export const { setStep, completeTutorial } = tutorialSlice.actions;

export default tutorialSlice.reducer;
