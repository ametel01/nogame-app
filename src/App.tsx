import styled from "styled-components";
import { GlobalStyle } from "./shared/styled/Theme";
import AuthController from "./components/auth/AuthController";
import { StarknetProvider } from "./components/provider";

export const AppWrapper = styled.div`
  min-height: 100vh;
`;

function App() {
  return (
    <>
      <StarknetProvider>
        <GlobalStyle />
        <AppWrapper>
          <AuthController />
        </AppWrapper>
      </StarknetProvider>
    </>
  );
}

export default App;
