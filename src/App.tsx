import './App.css'

import { useEffect } from 'react';
import MainLayout from './layout';
import { usePageStore } from './store/PageState';

import TranslatePage from './pages/Translate';
import ContributorsPage from './pages/Contributors';
import languages from 'src/utilities/languages';
import { useTranslationsStore } from './store';

function App() {

  const page = usePageStore((state) => (state.page));
  const setLanguages = useTranslationsStore((state) => (state.setLanguageList));

  useEffect(() => {
    setLanguages(languages);
  }, []);

  return (
    <MainLayout>
      {page === 'translations' && <TranslatePage />}
      {page === 'contributors' && <ContributorsPage />}
    </MainLayout>
  )
}

export default App
