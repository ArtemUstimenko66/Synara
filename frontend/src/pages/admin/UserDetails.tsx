import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getOneVolunteer, updateVolunteer} from "./api/adminPageService.ts";
import {Button} from "../../ui/Button.tsx";
import {Player} from "@lottiefiles/react-lottie-player";
import loadingAnimation from "../../assets/animations/logoLoading.json";
import {getHelpTypeInUkrainianEngToUkr} from "../../data/helpTypesMap.ts";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    UNP: string;
    avatarUrl: string;
    files: Array<{ id: number, fileName: string, fileUrl: string, fileType: string }>;
    volunteer: { city : string, description: string, endTime: string,
        endWorkingDay: string, rating:string, region: string,
        startTime:string,startWorkingDay:string, support_description:string,
        supports: string[], volunteer_identification_number:string, moderator_answer : string }
}

const UserDetails: React.FC = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [moderatorAnswer, setModeratorAnswer] = useState('');

    useEffect(() => {
        getUser()
    }, []);

    const getUser = async () => {
        try {
            const user = await getOneVolunteer(Number(id));
            setUser(user);
            if(user.volunteer.moderator_answer !== null){
                setModeratorAnswer(user.volunteer.moderator_answer)
            }
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        } finally {
            setLoading(false);
        }
    };


    const backAdmin = () => {
        navigate(`/admin`)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Player
                    autoplay
                    loop
                    src={loadingAnimation}
                    style={{height: '200px', width: '200px'}}
                />
            </div>
        );
    }

    const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value){
            setModeratorAnswer(e.target.value);
        }
    };

    const saveModeratorAnswer = async() => {
        await updateVolunteer(Number(id), moderatorAnswer);
        getUser()
    }

    return (
        <div className="p-4 w-full">
            {
                user != undefined ? (
                    <>
                        <h3 className="text-lg font-montserratRegular mb-4 mx-5">Ім'я: {user.firstName}</h3>
                        <h3 className="text-lg font-montserratRegular mb-4 mx-5">Прізвище: {user.lastName}</h3>
                        <h3 className="text-lg font-montserratRegular mb-4 mx-5">РНОКПП/ІПН: {user.UNP}</h3>
                        <h3 className="text-lg font-montserratRegular mb-4 mx-5">Номер телефону: {user.phoneNumber}</h3>
                        <h3 className="text-lg font-montserratRegular mb-4 mx-5">Опис: {user.volunteer.description}</h3>
                        <h3 className="text-lg font-montserratRegular mb-4 mx-5">Рейтинг: {user.volunteer.rating}</h3>
                        <h3 className="text-lg font-montserratRegular mb-4 mx-5">Регіон: {user.volunteer.region}</h3>
                        <h3 className="text-lg font-montserratRegular mb-4 mx-5">Місто: {user.volunteer.city}</h3>
                        <h3 className="text-lg font-montserratRegular mb-4 mx-5">Початок робочих днів: {user.volunteer.startWorkingDay}</h3>
                        <h3 className="text-lg font-montserratRegular mb-4 mx-5">Кінець робочих днів: {user.volunteer.endWorkingDay}</h3>
                        <h3 className="text-lg font-montserratRegular mb-4 mx-5">Початок часу роботи: {user.volunteer.startTime}</h3>
                        <h3 className="text-lg font-montserratRegular mb-4 mx-5">Кінець часу роботи: {user.volunteer.endTime}</h3>
                        <h3 className="text-lg font-montserratRegular mb-4 mx-5">Номер волонтера: {user.volunteer.volunteer_identification_number}</h3>
                        <h3 className="text-lg font-montserratRegular mb-4 mx-5">Опис домоги: {user.volunteer.support_description}</h3>
                        <h3 className="text-lg font-montserratRegular mb-4 mx-5">Типи надаваємої домоги:
                            {
                                user.volunteer.supports != null ? (
                                    user.volunteer.supports.length > 0 ? (
                                        user.volunteer.supports.map((support, index) => (
                                            <span key={index}
                                                  className="text-sm border border-dark-blue font-montserratRegular px-4 py-0.5 mr-2 rounded-3xl">{getHelpTypeInUkrainianEngToUkr(support)}
										</span>
                                        ))
                                    ) : null
                                ) : null
                            }</h3>
                        {
                            user.volunteer.moderator_answer === null ? null : <h3 className="text-lg font-montserratRegular mb-4 mx-5">Остання збережена відповідь модератора: {user.volunteer.moderator_answer}</h3>
                        }
                        <br/>
                        <label className="font-montserratRegular mb-2">Відповідь модератора</label>
                        <input
                            type="text"
                            name="name"
                            value={moderatorAnswer}
                            placeholder={user.volunteer.moderator_answer === null ? 'Кваліфікований' : user.volunteer.moderator_answer}
                            className="w-full p-3 border rounded-lg outline-none border-light-blue focus:border-dark-blue resize-none"
                            onChange={handleChangeAnswer}
                        />
                        <button onClick={saveModeratorAnswer} className="bg-perfect-yellow hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">Send</button>
                        <h3 className="text-lg font-montserratRegular mb-4 mx-5">Посвідчення</h3>
                        {user.files != undefined ? (
                                    user.files.length > 0 ? (
                                        <div>
                                            {user.files.map(file => (
                                                <div key={file.id} className="mb-4">
                                                    {file.fileType.startsWith("image/") ? (
                                                        <img src={file.fileUrl} alt={file.fileName}
                                                             className="w-auto h-auto"/>
                                                    ) : file.fileType === "application/pdf" ? (
                                                        <iframe
                                                            src={file.fileUrl}
                                                            title={file.fileName}
                                                            width="95%"
                                                            height="800px"
                                                            className=""
                                                        >
                                                            <p>Ваш браузер не підтримує PDF. Завантажте <a
                                                                href={file.fileUrl}>файл PDF</a>.</p>
                                                        </iframe>
                                                    ) : file.fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.fileType === "application/msword" ? (
                                                        <>
                                                            <iframe
                                                                src={`https://docs.google.com/gview?url=${encodeURIComponent(file.fileUrl)}&embedded=true`}
                                                                width="95%"
                                                                height="800px"
                                                                title={file.fileName}
                                                            >

                                                            </iframe>
                                                            <p>Для перегляду
                                                                Завантажте <a href={file.fileUrl}>файл Word</a>.</p></>
                                                    ) : (
                                                        <p>Непідтримуємий тип файла: {file.fileName}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>Немає файлів для відображення.</p>
                                    )
                        ) : (
                            <p>Немає файлів для відображення.</p>
                        )}
                    </>
                ) : null
            }

            <Button className="bg-green-600 hover:bg-green-800 text-white font-bold py-1 px-2 rounded"
                    onClick={backAdmin}>Повернутись</Button>
        </div>
    )
}

export default UserDetails;