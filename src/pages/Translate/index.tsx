import { Container, Flex, Code, Spacer, Button } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import { useTranslationsStore } from "src/store/TranslationStore";
import { usePageStore } from "src/store/PageStore";
import { generateTranslateFile } from 'src/utilities/buildTranslationStructure';

import ManifestoEditor from './ManifestoEditor';
import DataTableEditor from "./DataTableEditor";
import Steps from './steps';

export default function TranslatePage() {

    const translation = useTranslationsStore(state => state.translation);
    const locked = usePageStore(state => state.translate_controls_locked);
    const handleExport = () => generateTranslateFile(translation);

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
            >
                <Code m={2} colorScheme="green">
                    Your work is locally saved automatically. You can close the browser and come back later to continue working.
                </Code>
                <Spacer />
                <Button
                    isDisabled={!locked}
                    variant={'solid'}
                    colorScheme={'yellow'}
                    size={'sm'}
                    mr={4}
                    leftIcon={<ExternalLinkIcon />}
                    onClick={handleExport}
                >
                    Export
                </Button>
            </Flex>
            {translation.application === 'manifesto' ? <ManifestoEditor /> : <DataTableEditor data={translation} />}
        </Container>
    );
}