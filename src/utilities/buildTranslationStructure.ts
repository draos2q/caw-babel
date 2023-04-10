import { CAW_APP, Translation } from "../types";

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