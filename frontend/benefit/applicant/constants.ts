export const IS_CLIENT = typeof window !== 'undefined';

export enum SUPPORTED_LANGUAGES {
  FI = 'fi',
  SV = 'sv',
  EN = 'en',
}

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.FI;

export const COMMON_I18N_NAMESPACES = ['common'];

export const PRIVACY_POLICY_LINKS = {
  fi:
    'https://www.hel.fi',
  en:
    'https://www.hel.fi',
  sv:
    'https://www.hel.fi',
};