import React, { memo, FC, useMemo } from 'react';
import { Components } from './components';

interface StoryblokEntryProps {
  pageContext: {
    story: {
      uuid: string;
      content: string;
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
        content: JSON.parse(pageContext.story.content),
      };
    }, [pageContext]);

    return React.createElement(Components(story.content.component), {
      key: story.content._uid,
      blok: story.content,
    });
  }
);
export default StoryblokEntry;
