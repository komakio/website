export const linkResolver = doc => {
  const isMainLanguage = doc.lang === 'en-us';

  if (doc.uid === 'homepage') {
    return isMainLanguage ? `/` : `/${doc.lang}`;
  }

  // if (doc.type === 'page') {
  const langPrefix = isMainLanguage ? '' : `/${doc.lang}`;
  return `${langPrefix}/${doc.uid}`;
  // }

  return null;
};
