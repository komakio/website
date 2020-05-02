import React, { FC } from 'react';
import { Reset } from 'styled-reset';
import { BaseCSS } from 'styled-bootstrap-grid';

import { GlobalStyles } from './global-styles';
import { RecaptchaInit } from '@components/recaptcha';
import styled from 'styled-components';
import { LanguageChooser } from '@components/language';
import { PageContext, PageContextProvider } from '@components/page-context';
import { SEO } from '@components/seo';
import '../../sentry';
import { Footer, footerHeight } from './footer';
import { headerHeight } from '@components/elements/header';
import { Header } from './header';

const PageContainer = styled.div`
  position: fixed;
  top: ${headerHeight}px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;

  .content {
    min-height: 100%;
    margin-bottom: -${footerHeight}px;
  }

  .push,
  footer {
    height: ${footerHeight}px;
  }
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
      <PageContainer>
        <div className="content">
          <main>{children}</main>
          <div className="push"></div>
        </div>
        <Footer />
      </PageContainer>
    </PageContextProvider.Provider>
  );
};
