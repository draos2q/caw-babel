import { Button, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { usePageStore } from '~/src/store/PageStore';
import { CAW_APPS_OPTIONS } from '~/src/types';
import languages from '~/src/utilities/languages';

export default function OverlayComponentForSteps() {

    const textColor = useColorModeValue('gray.800', 'gray.200');
    const bgColor = useColorModeValue('yellow.200', 'yellow.900');
    const locked = usePageStore(state => state.translate_controls_locked);
    const lang = usePageStore(state => state.language);
    const app = usePageStore(state => state.platform);
    const appName = CAW_APPS_OPTIONS.find(a => a.app === app)?.name || app;
    const langName = languages.find(l => l.code === lang)?.name || lang;
    const setLocked = usePageStore(state => state.setTranslateControlsLocked);

    return (
        <VStack
            zIndex={100}
            position="absolute"
            bg={bgColor}
            visibility={locked ? "visible" : "hidden"}
            spacing={2}
            align={'center'}
            alignItems="center"
            alignContent={"center"}
            textAlign="center"
            verticalAlign={"middle"}
            direction={{ base: 'column', md: 'row' }}
            opacity={0.97}
            borderRadius="md"
            width="full"
            height="full"
            p={5}
        >
            <Text as="b" color={textColor}>
                This section has been locked to avoid unintended changes while you are translating.
            </Text>
            <Button variant={"outline"} colorScheme="yellow" onClick={() => setLocked(false)}>
                Unlock
            </Button>
            <Text color={textColor}>
                You are translating :  <b>{appName}</b> to <b>{langName}</b>
            </Text>
        </VStack>
    );
}
