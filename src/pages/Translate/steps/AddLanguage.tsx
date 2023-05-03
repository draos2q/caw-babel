import {
    Button, Box, Stack, HStack, FormControl, FormLabel, Input, RadioGroup, Radio, useDisclosure, useControllableState, useToast,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { usePageStore } from 'src/store/PageStore';
import { LanguageModel } from "src/types";
import { addLanguageToLocalStorage } from 'src/services/Languages'


export function AddLanguageLocally() {

    const [ code, setCode ] = useControllableState({ defaultValue: '' })
    const [ name, setName ] = useControllableState({ defaultValue: '' })
    const [ nativeName, setNativeName ] = useControllableState({ defaultValue: '' })
    const [ isRTL, setIsRTL ] = useControllableState({ defaultValue: 'false' })
    const toast = useToast()

    const locked = usePageStore(state => state.translate_controls_locked);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleAddLanguage = () => {

        const lang: LanguageModel = {
            code,
            name,
            nativeName,
            rtl: Boolean(isRTL)
        };

        console.log(lang);

        const added = addLanguageToLocalStorage(lang);

        if (added) {
            toast.closeAll();
            toast({
                title: 'Language added',
                description: `You can now select ${lang.nativeName} from the list`,
                status: 'success',
                isClosable: true,
            });

            onClose();
        }
        else {
            toast.closeAll();
            toast({
                title: 'Could not add language',
                status: 'warning',
                description: `The language ${lang.nativeName} already exists`,
                isClosable: true,
            });
        }
    }

    return (
        <>
            <Button
                width={"full"}
                isDisabled={locked}
                variant={'outline'}
                rightIcon={<AddIcon />}
                onClick={onOpen}
            >
                Add
            </Button>
            <Modal
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
                autoFocus={false}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Include your language
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <Stack spacing={4}>
                                <FormControl id="email">
                                    <FormLabel>Code</FormLabel>
                                    <Input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Name</FormLabel>
                                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                </FormControl>
                                <FormControl id="native-name">
                                    <FormLabel>How is it written in your language?</FormLabel>
                                    <Input type="text" value={nativeName} onChange={(e) => setNativeName(e.target.value)} />
                                </FormControl>
                                <FormControl as='fieldset'>
                                    <FormLabel as='legend'>
                                        Is it a right-to-left language?
                                    </FormLabel>
                                    <RadioGroup value={isRTL} onChange={(val) => setIsRTL(val)}>
                                        <HStack spacing='24px'>
                                            <Radio value='true'>Yes</Radio>
                                            <Radio value='false'>No</Radio>
                                        </HStack>
                                    </RadioGroup>
                                </FormControl>
                            </Stack>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='ghost'
                            mr={3}
                            onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            variant='outline'
                            colorScheme='green'
                            onClick={handleAddLanguage}
                        >
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}