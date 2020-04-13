// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { RichText as RichTextPrismic } from 'prismic-reactjs';
import React, { FC, memo } from 'react';
import { linkResolver } from '@utils/link-resolver';

interface RichTextProps {
  content: string;
}

export const RichText: FC<RichTextProps> = memo(({ content }) => {
  return <RichTextPrismic render={content} linkResolver={linkResolver} />;
});
