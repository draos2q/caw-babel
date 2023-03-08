import { CAW_APP } from '../types';

export async function downloadFilefromGithub(app: CAW_APP) {

    let url = '';
    let contentTypes = '';

    switch (app) {
        case 'clearing-house':
            url = `https://raw.githubusercontent.com/draos2q/caw-front/main/src/locales/en.json`;
            contentTypes = 'application/json';
            break;
        case 'website':
            url = `https://raw.githubusercontent.com/draos2q/caw-site/main/assets/lang/i18n.en.json`;
            contentTypes = 'application/json';
            break;
        case 'manifesto':
            url = `https://raw.githubusercontent.com/draos2q/caw-site/main/assets/lang/manifesto.en.txt`;
            contentTypes = 'text/plain';
    }

    if (!url)
        throw new Error(`There is no url for : ${app}`);

    const data = await fetch(url);
    if (!data.ok)
        throw new Error(`There is no data for : ${app}`);

    switch (contentTypes) {
        case 'application/json':
            const json = await data.json();
            return json;
        case 'text/plain':
            const text = await data.text();
            return text;
    }

    throw new Error(`There is no content type for : ${app}`);
}
