import { create } from 'zustand';
import { CAW_APP } from "src/types";

import allLanguages from 'src/utilities/languages';
export type Page = 'contributors' | 'translations';

interface PageState {
    translate_controls_locked: boolean;
    language: string,
    rtl: boolean,
    platform: CAW_APP
    setTranslateControlsLocked: (locked: boolean) => void;
    changeSelectedApp: (app: CAW_APP) => void;
    changeSelectedLanguage: (language: string) => void;
}

export const usePageStore = create<PageState>((set) => ({
    translate_controls_locked: false,
    language: '',
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
        return (
            {
                ...state,
                language: language,
                rtl: allLanguages.find((l) => l.code === language)?.rtl || false
            }
        )
    }),
}));
