import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import ForumIcon from "@mui/icons-material/Forum";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

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
  color: "white",
});

const StyledButtonWithMargin = styled(StyledButton)({
  margin: "16px", // Spacing between the StyledButtons
});

const Spacer = styled("div")({
  flex: "1",
});

const StyledLink = styled("a")({
  color: "inherit", // ensures the link inherits the color from its parent (white in this case)
  textDecoration: "none", // removes the default underline from the link
  margin: "8px",
});

const Header = () => {
  return (
    <HeaderWrapper position="static">
      <StyledToolbar style={{ minHeight: "48px", padding: "0px 16px" }}>
        <StyledLink
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton size="small" color="inherit">
            <TwitterIcon />
          </IconButton>
        </StyledLink>
        <StyledLink
          href="https://t.me/+8MsJiKToDvdiMjY0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton size="small" color="inherit">
            <TelegramIcon />
          </IconButton>
        </StyledLink>
        <StyledLink
          href="https://discord.gg/Ej6Rx7ZNTA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton size="small" color="inherit">
            <ForumIcon />
          </IconButton>
        </StyledLink>

        <Spacer />
        <StyledButtonWithMargin variant="text" size="small">
          Battle Reports
        </StyledButtonWithMargin>
        <StyledButton variant="text" size="small">
          Leader Board
        </StyledButton>
      </StyledToolbar>
    </HeaderWrapper>
  );
};

export default Header;
