import { StepOne } from "./tutorialSteps/StepOne";
import styled from "styled-components";
import GlobalStyle from "../../frontend/src/shared/styled/Theme";

const AppWrapper = styled.div`
  min-height: 100vh;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <StepOne />
      </AppWrapper>
    </>
  );
}

export default App;
