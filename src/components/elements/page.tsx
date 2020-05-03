import React, { memo } from 'react';
import { Components } from '../../templates/components';
import { Layout } from '../../components/layout/layout';
import {
  StoryblokComponent,
  StoryblokSubElement,
} from '@models/storyblok-component';

interface PageProps {
  title: string;
  description: string;
  image: string;
  body: StoryblokSubElement[];
}

export const Page: StoryblokComponent<PageProps> = memo(
  ({ blok, lang, title, slug }) => {
    return (
      <Layout
        context={{
          lang,
          title: blok.title || title,
          slug,
          description: blok.description,
          image: blok.image,
        }}
      >
        {blok.body &&
          blok.body.map(blok =>
            React.createElement(Components(blok.component), {
              key: blok._uid,
              blok: blok,
            })
          )}
      </Layout>
    );
  }
);
