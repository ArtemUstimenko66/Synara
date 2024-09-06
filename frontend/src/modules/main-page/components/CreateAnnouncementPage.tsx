import React, { ChangeEvent, useRef, useState } from 'react';
import MainHeader from "../../../modules/main-page/components/MainHeader.tsx";
import Wrapper from "../../../ui/Wrapper.tsx";
import { Button } from "../../../ui/Button.tsx";
import Footer from "../../../components/Footer.tsx";
import { SideBar } from "./SideBar.tsx";
import DeleteImg from "../../../assets/images/DeleteImg.svg?react";
import { Announcement } from "../interfaces/Announcement.tsx";
import {createAnnouncement, uploadDocument} from "../api/mainPageService.ts";
import {useNavigate} from "react-router-dom";

const CreateAnnouncementPage: React.FC = () => {
    const [datePosted, setDatePosted] = useState<string>('');
    const [localData, setLocalData] = useState<Partial<Announcement>>({
        description: '',
        datePosted: '',
        helpTypes: [],
        documents: [],
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Обработчик даты
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);
        if (value.length >= 2 && value.length <= 4) {
            value = value.replace(/(\d{2})(\d+)/, '$1 / $2');
        } else if (value.length > 4) {
            value = value.replace(/(\d{2})(\d{2})(\d+)/, '$1 / $2 / $3');
        }
        setDatePosted(value);
    };

    // Обработчик выбора типа помощи (только один)
    const handleHelpSelect = (helpType: string) => {
        setLocalData(prevData => ({
            ...prevData,
            helpTypes: [helpType], // Оставляем только один выбранный тип
        }));
    };

    // Обработчик загрузки файлов
    const handleDocumentUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newDocuments = Array.from(event.target.files);
            setLocalData(prevData => ({
                ...prevData,
                documents: [...(prevData.documents || []), ...newDocuments],
            }));
        }
    };

    // Обработчик удаления файла
    const handleRemoveDocument = (fileName: string) => {
        setLocalData(prevData => ({
            ...prevData,
            documents: prevData.documents?.filter(file => file.name !== fileName),
        }));
    };

    // Валидация полей
    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};
        if (!datePosted) {
            newErrors.datePosted = 'Будь ласка, введіть дату';
        }
        if (!localData.description) {
            newErrors.description = 'Будь ласка, введіть опис';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Обработчик отправки формы
    const helpTypesMap: { [key: string]: string } = {
        'Гуманітарна': 'humanitarian',
        'Інформаційна': 'informational',
        'Психологічна': 'psychological',
        'Матеріальна': 'material',
    };

// Функция для перевода типа помощи
    const translateHelpType = (helpType: string): string => {
        return helpTypesMap[helpType] || 'humanitarian'; // Вернуть 'humanitarian' по умолчанию, если тип не найден
    };



    const uploadAllDocuments = async (files: File[]): Promise<string[]> => {
        const uploadPromises = files.map(file => uploadDocument(file));
        try {
            const responses = await Promise.all(uploadPromises);
            return responses.map(response => response.fileUrl); // Предположим, что сервер возвращает URL файлов
        } catch (error) {
            console.error("Failed to upload some documents:", error);
            throw error;
        }
    };


    const navigate = useNavigate(); // Хук для навигации
// Обработчик отправки формы
    const handleSubmit = async () => {
        if (validateFields()) {
            try {
                // Загрузка всех документов и получение их URL
                const documentUrls = await uploadAllDocuments(localData.documents || []);

                // Подготовка данных для создания объявления
                const finalData = {
                    description: localData.description || '',
                    datePosted: datePosted,
                    typeHelp: translateHelpType(localData.helpTypes?.[0] || 'Гуманітарна'), // Переводим тип помощи
                    files: documentUrls, // Вставляем URL файлов в данные
                };

                // Вызов функции добавления объявления
                await createAnnouncement(finalData);
                console.log("Объявление успешно создано");
                navigate('/main');
            } catch (error) {
                console.error('Ошибка при создании объявления:', error);
            }
        }
    };



    return (
        <Wrapper>
            <div className="min-h-screen bg-almost-white">
                <MainHeader />
                <h2 className="text-h2 font-kharkiv text-center mt-24">Заповніть дані</h2>

                <div className="w-full mb-4">
                    <label className="font-montserratRegular mb-2">Дата*</label>
                    <input
                        type="text"
                        placeholder="ДД / ММ / РРРР"
                        value={datePosted}
                        onChange={handleDateChange}
                        className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                    />
                    {errors.datePosted && <p className="text-red-500 text-sm">{errors.datePosted}</p>}
                </div>

                <div className="w-full flex flex-col mb-4">
                    <label className="font-montserratRegular mb-2">Опис*</label>
                    <textarea
                        value={localData.description}
                        placeholder="Ваш опис"
                        className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue resize-none"
                        rows={6}
                        onChange={(e) => setLocalData(prevData => ({ ...prevData, description: e.target.value }))}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                <div className="w-full mb-4">
                    <label className="font-montserratRegular mb-2">Яку допомогу ви можете надавати:*</label>
                    <div className="flex mt-4 space-x-10 flex-wrap gap-1">
                        {['Психологічна', 'Гуманітарна', 'Інформаційна', 'Матеріальна'].map(helpType => (
                            <button
                                key={helpType}
                                onClick={() => handleHelpSelect(helpType)}
                                className={`py-2 px-4 rounded-full mt-1 border-2 text-center ${
                                    (localData.helpTypes as string[]).includes(helpType)
                                        ? 'bg-dark-blue border-dark-blue text-white'
                                        : 'border-light-blue'
                                }`}
                            >
                                {helpType}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full mb-4">
                    <div className="flex flex-col">
                        <label className="font-montserratRegular">Додати фото</label>
                        <button
                            className="w-52 mb-2 mt-2 p-2 uppercase text-center border-2 rounded-lg outline-none border-light-blue text-light-blue"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Додати
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="application/pdf,image/*"
                            className="hidden"
                            onChange={handleDocumentUpload}
                        />
                        <div>
                            {localData.documents?.map((doc, index) => (
                                <div key={index} className="flex items-center justify-between mt-1 p-3 rounded-lg border-2 bg-baby-blue border-baby-blue">
                                    <p className="font-montserratRegular text-sm">{doc.name}</p>
                                    <button onClick={() => handleRemoveDocument(doc.name)}>
                                        <DeleteImg />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Button
                    isFilled={true}
                    className="w-full text-almost-white uppercase font-montserratRegular py-4 rounded-full mb-6"
                    onClick={handleSubmit}
                >
                    Додати
                </Button>

                <SideBar isOpen={false} onClose={() => {}} isFilters={true} />
                <Footer />
            </div>
        </Wrapper>
    );
};

export default CreateAnnouncementPage;