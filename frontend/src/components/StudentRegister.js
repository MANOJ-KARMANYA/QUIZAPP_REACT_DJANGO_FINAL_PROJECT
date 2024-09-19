import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const StudentRegister = () => {
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

  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); 

  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{3,15}$/;
  const contactPattern = /^\d{10}$/;
  const namePattern = /^[^\s]+(\s[^\s]+)*$/; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value.trimStart() 
    });

    setFormErrors({
      ...formErrors,
      [name]: ''
    });
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

    const trimmedName = formData.name.trim();

    if (!namePattern.test(trimmedName)) {
      errors.name = 'Name should not have leading, trailing, or multiple consecutive spaces.';
      isValid = false;
    }

    if (!contactPattern.test(formData.contact)) {
      errors.contact = 'Contact number should be exactly 10 digits.';
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

    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        name: trimmedName,  
        email: formData.email,
        contact: formData.contact,
        password: formData.password,
        user_type: 'student'
      });
      setSuccess('Registration successful!');
      console.log('Registration successful:', response.data);
      navigate('/studentlogin'); 
    } catch (error) {
      setFormErrors({ ...formErrors, global: 'Error during registration.' });
      console.error('Error during registration:', error.response.data);
    }
  };

  return (
    <div className="student-register-container">
      <br />
      <h2 className="student-register-title">Student Register</h2>
      <br />
      {formErrors.global && <p className="error">{formErrors.global}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit} className="student-register-form">
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
        <div className="form-footer">
          <button type="submit" className="btn-student">
            Register
          </button>
          <a href="/studentlogin" className="forgot-password">
            Already have account? login
          </a>
        </div>
      </form>
      <br />
    </div>
  );
};

export default StudentRegister;
