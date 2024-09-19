import React, { useState } from 'react';
import useFetch from '../hooks/voucherFetch'; 


const AddVoucher = () => {
  const [code, setCode] = useState('');
  const [requestUrl, setRequestUrl] = useState('');
  const [requestBody, setRequestBody] = useState(null);
  const { data, isPending, error } = useFetch(requestUrl, 'POST', requestBody);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const confirmAdd = window.confirm('Are you sure you want to add this voucher?');
    if (confirmAdd) {

      setRequestUrl('http://localhost:8000/api/vouchers/');
      setRequestBody({ code });
      window.location.reload();

 
      window.addEventListener('load', () => {
        if (!isPending && !error && data) {
          window.location.reload();
        }
      });
    }
  };

  return (
    <div className="add-voucher-container">
      <h2 className="add-voucher-title">Add Voucher</h2>
      {error && <p className="error">{error}</p>}
      {data && !error && <p className="success">Voucher added successfully!</p>}
      <form onSubmit={handleSubmit} className="add-voucher-form">
        <div className="form-group">
          <label htmlFor="voucherCode">Voucher Code:</label>
          <input
            type="text"
            id="voucherCode"
            value={code}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn" disabled={isPending}>
          {isPending ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default AddVoucher;
