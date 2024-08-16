import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faFacebookF, faInstagram, faTwitter, faTelegramPlane);

const Footer: React.FC = () => {
    return (
        <footer className="py-8 mt-4 w-full font-montserratRegular">
            <hr className="border-t border-gray-200 border-2  mb-6" />
            <div className="w-full flex flex-col md:flex-row justify-between items-start text-almost-black">

                {/* Left section with logo */}
                <div className="text-lg font-bold mt-2 xl: xl:mr-0 md:mr-16">
                    LOGO
                </div>
                {/* Navigation section */}
                <div className="mt-4 ml-2 md:mt-0">
                    <h3 className="font-bold mb-2">НАВІГАЦІЯ</h3>
                    <ul>
                        <li><a href="#" className="hover:underline">Головна</a></li>
                        <li><a href="#" className="hover:underline">Про нас</a></li>
                        <li><a href="#" className="hover:underline">Допомога ЗСУ</a></li>
                        <li><a href="#" className="hover:underline">Карти</a></li>
                        <li><a href="#" className="hover:underline">Як це працює?</a></li>
                    </ul>
                </div>

                {/* Info section */}
                <div className="mt-4 ml-24 xl:mr-0 md:mt-0 md:mr-22">
                    <h3 className="font-bold mb-2">ІНФОРМАЦІЯ</h3>
                    <ul>
                        <li><a href="#" className="hover:underline">Умови використання</a></li>
                        <li><a href="#" className="hover:underline">Політика конфіденційності</a></li>
                        <li><a href="#" className="hover:underline">Найчастіші питання</a></li>
                    </ul>
                </div>

                {/* Contact section */}
                <div className="mt-4 md:mt-0 text-left xl:mr-24 md:mr-0 md:ml-12 xl:ml-0">
                    <h3 className="font-bold mb-2 ">ЗВ'ЯЗОК</h3>
                    <p>0-800-501-701</p>
                    <p>Всеукраїнський телефон довіри</p>
                    {/* Social icons */}
                    <div className="mt-2 flex justify-start space-x-4">
                        <a href="#" aria-label="Facebook">
                            <FontAwesomeIcon icon={['fab', 'facebook-f']}/>
                        </a>
                        <a href="#" aria-label="Instagram">
                            <FontAwesomeIcon icon={['fab', 'instagram']}/>
                        </a>
                        <a href="#" aria-label="Twitter">
                            <FontAwesomeIcon icon={['fab', 'twitter']}/>
                        </a>
                        <a href="#" aria-label="Telegram">
                            <FontAwesomeIcon icon={['fab', 'telegram-plane']}/>
                        </a>
                    </div>
                </div>
            </div>
            <hr className="border-t border-gray-200 border-2 mt-6 mb-4"/>
            <div className="text-left text-xs text-almost-black">
                ©2024 SYNARA. All rights reserved
            </div>
        </footer>
    );
};

export default Footer;
