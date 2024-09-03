import React from 'react';
import MainHeader from "../modules/main-page/components/MainHeader.tsx";
import SearchComponent from "../modules/main-page/components/SearchComponent.tsx";
import Announcement from "../modules/main-page/components/Announcement.tsx";
import Filters from "../modules/main-page/components/Filters.tsx";
import DownArrowIcon from '../modules/main-page/assets/Down_Arrow.svg?react';
import Wrapper from "../ui/Wrapper.tsx";
import { Button } from "../ui/Button.tsx";
import Footer from "../components/Footer.tsx";

const MainPage: React.FC = () => {
    const announcements = [
        {
            name: 'Ольга Коваленко',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            date: '27.08.2024',
            text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя...',
            type: 'Психологічна'
        },
        {
            name: 'Анна Иванова',
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
            date: '28.08.2024',
            text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя...',
            type: 'Гуманітарна'
        },
        {
            name: 'Елена Смирнова',
            avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
            date: '29.08.2024',
            text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя...',
            type: 'Психологічна'
        },
        {
            name: "Андрій Литвиненко",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
            date: "29.08.2024",
            text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя...',
            type: "Інформаційна",
        },
        {
            name: "Марія Пономаренко",
            avatar: "https://randomuser.me/api/portraits/women/4.jpg",
            date: "30.08.2024",
            text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя...',
            type: "Гуманітарна",
        },
        {
            name: "Іван Іванов",
            avatar: "https://randomuser.me/api/portraits/men/5.jpg",
            date: "01.09.2024",
            text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя...',
            type: "Матеріальна",
        },
        {
            name: "Світлана Кучер",
            avatar: "https://randomuser.me/api/portraits/women/6.jpg",
            date: "02.09.2024",
            text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя...',
            type: "Матеріальна",
        }
    ];

    return (
        <Wrapper>
            <div className="min-h-screen bg-almost-white">
                <MainHeader />
                <div className="w-full mt-[5%] px-4">
                    <div className="flex flex-col md:flex-row md:space-x-4 md-8">
                        {/* Map of help */}
                        <div className="w-1/4 flex flex-col items-start justify-start ">
                            <Button hasBlue={true} className="uppercase px-8 py-3 w-full">Карта допомоги</Button>
                            <div className="w-full flex items-end justify-start">
                                <Button hasBlue={true} className="px-4 mt-8 w-3/6"><span className="text-montserratMedium text-relative-pd">Фільтрувати</span></Button>
                            </div>
                        </div>
                        {/* Search */}
                        <div className="w-3/4 flex flex-col items-end justify-end ">
                            <SearchComponent />
                            <div className="w-full flex items-end justify-end">
                                <Button hasBlue={true}
                                        className="px-2 mt-8 w-3/12 flex items-center justify-center space-x-2">
                                    <span className="text-montserratMedium text-relative-pd">Сортування за</span>
                                    <DownArrowIcon className="h-4 w-4 mt-1" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row space-x-8">
                        {/* Main part */}
                        <div className="w-full flex justify-between">
                            {/* Announcements */}
                            <div className="w-full mt-4 flex flex-wrap justify-between">
                                {announcements.map((announcement, index) => (
                                    <div key={index} className="w-full md:w-[32%] p-2 mt-4">
                                        <Announcement
                                            name={announcement.name}
                                            avatar={announcement.avatar}
                                            date={announcement.date}
                                            text={announcement.text}
                                            type={announcement.type}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </Wrapper>
    );
};

export default MainPage;
