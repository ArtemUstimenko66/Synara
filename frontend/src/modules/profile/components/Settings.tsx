import React, {ChangeEvent, useRef, useState} from 'react';
import { Button } from '../../../ui/Button.tsx';
import VectorWhite from '../../../assets/images/VectorWhite.svg?react';
import Calendar from "../../main-page/assets/Calendar.svg?react"
import Clock from "../assets/Clock.svg?react"
import DeleteImg from '../../../assets/images/DeleteImg.svg?react';
import {MuiPhone} from "../../registration/components/ui/MuiPhone.tsx";
import {useTranslation} from "react-i18next";
import {getDayOfWeekInUkrainian} from "../../../data/dayOfWeekMap.ts";
import {updateUser, updateVictim, updateVolunteer, uploadAvatar, uploadDocument} from "../api/profileService.ts";
import { parseSupportDescription } from '../helpers/parseSupportDescription.ts';
import {UserVolunteer} from "../interfaces/UserVolunteerInterface.ts";
import {UserVictim} from "../interfaces/UserVictimInterface.ts";

interface SettingsProps {
    userData: User;
}

const formatTime = (time: string): string => {
    if (!time) return '00:00';
    return time.length <= 2 ? `${time}:00` : time;
};

type User = UserVictim | UserVolunteer;

const Settings: React.FC<SettingsProps> = ({ userData }) => {
    const [isEditable, setIsEditable] = useState(false);

    // @ts-ignore
    const supportDescriptions =
        userData.role === 'volunteer' && userData.volunteer && userData.volunteer.support_description
            ? parseSupportDescription(userData.volunteer.support_description)
            : {
                psychological: '',
                informational: '',
                humanitarian: ''
            };
    const initialFormData = userData.role === 'victim'
        ? { ...userData } as UserVictim
        : {
            ...userData as UserVolunteer,
            volunteer: {
                ...(userData as UserVolunteer).volunteer,
                psychologicalHelp: supportDescriptions.psychological,
                informationalHelp: supportDescriptions.informational,
                humanitarianHelp: supportDescriptions.humanitarian
            }
        };


    const [formData, setFormData] = useState<UserVictim | UserVolunteer>(initialFormData);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        setFormData(prevState => {

            if (name in prevState) {
                return {
                    ...prevState,
                    [name]: value
                };
            }

            if (prevState.role === 'volunteer' && 'volunteer' in prevState) {

                return {
                    ...prevState,
                    volunteer: {
                        ...prevState.volunteer,
                        [name]: value
                    }
                };
            }

            if (prevState.role === 'victim' && 'victim' in prevState) {
                return {
                    ...prevState,
                    victim: {
                        ...prevState.victim,
                        [name]: value
                    }
                };
            }

            return prevState;
        });
    };

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        city: '',
        region: '',
        street: '',
        houseNumber: '',
        startTime: '',
        endTime: '',
        UNP: '',
        volunteer_identification_number: ''
    });

    const validateFields = () => {
        const newErrors = { ...errors };

        if (!formData.firstName) newErrors.firstName = 'Ім\'я обов\'язкове';
        if (!formData.lastName) newErrors.lastName = 'Прізвище обов\'язкове';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Номер телефону обов\'язковий';
        if (!formData.UNP) {
            newErrors.UNP = "Ім'я обов'язкове";
        } else if (!/^\d{1,10}$/.test(formData.UNP)) {
            newErrors.UNP = "Поле повинно містити лише цифри та не більше 10 символів";
        }
        if (formData.role === 'victim' && 'victim' in formData) {
            if (!formData.victim.city) newErrors.city = 'Місто обов\'язкове';
            if (!formData.victim.region) newErrors.region = 'Область обов\'язкова';
            if (!formData.victim.street) newErrors.street = 'Вулиця обов\'язкова';
            if (!formData.victim.houseNumber) newErrors.houseNumber = 'Будинок обов\'язковий';
        }

        setErrors(newErrors);

        return Object.values(newErrors).every(error => error === '');
    };

    const validateVolunteerId = (value: string) => {
        if (!value) {
            return 'Номер волонтерського посвідчення обов\'язковий';
        } else if (!/^\d{1,10}$/.test(value)) {
            return 'Поле повинно містити лише цифри та не більше 10 символів';
        }
        return '';
    };

    const validateTime = (name: string, value: string) => {
        const timeParts = value.split(':');
        if (timeParts.length !== 2) return 'Значення повинно бути у форматі HH:MM';

        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);

        if (isNaN(hours) || isNaN(minutes)) return 'Значення повинно бути числом';

        if (hours < 0 || hours > 23) return 'Години повинні бути від 0 до 23';
        if (minutes < 0 || minutes > 59) return 'Хвилини повинні бути від 0 до 59';

        if (formData.role === 'volunteer' && 'volunteer' in formData) {
            if (name === 'startTime' && value > formData.volunteer.endTime) {
                return 'Час початку не може бути більше часу закінчення';
            }
            if (name === 'endTime' && value < formData.volunteer.startTime) {
                return 'Час закінчення не може бути меншим за час початку';
            }
        }

        return '';
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const error = validateTime(name, value);

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));

        setFormData((prevData) => {
            if (prevData.role === 'volunteer') {
                return {
                    ...prevData,
                    volunteer: {
                        ...prevData.volunteer,
                        [name]: value,
                    },
                };
            }
            return prevData;
        });
    };

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    const weekdays = [`${t('Mon')}`, `${t('Tues')}`, `${t('Wed')}`, `${t('Thurs')}`, `${t('Fri')}`, `${t('Sat')}`, `${t('Sun')}`];
    const helpTypes = ['psychological', 'informational', 'humanitarian', 'material'];

    const handleEdit = () => setIsEditable(true);

    const handleSave = async () => {
        if (validateFields()) {
            // console.log("Сохраненные данные:", formData);
            await saveUserData(formData);
            if (formData.role == 'volunteer'){
                await saveVolunteerData(formData);
            }
            if (formData.role == 'victim'){
                await saveVictimData(formData);
            }
            setIsEditable(false);
        }
    };

    function translateDayToEnglish(day: string | number) {
        const daysTranslation = {
            'Пн': 'Monday',
            'Вт': 'Tuesday',
            'Ср': 'Wednesday',
            'Чт': 'Thursday',
            'Пт': 'Friday',
            'Сб': 'Saturday',
            'Нд': 'Sunday',
        };
        // @ts-ignore
        return daysTranslation[day] || null;
    }

    // @ts-ignore
    function generateSupportDescription(formData) {
        return formData.volunteer.supports
            .map((type: string) => {
                const helpTypeName = type === 'psychological' ? 'Психологічна допомога' :
                    type === 'informational' ? 'Інформаційна допомога' :
                        type === 'humanitarian' ? 'Гуманітарна допомога' :
                            'Матеріальна допомога';
                return `${helpTypeName}: ${formData.volunteer[type + 'Help']}`;
            })
            .join(', ');
    }

    // @ts-ignore
    function prepareVolunteerData(formData) {
        return {
            volunteer_identification_number: formData.volunteer.volunteer_identification_number,
            region: formData.volunteer.region,
            city: formData.volunteer.city,
            supports: formData.volunteer.supports,
            support_description: generateSupportDescription(formData),
            rating: formData.volunteer.rating,
            startWorkingDay: translateDayToEnglish(formData.volunteer.startWorkingDay),
            endWorkingDay: translateDayToEnglish(formData.volunteer.endWorkingDay),
            startTime: formatTime(formData.volunteer.startTime),
            endTime: formatTime(formData.volunteer.endTime),
            description: formData.volunteer.description,
            is_show_my_profile: formData.volunteer.is_show_my_profile,
            moderator_answer:  formData.volunteer.moderator_answer
        };
    }

    function prepareVictimData(formData: { victim: { region: any; city: any; street: any; houseNumber: any; flatNumber: any; }; }) {
        return {
            region: formData.victim.region,
            city: formData.victim.city,
            street: formData.victim.street,
            houseNumber: formData.victim.houseNumber,
            flatNumber: formData.victim.flatNumber,
        };
    }

    function prepareUserData(formData: { firstName: any; lastName: any; password: any; email: any; phoneNumber: any; birthDate: any; role: any; gender: any; UNP: any; }) {
        return {
            firstName: formData.firstName,
            lastName: formData.lastName,
            password: formData.password,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            birthDate: formData.birthDate,
            role: formData.role,
            gender: formData.gender,
            UNP: formData.UNP,
        };
    }

    // @ts-ignore
    async function saveVolunteerData(formData) {
        const volunteerData = prepareVolunteerData(formData);
        //console.log("ready volunteer send -> ",volunteerData)
        await updateVolunteer(formData.id, volunteerData)
    }

    // @ts-ignore
    async function saveVictimData(formData) {
        const victimData = prepareVictimData(formData);
        // console.log("ready send -> ", victimData)
        await updateVictim(formData.id, victimData)
    }

    // @ts-ignore
    async function saveUserData(formData) {
        const defaultUserData = prepareUserData(formData);
        //console.log("ready user send -> ", defaultUserData)
        await updateUser(formData.id, defaultUserData)
    }

    const handlePhoneChange = (phone: string) => {
        setFormData(prevData => ({
            ...prevData,
            phoneNumber: phone,
        }));
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;

        setFormData(prevData => {
            if (prevData.role === 'volunteer' && 'volunteer' in prevData) {
                return {
                    ...prevData,
                    volunteer: {
                        ...prevData.volunteer,
                        is_show_my_profile: checked,
                    }
                };
            }
            return prevData;
        });
    };

    const handleDocumentUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);

            try {
                const uploadedFiles = await Promise.all(
                    filesArray.map(async (file, index) => {
                        const responseData = await uploadDocument(formData.id, file);

                        return {
                            id: index,
                            fileName: file.name,
                            fileUrl: responseData.url || URL.createObjectURL(file),
                            fileType: file.type,
                            isAvatar: false,
                        };
                    })
                );

                // @ts-ignore
                setFormData((prevData: UserVolunteer) => ({
                    ...prevData,
                    files: [...prevData.files, ...uploadedFiles],
                }));
            } catch (error) {
                console.error("Error uploading one or more files:", error);
            }
        }
    };

    const handleRemoveDocument = (fileName: string) => {
        if ('files' in formData) {
            setFormData(prevData => ({
                ...prevData,
                files: (prevData as UserVolunteer).files.filter(file => file.fileName !== fileName),
            }));
        }
    };

    const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const avatarUrl = await uploadAvatar(formData.id, file);
                setFormData(prevData => ({
                    ...prevData,
                    avatarUrl,
                }));
            } catch (error) {
                console.error('Error uploading avatar:', error);
            }
        }
    };


    const toggleHelpOption = (option: string) => {
        if (formData.role === 'volunteer' && 'volunteer' in formData) {
            setFormData(prevData => {
                const volunteerData = prevData as UserVolunteer;
                const currentSupports = volunteerData.volunteer.supports;

                const isOptionSelected = currentSupports.includes(option);

                return {
                    ...prevData,
                    volunteer: {
                        ...volunteerData.volunteer,
                        supports: isOptionSelected
                            ? currentSupports.filter(opt => opt !== option)
                            : [...currentSupports, option],
                    },
                };
            });
        }
    };

    const handleAddDocumentClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleGenderChange = (selectedGender: string) => {
        setFormData(prevData => ({
            ...prevData,
            gender: selectedGender,
        }));
    };


    const handleDayClick = (day: string) => {
        setFormData((prevData) => {
            if (userData.role !== 'volunteer' || !('volunteer' in prevData)) {
                return prevData;
            }
            const { startWorkingDay, endWorkingDay } = (prevData as UserVolunteer).volunteer;
            if (!startWorkingDay || (startWorkingDay && endWorkingDay)) {
                return {
                    ...prevData,
                    volunteer: {
                        ...prevData.volunteer,
                        startWorkingDay: day,
                        endWorkingDay: ''
                    }
                };
            } else {
                const startIndex = weekdays.indexOf(startWorkingDay);
                const endIndex = weekdays.indexOf(day);
                return {
                    ...prevData,
                    volunteer: {
                        ...prevData.volunteer,
                        startWorkingDay: startIndex <= endIndex ? startWorkingDay : day,
                        endWorkingDay: startIndex <= endIndex ? day : startWorkingDay,
                    }
                };
            }
        });
    };

    const getSelectedDays = () => {
        if (userData.role !== 'volunteer' || !('volunteer' in formData)) {
            return [];
        }

        const { startWorkingDay, endWorkingDay } = (formData as UserVolunteer).volunteer;
        if (!startWorkingDay) return [];

        const startIndex = weekdays.indexOf(startWorkingDay);
        const endIndex = endWorkingDay ? weekdays.indexOf(endWorkingDay) : startIndex;

        return weekdays.slice(Math.min(startIndex, endIndex), Math.max(startIndex, endIndex) + 1);
    };

    const selectedDays = getSelectedDays();


    return (

        <div className="w-full  xl:-mt-[9vh] ">
            {/* Header */}
            <div className="flex justify-end items-end mb-4">

                <Button
                    hasBlue={true}
                    className="text-blue-600 font-montserratMedium"
                    onClick={() => (isEditable ? handleSave() : handleEdit())}
                >
                    {isEditable ? `${t('saveUPPER')}` : `${t('editUPPER')}`}
                </Button>

            </div>

            {/* Section: Оприлюдненні */}
            <div className="bg-gray-100 md:p-4 sm:p-4 xl:p-4 rounded-3xl">
                {formData.role === 'volunteer' && 'volunteer' in formData && (
                    <label className="font-montserratRegular">
                        <input
                            type="checkbox"
                            disabled={!isEditable}
                            className="hidden"
                            checked={formData.volunteer.is_show_my_profile}
                            onChange={handleCheckboxChange}
                        />
                        <span
                            className={`w-5 h-5 mr-2 inline-block rounded-full border-2 relative ${
                                formData.volunteer.is_show_my_profile ? 'bg-blue-500 border-blue-500' : 'border-light-blue'
                            }`}
                        >
            {formData.volunteer.is_show_my_profile && (
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                    <VectorWhite/>
                </span>
            )}
        </span>
                        {t('displayVolunteer')}
                    </label>
                )}
                <div className="md:flex sm:flex-none xl:flex items-center  gap-4 mb-4 mt-4">
                    {isEditable ? (
                        <label htmlFor="photo-upload" className="cursor-pointer">
                            <img src={formData.avatarUrl || 'https://via.placeholder.com/150'} alt="User" className="w-16 h-16 rounded-full object-cover"/>
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhotoChange}
                            />
                        </label>
                    ) : (
                        <img src={formData.avatarUrl || 'https://via.placeholder.com/150'} alt="User" className="w-16 h-16 rounded-full object-cover"/>
                    )}


                    {/* Name and Surname Fields */}
                    <div className="flex-grow grid md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-2 md:space-x-12 sm:space-x-0 xl:space-x-12 gap-4 font-montserratRegular">
                        <div>
                            <label>{t('name')}*</label>
                            <input
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Ольга"
                                disabled={!isEditable}
                                className="w-full p-4 border-2 rounded-lg bg-white outline-none border-light-blue focus:border-dark-blue"
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm">{errors.firstName}</p>
                            )}
                        </div>
                        <div>
                            <label>{t('surname')}*</label>
                            <input
                                name="lastName"
                                type="text"
                                placeholder="Коваленко"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                disabled={!isEditable}
                                className="w-full p-4 border-2 rounded-lg bg-white outline-none border-light-blue focus:border-dark-blue"
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm">{errors.lastName}</p>
                            )}
                        </div>
                    </div>
                </div>


                <div className="grid md:grid-cols-3 sm:grid-cols-1 xl:grid-cols-3 gap-4 mb-4 font-montserratRegular">
                    <div>
                        <label className="font-montserratRegular mb-8">{t('telephone_number')}*</label>
                        <div className="flex items-center space-x-2">
                            <MuiPhone
                                className={`w-full p-3 border-2 rounded-lg bg-white outline-none ${
                                    !isEditable ? 'disabled-border' : 'border-light-blue border-2 focus:border-dark-blue'
                                }`}
                                value={formData.phoneNumber || ''}
                                disabled={!isEditable}
                                onChange={handlePhoneChange}
                                fullWidth
                            />
                            {errors.phoneNumber && (
                                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label>{t('region')}*</label>
                        <input
                            name="region"
                            type="text"
                            placeholder="Харківська"
                            className="w-full p-4 border-2 rounded-lg bg-white outline-none border-light-blue focus:border-dark-blue"
                            disabled={!isEditable}
                            value={
                                formData.role === 'victim'
                                    ? (formData as UserVictim).victim.region
                                    : formData.role === 'volunteer'
                                        ? (formData as UserVolunteer).volunteer.region
                                        : ''
                            }
                            onChange={(e) => {
                                const {value} = e.target;
                                setFormData((prevData) => {
                                    if (prevData.role === 'victim') {
                                        return {
                                            ...prevData,
                                            victim: {
                                                ...(prevData as UserVictim).victim,
                                                region: value,
                                            },
                                        };
                                    } else if (prevData.role === 'volunteer') {
                                        return {
                                            ...prevData,
                                            volunteer: {
                                                ...(prevData as UserVolunteer).volunteer,
                                                region: value,
                                            },
                                        };
                                    }
                                    return prevData;
                                });
                            }}
                        />
                        {errors.region && (
                            <p className="text-red-500 text-sm">{errors.region}</p>
                        )}
                    </div>


                    <div>
                        <label>{t('city')}*</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="Харків"
                            className="w-full p-4 border-2 rounded-lg bg-white outline-none border-light-blue focus:border-dark-blue"
                            disabled={!isEditable}
                            value={
                                formData.role === 'victim'
                                    ? (formData as UserVictim).victim.city
                                    : formData.role === 'volunteer'
                                        ? (formData as UserVolunteer).volunteer.city
                                        : ''
                            }
                            onChange={(e) => {
                                const {value} = e.target;
                                setFormData((prevData) => {
                                    if (prevData.role === 'victim') {
                                        return {
                                            ...prevData,
                                            victim: {
                                                ...(prevData as UserVictim).victim,
                                                city: value,
                                            },
                                        };
                                    } else if (prevData.role === 'volunteer') {
                                        return {
                                            ...prevData,
                                            volunteer: {
                                                ...(prevData as UserVolunteer).volunteer,
                                                city: value,
                                            },
                                        };
                                    }
                                    return prevData;
                                });
                            }}
                        />
                        {errors.city && (
                            <p className="text-red-500 text-sm">{errors.city}</p>
                        )}
                    </div>


                </div>

                {formData.role === 'volunteer' && 'volunteer' in formData && (

                    <>
                        <div className="mb-4 font-montserratMedium">
                            <label className="font-montserratRegular">{t('touchPhone')}:</label>
                            <div className="md:flex sm:flex-none xl:flex items-center gap-2">

                                {/* Выбор рабочих дней */}
                                <div className="flex">
                                    <Calendar className="h-8 w-8 mr-2"/>
                                    {isEditable ? (
                                        <div className="flex gap-2">
                                            {weekdays.map((day) => (
                                                <button
                                                    key={day}
                                                    className={`p-2 rounded ${
                                                        selectedDays.includes(getDayOfWeekInUkrainian(day))
                                                            ? 'bg-blue-500 text-white'
                                                            : 'bg-gray-200 text-black'
                                                    }`}
                                                    onClick={() => handleDayClick(getDayOfWeekInUkrainian(day))}
                                                >
                                                    {getDayOfWeekInUkrainian(day)}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="p-2 rounded">
         {`${getDayOfWeekInUkrainian(formData.volunteer.startWorkingDay) || `${t('Mon')}`} - ${getDayOfWeekInUkrainian(formData.volunteer.endWorkingDay)|| `${t('Fri')}`}`}




                            </span>

                                    )}
                                </div>
                                <div className="flex xl:mt-0 md:mt-0 sm:mt-4">
                                    <Clock className="xl:h-8 xl:w-8 md:h-8 md:w-8 sm:h-12 sm:w-12   mr-2"/>
                                    {isEditable ? (
                                        <div className="flex flex-col">
                                            <div className="flex gap-2 items-center">
                                                <input
                                                    type="text"
                                                    name="startTime"
                                                    placeholder="09:00"
                                                    value={formData.volunteer.startTime}
                                                    onChange={handleTimeChange}
                                                    className="p-2 w-2/6 border-2 border-light-blue rounded focus:outline-none focus:border-blue-500"
                                                />

                                                <span>-</span>
                                                <input
                                                    type="text"
                                                    name="endTime"
                                                    placeholder="18:00"
                                                    value={formData.volunteer.endTime}
                                                    onChange={handleTimeChange}
                                                    className="p-2 w-2/6 rounded border-light-blue border-2 focus:outline-none focus:border-blue-500"
                                                />

                                            </div>
                                            {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime}</p>}
                                            {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime}</p>}
                                        </div>
                                    ) : (
                                        <span className=" p-2 rounded">
                {formData.volunteer.startTime && formData.volunteer.endTime
                    ? `${formatTime(formData.volunteer.startTime)} - ${formatTime(formData.volunteer.endTime)}`
                    : '09:00 - 18:00'}
            </span>
                                    )}
                                </div>
                            </div>
                        </div>


                        <div className="mb-4">
                            <label className="font-montserratRegular my-4">{t('whatHelpUMake')}:</label>
                            <div className="flex flex-wrap gap-2">
                                {helpTypes.map((type) => (
                                    <button
                                        key={type}
                                        disabled={!isEditable}
                                        className={`p-1 px-8 rounded-3xl font-montserratRegular ${formData.volunteer.supports.includes(type) ? 'bg-dark-blue text-white' : `bg-white border-2 border-light-blue text-almost-black ${isEditable ? "" : "hidden"}`}`}
                                        onClick={() => toggleHelpOption(type)}
                                    >
                                        {type === 'psychological' ? `${t('categories1')}` : type === 'informational' ? `${t('categories3')}` : type === 'humanitarian' ? `${t('categories2')}` : `${t('categories4')}`}
                                    </button>
                                ))}
                            </div>

                            {helpTypes.map((type) => {
                                const helpProvided = formData.volunteer.supports.includes(type);
                                const fieldName = `${type}Help`;
                                return helpProvided && (
                                    <div className="my-4" key={type}>
                                        <label className="font-montserratRegular">
                                            {`${t('whatExactly')} `}
                                            <strong className="font-montserratRegular">
                                                {type === 'psychological' ? `${t('categories1')}` :
                                                    type === 'informational' ? `${t('categories3')}` :
                                                        type === 'humanitarian' ? `${t('categories2')}` :
                                                            `${t('categories4')}`}
                                            </strong>
                                            {`${t('helpProvide')} :`}
                                        </label>
                                        <input
                                            type="text"
                                            name={fieldName}
                                            placeholder={`${t('describe')} ${type === 'psychological' ? `${t('categories1')}` : type === 'informational' ? `${t('categories3')}` : type === 'humanitarian' ? `${t('categories2')}` : `${t('categories4')}`} ${t('onlyHelp')}`}
                                            className="w-full p-4 border-2 rounded-lg bg-white outline-none border-light-blue focus:border-dark-blue"
                                            disabled={!isEditable}
                                            value={(formData.volunteer as any)[fieldName] || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                );
                            })}
                        </div>


                        <div className="mb-4">
                            <label className="font-montserratRegular">{t('aboutMyself')}:</label>
                            <textarea
                                placeholder="Про себе"
                                name="description"
                                className="w-full p-4 resize-none border-2 rounded-lg bg-white outline-none border-light-blue focus:border-dark-blue"
                                disabled={!isEditable}
                                value={formData.volunteer.description}
                                onChange={handleInputChange}
                            >
            			Я дипломований психолог і досвід...
          </textarea>
                        </div>


                    </>
                )}

            </div>


            {/* !!! Section: Конфіденційні */}
            <h2 className="md:text-h2 sm:text-h5 xl:text-h2  mt-6 mb-4 font-kharkiv">{t('confidential')}</h2>
            <div className="bg-gray-100 md:p-4 sm:p-4 xl:p-4 rounded-3xl">
                {formData.role === 'victim' && (
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="font-montserratRegular">{t('street')}*</label>
                            <input
                                type="text"
                                placeholder="Сумська"
                                name="street"
                                className="w-full p-4 border-2 rounded-lg bg-white outline-none border-light-blue focus:border-dark-blue"
                                disabled={!isEditable}
                                value={formData.role === 'victim' ? (formData as UserVictim).victim.street : ''}
                                onChange={(e) => {
                                    const {value} = e.target;
                                    setFormData((prevData) => {
                                        if (prevData.role === 'victim') {
                                            return {
                                                ...prevData,
                                                victim: {
                                                    ...(prevData as UserVictim).victim,
                                                    street: value,
                                                },
                                            };
                                        }
                                        return prevData;
                                    });
                                }}
                            />
                            {errors.street && (
                                <p className="text-red-500 text-sm">{errors.street}</p>
                            )}
                        </div>

                        <div>
                            <label className="font-montserratRegular">{t('house')}*</label>
                            <input
                                type="text"
                                placeholder="12"
                                name="house"
                                className="w-full p-4 border-2 rounded-lg bg-white outline-none border-light-blue focus:border-dark-blue"
                                disabled={!isEditable}
                                value={formData.role === 'victim' ? (formData as UserVictim).victim.houseNumber : ''}
                                onChange={(e) => {
                                    const {value} = e.target;
                                    setFormData((prevData) => {
                                        if (prevData.role === 'victim') {
                                            return {
                                                ...prevData,
                                                victim: {
                                                    ...(prevData as UserVictim).victim,
                                                    houseNumber: value,
                                                },
                                            };
                                        }
                                        return prevData;
                                    });
                                }}
                            />
                            {errors.houseNumber && (
                                <p className="text-red-500 text-sm">{errors.houseNumber}</p>
                            )}
                        </div>

                        <div>
                            <label className="font-montserratRegular">{t('apartment')}</label>
                            <input
                                type="text"
                                placeholder="35"
                                name="flatNumber"
                                className="w-full p-4 border-2 rounded-lg bg-white outline-none border-light-blue focus:border-dark-blue"
                                disabled={!isEditable}
                                value={formData.role === 'victim' ? (formData as UserVictim).victim.flatNumber : ''}
                                onChange={(e) => {
                                    const {value} = e.target;
                                    setFormData((prevData) => {
                                        if (prevData.role === 'victim') {
                                            return {
                                                ...prevData,
                                                victim: {
                                                    ...(prevData as UserVictim).victim,
                                                    flatNumber: Number(value),
                                                },
                                            };
                                        }
                                        return prevData;
                                    });
                                }}
                            />

                        </div>

                    </div>

                )}
                <div className="mb-4">
                    <label className="font-montserratRegular">{t('your_gender')}:</label>
                    <div className="flex md:flex-row xl:flex-row sm:flex-col xl:space-x-2 md:space-x-2 xl:space-y-0 md:space-y-0 sm:space-y-2 sm:space-x-0">
                        {["female", "male", "other"].map((option) => (
                            <button
                                key={option}
                                className={`px-8 py-1 bg rounded-3xl font-montserratRegular ${formData.gender === option ? 'font-montserratRegular bg-dark-blue text-white' : 'border-2 border-light-blue bg-white'}`}
                                onClick={() => handleGenderChange(option)}
                                disabled={!isEditable}
                            >
                                {option === "female" ? `${t('woman')}` : option === "male" ? `${t('man')}` : `${t('other_gender')}`}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="md:flex sm:flex-none xl:flex items-center gap-4 mb-4">
                    {/* Volunteer ID Field */}
                    {formData.role === 'volunteer' && (
                        <div>
                            <label className="block font-montserratRegular">{t('volunteerID')}</label>
                            <input
                                type="text"
                                name="volunteer_identification_number"
                                value={formData.role === 'volunteer' ? (formData as UserVolunteer).volunteer.volunteer_identification_number : ''}
                                onChange={(e) => {
                                    const { value } = e.target;

                                    setFormData((prevData) => {
                                        if (prevData.role === 'volunteer') {
                                            return {
                                                ...prevData,
                                                volunteer: {
                                                    ...(prevData as UserVolunteer).volunteer,
                                                    volunteer_identification_number: value,
                                                },
                                            };
                                        }
                                        return prevData;
                                    });


                                    const error = validateVolunteerId(value);
                                    setErrors((prevErrors) => ({
                                        ...prevErrors,
                                        volunteer_identification_number: error,
                                    }));
                                }}
                                disabled={!isEditable}
                                className="mt-1 block w-full bg-white px-3 py-4 border-2 border-light-blue rounded-md shadow-sm focus:outline-none sm:text-sm"
                            />
                            {errors.volunteer_identification_number && (
                                <p className="text-red-500 text-sm">{errors.volunteer_identification_number}</p>
                            )}
                        </div>
                    )}


                    {/* РНОКПП Field */}
                    <div className="flex-grow">
                        <label className="font-montserratRegular">{t('itn')}</label>
                        <input
                            type="text"
                            placeholder="1111111"
                            name="UNP"
                            className="w-full p-4 border-2 rounded-lg bg-white outline-none border-light-blue focus:border-dark-blue"
                            disabled={!isEditable}
                            value={formData.UNP}
                            onChange={handleInputChange}
                        />
                        {errors.UNP && (
                            <p className="text-red-500 text-sm">{errors.UNP}</p>
                        )}
                    </div>

                </div>


                <div className="mb-4">
                    <label className="font-montserratRegular">{t('documentsAttached')}:</label>
                    <div>
                        {formData.files?.map((doc, index) => (
                            <div key={index}
                                 className="flex items-center justify-between w-full mt-1 p-4 rounded-lg border-2 bg-baby-blue border-baby-blue">
                                <p className="font-montserratRegular text-sm text-almost-black">{doc.fileName}</p>
                                <DeleteImg className="cursor-pointer"
                                           onClick={() => handleRemoveDocument(doc.fileName)}/>
                            </div>
                        ))}
                    </div>
                </div>

                {isEditable && (
                    <div>
                        <button
                            className="w-52 mb-2 mt-2 p-2 uppercase text-center border-2 rounded-lg outline-none border-light-blue text-light-blue"
                            onClick={handleAddDocumentClick}
                        >
                            Додати документи
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="application/pdf,image/*"
                            className="hidden"
                            onChange={handleDocumentUpload}
                        />
                    </div>
                )}
            </div>
        </div>
    )
        ;
}

export default Settings;
