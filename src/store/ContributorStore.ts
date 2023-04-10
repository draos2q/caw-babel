import { create } from 'zustand'
import { Contributor } from "src/types";

interface ContributorsState {
    contributors: Contributor[]
    addContributor: (contributor: Contributor) => void
}

const useTranslationsStore = create<ContributorsState>()((set) => ({
    contributors: [],
    addContributor: (contributor: Contributor) => set(state => ({ contributors: [...state.contributors, contributor] })),
    addContributors: (contributors: Contributor[]) => set(state => ({ contributors: [...state.contributors, ...contributors] })),
}));

export { useTranslationsStore };