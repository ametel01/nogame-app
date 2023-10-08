import styled from "@emotion/styled";
import { ThemedGlobalStyle, FixedGlobalStyle } from "./shared/styled/Theme";
import AuthController from "./components/auth/AuthController";

export const AppWrapper = styled.div`
  min-height: 100vh;
`;

function App() {
  return (
    <>
      <FixedGlobalStyle />
      <ThemedGlobalStyle />
      <AppWrapper>
        <AuthController />
      </AppWrapper>
    </>
  );
}

export default App;
