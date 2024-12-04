"use client";
import React from "react";
import { useState, useEffect } from "react";
import AppleKeyboard from "./appleKeyboard";

const Keyboard = () => {
  const [clickedKeys, setClickedKeys] = useState([]); // Store clicked keys
  const [timer, setTimer] = useState(0); // Timer in seconds
  const [startTime, setStartTime] = useState(0); // Timer start time
  const [typedChars, setTypedChars] = useState(0); // Count of typed characters
  const [wpm, setWpm] = useState("00"); // Words per minute
  const [intervalId, setIntervalId] = useState(null); // Interval ID for timer

  // Handle key press events
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      setTypedChars((prev) => prev + 1);
      // Avoid counting the same key press more than once
      if (!clickedKeys.includes(key)) {
        console.log(key);
        setClickedKeys((prev) => [...prev, key]);
        // Increment typed characters
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [clickedKeys]);

  // Start timer when the first key is pressed
  useEffect(() => {
    if (clickedKeys.length === 1) {
      console.log("sdre");

      const id = setInterval(() => {
        setTimer((prev) => prev + 1); // Update the timer every second
      }, 1000);
      setIntervalId(id);
    }
  }, [clickedKeys, typedChars]);

  // Calculate WPM based on the timer and typed characters
  useEffect(() => {
    console.log("frgert");
    if (timer > 0) {
      const wordsTyped = clickedKeys.length / 1; // Assume 5 characters per word
      console.log(Math.floor((wordsTyped / timer) * 60));
      setWpm(Math.floor((wordsTyped / timer) * 60)); // WPM formula
    }
  }, [timer, typedChars]);


  return (
    <div className=" flex gap-6 justify-between">
      <AppleKeyboard clickedKeys={clickedKeys}/>
      <div className="flex flex-col gap-6">
        <div className="max-w-[181px] h-[182px] justify-between whitespace-normal flex flex-col p-[14px] gap-3 text-sm text-[#B0B0B0] border border-[#4F4F4F] rounded-xl">
          <div>Your real time testing speed</div>
          {/* Display WPM and Timer */}
          <div className="text-3xl text-white whitespace-nowrap">
            {wpm} <span className="text-xl text-[#888888]">wpm</span>
          </div>
          <div className="text-3xl text-white whitespace-nowrap">
            {timer} <span className="text-xl text-[#888888]">Seconds</span>
          </div>
        </div>
        <div>
          <img src="colourKey.svg" />
        </div>
      </div>
      <div>
        <img src="keyColor.svg" />
      </div>
    </div>
  );
};

export default Keyboard;
