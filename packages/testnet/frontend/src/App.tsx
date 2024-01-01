import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GlobalStyle } from './shared/styled/Theme'
import AuthController from './components/auth/AuthController'
import GeneralLeaderboardPage from './pages/GeneralLeaderBoardPage'
import BattleReportsPage from './pages/BattleReportsPage'

import { StarknetProvider } from './components/provider'

function App () {
  return (
    <>
      <StarknetProvider>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<AuthController />}></Route>
            <Route
              path="/leaderboard"
              element={<GeneralLeaderboardPage />}
            ></Route>
            <Route
              path="/battlereports"
              element={<BattleReportsPage />}
            ></Route>
          </Routes>
        </Router>
      </StarknetProvider>
    </>
  )
}

export default App
