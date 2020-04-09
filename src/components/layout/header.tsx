import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from '@utils/colors';
import { Container } from 'styled-bootstrap-grid';
import { HeaderLink } from './header-link';
import { Language } from '@utils/language';
import { useTopMenus, useLanguage } from '@components/page-context';

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

export const Header: FC = () => {
  const language = useLanguage();
  const topMenus = useTopMenus();
  return (
    <StyledHeader>
      <Container>
        <h1>
          <Link to={language === Language.defaultLang ? '/' : `/${language}`}>
            Komak
          </Link>
        </h1>
        <Flex />
        <nav style={{ height: 65, paddingTop: 26 }}>
          {topMenus?.map(element => {
            return (
              <HeaderLink
                key={element.menu_link?._meta.uid}
                link={Language.getLanguageLink(
                  language,
                  element.menu_link._meta.uid
                )}
                title={element.title}
              />
            );
          })}
        </nav>
      </Container>
    </StyledHeader>
  );
};
