import './App.css'

import { useEffect, Suspense } from 'react';
import { useRoutes, } from 'react-router-dom';

import MainLayout from 'src/layout';
import { routes } from "src/routes";
import { getAllLanguages } from 'src/services/Languages';
import useIsMounted from 'src/hooks/useIsMounted';

import { useTranslationsStore } from './store/TranslationStore';
import { useContributorsStore } from "./store/ContributorStore";
import { fetchContributors } from "./services/Contributors";

function App() {

  const setLanguages = useTranslationsStore((state) => (state.setLanguageList));
  const addContributors = useContributorsStore((state) => (state.addContributors));
  const mounted = useIsMounted();

  useEffect(() => {
    setLanguages(getAllLanguages());
  }, [ setLanguages ]);

  useEffect(() => {

    //TODO :  fetch from orbit-db once implemented
    const getContributors = async () => {
      const contributors = await fetchContributors();
      if (mounted())
        addContributors(contributors);
    }

    getContributors();

  }, [ addContributors, mounted ]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MainLayout>
        {useRoutes(routes)}
      </MainLayout>
    </Suspense>
  );
}

export default App
