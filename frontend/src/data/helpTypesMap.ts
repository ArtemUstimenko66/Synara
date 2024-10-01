export const helpTypesMap: { [key: string]: string } = {
    'Гуманітарна': 'humanitarian',
    'Інформаційна': 'informational',
    'Психологічна': 'psychological',
    'Матеріальна': 'material',
};

export const helpToKeyMap: { [key: string]: string } = {
    'Гуманітарна': 'categories2',
    'Інформаційна': 'categories3',
    'Психологічна': 'categories1',
    'Матеріальна': 'categories4'
}

export const getHelpTypeInUkrainian = (typeHelp: string): string => {
    const entry = Object.entries(helpTypesMap).find(([, value]) => value === typeHelp);
    return entry ? entry[0] : typeHelp;
};


export const getHelpToKey = (typeHelp: string) : string => {
    const entry = Object.entries(helpToKeyMap).find(([, value]) => value === typeHelp);
    return entry ? entry[0] : typeHelp;
}


export const helpTypesMapEngToUkr: { [key: string]: string } = {
    humanitarian: 'Гуманітарна',
    informational: 'Інформаційна',
    psychological: 'Психологічна',
    material: 'Матеріальна',
};

export const getHelpTypeInUkrainianEngToUkr = (typeHelp: string): string => {
    return helpTypesMapEngToUkr[typeHelp] || typeHelp;
};


