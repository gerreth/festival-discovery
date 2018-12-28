import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *  {
    box-sizing: border-box;
  }

  html,
  body {
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    height: 100%;
    width: 100%;
    -webkit-font-smoothing: antialiased;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-family: 'Raleway';
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-family: 'Raleway';
  }

  a, button {
    color: #333;
    font-weight: 700;
    text-decoration: none;
  }

  button:active {
    outline: none;
    border: none;
  }

  button:focus {outline:0;}

  #app {
    background-color: #fcfcfc;
    height: 100%;
    width: 100%;
  }

  p {
    margin: 0;
  }

  p,
  label {
    ${'' /* font-family: Georgia, Times, 'Times New Roman', serif; */}
    line-height: 1.5em;
  }

  h2 {
    line-height: 32px;
    margin: 0 0 32px;
  }

  .band-enter {
    transform: translate(100%);
  }
  .band-enter.band-enter-active {
    transform: translate(0%);
    transition: transform 1000ms ease-in-out;
  }
  .band-leave {
    transform: translate(0%);
  }
  .band-leave.band-leave-active {
    transform: translate(-100%);
    transition: transform 1000ms ease-in-out;
  }
`;

export default GlobalStyle;
