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
          throw new Error('Failed to fetch scorecards');
        }

        const data = await response.json();
        setScorecards(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScorecards();
  }, []);

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{`Error: ${error}`}</Typography>;

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h6">Scorecard List</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Quiz</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Date Attempted</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Subject</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scorecards.map((scorecard) => (
              <TableRow key={scorecard.id}>
                <TableCell>{scorecard.user.username}</TableCell>
                <TableCell>{scorecard.quiz_title}</TableCell>
                <TableCell>{scorecard.score}</TableCell>
                <TableCell>{new Date(scorecard.date_attempted).toLocaleString()}</TableCell>
                <TableCell>{scorecard.name}</TableCell>
                <TableCell>{scorecard.difficulty}</TableCell>
                <TableCell>{scorecard.slug}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ScoreCardList;
