import React, { memo } from 'react';
import SbEditable from 'storyblok-react';
import { StoryblokComponent } from '@models/storyblok-component';

interface VerticalSpacerProps {
  height: number;
}

export const VerticalSpacer: StoryblokComponent<VerticalSpacerProps> = memo(
  ({ blok }) => {
    const { height } = blok;
    return (
      <SbEditable content={blok}>
        <div style={{ height: `${height}rem` }} />
      </SbEditable>
    );
  }
);
