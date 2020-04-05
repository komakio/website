import { createGlobalStyle } from 'styled-components';
import { headerHeight } from './header';
import { colors } from '@utils/colors';

export const GlobalStyles = createGlobalStyle`
    body {
        font-family: 'Sen', sans-serif;
        padding-top: ${headerHeight + 20}px;
    }
    .grecaptcha-badge { visibility: hidden; }

    a {
        color: ${colors.green200};
    }
    strong {
        font-weight: bold;
    }
    p {
        margin-bottom: 20px;
    }

    h1 {
        font-size: 22px;
        margin-bottom: 20px;
    }
`;
