import { useEffect, useState } from 'react';
import ChooseRole from "../../modules/registration/components/ChooseRole.tsx";
import CompleteMainInfo from "../../modules/registration/components/CompleteMainInfo.tsx";
import AddressVictim from "../../modules/registration/components/victim/AddressVictim";
import AddressVolunteer from "../../modules/registration/components/volunteer/AddressVolunteer";
import DateBirthday from "../../modules/registration/components/DateBirthday.tsx";
import EmailConfirm from "../../modules/registration/components/EmailConfirm.tsx";
import Stepper from "../../ui/Stepper";
import { User } from "../../modules/registration/interfaces/User";
import BackArrowComponent from "../../modules/registration/components/BackArrow.tsx";
import CheckPhone from "../../modules/registration/components/CheckPhone.tsx";
import {useNavigate} from "react-router-dom";

const Registration = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const [userData, setUserData] = useState<User>({
        role: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        dateOfBirth: '',
        unp: 0,
        gender: '',
        region: '',
        city: '',
        street: '',
        house: 0,
        apartment: 0,
        helpTypes: [],
        volunteerId: 0
    });

    const handleNextStep = (data: Partial<User>, nextStep: number) => {
        setUserData(prev => ({ ...prev, ...data }));
        setCurrentStep(nextStep);
    };

    // log data on each step
    useEffect(() => {
        console.log("User data after update:", userData);
    }, [userData, currentStep]);

    const steps = [
        {
            component: (
                <ChooseRole onSelectRole={(role: string) => handleNextStep({ role }, 2)} />
            ),
            step: 1
        },
        {
            component: (
                <CompleteMainInfo
                    userData={userData}
                    setUserData={setUserData}
                    onNextStep={() => handleNextStep({}, 3)}
                />
            ),
            step: 2
        },
        {
            component: userData.role === 'victim' ? (
                <AddressVictim
                    userData={userData}
                    setUserData={setUserData}
                    onNextStep={() => handleNextStep({}, 4)}
                />
            ) : (
                <AddressVolunteer
                    userData={userData}
                    setUserData={setUserData}
                    onNextStep={() => handleNextStep({}, 4)}
                />
            ),
            step: 3
        },
        {
            component: (
                <DateBirthday
                    setUserData={setUserData}
                    selectedRole={userData.role}
                    onNextStep={() => handleNextStep({}, 5)}
                />
            ),
            step: 4
        },
        {
            component: (
                <EmailConfirm
                    userData={userData}
                    setUserData={setUserData}
                    onNextStep={() => handleNextStep({}, 6)}
                />
            ),
            step: 5
        },
        {
            component: (
                <CheckPhone
                    userData={userData}
                    setUserData={setUserData}
                />
            ),
            step: 6
        }
    ];

    const navigate = useNavigate();

    const handleBackArrowClick = () => {
        navigate('/home');
    };

    return (
        <div className="bg-dark-blue min-h-screen flex">
            <div className="w-2/6 p-8 flex items-left justify-left mt-10 ml-28">
                <div className="text-almost-white font-montserratRegular font-bold text-relative-h4">LOGO</div>
            </div>

            <div className="w-5/6 bg-almost-white rounded-l-3xl min-h-screen px-relative-md flex flex-col items-start justify-start">
                <div className="flex h-full">
                    {currentStep > 1 && currentStep < 5 && (
                        <BackArrowComponent onClick={() => setCurrentStep(currentStep - 1)} />
                    )}
                    {currentStep == 6 && (
                        <BackArrowComponent onClick={() => handleBackArrowClick()} />
                    )}

                    <div className="max-w-2xl ml-24 mt-7 flex flex-col justify-start flex-grow">
                        {currentStep < 5  && (
                            <>
                                <h1 className="font-kharkiv text-relative-h2 mb-relative-ssm mt-relative-ssm">
                                    СТВОРЕННЯ АККАУНТУ
                                </h1>
                                <div className="mb-relative-sm flex justify-start">
                                    <Stepper currentStep={currentStep} onStepChange={setCurrentStep} />
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
