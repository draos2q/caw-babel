import { useRef } from 'react';
import { Box, Button, Card, HStack, Select, Stack, Text, VStack, useToast } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { CawPlatform } from 'src/components/CawPlatform';
import { usePageStore } from 'src/store/PageState';
import useWindowSize from 'src/hooks/useWindowSize';
import { useTranslationsStore } from 'src/store';

export function LoadTranslationButton() {

    const locked = usePageStore(state => state.translate_controls_locked);
    const setLocked = usePageStore(state => state.setTranslateControlsLocked);
    const toast = useToast();

    const handleLoadTranslations = () => {
        try {

            setLocked(true);
        }
        catch (error: any) {
            toast.closeAll();
            toast({
                title: " Error loading translations",
                description: error?.message || 'Something went wrong',
            });
        }
    }

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

type OverlayComponentForStepsProps = {
    stackRef: React.RefObject<HTMLDivElement>;
}
function OverlayComponentForSteps({ stackRef }: OverlayComponentForStepsProps) {
    // console.log("🚀 ~ file: Steps.tsx:46 ~ OverlayComponentForSteps ~ stackRef:", stackRef)

    //* Render the overlay component when window size changes
    const { width, height } = useWindowSize();
    const stackwidth = stackRef?.current?.offsetWidth || width;
    const stackHeight = stackRef?.current?.offsetHeight || height;

    const el = document.getElementById("translate-steps");
    console.log("🚀 ~ file: Steps.tsx:46 ~ OverlayComponentForSteps ~ el:", el)
    const locked = usePageStore(state => state.translate_controls_locked);
    const setLocked = usePageStore(state => state.setTranslateControlsLocked);

    return (
        <VStack
            zIndex={100}
            position="absolute"
            bg="yellow.200"
            visibility={locked ? "visible" : "hidden"}
            spacing={4}
            align={'center'}
            alignItems="center"
            alignContent={"center"}
            textAlign="center"
            verticalAlign={"middle"}
            direction={{ base: 'column', md: 'row' }}
            opacity={0.95}
            borderRadius="md"
            width="full"
            height="full"
            p={5}
        // minWidth={stackwidth}
        // minHeight={stackHeight}
        >
            <Text as="b">
                This section has been locked to avoid unintended changes while you are translating. <br />Unlock it to make changes
            </Text>
            <Button variant={"outline"} colorScheme="yellow" onClick={() => setLocked(false)}>
                Unlock
            </Button>
        </ VStack>
    );
}

export function Steps() {

    const language = useTranslationsStore(state => state.translateToLanguage);
    const languages = useTranslationsStore(state => state.languages);
    const setLanguage = useTranslationsStore(state => state.setTranslateToLanguage);
    const locked = usePageStore(state => state.translate_controls_locked);
    const stackRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <Stack
                id="translate-steps"
                spacing={4}
                align={'center'}
                mb={8}
                direction={{ base: 'column', md: 'row' }}
                position={"relative"}
                // opacity={locked ? 0.5 : 1}
                ref={stackRef}
            >
                <OverlayComponentForSteps
                    stackRef={stackRef}
                />
                <Card>
                    <Stack spacing={2} align={'center'} pt={2}>
                        <Box p={4} minH="28" pt={2}>
                            <Text as="b">
                                1. Choose the platform you want to help translate
                            </Text>
                            <CawPlatform />
                        </Box>
                    </Stack>
                </Card>
                <Card>
                    <Stack spacing={2} align={'center'}>
                        <Box p={4} minH="28">
                            <Text as="b">
                                2. Choose the language you want to translate to
                            </Text>
                            <HStack spacing={2} align={'center'} pt={2}>
                                <Select
                                    isDisabled={locked}
                                    width={"full"}
                                    placeholder="Select option"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                >
                                    {languages.map((lang) => (<option key={lang.code} value={lang.code}>{lang.nativeName}</option>))}
                                </Select>
                                <Text as="span"> or </Text>
                                <Button
                                    isDisabled={locked}
                                    variant={'outline'}
                                    rightIcon={<AddIcon />}
                                >
                                    Add
                                </Button>
                            </HStack>
                        </Box>
                    </Stack>
                </Card>
                <Card>
                    <Box p={4} minH="28">
                        <VStack spacing={2} align={'center'}>
                            <Text as="b">
                                3. Press the button to load previous translations
                            </Text>
                            < LoadTranslationButton />
                        </VStack>
                    </Box>
                </Card>
            </Stack>
        </>
    );
}
