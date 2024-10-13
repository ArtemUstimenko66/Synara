import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import LogoSynara from '../../assets/images/logoSynara.svg?react';
import MenuIcon from '../../modules/main-page/assets/menu.svg?react';
import NotificationIcon from '../../modules/main-page/assets/notification.svg?react';

import NavItem from "../../ui/NavItem.tsx";

import { SideBar } from "../../modules/main-page/components/SideBar.tsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../hooks/useAuth.ts";

const MainHeader: React.FC = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [, setIsAtTop] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	// Получаем данные из хука useAuth
	const { isAuthenticated, isLoading } = useAuth();
	const navigate = useNavigate();

	// Логика для редиректа
	// Логика для перенаправления по клику на первый NavItem
	const handleNavClick = () => {
		if (!isLoading) {
			if (isAuthenticated) {
				navigate('/main'); // Перенаправляем на /main, если пользователь залогинен
			} else {
				navigate('/home'); // Перенаправляем на /home, если пользователь не залогинен
			}
		}
	};

	// logic for scrolling
	const handleScroll = () => {
		const currentScrollY = window.scrollY;
		setIsVisible(currentScrollY < lastScrollY || currentScrollY === 0);
		setIsAtTop(currentScrollY === 0);
		setLastScrollY(currentScrollY);
	};

	// logic for scrolling
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [lastScrollY]);
	const {t} = useTranslation();

	return (
		<>
			<header
				className={`w-full fixed bg-white top-0 left-0  transition-transform duration-300 ease-in-out 
            ${isVisible ? 'header-slide-in' : 'header-slide-out'} `}
			>

				<div
					className="flex h-2 justify-between 0 pl-[5%] items-center px-8 py-8 md:ml-10 md:mr-4 xl:ml-20 xl:mr-36">

					{/* Logo */}
					<button onClick={handleNavClick}>
						<Link to="#">
							<LogoSynara className="text-xl font-bold xl:mr-[10%] md:mr-14"/>
						</Link>
					</button>

					{/* Nav items */}
					<nav className="space-x-16 xl:flex sm:hidden md:hidden">
						<button onClick={handleNavClick}>
							<NavItem text={t('mainUPPER')} to="#"/>
						</button>
						<NavItem text={t('about_usUPPER')} to="/about"/>
						<NavItem text={t('collectionsUPPER')} to="/gatherings"/>
					
						<NavItem text={t('how_it_worksUPPER')} to="/how-it-works"/>
						<div className="text-perfect-yellow font-montserratMedium">
							<NavItem text="КАРТА ДОПОМОГИ" to="/map-help"/>
						</div>
					</nav>

					{/* Buttons */}
					<div className="flex space-x-8 ">
						<button>
							<NotificationIcon className="h-6 w-6"/>
						</button>
						<div className="flex ml-auto cursor-pointer"
							 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
							{<MenuIcon className="h-6 w-6"/>}
						</div>
					</div>

				</div>
			</header>
			<SideBar
				isOpen={isMobileMenuOpen}
				onClose={() => setIsMobileMenuOpen(false)}
				isFilters={false}
				onApplyFilters={() => {
				}}
				onOpenMap={() => {}}
			/>

		</>
	);
};

export default MainHeader;
