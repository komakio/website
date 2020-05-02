import React, { memo } from 'react';
import { Components } from '../../templates/components';
import SbEditable from 'storyblok-react';
import { Container, Row } from 'styled-bootstrap-grid';
import {
  StoryblokComponent,
  StoryblokSubElement,
} from '@models/storyblok-component';

interface GridProps {
  fluid: boolean;
  noPadding: boolean;
  columns: StoryblokSubElement[];
}

export const Grid: StoryblokComponent<GridProps> = memo(({ blok }) => {
  const row = (
    <Row>
      {blok.columns.map(blok =>
        React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok,
        })
      )}
    </Row>
  );
  return (
    <SbEditable content={blok}>
      {!blok.noPadding && <Container fluid={blok.fluid}>{row}</Container>}
      {blok.noPadding && row}
    </SbEditable>
  );
});
