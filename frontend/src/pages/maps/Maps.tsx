import React, { useEffect, useState } from 'react';
import { GoogleMap, MarkerF, PolylineF, useLoadScript, InfoWindowF } from "@react-google-maps/api";
import { searchMap } from "../../modules/main-page/api/mainPageService.ts";
import HeaderMaps from "./HeaderMaps.tsx";

const libraries = ['places']; // Статическая переменная для библиотек

const Maps: React.FC = () => {
	// @ts-ignore
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: "AIzaSyBvwqaJ4LM3SDPz1DRqW4Qv8DL2g8Wew-s",
		// @ts-ignore
		libraries,
	});

	const [activeMarker, setActiveMarker] = useState<number | null>(null);
	const [userMarkers, setUserMarkers] = useState<{ id: number; name: string; position: { lat: number; lng: number } }[]>([]);
	const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
	const [routePath, setRoutePath] = useState<google.maps.LatLngLiteral[]>([]);
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [currentMarker, setCurrentMarker] = useState<{ lat: number; lng: number } | null>(null);
	const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);

	useEffect(() => {
		if (isLoaded && map) {
			const directionsServiceInstance = new google.maps.DirectionsService();
			setDirectionsService(directionsServiceInstance);
		}
	}, [isLoaded, map]);

	// Загрузка маркеров из базы данных
	const loadMarkers = async () => {
		try {
			const cityName = userLocation || 'Харків'; // Убедитесь, что вы передаете фактическое название города
			// @ts-ignore
			const markersFromDB = await searchMap(cityName);
			console.log("Response data:", markersFromDB);
			if (markersFromDB.length === 0) {
				console.warn(`No markers found for city: ${cityName}`);
			}
			setUserMarkers(markersFromDB);
		} catch (error) {
			console.error("Error loading markers:", error);
		}
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
				},
				(error) => {
					console.error("Error getting user location:", error);
				}
			);
		}
		loadMarkers();
	}, []);

	const handleActiveMarker = (id: number, position: { lat: number; lng: number }) => {
		setActiveMarker(id);
		setCurrentMarker(position);
	};

	// Построение маршрута
	const buildRoute = () => {
		if (directionsService && userLocation && currentMarker) {
			const origin = userLocation;
			const destination = currentMarker;
			const request: google.maps.DirectionsRequest = {
				origin,
				destination,
				travelMode: google.maps.TravelMode.DRIVING,
			};
			directionsService.route(request, (result, status) => {
				if (status === google.maps.DirectionsStatus.OK && result) {
					const path = result.routes[0].overview_path.map((point) => ({
						lat: point.lat(),
						lng: point.lng(),
					}));
					setRoutePath(path);
				} else {
					console.error("Error fetching directions:", status);
				}
			});
		}
	};

	if (!isLoaded) return <div>Loading...</div>;

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<HeaderMaps/>
			<div className="w-full h-full">
				<GoogleMap
					center={userLocation || {lat: 49.9935, lng: 36.2304}}
					zoom={10}
					onLoad={(map) => setMap(map)}
					mapContainerStyle={{width: "100%", height: "100%"}}
				>
					{userMarkers.map(({id, name, position}) => (
						<MarkerF
							key={id}
							position={position}
							onClick={() => handleActiveMarker(id, position)}
						>
							{activeMarker === id && (
								<InfoWindowF onCloseClick={() => setActiveMarker(null)}>
									<div>
										<p>{name}</p>
										<button onClick={buildRoute}>Построить маршрут</button>
									</div>
								</InfoWindowF>
							)}
						</MarkerF>
					))}
					{userLocation && (
						<MarkerF position={userLocation} title="Ваше местоположение"/>
					)}
					{routePath.length > 0 && (
						<PolylineF
							path={routePath}
							options={{
								strokeColor: '#FF0000',
								strokeOpacity: 0.8,
								strokeWeight: 5,
							}}
						/>
					)}
				</GoogleMap>
			</div>
		</div>
	);
};

export default Maps;
