import {Link} from "react-router-dom";

type ChooseRoleProps = {
    onSelectRole: (role: string) => void;
};

const ChooseRole: React.FC<ChooseRoleProps> = ({ onSelectRole }) => {
    return (
        <div className="flex flex-col justify-start items-start text-leftcd fron relative-md">
            <h2 className="font-kharkiv sm:text-pxll xl:text-relative-h4 sm:mb-2 xl:mb-relative-md">Вибір ролі</h2>
            <div className="flex sm:flex-col xl:flex-row justify-start w-full sm:mb-4 xl:mb-relative-md">
                <div
                    className="sm:mb-4 xl:mb-0 bg-dark-blue sm:h-44 xl:h-96 rounded-2xl px-relative-lg sm:w-full xl:w-3/6 cursor-pointer hover:bg-light-blue transition duration-300 mr-10 flex flex-col justify-end"
                    onClick={() => onSelectRole('volunteer')}
                >
                    <p className="text-almost-white font-montserratRegular sm:text-xs-pxl xl:text-relative-pl sm:mb-2 xl:mb-10 sm:text-center xl:text-left justify-start">Волонтер</p>
                </div>
                <div
                    className="bg-dark-blue sm:h-44 xl:h-96 rounded-2xl ml-0 px-relative-lg sm:w-full xl:w-3/6 cursor-pointer hover:bg-light-blue transition duration-300 mx-relative-sm flex flex-col justify-end"
                    onClick={() => onSelectRole('victim')}
                >
                    <p className="text-almost-white font-montserratRegular sm:text-xs-pxl xl:text-relative-pl sm:mb-2 xl:mb-10 text-center">Потерпілий</p>
                </div>
            </div>
            <p className="sm:text-xs xl:text-relative-ps sm:ml-12 xl:ml-0 font-montserratRegular">
                У вас вже є аккаунт? <Link to="/login" className="text-almost-black font-bold underline">Увійти</Link>
            </p>
        </div>
    );
};

export default ChooseRole;
