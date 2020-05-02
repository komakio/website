import React, { memo } from 'react';
import { Container, Row, Col, media } from 'styled-bootstrap-grid';
import styled from 'styled-components';
import SbEditable from 'storyblok-react';
import { StoryblokComponent } from '@models/storyblok-component';

interface DownloadProps {
  appleImage: string;
  googleImage: string;
  title: string;
  subtitle: string;
}

const DownloadButtons = styled.div`
  display: flex;
  align-items: center;

  ${media.xs`
    flex-direction: column;
  `}
`;

export const DownloadElement: StoryblokComponent<DownloadProps> = memo(
  ({ blok }) => {
    return (
      <SbEditable content={blok}>
        <Container style={{ paddingTop: 40 }}>
          <Row>
            <Col col={6} xs={12}>
              <img
                src="https://images.prismic.io/komak/9263c432-5046-4403-8ef1-e239327e3ae2_app.svg?auto=compress,format"
                alt=""
              />
            </Col>
            <Col col={6} xs={12}>
              <h2>{blok.title}</h2>
              <h4>{blok.subtitle}</h4>
              <DownloadButtons>
                <a
                  href="https://apps.apple.com/dk/app/komak-protect-those-in-need/id1503987391?fbclid=IwAR3NuJWC81-SHU3FWaVqbrngLQvYhqOsNwEHBMztPGHhUo3Wxfa1foL3-3E"
                  rel="noopener noreferrer"
                  id="apple-download"
                >
                  <img src={blok.appleImage} style={{ height: 70 }} alt="" />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=io.komak.app"
                  rel="noopener noreferrer"
                  id="google-download"
                >
                  <img src={blok.googleImage} style={{ height: 100 }} alt="" />
                </a>
              </DownloadButtons>
            </Col>
          </Row>
        </Container>
      </SbEditable>
    );
  }
);
