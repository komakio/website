import React, { memo, FC } from 'react';
import styled, { css } from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import { Button } from '@components/button';
import { Language } from '@utils/language';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import FeatherIcon from 'feather-icons-react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { RichText as RichTextPrismic } from 'prismic-reactjs';
import { Link } from 'gatsby';
import { useLanguage } from '@components/page-context';

interface IconBoxesProps {
  title: any;
  items: {
    icon: string;
    title: string;
    description: string;
    link: {
      _meta: {
        uid: string;
        alternateLanguages: { lang: string; uid: string }[];
      };
    };
  }[];
}

const StyledContainer = styled.section`
  background: #f1f1f2;
  padding: 80px 0;
`;

const Box = styled(Link)`
  display: block;
  background: white;
  padding: 40px;
  margin-bottom: 20px;
  text-align: center;
  min-height: 220px;
  color: black;
  text-decoration: none;

  p {
    font-size: 18px;
  }
  svg {
    margin-bottom: 20px;
  }
`;

export const IconBoxes: FC<IconBoxesProps> = memo(({ title, items }) => {
  const language = useLanguage();

  return (
    <StyledContainer>
      <Container>
        <div className="text-center">{RichTextPrismic.render(title)}</div>
        <Row>
          {items.map(item => {
            return (
              <Col key={item.title} xs={12} lg={4}>
                <Box
                  to={Language.getLanguageLink(language, item.link._meta.uid)}
                >
                  <FeatherIcon icon={item.icon} size={60} />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Box>
              </Col>
            );
          })}
        </Row>
      </Container>
    </StyledContainer>
  );
});
