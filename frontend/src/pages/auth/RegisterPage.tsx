import { useState } from 'react';
import ChooseRole from "../../components/registration/ChooseRole";
import CompleteMainInfo from "../../components/registration/CompleteMainInfo";
import AddressVictim from "../../components/registration/victim/AddressVictim.tsx";
import AddressVolunteer from "../../components/registration/volunteer/AddressVolunteer.tsx";
import DateBirthdayVictim from "../../components/registration/victim/DateBirthdayVictim.tsx";
import EmailConfirm from "../../components/registration/EmailConfirm.tsx";
import BackArrow from '../../assets/images/Back.svg?react';
import Stepper from "../../ui/Stepper.tsx";

const Registration = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    const handleStepChange = (step: number) => {
        setCurrentStep(step);
    };

    const steps = [
        {
            component: (
                <ChooseRole
                    onSelectRole={(role) => {
                        setSelectedRole(role);
                        handleStepChange(2);
                    }}
                />
            ),
            step: 1
        },
        {
            component: (
                <CompleteMainInfo
                    onNextStep={() => handleStepChange(3)}
                />
            ),
            step: 2
        },
        {
            component: selectedRole === 'victim' ?
                <AddressVictim
                    onNextStep={() => handleStepChange(4)}/>
                :  <AddressVolunteer
                    onNextStep={() => handleStepChange(4)}/>,
            step: 3
        },
        {
            component:(
                <DateBirthdayVictim
                    onNextStep={() => handleStepChange(5)}
                    selectedRole={selectedRole}
                />
            ),
            step: 4
        },
        {
            component: (
                <EmailConfirm
                    onNextStep={() => handleStepChange(6)}
                />
            ),
            step: 5
        },
    ];

    return (
        <div className="bg-dark-blue min-h-screen flex">
            <div className="w-2/6 p-8 flex items-left justify-left mt-10 ml-28">
                <div className="text-almost-white font-montserratRegular font-bold text-relative-h4">LOGO</div>
            </div>

            <div className="w-5/6 bg-almost-white rounded-l-3xl max-h-screen px-relative-md flex flex-col items-start justify-start">
                <div className="flex max-h-screen">
                    {/* Условный рендеринг для BackArrow */}
                    {currentStep > 1 && currentStep < steps.length && (
                        <div className="ml-2 mt-10 cursor-pointer" onClick={() => handleStepChange(currentStep - 1)}>
                            <BackArrow />
                        </div>
                    )}

                    <div className="max-w-2xl ml-24 mt-7 max-h-screen flex flex-col justify-start flex-grow">
                        {/* Условный рендеринг для заголовка и степпера */}
                        {currentStep < steps.length && (
                            <>
                                <h1 className="font-kharkiv text-relative-h2 mb-relative-ssm mt-relative-ssm">СТВОРЕННЯ АККАУНТУ</h1>

                                <div className="mb-relative-sm flex justify-start">
                                    <Stepper currentStep={currentStep} onStepChange={handleStepChange} />
                                </div>
                            </>
                        )}

                        <div className="flex-grow flex flex-col justify-between">
                            {steps.find(step => step.step === currentStep)?.component}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;