import { createContext, useContext } from 'react';

export interface PageContext {
  lang: string;
  title: string;
  uid?: string;
  alternateLanguages: {
    lang: string;
    name: string;
    path: string;
  }[];
  description?: string;
  image?: string;
}

export const PageContextProvider = createContext<PageContext>(null);

export const useLanguage = (): string => {
  const context = useContext(PageContextProvider);
  return context?.lang;
};

export const usePageContext = () => {
  const context = useContext(PageContextProvider);
  return context;
};
