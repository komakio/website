import { Environment } from '../environment';

export class Language {
  private static localStorageKey = 'komakLang';

  public static defaultLang = 'en-us';
  public static languageTags = Environment.languages.map(l => l.languageCode);
  public static shortLanguageTags = Language.languageTags.map(
    l => l.split('-')[0]
  );

  public static getLanguageLink(currentLanguage: string, uid: string) {
    const path = uid === 'homepage' ? '' : `/${uid}`;
    if (currentLanguage === this.defaultLang) {
      return path;
    }
    return `/${currentLanguage}${path}`;
  }

  public static detect() {
    const localStorageValue = this.getFromLocalStorage();
    const path = this.getFromPath();
    if (localStorageValue && !path && localStorageValue !== path) {
      return localStorageValue;
    }
    if (
      localStorageValue &&
      path &&
      localStorageValue === Language.defaultLang
    ) {
      return localStorageValue;
    }
    if (!localStorageValue && !path) {
      const bestLanguage = this.findBestAvailableLanguage();
      if (bestLanguage.split('-')[0] !== 'en') {
        return bestLanguage;
      }
    }
    if (!localStorageValue && path) {
      this.setToLocalStorage(path);
    }
  }

  public static findBestAvailableLanguage() {
    const locales = this.getFromBrowser();
    // const locales = ['it', 'es', 'fr-FR', 'en'];

    for (let i = 0; i < locales.length; i++) {
      const currentLocale = locales[i];
      const languageTag = currentLocale.toLowerCase();

      if (this.languageTags.includes(languageTag)) {
        return languageTag;
      }

      const partial = currentLocale.split('-')[0];
      const indexOfPartial = this.shortLanguageTags.indexOf(partial);
      if (indexOfPartial > -1) {
        return this.languageTags[indexOfPartial];
      }
    }
    return this.languageTags[0];
  }

  public static getFromBrowser() {
    const found = [];

    if (typeof navigator !== 'undefined') {
      if (navigator.languages) {
        // chrome only; not an array, so can't use .push.apply instead of iterating
        for (let i = 0; i < navigator.languages.length; i++) {
          found.push(navigator.languages[i]);
        }
      }
      //   if (navigator.userLanguage) {
      //     found.push(navigator.userLanguage);
      //   }
      if (navigator.language) {
        found.push(navigator.language);
      }
    }

    return found.length > 0 ? found.map(f => f.toLowerCase()) : undefined;
  }

  public static getFromLocalStorage() {
    return window.localStorage?.getItem(this.localStorageKey);
  }

  public static setToLocalStorage(lang: string) {
    return window.localStorage?.setItem(this.localStorageKey, lang);
  }

  public static getFromPath() {
    let found;
    if (typeof window !== 'undefined') {
      const language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
      found = language[0].replace('/', '');
      if (this.languageTags.indexOf(found) === -1) {
        return null;
      }
    }
    return found;
  }
}
