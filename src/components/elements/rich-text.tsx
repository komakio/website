import React, { memo, useMemo } from 'react';
import SbEditable from 'storyblok-react';
import { storyblokClient } from '../storyblok-component';
import { Components } from '../templates/components';
import { StoryblokComponent } from '@models/storyblok-component';
import styled from 'styled-components';
import { colors } from '@utils/colors';

const StyledRichText = styled.div`
  a {
    color: ${colors.green200};
  }
`;

interface RichTextProps {
  content: {
    type: 'doc';
    content: any[];
  };
}

export const RichText: StoryblokComponent<RichTextProps> = memo(({ blok }) => {
  const items = blok.content.content as any[];

  const scopedItems = useMemo(() => {
    const results = [];

    if (!items) {
      return [];
    }

    const blokIndexes = items.reduce<number[]>((previous, item, index) => {
      // console.log(item.type)
      if (item.type === 'blok') {
        return [...previous, index];
      }
      return previous;
    }, []);

    // console.log(blokIndexes)

    let lastIndexMade = 0;
    blokIndexes?.forEach(index => {
      results.push({ type: 'doc', content: items.slice(lastIndexMade, index) });
      results.push({ type: 'blok', content: items[index].attrs.body[0] });
      lastIndexMade = index + 1;
    });

    const lastItems = items.slice(lastIndexMade, items.length);
    if (lastItems.length) {
      results.push({ type: 'doc', content: lastItems });
    } else {
      // console.log('blok')
      results.push({
        type: 'blok',
        content: items[items.length]?.attrs.body[0],
      });
    }

    return results;
  }, [items]);

  return (
    <SbEditable content={blok}>
      <div>
        {scopedItems.map((result, index) => {
          if (result.type === 'doc') {
            return (
              <StyledRichText
                key={index}
                dangerouslySetInnerHTML={{
                  __html: storyblokClient.richTextResolver.render(result),
                }}
              />
            );
          }
          const blok = result.content;
          if (blok) {
            return React.createElement(Components(blok.component), {
              key: blok._uid,
              blok: blok,
            });
          }
          return null;
        })}
      </div>
    </SbEditable>
  );
});
