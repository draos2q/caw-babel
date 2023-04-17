import { Flex, Container, Heading, Stack, Text } from '@chakra-ui/react';

export default function AboutPage() {

    return (
        <Container maxW={"3xl"}>
            <Stack
                textAlign={'center'}
                align={'center'}
                alignItems={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
            >
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}>
                    For the people{' '}
                    <Text as={'span'} color={'green.400'}>
                        By the people
                    </Text>
                </Heading>

                <Stack spacing={6} direction={'row'}>
                    <Heading
                        size={'lg'}
                        color={'gray.500'}
                        maxW={'3xl'}
                    >
                        A community-driven project to bring freedom, self-awareness, and privacy to the masses.
                    </Heading>
                </Stack>
                <Flex
                    id="video-container"
                    w={'full'}
                    h={'full'}
                    align={'center'}
                    flexDirection={'column'}
                >
                    <video
                        autoPlay
                        loop
                        muted
                        controls
                        src="./assets/media/promo.mp4"
                        width="560"
                        height="315"
                    />
                </Flex>
            </Stack>
        </Container >
    );
}
