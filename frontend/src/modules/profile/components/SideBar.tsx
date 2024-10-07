import React, {useState} from 'react';
import VectorLanguage from '../assets/VectorLanguage.svg?react';
import HelpingHand from '../../main-page/assets/Helping_Hand.svg?react';
import VectorRequest from '../assets/VectorRequest.svg?react';
import VectorLiked from '../assets/VectorLiked.svg?react';
import Account from '../assets/Account.svg?react';
import Settings from '../assets/Settings.svg?react';
import DownArrowIcon from '../assets/Down_arrow.svg?react';
import {useAuth} from "../../../hooks/useAuth.ts";

interface SidebarProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
    setIsHelpOpen: (isOpen: boolean) => void;
    setIsAccountOpen: (isOpen: boolean) => void;
    isHelpOpen: boolean;
    isAccountOpen: boolean;
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
                                             setIsAccountOpen,
                                             isHelpOpen,
                                             isAccountOpen,
                                             avatarUrl,
                                             firstName,
                                             lastName,
                                             birthDate,
                                         }) => {
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('Українська');
    const [isLikedOpen, setIsLikedOpen] = useState(false);
    const [isDeclarationsOpen, setIsDeclarationsOpen] = useState(false);
    const languages = ['Українська', 'English'];

    const toggleLanguageDropdown = () => {
        setIsLanguageOpen(!isLanguageOpen);
    };

    const selectLanguage = (language: string) => {
        setSelectedLanguage(language);
        setIsLanguageOpen(false);
    };

    const  {role} = useAuth();

    return (
        <div className="w-full mr-[5vw] p-[3%] bg-gray-100 h-auto py-[2vh] rounded-3xl mt-8">
            {/* Photo */}
            <div className="mb-6 flex items-center ml-2">
                <img
                    src={avatarUrl}
                    alt="Profile"
                    className="mt-2 rounded-full w-14 h-14 mx-auto"
                />
                <div>
                    <p className="text-relative-h5 font-montserratRegular mr-8">{`${firstName} ${lastName}`}</p>
                    <p className="text-sm text-gray-600 font-montserratRegular">{formatDate(birthDate)}</p>
                </div>
            </div>
            <hr className="border-gray-300 mx-4 mb-4"/>

            {/* Language */}
            <nav className="font-montserratRegular">
                {/* Dropdown for language selection */}
                <div className="cursor-pointer ml-8 flex items-center justify-between" onClick={toggleLanguageDropdown}>
                    <div className="flex items-center">
                        <VectorLanguage className="mr-2"/> {selectedLanguage}
                    </div>
                    <DownArrowIcon
                        className={`mr-5 transform transition-transform ${isLanguageOpen ? 'rotate-0' : 'rotate-180'}`}/>
                </div>
                {isLanguageOpen && (
                    <ul className="ml-16 mt-2 space-y-2">
                        {languages
                            .filter((lang) => lang !== selectedLanguage)
                            .map((language) => (
                                <li
                                    key={language}
                                    className="cursor-pointer flex items-center"
                                    onClick={() => selectLanguage(language)}
                                >
                                    {language}
                                </li>
                            ))}
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
                                <HelpingHand className="mr-2 h-6 w-6"/> Моя допомога
                            </div>
                            <DownArrowIcon
                                className={`mr-5 transform transition-transform ${isHelpOpen ? 'rotate-0' : 'rotate-180'}`}/>
                        </li>
                        {isHelpOpen && (
                            <ul className="ml-16 ">
                                <li className="cursor-pointer mb-[1.5vh]"
                                    onClick={() => setActiveSection('doneAnnouncements')}>Оголошення
                                </li>
                            </ul>
                        )}
                    </>
                    :
                    <div className="h-[1.5vh]"></div>
                }

                <ul className="space-y-4">


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
                            <VectorRequest className="mr-2"/> Мої заяви
                        </div>
                        <DownArrowIcon
                            className={`mr-5 transform transition-transform ${isDeclarationsOpen ? 'rotate-0' : 'rotate-180'}`}/>
                    </li>
                    {isDeclarationsOpen && (
                        <ul className="ml-16 ">
                            <li className="cursor-pointer"
                                onClick={() => setActiveSection('announcements')}>Оголошення
                            </li>
                            <li className="cursor-pointer" onClick={() => setActiveSection('gatherings')}>Збори</li>
                            <li className="cursor-pointer" onClick={() => setActiveSection('petitions')}>Петиції</li>
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
                            <VectorLiked className="mr-2"/> Обране
                        </div>
                        <DownArrowIcon
                            className={`mr-5 transform transition-transform ${isLikedOpen ? 'rotate-0' : 'rotate-180'}`}/>
                    </li>
                    {isLikedOpen && (
                        <ul className="ml-16 ">
                            <li className="cursor-pointer" onClick={() => setActiveSection('likedPetitions')}>Петиції
                            </li>
                            <li className="cursor-pointer" onClick={() => setActiveSection('likedGatherings')}>Збори
                            </li>
                            <li className="cursor-pointer"
                                onClick={() => setActiveSection('likedAnnouncements')}>Оголошення
                            </li>
                        </ul>
                    )}

                    {/* Account */}
                    <hr className="border-gray-300 mx-4 mb-4"/>
                    <li
                        className="cursor-pointer ml-8 flex items-center justify-between"
                        onClick={() => setIsAccountOpen(!isAccountOpen)}
                    >
                        <div className="flex items-center">
                            <Account className="mr-2"/> Акаунт
                        </div>
                        <DownArrowIcon
                            className={`mr-5 transform transition-transform ${isAccountOpen ? 'rotate-0' : 'rotate-180'}`}/>
                    </li>
                    {isAccountOpen && (
                        <ul className="ml-16">
                            {role == "volunteer" ?
                                <>
                                    <li className="cursor-pointer">Статистика</li>
                                    <li onClick={() => setActiveSection('reviews')} className="cursor-pointer">Відгуки
                                    </li>
                                </>
                                :
                                <></>
                            }
                            <li className="cursor-pointer">Дані</li>
                        </ul>
                    )}

                    {/* Settings */}
                    <hr className="border-gray-300 mx-4 mb-4"/>
                    <li className="cursor-pointer ml-8 flex items-center">
                        <Settings className="mr-2"/> Налаштування
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
