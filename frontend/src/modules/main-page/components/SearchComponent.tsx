import React from 'react';

const SearchComponent: React.FC = () => {
    return (
        <div className="flex items-center w-full bg-blue-100 rounded-full p-2 shadow-sm">
            {/* Search Icon */}
            <div className="px-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35m-3.65 1.35A7 7 0 1117 7a7 7 0 01-4.35 10.65z"
                    />
                </svg>
            </div>
            {/* Input Field */}
            <input
                type="text"
                placeholder="Пошук оголошення"
                className="w-full bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
            />
        </div>
    );
};

export default SearchComponent;
