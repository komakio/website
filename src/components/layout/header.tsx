import { Link } from 'gatsby';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { colors } from '@utils/colors';
import { Container, media } from 'styled-bootstrap-grid';
import { HeaderLink } from './header-link';
import { Language } from '@utils/language';
import { useTopMenus, useLanguage } from '@components/page-context';
import { Button } from '@components/button';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import FeatherIcon from 'feather-icons-react';
import { MobileMenu } from './mobile-menu';

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

  nav {
    height: 65;
    flex-direction: row;
    display: none;

    ${media.md`
      display: flex;
    `}
  }
`;

export const MenuIcon = styled(Button)`
  height: 45px;
  margin-top: 10px;

  ${media.md`
      display: none;
    `}
`;

const Flex = styled.div`
  flex: 1;
`;

export const Header: FC = () => {
  const language = useLanguage();
  const topMenus = useTopMenus();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <StyledHeader>
      <MobileMenu
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <Container>
        <h1>
          <Link to={language === Language.defaultLang ? '/' : `/${language}`}>
            Komak
          </Link>
        </h1>
        <Flex />
        <MenuIcon
          theme="white"
          size="medium"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FeatherIcon icon="menu" size={20} color={colors.green200} />
        </MenuIcon>
        <nav>
          <HeaderLink
            element={{
              button: true,
              menu_link: {
                _meta: {
                  lang: 'en',
                  uid: 'd',
                  url: 'https://www.producthunt.com/posts/komak',
                },
              },
              title: 'Product Hunt',
            }}
          />
          {topMenus?.map(element => {
            return (
              <HeaderLink
                key={
                  element.menu_link?._meta.uid ||
                  JSON.stringify(element.children)
                }
                element={element}
              />
            );
          })}
        </nav>
      </Container>
    </StyledHeader>
  );
};
