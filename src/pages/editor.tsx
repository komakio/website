import React from 'react';
import { Components } from '../templates/components';
import SbEditable from 'storyblok-react';
import config from '../../gatsby-config';
import { GlobalStyles } from '@components/layout/global-styles';
// import { GlobalStyles } from '@styles/global-styles';

const sbConfigs = config.plugins.filter(item => {
  return item.resolve === 'gatsby-source-storyblok';
});
const sbConfig: any = sbConfigs.length > 0 ? sbConfigs[0] : {};

const loadStoryblokBridge = function(cb) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `//app.storyblok.com/f/storyblok-latest.js?t=${sbConfig.options.accessToken}`;
  script.onload = cb;
  document.getElementsByTagName('head')[0].appendChild(script);
};

class StoryblokEntry extends React.Component<
  {},
  { story: { id: string; content: { _uid: string; component: string } } }
> {
  constructor(props) {
    super(props);
    this.state = { story: null };
  }

  public componentDidMount() {
    loadStoryblokBridge(() => {
      this.initStoryblokEvents();
    });
  }

  public loadStory() {
    window.storyblok.get(
      {
        slug: window.storyblok.getParam('path'),
        version: 'draft',
        resolve_relations: sbConfig.options.resolveRelations || [],
      },
      data => {
        this.setState({ story: data.story });
      }
    );
  }

  public initStoryblokEvents() {
    this.loadStory();

    const sb = window.storyblok;

    sb.on(['change', 'published'], () => {
      this.loadStory();
    });

    sb.on('input', payload => {
      if (this.state.story && payload.story.id === this.state.story.id) {
        payload.story.content = sb.addComments(
          payload.story.content,
          payload.story.id
        );
        this.setState({ story: payload.story });
      }
    });

    sb.pingEditor(() => {
      if (sb.inEditor) {
        sb.enterEditmode();
      }
    });
  }

  public render() {
    if (this.state.story === null) {
      return <div>LOADING</div>;
    }

    const content = this.state.story.content;

    return (
      <SbEditable content={content}>
        <GlobalStyles />
        <div>
          {React.createElement(Components(content.component), {
            key: content._uid,
            blok: content,
          })}
        </div>
      </SbEditable>
    );
  }
}

export default StoryblokEntry;
