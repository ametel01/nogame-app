import styled from "@emotion/styled";
import { FixedGlobalStyle, ThemedGlobalStyle } from "./shared/styled/Theme";
import AuthController from "./components/auth/AuthController";
import { StarknetProvider } from "./components/provider";

export const AppWrapper = styled.div`
  min-height: 100vh;
`;

function App() {
  return (
    <>
      <StarknetProvider>
        <FixedGlobalStyle />
        <ThemedGlobalStyle />
        <AppWrapper>
          <AuthController />
        </AppWrapper>
      </StarknetProvider>
    </>
  );
}

export default App;
