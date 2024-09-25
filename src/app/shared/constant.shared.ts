import { Language } from "./model.shared";

export const API_BASE_URL = 'http://localhost:3000';
export const NOTIFICATION_DURATION = 10000;

//LANGUAGES
export const DEFAULT_LANGUAGE = 'fr';
export const LANGUAGES: Language[] = [
    { name: 'LANGUAGE.EN', code: 'en' },
    { name: 'LANGUAGE.FR', code: 'fr' },
    { name: 'LANGUAGE.ES', code: 'es' },
    { name: 'LANGUAGE.DE', code: 'de' },
    { name: 'LANGUAGE.AR', code: 'ar' },
];