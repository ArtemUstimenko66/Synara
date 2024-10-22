import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import VolunteerImg from '../assets/Volunteer.svg';
import VictimImg from '../assets/Victim.svg';

type ChooseRoleProps = {
    onSelectRole: (role: string) => void;
};

const ChooseRole: React.FC<ChooseRoleProps> = ({ onSelectRole }) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col justify-start items-start text-left relative-md">
            <h2 className="font-kharkiv md:text-relative-h4 sm:text-relative-h1 xl:text-relative-h4 sm:mb-2 xl:mb-relative-sm">{t('choosing_a_role')}</h2>
            <div className="flex sm:flex-col xl:flex-row justify-start w-full sm:mb-4 xl:mb-relative-sm">
                <div
                    className="bg-dark-blue xl:h-96 sm:h-56 mb-[2vh] md:h-[30vh] rounded-2xl ml-0 px-relative-sm sm:w-full xl:w-4/6 cursor-pointer hover:bg-light-blue transition duration-300 mx-relative-sm flex flex-col justify-end"
                    onClick={() => onSelectRole('volunteer')}
                >
                    <img
                        src={`${VolunteerImg}`}
                        className="xl:w-[50vw] xl:h-[70vh] md:w-[30vw] md:h-[30vh] sm:w-[40vw] sm:h-[40vh]  mx-auto"
                        alt="SVG Image"
                    />
                    <p className="text-almost-white ml-[3vw] font-montserratRegular sm:text-xs-pxl xl:text-relative-pl sm:mb-2 xl:mb-10 sm:text-center xl:text-left justify-start">{t('volunteer')}</p>
                </div>
                <div
                    className="bg-dark-blue  xl:h-96 sm:h-56  rounded-2xl md:h-[30vh]  ml-0 px-relative-sm sm:w-full xl:w-4/6 cursor-pointer hover:bg-light-blue transition duration-300 mx-relative-sm flex flex-col justify-end"
                    onClick={() => onSelectRole('victim')}
                >
                    <img
                        src={`${VictimImg}`}
                        className="xl:w-[50vw] xl:h-[70vh] md:w-[30vw] md:h-[30vh] sm:w-[40vw] sm:h-[40vh]  mx-auto"
                        alt="SVG Image"
                    />
                    <p className="text-almost-white font-montserratRegular sm:text-xs-pxl xl:text-relative-pl sm:mb-2 xl:mb-10 text-center">{t('victim')}</p>
                </div>
            </div>
            <div className="flex xl:justify-start xl:items-start sm:justify-center sm:items-center">
                <p className="md:text-relative-h4 sm:text-relative-h2 xl:text-relative-ps  xl:ml-0 font-montserratRegular">
                    {t('already_have_an_account')} <Link to="/login" className="text-almost-black font-bold underline">{t('log_in')}</Link>
                </p>
            </div>
        </div>
    );
};

export default ChooseRole;
