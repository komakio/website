import React, { memo } from 'react';
import { Components } from '../../templates/components';
import SbEditable from 'storyblok-react';
import { Col } from 'styled-bootstrap-grid';
import {
  StoryblokComponent,
  StoryblokSubElement,
} from '@models/storyblok-component';

interface ColumnProps {
  col: number;
  xs: number;
  md: number;
  lg: number;
  body: StoryblokSubElement[];
}

export const Column: StoryblokComponent<ColumnProps> = memo(({ blok }) => {
  return (
    <SbEditable content={blok}>
      <Col col={blok.col || 6} xs={blok.xs} md={blok.md} lg={blok.lg}>
        {blok.body.map(blok =>
          React.createElement(Components(blok.component), {
            key: blok._uid,
            blok: blok,
          })
        )}
      </Col>
    </SbEditable>
  );
});
