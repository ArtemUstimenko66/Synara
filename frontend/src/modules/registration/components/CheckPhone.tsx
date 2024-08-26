import React, {useEffect} from 'react';
import { Button } from "../../../ui/Button";

import {User} from "../interfaces/User.tsx";

type UpdatePasswordInfoProps = {
    userData: User;
    setUserData: (data: Partial<User>) => void;
};

const UpdatePassword: React.FC<UpdatePasswordInfoProps> = ({userData , }) => {
    useEffect(() => {
        const handleData = async () => {
            console.log("User phone -> ", userData.phoneNumber);

        };
        handleData();
    }, [userData]);

    return (
        <div className="flex flex-col w-full">

            <div className="flex w-full space-x-4 mb-4 ">

                <div className="w-full mb-4">

                    <h1 className="uppercase font-kharkiv text-relative-h2 mb-relative-ssm mt-relative-ssm">ДВОФАКТОРНА
                        АУТЕНТИФІКАЦІЯ</h1>
                    <h2 className="font-kharkiv text-relative-h3 mb-relative-ssm mt-relative-ssm">Заповніть поле</h2>
                    <h3 className="text-relative-pl whitespace-pre-line font-montserratRegular mb-8 ">
                        Ми надіслали код підтвердження на номер телефону
                        <b> +380000000000</b>
                    </h3>
                    <label className="font-montserratRegular mb-2">Код</label>
                    <input
                        type="password"
                        name="code"
                        placeholder="*****"
                        className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                    />
                </div>
            </div>
            <div className="flex items-center justify-center w-full mb-5 -mt-3 text-almost-black">
                <span className="mx-4">Вам не прийшов код?</span>
            </div>
            <Button
                isFilled={true}
                className="w-full uppercase bg-perfect-yellow text-almost-black py-3 rounded-full mb-5 hover:bg-perfect-yellow transition"
            >
                Продовжити
            </Button>
        </div>
    );
};

export default UpdatePassword;
