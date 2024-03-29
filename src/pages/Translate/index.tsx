import { Container, Flex, Code, Spacer } from '@chakra-ui/react';

import { useTranslationsStore } from "src/store/TranslationStore";
import { usePageStore } from "src/store/PageStore";

import ManifestoEditor from './ManifestoEditor';
import DataTableEditor from "./DataTableEditor";
import ExportButton from "./ExportButton";
import { AnimatePage } from "./AnimatePage";
import Steps from './steps';

export default function TranslatePage() {

    const translation = useTranslationsStore(state => state.translation);
    const app = usePageStore(state => state.platform);
    const locked = usePageStore(state => state.translate_controls_locked);

    const pending = translation.diccionary.reduce((acc, curr) => {
        if (!curr.translated_value) {
            acc++;
        }
        return acc;
    }, 0);


    return (
        <Container maxW='full' h="full" >
            <Flex
                direction={"column"}
                alignItems='center'
                gap='2'
            >
                <Steps />
            </Flex>
            <Flex
                alignItems="center"
                justifyContent={'space-between'}
                direction={{ base: "column", md: "row" }}
                gap="2"
                pt={2}
                pb={2}
                visibility={locked ? "visible" : "hidden"}
            >
                <Code m={2} colorScheme="green">
                    Your work is locally saved automatically. You can close the browser and come back later to continue working.
                </Code>
                <Spacer />
                {app !== 'manifesto' && (
                    <>
                        <Code m={2}
                            colorScheme={pending === 0 ? "green" : "gray"}
                        >
                            {pending === 0 ? 'All translations are done!' : `${pending}/${translation.diccionary.length} translations pending`}
                        </Code>
                        <AnimatePage pending={pending} />
                    </>
                )}
                <ExportButton
                    disabled={!locked}
                    translation={translation}
                />
            </Flex>
            {locked ? (translation.application === 'manifesto' ? <ManifestoEditor /> : <DataTableEditor data={translation} />) :
                <p>
                    <b>Note:</b> Please select an application and a language to start translating.
                </p>
            }
        </Container>
    );
}