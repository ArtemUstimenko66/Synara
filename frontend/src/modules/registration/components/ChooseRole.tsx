import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

type ChooseRoleProps = {
    onSelectRole: (role: string) => void;
};

const ChooseRole: React.FC<ChooseRoleProps> = ({ onSelectRole }) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col justify-start items-start text-left relative-md">
            <h2 className="font-kharkiv md:text-relative-h4 sm:text-relative-h1 xl:text-relative-h4 sm:mb-2 xl:mb-relative-md">{t('choosing_a_role')}</h2>
            <div className="flex sm:flex-col xl:flex-row justify-start w-full sm:mb-4 xl:mb-relative-md">
                <div
                    className="sm:mb-4 xl:mb-0 bg-dark-blue sm:h-44 xl:h-96 rounded-2xl px-relative-lg sm:w-full xl:w-3/6 cursor-pointer hover:bg-light-blue transition duration-300 mr-10 flex flex-col justify-end"
                    onClick={() => onSelectRole('volunteer')}
                >
                    <p className="text-almost-white font-montserratRegular sm:text-xs-pxl xl:text-relative-pl sm:mb-2 xl:mb-10 sm:text-center xl:text-left justify-start">{t('volunteer')}</p>
                </div>
                <div
                    className="bg-dark-blue sm:h-44 xl:h-96 rounded-2xl ml-0 px-relative-lg sm:w-full xl:w-3/6 cursor-pointer hover:bg-light-blue transition duration-300 mx-relative-sm flex flex-col justify-end"
                    onClick={() => onSelectRole('victim')}
                >
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
