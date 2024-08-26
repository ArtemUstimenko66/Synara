import React, { useState } from 'react';
import { Button } from "../../../ui/Button";

type UpdatePasswordInfoProps = {
    onNextStep: (data: { email: string }) => void;
};

const UpdatePassword: React.FC<UpdatePasswordInfoProps> = ({ onNextStep }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        onNextStep({ email });
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full space-x-4 mb-4">
                <div className="w-full mb-4">
                    <h1 className="uppercase font-kharkiv text-relative-h2 mb-relative-ssm mt-relative-ssm">Відновлення пароля</h1>
                    <h2 className="font-kharkiv text-relative-h3 mb-relative-ssm mt-relative-ssm">Заповніть поле</h2>
                    <label className="font-montserratRegular mb-2">Пошта</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Адреса електронної пошти"
                        className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <Button
                isFilled={true}
                onClick={handleSubmit}
                className="w-full uppercase bg-perfect-yellow text-almost-black py-3 rounded-full mb-5 hover:bg-perfect-yellow transition"
            >
                Продовжити
            </Button>
        </div>
    );
};

export default UpdatePassword;
