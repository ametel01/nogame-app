import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { FleetMovements } from "./FleetMovements";
import { Link } from "react-router-dom";

const HeaderWrapper = styled(AppBar)({
  backgroundColor: "#1a2025",
  color: "white",
  margin: 0,
  padding: 0,
  boxShadow: "none",
});

const StyledToolbar = styled(Toolbar)({
  height: "24px",
  padding: "0px 16px", // Reduced vertical padding
  minHeight: "8px", // Optional: set a specific minimum height
});

const StyledButton = styled(Button)({
  margin: "16px",
  marginLeft: "0px",
  color: "white", // Spacing between the StyledButtons
});

const Spacer = styled("div")({
  flex: "1",
});

interface Props {
  planetId: number;
}

const Header = ({ planetId }: Props) => {
  return (
    <HeaderWrapper position="static">
      <StyledToolbar style={{ minHeight: "48px", padding: "0px 16px" }}>
        <StyledButton variant="text" size="small">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            DashBoard
          </Link>
        </StyledButton>
        <Spacer />
        <FleetMovements planetId={planetId ? planetId : 0} />
        <StyledButton variant="text" size="small">
          Resources Market
        </StyledButton>
        <StyledButton variant="text" size="small">
          <Link
            to="/battlereports"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Battle Reports
          </Link>
        </StyledButton>
        <StyledButton variant="text" size="small">
          <Link
            to="/leaderboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Leader Board
          </Link>
        </StyledButton>
      </StyledToolbar>
    </HeaderWrapper>
  );
};

export default Header;
