export const convertDateToDBFormat = (date: string): string | null => {
    const dateParts = date.split(" / ");
    if (dateParts.length !== 3) return null;
    const [day, month, year] = dateParts;
    if (day.length !== 2 || month.length !== 2 || year.length !== 4) return null;
    return `${year}-${month}-${day} `;
};