export const termsEndingsMap: { [key: string]: string } = {
    'Завершуються цього тижня': 'EndsThisWeek',
    'Завершуються цього місяця': 'EndsThisMonth',
    'Безстрокові': 'NoTerm',
};

export const getTermsEndings = (typeHelp: string): string => {
    const entry = Object.entries(termsEndingsMap).find(([, value]) => value === typeHelp);
    return entry ? entry[0] : typeHelp;
};