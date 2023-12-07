import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";

const BACKEND_URL = "http://127.0.0.1:5000";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    mobileNumber: "",
    fax: "",
    phone: "",
    password: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const handleCountryChange = (selectedCountry) => {
    console.log(selectedCountry);
    // const json_selectedCountry =
    //   selectedCountry !== "" ? JSON.parse(selectedCountry) : "";
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

    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let errors = { ...formErrors };

    switch (name) {
      case "firstName":
        if (!value.match(/^[a-zA-Z]+$/)) {
          errors[name] = "Invalid first name. Please enter only letters.";
        } else {
          delete errors[name];
        }
        break;

      case "lastName":
        if (!value.match(/^[a-zA-Z]+$/)) {
          errors[name] = "Invalid last name. Please enter only letters.";
        } else {
          delete errors[name];
        }
        break;

      case "email":
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(value)) {
          errors[name] = "Invalid email address.";
        } else {
          delete errors[name];
        }
        break;

      case "password":
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(value)) {
          errors[name] =
            "Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long.";
        } else {
          delete errors[name];
        }
        break;

      case "confirmPassword":
        if (value !== formData.password) {
          errors[name] = "Passwords do not match.";
        } else {
          delete errors[name];
        }
        break;

      case "address":
        if (value.length < 5) {
          errors[name] = "Enter a valid address.";
        } else {
          delete errors[name];
        }
        break;

      case "country":
        if (!value) {
          errors[name] = "Select a country.";
        } else {
          delete errors[name];
        }
        break;

      case "state":
        if (!value) {
          errors[name] = "Select a state.";
        } else {
          delete errors[name];
        }
        break;

      case "city":
        if (!value) {
          errors[name] = "Select a city.";
        } else {
          delete errors[name];
        }
        break;

      case "pincode":
        if (value.length < 6) {
          errors[name] = "Enter a valid pincode.";
        } else {
          delete errors[name];
        }
        break;

      case "mobileNumber":
        if (value.length < 10) {
          errors[name] = "Enter a valid mobile number.";
        } else {
          delete errors[name];
        }
        break;

      default:
        break;
    }

    setFormErrors(errors);
  };

  const validateForm = () => {
    let errors = {};

    // Validate first name
    if (!formData.firstName.match(/^[a-zA-Z]+$/)) {
      errors.firstName = "Invalid first name. Please enter only letters.";
    }

    // Validate last name
    if (!formData.lastName.match(/^[a-zA-Z]+$/)) {
      errors.lastName = "Invalid last name. Please enter only letters.";
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email address.";
    }

    // Validate password (at least one number, one uppercase, one lowercase, and at least 8 characters)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long.";
    }

    // Validate password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    // Validate address
    if (formData.address.length < 5) {
      errors.address = "Enter a valid address.";
    }

    // Validate country
    if (!formData.country) {
      errors.country = "Select a country.";
    }

    // Validate state
    if (!formData.state) {
      errors.state = "Select a state.";
    }

    // Validate city
    if (!formData.city) {
      errors.city = "Select a city.";
    }

    // Validate pincode
    if (formData.pincode.length < 6) {
      errors.pincode = "Enter a valid pincode.";
    }

    // Validate mobile number
    if (formData.mobileNumber.length < 10) {
      errors.mobileNumber = "Enter a valid mobile number.";
    }

    setFormErrors(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success("User registered successfully", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/login");
        } else {
          const data = await response.json();
          toast.error("Registration error", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.error("Registration error:", data.message);
        }
      } catch (error) {
        toast.error("Error during registration", {
          position: "bottom-right",
          autoClose: 2000,
        });
        console.error("Error during registration:", error);
      }
    } else {
      toast.error("Server Error", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
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
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md ${
              formErrors.firstName ? "border-red-500" : ""
            }`}
            required
          />
          {formErrors.firstName && (
            <p className="text-red-500 mt-1">{formErrors.firstName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md ${
              formErrors.lastName ? "border-red-500" : ""
            }`}
            required
          />
          {formErrors.lastName && (
            <p className="text-red-500 mt-1">{formErrors.lastName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
          {formErrors.email && (
            <p className="text-red-500 mt-1">{formErrors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Address *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
          {formErrors.address && (
            <p className="text-red-500 mt-1">{formErrors.address}</p>
          )}
        </div>

        {/* Right Column */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Country *
          </label>
          <div className="mt-1">
            <select
              name="country"
              onChange={(e) => {
                if (e.target.value !== "")
                  handleCountryChange(JSON.parse(e.target.value));
              }}
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
            {formErrors.country && (
              <p className="text-red-500 mt-1">{formErrors.country}</p>
            )}
          </div>
        </div>

        {formData.country && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              State *
            </label>
            <div className="mt-1">
              <select
                name="state"
                onChange={(e) => {
                  if (e.target.value !== "")
                    handleStateChange(JSON.parse(e.target.value));
                }}
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
              {formErrors.state && (
                <p className="text-red-500 mt-1">{formErrors.state}</p>
              )}
            </div>
          </div>
        )}

        {formData.state && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              City *
            </label>
            <div className="mt-1">
              <select
                name="city"
                onChange={(e) => {
                  if (e.target.value !== "")
                    handleCityChange(JSON.parse(e.target.value));
                }}
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
              {formErrors.city && (
                <p className="text-red-500 mt-1">{formErrors.city}</p>
              )}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Pincode *
          </label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
          {formErrors.pincode && (
            <p className="text-red-500 mt-1">{formErrors.pincode}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex flex-col mt-1">
            <span className="text-sm font-medium text-gray-600 mb-1">
              Mobile Number *
            </span>
            <PhoneInput
              country={"in"} // Initial country
              value={formData.mobileNumber}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  mobileNumber: value,
                }));
              }}
              inputClass="p-2 border rounded-md w-full mt-1"
              containerClass="relative"
              dropdownClass="rounded-md border shadow-md"
            />
            {formErrors.mobileNumber && (
              <p className="text-red-500 mt-1">{formErrors.mobileNumber}</p>
            )}
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
            Password *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
          {formErrors.password && (
            <p className="text-red-500 mt-1">{formErrors.password}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Confirm Password *
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
          {formErrors.confirmPassword && (
            <p className="text-red-500 mt-1">{formErrors.confirmPassword}</p>
          )}
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
