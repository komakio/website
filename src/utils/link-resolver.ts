export const linkResolver = doc => {
  console.log(doc);
  if (doc.uid === 'homepage') {
    return '/';
  }

  if (doc.type === 'page') {
    return `/${doc.uid}`;
  }

  return '/';
};
