import { Button, useToast } from '@chakra-ui/react';

import { usePageStore } from '~/src/store/PageStore';
import { useTranslationsStore } from '~/src/store/TranslationStore';
import { downloadFilefromGithub } from 'src/utilities/downloadFileFromGithub';

export default function LoadTranslationButton() {

    const toast = useToast();
    const locked = usePageStore(state => state.translate_controls_locked);
    const app = usePageStore(state => state.platform);
    const setLocked = usePageStore(state => state.setTranslateControlsLocked);
    const setEnglishTranslations = useTranslationsStore(state => state.prepareEnglishTranslations);

    const download = async () => {
        try {
            const data = await downloadFilefromGithub(app);
            setEnglishTranslations(app, data);
            return true;
        }
        catch (error: any) {
            console.error(error);
            toast.closeAll();
            toast({
                title: " Error loading translations",
                description: error?.message || 'Something went wrong',
            });
            return false;
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
