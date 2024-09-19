import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No access token found in localStorage');
        }
        console.log('Access Token:', token); 

        const response = await axios.get('http://localhost:8000/api/students/me/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudentData(response.data);
      } catch (error) {
        setError('Error fetching student data');
        console.error('Error fetching student data:', error.response ? error.response.data : error.message);
      }
    };

    fetchStudentData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="student-profile-container">
      <h2>Student Profile</h2>
      <p>Name: {studentData.name}</p>
      <p>Email: {studentData.email}</p>
      <p>Contact: {studentData.contact}</p>
   
    </div>
  );
};

export default StudentProfile;
