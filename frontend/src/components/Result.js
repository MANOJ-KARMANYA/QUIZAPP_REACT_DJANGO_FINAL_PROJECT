import React from 'react';
import { Link } from 'react-router-dom';

function Result({ title, color, icon, correctAnswerCount, questionsLength, slug, difficulty }) {

  console.log("Slug value: ", slug);
  console.log("Difficulty value in result: ", difficulty);


  const userResults = {
    title,
    color,
    icon,
    correctAnswerCount,
    questionsLength,
    slug,
    difficulty,
    score: ((correctAnswerCount / questionsLength) * 100).toFixed(2), 
    answers: JSON.parse(localStorage.getItem('quizAnswers')) || {} 
  };
  localStorage.setItem('quizResults', JSON.stringify(userResults));

  return (
    <div className="test-container result-container">
      <div className="home-content">
        <h1 className="home-title">
          <span>Quiz completed</span>
          <span>You scored...</span>
        </h1>
      </div>
      <div className="test-completed">
        <div className="test-completed-body">
          <div className="menu-item header-logo">
            <figure style={{ backgroundColor: color }}>
              <img src={icon} alt={`${title} icon`} />
            </figure>
            <span>{title}</span>
          </div>
          <div className="big-text">{correctAnswerCount}</div>
          <p>out of {questionsLength}</p>
        </div>
        <Link className="btn" to={`/showresult/${slug}?difficulty=${difficulty}`}>
          Show Results
        </Link>
      </div>
    </div>
  );
}

export default Result;
