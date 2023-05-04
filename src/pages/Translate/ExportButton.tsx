import {
    Button, Heading, VStack, Text,
    Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton,
    useDisclosure,
    Stack,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import { Translation } from "src/types";
// import ContributorForm from 'src/components/ContributorForm';
// import WrapperFadeAnimation from 'src/components/WrapperFade';
import { generateTranslateFile } from 'src/utilities/buildTranslationStructure';



type Props = {
    translation: Translation
    disabled: boolean;
}

export default function ExportButton({ disabled, translation }: Props) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    // const { isOpen: showForm, onOpen: openForm, onClose: closeForm } = useDisclosure();

    const handleExport = () => {
        generateTranslateFile(translation);
    };

    return (
        <>
            <Button
                isDisabled={disabled}
                variant={'solid'}
                colorScheme={'yellow'}
                size={'sm'}
                mr={4}
                leftIcon={<ExternalLinkIcon />}
                onClick={onOpen}
            >
                Export
            </Button>
            <Modal
                isCentered
                isOpen={isOpen}
                onClose={onClose}
                size="lg"
                autoFocus={false}
            >
                <ModalOverlay />
                <ModalContent
                    pt={5}
                    pb={5}
                >
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack
                            gap={4}
                        >
                            <Heading
                                as='h3'
                                size='md'
                                color='green.500'
                            >
                                Thank you for your contribution, Builder!
                            </Heading>
                            <Stack
                                direction={{ base: 'column', md: 'row' }}
                            >
                                <Button
                                    variant={'solid'}
                                    colorScheme={'green'}
                                    size={'md'}
                                    minW={{ base: '100%', md: 'initial' }}
                                    mr={4}
                                    leftIcon={<ExternalLinkIcon />}
                                    onClick={handleExport}
                                >
                                    Download
                                </Button>
                                {/* <Button
                                    variant={'outline'}
                                    colorScheme={'green'}
                                    size={'md'}
                                    minW={{ base: '100%', md: 'initial' }}
                                    mr={4}
                                    onClick={showForm ? closeForm : openForm}
                                >
                                    {showForm ? 'Hide ...' : 'More ...'}
                                </Button> */}
                            </Stack>
                            <Text
                                fontSize={{ base: 'sm', md: 'md' }}
                                colorScheme={'gray'}
                            >
                                Please download the file and send it to us by any means you prefer.
                            </Text>
                            {/* <WrapperFadeAnimation
                                show={showForm}
                                exitDuration={0.5}
                            >
                                <ContributorForm />
                            </WrapperFadeAnimation> */}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}