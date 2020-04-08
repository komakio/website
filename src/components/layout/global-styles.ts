import { createGlobalStyle } from 'styled-components';
import { headerHeight } from './header';
import { colors } from '@utils/colors';

export const GlobalStyles = createGlobalStyle`
    body {
        font-family: 'Sen', sans-serif;
        padding-top: ${headerHeight}px;
    }
    .grecaptcha-badge { visibility: hidden; }


    .text-center {
        text-align: center;
    }
    
    a {
        color: ${colors.green200};
    }
    strong {
        font-weight: bold;
    }
    p {
        margin-bottom: 20px;
    }

    h1,h2,h3,h4 {
        margin-bottom: 20px;
        text-transform: uppercase;
        font-weight: bold;
    }

    h1 {
        font-size: 60px;
        margin-bottom: 30px;
    }

    h2 {
        font-size: 40px;
    }

    h3 {
        font-size: 26px;
    }

    h4 {
        font-size: 22px;
    }

    ul {
        list-style-type: circle;

        li {
            margin-bottom: 20px;
        }
    }
`;
