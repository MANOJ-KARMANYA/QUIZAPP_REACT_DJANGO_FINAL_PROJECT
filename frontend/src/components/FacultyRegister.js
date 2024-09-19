import React, { useState } from 'react';
import axios from 'axios';

const FacultyRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    rePassword: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    rePassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactPattern = /^\d{10}$/; 
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{3,15}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));


    setFormErrors((prevState) => ({
      ...prevState,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    let errors = {
      name: '',
      email: '',
      contact: '',
      password: '',
      rePassword: ''
    };

    if (/\s/.test(formData.name)) {
      errors.name = 'Name should not contain spaces.';
      isValid = false;
    }

    if (!emailPattern.test(formData.email)) {
      errors.email = 'Invalid email format.';
      isValid = false;
    }

    if (!contactPattern.test(formData.contact)) {
      errors.contact = 'Contact number must be exactly 10 digits.';
      isValid = false;
    }


    if (!passwordPattern.test(formData.password)) {
      errors.password = 'Password must be 3-15 characters long, with at least one uppercase letter, one number, and one special character.';
      isValid = false;
    }

 
    if (formData.password !== formData.rePassword) {
      errors.rePassword = 'Passwords do not match!';
      isValid = false;
    }

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

   
    const confirmed = window.confirm('Are you sure you want to register this new faculty?');
    if (confirmed) {
      try {
        const response = await axios.post('http://localhost:8000/api/register/', {
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          password: formData.password,
          user_type: 'faculty'
        });
        setSuccess('Registration successful!');
        console.log('Registration successful:', response.data);

       
        window.location.reload();
      } catch (error) {
        setError('Error during registration.');
        console.error('Error during registration:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <div className="faculty-register-container">
      <br />
      <h2 className="faculty-register-title">Faculty Register</h2>
      <br />
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit} className="faculty-register-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your name"
            required
          />
          {formErrors.name && <p className="error-message">{formErrors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your email"
            required
          />
          {formErrors.email && <p className="error-message">{formErrors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact:</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your contact"
            required
          />
          {formErrors.contact && <p className="error-message">{formErrors.contact}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your password"
            required
          />
          {formErrors.password && <p className="error-message">{formErrors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="rePassword">Re-enter Password:</label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            value={formData.rePassword}
            onChange={handleChange}
            className="form-control"
            placeholder="Re-enter your password"
            required
          />
          {formErrors.rePassword && <p className="error-message">{formErrors.rePassword}</p>}
        </div>
        <button type="submit" className="btn">Register</button>
      </form>
      <br />
    </div>
  );
};

export default FacultyRegister;
