import { FC } from 'react';

export type StoryblokSubElement<T = any> = Blok & T;

interface StoryblokComponentProps<T = any> {
  blok: StoryblokSubElement<T>;
  lang?: string;
  title?: string;
  alternateLanguages?: {
    lang: string;
    name: string;
    path: string;
  }[];
}

interface Blok {
  _uid: any;
  _editable?: string;
  component: string;
}

export type StoryblokComponent<T = any> = FC<StoryblokComponentProps<T>>;
