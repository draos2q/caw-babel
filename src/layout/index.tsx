import { ReactNode } from 'react';
import { Link as ReactLink, useLocation } from 'react-router-dom';
import { Box, Flex, HStack, Link, IconButton, Button, Stack, Image, useDisclosure, useColorModeValue, useColorMode } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

import { PATH } from 'src/routes';

type linkModel = {
    label: string;
    icon?: string;
    external?: boolean;
    link: string;
}

const links: linkModel[] = [
    { label: 'View Constributors', icon: '', link: PATH.CONTRIBUTORS },
    { label: 'Start Translating', icon: '', link: PATH.TRANSLATE },
    { label: 'About', icon: '', link: PATH.ABOUT },
    { label: 'Paper', icon: 'github', link: 'https://caw.is', external: true },
    { label: 'Visit GitHub', icon: 'github', link: 'https://github.com/cawdevelopment', external: true },
];

const NavLink = ({ href, target, bg: selectedBg, onClick, children }: { href: string, bg: string, target: string, children: ReactNode, onClick?: () => void }) => {
    const bg = useColorModeValue('gray.200', 'gray.700');
    return (
        <Link
            bg={selectedBg}
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg,
            }}
            as={ReactLink}
            to={href}
            target={target}
            onClick={onClick}
        >
            {children}
        </Link>
    )
};

type MainLayoutProps = {
    children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const { pathname } = useLocation()
    const currentPage = pathname.split('/')[1];
    const bg = useColorModeValue('gray.100', 'gray.900');
    const selectedBg = useColorModeValue('gray.300', 'gray.700');

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
                            {links.map((link) => (
                                <NavLink
                                    bg={currentPage === link.link ? selectedBg : ''}
                                    key={link.label}
                                    href={link.link}
                                    target={link.external ? '_blank' : '_self'}
                                    onClick={onClose}
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
                        <Button onClick={toggleColorMode}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>

                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {links.map((link) => (
                                <NavLink
                                    bg={currentPage === link.link ? selectedBg : ''}
                                    key={link.label}
                                    href={link.link}
                                    target={link.external ? '_blank' : '_self'}
                                    onClick={onClose}
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