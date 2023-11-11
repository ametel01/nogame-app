import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, input, textarea, button {
    font-family: 'Share Tech Mono', sans-serif;
    font-display: fallback;
    color: #F8F8FF; // Common color property
    background-repeat: no-repeat; // From ThemedGlobalStyle
    background-size: cover; // From ThemedGlobalStyle
    background-color: #151a1e; // From ThemedGlobalStyle
  }

  @supports (font-variation-settings: normal) {
    html, input, textarea, button {
      font-family: 'Share Tech Mono', sans-serif;
    }
  }

  html, body {
    font-family: 'Share Tech Mono', sans-serif;
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
    font-size: 17px;
    font-variant: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
  }
`;

export default GlobalStyle;
