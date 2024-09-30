import { SetStateAction, useState} from 'react';

import VectorLanguage from '../../modules/profile/assets/VectorLanguage.svg?react';
import HelpingHand from '../../modules/main-page/assets/Helping_Hand.svg?react';
import VectorRequest from '../../modules/profile/assets/VectorRequest.svg?react';
import VectorLiked from '../../modules/profile/assets/VectorLiked.svg?react';
import Account from '../../modules/profile/assets/Account.svg?react';
import Settings from '../../modules/profile/assets/Settings.svg?react';

import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import {Footer} from "react-day-picker";
import Wrapper from '../../ui/Wrapper.tsx';
import ReviewProfile from "../../modules/profile/components/ReviewProfile.tsx";

import RequestCard from "../../modules/profile/components/RequestCard.tsx";
import HelpCard from "../../modules/profile/components/HelpCard.tsx";
import {Button} from "../../ui/Button.tsx";


const ProfilePage = () => {
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);

    // State to track whether "Відгуки" or "Мої заяви" is active
    const [activeSection, setActiveSection] = useState("reviews"); // Default to "Відгуки"
    const [selectedRequestSection, setSelectedRequestSection] = useState("All");

    // State for dropdown under requests or reviews
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const requests = [
        {
            status: 'Cкасовано',
            days: '3 дня',
            category: 'Психологічна',
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую колекцию размеров и форм шрифтов, используя...'
        },
        {
            status: 'Виконано',
            category: 'Психологічна',
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую колекцию размеров и форм шрифтов, используя...'
        },
        {
            status: 'Виконано',
            category: 'Психологічна',
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую колекцию размеров и форм шрифтов, используя...'
        },
        {
            status: 'Активно',
            days: '3 дня',
            category: 'Психологічна',
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую колекцию размеров и форм шрифтов, используя...'
        },
        {
            status: 'Виконано',
            category: 'Психологічна',
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую колекцию размеров и форм шрифтов, используя...'
        },
        {
            status: 'Виконано',
            category: 'Психологічна',
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую колекцию размеров и форм шрифтов, используя...'
        },
        {

            days: '22.09.2024',
            category: 'Психологічна',
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую колекцию размеров и форм шрифтов, используя...'
        },
        {
            status: 'Виконано',
            category: 'Психологічна',
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую колекцию размеров и форм шрифтов, используя...'
        },
        {
            status: 'Виконано',
            category: 'Психологічна',
            description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую колекцию размеров и форм шрифтов, используя...'
        },
        // Add more requests...
    ];

    const reviews = [
        {
            name: 'Ірина Шевченко',
            date: '20.06.2023',
            rating: 5,
            comment: 'Як волонтер, я знайшов тут багато можливостей допомогти людям, які цього потребують. Це чудова платформа для об\'єднання зусиль.Як волонтер, я знайшов тут багато можливостей допомогти людям, які цього потребують. Це чудова платформа для об\'єднання зусиль',
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        },
        {
            name: 'Олександр Петренко',
            date: '15.07.2023',
            rating: 4,
            comment: 'Платформа дуже зручна у використанні! Знайшов багато корисної інформації, та зміг допомогти багатьом людям.',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        },
        {
            name: 'Марія Іваненко',
            date: '02.08.2023',
            rating: 5,
            comment: 'Неймовірна спільнота волонтерів! Відчуваю себе частиною чогось великого та важливого.',
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
        },
        {
            name: 'Дмитро Ковальчук',
            date: '10.09.2023',
            rating: 3,
            comment: 'Платформа гарна, але іноді є проблеми з функціоналом. Сподіваюсь на покращення в майбутньому.',
            avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
        },
        {
            name: 'Наталія Бойко',
            date: '22.07.2023',
            rating: 4,
            comment: 'Багато можливостей для допомоги іншим, але хотілось би більше ресурсів для новачків.',
            avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
        },
        {
            name: 'Андрій Мельник',
            date: '05.08.2023',
            rating: 5,
            comment: 'Ця платформа зробила волонтерську діяльність доступною для всіх, хто бажає допомогти.',
            avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
        },
    ];
    const handleHelpSectionClick = () => {
        setActiveSection('help');
    };
    const handleRequestSectionClick = (section: SetStateAction<string>) => {
        setSelectedRequestSection(section);
    };


    return (
        <Wrapper>
            <MainHeader />
            <div className="min-h-screen flex mt-12">

                {/* Sidebar */}
                <div className="w-[18%] bg-gray-half h-[100%] rounded-3xl ml-[3%] mt-8">
                    <div className="mb-6 flex items-center mt-4 ml-2">
                        <img
                            src="https://randomuser.me/api/portraits/men/4.jpg"
                            alt="Profile"
                            className=" mt-2 rounded-full w-12 h-12 mx-auto"
                        />
                        <div>
                            <p className="text-pd font-montserratRegular mr-8">Ольга Коваленко</p>
                            <p className="text-sm text-gray-600 font-montserratRegular">27.08.2024</p>
                        </div>
                    </div>

                    <hr className="border-gray-200 mx-4 mb-4" />

                    <nav className="ml-12 font-montserratRegular">
                        <ul className="space-y-4 mb-4">
                            <li className="cursor-pointer flex items-center">
                                <VectorLanguage className="mr-2" /> Українська
                            </li>
                            <li className="cursor-pointer flex items-center">
                                <VectorLanguage className="mr-2" /> English
                            </li>

                            <hr className="border-gray-200 mr-4 mb-4" />

                            <li
                                className={`cursor-pointer font-montserratRegular flex items-center ${activeSection === 'help' ? 'text-blue-600' : ''}`}
                                onClick={() => {
                                    handleHelpSectionClick()
                                    setIsHelpOpen(!isHelpOpen)
                                }}
                            >
                                <HelpingHand className="mr-2 h-6 w-6" /> Моя допомога
                            </li>
                            {isHelpOpen && (
                                <ul className="ml-4">
                                    <li className="cursor-pointer" onClick={() => handleHelpSectionClick()}>Оголошення</li>
                                    <li className="cursor-pointer" onClick={() => handleHelpSectionClick()}>Пропозиції</li>
                                </ul>
                            )}

                            <hr className="border-gray-200 mr-4 mb-4" />

                            {/* Sidebar item for "Мої заяви" */}
                            <li>
                                <li
                                    className={`cursor-pointer flex items-center ${activeSection === 'requests' ? 'text-blue-600' : ''}`}
                                    onClick={() => {
                                        setActiveSection('requests');
                                        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown for requests
                                    }}
                                >
                                    <VectorRequest className="mr-2" /> Мої заяви
                                </li>
                                {isDropdownOpen && activeSection === 'requests' && (
                                    <ul className="ml-4 mt-2">
                                        <li className="cursor-pointer" onClick={() => handleRequestSectionClick("All")}>Оголошення</li>
                                        <li className="cursor-pointer" onClick={() => handleRequestSectionClick("Active")}>Пропозиції</li>
                                        <li className="cursor-pointer" onClick={() => handleRequestSectionClick("Completed")}>Збори</li>
                                        <li className="cursor-pointer" onClick={() => handleRequestSectionClick("Cancelled")}>Петиції</li>
                                    </ul>
                                )}
                            </li>

                            <hr className="border-gray-200 mr-4 mb-4" />

                            {/* Sidebar item for "Відгуки" */}
                            <li
                                className={`cursor-pointer flex items-center ${activeSection === 'reviews' ? 'text-blue-600' : ''}`}
                                onClick={() => {
                                    setActiveSection('reviews');
                                    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown for reviews
                                }}
                            >
                                <VectorLiked className="mr-2" /> Обране
                            </li>
                            {isDropdownOpen && activeSection === 'reviews' && (
                                <ul className="ml-4 mt-2">
                                    <li className="cursor-pointer">Петиції</li>
                                    <li className="cursor-pointer">Збори</li>
                                    <li className="cursor-pointer">Оголошення</li>
                                    <li className="cursor-pointer">Пропозиції</li>
                                </ul>
                            )}

                            <hr className="border-gray-200 mr-4 mb-4" />

                            <li
                                className="cursor-pointer flex items-center"
                                onClick={() => setIsAccountOpen(!isAccountOpen)}
                            >
                                <Account className="mr-2" /> Акаунт
                            </li>
                            {isAccountOpen && (
                                <ul className="ml-4">
                                    <li className="cursor-pointer">Дані</li>
                                    <li className="cursor-pointer">Статистика</li>
                                    <li className="cursor-pointer">Відгуки</li>
                                </ul>
                            )}

                            <hr className="border-gray-200 mr-4 mb-4" />

                            <li className="cursor-pointer flex items-center">
                                <Settings className="mr-2" /> Налаштування
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Main content */}
                <main className="w-[80%] bg-white p-8">
                    {activeSection === 'reviews' ? (
                        // "Відгуки" section content
                        <>
                            <h1 className="text-h2 font-kharkiv">Відгуки</h1>
                            <div className="flex items-center mb-6">
                                <span className="text-yellow-500 text-h2 mb-2 mr-2">★</span>
                                <span className="text-2xl font-montserratMedium font-bold">4.7</span>

                                {/* Вертикальная линия */}
                                <div className="h-8 border-l-2 border-gray-300 mx-4"></div>

                                <span className="font-montserratRegular text-pxll font-semibold ">35 Відгуків</span>
                            </div>

                            {/* Review Cards */}
                            <div className="grid grid-cols-3 gap-6 mt-12">
                                {reviews.map((review) => (
                                    <ReviewProfile avatar={review.avatar} comment={review.comment}
                                                   name={review.name} date={review.date}/>
                                ))}
                            </div>

                            {/* Show More Button */}
                            <div className="text-center mt-8">
                                <button
                                    className="bg-perfect-yellow text-almost-black py-2 px-6 font-montserratRegular text-xs-pxl rounded-3xl hover:bg-orange-400 transition duration-300">
                                    Показати ще
                                </button>
                            </div>
                        </>
                    ) : activeSection === 'requests' ? (

                        // "Мої заяви" section content
                        <>
                            <h1 className="text-h2 font-kharkiv">Мої заяви</h1>
                            <div className="flex items-center mb-6">
                                <Button
                                    className={`border-dark-blue border-2  text-dark-blue rounded-3xl font-montserratMedium px-8 py-0.5 mr-4 ${selectedRequestSection === "All" ? 'border-2 border-dark-blue bg-dark-blue  text-white rounded-3xl font-montserratMedium    px-8 py-0.5' : ''}`}
                                    onClick={() => handleRequestSectionClick("All")}>Всі 7
                                </Button>
                                <Button
                                    className={`border-dark-blue border-2  text-dark-blue rounded-3xl font-montserratMedium px-8 py-0.5 mr-4 ${selectedRequestSection === "Active" ? 'border-2 border-dark-blue bg-dark-blue  text-white rounded-3xl font-montserratMedium    px-8 py-0.5' : ''}`}
                                    onClick={() => handleRequestSectionClick("Active")}>Активні 3
                                </Button>
                                <Button
                                    className={`border-dark-blue border-2  text-dark-blue rounded-3xl font-montserratMedium px-8 py-0.5 mr-4 ${selectedRequestSection === "Completed" ? 'border-2 border-dark-blue bg-dark-blue  text-white rounded-3xl font-montserratMedium    px-8 py-0.5' : ''}`}
                                    onClick={() => handleRequestSectionClick("Completed")}>Виконані 4
                                </Button>
                                <Button
                                    className={`border-dark-blue border-2  text-dark-blue rounded-3xl font-montserratMedium px-8 py-0.5 ${selectedRequestSection === "Cancelled" ? 'border-2 border-dark-blue bg-dark-blue  text-white rounded-3xl font-montserratMedium    px-8 py-0.5' : ''}`}
                                    onClick={() => handleRequestSectionClick("Cancelled")}>Скасовані 0
                                </Button>
                            </div>

                            {/* Requests grid */}
                            <div className="grid grid-cols-3 gap-6">
                                {requests.map((request, index) => (
                                    <RequestCard
                                        key={index}
                                        status={request.status}
                                        days={request.days}
                                        category={request.category}
                                        description={request.description}
                                    />
                                ))}
                            </div>

                            {/* Show more button */}
                            <div className="text-center mt-8">
                                <button
                                    className="bg-perfect-yellow text-black py-2 px-6 font-montserratRegular text-xs-pxl rounded-full hover:bg-orange-400 transition">
                                    Показати ще
                                </button>
                            </div>
                        </>
                    ) : activeSection === 'help' ? (
                            <>
                                <h1 className="text-h2 font-kharkiv">Моя допомога</h1>
                                <div className="flex justify-between h-10 mb-8">
                                    <h2 className="uppercase font-montserratMedium txt-lg mb-6">Оголошення</h2>
                                    <Button
                                        className={`border-dark-blue border-2  text-dark-blue rounded-3xl font-montserratMedium ${selectedRequestSection === "Cancelled" ? 'border-2 border-dark-blue bg-dark-blue  text-white rounded-3xl font-montserratMedium    px-8 py-0.5' : ''}`}
                                    >Дивитись всі
                                    </Button>
                                </div>
                                <div className="grid grid-cols-3 grid-rows-2 gap-3">
                                    {requests.map((request, index) => (
                                        <RequestCard
                                            key={index}
                                            status={request.status}
                                            days={request.days}
                                            category={request.category}
                                            description={request.description}
                                        />
                                    ))}
                                </div>
                                <div className="text-center mt-8">
                                    <button
                                        className="bg-perfect-yellow text-black py-2 px-6 font-montserratRegular text-xs-pxl rounded-full hover:bg-orange-400 transition">
                                        Показати ще
                                    </button>
                                </div>
                                <h3 className="my-4 text-lg font-montserratMedium uppercase">Пропозиції</h3>
                                {/* Тут будет отображаться список предложений */}
                                <div className="grid grid-cols-3 gap-6">
                                    {/* Пример карточки предложения */}
                                    <HelpCard
                                        user={{
                                            name: "Ольга Коваленко",
                                            image: "https://randomuser.me/api/portraits/women/17.jpg"
                                        }}
                                        date="27.08.2024"
                                        category="Гуманітарна"
                                        description="Ми шукаємо волонтерів для участі у роздачі продуктів харчування та води для переселенців у Київській області."
                                        location="Київ, гуманітарний центр"
                                        time="Щодня з 10:00 до 16:00"
                                        joined={3}
                                        total={10} status={undefined} days={undefined}/>
                                </div>
                            </>
                        )
                        : null}
                </main>

            </div>

            <Footer/>
        </Wrapper>
    );
};

export default ProfilePage;
