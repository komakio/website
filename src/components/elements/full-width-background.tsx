import React, { memo, FC } from 'react';
import styled, { css } from 'styled-components';
import { Container } from 'styled-bootstrap-grid';
import { Button } from '@components/button';
import { Language } from '@utils/language';
import { useLanguage } from '@components/page-context';
import SbEditable from 'storyblok-react';
import { StoryblokComponent } from '@models/storyblok-component';
import { LinkBlok } from '@models/link';

const StyledPageTitle = styled.h1`
  font-size: 40px;
`;

interface FullWidthBackgroundProps {
  ctaLabel: string;
  ctaLink: LinkBlok;
  image: string;
  subtitle: string;
  title: string;
}

const StyledBackgroundImage = styled.div<{ image: string }>`
  height: 700px;
  width: 100%;
  ${({ image }) =>
    css`
      background-image: url('${image}');
    `}
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ContentBlock = styled.div`
  color: white;
  padding: 0 20%;
  padding-top: 175px;

  @media only screen and (max-width: 1300px) {
    padding: 0 15%;
    padding-top: 100px;
  }

  @media only screen and (max-width: 1000px) {
    padding: 0 15%;
    padding-top: 150px;
  }

  @media only screen and (max-width: 800px) {
    padding: 0 10%;
    padding-top: 120px;
  }

  h1 {
    /* font-family: 'Sen', sans-serif; */
    font-size: 75px;
    font-weight: bold;
    text-transform: uppercase;

    @media only screen and (max-width: 1000px) {
      font-size: 50px;
    }
  }
  h2 {
    font-size: 20px;
    margin-bottom: 30px;
  }
`;

export const FullWidthBackground: StoryblokComponent<FullWidthBackgroundProps> = memo(
  ({ blok }) => {
    const { title, ctaLabel, ctaLink, image, subtitle } = blok;
    const language = useLanguage();

    return (
      <SbEditable content={blok}>
        <StyledBackgroundImage image={image}>
          <ContentBlock>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <Button href={ctaLink.cached_url}>{ctaLabel}</Button>
          </ContentBlock>
        </StyledBackgroundImage>
      </SbEditable>
    );
  }
);
