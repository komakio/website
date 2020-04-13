import React, { memo, FC } from 'react';
import styled from 'styled-components';
import { Container } from 'styled-bootstrap-grid';

const StyledPageTitle = styled.h1`
  padding-top: 20px;
  font-size: 40px;
`;

interface PageTitleProps {
  title: string;
}

export const PageTitle: FC<PageTitleProps> = memo(({ title }) => {
  return (
    <Container>
      <StyledPageTitle>{title}</StyledPageTitle>
    </Container>
  );
});
