import { Container, Flex, Code, Spacer } from '@chakra-ui/react';

import { useTranslationsStore } from "src/store/TranslationStore";
import { usePageStore } from "src/store/PageStore";


import ManifestoEditor from './ManifestoEditor';
import DataTableEditor from "./DataTableEditor";
import ExportButton from "./ExportButton";
import Steps from './steps';

export default function TranslatePage() {

    const translation = useTranslationsStore(state => state.translation);
    const locked = usePageStore(state => state.translate_controls_locked);

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