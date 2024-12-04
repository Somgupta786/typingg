"use client";

import Navbar from "@/components/navbar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const auth = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.user);
  const router = useRouter();
  const [username, setUsername] = useState("");

  // Redirect if user not authenticated
  useEffect(() => {
    if (!auth.token) {
      router.push("/login");
    } else {
      setUsername(userData?.user?.username || "Guest"); // Set username after client-side data is loaded
    }
  }, [auth.token, router, userData]);

  return (
    <div className="flex flex-col w-11/12 h-screen mx-auto bg-black text-[#F6F6F6]">
      <Navbar />
      <div className="flex flex-col gap-6 text-3xl text-white">
        <div className="flex justify-between">
          <div>Your emblem’s status</div>
          <div className="px-[24px] py-[10px] w-[144px] rounded-lg border-[1px] bg-black border-[#4F4F4F] whitespace-nowrap text-sm text-white font-bold cursor-pointer text-center"  onClick={()=>router.push("/profile")}>
            Back to profile
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <img
              src={
                userData?.user?.profileImage
                  ? userData.user.profileImage
                  : "/userLogo.svg"
              }
              alt="Profile"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div>{username}</div>
            <div className="text-base text-[#FF9494]">
              You haven't achieved any emblem yet
            </div>
            <div className="text-xl text-[#B0B0B0]">
              Average WPM:{" "}
              <span className="text-white font-bold">
                {userData?.user?.avgWpm || 0}
              </span>
            </div>
            <div className="mt-5 text-base text-[#888888]">
              *your emblem is not permanent it will be revised every month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
