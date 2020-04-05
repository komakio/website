import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from '@utils/colors';
import { Container } from 'styled-bootstrap-grid';

interface HeaderProps {
  siteTitle: string;
}

export const headerHeight = 65;

const StyledHeader = styled.header`
  background-color: ${colors.green200};
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${headerHeight}px;
  z-index: 10;

  ${Container} {
    display: flex;
    flex-direction: row;
    /* align-items: center;
    justify-content: center;
    align-content: center;
    align-self: center; */
  }

  h1,
  h3 {
    margin: 0;
    line-height: ${headerHeight}px;
    /* display: flex;
    align-self: center; */
  }

  h1 {
    font-size: 32px;
    text-transform: uppercase;
    font-weight: bold;
  }

  a {
    color: white;
    text-decoration: none;
  }
`;

const Flex = styled.div`
  flex: 1;
`;

export const Header: FC<HeaderProps> = ({ siteTitle }) => (
  <StyledHeader>
    <Container>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
      <Flex />
      <h3>
        <a href="/">Back to the website</a>
      </h3>
    </Container>
  </StyledHeader>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};
