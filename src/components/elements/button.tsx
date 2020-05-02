import React, { memo } from 'react';
import SbEditable from 'storyblok-react';
import { Button, ButtonProps as SharedButtonProps } from '@components/button';
import { StoryblokComponent } from '@models/storyblok-component';
import { LinkBlok } from '@models/link';

interface ButtonProps {
  text: string;
  theme: SharedButtonProps['theme'];
  size: SharedButtonProps['size'];
  link: LinkBlok;
}

export const ButtonComponent: StoryblokComponent<ButtonProps> = memo(
  ({ blok }) => {
    return (
      <SbEditable content={blok}>
        <Button
          theme={blok.theme}
          size={blok.size}
          href={`/${blok.link?.cached_url}`}
        >
          {blok.text}
        </Button>
      </SbEditable>
    );
  }
);
