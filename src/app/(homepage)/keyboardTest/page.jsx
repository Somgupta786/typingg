"use client";
import Navbar from "@/components/navbar";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/apis";
import toast from "react-hot-toast";
import { checkTokenExpiration } from "@/utils/authUtils";
import Keyboard from "@/components/keyboard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./keyboard.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 800 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Page = () => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // State to track loading
  const [typedKeys, setTypedKeys] = useState([]); // Track typed keys

  // Key press handler
  const handleKeyPress = (event) => {
    const key = event.key;
    setTypedKeys((prevKeys) => [...prevKeys, key]);
  };

  // Add and remove event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="try flex flex-col h-screen w-11/12 mx-auto whitespace-nowrap overflow-x-hidden">
      <Navbar />
      <div className="flex h-full  flex-col justify-between gap-8 mb-12">
        {/* Typed keys container */}
        <div
          className="flex h-11 bg-[#1A1A1A] gap-2 px-2 items-center cursor-grab overflow-hidden rounded-lg"
          onMouseDown={(e) => {
            const container = e.currentTarget;
            container.style.cursor = "grabbing";
            container.dataset.isDragging = "true";
            container.dataset.startX = e.pageX;
            container.dataset.scrollLeft = container.scrollLeft;
          }}
          onMouseMove={(e) => {
            const container = e.currentTarget;
            if (container.dataset.isDragging === "true") {
              const startX = parseFloat(container.dataset.startX);
              const scrollLeft = parseFloat(container.dataset.scrollLeft);
              const diff = e.pageX - startX;
              container.scrollLeft = scrollLeft - diff;
            }
          }}
          onMouseUp={(e) => {
            const container = e.currentTarget;
            container.style.cursor = "grab";
            container.dataset.isDragging = "false";
          }}
          onMouseLeave={(e) => {
            const container = e.currentTarget;
            container.style.cursor = "grab";
            container.dataset.isDragging = "false";
          }}
        >
          {typedKeys.map((key, index) => (
            <div
              key={index}
              className=" text-white border border-[#B0B0B0] px-2 py-1 h-8 rounded text-base"
            >
              {key}
            </div>
          ))}
        </div>
        <div>
          <Keyboard />
        </div>
        <div className="text-base text-white flex flex-col gap-4">
          <div>Select your keyboard layout</div>
          <div>
            <Carousel
              responsive={responsive}
              className="bg-black w-[100vw] flex select-none px-2 relative overflow-visible"
              draggable={true}
              swipeable={false}
              arrows={false}
              itemClass="px-4"
              focusOnSelect={true}
            >
              {[
                "Apple Big Keyboard",
                "Windows Small Keyboard",
                "Apple Small Keyboard",
                "Apple Big Keyboard",
              ].map((label, index) => (
                <div
                  key={index}
                  className="flex flex-col w-fit group relative transition-all duration-300 ease-in-out group-hover:z-10"
                >
                  <div className="flex flex-col items-center transition-transform duration-300 ease-in-out group-hover:scale-125">
                    <img
                      src="Magic.svg"
                      className="transition-transform duration-300 ease-in-out brightness-75 group-hover:brightness-100"
                      draggable="false"
                      alt={label}
                    />
                    <div className="text-center transition-transform duration-300 ease-in-out group-hover:scale-110 mt-2">
                      {label}
                    </div>
                  </div>
                  <style jsx>{`
                    .group:hover ~ .group {
                      filter: brightness(50%);
                      transform: scale(1);
                    }
                  `}</style>
                </div>
              ))}
            </Carousel>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Page;
