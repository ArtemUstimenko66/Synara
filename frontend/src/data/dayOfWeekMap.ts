export const dayOfWeekMap: { [key: string]: string } = {
    Monday: 'Пн',
    Tuesday: 'Вт',
    Wednesday: 'Ср',
    Thursday: 'Чт',
    Friday: 'Пт',
    Saturday: 'Сб',
    Sunday: 'Нд',
};

export const getDayOfWeekInUkrainian = (day: string): string => {
    return dayOfWeekMap[day] || day;
};