import { Center, Spacer, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import WelcomeBuilder from "../components/WelcomeBuilder";

export default function Contributors() {

    return (
        <>
            <Stack spacing={4} align={'center'} mb={8}>
                <Spacer h="2xs" />
                <WelcomeBuilder />
                <Spacer h="2xs" />
                <Wrap>
                    <WrapItem>
                        <Center w='180px' h='80px' bg='red.200'>
                            Box 1
                        </Center>
                    </WrapItem>
                    <WrapItem>
                        <Center w='180px' h='80px' bg='green.200'>
                            Box 2
                        </Center>
                    </WrapItem>
                    <WrapItem>
                        <Center w='180px' h='80px' bg='tomato'>
                            Box 3
                        </Center>
                    </WrapItem>
                    <WrapItem>
                        <Center w='180px' h='80px' bg='blue.200'>
                            Box 4
                        </Center>
                    </WrapItem>
                </Wrap>
            </Stack>
        </>
    );
}