import { create } from 'zustand';

export type Page = 'contributors' | 'translations';

interface PageState {
    page: Page;
    setPage: (page: Page) => void;
}

export const usePageStore = create<PageState>((set) => ({
    page: 'contributors',
    setPage: (page: Page) => set({ page })
}));
