import React, { memo, FC, useMemo } from 'react';
import { Components } from './components';

interface StoryblokEntryProps {
  pageContext: {
    story: {
      lang: string;
      uuid: string;
      content: string;
      name: string;
      slug: string;
    };
  };
}

interface Story {
  uuid: string;
  content: {
    component: string;
    _uid: string;
  };
}

export const StoryblokEntry: FC<StoryblokEntryProps> = memo(
  ({ pageContext }) => {
    const story: Story = useMemo(() => {
      return {
        ...pageContext.story,
        content: pageContext.story
          ? JSON.parse(pageContext.story.content)
          : null,
      };
    }, [pageContext]);

    if (!pageContext.story) {
      return null;
    }

    const lang = pageContext.story.lang;

    return React.createElement(Components(story.content.component), {
      key: story.content._uid,
      blok: { ...story.content },
      lang,
      title: pageContext.story.name,
      slug: pageContext.story.slug,
    });
  }
);
export default StoryblokEntry;
