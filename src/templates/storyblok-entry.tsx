import React, { memo, FC, useMemo } from 'react';
import { Components } from './components';

interface StoryblokEntryProps {
  pageContext: {
    story: {
      slug: string;
      lang: string;
      uuid: string;
      content: string;
      name: string;
      translated_slugs: [{ lang: string; name: string; path: string }];
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

    const lang = pageContext.story.lang;

    const allLanguages = [
      {
        lang: 'default',
        name: pageContext.story.name,
        path: pageContext.story.slug,
      },
      ...(pageContext.story.translated_slugs?.map(l => ({
        ...l,
        name: l.name || pageContext.story.name,
      })) || []),
    ];
    const languageContext = allLanguages.find(s => s.lang === lang);

    return React.createElement(Components(story.content.component), {
      key: story.content._uid,
      blok: { ...story.content },
      lang,
      title: languageContext?.name,
      alternateLanguages: allLanguages.filter(l => l.lang !== lang),
    });
  }
);
export default StoryblokEntry;
