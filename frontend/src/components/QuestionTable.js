import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useFetch } from '../hooks/useFetch'; 
const QuizQuestionTable = () => {
  const [editingQuizSlug, setEditingQuizSlug] = useState(null);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState(''); 
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedOptions, setEditedOptions] = useState(['', '', '', '']);
  const [editedAnswer, setEditedAnswer] = useState(''); 
  const [error, setError] = useState('');
  const [url, setUrl] = useState('http://localhost:8000/api/quizzes/'); 

  const { data: quizzes = [], isPending, error: fetchError } = useFetch(url);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUrl('http://localhost:8000/api/quizzes/');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (fetchError) {
      
    } else {
      setError('');
    }
  }, [fetchError]);

  const handleDeleteQuestion = async (quizSlug, questionIndex) => {
    try {
      const quiz = quizzes.find(quiz => quiz.slug === quizSlug);
      if (quiz) {
        quiz.questions.splice(questionIndex, 1); 
        await axios.put(`http://localhost:8000/api/quizzes/${quizSlug}/`, quiz);
        setUrl(url); 
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      setError('Failed to delete the question. Please try again.');
    }
  };

  const handleEdit = (quizSlug, quizTitle, questionIndex, currentQuestion, currentOptions, currentAnswer) => {
    setEditingQuizSlug(quizSlug);
    setEditingQuestionIndex(questionIndex);
    setEditedTitle(quizTitle); 
    setEditedQuestion(currentQuestion);
    setEditedOptions(currentOptions);
    setEditedAnswer(currentAnswer); 
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...editedOptions];
    updatedOptions[index] = value;
    setEditedOptions(updatedOptions);
  };

  const handleSaveEdit = async (quizSlug, questionIndex) => {
    try {
      const quiz = quizzes.find(quiz => quiz.slug === quizSlug);
      if (quiz) {
        quiz.title = editedTitle; 
        quiz.questions[questionIndex].question = editedQuestion; 
        quiz.questions[questionIndex].options = editedOptions;
        quiz.questions[questionIndex].answer = editedAnswer; 

        await axios.put(`http://localhost:8000/api/quizzes/${quizSlug}/`, quiz);
        setUrl(url); 
        setEditingQuizSlug(null);
        setEditingQuestionIndex(null);
      }
    } catch (error) {
      console.error('Error updating question:', error);
      setError(`Failed to update the question. Error: ${error.response?.data?.detail || error.message}`);
    }
  };

  if (isPending) return <p>Loading...</p>;

  return (
    <div className="quiz-question-table-container" style={{
      fontFamily: 'Rubik, Arial, Helvetica, sans-serif',
      padding: '20px',
      backgroundColor: 'var(--prue-white-color)',
      color: 'var(--dark-navy-color)',
      borderRadius: '24px',
      overflow: 'hidden'
    }}>
      <br />
      <h2 style={{ fontSize: '36px', fontWeight: 500 }}>&nbsp;&nbsp;Manage Quiz Questions</h2><br /><br />
      {error && <p style={{ color: 'var(--red-color)', fontSize: '14px' }}>{error}</p>}
      <TableContainer component={Paper} style={{
        backgroundColor: 'var(--prue-white-color)',
        borderRadius: '24px',
        boxShadow: '0px 16px 40px rgba(143, 160, 193, 0.14)',
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Quiz Title</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Question</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Option 1</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Option 2</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Option 3</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Option 4</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Answer</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzes && quizzes.length > 0 ? (
              quizzes.map((quiz, quizIndex) => (
                quiz.questions.map((question, questionIndex) => (
                  <TableRow key={`${quiz.slug}-${questionIndex}`}>
                    <TableCell>
                      {editingQuizSlug === quiz.slug ? (
                        <TextField
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                        />
                      ) : (
                        quiz.title
                      )}
                    </TableCell>
                    <TableCell>
                      {editingQuizSlug === quiz.slug && editingQuestionIndex === questionIndex ? (
                        <TextField
                          value={editedQuestion}
                          onChange={(e) => setEditedQuestion(e.target.value)}
                        />
                      ) : (
                        question.question
                      )}
                    </TableCell>
                    {question.options.map((option, optionIndex) => (
                      <TableCell key={optionIndex}>
                        {editingQuizSlug === quiz.slug && editingQuestionIndex === questionIndex ? (
                          <TextField
                            value={editedOptions[optionIndex]}
                            onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                          />
                        ) : (
                          option
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      {editingQuizSlug === quiz.slug && editingQuestionIndex === questionIndex ? (
                        <TextField
                          value={editedAnswer}
                          onChange={(e) => setEditedAnswer(e.target.value)}
                        />
                      ) : (
                        question.answer
                      )}
                    </TableCell>
                    <TableCell>
                      {editingQuizSlug === quiz.slug && editingQuestionIndex === questionIndex ? (
                        <div>
                          <Button
                            onClick={() => handleSaveEdit(quiz.slug, questionIndex)}
                            variant="contained"
                            color="primary"
                            style={{ marginRight: '8px' }}
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => {
                              setEditingQuizSlug(null);
                              setEditingQuestionIndex(null);
                            }}
                            variant="outlined"
                            color="secondary"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <IconButton
                            onClick={() => handleEdit(quiz.slug, quiz.title, questionIndex, question.question, question.options, question.answer)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteQuestion(quiz.slug, questionIndex)}
                            color="secondary"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} style={{ textAlign: 'center' }}>
                  No quizzes available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default QuizQuestionTable;

