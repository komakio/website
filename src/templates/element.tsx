import React, { memo, FC } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { RichText } from 'prismic-reactjs';
import styled from 'styled-components';

const PageTitle = styled.h1`
  font-size: 40px;
`;

interface PageElementProps {
  item: any;
  index: number;
}

export const PageElement: FC<PageElementProps> = memo(({ item, index }) => {
  if (item.type === 'page_title') {
    if (index === 0) {
      return <PageTitle key={index}>{item.primary.heading[0].text}</PageTitle>;
    }
    return RichText.render(item.primary.heading);
  }
  if (item.type === 'text') {
    return RichText.render(item.primary.text);
  }
  return null;
});
