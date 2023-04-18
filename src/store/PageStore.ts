import { create } from 'zustand';
import { CAW_APP } from "src/types";

import allLanguages from 'src/utilities/languages';
export type Page = 'contributors' | 'translations';

interface PageState {
    translate_controls_locked: boolean;
    language: string,
    languageName: string,
    rtl: boolean,
    platform: CAW_APP
    setTranslateControlsLocked: (locked: boolean) => void;
    changeSelectedApp: (app: CAW_APP) => void;
    changeSelectedLanguage: (language: string) => void;
}

export const usePageStore = create<PageState>((set) => ({
    translate_controls_locked: false,
    language: '',
    languageName: '',
    rtl: false,
    platform: 'clearing-house',
    setTranslateControlsLocked: (locked: boolean) => set({ translate_controls_locked: locked }),
    changeSelectedApp: (app: CAW_APP) => set((state) => {
        return (
            {
                ...state,
                platform: app
            }
        )
    }),
    changeSelectedLanguage: (language: string) => set((state) => {

        const _lang = allLanguages.find((l) => l.code === language);
        return (
            {
                ...state,
                language: language,
                languageName: _lang ? _lang.name : language,
                rtl: _lang ? _lang.rtl : false,
            }
        )
    }),
}));
