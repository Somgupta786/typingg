"use client";
import Navbar from "@/components/navbar";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/apis";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setUser } from "@/features/user/userSlice"; // Import your setUser action
import { checkTokenExpiration } from "@/utils/authUtils";

const Page = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // State to track loading
  const [userData, setUserData] = useState(null); // State to store user data locally
  console.log(auth)

  // Redirect if user not authenticated
  useEffect(() => {
    if (!auth.token) {
      router.push("/login");
    }
  }, [auth.token, router]);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { USERINFO_API } = endpoints;
      try {
        setLoading(true);

        // Check token expiration
        await checkTokenExpiration(dispatch, auth);

        // Fetch user data
        const response = await apiConnector("GET", USERINFO_API, null, {
          Authorization: `Bearer ${auth.token}`, // Add token to the headers
        });
        if (response.data.success) {
          const userData = response.data.data.user;
          console.log(response.data);

          // Save data locally
          setUserData(userData);

          // Dispatch data globally to Redux
          dispatch(setUser(userData));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [auth.token, dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3 select-none   w-11/12  h-screen   mx-auto bg-black text-[#F6F6F6]">
        <Navbar />
        <div className="w-full mt-10 flex justify-center items-center">
          <div className="linear-loader"></div>
          {/* Loader animation */}
        </div>
      </div>
    );
  }
  return (
    <div className=" flex flex-col  w-11/12  h-screen   mx-auto bg-black text-[#F6F6F6]">
      <Navbar />

      <div className=" flex h-[100%] w-full gap-[140px] mb-9 mt-6">
        <div className=" flex flex-col h-full justify-between gap-4 flex-shrink-[0]">
          <div className=" max-w-[245px] max-h-[245px] cursor-pointer" onClick={()=>router.push("/profile/emblem")}>
            <img
              src={
                userData?.profileImage ? userData.profileImage : "/userLogo.svg"
              }
            />
          </div>
          <div className=" flex flex-col gap-8">
            <div className=" text-3xl">
              {userData?.username}
              <img className="inline" src="/badge.svg" />
            </div>
            <div className=" flex flex-col gap-2">
              <div className=" text-xl text-[#666666]">
                Avg. WPM:{" "}
                <span className=" text-white">{userData?.avgWpm}</span>
              </div>
              <div className=" text-xl text-[#666666]">
                Avg. accuracy:{" "}
                <span className=" text-white">{userData?.avgAccuracy}</span>
              </div>
              <div className=" text-xl text-[#666666]">
                Rank on leaderboard:{" "}
                <span className=" text-white">{userData?.rank}</span>
              </div>
              <div className=" text-xl text-[#666666]">
                Match played:{" "}
                <span className=" text-white">{userData?.matchPlayed}</span>
              </div>
              <div className=" text-xl text-[#666666]">
                Match wins:{" "}
                <span className=" text-white">{userData?.matchWon}</span>
              </div>
              <div className=" text-xl text-[#666666]">
                Match lost:{" "}
                <span className=" text-white">{userData?.matchLost}</span>
              </div>
            </div>
          </div>
          <div className="px-[24px] py-[16px] text-center rounded-lg border-[1px] border-[#4F4F4F] cursor-pointer font-bold">
            View on leaderboard
          </div>
        </div>
        <div className=" w-full flex flex-col gap-8 ">
          <div>
            {" "}
            <div className=" text-2xl">Want to track your progress?</div>
            <div className=" text-xl text-[#B0B0B0]">
              To track your progress, here is your last four(4) matches’
              results!! Give it a look and try to improve on it accordingly.
            </div>
          </div>
          <div className="h-full flex flex-col gap-8">
            {userData?.UserTestResult && userData.UserTestResult.length > 0 ? (
              userData.UserTestResult.map((result, index) => (
                <div
                  key={index}
                  className="border border-[#303030] rounded-[8px]"
                >
                  <div className="pl-4 text-[14px] py-2">{result.mode}</div>
                  <hr className="h-[1px] border-0 bg-[#303030]" />
                  <div className="flex justify-around gap-6 py-3">
                    <div className="text-4xl">
                      {result.wpm}
                      <span className="text-2xl text-[#888888] ml-1">WPM</span>
                    </div>
                    <div className="text-4xl">
                      {result.accuracy}
                      <span className="text-2xl text-[#888888] ml-1">
                        Accuracy
                      </span>
                    </div>
                    <div className="text-4xl">
                      15
                      <span className="text-2xl text-[#888888] ml-1">
                        Seconds
                      </span>
                    </div>
                    <div className="text-4xl">
                      {result.raw}
                      <span className="text-2xl text-[#888888] ml-1">Raw</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="custom-dashed-border w-full h-full flex flex-col gap-6 items-center justify-center border border-[#4F4F4F] rounded-2xl">
                <div>
                  <img src="/noResult.svg" alt="No Results" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    Track Your Typing Progress
                  </div>
                  <div className="text-base text-[#B0B0B0] text-center">
                    No test results found. Start a speed test to track your
                    progress.
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="px-[24px] py-[12px] w-[213px] rounded-lg border-[1px] bg-[#D5E94E] border-[#4F4F4F] whitespace-nowrap text-base text-black font-bold cursor-pointer text-center">
                    Take Speed Test
                  </div>
                  <div className="px-[24px] py-[12px] w-[213px] rounded-lg border-[1px] bg-[#D5E94E] border-[#4F4F4F] whitespace-nowrap text-base text-black font-bold cursor-pointer text-center">
                    Take Speed Test
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
