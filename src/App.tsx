import './App.css'

import MainLayout from './layout';
import { usePageStore } from './store/PageState';

import TranslatePage from './pages/Translate';
import ContributorsPage from './pages/Contributors';

function App() {

  const page = usePageStore((state) => (state.page));

  return (
    <MainLayout>
      {page === 'translations' && <TranslatePage />}
      {page === 'contributors' && <ContributorsPage />}
    </MainLayout>
  )
}

export default App
