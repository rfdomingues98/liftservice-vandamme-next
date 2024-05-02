export const i18n = {
  defaultLocale: 'pt',
  locales: ['pt', 'en', 'fr', 'nl'] as const,
  localePrefix: 'as-needed',
} as const

export const mappedLocales = {
  pt: {locale: 'pt', name: 'Português'},
  en: {locale: 'en', name: 'English'},
  fr: {locale: 'fr', name: 'Français'},
  nl: {locale: 'nl', name: 'Nederlands'},
}

export type Locale = (typeof i18n)['locales'][number]
