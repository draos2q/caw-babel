import { create } from 'zustand';

export type Page = 'contributors' | 'translations';

interface PageState {
    translate_controls_locked: boolean;
    setTranslateControlsLocked: (locked: boolean) => void;
}

export const usePageStore = create<PageState>((set) => ({
    translate_controls_locked: false,
    setTranslateControlsLocked: (locked: boolean) => set({ translate_controls_locked: locked }),
}));
