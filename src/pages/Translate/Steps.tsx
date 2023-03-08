import { Box, Button, Card, HStack, Select, Stack, Text, VStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { CawPlatform } from 'src/components/CawPlatform';
import { useTranslationsStore } from '~/src/store';

export function Steps() {

    const language = useTranslationsStore(state => state.translateToLanguage)
    const languages = useTranslationsStore(state => state.languages)
    const setLanguage = useTranslationsStore(state => state.setTranslateToLanguage)

    return (
        <Stack
            spacing={4}
            align={'center'} mb={8}
            direction={{ base: 'column', md: 'row' }}
        >
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
                                width={"full"}
                                placeholder="Select option"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                {languages.map((lang) => (<option key={lang.code} value={lang.code}>{lang.nativeName}</option>))}
                            </Select>
                            <Text as="span"> or </Text>
                            <Button
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
                        <Button
                            variant={"solid"}
                        >
                            Load translations
                        </Button>
                    </VStack>
                </Box>
            </Card>
        </Stack>
    );
}
