import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Cancel } from '@mui/icons-material';


function ShowResults() {
  const [searchParams] = useSearchParams();
  const [quiz, setQuiz] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false); 
  const navigate = useNavigate();

 
  const userResults = JSON.parse(localStorage.getItem('quizResults')) || {};
  const userAnswers = JSON.parse(localStorage.getItem('quizAnswers')) || {};
  const { score, correctAnswerCount, questionsLength, difficulty } = userResults;

  const userId = localStorage.getItem('user_id');
  const name = localStorage.getItem('name');
  const selectedQuizId = localStorage.getItem('selectedQuizId');
  const slug = localStorage.getItem('slug');

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(`http://127.0.0.1:8000/api/quizzes/${slug}/`)
        .then(response => response.json())
        .then(data => {
          setQuiz(data);
          setIsPending(false);
        })
        .catch(err => {
          setError(err);
          setIsPending(false);
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);


  const saveScoreCard = () => {
    const scoreCardData = {
      user: userId,
      quiz: selectedQuizId,
      score: score,
      name: name,
      slug: slug,
      difficulty: difficulty,
    };

    fetch('http://127.0.0.1:8000/api/user/scorecards/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(scoreCardData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('ScoreCard saved:', data);
      })
      .catch(error => {
        console.error('Error saving scorecard:', error);
      });
  };


  const handleEndQuiz = () => {
    const confirmEnd = window.confirm("Are you sure you want to end the quiz? This will clear your answers and return to the homepage.");
    if (confirmEnd) {
      saveScoreCard();
      localStorage.removeItem('quizAnswers');
      navigate('/home');
    }
  };


  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode', newDarkMode);
  };

  useEffect(() => {

    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
    document.body.classList.toggle('dark-mode', prefersDarkMode);
  }, []);

  if (isPending) return <h3>Loading...</h3>;
  if (error) return <h3>Error: {error.message}</h3>;
  if (!quiz) return <h3>No quiz data available</h3>;

  const totalQuestions = quiz.questions.length;
  const questionsPerDifficulty = Math.floor(totalQuestions / 3);

  let filteredQuestions = [];
  if (difficulty === 'easy') {
    filteredQuestions = quiz.questions.slice(0, questionsPerDifficulty);
  } else if (difficulty === 'medium') {
    filteredQuestions = quiz.questions.slice(questionsPerDifficulty, questionsPerDifficulty * 2);
  } else if (difficulty === 'hard') {
    filteredQuestions = quiz.questions.slice(questionsPerDifficulty * 2, totalQuestions);
  }

  const incorrectAnswers = questionsLength - correctAnswerCount;

  return (
    <div className="card-container">
      <br/>
      <h2>{quiz.title} - Results</h2>
      <br/>
      <div className="results-summary">
        <h4>Score: {score}%</h4>
        <p>Correct Answers: {correctAnswerCount}</p>
        <p>Incorrect Answers: {incorrectAnswers}</p>
      </div>
      <div className="questions-list">
        {filteredQuestions.map((question, index) => (
          <div key={index} className="question-card">
            <h4>
              Question {index + 1}:&nbsp; {question.question}
            </h4><br/>
            <ul className="options-list">
              {question.options.map((option, i) => {
                const isCorrect = option === question.answer;
                const isSelected = userAnswers[question.question] === option;

                return (
                  <li key={i} className={`option-item ${isSelected ? 'selected' : ''}`}>
                    <span>{option}</span>
                    {isCorrect ? (
                      <CheckCircle className="correct-icon" />
                    ) : isSelected ? (
                      <Cancel className="incorrect-icon" />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="end-quiz-button">
        <button className="btn" onClick={handleEndQuiz}>
          End Quiz
        </button>
      </div>

      
    </div>
  );
}

export default ShowResults;
