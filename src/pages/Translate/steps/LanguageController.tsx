import { Button, Select, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { useTranslationsStore } from '~/src/store/TranslationStore';
import { usePageStore } from '~/src/store/PageStore';

export default function LanguageController() {

    const locked = usePageStore(state => state.translate_controls_locked);
    const selectedLanguage = usePageStore(state => state.language);
    const setLanguage = usePageStore(state => state.changeSelectedLanguage);
    const allLanguages = useTranslationsStore(state => state.languages);

    return (
        <>
            <Select
                isDisabled={locked}
                width={"full"}
                placeholder="Select option"
                value={selectedLanguage}
                onChange={(e) => setLanguage(e.target.value)}
            >
                {allLanguages.map((lang) => (<option key={lang.code} value={lang.code}>{lang.nativeName}</option>))}
            </Select>
            <Text as="span"> or </Text>
            <Button
                isDisabled={locked}
                variant={'outline'}
                rightIcon={<AddIcon />}
            >
                Add
            </Button>
        </>
    );
}
