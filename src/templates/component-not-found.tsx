import React, { memo } from 'react';
import { StoryblokComponent } from '@models/storyblok-component';
import styled from 'styled-components';
import SbEditable from 'storyblok-react';
import { colors } from '@utils/colors';

const Container = styled.div`
  border: 2px dotted ${colors.red300};
  padding: 20px;
  margin: 10px;
  color: black;
`;

export const ComponentNotFound: StoryblokComponent = memo(({ blok }) => (
  <SbEditable content={blok}>
    <Container>
      Component {blok.component} is not defined. It needs to be added to
      components.
    </Container>
  </SbEditable>
));
