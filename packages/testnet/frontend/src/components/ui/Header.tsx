import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { HeaderButton } from '../../shared/styled/Button'
import { styled } from '@mui/material/styles'
import { FleetMovements } from './FleetMovements'
import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAccount, useDisconnect } from '@starknet-react/core'
import IconButton from '@mui/material/IconButton'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import SummarizeIcon from '@mui/icons-material/Summarize'
import DashboardIcon from '@mui/icons-material/Dashboard'
import WalletHeader from './WalletHeader'

const HeaderWrapper = styled(AppBar)({
  backgroundColor: '#1a2025', // Dark background for space theme
  margin: 0,
  padding: 0,
  boxShadow: 'none',
  borderBottom: '1px solid #1a2025' // Subtle border for a sleek look
})

const StyledToolbar = styled(Toolbar)({
  height: '24px',
  padding: '0px 16px',
  minHeight: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', // Align items with space between
  background: 'rgba(0, 0, 0, 0.2)'
})

const Spacer = styled('div')({
  flex: '1'
})

interface Props {
  planetId: number
}

const Header = ({ planetId }: Props) => {
  const { address: account } = useAccount()
  const { disconnect } = useDisconnect()

  const handleLogoutClick = () => {
    disconnect()
  }

  return (
    <HeaderWrapper position="static">
      <StyledToolbar style={{ minHeight: '48px', padding: '0px 16px' }}>
        <IconButton
          onClick={handleLogoutClick}
          color="inherit"
          style={{
            marginRight: '16px',
            color: '#c5c6c7',
            fontWeight: 'bold',
            opacity: '0.8'
          }}
        >
          <LogoutIcon style={{ transform: 'rotate(180deg)' }} />
        </IconButton>
        <WalletHeader account={account} />
        <Spacer />
        <HeaderButton variant="text">
          <DashboardIcon fontSize="small" sx={{ marginRight: '4px' }} />
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            DashBoard
          </Link>
        </HeaderButton>
        <FleetMovements planetId={planetId || 0} />
        <HeaderButton variant="text">
          <SummarizeIcon fontSize="small" sx={{ marginRight: '4px' }} />
          <Link
            to="/battlereports"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Battle Reports
          </Link>
        </HeaderButton>
        <HeaderButton
          variant="text"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <LeaderboardIcon fontSize="small" sx={{ marginRight: '4px' }} />
          <Link
            to="/leaderboard"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            LeaderBoard
          </Link>
        </HeaderButton>
      </StyledToolbar>
    </HeaderWrapper>
  )
}

export default Header
