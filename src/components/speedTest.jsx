"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  setTypedWpm,
  setAccuracy,
  setTotalTime,
  setTypedTotalCorrectChars,
  setTypedTotalIncorrectChars,
  setTypedTotalExtraChars,
  setTypedMissedChars,
  setTypedRawChars,
  setKeyStats,
} from "@/features/result/resultSlice";
import { useDispatch } from "react-redux";

const SpeedTest = (props) => {
  const [userInput, setUserInput] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null); // Store the end time when the test finishes
  const [timer, setTimer] = useState(props.time); // Timer value in seconds
  const [totalCorrectChars, setTotalCorrectChars] = useState(0);
  const [totalIncorrectChars, setTotalIncorrectChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [charMistakes, setCharMistakes] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isStarted, setIsStarted] = useState(false);
  

  const textToType =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making letters, as opposed to using 'Content here.";

  // Calculate metrics and navigate to results page
  const calculateResults = () => {
    const timeInMinutes = (props.time - timer) / 60;
    const wordsTyped = Math.floor(totalCorrectChars / 5);
    const accuracy =
      totalCorrectChars /
      (totalCorrectChars + totalIncorrectChars + extraChars);
    const results = {
      wpm: Math.round(wordsTyped / timeInMinutes) || 0,
      accuracy: (accuracy * 100).toFixed(2),
      totalTime: timer,
      totalRawWordsTyped: Math.floor(userInput.length / 5),
      totalCorrectChars,
      totalIncorrectChars,
      totalExtraChars: extraChars,
      missedChars,
    };

    // Dispatch the results to Redux store

    dispatch(setTypedWpm(results.wpm));
    dispatch(setAccuracy(results.accuracy));
    dispatch(setTotalTime(results.totalTime));
    dispatch(setTypedTotalCorrectChars(results.totalCorrectChars));
    dispatch(setTypedTotalIncorrectChars(results.totalIncorrectChars));
    dispatch(setTypedMissedChars(results.missedChars));
    dispatch(setTypedRawChars(results.totalRawWordsTyped));
    dispatch(setTypedTotalExtraChars(results.totalExtraChars));
    dispatch(setKeyStats(charMistakes));
    router.push("/trial/results");
  };

  // Handle key press events
  const handleKeyPress = (e) => {
    const { key } = e;
    console.log(props);

    const wordsTyped = Math.floor(totalCorrectChars / 5);
    const timeInMinutes = timer / 60;
    setWpm(Math.round(wordsTyped / timeInMinutes) || 0);

    if (!startTime) {
      setStartTime(Date.now());
    }

    // Handle backspace
    if (key === "Backspace") {
      if (currentCharIndex > 0) {
        setCurrentCharIndex(currentCharIndex - 1);
        setUserInput(userInput.slice(0, -1));
      }
      return;
    }

    // If key is pressed after completing the text, ignore
    if (currentCharIndex >= textToType.length) {
      setExtraChars(extraChars + 1);
      return;
    }

    // Process key input
    setUserInput(userInput + key);

    if (key === textToType[currentCharIndex]) {
      setTotalCorrectChars(totalCorrectChars + 1);
    } else {
      setTotalIncorrectChars(totalIncorrectChars + 1);
      if (currentCharIndex < textToType.length) {
        setMissedChars(missedChars + 1); // Add missed char to missedChars
        // Update mistake count for this character
        const char = textToType[currentCharIndex].toLowerCase();
        if (/^[a-zA-Z]$/.test(char)) {
          setCharMistakes((prevMistakes) => {
            const existingMistake = prevMistakes.find(
              (mistake) => mistake.key === char
            );
            if (existingMistake) {
              // Update difficulty score
              return prevMistakes.map((mistake) =>
                mistake.key === char
                  ? {
                      ...mistake,
                      difficultyScore: mistake.difficultyScore + 1,
                    }
                  : mistake
              );
            } else {
              // Add new mistake record
              return [...prevMistakes, { key: char, difficultyScore: 1 }];
            }
          });
        }
      }
    }

    setCurrentCharIndex(currentCharIndex + 1);

    const progressPercentage = Math.min(
      ((currentCharIndex + 1) / textToType.length) * 100,
      100
    );
    setProgress(progressPercentage);

    // Check if test is complete
    if (currentCharIndex + 1 === textToType.length) {
      setEndTime(Date.now());
      calculateResults();
    }
  };

 

  // Key press listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentCharIndex, userInput]);
  useEffect(() => {
    if(props.started){
        if (timer > 0) {
            const interval = setInterval(() => {
              setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
          } else {
            calculateResults();
          }
    }
   
  }, [timer]);

  return (
    <div className="flex flex-col items-center gap-16 bg-black text-white">
      {/* Progress tracker */}
      <div  className={` ${!props.started ? "min-w-[800px] pt-[100px] min-h-[106px] " : "min-w-[800px] pt-[200px] min-h-[106px] "}`}>
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
            <div className="text-white whitespace-nowrap">{wpm} WPM</div>
            <img src="/user.svg" alt="User Icon" />
            <div>You</div>
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

      <div className="leading-[46.5px] items-baseline text-[30px] font-normal self-start">
        {textToType.split("").map((char, index) => (
          <span
            key={index}
            className={`mr-2 ${
              index < currentCharIndex
                ? char === userInput[index]
                  ? "text-white"
                  : "text-red-500"
                : index === currentCharIndex
                ? "text-white border-l-2 border-white"
                : "text-[#888888]"
            }`}
          >
            {char}
          </span>
        ))}
      </div>
      <div className={` ${!props.started ? "hidden" : ""}`}>
        <div className=" self-center text-[#D5E94E] text-[15px]">
          {timer}
        </div>
      </div>

      {/* <div className="self-start mt-[200px] ">
        <div className="text-xl min-w-[277px] flex flex-col p-6 bg-[#1A1A1A] rounded-xl text-white gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>Keyboard</div>
              <div
                className={`w-12 h-6 flex items-center ${
                  isKeyboardOn ? "bg-[#D5E94E]" : "bg-gray-200"
                } rounded-full p-1 cursor-pointer`}
                onClick={() => setIsKeyboardOn(!isKeyboardOn)}
              >
                <div
                  className={`h-5 w-5 rounded-full shadow-md transform duration-300 ${
                    isKeyboardOn
                      ? "translate-x-6 bg-black"
                      : "translate-x-0 bg-black"
                  }`}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>Hands</div>
              <div
                className={`w-12 h-6 flex items-center ${
                  isHandsOn ? "bg-[#D5E94E]" : "bg-gray-200"
                } rounded-full p-1 cursor-pointer`}
                onClick={() => setIsHandsOn(!isHandsOn)}
              >
                <div
                  className={`h-5 w-5 rounded-full shadow-md transform duration-300 ${
                    isHandsOn
                      ? "translate-x-6 bg-black"
                      : "translate-x-0 bg-black"
                  }`}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>Sound effect</div>
              <div
                className={`w-12 h-6 flex items-center ${
                  isSoundEffectOn ? "bg-[#D5E94E]" : "bg-gray-200"
                } rounded-full p-1 cursor-pointer`}
                onClick={() => setIsSoundEffectOn(!isSoundEffectOn)}
              >
                <div
                  className={`h-5 w-5 rounded-full shadow-md transform duration-300 ${
                    isSoundEffectOn
                      ? "translate-x-6 bg-black"
                      : "translate-x-0 bg-black"
                  }`}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>Time taken</div>
              <div className="flex items-center justify-center text-[#D5E94E]">
                <span className="font-medium">{timer}</span>
              </div>
            </div>
          </div>
          <div className=" flex items-center gap-2 text-sm text-[#B0B0B0]">
            <div className=" flex items-center gap-[2px]">
              <div className="  p-2 rounded-lg border border-[#4F4F4F]">
                Shift &nbsp;
                <img className=" inline-block" src="/up.svg" />
              </div>
              <div>+</div>
              <div className="  p-2 rounded-lg border border-[#4F4F4F]">
                Space
              </div>
            </div>
            <div>: &nbsp;Restart</div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SpeedTest;
