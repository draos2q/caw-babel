import { create } from 'zustand'
import { CAW_APP, Contributor, LanguageModel, Translation } from "../types";
import { buildFromPlainText, buildFromFlattedStructure, buildFromNestedStructure } from '../utilities/buildTranslationStructure';

interface TranslationState {
    languages: LanguageModel[]
    translateToLanguage: string,
    application: CAW_APP
    contributors: Contributor[]
    englishTranslations: Translation,
    langTranslations: Translation,
    addContributor: (contributor: Contributor) => void
    toogleApplication: (translation: CAW_APP) => void
    prepareEnglishTranslations: (app: string, data: any) => void
    setTranslateToLanguage: (language: string) => void
    setLanguageList: (languages: LanguageModel[]) => void
}

const useTranslationsStore = create<TranslationState>()((set) => ({
    languages: [],
    translateToLanguage: '',
    application: 'clearing-house',
    contributors: [],
    englishTranslations: {
        application: 'clearing-house',
        language: 'en',
        diccionary: []
    },
    langTranslations: {
        application: 'clearing-house',
        language: 'es',
        diccionary: []
    },
    addContributor: (contributor: Contributor) => set(state => ({ contributors: [...state.contributors, contributor] })),
    // addTranslation: (translation: Translation) => set(state => ({ current_translations: translation })),
    toogleApplication: (translation: CAW_APP) => set(() => ({ application: translation })),
    // addLanguage: (language: string) => set(state => ({ languages: [...state.languages, language] })),
    setTranslateToLanguage: (language: string) => set(() => ({ translateToLanguage: language })),
    setLanguageList: (languages: LanguageModel[]) => set(() => ({ languages: languages })),
    prepareEnglishTranslations: (app: string, data: any) => set(state => {

        if (state.englishTranslations.diccionary && Object.keys(state.englishTranslations.diccionary).length > 0 && state.englishTranslations.application === app)
            return state;

        let translation: Translation | null = null;
        switch (app) {
            case 'clearing-house':
                translation = buildFromNestedStructure(app, 'en', data);
                break;
            case 'website':
                translation = buildFromFlattedStructure(app, 'en', data);
                break;
            case 'manifesto':
                translation = buildFromPlainText(app, 'en', data);
                break;
            default:
                translation = null;
                break;
        }

        if (!translation)
            return state;

        console.log(" useTranslationsStore ~ translation:", translation)

        return {
            englishTranslations: translation
        }
    }),
}));

export { useTranslationsStore };