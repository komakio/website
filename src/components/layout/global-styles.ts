import { createGlobalStyle } from 'styled-components';
import { headerHeight } from './header';
import { colors } from '@utils/colors';
import { media } from 'styled-bootstrap-grid';

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
        line-height: 1.5;
    }

    h1,h2,h3,h4 {
        margin-bottom: 20px;
        text-transform: uppercase;
        font-weight: bold;
    }

    h1 {
        font-size: 60px;
        margin-bottom: 30px;

        ${media.smaller`
            font-size: 35px;
        `}
    }

    h2 {
        font-size: 40px;

        ${media.smaller`
            font-size: 25px;
        `}
    }

    h3 {
        font-size: 26px;

        ${media.smaller`
            font-size: 22px;
        `}
    }

    h4 {
        font-size: 22px;

        ${media.smaller`
            font-size: 18px;
        `}
    }

    ul {
        list-style-type: circle;

        li {
            margin-bottom: 20px;
        line-height: 1.5;
        }
    }

    label p {
        margin-bottom: 0;
    }
`;
