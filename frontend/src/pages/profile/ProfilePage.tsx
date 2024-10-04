import { SetStateAction, useEffect, useState } from 'react';
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";

import Wrapper from '../../ui/Wrapper.tsx';
import Sidebar from "../../modules/profile/components/SideBar.tsx";
import MainContent from "../../modules/profile/components/MainContent.tsx";
import { useAuth } from "../../hooks/useAuth.ts";
import { getUser } from "../../modules/profile/api/profileService.ts";
import Footer from "../../components/Footer.tsx";


const ProfilePage = () => {
    const [activeSection, setActiveSection] = useState<string>('reviews');
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [selectedRequestSection, setSelectedRequestSection] = useState('All');
    const [, setReviewsData] = useState([]);
    const [announcementsData, setAnnouncementsData] = useState([]);
    const [gatheringsData, setGatheringsData] = useState([]);
    const [petitionsData, setPetitionsData] = useState([]);
    const [userData, setUserData] = useState({
        avatarUrl: '',
        firstName: '',
        lastName: '',
        birthDate: ''
    });

    const { userId, isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated && userId) {
                try {
                    const data = await getUser(userId);
                    console.log('getUser(userId): ', data);
                    // @ts-ignore
                    setReviewsData(reviews);
                    setAnnouncementsData(data.announcements);
                    setGatheringsData(data.gatherings);
                    setPetitionsData(data.petitions);
                    setUserData({
                        avatarUrl: data.avatarUrl,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        birthDate: data.birthDate
                    });
                } catch (error) {
                    console.log('Error fetching user data:', error);
                }
            }
        };

        fetchData();
    }, [isAuthenticated, userId]);

    const handleRequestSectionClick = (section: SetStateAction<string>) => {
        setSelectedRequestSection(section);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

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

    return (
        <Wrapper>
            <MainHeader />
            <div className="min-h-screen flex mt-12">
                <div className="flex flex-1">
                    {/* Sidebar */}
                    <div className="w-[20%]">
                    <Sidebar
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        isHelpOpen={isHelpOpen}
                        setIsHelpOpen={setIsHelpOpen}
                        isAccountOpen={isAccountOpen}
                        setIsAccountOpen={setIsAccountOpen}
                        avatarUrl={userData.avatarUrl}
                        firstName={userData.firstName}
                        lastName={userData.lastName}
                        birthDate={userData.birthDate}
                    />
                    </div>
                    {/* Main Content */}
                    <MainContent
                        activeSection={activeSection}
                        reviews={reviews}
                        announcements={announcementsData}
                        gatherings={gatheringsData}
                        petitions={petitionsData}
                        selectedRequestSection={selectedRequestSection}
                        handleRequestSectionClick={handleRequestSectionClick}
                    />
                </div>
            </div>

            <Footer />
        </Wrapper>
    );
};

export default ProfilePage;
