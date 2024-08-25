import React, { useState } from 'react';
import { Button } from "./Button.tsx";

const steps = [
    {
        title: "Зареєструйтесь:",
        description: "Створіть обліковий запис та оберіть свою роль: 'Потерпілий' або 'Волонтер'.",
    },
    {
        title: "Допомога поруч:",
        description: "Створіть оголошення або знайдіть допомогу.",
    },
    {
        title: "Зв'яжіться та допоможіть:",
        description: "Спілкуйтеся з іншими користувачами через чат або відеозв'язок та організуйте допомогу.",
    },
    {
        title: "Залиште відгук:",
        description: "Поділіться своїм досвідом та допоможіть іншим користувачам зробити правильний вибір.",
    },
];

const HowItWorksSM = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section className="w-full h-auto flex flex-col items-center mt-16">
            <h2 className="text-h5 font-kharkiv mb-10 mt-10 text-center">ЯК ЦЕ ПРАЦЮЄ</h2>
            <div className="flex items-center w-80 mb-8 mx-5 justify-center">
                {steps.map((step, index) => (
                    <React.Fragment key={index}>
                        <div className="cursor-pointer flex flex-col items-center" onClick={() => setActiveStep(index)}>
                            <div
                                className={`w-8 h-8 flex items-center justify-center rounded-full ${index === activeStep ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}>
                                {index + 1}
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="flex-grow h-[2px] bg-blue-200 mx-2"></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div className="border-4 border-blue-600 p-4 rounded-3xl h-52 w-64 mb-10 max-w-sm"/>
            <h3 className="text-center text-blue-600 text-h5 font-kharkiv">{steps[activeStep].title}</h3>
            <p className="text-center font-montserratMedium mt-2 max-w-xs">
                {steps[activeStep].description}
            </p>
            <div className="mt-8">
                <Button isFilled={true}>ДЕТАЛЬНІШЕ</Button>
            </div>
        </section>
    );
};

export default HowItWorksSM;
