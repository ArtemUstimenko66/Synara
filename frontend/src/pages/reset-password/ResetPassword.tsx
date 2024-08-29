import { useEffect, useState } from 'react';
import { UserLogin } from "../../modules/login/interfaces/UserLogin.tsx";
import BackArrowComponent from "../../modules/registration/components/BackArrow.tsx";
import UpdatePassword from "../../modules/reset-password/components/UpdatePassword.tsx";
import EmailSend from "../../modules/reset-password/components/EmailSend.tsx";
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState<UserLogin>({ email: '', password: '' });
    const navigate = useNavigate();

    const handleNextStep = (data: Partial<UserLogin>, nextStep: number) => {
        setUserData(prev => ({ ...prev, ...data }));
        setCurrentStep(nextStep);
    };

    useEffect(() => {
        if (currentStep === 0) {
            navigate('/login');
        }
    }, [currentStep, navigate]);

    useEffect(() => {
        console.log("User data after update:", userData);
    }, [userData, currentStep]);

    const steps = [
        {
            component: (
                <UpdatePassword onNextStep={(data) => handleNextStep(data, 2)} />
            ),
            step: 1
        },
        {
            component: (
                <EmailSend email={userData.email}  />
            ),
            step: 2
        }
    ];

    return (
        <div className="bg-dark-blue min-h-screen flex">
            <div className="w-2/6 p-8 flex items-left justify-left mt-10 ml-28">
                <div className="text-almost-white font-montserratRegular font-bold text-relative-h4">LOGO</div>
            </div>
            <div className="w-5/6 bg-almost-white rounded-l-3xl min-h-screen px-relative-md flex flex-col items-start justify-start">
                <div className="flex h-full">
                    <BackArrowComponent onClick={() => setCurrentStep(currentStep - 1)} />
                    <div className="max-w-2xl ml-24 mt-7 max-h-screen flex flex-col justify-start flex-grow">
                        <div className="flex-grow flex flex-col justify-between">
                            {steps.find(step => step.step === currentStep)?.component}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
