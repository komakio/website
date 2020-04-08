import React, { memo, FC } from 'react';
import styled, { css } from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import { Button } from '@components/button';
import { Language } from '@utils/language';
import { useLanguage } from '@components/language';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { RichText as RichTextPrismic } from 'prismic-reactjs';
import { Link } from 'gatsby';

interface TwoColumnsRichTextProps {
  items: {
    richText: string;
    ctaLabel: string;
    ctaLink: {
      _meta: {
        uid: string;
      };
    };
  }[];
}

const StyledContainer = styled.section`
  background: white;
  padding: 120px 0;
`;

export const TwoColumnsRichText: FC<TwoColumnsRichTextProps> = memo(
  ({ items }) => {
    const language = useLanguage();

    return (
      <StyledContainer>
        <Container>
          <Row>
            {items.map(item => {
              return (
                <Col key={JSON.stringify(item.richText)} xs={12} lg={6}>
                  {RichTextPrismic.render(item.richText)}
                  {item.ctaLabel && (
                    <Button
                      href={Language.getLanguageLink(
                        language,
                        item.ctaLink._meta.uid
                      )}
                    >
                      {item.ctaLabel}
                    </Button>
                  )}
                </Col>
              );
            })}
          </Row>
        </Container>
      </StyledContainer>
    );
  }
);
