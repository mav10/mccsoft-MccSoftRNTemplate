import en from '../../locales/translations/en.json';
import {defaultNS} from './localization.ts';

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends object
    ? `${TKey}:${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];

export type TranslationKeys = RecursiveKeyOf<typeof en>;
export type Resources = typeof en;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: {
      [K in keyof Resources]: Resources[K];
    };
    returnNull: false;
    returnEmptyString: false;
    interpolation: {escapeValue: false};
  }
}
