import React, { memo } from 'react';
import SbEditable from 'storyblok-react';
import { StoryblokComponent } from '@models/storyblok-component';
import {
  getFixedGatsbyImage,
  getFluidGatsbyImage,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
} from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

interface ImageProps {
  width: number;
  height: number;
  image: string;
  maxWidth: number;
  fullWidth: boolean;
}

export const ImageComponent: StoryblokComponent<ImageProps> = memo(
  ({ blok }) => {
    const isSharp =
      (blok.width || blok.height || blok.maxWidth) &&
      blok.image.indexOf('.svg') === -1;

    const fixedProps = blok.maxWidth
      ? getFluidGatsbyImage(blok.image, {
          maxWidth: blok.maxWidth,
        })
      : getFixedGatsbyImage(blok.image, {
          width: blok.width,
          height: blok.height,
        });

    return (
      <SbEditable content={blok}>
        {!isSharp && (
          <img
            src={blok.image}
            width={blok.width}
            height={blok.height}
            style={blok.fullWidth ? { width: '100%' } : undefined}
          />
        )}
        {isSharp && <Img fixed={fixedProps} />}
      </SbEditable>
    );
  }
);
