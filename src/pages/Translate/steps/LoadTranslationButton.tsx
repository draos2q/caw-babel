import { Button, useToast } from '@chakra-ui/react';
import { shallow } from 'zustand/shallow';

import { usePageStore } from 'src/store/PageStore';
import { useTranslationsStore, TranslateArgs } from 'src/store/TranslationStore';
import { showSelectOptionAlert, ShowLoading, StopLoading } from 'src/utilities/SweetAlert';
import { downloadFilefromGithub } from 'src/utilities/downloadFileFromGithub';
import { getTranslationFromLocalStorage, prepareStructureForTranslation } from 'src/utilities/buildTranslationStructure';

export default function LoadTranslationButton() {

    const toast = useToast();
    const { app, lang, locked, setLocked } = usePageStore(state => ({
        app: state.platform,
        lang: state.language,
        locked: state.translate_controls_locked,
        setLocked: state.setTranslateControlsLocked
    }), shallow);

    const setEnglishTranslations = useTranslationsStore(state => state.prepareEnglishTranslations);
    const setManyTranslations = useTranslationsStore(state => state.setManyTranslations);

    const download = async () => {
        try {

            ShowLoading({ title: 'Fetching  available English translations' });
            await new Promise((resolve) => setTimeout(resolve, 4000));

            const { error, message, data: en_data } = await downloadFilefromGithub(app, 'en');
            if (error)
                throw new Error(message);

            setEnglishTranslations(app, en_data);
            StopLoading();

            const options = {
                'local': 'Resume from my last saved point',
                'remote': 'Download all translations made by other users'
            };

            const point = await showSelectOptionAlert({
                title: '',
                text: 'Please select the point from where you want to start/resume the translation process.',
                inputOptions: options,
                placeHolder: 'Select an option',
            });

            if (!point)
                return true;

            ShowLoading({ title: `Fetching  available translations for ${lang}` });
            await new Promise((resolve) => setTimeout(resolve, 4000));

            let availableTranslations: TranslateArgs[] = [];
            switch (point) {
                case 'local':
                    const englishTranslations = prepareStructureForTranslation(app, lang, en_data);
                    if (!englishTranslations)
                        return true;

                    availableTranslations = englishTranslations.diccionary.map((dic) => {

                        const _translation = getTranslationFromLocalStorage({
                            app: englishTranslations.application,
                            group: dic.group,
                            key: dic.key,
                            language: lang
                        });

                        const _trns: TranslateArgs = {
                            app,
                            lang,
                            group: dic.group,
                            key: dic.key,
                            translation: _translation || ''
                        };

                        return _trns;
                    });
                    break;
                case 'remote':
                    const { error: errLang, data: dataLang } = await downloadFilefromGithub(app, lang);
                    if (errLang)
                        return true;

                    const langTranslations = prepareStructureForTranslation(app, lang, dataLang);
                    if (!langTranslations)
                        return true;

                    availableTranslations = langTranslations.diccionary.map((dic) => {
                        const _trns: TranslateArgs = {
                            app,
                            lang,
                            group: dic.group,
                            key: dic.key,
                            translation: dic.value
                        };
                        return _trns;
                    });
                    break;
                default:
                    throw new Error('Invalid option');
            }

            setManyTranslations(availableTranslations);
            return true;
        }
        catch (error: any) {
            console.error(error);
            StopLoading();
            toast.closeAll();
            toast({
                title: " Error loading translations",
                description: error?.message || 'Something went wrong',
            });
            return false;
        }
        finally {
            StopLoading()
        }
    }

    const handleLoadTranslations = async () => {
        if (await download())
            setLocked(true);
    };

    return (
        <Button
            variant={"outline"}
            colorScheme="yellow"
            onClick={handleLoadTranslations}
            isDisabled={locked}
        >
            Load translations
        </Button>
    );
}
