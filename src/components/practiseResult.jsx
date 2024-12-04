"use client";
import { useSelector, useDispatch } from "react-redux";
import { apiConnector } from "@/services/apiConnector";
import { useEffect } from "react";
import { checkTokenExpiration } from "@/utils/authUtils";
const Results = () => {
  const result = useSelector((state) => state.typingTestResults);
  const practiseTest = useSelector((state) => state.practiseTest);
  console.log(result);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
//   useEffect(() => {
//     const sendResult = async () => {
//       try {
//         // Ensure token is valid
//         await checkTokenExpiration(dispatch, auth);

//         if (!auth?.token) {
//           console.error("Authorization token is missing");
//           return;
//         }

      

//         // API base URL and endpoint
//         const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
//         const url = `${BASE_URL}/practice-test/${practiseTest.id}/result?chapterId=${practiseTest.chapters.id}`;

     
//         const response = await apiConnector(
//           "POST",
//           url,
//           {
//             wpm: result.wpm,
//             accuracy: result.accuracy,
//             raw: result.rawWords,
//             correct: result.totalCorrectChars,
//             incorrect: result.totalIncorrectChars,
//             extras: result.totalExtraChars,
//             missed: result.missedChars,
//             time: result.totalTime,
//             keyPressStats: result.keyStats,
//           }, 
//           {
//             Authorization: `Bearer ${auth.token}`, // Pass token in headers
//           }
//         );

//         if (response.data.success) {
//           console.log("Result sent successfully");
//         } else {
//           console.error(
//             "Failed to send result:",
//             response.data.message || "Unknown error"
//           );
//         }
//       } catch (error) {
//         console.error("Error while sending result:", error);
//       }
//     };

//     // Send result when the dependencies change
//     if (auth?.token && practiseTest?.id && result) {
//       sendResult();
//     }
//   }, [auth, practiseTest.id, dispatch, result]);
  return (
    <div className=" flex flex-col gap-16">
      <div className=" flex justify-between text-6xl text-white">
        <div>
          {result.wpm} <span className=" text-3xl text-[#888888]">WPM</span>
        </div>
        <div>
          {result.accuracy}% <span className=" text-3xl text-[#888888]">Accuracy</span>
        </div>
        <div>
          {result.totalTime}{" "}
          <span className=" text-3xl text-[#888888]">Seconds</span>
        </div>
        <div>
          {result.rawWords}{" "}
          <span className=" text-3xl text-[#888888]">Raw</span>
        </div>
      </div>
      <div className=" text-6xl text-white flex flex-col gap-6">
        <div className="  text-[#888888] text-3xl">Characters</div>
        <div className=" flex justify-between">
          {" "}
          <div>
            {result.totalCorrectChars}{" "}
            <span className=" text-3xl text-[#888888]">Correct</span>
          </div>
          <div>
            {result.totalIncorrectChars}{" "}
            <span className=" text-3xl text-[#888888]">Incorrect</span>
          </div>
          <div>
            {result.totalExtraChars}{" "}
            <span className=" text-3xl text-[#888888]">Extra</span>
          </div>
          <div>
            {result.missedChars}{" "}
            <span className=" text-3xl text-[#888888]">Missed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
