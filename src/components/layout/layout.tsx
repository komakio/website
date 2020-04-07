import React, { FC } from 'react';
import { Reset } from 'styled-reset';
import { BaseCSS } from 'styled-bootstrap-grid';

import { Header } from './header';
import { GlobalStyles } from './global-styles';
import { RecaptchaInit } from '@components/recaptcha';
import styled from 'styled-components';
import { LanguageChooser, LanguageContext } from '@components/language';

const Footer = styled.footer`
  position: fixed;
  bottom: 5px;
  right: 5px;
  font-size: 11px;
`;

interface LayoutProps {
  lang: string;
  topMenus: any[];
}

export const Layout: FC<LayoutProps> = ({ children, lang, topMenus }) => {
  return (
    <LanguageContext.Provider value={lang}>
      <Reset />
      <GlobalStyles />
      <RecaptchaInit />
      <BaseCSS />
      <Header topMenus={topMenus} />
      <LanguageChooser />
      <div>
        <main>{children}</main>
        <Footer>© {new Date().getFullYear()}, Nabo NGO</Footer>
      </div>
    </LanguageContext.Provider>
  );
};
