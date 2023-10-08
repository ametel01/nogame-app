import styled from "@emotion/styled";
import { CssBaseline } from "@mui/material";
import AuthController from "./components/auth/AuthController";
import { GlobalStyle, ThemedStyle } from "./shared/styled/Theme";

export const AppWrapper = styled.div`
  min-height: 100vh;
`;

function App() {
  return (
    <>
      <CssBaseline />
      <GlobalStyle />
      <ThemedStyle />
      <AppWrapper>
        <AuthController />
      </AppWrapper>
    </>
  );
}

export default App;
