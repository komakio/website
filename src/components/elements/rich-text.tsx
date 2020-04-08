import React, { memo, FC } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { RichText as RichTextPrismic } from 'prismic-reactjs';
import { Container } from 'styled-bootstrap-grid';

interface RichTextProps {
  text: string;
}

export const RichText: FC<RichTextProps> = memo(({ text }) => {
  return <Container>{RichTextPrismic.render(text)}</Container>;
});
