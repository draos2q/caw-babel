import { Button, useToast } from '@chakra-ui/react';
import { shallow } from 'zustand/shallow';

import { usePageStore } from 'src/store/PageStore';
import { useTranslationsStore, TranslateArgs } from 'src/store/TranslationStore';
import { showSelectOptionAlert, ShowLoading, StopLoading } from 'src/utilities/SweetAlert';
import { downloadFilefromGithub } from 'src/utilities/downloadFileFromGithub';
import { getTranslationFromLocalStorage, prepareStructureForTranslation } from 'src/utilities/buildTranslationStructure';

export default function LoadTranslationButton() {

    const toast = useToast();
    const { app, lang, langName, locked, setLocked } = usePageStore(state => ({
        app: state.platform,
        lang: state.language,
        langName: state.languageName,
        locked: state.translate_controls_locked,
        setLocked: state.setTranslateControlsLocked
    }), shallow);

    const { setEnglishTranslations, setManyTranslations } = useTranslationsStore(state => ({
        setEnglishTranslations: state.prepareEnglishTranslations,
        setManyTranslations: state.setManyTranslations
    }), shallow);


    const download = async () => {
        try {


            const options = {
                'local': 'Resume from my last saved point - Empty if first time',
                'remote': 'Get translations made by other users - Useful if first time'
            };

            const point = await showSelectOptionAlert({
                title: '',
                text: 'Choose the starting point from which you want to translate',
                inputOptions: options,
                placeHolder: 'pick an option',
            });

            if (!point)
                return false;

            ShowLoading({ title: 'Fetching  available English translations' });
            const { error, message, data: en_data } = await downloadFilefromGithub(app, 'en');
            if (error)
                throw new Error(message);

            setEnglishTranslations(app, lang, en_data);
            StopLoading();
            ShowLoading({ title: `Fetching  available translations for ${langName}` });

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
        catch (error: unknown) {

            if (error instanceof Error) {
                StopLoading();
                toast.closeAll();
                toast({
                    title: " Error loading translations",
                    description: error?.message || 'Something went wrong',
                });
            }

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
