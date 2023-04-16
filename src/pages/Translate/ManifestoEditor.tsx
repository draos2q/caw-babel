import { useRef } from 'react';
import { Box, Heading, Stack, Textarea, useColorModeValue } from "@chakra-ui/react";
import SplitPane from 'react-split-pane-next';

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
            // color={textColor}
            bg={bg}
            ref={textArea1Ref}
            onScroll={handleTextArea1Scroll}
            value={text}
        />
    );
}

export default function ManifestoEditor() {

    console.log('render.ManifestoEditor');
    const textArea1Ref = useRef<HTMLTextAreaElement>(null);
    const textArea2Ref = useRef<HTMLTextAreaElement>(null);
    const translation = useTranslationsStore(state => state.translation);

    return (
        <Stack
            id='stack-manifesto-editor'
            h="container.xl"
            // borderWidth={'thin'}
            // borderColor={'gray.200'}
            // borderStyle={'dotted'}
            padding={2}
            direction={{ base: "column", md: "row" }}
        >
            <SplitPane
                id="split-pane"
                split="vertical"
                allowResize={true}
                primary="second"
                defaultSize="50%"
                resizerStyle={{ backgroundColor: 'red' }}
            >
                <Box height={'100%'} >
                    <Heading size={'md'}>
                        ENGLISH CONTENT
                    </Heading>
                    <ReadOnlyTextArea
                        text={translation.diccionary[0].value}
                        textArea1Ref={textArea1Ref}
                        textArea2Ref={textArea2Ref}
                    />
                </Box>
                <Box height={'100%'} >
                    <Heading size={'md'}>
                        CONTENT IN YOUR LANGUAGE
                    </Heading>
                    <EditableTextArea
                        textArea1Ref={textArea1Ref}
                        textArea2Ref={textArea2Ref}
                    />
                </Box>
            </SplitPane>
        </Stack>
    );
}