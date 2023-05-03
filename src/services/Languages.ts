import { LanguageModel } from 'src/types';

const languages: LanguageModel[] = [
    { "code": "en", "name": "English", "nativeName": "English", rtl: false },
    { "code": "de", "name": "German", "nativeName": "Deutsch", rtl: false },
    { "code": "fr", "name": "French", "nativeName": "Français, langue française", rtl: false },
    { "code": "es", "name": "Spanish", "nativeName": "Español, castellano", rtl: false },
    { "code": "ja", "name": "Japanese", "nativeName": "日本語 (にほんご／にっぽんご)", rtl: false },
    { "code": "zh", "name": "Chinese", "nativeName": "中文 (Zhōngwén), 汉语, 漢語", rtl: false },
    { "code": "tr", "name": "Turkish", "nativeName": "Türkçe", rtl: false },
    { "code": "pl", "name": "Polish", "nativeName": "Polski", rtl: false },
    { "code": "fa", "name": "Persian", "nativeName": "فارسی", rtl: true },
    { "code": "vi", "name": "Vietnamese", "nativeName": "Tiếng Việt", rtl: false }
]

export const language_ls_key = 'custom-languages';

export function getLanguagesFromLocalStorage() {

    const languagesFromLocalStorage = localStorage.getItem(language_ls_key);

    if (languagesFromLocalStorage) {
        return JSON.parse(languagesFromLocalStorage);
    }

    return [];
}

export function setLanguagesToLocalStorage(languages: LanguageModel[]) {
    localStorage.setItem(language_ls_key, JSON.stringify(languages));
}

export function addLanguageToLocalStorage(language: LanguageModel) {

    const languagesFromLocalStorage = getLanguagesFromLocalStorage();
    if (languagesFromLocalStorage.find((lang: LanguageModel) => lang.code === language.code))
        return false;

    if (languages.find((lang: LanguageModel) => lang.code === language.code))
        return false;

    const merged = [ ...languagesFromLocalStorage, language ];
    setLanguagesToLocalStorage(merged);
    return true;
}

export function getAllLanguages() {
    try {

        let allLanguages = [ ...languages ];

        const languagesFromLocalStorage = getLanguagesFromLocalStorage();

        if (languagesFromLocalStorage) {

            languagesFromLocalStorage.forEach((language: any) => {
                if (!allLanguages.find((defaultLanguage: LanguageModel) => defaultLanguage.code === language.code)) {
                    allLanguages = [ ...allLanguages, language ];
                }
            })
        };

        return allLanguages;
    }
    catch (error) {
        return languages;
    }
}