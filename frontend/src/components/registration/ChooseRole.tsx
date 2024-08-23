type ChooseRoleProps = {
    onSelectRole: (role: string) => void;
};

const ChooseRole: React.FC<ChooseRoleProps> = ({ onSelectRole }) => {
    return (
        <div className="flex flex-col justify-start items-start text-leftcd fron relative-md">
            <h2 className="font-kharkiv text-relative-h4 mb-relative-md">Вибір ролі</h2>
            <div className="flex justify-start w-full mb-relative-md">
                <div
                    className="bg-dark-blue h-96 rounded-2xl px-relative-lg w-3/6 cursor-pointer hover:bg-light-blue transition duration-300 mr-10 flex flex-col justify-end"
                    onClick={() => onSelectRole('volunteer')}
                >
                    <p className="text-almost-white font-montserratRegular text-relative-pl mb-10 text-left justify-start">Волонтер</p>
                </div>
                <div
                    className="bg-dark-blue h-96 rounded-2xl ml-0 px-relative-lg w-3/6 cursor-pointer hover:bg-light-blue transition duration-300 mx-relative-sm flex flex-col justify-end"
                    onClick={() => onSelectRole('victim')}
                >
                    <p className="text-almost-white font-montserratRegular text-relative-pl mb-10 text-center">Потерпілий</p>
                </div>
            </div>
            <p className="text-relative-ps font-montserratRegular">
                У вас вже є аккаунт? <a href="/login" className="text-almost-black font-bold underline">Увійти</a>
            </p>
        </div>
    );
};

export default ChooseRole;
