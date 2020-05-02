import React, { memo } from 'react';
import { Components } from '../../../templates/components';
import SbEditable from 'storyblok-react';
import { Container } from 'styled-bootstrap-grid';
import {
  StoryblokComponent,
  StoryblokSubElement,
} from '@models/storyblok-component';

interface GridProps {
  fluid: boolean;
  body: StoryblokSubElement[];
}

export const ContainerComponent: StoryblokComponent<GridProps> = memo(
  ({ blok }) => {
    return (
      <SbEditable content={blok}>
        <Container fluid={blok.fluid}>
          {blok.body.map(blok =>
            React.createElement(Components(blok.component), {
              key: blok._uid,
              blok: blok,
            })
          )}
        </Container>
      </SbEditable>
    );
  }
);
