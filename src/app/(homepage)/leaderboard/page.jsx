"use client";
import Navbar from "@/components/navbar";
import { useState } from "react";

// Sample data (replace this with your actual data source)
const data = [
  {
    name: "Apurva Krishna Singh",
    rank: 1,
    wpm: 5034,
    accuracy: 4382,
    time: 233,
  },
  { name: "hrshxp", rank: 2, wpm: 4024, accuracy: 2321, time: 1090 },
  { name: "lakshayyyy (You)", rank: 3, wpm: 2232, accuracy: 997, time: 1090 },
  { name: "tejashhh", rank: 4, wpm: 1590, accuracy: 980, time: 1213 },
  {
    name: "guarav_euclid_steller",
    rank: 5,
    wpm: 1290,
    accuracy: 900,
    time: 234,
  },
  { name: "kartikk", rank: 6, wpm: 1212, accuracy: 894, time: 2345 },
  { name: "hemuth", rank: 7, wpm: 1111, accuracy: 864, time: 2345 },
  { name: "amn", rank: 8, wpm: 1086, accuracy: 756, time: 2457 },
];
const Page = () => {
  const [frequency, setFrequency] = useState("Daily");
  const [dates, setDates] = useState(["June 12", "June 13", "June 14"]);

  // Handle frequency change and update dates accordingly
  const handleFrequencyChange = (e) => {
    const selectedFrequency = e.target.value;
    setFrequency(selectedFrequency);

    // Populate date options based on frequency
    if (selectedFrequency === "Daily") {
      setDates(["June 12", "June 13", "June 14"]); // example daily dates
    } else if (selectedFrequency === "Weekly") {
      setDates(["Week 1", "Week 2", "Week 3"]); // example weekly dates
    } else if (selectedFrequency === "Monthly") {
      setDates(["June", "July", "August"]); // example monthly dates
    }
  };

  return (
    <div className=" flex flex-col  w-11/12  h-screen   mx-auto bg-black text-[#F6F6F6]">
      <Navbar />
      <div>
        <div className=" flex justify-between text-2xl text-white">
          <div>
            Here are <span className=" text-[#D5E94E]">today's</span> top
            players:
          </div>
          <div className=" flex gap-4 text-sm">
            <div className=" h-[32px] w-[82px]">
              <select
                className=" mx-auto py-1 h-[100%] w-[100%] rounded-xl border-[1px]  bg-black text-white border-[#4F4F4F]"
                value={frequency}
                onChange={handleFrequencyChange}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            {/* Date Selector based on Frequency */}
            <div className=" h-[32px] w-[82px]">
              <select className="  mx-auto py-1 h-[100%] w-[100%]  rounded-xl border-[1px] bg-[black] text-white border-[#4F4F4F]">
                {dates.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="bg-black text-white p-4">
          {/* Top 3 Leaders */}
          <div className="flex justify-center space-x-4 mb-8">
            {data.slice(0, 3).map((player, index) => (
              <div
                key={player.rank}
                className={`flex flex-col justify-between items-center p-4 rounded-xl bg-[#1A1A1A] w-1/3 h-[188px] text-center border-gradient-to-b from-[rgba(255,214,0,0.8)] to-[rgba(255,168,0,0.3)] `}
              >
                <div className="text-2xl font-bold">
                  {index === 0 ? "2nd" : index === 1 ? "1st" : "3rd"}
                </div>
                <div className="text-xl font-normal">{player.name}</div>
                <div className=" w-full flex justify-between text-sm text-[#888888]">
                  <div className="text-sm ">WPM: {player.wpm}</div>
                  <div className="text-sm">Accuracy: {player.accuracy}</div>
                  <div className="text-sm">Time: {player.time}</div>
                </div>
              </div>
            ))}
          </div>

         

          {/* Full Leaderboard List */}
          <div className="bg-black rounded-lg overflow-hidden">
            <div className="grid grid-cols-5 px-4 py-2 text-[#999999]">
              <div>Rank</div>
              <div>Player</div>
              <div>WPM</div>
              <div>Accuracy</div>
              <div>Time</div>
            </div>
            {data.map((player) => (
              <div
                key={player.rank}
                className={`grid grid-cols-5 px-4 py-2 bg-[#1A1A1A] mb-3 rounded-xl ${
                  player.name.includes("(You)")
                    ? "border border-yellow-500"
                    : ""
                }`}
              >
                <div>{player.rank}</div>
                <div className="flex items-center">
                  <img
                    src={`https://ui-avatars.com/api/?name=${player.name}&background=random`}
                    alt={player.name}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  {player.name}
                </div>
                <div>{player.wpm}</div>
                <div>{player.accuracy}</div>
                <div>{player.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
