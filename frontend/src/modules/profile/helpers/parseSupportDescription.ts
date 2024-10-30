export const parseSupportDescription = (description: string) => {
    const supportMap: { [key: string]: string } = {};
    const types = {
        psychological: 'Психологічна допомога',
        informational: 'Інформаційна допомога',
        humanitarian: 'Гуманітарна допомога',
        material: 'Матеріальна допомога'
    };

    Object.entries(types).forEach(([key, label]) => {
        const regex = new RegExp(`${label}:\\s?([^,]+)`);
        const match = description.match(regex);
        if (match) {
            supportMap[key] = match[1].trim();
        }
    });

    return supportMap;
};