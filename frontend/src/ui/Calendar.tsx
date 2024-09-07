import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, addDays } from 'date-fns';
import { uk } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function DateRangePickerWithButton() {
    const [open, setOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState<DateRange>({
        from: undefined,
        to: undefined,
    });

    useEffect(() => {
        const today = new Date();
        const nextWeek = addDays(today, 6);
        setSelectedRange({ from: today, to: nextWeek });
    }, []);

    const handleDateChange = (range: DateRange | undefined) => {
        if (range?.from && range?.to) {
            setSelectedRange(range);
            setOpen(false);
        }
    };

    const formatDateRange = (range: DateRange) => {
        if (range?.from && range?.to) {
            return `${format(range.from, 'dd.MM.yyyy', { locale: uk })} - ${format(range.to, 'dd.MM.yyyy', { locale: uk })}`;
        }
        return 'Виберіть діапазон дат';
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="text-1 font-montserratRegular w-auto bg-perfect-yellow rounded-full py-2 px-6"
            >
                {formatDateRange(selectedRange)}
            </button>

            {open && (
                <div className="absolute mt-2 z-10 bg-white p-4 rounded-lg shadow-lg xl:-left-10 md:-left-10 sm:-left-14">
                    {/* Text above the buttons */}
                    <div className="text-lg font-semibold mb-4 ml-3 text-left">
                        За останній:
                    </div>

                    {/* Button group in a row */}
                    <div className="flex justify-around mb-2">
                        <button className="bg-another-blue text-white py-1 px-4 rounded-full">День</button>
                        <button className="bg-another-blue text-white py-1 px-4 rounded-full">Неділя</button>
                        <button className="bg-another-blue text-white py-1 px-4 rounded-full">Місяць</button>
                        <button className="bg-another-blue text-white py-1 px-4 rounded-full">Рік</button>
                    </div>

                    {/* Line below the buttons */}
                    <div className="border-t-2 border-another-blue my-2"></div>

                    {/* Calendar with Ukrainian localization and custom styles */}
                    <DayPicker
                        mode="range"
                        selected={selectedRange}
                        onSelect={handleDateChange}
                        locale={uk} // Set the Ukrainian locale
                        styles={{
                            day: { margin: '5px' },
                            month: { margin: '0px' },
                            caption: {
                                marginBottom: '10px',
                                background: '#1F74D5',
                                textTransform: 'capitalize',
                                fontWeight: 'normal', // Ensure normal font weight for month name
                                textAlign: 'left', // Align month and year to the left
                            },
                            weekdays: {
                                color: '#0000fe',
                                fontWeight: 'bold', // Bold font for weekdays
                                textTransform: 'capitalize', // Capitalize weekday names
                            },
                            day_selected: {
                                backgroundColor: '#FFD700', // Yellow background for selected days
                                borderRadius: '8px', // Rounded square shape
                                color: '#000000', // Black text color for contrast
                            },
                            day_range_middle: {
                                backgroundColor: '#FFD700', // Same yellow background for the middle of the range
                                borderRadius: '8px', // Rounded square shape for the range middle as well
                                color: '#000000', // Black text color for contrast
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
}
