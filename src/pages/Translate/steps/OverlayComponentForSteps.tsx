import { Button, Text, VStack } from '@chakra-ui/react';
import { usePageStore } from '~/src/store/PageStore';
import { CAW_APPS_OPTIONS } from '~/src/types';
import languages from '~/src/utilities/languages';

export default function OverlayComponentForSteps() {

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
            bg="yellow.200"
            visibility={locked ? "visible" : "hidden"}
            spacing={2}
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
        >
            <Text as="b">
                This section has been locked to avoid unintended changes while you are translating.
            </Text>
            <Button variant={"outline"} colorScheme="yellow" onClick={() => setLocked(false)}>
                Unlock
            </Button>
            <Text>
                You are translating <b>{appName}</b> to <b>{langName}</b>
            </Text>
        </VStack>
    );
}
