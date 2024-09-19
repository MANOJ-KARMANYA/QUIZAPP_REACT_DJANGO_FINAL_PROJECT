import React, { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ScoreCardList = () => {
  const [scorecards, setScorecards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchScorecards = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user/scorecards/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, 
          },
        });

        if (!response.ok) {

          if (response.status === 403 || response.status === 401) {
   
            navigate('/login'); 
            return;
          }
          throw new Error(`Failed to fetch scorecards: ${response.statusText}`);
        }

        const data = await response.json();
        setScorecards(data);
      } catch (err) {
        console.error(err); 
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScorecards();
  }, [navigate]);

  if (isLoading) return <CircularProgress />; 
  if (error) return <Typography color="error">{`Error: ${error}`}</Typography>; 

  return (
    
    <div className="faculty-table-container">
    
    <h2>Scorecard List</h2>

      <TableContainer>
        <Table className="faculty-table">
          <TableHead>
            <TableRow>
                           
              <TableCell>Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Date Attempted</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {scorecards.map((scorecard) => (
              <TableRow key={scorecard.id}>
                <TableCell>{scorecard.name}</TableCell>
                <TableCell>{scorecard.quiz_title}</TableCell>
                <TableCell>{scorecard.difficulty}</TableCell>
                <TableCell>{scorecard.score} %</TableCell>
                <TableCell>{new Date(scorecard.date_attempted).toLocaleString()}</TableCell>
            
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </TableContainer>

    </div>
  );
};

export default ScoreCardList;
