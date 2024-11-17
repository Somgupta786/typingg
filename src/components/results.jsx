"use client"
import { useSelector, useDispatch } from "react-redux";
import { apiConnector } from "@/services/apiConnector";
import { useEffect } from "react";
import { checkTokenExpiration } from "@/utils/authUtils";
const Results = () => {
    const result = useSelector((state) => state.typingTestResults);
    const practiseTest = useSelector((state) => state.practiseTest);
    console.log(result)
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        const sendResult = async () => {
          
    
          try {
            await checkTokenExpiration(dispatch, auth);
    
            if (!auth?.token) {
              console.error("Authorization token is missing");
            
              return;
            }
    
            const response = await apiConnector(
              "POST",
              `/practice-test/${practiseTest.chapters.id}/result`,
              {
                wpm: result.wpm,
                accuracy: result.accuracy,
                raw: result.setRawWords,
                correct: result.totalCorrectChars,
                incorrect: result.totalIncorrectChars,
                extras: result.totalExtraChars,
                missed: result.missedChars,
                time: result.totalTime,
                keyPressStats: result.keyStats,
              },
              {
                Authorization: `Bearer ${auth.token}`, // Add token to the headers
              }
            );
    
            if (response.data.success) {
              
             console.log("Successfully")
            }
          } catch (error) {
            console.error("Error fetching chapters:", error);
          } finally {
            
          }
        };
    
        sendResult();
      }, [auth, practiseTest.id, dispatch]); // Make sure dependencies are correct
  return (
    <div className=" flex flex-col gap-16">
      <div className=" flex justify-between text-6xl text-white">
        <div>
          {result.wpm} <span className=" text-3xl text-[#888888]">WPM</span>
        </div>
        <div>
          {result.accuracy} <span className=" text-3xl text-[#888888]">%</span>
        </div>
        <div>
          {result.totalTime} <span className=" text-3xl text-[#888888]">Seconds</span>
        </div>
        <div>
          {result.setRawWords} <span className=" text-3xl text-[#888888]">Raw</span>
        </div>
      </div>
      <div className=" text-6xl text-white flex flex-col gap-6">
        <div className="  text-[#888888] text-3xl">Characters</div>
        <div className=" flex justify-between">
          {" "}
          <div>
            {result.totalCorrectChars} <span className=" text-3xl text-[#888888]">Correct</span>
          </div>
          <div>
          {result.totalIncorrectChars}  <span className=" text-3xl text-[#888888]">Incorrect</span>
          </div>
          <div>
          {result.totalExtraChars} <span className=" text-3xl text-[#888888]">Extra</span>
          </div>
          <div>
            {result.missedChars} <span className=" text-3xl text-[#888888]">Missed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
