import React from "react";
import { useState, useEffect } from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import Suggestion from 'react-places-autocomplete';

const WeatherPage = () => {
    const [currentLocation, setCurrentLocation] = useState('');
    const [currentCity, setCurrentCity] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [weatherData, setWeatherData] = useState<any>();
    const [error, setError] = useState('');
    const [address, setAddress] = useState();
    const [latt, setLatt] = useState([]);
    const [lngg, setLngg] = useState([]);
    const [sunrise, setsunrise] = useState<any>();
    const [sunset, setsunset] = useState<any>();
    const [addressPrint, setaddressPrint] = useState('');


    const handleChange = (newAddress) => {
        setAddress(newAddress);
    };

    const handleSelect = (selectedAddress) => {
        console.log("selectedAddress", selectedAddress);
        setaddressPrint(selectedAddress);
        geocodeByAddress(selectedAddress)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                console.log('Success', latLng);
                setLatt(latLng.lat); // Store the latLng array in state
                setLngg(latLng.lng);
            })
            .catch((error) => console.error('Error', error));
    };
    console.log(address);


    console.log("latt ==>", latt);
    console.log("lngg ==>", lngg);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCurrentLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
                        reverseGeocode(latitude, longitude);
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        setCurrentLocation('Failed to retrieve location');
                    }
                );
            } else {
                setCurrentLocation('Geolocation is not supported by your browser');
            }
        };

        // console.log("latLng",latLng)
        console.log("60", latt, lngg);

        const reverseGeocode = async (latitude, longitude) => {
            try {
                console.log("inside", lngg, latt)
                const apiKey = 'AIzaSyDWn01sodNSPmtf9YtOsPgKmYTBgKm2-E0';
                const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${(latt.length === 0) ? (latitude) : (latt)},${(lngg.length === 0) ? (longitude) : (lngg)}&key=${apiKey}`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    const city = getCityFromGeocodeResult(data.results[0]);
                    setCurrentCity(city);
                    setSelectedAddress(city); // Set the selectedAddress to be the city from geolocation
                }
            } catch (error) {
                console.error('Error reverse geocoding:', error);
            }
        };

        const getCityFromGeocodeResult = (geocodeResult) => {
            const addressComponents = geocodeResult.address_components;
            const cityComponent = addressComponents.find((component) =>
                component.types.includes('locality')
            );
            return cityComponent ? cityComponent.long_name : 'Unknown';
        };

        getLocation();
    }, [latt, lngg]);

    // const handleChange = (newAddress: string) => {
    //     setaddresss(newAddress);
    // };


    // const handleSelect = (address: string) => {
    //     const newCity = address.split(',')[0];
    //     setSelectedAddress(newCity);
    // };

    useEffect(() => {
        if (selectedAddress !== '') {
            const city = selectedAddress;
            const apiKey = 'd885aa1d783fd13a55050afeef620fcb';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

            const fetchData = async () => {
                try {
                    const response = await fetch(apiUrl);
                    if (response.ok) {
                        const data = await response.json();
                        setWeatherData(data);
                        console.log(data);
                        setError('noerror');
                    } else {
                        setError('Weather data not found');
                    }
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                    setError('Error');
                }
            };

            fetchData();
        }
    }, [selectedAddress]);



    // if (!weatherData) {

    //     return (<>
    //         <PlacesAutocomplete
    //             value={address}
    //             onChange={handleChange}
    //             onSelect={handleSelect}
    //         >
    //             {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
    //                 <div>
    //                     <input
    //                         {...getInputProps({
    //                             placeholder: 'Search Places ...',
    //                             className: 'location-search-input',
    //                         })}
    //                     />
    //                     <div className="autocomplete-dropdown-container">
    //                         {loading && <div>Loading...</div>}
    //                         {suggestions.map((suggestion: Suggestion) => {
    //                             const className = suggestion.active
    //                                 ? 'suggestion-item--active'
    //                                 : 'suggestion-item';
    //                             // inline style for demonstration purpose
    //                             const style = suggestion.active
    //                                 ? { backgroundColor: '#fafafa', cursor: 'pointer' }
    //                                 : { backgroundColor: '#ffffff', cursor: 'pointer' };
    //                             return (
    //                                 <div
    //                                     {...getSuggestionItemProps(suggestion, {
    //                                         className,
    //                                         style,
    //                                     })}
    //                                 >
    //                                     <span>{suggestion.description}</span>
    //                                 </div>
    //                             );
    //                         })}
    //                     </div>

    //                 </div>
    //             )}
    //         </PlacesAutocomplete>

    //         <div>Loading weather data...</div>

    //     </>);
    // }



    // Then, before you destructure:
    let weatherDescription = '';
    let main = null;
    let weather = null;
    let sys = null;
    let name = null;
    let coord = null;
    let timezone = Number

    if (weatherData && weatherData.main && weatherData.sys && weatherData.coord) {
        ({ main, weather, sys, name, coord, timezone } = weatherData);
    }


    // const [address, setAddress] = useState('');


    return (
        <>
            {/* <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions && suggestions.length > 0 && suggestions.map((suggestion: Suggestion) => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete> */}

            <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <div className="body">
                            <div className="search-container">
                                <input
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input',
                                    })}
                                    type="text" name="search" placeholder="Search..." className="search-input" />


                                <a className="search-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#b2e0df" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                        /> */}
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            {/* <div className="body">
                <div className="search-container">
                    <input type="text" name="search" placeholder="Search..." className="search-input" />
                    <a href="#" className="search-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#b2e0df" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </a>
                </div>
            </div> */}





            <div className="MainDev">
                <div className="centerDev">
                    {error === 'noerror' && weatherData && (
                        <>
                            <div>
                                <h2>Weather for {name}</h2>
                                {addressPrint && (
                                    <>
                                        <p>{addressPrint}</p>
                                    </>
                                )}
                            </div>


                            <p>lat {weatherData.coord.lat} & lon {weatherData.coord.lon}</p>
                            <p>TimeZone: </p>
                            <div className="twoSection">

                                <div className="temp">
                                    <div>
                                        <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
                                        <p>Maximum Temperature: {Math.round(weatherData.main.temp_max - 273.15)}°C</p>

                                    </div>
                                    <div>
                                        <p>Feels Like: {Math.round(weatherData.main.feels_like - 273.15)}°C</p>
                                        <p>Minimum Temperature: {Math.round(weatherData.main.temp_min - 273.15)}°C</p>

                                    </div>

                                </div>
                                <div>
                                    <p>Sunrise <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-sunrise-fill" viewBox="0 0 16 16">
                                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708l1.5-1.5zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                                    </svg> : { }
                                        {sunrise}
                                        {weatherData && weatherData.sys && weatherData.sys.sunrise && new Date(weatherData.sys.sunrise * 1000).toLocaleString().split(',')[1]}

                                    </p>
                                    <p>Sunset <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-moon-stars" viewBox="0 0 16 16">
                                        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                                        <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
                                    </svg> :
                                        {weatherData && weatherData.sys && weatherData.sys.sunset && new Date(weatherData.sys.sunset * 1000).toLocaleString().split(',')[1]}

                                    </p>
                                </div>
                                <div className="lastrow">
                                    <p>Humidity: {weatherData.main.humidity}%</p>
                                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                                    <p>Pressure: {(weatherData.main.pressure / 1013.25).toFixed(2)} atm</p>

                                </div>

                                {/* Add more fields as needed */}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {error !== 'noerror' && (
                <div>
                    <h2>Please click on allow location & give location access 
                    </h2>
                    <p>{error}</p>
                </div>
            )}

        </>
    )
}
export default WeatherPage;