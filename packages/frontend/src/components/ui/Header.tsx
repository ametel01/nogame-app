import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { HeaderButton } from "../../shared/styled/Button";
import { styled } from "@mui/material/styles";
import { FleetMovements } from "./FleetMovements";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDisconnect } from "@starknet-react/core";
import IconButton from "@mui/material/IconButton";

const HeaderWrapper = styled(AppBar)({
  backgroundColor: "#1a2025", // Dark background for space theme
  color: "white",
  margin: 0,
  padding: 0,
  boxShadow: "none",
  // borderBottom: "1px solid #333", // Subtle border for a sleek look
});

const StyledToolbar = styled(Toolbar)({
  height: "24px",
  padding: "0px 16px",
  minHeight: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between", // Align items with space between
  background: "rgba(0, 0, 0, 0.2)",
});

// const HeaderButton = styled(Button)({
//   margin: "16px",
//   marginLeft: "0px",
//   color: "white",
//   fontWeight: "bold", // More pronounced buttons
//   letterSpacing: "1px", // Space-themed typography style
//   '&:hover': {
//     backgroundColor: "rgba(255, 255, 255, 0.1)", // Hover effect
//   },
// });

const Spacer = styled("div")({
  flex: "1",
});

interface Props {
  planetId: number;
}

const Header = ({ planetId }: Props) => {
  const { disconnect } = useDisconnect();

  const handleLogoutClick = () => {
    disconnect();
  };

  return (
    <HeaderWrapper position="static">
      <StyledToolbar style={{ minHeight: "48px", padding: "0px 16px" }}>
        <IconButton
          onClick={handleLogoutClick}
          color="inherit"
          style={{ marginRight: "16px" }}
        >
          <LogoutIcon style={{ transform: "rotate(180deg)" }} />
        </IconButton>
        <HeaderButton variant="text">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            DashBoard
          </Link>
        </HeaderButton>
        <Spacer />
        <FleetMovements planetId={planetId ? planetId : 0} />
        {/* Resources Market button removed */}
        <HeaderButton variant="text">
          <Link
            to="/battlereports"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Battle Reports
          </Link>
        </HeaderButton>
        <HeaderButton variant="text">
          <Link
            to="/leaderboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            LeaderBoard
          </Link>
        </HeaderButton>
      </StyledToolbar>
    </HeaderWrapper>
  );
};

export default Header;
