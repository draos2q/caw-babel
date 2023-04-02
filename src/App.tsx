import './App.css'

import { useEffect, Suspense } from 'react';
import { useRoutes, } from 'react-router-dom';

import languages from 'src/utilities/languages';
import MainLayout from './layout';
import { routes } from "./routes";
import { useTranslationsStore } from './store';

function App() {

  const setLanguages = useTranslationsStore((state) => (state.setLanguageList));

  useEffect(() => {
    setLanguages(languages);
  }, [setLanguages]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MainLayout>
        {useRoutes(routes)}
      </MainLayout>
    </Suspense>
  );
}

export default App
