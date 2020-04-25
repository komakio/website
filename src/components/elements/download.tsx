import React, { memo, FC } from 'react';
import { Container, Row, Col } from 'styled-bootstrap-grid';

interface DownloadProps {
  apple: { url: string };
  google: { url: string };
  title: string;
  subtitle: string;
}

export const DownloadElement: FC<DownloadProps> = memo(
  ({ apple, google, subtitle, title }) => {
    return (
      <Container style={{ paddingTop: 40 }}>
        <Row>
          <Col col={6} xs={12}>
            <img
              src="https://images.prismic.io/komak/9263c432-5046-4403-8ef1-e239327e3ae2_app.svg?auto=compress,format"
              alt=""
            />
          </Col>
          <Col col={6} xs={12}>
            <h2>{title}</h2>
            <h4>{subtitle}</h4>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <a
                href="https://apps.apple.com/dk/app/komak-protect-those-in-need/id1503987391?fbclid=IwAR3NuJWC81-SHU3FWaVqbrngLQvYhqOsNwEHBMztPGHhUo3Wxfa1foL3-3E"
                target="_blank"
                rel="noopener noreferrer"
                id="apple-download"
              >
                <img src={apple.url} style={{ height: 70 }} alt="" />
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=io.komak.app"
                target="_blank"
                rel="noopener noreferrer"
                id="google-download"
              >
                <img src={google.url} style={{ height: 100 }} alt="" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
);
