import "allotment/dist/style.css";
import { useRef } from 'react';
import { Heading, Stack, Textarea, useColorModeValue } from "@chakra-ui/react";
import { Allotment } from "allotment";

import { useTranslationsStore } from 'src/store/TranslationStore';
import { usePageStore } from 'src/store/PageStore';

type EditableTextAreaProps = {
    textArea1Ref: React.RefObject<HTMLTextAreaElement>;
    textArea2Ref: React.RefObject<HTMLTextAreaElement>;
}

function EditableTextArea(props: EditableTextAreaProps) {

    const bg = useColorModeValue('white.50', 'gray.800');
    const { textArea1Ref, textArea2Ref } = props;
    const translation = useTranslationsStore(state => state.translation);
    const lang = usePageStore(state => state.language);
    const app = usePageStore(state => state.platform);
    const translate = useTranslationsStore(state => state.translate);

    const handleTextChange = (text: string) => {
        translate({ app, lang, group: 'main', key: 'manifesto', translation: text });
    }

    const handleTextArea2Scroll = () => {
        if (textArea1Ref.current && textArea2Ref.current) {
            textArea1Ref.current.scrollTo({
                top: textArea2Ref.current.scrollTop,
                left: textArea1Ref.current.scrollLeft,
                behavior: 'auto'
            })
        }
    };

    return (
        <Textarea
            id='translation-textarea'
            height={'100%'}
            readOnly={false}
            ref={textArea2Ref}
            bg={bg}
            onScroll={handleTextArea2Scroll}
            value={translation.diccionary[0].translated_value}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder='Start typing your translation here'
        />
    );
}

type ReadOnlyTextAreaProps = {
    text: string;
    textArea1Ref: React.RefObject<HTMLTextAreaElement>;
    textArea2Ref: React.RefObject<HTMLTextAreaElement>;
}

function ReadOnlyTextArea({ text, textArea1Ref, textArea2Ref }: ReadOnlyTextAreaProps) {

    const bg = useColorModeValue('gray.50', 'gray.800');

    const handleTextArea1Scroll = () => {
        if (textArea2Ref.current && textArea1Ref.current)
            textArea2Ref.current.scrollTo({
                top: textArea1Ref.current.scrollTop,
                left: textArea2Ref.current.scrollLeft,
                behavior: 'auto'
            })
    };

    return (
        <Textarea
            readOnly={true}
            id='original-textarea'
            height={'100%'}
            bg={bg}
            ref={textArea1Ref}
            onScroll={handleTextArea1Scroll}
            value={text}
        />
    );
}

export default function ManifestoEditor() {

    const textArea1Ref = useRef<HTMLTextAreaElement>(null);
    const textArea2Ref = useRef<HTMLTextAreaElement>(null);
    const translation = useTranslationsStore(state => state.translation);

    return (
        <Stack
            id='stack-manifesto-editor'
            h="container.xl"
            borderWidth={'thin'}
            borderColor={'gray.200'}
            borderStyle={'dotted'}
            direction={{ base: "column", md: "row" }}
        >
            <Allotment
                separator={true}
                snap={true}
            >
                <Allotment.Pane
                    minSize={200}
                >
                    <Heading size={'md'}>
                        ENGLISH CONTENT
                    </Heading>
                    <ReadOnlyTextArea
                        text={translation.diccionary[0].value}
                        textArea1Ref={textArea1Ref}
                        textArea2Ref={textArea2Ref}
                    />
                </Allotment.Pane>
                <Allotment.Pane
                    minSize={200}
                >
                    <Heading size={'md'}>
                        CONTENT IN YOUR LANGUAGE
                    </Heading>
                    <EditableTextArea
                        textArea1Ref={textArea1Ref}
                        textArea2Ref={textArea2Ref}
                    />
                </Allotment.Pane>
            </Allotment>
        </Stack>
    );
}