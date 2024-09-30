export const formatDate = (dateStr: string): string => {
    const now = new Date();
    const messageDate = new Date(dateStr);
    const today = new Date(now.setHours(0, 0, 0, 0));
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (messageDate >= today) {
        return 'Сьогодні';
    } else if (messageDate >= yesterday) {
        return 'Вчора';
    } else if (messageDate.getFullYear() === now.getFullYear()) {
        return messageDate.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' });
    } else {
        return messageDate.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
    }
};