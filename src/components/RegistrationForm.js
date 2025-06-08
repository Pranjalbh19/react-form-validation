import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    showPassword: false,
    phoneCountryCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCountryCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);

  const countries = [
    { value: '', label: 'Select Country' },
    { value: 'USA', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    { value: 'India', label: 'India' },
    { value: 'UK', label: 'United Kingdom' },
  ];

  const citiesByCountry = {
    USA: ['New York', 'Los Angeles', 'Chicago'],
    Canada: ['Toronto', 'Vancouver', 'Montreal'],
    India: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata'],
    UK: ['London', 'Manchester', 'Edinburgh'],
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    let formIsValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
      formIsValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
      formIsValid = false;
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      formIsValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
      formIsValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
      formIsValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      formIsValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      formIsValid = false;
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
      formIsValid = false;
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
      formIsValid = false;
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
      formIsValid = false;
    } else if (!/[!@#$%^&*]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one special character (!@#$%^&*)';
      formIsValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
      formIsValid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be 10 digits';
      formIsValid = false;
    }
    if (!formData.phoneCountryCode) {
      newErrors.phoneCountryCode = 'Country code is required';
      formIsValid = false;
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
      formIsValid = false;
    }

    if (!formData.city) {
      newErrors.city = 'City is required';
      formIsValid = false;
    }

    if (!formData.panNo.trim()) {
      newErrors.panNo = 'PAN Number is required';
      formIsValid = false;
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo.toUpperCase())) {
      newErrors.panNo = 'Invalid PAN Number format (e.g., ABCDE1234F)';
      formIsValid = false;
    }

    if (!formData.aadharNo.trim()) {
      newErrors.aadharNo = 'Aadhar Number is required';
      formIsValid = false;
    } else if (!/^\d{12}$/.test(formData.aadharNo)) {
      newErrors.aadharNo = 'Aadhar Number must be 12 digits';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  useEffect(() => {
    const formIsValid = validateForm();
    setIsValidForm(formIsValid);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formIsValid = validateForm();

    if (formIsValid) {
      setIsSubmitted(true);
      console.log('Form data submitted:', formData);
      navigate('/success', { state: { formData: formData } });
    } else {
      setIsSubmitted(false);
      console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <div className="registration-form-container">
<h2
  style={{
    color: 'black',
    fontFamily: 'Montserrat, Helvetica, sans-serif',
    padding: '10px',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '32px'
  }}
>
Step in and say hi to Pranjal</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'input-error' : ''}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'input-error' : ''}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'input-error' : ''}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input-container">
            <input
              type={formData.showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
            />
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }))}
              className="password-toggle-button"
            >
              {formData.showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <div className="phone-input-group">
            <select
              name="phoneCountryCode"
              value={formData.phoneCountryCode}
              onChange={handleChange}
              className={errors.phoneCountryCode ? 'input-error' : ''}
            >
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (Canada)</option>
            </select>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? 'input-error' : ''}
              placeholder="e.g., 9876543210"
            />
          </div>
          {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={errors.country ? 'input-error' : ''}
          >
            {countries.map((countryOpt) => (
              <option key={countryOpt.value} value={countryOpt.value}>
                {countryOpt.label}
              </option>
            ))}
          </select>
          {errors.country && <span className="error-message">{errors.country}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.country}
            className={errors.city ? 'input-error' : ''}
          >
            <option value="">Select City</option>
            {formData.country && citiesByCountry[formData.country]?.map((cityOpt) => (
              <option key={cityOpt} value={cityOpt}>
                {cityOpt}
              </option>
            ))}
          </select>
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="panNo">PAN Number:</label>
          <input
            type="text"
            id="panNo"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
            className={errors.panNo ? 'input-error' : ''}
            maxLength="10"
          />
          {errors.panNo && <span className="error-message">{errors.panNo}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="aadharNo">Aadhar Number:</label>
          <input
            type="text"
            id="aadharNo"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
            className={errors.aadharNo ? 'input-error' : ''}
            maxLength="12"
          />
          {errors.aadharNo && <span className="error-message">{errors.aadharNo}</span>}
        </div>

        <button type="submit" disabled={!isValidForm}>
          Register Yourself
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;