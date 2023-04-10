import { LanguageModel } from 'src/types';

const languages: LanguageModel[] = [
    { "code": "en", "name": "English", "nativeName": "English", rtl: false },
    { "code": "de", "name": "German", "nativeName": "Deutsch", rtl: false },
    { "code": "fr", "name": "French", "nativeName": "Français, langue française", rtl: false },
    { "code": "es", "name": "Spanish", "nativeName": "Español, castellano", rtl: false },
    { "code": "ja", "name": "Japanese", "nativeName": "日本語 (にほんご／にっぽんご)", rtl: false },
    { "code": "zh", "name": "Chinese", "nativeName": "中文 (Zhōngwén), 汉语, 漢語", rtl: false },
    { "code": "tr", "name": "Turkish", "nativeName": "Türkçe", rtl: false },
    { "code": "pl", "name": "Polish", "nativeName": "polski", rtl: false },
    { "code": "fa", "name": "Persian", "nativeName": "فارسی", rtl: true },
    { "code": "vi", "name": "Vietnamese", "nativeName": "Tiếng Việt", rtl: false }
]

export default languages;