import React, { useState, useEffect } from "react";
import "./App.css";

const Quiz = ({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
  timeRemaining,
}) => {
  const answers = [...question.incorrect_answers, question.correct_answer];

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    // Reset state ketika soal baru dimuat
    setSelectedAnswer(null);
    setIsSubmitted(false);
  }, [question]); // Memantau perubahan pada 'question'

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-400 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          Question {currentQuestion + 1} of {totalQuestions}
        </h2>
        <p className="mb-4">
          Time remaining: {Math.floor(timeRemaining / 60)}:
          {(timeRemaining % 60).toString().padStart(2, "0")}
        </p>
        <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 mb-6">
          <p
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: question.question }}
          ></p>
        </div>
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleSelectAnswer(answer)}
            className={`w-full py-2 px-4 rounded-md mb-4 text-left ${
              selectedAnswer === answer ? "bg-blue-300" : "bg-gray-200"
            } text-gray-700 hover:bg-gray-300 transition duration-300`}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
        <button
          onClick={handleSubmit}
          className="w-full py-2 px-4 rounded-md bg-green-500 text-white hover:bg-green-600 transition duration-300"
          disabled={!selectedAnswer}
        >
          Submit
        </button>
        {isSubmitted && (
          <p className="text-green-600 mt-4">Answer submitted!</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
