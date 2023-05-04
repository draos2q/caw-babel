import { Button, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { usePageStore } from '~/src/store/PageStore';
import { CAW_APPS_OPTIONS } from '~/src/types';
import { getAllLanguages } from 'src/services/Languages';
import { confirmAlert } from "~/src/utilities/SweetAlert";

export default function OverlayComponentForSteps() {

    const textColor = useColorModeValue('gray.800', 'gray.200');
    const bgColor = useColorModeValue('yellow.200', 'yellow.900');
    const locked = usePageStore(state => state.translate_controls_locked);
    const lang = usePageStore(state => state.language);
    const app = usePageStore(state => state.platform);
    const appName = CAW_APPS_OPTIONS.find(a => a.app === app)?.name || app;
    const langName = getAllLanguages().find(l => l.code === lang)?.name || lang;
    const setLocked = usePageStore(state => state.setTranslateControlsLocked);


    const handleUnlock = async () => {

        const prompt = await confirmAlert({
            title: 'Confirm',
            text: 'Are you sure you want to unlock the controls?',
            footer: 'This will clean up the translation data and allow you to change the language and app, your progress is saved and will be resumed when you come back to this set of translations.',
            cancelLabel: 'No, Continue translating',
            confirmLabel: 'Yes, Unlock'
        });

        if (prompt.isConfirmed)
            setLocked(false);
    }

    return (
        <VStack
            zIndex={10}
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
            <Button variant={"outline"} colorScheme="yellow" onClick={handleUnlock}>
                Unlock
            </Button>
            <Text color={textColor}>
                You are translating :  <b>{appName}</b> to <b>{langName}</b>
            </Text>
        </VStack>
    );
}
