import { create } from 'zustand';

import { LanguageModel, Translation } from "src/types";
import { buildFromPlainText, buildFromFlattedStructure, buildFromNestedStructure } from 'src/utilities/buildTranslationStructure';

type TranslateArgs = {
    app: string,
    lang: string,
    group: string,
    key: string,
    translation: string
}
interface TranslationState {
    languages: LanguageModel[],
    translation: Translation,
    prepareEnglishTranslations: (app: string, data: any) => void
    translate: (agrs: TranslateArgs) => void
    setLanguageList: (languages: LanguageModel[]) => void
}

const useTranslationsStore = create<TranslationState>()((set) => ({
    languages: [],
    translation: {
        application: 'clearing-house',
        language: '',
        diccionary: []
    },
    setLanguageList: (languages: LanguageModel[]) => set(() => ({ languages: languages })),
    prepareEnglishTranslations: (app: string, data: any) => set(state => {

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
            ...state,
            translation: translation
        }
    }),
    translate: (agrs: TranslateArgs) => set(state => {
        console.log("🚀 ~ file: TranslationStore.ts:78 ~ useTranslationsStore ~ agrs:", agrs)
        const { group, key, translation } = agrs;
        let translationList = state.translation.diccionary;
        let translationIndex = translationList.findIndex((item) => item.group === group && item.key === key);
        console.log("🚀 ~ file: TranslationStore.ts:62 ~ useTranslationsStore ~ translationIndex:", translationIndex)

        if (translationIndex === -1)
            return state;

        translationList[translationIndex].translated_value = translation;

        return {
            ...state,
            translation: {
                ...state.translation,
                diccionary: translationList
            }
        }
    })
}));

export { useTranslationsStore };