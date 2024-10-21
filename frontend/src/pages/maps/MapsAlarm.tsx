import React, { useEffect, useState } from 'react';
import './MapComponent.css';

import sevastopol from './region_images/sevastopol1043-50f.svg';
import simferopol from './region_images/simferopol1044-7r4.svg';
import kherson from './region_images/kherson1044-g5s.svg';
import zaporizhzhia from './region_images/zaporizhzhia1046-1cni.svg';
import donetsk from './region_images/donetsk1044-rbe.svg';
import luhansk from './region_images/luhansk1045-ybayp.svg';
import kharkiv from './region_images/kharkiv1044-iptv.svg';
import sumy from './region_images/sumy1045-7bm.svg';
import zakarpattia from './region_images/zakarpattia1046-4n1y.svg';
import volyn from './region_images/volyn1046-sm0d.svg';
import lviv from './region_images/lviv1045-ifv.svg';
import ivanoFrankivsk from './region_images/ivanofrankivsk1044-atoq.svg';
import chernivtsi from './region_images/chernivtsi1044-dgoc.svg';
import ternopil from './region_images/ternopil1046-6wzc.svg';
import dnipropetrovsk from './region_images/dnipropetrovsk1044-gn22.svg';
import odesa from './region_images/odesa1045-hsda.svg';
import mykolaiv from './region_images/mykolaiv1045-w2k.svg';
import kirovohrad from './region_images/kirovohrad1045-p559.svg';
import khmelnytskyi from './region_images/khmelnytskyi1044-4vht.svg';
import rivne from './region_images/rivne1045-tkbu.svg';
import chernihiv from './region_images/chernihiv1044-3smh.svg';
import poltava from './region_images/poltava1045-429w.svg';
import zhytomyr from './region_images/zhytomyr1046-pkl.svg';
import vinnytsia from './region_images/vinnytsia1046-lzzf.svg';
import cherkasy from './region_images/cherkasy1044-uq5.svg';
import kyiv from './region_images/kyiv1045-oewl.svg';
import kyivcity from './region_images/kyivcity1045-xxd9.svg';
import HeaderMapsAlarm from "./HeaderMapsAlarm.tsx";


interface RegionData {
	name: string;
	image: string;
	regionKey: string;
	displayName: string;
	textClass1: string;
	textClass2: string;
}

// @ts-ignore
const regions: RegionData[] = [
	{ name: 'Sevastopol', image: sevastopol, regionKey: 'Sevastopol', displayName: 'А. Р. Крим', textClass1: 'ukraine-map-text', textClass2: 'ukraine-map-text-none' },
	{ name: 'Simferopol', image: simferopol, regionKey: 'Simferopol', displayName: '', textClass1: 'ukraine-map-text-none', textClass2: 'alert ukraine-map-text004' },
	{ name: 'Kherson', image: kherson, regionKey: 'Херсонська область', displayName: 'Херсон', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text008' },
	{ name: 'Zaporizhzhia', image: zaporizhzhia, regionKey: 'Запорізька область', displayName: 'Запоріжжя', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text012' },
	{ name: 'Donetsk', image: donetsk, regionKey: 'Донецька область', displayName: 'Донецьк', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text016' },
	{ name: 'Luhansk', image: luhansk, regionKey: 'Луганська область', displayName: 'Луганськ', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text020' },
	{ name: 'Kharkiv', image: kharkiv, regionKey: 'Харківська область', displayName: 'Харків', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text024' },
	{ name: 'Sumy', image: sumy, regionKey: 'Сумська область', displayName: 'Суми', textClass1: 'ukraine-map-text026', textClass2: 'ukraine-map-text-none' },
	{ name: 'Zakarpattia', image: zakarpattia, regionKey: 'Закарпатська область', displayName: 'Ужгород', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text032' },
	{ name: 'Volyn', image: volyn, regionKey: 'Волинська область', displayName: 'Луцьк', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text036' },
	{ name: 'Lviv', image: lviv, regionKey: 'Львівська область', displayName: 'Львів', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text040' },
	{ name: 'Ivano-Frankivsk', image: ivanoFrankivsk, regionKey: 'Івано-Франківська область', displayName: 'Івано-Франківськ', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text044' },
	{ name: 'Chernivtsi', image: chernivtsi, regionKey: 'Чернівецька область', displayName: 'Чернівці', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text050' },
	{ name: 'Ternopil', image: ternopil, regionKey: 'Тернопільська область', displayName: 'Тернопіль', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text054' },
	{ name: 'Dnipropetrovsk', image: dnipropetrovsk, regionKey: 'Дніпропетровська область', displayName: 'Дніпро', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text058' },
	{ name: 'Odesa', image: odesa, regionKey: 'Одеська область', displayName: 'Одеса', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text062' },
	{ name: 'Mykolaiv', image: mykolaiv, regionKey: 'Миколаївська область', displayName: 'Миколаїв', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text066' },
	{ name: 'Kirovohrad', image: kirovohrad, regionKey: 'Кіровоградська область', displayName: 'Кропивницький', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text070' },
	{ name: 'Khmelnytskyi', image: khmelnytskyi, regionKey: 'Хмельницька область', displayName: 'Хмельницький', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text074' },
	{ name: 'Rivne', image: rivne, regionKey: 'Рівненська область', displayName: 'Рівне', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text078' },
	{ name: 'Chernihiv', image: chernihiv, regionKey: 'Чернігівська область', displayName: 'Чернігів', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text082' },
	{ name: 'Poltava', image: poltava, regionKey: 'Полтавська область', displayName: 'Полтава', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text086' },
	{ name: 'Zhytomyr', image: zhytomyr, regionKey: 'Житомирська область', displayName: 'Житомир', textClass1: 'ukraine-map-text088', textClass2: 'ukraine-map-text-none' },
	{ name: 'Vinnytsia', image: vinnytsia, regionKey: 'Вінницька область', displayName: 'Вінниця', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text094' },
	{ name: 'Cherkasy', image: cherkasy, regionKey: 'Черкаська область', displayName: 'Черкаси', textClass1: 'ukraine-map-text-none', textClass2: 'ukraine-map-text098' },
	{ name: 'Kyiv', image: kyiv, regionKey: 'Київська область', displayName: 'Київ', textClass1: 'ukraine-map-text100', textClass2: 'ukraine-map-text-none' },
	{ name: 'Kyivcity', image: kyivcity, regionKey: 'м. Київ', displayName: 'Київ', textClass1: 'ukraine-map-text102', textClass2: 'ukraine-map-text-none' }
];

const colors = ["#193e73", "#f8ae40", "#FDCA40", "#3C3C3C", "#2c5c1c"];

const getColorClass = (index: number) => {
	return { color: colors[index % colors.length] };
};

const MapComponent: React.FC = () => {
	const [states, setStates] = useState<{ [key: string]: { alertnow: boolean } }>({});

	useEffect(() => {
		fetch('https://synara.help/api/alerts')
			.then((response) => response.json())
			.then((data) => setStates(data.states))
			.catch((error) => console.error('Error fetching data:', error));
	}, []);
	useEffect(() => {
		console.log('States:', Object.keys(states));
	}, [states]);

	const getRegionClass = (regionName: string) => {
		const alertData = states[regionName];
		return alertData && alertData.alertnow ? 'alert' : 'no-alert';
	};


	return (
		<div>
			<HeaderMapsAlarm/>
			<title>Ukraine Map Alerts</title>

			<div className="ukraine-map-container">
				<div className="ukraine-map-ukraine-map mt-[3%]">
					{regions.map((region, index) => (
						<React.Fragment key={region.name}>
							<img
								src={region.image}
								alt={region.name}

								className={`${region.name === 'Simferopol' || region.name === 'Sevastopol' ? `alert ukraine-map-${region.name.toLowerCase()}` : getRegionClass(region.regionKey)} ukraine-map-${region.name.toLowerCase()}`}
							/>
							<span className={`${region.textClass1} font-montserratRegular`} style={getColorClass(index)}>
                                <span>{region.displayName}</span>
                            </span>
							{region.textClass2 && (
								<span className={region.textClass2} style={getColorClass(index + 1)}>
                                    <span>{region.displayName}</span>
                                </span>
							)}
						</React.Fragment>
					))}
				</div>
			</div>
		</div>
	);
};

export default MapComponent;