import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/voucherFetch'; 
import { Button, TextField, Typography, Paper, CircularProgress, IconButton } from '@mui/material';
import { CheckCircle, Error, Send } from '@mui/icons-material';
import { styled } from '@mui/material/styles';


const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: '30px',
  margin: '20px',
  maxWidth: '500px',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '24px',
  boxShadow: '0px 16px 40px rgba(143, 160, 193, 0.14)',
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: '10px',
}));

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: '24px',
  padding: '12px 20px',
  height: '40px',
  fontSize: '18px',
  fontFamily: theme.typography.fontFamily,
  cursor: 'pointer',
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: 'rgba(167, 41, 245, 0.5)',
  },
  '&:disabled': {
    backgroundColor: theme.palette.grey[600],
    cursor: 'not-allowed',
  },
}));

const EnterVoucher = () => {
  const [voucherCode, setVoucherCode] = useState('');
  const [requestUrl, setRequestUrl] = useState('');
  const [requestBody, setRequestBody] = useState(null);
  const { data, isPending, error } = useFetch(requestUrl, 'POST', requestBody);
  const navigate = useNavigate(); 


  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleChange = (e) => {
    setVoucherCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestUrl('http://localhost:8000/api/vouchers/validate/validate/'); 
    setRequestBody({ code: voucherCode });
  };


  useEffect(() => {
    if (data && !error && data.message === 'Voucher is valid') {
      navigate('/home'); 
    }
  }, [data, error, navigate]);

  return (
    <div>
      <Typography
        variant="h4"
        align="center"
        style={{
          color: 'var(--dark-navy-color)',
          fontFamily: 'var(--main-font-family)',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        Welcome, <strong>{userName}</strong>!
      </Typography>
      <CustomPaper elevation={6}>
        <Typography
          variant="h6"
          gutterBottom
          style={{
            color: 'var(--dark-navy-color)',
            fontFamily: 'var(--main-font-family)',
          }}
        >
          Enter Voucher
        </Typography>
        {error && (
          <CustomTypography color="error" align="center">
            <Error style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            {error}
          </CustomTypography>
        )}
        {data && !error && (
          <CustomTypography color="success" align="center">
            <CheckCircle style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            {data.message}
          </CustomTypography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Voucher Code"
            variant="outlined"
            value={voucherCode}
            onChange={handleChange}
            fullWidth
            required
            style={{ marginBottom: '20px' }}
            InputProps={{
              classes: {
                root: 'textfield-root',
                focused: 'textfield-focused',
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: '16px',
                fontWeight: '500',
                color: 'var(--dark-navy-color)',
                fontFamily: 'var(--main-font-family)',
              },
            }}
          />
          <CustomButton 
            type="submit" 
            variant="contained" 
            disabled={isPending}
            fullWidth
            sx={{
              backgroundColor: '#a729f5', 
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'rgba(167, 41, 245, 0.7)', 
              },
              '&:disabled': {
                backgroundColor: '#626c7f',
                cursor: 'not-allowed',
              },
            }}
          >
            {isPending ? 'Submitting...' : 'Submit'}
          </CustomButton>
        </form>
      </CustomPaper>
    </div>
  );
};

export default EnterVoucher;



