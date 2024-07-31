import "./styles.css";
import * as React from "react";

export default function Layout({ children }) {
  return (
    <div className="h-[100vh] flex flex-col justify-between w-11/12 mx-auto font-normal text-[1.25rem]">
      <div className="flex justify-between mt-6">
        <div>TypingSpeedtest</div>
        <div className="text-[13px] cursor-pointer font-bold leading-5 border rounded-lg text-center border-[#4F4F4F] py-3 px-6">
          Check typing speed
        </div>
      </div>
      <div className="flex  h-fit justify-between mt-10">
        <div className=" mr-5 1xl:w-[43%] md1:hidden">
          <img className="h-[100%] w-[100%]" src="/Grids.svg" />
        </div>
        {children}

        <div></div>
      </div>
    </div>
  );
}
