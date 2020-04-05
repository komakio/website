import { createGlobalStyle } from 'styled-components';
import { headerHeight } from './header';

export const GlobalStyles = createGlobalStyle`
    body {
        font-family: 'Sen', sans-serif;
        padding-top: ${headerHeight + 20}px;
    }
    .grecaptcha-badge { visibility: hidden; }
`;
