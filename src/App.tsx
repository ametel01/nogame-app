import styled from "@emotion/styled";
import { FixedGlobalStyle, ThemedGlobalStyle } from "./shared/styled/Theme";
import AuthController from "./components/auth/AuthController";
import Header from "./components/ui/Header";

export const AppWrapper = styled.div`
  min-height: 100vh;
`;

function App() {
  return (
    <>
      <FixedGlobalStyle />
      <ThemedGlobalStyle />
      <AppWrapper>
        <Header />
        <AuthController />
      </AppWrapper>
    </>
  );
}

export default App;
