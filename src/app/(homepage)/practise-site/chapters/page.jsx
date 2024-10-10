"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { setChapters } from "@/features/practise/practiseSlice";
import { endpoints } from "@/services/apis";
import { checkTokenExpiration } from "@/utils/authUtils";
import { apiConnector } from "@/services/apiConnector";

const Page = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const practiseTest = useSelector((state) => state.practiseTest);
  const [chaptersData, setChaptersData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapters = async () => {
      const { CHAPTERS_API } = endpoints;

      try {
        setLoading(true);
        await checkTokenExpiration(dispatch, auth);

        if (!auth?.token) {
          console.error("Authorization token is missing");
          setLoading(false);
          return;
        }

        const response = await apiConnector(
          "GET",
          `${CHAPTERS_API}?id=${practiseTest.id}`,
          null,
          {
            Authorization: `Bearer ${auth.token}`, // Add token to the headers
          }
        );

        if (response.data.success) {
          setChaptersData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [auth, practiseTest.id, dispatch]); // Make sure dependencies are correct

  return (
    <div className="w-11/12 mx-auto py-10">
      {loading ? (
        <div className="flex flex-col gap-3 select-none">
          <div className="w-full mt-4 flex justify-center items-center">
            <div className="linear-loader"></div> {/* Loader animation */}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-3 text-white cursor-pointer">
            <FaArrowLeftLong />
            <span className="text-lg">Back to practice</span>
          </div>

          <div className="mt-8">
            <h1 className="text-5xl font-bold text-white leading-snug">
              {chaptersData?.title}
            </h1>
            <p className="text-gray-400 font-normal text-[30px] line-clamp-2">
              {chaptersData?.description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-y-10 gap-6 mt-10">
            {chaptersData?.Chapter?.map((chapter, index) => (
              <div
                key={index}
                className="bg-[#1A1A1A] p-6 rounded-lg flex justify-between text-white border border-gray-600 min-h-[118px]"
              >
                <div className="flex flex-col gap-2 text-[20px]">
                  <div>{chapter?.title}</div>
                  <div className="text-gray-400 font-normal text-[16px] line-clamp-2">
                    {chapter?.embedCode}
                  </div>
                </div>
                <div>
                  <button className="self-center px-8 py-2 bg-transparent border border-gray-500 text-white rounded-lg hover:bg-gray-700 transition">
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
