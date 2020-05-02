import { ComponentNotFound } from './component-not-found';
import { StoryblokComponent } from '@models/storyblok-component';
import { Grid } from '@components2/layout-components/grid';
import { RichText } from '@components2/rich-text';
import { Page } from '@components2/page';
import { ContainerComponent } from '@components2/layout-components/container';
import { VerticalSpacer } from '@components2/spacer';
import { ImageComponent } from '@components2/image';
import { DownloadElement } from '@components2/download';
import { FullWidthBackground } from '@components2/full-width-background';
import { ContactForm } from '@components2/contact-form';

const ComponentList: { [componentName: string]: StoryblokComponent } = {
  page: Page,
  grid: Grid,
  richText: RichText,
  container: ContainerComponent,
  verticalSpacer: VerticalSpacer,
  image: ImageComponent,
  download: DownloadElement,
  fullWidthBackground: FullWidthBackground,
  contactForm: ContactForm,
};

export const Components = (type: string) => {
  if (typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound;
  }
  return ComponentList[type];
};
