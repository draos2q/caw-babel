import { CAW_APP } from 'src/types';

export function getFilesPerApp(app: CAW_APP, languageIsoCode: string) {
    let url = '';
    let contentTypes = '';

    switch (app) {
        case 'clearing-house':
            url = `https://raw.githubusercontent.com/draos2q/caw-front/main/src/locales/${languageIsoCode}.json`;
            contentTypes = 'application/json';
            break;
        case 'website':
            url = `https://raw.githubusercontent.com/draos2q/caw-site/main/assets/lang/i18n.${languageIsoCode}.json`;
            contentTypes = 'application/json';
            break;
        case 'manifesto':
            url = `https://raw.githubusercontent.com/draos2q/caw-site/main/assets/lang/manifesto.${languageIsoCode}.txt`;
            contentTypes = 'text/plain';
    }

    return {
        url,
        contentTypes
    };
}

export async function downloadFilefromGithub(app: CAW_APP, languageIsoCode: string) {

    let { url, contentTypes } = getFilesPerApp(app, languageIsoCode);
    if (!url) {
        return {
            error: true,
            message: `There is no url for : ${app}`,
            data: null
        }
    }

    const response = await fetch(url);
    if (!response.ok) {
        return {
            error: true,
            message: `There is no data for : ${app} and language: ${languageIsoCode}`,
            data: null
        }
    }

    let translation = null;
    switch (contentTypes) {
        case 'application/json':
            translation = await response.json();
            break;
        case 'text/plain':
            translation = await response.text();
            break;
        default:
            {
                return {
                    error: true,
                    message: `There is no content type for : ${app}`,
                    data: null
                }
            }
    }

    if (!translation) {
        return {
            error: true,
            message: `There is no data for : ${app} and language: ${languageIsoCode}`,
            data: null
        }
    }

    return {
        error: false,
        message: '',
        data: translation
    }
}
