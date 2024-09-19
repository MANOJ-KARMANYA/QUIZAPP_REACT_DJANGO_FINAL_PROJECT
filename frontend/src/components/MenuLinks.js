import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";

function MenuLinks() {
  const [url, setUrl] = useState(null);
  const [difficulty, setDifficulty] = useState(''); 
  const { data: quizzes, isPending, error } = useFetch(url);
  const navigate = useNavigate();  

  useEffect(() => {

    const baseUrl = "http://127.0.0.1:8000/api/quizzes/";
    const urlWithDifficulty = difficulty ? `${baseUrl}?difficulty=${difficulty}` : baseUrl;

    const timer = setTimeout(() => {
      setUrl(urlWithDifficulty);
    }, 500);

    return () => clearTimeout(timer);
  }, [difficulty]); 
  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleQuizClick = (quizId) => {

    localStorage.setItem('selectedQuizId', quizId);
  };


  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setUserName(name);
    }
  }, []);
  

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.clear(); 
      navigate('/');
    }
  };

  return (
    <section className="home-container container">
      <div className="home-content">
        <h1 className="home-title">
          <span> Hi <b>{userName}, </b> <br/>Welcome to the</span>
          <span>Quiz! </span>
          <div>
     
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </h1>

      
        <div className="difficulty-card">
          <div className="difficulty-filter">
            <label>
              <input
                type="radio"
                name="difficulty"
                value="easy"
                checked={difficulty === 'easy'}
                onChange={handleDifficultyChange}
              />
              <span>Easy</span>
            </label>
            <label>
              <input
                type="radio"
                name="difficulty"
                value="medium"
                checked={difficulty === 'medium'}
                onChange={handleDifficultyChange}
              />
              <span>Medium</span>
            </label>
            <label>
              <input
                type="radio"
                name="difficulty"
                value="hard"
                checked={difficulty === 'hard'}
                onChange={handleDifficultyChange}
              />
              <span>Hard</span>
            </label>
          </div>
        </div>
      </div>

      <div className="home-nav-list">
        {isPending && <p>Loading...</p>}
        
        {error && <p>Error: {error.message}</p>}

        <div className="menu-list">
          <p><i>Pick a subject to get started.</i></p>
          {quizzes &&
            quizzes.map((item) => (
              <Link
                key={item.slug} 
                to={`/quiz/${item.slug}?difficulty=${difficulty}`} 
                className="menu-item header-logo"
                onClick={() => handleQuizClick(item.id)} 
              >
                <figure style={{ backgroundColor: item.color }}>
                  <img src={item.icon} alt={item.title} />
                </figure>
                <span>{item.title}</span>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

export default MenuLinks;
