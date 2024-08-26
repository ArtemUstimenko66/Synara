import { useNavigate } from 'react-router-dom';
import BackArrowComponent from "../../modules/registration/components/BackArrow.tsx";
import {Eye, EyeOff} from "react-feather";
import React, {useState} from "react";
import {Button} from "../../ui/Button.tsx";

const NewPassword = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const handleBackArrowClick = () => {
        navigate('/login');
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
                                <h2 className=" font-kharkiv text-relative-h3 mb-relative-ssm mt-relative-ssm">
                                    Заповніть поле
                                </h2>
                        <div className="flex flex-col w-full">
                            <div className="w-full mb-6 relative">
                                <label className="font-montserratRegular mb-2">Пароль</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Створіть новий пароль"
                                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                                    style={{marginTop: '0.8rem', marginRight: '1rem'}}
                                >
                                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </button>
                            </div>
                            <div className="w-full mb-6 relative">
                                <label className="font-montserratRegular mb-2">Підтвердження пароля</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Повторіть новий пароль"
                                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                                    style={{marginTop: '0.8rem', marginRight: '1rem'}}
                                >
                                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </button>
                            </div>
                            <Button
                                className="w-full bg-perfect-yellow text-almost-black py-3 rounded-full mt-6 hover:bg-perfect-yellow transition"
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
