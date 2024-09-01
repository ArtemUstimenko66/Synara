import React from 'react';

const Filters: React.FC = () => {
    return (
        <div className="p-4 w-full mx-auto rounded-lg ">
            {/* Категорія допомоги */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Категорія допомоги</h3>
                <div className="space-y-2">
                    {['Психологічна', 'Гуманітарна', 'Інформаційна', 'Матеріальна'].map((category, index) => (
                        <button
                            key={index}
                            className={`w-full py-2 border border-blue-500 rounded-full ${
                                category === 'Психологічна' ? 'bg-blue-500 text-white' : 'text-blue-500'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Відстань пошуку */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Відстань пошуку</h3>
                <input
                    type="text"
                    value="Вся Україна"
                    className="w-full py-2 px-3 border border-blue-500 rounded-full text-center text-blue-500 mb-2"
                    readOnly
                />
                <button className="w-full py-2 text-blue-500 rounded-full underline">Змінити</button>
            </div>

            {/* Терміновість */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Терміновість</h3>
                <div className="space-y-2">
                    {['Терміново', 'Не терміново'].map((urgency, index) => (
                        <button
                            key={index}
                            className="w-full py-2 border border-blue-500 rounded-full text-blue-500"
                        >
                            {urgency}
                        </button>
                    ))}
                </div>
            </div>

            {/* Clear Button */}
            <button className="w-full py-2 mt-2 border border-blue-500 rounded-full text-blue-500">
                ОЧИСТИТИ
            </button>
        </div>
    );
};

export default Filters;
