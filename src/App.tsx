import './App.css'

import { useEffect, Suspense } from 'react';
import { useRoutes, } from 'react-router-dom';

import languages from 'src/utilities/languages';
import MainLayout from './layout';
import { routes } from "./routes";
import { useTranslationsStore } from './store/TranslationStore';
import { useContributorsStore } from "./store/ContributorStore";
import { Contributor } from "./types";

function App() {

  const setLanguages = useTranslationsStore((state) => (state.setLanguageList));
  const addContributors = useContributorsStore((state) => (state.addContributors));

  useEffect(() => {
    setLanguages(languages);
  }, [ setLanguages ]);

  useEffect(() => {

    //TODO :  fetch from orbit-db once implemented

    const list: Contributor[] = [
      {
        id: "persian-c",
        name: "Persian community",
        avatar: "",
        profile: "",
      },
      {
        id: "spanish-c",
        name: "Spanish community",
        avatar: "",
        profile: "",
      },
      {
        id: "turkish-c",
        name: "Turkish community",
        avatar: "",
        profile: "",
      },
      {
        id: "vietnamese-c",
        name: "Vietnamese community",
        avatar: "",
        profile: "",
      },
      {
        id: "japanese-c",
        name: "Japanese Community",
        avatar: "",
        profile: "",
      },
      {
        id: "chinese-c",
        name: "Chinese Community",
        avatar: "",
        profile: "",
      },
      {
        id: "german-c",
        name: "German Community",
        avatar: "",
        profile: "",
      },
      {
        id: "french-c",
        name: "French Community",
        avatar: "",
        profile: "",
      },
      {
        id: "polish-c",
        name: "Polish Community",
        avatar: "",
        profile: "",
      },
      {
        id: "121203012",
        name: "ezer",
        avatar: "https://avatars.githubusercontent.com/u/121203012?v=4",
        profile: "https://github.com/ezer-forint",
      },
      {
        id: "112316355",
        name: "finneganMcdoogle",
        avatar: "https://avatars.githubusercontent.com/u/112316355?v=4",
        profile: "https://github.com/finneganMcdoogle",
      },
      {
        id: "122615367",
        name: "Testovir0n",
        avatar: "https://avatars.githubusercontent.com/u/122615367?v=4",
        profile: "https://github.com/Testovir0n",
      },
      {
        id: "122703902",
        name: "zloty",
        avatar: "https://avatars.githubusercontent.com/u/122703902?v=4",
        profile: "https://github.com/zloty-fi",
      },
      {
        id: "115931340",
        name: "melikbayram",
        avatar: "https://avatars.githubusercontent.com/u/115931340?v=4",
        profile: "https://github.com/melikbayram",
      },
      {
        id: "96838319",
        name: "TheMaker",
        avatar: "https://avatars.githubusercontent.com/u/96838319?v=4",
        profile: "https://github.com/MasterSprouts",
      },
    ];

    addContributors(list);


  }, [ addContributors ]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MainLayout>
        {useRoutes(routes)}
      </MainLayout>
    </Suspense>
  );
}

export default App
