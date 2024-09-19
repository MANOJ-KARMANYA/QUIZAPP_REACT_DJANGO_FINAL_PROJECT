import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';


const apiUrl = 'http://localhost:8000/api/vouchers/'; 

const VoucherList = () => {
  const [vouchers, setVouchers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ code: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No accessToken found');
      setError('No accessToken found. Please log in.');
      return;
    }

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('Fetched vouchers:', response.data);
      setVouchers(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching vouchers:', error.response ? error.response.data : error.message);
      setError('Error fetching vouchers. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No accessToken found');
      setError('No accessToken found. Please log in.');
      return;
    }

    try {
      await axios.delete(`${apiUrl}${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchVouchers();
    } catch (error) {
      console.error('Error deleting voucher:', error.response ? error.response.data : error.message);
      setError('Error deleting voucher. Please try again.');
    }
  };

  const handleEdit = (voucher) => {
    setEditing(voucher);
    setFormData({ code: voucher.code });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No accessToken found');
      setError('No accessToken found. Please log in.');
      return;
    }

    try {
      if (editing) {
        await axios.put(`${apiUrl}${editing.id}/`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else {
        await axios.post(apiUrl, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
      setEditing(null);
      setFormData({ code: '' });
      fetchVouchers();
    } catch (error) {
      console.error('Error saving voucher:', error.response ? error.response.data : error.message);
      setError('Error saving voucher. Please try again.');
    }
  };

  return (
    <div className="voucher-table-container">
      <br />
      <h2>Voucher Code</h2>
      <br />
      <center>
      {error && <p className="error">{error}</p>}
      <table className="faculty-table">
        <thead>
          <tr>
            <th className="faculty-table-header">Code</th>
            <th className="faculty-table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.length > 0 ? (
            vouchers.map((voucher) => (
              <tr key={voucher.id}>
                <td className="faculty-table-cell">{voucher.code}</td>
                <td className="faculty-table-cell">
                  {editing && editing.id === voucher.id ? (
                    <>
                      <IconButton onClick={handleSave}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={() => setEditing(null)}>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEdit(voucher)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(voucher.id)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="voucher-table-cell">No vouchers found</td>
            </tr>
          )}
        </tbody>
      </table>
      </center>
      <div className="voucher-form-container">
        {editing && (
          <div className="voucher-form">
            <h3 className="voucher-form-title">Edit Voucher</h3>
            <label htmlFor="formCode" className="form-label">Code</label>
            <input
              id="formCode"
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter voucher code"
              className="form-control"
            />
            <button 
              onClick={handleSave}
              className="btn save-btn"
            >
              {editing ? 'Update' : 'Add'} Voucher
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoucherList;
