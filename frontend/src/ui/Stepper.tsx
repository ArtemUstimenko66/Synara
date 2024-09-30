import React from 'react';

type StepperProps = {
    currentStep: number;
    onStepChange: (step: number) => void;
};

const Stepper: React.FC<StepperProps> = ({ currentStep, onStepChange }) => {
    return (
        <div className="flex items-center justify-start w-1/4">
            {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex-1">
                    <div
                        className={`h-2 rounded-full mr-2 transition-all duration-500 ${step === currentStep ? 'bg-dark-blue w-12' : step < currentStep ? 'bg-dark-blue w-8' : 'bg-light-blue w-8'}`}
                        onClick={() => onStepChange(step)}
                    />
                </div>
            ))}
        </div>
    );
};

export default Stepper;
