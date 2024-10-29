import React, {useEffect, useState} from 'react';
import {Button} from "../../ui/Button.tsx";
import {useTranslation} from "react-i18next";
import {getFilteredAnnouncements} from "../../modules/main-page/api/mainPageService.ts";
import {
    blockAnnouncement,
    blockGathering, blockPetition, blockUser,
    deleteAnnouncement, deleteComment, deleteGathering, deletePetition, deleteSynaraComment, deleteUser,
    fetchGatheringsWithoutParams, getAllCommentAboutUser, getAllSynaraComment, getAnnouncements, getPetitions, getUsers
} from "./api/adminPageService.ts";
import {useNavigate} from "react-router-dom";

type RecordType = 'ogoloshennya' | 'zbori' | 'peticii' | 'user' | 'volunteer' | 'comment' | 'synara_comment';

interface Announcement {
    id: number;
    currentLocation: string;
    date_posted: string;
    description: string;
    details: string;
    responsesCount: string;
    title: string;
    viewsCount: string;
    isBlockedAnnouncement: boolean;
    is_completed: boolean;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        gender: string;
        phoneNumber: string;
        birthDate: string;
        email: string;
        UNP: string;
    }
}

interface Gathering {
    id: number;
    collected: number;
    createdAt: string;
    name: string;
    whereMoneyWillUsed: string;
    whoNeedHelp: string;
    numberOfCard: string;
    description: string;
    detail: string;
    endGathering: string;
    startGathering: string;
    goal: number;
    isBlockedGathering: boolean;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        gender: string;
        phoneNumber: string;
        birthDate: string;
        email: string;
        UNP: string;
    }
}



interface Petition {
    id: number;
    creationDate: string;
    deadline: string;
    link: string;
    petitionNumber: string;
    responseDate: string;
    signatureCount: string;
    text: string;
    title: string;
    topic: string;
    type: string;
    isBlockedPetition: boolean;
    hasResponse: boolean;
    is_completed: boolean;
    author: {
        id: number;
        firstName: string;
        lastName: string;
        gender: string;
        phoneNumber: string;
        birthDate: string;
        email: string;
        UNP: string;
    }
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    phoneNumber: string;
    birthDate: string;
    email: string;
    UNP: string;
    age: string;
    avatarUrl: string;
    isBlockedUser: boolean;
    isConfirmedEmail: boolean;
    isPhoneVerified: boolean;
}

interface Volunteer {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    phoneNumber: string;
    birthDate: string;
    email: string;
    UNP: string;
    age: string;
    avatarUrl: string;
    isBlockedUser: boolean;
    isConfirmedEmail: boolean;
    isPhoneVerified: boolean;
    files: any;
}

interface Comment {
    id: number;
    author: {
        id: number;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        UNP: string;
    };
    dateCreated: string;
    description: string;
    rating: string;
    volunteer: {
        user: {
            id: number;
            firstName: string;
            lastName: string;
            gender: string;
            phoneNumber: string;
            birthDate: string;
            email: string;
            UNP: string;
        }
    }
}

interface SynaraComment {
    id: number;
    text: string;
    rating: string;
    dateCreated: string;
    author: {
        id: number;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        UNP: string;
    };
}


//фильтр announcements
const AdminPage: React.FC = () => {
    const victim = 'victim'
    const volunteer = 'volunteer'
    const [limit, setLimit] = useState<number>(10);

    const [activeTab, setActiveTab] = useState<RecordType>('ogoloshennya');
    const navigate = useNavigate();

    const handleLimitChangeGathering = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (+e.target.value > 0) {
            setLimit(+e.target.value);
        }
    };


    const {t} = useTranslation();

    useEffect(() => {
        showAnnouncement();
        showGathering();
        showPetitions();
        showUsers();
        showVolunteers();
        showComments();
        showCommentsSynara();
    }, []);

    //region User
    const [users, setUsers] = useState<User[]>([]);
    //endregion User

    //region Announcement
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filterTextAnnouncement, setFilterTextAnnouncement] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    //endregion Announcement

    //region Volunteer
    const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
    //endregion Volunteer

    //region CommentUser
    const [comments, setComments] = useState<Comment[]>([]);

    //endregion CommentUser

    //region CommentSynara
    const [commentsSynara, setCommentsSynara] = useState<SynaraComment[]>([]);

    //endregion CommentSynara

    //region CommentSynara
    const showCommentsSynara = async () => {
        const comments = await getAllSynaraComment(limit)
        setCommentsSynara(comments)
    }

    const handleBlockUserSynaraComments = async (id: number) => {
        await blockUser(id);
        await showCommentsSynara();
    };

    const handleCloseSynaraComment = async (id: number) => {
        await deleteSynaraComment(id);
        await showCommentsSynara();
    };

    const renderRecordsSynaraComments = () => {
        return commentsSynara
            .map(record => (
                <tr key={record.id} className="border-b">
                    {/*<input type="hidden" value={record.id}/>*/}
                    <td className="px-4 py-2">Ім'я: {record.author.firstName}
                        <br/>Прізвище: {record.author.lastName}
                        <br/>email: {record.author.email}
                        <br/>РНОКПП/ІПН: {record.author.UNP}
                        <br/>Номер телефону: {record.author.phoneNumber}
                    </td>
                    <td className="px-4 py-2">{record.text}</td>
                    <td className="px-4 py-2">{record.rating}</td>
                    <td className="px-4 py-2">{record.dateCreated.split('T')[0]}</td>
                    <td className="px-4 py-2 flex space-x-2">
                        <button
                            className="bg-perfect-yellow hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleBlockUserSynaraComments(record.author.id)}
                        >
                            Заблокувати/розблокувати автора
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleCloseSynaraComment(record.id)}
                        >
                            Видалити коментар
                        </button>
                    </td>
                </tr>
            ));
    };
    //endregion CommentSynara

    //region CommentUser
    const showComments = async () => {
        const comments = await getAllCommentAboutUser(limit)
        setComments(comments)
    }

    const handleBlockUserComments = async (id: number) => {
        await blockUser(id);
        await showComments();
    };

    const handleCloseComment = async (id: number) => {
        await deleteComment(id);
        await showComments();
    };

    const renderRecordsComments = () => {
        return comments
            .map(record => (
                <tr key={record.id} className="border-b">
                    {/*<input type="hidden" value={record.id}/>*/}
                    <td className="px-4 py-2">Ім'я: {record.author.firstName}
                        <br/>Прізвище: {record.author.lastName}
                        <br/>email: {record.author.email}
                        <br/>РНОКПП/ІПН: {record.author.UNP}
                        <br/>Номер телефону: {record.author.phoneNumber}
                    </td>
                    <td className="px-4 py-2">Ім'я: {record.volunteer.user.firstName}
                        <br/>Прізвище: {record.volunteer.user.lastName}
                        <br/>email: {record.volunteer.user.email}
                        <br/>РНОКПП/ІПН: {record.volunteer.user.UNP}
                        <br/>Номер телефону: {record.volunteer.user.phoneNumber}</td>
                    <td className="px-4 py-2">{record.description}</td>
                    <td className="px-4 py-2">{record.rating}</td>
                    <td className="px-4 py-2">{record.dateCreated.split('T')[0]}</td>
                    <td className="px-4 py-2 flex space-x-2">
                        <button
                            className="bg-perfect-yellow hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleBlockUserComments(record.author.id)}
                        >
                            Заблокувати/розблокувати автора
                        </button>
                        <button
                            className="bg-perfect-yellow hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleBlockUserComments(record.volunteer.user.id)}
                        >
                            Заблокувати/розблокувати волонтера
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleCloseComment(record.id)}
                        >
                            Видалити коментар
                        </button>
                    </td>
                </tr>
            ));
    };

    //endregion CommentUser


    //region Gathering
    const [gatherings, setGatherings] = useState<Gathering[]>([]);
    const [queryGathering, setQueryGathering] = useState('');

    //endregion Gathering

    //region Petition
    const [petitions, setPetitions] = useState<Petition[]>([]);
    // const [filterTextPetition, setFilterTextPetition] = useState('');


    //endregion Petition

    //region Volunteer
    const showVolunteers = async () => {
        const users = await getUsers(limit, volunteer)
        setVolunteers(users)
    }

    const handleBlockVolunteers = async (id: number) => {
        await blockUser(id);
        await showVolunteers();
    };

    const handleCloseVolunteer = async (id: number) => {
        await deleteUser(id);
        await showVolunteers();
    };

    const handleShowMoreUser = async (id: number) => {
        navigate(`/user-details/${id}`)
    };

    const renderRecordsVolunteers = () => {
        return volunteers
            .map(record => (
                <tr key={record.id} className="border-b">
                    {/*<input type="hidden" value={record.id}/>*/}
                    <td className="px-4 py-2">{record.firstName}</td>
                    <td className="px-4 py-2">{record.lastName}</td>
                    <td className="px-4 py-2">{record.gender}</td>
                    <td className="px-4 py-2">{record.phoneNumber}</td>
                    <td className="px-4 py-2">{record.birthDate}</td>
                    <td className="px-4 py-2">{record.email}</td>
                    <td className="px-4 py-2">{record.UNP}</td>
                    <td className="px-4 py-2">{record.age}</td>
                    <td className="px-4 py-2">{record.isBlockedUser ? "заблоковано" : "не заблоковано"}</td>
                    <td className="px-4 py-2">{record.isConfirmedEmail ? "так" : "ні"}</td>
                    <td className="px-4 py-2">{record.isPhoneVerified ? "так" : "ні"}</td>
                    <td className="px-4 py-2 flex space-x-2">
                        <button
                            className="bg-green-600 hover:bg-green-800 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleShowMoreUser(record.id)}
                        >
                            Переглянути
                        </button>
                        <button
                            className="bg-perfect-yellow hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleBlockVolunteers(record.id)}
                        >
                            Заблокувати/розблокувати
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleCloseVolunteer(record.id)}
                        >
                            Видалити
                        </button>
                    </td>
                </tr>
            ));
    };
    //endregion Volunteer

    //region User
    const showUsers = async () => {
        const users = await getUsers(limit, victim)
        setUsers(users)
    }

    const handleBlockUser = async (id: number) => {
        await blockUser(id);
        await showUsers();
    };

    const handleCloseUser = async (id: number) => {
        await deleteUser(id);
        await showUsers();
    };

    const renderRecordsUsers = () => {
        return users
            .map(record => (
                <tr key={record.id} className="border-b">
                    {/*<input type="hidden" value={record.id}/>*/}
                    <td className="px-4 py-2">{record.firstName}</td>
                    <td className="px-4 py-2">{record.lastName}</td>
                    <td className="px-4 py-2">{record.gender}</td>
                    <td className="px-4 py-2">{record.phoneNumber}</td>
                    <td className="px-4 py-2">{record.birthDate}</td>
                    <td className="px-4 py-2">{record.email}</td>
                    <td className="px-4 py-2">{record.UNP}</td>
                    <td className="px-4 py-2">{record.age}</td>
                    <td className="px-4 py-2">{record.isBlockedUser ? "заблоковано" : "не заблоковано"}</td>
                    <td className="px-4 py-2">{record.isConfirmedEmail ? "так" : "ні"}</td>
                    <td className="px-4 py-2">{record.isPhoneVerified ? "так" : "ні"}</td>
                    <td className="px-4 py-2 flex space-x-2">
                        <button
                            className="bg-perfect-yellow hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleBlockUser(record.id)}
                        >
                            Заблокувати/розблокувати
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleCloseUser(record.id)}
                        >
                            Видалити
                        </button>
                    </td>
                </tr>
            ));
    };
    //endregion User

    //region Petition
    const showPetitions = async () => {
        const petitions = await getPetitions(limit)
        setPetitions(petitions);
    }

    const handleBlockPetition = async (id: number) => {
        await blockPetition(id);
        await showPetitions();
    };


    const handleClosePetition = async (id: number) => {
        await deletePetition(id);
        await showPetitions();
    };

    const renderRecordsPetitions = () => {
        return petitions
            .map(record => (
                <tr key={record.id} className="border-b">
                    <td className="px-4 py-2">{record.id}</td>
                    <td className="px-4 py-2">{record.title}</td>
                    <td className="px-4 py-2">{record.text}</td>
                    <td className="px-4 py-2">{record.topic}</td>
                    <td className="px-4 py-2">{record.type}</td>
                    <td className="px-4 py-2">{record.creationDate.split("T")[0]}</td>
                    <td className="px-4 py-2">{record.deadline.split("T")[0]}</td>
                    <td className="px-4 py-2">{record.link}</td>
                    <td className="px-4 py-2">Ім'я: {record.author.firstName}
                        <br/>Прізвище: {record.author.lastName}
                        <br/>email: {record.author.email}
                        <br/>РНОКПП/ІПН: {record.author.UNP}
                        <br/>Номер телефону: {record.author.phoneNumber}
                    </td>
                    <td className="px-4 py-2">{record.petitionNumber}</td>
                    <td className="px-4 py-2">{record.responseDate}</td>
                    <td className="px-4 py-2">{record.signatureCount}</td>
                    <td className="px-4 py-2">{record.hasResponse ? "так" : "ні"}</td>
                    <td className="px-4 py-2">{record.is_completed ? "так" : "ні"}</td>
                    <td className="px-4 py-2">{record.isBlockedPetition ? "заблоковано" : "не заблоковано"}</td>
                    <td className="px-4 py-2 flex space-x-2">
                        <button
                            className="bg-perfect-yellow hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleBlockPetition(record.id)}
                        >
                            Заблокувати/розблокувати
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleClosePetition(record.id)}
                        >
                            Видалити
                        </button>
                    </td>
                </tr>
            ));
    };
    //endregion Petition

    //region Gathering
    const showGathering = async () => {
        const dataFetched = await fetchGatheringsWithoutParams(limit);
        setGatherings(dataFetched)
    }
    const handleQueryChangeGathering = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryGathering(e.target.value);
    };

    const handleBlockGathering = async (id: number) => {
        await blockGathering(id);
        await showGathering();
    };

    const handleCloseGathering = async (id: number) => {
        await deleteGathering(id);
        await showGathering();
    };

    const renderRecordsGathering = () => {
        return gatherings
            .map(record => (
                <tr key={record.id} className="border-b">
                    {/*<input type="hidden" value={record.id}/>*/}
                    <td className="px-4 py-2">{record.name}</td>
                    <td className="px-4 py-2">{record.description}</td>
                    <td className="px-4 py-2">{record.detail}</td>
                    <td className="px-4 py-2">{record.startGathering}</td>
                    <td className="px-4 py-2">{record.endGathering}</td>
                    <td className="px-4 py-2">{record.goal}</td>
                    <td className="px-4 py-2">{record.collected}</td>
                    <td className="px-4 py-2">{record.numberOfCard}</td>
                    <td className="px-4 py-2">{record.whoNeedHelp}</td>
                    <td className="px-4 py-2">{record.whereMoneyWillUsed}</td>
                    <td className="px-4 py-2">{record.createdAt.split("T")[0]}</td>
                    <td className="px-4 py-2">{record.isBlockedGathering ? "заблоковано" : "не заблоковано"}</td>
                    <td className="px-4 py-2">Ім'я: {record.user.firstName}
                        <br/>Прізвище: {record.user.lastName}
                        <br/>email: {record.user.email}
                        <br/>РНОКПП/ІПН: {record.user.UNP}
                        <br/>Номер телефону: {record.user.phoneNumber}
                    </td>
                    <td className="px-4 py-2 flex space-x-2">
                        <button
                            className="bg-perfect-yellow hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleBlockGathering(record.id)}
                        >
                            Заблокувати/розблокувати
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleCloseGathering(record.id)}
                        >
                            Видалити
                        </button>
                    </td>
                </tr>
            ));
    };

    //endregion Gathering


    //region Announcement


    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };


    const categories =
        ['Психологічна', 'Гуманітарна', 'Інформаційна', 'Матеріальна'];

    const handleTabChange = async (tab: RecordType) => {
        setActiveTab(tab);
        if (activeTab === 'zbori') showGathering();
        if (activeTab === 'peticii') showPetitions();
        if (activeTab === 'ogoloshennya') showAnnouncement();
        if (activeTab === 'user') showUsers();
        if (activeTab === 'volunteer') showVolunteers();
        if (activeTab === 'comment') showComments();
        if (activeTab === 'synara_comment') showCommentsSynara();
    };

    const handleClose = async (id: number) => {
        await deleteAnnouncement(id);
        await showAnnouncement();
    };

    const handleBlockAnnouncement = async (id: number) => {
        await blockAnnouncement(id);
        await showAnnouncement();
    };

    const showAnnouncement = async () => {
        const announcements = await getFilteredAnnouncements(filterTextAnnouncement, selectedCategories, limit, 0);
        setAnnouncements(announcements)
    }

    const renderRecords = () => {
        return announcements
            .map(record => (
                <tr key={record.id} className="border-b">
                    {/*<input type="hidden" value={record.id}/>*/}
                    <td className="px-4 py-2">{record.title}</td>
                    <td className="px-4 py-2">{record.description}</td>
                    <td className="px-4 py-2">{record.currentLocation}</td>
                    <td className="px-4 py-2">{record.date_posted.split("T")[0]}</td>
                    <td className="px-4 py-2">{record.details}</td>
                    <td className="px-4 py-2">{record.responsesCount}</td>
                    <td className="px-4 py-2">{record.viewsCount}</td>
                    <td className="px-4 py-2">{record.isBlockedAnnouncement ? "заблоковано" : "не заблоковано"}</td>
                    <td className="px-4 py-2">{record.is_completed ? "так" : "ні"}</td>
                    <td className="px-4 py-2">Ім'я: {record.user.firstName}
                        <br/>Прізвище: {record.user.lastName}
                        <br/>email: {record.user.email}
                        <br/>РНОКПП/ІПН: {record.user.UNP}
                        <br/>Номер телефону: {record.user.phoneNumber}
                    </td>
                    <td className="px-4 py-2 flex space-x-2">
                        <button
                            className="bg-perfect-yellow hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleBlockAnnouncement(record.id)}
                        >
                            Заблокувати/розблокувати
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleClose(record.id)}
                        >
                            Видалити
                        </button>
                    </td>
                </tr>
            ));
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const AnnouncementSideBarClosed = async () => {
        setSidebarOpen(false);
        const announcements = await getFilteredAnnouncements(filterTextAnnouncement, selectedCategories, limit, 0,);
        setAnnouncements(announcements)
    }


    const handleFilterChangeAnnouncement = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterTextAnnouncement(e.target.value);
    };
    //endregion Announcement

    const showAll = () => {
        showAnnouncement();
        showGathering();
        showPetitions();
        showUsers();
        showVolunteers();
        showComments();
        showCommentsSynara();
    }

    const showAllAnnouncement = async () => {
        const announcements = await getAnnouncements();
        setAnnouncements(announcements)
    }

    const showAllGathering = async () => {
        const dataFetched = await fetchGatheringsWithoutParams(null);
        setGatherings(dataFetched)
    }

    const showAllPetitions = async () => {
        const petitions = await getPetitions(limit)
        setPetitions(petitions);
    }

    const showAllUsers = async () => {
        const users = await getUsers(null, victim)
        setUsers(users)
    }

    const showAllVolunteers = async () => {
        const users = await getUsers(null, volunteer)
        setVolunteers(users)
    }

    const showAllComments = async () => {
        const comments = await getAllCommentAboutUser(null)
        setComments(comments)
    }

    const showAllCommentsSynara = async () => {
        const comments = await getAllSynaraComment(null)
        setCommentsSynara(comments)
    }

    const showAllRecordsByCategory = () => {
        if(activeTab === 'ogoloshennya') showAllAnnouncement();
        if(activeTab === 'zbori') showAllGathering();
        if(activeTab === 'peticii') showAllPetitions();
        if(activeTab === 'user') showAllUsers();
        if(activeTab === 'volunteer') showAllVolunteers();
        if(activeTab === 'comment') showAllComments();
        if(activeTab === 'synara_comment') showAllCommentsSynara();
    }

    return (
        <div className="container p-4">
            <h1 className="text-2xl font-bold mb-4 ">Адмін-панель</h1>

            <div className="flex items-center justify-center">
                <h3 className="text-lg font-montserratRegular mb-4 mx-5">Ліміт</h3>
                <input
                    type="number"
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Пошук"
                    value={limit}
                    onChange={handleLimitChangeGathering}
                />

                <button className="bg-light-blue text- py-2 px-4 rounded w-[20vw] h-[2vw] mx-5"
                        onClick={showAll}>Показати
                </button>

                <button className="bg-perfect-yellow py-2 px-4 w-[20vw] h-[2vw] mx-5 rounded"
                        onClick={showAllRecordsByCategory}>Показати всі записи по вибраній категорії категорії
                </button>
            </div>

            <div className="flex space-x-4 mb-6">
                <button
                    className={`py-2 px-4 ${activeTab === 'ogoloshennya' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
                    onClick={() => handleTabChange('ogoloshennya')}
                >
                    Оголошення
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'zbori' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
                    onClick={() => handleTabChange('zbori')}
                >
                    Збори
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'peticii' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
                    onClick={() => handleTabChange('peticii')}
                >
                    Петиції
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
                    onClick={() => handleTabChange('user')}
                >
                    Користувачі
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'volunteer' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
                    onClick={() => handleTabChange('volunteer')}
                >
                    Волонтери
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'comment' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
                    onClick={() => handleTabChange('comment')}
                >
                    Коментарі
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'synara_comment' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
                    onClick={() => handleTabChange('synara_comment')}
                >
                    Коментарі про Synara
                </button>
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded"
                    onClick={toggleSidebar}
                >
                    Фільтрувати
                </button>
            </div>

            {
                activeTab === 'ogoloshennya' ?
                    announcements.length > 0 ? (
                        <table className="bg-white border">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Назва</th>
                                <th className="px-4 py-2 border-b">Опис</th>
                                <th className="px-4 py-2 border-b">Поточна позиція</th>
                                <th className="px-4 py-2 border-b">Дата опублікування</th>
                                <th className="px-4 py-2 border-b">Деталі</th>
                                <th className="px-4 py-2 border-b">Число відгукнувшихся</th>
                                <th className="px-4 py-2 border-b">Кількіть переглядів</th>
                                <th className="px-4 py-2 border-b">Блокування оголошення</th>
                                <th className="px-4 py-2 border-b">Чи виконане оголошення</th>
                                <th className="px-4 py-2 border-b">Автор оголошення</th>
                            </tr>
                            </thead>
                            <tbody>{renderRecords()}</tbody>
                        </table>
                    ) : <>оголошення відсутні
                    </>
                    : null
            }

            {
                activeTab === 'peticii' ?
                    petitions.length > 0 ? (
                        <table className=" bg-white border">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Id</th>
                                <th className="px-4 py-2 border-b">Назва</th>
                                <th className="px-4 py-2 border-b">Текст</th>
                                <th className="px-4 py-2 border-b">Тема</th>
                                <th className="px-4 py-2 border-b">Тип</th>
                                <th className="px-4 py-2 border-b">Дата створення</th>
                                <th className="px-4 py-2 border-b">Срок</th>
                                <th className="px-4 py-2 border-b">Посилання</th>
                                <th className="px-4 py-2 border-b">Автор петиції</th>
                                <th className="px-4 py-2 border-b">Номер петиції</th>
                                <th className="px-4 py-2 border-b">Дата відклику</th>
                                <th className="px-4 py-2 border-b">Кількість підписів</th>
                                <th className="px-4 py-2 border-b">Чи має відповідь</th>
                                <th className="px-4 py-2 border-b">Чи завершена</th>
                                <th className="px-4 py-2 border-b">Блокування петиції</th>
                            </tr>
                            </thead>
                            <tbody>{renderRecordsPetitions()}</tbody>
                        </table>
                    ) : <>петиції відсутні</>
                    : null
            }

            {
                activeTab === 'zbori' ?
                    gatherings.length > 0 ? (
                        <table className="min-w-full bg-white border">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Назва</th>
                                <th className="px-4 py-2 border-b">Опис</th>
                                <th className="px-4 py-2 border-b">Деталі</th>
                                <th className="px-4 py-2 border-b">Початок зборів</th>
                                <th className="px-4 py-2 border-b">Кінець зборів</th>
                                <th className="px-4 py-2 border-b">Ціль</th>
                                <th className="px-4 py-2 border-b">Зібрано</th>
                                <th className="px-4 py-2 border-b">Номер кардки</th>
                                <th className="px-4 py-2 border-b">Хто потребує на допомогу</th>
                                <th className="px-4 py-2 border-b">Де гроші будуть використані</th>
                                <th className="px-4 py-2 border-b">Дата створення</th>
                                <th className="px-4 py-2 border-b">Блокування збору</th>
                                <th className="px-4 py-2 border-b">Автор збору</th>
                            </tr>
                            </thead>
                            <tbody>{renderRecordsGathering()}</tbody>
                        </table>
                    ) : <>збори відсутні</>
                    : null
            }


            {
                activeTab === 'user' ?
                    gatherings.length > 0 ? (
                        <table className="min-w-full bg-white border">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Ім'я</th>
                                <th className="px-4 py-2 border-b">Прізвище</th>
                                <th className="px-4 py-2 border-b">Стать</th>
                                <th className="px-4 py-2 border-b">Номер телефону</th>
                                <th className="px-4 py-2 border-b">День народження</th>
                                <th className="px-4 py-2 border-b">Email</th>
                                <th className="px-4 py-2 border-b">РНОКПП/ІПН</th>
                                <th className="px-4 py-2 border-b">Вік</th>
                                <th className="px-4 py-2 border-b">Блокування користувача</th>
                                <th className="px-4 py-2 border-b">Чи підтверджений email</th>
                                <th className="px-4 py-2 border-b">Чи підтверджений телефон</th>
                            </tr>
                            </thead>
                            <tbody>{renderRecordsUsers()}</tbody>
                        </table>
                    ) : <>користувачі відсутні</>
                    : null
            }

            {
                activeTab === 'volunteer' ?
                    volunteers.length > 0 ? (
                        <table className="min-w-full bg-white border">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Ім'я</th>
                                <th className="px-4 py-2 border-b">Прізвище</th>
                                <th className="px-4 py-2 border-b">Стать</th>
                                <th className="px-4 py-2 border-b">Номер телефону</th>
                                <th className="px-4 py-2 border-b">День народження</th>
                                <th className="px-4 py-2 border-b">Email</th>
                                <th className="px-4 py-2 border-b">РНОКПП/ІПН</th>
                                <th className="px-4 py-2 border-b">Вік</th>
                                <th className="px-4 py-2 border-b">Блокування користувача</th>
                                <th className="px-4 py-2 border-b">Чи підтверджений email</th>
                                <th className="px-4 py-2 border-b">Чи підтверджений телефон</th>
                            </tr>
                            </thead>
                            <tbody>{renderRecordsVolunteers()}</tbody>
                        </table>
                    ) : <>волонтери відсутні</>
                    : null
            }

            {
                activeTab === 'comment' ?
                    comments.length > 0 ? (
                        <table className="min-w-full bg-white border">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Автор коментару</th>
                                <th className="px-4 py-2 border-b">Волонер, про якого коментару</th>
                                <th className="px-4 py-2 border-b">Опис коментару</th>
                                <th className="px-4 py-2 border-b">Рейтинг</th>
                                <th className="px-4 py-2 border-b">Дата створення</th>
                            </tr>
                            </thead>
                            <tbody>{renderRecordsComments()}</tbody>
                        </table>
                    ) : <>коментарі відсутні</>
                    : null
            }
            {
                activeTab === 'synara_comment' ?
                    comments.length > 0 ? (
                        <table className="min-w-full bg-white border">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Автор коментару</th>
                                <th className="px-4 py-2 border-b">Текст</th>
                                <th className="px-4 py-2 border-b">Рейтинг</th>
                                <th className="px-4 py-2 border-b">Дата створення</th>
                            </tr>
                            </thead>
                            <tbody>{renderRecordsSynaraComments()}</tbody>
                        </table>
                    ) : <>коментарі відсутні</>
                    : null
            }

            {/* Сайдбар для фильтрации */}
            <div
                className={`fixed top-0 right-0 w-64 h-full bg-gray-100 shadow-lg p-4 transition-transform transform ${
                    sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {
                    activeTab === 'ogoloshennya' ? (
                        <>
                            <h2 className="text-xl font-bold mb-4">Фільтрувати</h2>
                            <h3 className="text-lg font-montserratRegular mb-4">Категорія допомоги</h3>

                            <div className="flex flex-col space-y-2">
                                {categories.map((category, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => toggleCategory(category)}
                                        className={`w-full py-1 border font-montserratRegular border-blue-500 rounded-full
                                ${selectedCategories.includes(category) ? 'bg-dark-blue text-white' : ''}`}
                                    >
                                        {t(`categories${index + 1}`)}
                                    </Button>
                                ))}
                            </div>
                            <h3 className="text-lg font-montserratRegular mb-4">Пошук оголошення</h3>

                            {/* Поле для фильтрации */}
                            <input
                                type="text"
                                className="w-full p-2 mb-4 border rounded"
                                placeholder="Пошук"
                                value={filterTextAnnouncement}
                                onChange={handleFilterChangeAnnouncement}
                            />

                            {/* Кнопка закрытия сайдбара */}
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded w-full"
                                onClick={toggleSidebar}
                            >
                                Закрити
                            </button>

                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded w-full"
                                onClick={AnnouncementSideBarClosed}
                            >
                                Примінити
                            </button>
                        </>
                    ) : null
                }

                {
                    activeTab === 'zbori' ? (
                        <>
                            <h3 className="text-lg font-montserratRegular mb-4">Пошук зборів</h3>

                            <h3 className="text-lg font-montserratRegular mb-4">Пошук зборів</h3>
                            <input
                                type="text"
                                className="w-full p-2 mb-4 border rounded"
                                placeholder="Пошук"
                                value={queryGathering}
                                onChange={handleQueryChangeGathering}
                            />
                        </>
                    ) : null
                }

            </div>
        </div>
    );
};

export default AdminPage;
