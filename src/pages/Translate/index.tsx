import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import { Container, Divider, Flex, Spacer, Stack } from '@chakra-ui/react';

import { DataTable } from "src/components/DataTable";
import { downloadFilefromGithub } from 'src/utilities/downloadFileFromGithub';
import { useTranslationsStore } from 'src/store';
import { Steps } from './Steps';

export default function TranslatePage() {

    const { app, englishTranslations, setEnglishTranslations } = useTranslationsStore(
        (state) => ({
            app: state.application,
            englishTranslations: state.englishTranslations,
            setEnglishTranslations: state.prepareEnglishTranslations,
        }),
        shallow
    );

    useEffect(() => {

        if (englishTranslations.diccionary && Object.keys(englishTranslations.diccionary).length > 0 && englishTranslations.application === app)
            return;

        const download = async () => {
            try {
                const data = await downloadFilefromGithub(app);
                setEnglishTranslations(app, data);
            }
            catch (error) {
                console.error(error);
            }
        }

        download();

    }, [app]);

    return (
        <Container maxW='full' >
            <Flex
                direction={"column"}
                alignItems='center'
                gap='2'
            >
                <Steps />
                <Divider variant="dashed" />
                <Stack spacing={4} align={'center'} mb={8}>
                    <DataTable />
                </Stack>
            </Flex>
        </Container>
    );
}