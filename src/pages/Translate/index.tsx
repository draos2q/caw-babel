import { Container, Divider, Flex } from '@chakra-ui/react';

import { useTranslationsStore } from "src/store/TranslationStore";
import DataTable from "./DataTable";
import Steps from './steps';

export default function TranslatePage() {

    const translation = useTranslationsStore(state => state.translation);

    return (
        <Container maxW='full' h="full" >
            <Flex
                direction={"column"}
                alignItems='center'
                gap='2'
            >
                <Steps />
                <Divider variant="dashed" />
            </Flex>
            <DataTable data={translation} />
        </Container>
    );
}