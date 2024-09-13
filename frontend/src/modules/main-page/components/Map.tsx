import React, { Fragment,useState,useEffect } from 'react';
import { Button } from "../../../ui/Button.tsx";
import BackArrowMini from '../../../assets/images/back_arrow_mini.svg?react';
import {
    GoogleMap,
    InfoWindowF,
    MarkerF,
    CircleF,
    useLoadScript,
} from "@react-google-maps/api";
import SearchComponentMap from "./SearchComponentMap.tsx";
import {Slider} from "@mui/material";
import { searchMap, searchUsersByRadius} from "../api/mainPageService.ts";

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
    onBackToFilters: () => void;
    onUsersByRadiusFound: (users: any[]) => void;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Радиус Земли в км
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Расстояние в км
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

const initialMarkers = [
    // {
    //     id: 1,
    //     name: "Qobustan",
    //     position: { lat: 49.993520, lng: 36.259416 },
    // },
    // {
    //     id: 2,
    //     name: "Sumqayit",
    //     position: { lat: 40.5788843, lng: 49.5485073 },
    // },
    // {
    //     id: 3,
    //     name: "Baku",
    //     position: { lat: 40.3947365, lng: 49.6898045 },
    // },
];

const staticMarkers = [
    //{ id: 5, name: "Marker 1", position: { lat: 49.9939, lng: 36.2500 } },
    // { id: 6, name: "Marker 2", position: { lat: 49.9870, lng: 36.2200 } },
    // { id: 7, name: "Marker 3", position: { lat: 49.9800, lng: 36.2700 } },
    // { id: 8, name: "Marker 4", position: { lat: 49.9250, lng: 36.2800 } },
    // {
    //     id: 9,
    //     name: "Проспект Петра Григоренка",
    //     position: { lat: 49.948734, lng: 36.374507 },
    // },
];



export const Map: React.FC<SideBarProps> = ({ isOpen, onClose, onBackToFilters, onUsersByRadiusFound }) => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBvwqaJ4LM3SDPz1DRqW4Qv8DL2g8Wew-s",
    });

    const [activeMarker, setActiveMarker] = useState(null);
    const [userMarkers, setUserMarkers] = useState(initialMarkers);
    const [circleRadius, setCircleRadius] = useState(10000);
    const [visibleMarkers, setVisibleMarkers] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    // const handleMapClick = (event) => {
    //     const newLatLng = {
    //         lat: event.latLng.lat(),
    //         lng: event.latLng.lng(),
    //     };
    //
    //     // Запрос к API геокодирования для получения адреса
    //     const geocoder = new window.google.maps.Geocoder();
    //     geocoder.geocode({ location: newLatLng }, (results, status) => {
    //         if (status === "OK" && results[0]) {
    //             const addressComponents = results[0].address_components;
    //             const country = addressComponents.find((component) =>
    //                 component.types.includes("country")
    //             )?.long_name;
    //
    //             let address = results[0].formatted_address;
    //
    //             // Если это Украина, запрашиваем адрес на украинском языке
    //             if (country === "Ukraine") {
    //                 geocoder.geocode(
    //                     { location: newLatLng, language: "uk" },
    //                     (ukResults, ukStatus) => {
    //                         if (ukStatus === "OK" && ukResults[0]) {
    //                             address = ukResults[0].formatted_address;
    //                             console.log("Координати нового маркера:", newLatLng);
    //                             console.log("Адреса (укр):", address);
    //                         } else {
    //                             console.log("Координати нового маркера:", newLatLng);
    //                             console.log("Адреса:", address);
    //                         }
    //
    //                         const newMarker = {
    //                             id: userMarkers.length + 1,
    //                             name: address, // Название маркера теперь будет названием улицы
    //                             position: newLatLng,
    //                         };
    //                         setUserMarkers([...userMarkers, newMarker]);
    //                     }
    //                 );
    //             } else {
    //                 console.log("Координати нового маркера:", newLatLng);
    //                 console.log("Адреса:", address);
    //
    //                 const newMarker = {
    //                     id: userMarkers.length + 1,
    //                     name: address,
    //                     position: newLatLng,
    //                 };
    //                 setUserMarkers([...userMarkers, newMarker]);
    //             }
    //         } else {
    //             console.error("Geocoder failed due to:", status);
    //         }
    //     });
    // };


    const loadCityMarkers = async (city: string) => {
        try {
            const dynamicMarkers = await searchMap(city);
            const allMarkers = [...staticMarkers, ...dynamicMarkers];
            console.log("All markers:", allMarkers);
            setUserMarkers(allMarkers);
        } catch (error) {
            console.error("Error loading city markers:", error);
        }
    };

    // set markers
    useEffect(() => {
        const center = selectedCity?.position || userLocation || { lat: 49.9935, lng: 36.2304 };
        const markersWithinRadius = userMarkers.filter((marker) => {
            const distance = getDistanceFromLatLonInKm(
                center.lat,
                center.lng,
                marker.position.lat,
                marker.position.lng
            );
            return distance <= circleRadius / 1000;
        });
        setVisibleMarkers(markersWithinRadius);
    }, [circleRadius, userLocation, selectedCity, userMarkers]);


    // ask geolocation
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });

                    // Добавить маркер на место пользователя
                    const newMarker = {
                        id: userMarkers.length + 1,
                        name: `Your Location`,
                        position: { lat: latitude, lng: longitude },
                    };
                    setUserMarkers([...userMarkers, newMarker]);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);
    const handleCitySelect = (city) => {
        setSelectedCity(city);
    };

    const handleApplyClick = async () => {
        if (selectedCity) {
            setUserLocation(selectedCity.position);
            await loadCityMarkers(selectedCity.name);

            try {
                const radiusInKm = circleRadius / 1000;
                const usersByRadius = await searchUsersByRadius(radiusInKm, selectedCity.name);
                console.log("Users by radius:", usersByRadius);

                onUsersByRadiusFound(usersByRadius);

                await loadCityMarkers(selectedCity.name);
            } catch (error) {
                console.error("Error fetching users by radius:", error);
            }
        }
    };

    const defaultRadius = 10000;
    const kharkiv = { lat: 49.9935, lng: 36.2304 };

    // clear filter
    const [searchTerm, setSearchTerm] = useState(""); // Состояние для ввода города


    const handleClearClick = () => {
        setCircleRadius(defaultRadius);
        setSelectedCity(null);
        setSearchTerm(""); // Очистить поле ввода

        setUserLocation(kharkiv);

        console.log("user location:", userLocation);
        console.log("kharkiv", kharkiv);
    };



    const handleBackClick = () => {
        onBackToFilters();
    };

    return (
        <Fragment>
            <>
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-40"
                        onClick={onClose}
                    ></div>
                )}

                {/* Sidebar */}
                <div
                    className={`fixed top-0 right-0 bg-white z-40 overflow-hidden transform transition-transform duration-500 ease-in-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-2/6 h-full shadow-lg border-2 border-l-dark-blue 
                    border-t-dark-blue border-b-dark-blue rounded-l-3xl flex flex-col`}
                >
                    <div className="flex flex-col flex-grow">

                        {/* Nav items */}
                        <div className="mt-4 flex flex-row w-full justify-center">
                            <BackArrowMini className="h-5 w-5 mt-3 mr-12 justify-start" onClick={handleBackClick}/>
                            <h2 className="text-h3 ml-12 mr-12 font-kharkiv text-center">Відстань пошуку</h2>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
                            {/* Search input with icon */}
                            <SearchComponentMap
                                onCitySelect={handleCitySelect}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                            />



                            {/* Radius Slider */}
                            <div className="radius-slider mb-2" style={{width: "95%"}}>
                                <label style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "1px"
                                }}>
                                    <span className="mt-2 text-xs-ps font-montserratRegular">Радіус:</span>
                                    <span className="text-xs-ps font-montserratRegular">{(circleRadius / 1000).toFixed(0)} км</span>
                                </label>
                                <Slider
                                    id="radius"
                                    size="small"
                                    aria-label="Small"
                                    min={1000}
                                    max={20000}

                                    value={circleRadius}
                                    onChange={(e) => setCircleRadius(Number(e.target.value))}
                                />

                            </div>
                        </div>
                        {isLoaded ? (
                            <GoogleMap
                                center={userLocation || {lat: 49.993520, lng: 36.259416}}
                                zoom={10}
                                // onClick={handleMapClick}
                                onLoad={(map) => map.setOptions({clickableIcons: false})}
                                mapContainerStyle={{width: "100%", height: "60vh"}}
                            >
                                {userMarkers.map(({id, name, position}) => (
                                    <MarkerF
                                        key={id}
                                        position={position}
                                        title={name}
                                        onClick={() => handleActiveMarker(id)}
                                    >
                                        {activeMarker === id ? (
                                            <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                                                <div>
                                                    <p>{name}</p>
                                                </div>
                                            </InfoWindowF>
                                        ) : null}
                                    </MarkerF>
                                ))}


                                <CircleF
                                    center={userLocation || {lat: 49.9935, lng: 36.2304}}
                                    radius={circleRadius}
                                    options={{
                                        fillColor: "#6dc7f4",
                                        fillOpacity: 0.3,
                                        strokeColor: "#728dbd",
                                        strokeOpacity: 0.8,
                                        strokeWeight: 2,
                                    }}
                                />


                                {visibleMarkers.map(({id, name, position}) => (
                                    <MarkerF
                                        key={id}
                                        position={position}
                                        onClick={() => handleActiveMarker(id)}
                                    >
                                        {activeMarker === id ? (
                                            <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                                                <div>
                                                    <p>{name}</p>
                                                </div>
                                            </InfoWindowF>
                                        ) : null}
                                    </MarkerF>
                                ))}
                            </GoogleMap>
                        ) : null}
                        {/* Buttons */}
                        <div className="flex flex-col space-y-3 mx-8 mt-2">
                            <Button isFilled={true} className=" uppercase text-black py-3 md:text-pxl"
                                    onClick={handleApplyClick}
                            >
                                Застосувати
                            </Button>
                            <Button onClick={handleClearClick} hasBlue={true} className=" uppercase py-3 md:text-pxl">
                                Очистити
                            </Button>
                        </div>
                    </div>
                </div>

            </>
        </Fragment>

    );
};