import React, { memo } from 'react';
import styled from 'styled-components';
import { Container, Row } from 'styled-bootstrap-grid';
import SbEditable from 'storyblok-react';
import {
  StoryblokComponent,
  StoryblokSubElement,
} from '@models/storyblok-component';
import { Components } from '@templates/components';

interface IconBoxesProps {
  title: string;
  items: StoryblokSubElement<IconBoxesProps>[];
}

const StyledContainer = styled.section`
  background: #f1f1f2;
  padding: 80px 0;
`;

export const IconBoxes: StoryblokComponent<IconBoxesProps> = memo(
  ({ blok }) => {
    const { title, items } = blok;

    return (
      <SbEditable content={blok}>
        <StyledContainer>
          <Container>
            <div className="text-center">
              <h3>{title}</h3>
            </div>
            <Row>
              {items.map(item => {
                return React.createElement(Components(item.component), {
                  key: item._uid,
                  blok: item,
                });
              })}
            </Row>
          </Container>
        </StyledContainer>
      </SbEditable>
    );
  }
);
