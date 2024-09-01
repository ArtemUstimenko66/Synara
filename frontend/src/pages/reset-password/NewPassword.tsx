import { useNavigate } from 'react-router-dom';
import BackArrowComponent from "../../modules/registration/components/BackArrow.tsx";
import  { useState } from "react";
import { Button } from "../../ui/Button.tsx";
import {resetPassword} from "../../modules/reset-password/api/resetPasswordService.ts";

const NewPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // Для отображения успешного сообщения

    const handleBackArrowClick = () => {
        navigate('/login');
    };

    const handleSubmit = async () => {
        if (!password || !confirmPassword) {
            setError('Поле не може бути пустим.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Паролі не збігаються.');
            return;
        }

        if (password.length < 6) {
            setError('Пароль повинен містити не менше 6 символів.');
            return;
        }

        setError(null);

        try {
            const email = localStorage.getItem('userEmail');
            if (!email) {
                setError('Не вдалося отримати електронну адресу. Будь ласка, повторіть спробу.');
                return;
            }

            const response = await resetPassword(email, password);
            setSuccessMessage(response);
            console.log(response);
            localStorage.removeItem('userEmail');
            navigate('/login');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="bg-dark-blue min-h-screen flex">
            <div className="w-2/6 p-8 flex items-left justify-left mt-10 ml-28">
                <div className="text-almost-white font-montserratRegular font-bold text-relative-h4">LOGO</div>
            </div>

            <div className="w-5/6 bg-almost-white rounded-l-3xl min-h-screen px-relative-md flex flex-col items-start justify-start">
                <div className="flex h-full">
                    <BackArrowComponent onClick={handleBackArrowClick} />

                    <div className="max-w-2xl ml-24 mt-7 max-h-screen flex flex-col justify-start flex-grow">

                        <h1 className="uppercase font-kharkiv text-relative-h2 mb-relative-ssm mt-relative-ssm">
                            Створення нового пароля
                        </h1>
                        <h2 className="font-kharkiv text-relative-h3 mb-relative-ssm mt-relative-ssm">
                            Заповніть поле
                        </h2>

                        <div className="flex flex-col w-full">
                            {/* Поле ввода пароля */}
                            <div className="w-full mb-6 relative">
                                <label className="font-montserratRegular mb-2">Пароль</label>
                                <input
                                    type={'text'}
                                    name="password"
                                    placeholder="Створіть новий пароль"
                                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* Поле подтверждения пароля */}
                            <div className="w-full mb-2 relative">
                                <label className="font-montserratRegular mb-2">Підтвердження пароля</label>
                                <input
                                    type={'text'}
                                    name="confirmPassword"
                                    placeholder="Повторіть новий пароль"
                                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue pr-10"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            {/* Сообщение об ошибке */}
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            {/* Сообщение об успехе */}
                            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                            <Button
                                className="w-full bg-perfect-yellow text-almost-black py-3 rounded-full mt-6 hover:bg-perfect-yellow transition"
                                onClick={handleSubmit}
                            >
                                ПРОДОВЖИТИ
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPassword;
