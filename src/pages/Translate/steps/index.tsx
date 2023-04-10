import { Box, Card, HStack, Stack, Text, VStack } from '@chakra-ui/react';

import PlatformController from './PlatformController';
import LanguageController from './LanguageController';
import OverlayComponentForSteps from './OverlayComponentForSteps';
import LoadTranslationButton from './LoadTranslationButton';

export default function Steps() {
    return (
        <>
            <Stack
                id="translate-steps"
                spacing={4}
                align={'center'}
                mb={8}
                direction={{ base: 'column', md: 'row' }}
                position={"relative"}
            >
                <OverlayComponentForSteps />
                <Card>
                    <Stack spacing={2} align={'center'} pt={2}>
                        <Box p={4} minH="28" pt={2}>
                            <Text as="b">
                                1. Choose the platform you want to help translate
                            </Text>
                            <PlatformController />
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
                                <LanguageController />
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
