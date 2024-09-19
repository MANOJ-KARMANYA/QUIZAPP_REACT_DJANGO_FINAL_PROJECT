import React, { useState ,useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const FacultyTable = () => {
  const [url, setUrl] = useState('http://localhost:8000/api/faculties/');
  const { data: faculties = [], isPending, error, refetch } = useFetch(url);;
  const [isEditing, setIsEditing] = useState(null);
  const [updatedFaculty, setUpdatedFaculty] = useState({ name: '', email: '', contact: '' });


  useEffect(() => {
  
    const timer = setTimeout(() => {
      setUrl('http://localhost:8000/api/faculties/');
    }, 500);


    return () => clearTimeout(timer);
  }, []);
    

  const handleEdit = (faculty) => {
    setIsEditing(faculty.id);
    setUpdatedFaculty({ name: faculty.name, email: faculty.email, contact: faculty.contact });
    
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this faculty?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/api/faculties/${id}/`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        alert('Faculty deleted successfully!');
        refetch(); 
      } catch (error) {
        console.error('Error deleting faculty:', error.response ? error.response.data : error.message);
        alert('Failed to delete faculty.');
      }
    }
  };

  const handleUpdate = async (id) => {
    const confirmed = window.confirm('Are you sure you want to update this faculty?');
    if (confirmed) {
      try {
        await axios.put(`http://localhost:8000/api/api/faculties/${id}/`, updatedFaculty, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        alert('Faculty updated successfully!');
        setIsEditing(null);
        window.location.reload();

      } catch (error) {
        console.error('Error updating faculty:', error.response ? error.response.data : error.message);
        alert('Failed to update faculty.');
      }
    }
  };

  return (
    <div className="faculty-table-container">
      <br/>
      <h2>Faculty List</h2>
      <br/>
      {isPending && <p>Loading...</p>}
      {Array.isArray(faculties) && faculties.length > 0 ? (
        <table className="faculty-table">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculties.map(faculty => (
              <tr key={faculty.id}>
                {/* <td>{faculty.id}</td> */}
                <td>
                  {isEditing === faculty.id ? (
                    <input
                      type="text"
                      value={updatedFaculty.name}
                      onChange={(e) => setUpdatedFaculty({ ...updatedFaculty, name: e.target.value })}
                    />
                  ) : (
                    faculty.name
                  )}
                </td>
                <td>
                  {isEditing === faculty.id ? (
                    <input
                      type="text"
                      value={updatedFaculty.email}
                      onChange={(e) => setUpdatedFaculty({ ...updatedFaculty, email: e.target.value })}
                    />
                  ) : (
                    faculty.email
                  )}
                </td>
                <td>
                  {isEditing === faculty.id ? (
                    <input
                      type="text"
                      value={updatedFaculty.contact}
                      onChange={(e) => setUpdatedFaculty({ ...updatedFaculty, contact: e.target.value })}
                    />
                  ) : (
                    faculty.contact
                  )}
                </td>
                <td>
                  {isEditing === faculty.id ? (
                    <>
                      <IconButton onClick={() => handleUpdate(faculty.id)}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={() => setIsEditing(null)}>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEdit(faculty)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(faculty.id)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </>
                  )}
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No faculties found.</p>
      )}
      <br/>
    </div>

  );
};

export default FacultyTable;
