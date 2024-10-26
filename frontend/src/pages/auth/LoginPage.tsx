import { useEffect, useState } from 'react';
import BackArrowComponent from "../../modules/registration/components/ui/BackArrow.tsx";
import LoginMain from "../../modules/login/components/LoginMain.tsx";
import { UserLogin } from "../../modules/login/interfaces/UserLogin.tsx";
import LogoSynara from '../../assets/images/logoRegistration.svg?react';
import LogoSynaraBlue from '../../assets/images/logoSynara.svg?react';
import LoginMainPicture from '../../assets/images/LoginMain.svg?react';
import LoginMainSMMD from '../../assets/images/LoginMainSMMD.svg?react';
import {Link} from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import {useTranslation} from "react-i18next";

const LoginPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const { t } = useTranslation();

    const [userData] = useState<UserLogin>({
        email: '',
        password: '',
    });

    // Log data on each step
    useEffect(() => {
        console.log("User data after update:", userData);
    }, [userData, currentStep]);

    const steps = [
        {
            component: (
                <LoginMain />
            ),
            step: 1
        }
    ];

    return (
        <>
            <Helmet>
                <title>Вхід в акаунт - Synara</title>
                <meta name="description" content="Увійдіть в свій акаунт на Synara, щоб отримати доступ до особистих даних, управління підписками та іншим можливостям." />
                <meta name="keywords" content="вхід, акаунт, авторизація, Synara, українці" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://synara.help/login" />
            </Helmet>

            <div className="bg-dark-blue min-h-screen h-screen flex ">
                <div className="w-2/6 p-8 xl:flex md:hidden sm:hidden items-left flex flex-col justify-center mt-10 ">
                    <Link to="/home">
                        <LogoSynara
                            className="text-almost-white font-montserratRegular font-bold text-relative-h4"></LogoSynara>
                    </Link>
                    <LoginMainPicture className="pr-[37%]"/>
                </div>

                <div
                    className="xl:w-5/6 md:w-full sm:w-full bg-almost-white xl:rounded-l-3xl h-full xl:px-relative-md flex flex-col xl:items-start xl:justify-start sm:items-center sm:justify-center">

                    <LogoSynaraBlue className="xl:hidden md:flex sm:flex mt-relative-sm sm:w-24 sm:h-24" />

                    <LoginMainSMMD className=" bg-dark-blue sm:block rounded-3xl md:block  xl:hidden sm:w-2/4 sm:h-[30%]  sm:mt-6 flex  mt-4" />
                    <div className="flex xl:w-full xl:items-start xl:justify-start sm:items-center sm:justify-center sm:w-11/12 h-full">
                        {currentStep > 1 && currentStep < steps.length && (
                            <BackArrowComponent onClick={() => setCurrentStep(currentStep - 1)} />
                        )}

                        <div className="max-w-2xl xl:ml-24 md:ml-0 sm:ml-0 xl:mt-7 sm:mt-4 flex flex-col xl:justify-start sm:justify-center flex-grow ">
                            {/* Заголовок */}
                            <div className="w-full flex xl:items-start sm:items-center xl:justify-start sm:justify-center ">
                                <h1 className="font-kharkiv xl:ml-0 xl:text-relative-h2 sm:text-relative-h1 xl:mb-relative-ssm mt-relative-ssm">
                                    {t('account_login')}
                                </h1>
                            </div>

                            <div className="flex-grow flex flex-col justify-between w-full overflow-hidden">
                                {steps.find(step => step.step === currentStep)?.component}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
