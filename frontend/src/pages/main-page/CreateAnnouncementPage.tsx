import React, { ChangeEvent, useRef, useState } from 'react';

import Wrapper from "../../ui/Wrapper.tsx";
import { Button } from "../../ui/Button.tsx";
import Footer from "../../components/Footer.tsx";
import { SideBar } from "../../modules/main-page/components/SideBar.tsx";
import DeleteImg from "../../assets/images/DeleteImg.svg?react";
import { Announcement } from "../../modules/main-page/interfaces/Announcement.tsx";
import {createAnnouncement} from "../../modules/main-page/api/mainPageService.ts";
import {useNavigate} from "react-router-dom";
import {convertDateToDBFormat} from "../../modules/main-page/helpers/convertDateToDBFormat.ts";
import {translateHelpType} from "../../modules/main-page/helpers/translateHelpType.ts";
import {uploadAllDocuments} from "../../modules/main-page/helpers/uploadAllDocuments.ts";
import {validateFields} from "../../modules/main-page/validation/validateFields.ts";
import {useTranslation} from "react-i18next";
import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../assets/animations/logoLoading.json';


const CreateAnnouncementPage: React.FC = () => {
    const [datePosted, setDatePosted] = useState<string>('');
    const [localData, setLocalData] = useState<Partial<Announcement>>({
        title: '',
        description: '',
        details: '',
        currentLocation: '',
        datePosted: '',
        helpTypes: [],
        documents: [],
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

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

    const handleHelpSelect = (helpType: string) => {
        setLocalData(prevData => ({
            ...prevData,
            helpTypes: [helpType],
        }));
        console.log("localDATA", localData);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLocalData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDocumentUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newDocuments = Array.from(event.target.files);
            setLocalData(prevData => ({
                ...prevData,
                documents: [...(prevData.documents || []), ...newDocuments],
            }));
        }
    };

    const handleRemoveDocument = (fileName: string) => {
        setLocalData(prevData => ({
            ...prevData,
            documents: prevData.documents?.filter(file => file.name !== fileName),
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const newErrors = validateFields({
            datePosted,
            description: localData.description || '',
            title: localData.title || '',
            currentLocation: localData.currentLocation || '',
            details: localData.details || '',});
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const formattedDate = convertDateToDBFormat(datePosted);
            try {
                const announcementData = {
                    description: localData.description || '',
                    datePosted: formattedDate,
                    title: localData.title || '',
                    details: localData.details || '',
                    currentLocation: localData.currentLocation || '',
                    typeHelp: translateHelpType(localData.helpTypes?.[0] || 'Гуманітарна'),
                };
                console.log("announcementData -> ",announcementData);

                const createdAnnouncement = await createAnnouncement(announcementData);
                const announcementId = createdAnnouncement.id;

                if (localData.documents && localData.documents.length > 0) {
                    await uploadAllDocuments(localData.documents, announcementId);
                }

                console.log("Successfully uploaded announcement");
                navigate('/main');
            } catch (error) {
                console.error('Error uploading announcement:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    };

    const { t } = useTranslation();

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

    return (
        <Wrapper>
            <div className="min-h-screen bg-almost-white mx-[5vw]">

                {/* Header */}
                <MainHeader/>

                {/* Main part */}
                <h2 className="text-h2 font-kharkiv text-center mt-24">{t('fill_the_data')}</h2>

                {/* Announcement name */}
                <div className="w-full flex flex-col mb-4">
                    <label className="font-montserratRegular mb-2">{t('announcement_title')}*</label>
                    <input
                        type="text"
                        name="title"
                        value={localData.title}
                        placeholder={t('name_ad')}
                        className="w-full p-3 border rounded-lg outline-none border-light-blue focus:border-dark-blue resize-none"
                        onChange={handleChange}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>


                {/* Date */}
                <div className="w-full mb-4">
                    <label className="font-montserratRegular mb-2">{t('date')}*</label>
                    <input
                        type="text"
                        placeholder={t('date_format')}
                        value={datePosted}
                        onChange={handleDateChange}
                        className="w-full p-3 border rounded-lg outline-none border-light-blue focus:border-dark-blue"
                    />
                    {errors.datePosted && <p className="text-red-500 text-sm">{errors.datePosted}</p>}
                </div>

                {/* Place */}
                <div className="w-full flex flex-col mb-4">
                    <label className="font-montserratRegular mb-2">{t('place')}*</label>
                    <input
                        type="text"
                        name="currentLocation"
                        value={localData.currentLocation}
                        placeholder={t('online_offline_place')}
                        className="w-full p-3 border rounded-lg outline-none border-light-blue focus:border-dark-blue resize-none"
                        onChange={handleChange}
                    />
                    {errors.currentLocation && <p className="text-red-500 text-sm">{errors.currentLocation}</p>}
                </div>

                {/* Description */}
                <div className="w-full flex flex-col mb-4">
                    <label className="font-montserratRegular mb-2">{t('description')}*</label>
                    <textarea
                        name="description"
                        value={localData.description}
                        placeholder={t('your_description')}
                        className="w-full p-3 border rounded-lg outline-none border-light-blue focus:border-dark-blue resize-none"
                        rows={6}
                        onChange={handleChange}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>


                {/* Details */}
                <div className="w-full flex flex-col mb-4">
                    <label className="font-montserratRegular mb-2">{t('details')}*</label>
                    <textarea
                        name="detail"
                        value={localData.details}
                        placeholder={t('details')}
                        className="w-full p-3 border rounded-lg outline-none border-light-blue focus:border-dark-blue resize-none"
                        onChange={(e) => setLocalData(prevData => ({...prevData, details: e.target.value}))}
                        rows={4}
                    />
                    {errors.detail && <p className="text-red-500 text-sm">{errors.detail}</p>}
                </div>

                {/* Add photo */}
                <div className="w-full mb-4">
                    <div className="flex flex-col">
                        <label className="font-montserratRegular">{t('add_photo')}</label>
                        <button
                            className="w-52 mb-2 mt-2 p-2 uppercase text-center border rounded-lg outline-none border-light-blue text-light-blue"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {t('add')}
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

                {/* Help type */}
                <div className="w-full mb-4">
                    <label className="font-montserratRegular mb-2">{t('enter_type_of_given_help')}:*</label>
                    <div className="flex mt-4 space-x-10 flex-wrap gap-1">
                        {['Психологічна', 'Гуманітарна', 'Інформаційна'].map((helpType, index) => (
                            <button
                                key={helpType}
                                onClick={() => handleHelpSelect(helpType)}
                                className={`py-2 px-4 rounded-full mt-1 border text-center ${
                                    (localData.helpTypes as string[]).includes(helpType)
                                        ? 'bg-dark-blue border-dark-blue text-white'
                                        : 'border-light-blue'
                                }`}
                            >
                                {t(`categories${index + 1}`)}
                            </button>
                        ))}
                    </div>
                </div>


                {/* Create button */}
                <Button
                    isFilled={true}
                    className="w-full text-almost-black uppercase font-montserratRegular py-4 rounded-full mb-6"
                    onClick={handleSubmit}
                >
                    {t('create')}
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

export default CreateAnnouncementPage;