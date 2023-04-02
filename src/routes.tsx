import { lazy } from "react";
import { RouteObject } from 'react-router-dom';

const NOT_FOUND_PAGE = lazy(() => import('./pages/Page404'));
const TRANSLATE_PAGE = lazy(() => import('./pages/Translate'));
const CONTRIBUTORS_PAGE = lazy(() => import('./pages/Contributors'));
const ABOUT_PAGE = lazy(() => import('./pages/About'));

export const PATH = {
    HOME: '/',
    TRANSLATE: 'translate',
    CONTRIBUTORS: 'contributors',
    ABOUT: 'about',
}

export const routes: RouteObject[] = [
    {
        path: PATH.HOME,
        index: true,
        element: <TRANSLATE_PAGE />,
    },
    {
        path: '/translate',
        index: true,
        element: <TRANSLATE_PAGE />,
    },
    {
        path: '/contributors',
        index: true,
        element: <CONTRIBUTORS_PAGE />,
    },
    {
        path: '/about',
        index: true,
        element: <ABOUT_PAGE />,
    },
    {
        path: '*',
        index: true,
        element: <NOT_FOUND_PAGE />,
    },
];
