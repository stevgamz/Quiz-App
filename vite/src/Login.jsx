import React, { useState } from "react";
import "./App.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-400 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-400">
          QUIZ
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-300"
          >
            Start Quiz
          </button>
        </form>
        <p className="text-xs text-center text-gray-500 mt-4">
          By continuing, you agree to the Terms and Conditions
        </p>
      </div>
    </div>
  );
};

export default Login;
