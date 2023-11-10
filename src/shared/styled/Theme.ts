import { createGlobalStyle } from "styled-components";

export const FixedGlobalStyle = createGlobalStyle`
// @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap" rel="stylesheet');

html, input, textarea, button {
  font-family: 'Ubuntu', sans-serif;
  font-display: fallback;
 }

 @supports (font-variation-settings: normal) {
  html, input, textarea, button {
    // font-family: 'Orbitron', sans-serif;
   }
}

html,
body {
  font-family: 'Orbitron', sans-serif;
  // letter-spacing: 0.04em;
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
  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
  
}
`;

export const ThemedGlobalStyle = createGlobalStyle`
html {
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #151a1e;
  color: white;
}
`;
