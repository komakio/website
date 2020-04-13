import React, { memo, FC } from 'react';
import { Container } from 'styled-bootstrap-grid';
import { RichText } from '@components/rich-text';

interface RichTextProps {
  text: string;
}

export const RichTextElement: FC<RichTextProps> = memo(({ text }) => {
  return (
    <Container>
      <RichText content={text} />
    </Container>
  );
});
