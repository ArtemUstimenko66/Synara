import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import LogoSynara from '../assets/images/logo_Footer.svg?react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import LogoFooter from '../assets/images/logo_Footer.svg?react';
import DownArrow from '../assets/images/Down_Arrow.svg?react';

library.add(faFacebookF, faInstagram, faTwitter, faTelegramPlane);

const AccordionSection: React.FC<{ title: string }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4 mx-5">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-montserratMedium">{title}</h3>
                <DownArrow className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}/>
            </div>
            {isOpen && <div className="mt-2">{children}</div>}
        </div>
    );
};

const Footer: React.FC = () => {
    const isSmallScreen = useMediaQuery({query: '(max-width: 640px)'});

    return (
        <footer className="xl:py-8 md:py-8 mt-4 xl:w-[90%] md:w-[90%] sm:w-[100%] justify-center flex flex-col font-montserratRegular">
            {isSmallScreen ? (
                <>
                    <div className="border border-dark-blue mb-4 w-full"></div>
                    <AccordionSection title="НАВІГАЦІЯ">
                        <ul>
                            <li className="my-2"><a href="#" className="hover:underline">Головна</a></li>
                            <li className="my-2"><a href="#" className="hover:underline">Про нас</a></li>
                            <li className="my-2"><a href="#" className="hover:underline">Збори</a></li>
                            <li className="my-2"><a href="#" className="hover:underline">Карти</a></li>
                            <li className="my-2"><a href="#" className="hover:underline">Як це працює</a></li>
                        </ul>
                    </AccordionSection>
                    <div className="border border-dark-blue mb-4 w-full"></div>
                    <AccordionSection title="ІНФОРМАЦІЯ">
                        <ul>
                            <li className="my-2"><a href="#" className="hover:underline">Умови використання</a></li>
                            <li className="my-2"><a href="#" className="hover:underline">Політика конфіденційності</a>
                            </li>
                            <li className="my-2"><a href="#" className="hover:underline">Найчастіші питання</a></li>
                        </ul>
                    </AccordionSection>
                    <div className="border border-dark-blue mb-4 w-full"></div>
                    <AccordionSection title="ЗВ'ЯЗОК">
                        <p className="mt-2">0-800-501-701</p>
                        <p className="mb-2">Всеукраїнський телефон довіри</p>
                        <p className="my-2">synara.support@email.com</p>
                        <div className="mt-2 flex space-x-4">
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
                    </AccordionSection>
                    <div className="border border-dark-blue mb-4 w-full"></div>
                    <div className="flex items-center justify-center">
                        <LogoFooter className="mb-4"/>
                    </div>
                    <div className="text-center text-pl text-almost-black">
                        ©2024 SYNARA. All rights reserved
                    </div>
                </>
            ) : (
                <>
                    <hr className="border-t border-gray-200 w-[110%] border-2 mb-6"/>
                    <div className="w-[110%] flex flex-col md:flex-row justify-between items-start text-almost-black">
                        {/* Left section with logo */}
                        <div className=" mt-2 xl:mr-0 md:mr-5 justify-start flex">
                            <Link to="/home">
                                <LogoSynara className="text-xl font-bold  w-[45%] xl:mr-32 md:mr-14" />
                            </Link>
                        </div>
                        {/* Navigation section */}
                        <div className="mt-4 ml-2 md:mt-0 md:-ml-8 xl:mr-14">
                            <h3 className="font-bold mb-2">НАВІГАЦІЯ</h3>
                            <div className="flex space-x-8">
                                <ul>
                                    <li><a href="#" className="hover:underline">Профіль</a></li>
                                    <li><a href="#" className="hover:underline">Чат</a></li>
                                    <li><a href="#" className="hover:underline">Петиції</a></li>
                                    <li><a href="#" className="hover:underline">Оголошення</a></li>
                                    <li><a href="#" className="hover:underline">Статистика</a></li>
                                    <li><a href="#" className="hover:underline">Налаштування</a></li>
                                </ul>
                                <ul>
                                    <li><a href="#" className="hover:underline">Головна</a></li>
                                    <li><a href="#" className="hover:underline">Про нас</a></li>
                                    <li><a href="#" className="hover:underline">Збори</a></li>
                                    <li><a href="#" className="hover:underline">Карти</a></li>
                                    <li><a href="#" className="hover:underline">Як це працює</a></li>
                                </ul>
                            </div>
                        </div>
                        {/* Info section */}
                        <div className="mt-4 ml-24 xl:mr-0 md:mt-0 md:mr-22 xl:ml-14 md:ml-4">
                            <h3 className="font-bold mb-2">ІНФОРМАЦІЯ</h3>
                            <ul>
                                <li><a href="#" className="hover:underline">Умови використання</a></li>
                                <li><a href="#" className="hover:underline">Політика конфіденційності</a></li>
                                <li><a href="#" className="hover:underline">Найчастіші питання</a></li>
                            </ul>
                        </div>
                        {/* Contact section */}
                        <div className="mt-4 md:mt-0 text-left  xl:mr-24 md:mr-0 md:ml-12 xl:ml-20">
                            <h3 className="font-bold mb-2">ЗВ'ЯЗОК</h3>
                            <p>0-800-501-701</p>
                            <p className="mb-4">Всеукраїнський телефон довіри</p>
                            <p>synara.support@email.com</p>
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
                    <hr className="border-t border-gray-200  w-[110%]  border-2 mt-6 mb-4" />
                    <div className="text-left text-xs text-almost-black">
                        ©2024 SYNARA. All rights reserved
                    </div>
                </>
            )}
        </footer>
    );
};

export default Footer;
