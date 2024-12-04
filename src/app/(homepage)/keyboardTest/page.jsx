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

          <div
            className="scroll-container flex gap-6 px-2 items-center cursor-grab"
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
            <div className="keyboard-container">
              {[
                "Apple Big Keyboard",
                "Windows Small Keyboard",
                "Apple Small Keyboard",
                "Apple Big Keyboard",
                "Windows Small Keyboard",
                "Apple Small Keyboard",
              ].map((label, index) => (
                <div
                  key={index}
                  className="keyboard-item flex flex-col min-w-[320px] max-w-[476px] h-fit group relative cursor-pointer"
                >
                  <img
                    src="Magic.svg"
                    className="w-full h-auto"
                    draggable="false"
                    alt={label}
                  />
                  <div className="text-center mt-2">{label}</div>
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
