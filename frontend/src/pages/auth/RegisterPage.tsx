import { useEffect, useState } from 'react';
import ChooseRole from "../../modules/registration/components/ChooseRole.tsx";
import CompleteMainInfo from "../../modules/registration/components/CompleteMainInfo.tsx";
import AddressVictim from "../../modules/registration/components/victim/AddressVictim";
import AddressVolunteer from "../../modules/registration/components/volunteer/AddressVolunteer";
import DateBirthday from "../../modules/registration/components/DateBirthday.tsx";
import EmailConfirm from "../../modules/registration/components/EmailConfirm.tsx";
import Stepper from "../../ui/Stepper";
import { User } from "../../modules/registration/interfaces/User";
import BackArrowComponent from "../../modules/registration/components/ui/BackArrow.tsx";
import CheckPhone from "../../modules/phone-verification/components/CheckPhone.tsx";
import {Link, useNavigate} from "react-router-dom";
import LogoSynara from '../../assets/images/logoRegistration.svg?react';
import LogoSynaraBlue from '../../assets/images/logoSynara.svg?react';
import FirstShag from '../../assets/images/FirstShag.svg?react';
import VictimSecond from '../../assets/images/VictimSecond.svg?react';
import VolunteerSecond from '../../assets/images/VolunteerSecond.svg?react';
import EmailAccept from '../../assets/images/EmailAccept.svg?react';
import AuntidificationSecond from '../../assets/images/AuntidificationSecond.svg?react';
import {Helmet} from "react-helmet-async";
import {useTranslation} from "react-i18next";

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
        documents: [],
        volunteerId: 0
    });

    const handleNextStep = (data: Partial<User>, nextStep: number) => {
        setUserData(prev => ({ ...prev, ...data }));
        setCurrentStep(nextStep);
    };

    // save data to localStorage on changes
    // useEffect(() => {
    //     localStorage.setItem('userData', JSON.stringify(userData));
    //     localStorage.setItem('currentStep', currentStep.toString());
    // }, [userData, currentStep]);

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
    const {t} = useTranslation();

    const handleBackArrowClick = () => {
        navigate('/home');
    };
    const renderStepImage = () => {
        if (currentStep === 1) {
            return <div className="mb-[150%]"></div>;  // Общая картинка для первого шага
        }

        if (userData.role === 'victim') {
            switch (currentStep) {
                case 2:
                    return <FirstShag className="pr-[37%]"/>;
                case 3:
                    return <VictimSecond className="pr-[55%]"/>;
                case 4:
                    return <VictimSecond className="pr-[55%]"/>;
                case 5:
                    return <EmailAccept className="pr-[55%]"/>;
                case 6:
                    return <AuntidificationSecond className="pr-[55%]"/>;
                // Добавляем картинки для других шагов, если нужно
                default:
                    return null;
            }
        } else if (userData.role === 'volunteer') {
            switch (currentStep) {
                case 2:
                    return <FirstShag className="pr-[37%]"/>;
                case 3:
                    return <VolunteerSecond className="pr-[55%]"/>;
                case 4:
                    return <VolunteerSecond className="pr-[55%]"/>;
                case 5:
                    return <EmailAccept className="pr-[55%]"/>;
                case 6:
                    return <AuntidificationSecond className="pr-[55%]"/>;
                default:
                    return null;
            }
        }
        return null;
    };
    return (
        <>
            <Helmet>
                <title>{t('helmet_register')}</title>
                <meta name="description"
                      content="Заповніть форму реєстрації на платформі Synara, щоб стати частиною спільноти та отримати доступ до важливих ресурсів."/>
                <meta name="keywords" content="реєстрація, акаунт, Synara, українці, допомога"/>
                <meta name="robots" content="index, follow"/>
                <link rel="canonical" href="https://synara.help/registration"/>
            </Helmet>

            <div className="bg-dark-blue min-h-screen h-screen flex ">
                <div className="w-2/6 p-8 xl:flex md:hidden sm:hidden items-left flex flex-col justify-center mt-10 ">
                    <Link to="/home">
                        <LogoSynara
                            className="text-almost-white font-montserratRegular font-bold text-relative-h4"></LogoSynara>
                    </Link>
                    {renderStepImage()}
                </div>
                <div
                    className="xl:w-5/6 md:w-full sm:w-full bg-almost-white xl:rounded-l-3xl h-full xl:px-relative-md flex flex-col xl:items-start xl:justify-start sm:items-center sm:justify-center">
                    <div className="flex w-11/12 mt-[2.5vh] xl:hidden">
                        <div className="xl:mt-[20%]">
                            <BackArrowComponent onClick={handleBackArrowClick}/>
                        </div>
                        <div className="flex w-full justify-center ">
                            <Link to="/home">
                                <LogoSynaraBlue className="xl:hidden md:flex sm:flex  sm:w-24 sm:h-24"/>
                            </Link>
                        </div>
                    </div>

                    <div className="flex h-full w-11/12">
                        <div className="xl:flex sm:hidden">
                            {currentStep > 1 && currentStep < 5 && (
                                <BackArrowComponent onClick={() => setCurrentStep(currentStep - 1)}/>
                            )}
                            {currentStep == 6 && (
                                <BackArrowComponent onClick={() => handleBackArrowClick()}/>
                            )}
                        </div>

                        <div className="xl:max-w-2xl xl:ml-24 sm:ml-5 mt-7 flex flex-col justify-start flex-grow">
                            {currentStep < 5 && (
                                <>
                                    <h1 className="font-kharkiv xl:text-relative-h3xl sm:text-relative-h2 mb-relative-ssm mt-relative-ssm">
                                        {t('acc_creation')}
                                    </h1>
                                    <div className="mb-relative-sm flex justify-start">
                                        <Stepper currentStep={currentStep} onStepChange={setCurrentStep}/>
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
        </>
    );
};

export default Registration;
