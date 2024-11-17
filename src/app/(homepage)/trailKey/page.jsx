import React from "react";

const Keyboard = () => {
  return (
    <div className="bg-[#626166] shadow-outer-custom p-2 rounded-[5.37px] max-w-[919px] mx-auto my-10">
      {/* First Row */}
      <div className="flex space-x-2 justify-between">
        {["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "="].map(
          (key, index) => (
            <div
              key={index}
              className="w-[55.48px] h-[53.4px] bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black"
            >
              {key}
            </div>
          )
        )}
        <div className="w-20 h-10 bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          delete
        </div>
      </div>
      {/* Second Row */}
      <div className="flex space-x-2 mt-2 justify-between">
        <div className="w-14 h-10 bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          tab
        </div>
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map(
          (key, index) => (
            <div
              key={index}
              className={`w-[55.48px] h-[53.4px]  bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black  `}
            >
              {key}
            </div>
          )
        )}
        <div className="w-[55.48px] h-[53.4px] bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          [
        </div>
        <div className="w-[55.48px] h-[53.4px] bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          ]
        </div>
      </div>
      {/* Third Row */}
      <div className="flex space-x-2 mt-2 justify-between">
        <div className="w-16 h-10 bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          caps
        </div>
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key, index) => (
          <div
            key={index}
            className={` w-[55.48px] h-[53.4px]  bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black  `}
          >
            {key}
          </div>
        ))}
        <div className="w-[55.48px] h-[53.4px] bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          ;
        </div>
        <div className="w-[55.48px] h-[53.4px] bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          '
        </div>
        <div className="w-14 h-10 bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          return
        </div>
      </div>
      {/* Fourth Row */}
      <div className="flex space-x-2 mt-2 justify-between">
        <div className="w-20 h-10 bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          shift
        </div>
        {["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"].map(
          (key, index) => (
            <div
              key={index}
              className="w-[55.48px] h-[53.4px] bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black"
            >
              {key}
            </div>
          )
        )}
        <div className="w-28 h-10 bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          shift
        </div>
      </div>
      {/* Fifth Row */}
      <div className="flex justify-between space-x-2 mt-2">
        <div className="w-[55.48px] h-[53.4px] bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          fn
        </div>
        <div className="w-14 h-10 bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          cont
        </div>
        <div className="w-14 h-10 bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          opt
        </div>
        <div className="w-20 h-10 bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          com
        </div>
        <div className="w-40 h-10 bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          spa
        </div>
        <div className="w-20 h-10 bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          com
        </div>
        <div className="w-14 h-10 bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          opt
        </div>
        <div className="w-[55.48px] h-[53.4px] bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          ◀︎
        </div>
        <div className="w-[55.48px] h-[53.4px] bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          ▲
        </div>
        <div className="w-[55.48px] h-[53.4px] bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          ▼
        </div>
        <div className="w-[55.48px] h-[53.4px] bg-[#191A1F] flex items-center justify-center rounded-[5.37px] shadow-custom-inset text-gray-400  border-[1.9px] border-black">
          ▶︎
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
