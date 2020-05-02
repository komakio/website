import React, { memo } from 'react';
import { Components } from '../../templates/components';
import { Layout } from '../../components/layout/layout';
import {
  StoryblokComponent,
  StoryblokSubElement,
} from '@models/storyblok-component';

interface PageProps {
  body: StoryblokSubElement[];
}

export const Page: StoryblokComponent<PageProps> = memo(props => (
  <Layout context={null}>
    {props.blok.body &&
      props.blok.body.map(blok =>
        React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok,
        })
      )}
  </Layout>
));
