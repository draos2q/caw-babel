import { create } from 'zustand'
import { Contributor } from "src/types";

interface ContributorsState {
    contributors: Contributor[]
    addContributors: (contributor: Contributor[]) => void
}

const useContributorsStore = create<ContributorsState>()((set) => ({
    contributors: [],
    addContributors: (contributors: Contributor[]) => set(state => (mergeContributors(state, contributors))),
}));


function mergeContributors(state: ContributorsState, contributors: Contributor[]): ContributorsState | Partial<ContributorsState> {

    const newContributors = contributors.filter(contributor => {
        return !state.contributors.find(c => c.id === contributor.id);
    });

    if (newContributors.length === 0) {
        return {};
    }


    return { contributors: [ ...state.contributors, ...contributors ] };
}

export { useContributorsStore };