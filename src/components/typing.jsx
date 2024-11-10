"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const TypingTest = () => {
  const practiseTest = useSelector((state) => state.practiseTest);
  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const textToType = practiseTest?.chapters?.embedCode || ""; 

  // Function to calculate WPM
  const calculateWPM = (correctChars, timeInMinutes) => {
    const wordsTyped = Math.floor(correctChars / 5); // Average word length is 5 characters
    return Math.round(wordsTyped / timeInMinutes);
  };

  // Handle key press events
  const handleKeyPress = (e) => {
    const { key } = e;

    // Handle backspace
    if (key === "Backspace") {
      if (currentCharIndex > 0) {
        setCurrentCharIndex(currentCharIndex - 1);
        setUserInput(userInput.slice(0, -1));
      }
      return;
    }

    // Handle regular key press
    if (currentCharIndex < textToType.length || key !== "Backspace") {
      const isCorrect = textToType[currentCharIndex] === key; // Check if the key is correct
      setCurrentCharIndex(currentCharIndex + 1);
      setUserInput(userInput + key);

      if (!startTime) {
        setStartTime(Date.now()); // Start the timer on the first key press
      }

      // Calculate correct characters
      const correctChars = userInput.split("").filter((char, index) => char === textToType[index] && char !== " ").length;

      // Calculate WPM based on time and correct characters
      const timeInMinutes = (Date.now() - startTime) / 60000;
      if (timeInMinutes > 0) {
        setWpm(calculateWPM(correctChars, timeInMinutes));
      }

      // Update progress bar based on the current character index
      const progressPercentage = Math.min(((currentCharIndex + 1) / textToType.length) * 100, 100);
      setProgress(progressPercentage);
    }
  };

  const getCharClass = (char, index) => {
    if (index < currentCharIndex) {
      return char === userInput[index] ? "text-white" : "bg-red-500 text-white";
    }
    if (index === currentCharIndex) {
      return "text-white border-l-2 border-white"; // Currently typed character
    }
    return "text-gray-500"; // Not typed yet
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentCharIndex, userInput]);

  const letters = textToType.split("").filter((char) => char !== " "); // Filter out spaces for rendering

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white justify-center mt-10">
      {/* Progress tracker */}
      <div className="min-w-[800px] mb-8">
        <div className="relative h-1 bg-gray-700 rounded-full">
          <div
            className="h-1 bg-white rounded-full"
            style={{ width: `${progress}%` }} // Progress based on current index
          ></div>
          <div
            className={`absolute left-0 top-[-2px] w-2 h-2 rounded-full ${progress > 0 ? "bg-white" : "bg-gray-500"}`}
            style={{ left: `calc(${progress}% - 0.225rem)` }}
          ></div>
          <div
            className={`absolute left-0 top-[-100px] flex flex-col items-center rounded-full`}
            style={{ left: `calc(${progress}% - 1.125rem)` }}
          >
            <div className="text-white">{wpm} WPM</div>
            <img src="/user.svg" alt="User Icon" />
            <div>Preet</div>
          </div>
          <div
            className={`absolute right-0 top-[-2px] w-2 h-2 rounded-full ${progress >= 100 ? "bg-white" : "bg-gray-500"}`}
            style={{ left: `calc(100% - 0.25rem)` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>Start</span>
          <span>End</span>
        </div>
      </div>

      {/* Typing area */}
      <div className="flex flex-wrap gap-[30px]">
        {letters.map((char, index) => (
          <span
            key={index}
            className={`flex items-center justify-center w-[80px] h-[80px] bg-black border border-gray-500 rounded-[8px] text-[30px] ${getCharClass(char, index)}`}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TypingTest;
