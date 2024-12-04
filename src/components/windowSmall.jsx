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
    <div className="bg-[#626166] shadow-outer-custom p-2 rounded-[5.37px] ">
         <div className="flex gap-2">
          {["esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "insert", "prt sc", "delete"]
.map((key, index) => (
            <div
              key={index}
              className={`w-[41.48px] h-[27.4px] py-0 p-4 flex flex-col gap-[70px] items-center justify-center rounded-[5.37px] shadow-inner shadow-[#FFFFFF26] border-[1.9px] border-black ${getKeyClass(
                key
              )}`}
            >
              {/* <div>{renderKeyContent(key)}</div> */}
              <div>{key}</div>
            </div>
          ))}
         
        </div>
        
      </div>
  );
};

export default AppleKeyboard;
