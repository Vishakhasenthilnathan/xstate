import './App.css';
import {useEffect, useState} from "react";
import React from "react";

function App() {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
        async function fetchCountries() {
            const countries = await fetch("https://crio-location-selector.onrender.com/countries");
            const countriesData = await countries.json();
            setCountries(countriesData);
        }

        fetchCountries();
    }, []);

    async function fetchStates(country) {
        const states = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
        const statesData = await states.json();
        setStates(statesData);
    }

    async function fetchCities(country, state) {
        const cities = await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
        const citiesData = await cities.json();
        setCities(citiesData);
    }

    const handleCountrySelection = async (event) => {
        const country = event.target.value;
        setCountry(country);
        await fetchStates(country);
    }
    const handleStateSelection = async (event) => {
        const state = event.target.value;
        setState(state);
        await fetchCities(country, state);
    }
    const handleCitySelection = async (event) => {
        const city = event.target.value;
        setCity(city);
    }
    return (
        <div className="App">
            <h1>Location</h1>
            <select
                name="country"
                id="country-dropdown"
                onChange={e => handleCountrySelection(e)}
                title="Select Country"
            >
                <option value="" defaultValue>Select Country</option>
                {countries.map(country => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </select>
            <select name="state" id="state-dropdown"
                    onChange={(e) => handleStateSelection(e)}
                    disabled={country === ""}
                    title="Select State">
                <option value="" defaultValue>Select State</option>
                {states.map(state => (
                    <option key={state} value={state}>
                        {state}
                    </option>
                ))}
            </select>
            <select name="city" id="city-dropdown"
                    onChange={(e) => handleCitySelection(e)}
                    disabled={state === ""}
                    title="Select City">
                <option value="" defaultValue>Select City</option>
                {cities.map(city => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>
            {
                country && state && city && (
                    <p>
                        You Selected {city}, {state}, {country}
                    </p>
                )
            }
        </div>
    );
}

export default App;
