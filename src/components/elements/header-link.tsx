import { Link } from 'gatsby';
import React from 'react';
import { useLanguage } from '@components/page-context';
import { Language } from '@utils/language';
import { Button } from '@components/button';
import styled from 'styled-components';
import { StoryblokComponent } from '@models/storyblok-component';
import { LinkBlok } from '@models/link';
import SbEditable from 'storyblok-react';

interface HeaderLinkProps {
  title: string;
  link: LinkBlok;
  isButton: boolean;
}

const Container = styled.div`
  height: 65px;
  width: auto;
  line-height: 65px;
`;

export const HeaderLink: StoryblokComponent<HeaderLinkProps> = ({ blok }) => {
  const language = useLanguage();

  const link =
    blok.link.cached_url ||
    Language.getLanguageLink(language, blok.link.cached_url);
  const linkStyles = { margin: '0 12px' };

  const renderElem = () => {
    if (blok.isButton) {
      return (
        <Button href={link} theme="white" size="medium" style={linkStyles}>
          {blok.title}
        </Button>
      );
    }

    return (
      <Link to={link} style={linkStyles}>
        {blok.title}
      </Link>
    );
  };

  return (
    <SbEditable content={blok}>
      <Container>{renderElem()}</Container>
    </SbEditable>
  );
};
