export const helpTypesMap: { [key: string]: string } = {
    'Гуманітарна': 'humanitarian',
    'Інформаційна': 'informational',
    'Психологічна': 'psychological',
    'Матеріальна': 'material',
};

export const getHelpTypeInUkrainian = (typeHelp: string): string => {
    const entry = Object.entries(helpTypesMap).find(([, value]) => value === typeHelp);
    return entry ? entry[0] : typeHelp;
};