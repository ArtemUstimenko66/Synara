import { useEffect, useState } from 'react';
import { UserLogin } from "../../modules/login/interfaces/UserLogin.tsx";
import BackArrowComponent from "../../modules/registration/components/ui/BackArrow.tsx";
import UpdatePassword from "../../modules/reset-password/components/UpdatePassword.tsx";
import EmailSend from "../../modules/reset-password/components/EmailSend.tsx";
import {Link, useNavigate} from 'react-router-dom';
import LogoSynara from '../../assets/images/logoRegistration.svg?react';

const ResetPasswordPage = () => {
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
        <div className="bg-dark-blue xl:min-h-screen flex">

            {/* Лого слева только на больших экранах */}
            <div className="w-2/6 p-8 xl:flex md:hidden sm:hidden items-left justify-left mt-10 ml-28">
                <Link to="/home">
                    <LogoSynara
                        className="text-almost-white font-montserratRegular font-bold text-relative-h4"></LogoSynara>
                </Link>
            </div>

            <div className="xl:w-5/6 md:w-full sm:w-full bg-almost-white xl:rounded-l-3xl xl:min-h-screen xl:px-relative-md flex flex-col xl:items-start xl:justify-start sm:items-center sm:justify-center">
                {/* Логотип с увеличенным размером на малых экранах */}
                <div className="flex w-11/12 xl:hidden">
                    <div className="xl:mt-[20%]">
                        {currentStep <= steps.length && (
                            <BackArrowComponent onClick={() => setCurrentStep(currentStep - 1)} />
                        )}
                    </div>
                    <div className="flex w-full justify-center ">
                        <LogoSynara className="xl:hidden md:flex sm:flex mt-relative-sm sm:w-24 sm:h-24" />
                    </div>
                </div>
                <div className="flex xl:w-full xl:items-start xl:justify-start sm:items-center sm:justify-center sm:w-11/12 h-full">
                    <div className="xl:flex sm:hidden">
                        <BackArrowComponent onClick={() => setCurrentStep(currentStep - 1)} />
                    </div>
                    <div className="max-w-2xl xl:ml-24 md:ml-0 sm:ml-0 xl:mt-7 sm:mt-4 flex flex-col xl:justify-start sm:justify-center flex-grow">
                        <div className="flex-grow flex flex-col justify-between w-full">
                            {steps.find(step => step.step === currentStep)?.component}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
