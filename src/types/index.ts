
export type CAW_APP = 'website' | 'clearing-house' | 'manifesto';

type AppModel = {
    name: string;
    app: CAW_APP;
};

export const CAW_APPS_OPTIONS: AppModel[] = [
    {
        name: 'CAW Social',
        app: 'clearing-house'
    },
    {
        name: 'Website',
        app: 'website'
    },
    {
        name: 'Manifesto',
        app: 'manifesto'
    }
];

export type LanguageModel = {
    code: string,
    name: string,
    nativeName: string,
    rtl: boolean,
}

export type Contributor = {
    name: string,
    twitter: string,
    avatar: string,
}

export type Dictionary = {
    group: string,
    key: string,
    alert: 'warning' | 'info' | 'none'
    value: string,
    translated_value: string,
}

export type Translation = {
    language: string,
    application: CAW_APP,
    diccionary: Dictionary[],
}
