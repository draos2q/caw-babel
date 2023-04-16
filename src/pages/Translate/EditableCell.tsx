import { useEffect, useState } from "react";
import { Editable, EditablePreview, EditableTextarea } from '@chakra-ui/react';

import { useTranslationsStore } from 'src/store/TranslationStore';
import { usePageStore } from '~/src/store/PageStore';

export type Props = {
    value: string;
    jsonKey: string;
    jsonGroup: string;
}

export default function EditableCell({ value, jsonKey, jsonGroup }: Props) {

    const lang = usePageStore(state => state.language);
    const app = usePageStore(state => state.platform);
    const rtl = usePageStore(state => state.rtl);
    const translate = useTranslationsStore(state => state.translate);
    const [localValue, setValue] = useState<string>('');

    useEffect(() => {
        setValue(value);
    }, [value]);

    const handleValueChange = (value: string) => {
        setValue(value);
    };

    const handleBlur = () => {
        translate({ app, lang, group: jsonGroup, key: jsonKey, translation: localValue });
    };

    return (
        <Editable
            value={localValue}
            placeholder='Enter your translation'
            onChange={handleValueChange}
            onBlur={handleBlur}
            dir={rtl ? 'rtl' : 'ltr'}
            sx={{
                //add custom placeholder styles
                "&::placeholder": {
                    color: "gray.100",
                    opacity: 1, // Override Firefox's unusual default opacity
                },
                //add custom styles for the editable preview
                ".chakra-editable__preview": {
                    //add custom styles for the editable preview
                    fontWeight: localValue ? "bold" : "normal",
                    // fontSize: "2xl",
                    color: localValue ? 'inherit' : "gray.400",
                    lineHeight: "shorter",
                },
                //add custom styles for the editable input
                ".chakra-editable__input": {
                    // fontWeight: "bold",
                    // fontSize: "2xl",
                    lineHeight: "shorter",
                },
            }}
        >
            <EditablePreview />
            <EditableTextarea />
        </Editable>
    );
}
