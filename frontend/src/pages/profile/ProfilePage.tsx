import { useEffect, useState } from 'react';
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Wrapper from '../../ui/Wrapper.tsx';
import Sidebar from "../../modules/profile/components/SideBar.tsx";
import MainContent from "../../modules/profile/components/MainContent.tsx";
import { useAuth } from "../../hooks/useAuth.ts";
import {
    getCommentsAboutUser,
    getDoneAnnouncements,
    getFavoriteAnnouncements,
    getFavoriteGatherings,
    getFavoritePetitions,
    getUser
} from "../../modules/profile/api/profileService.ts";
import Footer from "../../components/Footer.tsx";
import {Player} from "@lottiefiles/react-lottie-player";
import loadingAnimation from "../../assets/animations/logoLoading.json";
import {Helmet} from "react-helmet-async";
import {useTranslation} from "react-i18next";

const ProfilePage = () => {
    const [activeSection, setActiveSection] = useState<string>('announcements');
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [announcementsData, setAnnouncementsData] = useState([]);
    const [gatheringsData, setGatheringsData] = useState([]);
    const [petitionsData, setPetitionsData] = useState([]);
    const [commentsData, setCommentsData] = useState([]);
    const {t} = useTranslation();
    const [favoriteAnnouncementsData, setFavoriteAnnouncementsData] = useState([]);
    const [favoriteGatheringsData, setFavoriteGatheringsData] = useState([]);
    const [favoritePetitionsData, setFavoritePetitionsData] = useState([]);
    const [completedAnnouncementsData, setCompletedAnnouncementsData] = useState([]);
    const [user, setUser] = useState([]);

    const [userData, setUserData] = useState({
        avatarUrl: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        rating: '',
    });

    const { role, userId, isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated && userId) {
                console.log("userId ->", userId)
                try {
                    const data = await getUser(userId);
                    console.log('getUser(userId): ', data);

                    setAnnouncementsData(data.announcements);
                    setGatheringsData(data.gatherings);
                    setPetitionsData(data.petitions);

                    setUser(data);

                    setUserData({
                        avatarUrl: data.avatarUrl,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        birthDate: data.birthDate,
                        rating: role == "volunteer" ? data.volunteer.rating : 1,
                    });
                    const comments = await getCommentsAboutUser(Number(data.volunteer.id));
                    setCommentsData(comments);
                    console.log("userData", userData)
                } catch (error) {
                    console.log('Error fetching user data:', error);
                }
            }
        };

        const fetchFavorites = async () => {
            try {
                const favoriteAnnouncementsData = await getFavoriteAnnouncements();
                setFavoriteAnnouncementsData(favoriteAnnouncementsData);

                const favoriteCopmletedData = await getDoneAnnouncements();
                setCompletedAnnouncementsData(favoriteCopmletedData);

                const favoriteGatheringsData = await getFavoriteGatherings();
                setFavoriteGatheringsData(favoriteGatheringsData);

                const favoritePetitionsData = await getFavoritePetitions();
                setFavoritePetitionsData(favoritePetitionsData);

            } catch (error) {
                console.log('Error fetching favorite data:', error);
            }
        };

        fetchData();
        fetchFavorites();
    }, [isAuthenticated, userId]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Player
                    autoplay
                    loop
                    src={loadingAnimation}
                    style={{ height: '200px', width: '200px' }}
                />
            </div>
        );
    }

    return (
        <Wrapper>
            <Helmet>
                <title>{t('helmet_profile')}</title>
                <meta name="description" content="Перегляньте та редагуйте ваш профіль на платформі Synara. Оновіть свою інформацію для покращення досвіду." />
                <meta name="keywords" content="профіль, Synara, редагування, користувач, волонтерство" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://synara.help/profile" />
            </Helmet>
            <MainHeader />
            <div className="min-h-screen flex xl:mt-12 md:mt-12 sm:mt-6">
                <div className="md:flex xl:flex xl:flex-1 md:flex-1 sm:flex-row ">
                    {/* Sidebar */}
                    <div className="sm:mx-0 md:mx-0 xl:mx-0 sm:w-full md:w-[20%] xl:w-[20%] ">
                        <Sidebar
                            activeSection={activeSection}
                            setActiveSection={setActiveSection}
                            isHelpOpen={isHelpOpen}
                            setIsHelpOpen={setIsHelpOpen}
                            avatarUrl={userData.avatarUrl || 'https://via.placeholder.com/150'}
                            firstName={userData.firstName}
                            lastName={userData.lastName}
                            birthDate={userData.birthDate}
                        />

                    </div>
                    {/* Main Content */}
                    <MainContent
                        activeSection={activeSection}
                        rating={userData.rating}
                        reviews={commentsData}
                        announcements={announcementsData}
                        gatherings={gatheringsData}
                        petitions={petitionsData}
                        likedAnnouncements={favoriteAnnouncementsData}
                        completedAnnouncements={completedAnnouncementsData}
                        likedGatherings={favoriteGatheringsData}
                        likedPetitions={favoritePetitionsData}
                        userData={user}
                    />
                </div>
            </div>

            <Footer />
        </Wrapper>
    );
};

export default ProfilePage;
