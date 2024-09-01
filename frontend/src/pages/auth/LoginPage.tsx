import { useEffect, useState } from 'react';
import BackArrowComponent from "../../modules/registration/components/BackArrow.tsx";
import LoginMain from "../../modules/login/components/LoginMain.tsx";
import {UserLogin} from "../../modules/login/interfaces/UserLogin.tsx";

const LoginPage = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const [userData] = useState<UserLogin>({
        email: '',
        password: '',
    });

    // log data on each step
    useEffect(() => {
        console.log("User data after update:", userData);
    }, [userData, currentStep]);

    const steps = [
        {
            component: (
                <LoginMain  />
            ),
            step: 1
        }
    ];

    return (
        <div className="bg-dark-blue min-h-screen flex">
            <div className="w-2/6 p-8 flex items-left justify-left mt-10 ml-28">
                <div className="text-almost-white font-montserratRegular font-bold text-relative-h4">LOGO</div>
            </div>

            <div className="w-5/6 bg-almost-white rounded-l-3xl min-h-screen px-relative-md flex flex-col items-start justify-start">
                <div className="flex h-full">
                    {currentStep > 1 && currentStep < steps.length && (
                        <BackArrowComponent onClick={() => setCurrentStep(currentStep - 1)} />
                    )}

                    <div className="max-w-2xl ml-24 mt-7 flex flex-col justify-start flex-grow">

                                <h1 className="font-kharkiv text-relative-h2 mb-relative-ssm mt-relative-ssm">
                                    ВХІД В АККАУНТ
                                </h1>



                        <div className="flex-grow flex flex-col justify-between">
                            {steps.find(step => step.step === currentStep)?.component}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
