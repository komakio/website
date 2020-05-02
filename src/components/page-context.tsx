import { createContext, useContext } from 'react';

export interface MetaLink {
  uid: string;
  lang: string;
  _linkType?: 'Link.web' | 'Link.document';
  url?: string;
  alternateLanguages?: {
    lang: string;
    uid: string;
  }[];
}

interface PContext extends MetaLink {
  title: string;
  description?: string;
  image?: {
    url: string;
  };
}

export interface PageContext {
  context: PContext;
  topMenus?: {
    menu_link: { _meta: MetaLink };
    title: string;
    button: boolean;
    children: {
      dropdown_item_title: string;
      dropdown_item_link: { _meta: MetaLink };
    }[];
  }[];
  allPages?: MetaLink[];
}

export const PageContextProvider = createContext<PageContext>(null);

export const useLanguage = (): string => {
  const context = useContext(PageContextProvider);
  return context?.context.lang;
};

export const usePageContext = () => {
  const context = useContext(PageContextProvider);
  return context?.context || {};
};

export const useTopMenus = () => {
  const context = useContext(PageContextProvider);
  return context?.topMenus;
};

export const useAllPages = () => {
  const context = useContext(PageContextProvider);
  return context?.allPages;
};
