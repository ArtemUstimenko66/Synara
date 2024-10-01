import { format, isToday, isThisWeek } from 'date-fns';
import { uk } from 'date-fns/locale';

const daysOfWeekShort: { [key: string]: string } = {
    'понеділок': 'пн',
    'вівторок': 'вт',
    'середа': 'ср',
    'четвер': 'чт',
    'п’ятниця': 'пт',
    'субота': 'сб',
    'неділя': 'нд',
};

export function formatMessageTime(messageTime: Date): string {
    if (!messageTime) {
        return '';
    }

    const date = new Date(messageTime);

    if (isNaN(date.getTime())) {
        return '';
    }

    if (isToday(date)) {
        return format(date, 'HH:mm');
    }

    if (isThisWeek(date, { weekStartsOn: 1 })) {
        const dayOfWeek = format(date, 'EEEE', { locale: uk });
        return daysOfWeekShort[dayOfWeek.toLowerCase()] || '';
    }

    return format(date, 'dd.MM.yyyy');
}


