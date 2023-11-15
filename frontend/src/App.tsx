import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle } from "./shared/styled/Theme";
import AuthController from "./components/auth/AuthController";
import GeneralLeaderboardPage from "./pages/GeneralLeaderBoardPage";
import { StarknetProvider } from "./components/provider";

export const AppWrapper = styled.div`
  min-height: 100vh;
`;

function App() {
  return (
    <>
      <StarknetProvider>
        <GlobalStyle />
        <Router>
          <AppWrapper>
            <Routes>
              <Route path="/" element={<AuthController />}></Route>
              <Route
                path="/leaderboard"
                element={<GeneralLeaderboardPage />}
              ></Route>
            </Routes>
          </AppWrapper>
        </Router>
      </StarknetProvider>
    </>
  );
}

export default App;
