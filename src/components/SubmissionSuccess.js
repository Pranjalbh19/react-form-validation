// src/components/SubmissionSuccess.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SubmissionSuccess.css'; // We'll create this CSS file later

const SubmissionSuccess = () => {
  const location = useLocation();
  const formData = location.state?.formData; // Get formData from navigation state

  if (!formData) {
    return (
      <div className="success-container">
        <h2>No Data Submitted!</h2>
        <p>Please go back to the <Link to="/">registration form</Link> to submit your details.</p>
      </div>
    );
  }

  // Helper to format PAN/Aadhar for display (e.g., masking)
  const formatSecret = (value, showLast) => {
    if (!value) return 'N/A';
    const len = value.length;
    if (len <= showLast) return value;
    return '*'.repeat(len - showLast) + value.substring(len - showLast);
  };


  return (
    <div className="success-container">
      <h2>Registration Successful!</h2>
      <p>Thank you for registering. Here are your submitted details:</p>

      <div className="details-card">
        <h3>User Information</h3>
        <p><strong>First Name:</strong> {formData.firstName}</p>
        <p><strong>Last Name:</strong> {formData.lastName}</p>
        <p><strong>Username:</strong> {formData.username}</p>
        <p><strong>E-mail:</strong> {formData.email}</p>
        {/* Do NOT display raw password for security! */}
        <p><strong>Password:</strong> ******** (Hidden for security)</p>
        <p><strong>Phone Number:</strong> {formData.phoneCountryCode} {formData.phoneNumber}</p>
        <p><strong>Country:</strong> {formData.country}</p>
        <p><strong>City:</strong> {formData.city}</p>
        <p><strong>PAN Number:</strong> {formatSecret(formData.panNo, 4)}</p> {/* Show last 4 for verification */}
        <p><strong>Aadhar Number:</strong> {formatSecret(formData.aadharNo, 4)}</p> {/* Show last 4 */}
      </div>

      <Link to="/" className="back-to-form-button">Go back to Registration</Link>
    </div>
  );
};

export default SubmissionSuccess;