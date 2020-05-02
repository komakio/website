import { ComponentNotFound } from './component-not-found';
import { StoryblokComponent } from '@models/storyblok-component';
import { Grid } from '@components/elements/layout-components/grid';
import { RichText } from '@components/elements/rich-text';
import { Page } from '@components/elements/page';
import { ContainerComponent } from '@components/elements/layout-components/container';
import { VerticalSpacer } from '@components/elements/spacer';
import { ImageComponent } from '@components/elements/image';
import { DownloadElement } from '@components/elements/download';
import { FullWidthBackground } from '@components/elements/full-width-background';
import { ContactForm } from '@components/elements/contact-form';
import { IconBox } from '@components/elements/icon-box';
import { IconBoxes } from '@components/elements/icon-boxes';
import { Column } from '@components/elements/layout-components/column';
import { ButtonComponent } from '@components/elements/button';
import { RequestHelp } from '@components/elements/request-help';
import { Header } from '@components/elements/header';
import { HeaderLink } from '@components/elements/header-link';
import { HeaderDropdown } from '@components/elements/header-dropdown';
import { HeaderDropdownItem } from '@components/elements/header-dropdown-item';

const ComponentList: { [componentName: string]: any } = {
  page: Page,
  grid: Grid,
  column: Column,
  richText: RichText,
  container: ContainerComponent,
  verticalSpacer: VerticalSpacer,
  image: ImageComponent,
  download: DownloadElement,
  fullWidthBackground: FullWidthBackground,
  contactForm: ContactForm,
  requestHelpForm: RequestHelp,
  header: Header,
  headerLink: HeaderLink,
  headerDropdown: HeaderDropdown,
  headerDropdownItem: HeaderDropdownItem,

  iconBox: IconBox,
  iconBoxes: IconBoxes,
  button: ButtonComponent,
};

export const Components = (type: string) => {
  if (typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound;
  }
  return ComponentList[type];
};
