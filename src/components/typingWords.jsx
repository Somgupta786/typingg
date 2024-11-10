// "use client";
// import React, { useState, useEffect } from "react";

// const TypingTest = () => {
//   // Sample text for the typing test
//   const textToType =
//     "ddd lll kkk ddd lll kkk llakalakala aaaa lllll kkkk dddd ffff gggg kkkk";

//   // State to track user input, progress, and WPM
//   const [userInput, setUserInput] = useState("");
//   const [currentCharIndex, setCurrentCharIndex] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [wpm, setWpm] = useState(0);
//   const [startTime, setStartTime] = useState(null);

//   // Function to calculate WPM based on correct words
//   const calculateWPM = (correctChars, timeInMinutes) => {
//     const wordsTyped = Math.floor(correctChars / 5); // Average word length is 5 characters
//     return Math.round(wordsTyped / timeInMinutes);
//   };

//   // Handle key press events
//   const handleKeyPress = (e) => {
//     const { key } = e;

//     // Handle backspace for character deletion
//     if (key === "Backspace") {
//       if (currentCharIndex > 0) {
//         setCurrentCharIndex(currentCharIndex - 1);
//         setUserInput(userInput.slice(0, -1));
//       }
//       return;
//     }

//     // Process character input
//     if (currentCharIndex < textToType.length || key !== "Backspace") {
//       const isCorrect = textToType[currentCharIndex] === key; // Check if the input is correct
//       setCurrentCharIndex(currentCharIndex + 1);
//       setUserInput(userInput + key);

//       // Start timer on first key press
//       if (!startTime) {
//         setStartTime(Date.now());
//       }

//       // Calculate correct characters
//       const correctChars = userInput.split("").filter((char, index) => char === textToType[index] && char !== ' ').length;

//       // Calculate WPM based on elapsed time
//       const timeInMinutes = (Date.now() - startTime) / 60000;
//       if (timeInMinutes > 0) {
//         setWpm(calculateWPM(correctChars, timeInMinutes));
//       }
//     }
    
//     // Calculate progress percentage
//     const progressPercentage = Math.min(
//       ((userInput.length + 1) / textToType.length) * 100,
//       100
//     );
//     setProgress(progressPercentage);
//   };

//   // Function to determine letter class for styling
//   const getCharClass = (char, index) => {
//     if (index < currentCharIndex) {
//       // Letter is already typed
//       return char === userInput[index] 
//         ? "text-white" // Correctly typed
//         : "bg-red-500 text-white"; // Incorrectly typed
//     }
//     if (index === currentCharIndex) {
//       return "text-white border-l-2 border-white"; // Current letter being typed
//     }
//     return "text-gray-500"; // Letter not yet typed
//   };

//   // Add event listener for key presses
//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyPress);
//     return () => {
//       window.removeEventListener("keydown", handleKeyPress);
//     };
//   }, [currentCharIndex, userInput]);

//   // Filter out spaces for letter blocks
//   const letters = textToType.split("").filter((char) => char !== " ");

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-black text-white justify-center mt-10">
//       {/* Progress tracker */}
//       <div className="min-w-[800px] mb-8">
//         <div className="relative h-1 bg-gray-700 rounded-full">
//           <div
//             className="h-1 bg-white rounded-full"
//             style={{ width: `${progress}%` }}
//           ></div>
//           <div
//             className={`absolute left-0 top-[-2px] w-2 h-2 rounded-full ${
//               progress > 0 ? "bg-white" : "bg-gray-500"
//             } transition-all duration-300`}
//             style={{ left: `calc(${progress}% - 0.225rem)` }}
//           ></div>
//           <div
//             className={`absolute left-0 top-[-100px] flex flex-col items-center rounded-full transition-all duration-300`}
//             style={{ left: `calc(${progress}% - 1.125rem)` }}
//           >
//             <div className="text-white">{wpm} WPM</div>
//             <img src="/user.svg" alt="User Icon" />
//             <div>Preet</div>
//           </div>
//           <div
//             className={`absolute right-0 top-[-2px] w-2 h-2 rounded-full ${
//               progress >= 100 ? "bg-white" : "bg-gray-500"
//             } transition-all duration-300`}
//             style={{ left: `calc(100% - 0.25rem)` }}
//           ></div>
//         </div>
//         <div className="flex justify-between text-sm text-gray-400 mt-2">
//           <span>Start</span>
//           <span>End</span>
//         </div>
//       </div>

//       {/* Typing area */}
//       <div className="flex flex-wrap gap-[30px]">
//         {letters.map((char, index) => (
//           <span
//             key={index}
//             className={`flex items-center justify-center w-[80px] h-[80px] bg-black border border-gray-500 rounded-[8px] text-[30px] ${getCharClass(char, index)}`}
//           >
//             {char}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TypingTest;
 "use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const TypingTest = () => {
  // Sample text for the typing test
  

  // State to track user input, progress, and WPM
  const practiseTest = useSelector((state) => state.practiseTest);
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [startTime, setStartTime] = useState(null);
console.log(practiseTest)
const textToType = practiseTest?.chapters?.embedCode || ""; 
  // Function to calculate WPM based on correct characters
  const calculateWPM = (correctChars, timeInMinutes) => {
    const wordsTyped = Math.floor(correctChars / 5);
    return Math.round(wordsTyped / timeInMinutes);
  };

  // Handle key press events
  const handleKeyPress = (e) => {
    const { key } = e;

    // Handle backspace for character deletion
    if (key === "Backspace") {
      if (currentCharIndex > 0) {
        setCurrentCharIndex(currentCharIndex - 1);
        setUserInput(userInput.slice(0, -1));
      }
      return;
    }

    // Process character input
    if (currentCharIndex < textToType.length || key !== "Backspace") {
      setCurrentCharIndex(currentCharIndex + 1);
      setUserInput(userInput + key);
    }

    // Calculate progress percentage
    const progressPercentage = Math.min(
      ((userInput.length + 1) / textToType.length) * 100,
      100
    );
    setProgress(progressPercentage);

    // Count correct characters and update WPM
    const correctChars = userInput.split("").filter((char, index) => char === textToType[index]).length;

    // Start timer on first key press
    if (!startTime) {
      setStartTime(Date.now());
    }

    // Calculate WPM based on elapsed time
    const timeInMinutes = (Date.now() - startTime) / 60000;
    if (timeInMinutes > 0) {
      setWpm(calculateWPM(correctChars, timeInMinutes));
    }
  };

  // Function to determine character class for styling
  const getCharClass = (char, index) => {
    if (index < currentCharIndex) {
      return char === userInput[index] ? "text-white" : "text-red-500";
    }
    if (index === currentCharIndex) {
      return "text-white border-l-2 border-white";
    }
    return "text-gray-500";
  };

  // Add event listener for key presses
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentCharIndex, userInput]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white justify-center mt-10">
      {/* Progress tracker */}
      <div className="min-w-[800px] mb-8">
        <div className="relative h-1 bg-gray-700 rounded-full">
          <div
            className="h-1 bg-white rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
          <div
            className={`absolute left-0 top-[-2px] w-2 h-2 rounded-full ${
              progress > 0 ? "bg-white" : "bg-gray-500"
            } transition-all duration-300`}
            style={{ left: `calc(${progress}% - 0.225rem)` }}
          ></div>
          <div
            className={`absolute left-0 top-[-100px] flex flex-col items-center rounded-full transition-all duration-300`}
            style={{ left: `calc(${progress}% - 1.125rem)` }}
          >
            <div className="text-white">{wpm} WPM</div>
            <img src="/user.svg" alt="User Icon" />
            <div>Preet</div>
          </div>
          <div
            className={`absolute right-0 top-[-2px] w-2 h-2 rounded-full ${
              progress >= 100 ? "bg-white" : "bg-gray-500"
            } transition-all duration-300`}
            style={{ left: `calc(100% - 0.25rem)` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>Start</span>
          <span>End</span>
        </div>
      </div>

      {/* Typing area */}
      <div className="leading-[46.5px] items-baseline justify-left text-[30px] font-normal">
        {textToType.split("").map((char, index) => (
          <span key={index} className={`${getCharClass(char, index)} mr-2`}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TypingTest;