import { create } from 'zustand';

import { CAW_APP, LanguageModel, Translation } from "src/types";
import { prepareStructureForTranslation, setTranslationToLocalStorage } from 'src/utilities/buildTranslationStructure';

export type TranslateArgs = {
    app: CAW_APP,
    lang: string,
    group: string,
    key: string,
    translation: string
}

interface TranslationState {
    languages: LanguageModel[],
    translation: Translation,
    prepareEnglishTranslations: (app: CAW_APP, data: any) => void
    translate: (agrs: TranslateArgs) => void
    setManyTranslations: (translations: TranslateArgs[]) => void
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
    prepareEnglishTranslations: (app: CAW_APP, data: any) => set(state => {

        const translation = prepareStructureForTranslation(app, 'en', data);
        if (!translation)
            return state;

        return {
            ...state,
            translation: translation
        }
    }),
    translate: (agrs: TranslateArgs) => set(state => {
        const { group, key, translation } = agrs;
        let translationList = state.translation.diccionary;
        let translationIndex = translationList.findIndex((item) => item.group === group && item.key === key);

        if (translationIndex === -1)
            return state;

        translationList[translationIndex].translated_value = translation;

        //* save the translation in the local storage
        setTranslationToLocalStorage({ app: agrs.app, language: agrs.lang, group: agrs.group, key: agrs.key, value: agrs.translation });

        return {
            ...state,
            translation: {
                ...state.translation,
                diccionary: translationList
            }
        }
    }),
    setManyTranslations: (translations: TranslateArgs[]) => set(state => {

        let translationList = state.translation.diccionary;

        translations.forEach((item) => {
            let translationIndex = translationList.findIndex((translation) => translation.group === item.group && translation.key === item.key);
            if (translationIndex !== -1) {
                translationList[translationIndex].translated_value = item.translation;

                //* save the translation in the local storage
                setTranslationToLocalStorage({ app: item.app, language: item.lang, group: item.group, key: item.key, value: item.translation });
            }
        });

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