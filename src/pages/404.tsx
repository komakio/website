import React from 'react';

import { SEO } from '../components/seo';
import { Layout } from '../components/layout/layout';
import { Container } from 'styled-bootstrap-grid';
import { Button } from '@components/button';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" lang="en-us" />
    <Container>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <Button href="/">Return home</Button>
    </Container>
  </Layout>
);

export default NotFoundPage;
