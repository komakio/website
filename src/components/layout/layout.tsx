import React, { FC } from 'react';
import { Reset } from 'styled-reset';
import { BaseCSS } from 'styled-bootstrap-grid';

import { Header } from './header';
import { GlobalStyles } from './global-styles';
import { RecaptchaInit } from '@components/recaptcha';
import styled from 'styled-components';
import { LanguageChooser } from '@components/language';
import { PageContext, PageContextProvider } from '@components/page-context';
import { SEO } from '@components/seo';

const Footer = styled.footer`
  position: fixed;
  bottom: 5px;
  right: 5px;
  font-size: 11px;
`;

interface LayoutProps {
  context: PageContext;
}

export const Layout: FC<LayoutProps> = ({ children, context }) => {
  return (
    <PageContextProvider.Provider value={context}>
      <SEO />
      <Reset />
      <GlobalStyles />
      <RecaptchaInit />
      <BaseCSS />
      <Header />
      <LanguageChooser />
      <div>
        <main>{children}</main>
        <Footer>© {new Date().getFullYear()}, Nabo NGO</Footer>
      </div>
    </PageContextProvider.Provider>
  );
};
