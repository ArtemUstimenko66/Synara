import React, {useState} from 'react';
import VectorLanguage from '../assets/VectorLanguage.svg?react';
import HelpingHand from '../../main-page/assets/Helping_Hand.svg?react';
import VectorRequest from '../assets/VectorRequest.svg?react';
import VectorLiked from '../assets/VectorLiked.svg?react';
import Settings from '../assets/Settings.svg?react';
import DownArrowIcon from '../assets/Down_arrow.svg?react';
import {useAuth} from "../../../hooks/useAuth.ts";
import {useTranslation} from "react-i18next";

interface SidebarProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
    setIsHelpOpen: (isOpen: boolean) => void;
    isHelpOpen: boolean;
    avatarUrl: string;
    firstName: string;
    lastName: string;
    birthDate: string;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};



const Sidebar: React.FC<SidebarProps> = ({
                                             activeSection,
                                             setActiveSection,
                                             setIsHelpOpen,
                                             isHelpOpen,
                                             avatarUrl,
                                             firstName,
                                             lastName,
                                             birthDate,
                                         }) => {
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isLikedOpen, setIsLikedOpen] = useState(false);
    const [isDeclarationsOpen, setIsDeclarationsOpen] = useState(false);

    const { t, i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    const toggleLanguageDropdown = () => {
        setIsLanguageOpen(!isLanguageOpen);
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setCurrentLanguage(lng);
        setIsLanguageOpen(false);
    };

    const  {role} = useAuth();

    return (
        <div className="md:w-full sm:w-[95%] xl:w-full mr-[5vw] xl:ml-0 md:ml-0 sm:ml-3 p-[3%] bg-gray-100  h-auto py-[2vh] rounded-3xl mt-8">
            {/* Photo */}
            <div className="mb-6 flex items-center ml-2">
                <img
                    src={avatarUrl || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    className="mt-2 rounded-full w-14 h-14 mx-auto"
                />
                <div>
                    <p className="xl:text-xs-pxl md:text-relative-h5 sm:text-xs-h3 font-montserratRegular mr-8">{`${firstName} ${lastName}`}</p>
                    <p className="text-sm text-gray-600 font-montserratRegular">{formatDate(birthDate)}</p>
                </div>
            </div>
            <hr className="border-gray-300 mx-4 mb-4"/>

            {/* Language */}
            <nav className="font-montserratRegular">
                <div className="cursor-pointer ml-8 flex items-center justify-between" onClick={toggleLanguageDropdown}>
                    <div className="flex items-center">
                        <VectorLanguage className="mr-2"/> {currentLanguage === 'uk' ? t('Ukrainian') : t('English')}
                    </div>
                    <DownArrowIcon className={`mr-5 transform transition-transform ${isLanguageOpen ? 'rotate-0' : 'rotate-180'}`} />
                </div>
                {isLanguageOpen && (
                    <ul className="ml-16 mt-2 space-y-2">
                        {currentLanguage !== 'en' && (
                            <li className="cursor-pointer flex items-center" onClick={() => changeLanguage('en')}>
                                {t('English')}
                            </li>
                        )}
                        {currentLanguage !== 'uk' && (
                            <li className="cursor-pointer flex items-center" onClick={() => changeLanguage('uk')}>
                                {t('Ukrainian')}
                            </li>
                        )}
                    </ul>
                )}

                {/* My Help */}
                {role == "volunteer" ?
                    <>
                        <hr className="border-gray-300 mx-4 my-4"/>
                        <li
                            className={`cursor-pointer flex ml-8 items-center justify-between  mb-[1vh] `}
                            onClick={() => {
                                setIsHelpOpen(!isHelpOpen);
                                if (!isHelpOpen) {
                                    setActiveSection('doneAnnouncements');
                                }
                            }}
                        >
                            <div className="flex items-center">
                                <HelpingHand className="mr-2 h-6 w-6"/> {t('my_help')}
                            </div>
                            <DownArrowIcon
                                className={`mr-5 transform transition-transform ${isHelpOpen ? 'rotate-0' : 'rotate-180'}`}/>
                        </li>
                        {isHelpOpen && (
                            <ul className="ml-16 ">
                                <li className="cursor-pointer mb-[1.5vh]"
                                    onClick={() => setActiveSection('announcements')}>{t('advertisement')}
                                </li>
                            </ul>
                        )}
                    </>
                    :
                    <div className="h-[1.5vh]"></div>
                }

                <ul className="space-y-4 mb-2">


                    {/* My Applications */}
                    <hr className="border-gray-300 mx-4 mb-4"/>
                    <li
                        className={`cursor-pointer ml-8 flex items-center justify-between`}
                        onClick={() => {
                            setActiveSection('announcements'); // Устанавливаем default section при нажатии
                            setIsDeclarationsOpen(!isDeclarationsOpen);
                        }}
                    >
                        <div className="flex items-center">
                            <VectorRequest className="mr-2"/> {t('my_statements')}
                        </div>
                        <DownArrowIcon
                            className={`mr-5 transform transition-transform ${isDeclarationsOpen ? 'rotate-0' : 'rotate-180'}`}/>
                    </li>
                    {isDeclarationsOpen && (
                        <ul className="ml-16 ">
                            <li className="cursor-pointer"
                                onClick={() => setActiveSection('announcements')}>{t('advertisement')}
                            </li>
                            <li className="cursor-pointer" onClick={() => setActiveSection('gatherings')}>{t('navItem7')}</li>
                            <li className="cursor-pointer" onClick={() => setActiveSection('petitions')}>{t('petitions')}</li>
                        </ul>
                    )}

                    {/* Favorites */}
                    <hr className="border-gray-300 mx-4 mb-4"/>
                    <li
                        className={`cursor-pointer flex ml-8 items-center justify-between ${activeSection === 'reviews' ? '' : ''}`}
                        onClick={() => {
                            setIsLikedOpen(!isLikedOpen);
                            if (!isLikedOpen) {
                                setActiveSection('likedAnnouncements');
                            }
                        }}
                    >
                        <div className="flex items-center">
                            <VectorLiked className="mr-2"/> {t('selected')}
                        </div>
                        <DownArrowIcon
                            className={`mr-5 transform transition-transform ${isLikedOpen ? 'rotate-0' : 'rotate-180'}`}/>
                    </li>
                    {isLikedOpen && (
                        <ul className="ml-16 ">
                            <li className="cursor-pointer" onClick={() => setActiveSection('likedPetitions')}>{t('petitions')}
                            </li>
                            <li className="cursor-pointer" onClick={() => setActiveSection('likedGatherings')}>{t('collection')}
                            </li>
                            <li className="cursor-pointer"
                                onClick={() => setActiveSection('likedAnnouncements')}>{t('advertisement')}
                            </li>
                        </ul>
                    )}

                    {/* Settings */}
                    <hr className="border-gray-300 mx-4 mb-4"/>
                    <li className="cursor-pointer ml-8 flex items-center" onClick={() => setActiveSection('settings')}>
                        <Settings className="mr-2"/> {t('settings')}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
