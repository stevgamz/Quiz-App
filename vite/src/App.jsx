import React, { useState, useEffect } from "react";
import Login from "./Login";
import Quiz from "./Quiz";
import Result from "./Result";
import "./App.css";

function App() {
  const QUIZ_TIME = 60; // 5 minutes

  const [username, setUsername] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_TIME);
  const [quizState, setQuizState] = useState("login"); // 'login', 'quiz', 'result'

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("quizState"));
    if (savedState) {
      setUsername(savedState.username);
      setQuestions(savedState.questions);
      setCurrentQuestion(savedState.currentQuestion);
      setScore(savedState.score);
      setTimeRemaining(savedState.timeRemaining);
      setQuizState(savedState.quizState);
    }
  }, []);

  useEffect(() => {
    if (quizState === "quiz") {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setQuizState("result");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizState]);

  useEffect(() => {
    if (username && quizState !== "login") {
      localStorage.setItem(
        "quizState",
        JSON.stringify({
          username,
          questions,
          currentQuestion,
          score,
          timeRemaining,
          quizState,
        })
      );
    }
  }, [username, questions, currentQuestion, score, timeRemaining, quizState]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      const data = await response.json();
      setQuestions(data.results);
      setQuizState("quiz");
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleLogin = (name) => {
    setUsername(name);
    fetchQuestions();
  };

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizState("result");
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeRemaining(QUIZ_TIME);
    setQuizState("login");
    localStorage.removeItem("quizState");
  };

  if (quizState === "login") {
    return <Login onLogin={handleLogin} />;
  }

  if (quizState === "result") {
    return (
      <Result
        score={score}
        totalQuestions={questions.length}
        onRestart={handleRestart}
      />
    );
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Quiz
      question={questions[currentQuestion]}
      currentQuestion={currentQuestion}
      totalQuestions={questions.length}
      onAnswer={handleAnswer}
      timeRemaining={timeRemaining}
    />
  );
}

export default App;
