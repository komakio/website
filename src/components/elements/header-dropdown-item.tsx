import { Link } from 'gatsby';
import React from 'react';
import { useLanguage } from '@components/page-context';
import { Language } from '@utils/language';
import { StoryblokComponent } from '@models/storyblok-component';
import { LinkBlok } from '@models/link';
import SbEditable from 'storyblok-react';

interface HeaderDropdownItemProps {
  title: string;
  link: LinkBlok;
}

export const HeaderDropdownItem: StoryblokComponent<HeaderDropdownItemProps> = ({
  blok,
}) => {
  const language = useLanguage();
  return (
    <SbEditable content={blok}>
      <div className="item" key={blok.title}>
        <Link to={Language.getLanguageLink(language, blok.link?.cached_url)}>
          {blok.title}
        </Link>
      </div>
    </SbEditable>
  );
};
