export const termsEndingsMap: { [key: string]: string } = {
    'Завершуються цього тижня': 'EndsThisWeek',
    'Завершуються цього місяця': 'EndsThisMonth',
    'Без терміну': 'NoTerm',
    'Ending this week': 'EndsThisWeek',
    'Ending this month': 'EndsThisMonth',
    'No term': 'NoTerm',
};

export const getTermsEndings = (typeHelp: string): string => {
    const entry = Object.entries(termsEndingsMap).find(([, value]) => value === typeHelp);
    return entry ? entry[0] : typeHelp;
};