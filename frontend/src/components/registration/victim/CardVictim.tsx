import React from 'react';
import {Button} from "../../../ui/Button.tsx";

type CardVictimInfoProps = {
    onNextStep: () => void;
};

const CardVictim: React.FC<CardVictimInfoProps> = ({ onNextStep }) => {
    return (
        <div className="flex flex-col items-start pr-8 pb-8 w-full">
            <h2 className="text-relative-h4 font-kharkiv mb-4">Заповніть данні</h2>

            <div className="w-full mb-4">
                <label className="font-montserratRegular mb-2">Номер карти</label>
                <input
                    type="email"
                    placeholder="Номер вашої карти"
                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                />
            </div>

            <div className="w-full mb-4">
                <label className="font-montserratRegular mb-2">CVV</label>
                <input
                    type="email"
                    placeholder="CVV карти"
                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                />
            </div>

            <div className="w-full mb-4">
                <label className="font-montserratRegular mb-2">Ім'я власника карти</label>
                <input
                    type="email"
                    placeholder="Ім'я на картці"
                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                />
            </div>

            <div className="w-full mb-6">
                <label className="font-montserratRegular mb-2">Термін дії карти</label>
                <input
                    type="password"
                    placeholder="ММ / РР"
                    className="w-full p-3 border-2 rounded-lg outline-none border-light-blue focus:border-dark-blue"
                />
            </div>

            <Button
                className="w-full bg-perfect-yellow text-almost-black py-3 rounded-full mb-6 hover:bg-perfect-yellow transition"
                onClick={onNextStep}
            >
                ПРОДОВЖИТИ
            </Button>
            <div className="flex w-full justify-center">
                <p className="text-relative-ps font-montserratRegular">
                    <button onClick={onNextStep} className="text-almost-black font-bold underline">Пропустити</button>
                </p>
            </div>
        </div>
    );
};

export default CardVictim;
