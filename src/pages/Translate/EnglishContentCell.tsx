import { IconButton, Tooltip } from '@chakra-ui/react';
import { CopyIcon, ArrowForwardIcon } from "@chakra-ui/icons";

import { useTranslationsStore } from 'src/store/TranslationStore';
import { usePageStore } from '~/src/store/PageStore';

type Props = {
    value: string;
    jsonKey: string;
    jsonGroup: string;
}

export function EnglishContentCell({ value, jsonGroup, jsonKey }: Props) {

    const lang = usePageStore(state => state.language);
    const app = usePageStore(state => state.platform);
    const translate = useTranslationsStore(state => state.translate);

    const handleCopy = (value: string) => () => {
        navigator.clipboard.writeText(value);
    };

    const handleCopyToTranslateCell = (value: string) => () => {
        translate({ app, lang, group: jsonGroup, key: jsonKey, translation: value });
    }

    return (
        <>
            <Tooltip label="Copy tex to clipboard" aria-label="copy-text">
                <IconButton
                    aria-label="copy-text"
                    icon={<CopyIcon color="gray.500" />}
                    size="sm"
                    variant="ghost"
                    onClick={handleCopy(value)} />
            </Tooltip>
            <Tooltip label="Copy text to translate cell" aria-label="duplicate-text">
                <IconButton
                    aria-label="duplicate-text"
                    icon={<ArrowForwardIcon color="gray.500" />}
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyToTranslateCell(value)} />
            </Tooltip>
            {value}
        </>
    );
}
