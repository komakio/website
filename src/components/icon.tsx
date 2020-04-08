import React, { memo, FC } from 'react';
import styled, { css } from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import { Button } from '@components/button';
import { Language } from '@utils/language';
import { useLanguage } from '@components/language';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { RichText as RichTextPrismic } from 'prismic-reactjs';

interface IconProps {
  icon: string;
  items: { icon: string; title: string; description: string; link: string }[];
}

export const Icon: FC<IconProps> = memo(({ icon }) => {
  const language = useLanguage();
  console.log(items);
  return <i data-feather={circle}></i>;
});
