import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-input-2";

const BACKEND_URL = "http://127.0.0.1:5000";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_type: "",
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    mobile_number: "",
    fax: "",
    phone: "",
    password: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const handleCountryChange = (selectedCountry) => {
    setFormData((prevData) => ({
      ...prevData,
      country: selectedCountry.isoCode,
      state: "",
      city: "",
    }));

    const countryStates =
      State.getStatesOfCountry(selectedCountry.isoCode) || [];
    setStates(countryStates);
    setCities([]);
  };

  const handleStateChange = (selectedState) => {
    setFormData((prevData) => ({
      ...prevData,
      state: selectedState.isoCode,
      city: "",
    }));

    const stateCities =
      City.getCitiesOfState(formData.country, selectedState.isoCode) || [];
    setCities(stateCities);
  };

  const handleCityChange = (selectedCity) => {
    setFormData((prevData) => ({
      ...prevData,
      city: selectedCity.name,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "password" || name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFormData()) {
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User registered successfully");
        navigate("/login");
      } else {
        const data = await response.json();
        console.error("Registration error:", data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const validateFormData = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      alert("Invalid email address");
      return false;
    }
    if (formData.password !== confirmPassword) {
      alert("Password and confirm password do not match");
      return false;
    }

    return true;
  };

  return (
    <div className="max-w-screen-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Signup</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            User Type
          </label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="">Select User Type</option>
            <option value="individual">Individual</option>
            <option value="enterprise">Enterprise</option>
            <option value="government">Government</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Right Column */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Country
          </label>
          <div className="mt-1">
            <select
              name="country"
              value={formData.country}
              onChange={(e) => handleCountryChange(JSON.parse(e.target.value))}
              className="p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={JSON.stringify(country)}>
                  {country.name}
                </option>
              ))}
            </select>
            {formData.country && (
              <p className="mt-2 text-gray-600">{`Selected Country: ${formData.country}`}</p>
            )}
          </div>
        </div>

        {formData.country && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              State
            </label>
            <div className="mt-1">
              <select
                name="state"
                value={formData.state}
                onChange={(e) => handleStateChange(JSON.parse(e.target.value))}
                className="p-2 w-full border rounded-md"
                required
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={JSON.stringify(state)}>
                    {state.name}
                  </option>
                ))}
              </select>
              {formData.state && (
                <p className="mt-2 text-gray-600">{`Selected State: ${formData.state}`}</p>
              )}
            </div>
          </div>
        )}

        {formData.state && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              City
            </label>
            <div className="mt-1">
              <select
                name="city"
                value={formData.city}
                onChange={(e) => handleCityChange(JSON.parse(e.target.value))}
                className="p-2 w-full border rounded-md"
                required
              >
                <option value="">Select City</option>
                {cities.map((city, index) => (
                  <option key={index} value={JSON.stringify(city)}>
                    {city.name}
                  </option>
                ))}
              </select>
              {formData.city && (
                <p className="mt-2 text-gray-600">{`Selected City: ${formData.city}`}</p>
              )}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Pincode
          </label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <div className="flex flex-col mt-1">
            <span className="text-sm font-medium text-gray-600 mb-1">
              Mobile Number
            </span>
            <PhoneInput
              country={"in"} // Initial country
              value={formData.mobileNumber}
              onChange={(value, country, e, formattedValue) =>
                setFormData((prevData) => ({
                  ...prevData,
                  mobileNumber: value,
                  isdCode: country ? country.dialCode : "",
                }))
              }
              inputClass="p-2 border rounded-md w-full mt-1" // Tailwind CSS styling for the input
              containerClass="relative" // Container class
              dropdownClass="rounded-md border shadow-md" // Dropdown class
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Fax</label>
          <input
            type="text"
            name="fax"
            value={formData.fax}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
