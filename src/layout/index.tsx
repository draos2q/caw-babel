import { ReactNode } from 'react';
import { Box, Flex, HStack, Link, IconButton, Button, Stack, Image, useDisclosure, useColorModeValue, useColorMode } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon, MoonIcon, SunIcon, ExternalLinkIcon } from '@chakra-ui/icons';

import { usePageStore, Page } from '../store/PageState';

type Link = {
    label: string;
    icon?: string;
    link?: string;
    page?: Page;
}

const Links: Link[] = [
    { label: 'View Constributors', icon: '', link: '', page: 'contributors' },
    { label: 'Start Translating', icon: '', link: '', page: 'translations' },
    { label: 'Visit GitHub', icon: 'github', link: 'https://github.com/cawdevelopment' },
];

const NavLink = ({ href, children, onClick }: { href?: string, children: ReactNode, onClick: () => void }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        onClick={onClick}
        href={href || '#'}
        target={href ? '_blank' : undefined}
    >
        {children}
    </Link>
);

type MainLayoutProps = {
    children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const setPage = usePageStore((state) => state.setPage);
    const currentPage = usePageStore((state) => state.page);
    const bg = useColorModeValue('gray.100', 'gray.900')

    const handleClick = (link: Link) => () => {
        if (link.page) {
            setPage(link.page);
        }
    }

    return (
        <>
            <Box
                bg={bg}
                px={4}
            >
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>
                            <Image
                                borderRadius='full'
                                boxSize='50px'
                                objectFit='cover'
                                alt='Builders Logo'
                                src='./builders-logo.jpeg'
                            >

                            </Image>
                        </Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink
                                    key={link.label}
                                    href={link.link}
                                    onClick={handleClick(link)}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex
                        alignItems={'center'}
                        gap={2}
                    >
                        <Button
                            variant={'solid'}
                            colorScheme={'teal'}
                            size={'sm'}
                            mr={4}
                            leftIcon={<AddIcon />}
                            visibility={currentPage === 'translations' ? 'visible' : 'hidden'}
                        >
                            Save
                        </Button>

                        <Button
                            variant={'solid'}
                            colorScheme={'yellow'}
                            size={'sm'}
                            mr={4}
                            leftIcon={<ExternalLinkIcon />}
                            visibility={currentPage === 'translations' ? 'visible' : 'hidden'}
                        >
                            Export
                        </Button>
                        <Button onClick={toggleColorMode}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>

                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink
                                    key={link.label}
                                    onClick={handleClick(link)}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            <Box p={4}>
                {children}
            </Box>
        </>
    );
}