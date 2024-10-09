import React from "react";
import "./App.css";

const Result = ({ score, totalQuestions, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-400 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-xl mb-2">Correct Answers: {score}</p>
        <p className="text-xl mb-2">
          Incorrect Answers: {totalQuestions - score}
        </p>
        <p className="text-xl mb-4">Total Questions: {totalQuestions}</p>
        <button
          onClick={onRestart}
          className="bg-green-400 text-white py-2 px-4 rounded-md hover:bg-green-500 transition duration-300"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;
