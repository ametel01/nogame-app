import { styled } from "@mui/system";

export const GlobalStyle = styled("div")`
  html,
  input,
  textarea,
  button {
    font-family: "IBM Plex Sans", sans-serif;
    font-display: fallback;
  }

  @supports (font-variation-settings: normal) {
    html,
    input,
    textarea,
    button {
      font-family: "IBM Plex Sans", sans-serif;
    }
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
    margin: 0;
  }

  button {
    user-select: none;
  }

  html {
    font-size: 16px;
    font-variant: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-feature-settings:
      "ss01" on,
      "ss02" on,
      "cv01" on,
      "cv03" on;
  }
`;

export const ThemedStyle = styled("div")`
  html {
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #151a1e;
    color: white;
  }
`;

// Usage in your app root component:
/*
<CssBaseline />
<GlobalStyle />
<ThemedStyle />
*/
