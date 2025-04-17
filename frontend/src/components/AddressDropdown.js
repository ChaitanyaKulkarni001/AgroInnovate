import React, { useState, useEffect } from 'react';
import { fetchCountries, fetchStates, fetchCities } from '../services/api';

const AddressDropdown = ({ onAddressChange }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Load countries on component mount
  useEffect(() => {
    const loadCountries = async () => {
      const countriesData = await fetchCountries();
      setCountries(countriesData);
    };
    loadCountries();
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (selectedCountry) {
      const loadStates = async () => {
        const statesData = await fetchStates(selectedCountry);
        setStates(statesData);
        setSelectedState(''); // Reset state selection
        setCities([]); // Reset cities
        setSelectedCity(''); // Reset city selection
      };
      loadStates();
    }
  }, [selectedCountry]);

  // Load cities when state changes
  useEffect(() => {
    if (selectedState) {
      const loadCities = async () => {
        const citiesData = await fetchCities(selectedState);
        setCities(citiesData);
        setSelectedCity(''); // Reset city selection
      };
      loadCities();
    }
  }, [selectedState]);

  // Notify parent component when address changes
  useEffect(() => {
    onAddressChange({
      country: selectedCountry,
      state: selectedState,
      city: selectedCity
    });
  }, [selectedCountry, selectedState, selectedCity, onAddressChange]);

  return (
    <div className="address-dropdowns">
      <div className="form-group">
        <label>Country</label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          required
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>State</label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
          required
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>City</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
          required
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AddressDropdown;