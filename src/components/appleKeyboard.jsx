"use client";
import { useRouter, usePathname } from "next/navigation";
import Modal from "@mui/material/Modal";
import { useRef, useState } from "react";

const AppleKeyboard = ({clickedKeys}) => {
  // Render the image for the symbol key
  const renderKeyContent = (key) => {
    if (/[A-Z]/.test(key)) {
      return key;
    }
    const symbolImage = `/${key}.svg`; // Assuming images are stored in /public/images
    return <img src={symbolImage} alt={key} />;
  };

  // Highlight class for clicked keys
  const getKeyClass = (key) => {
    return clickedKeys.includes(key)
      ? "bg-[#D5E94E] text-black" // Permanent highlight
      : "bg-[#191A1F] text-gray-400"; // Default style
  };
  return (
    <div className="bg-[#626166] shadow-outer-custom p-2 rounded-[5.37px] max-w-[919px]">
        {/* First Row */}
        <div className="flex  items-center justify-between">
          {[
            "`",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "0",
            "-",
            "=",
          ].map((key, index) => (
            <div
              key={index}
              className={`w-[55.48px] h-[53.4px] py-0 p-4 flex flex-col gap-[4px] items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
                key
              )}`}
            >
              <div>{renderKeyContent(key)}</div>
              <div>{key}</div>
            </div>
          ))}
          <div
            className={`w-[85px] h-[53px] flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black text-[12px] ${getKeyClass(
              "DELETE"
            )}`}
          >
            delete
          </div>
        </div>

        {/* Second Row */}
        <div className="flex space-x-2 mt-2 justify-between">
          <div
            className={`w-[83px] h-[53px] text-[12px] flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
              "TAB"
            )}`}
          >
            tab
          </div>
          {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map(
            (key, index) => (
              <div
                key={index}
                className={`w-[55.48px] h-[53.4px] flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
                  key
                )}`}
              >
                {renderKeyContent(key)}
              </div>
            )
          )}
          {["[", "]", "|"].map((key, index) => (
            <div
              key={index}
              className={`w-[55.48px] h-[53.4px] flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
                key
              )}`}
            >
              {key}
            </div>
          ))}
        </div>

        {/* Third Row */}
        <div className="flex space-x-2 mt-2 justify-between">
          <div
            className={`w-[103px] h-[53px] flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black text-[12px] ${getKeyClass(
              "CAPSLOCK"
            )}`}
          >
            capslock
          </div>
          {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key, index) => (
            <div
              key={index}
              className={`w-[55.48px] h-[53.4px] flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
                key
              )}`}
            >
              {renderKeyContent(key)}
            </div>
          ))}
          {[";", "'"].map((key, index) => (
            <div
              key={index}
              className={`w-[55.48px] h-[53.4px] flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
                key
              )}`}
            >
              {key}
            </div>
          ))}
          <div
            className={`w-[102px] h-[53px] text-[12px] flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
              "ENTER"
            )}`}
          >
            return
          </div>
        </div>

        {/* Fourth Row */}
        <div className="flex space-x-2 mt-2 justify-between">
          <div
            className={`w-[133px] h-[53px] text-[12px] flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
              "SHIFT"
            )}`}
          >
            shift
          </div>
          {["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"].map(
            (key, index) => (
              <div
                key={index}
                className={`w-[55.48px] h-[53.4px] flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
                  key
                )}`}
              >
                {key}
              </div>
            )
          )}
          <div
            className={`w-[133px] h-[53px] text-[12px] flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
              "SHIFT"
            )}`}
          >
            shift
          </div>
        </div>

        {/* Fifth Row */}
        <div className="flex justify-between space-x-2 mt-2">
          {["fn", "control", "option"].map((key, index) => (
            <div
              key={index}
              className={`w-[55.48px] h-[53.4px] text-[12px]  flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
                key
              )}`}
            >
              {key}
            </div>
          ))}
          {["command"].map((key, index) => (
            <div
              key={index}
              className={`w-[70.48px] h-[53.4px] text-[12px]  flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
                key
              )}`}
            >
              {key}
            </div>
          ))}
          {[" "].map((key, index) => (
            <div
              key={index}
              className={`w-[306.48px] h-[53.4px] text-[12px]  flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
                key
              )}`}
            >
              {key}
            </div>
          ))}
          {["command"].map((key, index) => (
            <div
              key={index}
              className={`w-[70.48px] h-[53.4px] text-[12px]  flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
                key
              )}`}
            >
              {key}
            </div>
          ))}
          {["option"].map((key, index) => (
            <div
              key={index}
              className={`w-[55.48px] h-[53.4px] text-[12px]  flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
                key
              )}`}
            >
              {key}
            </div>
          ))}
          {["◀︎"].map((key, index) => (
            <div
              key={index}
              className={`w-[55.48px] self-end h-[25.4px] flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
                "ARROWLEFT"
              )}`}
            >
              {key}
            </div>
          ))}
          {[" "].map((key, index) => (
            <div
              key={index}
              className={`w-[55.48px] shadow-inner shadow-[#FFFFFF26] h-[53.4px] flex flex-col items-center justify-center rounded-[5.37px]  border-[1.9px] border-black ${getKeyClass(
                key
              )}`}
            >
              <div>▲</div>
              <div>▼</div>
            </div>
          ))}
          {["▶︎"].map((key, index) => (
            <div
              key={index}
              className={`w-[55.48px] self-end h-[25.4px] flex items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
                "ARROWRIGHT"
              )}`}
            >
              {key}
            </div>
          ))}
        </div>
      </div>
  );
};

export default AppleKeyboard;
