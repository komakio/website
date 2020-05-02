export interface LinkBlok {
  id: string;
  url: string;
  linktype: 'story' | 'url';
  fieldtype: 'multilink';
  cached_url: string;
}
