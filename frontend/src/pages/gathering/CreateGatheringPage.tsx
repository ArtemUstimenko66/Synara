import React, { ChangeEvent, useRef, useState } from 'react';

import Wrapper from "../../ui/Wrapper.tsx";
import { Button } from "../../ui/Button.tsx";
import Footer from "../../components/Footer.tsx";
import { SideBar } from "../../modules/main-page/components/SideBar.tsx";
import DeleteImg from "../../assets/images/DeleteImg.svg?react";

import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import {createGathering, uploadDocumentGathering} from "../../modules/gathering/api/gatheringPageService.ts";
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../assets/animations/logoLoading.json';


const CreateGatheringPage: React.FC = () => {
    const [photoFiles, setPhotoFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();
    const [endGathering, setEndGathering] = useState<string>('');
    const [localData, setLocalData] = useState({
        name: '',
        description: '',
        detail: '',
        whoNeedHelp: '',
        whereMoneyWillUsed: '',
        goal: '',
        numberOfCard: '',
        endGathering: '',
        documents: [] as File[],
    });

    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLocalData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);

        if (value.length >= 2 && value.length <= 4) {
            value = value.replace(/(\d{2})(\d+)/, '$1 / $2');
        } else if (value.length > 4) {
            value = value.replace(/(\d{2})(\d{2})(\d+)/, '$1 / $2 / $3');
        }

        setEndGathering(value);

        setLocalData(prevData => ({
            ...prevData,
            endGathering: value
        }));

        if (value.length === 10) {
            const formattedDate = `${value.slice(6, 10)}-${value.slice(0, 2)}-${value.slice(3, 5)}`;
            setLocalData(prevData => ({
                ...prevData,
                endGathering: formattedDate
            }));
        }
    };



    const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) {
            value = value.slice(0, 16);
        }
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        setLocalData(prevData => ({
            ...prevData,
            numberOfCard: value
        }));
    };

    const handleGoalChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setLocalData(prevData => ({
            ...prevData,
            goal: value
        }));
    };

    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};

        Object.entries(localData).forEach(([key, value]) => {
            if (!value) newErrors[key] = 'Це поле є обов’язковим';
        });

        if (photoFiles.length === 0) {
            newErrors['photoFiles'] = 'Необхідно додати хоча б одну фотографію';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const uploadAllDocuments = async (files: File[], announcementId: string): Promise<string[]> => {
        const uploadPromises = files.map(file => uploadDocumentGathering(file, announcementId));
        try {
            const responses = await Promise.all(uploadPromises);
            return responses.map(response => response.fileUrl);
        } catch (error) {
            console.error("Failed to upload some documents:", error);
            throw error;
        }
    };

    const handleSubmit = async () => {
        if (!validateFields()) return;

        setIsLoading(true);

        const dataToSend = {
            ...localData,
            collected: 0,
            startGathering: new Date().toISOString().split('T')[0],
            numberOfCard: localData.numberOfCard.replace(/\s/g, '')
        };

        try {
            const createdGathering = await createGathering(dataToSend);
            if (!createdGathering) return;

            const gatheringId = createdGathering.id;

            if (localData.documents && localData.documents.length > 0) {
                await uploadAllDocuments(localData.documents, gatheringId);
            }

            navigate('/gatherings');
        } catch (error) {
            console.error("Error creating gathering:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Player
                    autoplay
                    loop
                    src={loadingAnimation}
                    style={{ height: '200px', width: '200px' }}
                />
            </div>
        );
    }

    const handleDocumentUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newDocuments = Array.from(event.target.files);
            setLocalData(prevData => ({
                ...prevData,
                documents: [...prevData.documents, ...newDocuments],
            }));
            setPhotoFiles([...photoFiles, ...newDocuments]);
        }
    };

    const handleRemoveDocument = (fileName: string) => {
        setLocalData(prevData => ({
            ...prevData,
            documents: prevData.documents.filter(file => file.name !== fileName),
        }));
        setPhotoFiles(photoFiles.filter(file => file.name !== fileName));
    };

    return (
        <Wrapper>
            <div className="min-h-screen bg-almost-white mx-[5vw]">

                {/* Header */}
                <MainHeader/>

                {/* Main part */}
                <h2 className="text-h2 font-kharkiv text-center mt-24">{t('fill_the_data')}</h2>


                {/* Gathering name */}
                <div className="w-full flex flex-col mb-4">
                    <label className="font-montserratRegular mb-2">Назва збору*</label>
                    <input
                        type="text"
                        name="name"
                        value={localData.name}
                        placeholder="Назва"
                        className="w-full p-3 border rounded-lg outline-none border-light-blue focus:border-dark-blue resize-none"
                        onChange={handleChange}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* Date */}
                <div className="w-full mb-4">
                    <label className="font-montserratRegular mb-2">{t('date')}*</label>
                    <input
                        type="text"
                        placeholder={t('date_format')}
                        value={endGathering}
                        onChange={handleDateChange}
                        className="w-full p-3 border rounded-lg outline-none border-light-blue focus:border-dark-blue"
                    />
                    {errors.endGathering && <p className="text-red-500 text-sm">{errors.endGathering}</p>}
                </div>


                {/* Sum of gathering */}
                <div className="w-full flex flex-col mb-4">
                    <label className="font-montserratRegular mb-2">Сума збору*</label>
                    <input
                        type="text"
                        name="goal"
                        value={localData.goal}
                        placeholder="Сума, яку треба зібрати"
                        className="w-full p-3 border rounded-lg outline-none border-light-blue focus:border-dark-blue resize-none"
                        onChange={handleGoalChange}
                    />
                    {errors.goal && <p className="text-red-500 text-sm">{errors.goal}</p>}
                </div>

                {/* Card number */}
                <div className="w-full flex flex-col mb-4">
                    <label className="font-montserratRegular mb-2">Номер карти*</label>
                    <input
                        type="text"
                        name="numberOfCard"
                        value={localData.numberOfCard}
                        placeholder="**** **** **** ****"
                        className="w-full p-3 border rounded-lg outline-none border-light-blue focus:border-dark-blue resize-none"
                        onChange={handleCardNumberChange}
                    />
                    {errors.numberOfCard && <p className="text-red-500 text-sm">{errors.numberOfCard}</p>}
                </div>

                {/* Description of gathering */}
                <div className="w-full flex flex-col mb-4">
                    <label className="font-montserratRegular mb-2">Опис збору*</label>
                    <textarea
                        name="description"
                        value={localData.description}
                        placeholder="Опис збору"
                        className="w-full p-3 border rounded-lg outline-none border-light-blue focus:border-dark-blue resize-none"
                        onChange={(e) => setLocalData(prevData => ({...prevData, description: e.target.value}))}
                        rows={4}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                {/* Details of gathering */}
                <div className="w-full flex flex-col mb-4">
                    <label className="font-montserratRegular mb-2">Деталі збору*</label>
                    <textarea
                        name="detail"
                        value={localData.detail}
                        placeholder="Деталі збору"
                        className="w-full p-3 border rounded-lg outline-none border-light-blue focus:border-dark-blue resize-none"
                        onChange={(e) => setLocalData(prevData => ({...prevData, detail: e.target.value}))}
                        rows={4}
                    />
                    {errors.detail && <p className="text-red-500 text-sm">{errors.detail}</p>}
                </div>

                {/* Who need help */}
                <div className="w-full flex flex-col mb-4">
                    <label className="font-montserratRegular mb-2">Кому потрібна допомога*</label>
                    <textarea
                        value={localData.whoNeedHelp}
                        placeholder={t('your_description')}
                        className="w-full p-3 border rounded-lg outline-none border-light-blue focus:border-dark-blue resize-none"
                        rows={6}
                        onChange={(e) => setLocalData(prevData => ({...prevData, whoNeedHelp: e.target.value}))}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                {/* For what we gather money */}
                <div className="w-full flex flex-col mb-4">
                    <label className="font-montserratRegular mb-2">На що підуть кошти*</label>
                    <textarea
                        value={localData.whereMoneyWillUsed}
                        placeholder={t('your_description')}
                        className="w-full p-3 border rounded-lg outline-none border-light-blue focus:border-dark-blue resize-none"
                        rows={6}
                        onChange={(e) => setLocalData(prevData => ({...prevData, whereMoneyWillUsed: e.target.value}))}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                {/* Add photo */}
                <div className="w-full mb-4">
                    <div className="flex flex-col">
                        <label className="font-montserratRegular">{t('add_photo')}*</label>
                        <button
                            className="w-52 mb-2 mt-2 p-2 uppercase text-center border rounded-full outline-none border-light-blue text-light-blue"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {t('add')}
                        </button>
                        {errors.photoFiles && <p className="text-red-500 text-sm">{errors.photoFiles}</p>}
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
                                <div key={index}
                                     className="flex items-center justify-between mt-1 p-3 rounded-lg border bg-baby-blue border-baby-blue">
                                    <p className="font-montserratRegular text-sm">{doc.name}</p>
                                    <button onClick={() => handleRemoveDocument(doc.name)}>
                                        <DeleteImg/>
                                    </button>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Create button */}
                <Button
                    isFilled={true}
                    className="w-full text-almost-black uppercase font-montserratRegular py-4 rounded-full mb-6"
                    onClick={handleSubmit}
                >
                    Створити
                </Button>

                {/* Sidebar */}
                <SideBar
                    isOpen={false}
                    onClose={() => {
                    }}
                    isFilters={false}
                    onApplyFilters={() => {
                    }}
                    onOpenMap={() => {
                    }}
                />

                {/* Footer */}
                <Footer/>
            </div>
        </Wrapper>
    );
};

export default CreateGatheringPage;