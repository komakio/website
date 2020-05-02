import React, { memo } from 'react';
import styled from 'styled-components';
import { Col } from 'styled-bootstrap-grid';
import { Language } from '@utils/language';
import SbEditable from 'storyblok-react';
import { StoryblokComponent } from '@models/storyblok-component';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import FeatherIcon from 'feather-icons-react';
import { Link } from 'gatsby';
import { useLanguage } from '@components/page-context';
import { LinkBlok } from '@models/link';

export interface IconBoxProps {
  icon: string;
  title: string;
  description: string;
  link: LinkBlok;
}

const Box = styled(Link)`
  display: block;
  background: white;
  padding: 40px;
  margin-bottom: 20px;
  text-align: center;
  min-height: 220px;
  color: black;
  text-decoration: none;

  p {
    font-size: 18px;
  }
  svg {
    margin-bottom: 20px;
  }
`;

export const IconBox: StoryblokComponent<IconBoxProps> = memo(({ blok }) => {
  const { title, link, description, icon } = blok;
  const language = useLanguage();

  return (
    <SbEditable content={blok}>
      <Col key={title} xs={12} lg={4}>
        <Box to={Language.getLanguageLink(language, link.cached_url)}>
          <FeatherIcon icon={icon} size={60} />
          <h3>{title}</h3>
          <p>{description}</p>
        </Box>
      </Col>
    </SbEditable>
  );
});
