"use client";

import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/apis";
import toast from "react-hot-toast";
import { checkTokenExpiration } from "@/utils/authUtils";
import Router, { useRouter } from "next/navigation";

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
  { name: "kartikk", rank: 6, wpm: 1212, accuracy: 894, time: 2345 },
  { name: "hemuth", rank: 7, wpm: 1111, accuracy: 864, time: 2345 },
  { name: "amn", rank: 8, wpm: 1086, accuracy: 756, time: 2457 },
];
// Helper functions
const getDaysInMonth = (year, month) => {
  const days = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days.map((d) => d.toISOString().split("T")[0]); // YYYY-MM-DD format
};

const getWeeksInMonth = (year, month) => {
  const weeks = [];
  let start = new Date(year, month, 1);
  while (start.getMonth() === month) {
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    if (end.getMonth() !== month)
      end.setDate(new Date(year, month + 1, 0).getDate());
    weeks.push({
      start: start.toISOString().split("T")[0],
      end: end.toISOString().split("T")[0],
    });
    start.setDate(start.getDate() + 7);
  }
  return weeks;
};

const getMonths = () => {
  const months = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    months.push(
      new Date(now.getFullYear(), i).toLocaleString("default", {
        month: "long",
      })
    );
  }
  return months;
};

const Page = () => {
  const [frequency, setFrequency] = useState("Daily");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTime, setSelectedTime] = useState(15);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  // Reorder data for the top 3 players
  const reorderedData = [
    data[1], // 2nd rank
    data[0], // 1st rank
    data[2], // 3rd rank
  ];
  useEffect(() => {
    if (!auth.token) {
      router.push("/login");
    }
  }, [auth.token, router]);
  const getTimeFormat = (time) => {
    if (time === 15) return "FifteenSeconds";
    if (time === 30) return "ThirtySeconds";
    if (time === 60) return "SixtySeconds";
    return "FifteenSeconds"; // Default to FifteenSeconds if no match
  };
  const fetchDailyData = async (date) => {
    try {
      const { DAILYDATA_API } = endpoints;
      await checkTokenExpiration(dispatch, auth);
      console.log(date);
      const timeFormat = getTimeFormat(selectedTime);

      // Properly construct the query string
      const response = await apiConnector(
        "GET",
        `${DAILYDATA_API}?date=${encodeURIComponent(date)}&mode=${timeFormat}`,
        null, // Construct the query string correctly
        {
          Authorization: `Bearer ${auth.token}`, // Add token to the headers
        }
      );

      if (response.data.success) {
        setLeaderboardData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching daily data:", error);
    }
  };

  const fetchWeeklyData = async (startDate, endDate, timeFormat) => {
    try {
      const { WEEKLYDATA_API } = endpoints;
      await checkTokenExpiration(dispatch, auth);
      const timeFormat = getTimeFormat(selectedTime);
      // Properly construct the query string
      const response = await apiConnector(
        "GET",
        `${WEEKLYDATA_API}?startDate=${encodeURIComponent(
          startDate
        )}&endDate=${encodeURIComponent(endDate)}&mode=${timeFormat}`,
        null, // Construct the query string correctly
        {
          Authorization: `Bearer ${auth.token}`, // Add token to the headers
        }
      );

      if (response.data.success) {
        setLeaderboardData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching daily data:", error);
    }
  };

  const fetchMonthlyData = async (month, timeFormat) => {
    try {
      const { MONTHLYDATA_API } = endpoints;
      await checkTokenExpiration(dispatch, auth);
      const timeFormat = getTimeFormat(selectedTime);
      const currentYear = new Date().getFullYear();

      // Properly construct the query string
      const response = await apiConnector(
        "GET",
        `${MONTHLYDATA_API}?month=${encodeURIComponent(
          month
        )}&year=${encodeURIComponent(currentYear)}&mode=${timeFormat}`,
        null, // Construct the query string correctly
        {
          Authorization: `Bearer ${auth.token}`, // Add token to the headers
        }
      );

      if (response.data.success) {
        setLeaderboardData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching daily data:", error);
    }
  };

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    if (frequency === "Daily") {
      const days = getDaysInMonth(year, month);
      setOptions(days);
      if (days.length > 0) {
        fetchDailyData(days[0]); // Default to the first day
      }
    } else if (frequency === "Weekly") {
      const weeks = getWeeksInMonth(year, month).map((week, index) => ({
        label: `Week-${index + 1}`,
        value: week,
      }));
      setOptions(weeks);
      if (weeks.length > 0) {
        fetchWeeklyData(weeks[0].value.start, weeks[0].value.end, selectedTime);
      }
    } else if (frequency === "Monthly") {
      const months = getMonths();
      setOptions(months);
      if (months.length > 0) {
        fetchMonthlyData(months[0], selectedTime);
      }
    }
  }, [frequency]);

  useEffect(() => {
    if (frequency === "Daily" && selectedOption) {
      fetchDailyData(selectedOption);
    } else if (frequency === "Weekly" && selectedOption) {
      fetchWeeklyData(selectedOption.start, selectedOption.end, selectedTime);
    } else if (frequency === "Monthly" && selectedOption) {
      fetchMonthlyData(selectedOption, selectedTime);
    }
  }, [selectedOption, selectedTime]);

  const handleFrequencyChange = (e) => {
    setFrequency(e.target.value);
    setSelectedOption("");
  };

  const handleOptionChange = (e) => {
    if (frequency === "Weekly") {
      setSelectedOption(JSON.parse(e.target.value)); // Parse the JSON string back to an object
    } else {
      setSelectedOption(e.target.value); // Keep as string for "Daily" and "Monthly"
    }
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const getBorderGradient = (rank) => {
    if (rank === 1) {
      return "linear-gradient(180deg, rgba(255, 214, 0, 0.8), rgba(255, 168, 0, 0.3))";
    } else if (rank === 2) {
      return "linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3))";
    } else if (rank === 3) {
      return "linear-gradient(180deg, rgba(236, 112, 112, 0.8), rgba(109, 30, 30, 0.3))";
    }
    return "linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(200, 200, 200, 0.3))";
  };

  return (
    <div className="flex flex-col gap-6 justify-between w-11/12 h-screen mx-auto bg-black text-[#F6F6F6] overflow-hidden ">
      <Navbar />
      <div className="flex flex-col gap-12 justify-between h-full">
        <div className="flex justify-between text-2xl text-white">
          <div>
            Here are <span className="text-[#D5E94E]">today's</span> top
            players:
          </div>
          <div className="flex gap-4 text-sm mr-1 ">
            <div className="h-[32px]   relative">
              <select
                className=" py-1 h-[100%] pl-3 pr-3 cursor-pointer  w-[100px] rounded-xl border-[1px] bg-black text-white border-[#4F4F4F] appearance-none " // Added `appearance-none` and padding-right for custom icon
                value={frequency}
                onChange={handleFrequencyChange}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-xl">
                <img src="/down.svg"/>
              </span>
            </div>

            <div className="h-[32px] relative">
              <select
                className="py-1 px-3 h-[100%] w-fit rounded-xl cursor-pointer border-[1px] bg-black text-white border-[#4F4F4F] appearance-none pr-10"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                {options.map((option, index) =>
                  frequency === "Weekly" ? (
                    <option key={index} value={JSON.stringify(option.value)}>
                      {option?.label}
                    </option>
                  ) : (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  )
                )}
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-xl">
              <img src="/down.svg"/>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-black text-white h-full">
          {/* Top 3 Leaders */}
          <div className="flex justify-center space-x-4 mb-8">
            {reorderedData.map((player, index) => (
              <div
                key={player.rank}
                className="relative flex flex-col items-center gap-3 p-6 bg-[#1A1A1A] text-center w-1/3 h-[188px] overflow-hidden rounded-xl"
              >
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    padding: "2px",
                    background: getBorderGradient(player.rank),
                    WebkitMask:
                      "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                    maskComposite: "exclude",
                  }}
                ></div>
                <div className="relative z-10 text-2xl bg-clip-text text-transparent bg-text-gradient2">
                  {player.rank === 1
                    ? "1st"
                    : player.rank === 2
                    ? "2nd"
                    : "3rd"}
                </div>
                <div className="relative z-10 text-2xl font-normal">
                  <img
                    className="inline-block"
                    src="/leaderUser.svg"
                    alt="User icon"
                  />{" "}
                  &nbsp;
                  {player.name}
                </div>
                <div className="relative z-10 flex justify-between w-full mt-3 text-sm text-[#888888]">
                  <div>
                    WPM<div className="text-white">{player.wpm}</div>
                  </div>
                  <div>
                    Accuracy<div className="text-white">{player.accuracy}</div>
                  </div>
                  <div>
                    Time<div className="text-white">{player.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full Leaderboard List */}
          <div className="bg-black rounded-lg h-full overflow-hidden">
            <div className="grid grid-cols-2 px-4 pr-8 py-2 text-[#999999] text-sm">
              <div className=" flex gap-[57px]">
                <div>Rank</div>
                <div>Player</div>
              </div>
              <div className=" flex justify-end gap-[70px]">
                <div className=" mr-[100px] min-w-[75px]">WPM</div>
                <div className="min-w-[75px]">Accuracy</div>
                <div className="min-w-[75px] flex flex-col gap-1">
                  {/* Time has to be set from here */}
                  <div>Time</div>
                  <div className=" flex border border-[#4F4F4F] rounded-xl ">
                    {[15, 30, 60].map((time, index) => (
                      <div
                        key={time}
                        className={`min-w-6 text-center cursor-pointer rounded-l-xl rounded-r-xl ${
                          selectedTime === time
                            ? "bg-[#D5E94E] text-black "
                            : ""
                        }`}
                        onClick={() => handleTimeChange(time)}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[600px] custom-scrollbar">
              {" "}
              {/* Add class for custom scrollbar */}
              {data.map((player) => (
                <div
                  key={player.rank}
                  className={`grid grid-cols-2  px-4 pl-8 py-3 bg-[#1A1A1A] mb-3 rounded-xl ${
                    player.name.includes("(You)")
                      ? "border border-yellow-500"
                      : ""
                  }`}
                >
                  <div className=" flex gap-[57px]">
                    <div>{player.rank}</div>
                    <div className="flex items-center">
                      <img
                        src={`https://ui-avatars.com/api/?name=${player.name}&background=random`}
                        alt={player.name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      {player.name}
                    </div>
                  </div>
                  <div className="flex justify-end items-center gap-[70px] ">
                    <div className=" mr-[100px] min-w-[75px]">{player.wpm}</div>
                    <div className="min-w-[75px]">{player.accuracy}</div>
                    <div className="min-w-[75px]">{player.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
