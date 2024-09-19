import { useParams, useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import Test from "../components/Test";

function Quiz() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const difficulty = searchParams.get("difficulty");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [url, setUrl] = useState(null);
  const { data: quiz, isPending, error } = useFetch(url);

  useEffect(() => {
    if (slug) {
    
      setUrl(`http://127.0.0.1:8000/api/quizzes/${slug}/`);
    }
  }, [slug]);

  useEffect(() => {
  
    if (quiz && quiz.questions) {
      const totalQuestions = quiz.questions.length;
      const questionsPerDifficulty = Math.floor(totalQuestions / 3); 

      let filtered = [];

      if (difficulty === "easy") {
        filtered = quiz.questions.slice(0, questionsPerDifficulty); 
      } else if (difficulty === "medium") {
        filtered = quiz.questions.slice(questionsPerDifficulty, questionsPerDifficulty * 2); 
      } else if (difficulty === "hard") {
        filtered = quiz.questions.slice(questionsPerDifficulty * 2, totalQuestions); 
      }

      setFilteredQuestions(filtered);
    }
  }, [quiz, difficulty]);

  useEffect(() => {
    if (slug) {
      document.title = "Quiz - " + slug;
      localStorage.setItem('slug', slug);
    }
  }, [slug]);

  if (!slug) {
    return <h3>Quiz slug is missing.</h3>;
  }

  return (
    <div className="quiz-container container">
      {isPending && <h3>Loading...</h3>}
      {error && <h3>Something went wrong</h3>}
      {quiz ? (
        <Test
          questions={filteredQuestions}
          title={quiz.title}
          color={quiz.color}
          icon={quiz.icon}
          slug={quiz.slug}
          difficulty={difficulty}
        />
      ) : (
        !isPending && !error && <h3>No quiz data available.</h3>
      )}
    </div>
  );
}

export default Quiz;
