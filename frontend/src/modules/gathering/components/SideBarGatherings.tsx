import React from 'react';
import FiltersGathering from "./FiltersGathering.tsx";

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilters: (filteredAnnouncements: any[]) => void;
}

export const SideBarGatherings: React.FC<SideBarProps> = ({ isOpen, onClose, onApplyFilters }) => {
    return (
        <>
            {/* Dark side */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 bg-white z-40 overflow-hidden transform transition-transform duration-500 ease-in-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-full xl:w-1/4 h-full  xl:border-2 xl:border-l-dark-blue 
                    xl:border-t-dark-blue xl:border-b-dark-blue xl:rounded-l-3xl flex flex-col`}
            >
                <div className="flex flex-col flex-grow p-5">
                    <FiltersGathering
                        onApplyFilters={onApplyFilters}
                        onCloseSidebar={onClose}
                    />
                </div>
            </div>
        </>
    );
};