import download from 'downloadjs';

import { getFilesPerApp } from 'src/utilities/downloadFileFromGithub';
import { CAW_APP, Translation } from "src/types";
import { sluglify } from './helper';

export function buildFromPlainText(app: CAW_APP, language: string, data: any): Translation {

    const translation: Translation = {
        application: app,
        language: language,
        diccionary: [{
            group: 'main',
            key: 'manifesto',
            value: data,
            translated_value: "",
            alert: 'none'
        }],
    };

    return translation;
}

export function buildFromFlattedStructure(app: CAW_APP, language: string, data: any) {

    let translation: Translation = {
        application: app,
        language: language,
        diccionary: [],
    };

    //* having the data in flat json, we need to build the nested structure : {key : value, key : value, ...}
    for (const key in data) {
        const value = data[key];
        // translation.diccionary.group.values[key] = value;
        translation.diccionary.push({
            group: 'main',
            key: key,
            value: value,
            translated_value: "",
            alert: value.includes('{') || value.includes('}') ? 'warning' : 'none'
        });
    }

    //sort the keys by key name
    translation.diccionary = translation.diccionary.sort((a, b) => a.key.localeCompare(b.key));

    return translation;
}

export function buildFromNestedStructure(app: CAW_APP, language: string, data: any): Translation {

    let translation: Translation = {
        application: app,
        language: language,
        diccionary: []
    };

    //* having the data in nested json, with the following structure: {group : {key : value, key : value, ...}, group : {key : value, key : value, ...}, ...}
    //* Lets convert to a plain array of objects: {group, key, value}

    for (const group in data) {

        if (Object.prototype.hasOwnProperty.call(data, group)) {
            const values = data[group];
            for (const key in values) {
                if (Object.prototype.hasOwnProperty.call(values, key)) {
                    const value = values[key];

                    if (value === null || value === undefined)
                        continue;

                    //* Lorem Ipsum text
                    if (group === 'demo' && key === 'introduction')
                        continue;

                    translation.diccionary.push({
                        group: group,
                        key: key,
                        value: value,
                        translated_value: "",
                        alert: value.includes('{') || value.includes('}') ? 'warning' : 'none'
                    });
                }
            }
        }
    }

    // * Short the groups by group name, and the keys by key name
    translation.diccionary = translation.diccionary.sort((a, b) => {

        if (a.group === b.group) {
            return a.key.localeCompare(b.key);
        }

        return a.group.localeCompare(b.group);

    });

    return translation;
}
export function generateLsKey({ app, language, group, key }: { app: CAW_APP; language: string; group: string; key: string; }) {
    const ls_key = `${app}/${language}:${group}.${key}`;
    return ls_key;
}

export function getTranslationFromLocalStorage({ app, language, group, key }: { app: CAW_APP; language: string; group: string; key: string; }) {
    const ls_key = generateLsKey({ app, language, group, key });
    const translation = localStorage.getItem(ls_key);
    return String(translation || '');
}

export function setTranslationToLocalStorage({ app, language, group, key, value }: { app: CAW_APP; language: string; group: string; key: string; value: string; }) {
    const ls_key = generateLsKey({ app, language, group, key });
    localStorage.setItem(ls_key, value);
}

export function prepareStructureForTranslation(app: CAW_APP, language: string, data: any): Translation | null {

    let translation: Translation | null = null;
    switch (app) {
        case 'clearing-house':
            translation = buildFromNestedStructure(app, language, data);
            break;
        case 'website':
            translation = buildFromFlattedStructure(app, language, data);
            break;
        case 'manifesto':
            translation = buildFromPlainText(app, language, data);
            break;
        default:
            translation = null;
            break;
    }

    return translation;
}

function buildExporToNestedStructure(translation: Translation) {

    // get  unique groups sorted alphabetically                                
    const groups = [...new Set(translation.diccionary.map(item => item.group))].sort();

    //get all the keys for each group
    const exportableStructure: any = {};
    groups.forEach(group => {
        exportableStructure[group] = {};
        translation.diccionary.filter(item => item.group === group).forEach(item => {
            exportableStructure[group][item.key] = item.translated_value;
        });
    }
    );

    return exportableStructure;
}

function buildtoFlattedStructure(translation: Translation) {

    const exportableStructure: any = {};
    translation.diccionary.forEach(item => {
        exportableStructure[item.key] = item.translated_value;
    });

    return exportableStructure;
}

export function buildToPlainText(translation: Translation) {
    return translation.diccionary[0].translated_value;
}

export function buildExportableStructure(translation: Translation) {

    let exportableStructure: any = {};

    switch (translation.application) {
        case 'clearing-house':
            exportableStructure = buildExporToNestedStructure(translation);
            break;
        case 'website':
            exportableStructure = buildtoFlattedStructure(translation);
            break;
        case 'manifesto':
            exportableStructure = buildToPlainText(translation);
            break;
        default:
            exportableStructure = null;
            break;
    }

    return exportableStructure;
}

export function generateTranslateFile(translation: Translation) {

    const { contentTypes } = getFilesPerApp(translation.application, translation.language);
    const exportableStructure = buildExportableStructure(translation);
    switch (contentTypes) {
        case 'application/json':
            const json = JSON.stringify(exportableStructure, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            download(blob, `${sluglify(translation.application)}-${sluglify(translation.language)}.json`);
            break;
        case 'text/plain':
            const blob2 = new Blob([exportableStructure], { type: 'text/plain' });
            download(blob2, `${sluglify(translation.application)}-${sluglify(translation.language)}.txt`);
            break;
        default:
            return null;
    }
}