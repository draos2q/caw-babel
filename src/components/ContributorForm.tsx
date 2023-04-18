import { Button, FormControl, Flex, Heading, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react';

export default function ContributorForm(): JSX.Element {

    const bgFlex = useColorModeValue('gray.50', 'gray.700');
    const bgStack = useColorModeValue('white', 'gray.800');

    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={bgFlex}
            p={2}
        >
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={bgStack}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}
            >
                <Heading
                    lineHeight={1.1}
                    fontSize={{ base: 'xl', md: '3xl' }}
                    textAlign={'center'}
                >
                    Optional
                </Heading>
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                    Let us know who is helping to spread the word!
                </Text>
                <FormControl id="name">
                    <Input
                        placeholder="Your Name/Handle"
                        _placeholder={{ color: 'gray.400' }}
                        type="text"
                    />
                </FormControl>
                <FormControl id="profile">
                    <Input
                        placeholder="Your Profile Link"
                        _placeholder={{ color: 'gray.400' }}
                        type="text"
                    />
                </FormControl>
                <Stack spacing={6}>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}