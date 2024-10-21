import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faXTwitter, faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import LogoSynara from '../assets/images/logo_Footer.svg?react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import LogoFooter from '../assets/images/logo_Footer.svg?react';
import DownArrow from '../assets/images/Down_Arrow.svg?react';
import {useTranslation} from "react-i18next";
import LanguageSelector from "./LanguageSelector.tsx";

library.add(faFacebookF, faInstagram, faXTwitter, faTelegramPlane);

const AccordionSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4 mx-5">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-montserratMedium">{title}</h3>
                <DownArrow className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            {isOpen && <div className="mt-2">{children}</div>}
        </div>
    );
};


const Footer: React.FC = () => {
    const { t } = useTranslation();
    const isSmallScreen = useMediaQuery({query: '(max-width: 640px)'});
    const isHomePage = location.pathname === '/home';
    return (
        <footer className="xl:py-8 md:py-8 mt-4 xl:w-[90%] md:w-[90%] sm:w-[100%] justify-center flex flex-col font-montserratRegular">
            {isSmallScreen ? (
                <>
                    <div className="border border-gray-200 mb-4 w-full"></div>
                    <AccordionSection title={t('navigationUPPER')}>

                        <div className="flex space-x-8">
                            {!isHomePage && (
                                <ul>
                                    <li><a href="/profile" className="hover:underline">{t('profile')}</a></li>
                                    <li><a href="/chat" className="hover:underline">{t('chat')}</a></li>
                                    <li><a href="/main" className="hover:underline">{t('advertisement')}</a></li>
                                    <li><a href="/propositions" className="hover:underline">{t('propositions')}</a></li>
                                    <li><a href="/petitions" className="hover:underline">{t('petitions')}</a></li>
                                    <li><a href="/main" className="hover:underline">{t('volunteerSearch')}</a></li>
                                </ul>

                            )
                            }

                            <ul>
                                <li><a href="/main" className="hover:underline">{t('main')}</a></li>
                                <li><a href="/about" className="hover:underline">{t('about_us')}</a></li>
                                <li><a href="/gatherings" className="hover:underline">{t('collection')}</a></li>
                                <li><a href="/map-help" className="hover:underline">{t('maps')}</a></li>
                                <li><a href="/how-it-works" className="hover:underline">{t('how_it_worksLOWER')}</a>
                                </li>
                            </ul>
                        </div>
                    </AccordionSection>
                    <div className="border border-gray-200 mb-4 w-full"></div>
                    <AccordionSection title={t('informationUPPER')}>
                        <ul>
                            <li><a href="/terms-of-use" className="hover:underline">{t('terms_of_use')}</a></li>
                            <li><a href="/privacy-policy" className="hover:underline">{t('privacy_policy')}</a></li>
                            <li><a href="/cookie-policy" className="hover:underline">{t('cookie_policy')}</a></li>
                            <li><a href="/faq" className="hover:underline">{t('the_most_frequent_questions')}</a></li>
                        </ul>

                    </AccordionSection>
                    <div className="border border-gray-200 mb-4 w-full"></div>
                    <AccordionSection title={t('communicationUPPER')}>
                        <a href="tel:+380123456789" className="hover:underline">0-800-501-701</a>
                        <p className="mb-4">{t('all_ukrainian_hotline')}</p>
                        <a href="mailto:synara.support@email.com" className="hover:underline">
                            synara.support@email.com
                        </a>
                        <div className="mt-2 flex space-x-4">
                            <a href="#" aria-label="Facebook">
                                <FontAwesomeIcon icon={['fab', 'facebook-f']}/>
                            </a>
                            <a href="#" aria-label="Instagram">
                                <FontAwesomeIcon icon={['fab', 'instagram']}/>
                            </a>
                            <a href="#" aria-label="Twitter">
                                <FontAwesomeIcon icon={['fab', 'x-twitter']}/>
                            </a>
                            <a href="#" aria-label="Telegram">
                                <FontAwesomeIcon icon={['fab', 'telegram-plane']}/>
                            </a>

                        </div>
                    </AccordionSection>
                    <div className="border border-gray-200 mb-4 w-full"></div>
                    <div className="flex flex-col items-center">
                        <Link to=".">
                            <LogoFooter className="text-xl font-bold w-full"/>
                        </Link>
                        <div className="flex justify-between items-center w-full mt-[2vh] px-[5vw]">
                            <div className="text-center text-pl items-center justify-center text-almost-black text-xs">
                                ©2024 SYNARA. All rights reserved
                            </div>
                            <div className="text-right text-xs text-almost-black">
                                <LanguageSelector/>
                            </div>
                        </div>
                    </div>


                </>
            ) : (
                <>
                    <hr className="border-t border-gray-200 w-[110%] border-2 mb-6"/>
                    <div className="w-[110%] flex flex-col md:flex-row justify-between items-start text-almost-black">
                        {/* Left section with logo */}
                        <div className=" mt-2 xl:mr-0 md:mr-5 justify-start flex">
                            <Link to=".">
                                <LogoSynara className="text-xl font-bold w-[45%] xl:mr-32 md:mr-14"/>
                            </Link>
                        </div>
                        {/* Navigation section */}
                        <div className="mt-4 ml-2 md:mt-0 md:-ml-8 xl:mr-14">
                            <h3 className="font-bold mb-2">{t('navigationUPPER')}</h3>
                            <div className="flex space-x-8">
                                {!isHomePage && (
                                    <ul>
                                        <li><a href="/profile" className="hover:underline">{t('profile')}</a></li>
                                        <li><a href="/chat" className="hover:underline">{t('chat')}</a></li>
                                        <li><a href="/main" className="hover:underline">{t('advertisement')}</a></li>
                                        <li><a href="/propositions" className="hover:underline">{t('propositions')}</a>
                                        </li>
                                        <li><a href="/petitions" className="hover:underline">{t('petitions')}</a></li>
                                        <li><a href="/main" className="hover:underline">{t('volunteerSearch')}</a></li>

                                    </ul>
                                )
                                }

                                <ul>
                                    <li><a href="/main" className="hover:underline">{t('main')}</a></li>
                                    <li><a href="/about" className="hover:underline">{t('about_us')}</a></li>
                                    <li><a href="/gatherings" className="hover:underline">{t('collection')}</a></li>
                                    <li><a href="/map-help" className="hover:underline">{t('maps')}</a></li>
                                    <li><a href="/how-it-works" className="hover:underline">{t('how_it_worksLOWER')}</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        {/* Info section */}
                        <div className="mt-4 ml-24 xl:mr-0 md:mt-0 md:mr-22 xl:ml-14 md:ml-4">
                            <h3 className="font-bold mb-2">{t('informationUPPER')}</h3>
                            <ul>
                                <li><a href="/terms-of-use" className="hover:underline">{t('terms_of_use')}</a></li>
                                <li><a href="/privacy-policy" className="hover:underline">{t('privacy_policy')}</a></li>
                                <li><a href="/cookie-policy" className="hover:underline">{t('cookie_policy')}</a></li>
                                <li><a href="/faq" className="hover:underline">{t('the_most_frequent_questions')}</a>
                                </li>
                            </ul>
                        </div>
                        {/* Contact section */}
                        <div className="mt-4 md:mt-0 text-left  xl:mr-24 md:mr-0 md:ml-12 xl:ml-20">
                            <h3 className="font-bold mb-2">{t('communicationUPPER')}</h3>
                            <a href="tel:+380123456789" className="hover:underline">0-800-501-701</a>
                            <p className="mb-4">{t('all_ukrainian_hotline')}</p>
                            <a href="mailto:synara.support@email.com" className="hover:underline">
                                synara.support@email.com
                            </a>
                            <div className="mt-2 flex justify-start space-x-4">
                                <a href="#" aria-label="Facebook">
                                    <FontAwesomeIcon icon={['fab', 'facebook-f']}/>
                                </a>
                                <a href="#" aria-label="Instagram">
                                    <FontAwesomeIcon icon={['fab', 'instagram']}/>
                                </a>
                                <a href="#" aria-label="Twitter">
                                    <FontAwesomeIcon icon={['fab', 'x-twitter']}/>
                                </a>
                                <a href="#" aria-label="Telegram">
                                    <FontAwesomeIcon icon={['fab', 'telegram-plane']}/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <hr className="border-t border-gray-200  w-[110%]  border-2 mt-6 mb-4"/>
                    <div className="text-left text-xs text-almost-black">
                        ©2024 SYNARA. All rights reserved
                    </div>
                    <div className="text-right text-xs text-almost-black -mt-[1vh] -mr-[10%]">
                        <LanguageSelector/>
                    </div>
                </>
            )}
        </footer>
    );
};

export default Footer;
