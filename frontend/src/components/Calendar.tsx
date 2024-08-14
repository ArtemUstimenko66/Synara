import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, addDays } from 'date-fns';
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
            return `${format(range.from, 'dd.MM.yyyy')} - ${format(range.to, 'dd.MM.yyyy')}`;
        }
        return 'Виберіть діапазон дат';
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="text-1 font-montserratRegular bg-perfect-yellow rounded-full py-2 px-6"
            >
                {formatDateRange(selectedRange)}
            </button>

            {open && (
                <div className="absolute mt-2 z-10 bg-white p-4 rounded-lg shadow-lg">
                    <DayPicker
                        mode="range"
                        selected={selectedRange}
                        onSelect={handleDateChange}
                        styles={{
                            day: { margin: '5px' },
                            month: { margin: '10px' },
                            caption: { marginBottom: '10px', background: '#1F74D5' },
                        }}
                    />
                </div>
            )}
        </div>
    );
}
