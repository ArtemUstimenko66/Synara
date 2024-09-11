import React, { ChangeEvent, useRef, useState } from 'react';
import MainHeader from "../modules/main-page/components/ui/MainHeader.tsx";
import Wrapper from "../ui/Wrapper.tsx";
import { Button } from "../ui/Button.tsx";
import Footer from "../components/Footer.tsx";
import { SideBar } from "../modules/main-page/components/SideBar.tsx";
import DeleteImg from "../assets/images/DeleteImg.svg?react";
import { Announcement } from "../modules/main-page/interfaces/Announcement.tsx";
import {createAnnouncement} from "../modules/main-page/api/mainPageService.ts";
import {useNavigate} from "react-router-dom";
import {convertDateToDBFormat} from "../modules/main-page/helpers/convertDateToDBFormat.ts";
import {translateHelpType} from "../modules/main-page/helpers/translateHelpType.ts";
import {uploadAllDocuments} from "../modules/main-page/helpers/uploadAllDocuments.ts";
import {validateFields} from "../modules/main-page/validation/validateFields.ts";

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
    const navigate = useNavigate();

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
        const newErrors = validateFields({ datePosted, description: localData.description || '' });
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Преобразование даты
            const formattedDate = convertDateToDBFormat(datePosted);
            try {
                const announcementData = {
                    description: localData.description || '',
                    datePosted: formattedDate,
                    typeHelp: translateHelpType(localData.helpTypes?.[0] || 'Гуманітарна'),
                };

                const createdAnnouncement = await createAnnouncement(announcementData);
                const announcementId = createdAnnouncement.id;

                if (localData.documents && localData.documents.length > 0) {
                    await uploadAllDocuments(localData.documents, announcementId);
                }

                console.log("Successfully uploaded announcement");
                navigate('/main');
            } catch (error) {
                console.error('Error uploading announcement:', error);
            }
        }
    };




    return (
        <Wrapper>
            <div className="min-h-screen bg-almost-white">

                {/* Header */}
                <MainHeader />

                {/* Main part */}
                <h2 className="text-h2 font-kharkiv text-center mt-24">Заповніть дані</h2>

                {/* Date */}
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

                {/* Description */}
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

                {/* Help type */}
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

                {/* Add photo */}
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

                {/* Create button */}
                <Button
                    isFilled={true}
                    className="w-full text-almost-white uppercase font-montserratRegular py-4 rounded-full mb-6"
                    onClick={handleSubmit}
                >
                    Додати
                </Button>

                {/* Sidebar */}
                <SideBar isOpen={false} onClose={() => {}} isFilters={true} />

                {/* Footer */}
                <Footer />
            </div>
        </Wrapper>
    );
};

export default CreateAnnouncementPage;