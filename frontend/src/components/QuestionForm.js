import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFetch } from '../hooks/useFetch';

const AddQuestions = () => {
  const [formData, setFormData] = useState({
    title: '',
    question: '',
    options: ['', '', '', ''],
    answer: '',
  });

  const [error, setError] = useState(''); 
  const [url, setUrl] = useState(null);
  const { data: quizzes, isPending, error: fetchError } = useFetch(url); 
  useEffect(() => {
    const timer = setTimeout(() => {
      setUrl('http://127.0.0.1:8000/api/quizzes/');
    }, 500);
    return () => clearTimeout(timer); 
  }, []);

 
  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log('Field name:', name, 'Field value:', value);

    if (name.startsWith('option')) {
      const index = parseInt(name.split('-')[1], 10);
      const newOptions = [...formData.options];
      newOptions[index] = value;
      setFormData((prevState) => ({
        ...prevState,
        options: newOptions,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

   
    const confirmed = window.confirm('Are you sure you want to add this new question?');
    window.alert('Question added succesfully');
    if (!confirmed) return; 

    const requestData = {
      question: formData.question,
      options: formData.options,
      answer: formData.answer,
    };

    console.log('Form Data:', formData); 

    const selectedQuizSlug = formData.title;
    console.log('Selected Quiz Slug:', selectedQuizSlug); 

    if (!selectedQuizSlug) {
      setError('Please select a quiz.');
      return;
    }

    try {
      await axios.post(`http://127.0.0.1:8000/api/quizzes/${selectedQuizSlug}/add-question/`, requestData);
      resetForm();
      window.location.reload(); 
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit the question. Please try again.');
    }
  };


  const resetForm = () => {
    setFormData({
      title: '',
      question: '',
      options: ['', '', '', ''],
      answer: '',
    });
  };

  return (
    <div className="add-questions-container">
      <h2 className="add-questions-title">Add New Question</h2>
      <form onSubmit={handleSubmit} className="add-questions-form">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="title">Quiz Title</label>
          <select
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select a quiz</option>
            {isPending && <option>Loading quizzes...</option>}
            {fetchError && <option>Error loading quizzes</option>}
            {quizzes && quizzes.map((quiz) => (
              <option key={quiz.slug} value={quiz.slug}>
                {quiz.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="form-control"
            rows="4"
            placeholder="Enter your question here..."
          ></textarea>
        </div>
        <div className="form-group">
          <label>Options</label>
          {formData.options.map((option, index) => (
            <input
              key={index}
              type="text"
              name={`option-${index}`}
              value={option}
              onChange={handleChange}
              className="form-control"
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="answer">Correct Answer</label>
          <input
            id="answer"
            name="answer"
            type="text"
            value={formData.answer}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter the correct answer here..."
          />
        </div>
        <button type="submit" className="btn">
          Submit Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestions;
